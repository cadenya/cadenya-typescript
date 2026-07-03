// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Cadenya from '@cadenya/cadenya';

const client = new Cadenya({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource objectives', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.objectives.create('workspaceId', {
      agentId: 'agentId',
      data: { foo: 'bar' },
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
    const response = await client.objectives.create('workspaceId', {
      agentId: 'agentId',
      data: { foo: 'bar' },
      episodicMemory: { key: 'key' },
      initialMessage: 'initialMessage',
      memoryCascade: [{ memoryEntryId: 'memoryEntryId', memoryLayerId: 'memoryLayerId' }],
      metadata: {
        externalId: 'externalId',
        labels: { foo: 'string' },
      },
      secrets: [{ name: 'name', value: 'value' }],
      userData: { foo: 'bar' },
      variationId: 'variationId',
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
  test.skip('list', async () => {
    const responsePromise = client.objectives.list('workspaceId');
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
      client.objectives.list(
        'workspaceId',
        {
          agentId: 'agentId',
          agentScheduleId: 'agentScheduleId',
          cursor: 'cursor',
          includeInfo: true,
          limit: 0,
          parentObjectiveId: 'parentObjectiveId',
          profileId: 'profileId',
          sortOrder: 'sortOrder',
          state: 'STATE_UNSPECIFIED',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Cadenya.NotFoundError);
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
    const responsePromise = client.objectives.continue('objectiveId', { workspaceId: 'workspaceId' });
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
      enqueue: true,
      message: 'message',
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
      limit: 0,
      sinceEventId: 'sinceEventId',
      sortOrder: 'sortOrder',
      windowId: 'windowId',
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
