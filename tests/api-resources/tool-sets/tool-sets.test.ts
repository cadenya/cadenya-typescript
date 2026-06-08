// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Cadenya from '@cadenya/cadenya';

const client = new Cadenya({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource toolSets', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.toolSets.create('workspaceId', {
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
    const response = await client.toolSets.create('workspaceId', {
      metadata: {
        name: 'name',
        bundleKey: 'bundleKey',
        externalId: 'externalId',
        labels: { foo: 'string' },
      },
      spec: {
        adapter: {
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
                  },
                },
              ],
            },
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
                    },
                  },
                ],
              },
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
                    },
                  },
                ],
              },
            },
            uploadId: 'uploadId',
            url: 'url',
          },
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
        bundleKey: 'bundleKey',
        externalId: 'externalId',
        labels: { foo: 'string' },
      },
      spec: {
        adapter: {
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
                  },
                },
              ],
            },
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
                    },
                  },
                ],
              },
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
                    },
                  },
                ],
              },
            },
            uploadId: 'uploadId',
            url: 'url',
          },
        },
        description: 'description',
      },
      updateMask: 'updateMask',
    });
  });

  // Mock server tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.toolSets.list('workspaceId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.toolSets.list(
        'workspaceId',
        {
          bundleKey: 'bundleKey',
          cursor: 'cursor',
          includeInfo: true,
          limit: 0,
          prefix: 'prefix',
          query: 'query',
          sortOrder: 'sortOrder',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Cadenya.NotFoundError);
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
      limit: 0,
      sortOrder: 'sortOrder',
    });
  });
});
