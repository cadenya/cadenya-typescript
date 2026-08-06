// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Cadenya from '@cadenya/cadenya';

const client = new Cadenya({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource feedback', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.objectives.feedback.create('obj_01HXKD2E5NQM3T9AYWCFQAZGFV', {
      workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q',
      data: {},
      metadata: {},
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
    const response = await client.objectives.feedback.create('obj_01HXKD2E5NQM3T9AYWCFQAZGFV', {
      workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q',
      data: { comment: 'comment', score: 0 },
      metadata: {
        externalId: 'externalId',
        labels: { foo: 'string' },
      },
    });
  });

  // Mock server tests are disabled
  test.skip('list: only required params', async () => {
    const responsePromise = client.objectives.feedback.list('obj_01HXKD2E5NQM3T9AYWCFQAZGFV', {
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
    const response = await client.objectives.feedback.list('obj_01HXKD2E5NQM3T9AYWCFQAZGFV', {
      workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q',
      cursor: 'cursor',
      labels: 'labels',
      limit: 0,
    });
  });
});
