import Cadenya from '@cadenya/cadenya';

const client = new Cadenya({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource schedules', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.agents.schedules.create('agent_01HXKD2E5NQM3T9AYWCFMGWT9Y', {
      workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q',
      metadata: { name: 'name' },
      spec: { schedule: {} },
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
    const response = await client.agents.schedules.create('agent_01HXKD2E5NQM3T9AYWCFMGWT9Y', {
      workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q',
      metadata: {
        name: 'name',
        externalId: 'externalId',
        labels: { foo: 'string' },
      },
      spec: {
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
        firstUserMessage: 'firstUserMessage',
        firstUserMessageData: {},
        overlapPolicy: 'OVERLAP_POLICY_UNSPECIFIED',
        systemPromptData: {},
        variationId: 'agentvar_01HXKD2E5NQM3T9AYWCF32BSPP',
      },
    });
  });

  // Mock server tests are disabled
  test.skip('retrieve: only required params', async () => {
    const responsePromise = client.agents.schedules.retrieve(
      'agent_01HXKD2E5NQM3T9AYWCFMGWT9Y',
      'as_01HXKD2E5NQM3T9AYWCFMZZZBD',
      { workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q' },
    );
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
    const response = await client.agents.schedules.retrieve(
      'agent_01HXKD2E5NQM3T9AYWCFMGWT9Y',
      'as_01HXKD2E5NQM3T9AYWCFMZZZBD',
      { workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q' },
    );
  });

  // Mock server tests are disabled
  test.skip('update: only required params', async () => {
    const responsePromise = client.agents.schedules.update(
      'agent_01HXKD2E5NQM3T9AYWCFMGWT9Y',
      'as_01HXKD2E5NQM3T9AYWCFMZZZBD',
      { workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q' },
    );
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
    const response = await client.agents.schedules.update(
      'agent_01HXKD2E5NQM3T9AYWCFMGWT9Y',
      'as_01HXKD2E5NQM3T9AYWCFMZZZBD',
      {
        workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q',
        metadata: {
          name: 'name',
          externalId: 'externalId',
          labels: { foo: 'string' },
        },
        spec: {
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
          firstUserMessage: 'firstUserMessage',
          firstUserMessageData: {},
          overlapPolicy: 'OVERLAP_POLICY_UNSPECIFIED',
          systemPromptData: {},
          variationId: 'agentvar_01HXKD2E5NQM3T9AYWCF32BSPP',
        },
        updateMask: 'updateMask',
      },
    );
  });

  // Mock server tests are disabled
  test.skip('list: only required params', async () => {
    const responsePromise = client.agents.schedules.list('agent_01HXKD2E5NQM3T9AYWCFMGWT9Y', {
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
    const response = await client.agents.schedules.list('agent_01HXKD2E5NQM3T9AYWCFMGWT9Y', {
      workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q',
      cursor: 'cursor',
      includeInfo: true,
      labels: 'labels',
      limit: 0,
      prefix: 'prefix',
      query: 'query',
      sortOrder: 'sortOrder',
    });
  });

  // Mock server tests are disabled
  test.skip('delete: only required params', async () => {
    const responsePromise = client.agents.schedules.delete(
      'agent_01HXKD2E5NQM3T9AYWCFMGWT9Y',
      'as_01HXKD2E5NQM3T9AYWCFMZZZBD',
      { workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q' },
    );
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
    const response = await client.agents.schedules.delete(
      'agent_01HXKD2E5NQM3T9AYWCFMGWT9Y',
      'as_01HXKD2E5NQM3T9AYWCFMZZZBD',
      { workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q' },
    );
  });

  // Mock server tests are disabled
  test.skip('archive: only required params', async () => {
    const responsePromise = client.agents.schedules.archive(
      'agent_01HXKD2E5NQM3T9AYWCFMGWT9Y',
      'as_01HXKD2E5NQM3T9AYWCFMZZZBD',
      { workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q' },
    );
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('archive: required and optional params', async () => {
    const response = await client.agents.schedules.archive(
      'agent_01HXKD2E5NQM3T9AYWCFMGWT9Y',
      'as_01HXKD2E5NQM3T9AYWCFMZZZBD',
      { workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q' },
    );
  });

  // Mock server tests are disabled
  test.skip('pause: only required params', async () => {
    const responsePromise = client.agents.schedules.pause(
      'agent_01HXKD2E5NQM3T9AYWCFMGWT9Y',
      'as_01HXKD2E5NQM3T9AYWCFMZZZBD',
      { workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q' },
    );
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('pause: required and optional params', async () => {
    const response = await client.agents.schedules.pause(
      'agent_01HXKD2E5NQM3T9AYWCFMGWT9Y',
      'as_01HXKD2E5NQM3T9AYWCFMZZZBD',
      { workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q' },
    );
  });

  // Mock server tests are disabled
  test.skip('resume: only required params', async () => {
    const responsePromise = client.agents.schedules.resume(
      'agent_01HXKD2E5NQM3T9AYWCFMGWT9Y',
      'as_01HXKD2E5NQM3T9AYWCFMZZZBD',
      { workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q' },
    );
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('resume: required and optional params', async () => {
    const response = await client.agents.schedules.resume(
      'agent_01HXKD2E5NQM3T9AYWCFMGWT9Y',
      'as_01HXKD2E5NQM3T9AYWCFMZZZBD',
      { workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q' },
    );
  });
});
