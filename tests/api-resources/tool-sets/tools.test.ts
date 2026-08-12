import Cadenya from '@cadenya/cadenya';

const client = new Cadenya({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource tools', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.toolSets.tools.create('toolset_01HXKD2E5NQM3T9AYWCFNRMN74', {
      workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q',
      metadata: { name: 'name' },
      spec: {
        config: {
          http: { requestMethod: 'HTTP_METHOD_UNSPECIFIED' },
          type: 'http',
        },
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
    const response = await client.toolSets.tools.create('toolset_01HXKD2E5NQM3T9AYWCFNRMN74', {
      workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q',
      metadata: {
        name: 'name',
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
          },
          type: 'http',
        },
        description: 'description',
        parameters: { foo: 'bar' },
        requiresApproval: true,
        llmToolName: 'llmToolName',
      },
    });
  });

  // Mock server tests are disabled
  test.skip('retrieve: only required params', async () => {
    const responsePromise = client.toolSets.tools.retrieve(
      'toolset_01HXKD2E5NQM3T9AYWCFNRMN74',
      'tool_01HXKD2E5NQM3T9AYWCFWVYY9K',
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
    const response = await client.toolSets.tools.retrieve(
      'toolset_01HXKD2E5NQM3T9AYWCFNRMN74',
      'tool_01HXKD2E5NQM3T9AYWCFWVYY9K',
      { workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q' },
    );
  });

  // Mock server tests are disabled
  test.skip('update: only required params', async () => {
    const responsePromise = client.toolSets.tools.update(
      'toolset_01HXKD2E5NQM3T9AYWCFNRMN74',
      'tool_01HXKD2E5NQM3T9AYWCFWVYY9K',
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
    const response = await client.toolSets.tools.update(
      'toolset_01HXKD2E5NQM3T9AYWCFNRMN74',
      'tool_01HXKD2E5NQM3T9AYWCFWVYY9K',
      {
        workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q',
        metadata: {
          name: 'name',
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
            },
            type: 'http',
          },
          description: 'description',
          parameters: { foo: 'bar' },
          requiresApproval: true,
          llmToolName: 'llmToolName',
        },
        updateMask: 'updateMask',
      },
    );
  });

  // Mock server tests are disabled
  test.skip('list: only required params', async () => {
    const responsePromise = client.toolSets.tools.list('toolset_01HXKD2E5NQM3T9AYWCFNRMN74', {
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
    const response = await client.toolSets.tools.list('toolset_01HXKD2E5NQM3T9AYWCFNRMN74', {
      workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q',
      cursor: 'cursor',
      includeInfo: true,
      labels: 'labels',
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
    const responsePromise = client.toolSets.tools.delete(
      'toolset_01HXKD2E5NQM3T9AYWCFNRMN74',
      'tool_01HXKD2E5NQM3T9AYWCFWVYY9K',
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
    const response = await client.toolSets.tools.delete(
      'toolset_01HXKD2E5NQM3T9AYWCFNRMN74',
      'tool_01HXKD2E5NQM3T9AYWCFWVYY9K',
      { workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q' },
    );
  });

  // Mock server tests are disabled
  test.skip('omit: only required params', async () => {
    const responsePromise = client.toolSets.tools.omit(
      'toolset_01HXKD2E5NQM3T9AYWCFNRMN74',
      'tool_01HXKD2E5NQM3T9AYWCFWVYY9K',
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
  test.skip('omit: required and optional params', async () => {
    const response = await client.toolSets.tools.omit(
      'toolset_01HXKD2E5NQM3T9AYWCFNRMN74',
      'tool_01HXKD2E5NQM3T9AYWCFWVYY9K',
      { workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q' },
    );
  });

  // Mock server tests are disabled
  test.skip('restore: only required params', async () => {
    const responsePromise = client.toolSets.tools.restore(
      'toolset_01HXKD2E5NQM3T9AYWCFNRMN74',
      'tool_01HXKD2E5NQM3T9AYWCFWVYY9K',
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
  test.skip('restore: required and optional params', async () => {
    const response = await client.toolSets.tools.restore(
      'toolset_01HXKD2E5NQM3T9AYWCFNRMN74',
      'tool_01HXKD2E5NQM3T9AYWCFWVYY9K',
      { workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q' },
    );
  });
});
