// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Cadenya from '@cadenya/cadenya';

const client = new Cadenya({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource agents', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.agents.create('workspaceId', {
      metadata: { name: 'name' },
      spec: { variationSelectionMode: 'VARIATION_SELECTION_MODE_UNSPECIFIED' },
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
    const response = await client.agents.create('workspaceId', {
      metadata: {
        name: 'name',
        bundleKey: 'bundleKey',
        externalId: 'externalId',
        labels: { foo: 'string' },
      },
      spec: {
        variationSelectionMode: 'VARIATION_SELECTION_MODE_UNSPECIFIED',
        description: 'description',
        inputDataSchema: { foo: 'bar' },
        outputDefinition: { foo: 'bar' },
        webhookEventsUrl: 'webhookEventsUrl',
      },
      defaultVariation: {
        metadata: {
          name: 'name',
          bundleKey: 'bundleKey',
          externalId: 'externalId',
          labels: { foo: 'string' },
        },
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
          systemPromptTemplate: 'systemPromptTemplate',
          userMessageTemplate: 'userMessageTemplate',
          weight: 0,
        },
      },
    });
  });

  // Mock server tests are disabled
  test.skip('retrieve: only required params', async () => {
    const responsePromise = client.agents.retrieve('id', { workspaceId: 'workspaceId' });
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
    const response = await client.agents.retrieve('id', { workspaceId: 'workspaceId' });
  });

  // Mock server tests are disabled
  test.skip('update: only required params', async () => {
    const responsePromise = client.agents.update('id', { workspaceId: 'workspaceId' });
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
    const response = await client.agents.update('id', {
      workspaceId: 'workspaceId',
      metadata: {
        name: 'name',
        bundleKey: 'bundleKey',
        externalId: 'externalId',
        labels: { foo: 'string' },
      },
      spec: {
        variationSelectionMode: 'VARIATION_SELECTION_MODE_UNSPECIFIED',
        description: 'description',
        inputDataSchema: { foo: 'bar' },
        outputDefinition: { foo: 'bar' },
        webhookEventsUrl: 'webhookEventsUrl',
      },
      updateMask: 'updateMask',
    });
  });

  // Mock server tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.agents.list('workspaceId');
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
      client.agents.list(
        'workspaceId',
        {
          bundleKey: 'bundleKey',
          cursor: 'cursor',
          includeInfo: true,
          limit: 0,
          prefix: 'prefix',
          query: 'query',
          sortOrder: 'sortOrder',
          state: 'STATE_UNSPECIFIED',
          variationSelectionMode: 'VARIATION_SELECTION_MODE_UNSPECIFIED',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Cadenya.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('delete: only required params', async () => {
    const responsePromise = client.agents.delete('id', { workspaceId: 'workspaceId' });
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
    const response = await client.agents.delete('id', { workspaceId: 'workspaceId' });
  });

  // Mock server tests are disabled
  test.skip('archive: only required params', async () => {
    const responsePromise = client.agents.archive('id', { workspaceId: 'workspaceId' });
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
    const response = await client.agents.archive('id', { workspaceId: 'workspaceId' });
  });

  // Mock server tests are disabled
  test.skip('publish: only required params', async () => {
    const responsePromise = client.agents.publish('id', { workspaceId: 'workspaceId' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('publish: required and optional params', async () => {
    const response = await client.agents.publish('id', { workspaceId: 'workspaceId' });
  });

  // Mock server tests are disabled
  test.skip('unarchive: only required params', async () => {
    const responsePromise = client.agents.unarchive('id', { workspaceId: 'workspaceId' });
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
    const response = await client.agents.unarchive('id', { workspaceId: 'workspaceId' });
  });

  // Mock server tests are disabled
  test.skip('unpublish: only required params', async () => {
    const responsePromise = client.agents.unpublish('id', { workspaceId: 'workspaceId' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('unpublish: required and optional params', async () => {
    const response = await client.agents.unpublish('id', { workspaceId: 'workspaceId' });
  });
});
