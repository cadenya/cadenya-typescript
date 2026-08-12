import Cadenya from '@cadenya/cadenya';

const client = new Cadenya({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource agents', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.agents.create({
      workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q',
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
    const response = await client.agents.create({
      workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q',
      metadata: {
        name: 'name',
        externalId: 'externalId',
        labels: { foo: 'string' },
      },
      spec: {
        variationSelectionMode: 'VARIATION_SELECTION_MODE_UNSPECIFIED',
        description: 'description',
        enableEpisodicMemory: true,
        episodicMemoryTtl: 0,
        outputDefinition: { foo: 'bar' },
        systemPromptDataSchema: { foo: 'bar' },
        webhookEventsUrl: 'webhookEventsUrl',
      },
      defaultVariation: {
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
          constraints: {
            inactivityTimeout: '-160513s',
            maxSubObjectives: 0,
            maxToolCalls: 0,
          },
          description: 'description',
          firstUserMessageTemplate: 'firstUserMessageTemplate',
          modelConfig: {
            modelId: 'claude/opus-4.6',
            maxOutputTokens: 0,
            reasoningEffort: 'REASONING_EFFORT_UNSPECIFIED',
            stopSequences: ['string'],
            temperature: 0,
            topK: 0,
            topP: 0,
          },
          progressiveDiscovery: { hints: ['string'], maxTools: 0 },
          systemPromptTemplate: 'systemPromptTemplate',
        },
      },
    });
  });

  // Mock server tests are disabled
  test.skip('retrieve: only required params', async () => {
    const responsePromise = client.agents.retrieve('agent_01HXKD2E5NQM3T9AYWCFMGWT9Y', {
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
    const response = await client.agents.retrieve('agent_01HXKD2E5NQM3T9AYWCFMGWT9Y', {
      workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q',
    });
  });

  // Mock server tests are disabled
  test.skip('update: only required params', async () => {
    const responsePromise = client.agents.update('agent_01HXKD2E5NQM3T9AYWCFMGWT9Y', {
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
    const response = await client.agents.update('agent_01HXKD2E5NQM3T9AYWCFMGWT9Y', {
      workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q',
      metadata: {
        name: 'name',
        externalId: 'externalId',
        labels: { foo: 'string' },
      },
      spec: {
        variationSelectionMode: 'VARIATION_SELECTION_MODE_UNSPECIFIED',
        description: 'description',
        enableEpisodicMemory: true,
        episodicMemoryTtl: 0,
        outputDefinition: { foo: 'bar' },
        systemPromptDataSchema: { foo: 'bar' },
        webhookEventsUrl: 'webhookEventsUrl',
      },
      updateMask: 'updateMask',
    });
  });

  // Mock server tests are disabled
  test.skip('list: only required params', async () => {
    const responsePromise = client.agents.list({ workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q' });
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
    const response = await client.agents.list({
      workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q',
      cursor: 'cursor',
      includeInfo: true,
      labels: 'labels',
      limit: 0,
      prefix: 'prefix',
      query: 'query',
      sortOrder: 'sortOrder',
      state: 'STATE_UNSPECIFIED',
      variationSelectionMode: 'VARIATION_SELECTION_MODE_UNSPECIFIED',
    });
  });

  // Mock server tests are disabled
  test.skip('delete: only required params', async () => {
    const responsePromise = client.agents.delete('agent_01HXKD2E5NQM3T9AYWCFMGWT9Y', {
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
    const response = await client.agents.delete('agent_01HXKD2E5NQM3T9AYWCFMGWT9Y', {
      workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q',
    });
  });

  // Mock server tests are disabled
  test.skip('archive: only required params', async () => {
    const responsePromise = client.agents.archive('agent_01HXKD2E5NQM3T9AYWCFMGWT9Y', {
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
    const response = await client.agents.archive('agent_01HXKD2E5NQM3T9AYWCFMGWT9Y', {
      workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q',
    });
  });

  // Mock server tests are disabled
  test.skip('publish: only required params', async () => {
    const responsePromise = client.agents.publish('agent_01HXKD2E5NQM3T9AYWCFMGWT9Y', {
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
  test.skip('publish: required and optional params', async () => {
    const response = await client.agents.publish('agent_01HXKD2E5NQM3T9AYWCFMGWT9Y', {
      workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q',
    });
  });

  // Mock server tests are disabled
  test.skip('unarchive: only required params', async () => {
    const responsePromise = client.agents.unarchive('agent_01HXKD2E5NQM3T9AYWCFMGWT9Y', {
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
    const response = await client.agents.unarchive('agent_01HXKD2E5NQM3T9AYWCFMGWT9Y', {
      workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q',
    });
  });

  // Mock server tests are disabled
  test.skip('unpublish: only required params', async () => {
    const responsePromise = client.agents.unpublish('agent_01HXKD2E5NQM3T9AYWCFMGWT9Y', {
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
  test.skip('unpublish: required and optional params', async () => {
    const response = await client.agents.unpublish('agent_01HXKD2E5NQM3T9AYWCFMGWT9Y', {
      workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q',
    });
  });
});
