// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Cadenya from '@cadenya/cadenya';

const client = new Cadenya({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource tools', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.toolSets.tools.create('toolSetId', {
      workspaceId: 'workspaceId',
      metadata: { name: 'name' },
      spec: {
        config: {},
        description: 'description',
        parameters: { foo: 'bar' },
        requiresApproval: true,
      },
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
    const response = await client.toolSets.tools.create('toolSetId', {
      workspaceId: 'workspaceId',
      metadata: {
        name: 'name',
        bundleKey: 'bundleKey',
        externalId: 'externalId',
        labels: { foo: 'string' },
      },
      spec: {
        config: {
          http: {
            requestMethod: 'HTTP_METHOD_UNSPECIFIED',
            headers: { foo: 'string' },
            path: 'path',
            query: 'query',
            requestBodyContentType: 'requestBodyContentType',
            requestBodyTemplate: 'requestBodyTemplate',
            toolName: 'toolName',
          },
          mcp: {
            toolDescription: 'toolDescription',
            toolName: 'toolName',
            toolTitle: 'toolTitle',
          },
          openapi: {
            method: 'method',
            operationId: 'operationId',
            path: 'path',
          },
        },
        description: 'description',
        parameters: { foo: 'bar' },
        requiresApproval: true,
      },
    });
  });

  // Mock server tests are disabled
  test.skip('retrieve: only required params', async () => {
    const responsePromise = client.toolSets.tools.retrieve('id', {
      workspaceId: 'workspaceId',
      toolSetId: 'toolSetId',
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
  test.skip('retrieve: required and optional params', async () => {
    const response = await client.toolSets.tools.retrieve('id', {
      workspaceId: 'workspaceId',
      toolSetId: 'toolSetId',
    });
  });

  // Mock server tests are disabled
  test.skip('update: only required params', async () => {
    const responsePromise = client.toolSets.tools.update('id', {
      workspaceId: 'workspaceId',
      toolSetId: 'toolSetId',
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
  test.skip('update: required and optional params', async () => {
    const response = await client.toolSets.tools.update('id', {
      workspaceId: 'workspaceId',
      toolSetId: 'toolSetId',
      metadata: {
        name: 'name',
        bundleKey: 'bundleKey',
        externalId: 'externalId',
        labels: { foo: 'string' },
      },
      spec: {
        config: {
          http: {
            requestMethod: 'HTTP_METHOD_UNSPECIFIED',
            headers: { foo: 'string' },
            path: 'path',
            query: 'query',
            requestBodyContentType: 'requestBodyContentType',
            requestBodyTemplate: 'requestBodyTemplate',
            toolName: 'toolName',
          },
          mcp: {
            toolDescription: 'toolDescription',
            toolName: 'toolName',
            toolTitle: 'toolTitle',
          },
          openapi: {
            method: 'method',
            operationId: 'operationId',
            path: 'path',
          },
        },
        description: 'description',
        parameters: { foo: 'bar' },
        requiresApproval: true,
      },
      updateMask: 'updateMask',
    });
  });

  // Mock server tests are disabled
  test.skip('list: only required params', async () => {
    const responsePromise = client.toolSets.tools.list('toolSetId', { workspaceId: 'workspaceId' });
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
    const response = await client.toolSets.tools.list('toolSetId', {
      workspaceId: 'workspaceId',
      bundleKey: 'bundleKey',
      cursor: 'cursor',
      includeInfo: true,
      limit: 0,
      names: ['string'],
      prefix: 'prefix',
      query: 'query',
      requiresApproval: true,
      sortOrder: 'sortOrder',
      states: ['STATE_UNSPECIFIED'],
    });
  });

  // Mock server tests are disabled
  test.skip('delete: only required params', async () => {
    const responsePromise = client.toolSets.tools.delete('id', {
      workspaceId: 'workspaceId',
      toolSetId: 'toolSetId',
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
  test.skip('delete: required and optional params', async () => {
    const response = await client.toolSets.tools.delete('id', {
      workspaceId: 'workspaceId',
      toolSetId: 'toolSetId',
    });
  });

  // Mock server tests are disabled
  test.skip('omit: only required params', async () => {
    const responsePromise = client.toolSets.tools.omit('id', {
      workspaceId: 'workspaceId',
      toolSetId: 'toolSetId',
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
  test.skip('omit: required and optional params', async () => {
    const response = await client.toolSets.tools.omit('id', {
      workspaceId: 'workspaceId',
      toolSetId: 'toolSetId',
    });
  });

  // Mock server tests are disabled
  test.skip('restore: only required params', async () => {
    const responsePromise = client.toolSets.tools.restore('id', {
      workspaceId: 'workspaceId',
      toolSetId: 'toolSetId',
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
  test.skip('restore: required and optional params', async () => {
    const response = await client.toolSets.tools.restore('id', {
      workspaceId: 'workspaceId',
      toolSetId: 'toolSetId',
    });
  });
});
