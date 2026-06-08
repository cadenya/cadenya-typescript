// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Cadenya from '@cadenya/cadenya';

const client = new Cadenya({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource bulkWorkspaceResources', () => {
  // Mock server tests are disabled
  test.skip('retrieve: only required params', async () => {
    const responsePromise = client.bulkWorkspaceResources.retrieve('id', { workspaceId: 'workspaceId' });
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
    const response = await client.bulkWorkspaceResources.retrieve('id', { workspaceId: 'workspaceId' });
  });

  // Mock server tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.bulkWorkspaceResources.list('workspaceId');
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
      client.bulkWorkspaceResources.list(
        'workspaceId',
        {
          bundleKey: 'bundleKey',
          cursor: 'cursor',
          limit: 0,
          sortOrder: 'sortOrder',
          state: 'STATE_UNSPECIFIED',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Cadenya.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('apply: only required params', async () => {
    const responsePromise = client.bulkWorkspaceResources.apply('workspaceId', {
      data: { bundleKey: 'bundleKey' },
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
  test.skip('apply: required and optional params', async () => {
    const response = await client.bulkWorkspaceResources.apply('workspaceId', {
      data: {
        bundleKey: 'bundleKey',
        agents: {
          foo: {
            name: 'name',
            spec: {
              status: 'AGENT_STATUS_UNSPECIFIED',
              variationSelectionMode: 'VARIATION_SELECTION_MODE_UNSPECIFIED',
              description: 'description',
              inputDataSchema: { foo: 'bar' },
              outputDefinition: { foo: 'bar' },
              webhookEventsUrl: 'webhookEventsUrl',
            },
            labels: { foo: 'string' },
            schedules: {
              foo: {
                name: 'name',
                spec: {
                  initialMessage: 'initialMessage',
                  schedule: {
                    calendars: [
                      {
                        comment: 'comment',
                        dayOfMonth: [
                          {
                            end: 0,
                            start: 0,
                            step: 0,
                          },
                        ],
                        dayOfWeek: [
                          {
                            end: 0,
                            start: 0,
                            step: 0,
                          },
                        ],
                        hour: [
                          {
                            end: 0,
                            start: 0,
                            step: 0,
                          },
                        ],
                        minute: [
                          {
                            end: 0,
                            start: 0,
                            step: 0,
                          },
                        ],
                        month: [
                          {
                            end: 0,
                            start: 0,
                            step: 0,
                          },
                        ],
                        second: [
                          {
                            end: 0,
                            start: 0,
                            step: 0,
                          },
                        ],
                      },
                    ],
                    intervals: [{ every: '-160513s', offset: '-160513s' }],
                    timezone: 'timezone',
                  },
                  data: {},
                  overlapPolicy: 'OVERLAP_POLICY_UNSPECIFIED',
                  status: 'AGENT_SCHEDULE_STATUS_UNSPECIFIED',
                  variationId: 'variationId',
                },
                labels: { foo: 'string' },
              },
            },
            variations: {
              foo: {
                name: 'name',
                spec: {
                  compactionConfig: {
                    summarization: { instructions: 'instructions' },
                    toolResultClearing: { preserveRecentResults: 0 },
                    triggerThreshold: 0,
                  },
                  constraints: { maxSubObjectives: 0, maxToolCalls: 0 },
                  description: 'description',
                  enableEpisodicMemory: true,
                  episodicMemoryTtl: 0,
                  modelConfig: { modelId: 'modelId', temperature: 0 },
                  progressiveDiscovery: {
                    hints: ['string'],
                    maxTools: 0,
                    rerankThreshold: 0,
                  },
                  prompt: 'prompt',
                  weight: 0,
                },
                assignments: [
                  {
                    subAgentId: 'subAgentId',
                    toolId: 'toolId',
                    toolSetId: 'toolSetId',
                  },
                ],
                labels: { foo: 'string' },
                memoryLayers: [{ memoryLayerId: 'memoryLayerId', position: 0 }],
              },
            },
          },
        },
        automaticallyPublishAgents: true,
        memoryLayers: {
          foo: {
            name: 'name',
            spec: { type: 'MEMORY_LAYER_TYPE_UNSPECIFIED', description: 'description' },
            entries: {
              foo: {
                key: 'key',
                content: 'content',
                description: 'description',
                uploadId: 'uploadId',
              },
            },
            labels: { foo: 'string' },
          },
        },
        sourceUrl: 'sourceUrl',
        toolSets: {
          foo: {
            name: 'name',
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
            labels: { foo: 'string' },
            tools: {
              foo: {
                name: 'name',
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
                  status: 'TOOL_STATUS_UNSPECIFIED',
                  requiresApproval: true,
                },
                labels: { foo: 'string' },
              },
            },
          },
        },
      },
    });
  });
});
