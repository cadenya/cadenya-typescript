import Cadenya from '@cadenya/cadenya';

const client = new Cadenya({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource variations', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.agents.variations.create('agent_01HXKD2E5NQM3T9AYWCFMGWT9Y', {
      workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q',
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
    const response = await client.agents.variations.create('agent_01HXKD2E5NQM3T9AYWCFMGWT9Y', {
      workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q',
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
    });
  });

  // Mock server tests are disabled
  test.skip('retrieve: only required params', async () => {
    const responsePromise = client.agents.variations.retrieve(
      'agent_01HXKD2E5NQM3T9AYWCFMGWT9Y',
      'agentvar_01HXKD2E5NQM3T9AYWCF32BSPP',
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
    const response = await client.agents.variations.retrieve(
      'agent_01HXKD2E5NQM3T9AYWCFMGWT9Y',
      'agentvar_01HXKD2E5NQM3T9AYWCF32BSPP',
      { workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q' },
    );
  });

  // Mock server tests are disabled
  test.skip('update: only required params', async () => {
    const responsePromise = client.agents.variations.update(
      'agent_01HXKD2E5NQM3T9AYWCFMGWT9Y',
      'agentvar_01HXKD2E5NQM3T9AYWCF32BSPP',
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
    const response = await client.agents.variations.update(
      'agent_01HXKD2E5NQM3T9AYWCFMGWT9Y',
      'agentvar_01HXKD2E5NQM3T9AYWCF32BSPP',
      {
        workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q',
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
        updateMask: 'updateMask',
      },
    );
  });

  // Mock server tests are disabled
  test.skip('list: only required params', async () => {
    const responsePromise = client.agents.variations.list('agent_01HXKD2E5NQM3T9AYWCFMGWT9Y', {
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
    const response = await client.agents.variations.list('agent_01HXKD2E5NQM3T9AYWCFMGWT9Y', {
      workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q',
      cursor: 'cursor',
      includeInfo: true,
      labels: 'labels',
      limit: 0,
      sortOrder: 'sortOrder',
    });
  });

  // Mock server tests are disabled
  test.skip('delete: only required params', async () => {
    const responsePromise = client.agents.variations.delete(
      'agent_01HXKD2E5NQM3T9AYWCFMGWT9Y',
      'agentvar_01HXKD2E5NQM3T9AYWCF32BSPP',
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
    const response = await client.agents.variations.delete(
      'agent_01HXKD2E5NQM3T9AYWCFMGWT9Y',
      'agentvar_01HXKD2E5NQM3T9AYWCF32BSPP',
      { workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q' },
    );
  });

  // Mock server tests are disabled
  test.skip('addAssignment: only required params', async () => {
    const responsePromise = client.agents.variations.addAssignment(
      'agent_01HXKD2E5NQM3T9AYWCFMGWT9Y',
      'agentvar_01HXKD2E5NQM3T9AYWCF32BSPP',
      {
        workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q',
        toolId: 'tool_01HXKD2E5NQM3T9AYWCFWVYY9K',
        type: 'toolId',
      },
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
  test.skip('addAssignment: required and optional params', async () => {
    const response = await client.agents.variations.addAssignment(
      'agent_01HXKD2E5NQM3T9AYWCFMGWT9Y',
      'agentvar_01HXKD2E5NQM3T9AYWCF32BSPP',
      {
        workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q',
        toolId: 'tool_01HXKD2E5NQM3T9AYWCFWVYY9K',
        type: 'toolId',
      },
    );
  });

  // Mock server tests are disabled
  test.skip('addMemoryLayer: only required params', async () => {
    const responsePromise = client.agents.variations.addMemoryLayer(
      'agent_01HXKD2E5NQM3T9AYWCFMGWT9Y',
      'agentvar_01HXKD2E5NQM3T9AYWCF32BSPP',
      {
        workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q',
        memoryLayerId: 'memlyr_01HXKD2E5NQM3T9AYWCFFFBMJH',
      },
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
  test.skip('addMemoryLayer: required and optional params', async () => {
    const response = await client.agents.variations.addMemoryLayer(
      'agent_01HXKD2E5NQM3T9AYWCFMGWT9Y',
      'agentvar_01HXKD2E5NQM3T9AYWCF32BSPP',
      {
        workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q',
        memoryLayerId: 'memlyr_01HXKD2E5NQM3T9AYWCFFFBMJH',
        position: 0,
      },
    );
  });

  // Mock server tests are disabled
  test.skip('removeAssignment: only required params', async () => {
    const responsePromise = client.agents.variations.removeAssignment(
      'agent_01HXKD2E5NQM3T9AYWCFMGWT9Y',
      'agentvar_01HXKD2E5NQM3T9AYWCF32BSPP',
      'avt_01HXKD2E5NQM3T9AYWCFJE6K89',
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
  test.skip('removeAssignment: required and optional params', async () => {
    const response = await client.agents.variations.removeAssignment(
      'agent_01HXKD2E5NQM3T9AYWCFMGWT9Y',
      'agentvar_01HXKD2E5NQM3T9AYWCF32BSPP',
      'avt_01HXKD2E5NQM3T9AYWCFJE6K89',
      { workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q' },
    );
  });

  // Mock server tests are disabled
  test.skip('removeMemoryLayer: only required params', async () => {
    const responsePromise = client.agents.variations.removeMemoryLayer(
      'agent_01HXKD2E5NQM3T9AYWCFMGWT9Y',
      'agentvar_01HXKD2E5NQM3T9AYWCF32BSPP',
      'avml_01HXKD2E5NQM3T9AYWCFX8AF59',
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
  test.skip('removeMemoryLayer: required and optional params', async () => {
    const response = await client.agents.variations.removeMemoryLayer(
      'agent_01HXKD2E5NQM3T9AYWCFMGWT9Y',
      'agentvar_01HXKD2E5NQM3T9AYWCF32BSPP',
      'avml_01HXKD2E5NQM3T9AYWCFX8AF59',
      { workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q' },
    );
  });

  // Mock server tests are disabled
  test.skip('updateMemoryLayer: only required params', async () => {
    const responsePromise = client.agents.variations.updateMemoryLayer(
      'agent_01HXKD2E5NQM3T9AYWCFMGWT9Y',
      'agentvar_01HXKD2E5NQM3T9AYWCF32BSPP',
      'avml_01HXKD2E5NQM3T9AYWCFX8AF59',
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
  test.skip('updateMemoryLayer: required and optional params', async () => {
    const response = await client.agents.variations.updateMemoryLayer(
      'agent_01HXKD2E5NQM3T9AYWCFMGWT9Y',
      'agentvar_01HXKD2E5NQM3T9AYWCF32BSPP',
      'avml_01HXKD2E5NQM3T9AYWCFX8AF59',
      { workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q', position: 0 },
    );
  });
});
