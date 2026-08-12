import Cadenya from '@cadenya/cadenya';

const client = new Cadenya({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource webhookDeliveries', () => {
  // Mock server tests are disabled
  test.skip('list: only required params', async () => {
    const responsePromise = client.agents.webhookDeliveries.list('agent_01HXKD2E5NQM3T9AYWCFMGWT9Y', {
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
    const response = await client.agents.webhookDeliveries.list('agent_01HXKD2E5NQM3T9AYWCFMGWT9Y', {
      workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q',
      cursor: 'cursor',
      eventType: 'OBJECTIVE_EVENT_TYPE_UNSPECIFIED',
      labels: 'labels',
      limit: 0,
      objectiveId: 'obj_01HXKD2E5NQM3T9AYWCFQAZGFV',
    });
  });
});
