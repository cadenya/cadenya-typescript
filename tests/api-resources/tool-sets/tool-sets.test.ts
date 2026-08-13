import Cadenya from '@cadenya/cadenya';

const client = new Cadenya({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource toolSets', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.toolSets.create({
      workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q',
      metadata: { name: 'name' },
      spec: { adapter: { bare: {}, type: 'bare' } },
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
    const response = await client.toolSets.create({
      workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q',
      metadata: {
        name: 'name',
        externalId: 'externalId',
        labels: { foo: 'string' },
      },
      spec: {
        adapter: {
          mcp: {
            excludeTools: {
              operator: 'OPERATOR_UNSPECIFIED',
              filters: [
                {
                  attribute: 'ATTRIBUTE_UNSPECIFIED',
                  matcher: {
                    exact: 'exact',
                    type: 'exact',
                    caseSensitive: true,
                  },
                },
              ],
            },
            headers: { foo: 'string' },
            includeTools: {
              operator: 'OPERATOR_UNSPECIFIED',
              filters: [
                {
                  attribute: 'ATTRIBUTE_UNSPECIFIED',
                  matcher: {
                    exact: 'exact',
                    type: 'exact',
                    caseSensitive: true,
                  },
                },
              ],
            },
            justInTime: { enabled: true, failObjectiveOnToolListError: true },
            toolApprovals: { always: true, type: 'always' },
            url: 'url',
          },
          type: 'mcp',
        },
        description: 'description',
      },
    });
  });

  // Mock server tests are disabled
  test.skip('retrieve: only required params', async () => {
    const responsePromise = client.toolSets.retrieve('toolset_01HXKD2E5NQM3T9AYWCFNRMN74', {
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
  test.skip('retrieve: required and optional params', async () => {
    const response = await client.toolSets.retrieve('toolset_01HXKD2E5NQM3T9AYWCFNRMN74', {
      workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q',
    });
  });

  // Mock server tests are disabled
  test.skip('update: only required params', async () => {
    const responsePromise = client.toolSets.update('toolset_01HXKD2E5NQM3T9AYWCFNRMN74', {
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
  test.skip('update: required and optional params', async () => {
    const response = await client.toolSets.update('toolset_01HXKD2E5NQM3T9AYWCFNRMN74', {
      workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q',
      metadata: {
        name: 'name',
        externalId: 'externalId',
        labels: { foo: 'string' },
      },
      spec: {
        adapter: {
          mcp: {
            excludeTools: {
              operator: 'OPERATOR_UNSPECIFIED',
              filters: [
                {
                  attribute: 'ATTRIBUTE_UNSPECIFIED',
                  matcher: {
                    exact: 'exact',
                    type: 'exact',
                    caseSensitive: true,
                  },
                },
              ],
            },
            headers: { foo: 'string' },
            includeTools: {
              operator: 'OPERATOR_UNSPECIFIED',
              filters: [
                {
                  attribute: 'ATTRIBUTE_UNSPECIFIED',
                  matcher: {
                    exact: 'exact',
                    type: 'exact',
                    caseSensitive: true,
                  },
                },
              ],
            },
            justInTime: { enabled: true, failObjectiveOnToolListError: true },
            toolApprovals: { always: true, type: 'always' },
            url: 'url',
          },
          type: 'mcp',
        },
        description: 'description',
      },
      updateMask: 'updateMask',
    });
  });

  // Mock server tests are disabled
  test.skip('list: only required params', async () => {
    const responsePromise = client.toolSets.list({ workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q' });
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
    const response = await client.toolSets.list({
      workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q',
      cursor: 'cursor',
      includeInfo: true,
      labels: 'labels',
      limit: 0,
      prefix: 'prefix',
      query: 'query',
      sortOrder: 'sortOrder',
      state: 'STATE_UNSPECIFIED',
    });
  });

  // Mock server tests are disabled
  test.skip('delete: only required params', async () => {
    const responsePromise = client.toolSets.delete('toolset_01HXKD2E5NQM3T9AYWCFNRMN74', {
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
  test.skip('delete: required and optional params', async () => {
    const response = await client.toolSets.delete('toolset_01HXKD2E5NQM3T9AYWCFNRMN74', {
      workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q',
    });
  });

  // Mock server tests are disabled
  test.skip('archive: only required params', async () => {
    const responsePromise = client.toolSets.archive('toolset_01HXKD2E5NQM3T9AYWCFNRMN74', {
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
  test.skip('archive: required and optional params', async () => {
    const response = await client.toolSets.archive('toolset_01HXKD2E5NQM3T9AYWCFNRMN74', {
      workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q',
    });
  });

  // Mock server tests are disabled
  test.skip('getOpenAPISpec: only required params', async () => {
    const responsePromise = client.toolSets.getOpenAPISpec('toolset_01HXKD2E5NQM3T9AYWCFNRMN74', {
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
  test.skip('getOpenAPISpec: required and optional params', async () => {
    const response = await client.toolSets.getOpenAPISpec('toolset_01HXKD2E5NQM3T9AYWCFNRMN74', {
      workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q',
    });
  });

  // Mock server tests are disabled
  test.skip('listEvents: only required params', async () => {
    const responsePromise = client.toolSets.listEvents('toolset_01HXKD2E5NQM3T9AYWCFNRMN74', {
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
  test.skip('listEvents: required and optional params', async () => {
    const response = await client.toolSets.listEvents('toolset_01HXKD2E5NQM3T9AYWCFNRMN74', {
      workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q',
      cursor: 'cursor',
      includeInfo: true,
      labels: 'labels',
      limit: 0,
      sortOrder: 'sortOrder',
    });
  });

  // Mock server tests are disabled
  test.skip('listUsage: only required params', async () => {
    const responsePromise = client.toolSets.listUsage('toolset_01HXKD2E5NQM3T9AYWCFNRMN74', {
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
  test.skip('listUsage: required and optional params', async () => {
    const response = await client.toolSets.listUsage('toolset_01HXKD2E5NQM3T9AYWCFNRMN74', {
      workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q',
      cursor: 'cursor',
      limit: 0,
      sortOrder: 'sortOrder',
      toolId: 'tool_01HXKD2E5NQM3T9AYWCFWVYY9K',
    });
  });

  // Mock server tests are disabled
  test.skip('unarchive: only required params', async () => {
    const responsePromise = client.toolSets.unarchive('toolset_01HXKD2E5NQM3T9AYWCFNRMN74', {
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
  test.skip('unarchive: required and optional params', async () => {
    const response = await client.toolSets.unarchive('toolset_01HXKD2E5NQM3T9AYWCFNRMN74', {
      workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q',
    });
  });
});
