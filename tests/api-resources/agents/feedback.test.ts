// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Cadenya from '@cadenya/cadenya';

const client = new Cadenya({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource feedback', () => {
  // Mock server tests are disabled
  test.skip('list: only required params', async () => {
    const responsePromise = client.agents.feedback.list('agentId', { workspaceId: 'workspaceId' });
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
    const response = await client.agents.feedback.list('agentId', {
      workspaceId: 'workspaceId',
      agentVariationId: 'agentVariationId',
      createdAfter: '2019-12-27T18:11:19.117Z',
      createdBefore: '2019-12-27T18:11:19.117Z',
      cursor: 'cursor',
      includeInfo: true,
      labels: 'labels',
      limit: 0,
      query: 'query',
      sentiment: 'FEEDBACK_SENTIMENT_UNSPECIFIED',
    });
  });
});
