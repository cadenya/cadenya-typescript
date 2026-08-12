import { Webhook } from 'standardwebhooks';

import Cadenya from '@cadenya/cadenya';

const client = new Cadenya({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource webhooks', () => {
  test.skip('unwrap', () => {
    const key = 'whsec_c2VjcmV0Cg==';
    const payload =
      '{"data":{"agent":{"id":"id","accountId":"account_01HXKD2E5NQM3T9AYWCFTJHJVF","createdAt":"2019-12-27T18:11:19.117Z","name":"name","profileId":"profile_01HXKD2E5NQM3T9AYWCFS0AP08","workspaceId":"workspace_01HXKD2E5NQM3T9AYWCF133E3Q","externalId":"externalId","labels":{"foo":"string"},"updatedAt":"2019-12-27T18:11:19.117Z"},"agentVariation":{"id":"id","accountId":"account_01HXKD2E5NQM3T9AYWCFTJHJVF","createdAt":"2019-12-27T18:11:19.117Z","name":"name","profileId":"profile_01HXKD2E5NQM3T9AYWCFS0AP08","workspaceId":"workspace_01HXKD2E5NQM3T9AYWCF133E3Q","externalId":"externalId","labels":{"foo":"string"},"updatedAt":"2019-12-27T18:11:19.117Z"},"objective":{"id":"id","accountId":"account_01HXKD2E5NQM3T9AYWCFTJHJVF","createdAt":"2019-12-27T18:11:19.117Z","profileId":"profile_01HXKD2E5NQM3T9AYWCFS0AP08","workspaceId":"workspace_01HXKD2E5NQM3T9AYWCF133E3Q","externalId":"externalId","labels":{"foo":"string"}},"objectiveEvent":{"data":{"type":"userMessage","userMessage":{"content":"content"}},"metadata":{"id":"id","accountId":"account_01HXKD2E5NQM3T9AYWCFTJHJVF","createdAt":"2019-12-27T18:11:19.117Z","profileId":"profile_01HXKD2E5NQM3T9AYWCFS0AP08","workspaceId":"workspace_01HXKD2E5NQM3T9AYWCF133E3Q","externalId":"externalId","labels":{"foo":"string"}},"contextWindowId":"objwin_01HXKD2E5NQM3T9AYWCFN7BSTR","duration":"-160513s","info":{"createdBy":{"metadata":{"id":"id","accountId":"account_01HXKD2E5NQM3T9AYWCFTJHJVF","name":"name","profileId":"profile_01HXKD2E5NQM3T9AYWCFS0AP08","createdAt":"2019-12-27T18:11:19.117Z","externalId":"externalId","labels":{"foo":"string"}},"spec":{"type":"PROFILE_TYPE_UNSPECIFIED","email":"email","name":"name"}},"objective":{"id":"id","accountId":"account_01HXKD2E5NQM3T9AYWCFTJHJVF","createdAt":"2019-12-27T18:11:19.117Z","profileId":"profile_01HXKD2E5NQM3T9AYWCFS0AP08","workspaceId":"workspace_01HXKD2E5NQM3T9AYWCF133E3Q","externalId":"externalId","labels":{"foo":"string"}}},"startedAt":"2019-12-27T18:11:19.117Z"}},"timestamp":"2019-12-27T18:11:19.117Z","type":"type"}';
    const msgID = '1';
    const timestamp = new Date();
    const wh = new Webhook('whsec_c2VjcmV0Cg==');
    const signature = wh.sign(msgID, timestamp, payload);
    const headers: Record<string, string> = {
      'webhook-signature': signature,
      'webhook-id': msgID,
      'webhook-timestamp': String(Math.floor(timestamp.getTime() / 1000)),
    };
    client.webhooks.unwrap(payload, { headers, key });
    client.withOptions({ webhookKey: key }).webhooks.unwrap(payload, { headers });
    client.withOptions({ webhookKey: 'whsec_aaaaaaaaaa==' }).webhooks.unwrap(payload, { headers, key });
    expect(() => {
      const wrongKey = 'whsec_aaaaaaaaaa==';
      client.webhooks.unwrap(payload, { headers, key: wrongKey });
    }).toThrow('No matching signature found');
    expect(() => {
      const wrongKey = 'whsec_aaaaaaaaaa==';
      client.withOptions({ webhookKey: wrongKey }).webhooks.unwrap(payload, { headers });
    }).toThrow('No matching signature found');
    expect(() => {
      const badSig = wh.sign(msgID, timestamp, 'some other payload');
      client.webhooks.unwrap(payload, { headers: { ...headers, 'webhook-signature': badSig }, key });
    }).toThrow('No matching signature found');
    expect(() => {
      const badSig = wh.sign(msgID, timestamp, 'some other payload');
      client
        .withOptions({ webhookKey: key })
        .webhooks.unwrap(payload, { headers: { ...headers, 'webhook-signature': badSig } });
    }).toThrow('No matching signature found');
    expect(() => {
      client.webhooks.unwrap(payload, { headers: { ...headers, 'webhook-timestamp': '5' }, key });
    }).toThrow('Message timestamp too old');
    expect(() => {
      client
        .withOptions({ webhookKey: key })
        .webhooks.unwrap(payload, { headers: { ...headers, 'webhook-timestamp': '5' } });
    }).toThrow('Message timestamp too old');
    expect(() => {
      client.webhooks.unwrap(payload, { headers: { ...headers, 'webhook-id': 'wrong' }, key });
    }).toThrow('No matching signature found');
    expect(() => {
      client
        .withOptions({ webhookKey: key })
        .webhooks.unwrap(payload, { headers: { ...headers, 'webhook-id': 'wrong' } });
    }).toThrow('No matching signature found');
  });
});
