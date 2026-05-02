// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

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
      '{"data":{"agent":{"id":"id","accountId":"accountId","createdAt":"2019-12-27T18:11:19.117Z","name":"name","profileId":"profileId","workspaceId":"workspaceId","bundleKey":"bundleKey","externalId":"externalId","labels":{"foo":"string"}},"agentVariation":{"id":"id","accountId":"accountId","createdAt":"2019-12-27T18:11:19.117Z","name":"name","profileId":"profileId","workspaceId":"workspaceId","bundleKey":"bundleKey","externalId":"externalId","labels":{"foo":"string"}},"objective":{"id":"id","accountId":"accountId","createdAt":"2019-12-27T18:11:19.117Z","profileId":"profileId","workspaceId":"workspaceId","externalId":"externalId","labels":{"foo":"string"}},"objectiveEvent":{"data":{"assistantMessage":{"content":"content","toolCalls":[{"arguments":"arguments","functionName":"functionName","tool":{"agent":{"id":"id","accountId":"accountId","createdAt":"2019-12-27T18:11:19.117Z","name":"name","profileId":"profileId","workspaceId":"workspaceId","bundleKey":"bundleKey","externalId":"externalId","labels":{"foo":"string"}},"cadenyaProvidedTool":{"id":"id","accountId":"accountId","createdAt":"2019-12-27T18:11:19.117Z","name":"name","profileId":"profileId","workspaceId":"workspaceId","bundleKey":"bundleKey","externalId":"externalId","labels":{"foo":"string"}},"tool":{"id":"id","accountId":"accountId","createdAt":"2019-12-27T18:11:19.117Z","name":"name","profileId":"profileId","workspaceId":"workspaceId","bundleKey":"bundleKey","externalId":"externalId","labels":{"foo":"string"}}}}]},"cancelled":{"message":"message"},"contextWindowCompacted":{"messagesCompacted":0,"newContextWindow":{"completionTokens":0,"objectiveId":"objectiveId","previousWindowContinueInstructions":"previousWindowContinueInstructions","promptTokens":0,"sequence":0},"strategies":["string"],"summary":"summary"},"error":{"message":"message","type":"type"},"memoryRead":{"memoryEntryId":"memoryEntryId","memoryLayerId":"memoryLayerId","message":"message"},"subObjectiveCreated":{"metadata":{"id":"id","accountId":"accountId","createdAt":"2019-12-27T18:11:19.117Z","profileId":"profileId","workspaceId":"workspaceId","externalId":"externalId","labels":{"foo":"string"}}},"toolApprovalRequested":{"toolCallId":"toolCallId"},"toolApproved":{"toolCallId":"toolCallId"},"toolCalled":{"toolCallId":"toolCallId"},"toolDenied":{"memo":"memo","toolCallId":"toolCallId"},"toolError":{"message":"message","toolCallId":"toolCallId"},"toolResult":{"content":"content","toolCallId":"toolCallId"},"type":"type","userMessage":{"content":"content"}},"metadata":{"id":"id","accountId":"accountId","createdAt":"2019-12-27T18:11:19.117Z","profileId":"profileId","workspaceId":"workspaceId","externalId":"externalId","labels":{"foo":"string"}},"contextWindowId":"contextWindowId","info":{"createdBy":{"metadata":{"id":"id","accountId":"accountId","name":"name","profileId":"profileId","externalId":"externalId","labels":{"foo":"string"}},"spec":{"type":"PROFILE_TYPE_USER","email":"email","name":"name"}},"objective":{"id":"id","accountId":"accountId","createdAt":"2019-12-27T18:11:19.117Z","profileId":"profileId","workspaceId":"workspaceId","externalId":"externalId","labels":{"foo":"string"}}}}},"timestamp":"2019-12-27T18:11:19.117Z","type":"type"}';
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
