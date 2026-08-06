// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Cadenya from '@cadenya/cadenya';

const client = new Cadenya({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource objectives', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.objectives.create({
      workspaceId: 'workspaceId',
      agentId: 'agent_01HXKD2E5NQM3T9AYWCFMGWT9Y',
      systemPromptData: { foo: 'bar' },
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
    const response = await client.objectives.create({
      workspaceId: 'workspaceId',
      agentId: 'agent_01HXKD2E5NQM3T9AYWCFMGWT9Y',
      systemPromptData: { foo: 'bar' },
      episodicMemory: { key: 'key' },
      firstUserMessage: 'firstUserMessage',
      firstUserMessageData: { foo: 'bar' },
      memoryCascade: [
        {
          memoryLayerId: 'memlyr_01HXKD2E5NQM3T9AYWCFFFBMJH',
          memoryEntryId: 'mementry_01HXKD2E5NQM3T9AYWCF5E52Z0',
        },
      ],
      metadata: {
        externalId: 'externalId',
        labels: { foo: 'string' },
      },
      pinnedParameters: { foo: 'string' },
      secrets: [{ name: 'name', value: 'value' }],
      subject: { id: 'customer-user-42', name: 'Jane Doe' },
      tenant: { id: 'acme-corp', name: 'Acme Corp' },
      variationId: 'agentvar_01HXKD2E5NQM3T9AYWCF32BSPP',
    });
  });

  // Mock server tests are disabled
  test.skip('retrieve: only required params', async () => {
    const responsePromise = client.objectives.retrieve('id', { workspaceId: 'workspaceId' });
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
    const response = await client.objectives.retrieve('id', { workspaceId: 'workspaceId' });
  });

  // Mock server tests are disabled
  test.skip('list: only required params', async () => {
    const responsePromise = client.objectives.list({ workspaceId: 'workspaceId' });
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
    const response = await client.objectives.list({
      workspaceId: 'workspaceId',
      agentId: 'agentId',
      agentScheduleId: 'agentScheduleId',
      cursor: 'cursor',
      includeInfo: true,
      labels: 'labels',
      limit: 0,
      parentObjectiveId: 'parentObjectiveId',
      profileId: 'profileId',
      sortOrder: 'sortOrder',
      state: 'STATE_UNSPECIFIED',
      subjectId: 'subjectId',
      tenantId: 'tenantId',
      widgetId: 'widgetId',
      widgetSessionId: 'widgetSessionId',
    });
  });

  // Mock server tests are disabled
  test.skip('cancel: only required params', async () => {
    const responsePromise = client.objectives.cancel('objectiveId', { workspaceId: 'workspaceId' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('cancel: required and optional params', async () => {
    const response = await client.objectives.cancel('objectiveId', {
      workspaceId: 'workspaceId',
      reason: 'reason',
    });
  });

  // Mock server tests are disabled
  test.skip('compact: only required params', async () => {
    const responsePromise = client.objectives.compact('objectiveId', { workspaceId: 'workspaceId' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('compact: required and optional params', async () => {
    const response = await client.objectives.compact('objectiveId', {
      workspaceId: 'workspaceId',
      compactionConfig: {
        summarization: { instructions: 'instructions' },
        toolResultClearing: { preserveRecentResults: 0 },
        triggerThreshold: 0,
      },
    });
  });

  // Mock server tests are disabled
  test.skip('continue: only required params', async () => {
    const responsePromise = client.objectives.continue('objectiveId', {
      workspaceId: 'workspaceId',
      message: 'message',
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
  test.skip('continue: required and optional params', async () => {
    const response = await client.objectives.continue('objectiveId', {
      workspaceId: 'workspaceId',
      message: 'message',
      enqueue: true,
    });
  });

  // Mock server tests are disabled
  test.skip('listContextWindows: only required params', async () => {
    const responsePromise = client.objectives.listContextWindows('objectiveId', {
      workspaceId: 'workspaceId',
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
  test.skip('listContextWindows: required and optional params', async () => {
    const response = await client.objectives.listContextWindows('objectiveId', {
      workspaceId: 'workspaceId',
      cursor: 'cursor',
      includeInfo: true,
      labels: 'labels',
      limit: 0,
    });
  });

  // Mock server tests are disabled
  test.skip('listEvents: only required params', async () => {
    const responsePromise = client.objectives.listEvents('objectiveId', { workspaceId: 'workspaceId' });
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
    const response = await client.objectives.listEvents('objectiveId', {
      workspaceId: 'workspaceId',
      cursor: 'cursor',
      includeInfo: true,
      labels: 'labels',
      limit: 0,
      sinceEventId: 'sinceEventId',
      sortOrder: 'sortOrder',
      windowId: 'windowId',
    });
  });

  // Mock server tests are disabled
  test.skip('retrieveDiagnostics: only required params', async () => {
    const responsePromise = client.objectives.retrieveDiagnostics('objectiveId', {
      workspaceId: 'workspaceId',
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
  test.skip('retrieveDiagnostics: required and optional params', async () => {
    const response = await client.objectives.retrieveDiagnostics('objectiveId', {
      workspaceId: 'workspaceId',
    });
  });

  // Mock server tests are disabled
  test.skip('streamEvents: only required params', async () => {
    const responsePromise = client.objectives.streamEvents('objectiveId', { workspaceId: 'workspaceId' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('streamEvents: required and optional params', async () => {
    const response = await client.objectives.streamEvents('objectiveId', { workspaceId: 'workspaceId' });
  });
});
