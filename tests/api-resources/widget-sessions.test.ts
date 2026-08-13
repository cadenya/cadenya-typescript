import Cadenya from '@cadenya/cadenya';

const client = new Cadenya({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource widgetSessions', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.widgetSessions.create({
      workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q',
      spec: { widgetId: 'wgt_01HXKD2E5NQM3T9AYWCFMZZZBD', token: 'token' },
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
    const response = await client.widgetSessions.create({
      workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q',
      spec: {
        widgetId: 'wgt_01HXKD2E5NQM3T9AYWCFMZZZBD',
        token: 'token',
        expiresAt: '2019-12-27T18:11:19.117Z',
        pinnedParameters: { foo: 'string' },
        subject: { id: 'customer-user-42', name: 'Jane Doe' },
        tenant: { id: 'acme-corp', name: 'Acme Corp' },
      },
      metadata: {
        externalId: 'externalId',
        labels: { foo: 'string' },
      },
      secrets: [{ name: 'name', value: 'value' }],
    });
  });

  // Mock server tests are disabled
  test.skip('retrieve: only required params', async () => {
    const responsePromise = client.widgetSessions.retrieve('id', {
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
    const response = await client.widgetSessions.retrieve('id', {
      workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q',
    });
  });

  // Mock server tests are disabled
  test.skip('list: only required params', async () => {
    const responsePromise = client.widgetSessions.list({
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
    const response = await client.widgetSessions.list({
      workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q',
      cursor: 'cursor',
      includeInfo: true,
      labels: 'labels',
      limit: 0,
      sortOrder: 'sortOrder',
      state: 'STATE_UNSPECIFIED',
      subjectId: 'subjectId',
      tenantId: 'tenantId',
      widgetId: 'widgetId',
    });
  });

  // Mock server tests are disabled
  test.skip('delete: only required params', async () => {
    const responsePromise = client.widgetSessions.delete('id', {
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
    const response = await client.widgetSessions.delete('id', {
      workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q',
    });
  });

  // Mock server tests are disabled
  test.skip('deleteTenant: only required params', async () => {
    const responsePromise = client.widgetSessions.deleteTenant({
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
  test.skip('deleteTenant: required and optional params', async () => {
    const response = await client.widgetSessions.deleteTenant({
      workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q',
      tenantId: 'tenantId',
    });
  });

  // Mock server tests are disabled
  test.skip('revoke: only required params', async () => {
    const responsePromise = client.widgetSessions.revoke('id', {
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
  test.skip('revoke: required and optional params', async () => {
    const response = await client.widgetSessions.revoke('id', {
      workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q',
    });
  });
});
