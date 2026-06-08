// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Cadenya from '@cadenya/cadenyafake';

const client = new Cadenya({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource schedules', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.agents.schedules.create('agentId', {
      workspaceId: 'workspaceId',
      metadata: { name: 'name' },
      spec: {
        initialMessage: 'initialMessage',
        schedule: {},
      },
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
    const response = await client.agents.schedules.create('agentId', {
      workspaceId: 'workspaceId',
      metadata: {
        name: 'name',
        bundleKey: 'bundleKey',
        externalId: 'externalId',
        labels: { foo: 'string' },
      },
      spec: {
        initialMessage: 'initialMessage',
        schedule: {
          calendars: [
            {
              comment: 'comment',
              dayOfMonth: [
                {
                  end: 0,
                  start: 0,
                  step: 0,
                },
              ],
              dayOfWeek: [
                {
                  end: 0,
                  start: 0,
                  step: 0,
                },
              ],
              hour: [
                {
                  end: 0,
                  start: 0,
                  step: 0,
                },
              ],
              minute: [
                {
                  end: 0,
                  start: 0,
                  step: 0,
                },
              ],
              month: [
                {
                  end: 0,
                  start: 0,
                  step: 0,
                },
              ],
              second: [
                {
                  end: 0,
                  start: 0,
                  step: 0,
                },
              ],
            },
          ],
          intervals: [{ every: '-160513s', offset: '-160513s' }],
          timezone: 'timezone',
        },
        data: {},
        overlapPolicy: 'OVERLAP_POLICY_UNSPECIFIED',
        status: 'AGENT_SCHEDULE_STATUS_UNSPECIFIED',
        variationId: 'variationId',
      },
    });
  });

  // Mock server tests are disabled
  test.skip('retrieve: only required params', async () => {
    const responsePromise = client.agents.schedules.retrieve('id', {
      workspaceId: 'workspaceId',
      agentId: 'agentId',
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
    const response = await client.agents.schedules.retrieve('id', {
      workspaceId: 'workspaceId',
      agentId: 'agentId',
    });
  });

  // Mock server tests are disabled
  test.skip('update: only required params', async () => {
    const responsePromise = client.agents.schedules.update('id', {
      workspaceId: 'workspaceId',
      agentId: 'agentId',
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
  test.skip('update: required and optional params', async () => {
    const response = await client.agents.schedules.update('id', {
      workspaceId: 'workspaceId',
      agentId: 'agentId',
      metadata: {
        name: 'name',
        bundleKey: 'bundleKey',
        externalId: 'externalId',
        labels: { foo: 'string' },
      },
      spec: {
        initialMessage: 'initialMessage',
        schedule: {
          calendars: [
            {
              comment: 'comment',
              dayOfMonth: [
                {
                  end: 0,
                  start: 0,
                  step: 0,
                },
              ],
              dayOfWeek: [
                {
                  end: 0,
                  start: 0,
                  step: 0,
                },
              ],
              hour: [
                {
                  end: 0,
                  start: 0,
                  step: 0,
                },
              ],
              minute: [
                {
                  end: 0,
                  start: 0,
                  step: 0,
                },
              ],
              month: [
                {
                  end: 0,
                  start: 0,
                  step: 0,
                },
              ],
              second: [
                {
                  end: 0,
                  start: 0,
                  step: 0,
                },
              ],
            },
          ],
          intervals: [{ every: '-160513s', offset: '-160513s' }],
          timezone: 'timezone',
        },
        data: {},
        overlapPolicy: 'OVERLAP_POLICY_UNSPECIFIED',
        status: 'AGENT_SCHEDULE_STATUS_UNSPECIFIED',
        variationId: 'variationId',
      },
      updateMask: 'updateMask',
    });
  });

  // Mock server tests are disabled
  test.skip('list: only required params', async () => {
    const responsePromise = client.agents.schedules.list('agentId', { workspaceId: 'workspaceId' });
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
    const response = await client.agents.schedules.list('agentId', {
      workspaceId: 'workspaceId',
      bundleKey: 'bundleKey',
      cursor: 'cursor',
      includeInfo: true,
      limit: 0,
      prefix: 'prefix',
      query: 'query',
      sortOrder: 'sortOrder',
    });
  });

  // Mock server tests are disabled
  test.skip('delete: only required params', async () => {
    const responsePromise = client.agents.schedules.delete('id', {
      workspaceId: 'workspaceId',
      agentId: 'agentId',
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
    const response = await client.agents.schedules.delete('id', {
      workspaceId: 'workspaceId',
      agentId: 'agentId',
    });
  });
});
