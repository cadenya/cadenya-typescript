import assert from 'node:assert/strict';
import test from 'node:test';
import { HttpClient } from '../dist/core/http.js';

test('nested query objects preserve dotted paths and repeated values', async () => {
  let requested;
  const client = new HttpClient({
    baseURL: 'https://example.com', authHeader: () => ({}),
    fetch: async (url) => {
      requested = new URL(url);
      return Response.json({});
    },
  });
  await client.requestAPI(() => ({
    method: 'GET', path: '/models',
    query: { filters: { state: ['enabled', 'disabled'], count: 0, archived: false, omitted: null } },
  }));
  assert.deepEqual(requested.searchParams.getAll('filters.state'), ['enabled', 'disabled']);
  assert.equal(requested.searchParams.get('filters.count'), '0');
  assert.equal(requested.searchParams.get('filters.archived'), 'false');
  assert.equal(requested.searchParams.has('filters.omitted'), false);
});

test('circular query objects are rejected before fetch', async () => {
  const filters = {};
  filters.self = filters;
  const client = new HttpClient({
    baseURL: 'https://example.com', authHeader: () => ({}),
    fetch: async () => assert.fail('must not fetch'),
  });
  await assert.rejects(async () => client.requestAPI(() => ({
    method: 'GET', path: '/models', query: { filters },
  })), /circular reference/);
});
