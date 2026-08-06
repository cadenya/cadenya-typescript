// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Cadenya from '@cadenya/cadenya';

const client = new Cadenya({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource toolSets', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.toolSets.create({
      workspaceId: 'workspaceId',
      metadata: { name: 'name' },
      spec: {},
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
      workspaceId: 'workspaceId',
      metadata: {
        name: 'name',
        externalId: 'externalId',
        labels: { foo: 'string' },
      },
      spec: {
        adapter: {
          bare: { contentTimeout: 0 },
          http: {
            baseUrl: 'baseUrl',
            headers: { foo: 'string' },
          },
          mcp: {
            excludeTools: {
              operator: 'OPERATOR_UNSPECIFIED',
              filters: [
                {
                  attribute: 'ATTRIBUTE_UNSPECIFIED',
                  matcher: {
                    caseSensitive: true,
                    contains: 'contains',
                    endsWith: 'endsWith',
                    exact: 'exact',
                    regex: 'regex',
                    startsWith: 'startsWith',
                    type: 'type',
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
                    caseSensitive: true,
                    contains: 'contains',
                    endsWith: 'endsWith',
                    exact: 'exact',
                    regex: 'regex',
                    startsWith: 'startsWith',
                    type: 'type',
                  },
                },
              ],
            },
            justInTime: { enabled: true, failObjectiveOnToolListError: true },
            toolApprovals: {
              always: true,
              only: {
                operator: 'OPERATOR_UNSPECIFIED',
                filters: [
                  {
                    attribute: 'ATTRIBUTE_UNSPECIFIED',
                    matcher: {
                      caseSensitive: true,
                      contains: 'contains',
                      endsWith: 'endsWith',
                      exact: 'exact',
                      regex: 'regex',
                      startsWith: 'startsWith',
                      type: 'type',
                    },
                  },
                ],
              },
              type: 'type',
            },
            url: 'url',
          },
          openapi: {
            baseUrl: 'baseUrl',
            excludeTools: {
              operator: 'OPERATOR_UNSPECIFIED',
              filters: [
                {
                  attribute: 'ATTRIBUTE_UNSPECIFIED',
                  matcher: {
                    caseSensitive: true,
                    contains: 'contains',
                    endsWith: 'endsWith',
                    exact: 'exact',
                    regex: 'regex',
                    startsWith: 'startsWith',
                    type: 'type',
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
                    caseSensitive: true,
                    contains: 'contains',
                    endsWith: 'endsWith',
                    exact: 'exact',
                    regex: 'regex',
                    startsWith: 'startsWith',
                    type: 'type',
                  },
                },
              ],
            },
            serverName: 'serverName',
            toolApprovals: {
              always: true,
              only: {
                operator: 'OPERATOR_UNSPECIFIED',
                filters: [
                  {
                    attribute: 'ATTRIBUTE_UNSPECIFIED',
                    matcher: {
                      caseSensitive: true,
                      contains: 'contains',
                      endsWith: 'endsWith',
                      exact: 'exact',
                      regex: 'regex',
                      startsWith: 'startsWith',
                      type: 'type',
                    },
                  },
                ],
              },
              type: 'type',
            },
            type: 'type',
            uploadId: 'upload_01HXKD2E5NQM3T9AYWCFZ05DNK',
            url: 'url',
          },
          type: 'type',
        },
        description: 'description',
      },
    });
  });

  // Mock server tests are disabled
  test.skip('retrieve: only required params', async () => {
    const responsePromise = client.toolSets.retrieve('id', { workspaceId: 'workspaceId' });
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
    const response = await client.toolSets.retrieve('id', { workspaceId: 'workspaceId' });
  });

  // Mock server tests are disabled
  test.skip('update: only required params', async () => {
    const responsePromise = client.toolSets.update('id', { workspaceId: 'workspaceId' });
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
    const response = await client.toolSets.update('id', {
      workspaceId: 'workspaceId',
      metadata: {
        name: 'name',
        externalId: 'externalId',
        labels: { foo: 'string' },
      },
      spec: {
        adapter: {
          bare: { contentTimeout: 0 },
          http: {
            baseUrl: 'baseUrl',
            headers: { foo: 'string' },
          },
          mcp: {
            excludeTools: {
              operator: 'OPERATOR_UNSPECIFIED',
              filters: [
                {
                  attribute: 'ATTRIBUTE_UNSPECIFIED',
                  matcher: {
                    caseSensitive: true,
                    contains: 'contains',
                    endsWith: 'endsWith',
                    exact: 'exact',
                    regex: 'regex',
                    startsWith: 'startsWith',
                    type: 'type',
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
                    caseSensitive: true,
                    contains: 'contains',
                    endsWith: 'endsWith',
                    exact: 'exact',
                    regex: 'regex',
                    startsWith: 'startsWith',
                    type: 'type',
                  },
                },
              ],
            },
            justInTime: { enabled: true, failObjectiveOnToolListError: true },
            toolApprovals: {
              always: true,
              only: {
                operator: 'OPERATOR_UNSPECIFIED',
                filters: [
                  {
                    attribute: 'ATTRIBUTE_UNSPECIFIED',
                    matcher: {
                      caseSensitive: true,
                      contains: 'contains',
                      endsWith: 'endsWith',
                      exact: 'exact',
                      regex: 'regex',
                      startsWith: 'startsWith',
                      type: 'type',
                    },
                  },
                ],
              },
              type: 'type',
            },
            url: 'url',
          },
          openapi: {
            baseUrl: 'baseUrl',
            excludeTools: {
              operator: 'OPERATOR_UNSPECIFIED',
              filters: [
                {
                  attribute: 'ATTRIBUTE_UNSPECIFIED',
                  matcher: {
                    caseSensitive: true,
                    contains: 'contains',
                    endsWith: 'endsWith',
                    exact: 'exact',
                    regex: 'regex',
                    startsWith: 'startsWith',
                    type: 'type',
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
                    caseSensitive: true,
                    contains: 'contains',
                    endsWith: 'endsWith',
                    exact: 'exact',
                    regex: 'regex',
                    startsWith: 'startsWith',
                    type: 'type',
                  },
                },
              ],
            },
            serverName: 'serverName',
            toolApprovals: {
              always: true,
              only: {
                operator: 'OPERATOR_UNSPECIFIED',
                filters: [
                  {
                    attribute: 'ATTRIBUTE_UNSPECIFIED',
                    matcher: {
                      caseSensitive: true,
                      contains: 'contains',
                      endsWith: 'endsWith',
                      exact: 'exact',
                      regex: 'regex',
                      startsWith: 'startsWith',
                      type: 'type',
                    },
                  },
                ],
              },
              type: 'type',
            },
            type: 'type',
            uploadId: 'upload_01HXKD2E5NQM3T9AYWCFZ05DNK',
            url: 'url',
          },
          type: 'type',
        },
        description: 'description',
      },
      updateMask: 'updateMask',
    });
  });

  // Mock server tests are disabled
  test.skip('list: only required params', async () => {
    const responsePromise = client.toolSets.list({ workspaceId: 'workspaceId' });
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
      workspaceId: 'workspaceId',
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
    const responsePromise = client.toolSets.delete('id', { workspaceId: 'workspaceId' });
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
    const response = await client.toolSets.delete('id', { workspaceId: 'workspaceId' });
  });

  // Mock server tests are disabled
  test.skip('archive: only required params', async () => {
    const responsePromise = client.toolSets.archive('id', { workspaceId: 'workspaceId' });
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
    const response = await client.toolSets.archive('id', { workspaceId: 'workspaceId' });
  });

  // Mock server tests are disabled
  test.skip('getOpenAPISpec: only required params', async () => {
    const responsePromise = client.toolSets.getOpenAPISpec('toolSetId', { workspaceId: 'workspaceId' });
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
    const response = await client.toolSets.getOpenAPISpec('toolSetId', { workspaceId: 'workspaceId' });
  });

  // Mock server tests are disabled
  test.skip('listEvents: only required params', async () => {
    const responsePromise = client.toolSets.listEvents('toolSetId', { workspaceId: 'workspaceId' });
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
    const response = await client.toolSets.listEvents('toolSetId', {
      workspaceId: 'workspaceId',
      cursor: 'cursor',
      includeInfo: true,
      labels: 'labels',
      limit: 0,
      sortOrder: 'sortOrder',
    });
  });

  // Mock server tests are disabled
  test.skip('listUsage: only required params', async () => {
    const responsePromise = client.toolSets.listUsage('toolSetId', { workspaceId: 'workspaceId' });
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
    const response = await client.toolSets.listUsage('toolSetId', {
      workspaceId: 'workspaceId',
      cursor: 'cursor',
      limit: 0,
      sortOrder: 'sortOrder',
      toolId: 'toolId',
    });
  });

  // Mock server tests are disabled
  test.skip('unarchive: only required params', async () => {
    const responsePromise = client.toolSets.unarchive('id', { workspaceId: 'workspaceId' });
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
    const response = await client.toolSets.unarchive('id', { workspaceId: 'workspaceId' });
  });
});
