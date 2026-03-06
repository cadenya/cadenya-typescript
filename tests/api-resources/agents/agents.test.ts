// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Cadenya from 'cadenya';

const client = new Cadenya({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource agents', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.agents.create({
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
    const response = await client.agents.create({
      metadata: {
        name: 'name',
        externalId: 'externalId',
        labels: { foo: 'string' },
      },
      spec: {
        description: 'description',
        status: 'AGENT_STATUS_UNSPECIFIED',
        variationSelectionMode: 'VARIATION_SELECTION_MODE_UNSPECIFIED',
        webhookEventsUrl: 'webhookEventsUrl',
      },
      defaultVariation: {
        metadata: {
          name: 'name',
          externalId: 'externalId',
          labels: { foo: 'string' },
        },
        spec: {
          agentDocuments: [
            {
              documentId: 'documentId',
              documentMetadata: {
                name: 'name',
                externalId: 'externalId',
                labels: { foo: 'string' },
              },
              documentNamespaceId: 'documentNamespaceId',
              documentNamespaceMetadata: {
                name: 'name',
                externalId: 'externalId',
                labels: { foo: 'string' },
              },
            },
          ],
          agentTools: [
            {
              agentId: 'agentId',
              agentMetadata: {
                name: 'name',
                externalId: 'externalId',
                labels: { foo: 'string' },
              },
              toolId: 'toolId',
              toolMetadata: {
                name: 'name',
                externalId: 'externalId',
                labels: { foo: 'string' },
              },
              toolSetId: 'toolSetId',
              toolSetMetadata: {
                name: 'name',
                externalId: 'externalId',
                labels: { foo: 'string' },
              },
            },
          ],
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
      },
    });
  });

  // Mock server tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.agents.retrieve('id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('update', async () => {
    const responsePromise = client.agents.update('id', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.agents.list();
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
        {
          cursor: 'cursor',
          label: ['string'],
          limit: 0,
          prefix: 'prefix',
          sortOrder: 'sortOrder',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Cadenya.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('delete', async () => {
    const responsePromise = client.agents.delete('id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
