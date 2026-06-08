// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Cadenya from '@cadenya/cadenya';

const client = new Cadenya({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource toolCalls', () => {
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
      includeInfo: true,
      limit: 0,
      status: 'TOOL_CALL_STATUS_UNSPECIFIED',
    });
  });

  // Mock server tests are disabled
  test.skip('approve: only required params', async () => {
    const responsePromise = client.objectives.toolCalls.approve('toolCallId', {
      workspaceId: 'workspaceId',
      objectiveId: 'objectiveId',
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
    const response = await client.objectives.toolCalls.approve('toolCallId', {
      workspaceId: 'workspaceId',
      objectiveId: 'objectiveId',
    });
  });

  // Mock server tests are disabled
  test.skip('deny: only required params', async () => {
    const responsePromise = client.objectives.toolCalls.deny('toolCallId', {
      workspaceId: 'workspaceId',
      objectiveId: 'objectiveId',
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
    const response = await client.objectives.toolCalls.deny('toolCallId', {
      workspaceId: 'workspaceId',
      objectiveId: 'objectiveId',
      memo: 'memo',
    });
  });
});
