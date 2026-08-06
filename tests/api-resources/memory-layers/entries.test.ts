// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Cadenya from '@cadenya/cadenya';

const client = new Cadenya({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource entries', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.memoryLayers.entries.create('memlyr_01HXKD2E5NQM3T9AYWCFFFBMJH', {
      workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q',
      metadata: { name: 'name' },
      spec: { content: 'content', type: 'content' },
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('create: required and optional params', async () => {
    const response = await client.memoryLayers.entries.create('memlyr_01HXKD2E5NQM3T9AYWCFFFBMJH', {
      workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q',
      metadata: {
        name: 'name',
        externalId: 'externalId',
        labels: { foo: 'string' },
      },
      spec: {
        content: 'content',
        type: 'content',
        description: 'description',
        key: 'key',
      },
    });
  });

  // Mock server tests are disabled
  test.skip('retrieve: only required params', async () => {
    const responsePromise = client.memoryLayers.entries.retrieve(
      'memlyr_01HXKD2E5NQM3T9AYWCFFFBMJH',
      'mementry_01HXKD2E5NQM3T9AYWCF5E52Z0',
      { workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q' },
    );
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('retrieve: required and optional params', async () => {
    const response = await client.memoryLayers.entries.retrieve(
      'memlyr_01HXKD2E5NQM3T9AYWCFFFBMJH',
      'mementry_01HXKD2E5NQM3T9AYWCF5E52Z0',
      { workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q' },
    );
  });

  // Mock server tests are disabled
  test.skip('update: only required params', async () => {
    const responsePromise = client.memoryLayers.entries.update(
      'memlyr_01HXKD2E5NQM3T9AYWCFFFBMJH',
      'mementry_01HXKD2E5NQM3T9AYWCF5E52Z0',
      { workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q' },
    );
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('update: required and optional params', async () => {
    const response = await client.memoryLayers.entries.update(
      'memlyr_01HXKD2E5NQM3T9AYWCFFFBMJH',
      'mementry_01HXKD2E5NQM3T9AYWCF5E52Z0',
      {
        workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q',
        metadata: {
          name: 'name',
          externalId: 'externalId',
          labels: { foo: 'string' },
        },
        spec: {
          content: 'content',
          description: 'description',
          key: 'key',
          uploadId: 'upload_01HXKD2E5NQM3T9AYWCFZ05DNK',
        },
        updateMask: 'updateMask',
      },
    );
  });

  // Mock server tests are disabled
  test.skip('list: only required params', async () => {
    const responsePromise = client.memoryLayers.entries.list('memlyr_01HXKD2E5NQM3T9AYWCFFFBMJH', {
      workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('list: required and optional params', async () => {
    const response = await client.memoryLayers.entries.list('memlyr_01HXKD2E5NQM3T9AYWCFFFBMJH', {
      workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q',
      cursor: 'cursor',
      includeInfo: true,
      labels: 'labels',
      limit: 0,
      prefix: 'prefix',
      query: 'query',
      sortOrder: 'sortOrder',
    });
  });

  // Mock server tests are disabled
  test.skip('delete: only required params', async () => {
    const responsePromise = client.memoryLayers.entries.delete(
      'memlyr_01HXKD2E5NQM3T9AYWCFFFBMJH',
      'mementry_01HXKD2E5NQM3T9AYWCF5E52Z0',
      { workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q' },
    );
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('delete: required and optional params', async () => {
    const response = await client.memoryLayers.entries.delete(
      'memlyr_01HXKD2E5NQM3T9AYWCFFFBMJH',
      'mementry_01HXKD2E5NQM3T9AYWCF5E52Z0',
      { workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q' },
    );
  });
});
