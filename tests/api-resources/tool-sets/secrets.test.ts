// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Cadenya from '@cadenya/cadenya';

const client = new Cadenya({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource secrets', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.toolSets.secrets.create('toolset_01HXKD2E5NQM3T9AYWCFNRMN74', {
      workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q',
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
    const response = await client.toolSets.secrets.create('toolset_01HXKD2E5NQM3T9AYWCFNRMN74', {
      workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q',
      metadata: {
        name: 'name',
        externalId: 'externalId',
        labels: { foo: 'string' },
      },
      spec: { value: 'value' },
    });
  });

  // Mock server tests are disabled
  test.skip('retrieve: only required params', async () => {
    const responsePromise = client.toolSets.secrets.retrieve(
      'toolset_01HXKD2E5NQM3T9AYWCFNRMN74',
      'toolsecret_01HXKD2E5NQM3T9AYWCF8PWC4R',
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
    const response = await client.toolSets.secrets.retrieve(
      'toolset_01HXKD2E5NQM3T9AYWCFNRMN74',
      'toolsecret_01HXKD2E5NQM3T9AYWCF8PWC4R',
      { workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q' },
    );
  });

  // Mock server tests are disabled
  test.skip('update: only required params', async () => {
    const responsePromise = client.toolSets.secrets.update(
      'toolset_01HXKD2E5NQM3T9AYWCFNRMN74',
      'toolsecret_01HXKD2E5NQM3T9AYWCF8PWC4R',
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
    const response = await client.toolSets.secrets.update(
      'toolset_01HXKD2E5NQM3T9AYWCFNRMN74',
      'toolsecret_01HXKD2E5NQM3T9AYWCF8PWC4R',
      {
        workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q',
        metadata: {
          name: 'name',
          externalId: 'externalId',
          labels: { foo: 'string' },
        },
        spec: { value: 'value' },
        updateMask: 'updateMask',
      },
    );
  });

  // Mock server tests are disabled
  test.skip('list: only required params', async () => {
    const responsePromise = client.toolSets.secrets.list('toolset_01HXKD2E5NQM3T9AYWCFNRMN74', {
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
    const response = await client.toolSets.secrets.list('toolset_01HXKD2E5NQM3T9AYWCFNRMN74', {
      workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q',
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
    const responsePromise = client.toolSets.secrets.delete(
      'toolset_01HXKD2E5NQM3T9AYWCFNRMN74',
      'toolsecret_01HXKD2E5NQM3T9AYWCF8PWC4R',
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
    const response = await client.toolSets.secrets.delete(
      'toolset_01HXKD2E5NQM3T9AYWCFNRMN74',
      'toolsecret_01HXKD2E5NQM3T9AYWCF8PWC4R',
      { workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q' },
    );
  });
});
