import Cadenya from '@cadenya/cadenya';

const client = new Cadenya({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource models', () => {
  // Mock server tests are disabled
  test.skip('retrieve: only required params', async () => {
    const responsePromise = client.models.retrieve('model_01HXKD2E5NQM3T9AYWCFKJ4GED', {
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
    const response = await client.models.retrieve('model_01HXKD2E5NQM3T9AYWCFKJ4GED', {
      workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q',
    });
  });

  // Mock server tests are disabled
  test.skip('list: only required params', async () => {
    const responsePromise = client.models.list({ workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q' });
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
    const response = await client.models.list({
      workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q',
      aiProviderKeyId: 'aiProviderKeyId',
      cursor: 'cursor',
      includeInfo: true,
      isAssigned: true,
      labels: 'labels',
      limit: 0,
      prefix: 'prefix',
      query: 'query',
      sortOrder: 'sortOrder',
      state: 'STATE_UNSPECIFIED',
    });
  });

  // Mock server tests are disabled
  test.skip('disable: only required params', async () => {
    const responsePromise = client.models.disable('model_01HXKD2E5NQM3T9AYWCFKJ4GED', {
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
  test.skip('disable: required and optional params', async () => {
    const response = await client.models.disable('model_01HXKD2E5NQM3T9AYWCFKJ4GED', {
      workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q',
    });
  });

  // Mock server tests are disabled
  test.skip('enable: only required params', async () => {
    const responsePromise = client.models.enable('model_01HXKD2E5NQM3T9AYWCFKJ4GED', {
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
  test.skip('enable: required and optional params', async () => {
    const response = await client.models.enable('model_01HXKD2E5NQM3T9AYWCFKJ4GED', {
      workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q',
    });
  });

  // Mock server tests are disabled
  test.skip('swap: only required params', async () => {
    const responsePromise = client.models.swap({ workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('swap: required and optional params', async () => {
    const response = await client.models.swap({
      workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q',
      modelSwaps: [
        {
          currentModelId: 'model_01HXKD2E5NQM3T9AYWCFKJ4GED',
          disableCurrentAfterSwap: true,
          nextModelId: 'model_01HXKD2E5NQM3T9AYWCFKJ4GED',
        },
      ],
    });
  });
});
