// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Cadenya from 'cadenya';

const client = new Cadenya({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource prompts', () => {
  // Prism tests are disabled
  test.skip('create', async () => {
    const responsePromise = client.agents.prompts.create('agentId', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('retrieve: only required params', async () => {
    const responsePromise = client.agents.prompts.retrieve('id', { agentId: 'agentId' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('retrieve: required and optional params', async () => {
    const response = await client.agents.prompts.retrieve('id', { agentId: 'agentId' });
  });

  // Prism tests are disabled
  test.skip('update: only required params', async () => {
    const responsePromise = client.agents.prompts.update('id', { agentId: 'agentId' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('update: required and optional params', async () => {
    const response = await client.agents.prompts.update('id', {
      agentId: 'agentId',
      metadata: {
        id: 'id',
        accountId: 'accountId',
        actorId: 'actorId',
        callsign: 'callsign',
        externalId: 'externalId',
        labels: { foo: 'string' },
        name: 'name',
        workspaceId: 'workspaceId',
      },
      spec: { content: 'content', default: true, objectiveLabelsSelector: { foo: 'string' }, status: 0 },
      updateMask: 'updateMask',
    });
  });

  // Prism tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.agents.prompts.list('agentId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.agents.prompts.list(
        'agentId',
        { page: { cursor: 'cursor', limit: 0 } },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Cadenya.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('delete: only required params', async () => {
    const responsePromise = client.agents.prompts.delete('id', { agentId: 'agentId' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('delete: required and optional params', async () => {
    const response = await client.agents.prompts.delete('id', { agentId: 'agentId' });
  });
});
