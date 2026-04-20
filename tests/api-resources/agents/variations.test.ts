// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Cadenya from '@cadenya/cadenya';

const client = new Cadenya({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource variations', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.agents.variations.create('agentId', {
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
    const response = await client.agents.variations.create('agentId', {
      metadata: {
        name: 'name',
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
        prompt: 'prompt',
        toolSelection: {
          assignedTools: { allowDiscovery: true },
          autoDiscovery: { hints: ['string'], maxTools: 0 },
        },
        weight: 0,
      },
    });
  });

  // Mock server tests are disabled
  test.skip('retrieve: only required params', async () => {
    const responsePromise = client.agents.variations.retrieve('id', { agentId: 'agentId' });
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
    const response = await client.agents.variations.retrieve('id', { agentId: 'agentId' });
  });

  // Mock server tests are disabled
  test.skip('update: only required params', async () => {
    const responsePromise = client.agents.variations.update('id', { agentId: 'agentId' });
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
    const response = await client.agents.variations.update('id', {
      agentId: 'agentId',
      metadata: {
        name: 'name',
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
        prompt: 'prompt',
        toolSelection: {
          assignedTools: { allowDiscovery: true },
          autoDiscovery: { hints: ['string'], maxTools: 0 },
        },
        weight: 0,
      },
      updateMask: 'updateMask',
    });
  });

  // Mock server tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.agents.variations.list('agentId');
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
      client.agents.variations.list(
        'agentId',
        {
          cursor: 'cursor',
          includeInfo: true,
          limit: 0,
          sortOrder: 'sortOrder',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Cadenya.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('delete: only required params', async () => {
    const responsePromise = client.agents.variations.delete('id', { agentId: 'agentId' });
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
    const response = await client.agents.variations.delete('id', { agentId: 'agentId' });
  });

  // Mock server tests are disabled
  test.skip('addAssignment: only required params', async () => {
    const responsePromise = client.agents.variations.addAssignment('variationId', { agentId: 'agentId' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('addAssignment: required and optional params', async () => {
    const response = await client.agents.variations.addAssignment('variationId', {
      agentId: 'agentId',
      subAgentId: 'subAgentId',
      toolId: 'toolId',
      toolSetId: 'toolSetId',
    });
  });

  // Mock server tests are disabled
  test.skip('addMemoryLayer: only required params', async () => {
    const responsePromise = client.agents.variations.addMemoryLayer('variationId', { agentId: 'agentId' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('addMemoryLayer: required and optional params', async () => {
    const response = await client.agents.variations.addMemoryLayer('variationId', {
      agentId: 'agentId',
      memoryLayerId: 'memoryLayerId',
      position: 0,
    });
  });

  // Mock server tests are disabled
  test.skip('removeAssignment: only required params', async () => {
    const responsePromise = client.agents.variations.removeAssignment('id', {
      agentId: 'agentId',
      variationId: 'variationId',
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
  test.skip('removeAssignment: required and optional params', async () => {
    const response = await client.agents.variations.removeAssignment('id', {
      agentId: 'agentId',
      variationId: 'variationId',
    });
  });

  // Mock server tests are disabled
  test.skip('removeMemoryLayer: only required params', async () => {
    const responsePromise = client.agents.variations.removeMemoryLayer('id', {
      agentId: 'agentId',
      variationId: 'variationId',
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
  test.skip('removeMemoryLayer: required and optional params', async () => {
    const response = await client.agents.variations.removeMemoryLayer('id', {
      agentId: 'agentId',
      variationId: 'variationId',
    });
  });

  // Mock server tests are disabled
  test.skip('updateMemoryLayer: only required params', async () => {
    const responsePromise = client.agents.variations.updateMemoryLayer('id', {
      agentId: 'agentId',
      variationId: 'variationId',
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
  test.skip('updateMemoryLayer: required and optional params', async () => {
    const response = await client.agents.variations.updateMemoryLayer('id', {
      agentId: 'agentId',
      variationId: 'variationId',
      position: 0,
    });
  });
});
