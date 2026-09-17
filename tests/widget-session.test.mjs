import assert from 'node:assert/strict';
import test from 'node:test';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { Cadenya } from '../dist/index.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

test('creation requires tenant and subject IDs in public TypeScript declarations', () => {
  const temp = mkdtempSync(join(tmpdir(), 'cadenya-session-types-'));
  try {
    const file = join(temp, 'session.mts');
    writeFileSync(file, `
import type { WidgetSessionCreateParams, WidgetSessionCredentials, WidgetSession } from ${JSON.stringify(join(root, 'dist/index.js'))};
const valid: WidgetSessionCreateParams = {spec:{widgetId:'widget', tenant:{id:'tenant'}, subject:{id:'visitor'}}};
// @ts-expect-error tenant and subject required
const anonymous: WidgetSessionCreateParams = {spec:{widgetId:'widget'}};
// @ts-expect-error tenant required
const noTenant: WidgetSessionCreateParams = {spec:{widgetId:'widget',subject:{id:'visitor'}}};
// @ts-expect-error subject ID required
const noSubjectID: WidgetSessionCreateParams = {spec:{widgetId:'widget',tenant:{id:'tenant'},subject:{}}};
declare const session: WidgetSession;
const credentials: WidgetSessionCredentials | undefined = session.credentials;
if (credentials) {
 const fields: string[] = [credentials.sessionId,credentials.host,credentials.token,credentials.tokenExpiresAt,credentials.sessionExpiresAt];
}
`);
    const result = spawnSync('tsc', ['--noEmit','--strict','--module','NodeNext','--moduleResolution','NodeNext','--target','ES2022','--lib','ES2022,DOM,DOM.Iterable',file], {encoding:'utf8'});
    assert.ifError(result.error);
    assert.equal(result.status,0,result.stdout+result.stderr);
  } finally { rmSync(temp,{recursive:true,force:true}); }
});

test('creation sends identity and preserves both credential expiry timestamps', async () => {
  const credentials={sessionId:'wsess_test',host:'widget.widgets.test',token:'test-bearer',tokenExpiresAt:'2026-09-17T20:15:00Z',sessionExpiresAt:'2026-09-18T20:00:00Z'};
  let sent;
  const client=new Cadenya({apiKey:'test-management-token',workspaceId:'workspace_test',baseURL:'https://api.test',fetch:async (url,init)=>{
    sent={url:String(url),method:init.method,headers:new Headers(init.headers),body:JSON.parse(init.body)};
    return new Response(JSON.stringify({metadata:{id:credentials.sessionId},credentials}),{headers:{'content-type':'application/json','cache-control':'no-store'}});
  }});
  const spec={widgetId:'widget_test',tenant:{id:'tenant_test'},subject:{id:'visitor_test'}};
  const result=await client.widgetSessions.create({spec});
  assert.equal(sent.url,'https://api.test/v1/workspaces/workspace_test/widget_sessions');
  assert.equal(sent.method,'POST');
  assert.deepEqual(sent.body,{spec});
  assert.equal(sent.headers.get('authorization'),'Bearer test-management-token');
  assert.deepEqual(result.credentials,credentials);
});
