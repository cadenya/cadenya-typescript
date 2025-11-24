// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Cadenya from 'cadenya';

const client = new Cadenya({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource tools', () => {
  // Prism tests are disabled
  test.skip('create', async () => {
    const responsePromise = client.toolSets.tools.create('toolSetId', {});
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
    const responsePromise = client.toolSets.tools.retrieve('id', { toolSetId: 'toolSetId' });
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
    const response = await client.toolSets.tools.retrieve('id', { toolSetId: 'toolSetId' });
  });

  // Prism tests are disabled
  test.skip('update: only required params', async () => {
    const responsePromise = client.toolSets.tools.update('id', { toolSetId: 'toolSetId' });
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
    const response = await client.toolSets.tools.update('id', {
      toolSetId: 'toolSetId',
      metadata: { externalId: 'externalId', labels: { foo: 'string' }, name: 'name' },
      spec: {
        config: {
          http: {
            headers: { foo: 'string' },
            path: 'path',
            query: 'query',
            requestBodyContentType: 'requestBodyContentType',
            requestBodyTemplate: 'requestBodyTemplate',
            requestMethod: 'GET',
          },
          mcp: { toolDescription: 'toolDescription', toolName: 'toolName', toolTitle: 'toolTitle' },
        },
        contentFilter: { jq: 'jq', regex: 'regex' },
        description: 'description',
        indexContent: 'indexContent',
        name: 'name',
        parameters: { foo: 'bar' },
        requiresApproval: true,
        status: 'TOOL_STATUS_UNSPECIFIED',
        toolSetId: 'toolSetId',
      },
      updateMask: 'updateMask',
    });
  });

  // Prism tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.toolSets.tools.list('toolSetId');
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
      client.toolSets.tools.list(
        'toolSetId',
        { cursor: 'cursor', limit: 0, sortOrder: 'sortOrder' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Cadenya.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('delete: only required params', async () => {
    const responsePromise = client.toolSets.tools.delete('id', { toolSetId: 'toolSetId' });
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
    const response = await client.toolSets.tools.delete('id', { toolSetId: 'toolSetId' });
  });
});
