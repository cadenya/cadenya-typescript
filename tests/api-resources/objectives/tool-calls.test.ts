// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Cadenya from '@cadenya/cadenya';

const client = new Cadenya({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource toolCalls', () => {
  // Mock server tests are disabled
  test.skip('retrieve: only required params', async () => {
    const responsePromise = client.objectives.toolCalls.retrieve('objectiveId', 'toolCallId', {
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
  test.skip('retrieve: required and optional params', async () => {
    const response = await client.objectives.toolCalls.retrieve('objectiveId', 'toolCallId', {
      workspaceId: 'workspaceId',
    });
  });

  // Mock server tests are disabled
  test.skip('list: only required params', async () => {
    const responsePromise = client.objectives.toolCalls.list('objectiveId', { workspaceId: 'workspaceId' });
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
    const response = await client.objectives.toolCalls.list('objectiveId', {
      workspaceId: 'workspaceId',
      cursor: 'cursor',
      executionStatus: 'TOOL_CALL_EXECUTION_STATUS_UNSPECIFIED',
      includeInfo: true,
      labels: 'labels',
      limit: 0,
      status: 'TOOL_CALL_STATUS_UNSPECIFIED',
    });
  });

  // Mock server tests are disabled
  test.skip('approve: only required params', async () => {
    const responsePromise = client.objectives.toolCalls.approve('objectiveId', 'toolCallId', {
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
  test.skip('approve: required and optional params', async () => {
    const response = await client.objectives.toolCalls.approve('objectiveId', 'toolCallId', {
      workspaceId: 'workspaceId',
    });
  });

  // Mock server tests are disabled
  test.skip('deny: only required params', async () => {
    const responsePromise = client.objectives.toolCalls.deny('objectiveId', 'toolCallId', {
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
  test.skip('deny: required and optional params', async () => {
    const response = await client.objectives.toolCalls.deny('objectiveId', 'toolCallId', {
      workspaceId: 'workspaceId',
      memo: 'memo',
    });
  });

  // Mock server tests are disabled
  test.skip('setContent: only required params', async () => {
    const responsePromise = client.objectives.toolCalls.setContent('objectiveId', 'toolCallId', {
      workspaceId: 'workspaceId',
      content: [{}],
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
  test.skip('setContent: required and optional params', async () => {
    const response = await client.objectives.toolCalls.setContent('objectiveId', 'toolCallId', {
      workspaceId: 'workspaceId',
      content: [
        {
          audio: { data: 'data', mimeType: 'mimeType' },
          image: { data: 'data', mimeType: 'mimeType' },
          text: { text: 'text' },
          type: 'type',
        },
      ],
    });
  });
});
