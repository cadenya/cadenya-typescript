import Cadenya from '@cadenya/cadenya';

const client = new Cadenya({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource workspaces', () => {
  // Mock server tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.workspaces.list();
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
      client.workspaces.list(
        {
          cursor: 'cursor',
          includeInfo: true,
          labels: 'labels',
          limit: 0,
          sortOrder: 'sortOrder',
        },
        { path: '/_unknown_nonexistent_path' },
      ),
    ).rejects.toThrow(Cadenya.NotFoundError);
  });
});
