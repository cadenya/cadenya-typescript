import assert from 'node:assert/strict';
import test from 'node:test';
import { createServer } from 'node:http';
import { once } from 'node:events';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { Cadenya } from '../dist/index.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

test('assignment variants narrow and invalid shapes fail TypeScript checks', () => {
  const temp = mkdtempSync(join(tmpdir(), 'cadenya-assignment-types-'));
  try {
    const lines = [
      `import type { AgentVariationAddAssignmentParams as Add, AgentVariationRemoveAssignmentParams as Remove } from ${JSON.stringify(join(root, 'dist/resources/agent-variations.js'))};`,
      `import type { AgentVariation } from ${JSON.stringify(join(root, 'dist/types.js'))};`,
      `import type { Cadenya } from ${JSON.stringify(join(root, 'dist/index.js'))};`,
      'declare const client: Cadenya;',
    ];
    for (const [type, method] of [['Add', 'addAssignment'], ['Remove', 'removeAssignment']]) {
      for (const field of ['toolId', 'toolSetId', 'subAgentId', 'agentPoolId']) {
        const other = field === 'toolId' ? 'toolSetId' : 'toolId';
        lines.push(`const ${type}_${field}: ${type} = { type: '${field}', ${field}: 'target', workspaceId: 'workspace_override' };`);
        lines.push(`const result_${type}_${field}: PromiseLike<AgentVariation> = client.agents.variations.${method}('agent', 'variation', ${type}_${field});`);
        lines.push('// @ts-expect-error the selected variant field is required', `const missing_${type}_${field}: ${type} = { type: '${field}' };`);
        lines.push('// @ts-expect-error the discriminator must agree with the field', `const mismatch_${type}_${field}: ${type} = { type: '${field}', ${other}: 'target' };`);
        lines.push('// @ts-expect-error a literal must not contain another variant field', `const extra_${type}_${field}: ${type} = { type: '${field}', ${field}: 'target', ${other}: 'other' };`);
      }
      lines.push('// @ts-expect-error discriminator is required', `const noType_${type}: ${type} = { toolId: 'target' };`);
      lines.push('// @ts-expect-error obsolete body wrapper is rejected', `const wrapped_${type}: ${type} = { body: { type: 'toolSetId', toolSetId: 'target' } };`);
      lines.push(`function narrow${type}(value: ${type}) { switch (value.type) {`);
      for (const field of ['toolId', 'toolSetId', 'subAgentId', 'agentPoolId']) {
        const other = field === 'toolId' ? 'toolSetId' : 'toolId';
        lines.push(`case '${field}': { const id: string = value.${field};`, '// @ts-expect-error other variant fields are unavailable after narrowing', `value.${other}; return id; }`);
      }
      lines.push('default: { const exhaustive: never = value; return exhaustive; } } }');
    }
    const file = join(temp, 'assignments.mts');
    writeFileSync(file, lines.join('\n'));
    const result = spawnSync('tsc', ['--noEmit', '--strict', '--module', 'NodeNext', '--moduleResolution', 'NodeNext', '--target', 'ES2022', '--lib', 'ES2022,DOM,DOM.Iterable', file], { encoding: 'utf8' });
    assert.ifError(result.error);
    assert.equal(result.status, 0, result.stdout + result.stderr);
    assert.equal(lines.filter(line => line.startsWith('// @ts-expect-error')).length, 36);
  } finally {
    rmSync(temp, { recursive: true, force: true });
  }
});

test('add/remove use direct bodies, workspace defaults/overrides, and revised action routes', async () => {
  // This is an HTTP contract fixture, not the production backend. It verifies
  // real fetch/serialization and SDK handling of the documented status codes.
  const requests = [];
  const state = new Map();
  const server = createServer(async (req, res) => {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const body = JSON.parse(Buffer.concat(chunks).toString());
    requests.push({ method: req.method, path: req.url, body });
    const match = req.url.match(/^\/v1\/workspaces\/([^/]+)\/agents\/agent_123\/variations\/agentvar_456:(addAssignment|removeAssignment)$/);
    const send = (status, value) => { res.writeHead(status, { 'Content-Type': 'application/json' }); res.end(JSON.stringify(value)); };
    if (!match || req.method !== 'POST') return send(404, { code: 5, message: 'unknown route' });
    if (!['toolId', 'toolSetId', 'subAgentId', 'agentPoolId'].includes(body.type) || !body[body.type] || Object.keys(body).sort().join(',') !== [body.type, 'type'].sort().join(',')) return send(400, { code: 3, message: 'invalid body' });
    const [, workspace, action] = match;
    const assigned = state.get(workspace) ?? new Map();
    state.set(workspace, assigned);
    const key = `${body.type}:${body[body.type]}`;
    if (action === 'addAssignment') {
      if (assigned.has(key)) return send(409, { code: 6, message: 'already assigned' });
      assigned.set(key, body);
    } else {
      if (!assigned.has(key)) return send(404, { code: 5, message: 'not assigned' });
      assigned.delete(key);
    }
    send(200, { metadata: { id: 'agentvar_456' }, spec: { assignments: [...assigned.values()], memoryLayerAssignments: [] }, info: { effectiveToolCount: assigned.size } });
  });
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  const client = new Cadenya({ apiKey: 'local-test-only', baseURL: `http://127.0.0.1:${server.address().port}`, workspaceId: 'workspace_default', maxRetries: 0 });
  try {
    for (const field of ['toolId', 'toolSetId', 'subAgentId', 'agentPoolId']) {
      for (const override of [undefined, 'workspace_override']) {
        const workspace = override ?? 'workspace_default';
        const body = { type: field, [field]: `target_${field}` };
        // Unknown JS properties must not leak into the wire payload either.
        const params = { ...body, ...(override ? { workspaceId: override } : {}), extra: 'do-not-send' };
        const added = await client.agents.variations.addAssignment('agent_123', 'agentvar_456', params);
        assert.deepEqual(added.spec.assignments, [body]);
        assert.deepEqual(requests.at(-1), { method: 'POST', path: `/v1/workspaces/${workspace}/agents/agent_123/variations/agentvar_456:addAssignment`, body });
        await assert.rejects(client.agents.variations.addAssignment('agent_123', 'agentvar_456', params), error => error.status === 409);
        const removed = await client.agents.variations.removeAssignment('agent_123', 'agentvar_456', params);
        assert.deepEqual(removed.spec.assignments, []);
        assert.deepEqual(requests.at(-1), { method: 'POST', path: `/v1/workspaces/${workspace}/agents/agent_123/variations/agentvar_456:removeAssignment`, body });
        await assert.rejects(client.agents.variations.removeAssignment('agent_123', 'agentvar_456', params), error => error.status === 404);
      }
    }
    assert.equal(requests.length, 32);
  } finally {
    server.closeAllConnections();
    await new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
  }
});
