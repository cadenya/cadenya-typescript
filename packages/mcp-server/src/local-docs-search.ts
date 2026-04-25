// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import MiniSearch from 'minisearch';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { getLogger } from './logger';

type PerLanguageData = {
  method?: string;
  example?: string;
};

type MethodEntry = {
  name: string;
  endpoint: string;
  httpMethod: string;
  summary: string;
  description: string;
  stainlessPath: string;
  qualified: string;
  params?: string[];
  response?: string;
  markdown?: string;
  perLanguage?: Record<string, PerLanguageData>;
};

type ProseChunk = {
  content: string;
  tag: string;
  sectionContext?: string;
  source?: string;
};

type MiniSearchDocument = {
  id: string;
  kind: 'http_method' | 'prose';
  name?: string;
  endpoint?: string;
  summary?: string;
  description?: string;
  qualified?: string;
  stainlessPath?: string;
  content?: string;
  sectionContext?: string;
  _original: Record<string, unknown>;
};

type SearchResult = {
  results: (string | Record<string, unknown>)[];
};

const EMBEDDED_METHODS: MethodEntry[] = [
  {
    name: 'retrieve',
    endpoint: '/v1/account',
    httpMethod: 'get',
    summary: 'Retrieves the current account for the token accessing the API',
    description:
      'Retrieves the current account for the token accessing the API. Useful to check if the credentials are valid.',
    stainlessPath: '(resource) account > (method) retrieve',
    qualified: 'client.account.retrieve',
    response:
      '{ info: { webhookEventsHmacSecret?: string; }; metadata: { id: string; accountId: string; name: string; profileId: string; externalId?: string; labels?: object; }; spec: { billingEmail?: string; description?: string; domain?: string; workspaces?: workspace[]; }; }',
    markdown:
      "## retrieve\n\n`client.account.retrieve(): { info: object; metadata: account_resource_metadata; spec: account_spec; }`\n\n**get** `/v1/account`\n\nRetrieves the current account for the token accessing the API. Useful to check if the credentials are valid.\n\n### Returns\n\n- `{ info: { webhookEventsHmacSecret?: string; }; metadata: { id: string; accountId: string; name: string; profileId: string; externalId?: string; labels?: object; }; spec: { billingEmail?: string; description?: string; domain?: string; workspaces?: workspace[]; }; }`\n  Account is an account resource.\n\n  - `info: { webhookEventsHmacSecret?: string; }`\n  - `metadata: { id: string; accountId: string; name: string; profileId: string; externalId?: string; labels?: object; }`\n  - `spec: { billingEmail?: string; description?: string; domain?: string; workspaces?: { metadata: account_resource_metadata; spec: workspace_spec; }[]; }`\n\n### Example\n\n```typescript\nimport Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya();\n\nconst account = await client.account.retrieve();\n\nconsole.log(account);\n```",
    perLanguage: {
      cli: {
        method: 'account retrieve',
        example: "cadenya account retrieve \\\n  --api-key 'My API Key'",
      },
      go: {
        method: 'client.Account.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cadenya/cadenya-go"\n\t"github.com/cadenya/cadenya-go/option"\n)\n\nfunc main() {\n\tclient := cadenya.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\taccount, err := client.Account.Get(context.TODO())\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", account.Info)\n}\n',
      },
      http: {
        example:
          'curl https://api.cadenya.com/v1/account \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.account.retrieve',
        example:
          "import Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nconst account = await client.account.retrieve();\n\nconsole.log(account.info);",
      },
    },
  },
  {
    name: 'rotate_webhook_signing_key',
    endpoint: '/v1/account/rotate_webhook_signing_key',
    httpMethod: 'post',
    summary: 'Rotates the webhook signing key for the account',
    description: 'Rotates the webhook signing key for the account. Returns only the new key.',
    stainlessPath: '(resource) account > (method) rotate_webhook_signing_key',
    qualified: 'client.account.rotateWebhookSigningKey',
    response: '{ webhookEventsHmacSecret?: string; }',
    markdown:
      "## rotate_webhook_signing_key\n\n`client.account.rotateWebhookSigningKey(): { webhookEventsHmacSecret?: string; }`\n\n**post** `/v1/account/rotate_webhook_signing_key`\n\nRotates the webhook signing key for the account. Returns only the new key.\n\n### Returns\n\n- `{ webhookEventsHmacSecret?: string; }`\n  RotateWebhookEventsHmacSecretResponse is a response to a RotateWebhookEventsHmacSecretRequest.\n\n  - `webhookEventsHmacSecret?: string`\n\n### Example\n\n```typescript\nimport Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya();\n\nconst rotateWebhookSigningKeyResponse = await client.account.rotateWebhookSigningKey();\n\nconsole.log(rotateWebhookSigningKeyResponse);\n```",
    perLanguage: {
      cli: {
        method: 'account rotate_webhook_signing_key',
        example: "cadenya account rotate-webhook-signing-key \\\n  --api-key 'My API Key'",
      },
      go: {
        method: 'client.Account.RotateWebhookSigningKey',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cadenya/cadenya-go"\n\t"github.com/cadenya/cadenya-go/option"\n)\n\nfunc main() {\n\tclient := cadenya.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\trotateWebhookSigningKeyResponse, err := client.Account.RotateWebhookSigningKey(context.TODO())\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", rotateWebhookSigningKeyResponse.WebhookEventsHmacSecret)\n}\n',
      },
      http: {
        example:
          'curl https://api.cadenya.com/v1/account/rotate_webhook_signing_key \\\n    -X POST \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.account.rotateWebhookSigningKey',
        example:
          "import Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nconst rotateWebhookSigningKeyResponse = await client.account.rotateWebhookSigningKey();\n\nconsole.log(rotateWebhookSigningKeyResponse.webhookEventsHmacSecret);",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v1/agents',
    httpMethod: 'get',
    summary: 'List agents',
    description: 'Lists all agents in the workspace',
    stainlessPath: '(resource) agents > (method) list',
    qualified: 'client.agents.list',
    params: [
      'cursor?: string;',
      'includeInfo?: boolean;',
      'limit?: number;',
      'prefix?: string;',
      'query?: string;',
      'sortOrder?: string;',
    ],
    response:
      '{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { status: string; variationSelectionMode: string; description?: string; inputDataSchema?: object; webhookEventsUrl?: string; }; info?: { createdBy?: profile; variationCount?: number; }; }',
    markdown:
      "## list\n\n`client.agents.list(cursor?: string, includeInfo?: boolean, limit?: number, prefix?: string, query?: string, sortOrder?: string): { metadata: resource_metadata; spec: agent_spec; info?: agent_info; }`\n\n**get** `/v1/agents`\n\nLists all agents in the workspace\n\n### Parameters\n\n- `cursor?: string`\n  Pagination cursor from previous response\n\n- `includeInfo?: boolean`\n  When set to true you may use more of your alloted API rate-limit\n\n- `limit?: number`\n  Maximum number of results to return\n\n- `prefix?: string`\n  Filter expression (query param: prefix)\n\n- `query?: string`\n  Free-form search query\n\n- `sortOrder?: string`\n  Sort order for results (asc or desc by creation time)\n\n### Returns\n\n- `{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { status: string; variationSelectionMode: string; description?: string; inputDataSchema?: object; webhookEventsUrl?: string; }; info?: { createdBy?: profile; variationCount?: number; }; }`\n  Agent resource\n\n  - `metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `spec: { status: string; variationSelectionMode: string; description?: string; inputDataSchema?: object; webhookEventsUrl?: string; }`\n  - `info?: { createdBy?: { metadata: account_resource_metadata; spec: profile_spec; }; variationCount?: number; }`\n\n### Example\n\n```typescript\nimport Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya();\n\n// Automatically fetches more pages as needed.\nfor await (const agent of client.agents.list()) {\n  console.log(agent);\n}\n```",
    perLanguage: {
      cli: {
        method: 'agents list',
        example: "cadenya agents list \\\n  --api-key 'My API Key'",
      },
      go: {
        method: 'client.Agents.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cadenya/cadenya-go"\n\t"github.com/cadenya/cadenya-go/option"\n)\n\nfunc main() {\n\tclient := cadenya.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Agents.List(context.TODO(), cadenya.AgentListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example: 'curl https://api.cadenya.com/v1/agents \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.agents.list',
        example:
          "import Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const agent of client.agents.list()) {\n  console.log(agent.metadata);\n}",
      },
    },
  },
  {
    name: 'create',
    endpoint: '/v1/agents',
    httpMethod: 'post',
    summary: 'Create a new agent',
    description: 'Creates a new agent in the workspace',
    stainlessPath: '(resource) agents > (method) create',
    qualified: 'client.agents.create',
    params: [
      'metadata: { name: string; externalId?: string; labels?: object; };',
      'spec: { status: string; variationSelectionMode: string; description?: string; inputDataSchema?: object; webhookEventsUrl?: string; };',
      'defaultVariation?: { metadata: { name: string; externalId?: string; labels?: object; }; spec: { compactionConfig?: object; constraints?: object; description?: string; enableEpisodicMemory?: boolean; episodicMemoryTtl?: number; modelConfig?: object; progressiveDiscovery?: object; prompt?: string; weight?: number; }; agentId?: string; };',
    ],
    response:
      '{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { status: string; variationSelectionMode: string; description?: string; inputDataSchema?: object; webhookEventsUrl?: string; }; info?: { createdBy?: profile; variationCount?: number; }; }',
    markdown:
      '## create\n\n`client.agents.create(metadata: { name: string; externalId?: string; labels?: object; }, spec: { status: string; variationSelectionMode: string; description?: string; inputDataSchema?: object; webhookEventsUrl?: string; }, defaultVariation?: { metadata: object; spec: object; agentId?: string; }): { metadata: resource_metadata; spec: agent_spec; info?: agent_info; }`\n\n**post** `/v1/agents`\n\nCreates a new agent in the workspace\n\n### Parameters\n\n- `metadata: { name: string; externalId?: string; labels?: object; }`\n  CreateResourceMetadata contains the user-provided fields for creating\n a workspace-scoped resource. Read-only fields (id, account_id, workspace_id, profile_id,\n created_at) are excluded since they are set by the server.\n  - `name: string`\n    Human-readable name for the resource (e.g., "Customer Support Agent", "Email Tool")\n  - `externalId?: string`\n    External ID for the resource (e.g., a workflow ID from an external system)\n  - `labels?: object`\n    Arbitrary key-value pairs for categorization and filtering\n Examples: {"environment": "production", "team": "platform", "version": "v2"}\n\n- `spec: { status: string; variationSelectionMode: string; description?: string; inputDataSchema?: object; webhookEventsUrl?: string; }`\n  Agent specification (user-provided configuration)\n  - `status: string`\n    Status of the agent\n  - `variationSelectionMode: string`\n    Controls how variations are automatically selected when creating objectives\n Defaults to RANDOM when unspecified\n  - `description?: string`\n    Description of the agent\'s purpose\n  - `inputDataSchema?: object`\n    InputDataSchema is used for enforcing a data input when objectives are created. This is valuable when using liquid formatting in agent variation\n prompts. Input data schema is also valuable when using an agent as a sub-agent, as the schema is used as the tool\'s input parameter schema. If omitted,\n the sub-agent schema will be loaded with a simple "prompt" free text string as its schema.\n  - `webhookEventsUrl?: string`\n    The URL that Cadenya will send events for any objective assigned to the agent.\n\n- `defaultVariation?: { metadata: { name: string; externalId?: string; labels?: object; }; spec: { compactionConfig?: object; constraints?: object; description?: string; enableEpisodicMemory?: boolean; episodicMemoryTtl?: number; modelConfig?: object; progressiveDiscovery?: object; prompt?: string; weight?: number; }; agentId?: string; }`\n  Create agent variation request\n  - `metadata: { name: string; externalId?: string; labels?: object; }`\n    CreateResourceMetadata contains the user-provided fields for creating\n a workspace-scoped resource. Read-only fields (id, account_id, workspace_id, profile_id,\n created_at) are excluded since they are set by the server.\n  - `spec: { compactionConfig?: { summarization?: compaction_config_summarization_strategy; toolResultClearing?: compaction_config_tool_result_clearing_strategy; triggerThreshold?: number; }; constraints?: { maxSubObjectives?: number; maxToolCalls?: number; }; description?: string; enableEpisodicMemory?: boolean; episodicMemoryTtl?: number; modelConfig?: { modelId?: string; temperature?: number; }; progressiveDiscovery?: { hints?: string[]; maxTools?: number; rerankThreshold?: number; }; prompt?: string; weight?: number; }`\n    AgentVariationSpec defines the operational configuration for a variation\n  - `agentId?: string`\n    Agent ID (from path). Accepts canonical agent_… form or external_id:<value>\n form (see common.proto "Path-parameter ID resolution").\n\n### Returns\n\n- `{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { status: string; variationSelectionMode: string; description?: string; inputDataSchema?: object; webhookEventsUrl?: string; }; info?: { createdBy?: profile; variationCount?: number; }; }`\n  Agent resource\n\n  - `metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `spec: { status: string; variationSelectionMode: string; description?: string; inputDataSchema?: object; webhookEventsUrl?: string; }`\n  - `info?: { createdBy?: { metadata: account_resource_metadata; spec: profile_spec; }; variationCount?: number; }`\n\n### Example\n\n```typescript\nimport Cadenya from \'@cadenya/cadenya\';\n\nconst client = new Cadenya();\n\nconst agent = await client.agents.create({\n  metadata: { name: \'name\' },\n  spec: { status: \'AGENT_STATUS_UNSPECIFIED\', variationSelectionMode: \'VARIATION_SELECTION_MODE_UNSPECIFIED\' },\n});\n\nconsole.log(agent);\n```',
    perLanguage: {
      cli: {
        method: 'agents create',
        example:
          "cadenya agents create \\\n  --api-key 'My API Key' \\\n  --metadata '{name: name}' \\\n  --spec '{status: AGENT_STATUS_UNSPECIFIED, variationSelectionMode: VARIATION_SELECTION_MODE_UNSPECIFIED}'",
      },
      go: {
        method: 'client.Agents.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cadenya/cadenya-go"\n\t"github.com/cadenya/cadenya-go/option"\n\t"github.com/cadenya/cadenya-go/shared"\n)\n\nfunc main() {\n\tclient := cadenya.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tagent, err := client.Agents.New(context.TODO(), cadenya.AgentNewParams{\n\t\tMetadata: cadenya.F(shared.CreateResourceMetadataParam{\n\t\t\tName: cadenya.F("name"),\n\t\t}),\n\t\tSpec: cadenya.F(cadenya.AgentSpecParam{\n\t\t\tStatus:                 cadenya.F(cadenya.AgentSpecStatusAgentStatusUnspecified),\n\t\t\tVariationSelectionMode: cadenya.F(cadenya.AgentSpecVariationSelectionModeVariationSelectionModeUnspecified),\n\t\t}),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", agent.Metadata)\n}\n',
      },
      http: {
        example:
          'curl https://api.cadenya.com/v1/agents \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $CADENYA_API_KEY" \\\n    -d \'{\n          "metadata": {\n            "name": "name"\n          },\n          "spec": {\n            "status": "AGENT_STATUS_UNSPECIFIED",\n            "variationSelectionMode": "VARIATION_SELECTION_MODE_UNSPECIFIED"\n          }\n        }\'',
      },
      typescript: {
        method: 'client.agents.create',
        example:
          "import Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nconst agent = await client.agents.create({\n  metadata: { name: 'name' },\n  spec: {\n    status: 'AGENT_STATUS_UNSPECIFIED',\n    variationSelectionMode: 'VARIATION_SELECTION_MODE_UNSPECIFIED',\n  },\n});\n\nconsole.log(agent.metadata);",
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/v1/agents/{id}',
    httpMethod: 'get',
    summary: 'Get an agent by ID',
    description: 'Retrieves an agent by ID from the workspace',
    stainlessPath: '(resource) agents > (method) retrieve',
    qualified: 'client.agents.retrieve',
    params: ['id: string;'],
    response:
      '{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { status: string; variationSelectionMode: string; description?: string; inputDataSchema?: object; webhookEventsUrl?: string; }; info?: { createdBy?: profile; variationCount?: number; }; }',
    markdown:
      "## retrieve\n\n`client.agents.retrieve(id: string): { metadata: resource_metadata; spec: agent_spec; info?: agent_info; }`\n\n**get** `/v1/agents/{id}`\n\nRetrieves an agent by ID from the workspace\n\n### Parameters\n\n- `id: string`\n\n### Returns\n\n- `{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { status: string; variationSelectionMode: string; description?: string; inputDataSchema?: object; webhookEventsUrl?: string; }; info?: { createdBy?: profile; variationCount?: number; }; }`\n  Agent resource\n\n  - `metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `spec: { status: string; variationSelectionMode: string; description?: string; inputDataSchema?: object; webhookEventsUrl?: string; }`\n  - `info?: { createdBy?: { metadata: account_resource_metadata; spec: profile_spec; }; variationCount?: number; }`\n\n### Example\n\n```typescript\nimport Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya();\n\nconst agent = await client.agents.retrieve('id');\n\nconsole.log(agent);\n```",
    perLanguage: {
      cli: {
        method: 'agents retrieve',
        example: "cadenya agents retrieve \\\n  --api-key 'My API Key' \\\n  --id id",
      },
      go: {
        method: 'client.Agents.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cadenya/cadenya-go"\n\t"github.com/cadenya/cadenya-go/option"\n)\n\nfunc main() {\n\tclient := cadenya.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tagent, err := client.Agents.Get(context.TODO(), "id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", agent.Metadata)\n}\n',
      },
      http: {
        example:
          'curl https://api.cadenya.com/v1/agents/$ID \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.agents.retrieve',
        example:
          "import Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nconst agent = await client.agents.retrieve('id');\n\nconsole.log(agent.metadata);",
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/v1/agents/{id}',
    httpMethod: 'delete',
    summary: 'Delete an agent',
    description: 'Deletes an agent from the workspace',
    stainlessPath: '(resource) agents > (method) delete',
    qualified: 'client.agents.delete',
    params: ['id: string;'],
    markdown:
      "## delete\n\n`client.agents.delete(id: string): void`\n\n**delete** `/v1/agents/{id}`\n\nDeletes an agent from the workspace\n\n### Parameters\n\n- `id: string`\n\n### Example\n\n```typescript\nimport Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya();\n\nawait client.agents.delete('id')\n```",
    perLanguage: {
      cli: {
        method: 'agents delete',
        example: "cadenya agents delete \\\n  --api-key 'My API Key' \\\n  --id id",
      },
      go: {
        method: 'client.Agents.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/cadenya/cadenya-go"\n\t"github.com/cadenya/cadenya-go/option"\n)\n\nfunc main() {\n\tclient := cadenya.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\terr := client.Agents.Delete(context.TODO(), "id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://api.cadenya.com/v1/agents/$ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.agents.delete',
        example:
          "import Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.agents.delete('id');",
      },
    },
  },
  {
    name: 'update',
    endpoint: '/v1/agents/{id}',
    httpMethod: 'patch',
    summary: 'Update an agent',
    description: 'Updates an agent in the workspace',
    stainlessPath: '(resource) agents > (method) update',
    qualified: 'client.agents.update',
    params: [
      'id: string;',
      'metadata?: { name: string; externalId?: string; labels?: object; };',
      'spec?: { status: string; variationSelectionMode: string; description?: string; inputDataSchema?: object; webhookEventsUrl?: string; };',
      'updateMask?: string;',
    ],
    response:
      '{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { status: string; variationSelectionMode: string; description?: string; inputDataSchema?: object; webhookEventsUrl?: string; }; info?: { createdBy?: profile; variationCount?: number; }; }',
    markdown:
      '## update\n\n`client.agents.update(id: string, metadata?: { name: string; externalId?: string; labels?: object; }, spec?: { status: string; variationSelectionMode: string; description?: string; inputDataSchema?: object; webhookEventsUrl?: string; }, updateMask?: string): { metadata: resource_metadata; spec: agent_spec; info?: agent_info; }`\n\n**patch** `/v1/agents/{id}`\n\nUpdates an agent in the workspace\n\n### Parameters\n\n- `id: string`\n\n- `metadata?: { name: string; externalId?: string; labels?: object; }`\n  UpdateResourceMetadata contains the user-provided fields for updating\n a workspace-scoped resource. Read-only fields (id, account_id, workspace_id, profile_id,\n created_at) are excluded since they are set by the server.\n  - `name: string`\n    Human-readable name for the resource (e.g., "Customer Support Agent", "Email Tool")\n  - `externalId?: string`\n    External ID for the resource (e.g., a workflow ID from an external system)\n  - `labels?: object`\n    Arbitrary key-value pairs for categorization and filtering\n Examples: {"environment": "production", "team": "platform", "version": "v2"}\n\n- `spec?: { status: string; variationSelectionMode: string; description?: string; inputDataSchema?: object; webhookEventsUrl?: string; }`\n  Agent specification (user-provided configuration)\n  - `status: string`\n    Status of the agent\n  - `variationSelectionMode: string`\n    Controls how variations are automatically selected when creating objectives\n Defaults to RANDOM when unspecified\n  - `description?: string`\n    Description of the agent\'s purpose\n  - `inputDataSchema?: object`\n    InputDataSchema is used for enforcing a data input when objectives are created. This is valuable when using liquid formatting in agent variation\n prompts. Input data schema is also valuable when using an agent as a sub-agent, as the schema is used as the tool\'s input parameter schema. If omitted,\n the sub-agent schema will be loaded with a simple "prompt" free text string as its schema.\n  - `webhookEventsUrl?: string`\n    The URL that Cadenya will send events for any objective assigned to the agent.\n\n- `updateMask?: string`\n  Fields to update\n\n### Returns\n\n- `{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { status: string; variationSelectionMode: string; description?: string; inputDataSchema?: object; webhookEventsUrl?: string; }; info?: { createdBy?: profile; variationCount?: number; }; }`\n  Agent resource\n\n  - `metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `spec: { status: string; variationSelectionMode: string; description?: string; inputDataSchema?: object; webhookEventsUrl?: string; }`\n  - `info?: { createdBy?: { metadata: account_resource_metadata; spec: profile_spec; }; variationCount?: number; }`\n\n### Example\n\n```typescript\nimport Cadenya from \'@cadenya/cadenya\';\n\nconst client = new Cadenya();\n\nconst agent = await client.agents.update(\'id\');\n\nconsole.log(agent);\n```',
    perLanguage: {
      cli: {
        method: 'agents update',
        example: "cadenya agents update \\\n  --api-key 'My API Key' \\\n  --id id",
      },
      go: {
        method: 'client.Agents.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cadenya/cadenya-go"\n\t"github.com/cadenya/cadenya-go/option"\n)\n\nfunc main() {\n\tclient := cadenya.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tagent, err := client.Agents.Update(\n\t\tcontext.TODO(),\n\t\t"id",\n\t\tcadenya.AgentUpdateParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", agent.Metadata)\n}\n',
      },
      http: {
        example:
          "curl https://api.cadenya.com/v1/agents/$ID \\\n    -X PATCH \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $CADENYA_API_KEY\" \\\n    -d '{}'",
      },
      typescript: {
        method: 'client.agents.update',
        example:
          "import Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nconst agent = await client.agents.update('id');\n\nconsole.log(agent.metadata);",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v1/agents/{agentId}/feedback',
    httpMethod: 'get',
    summary: 'List feedback for an agent',
    description:
      'Lists feedback submitted across all objectives belonging to an agent. Supports search by comment, sentiment filter, agent variation filter, and creation date range. Results are ordered by creation time, newest first.',
    stainlessPath: '(resource) agents.feedback > (method) list',
    qualified: 'client.agents.feedback.list',
    params: [
      'agentId: string;',
      'agentVariationId?: string;',
      'createdAfter?: string;',
      'createdBefore?: string;',
      'cursor?: string;',
      'includeInfo?: boolean;',
      'limit?: number;',
      'query?: string;',
      "sentiment?: 'FEEDBACK_SENTIMENT_UNSPECIFIED' | 'FEEDBACK_SENTIMENT_POSITIVE' | 'FEEDBACK_SENTIMENT_NEGATIVE';",
    ],
    response:
      '{ data: { comment?: string; score?: number; }; metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; info?: { agentVariation?: bare_metadata; objective?: bare_metadata; submittedBy?: profile; }; }',
    markdown:
      "## list\n\n`client.agents.feedback.list(agentId: string, agentVariationId?: string, createdAfter?: string, createdBefore?: string, cursor?: string, includeInfo?: boolean, limit?: number, query?: string, sentiment?: 'FEEDBACK_SENTIMENT_UNSPECIFIED' | 'FEEDBACK_SENTIMENT_POSITIVE' | 'FEEDBACK_SENTIMENT_NEGATIVE'): { data: objective_feedback_data; metadata: operation_metadata; info?: objective_feedback_info; }`\n\n**get** `/v1/agents/{agentId}/feedback`\n\nLists feedback submitted across all objectives belonging to an agent. Supports search by comment, sentiment filter, agent variation filter, and creation date range. Results are ordered by creation time, newest first.\n\n### Parameters\n\n- `agentId: string`\n\n- `agentVariationId?: string`\n  Optional filter to limit results to feedback on objectives run by a single\n agent variation. Supports \"external_id:\" prefix for external IDs.\n\n- `createdAfter?: string`\n  Inclusive lower bound on feedback creation time.\n\n- `createdBefore?: string`\n  Exclusive upper bound on feedback creation time.\n\n- `cursor?: string`\n  Pagination cursor from previous response.\n\n- `includeInfo?: boolean`\n  When set to true you may use more of your alloted API rate-limit\n\n- `limit?: number`\n  Maximum number of results to return.\n\n- `query?: string`\n  Free-text search applied to the feedback comment. Case-insensitive substring match.\n\n- `sentiment?: 'FEEDBACK_SENTIMENT_UNSPECIFIED' | 'FEEDBACK_SENTIMENT_POSITIVE' | 'FEEDBACK_SENTIMENT_NEGATIVE'`\n  Filter by sentiment. UNSPECIFIED returns feedback regardless of score.\n\n### Returns\n\n- `{ data: { comment?: string; score?: number; }; metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; info?: { agentVariation?: bare_metadata; objective?: bare_metadata; submittedBy?: profile; }; }`\n  ObjectiveFeedback represents feedback submitted for an objective's execution.\n Feedback is used to score agent variations and improve agent performance over time.\n\n  - `data: { comment?: string; score?: number; }`\n  - `metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `info?: { agentVariation?: { id?: string; name?: string; }; objective?: { id?: string; name?: string; }; submittedBy?: { metadata: account_resource_metadata; spec: profile_spec; }; }`\n\n### Example\n\n```typescript\nimport Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya();\n\n// Automatically fetches more pages as needed.\nfor await (const objectiveFeedback of client.agents.feedback.list('agentId')) {\n  console.log(objectiveFeedback);\n}\n```",
    perLanguage: {
      cli: {
        method: 'feedback list',
        example: "cadenya agents:feedback list \\\n  --api-key 'My API Key' \\\n  --agent-id agentId",
      },
      go: {
        method: 'client.Agents.Feedback.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cadenya/cadenya-go"\n\t"github.com/cadenya/cadenya-go/option"\n)\n\nfunc main() {\n\tclient := cadenya.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Agents.Feedback.List(\n\t\tcontext.TODO(),\n\t\t"agentId",\n\t\tcadenya.AgentFeedbackListParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://api.cadenya.com/v1/agents/$AGENT_ID/feedback \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.agents.feedback.list',
        example:
          "import Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const objectiveFeedback of client.agents.feedback.list('agentId')) {\n  console.log(objectiveFeedback.data);\n}",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v1/agents/{agentId}/webhook_deliveries',
    httpMethod: 'get',
    summary: 'List webhook deliveries',
    description: 'Lists all webhook deliveries for an agent',
    stainlessPath: '(resource) agents.webhook_deliveries > (method) list',
    qualified: 'client.agents.webhookDeliveries.list',
    params: [
      'agentId: string;',
      'cursor?: string;',
      'eventType?: string;',
      'limit?: number;',
      'objectiveId?: string;',
    ],
    response:
      '{ data: { agentId: string; attemptCount: number; eventType: string; httpStatusCode: number; lastAttemptAt: string; latencyMs: number; objectiveEventId: string; objectiveId: string; responseContentLength: string; status: string; webhookId: string; webhookUrl: string; errorMessage?: string; responseHeaders?: object; }; metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; }',
    markdown:
      "## list\n\n`client.agents.webhookDeliveries.list(agentId: string, cursor?: string, eventType?: string, limit?: number, objectiveId?: string): { data: webhook_delivery_data; metadata: operation_metadata; }`\n\n**get** `/v1/agents/{agentId}/webhook_deliveries`\n\nLists all webhook deliveries for an agent\n\n### Parameters\n\n- `agentId: string`\n\n- `cursor?: string`\n  Pagination cursor from previous response\n\n- `eventType?: string`\n  Optional filter by event type\n\n- `limit?: number`\n  Maximum number of results to return\n\n- `objectiveId?: string`\n  Optional filter by objective ID\n\n### Returns\n\n- `{ data: { agentId: string; attemptCount: number; eventType: string; httpStatusCode: number; lastAttemptAt: string; latencyMs: number; objectiveEventId: string; objectiveId: string; responseContentLength: string; status: string; webhookId: string; webhookUrl: string; errorMessage?: string; responseHeaders?: object; }; metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; }`\n\n  - `data: { agentId: string; attemptCount: number; eventType: string; httpStatusCode: number; lastAttemptAt: string; latencyMs: number; objectiveEventId: string; objectiveId: string; responseContentLength: string; status: string; webhookId: string; webhookUrl: string; errorMessage?: string; responseHeaders?: object; }`\n  - `metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n\n### Example\n\n```typescript\nimport Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya();\n\n// Automatically fetches more pages as needed.\nfor await (const webhookDelivery of client.agents.webhookDeliveries.list('agentId')) {\n  console.log(webhookDelivery);\n}\n```",
    perLanguage: {
      cli: {
        method: 'webhook_deliveries list',
        example:
          "cadenya agents:webhook-deliveries list \\\n  --api-key 'My API Key' \\\n  --agent-id agentId",
      },
      go: {
        method: 'client.Agents.WebhookDeliveries.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cadenya/cadenya-go"\n\t"github.com/cadenya/cadenya-go/option"\n)\n\nfunc main() {\n\tclient := cadenya.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Agents.WebhookDeliveries.List(\n\t\tcontext.TODO(),\n\t\t"agentId",\n\t\tcadenya.AgentWebhookDeliveryListParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://api.cadenya.com/v1/agents/$AGENT_ID/webhook_deliveries \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.agents.webhookDeliveries.list',
        example:
          "import Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const webhookDelivery of client.agents.webhookDeliveries.list('agentId')) {\n  console.log(webhookDelivery.data);\n}",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v1/agents/{agentId}/variations',
    httpMethod: 'get',
    summary: 'List variations',
    description: 'Lists all variations for an agent',
    stainlessPath: '(resource) agents.variations > (method) list',
    qualified: 'client.agents.variations.list',
    params: [
      'agentId: string;',
      'cursor?: string;',
      'includeInfo?: boolean;',
      'limit?: number;',
      'sortOrder?: string;',
    ],
    response:
      '{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { compactionConfig?: agent_variation_spec_compaction_config; constraints?: agent_variation_spec_constraints; description?: string; enableEpisodicMemory?: boolean; episodicMemoryTtl?: number; modelConfig?: agent_variation_spec_model_config; progressiveDiscovery?: agent_variation_spec_progressive_discovery; prompt?: string; weight?: number; }; info?: { assignments?: variation_assignment[]; createdBy?: profile; feedbackCount?: number; memoryLayerAssignments?: variation_memory_layer_assignment[]; memoryLayerCount?: number; model?: resource_metadata; score?: number; subAgentCount?: number; toolCount?: number; toolSetCount?: number; }; }',
    markdown:
      "## list\n\n`client.agents.variations.list(agentId: string, cursor?: string, includeInfo?: boolean, limit?: number, sortOrder?: string): { metadata: resource_metadata; spec: agent_variation_spec; info?: agent_variation_info; }`\n\n**get** `/v1/agents/{agentId}/variations`\n\nLists all variations for an agent\n\n### Parameters\n\n- `agentId: string`\n\n- `cursor?: string`\n  Pagination cursor from previous response\n\n- `includeInfo?: boolean`\n  When set to true you may use more of your alloted API rate-limit\n\n- `limit?: number`\n  Maximum number of results to return\n\n- `sortOrder?: string`\n  Sort order for results (asc or desc by creation time)\n\n### Returns\n\n- `{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { compactionConfig?: agent_variation_spec_compaction_config; constraints?: agent_variation_spec_constraints; description?: string; enableEpisodicMemory?: boolean; episodicMemoryTtl?: number; modelConfig?: agent_variation_spec_model_config; progressiveDiscovery?: agent_variation_spec_progressive_discovery; prompt?: string; weight?: number; }; info?: { assignments?: variation_assignment[]; createdBy?: profile; feedbackCount?: number; memoryLayerAssignments?: variation_memory_layer_assignment[]; memoryLayerCount?: number; model?: resource_metadata; score?: number; subAgentCount?: number; toolCount?: number; toolSetCount?: number; }; }`\n  AgentVariation resource\n\n  - `metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `spec: { compactionConfig?: { summarization?: compaction_config_summarization_strategy; toolResultClearing?: compaction_config_tool_result_clearing_strategy; triggerThreshold?: number; }; constraints?: { maxSubObjectives?: number; maxToolCalls?: number; }; description?: string; enableEpisodicMemory?: boolean; episodicMemoryTtl?: number; modelConfig?: { modelId?: string; temperature?: number; }; progressiveDiscovery?: { hints?: string[]; maxTools?: number; rerankThreshold?: number; }; prompt?: string; weight?: number; }`\n  - `info?: { assignments?: { id?: string; agent?: bare_metadata; tool?: bare_metadata; toolSet?: bare_metadata; }[]; createdBy?: { metadata: account_resource_metadata; spec: profile_spec; }; feedbackCount?: number; memoryLayerAssignments?: { id?: string; memoryLayer?: bare_metadata; position?: number; }[]; memoryLayerCount?: number; model?: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; score?: number; subAgentCount?: number; toolCount?: number; toolSetCount?: number; }`\n\n### Example\n\n```typescript\nimport Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya();\n\n// Automatically fetches more pages as needed.\nfor await (const agentVariation of client.agents.variations.list('agentId')) {\n  console.log(agentVariation);\n}\n```",
    perLanguage: {
      cli: {
        method: 'variations list',
        example: "cadenya agents:variations list \\\n  --api-key 'My API Key' \\\n  --agent-id agentId",
      },
      go: {
        method: 'client.Agents.Variations.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cadenya/cadenya-go"\n\t"github.com/cadenya/cadenya-go/option"\n)\n\nfunc main() {\n\tclient := cadenya.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Agents.Variations.List(\n\t\tcontext.TODO(),\n\t\t"agentId",\n\t\tcadenya.AgentVariationListParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://api.cadenya.com/v1/agents/$AGENT_ID/variations \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.agents.variations.list',
        example:
          "import Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const agentVariation of client.agents.variations.list('agentId')) {\n  console.log(agentVariation.metadata);\n}",
      },
    },
  },
  {
    name: 'create',
    endpoint: '/v1/agents/{agentId}/variations',
    httpMethod: 'post',
    summary: 'Create a new variation',
    description: 'Creates a new variation for an agent',
    stainlessPath: '(resource) agents.variations > (method) create',
    qualified: 'client.agents.variations.create',
    params: [
      'agentId: string;',
      'metadata: { name: string; externalId?: string; labels?: object; };',
      'spec: { compactionConfig?: { summarization?: compaction_config_summarization_strategy; toolResultClearing?: compaction_config_tool_result_clearing_strategy; triggerThreshold?: number; }; constraints?: { maxSubObjectives?: number; maxToolCalls?: number; }; description?: string; enableEpisodicMemory?: boolean; episodicMemoryTtl?: number; modelConfig?: { modelId?: string; temperature?: number; }; progressiveDiscovery?: { hints?: string[]; maxTools?: number; rerankThreshold?: number; }; prompt?: string; weight?: number; };',
    ],
    response:
      '{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { compactionConfig?: agent_variation_spec_compaction_config; constraints?: agent_variation_spec_constraints; description?: string; enableEpisodicMemory?: boolean; episodicMemoryTtl?: number; modelConfig?: agent_variation_spec_model_config; progressiveDiscovery?: agent_variation_spec_progressive_discovery; prompt?: string; weight?: number; }; info?: { assignments?: variation_assignment[]; createdBy?: profile; feedbackCount?: number; memoryLayerAssignments?: variation_memory_layer_assignment[]; memoryLayerCount?: number; model?: resource_metadata; score?: number; subAgentCount?: number; toolCount?: number; toolSetCount?: number; }; }',
    markdown:
      '## create\n\n`client.agents.variations.create(agentId: string, metadata: { name: string; externalId?: string; labels?: object; }, spec: { compactionConfig?: agent_variation_spec_compaction_config; constraints?: agent_variation_spec_constraints; description?: string; enableEpisodicMemory?: boolean; episodicMemoryTtl?: number; modelConfig?: agent_variation_spec_model_config; progressiveDiscovery?: agent_variation_spec_progressive_discovery; prompt?: string; weight?: number; }): { metadata: resource_metadata; spec: agent_variation_spec; info?: agent_variation_info; }`\n\n**post** `/v1/agents/{agentId}/variations`\n\nCreates a new variation for an agent\n\n### Parameters\n\n- `agentId: string`\n\n- `metadata: { name: string; externalId?: string; labels?: object; }`\n  CreateResourceMetadata contains the user-provided fields for creating\n a workspace-scoped resource. Read-only fields (id, account_id, workspace_id, profile_id,\n created_at) are excluded since they are set by the server.\n  - `name: string`\n    Human-readable name for the resource (e.g., "Customer Support Agent", "Email Tool")\n  - `externalId?: string`\n    External ID for the resource (e.g., a workflow ID from an external system)\n  - `labels?: object`\n    Arbitrary key-value pairs for categorization and filtering\n Examples: {"environment": "production", "team": "platform", "version": "v2"}\n\n- `spec: { compactionConfig?: { summarization?: compaction_config_summarization_strategy; toolResultClearing?: compaction_config_tool_result_clearing_strategy; triggerThreshold?: number; }; constraints?: { maxSubObjectives?: number; maxToolCalls?: number; }; description?: string; enableEpisodicMemory?: boolean; episodicMemoryTtl?: number; modelConfig?: { modelId?: string; temperature?: number; }; progressiveDiscovery?: { hints?: string[]; maxTools?: number; rerankThreshold?: number; }; prompt?: string; weight?: number; }`\n  AgentVariationSpec defines the operational configuration for a variation\n  - `compactionConfig?: { summarization?: { instructions?: string; }; toolResultClearing?: { preserveRecentResults?: number; }; triggerThreshold?: number; }`\n    CompactionConfig defines how context window compaction behaves for objectives using this variation.\n  - `constraints?: { maxSubObjectives?: number; maxToolCalls?: number; }`\n    Execution constraints\n  - `description?: string`\n    Human-readable description of what this variation does or when it should be used\n  - `enableEpisodicMemory?: boolean`\n    Enable episodic memory for objectives using this variation.\n When true, the system automatically creates a document namespace for each objective\n using the objective\'s episodic_key as the external_id, allowing the agent to\n store and retrieve documents specific to that episode.\n  - `episodicMemoryTtl?: number`\n    How long episodic memories should be retained.\n After this duration, episodic document namespaces can be automatically cleaned up.\n If not set, episodic memories are retained indefinitely.\n  - `modelConfig?: { modelId?: string; temperature?: number; }`\n    ModelConfig defines the model configuration for a variation\n  - `progressiveDiscovery?: { hints?: string[]; maxTools?: number; rerankThreshold?: number; }`\n    ProgressiveDiscovery is used to indicate that the agent should automatically discover tools that are not explicitly assigned to it.\n Max tools is the maximum number of tools that can be discovered per search.\n Hints are optional hints for tool search. These are used in conjunction with the context-aware tool search and can help select the best tools for the task.\n  - `prompt?: string`\n    The system prompt for this variation\n  - `weight?: number`\n    Weight for weighted random selection (>= 0). P(v) = v.weight / sum(all_weights).\n Only used when the agent\'s variation_selection_mode is WEIGHTED. A weight of 0 means never auto-selected, but can still be chosen explicitly via variation_id on CreateObjectiveRequest.\n\n### Returns\n\n- `{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { compactionConfig?: agent_variation_spec_compaction_config; constraints?: agent_variation_spec_constraints; description?: string; enableEpisodicMemory?: boolean; episodicMemoryTtl?: number; modelConfig?: agent_variation_spec_model_config; progressiveDiscovery?: agent_variation_spec_progressive_discovery; prompt?: string; weight?: number; }; info?: { assignments?: variation_assignment[]; createdBy?: profile; feedbackCount?: number; memoryLayerAssignments?: variation_memory_layer_assignment[]; memoryLayerCount?: number; model?: resource_metadata; score?: number; subAgentCount?: number; toolCount?: number; toolSetCount?: number; }; }`\n  AgentVariation resource\n\n  - `metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `spec: { compactionConfig?: { summarization?: compaction_config_summarization_strategy; toolResultClearing?: compaction_config_tool_result_clearing_strategy; triggerThreshold?: number; }; constraints?: { maxSubObjectives?: number; maxToolCalls?: number; }; description?: string; enableEpisodicMemory?: boolean; episodicMemoryTtl?: number; modelConfig?: { modelId?: string; temperature?: number; }; progressiveDiscovery?: { hints?: string[]; maxTools?: number; rerankThreshold?: number; }; prompt?: string; weight?: number; }`\n  - `info?: { assignments?: { id?: string; agent?: bare_metadata; tool?: bare_metadata; toolSet?: bare_metadata; }[]; createdBy?: { metadata: account_resource_metadata; spec: profile_spec; }; feedbackCount?: number; memoryLayerAssignments?: { id?: string; memoryLayer?: bare_metadata; position?: number; }[]; memoryLayerCount?: number; model?: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; score?: number; subAgentCount?: number; toolCount?: number; toolSetCount?: number; }`\n\n### Example\n\n```typescript\nimport Cadenya from \'@cadenya/cadenya\';\n\nconst client = new Cadenya();\n\nconst agentVariation = await client.agents.variations.create(\'agentId\', {\n  metadata: { name: \'name\' },\n  spec: {},\n});\n\nconsole.log(agentVariation);\n```',
    perLanguage: {
      cli: {
        method: 'variations create',
        example:
          "cadenya agents:variations create \\\n  --api-key 'My API Key' \\\n  --agent-id agentId \\\n  --metadata '{name: name}' \\\n  --spec '{}'",
      },
      go: {
        method: 'client.Agents.Variations.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cadenya/cadenya-go"\n\t"github.com/cadenya/cadenya-go/option"\n\t"github.com/cadenya/cadenya-go/shared"\n)\n\nfunc main() {\n\tclient := cadenya.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tagentVariation, err := client.Agents.Variations.New(\n\t\tcontext.TODO(),\n\t\t"agentId",\n\t\tcadenya.AgentVariationNewParams{\n\t\t\tMetadata: cadenya.F(shared.CreateResourceMetadataParam{\n\t\t\t\tName: cadenya.F("name"),\n\t\t\t}),\n\t\t\tSpec: cadenya.F(cadenya.AgentVariationSpecParam{}),\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", agentVariation.Metadata)\n}\n',
      },
      http: {
        example:
          'curl https://api.cadenya.com/v1/agents/$AGENT_ID/variations \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $CADENYA_API_KEY" \\\n    -d \'{\n          "metadata": {\n            "name": "name"\n          },\n          "spec": {}\n        }\'',
      },
      typescript: {
        method: 'client.agents.variations.create',
        example:
          "import Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nconst agentVariation = await client.agents.variations.create('agentId', {\n  metadata: { name: 'name' },\n  spec: {},\n});\n\nconsole.log(agentVariation.metadata);",
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/v1/agents/{agentId}/variations/{id}',
    httpMethod: 'get',
    summary: 'Get a variation by ID',
    description: 'Retrieves a variation by ID from an agent',
    stainlessPath: '(resource) agents.variations > (method) retrieve',
    qualified: 'client.agents.variations.retrieve',
    params: ['agentId: string;', 'id: string;'],
    response:
      '{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { compactionConfig?: agent_variation_spec_compaction_config; constraints?: agent_variation_spec_constraints; description?: string; enableEpisodicMemory?: boolean; episodicMemoryTtl?: number; modelConfig?: agent_variation_spec_model_config; progressiveDiscovery?: agent_variation_spec_progressive_discovery; prompt?: string; weight?: number; }; info?: { assignments?: variation_assignment[]; createdBy?: profile; feedbackCount?: number; memoryLayerAssignments?: variation_memory_layer_assignment[]; memoryLayerCount?: number; model?: resource_metadata; score?: number; subAgentCount?: number; toolCount?: number; toolSetCount?: number; }; }',
    markdown:
      "## retrieve\n\n`client.agents.variations.retrieve(agentId: string, id: string): { metadata: resource_metadata; spec: agent_variation_spec; info?: agent_variation_info; }`\n\n**get** `/v1/agents/{agentId}/variations/{id}`\n\nRetrieves a variation by ID from an agent\n\n### Parameters\n\n- `agentId: string`\n\n- `id: string`\n\n### Returns\n\n- `{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { compactionConfig?: agent_variation_spec_compaction_config; constraints?: agent_variation_spec_constraints; description?: string; enableEpisodicMemory?: boolean; episodicMemoryTtl?: number; modelConfig?: agent_variation_spec_model_config; progressiveDiscovery?: agent_variation_spec_progressive_discovery; prompt?: string; weight?: number; }; info?: { assignments?: variation_assignment[]; createdBy?: profile; feedbackCount?: number; memoryLayerAssignments?: variation_memory_layer_assignment[]; memoryLayerCount?: number; model?: resource_metadata; score?: number; subAgentCount?: number; toolCount?: number; toolSetCount?: number; }; }`\n  AgentVariation resource\n\n  - `metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `spec: { compactionConfig?: { summarization?: compaction_config_summarization_strategy; toolResultClearing?: compaction_config_tool_result_clearing_strategy; triggerThreshold?: number; }; constraints?: { maxSubObjectives?: number; maxToolCalls?: number; }; description?: string; enableEpisodicMemory?: boolean; episodicMemoryTtl?: number; modelConfig?: { modelId?: string; temperature?: number; }; progressiveDiscovery?: { hints?: string[]; maxTools?: number; rerankThreshold?: number; }; prompt?: string; weight?: number; }`\n  - `info?: { assignments?: { id?: string; agent?: bare_metadata; tool?: bare_metadata; toolSet?: bare_metadata; }[]; createdBy?: { metadata: account_resource_metadata; spec: profile_spec; }; feedbackCount?: number; memoryLayerAssignments?: { id?: string; memoryLayer?: bare_metadata; position?: number; }[]; memoryLayerCount?: number; model?: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; score?: number; subAgentCount?: number; toolCount?: number; toolSetCount?: number; }`\n\n### Example\n\n```typescript\nimport Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya();\n\nconst agentVariation = await client.agents.variations.retrieve('id', { agentId: 'agentId' });\n\nconsole.log(agentVariation);\n```",
    perLanguage: {
      cli: {
        method: 'variations retrieve',
        example:
          "cadenya agents:variations retrieve \\\n  --api-key 'My API Key' \\\n  --agent-id agentId \\\n  --id id",
      },
      go: {
        method: 'client.Agents.Variations.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cadenya/cadenya-go"\n\t"github.com/cadenya/cadenya-go/option"\n)\n\nfunc main() {\n\tclient := cadenya.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tagentVariation, err := client.Agents.Variations.Get(\n\t\tcontext.TODO(),\n\t\t"agentId",\n\t\t"id",\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", agentVariation.Metadata)\n}\n',
      },
      http: {
        example:
          'curl https://api.cadenya.com/v1/agents/$AGENT_ID/variations/$ID \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.agents.variations.retrieve',
        example:
          "import Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nconst agentVariation = await client.agents.variations.retrieve('id', { agentId: 'agentId' });\n\nconsole.log(agentVariation.metadata);",
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/v1/agents/{agentId}/variations/{id}',
    httpMethod: 'delete',
    summary: 'Delete a variation',
    description: 'Deletes a variation from an agent',
    stainlessPath: '(resource) agents.variations > (method) delete',
    qualified: 'client.agents.variations.delete',
    params: ['agentId: string;', 'id: string;'],
    markdown:
      "## delete\n\n`client.agents.variations.delete(agentId: string, id: string): void`\n\n**delete** `/v1/agents/{agentId}/variations/{id}`\n\nDeletes a variation from an agent\n\n### Parameters\n\n- `agentId: string`\n\n- `id: string`\n\n### Example\n\n```typescript\nimport Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya();\n\nawait client.agents.variations.delete('id', { agentId: 'agentId' })\n```",
    perLanguage: {
      cli: {
        method: 'variations delete',
        example:
          "cadenya agents:variations delete \\\n  --api-key 'My API Key' \\\n  --agent-id agentId \\\n  --id id",
      },
      go: {
        method: 'client.Agents.Variations.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/cadenya/cadenya-go"\n\t"github.com/cadenya/cadenya-go/option"\n)\n\nfunc main() {\n\tclient := cadenya.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\terr := client.Agents.Variations.Delete(\n\t\tcontext.TODO(),\n\t\t"agentId",\n\t\t"id",\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://api.cadenya.com/v1/agents/$AGENT_ID/variations/$ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.agents.variations.delete',
        example:
          "import Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.agents.variations.delete('id', { agentId: 'agentId' });",
      },
    },
  },
  {
    name: 'update',
    endpoint: '/v1/agents/{agentId}/variations/{id}',
    httpMethod: 'patch',
    summary: 'Update a variation',
    description: 'Updates a variation for an agent',
    stainlessPath: '(resource) agents.variations > (method) update',
    qualified: 'client.agents.variations.update',
    params: [
      'agentId: string;',
      'id: string;',
      'metadata?: { name: string; externalId?: string; labels?: object; };',
      'spec?: { compactionConfig?: { summarization?: compaction_config_summarization_strategy; toolResultClearing?: compaction_config_tool_result_clearing_strategy; triggerThreshold?: number; }; constraints?: { maxSubObjectives?: number; maxToolCalls?: number; }; description?: string; enableEpisodicMemory?: boolean; episodicMemoryTtl?: number; modelConfig?: { modelId?: string; temperature?: number; }; progressiveDiscovery?: { hints?: string[]; maxTools?: number; rerankThreshold?: number; }; prompt?: string; weight?: number; };',
      'updateMask?: string;',
    ],
    response:
      '{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { compactionConfig?: agent_variation_spec_compaction_config; constraints?: agent_variation_spec_constraints; description?: string; enableEpisodicMemory?: boolean; episodicMemoryTtl?: number; modelConfig?: agent_variation_spec_model_config; progressiveDiscovery?: agent_variation_spec_progressive_discovery; prompt?: string; weight?: number; }; info?: { assignments?: variation_assignment[]; createdBy?: profile; feedbackCount?: number; memoryLayerAssignments?: variation_memory_layer_assignment[]; memoryLayerCount?: number; model?: resource_metadata; score?: number; subAgentCount?: number; toolCount?: number; toolSetCount?: number; }; }',
    markdown:
      '## update\n\n`client.agents.variations.update(agentId: string, id: string, metadata?: { name: string; externalId?: string; labels?: object; }, spec?: { compactionConfig?: agent_variation_spec_compaction_config; constraints?: agent_variation_spec_constraints; description?: string; enableEpisodicMemory?: boolean; episodicMemoryTtl?: number; modelConfig?: agent_variation_spec_model_config; progressiveDiscovery?: agent_variation_spec_progressive_discovery; prompt?: string; weight?: number; }, updateMask?: string): { metadata: resource_metadata; spec: agent_variation_spec; info?: agent_variation_info; }`\n\n**patch** `/v1/agents/{agentId}/variations/{id}`\n\nUpdates a variation for an agent\n\n### Parameters\n\n- `agentId: string`\n\n- `id: string`\n\n- `metadata?: { name: string; externalId?: string; labels?: object; }`\n  UpdateResourceMetadata contains the user-provided fields for updating\n a workspace-scoped resource. Read-only fields (id, account_id, workspace_id, profile_id,\n created_at) are excluded since they are set by the server.\n  - `name: string`\n    Human-readable name for the resource (e.g., "Customer Support Agent", "Email Tool")\n  - `externalId?: string`\n    External ID for the resource (e.g., a workflow ID from an external system)\n  - `labels?: object`\n    Arbitrary key-value pairs for categorization and filtering\n Examples: {"environment": "production", "team": "platform", "version": "v2"}\n\n- `spec?: { compactionConfig?: { summarization?: compaction_config_summarization_strategy; toolResultClearing?: compaction_config_tool_result_clearing_strategy; triggerThreshold?: number; }; constraints?: { maxSubObjectives?: number; maxToolCalls?: number; }; description?: string; enableEpisodicMemory?: boolean; episodicMemoryTtl?: number; modelConfig?: { modelId?: string; temperature?: number; }; progressiveDiscovery?: { hints?: string[]; maxTools?: number; rerankThreshold?: number; }; prompt?: string; weight?: number; }`\n  AgentVariationSpec defines the operational configuration for a variation\n  - `compactionConfig?: { summarization?: { instructions?: string; }; toolResultClearing?: { preserveRecentResults?: number; }; triggerThreshold?: number; }`\n    CompactionConfig defines how context window compaction behaves for objectives using this variation.\n  - `constraints?: { maxSubObjectives?: number; maxToolCalls?: number; }`\n    Execution constraints\n  - `description?: string`\n    Human-readable description of what this variation does or when it should be used\n  - `enableEpisodicMemory?: boolean`\n    Enable episodic memory for objectives using this variation.\n When true, the system automatically creates a document namespace for each objective\n using the objective\'s episodic_key as the external_id, allowing the agent to\n store and retrieve documents specific to that episode.\n  - `episodicMemoryTtl?: number`\n    How long episodic memories should be retained.\n After this duration, episodic document namespaces can be automatically cleaned up.\n If not set, episodic memories are retained indefinitely.\n  - `modelConfig?: { modelId?: string; temperature?: number; }`\n    ModelConfig defines the model configuration for a variation\n  - `progressiveDiscovery?: { hints?: string[]; maxTools?: number; rerankThreshold?: number; }`\n    ProgressiveDiscovery is used to indicate that the agent should automatically discover tools that are not explicitly assigned to it.\n Max tools is the maximum number of tools that can be discovered per search.\n Hints are optional hints for tool search. These are used in conjunction with the context-aware tool search and can help select the best tools for the task.\n  - `prompt?: string`\n    The system prompt for this variation\n  - `weight?: number`\n    Weight for weighted random selection (>= 0). P(v) = v.weight / sum(all_weights).\n Only used when the agent\'s variation_selection_mode is WEIGHTED. A weight of 0 means never auto-selected, but can still be chosen explicitly via variation_id on CreateObjectiveRequest.\n\n- `updateMask?: string`\n  Fields to update\n\n### Returns\n\n- `{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { compactionConfig?: agent_variation_spec_compaction_config; constraints?: agent_variation_spec_constraints; description?: string; enableEpisodicMemory?: boolean; episodicMemoryTtl?: number; modelConfig?: agent_variation_spec_model_config; progressiveDiscovery?: agent_variation_spec_progressive_discovery; prompt?: string; weight?: number; }; info?: { assignments?: variation_assignment[]; createdBy?: profile; feedbackCount?: number; memoryLayerAssignments?: variation_memory_layer_assignment[]; memoryLayerCount?: number; model?: resource_metadata; score?: number; subAgentCount?: number; toolCount?: number; toolSetCount?: number; }; }`\n  AgentVariation resource\n\n  - `metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `spec: { compactionConfig?: { summarization?: compaction_config_summarization_strategy; toolResultClearing?: compaction_config_tool_result_clearing_strategy; triggerThreshold?: number; }; constraints?: { maxSubObjectives?: number; maxToolCalls?: number; }; description?: string; enableEpisodicMemory?: boolean; episodicMemoryTtl?: number; modelConfig?: { modelId?: string; temperature?: number; }; progressiveDiscovery?: { hints?: string[]; maxTools?: number; rerankThreshold?: number; }; prompt?: string; weight?: number; }`\n  - `info?: { assignments?: { id?: string; agent?: bare_metadata; tool?: bare_metadata; toolSet?: bare_metadata; }[]; createdBy?: { metadata: account_resource_metadata; spec: profile_spec; }; feedbackCount?: number; memoryLayerAssignments?: { id?: string; memoryLayer?: bare_metadata; position?: number; }[]; memoryLayerCount?: number; model?: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; score?: number; subAgentCount?: number; toolCount?: number; toolSetCount?: number; }`\n\n### Example\n\n```typescript\nimport Cadenya from \'@cadenya/cadenya\';\n\nconst client = new Cadenya();\n\nconst agentVariation = await client.agents.variations.update(\'id\', { agentId: \'agentId\' });\n\nconsole.log(agentVariation);\n```',
    perLanguage: {
      cli: {
        method: 'variations update',
        example:
          "cadenya agents:variations update \\\n  --api-key 'My API Key' \\\n  --agent-id agentId \\\n  --id id",
      },
      go: {
        method: 'client.Agents.Variations.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cadenya/cadenya-go"\n\t"github.com/cadenya/cadenya-go/option"\n)\n\nfunc main() {\n\tclient := cadenya.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tagentVariation, err := client.Agents.Variations.Update(\n\t\tcontext.TODO(),\n\t\t"agentId",\n\t\t"id",\n\t\tcadenya.AgentVariationUpdateParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", agentVariation.Metadata)\n}\n',
      },
      http: {
        example:
          "curl https://api.cadenya.com/v1/agents/$AGENT_ID/variations/$ID \\\n    -X PATCH \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $CADENYA_API_KEY\" \\\n    -d '{}'",
      },
      typescript: {
        method: 'client.agents.variations.update',
        example:
          "import Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nconst agentVariation = await client.agents.variations.update('id', { agentId: 'agentId' });\n\nconsole.log(agentVariation.metadata);",
      },
    },
  },
  {
    name: 'add_assignment',
    endpoint: '/v1/agents/{agentId}/variations/{variationId}/assignments',
    httpMethod: 'post',
    summary: 'Add an assignment to a variation',
    description: 'Assigns a tool, tool set, or sub-agent to a variation. Exactly one target ID must be set.',
    stainlessPath: '(resource) agents.variations > (method) add_assignment',
    qualified: 'client.agents.variations.addAssignment',
    params: [
      'agentId: string;',
      'variationId: string;',
      'subAgentId?: string;',
      'toolId?: string;',
      'toolSetId?: string;',
    ],
    response:
      '{ id?: string; agent?: { id?: string; name?: string; }; tool?: { id?: string; name?: string; }; toolSet?: { id?: string; name?: string; }; }',
    markdown:
      "## add_assignment\n\n`client.agents.variations.addAssignment(agentId: string, variationId: string, subAgentId?: string, toolId?: string, toolSetId?: string): { id?: string; agent?: bare_metadata; tool?: bare_metadata; toolSet?: bare_metadata; }`\n\n**post** `/v1/agents/{agentId}/variations/{variationId}/assignments`\n\nAssigns a tool, tool set, or sub-agent to a variation. Exactly one target ID must be set.\n\n### Parameters\n\n- `agentId: string`\n\n- `variationId: string`\n\n- `subAgentId?: string`\n\n- `toolId?: string`\n\n- `toolSetId?: string`\n\n### Returns\n\n- `{ id?: string; agent?: { id?: string; name?: string; }; tool?: { id?: string; name?: string; }; toolSet?: { id?: string; name?: string; }; }`\n  VariationAssignment is a read-only reference to a single tool, tool set, or\n sub-agent attached to a variation. Clients read the full set of assignments\n via `AgentVariationInfo.assignments`; mutations go through the dedicated\n add/remove assignment endpoints under\n /v1/agents/{agent_id}/variations/{variation_id}/assignments.\n\n The `id` identifies the assignment row itself (not the referenced resource)\n and is the handle used to remove the assignment. It is returned by the add\n endpoint and present on every entry in AgentVariationInfo.assignments.\n\n  - `id?: string`\n  - `agent?: { id?: string; name?: string; }`\n  - `tool?: { id?: string; name?: string; }`\n  - `toolSet?: { id?: string; name?: string; }`\n\n### Example\n\n```typescript\nimport Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya();\n\nconst variationAssignment = await client.agents.variations.addAssignment('variationId', { agentId: 'agentId' });\n\nconsole.log(variationAssignment);\n```",
    perLanguage: {
      cli: {
        method: 'variations add_assignment',
        example:
          "cadenya agents:variations add-assignment \\\n  --api-key 'My API Key' \\\n  --agent-id agentId \\\n  --variation-id variationId",
      },
      go: {
        method: 'client.Agents.Variations.AddAssignment',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cadenya/cadenya-go"\n\t"github.com/cadenya/cadenya-go/option"\n)\n\nfunc main() {\n\tclient := cadenya.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tvariationAssignment, err := client.Agents.Variations.AddAssignment(\n\t\tcontext.TODO(),\n\t\t"agentId",\n\t\t"variationId",\n\t\tcadenya.AgentVariationAddAssignmentParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", variationAssignment.ID)\n}\n',
      },
      http: {
        example:
          "curl https://api.cadenya.com/v1/agents/$AGENT_ID/variations/$VARIATION_ID/assignments \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $CADENYA_API_KEY\" \\\n    -d '{}'",
      },
      typescript: {
        method: 'client.agents.variations.addAssignment',
        example:
          "import Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nconst variationAssignment = await client.agents.variations.addAssignment('variationId', {\n  agentId: 'agentId',\n});\n\nconsole.log(variationAssignment.id);",
      },
    },
  },
  {
    name: 'remove_assignment',
    endpoint: '/v1/agents/{agentId}/variations/{variationId}/assignments/{id}',
    httpMethod: 'delete',
    summary: 'Remove an assignment from a variation',
    description:
      'Detaches an assignment from a variation, identified by the assignment ID returned when it was added.',
    stainlessPath: '(resource) agents.variations > (method) remove_assignment',
    qualified: 'client.agents.variations.removeAssignment',
    params: ['agentId: string;', 'variationId: string;', 'id: string;'],
    markdown:
      "## remove_assignment\n\n`client.agents.variations.removeAssignment(agentId: string, variationId: string, id: string): void`\n\n**delete** `/v1/agents/{agentId}/variations/{variationId}/assignments/{id}`\n\nDetaches an assignment from a variation, identified by the assignment ID returned when it was added.\n\n### Parameters\n\n- `agentId: string`\n\n- `variationId: string`\n\n- `id: string`\n\n### Example\n\n```typescript\nimport Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya();\n\nawait client.agents.variations.removeAssignment('id', { agentId: 'agentId', variationId: 'variationId' })\n```",
    perLanguage: {
      cli: {
        method: 'variations remove_assignment',
        example:
          "cadenya agents:variations remove-assignment \\\n  --api-key 'My API Key' \\\n  --agent-id agentId \\\n  --variation-id variationId \\\n  --id id",
      },
      go: {
        method: 'client.Agents.Variations.RemoveAssignment',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/cadenya/cadenya-go"\n\t"github.com/cadenya/cadenya-go/option"\n)\n\nfunc main() {\n\tclient := cadenya.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\terr := client.Agents.Variations.RemoveAssignment(\n\t\tcontext.TODO(),\n\t\t"agentId",\n\t\t"variationId",\n\t\t"id",\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://api.cadenya.com/v1/agents/$AGENT_ID/variations/$VARIATION_ID/assignments/$ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.agents.variations.removeAssignment',
        example:
          "import Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.agents.variations.removeAssignment('id', {\n  agentId: 'agentId',\n  variationId: 'variationId',\n});",
      },
    },
  },
  {
    name: 'add_memory_layer',
    endpoint: '/v1/agents/{agentId}/variations/{variationId}/memory_layer_assignments',
    httpMethod: 'post',
    summary: 'Attach a memory layer to a variation',
    description:
      "Attaches a memory layer to a variation at a given position in the variation's baseline memory stack.",
    stainlessPath: '(resource) agents.variations > (method) add_memory_layer',
    qualified: 'client.agents.variations.addMemoryLayer',
    params: ['agentId: string;', 'variationId: string;', 'memoryLayerId?: string;', 'position?: number;'],
    response: '{ id?: string; memoryLayer?: { id?: string; name?: string; }; position?: number; }',
    markdown:
      "## add_memory_layer\n\n`client.agents.variations.addMemoryLayer(agentId: string, variationId: string, memoryLayerId?: string, position?: number): { id?: string; memoryLayer?: bare_metadata; position?: number; }`\n\n**post** `/v1/agents/{agentId}/variations/{variationId}/memory_layer_assignments`\n\nAttaches a memory layer to a variation at a given position in the variation's baseline memory stack.\n\n### Parameters\n\n- `agentId: string`\n\n- `variationId: string`\n\n- `memoryLayerId?: string`\n  Layer to attach. Accepts canonical memlyr_… form or external_id:<value>\n form (see common.proto \"Path-parameter ID resolution\").\n\n- `position?: number`\n  Position in the stack. If omitted, server appends\n (max existing position + 1).\n\n### Returns\n\n- `{ id?: string; memoryLayer?: { id?: string; name?: string; }; position?: number; }`\n  VariationMemoryLayerAssignment attaches a single MemoryLayer to a\n variation at a given position in the variation's baseline memory\n stack. A variation has at most one assignment per memory_layer_id.\n\n Variations only support whole-layer attachments — entry pinning is an\n objective-level capability.\n\n  - `id?: string`\n  - `memoryLayer?: { id?: string; name?: string; }`\n  - `position?: number`\n\n### Example\n\n```typescript\nimport Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya();\n\nconst variationMemoryLayerAssignment = await client.agents.variations.addMemoryLayer('variationId', { agentId: 'agentId' });\n\nconsole.log(variationMemoryLayerAssignment);\n```",
    perLanguage: {
      cli: {
        method: 'variations add_memory_layer',
        example:
          "cadenya agents:variations add-memory-layer \\\n  --api-key 'My API Key' \\\n  --agent-id agentId \\\n  --variation-id variationId",
      },
      go: {
        method: 'client.Agents.Variations.AddMemoryLayer',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cadenya/cadenya-go"\n\t"github.com/cadenya/cadenya-go/option"\n)\n\nfunc main() {\n\tclient := cadenya.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tvariationMemoryLayerAssignment, err := client.Agents.Variations.AddMemoryLayer(\n\t\tcontext.TODO(),\n\t\t"agentId",\n\t\t"variationId",\n\t\tcadenya.AgentVariationAddMemoryLayerParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", variationMemoryLayerAssignment.ID)\n}\n',
      },
      http: {
        example:
          "curl https://api.cadenya.com/v1/agents/$AGENT_ID/variations/$VARIATION_ID/memory_layer_assignments \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $CADENYA_API_KEY\" \\\n    -d '{}'",
      },
      typescript: {
        method: 'client.agents.variations.addMemoryLayer',
        example:
          "import Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nconst variationMemoryLayerAssignment = await client.agents.variations.addMemoryLayer(\n  'variationId',\n  { agentId: 'agentId' },\n);\n\nconsole.log(variationMemoryLayerAssignment.id);",
      },
    },
  },
  {
    name: 'update_memory_layer',
    endpoint: '/v1/agents/{agentId}/variations/{variationId}/memory_layer_assignments/{id}',
    httpMethod: 'patch',
    summary: "Update a variation's memory layer assignment",
    description: 'Updates the position of a memory layer assignment on a variation.',
    stainlessPath: '(resource) agents.variations > (method) update_memory_layer',
    qualified: 'client.agents.variations.updateMemoryLayer',
    params: ['agentId: string;', 'variationId: string;', 'id: string;', 'position?: number;'],
    response: '{ id?: string; memoryLayer?: { id?: string; name?: string; }; position?: number; }',
    markdown:
      "## update_memory_layer\n\n`client.agents.variations.updateMemoryLayer(agentId: string, variationId: string, id: string, position?: number): { id?: string; memoryLayer?: bare_metadata; position?: number; }`\n\n**patch** `/v1/agents/{agentId}/variations/{variationId}/memory_layer_assignments/{id}`\n\nUpdates the position of a memory layer assignment on a variation.\n\n### Parameters\n\n- `agentId: string`\n\n- `variationId: string`\n\n- `id: string`\n\n- `position?: number`\n  New position. Only field currently updatable on an assignment.\n\n### Returns\n\n- `{ id?: string; memoryLayer?: { id?: string; name?: string; }; position?: number; }`\n  VariationMemoryLayerAssignment attaches a single MemoryLayer to a\n variation at a given position in the variation's baseline memory\n stack. A variation has at most one assignment per memory_layer_id.\n\n Variations only support whole-layer attachments — entry pinning is an\n objective-level capability.\n\n  - `id?: string`\n  - `memoryLayer?: { id?: string; name?: string; }`\n  - `position?: number`\n\n### Example\n\n```typescript\nimport Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya();\n\nconst variationMemoryLayerAssignment = await client.agents.variations.updateMemoryLayer('id', { agentId: 'agentId', variationId: 'variationId' });\n\nconsole.log(variationMemoryLayerAssignment);\n```",
    perLanguage: {
      cli: {
        method: 'variations update_memory_layer',
        example:
          "cadenya agents:variations update-memory-layer \\\n  --api-key 'My API Key' \\\n  --agent-id agentId \\\n  --variation-id variationId \\\n  --id id",
      },
      go: {
        method: 'client.Agents.Variations.UpdateMemoryLayer',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cadenya/cadenya-go"\n\t"github.com/cadenya/cadenya-go/option"\n)\n\nfunc main() {\n\tclient := cadenya.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tvariationMemoryLayerAssignment, err := client.Agents.Variations.UpdateMemoryLayer(\n\t\tcontext.TODO(),\n\t\t"agentId",\n\t\t"variationId",\n\t\t"id",\n\t\tcadenya.AgentVariationUpdateMemoryLayerParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", variationMemoryLayerAssignment.ID)\n}\n',
      },
      http: {
        example:
          "curl https://api.cadenya.com/v1/agents/$AGENT_ID/variations/$VARIATION_ID/memory_layer_assignments/$ID \\\n    -X PATCH \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $CADENYA_API_KEY\" \\\n    -d '{}'",
      },
      typescript: {
        method: 'client.agents.variations.updateMemoryLayer',
        example:
          "import Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nconst variationMemoryLayerAssignment = await client.agents.variations.updateMemoryLayer('id', {\n  agentId: 'agentId',\n  variationId: 'variationId',\n});\n\nconsole.log(variationMemoryLayerAssignment.id);",
      },
    },
  },
  {
    name: 'remove_memory_layer',
    endpoint: '/v1/agents/{agentId}/variations/{variationId}/memory_layer_assignments/{id}',
    httpMethod: 'delete',
    summary: 'Remove a memory layer assignment from a variation',
    description: 'Detaches a memory layer assignment from a variation, identified by the assignment id.',
    stainlessPath: '(resource) agents.variations > (method) remove_memory_layer',
    qualified: 'client.agents.variations.removeMemoryLayer',
    params: ['agentId: string;', 'variationId: string;', 'id: string;'],
    markdown:
      "## remove_memory_layer\n\n`client.agents.variations.removeMemoryLayer(agentId: string, variationId: string, id: string): void`\n\n**delete** `/v1/agents/{agentId}/variations/{variationId}/memory_layer_assignments/{id}`\n\nDetaches a memory layer assignment from a variation, identified by the assignment id.\n\n### Parameters\n\n- `agentId: string`\n\n- `variationId: string`\n\n- `id: string`\n\n### Example\n\n```typescript\nimport Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya();\n\nawait client.agents.variations.removeMemoryLayer('id', { agentId: 'agentId', variationId: 'variationId' })\n```",
    perLanguage: {
      cli: {
        method: 'variations remove_memory_layer',
        example:
          "cadenya agents:variations remove-memory-layer \\\n  --api-key 'My API Key' \\\n  --agent-id agentId \\\n  --variation-id variationId \\\n  --id id",
      },
      go: {
        method: 'client.Agents.Variations.RemoveMemoryLayer',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/cadenya/cadenya-go"\n\t"github.com/cadenya/cadenya-go/option"\n)\n\nfunc main() {\n\tclient := cadenya.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\terr := client.Agents.Variations.RemoveMemoryLayer(\n\t\tcontext.TODO(),\n\t\t"agentId",\n\t\t"variationId",\n\t\t"id",\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://api.cadenya.com/v1/agents/$AGENT_ID/variations/$VARIATION_ID/memory_layer_assignments/$ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.agents.variations.removeMemoryLayer',
        example:
          "import Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.agents.variations.removeMemoryLayer('id', {\n  agentId: 'agentId',\n  variationId: 'variationId',\n});",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v1/objectives',
    httpMethod: 'get',
    summary: 'List objectives',
    description: 'Lists all objectives in the workspace',
    stainlessPath: '(resource) objectives > (method) list',
    qualified: 'client.objectives.list',
    params: [
      'agentId?: string;',
      'cursor?: string;',
      'includeInfo?: boolean;',
      'limit?: number;',
      'parentObjectiveId?: string;',
      'profileId?: string;',
      'sortOrder?: string;',
      'state?: string;',
    ],
    response:
      '{ data: { agent?: agent; data?: object; initialMessage?: string; memoryStack?: memory_reference[]; parentObjectiveId?: string; secrets?: objective_data_secret[]; systemPrompt?: string; variation?: agent_variation; }; metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; status: { state: string; message?: string; }; info?: { callableTools?: callable_tool[]; createdBy?: profile; effectiveMemoryStack?: memory_reference[]; totalContextWindows?: number; totalEvents?: number; totalInputTokens?: number; totalOutputTokens?: number; totalToolCalls?: number; }; lastFiveWindows?: { data: objective_context_window_data; metadata: operation_metadata; info?: object; }[]; }',
    markdown:
      "## list\n\n`client.objectives.list(agentId?: string, cursor?: string, includeInfo?: boolean, limit?: number, parentObjectiveId?: string, profileId?: string, sortOrder?: string, state?: string): { data: objective_data; metadata: operation_metadata; status: objective_status; info?: objective_info; lastFiveWindows?: objective_context_window[]; }`\n\n**get** `/v1/objectives`\n\nLists all objectives in the workspace\n\n### Parameters\n\n- `agentId?: string`\n  Agent ID for filtering\n\n- `cursor?: string`\n  Pagination cursor from previous response\n\n- `includeInfo?: boolean`\n  When set to true you may use more of your alloted API rate-limit\n\n- `limit?: number`\n  Maximum number of results to return\n\n- `parentObjectiveId?: string`\n  Optional filters\n\n- `profileId?: string`\n\n- `sortOrder?: string`\n  Sort order for results (asc or desc by creation time)\n\n- `state?: string`\n  Filter by state\n\n### Returns\n\n- `{ data: { agent?: agent; data?: object; initialMessage?: string; memoryStack?: memory_reference[]; parentObjectiveId?: string; secrets?: objective_data_secret[]; systemPrompt?: string; variation?: agent_variation; }; metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; status: { state: string; message?: string; }; info?: { callableTools?: callable_tool[]; createdBy?: profile; effectiveMemoryStack?: memory_reference[]; totalContextWindows?: number; totalEvents?: number; totalInputTokens?: number; totalOutputTokens?: number; totalToolCalls?: number; }; lastFiveWindows?: { data: objective_context_window_data; metadata: operation_metadata; info?: object; }[]; }`\n\n  - `data: { agent?: { metadata: resource_metadata; spec: agent_spec; info?: agent_info; }; data?: object; initialMessage?: string; memoryStack?: { memoryEntryId?: string; memoryLayerId?: string; }[]; parentObjectiveId?: string; secrets?: { name?: string; value?: string; }[]; systemPrompt?: string; variation?: { metadata: resource_metadata; spec: agent_variation_spec; info?: agent_variation_info; }; }`\n  - `metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `status: { state: string; message?: string; }`\n  - `info?: { callableTools?: { agent?: resource_metadata; cadenyaProvidedTool?: resource_metadata; tool?: resource_metadata; }[]; createdBy?: { metadata: account_resource_metadata; spec: profile_spec; }; effectiveMemoryStack?: { memoryEntryId?: string; memoryLayerId?: string; }[]; totalContextWindows?: number; totalEvents?: number; totalInputTokens?: number; totalOutputTokens?: number; totalToolCalls?: number; }`\n  - `lastFiveWindows?: { data: { completionTokens?: number; objectiveId?: string; previousWindowContinueInstructions?: string; promptTokens?: number; sequence?: number; }; metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; info?: { createdBy?: object; objective?: object; }; }[]`\n\n### Example\n\n```typescript\nimport Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya();\n\n// Automatically fetches more pages as needed.\nfor await (const objective of client.objectives.list()) {\n  console.log(objective);\n}\n```",
    perLanguage: {
      cli: {
        method: 'objectives list',
        example: "cadenya objectives list \\\n  --api-key 'My API Key'",
      },
      go: {
        method: 'client.Objectives.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cadenya/cadenya-go"\n\t"github.com/cadenya/cadenya-go/option"\n)\n\nfunc main() {\n\tclient := cadenya.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Objectives.List(context.TODO(), cadenya.ObjectiveListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://api.cadenya.com/v1/objectives \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.objectives.list',
        example:
          "import Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const objective of client.objectives.list()) {\n  console.log(objective.data);\n}",
      },
    },
  },
  {
    name: 'create',
    endpoint: '/v1/objectives',
    httpMethod: 'post',
    summary: 'Create a new objective',
    description: 'Creates a new objective in the workspace',
    stainlessPath: '(resource) objectives > (method) create',
    qualified: 'client.objectives.create',
    params: [
      'agentId: string;',
      'data: { agent?: { metadata: resource_metadata; spec: agent_spec; info?: agent_info; }; data?: object; initialMessage?: string; memoryStack?: { memoryEntryId?: string; memoryLayerId?: string; }[]; parentObjectiveId?: string; secrets?: { name?: string; value?: string; }[]; systemPrompt?: string; variation?: { metadata: resource_metadata; spec: agent_variation_spec; info?: agent_variation_info; }; };',
      'metadata: { externalId?: string; labels?: object; };',
      'variationId?: string;',
    ],
    response:
      '{ data: { agent?: agent; data?: object; initialMessage?: string; memoryStack?: memory_reference[]; parentObjectiveId?: string; secrets?: objective_data_secret[]; systemPrompt?: string; variation?: agent_variation; }; metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; status: { state: string; message?: string; }; info?: { callableTools?: callable_tool[]; createdBy?: profile; effectiveMemoryStack?: memory_reference[]; totalContextWindows?: number; totalEvents?: number; totalInputTokens?: number; totalOutputTokens?: number; totalToolCalls?: number; }; lastFiveWindows?: { data: objective_context_window_data; metadata: operation_metadata; info?: object; }[]; }',
    markdown:
      '## create\n\n`client.objectives.create(agentId: string, data: { agent?: agent; data?: object; initialMessage?: string; memoryStack?: memory_reference[]; parentObjectiveId?: string; secrets?: objective_data_secret[]; systemPrompt?: string; variation?: agent_variation; }, metadata: { externalId?: string; labels?: object; }, variationId?: string): { data: objective_data; metadata: operation_metadata; status: objective_status; info?: objective_info; lastFiveWindows?: objective_context_window[]; }`\n\n**post** `/v1/objectives`\n\nCreates a new objective in the workspace\n\n### Parameters\n\n- `agentId: string`\n\n- `data: { agent?: { metadata: resource_metadata; spec: agent_spec; info?: agent_info; }; data?: object; initialMessage?: string; memoryStack?: { memoryEntryId?: string; memoryLayerId?: string; }[]; parentObjectiveId?: string; secrets?: { name?: string; value?: string; }[]; systemPrompt?: string; variation?: { metadata: resource_metadata; spec: agent_variation_spec; info?: agent_variation_info; }; }`\n  - `agent?: { metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { status: string; variationSelectionMode: string; description?: string; inputDataSchema?: object; webhookEventsUrl?: string; }; info?: { createdBy?: profile; variationCount?: number; }; }`\n    Agent resource\n  - `data?: object`\n    Represents a dynamically typed value which can be either null, a number, a string, a boolean, a recursive struct value, or a list of values.\n  - `initialMessage?: string`\n    The initial message sent to the agent. This becomes the first user message in the LLM chat history.\n  - `memoryStack?: { memoryEntryId?: string; memoryLayerId?: string; }[]`\n    Memory layers/entries to push onto this objective\'s memory stack on\n top of the baseline stack inherited from the selected variation.\n\n See "Memory stack composition" in memory.proto for lookup semantics.\n\n Array order is push order: the first element sits lower in the\n objective\'s contribution to the stack; the LAST element ends up on\n top of the effective stack. Entries pinned via memory_entry_id behave\n as single-entry layers at their position.\n\n System-managed layers (e.g., episodic) cannot be referenced here;\n they attach themselves automatically via the runtime based on\n episodic_key.\n\n Stack size cap: the TOTAL effective stack (variation\'s memory layers\n + this field) must not exceed 10 entries. A request that would\n produce an effective stack larger than 10 is rejected with\n InvalidArgument. Variations themselves are capped at 10 memory layer\n assignments, so a variation that is already "full" leaves no room\n for objective-level references.\n  - `parentObjectiveId?: string`\n    A parent objective means the objective was spawned off using a separate agent to complete an objective\n  - `secrets?: { name?: string; value?: string; }[]`\n    Secrets that can be used in the headers for tool calls using the secret interpolation format.\n  - `systemPrompt?: string`\n    system_prompt is read-only, derived from the selected variation\'s prompt\n  - `variation?: { metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { compactionConfig?: agent_variation_spec_compaction_config; constraints?: agent_variation_spec_constraints; description?: string; enableEpisodicMemory?: boolean; episodicMemoryTtl?: number; modelConfig?: agent_variation_spec_model_config; progressiveDiscovery?: agent_variation_spec_progressive_discovery; prompt?: string; weight?: number; }; info?: { assignments?: variation_assignment[]; createdBy?: profile; feedbackCount?: number; memoryLayerAssignments?: variation_memory_layer_assignment[]; memoryLayerCount?: number; model?: resource_metadata; score?: number; subAgentCount?: number; toolCount?: number; toolSetCount?: number; }; }`\n    AgentVariation resource\n\n- `metadata: { externalId?: string; labels?: object; }`\n  CreateOperationMetadata contains the user-provided fields for creating\n an operation. Read-only fields (id, account_id, workspace_id, created_at, profile_id)\n are excluded since they are set by the server.\n  - `externalId?: string`\n    External ID for the operation (e.g., a workflow ID from an external system)\n  - `labels?: object`\n    Arbitrary key-value pairs for categorization and filtering\n Examples: {"priority": "high", "source": "api", "workflow": "onboarding"}\n\n- `variationId?: string`\n  Optional explicit variation selection. Overrides the agent\'s variation_selection_mode.\n\n### Returns\n\n- `{ data: { agent?: agent; data?: object; initialMessage?: string; memoryStack?: memory_reference[]; parentObjectiveId?: string; secrets?: objective_data_secret[]; systemPrompt?: string; variation?: agent_variation; }; metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; status: { state: string; message?: string; }; info?: { callableTools?: callable_tool[]; createdBy?: profile; effectiveMemoryStack?: memory_reference[]; totalContextWindows?: number; totalEvents?: number; totalInputTokens?: number; totalOutputTokens?: number; totalToolCalls?: number; }; lastFiveWindows?: { data: objective_context_window_data; metadata: operation_metadata; info?: object; }[]; }`\n\n  - `data: { agent?: { metadata: resource_metadata; spec: agent_spec; info?: agent_info; }; data?: object; initialMessage?: string; memoryStack?: { memoryEntryId?: string; memoryLayerId?: string; }[]; parentObjectiveId?: string; secrets?: { name?: string; value?: string; }[]; systemPrompt?: string; variation?: { metadata: resource_metadata; spec: agent_variation_spec; info?: agent_variation_info; }; }`\n  - `metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `status: { state: string; message?: string; }`\n  - `info?: { callableTools?: { agent?: resource_metadata; cadenyaProvidedTool?: resource_metadata; tool?: resource_metadata; }[]; createdBy?: { metadata: account_resource_metadata; spec: profile_spec; }; effectiveMemoryStack?: { memoryEntryId?: string; memoryLayerId?: string; }[]; totalContextWindows?: number; totalEvents?: number; totalInputTokens?: number; totalOutputTokens?: number; totalToolCalls?: number; }`\n  - `lastFiveWindows?: { data: { completionTokens?: number; objectiveId?: string; previousWindowContinueInstructions?: string; promptTokens?: number; sequence?: number; }; metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; info?: { createdBy?: object; objective?: object; }; }[]`\n\n### Example\n\n```typescript\nimport Cadenya from \'@cadenya/cadenya\';\n\nconst client = new Cadenya();\n\nconst objective = await client.objectives.create({\n  agentId: \'agentId\',\n  data: {},\n  metadata: {},\n});\n\nconsole.log(objective);\n```',
    perLanguage: {
      cli: {
        method: 'objectives create',
        example:
          "cadenya objectives create \\\n  --api-key 'My API Key' \\\n  --agent-id agentId \\\n  --data '{}' \\\n  --metadata '{}'",
      },
      go: {
        method: 'client.Objectives.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cadenya/cadenya-go"\n\t"github.com/cadenya/cadenya-go/option"\n\t"github.com/cadenya/cadenya-go/shared"\n)\n\nfunc main() {\n\tclient := cadenya.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tobjective, err := client.Objectives.New(context.TODO(), cadenya.ObjectiveNewParams{\n\t\tAgentID:  cadenya.F("agentId"),\n\t\tData:     cadenya.F(cadenya.ObjectiveDataParam{}),\n\t\tMetadata: cadenya.F(shared.CreateOperationMetadataParam{}),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", objective.Data)\n}\n',
      },
      http: {
        example:
          'curl https://api.cadenya.com/v1/objectives \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $CADENYA_API_KEY" \\\n    -d \'{\n          "agentId": "agentId",\n          "data": {},\n          "metadata": {}\n        }\'',
      },
      typescript: {
        method: 'client.objectives.create',
        example:
          "import Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nconst objective = await client.objectives.create({\n  agentId: 'agentId',\n  data: {},\n  metadata: {},\n});\n\nconsole.log(objective.data);",
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/v1/objectives/{id}',
    httpMethod: 'get',
    summary: 'Get an objective by ID',
    description: 'Retrieves an objective by ID from the workspace',
    stainlessPath: '(resource) objectives > (method) retrieve',
    qualified: 'client.objectives.retrieve',
    params: ['id: string;'],
    response:
      '{ data: { agent?: agent; data?: object; initialMessage?: string; memoryStack?: memory_reference[]; parentObjectiveId?: string; secrets?: objective_data_secret[]; systemPrompt?: string; variation?: agent_variation; }; metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; status: { state: string; message?: string; }; info?: { callableTools?: callable_tool[]; createdBy?: profile; effectiveMemoryStack?: memory_reference[]; totalContextWindows?: number; totalEvents?: number; totalInputTokens?: number; totalOutputTokens?: number; totalToolCalls?: number; }; lastFiveWindows?: { data: objective_context_window_data; metadata: operation_metadata; info?: object; }[]; }',
    markdown:
      "## retrieve\n\n`client.objectives.retrieve(id: string): { data: objective_data; metadata: operation_metadata; status: objective_status; info?: objective_info; lastFiveWindows?: objective_context_window[]; }`\n\n**get** `/v1/objectives/{id}`\n\nRetrieves an objective by ID from the workspace\n\n### Parameters\n\n- `id: string`\n\n### Returns\n\n- `{ data: { agent?: agent; data?: object; initialMessage?: string; memoryStack?: memory_reference[]; parentObjectiveId?: string; secrets?: objective_data_secret[]; systemPrompt?: string; variation?: agent_variation; }; metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; status: { state: string; message?: string; }; info?: { callableTools?: callable_tool[]; createdBy?: profile; effectiveMemoryStack?: memory_reference[]; totalContextWindows?: number; totalEvents?: number; totalInputTokens?: number; totalOutputTokens?: number; totalToolCalls?: number; }; lastFiveWindows?: { data: objective_context_window_data; metadata: operation_metadata; info?: object; }[]; }`\n\n  - `data: { agent?: { metadata: resource_metadata; spec: agent_spec; info?: agent_info; }; data?: object; initialMessage?: string; memoryStack?: { memoryEntryId?: string; memoryLayerId?: string; }[]; parentObjectiveId?: string; secrets?: { name?: string; value?: string; }[]; systemPrompt?: string; variation?: { metadata: resource_metadata; spec: agent_variation_spec; info?: agent_variation_info; }; }`\n  - `metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `status: { state: string; message?: string; }`\n  - `info?: { callableTools?: { agent?: resource_metadata; cadenyaProvidedTool?: resource_metadata; tool?: resource_metadata; }[]; createdBy?: { metadata: account_resource_metadata; spec: profile_spec; }; effectiveMemoryStack?: { memoryEntryId?: string; memoryLayerId?: string; }[]; totalContextWindows?: number; totalEvents?: number; totalInputTokens?: number; totalOutputTokens?: number; totalToolCalls?: number; }`\n  - `lastFiveWindows?: { data: { completionTokens?: number; objectiveId?: string; previousWindowContinueInstructions?: string; promptTokens?: number; sequence?: number; }; metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; info?: { createdBy?: object; objective?: object; }; }[]`\n\n### Example\n\n```typescript\nimport Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya();\n\nconst objective = await client.objectives.retrieve('id');\n\nconsole.log(objective);\n```",
    perLanguage: {
      cli: {
        method: 'objectives retrieve',
        example: "cadenya objectives retrieve \\\n  --api-key 'My API Key' \\\n  --id id",
      },
      go: {
        method: 'client.Objectives.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cadenya/cadenya-go"\n\t"github.com/cadenya/cadenya-go/option"\n)\n\nfunc main() {\n\tclient := cadenya.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tobjective, err := client.Objectives.Get(context.TODO(), "id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", objective.Data)\n}\n',
      },
      http: {
        example:
          'curl https://api.cadenya.com/v1/objectives/$ID \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.objectives.retrieve',
        example:
          "import Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nconst objective = await client.objectives.retrieve('id');\n\nconsole.log(objective.data);",
      },
    },
  },
  {
    name: 'list_events',
    endpoint: '/v1/objectives/{objectiveId}/events',
    httpMethod: 'get',
    summary: 'List objective events',
    description: 'Lists all events for an objective',
    stainlessPath: '(resource) objectives > (method) list_events',
    qualified: 'client.objectives.listEvents',
    params: [
      'objectiveId: string;',
      'cursor?: string;',
      'includeInfo?: boolean;',
      'limit?: number;',
      'sortOrder?: string;',
      'windowId?: string;',
    ],
    response:
      '{ data: { assistantMessage?: assistant_message; contextWindowCompacted?: context_window_compacted; error?: objective_error; memoryRead?: memory_read; subObjectiveCreated?: sub_objective_created; toolApprovalRequested?: tool_approval_requested; toolApproved?: tool_approved; toolCalled?: tool_called; toolDenied?: tool_denied; toolError?: tool_error; toolResult?: tool_result; type?: string; userMessage?: user_message; }; metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; contextWindowId?: string; info?: { createdBy?: profile; objective?: operation_metadata; }; }',
    markdown:
      "## list_events\n\n`client.objectives.listEvents(objectiveId: string, cursor?: string, includeInfo?: boolean, limit?: number, sortOrder?: string, windowId?: string): { data: objective_event_data; metadata: operation_metadata; contextWindowId?: string; info?: objective_event_info; }`\n\n**get** `/v1/objectives/{objectiveId}/events`\n\nLists all events for an objective\n\n### Parameters\n\n- `objectiveId: string`\n\n- `cursor?: string`\n  Pagination cursor from previous response\n\n- `includeInfo?: boolean`\n  When set to true you may use more of your alloted API rate-limit\n\n- `limit?: number`\n  Maximum number of results to return\n\n- `sortOrder?: string`\n  Sort order for results (asc or desc by creation time)\n\n- `windowId?: string`\n  Optional context window ID to filter events by\n\n### Returns\n\n- `{ data: { assistantMessage?: assistant_message; contextWindowCompacted?: context_window_compacted; error?: objective_error; memoryRead?: memory_read; subObjectiveCreated?: sub_objective_created; toolApprovalRequested?: tool_approval_requested; toolApproved?: tool_approved; toolCalled?: tool_called; toolDenied?: tool_denied; toolError?: tool_error; toolResult?: tool_result; type?: string; userMessage?: user_message; }; metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; contextWindowId?: string; info?: { createdBy?: profile; objective?: operation_metadata; }; }`\n\n  - `data: { assistantMessage?: { content?: string; toolCalls?: assistant_tool_call[]; }; contextWindowCompacted?: { messagesCompacted?: number; newContextWindow?: objective_context_window_data; strategies?: string[]; summary?: string; }; error?: { message?: string; type?: string; }; memoryRead?: { memoryEntryId?: string; memoryLayerId?: string; message?: string; }; subObjectiveCreated?: { metadata?: operation_metadata; }; toolApprovalRequested?: { toolCallId?: string; }; toolApproved?: { toolCallId?: string; }; toolCalled?: { toolCallId?: string; }; toolDenied?: { memo?: string; toolCallId?: string; }; toolError?: { message?: string; toolCallId?: string; }; toolResult?: { content?: string; toolCallId?: string; }; type?: string; userMessage?: { content?: string; }; }`\n  - `metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `contextWindowId?: string`\n  - `info?: { createdBy?: { metadata: account_resource_metadata; spec: profile_spec; }; objective?: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; }`\n\n### Example\n\n```typescript\nimport Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya();\n\n// Automatically fetches more pages as needed.\nfor await (const objectiveListEventsResponse of client.objectives.listEvents('objectiveId')) {\n  console.log(objectiveListEventsResponse);\n}\n```",
    perLanguage: {
      cli: {
        method: 'objectives list_events',
        example:
          "cadenya objectives list-events \\\n  --api-key 'My API Key' \\\n  --objective-id objectiveId",
      },
      go: {
        method: 'client.Objectives.ListEvents',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cadenya/cadenya-go"\n\t"github.com/cadenya/cadenya-go/option"\n)\n\nfunc main() {\n\tclient := cadenya.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Objectives.ListEvents(\n\t\tcontext.TODO(),\n\t\t"objectiveId",\n\t\tcadenya.ObjectiveListEventsParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://api.cadenya.com/v1/objectives/$OBJECTIVE_ID/events \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.objectives.listEvents',
        example:
          "import Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const objectiveListEventsResponse of client.objectives.listEvents('objectiveId')) {\n  console.log(objectiveListEventsResponse.data);\n}",
      },
    },
  },
  {
    name: 'continue',
    endpoint: '/v1/objectives/{objectiveId}/continue',
    httpMethod: 'post',
    summary: 'Continue an objective',
    description: 'Continues an objective that has completed',
    stainlessPath: '(resource) objectives > (method) continue',
    qualified: 'client.objectives.continue',
    params: [
      'objectiveId: string;',
      'enqueue?: boolean;',
      'message?: string;',
      'secrets?: { name?: string; value?: string; }[];',
    ],
    response:
      '{ data: { assistantMessage?: assistant_message; contextWindowCompacted?: context_window_compacted; error?: objective_error; memoryRead?: memory_read; subObjectiveCreated?: sub_objective_created; toolApprovalRequested?: tool_approval_requested; toolApproved?: tool_approved; toolCalled?: tool_called; toolDenied?: tool_denied; toolError?: tool_error; toolResult?: tool_result; type?: string; userMessage?: user_message; }; metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; contextWindowId?: string; info?: { createdBy?: profile; objective?: operation_metadata; }; }',
    markdown:
      "## continue\n\n`client.objectives.continue(objectiveId: string, enqueue?: boolean, message?: string, secrets?: { name?: string; value?: string; }[]): { data: objective_event_data; metadata: operation_metadata; contextWindowId?: string; info?: objective_event_info; }`\n\n**post** `/v1/objectives/{objectiveId}/continue`\n\nContinues an objective that has completed\n\n### Parameters\n\n- `objectiveId: string`\n\n- `enqueue?: boolean`\n  When set to true, the message will be enqueued for when the agent loop is available to process it.\n\n- `message?: string`\n  The message to continue an objective that has completed (or you are enqueing)\n\n- `secrets?: { name?: string; value?: string; }[]`\n  Secrets that should be included with the message. Helpful for when you need to update secrets on the objective (IE: A secret expires and needs to be refreshed)\n\n### Returns\n\n- `{ data: { assistantMessage?: assistant_message; contextWindowCompacted?: context_window_compacted; error?: objective_error; memoryRead?: memory_read; subObjectiveCreated?: sub_objective_created; toolApprovalRequested?: tool_approval_requested; toolApproved?: tool_approved; toolCalled?: tool_called; toolDenied?: tool_denied; toolError?: tool_error; toolResult?: tool_result; type?: string; userMessage?: user_message; }; metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; contextWindowId?: string; info?: { createdBy?: profile; objective?: operation_metadata; }; }`\n\n  - `data: { assistantMessage?: { content?: string; toolCalls?: assistant_tool_call[]; }; contextWindowCompacted?: { messagesCompacted?: number; newContextWindow?: objective_context_window_data; strategies?: string[]; summary?: string; }; error?: { message?: string; type?: string; }; memoryRead?: { memoryEntryId?: string; memoryLayerId?: string; message?: string; }; subObjectiveCreated?: { metadata?: operation_metadata; }; toolApprovalRequested?: { toolCallId?: string; }; toolApproved?: { toolCallId?: string; }; toolCalled?: { toolCallId?: string; }; toolDenied?: { memo?: string; toolCallId?: string; }; toolError?: { message?: string; toolCallId?: string; }; toolResult?: { content?: string; toolCallId?: string; }; type?: string; userMessage?: { content?: string; }; }`\n  - `metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `contextWindowId?: string`\n  - `info?: { createdBy?: { metadata: account_resource_metadata; spec: profile_spec; }; objective?: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; }`\n\n### Example\n\n```typescript\nimport Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya();\n\nconst response = await client.objectives.continue('objectiveId');\n\nconsole.log(response);\n```",
    perLanguage: {
      cli: {
        method: 'objectives continue',
        example: "cadenya objectives continue \\\n  --api-key 'My API Key' \\\n  --objective-id objectiveId",
      },
      go: {
        method: 'client.Objectives.Continue',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cadenya/cadenya-go"\n\t"github.com/cadenya/cadenya-go/option"\n)\n\nfunc main() {\n\tclient := cadenya.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Objectives.Continue(\n\t\tcontext.TODO(),\n\t\t"objectiveId",\n\t\tcadenya.ObjectiveContinueParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Data)\n}\n',
      },
      http: {
        example:
          "curl https://api.cadenya.com/v1/objectives/$OBJECTIVE_ID/continue \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $CADENYA_API_KEY\" \\\n    -d '{}'",
      },
      typescript: {
        method: 'client.objectives.continue',
        example:
          "import Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.objectives.continue('objectiveId');\n\nconsole.log(response.data);",
      },
    },
  },
  {
    name: 'cancel',
    endpoint: '/v1/objectives/{objectiveId}/cancel',
    httpMethod: 'post',
    summary: 'Cancel an objective',
    description:
      "Cancels a running or pending objective. The objective's state will be set to STATE_CANCELLED.",
    stainlessPath: '(resource) objectives > (method) cancel',
    qualified: 'client.objectives.cancel',
    params: ['objectiveId: string;', 'reason?: string;'],
    response:
      '{ data: { agent?: agent; data?: object; initialMessage?: string; memoryStack?: memory_reference[]; parentObjectiveId?: string; secrets?: objective_data_secret[]; systemPrompt?: string; variation?: agent_variation; }; metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; status: { state: string; message?: string; }; info?: { callableTools?: callable_tool[]; createdBy?: profile; effectiveMemoryStack?: memory_reference[]; totalContextWindows?: number; totalEvents?: number; totalInputTokens?: number; totalOutputTokens?: number; totalToolCalls?: number; }; lastFiveWindows?: { data: objective_context_window_data; metadata: operation_metadata; info?: object; }[]; }',
    markdown:
      "## cancel\n\n`client.objectives.cancel(objectiveId: string, reason?: string): { data: objective_data; metadata: operation_metadata; status: objective_status; info?: objective_info; lastFiveWindows?: objective_context_window[]; }`\n\n**post** `/v1/objectives/{objectiveId}/cancel`\n\nCancels a running or pending objective. The objective's state will be set to STATE_CANCELLED.\n\n### Parameters\n\n- `objectiveId: string`\n\n- `reason?: string`\n  Optional reason for cancellation\n\n### Returns\n\n- `{ data: { agent?: agent; data?: object; initialMessage?: string; memoryStack?: memory_reference[]; parentObjectiveId?: string; secrets?: objective_data_secret[]; systemPrompt?: string; variation?: agent_variation; }; metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; status: { state: string; message?: string; }; info?: { callableTools?: callable_tool[]; createdBy?: profile; effectiveMemoryStack?: memory_reference[]; totalContextWindows?: number; totalEvents?: number; totalInputTokens?: number; totalOutputTokens?: number; totalToolCalls?: number; }; lastFiveWindows?: { data: objective_context_window_data; metadata: operation_metadata; info?: object; }[]; }`\n\n  - `data: { agent?: { metadata: resource_metadata; spec: agent_spec; info?: agent_info; }; data?: object; initialMessage?: string; memoryStack?: { memoryEntryId?: string; memoryLayerId?: string; }[]; parentObjectiveId?: string; secrets?: { name?: string; value?: string; }[]; systemPrompt?: string; variation?: { metadata: resource_metadata; spec: agent_variation_spec; info?: agent_variation_info; }; }`\n  - `metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `status: { state: string; message?: string; }`\n  - `info?: { callableTools?: { agent?: resource_metadata; cadenyaProvidedTool?: resource_metadata; tool?: resource_metadata; }[]; createdBy?: { metadata: account_resource_metadata; spec: profile_spec; }; effectiveMemoryStack?: { memoryEntryId?: string; memoryLayerId?: string; }[]; totalContextWindows?: number; totalEvents?: number; totalInputTokens?: number; totalOutputTokens?: number; totalToolCalls?: number; }`\n  - `lastFiveWindows?: { data: { completionTokens?: number; objectiveId?: string; previousWindowContinueInstructions?: string; promptTokens?: number; sequence?: number; }; metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; info?: { createdBy?: object; objective?: object; }; }[]`\n\n### Example\n\n```typescript\nimport Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya();\n\nconst objective = await client.objectives.cancel('objectiveId');\n\nconsole.log(objective);\n```",
    perLanguage: {
      cli: {
        method: 'objectives cancel',
        example: "cadenya objectives cancel \\\n  --api-key 'My API Key' \\\n  --objective-id objectiveId",
      },
      go: {
        method: 'client.Objectives.Cancel',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cadenya/cadenya-go"\n\t"github.com/cadenya/cadenya-go/option"\n)\n\nfunc main() {\n\tclient := cadenya.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tobjective, err := client.Objectives.Cancel(\n\t\tcontext.TODO(),\n\t\t"objectiveId",\n\t\tcadenya.ObjectiveCancelParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", objective.Data)\n}\n',
      },
      http: {
        example:
          "curl https://api.cadenya.com/v1/objectives/$OBJECTIVE_ID/cancel \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $CADENYA_API_KEY\" \\\n    -d '{}'",
      },
      typescript: {
        method: 'client.objectives.cancel',
        example:
          "import Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nconst objective = await client.objectives.cancel('objectiveId');\n\nconsole.log(objective.data);",
      },
    },
  },
  {
    name: 'compact',
    endpoint: '/v1/objectives/{objectiveId}/compact',
    httpMethod: 'post',
    summary: 'Compact an objective',
    description:
      "Triggers compaction on a running objective. Optionally override the variation's compaction config.",
    stainlessPath: '(resource) objectives > (method) compact',
    qualified: 'client.objectives.compact',
    params: [
      'objectiveId: string;',
      'compactionConfig?: { summarization?: { instructions?: string; }; toolResultClearing?: { preserveRecentResults?: number; }; triggerThreshold?: number; };',
    ],
    response:
      '{ contextWindow?: { completionTokens?: number; objectiveId?: string; previousWindowContinueInstructions?: string; promptTokens?: number; sequence?: number; }; }',
    markdown:
      "## compact\n\n`client.objectives.compact(objectiveId: string, compactionConfig?: { summarization?: compaction_config_summarization_strategy; toolResultClearing?: compaction_config_tool_result_clearing_strategy; triggerThreshold?: number; }): { contextWindow?: objective_context_window_data; }`\n\n**post** `/v1/objectives/{objectiveId}/compact`\n\nTriggers compaction on a running objective. Optionally override the variation's compaction config.\n\n### Parameters\n\n- `objectiveId: string`\n\n- `compactionConfig?: { summarization?: { instructions?: string; }; toolResultClearing?: { preserveRecentResults?: number; }; triggerThreshold?: number; }`\n  CompactionConfig defines how context window compaction behaves for objectives using this variation.\n  - `summarization?: { instructions?: string; }`\n    SummarizationStrategy configures LLM-powered summarization of older conversation turns.\n  - `toolResultClearing?: { preserveRecentResults?: number; }`\n    ToolResultClearingStrategy configures clearing of older tool result content.\n  - `triggerThreshold?: number`\n    Trigger threshold as a percentage of the model's context window (0.0 to 1.0).\n When input tokens reach this percentage of the model's limit, compaction triggers.\n Default: 0.75 (75%)\n\n### Returns\n\n- `{ contextWindow?: { completionTokens?: number; objectiveId?: string; previousWindowContinueInstructions?: string; promptTokens?: number; sequence?: number; }; }`\n  Compact objective response\n\n  - `contextWindow?: { completionTokens?: number; objectiveId?: string; previousWindowContinueInstructions?: string; promptTokens?: number; sequence?: number; }`\n\n### Example\n\n```typescript\nimport Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya();\n\nconst response = await client.objectives.compact('objectiveId');\n\nconsole.log(response);\n```",
    perLanguage: {
      cli: {
        method: 'objectives compact',
        example: "cadenya objectives compact \\\n  --api-key 'My API Key' \\\n  --objective-id objectiveId",
      },
      go: {
        method: 'client.Objectives.Compact',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cadenya/cadenya-go"\n\t"github.com/cadenya/cadenya-go/option"\n)\n\nfunc main() {\n\tclient := cadenya.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Objectives.Compact(\n\t\tcontext.TODO(),\n\t\t"objectiveId",\n\t\tcadenya.ObjectiveCompactParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.ContextWindow)\n}\n',
      },
      http: {
        example:
          "curl https://api.cadenya.com/v1/objectives/$OBJECTIVE_ID/compact \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $CADENYA_API_KEY\" \\\n    -d '{}'",
      },
      typescript: {
        method: 'client.objectives.compact',
        example:
          "import Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.objectives.compact('objectiveId');\n\nconsole.log(response.contextWindow);",
      },
    },
  },
  {
    name: 'list_context_windows',
    endpoint: '/v1/objectives/{objectiveId}/context_windows',
    httpMethod: 'get',
    summary: 'List objective context windows',
    description:
      'Read-only list of the last five windows of execution for this objective, ordered by most recent first',
    stainlessPath: '(resource) objectives > (method) list_context_windows',
    qualified: 'client.objectives.listContextWindows',
    params: ['objectiveId: string;', 'cursor?: string;', 'includeInfo?: boolean;', 'limit?: number;'],
    response:
      '{ data: { completionTokens?: number; objectiveId?: string; previousWindowContinueInstructions?: string; promptTokens?: number; sequence?: number; }; metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; info?: { createdBy?: object; objective?: object; }; }',
    markdown:
      "## list_context_windows\n\n`client.objectives.listContextWindows(objectiveId: string, cursor?: string, includeInfo?: boolean, limit?: number): { data: objective_context_window_data; metadata: operation_metadata; info?: object; }`\n\n**get** `/v1/objectives/{objectiveId}/context_windows`\n\nRead-only list of the last five windows of execution for this objective, ordered by most recent first\n\n### Parameters\n\n- `objectiveId: string`\n\n- `cursor?: string`\n  Pagination cursor from previous response\n\n- `includeInfo?: boolean`\n  When set to true you may use more of your alloted API rate-limit\n\n- `limit?: number`\n  Maximum number of results to return\n\n### Returns\n\n- `{ data: { completionTokens?: number; objectiveId?: string; previousWindowContinueInstructions?: string; promptTokens?: number; sequence?: number; }; metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; info?: { createdBy?: object; objective?: object; }; }`\n  ObjectiveContextWindow is a window of chat completions that is grouped together to prevent context-window overflows. Context windows also allow\n agents to compact their windows and carry on into a new one.\n\n  - `data: { completionTokens?: number; objectiveId?: string; previousWindowContinueInstructions?: string; promptTokens?: number; sequence?: number; }`\n  - `metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `info?: { createdBy?: { metadata: object; spec: object; }; objective?: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; }`\n\n### Example\n\n```typescript\nimport Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya();\n\n// Automatically fetches more pages as needed.\nfor await (const objectiveContextWindow of client.objectives.listContextWindows('objectiveId')) {\n  console.log(objectiveContextWindow);\n}\n```",
    perLanguage: {
      cli: {
        method: 'objectives list_context_windows',
        example:
          "cadenya objectives list-context-windows \\\n  --api-key 'My API Key' \\\n  --objective-id objectiveId",
      },
      go: {
        method: 'client.Objectives.ListContextWindows',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cadenya/cadenya-go"\n\t"github.com/cadenya/cadenya-go/option"\n)\n\nfunc main() {\n\tclient := cadenya.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Objectives.ListContextWindows(\n\t\tcontext.TODO(),\n\t\t"objectiveId",\n\t\tcadenya.ObjectiveListContextWindowsParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://api.cadenya.com/v1/objectives/$OBJECTIVE_ID/context_windows \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.objectives.listContextWindows',
        example:
          "import Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const objectiveContextWindow of client.objectives.listContextWindows('objectiveId')) {\n  console.log(objectiveContextWindow.data);\n}",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v1/objectives/{objectiveId}/tools',
    httpMethod: 'get',
    summary: 'List objective tools',
    description: 'Lists all tools that were assigned to an objective',
    stainlessPath: '(resource) objectives.tools > (method) list',
    qualified: 'client.objectives.tools.list',
    params: ['objectiveId: string;', 'cursor?: string;', 'limit?: number;'],
    response:
      '{ metadata: { id?: string; name?: string; }; snapshot?: { metadata: resource_metadata; spec: tool_spec; info?: tool_info; }; }',
    markdown:
      "## list\n\n`client.objectives.tools.list(objectiveId: string, cursor?: string, limit?: number): { metadata: bare_metadata; snapshot?: tool; }`\n\n**get** `/v1/objectives/{objectiveId}/tools`\n\nLists all tools that were assigned to an objective\n\n### Parameters\n\n- `objectiveId: string`\n\n- `cursor?: string`\n  Pagination cursor from previous response\n\n- `limit?: number`\n  Maximum number of results to return\n\n### Returns\n\n- `{ metadata: { id?: string; name?: string; }; snapshot?: { metadata: resource_metadata; spec: tool_spec; info?: tool_info; }; }`\n  ObjectiveTool represents a tool that was assigned to an objective.\n\n  - `metadata: { id?: string; name?: string; }`\n  - `snapshot?: { metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { config: tool_spec_config; description: string; parameters: object; status: string; requiresApproval?: boolean; }; info?: { createdBy?: profile; toolSet?: resource_metadata; }; }`\n\n### Example\n\n```typescript\nimport Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya();\n\n// Automatically fetches more pages as needed.\nfor await (const objectiveTool of client.objectives.tools.list('objectiveId')) {\n  console.log(objectiveTool);\n}\n```",
    perLanguage: {
      cli: {
        method: 'tools list',
        example:
          "cadenya objectives:tools list \\\n  --api-key 'My API Key' \\\n  --objective-id objectiveId",
      },
      go: {
        method: 'client.Objectives.Tools.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cadenya/cadenya-go"\n\t"github.com/cadenya/cadenya-go/option"\n)\n\nfunc main() {\n\tclient := cadenya.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Objectives.Tools.List(\n\t\tcontext.TODO(),\n\t\t"objectiveId",\n\t\tcadenya.ObjectiveToolListParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://api.cadenya.com/v1/objectives/$OBJECTIVE_ID/tools \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.objectives.tools.list',
        example:
          "import Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const objectiveTool of client.objectives.tools.list('objectiveId')) {\n  console.log(objectiveTool.metadata);\n}",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v1/objectives/{objectiveId}/tool_calls',
    httpMethod: 'get',
    summary: 'List objective tool calls',
    description: 'Lists all tool calls for an objective',
    stainlessPath: '(resource) objectives.tool_calls > (method) list',
    qualified: 'client.objectives.toolCalls.list',
    params: [
      'objectiveId: string;',
      'cursor?: string;',
      'includeInfo?: boolean;',
      'limit?: number;',
      'status?: string;',
    ],
    response:
      '{ data: { callable: callable_tool; arguments?: object; memo?: string; result?: string; statusChangedBy?: profile; }; metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; status: string; executionStatus?: string; info?: { createdBy?: profile; objective?: operation_metadata; }; }',
    markdown:
      "## list\n\n`client.objectives.toolCalls.list(objectiveId: string, cursor?: string, includeInfo?: boolean, limit?: number, status?: string): { data: objective_tool_call_data; metadata: operation_metadata; status: string; executionStatus?: string; info?: objective_tool_call_info; }`\n\n**get** `/v1/objectives/{objectiveId}/tool_calls`\n\nLists all tool calls for an objective\n\n### Parameters\n\n- `objectiveId: string`\n\n- `cursor?: string`\n  Pagination cursor from previous response\n\n- `includeInfo?: boolean`\n  When set to true you may use more of your alloted API rate-limit\n\n- `limit?: number`\n  Maximum number of results to return\n\n- `status?: string`\n  Filter by tool call status\n\n### Returns\n\n- `{ data: { callable: callable_tool; arguments?: object; memo?: string; result?: string; statusChangedBy?: profile; }; metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; status: string; executionStatus?: string; info?: { createdBy?: profile; objective?: operation_metadata; }; }`\n  ObjectiveToolCall is a record of a tool call made during an objective's execution.\n Tool calls are mutable — their status changes as they are approved, denied, or executed.\n\n  - `data: { callable: { agent?: resource_metadata; cadenyaProvidedTool?: resource_metadata; tool?: resource_metadata; }; arguments?: object; memo?: string; result?: string; statusChangedBy?: { metadata: account_resource_metadata; spec: profile_spec; }; }`\n  - `metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `status: string`\n  - `executionStatus?: string`\n  - `info?: { createdBy?: { metadata: account_resource_metadata; spec: profile_spec; }; objective?: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; }`\n\n### Example\n\n```typescript\nimport Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya();\n\n// Automatically fetches more pages as needed.\nfor await (const objectiveToolCall of client.objectives.toolCalls.list('objectiveId')) {\n  console.log(objectiveToolCall);\n}\n```",
    perLanguage: {
      cli: {
        method: 'tool_calls list',
        example:
          "cadenya objectives:tool-calls list \\\n  --api-key 'My API Key' \\\n  --objective-id objectiveId",
      },
      go: {
        method: 'client.Objectives.ToolCalls.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cadenya/cadenya-go"\n\t"github.com/cadenya/cadenya-go/option"\n)\n\nfunc main() {\n\tclient := cadenya.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Objectives.ToolCalls.List(\n\t\tcontext.TODO(),\n\t\t"objectiveId",\n\t\tcadenya.ObjectiveToolCallListParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://api.cadenya.com/v1/objectives/$OBJECTIVE_ID/tool_calls \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.objectives.toolCalls.list',
        example:
          "import Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const objectiveToolCall of client.objectives.toolCalls.list('objectiveId')) {\n  console.log(objectiveToolCall.data);\n}",
      },
    },
  },
  {
    name: 'approve',
    endpoint: '/v1/objectives/{objectiveId}/tool_calls/{toolCallId}/approve',
    httpMethod: 'put',
    summary: 'Approve a tool call',
    description:
      'When an agent attempts to use a tool that requires approval, use this endpoint to mark it as approved.',
    stainlessPath: '(resource) objectives.tool_calls > (method) approve',
    qualified: 'client.objectives.toolCalls.approve',
    params: ['objectiveId: string;', 'toolCallId: string;'],
    response:
      '{ data: { callable: callable_tool; arguments?: object; memo?: string; result?: string; statusChangedBy?: profile; }; metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; status: string; executionStatus?: string; info?: { createdBy?: profile; objective?: operation_metadata; }; }',
    markdown:
      "## approve\n\n`client.objectives.toolCalls.approve(objectiveId: string, toolCallId: string): { data: objective_tool_call_data; metadata: operation_metadata; status: string; executionStatus?: string; info?: objective_tool_call_info; }`\n\n**put** `/v1/objectives/{objectiveId}/tool_calls/{toolCallId}/approve`\n\nWhen an agent attempts to use a tool that requires approval, use this endpoint to mark it as approved.\n\n### Parameters\n\n- `objectiveId: string`\n\n- `toolCallId: string`\n\n### Returns\n\n- `{ data: { callable: callable_tool; arguments?: object; memo?: string; result?: string; statusChangedBy?: profile; }; metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; status: string; executionStatus?: string; info?: { createdBy?: profile; objective?: operation_metadata; }; }`\n  ObjectiveToolCall is a record of a tool call made during an objective's execution.\n Tool calls are mutable — their status changes as they are approved, denied, or executed.\n\n  - `data: { callable: { agent?: resource_metadata; cadenyaProvidedTool?: resource_metadata; tool?: resource_metadata; }; arguments?: object; memo?: string; result?: string; statusChangedBy?: { metadata: account_resource_metadata; spec: profile_spec; }; }`\n  - `metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `status: string`\n  - `executionStatus?: string`\n  - `info?: { createdBy?: { metadata: account_resource_metadata; spec: profile_spec; }; objective?: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; }`\n\n### Example\n\n```typescript\nimport Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya();\n\nconst objectiveToolCall = await client.objectives.toolCalls.approve('toolCallId', { objectiveId: 'objectiveId' });\n\nconsole.log(objectiveToolCall);\n```",
    perLanguage: {
      cli: {
        method: 'tool_calls approve',
        example:
          "cadenya objectives:tool-calls approve \\\n  --api-key 'My API Key' \\\n  --objective-id objectiveId \\\n  --tool-call-id toolCallId",
      },
      go: {
        method: 'client.Objectives.ToolCalls.Approve',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cadenya/cadenya-go"\n\t"github.com/cadenya/cadenya-go/option"\n)\n\nfunc main() {\n\tclient := cadenya.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tobjectiveToolCall, err := client.Objectives.ToolCalls.Approve(\n\t\tcontext.TODO(),\n\t\t"objectiveId",\n\t\t"toolCallId",\n\t\tcadenya.ObjectiveToolCallApproveParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", objectiveToolCall.Data)\n}\n',
      },
      http: {
        example:
          "curl https://api.cadenya.com/v1/objectives/$OBJECTIVE_ID/tool_calls/$TOOL_CALL_ID/approve \\\n    -X PUT \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $CADENYA_API_KEY\" \\\n    -d '{}'",
      },
      typescript: {
        method: 'client.objectives.toolCalls.approve',
        example:
          "import Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nconst objectiveToolCall = await client.objectives.toolCalls.approve('toolCallId', {\n  objectiveId: 'objectiveId',\n});\n\nconsole.log(objectiveToolCall.data);",
      },
    },
  },
  {
    name: 'deny',
    endpoint: '/v1/objectives/{objectiveId}/tool_calls/{toolCallId}/deny',
    httpMethod: 'put',
    summary: 'Deny a tool call',
    description:
      'When an agent attempts to use a tool that requires approval, use this endpoint to mark it as denied. Use a memo to steer the LLM to a different decision or usage of the tool.',
    stainlessPath: '(resource) objectives.tool_calls > (method) deny',
    qualified: 'client.objectives.toolCalls.deny',
    params: ['objectiveId: string;', 'toolCallId: string;', 'memo?: string;'],
    response:
      '{ data: { callable: callable_tool; arguments?: object; memo?: string; result?: string; statusChangedBy?: profile; }; metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; status: string; executionStatus?: string; info?: { createdBy?: profile; objective?: operation_metadata; }; }',
    markdown:
      "## deny\n\n`client.objectives.toolCalls.deny(objectiveId: string, toolCallId: string, memo?: string): { data: objective_tool_call_data; metadata: operation_metadata; status: string; executionStatus?: string; info?: objective_tool_call_info; }`\n\n**put** `/v1/objectives/{objectiveId}/tool_calls/{toolCallId}/deny`\n\nWhen an agent attempts to use a tool that requires approval, use this endpoint to mark it as denied. Use a memo to steer the LLM to a different decision or usage of the tool.\n\n### Parameters\n\n- `objectiveId: string`\n\n- `toolCallId: string`\n\n- `memo?: string`\n  A memo to associate to the tool call denial. Use a memo to steer the LLM to a different decision or usage of the tool.\n\n### Returns\n\n- `{ data: { callable: callable_tool; arguments?: object; memo?: string; result?: string; statusChangedBy?: profile; }; metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; status: string; executionStatus?: string; info?: { createdBy?: profile; objective?: operation_metadata; }; }`\n  ObjectiveToolCall is a record of a tool call made during an objective's execution.\n Tool calls are mutable — their status changes as they are approved, denied, or executed.\n\n  - `data: { callable: { agent?: resource_metadata; cadenyaProvidedTool?: resource_metadata; tool?: resource_metadata; }; arguments?: object; memo?: string; result?: string; statusChangedBy?: { metadata: account_resource_metadata; spec: profile_spec; }; }`\n  - `metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `status: string`\n  - `executionStatus?: string`\n  - `info?: { createdBy?: { metadata: account_resource_metadata; spec: profile_spec; }; objective?: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; }`\n\n### Example\n\n```typescript\nimport Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya();\n\nconst objectiveToolCall = await client.objectives.toolCalls.deny('toolCallId', { objectiveId: 'objectiveId' });\n\nconsole.log(objectiveToolCall);\n```",
    perLanguage: {
      cli: {
        method: 'tool_calls deny',
        example:
          "cadenya objectives:tool-calls deny \\\n  --api-key 'My API Key' \\\n  --objective-id objectiveId \\\n  --tool-call-id toolCallId",
      },
      go: {
        method: 'client.Objectives.ToolCalls.Deny',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cadenya/cadenya-go"\n\t"github.com/cadenya/cadenya-go/option"\n)\n\nfunc main() {\n\tclient := cadenya.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tobjectiveToolCall, err := client.Objectives.ToolCalls.Deny(\n\t\tcontext.TODO(),\n\t\t"objectiveId",\n\t\t"toolCallId",\n\t\tcadenya.ObjectiveToolCallDenyParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", objectiveToolCall.Data)\n}\n',
      },
      http: {
        example:
          "curl https://api.cadenya.com/v1/objectives/$OBJECTIVE_ID/tool_calls/$TOOL_CALL_ID/deny \\\n    -X PUT \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $CADENYA_API_KEY\" \\\n    -d '{}'",
      },
      typescript: {
        method: 'client.objectives.toolCalls.deny',
        example:
          "import Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nconst objectiveToolCall = await client.objectives.toolCalls.deny('toolCallId', {\n  objectiveId: 'objectiveId',\n});\n\nconsole.log(objectiveToolCall.data);",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v1/objectives/{objectiveId}/tasks',
    httpMethod: 'get',
    summary: 'List objective tasks',
    description: 'Lists all tasks for an objective',
    stainlessPath: '(resource) objectives.tasks > (method) list',
    qualified: 'client.objectives.tasks.list',
    params: ['objectiveId: string;', 'cursor?: string;', 'limit?: number;', 'sortOrder?: string;'],
    response:
      '{ data: { completed: boolean; number: number; task: string; completedAt?: string; }; metadata: { id?: string; name?: string; }; }',
    markdown:
      "## list\n\n`client.objectives.tasks.list(objectiveId: string, cursor?: string, limit?: number, sortOrder?: string): { data: objective_task_data; metadata: bare_metadata; }`\n\n**get** `/v1/objectives/{objectiveId}/tasks`\n\nLists all tasks for an objective\n\n### Parameters\n\n- `objectiveId: string`\n\n- `cursor?: string`\n  Pagination cursor from previous response\n\n- `limit?: number`\n  Maximum number of results to return\n\n- `sortOrder?: string`\n  Sort order for results\n\n### Returns\n\n- `{ data: { completed: boolean; number: number; task: string; completedAt?: string; }; metadata: { id?: string; name?: string; }; }`\n  ObjectiveTask represents a task within an objective, typically created and managed by an AI agent\n to track progress toward completing the objective.\n\n  - `data: { completed: boolean; number: number; task: string; completedAt?: string; }`\n  - `metadata: { id?: string; name?: string; }`\n\n### Example\n\n```typescript\nimport Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya();\n\n// Automatically fetches more pages as needed.\nfor await (const objectiveTask of client.objectives.tasks.list('objectiveId')) {\n  console.log(objectiveTask);\n}\n```",
    perLanguage: {
      cli: {
        method: 'tasks list',
        example:
          "cadenya objectives:tasks list \\\n  --api-key 'My API Key' \\\n  --objective-id objectiveId",
      },
      go: {
        method: 'client.Objectives.Tasks.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cadenya/cadenya-go"\n\t"github.com/cadenya/cadenya-go/option"\n)\n\nfunc main() {\n\tclient := cadenya.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Objectives.Tasks.List(\n\t\tcontext.TODO(),\n\t\t"objectiveId",\n\t\tcadenya.ObjectiveTaskListParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://api.cadenya.com/v1/objectives/$OBJECTIVE_ID/tasks \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.objectives.tasks.list',
        example:
          "import Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const objectiveTask of client.objectives.tasks.list('objectiveId')) {\n  console.log(objectiveTask.data);\n}",
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/v1/objectives/{objectiveId}/tasks/{id}',
    httpMethod: 'get',
    summary: 'Get an objective task by ID',
    description: 'Retrieves a task by ID from an objective',
    stainlessPath: '(resource) objectives.tasks > (method) retrieve',
    qualified: 'client.objectives.tasks.retrieve',
    params: ['objectiveId: string;', 'id: string;'],
    response:
      '{ data: { completed: boolean; number: number; task: string; completedAt?: string; }; metadata: { id?: string; name?: string; }; }',
    markdown:
      "## retrieve\n\n`client.objectives.tasks.retrieve(objectiveId: string, id: string): { data: objective_task_data; metadata: bare_metadata; }`\n\n**get** `/v1/objectives/{objectiveId}/tasks/{id}`\n\nRetrieves a task by ID from an objective\n\n### Parameters\n\n- `objectiveId: string`\n\n- `id: string`\n\n### Returns\n\n- `{ data: { completed: boolean; number: number; task: string; completedAt?: string; }; metadata: { id?: string; name?: string; }; }`\n  ObjectiveTask represents a task within an objective, typically created and managed by an AI agent\n to track progress toward completing the objective.\n\n  - `data: { completed: boolean; number: number; task: string; completedAt?: string; }`\n  - `metadata: { id?: string; name?: string; }`\n\n### Example\n\n```typescript\nimport Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya();\n\nconst objectiveTask = await client.objectives.tasks.retrieve('id', { objectiveId: 'objectiveId' });\n\nconsole.log(objectiveTask);\n```",
    perLanguage: {
      cli: {
        method: 'tasks retrieve',
        example:
          "cadenya objectives:tasks retrieve \\\n  --api-key 'My API Key' \\\n  --objective-id objectiveId \\\n  --id id",
      },
      go: {
        method: 'client.Objectives.Tasks.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cadenya/cadenya-go"\n\t"github.com/cadenya/cadenya-go/option"\n)\n\nfunc main() {\n\tclient := cadenya.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tobjectiveTask, err := client.Objectives.Tasks.Get(\n\t\tcontext.TODO(),\n\t\t"objectiveId",\n\t\t"id",\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", objectiveTask.Data)\n}\n',
      },
      http: {
        example:
          'curl https://api.cadenya.com/v1/objectives/$OBJECTIVE_ID/tasks/$ID \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.objectives.tasks.retrieve',
        example:
          "import Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nconst objectiveTask = await client.objectives.tasks.retrieve('id', { objectiveId: 'objectiveId' });\n\nconsole.log(objectiveTask.data);",
      },
    },
  },
  {
    name: 'create',
    endpoint: '/v1/objectives/{objectiveId}/feedback',
    httpMethod: 'post',
    summary: 'Submit feedback for an objective',
    description:
      "Submits feedback for an objective's execution. Feedback scores are used by the agent variation scoring system to evaluate and rank variation performance.",
    stainlessPath: '(resource) objectives.feedback > (method) create',
    qualified: 'client.objectives.feedback.create',
    params: [
      'objectiveId: string;',
      'data: { comment?: string; score?: number; };',
      'metadata: { externalId?: string; labels?: object; };',
    ],
    response:
      '{ data: { comment?: string; score?: number; }; metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; info?: { agentVariation?: bare_metadata; objective?: bare_metadata; submittedBy?: profile; }; }',
    markdown:
      '## create\n\n`client.objectives.feedback.create(objectiveId: string, data: { comment?: string; score?: number; }, metadata: { externalId?: string; labels?: object; }): { data: objective_feedback_data; metadata: operation_metadata; info?: objective_feedback_info; }`\n\n**post** `/v1/objectives/{objectiveId}/feedback`\n\nSubmits feedback for an objective\'s execution. Feedback scores are used by the agent variation scoring system to evaluate and rank variation performance.\n\n### Parameters\n\n- `objectiveId: string`\n\n- `data: { comment?: string; score?: number; }`\n  - `comment?: string`\n    Optional human-readable comment explaining the feedback\n  - `score?: number`\n    A score between -1.0 and 1.0 representing the quality of the objective\'s execution.\n -1.0 is the worst possible score, 0.0 is neutral, and 1.0 is the best.\n\n- `metadata: { externalId?: string; labels?: object; }`\n  CreateOperationMetadata contains the user-provided fields for creating\n an operation. Read-only fields (id, account_id, workspace_id, created_at, profile_id)\n are excluded since they are set by the server.\n  - `externalId?: string`\n    External ID for the operation (e.g., a workflow ID from an external system)\n  - `labels?: object`\n    Arbitrary key-value pairs for categorization and filtering\n Examples: {"priority": "high", "source": "api", "workflow": "onboarding"}\n\n### Returns\n\n- `{ data: { comment?: string; score?: number; }; metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; info?: { agentVariation?: bare_metadata; objective?: bare_metadata; submittedBy?: profile; }; }`\n  ObjectiveFeedback represents feedback submitted for an objective\'s execution.\n Feedback is used to score agent variations and improve agent performance over time.\n\n  - `data: { comment?: string; score?: number; }`\n  - `metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `info?: { agentVariation?: { id?: string; name?: string; }; objective?: { id?: string; name?: string; }; submittedBy?: { metadata: account_resource_metadata; spec: profile_spec; }; }`\n\n### Example\n\n```typescript\nimport Cadenya from \'@cadenya/cadenya\';\n\nconst client = new Cadenya();\n\nconst objectiveFeedback = await client.objectives.feedback.create(\'objectiveId\', {\n  data: {},\n  metadata: {},\n});\n\nconsole.log(objectiveFeedback);\n```',
    perLanguage: {
      cli: {
        method: 'feedback create',
        example:
          "cadenya objectives:feedback create \\\n  --api-key 'My API Key' \\\n  --objective-id objectiveId \\\n  --data '{}' \\\n  --metadata '{}'",
      },
      go: {
        method: 'client.Objectives.Feedback.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cadenya/cadenya-go"\n\t"github.com/cadenya/cadenya-go/option"\n\t"github.com/cadenya/cadenya-go/shared"\n)\n\nfunc main() {\n\tclient := cadenya.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tobjectiveFeedback, err := client.Objectives.Feedback.New(\n\t\tcontext.TODO(),\n\t\t"objectiveId",\n\t\tcadenya.ObjectiveFeedbackNewParams{\n\t\t\tData:     cadenya.F(cadenya.ObjectiveFeedbackDataParam{}),\n\t\t\tMetadata: cadenya.F(shared.CreateOperationMetadataParam{}),\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", objectiveFeedback.Data)\n}\n',
      },
      http: {
        example:
          'curl https://api.cadenya.com/v1/objectives/$OBJECTIVE_ID/feedback \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $CADENYA_API_KEY" \\\n    -d \'{\n          "data": {},\n          "metadata": {}\n        }\'',
      },
      typescript: {
        method: 'client.objectives.feedback.create',
        example:
          "import Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nconst objectiveFeedback = await client.objectives.feedback.create('objectiveId', {\n  data: {},\n  metadata: {},\n});\n\nconsole.log(objectiveFeedback.data);",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v1/objectives/{objectiveId}/feedback',
    httpMethod: 'get',
    summary: 'List feedback for an objective',
    description: 'Lists all feedback submitted for an objective',
    stainlessPath: '(resource) objectives.feedback > (method) list',
    qualified: 'client.objectives.feedback.list',
    params: ['objectiveId: string;', 'cursor?: string;', 'limit?: number;'],
    response:
      '{ data: { comment?: string; score?: number; }; metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; info?: { agentVariation?: bare_metadata; objective?: bare_metadata; submittedBy?: profile; }; }',
    markdown:
      "## list\n\n`client.objectives.feedback.list(objectiveId: string, cursor?: string, limit?: number): { data: objective_feedback_data; metadata: operation_metadata; info?: objective_feedback_info; }`\n\n**get** `/v1/objectives/{objectiveId}/feedback`\n\nLists all feedback submitted for an objective\n\n### Parameters\n\n- `objectiveId: string`\n\n- `cursor?: string`\n  Pagination cursor from previous response\n\n- `limit?: number`\n  Maximum number of results to return\n\n### Returns\n\n- `{ data: { comment?: string; score?: number; }; metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; info?: { agentVariation?: bare_metadata; objective?: bare_metadata; submittedBy?: profile; }; }`\n  ObjectiveFeedback represents feedback submitted for an objective's execution.\n Feedback is used to score agent variations and improve agent performance over time.\n\n  - `data: { comment?: string; score?: number; }`\n  - `metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `info?: { agentVariation?: { id?: string; name?: string; }; objective?: { id?: string; name?: string; }; submittedBy?: { metadata: account_resource_metadata; spec: profile_spec; }; }`\n\n### Example\n\n```typescript\nimport Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya();\n\n// Automatically fetches more pages as needed.\nfor await (const objectiveFeedback of client.objectives.feedback.list('objectiveId')) {\n  console.log(objectiveFeedback);\n}\n```",
    perLanguage: {
      cli: {
        method: 'feedback list',
        example:
          "cadenya objectives:feedback list \\\n  --api-key 'My API Key' \\\n  --objective-id objectiveId",
      },
      go: {
        method: 'client.Objectives.Feedback.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cadenya/cadenya-go"\n\t"github.com/cadenya/cadenya-go/option"\n)\n\nfunc main() {\n\tclient := cadenya.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Objectives.Feedback.List(\n\t\tcontext.TODO(),\n\t\t"objectiveId",\n\t\tcadenya.ObjectiveFeedbackListParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://api.cadenya.com/v1/objectives/$OBJECTIVE_ID/feedback \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.objectives.feedback.list',
        example:
          "import Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const objectiveFeedback of client.objectives.feedback.list('objectiveId')) {\n  console.log(objectiveFeedback.data);\n}",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v1/memory_layers',
    httpMethod: 'get',
    summary: 'List memory layers',
    description: 'Lists all memory layers in the workspace',
    stainlessPath: '(resource) memory_layers > (method) list',
    qualified: 'client.memoryLayers.list',
    params: [
      'cursor?: string;',
      'includeInfo?: boolean;',
      'limit?: number;',
      'prefix?: string;',
      'query?: string;',
      'sortOrder?: string;',
      "type?: 'MEMORY_LAYER_TYPE_UNSPECIFIED' | 'MEMORY_LAYER_TYPE_EPISODIC' | 'MEMORY_LAYER_TYPE_SKILLS';",
    ],
    response:
      "{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { type: 'MEMORY_LAYER_TYPE_UNSPECIFIED' | 'MEMORY_LAYER_TYPE_EPISODIC' | 'MEMORY_LAYER_TYPE_SKILLS'; description?: string; expiresAt?: string; systemManaged?: boolean; }; info?: { createdBy?: profile; entryCount?: number; lastUsedAt?: string; }; }",
    markdown:
      "## list\n\n`client.memoryLayers.list(cursor?: string, includeInfo?: boolean, limit?: number, prefix?: string, query?: string, sortOrder?: string, type?: 'MEMORY_LAYER_TYPE_UNSPECIFIED' | 'MEMORY_LAYER_TYPE_EPISODIC' | 'MEMORY_LAYER_TYPE_SKILLS'): { metadata: resource_metadata; spec: memory_layer_spec; info?: memory_layer_info; }`\n\n**get** `/v1/memory_layers`\n\nLists all memory layers in the workspace\n\n### Parameters\n\n- `cursor?: string`\n  Pagination cursor from previous response\n\n- `includeInfo?: boolean`\n  When set to true you may use more of your alloted API rate-limit\n\n- `limit?: number`\n  Maximum number of results to return\n\n- `prefix?: string`\n  Filter expression (query param: prefix)\n\n- `query?: string`\n  Free-form search query\n\n- `sortOrder?: string`\n  Sort order for results (asc or desc by creation time)\n\n- `type?: 'MEMORY_LAYER_TYPE_UNSPECIFIED' | 'MEMORY_LAYER_TYPE_EPISODIC' | 'MEMORY_LAYER_TYPE_SKILLS'`\n  Filter by layer type\n\n### Returns\n\n- `{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { type: 'MEMORY_LAYER_TYPE_UNSPECIFIED' | 'MEMORY_LAYER_TYPE_EPISODIC' | 'MEMORY_LAYER_TYPE_SKILLS'; description?: string; expiresAt?: string; systemManaged?: boolean; }; info?: { createdBy?: profile; entryCount?: number; lastUsedAt?: string; }; }`\n  MemoryLayer is a named container of memory entries that can be composed into\n an objective's memory stack. Layers are workspace-scoped resources. The layer\n type controls how its entries participate in the agent loop — see\n MemoryLayerType for details.\n\n See \"Memory stack composition\" above for how layers compose at lookup time.\n\n  - `metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `spec: { type: 'MEMORY_LAYER_TYPE_UNSPECIFIED' | 'MEMORY_LAYER_TYPE_EPISODIC' | 'MEMORY_LAYER_TYPE_SKILLS'; description?: string; expiresAt?: string; systemManaged?: boolean; }`\n  - `info?: { createdBy?: { metadata: account_resource_metadata; spec: profile_spec; }; entryCount?: number; lastUsedAt?: string; }`\n\n### Example\n\n```typescript\nimport Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya();\n\n// Automatically fetches more pages as needed.\nfor await (const memoryLayer of client.memoryLayers.list()) {\n  console.log(memoryLayer);\n}\n```",
    perLanguage: {
      cli: {
        method: 'memory_layers list',
        example: "cadenya memory-layers list \\\n  --api-key 'My API Key'",
      },
      go: {
        method: 'client.MemoryLayers.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cadenya/cadenya-go"\n\t"github.com/cadenya/cadenya-go/option"\n)\n\nfunc main() {\n\tclient := cadenya.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.MemoryLayers.List(context.TODO(), cadenya.MemoryLayerListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://api.cadenya.com/v1/memory_layers \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.memoryLayers.list',
        example:
          "import Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const memoryLayer of client.memoryLayers.list()) {\n  console.log(memoryLayer.metadata);\n}",
      },
    },
  },
  {
    name: 'create',
    endpoint: '/v1/memory_layers',
    httpMethod: 'post',
    summary: 'Create a new memory layer',
    description: 'Creates a new memory layer in the workspace',
    stainlessPath: '(resource) memory_layers > (method) create',
    qualified: 'client.memoryLayers.create',
    params: [
      'metadata: { name: string; externalId?: string; labels?: object; };',
      "spec: { type: 'MEMORY_LAYER_TYPE_UNSPECIFIED' | 'MEMORY_LAYER_TYPE_EPISODIC' | 'MEMORY_LAYER_TYPE_SKILLS'; description?: string; expiresAt?: string; systemManaged?: boolean; };",
    ],
    response:
      "{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { type: 'MEMORY_LAYER_TYPE_UNSPECIFIED' | 'MEMORY_LAYER_TYPE_EPISODIC' | 'MEMORY_LAYER_TYPE_SKILLS'; description?: string; expiresAt?: string; systemManaged?: boolean; }; info?: { createdBy?: profile; entryCount?: number; lastUsedAt?: string; }; }",
    markdown:
      "## create\n\n`client.memoryLayers.create(metadata: { name: string; externalId?: string; labels?: object; }, spec: { type: 'MEMORY_LAYER_TYPE_UNSPECIFIED' | 'MEMORY_LAYER_TYPE_EPISODIC' | 'MEMORY_LAYER_TYPE_SKILLS'; description?: string; expiresAt?: string; systemManaged?: boolean; }): { metadata: resource_metadata; spec: memory_layer_spec; info?: memory_layer_info; }`\n\n**post** `/v1/memory_layers`\n\nCreates a new memory layer in the workspace\n\n### Parameters\n\n- `metadata: { name: string; externalId?: string; labels?: object; }`\n  CreateResourceMetadata contains the user-provided fields for creating\n a workspace-scoped resource. Read-only fields (id, account_id, workspace_id, profile_id,\n created_at) are excluded since they are set by the server.\n  - `name: string`\n    Human-readable name for the resource (e.g., \"Customer Support Agent\", \"Email Tool\")\n  - `externalId?: string`\n    External ID for the resource (e.g., a workflow ID from an external system)\n  - `labels?: object`\n    Arbitrary key-value pairs for categorization and filtering\n Examples: {\"environment\": \"production\", \"team\": \"platform\", \"version\": \"v2\"}\n\n- `spec: { type: 'MEMORY_LAYER_TYPE_UNSPECIFIED' | 'MEMORY_LAYER_TYPE_EPISODIC' | 'MEMORY_LAYER_TYPE_SKILLS'; description?: string; expiresAt?: string; systemManaged?: boolean; }`\n  - `type: 'MEMORY_LAYER_TYPE_UNSPECIFIED' | 'MEMORY_LAYER_TYPE_EPISODIC' | 'MEMORY_LAYER_TYPE_SKILLS'`\n  - `description?: string`\n    Human-readable description of the layer's purpose. Encouraged for\n user-created layers; system-managed layers may have a generated description.\n  - `expiresAt?: string`\n    For layers with a finite lifetime (e.g., episodic), the time at which the\n layer becomes eligible for cleanup. Set by the system; unset for\n persistent layers.\n  - `systemManaged?: boolean`\n    Server-set. True for layers managed by the system (e.g., episodic layers\n created automatically when an objective uses an episodic_key). System-managed\n layers cannot be assigned to objective stacks via the API and cannot be\n mutated by clients — their lifecycle is controlled entirely by the runtime.\n\n### Returns\n\n- `{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { type: 'MEMORY_LAYER_TYPE_UNSPECIFIED' | 'MEMORY_LAYER_TYPE_EPISODIC' | 'MEMORY_LAYER_TYPE_SKILLS'; description?: string; expiresAt?: string; systemManaged?: boolean; }; info?: { createdBy?: profile; entryCount?: number; lastUsedAt?: string; }; }`\n  MemoryLayer is a named container of memory entries that can be composed into\n an objective's memory stack. Layers are workspace-scoped resources. The layer\n type controls how its entries participate in the agent loop — see\n MemoryLayerType for details.\n\n See \"Memory stack composition\" above for how layers compose at lookup time.\n\n  - `metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `spec: { type: 'MEMORY_LAYER_TYPE_UNSPECIFIED' | 'MEMORY_LAYER_TYPE_EPISODIC' | 'MEMORY_LAYER_TYPE_SKILLS'; description?: string; expiresAt?: string; systemManaged?: boolean; }`\n  - `info?: { createdBy?: { metadata: account_resource_metadata; spec: profile_spec; }; entryCount?: number; lastUsedAt?: string; }`\n\n### Example\n\n```typescript\nimport Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya();\n\nconst memoryLayer = await client.memoryLayers.create({\n  metadata: { name: 'name' },\n  spec: { type: 'MEMORY_LAYER_TYPE_UNSPECIFIED' },\n});\n\nconsole.log(memoryLayer);\n```",
    perLanguage: {
      cli: {
        method: 'memory_layers create',
        example:
          "cadenya memory-layers create \\\n  --api-key 'My API Key' \\\n  --metadata '{name: name}' \\\n  --spec '{type: MEMORY_LAYER_TYPE_UNSPECIFIED}'",
      },
      go: {
        method: 'client.MemoryLayers.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cadenya/cadenya-go"\n\t"github.com/cadenya/cadenya-go/option"\n\t"github.com/cadenya/cadenya-go/shared"\n)\n\nfunc main() {\n\tclient := cadenya.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tmemoryLayer, err := client.MemoryLayers.New(context.TODO(), cadenya.MemoryLayerNewParams{\n\t\tMetadata: cadenya.F(shared.CreateResourceMetadataParam{\n\t\t\tName: cadenya.F("name"),\n\t\t}),\n\t\tSpec: cadenya.F(cadenya.MemoryLayerSpecParam{\n\t\t\tType: cadenya.F(cadenya.MemoryLayerSpecTypeMemoryLayerTypeUnspecified),\n\t\t}),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", memoryLayer.Metadata)\n}\n',
      },
      http: {
        example:
          'curl https://api.cadenya.com/v1/memory_layers \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $CADENYA_API_KEY" \\\n    -d \'{\n          "metadata": {\n            "name": "name"\n          },\n          "spec": {\n            "type": "MEMORY_LAYER_TYPE_UNSPECIFIED"\n          }\n        }\'',
      },
      typescript: {
        method: 'client.memoryLayers.create',
        example:
          "import Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nconst memoryLayer = await client.memoryLayers.create({\n  metadata: { name: 'name' },\n  spec: { type: 'MEMORY_LAYER_TYPE_UNSPECIFIED' },\n});\n\nconsole.log(memoryLayer.metadata);",
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/v1/memory_layers/{id}',
    httpMethod: 'get',
    summary: 'Get a memory layer by ID',
    description: 'Retrieves a memory layer by ID from the workspace',
    stainlessPath: '(resource) memory_layers > (method) retrieve',
    qualified: 'client.memoryLayers.retrieve',
    params: ['id: string;'],
    response:
      "{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { type: 'MEMORY_LAYER_TYPE_UNSPECIFIED' | 'MEMORY_LAYER_TYPE_EPISODIC' | 'MEMORY_LAYER_TYPE_SKILLS'; description?: string; expiresAt?: string; systemManaged?: boolean; }; info?: { createdBy?: profile; entryCount?: number; lastUsedAt?: string; }; }",
    markdown:
      "## retrieve\n\n`client.memoryLayers.retrieve(id: string): { metadata: resource_metadata; spec: memory_layer_spec; info?: memory_layer_info; }`\n\n**get** `/v1/memory_layers/{id}`\n\nRetrieves a memory layer by ID from the workspace\n\n### Parameters\n\n- `id: string`\n\n### Returns\n\n- `{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { type: 'MEMORY_LAYER_TYPE_UNSPECIFIED' | 'MEMORY_LAYER_TYPE_EPISODIC' | 'MEMORY_LAYER_TYPE_SKILLS'; description?: string; expiresAt?: string; systemManaged?: boolean; }; info?: { createdBy?: profile; entryCount?: number; lastUsedAt?: string; }; }`\n  MemoryLayer is a named container of memory entries that can be composed into\n an objective's memory stack. Layers are workspace-scoped resources. The layer\n type controls how its entries participate in the agent loop — see\n MemoryLayerType for details.\n\n See \"Memory stack composition\" above for how layers compose at lookup time.\n\n  - `metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `spec: { type: 'MEMORY_LAYER_TYPE_UNSPECIFIED' | 'MEMORY_LAYER_TYPE_EPISODIC' | 'MEMORY_LAYER_TYPE_SKILLS'; description?: string; expiresAt?: string; systemManaged?: boolean; }`\n  - `info?: { createdBy?: { metadata: account_resource_metadata; spec: profile_spec; }; entryCount?: number; lastUsedAt?: string; }`\n\n### Example\n\n```typescript\nimport Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya();\n\nconst memoryLayer = await client.memoryLayers.retrieve('id');\n\nconsole.log(memoryLayer);\n```",
    perLanguage: {
      cli: {
        method: 'memory_layers retrieve',
        example: "cadenya memory-layers retrieve \\\n  --api-key 'My API Key' \\\n  --id id",
      },
      go: {
        method: 'client.MemoryLayers.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cadenya/cadenya-go"\n\t"github.com/cadenya/cadenya-go/option"\n)\n\nfunc main() {\n\tclient := cadenya.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tmemoryLayer, err := client.MemoryLayers.Get(context.TODO(), "id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", memoryLayer.Metadata)\n}\n',
      },
      http: {
        example:
          'curl https://api.cadenya.com/v1/memory_layers/$ID \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.memoryLayers.retrieve',
        example:
          "import Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nconst memoryLayer = await client.memoryLayers.retrieve('id');\n\nconsole.log(memoryLayer.metadata);",
      },
    },
  },
  {
    name: 'update',
    endpoint: '/v1/memory_layers/{id}',
    httpMethod: 'patch',
    summary: 'Update a memory layer',
    description: 'Updates a memory layer in the workspace',
    stainlessPath: '(resource) memory_layers > (method) update',
    qualified: 'client.memoryLayers.update',
    params: [
      'id: string;',
      'metadata?: { name: string; externalId?: string; labels?: object; };',
      "spec?: { type: 'MEMORY_LAYER_TYPE_UNSPECIFIED' | 'MEMORY_LAYER_TYPE_EPISODIC' | 'MEMORY_LAYER_TYPE_SKILLS'; description?: string; expiresAt?: string; systemManaged?: boolean; };",
      'updateMask?: string;',
    ],
    response:
      "{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { type: 'MEMORY_LAYER_TYPE_UNSPECIFIED' | 'MEMORY_LAYER_TYPE_EPISODIC' | 'MEMORY_LAYER_TYPE_SKILLS'; description?: string; expiresAt?: string; systemManaged?: boolean; }; info?: { createdBy?: profile; entryCount?: number; lastUsedAt?: string; }; }",
    markdown:
      "## update\n\n`client.memoryLayers.update(id: string, metadata?: { name: string; externalId?: string; labels?: object; }, spec?: { type: 'MEMORY_LAYER_TYPE_UNSPECIFIED' | 'MEMORY_LAYER_TYPE_EPISODIC' | 'MEMORY_LAYER_TYPE_SKILLS'; description?: string; expiresAt?: string; systemManaged?: boolean; }, updateMask?: string): { metadata: resource_metadata; spec: memory_layer_spec; info?: memory_layer_info; }`\n\n**patch** `/v1/memory_layers/{id}`\n\nUpdates a memory layer in the workspace\n\n### Parameters\n\n- `id: string`\n\n- `metadata?: { name: string; externalId?: string; labels?: object; }`\n  UpdateResourceMetadata contains the user-provided fields for updating\n a workspace-scoped resource. Read-only fields (id, account_id, workspace_id, profile_id,\n created_at) are excluded since they are set by the server.\n  - `name: string`\n    Human-readable name for the resource (e.g., \"Customer Support Agent\", \"Email Tool\")\n  - `externalId?: string`\n    External ID for the resource (e.g., a workflow ID from an external system)\n  - `labels?: object`\n    Arbitrary key-value pairs for categorization and filtering\n Examples: {\"environment\": \"production\", \"team\": \"platform\", \"version\": \"v2\"}\n\n- `spec?: { type: 'MEMORY_LAYER_TYPE_UNSPECIFIED' | 'MEMORY_LAYER_TYPE_EPISODIC' | 'MEMORY_LAYER_TYPE_SKILLS'; description?: string; expiresAt?: string; systemManaged?: boolean; }`\n  - `type: 'MEMORY_LAYER_TYPE_UNSPECIFIED' | 'MEMORY_LAYER_TYPE_EPISODIC' | 'MEMORY_LAYER_TYPE_SKILLS'`\n  - `description?: string`\n    Human-readable description of the layer's purpose. Encouraged for\n user-created layers; system-managed layers may have a generated description.\n  - `expiresAt?: string`\n    For layers with a finite lifetime (e.g., episodic), the time at which the\n layer becomes eligible for cleanup. Set by the system; unset for\n persistent layers.\n  - `systemManaged?: boolean`\n    Server-set. True for layers managed by the system (e.g., episodic layers\n created automatically when an objective uses an episodic_key). System-managed\n layers cannot be assigned to objective stacks via the API and cannot be\n mutated by clients — their lifecycle is controlled entirely by the runtime.\n\n- `updateMask?: string`\n\n### Returns\n\n- `{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { type: 'MEMORY_LAYER_TYPE_UNSPECIFIED' | 'MEMORY_LAYER_TYPE_EPISODIC' | 'MEMORY_LAYER_TYPE_SKILLS'; description?: string; expiresAt?: string; systemManaged?: boolean; }; info?: { createdBy?: profile; entryCount?: number; lastUsedAt?: string; }; }`\n  MemoryLayer is a named container of memory entries that can be composed into\n an objective's memory stack. Layers are workspace-scoped resources. The layer\n type controls how its entries participate in the agent loop — see\n MemoryLayerType for details.\n\n See \"Memory stack composition\" above for how layers compose at lookup time.\n\n  - `metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `spec: { type: 'MEMORY_LAYER_TYPE_UNSPECIFIED' | 'MEMORY_LAYER_TYPE_EPISODIC' | 'MEMORY_LAYER_TYPE_SKILLS'; description?: string; expiresAt?: string; systemManaged?: boolean; }`\n  - `info?: { createdBy?: { metadata: account_resource_metadata; spec: profile_spec; }; entryCount?: number; lastUsedAt?: string; }`\n\n### Example\n\n```typescript\nimport Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya();\n\nconst memoryLayer = await client.memoryLayers.update('id');\n\nconsole.log(memoryLayer);\n```",
    perLanguage: {
      cli: {
        method: 'memory_layers update',
        example: "cadenya memory-layers update \\\n  --api-key 'My API Key' \\\n  --id id",
      },
      go: {
        method: 'client.MemoryLayers.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cadenya/cadenya-go"\n\t"github.com/cadenya/cadenya-go/option"\n)\n\nfunc main() {\n\tclient := cadenya.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tmemoryLayer, err := client.MemoryLayers.Update(\n\t\tcontext.TODO(),\n\t\t"id",\n\t\tcadenya.MemoryLayerUpdateParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", memoryLayer.Metadata)\n}\n',
      },
      http: {
        example:
          "curl https://api.cadenya.com/v1/memory_layers/$ID \\\n    -X PATCH \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $CADENYA_API_KEY\" \\\n    -d '{}'",
      },
      typescript: {
        method: 'client.memoryLayers.update',
        example:
          "import Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nconst memoryLayer = await client.memoryLayers.update('id');\n\nconsole.log(memoryLayer.metadata);",
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/v1/memory_layers/{id}',
    httpMethod: 'delete',
    summary: 'Delete a memory layer',
    description: 'Deletes a memory layer from the workspace',
    stainlessPath: '(resource) memory_layers > (method) delete',
    qualified: 'client.memoryLayers.delete',
    params: ['id: string;'],
    markdown:
      "## delete\n\n`client.memoryLayers.delete(id: string): void`\n\n**delete** `/v1/memory_layers/{id}`\n\nDeletes a memory layer from the workspace\n\n### Parameters\n\n- `id: string`\n\n### Example\n\n```typescript\nimport Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya();\n\nawait client.memoryLayers.delete('id')\n```",
    perLanguage: {
      cli: {
        method: 'memory_layers delete',
        example: "cadenya memory-layers delete \\\n  --api-key 'My API Key' \\\n  --id id",
      },
      go: {
        method: 'client.MemoryLayers.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/cadenya/cadenya-go"\n\t"github.com/cadenya/cadenya-go/option"\n)\n\nfunc main() {\n\tclient := cadenya.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\terr := client.MemoryLayers.Delete(context.TODO(), "id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://api.cadenya.com/v1/memory_layers/$ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.memoryLayers.delete',
        example:
          "import Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.memoryLayers.delete('id');",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v1/memory_layers/{memoryLayerId}/entries',
    httpMethod: 'get',
    summary: 'List memory entries',
    description: 'Lists all entries in a memory layer',
    stainlessPath: '(resource) memory_layers.entries > (method) list',
    qualified: 'client.memoryLayers.entries.list',
    params: [
      'memoryLayerId: string;',
      'cursor?: string;',
      'includeInfo?: boolean;',
      'limit?: number;',
      'prefix?: string;',
      'query?: string;',
      'sortOrder?: string;',
    ],
    response:
      '{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { key: string; description?: string; }; info?: { createdBy?: profile; memoryLayer?: resource_metadata; }; }',
    markdown:
      "## list\n\n`client.memoryLayers.entries.list(memoryLayerId: string, cursor?: string, includeInfo?: boolean, limit?: number, prefix?: string, query?: string, sortOrder?: string): { metadata: resource_metadata; spec: memory_entry_spec; info?: memory_entry_info; }`\n\n**get** `/v1/memory_layers/{memoryLayerId}/entries`\n\nLists all entries in a memory layer\n\n### Parameters\n\n- `memoryLayerId: string`\n\n- `cursor?: string`\n  Pagination cursor from previous response\n\n- `includeInfo?: boolean`\n  When set to true you may use more of your alloted API rate-limit\n\n- `limit?: number`\n  Maximum number of results to return\n\n- `prefix?: string`\n  Filter by key prefix (e.g., \"skills/postmortem/\" to list all entries\n under that hierarchy). Matches against the entry's key, not its name.\n\n- `query?: string`\n  Free-form search query\n\n- `sortOrder?: string`\n  Sort order for results (asc or desc by creation time)\n\n### Returns\n\n- `{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { key: string; description?: string; }; info?: { createdBy?: profile; memoryLayer?: resource_metadata; }; }`\n  MemoryEntry is a single keyed value within a MemoryLayer. Entries are\n addressed by their key, which follows the S3 object key safe-character\n convention (see MemoryEntrySpec.key for the full rule). Keys are unique\n within a single layer; the same key may appear in multiple layers, in which\n case the LIFO stack-walk determines which one wins for a given objective.\n\n MemoryEntry is the summary shape, returned by ListMemoryEntries. It does\n not carry the entry body — callers that need the body must fetch the entry\n individually via GetMemoryEntry, which returns a MemoryEntryDetail.\n\n  - `metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `spec: { key: string; description?: string; }`\n  - `info?: { createdBy?: { metadata: account_resource_metadata; spec: profile_spec; }; memoryLayer?: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; }`\n\n### Example\n\n```typescript\nimport Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya();\n\n// Automatically fetches more pages as needed.\nfor await (const memoryEntry of client.memoryLayers.entries.list('memoryLayerId')) {\n  console.log(memoryEntry);\n}\n```",
    perLanguage: {
      cli: {
        method: 'entries list',
        example:
          "cadenya memory-layers:entries list \\\n  --api-key 'My API Key' \\\n  --memory-layer-id memoryLayerId",
      },
      go: {
        method: 'client.MemoryLayers.Entries.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cadenya/cadenya-go"\n\t"github.com/cadenya/cadenya-go/option"\n)\n\nfunc main() {\n\tclient := cadenya.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.MemoryLayers.Entries.List(\n\t\tcontext.TODO(),\n\t\t"memoryLayerId",\n\t\tcadenya.MemoryLayerEntryListParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://api.cadenya.com/v1/memory_layers/$MEMORY_LAYER_ID/entries \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.memoryLayers.entries.list',
        example:
          "import Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const memoryEntry of client.memoryLayers.entries.list('memoryLayerId')) {\n  console.log(memoryEntry.metadata);\n}",
      },
    },
  },
  {
    name: 'create',
    endpoint: '/v1/memory_layers/{memoryLayerId}/entries',
    httpMethod: 'post',
    summary: 'Create a new memory entry',
    description:
      'Creates a new entry in a memory layer. Returns the detail view, including the resolved content body.',
    stainlessPath: '(resource) memory_layers.entries > (method) create',
    qualified: 'client.memoryLayers.entries.create',
    params: [
      'memoryLayerId: string;',
      'metadata: { name: string; externalId?: string; labels?: object; };',
      'spec: { key: string; content?: string; description?: string; uploadId?: string; };',
    ],
    response:
      '{ content: string; metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { key: string; description?: string; }; info?: { createdBy?: profile; memoryLayer?: resource_metadata; }; }',
    markdown:
      '## create\n\n`client.memoryLayers.entries.create(memoryLayerId: string, metadata: { name: string; externalId?: string; labels?: object; }, spec: { key: string; content?: string; description?: string; uploadId?: string; }): { content: string; metadata: resource_metadata; spec: memory_entry_spec; info?: memory_entry_info; }`\n\n**post** `/v1/memory_layers/{memoryLayerId}/entries`\n\nCreates a new entry in a memory layer. Returns the detail view, including the resolved content body.\n\n### Parameters\n\n- `memoryLayerId: string`\n\n- `metadata: { name: string; externalId?: string; labels?: object; }`\n  CreateResourceMetadata contains the user-provided fields for creating\n a workspace-scoped resource. Read-only fields (id, account_id, workspace_id, profile_id,\n created_at) are excluded since they are set by the server.\n  - `name: string`\n    Human-readable name for the resource (e.g., "Customer Support Agent", "Email Tool")\n  - `externalId?: string`\n    External ID for the resource (e.g., a workflow ID from an external system)\n  - `labels?: object`\n    Arbitrary key-value pairs for categorization and filtering\n Examples: {"environment": "production", "team": "platform", "version": "v2"}\n\n- `spec: { key: string; content?: string; description?: string; uploadId?: string; }`\n  MemoryEntryCreateSpec is the input shape for CreateMemoryEntry. It accepts\n either inline content or a reference to a completed Upload; exactly one of\n the two must be set.\n  - `key: string`\n    See MemoryEntrySpec.key for the full rule set. Same constraints apply\n here.\n  - `content?: string`\n    Inline content, written directly into the entry.\n  - `description?: string`\n  - `uploadId?: string`\n    ID of a COMPLETE Upload. The server reads the object from storage,\n copies its bytes into the entry, and marks the upload consumed.\n\n### Returns\n\n- `{ content: string; metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { key: string; description?: string; }; info?: { createdBy?: profile; memoryLayer?: resource_metadata; }; }`\n  MemoryEntryDetail is the full representation of an entry, including the\n resolved content body. Returned by GetMemoryEntry, CreateMemoryEntry, and\n UpdateMemoryEntry.\n\n  - `content: string`\n  - `metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `spec: { key: string; description?: string; }`\n  - `info?: { createdBy?: { metadata: account_resource_metadata; spec: profile_spec; }; memoryLayer?: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; }`\n\n### Example\n\n```typescript\nimport Cadenya from \'@cadenya/cadenya\';\n\nconst client = new Cadenya();\n\nconst memoryEntryDetail = await client.memoryLayers.entries.create(\'memoryLayerId\', {\n  metadata: { name: \'name\' },\n  spec: { key: \'key\' },\n});\n\nconsole.log(memoryEntryDetail);\n```',
    perLanguage: {
      cli: {
        method: 'entries create',
        example:
          "cadenya memory-layers:entries create \\\n  --api-key 'My API Key' \\\n  --memory-layer-id memoryLayerId \\\n  --metadata '{name: name}' \\\n  --spec '{key: key}'",
      },
      go: {
        method: 'client.MemoryLayers.Entries.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cadenya/cadenya-go"\n\t"github.com/cadenya/cadenya-go/option"\n\t"github.com/cadenya/cadenya-go/shared"\n)\n\nfunc main() {\n\tclient := cadenya.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tmemoryEntryDetail, err := client.MemoryLayers.Entries.New(\n\t\tcontext.TODO(),\n\t\t"memoryLayerId",\n\t\tcadenya.MemoryLayerEntryNewParams{\n\t\t\tMetadata: cadenya.F(shared.CreateResourceMetadataParam{\n\t\t\t\tName: cadenya.F("name"),\n\t\t\t}),\n\t\t\tSpec: cadenya.F(cadenya.MemoryEntryCreateSpecParam{\n\t\t\t\tKey: cadenya.F("key"),\n\t\t\t}),\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", memoryEntryDetail.Content)\n}\n',
      },
      http: {
        example:
          'curl https://api.cadenya.com/v1/memory_layers/$MEMORY_LAYER_ID/entries \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $CADENYA_API_KEY" \\\n    -d \'{\n          "metadata": {\n            "name": "name"\n          },\n          "spec": {\n            "key": "key"\n          }\n        }\'',
      },
      typescript: {
        method: 'client.memoryLayers.entries.create',
        example:
          "import Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nconst memoryEntryDetail = await client.memoryLayers.entries.create('memoryLayerId', {\n  metadata: { name: 'name' },\n  spec: { key: 'key' },\n});\n\nconsole.log(memoryEntryDetail.content);",
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/v1/memory_layers/{memoryLayerId}/entries/{id}',
    httpMethod: 'get',
    summary: 'Get a memory entry by ID',
    description:
      'Retrieves a memory entry by ID from a memory layer. Returns the detail view, including the content body.',
    stainlessPath: '(resource) memory_layers.entries > (method) retrieve',
    qualified: 'client.memoryLayers.entries.retrieve',
    params: ['memoryLayerId: string;', 'id: string;'],
    response:
      '{ content: string; metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { key: string; description?: string; }; info?: { createdBy?: profile; memoryLayer?: resource_metadata; }; }',
    markdown:
      "## retrieve\n\n`client.memoryLayers.entries.retrieve(memoryLayerId: string, id: string): { content: string; metadata: resource_metadata; spec: memory_entry_spec; info?: memory_entry_info; }`\n\n**get** `/v1/memory_layers/{memoryLayerId}/entries/{id}`\n\nRetrieves a memory entry by ID from a memory layer. Returns the detail view, including the content body.\n\n### Parameters\n\n- `memoryLayerId: string`\n\n- `id: string`\n\n### Returns\n\n- `{ content: string; metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { key: string; description?: string; }; info?: { createdBy?: profile; memoryLayer?: resource_metadata; }; }`\n  MemoryEntryDetail is the full representation of an entry, including the\n resolved content body. Returned by GetMemoryEntry, CreateMemoryEntry, and\n UpdateMemoryEntry.\n\n  - `content: string`\n  - `metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `spec: { key: string; description?: string; }`\n  - `info?: { createdBy?: { metadata: account_resource_metadata; spec: profile_spec; }; memoryLayer?: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; }`\n\n### Example\n\n```typescript\nimport Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya();\n\nconst memoryEntryDetail = await client.memoryLayers.entries.retrieve('id', { memoryLayerId: 'memoryLayerId' });\n\nconsole.log(memoryEntryDetail);\n```",
    perLanguage: {
      cli: {
        method: 'entries retrieve',
        example:
          "cadenya memory-layers:entries retrieve \\\n  --api-key 'My API Key' \\\n  --memory-layer-id memoryLayerId \\\n  --id id",
      },
      go: {
        method: 'client.MemoryLayers.Entries.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cadenya/cadenya-go"\n\t"github.com/cadenya/cadenya-go/option"\n)\n\nfunc main() {\n\tclient := cadenya.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tmemoryEntryDetail, err := client.MemoryLayers.Entries.Get(\n\t\tcontext.TODO(),\n\t\t"memoryLayerId",\n\t\t"id",\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", memoryEntryDetail.Content)\n}\n',
      },
      http: {
        example:
          'curl https://api.cadenya.com/v1/memory_layers/$MEMORY_LAYER_ID/entries/$ID \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.memoryLayers.entries.retrieve',
        example:
          "import Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nconst memoryEntryDetail = await client.memoryLayers.entries.retrieve('id', {\n  memoryLayerId: 'memoryLayerId',\n});\n\nconsole.log(memoryEntryDetail.content);",
      },
    },
  },
  {
    name: 'update',
    endpoint: '/v1/memory_layers/{memoryLayerId}/entries/{id}',
    httpMethod: 'patch',
    summary: 'Update a memory entry',
    description:
      'Updates a memory entry in a memory layer. Returns the detail view, including the resolved content body.',
    stainlessPath: '(resource) memory_layers.entries > (method) update',
    qualified: 'client.memoryLayers.entries.update',
    params: [
      'memoryLayerId: string;',
      'id: string;',
      'metadata?: { name: string; externalId?: string; labels?: object; };',
      'spec?: { content?: string; description?: string; key?: string; uploadId?: string; };',
      'updateMask?: string;',
    ],
    response:
      '{ content: string; metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { key: string; description?: string; }; info?: { createdBy?: profile; memoryLayer?: resource_metadata; }; }',
    markdown:
      '## update\n\n`client.memoryLayers.entries.update(memoryLayerId: string, id: string, metadata?: { name: string; externalId?: string; labels?: object; }, spec?: { content?: string; description?: string; key?: string; uploadId?: string; }, updateMask?: string): { content: string; metadata: resource_metadata; spec: memory_entry_spec; info?: memory_entry_info; }`\n\n**patch** `/v1/memory_layers/{memoryLayerId}/entries/{id}`\n\nUpdates a memory entry in a memory layer. Returns the detail view, including the resolved content body.\n\n### Parameters\n\n- `memoryLayerId: string`\n\n- `id: string`\n\n- `metadata?: { name: string; externalId?: string; labels?: object; }`\n  UpdateResourceMetadata contains the user-provided fields for updating\n a workspace-scoped resource. Read-only fields (id, account_id, workspace_id, profile_id,\n created_at) are excluded since they are set by the server.\n  - `name: string`\n    Human-readable name for the resource (e.g., "Customer Support Agent", "Email Tool")\n  - `externalId?: string`\n    External ID for the resource (e.g., a workflow ID from an external system)\n  - `labels?: object`\n    Arbitrary key-value pairs for categorization and filtering\n Examples: {"environment": "production", "team": "platform", "version": "v2"}\n\n- `spec?: { content?: string; description?: string; key?: string; uploadId?: string; }`\n  MemoryEntryUpdateSpec is the input shape for UpdateMemoryEntry. Fields\n present in the request\'s update_mask are applied; unset fields are left\n alone. The source oneof is optional for updates — omit it to leave the\n body untouched, or set exactly one branch to replace it.\n  - `content?: string`\n  - `description?: string`\n  - `key?: string`\n  - `uploadId?: string`\n\n- `updateMask?: string`\n\n### Returns\n\n- `{ content: string; metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { key: string; description?: string; }; info?: { createdBy?: profile; memoryLayer?: resource_metadata; }; }`\n  MemoryEntryDetail is the full representation of an entry, including the\n resolved content body. Returned by GetMemoryEntry, CreateMemoryEntry, and\n UpdateMemoryEntry.\n\n  - `content: string`\n  - `metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `spec: { key: string; description?: string; }`\n  - `info?: { createdBy?: { metadata: account_resource_metadata; spec: profile_spec; }; memoryLayer?: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; }`\n\n### Example\n\n```typescript\nimport Cadenya from \'@cadenya/cadenya\';\n\nconst client = new Cadenya();\n\nconst memoryEntryDetail = await client.memoryLayers.entries.update(\'id\', { memoryLayerId: \'memoryLayerId\' });\n\nconsole.log(memoryEntryDetail);\n```',
    perLanguage: {
      cli: {
        method: 'entries update',
        example:
          "cadenya memory-layers:entries update \\\n  --api-key 'My API Key' \\\n  --memory-layer-id memoryLayerId \\\n  --id id",
      },
      go: {
        method: 'client.MemoryLayers.Entries.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cadenya/cadenya-go"\n\t"github.com/cadenya/cadenya-go/option"\n)\n\nfunc main() {\n\tclient := cadenya.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tmemoryEntryDetail, err := client.MemoryLayers.Entries.Update(\n\t\tcontext.TODO(),\n\t\t"memoryLayerId",\n\t\t"id",\n\t\tcadenya.MemoryLayerEntryUpdateParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", memoryEntryDetail.Content)\n}\n',
      },
      http: {
        example:
          "curl https://api.cadenya.com/v1/memory_layers/$MEMORY_LAYER_ID/entries/$ID \\\n    -X PATCH \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $CADENYA_API_KEY\" \\\n    -d '{}'",
      },
      typescript: {
        method: 'client.memoryLayers.entries.update',
        example:
          "import Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nconst memoryEntryDetail = await client.memoryLayers.entries.update('id', {\n  memoryLayerId: 'memoryLayerId',\n});\n\nconsole.log(memoryEntryDetail.content);",
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/v1/memory_layers/{memoryLayerId}/entries/{id}',
    httpMethod: 'delete',
    summary: 'Delete a memory entry',
    description: 'Deletes a memory entry from a memory layer',
    stainlessPath: '(resource) memory_layers.entries > (method) delete',
    qualified: 'client.memoryLayers.entries.delete',
    params: ['memoryLayerId: string;', 'id: string;'],
    markdown:
      "## delete\n\n`client.memoryLayers.entries.delete(memoryLayerId: string, id: string): void`\n\n**delete** `/v1/memory_layers/{memoryLayerId}/entries/{id}`\n\nDeletes a memory entry from a memory layer\n\n### Parameters\n\n- `memoryLayerId: string`\n\n- `id: string`\n\n### Example\n\n```typescript\nimport Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya();\n\nawait client.memoryLayers.entries.delete('id', { memoryLayerId: 'memoryLayerId' })\n```",
    perLanguage: {
      cli: {
        method: 'entries delete',
        example:
          "cadenya memory-layers:entries delete \\\n  --api-key 'My API Key' \\\n  --memory-layer-id memoryLayerId \\\n  --id id",
      },
      go: {
        method: 'client.MemoryLayers.Entries.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/cadenya/cadenya-go"\n\t"github.com/cadenya/cadenya-go/option"\n)\n\nfunc main() {\n\tclient := cadenya.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\terr := client.MemoryLayers.Entries.Delete(\n\t\tcontext.TODO(),\n\t\t"memoryLayerId",\n\t\t"id",\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://api.cadenya.com/v1/memory_layers/$MEMORY_LAYER_ID/entries/$ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.memoryLayers.entries.delete',
        example:
          "import Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.memoryLayers.entries.delete('id', { memoryLayerId: 'memoryLayerId' });",
      },
    },
  },
  {
    name: 'create',
    endpoint: '/v1/uploads',
    httpMethod: 'post',
    summary: 'Create an upload',
    description:
      'Issues a short-lived presigned URL for direct upload to object storage. The returned id is used to reference the upload from resources that accept binary content.',
    stainlessPath: '(resource) uploads > (method) create',
    qualified: 'client.uploads.create',
    params: [
      'metadata: { name: string; externalId?: string; labels?: object; };',
      'spec: { contentType: string; filename: string; sizeBytes: string; };',
    ],
    response:
      '{ info: { createdBy?: profile; status?: string; uploadUrl?: string; uploadUrlExpiresAt?: string; }; metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { contentType: string; filename: string; sizeBytes: string; }; }',
    markdown:
      '## create\n\n`client.uploads.create(metadata: { name: string; externalId?: string; labels?: object; }, spec: { contentType: string; filename: string; sizeBytes: string; }): { info: upload_info; metadata: resource_metadata; spec: upload_spec; }`\n\n**post** `/v1/uploads`\n\nIssues a short-lived presigned URL for direct upload to object storage. The returned id is used to reference the upload from resources that accept binary content.\n\n### Parameters\n\n- `metadata: { name: string; externalId?: string; labels?: object; }`\n  CreateResourceMetadata contains the user-provided fields for creating\n a workspace-scoped resource. Read-only fields (id, account_id, workspace_id, profile_id,\n created_at) are excluded since they are set by the server.\n  - `name: string`\n    Human-readable name for the resource (e.g., "Customer Support Agent", "Email Tool")\n  - `externalId?: string`\n    External ID for the resource (e.g., a workflow ID from an external system)\n  - `labels?: object`\n    Arbitrary key-value pairs for categorization and filtering\n Examples: {"environment": "production", "team": "platform", "version": "v2"}\n\n- `spec: { contentType: string; filename: string; sizeBytes: string; }`\n  - `contentType: string`\n    MIME type the client will send. Baked into the presigned URL\'s signature\n — the PUT must match exactly or object storage will reject it.\n  - `filename: string`\n    Client-supplied filename. Used for audit and display only; does not\n control the object\'s storage path.\n  - `sizeBytes: string`\n    Expected size of the upload in bytes. Baked into the presigned URL as a\n Content-Length constraint.\n\n### Returns\n\n- `{ info: { createdBy?: profile; status?: string; uploadUrl?: string; uploadUrlExpiresAt?: string; }; metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { contentType: string; filename: string; sizeBytes: string; }; }`\n  Upload is a workspace-scoped handle representing a single file upload flow.\n Clients call CreateUpload to receive a short-lived presigned URL, PUT the\n file directly to object storage, then reference the upload by id when\n creating or updating resources that accept binary content.\n\n Uploads are one-shot: once consumed by a creating or updating resource, the\n upload transitions to UPLOAD_STATUS_CONSUMED and cannot be reused. Unused\n uploads expire and are garbage-collected by the runtime.\n\n  - `info: { createdBy?: { metadata: account_resource_metadata; spec: profile_spec; }; status?: string; uploadUrl?: string; uploadUrlExpiresAt?: string; }`\n  - `metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `spec: { contentType: string; filename: string; sizeBytes: string; }`\n\n### Example\n\n```typescript\nimport Cadenya from \'@cadenya/cadenya\';\n\nconst client = new Cadenya();\n\nconst upload = await client.uploads.create({\n  metadata: { name: \'name\' },\n  spec: {\n  contentType: \'contentType\',\n  filename: \'filename\',\n  sizeBytes: \'sizeBytes\',\n},\n});\n\nconsole.log(upload);\n```',
    perLanguage: {
      cli: {
        method: 'uploads create',
        example:
          "cadenya uploads create \\\n  --api-key 'My API Key' \\\n  --metadata '{name: name}' \\\n  --spec '{contentType: contentType, filename: filename, sizeBytes: sizeBytes}'",
      },
      go: {
        method: 'client.Uploads.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cadenya/cadenya-go"\n\t"github.com/cadenya/cadenya-go/option"\n\t"github.com/cadenya/cadenya-go/shared"\n)\n\nfunc main() {\n\tclient := cadenya.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tupload, err := client.Uploads.New(context.TODO(), cadenya.UploadNewParams{\n\t\tMetadata: cadenya.F(shared.CreateResourceMetadataParam{\n\t\t\tName: cadenya.F("name"),\n\t\t}),\n\t\tSpec: cadenya.F(cadenya.UploadSpecParam{\n\t\t\tContentType: cadenya.F("contentType"),\n\t\t\tFilename:    cadenya.F("filename"),\n\t\t\tSizeBytes:   cadenya.F("sizeBytes"),\n\t\t}),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", upload.Info)\n}\n',
      },
      http: {
        example:
          'curl https://api.cadenya.com/v1/uploads \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $CADENYA_API_KEY" \\\n    -d \'{\n          "metadata": {\n            "name": "name"\n          },\n          "spec": {\n            "contentType": "contentType",\n            "filename": "filename",\n            "sizeBytes": "sizeBytes"\n          }\n        }\'',
      },
      typescript: {
        method: 'client.uploads.create',
        example:
          "import Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nconst upload = await client.uploads.create({\n  metadata: { name: 'name' },\n  spec: {\n    contentType: 'contentType',\n    filename: 'filename',\n    sizeBytes: 'sizeBytes',\n  },\n});\n\nconsole.log(upload.info);",
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/v1/uploads/{id}',
    httpMethod: 'get',
    summary: 'Get an upload by ID',
    description: 'Retrieves the current state of an upload, including its lifecycle status',
    stainlessPath: '(resource) uploads > (method) retrieve',
    qualified: 'client.uploads.retrieve',
    params: ['id: string;'],
    response:
      '{ info: { createdBy?: profile; status?: string; uploadUrl?: string; uploadUrlExpiresAt?: string; }; metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { contentType: string; filename: string; sizeBytes: string; }; }',
    markdown:
      "## retrieve\n\n`client.uploads.retrieve(id: string): { info: upload_info; metadata: resource_metadata; spec: upload_spec; }`\n\n**get** `/v1/uploads/{id}`\n\nRetrieves the current state of an upload, including its lifecycle status\n\n### Parameters\n\n- `id: string`\n\n### Returns\n\n- `{ info: { createdBy?: profile; status?: string; uploadUrl?: string; uploadUrlExpiresAt?: string; }; metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { contentType: string; filename: string; sizeBytes: string; }; }`\n  Upload is a workspace-scoped handle representing a single file upload flow.\n Clients call CreateUpload to receive a short-lived presigned URL, PUT the\n file directly to object storage, then reference the upload by id when\n creating or updating resources that accept binary content.\n\n Uploads are one-shot: once consumed by a creating or updating resource, the\n upload transitions to UPLOAD_STATUS_CONSUMED and cannot be reused. Unused\n uploads expire and are garbage-collected by the runtime.\n\n  - `info: { createdBy?: { metadata: account_resource_metadata; spec: profile_spec; }; status?: string; uploadUrl?: string; uploadUrlExpiresAt?: string; }`\n  - `metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `spec: { contentType: string; filename: string; sizeBytes: string; }`\n\n### Example\n\n```typescript\nimport Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya();\n\nconst upload = await client.uploads.retrieve('id');\n\nconsole.log(upload);\n```",
    perLanguage: {
      cli: {
        method: 'uploads retrieve',
        example: "cadenya uploads retrieve \\\n  --api-key 'My API Key' \\\n  --id id",
      },
      go: {
        method: 'client.Uploads.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cadenya/cadenya-go"\n\t"github.com/cadenya/cadenya-go/option"\n)\n\nfunc main() {\n\tclient := cadenya.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tupload, err := client.Uploads.Get(context.TODO(), "id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", upload.Info)\n}\n',
      },
      http: {
        example:
          'curl https://api.cadenya.com/v1/uploads/$ID \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.uploads.retrieve',
        example:
          "import Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nconst upload = await client.uploads.retrieve('id');\n\nconsole.log(upload.info);",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v1/models',
    httpMethod: 'get',
    summary: 'List models',
    description: 'Lists all models in the workspace',
    stainlessPath: '(resource) models > (method) list',
    qualified: 'client.models.list',
    params: [
      'cursor?: string;',
      'limit?: number;',
      'prefix?: string;',
      'query?: string;',
      'sortOrder?: string;',
      "status?: 'MODEL_STATUS_UNSPECIFIED' | 'MODEL_STATUS_ENABLED' | 'MODEL_STATUS_DISABLED';",
    ],
    response:
      "{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { family?: string; inputPricePerMillionTokens?: string; maxInputTokens?: number; maxOutputTokens?: number; outputPricePerMillionTokens?: string; provider?: string; status?: 'MODEL_STATUS_UNSPECIFIED' | 'MODEL_STATUS_ENABLED' | 'MODEL_STATUS_DISABLED'; }; }",
    markdown:
      "## list\n\n`client.models.list(cursor?: string, limit?: number, prefix?: string, query?: string, sortOrder?: string, status?: 'MODEL_STATUS_UNSPECIFIED' | 'MODEL_STATUS_ENABLED' | 'MODEL_STATUS_DISABLED'): { metadata: resource_metadata; spec: model_spec; }`\n\n**get** `/v1/models`\n\nLists all models in the workspace\n\n### Parameters\n\n- `cursor?: string`\n  Pagination cursor from previous response\n\n- `limit?: number`\n  Maximum number of results to return\n\n- `prefix?: string`\n  Filter by name prefix\n\n- `query?: string`\n  Free-form search query\n\n- `sortOrder?: string`\n  Sort order for results (asc or desc by creation time)\n\n- `status?: 'MODEL_STATUS_UNSPECIFIED' | 'MODEL_STATUS_ENABLED' | 'MODEL_STATUS_DISABLED'`\n  Filter by model status\n\n### Returns\n\n- `{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { family?: string; inputPricePerMillionTokens?: string; maxInputTokens?: number; maxOutputTokens?: number; outputPricePerMillionTokens?: string; provider?: string; status?: 'MODEL_STATUS_UNSPECIFIED' | 'MODEL_STATUS_ENABLED' | 'MODEL_STATUS_DISABLED'; }; }`\n\n  - `metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `spec: { family?: string; inputPricePerMillionTokens?: string; maxInputTokens?: number; maxOutputTokens?: number; outputPricePerMillionTokens?: string; provider?: string; status?: 'MODEL_STATUS_UNSPECIFIED' | 'MODEL_STATUS_ENABLED' | 'MODEL_STATUS_DISABLED'; }`\n\n### Example\n\n```typescript\nimport Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya();\n\n// Automatically fetches more pages as needed.\nfor await (const model of client.models.list()) {\n  console.log(model);\n}\n```",
    perLanguage: {
      cli: {
        method: 'models list',
        example: "cadenya models list \\\n  --api-key 'My API Key'",
      },
      go: {
        method: 'client.Models.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cadenya/cadenya-go"\n\t"github.com/cadenya/cadenya-go/option"\n)\n\nfunc main() {\n\tclient := cadenya.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Models.List(context.TODO(), cadenya.ModelListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example: 'curl https://api.cadenya.com/v1/models \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.models.list',
        example:
          "import Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const model of client.models.list()) {\n  console.log(model.metadata);\n}",
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/v1/models/{id}',
    httpMethod: 'get',
    summary: 'Get a model by ID',
    description: 'Retrieves a model by ID from the workspace',
    stainlessPath: '(resource) models > (method) retrieve',
    qualified: 'client.models.retrieve',
    params: ['id: string;'],
    response:
      "{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { family?: string; inputPricePerMillionTokens?: string; maxInputTokens?: number; maxOutputTokens?: number; outputPricePerMillionTokens?: string; provider?: string; status?: 'MODEL_STATUS_UNSPECIFIED' | 'MODEL_STATUS_ENABLED' | 'MODEL_STATUS_DISABLED'; }; }",
    markdown:
      "## retrieve\n\n`client.models.retrieve(id: string): { metadata: resource_metadata; spec: model_spec; }`\n\n**get** `/v1/models/{id}`\n\nRetrieves a model by ID from the workspace\n\n### Parameters\n\n- `id: string`\n\n### Returns\n\n- `{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { family?: string; inputPricePerMillionTokens?: string; maxInputTokens?: number; maxOutputTokens?: number; outputPricePerMillionTokens?: string; provider?: string; status?: 'MODEL_STATUS_UNSPECIFIED' | 'MODEL_STATUS_ENABLED' | 'MODEL_STATUS_DISABLED'; }; }`\n\n  - `metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `spec: { family?: string; inputPricePerMillionTokens?: string; maxInputTokens?: number; maxOutputTokens?: number; outputPricePerMillionTokens?: string; provider?: string; status?: 'MODEL_STATUS_UNSPECIFIED' | 'MODEL_STATUS_ENABLED' | 'MODEL_STATUS_DISABLED'; }`\n\n### Example\n\n```typescript\nimport Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya();\n\nconst model = await client.models.retrieve('id');\n\nconsole.log(model);\n```",
    perLanguage: {
      cli: {
        method: 'models retrieve',
        example: "cadenya models retrieve \\\n  --api-key 'My API Key' \\\n  --id id",
      },
      go: {
        method: 'client.Models.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cadenya/cadenya-go"\n\t"github.com/cadenya/cadenya-go/option"\n)\n\nfunc main() {\n\tclient := cadenya.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tmodel, err := client.Models.Get(context.TODO(), "id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", model.Metadata)\n}\n',
      },
      http: {
        example:
          'curl https://api.cadenya.com/v1/models/$ID \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.models.retrieve',
        example:
          "import Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nconst model = await client.models.retrieve('id');\n\nconsole.log(model.metadata);",
      },
    },
  },
  {
    name: 'set_status',
    endpoint: '/v1/models/{id}/status',
    httpMethod: 'put',
    summary: 'Set model status',
    description: 'Enables or disables a model in the workspace',
    stainlessPath: '(resource) models > (method) set_status',
    qualified: 'client.models.setStatus',
    params: [
      'id: string;',
      "status?: 'MODEL_STATUS_UNSPECIFIED' | 'MODEL_STATUS_ENABLED' | 'MODEL_STATUS_DISABLED';",
    ],
    response:
      "{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { family?: string; inputPricePerMillionTokens?: string; maxInputTokens?: number; maxOutputTokens?: number; outputPricePerMillionTokens?: string; provider?: string; status?: 'MODEL_STATUS_UNSPECIFIED' | 'MODEL_STATUS_ENABLED' | 'MODEL_STATUS_DISABLED'; }; }",
    markdown:
      "## set_status\n\n`client.models.setStatus(id: string, status?: 'MODEL_STATUS_UNSPECIFIED' | 'MODEL_STATUS_ENABLED' | 'MODEL_STATUS_DISABLED'): { metadata: resource_metadata; spec: model_spec; }`\n\n**put** `/v1/models/{id}/status`\n\nEnables or disables a model in the workspace\n\n### Parameters\n\n- `id: string`\n\n- `status?: 'MODEL_STATUS_UNSPECIFIED' | 'MODEL_STATUS_ENABLED' | 'MODEL_STATUS_DISABLED'`\n  The new status for the model\n\n### Returns\n\n- `{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { family?: string; inputPricePerMillionTokens?: string; maxInputTokens?: number; maxOutputTokens?: number; outputPricePerMillionTokens?: string; provider?: string; status?: 'MODEL_STATUS_UNSPECIFIED' | 'MODEL_STATUS_ENABLED' | 'MODEL_STATUS_DISABLED'; }; }`\n\n  - `metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `spec: { family?: string; inputPricePerMillionTokens?: string; maxInputTokens?: number; maxOutputTokens?: number; outputPricePerMillionTokens?: string; provider?: string; status?: 'MODEL_STATUS_UNSPECIFIED' | 'MODEL_STATUS_ENABLED' | 'MODEL_STATUS_DISABLED'; }`\n\n### Example\n\n```typescript\nimport Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya();\n\nconst model = await client.models.setStatus('id');\n\nconsole.log(model);\n```",
    perLanguage: {
      cli: {
        method: 'models set_status',
        example: "cadenya models set-status \\\n  --api-key 'My API Key' \\\n  --id id",
      },
      go: {
        method: 'client.Models.SetStatus',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cadenya/cadenya-go"\n\t"github.com/cadenya/cadenya-go/option"\n)\n\nfunc main() {\n\tclient := cadenya.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tmodel, err := client.Models.SetStatus(\n\t\tcontext.TODO(),\n\t\t"id",\n\t\tcadenya.ModelSetStatusParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", model.Metadata)\n}\n',
      },
      http: {
        example:
          "curl https://api.cadenya.com/v1/models/$ID/status \\\n    -X PUT \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $CADENYA_API_KEY\" \\\n    -d '{}'",
      },
      typescript: {
        method: 'client.models.setStatus',
        example:
          "import Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nconst model = await client.models.setStatus('id');\n\nconsole.log(model.metadata);",
      },
    },
  },
  {
    name: 'search_tools_or_tool_sets',
    endpoint: '/v1/search/tools_or_tool_sets',
    httpMethod: 'get',
    summary: 'Search for tools or tool sets',
    description: 'Searches for tools or tool sets in the workspace',
    stainlessPath: '(resource) search > (method) search_tools_or_tool_sets',
    qualified: 'client.search.searchToolsOrToolSets',
    params: ['query?: string;'],
    response:
      '{ agents?: { metadata: resource_metadata; spec: agent_spec; info?: agent_info; }[]; tools?: { metadata: resource_metadata; spec: tool_spec; info?: tool_info; }[]; toolSets?: { metadata: resource_metadata; spec: tool_set_spec; info?: tool_set_info; }[]; }',
    markdown:
      "## search_tools_or_tool_sets\n\n`client.search.searchToolsOrToolSets(query?: string): { agents?: agent[]; tools?: tool[]; toolSets?: tool_set[]; }`\n\n**get** `/v1/search/tools_or_tool_sets`\n\nSearches for tools or tool sets in the workspace\n\n### Parameters\n\n- `query?: string`\n\n### Returns\n\n- `{ agents?: { metadata: resource_metadata; spec: agent_spec; info?: agent_info; }[]; tools?: { metadata: resource_metadata; spec: tool_spec; info?: tool_info; }[]; toolSets?: { metadata: resource_metadata; spec: tool_set_spec; info?: tool_set_info; }[]; }`\n\n  - `agents?: { metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { status: string; variationSelectionMode: string; description?: string; inputDataSchema?: object; webhookEventsUrl?: string; }; info?: { createdBy?: profile; variationCount?: number; }; }[]`\n  - `tools?: { metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { config: tool_spec_config; description: string; parameters: object; status: string; requiresApproval?: boolean; }; info?: { createdBy?: profile; toolSet?: resource_metadata; }; }[]`\n  - `toolSets?: { metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { adapter?: tool_set_adapter; description?: string; }; info?: { agentCount?: number; createdBy?: profile; lastSync?: string; toolCount?: number; }; }[]`\n\n### Example\n\n```typescript\nimport Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya();\n\nconst response = await client.search.searchToolsOrToolSets();\n\nconsole.log(response);\n```",
    perLanguage: {
      cli: {
        method: 'search search_tools_or_tool_sets',
        example: "cadenya search search-tools-or-tool-sets \\\n  --api-key 'My API Key'",
      },
      go: {
        method: 'client.Search.SearchToolsOrToolSets',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cadenya/cadenya-go"\n\t"github.com/cadenya/cadenya-go/option"\n)\n\nfunc main() {\n\tclient := cadenya.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Search.SearchToolsOrToolSets(context.TODO(), cadenya.SearchSearchToolsOrToolSetsParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Agents)\n}\n',
      },
      http: {
        example:
          'curl https://api.cadenya.com/v1/search/tools_or_tool_sets \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.search.searchToolsOrToolSets',
        example:
          "import Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.search.searchToolsOrToolSets();\n\nconsole.log(response.agents);",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v1/tool_sets',
    httpMethod: 'get',
    summary: 'List tool sets',
    description: 'Lists all tool sets in the workspace',
    stainlessPath: '(resource) tool_sets > (method) list',
    qualified: 'client.toolSets.list',
    params: [
      'cursor?: string;',
      'includeInfo?: boolean;',
      'limit?: number;',
      'prefix?: string;',
      'query?: string;',
      'sortOrder?: string;',
    ],
    response:
      '{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { adapter?: tool_set_adapter; description?: string; }; info?: { agentCount?: number; createdBy?: profile; lastSync?: string; toolCount?: number; }; }',
    markdown:
      "## list\n\n`client.toolSets.list(cursor?: string, includeInfo?: boolean, limit?: number, prefix?: string, query?: string, sortOrder?: string): { metadata: resource_metadata; spec: tool_set_spec; info?: tool_set_info; }`\n\n**get** `/v1/tool_sets`\n\nLists all tool sets in the workspace\n\n### Parameters\n\n- `cursor?: string`\n  Pagination cursor from previous response\n\n- `includeInfo?: boolean`\n  When set to true you may use more of your alloted API rate-limit\n\n- `limit?: number`\n  Maximum number of results to return\n\n- `prefix?: string`\n  Filter expression (query param: prefix)\n\n- `query?: string`\n  Free-form search query\n\n- `sortOrder?: string`\n  Sort order for results (asc or desc by creation time)\n\n### Returns\n\n- `{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { adapter?: tool_set_adapter; description?: string; }; info?: { agentCount?: number; createdBy?: profile; lastSync?: string; toolCount?: number; }; }`\n\n  - `metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `spec: { adapter?: { http?: tool_set_adapter_http; mcp?: tool_set_adapter_mcp; }; description?: string; }`\n  - `info?: { agentCount?: number; createdBy?: { metadata: account_resource_metadata; spec: profile_spec; }; lastSync?: string; toolCount?: number; }`\n\n### Example\n\n```typescript\nimport Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya();\n\n// Automatically fetches more pages as needed.\nfor await (const toolSet of client.toolSets.list()) {\n  console.log(toolSet);\n}\n```",
    perLanguage: {
      cli: {
        method: 'tool_sets list',
        example: "cadenya tool-sets list \\\n  --api-key 'My API Key'",
      },
      go: {
        method: 'client.ToolSets.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cadenya/cadenya-go"\n\t"github.com/cadenya/cadenya-go/option"\n)\n\nfunc main() {\n\tclient := cadenya.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.ToolSets.List(context.TODO(), cadenya.ToolSetListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://api.cadenya.com/v1/tool_sets \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.toolSets.list',
        example:
          "import Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const toolSet of client.toolSets.list()) {\n  console.log(toolSet.metadata);\n}",
      },
    },
  },
  {
    name: 'create',
    endpoint: '/v1/tool_sets',
    httpMethod: 'post',
    summary: 'Create a new tool set',
    description: 'Creates a new tool set in the workspace',
    stainlessPath: '(resource) tool_sets > (method) create',
    qualified: 'client.toolSets.create',
    params: [
      'metadata: { name: string; externalId?: string; labels?: object; };',
      'spec: { adapter?: { http?: tool_set_adapter_http; mcp?: tool_set_adapter_mcp; }; description?: string; };',
    ],
    response:
      '{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { adapter?: tool_set_adapter; description?: string; }; info?: { agentCount?: number; createdBy?: profile; lastSync?: string; toolCount?: number; }; }',
    markdown:
      '## create\n\n`client.toolSets.create(metadata: { name: string; externalId?: string; labels?: object; }, spec: { adapter?: tool_set_adapter; description?: string; }): { metadata: resource_metadata; spec: tool_set_spec; info?: tool_set_info; }`\n\n**post** `/v1/tool_sets`\n\nCreates a new tool set in the workspace\n\n### Parameters\n\n- `metadata: { name: string; externalId?: string; labels?: object; }`\n  CreateResourceMetadata contains the user-provided fields for creating\n a workspace-scoped resource. Read-only fields (id, account_id, workspace_id, profile_id,\n created_at) are excluded since they are set by the server.\n  - `name: string`\n    Human-readable name for the resource (e.g., "Customer Support Agent", "Email Tool")\n  - `externalId?: string`\n    External ID for the resource (e.g., a workflow ID from an external system)\n  - `labels?: object`\n    Arbitrary key-value pairs for categorization and filtering\n Examples: {"environment": "production", "team": "platform", "version": "v2"}\n\n- `spec: { adapter?: { http?: tool_set_adapter_http; mcp?: tool_set_adapter_mcp; }; description?: string; }`\n  - `adapter?: { http?: { baseUrl?: string; headers?: object; }; mcp?: { excludeTools?: mcp_tool_filter; headers?: object; includeTools?: mcp_tool_filter; toolApprovals?: object; url?: string; }; }`\n  - `description?: string`\n\n### Returns\n\n- `{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { adapter?: tool_set_adapter; description?: string; }; info?: { agentCount?: number; createdBy?: profile; lastSync?: string; toolCount?: number; }; }`\n\n  - `metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `spec: { adapter?: { http?: tool_set_adapter_http; mcp?: tool_set_adapter_mcp; }; description?: string; }`\n  - `info?: { agentCount?: number; createdBy?: { metadata: account_resource_metadata; spec: profile_spec; }; lastSync?: string; toolCount?: number; }`\n\n### Example\n\n```typescript\nimport Cadenya from \'@cadenya/cadenya\';\n\nconst client = new Cadenya();\n\nconst toolSet = await client.toolSets.create({\n  metadata: { name: \'name\' },\n  spec: {},\n});\n\nconsole.log(toolSet);\n```',
    perLanguage: {
      cli: {
        method: 'tool_sets create',
        example:
          "cadenya tool-sets create \\\n  --api-key 'My API Key' \\\n  --metadata '{name: name}' \\\n  --spec '{}'",
      },
      go: {
        method: 'client.ToolSets.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cadenya/cadenya-go"\n\t"github.com/cadenya/cadenya-go/option"\n\t"github.com/cadenya/cadenya-go/shared"\n)\n\nfunc main() {\n\tclient := cadenya.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\ttoolSet, err := client.ToolSets.New(context.TODO(), cadenya.ToolSetNewParams{\n\t\tMetadata: cadenya.F(shared.CreateResourceMetadataParam{\n\t\t\tName: cadenya.F("name"),\n\t\t}),\n\t\tSpec: cadenya.F(cadenya.ToolSetSpecParam{}),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", toolSet.Metadata)\n}\n',
      },
      http: {
        example:
          'curl https://api.cadenya.com/v1/tool_sets \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $CADENYA_API_KEY" \\\n    -d \'{\n          "metadata": {\n            "name": "name"\n          },\n          "spec": {}\n        }\'',
      },
      typescript: {
        method: 'client.toolSets.create',
        example:
          "import Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nconst toolSet = await client.toolSets.create({\n  metadata: { name: 'name' },\n  spec: {},\n});\n\nconsole.log(toolSet.metadata);",
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/v1/tool_sets/{id}',
    httpMethod: 'get',
    summary: 'Get a tool set by ID',
    description: 'Retrieves a tool set by ID from the workspace',
    stainlessPath: '(resource) tool_sets > (method) retrieve',
    qualified: 'client.toolSets.retrieve',
    params: ['id: string;'],
    response:
      '{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { adapter?: tool_set_adapter; description?: string; }; info?: { agentCount?: number; createdBy?: profile; lastSync?: string; toolCount?: number; }; }',
    markdown:
      "## retrieve\n\n`client.toolSets.retrieve(id: string): { metadata: resource_metadata; spec: tool_set_spec; info?: tool_set_info; }`\n\n**get** `/v1/tool_sets/{id}`\n\nRetrieves a tool set by ID from the workspace\n\n### Parameters\n\n- `id: string`\n\n### Returns\n\n- `{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { adapter?: tool_set_adapter; description?: string; }; info?: { agentCount?: number; createdBy?: profile; lastSync?: string; toolCount?: number; }; }`\n\n  - `metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `spec: { adapter?: { http?: tool_set_adapter_http; mcp?: tool_set_adapter_mcp; }; description?: string; }`\n  - `info?: { agentCount?: number; createdBy?: { metadata: account_resource_metadata; spec: profile_spec; }; lastSync?: string; toolCount?: number; }`\n\n### Example\n\n```typescript\nimport Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya();\n\nconst toolSet = await client.toolSets.retrieve('id');\n\nconsole.log(toolSet);\n```",
    perLanguage: {
      cli: {
        method: 'tool_sets retrieve',
        example: "cadenya tool-sets retrieve \\\n  --api-key 'My API Key' \\\n  --id id",
      },
      go: {
        method: 'client.ToolSets.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cadenya/cadenya-go"\n\t"github.com/cadenya/cadenya-go/option"\n)\n\nfunc main() {\n\tclient := cadenya.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\ttoolSet, err := client.ToolSets.Get(context.TODO(), "id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", toolSet.Metadata)\n}\n',
      },
      http: {
        example:
          'curl https://api.cadenya.com/v1/tool_sets/$ID \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.toolSets.retrieve',
        example:
          "import Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nconst toolSet = await client.toolSets.retrieve('id');\n\nconsole.log(toolSet.metadata);",
      },
    },
  },
  {
    name: 'update',
    endpoint: '/v1/tool_sets/{id}',
    httpMethod: 'put',
    summary: 'Update a tool set',
    description: 'Updates a tool set in the workspace',
    stainlessPath: '(resource) tool_sets > (method) update',
    qualified: 'client.toolSets.update',
    params: [
      'id: string;',
      'metadata?: { name: string; externalId?: string; labels?: object; };',
      'spec?: { adapter?: { http?: tool_set_adapter_http; mcp?: tool_set_adapter_mcp; }; description?: string; };',
      'updateMask?: string;',
    ],
    response:
      '{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { adapter?: tool_set_adapter; description?: string; }; info?: { agentCount?: number; createdBy?: profile; lastSync?: string; toolCount?: number; }; }',
    markdown:
      '## update\n\n`client.toolSets.update(id: string, metadata?: { name: string; externalId?: string; labels?: object; }, spec?: { adapter?: tool_set_adapter; description?: string; }, updateMask?: string): { metadata: resource_metadata; spec: tool_set_spec; info?: tool_set_info; }`\n\n**put** `/v1/tool_sets/{id}`\n\nUpdates a tool set in the workspace\n\n### Parameters\n\n- `id: string`\n\n- `metadata?: { name: string; externalId?: string; labels?: object; }`\n  UpdateResourceMetadata contains the user-provided fields for updating\n a workspace-scoped resource. Read-only fields (id, account_id, workspace_id, profile_id,\n created_at) are excluded since they are set by the server.\n  - `name: string`\n    Human-readable name for the resource (e.g., "Customer Support Agent", "Email Tool")\n  - `externalId?: string`\n    External ID for the resource (e.g., a workflow ID from an external system)\n  - `labels?: object`\n    Arbitrary key-value pairs for categorization and filtering\n Examples: {"environment": "production", "team": "platform", "version": "v2"}\n\n- `spec?: { adapter?: { http?: tool_set_adapter_http; mcp?: tool_set_adapter_mcp; }; description?: string; }`\n  - `adapter?: { http?: { baseUrl?: string; headers?: object; }; mcp?: { excludeTools?: mcp_tool_filter; headers?: object; includeTools?: mcp_tool_filter; toolApprovals?: object; url?: string; }; }`\n  - `description?: string`\n\n- `updateMask?: string`\n\n### Returns\n\n- `{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { adapter?: tool_set_adapter; description?: string; }; info?: { agentCount?: number; createdBy?: profile; lastSync?: string; toolCount?: number; }; }`\n\n  - `metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `spec: { adapter?: { http?: tool_set_adapter_http; mcp?: tool_set_adapter_mcp; }; description?: string; }`\n  - `info?: { agentCount?: number; createdBy?: { metadata: account_resource_metadata; spec: profile_spec; }; lastSync?: string; toolCount?: number; }`\n\n### Example\n\n```typescript\nimport Cadenya from \'@cadenya/cadenya\';\n\nconst client = new Cadenya();\n\nconst toolSet = await client.toolSets.update(\'id\');\n\nconsole.log(toolSet);\n```',
    perLanguage: {
      cli: {
        method: 'tool_sets update',
        example: "cadenya tool-sets update \\\n  --api-key 'My API Key' \\\n  --id id",
      },
      go: {
        method: 'client.ToolSets.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cadenya/cadenya-go"\n\t"github.com/cadenya/cadenya-go/option"\n)\n\nfunc main() {\n\tclient := cadenya.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\ttoolSet, err := client.ToolSets.Update(\n\t\tcontext.TODO(),\n\t\t"id",\n\t\tcadenya.ToolSetUpdateParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", toolSet.Metadata)\n}\n',
      },
      http: {
        example:
          "curl https://api.cadenya.com/v1/tool_sets/$ID \\\n    -X PUT \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $CADENYA_API_KEY\" \\\n    -d '{}'",
      },
      typescript: {
        method: 'client.toolSets.update',
        example:
          "import Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nconst toolSet = await client.toolSets.update('id');\n\nconsole.log(toolSet.metadata);",
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/v1/tool_sets/{id}',
    httpMethod: 'delete',
    summary: 'Delete a tool set',
    description: 'Deletes a tool set in the workspace',
    stainlessPath: '(resource) tool_sets > (method) delete',
    qualified: 'client.toolSets.delete',
    params: ['id: string;'],
    markdown:
      "## delete\n\n`client.toolSets.delete(id: string): void`\n\n**delete** `/v1/tool_sets/{id}`\n\nDeletes a tool set in the workspace\n\n### Parameters\n\n- `id: string`\n\n### Example\n\n```typescript\nimport Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya();\n\nawait client.toolSets.delete('id')\n```",
    perLanguage: {
      cli: {
        method: 'tool_sets delete',
        example: "cadenya tool-sets delete \\\n  --api-key 'My API Key' \\\n  --id id",
      },
      go: {
        method: 'client.ToolSets.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/cadenya/cadenya-go"\n\t"github.com/cadenya/cadenya-go/option"\n)\n\nfunc main() {\n\tclient := cadenya.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\terr := client.ToolSets.Delete(context.TODO(), "id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://api.cadenya.com/v1/tool_sets/$ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.toolSets.delete',
        example:
          "import Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.toolSets.delete('id');",
      },
    },
  },
  {
    name: 'list_events',
    endpoint: '/v1/tool_sets/{toolSetId}/events',
    httpMethod: 'get',
    summary: 'List tool set events',
    description: 'Lists all events (including sync status) for a tool set',
    stainlessPath: '(resource) tool_sets > (method) list_events',
    qualified: 'client.toolSets.listEvents',
    params: [
      'toolSetId: string;',
      'cursor?: string;',
      'includeInfo?: boolean;',
      'limit?: number;',
      'sortOrder?: string;',
    ],
    response:
      '{ metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; event?: { syncCompleted?: sync_completed; syncFailed?: sync_failed; syncStarted?: sync_started; type?: string; }; info?: { createdBy?: object; toolSet?: object; }; toolSetId?: string; }',
    markdown:
      "## list_events\n\n`client.toolSets.listEvents(toolSetId: string, cursor?: string, includeInfo?: boolean, limit?: number, sortOrder?: string): { metadata: operation_metadata; event?: tool_set_event_data; info?: object; toolSetId?: string; }`\n\n**get** `/v1/tool_sets/{toolSetId}/events`\n\nLists all events (including sync status) for a tool set\n\n### Parameters\n\n- `toolSetId: string`\n\n- `cursor?: string`\n  Pagination cursor from previous response\n\n- `includeInfo?: boolean`\n  When set to true you may use more of your alloted API rate-limit\n\n- `limit?: number`\n  Maximum number of results to return\n\n- `sortOrder?: string`\n  Sort order for results (asc or desc by creation time)\n\n### Returns\n\n- `{ metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; event?: { syncCompleted?: sync_completed; syncFailed?: sync_failed; syncStarted?: sync_started; type?: string; }; info?: { createdBy?: object; toolSet?: object; }; toolSetId?: string; }`\n  ToolSetEvent represents a single event in the tool set's operation timeline\n\n  - `metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `event?: { syncCompleted?: { message?: string; toolsSynced?: number; }; syncFailed?: { error?: boolean; errorType?: string; message?: string; }; syncStarted?: { message?: string; }; type?: string; }`\n  - `info?: { createdBy?: { metadata: object; spec: object; }; toolSet?: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; }`\n  - `toolSetId?: string`\n\n### Example\n\n```typescript\nimport Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya();\n\n// Automatically fetches more pages as needed.\nfor await (const toolSetEvent of client.toolSets.listEvents('toolSetId')) {\n  console.log(toolSetEvent);\n}\n```",
    perLanguage: {
      cli: {
        method: 'tool_sets list_events',
        example: "cadenya tool-sets list-events \\\n  --api-key 'My API Key' \\\n  --tool-set-id toolSetId",
      },
      go: {
        method: 'client.ToolSets.ListEvents',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cadenya/cadenya-go"\n\t"github.com/cadenya/cadenya-go/option"\n)\n\nfunc main() {\n\tclient := cadenya.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.ToolSets.ListEvents(\n\t\tcontext.TODO(),\n\t\t"toolSetId",\n\t\tcadenya.ToolSetListEventsParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://api.cadenya.com/v1/tool_sets/$TOOL_SET_ID/events \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.toolSets.listEvents',
        example:
          "import Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const toolSetEvent of client.toolSets.listEvents('toolSetId')) {\n  console.log(toolSetEvent.metadata);\n}",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v1/tool_sets/{toolSetId}/tools',
    httpMethod: 'get',
    summary: 'List tools',
    description: 'Lists all tools in the tool set',
    stainlessPath: '(resource) tool_sets.tools > (method) list',
    qualified: 'client.toolSets.tools.list',
    params: [
      'toolSetId: string;',
      'cursor?: string;',
      'includeInfo?: boolean;',
      'limit?: number;',
      'prefix?: string;',
      'query?: string;',
      'sortOrder?: string;',
    ],
    response:
      '{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { config: tool_spec_config; description: string; parameters: object; status: string; requiresApproval?: boolean; }; info?: { createdBy?: profile; toolSet?: resource_metadata; }; }',
    markdown:
      "## list\n\n`client.toolSets.tools.list(toolSetId: string, cursor?: string, includeInfo?: boolean, limit?: number, prefix?: string, query?: string, sortOrder?: string): { metadata: resource_metadata; spec: tool_spec; info?: tool_info; }`\n\n**get** `/v1/tool_sets/{toolSetId}/tools`\n\nLists all tools in the tool set\n\n### Parameters\n\n- `toolSetId: string`\n\n- `cursor?: string`\n  Pagination cursor from previous response\n\n- `includeInfo?: boolean`\n  When set to true you may use more of your alloted API rate-limit\n\n- `limit?: number`\n  Maximum number of results to return\n\n- `prefix?: string`\n  Filter expression (query param: prefix)\n\n- `query?: string`\n  Free-form search query\n\n- `sortOrder?: string`\n  Sort order for results (asc or desc by creation time)\n\n### Returns\n\n- `{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { config: tool_spec_config; description: string; parameters: object; status: string; requiresApproval?: boolean; }; info?: { createdBy?: profile; toolSet?: resource_metadata; }; }`\n\n  - `metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `spec: { config: { http?: config_http; mcp?: config_mcp; }; description: string; parameters: object; status: string; requiresApproval?: boolean; }`\n  - `info?: { createdBy?: { metadata: account_resource_metadata; spec: profile_spec; }; toolSet?: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; }`\n\n### Example\n\n```typescript\nimport Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya();\n\n// Automatically fetches more pages as needed.\nfor await (const tool of client.toolSets.tools.list('toolSetId')) {\n  console.log(tool);\n}\n```",
    perLanguage: {
      cli: {
        method: 'tools list',
        example: "cadenya tool-sets:tools list \\\n  --api-key 'My API Key' \\\n  --tool-set-id toolSetId",
      },
      go: {
        method: 'client.ToolSets.Tools.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cadenya/cadenya-go"\n\t"github.com/cadenya/cadenya-go/option"\n)\n\nfunc main() {\n\tclient := cadenya.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.ToolSets.Tools.List(\n\t\tcontext.TODO(),\n\t\t"toolSetId",\n\t\tcadenya.ToolSetToolListParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://api.cadenya.com/v1/tool_sets/$TOOL_SET_ID/tools \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.toolSets.tools.list',
        example:
          "import Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const tool of client.toolSets.tools.list('toolSetId')) {\n  console.log(tool.metadata);\n}",
      },
    },
  },
  {
    name: 'create',
    endpoint: '/v1/tool_sets/{toolSetId}/tools',
    httpMethod: 'post',
    summary: 'Create a new tool',
    description: 'Creates a new tool in the tool set',
    stainlessPath: '(resource) tool_sets.tools > (method) create',
    qualified: 'client.toolSets.tools.create',
    params: [
      'toolSetId: string;',
      'metadata: { name: string; externalId?: string; labels?: object; };',
      'spec: { config: { http?: config_http; mcp?: config_mcp; }; description: string; parameters: object; status: string; requiresApproval?: boolean; };',
    ],
    response:
      '{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { config: tool_spec_config; description: string; parameters: object; status: string; requiresApproval?: boolean; }; info?: { createdBy?: profile; toolSet?: resource_metadata; }; }',
    markdown:
      "## create\n\n`client.toolSets.tools.create(toolSetId: string, metadata: { name: string; externalId?: string; labels?: object; }, spec: { config: tool_spec_config; description: string; parameters: object; status: string; requiresApproval?: boolean; }): { metadata: resource_metadata; spec: tool_spec; info?: tool_info; }`\n\n**post** `/v1/tool_sets/{toolSetId}/tools`\n\nCreates a new tool in the tool set\n\n### Parameters\n\n- `toolSetId: string`\n\n- `metadata: { name: string; externalId?: string; labels?: object; }`\n  CreateResourceMetadata contains the user-provided fields for creating\n a workspace-scoped resource. Read-only fields (id, account_id, workspace_id, profile_id,\n created_at) are excluded since they are set by the server.\n  - `name: string`\n    Human-readable name for the resource (e.g., \"Customer Support Agent\", \"Email Tool\")\n  - `externalId?: string`\n    External ID for the resource (e.g., a workflow ID from an external system)\n  - `labels?: object`\n    Arbitrary key-value pairs for categorization and filtering\n Examples: {\"environment\": \"production\", \"team\": \"platform\", \"version\": \"v2\"}\n\n- `spec: { config: { http?: config_http; mcp?: config_mcp; }; description: string; parameters: object; status: string; requiresApproval?: boolean; }`\n  - `config: { http?: { requestMethod: 'HTTP_METHOD_UNSPECIFIED' | 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'; headers?: object; path?: string; query?: string; requestBodyContentType?: string; requestBodyTemplate?: string; toolName?: string; }; mcp?: { toolDescription?: string; toolName?: string; toolTitle?: string; }; }`\n    Config defines the adapter to use for the tool.\n This is used to determine how the tool is called.\n For example, if the tool is an HTTP tool, the adapter will be Http.\n If the tool is an inline tool, the adapter will be Inline.\n  - `description: string`\n  - `parameters: object`\n  - `status: string`\n  - `requiresApproval?: boolean`\n\n### Returns\n\n- `{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { config: tool_spec_config; description: string; parameters: object; status: string; requiresApproval?: boolean; }; info?: { createdBy?: profile; toolSet?: resource_metadata; }; }`\n\n  - `metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `spec: { config: { http?: config_http; mcp?: config_mcp; }; description: string; parameters: object; status: string; requiresApproval?: boolean; }`\n  - `info?: { createdBy?: { metadata: account_resource_metadata; spec: profile_spec; }; toolSet?: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; }`\n\n### Example\n\n```typescript\nimport Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya();\n\nconst tool = await client.toolSets.tools.create('toolSetId', {\n  metadata: { name: 'name' },\n  spec: {\n  config: {},\n  description: 'description',\n  parameters: { foo: 'bar' },\n  status: 'TOOL_STATUS_UNSPECIFIED',\n},\n});\n\nconsole.log(tool);\n```",
    perLanguage: {
      cli: {
        method: 'tools create',
        example:
          "cadenya tool-sets:tools create \\\n  --api-key 'My API Key' \\\n  --tool-set-id toolSetId \\\n  --metadata '{name: name}' \\\n  --spec '{config: {}, description: description, parameters: {foo: bar}, status: TOOL_STATUS_UNSPECIFIED}'",
      },
      go: {
        method: 'client.ToolSets.Tools.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cadenya/cadenya-go"\n\t"github.com/cadenya/cadenya-go/option"\n\t"github.com/cadenya/cadenya-go/shared"\n)\n\nfunc main() {\n\tclient := cadenya.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\ttool, err := client.ToolSets.Tools.New(\n\t\tcontext.TODO(),\n\t\t"toolSetId",\n\t\tcadenya.ToolSetToolNewParams{\n\t\t\tMetadata: cadenya.F(shared.CreateResourceMetadataParam{\n\t\t\t\tName: cadenya.F("name"),\n\t\t\t}),\n\t\t\tSpec: cadenya.F(cadenya.ToolSpecParam{\n\t\t\t\tConfig:      cadenya.F(cadenya.ToolSpecConfigParam{}),\n\t\t\t\tDescription: cadenya.F("description"),\n\t\t\t\tParameters: cadenya.F(map[string]interface{}{\n\t\t\t\t\t"foo": "bar",\n\t\t\t\t}),\n\t\t\t\tStatus: cadenya.F(cadenya.ToolSpecStatusToolStatusUnspecified),\n\t\t\t}),\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", tool.Metadata)\n}\n',
      },
      http: {
        example:
          'curl https://api.cadenya.com/v1/tool_sets/$TOOL_SET_ID/tools \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $CADENYA_API_KEY" \\\n    -d \'{\n          "metadata": {\n            "name": "name"\n          },\n          "spec": {\n            "config": {},\n            "description": "description",\n            "parameters": {\n              "foo": "bar"\n            },\n            "status": "TOOL_STATUS_UNSPECIFIED"\n          }\n        }\'',
      },
      typescript: {
        method: 'client.toolSets.tools.create',
        example:
          "import Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nconst tool = await client.toolSets.tools.create('toolSetId', {\n  metadata: { name: 'name' },\n  spec: {\n    config: {},\n    description: 'description',\n    parameters: { foo: 'bar' },\n    status: 'TOOL_STATUS_UNSPECIFIED',\n  },\n});\n\nconsole.log(tool.metadata);",
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/v1/tool_sets/{toolSetId}/tools/{id}',
    httpMethod: 'get',
    summary: 'Get a tool by ID',
    description: 'Retrieves a tool by ID from the workspace',
    stainlessPath: '(resource) tool_sets.tools > (method) retrieve',
    qualified: 'client.toolSets.tools.retrieve',
    params: ['toolSetId: string;', 'id: string;'],
    response:
      '{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { config: tool_spec_config; description: string; parameters: object; status: string; requiresApproval?: boolean; }; info?: { createdBy?: profile; toolSet?: resource_metadata; }; }',
    markdown:
      "## retrieve\n\n`client.toolSets.tools.retrieve(toolSetId: string, id: string): { metadata: resource_metadata; spec: tool_spec; info?: tool_info; }`\n\n**get** `/v1/tool_sets/{toolSetId}/tools/{id}`\n\nRetrieves a tool by ID from the workspace\n\n### Parameters\n\n- `toolSetId: string`\n\n- `id: string`\n\n### Returns\n\n- `{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { config: tool_spec_config; description: string; parameters: object; status: string; requiresApproval?: boolean; }; info?: { createdBy?: profile; toolSet?: resource_metadata; }; }`\n\n  - `metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `spec: { config: { http?: config_http; mcp?: config_mcp; }; description: string; parameters: object; status: string; requiresApproval?: boolean; }`\n  - `info?: { createdBy?: { metadata: account_resource_metadata; spec: profile_spec; }; toolSet?: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; }`\n\n### Example\n\n```typescript\nimport Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya();\n\nconst tool = await client.toolSets.tools.retrieve('id', { toolSetId: 'toolSetId' });\n\nconsole.log(tool);\n```",
    perLanguage: {
      cli: {
        method: 'tools retrieve',
        example:
          "cadenya tool-sets:tools retrieve \\\n  --api-key 'My API Key' \\\n  --tool-set-id toolSetId \\\n  --id id",
      },
      go: {
        method: 'client.ToolSets.Tools.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cadenya/cadenya-go"\n\t"github.com/cadenya/cadenya-go/option"\n)\n\nfunc main() {\n\tclient := cadenya.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\ttool, err := client.ToolSets.Tools.Get(\n\t\tcontext.TODO(),\n\t\t"toolSetId",\n\t\t"id",\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", tool.Metadata)\n}\n',
      },
      http: {
        example:
          'curl https://api.cadenya.com/v1/tool_sets/$TOOL_SET_ID/tools/$ID \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.toolSets.tools.retrieve',
        example:
          "import Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nconst tool = await client.toolSets.tools.retrieve('id', { toolSetId: 'toolSetId' });\n\nconsole.log(tool.metadata);",
      },
    },
  },
  {
    name: 'update',
    endpoint: '/v1/tool_sets/{toolSetId}/tools/{id}',
    httpMethod: 'put',
    summary: 'Update a tool',
    description: 'Updates a tool in the tool set',
    stainlessPath: '(resource) tool_sets.tools > (method) update',
    qualified: 'client.toolSets.tools.update',
    params: [
      'toolSetId: string;',
      'id: string;',
      'metadata?: { name: string; externalId?: string; labels?: object; };',
      'spec?: { config: { http?: config_http; mcp?: config_mcp; }; description: string; parameters: object; status: string; requiresApproval?: boolean; };',
      'updateMask?: string;',
    ],
    response:
      '{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { config: tool_spec_config; description: string; parameters: object; status: string; requiresApproval?: boolean; }; info?: { createdBy?: profile; toolSet?: resource_metadata; }; }',
    markdown:
      "## update\n\n`client.toolSets.tools.update(toolSetId: string, id: string, metadata?: { name: string; externalId?: string; labels?: object; }, spec?: { config: tool_spec_config; description: string; parameters: object; status: string; requiresApproval?: boolean; }, updateMask?: string): { metadata: resource_metadata; spec: tool_spec; info?: tool_info; }`\n\n**put** `/v1/tool_sets/{toolSetId}/tools/{id}`\n\nUpdates a tool in the tool set\n\n### Parameters\n\n- `toolSetId: string`\n\n- `id: string`\n\n- `metadata?: { name: string; externalId?: string; labels?: object; }`\n  UpdateResourceMetadata contains the user-provided fields for updating\n a workspace-scoped resource. Read-only fields (id, account_id, workspace_id, profile_id,\n created_at) are excluded since they are set by the server.\n  - `name: string`\n    Human-readable name for the resource (e.g., \"Customer Support Agent\", \"Email Tool\")\n  - `externalId?: string`\n    External ID for the resource (e.g., a workflow ID from an external system)\n  - `labels?: object`\n    Arbitrary key-value pairs for categorization and filtering\n Examples: {\"environment\": \"production\", \"team\": \"platform\", \"version\": \"v2\"}\n\n- `spec?: { config: { http?: config_http; mcp?: config_mcp; }; description: string; parameters: object; status: string; requiresApproval?: boolean; }`\n  - `config: { http?: { requestMethod: 'HTTP_METHOD_UNSPECIFIED' | 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'; headers?: object; path?: string; query?: string; requestBodyContentType?: string; requestBodyTemplate?: string; toolName?: string; }; mcp?: { toolDescription?: string; toolName?: string; toolTitle?: string; }; }`\n    Config defines the adapter to use for the tool.\n This is used to determine how the tool is called.\n For example, if the tool is an HTTP tool, the adapter will be Http.\n If the tool is an inline tool, the adapter will be Inline.\n  - `description: string`\n  - `parameters: object`\n  - `status: string`\n  - `requiresApproval?: boolean`\n\n- `updateMask?: string`\n\n### Returns\n\n- `{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { config: tool_spec_config; description: string; parameters: object; status: string; requiresApproval?: boolean; }; info?: { createdBy?: profile; toolSet?: resource_metadata; }; }`\n\n  - `metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `spec: { config: { http?: config_http; mcp?: config_mcp; }; description: string; parameters: object; status: string; requiresApproval?: boolean; }`\n  - `info?: { createdBy?: { metadata: account_resource_metadata; spec: profile_spec; }; toolSet?: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; }`\n\n### Example\n\n```typescript\nimport Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya();\n\nconst tool = await client.toolSets.tools.update('id', { toolSetId: 'toolSetId' });\n\nconsole.log(tool);\n```",
    perLanguage: {
      cli: {
        method: 'tools update',
        example:
          "cadenya tool-sets:tools update \\\n  --api-key 'My API Key' \\\n  --tool-set-id toolSetId \\\n  --id id",
      },
      go: {
        method: 'client.ToolSets.Tools.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cadenya/cadenya-go"\n\t"github.com/cadenya/cadenya-go/option"\n)\n\nfunc main() {\n\tclient := cadenya.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\ttool, err := client.ToolSets.Tools.Update(\n\t\tcontext.TODO(),\n\t\t"toolSetId",\n\t\t"id",\n\t\tcadenya.ToolSetToolUpdateParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", tool.Metadata)\n}\n',
      },
      http: {
        example:
          "curl https://api.cadenya.com/v1/tool_sets/$TOOL_SET_ID/tools/$ID \\\n    -X PUT \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $CADENYA_API_KEY\" \\\n    -d '{}'",
      },
      typescript: {
        method: 'client.toolSets.tools.update',
        example:
          "import Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nconst tool = await client.toolSets.tools.update('id', { toolSetId: 'toolSetId' });\n\nconsole.log(tool.metadata);",
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/v1/tool_sets/{toolSetId}/tools/{id}',
    httpMethod: 'delete',
    summary: 'Delete a tool',
    description: 'Deletes a tool in the tool set',
    stainlessPath: '(resource) tool_sets.tools > (method) delete',
    qualified: 'client.toolSets.tools.delete',
    params: ['toolSetId: string;', 'id: string;'],
    markdown:
      "## delete\n\n`client.toolSets.tools.delete(toolSetId: string, id: string): void`\n\n**delete** `/v1/tool_sets/{toolSetId}/tools/{id}`\n\nDeletes a tool in the tool set\n\n### Parameters\n\n- `toolSetId: string`\n\n- `id: string`\n\n### Example\n\n```typescript\nimport Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya();\n\nawait client.toolSets.tools.delete('id', { toolSetId: 'toolSetId' })\n```",
    perLanguage: {
      cli: {
        method: 'tools delete',
        example:
          "cadenya tool-sets:tools delete \\\n  --api-key 'My API Key' \\\n  --tool-set-id toolSetId \\\n  --id id",
      },
      go: {
        method: 'client.ToolSets.Tools.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/cadenya/cadenya-go"\n\t"github.com/cadenya/cadenya-go/option"\n)\n\nfunc main() {\n\tclient := cadenya.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\terr := client.ToolSets.Tools.Delete(\n\t\tcontext.TODO(),\n\t\t"toolSetId",\n\t\t"id",\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://api.cadenya.com/v1/tool_sets/$TOOL_SET_ID/tools/$ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.toolSets.tools.delete',
        example:
          "import Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.toolSets.tools.delete('id', { toolSetId: 'toolSetId' });",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v1/api_keys',
    httpMethod: 'get',
    summary: 'List API keys',
    description: 'Lists all API keys in the workspace',
    stainlessPath: '(resource) api_keys > (method) list',
    qualified: 'client.apiKeys.list',
    params: [
      'cursor?: string;',
      'includeInfo?: boolean;',
      'limit?: number;',
      'prefix?: string;',
      'query?: string;',
      'sortOrder?: string;',
    ],
    response:
      '{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { token?: string; description?: string; }; info?: { createdBy?: profile; }; }',
    markdown:
      "## list\n\n`client.apiKeys.list(cursor?: string, includeInfo?: boolean, limit?: number, prefix?: string, query?: string, sortOrder?: string): { metadata: resource_metadata; spec: api_key_spec; info?: api_key_info; }`\n\n**get** `/v1/api_keys`\n\nLists all API keys in the workspace\n\n### Parameters\n\n- `cursor?: string`\n  Pagination cursor from previous response\n\n- `includeInfo?: boolean`\n  When set to true you may use more of your alloted API rate-limit\n\n- `limit?: number`\n  Maximum number of results to return\n\n- `prefix?: string`\n  Filter expression (query param: prefix)\n\n- `query?: string`\n  Free-form search query\n\n- `sortOrder?: string`\n  Sort order for results (asc or desc by creation time)\n\n### Returns\n\n- `{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { token?: string; description?: string; }; info?: { createdBy?: profile; }; }`\n  APIKey represents a workspace-scoped API key.\n Each API key belongs to exactly one workspace, ensuring workspace isolation.\n Authentication is handled via Cadenya-issued JWTs signed with the key's own signing secret.\n\n  - `metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `spec: { token?: string; description?: string; }`\n  - `info?: { createdBy?: { metadata: account_resource_metadata; spec: profile_spec; }; }`\n\n### Example\n\n```typescript\nimport Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya();\n\n// Automatically fetches more pages as needed.\nfor await (const apiKey of client.apiKeys.list()) {\n  console.log(apiKey);\n}\n```",
    perLanguage: {
      cli: {
        method: 'api_keys list',
        example: "cadenya api-keys list \\\n  --api-key 'My API Key'",
      },
      go: {
        method: 'client.APIKeys.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cadenya/cadenya-go"\n\t"github.com/cadenya/cadenya-go/option"\n)\n\nfunc main() {\n\tclient := cadenya.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.APIKeys.List(context.TODO(), cadenya.APIKeyListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://api.cadenya.com/v1/api_keys \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.apiKeys.list',
        example:
          "import Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const apiKey of client.apiKeys.list()) {\n  console.log(apiKey.metadata);\n}",
      },
    },
  },
  {
    name: 'create',
    endpoint: '/v1/api_keys',
    httpMethod: 'post',
    summary: 'Create a new API key',
    description: 'Creates a new API key in the workspace.',
    stainlessPath: '(resource) api_keys > (method) create',
    qualified: 'client.apiKeys.create',
    params: [
      'metadata: { name: string; externalId?: string; labels?: object; };',
      'spec: { token?: string; description?: string; };',
    ],
    response:
      '{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { token?: string; description?: string; }; info?: { createdBy?: profile; }; }',
    markdown:
      '## create\n\n`client.apiKeys.create(metadata: { name: string; externalId?: string; labels?: object; }, spec: { token?: string; description?: string; }): { metadata: resource_metadata; spec: api_key_spec; info?: api_key_info; }`\n\n**post** `/v1/api_keys`\n\nCreates a new API key in the workspace.\n\n### Parameters\n\n- `metadata: { name: string; externalId?: string; labels?: object; }`\n  CreateResourceMetadata contains the user-provided fields for creating\n a workspace-scoped resource. Read-only fields (id, account_id, workspace_id, profile_id,\n created_at) are excluded since they are set by the server.\n  - `name: string`\n    Human-readable name for the resource (e.g., "Customer Support Agent", "Email Tool")\n  - `externalId?: string`\n    External ID for the resource (e.g., a workflow ID from an external system)\n  - `labels?: object`\n    Arbitrary key-value pairs for categorization and filtering\n Examples: {"environment": "production", "team": "platform", "version": "v2"}\n\n- `spec: { token?: string; description?: string; }`\n  APIKeySpec contains the API Key-specific fields\n  - `token?: string`\n    The actual token value (only returned on creation and rotation, read-only)\n  - `description?: string`\n    Description of what this API Key is used for\n\n### Returns\n\n- `{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { token?: string; description?: string; }; info?: { createdBy?: profile; }; }`\n  APIKey represents a workspace-scoped API key.\n Each API key belongs to exactly one workspace, ensuring workspace isolation.\n Authentication is handled via Cadenya-issued JWTs signed with the key\'s own signing secret.\n\n  - `metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `spec: { token?: string; description?: string; }`\n  - `info?: { createdBy?: { metadata: account_resource_metadata; spec: profile_spec; }; }`\n\n### Example\n\n```typescript\nimport Cadenya from \'@cadenya/cadenya\';\n\nconst client = new Cadenya();\n\nconst apiKey = await client.apiKeys.create({\n  metadata: { name: \'name\' },\n  spec: {},\n});\n\nconsole.log(apiKey);\n```',
    perLanguage: {
      cli: {
        method: 'api_keys create',
        example:
          "cadenya api-keys create \\\n  --api-key 'My API Key' \\\n  --metadata '{name: name}' \\\n  --spec '{}'",
      },
      go: {
        method: 'client.APIKeys.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cadenya/cadenya-go"\n\t"github.com/cadenya/cadenya-go/option"\n\t"github.com/cadenya/cadenya-go/shared"\n)\n\nfunc main() {\n\tclient := cadenya.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tapiKey, err := client.APIKeys.New(context.TODO(), cadenya.APIKeyNewParams{\n\t\tMetadata: cadenya.F(shared.CreateResourceMetadataParam{\n\t\t\tName: cadenya.F("name"),\n\t\t}),\n\t\tSpec: cadenya.F(cadenya.APIKeySpecParam{}),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", apiKey.Metadata)\n}\n',
      },
      http: {
        example:
          'curl https://api.cadenya.com/v1/api_keys \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $CADENYA_API_KEY" \\\n    -d \'{\n          "metadata": {\n            "name": "name"\n          },\n          "spec": {}\n        }\'',
      },
      typescript: {
        method: 'client.apiKeys.create',
        example:
          "import Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nconst apiKey = await client.apiKeys.create({\n  metadata: { name: 'name' },\n  spec: {},\n});\n\nconsole.log(apiKey.metadata);",
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/v1/api_keys/{id}',
    httpMethod: 'get',
    summary: 'Get an API key by ID',
    description: 'Retrieves an API key by ID from the workspace',
    stainlessPath: '(resource) api_keys > (method) retrieve',
    qualified: 'client.apiKeys.retrieve',
    params: ['id: string;'],
    response:
      '{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { token?: string; description?: string; }; info?: { createdBy?: profile; }; }',
    markdown:
      "## retrieve\n\n`client.apiKeys.retrieve(id: string): { metadata: resource_metadata; spec: api_key_spec; info?: api_key_info; }`\n\n**get** `/v1/api_keys/{id}`\n\nRetrieves an API key by ID from the workspace\n\n### Parameters\n\n- `id: string`\n\n### Returns\n\n- `{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { token?: string; description?: string; }; info?: { createdBy?: profile; }; }`\n  APIKey represents a workspace-scoped API key.\n Each API key belongs to exactly one workspace, ensuring workspace isolation.\n Authentication is handled via Cadenya-issued JWTs signed with the key's own signing secret.\n\n  - `metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `spec: { token?: string; description?: string; }`\n  - `info?: { createdBy?: { metadata: account_resource_metadata; spec: profile_spec; }; }`\n\n### Example\n\n```typescript\nimport Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya();\n\nconst apiKey = await client.apiKeys.retrieve('id');\n\nconsole.log(apiKey);\n```",
    perLanguage: {
      cli: {
        method: 'api_keys retrieve',
        example: "cadenya api-keys retrieve \\\n  --api-key 'My API Key' \\\n  --id id",
      },
      go: {
        method: 'client.APIKeys.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cadenya/cadenya-go"\n\t"github.com/cadenya/cadenya-go/option"\n)\n\nfunc main() {\n\tclient := cadenya.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tapiKey, err := client.APIKeys.Get(context.TODO(), "id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", apiKey.Metadata)\n}\n',
      },
      http: {
        example:
          'curl https://api.cadenya.com/v1/api_keys/$ID \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.apiKeys.retrieve',
        example:
          "import Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nconst apiKey = await client.apiKeys.retrieve('id');\n\nconsole.log(apiKey.metadata);",
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/v1/api_keys/{id}',
    httpMethod: 'delete',
    summary: 'Delete an API key',
    description: 'Deletes an API key from the workspace',
    stainlessPath: '(resource) api_keys > (method) delete',
    qualified: 'client.apiKeys.delete',
    params: ['id: string;'],
    markdown:
      "## delete\n\n`client.apiKeys.delete(id: string): void`\n\n**delete** `/v1/api_keys/{id}`\n\nDeletes an API key from the workspace\n\n### Parameters\n\n- `id: string`\n\n### Example\n\n```typescript\nimport Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya();\n\nawait client.apiKeys.delete('id')\n```",
    perLanguage: {
      cli: {
        method: 'api_keys delete',
        example: "cadenya api-keys delete \\\n  --api-key 'My API Key' \\\n  --id id",
      },
      go: {
        method: 'client.APIKeys.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/cadenya/cadenya-go"\n\t"github.com/cadenya/cadenya-go/option"\n)\n\nfunc main() {\n\tclient := cadenya.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\terr := client.APIKeys.Delete(context.TODO(), "id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://api.cadenya.com/v1/api_keys/$ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.apiKeys.delete',
        example:
          "import Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.apiKeys.delete('id');",
      },
    },
  },
  {
    name: 'update',
    endpoint: '/v1/api_keys/{id}',
    httpMethod: 'patch',
    summary: 'Update an API key',
    description: 'Updates an API key in the workspace',
    stainlessPath: '(resource) api_keys > (method) update',
    qualified: 'client.apiKeys.update',
    params: [
      'id: string;',
      'metadata?: { name: string; externalId?: string; labels?: object; };',
      'spec?: { token?: string; description?: string; };',
      'updateMask?: string;',
    ],
    response:
      '{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { token?: string; description?: string; }; info?: { createdBy?: profile; }; }',
    markdown:
      '## update\n\n`client.apiKeys.update(id: string, metadata?: { name: string; externalId?: string; labels?: object; }, spec?: { token?: string; description?: string; }, updateMask?: string): { metadata: resource_metadata; spec: api_key_spec; info?: api_key_info; }`\n\n**patch** `/v1/api_keys/{id}`\n\nUpdates an API key in the workspace\n\n### Parameters\n\n- `id: string`\n\n- `metadata?: { name: string; externalId?: string; labels?: object; }`\n  UpdateResourceMetadata contains the user-provided fields for updating\n a workspace-scoped resource. Read-only fields (id, account_id, workspace_id, profile_id,\n created_at) are excluded since they are set by the server.\n  - `name: string`\n    Human-readable name for the resource (e.g., "Customer Support Agent", "Email Tool")\n  - `externalId?: string`\n    External ID for the resource (e.g., a workflow ID from an external system)\n  - `labels?: object`\n    Arbitrary key-value pairs for categorization and filtering\n Examples: {"environment": "production", "team": "platform", "version": "v2"}\n\n- `spec?: { token?: string; description?: string; }`\n  APIKeySpec contains the API Key-specific fields\n  - `token?: string`\n    The actual token value (only returned on creation and rotation, read-only)\n  - `description?: string`\n    Description of what this API Key is used for\n\n- `updateMask?: string`\n  Fields to update\n\n### Returns\n\n- `{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { token?: string; description?: string; }; info?: { createdBy?: profile; }; }`\n  APIKey represents a workspace-scoped API key.\n Each API key belongs to exactly one workspace, ensuring workspace isolation.\n Authentication is handled via Cadenya-issued JWTs signed with the key\'s own signing secret.\n\n  - `metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `spec: { token?: string; description?: string; }`\n  - `info?: { createdBy?: { metadata: account_resource_metadata; spec: profile_spec; }; }`\n\n### Example\n\n```typescript\nimport Cadenya from \'@cadenya/cadenya\';\n\nconst client = new Cadenya();\n\nconst apiKey = await client.apiKeys.update(\'id\');\n\nconsole.log(apiKey);\n```',
    perLanguage: {
      cli: {
        method: 'api_keys update',
        example: "cadenya api-keys update \\\n  --api-key 'My API Key' \\\n  --id id",
      },
      go: {
        method: 'client.APIKeys.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cadenya/cadenya-go"\n\t"github.com/cadenya/cadenya-go/option"\n)\n\nfunc main() {\n\tclient := cadenya.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tapiKey, err := client.APIKeys.Update(\n\t\tcontext.TODO(),\n\t\t"id",\n\t\tcadenya.APIKeyUpdateParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", apiKey.Metadata)\n}\n',
      },
      http: {
        example:
          "curl https://api.cadenya.com/v1/api_keys/$ID \\\n    -X PATCH \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $CADENYA_API_KEY\" \\\n    -d '{}'",
      },
      typescript: {
        method: 'client.apiKeys.update',
        example:
          "import Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nconst apiKey = await client.apiKeys.update('id');\n\nconsole.log(apiKey.metadata);",
      },
    },
  },
  {
    name: 'rotate',
    endpoint: '/v1/api_keys/{id}/rotate',
    httpMethod: 'put',
    summary: 'Rotate an API key',
    description:
      'Rotates an API Key and returns a new token. All previous API Key tokens in use will be invalidated.',
    stainlessPath: '(resource) api_keys > (method) rotate',
    qualified: 'client.apiKeys.rotate',
    params: ['id: string;'],
    response:
      '{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { token?: string; description?: string; }; info?: { createdBy?: profile; }; }',
    markdown:
      "## rotate\n\n`client.apiKeys.rotate(id: string): { metadata: resource_metadata; spec: api_key_spec; info?: api_key_info; }`\n\n**put** `/v1/api_keys/{id}/rotate`\n\nRotates an API Key and returns a new token. All previous API Key tokens in use will be invalidated.\n\n### Parameters\n\n- `id: string`\n\n### Returns\n\n- `{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { token?: string; description?: string; }; info?: { createdBy?: profile; }; }`\n  APIKey represents a workspace-scoped API key.\n Each API key belongs to exactly one workspace, ensuring workspace isolation.\n Authentication is handled via Cadenya-issued JWTs signed with the key's own signing secret.\n\n  - `metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `spec: { token?: string; description?: string; }`\n  - `info?: { createdBy?: { metadata: account_resource_metadata; spec: profile_spec; }; }`\n\n### Example\n\n```typescript\nimport Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya();\n\nconst apiKey = await client.apiKeys.rotate('id');\n\nconsole.log(apiKey);\n```",
    perLanguage: {
      cli: {
        method: 'api_keys rotate',
        example: "cadenya api-keys rotate \\\n  --api-key 'My API Key' \\\n  --id id",
      },
      go: {
        method: 'client.APIKeys.Rotate',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cadenya/cadenya-go"\n\t"github.com/cadenya/cadenya-go/option"\n)\n\nfunc main() {\n\tclient := cadenya.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tapiKey, err := client.APIKeys.Rotate(context.TODO(), "id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", apiKey.Metadata)\n}\n',
      },
      http: {
        example:
          'curl https://api.cadenya.com/v1/api_keys/$ID/rotate \\\n    -X PUT \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.apiKeys.rotate',
        example:
          "import Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nconst apiKey = await client.apiKeys.rotate('id');\n\nconsole.log(apiKey.metadata);",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v1/workspace_secrets',
    httpMethod: 'get',
    summary: 'List workspace secrets',
    description: 'Lists all workspace secrets in the workspace',
    stainlessPath: '(resource) workspace_secrets > (method) list',
    qualified: 'client.workspaceSecrets.list',
    params: [
      'cursor?: string;',
      'includeInfo?: boolean;',
      'limit?: number;',
      'prefix?: string;',
      'query?: string;',
      'sortOrder?: string;',
    ],
    response:
      '{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { value?: string; }; info?: { createdBy?: profile; lastUsedAt?: string; }; }',
    markdown:
      "## list\n\n`client.workspaceSecrets.list(cursor?: string, includeInfo?: boolean, limit?: number, prefix?: string, query?: string, sortOrder?: string): { metadata: resource_metadata; spec: workspace_secret_spec; info?: workspace_secret_info; }`\n\n**get** `/v1/workspace_secrets`\n\nLists all workspace secrets in the workspace\n\n### Parameters\n\n- `cursor?: string`\n  Pagination cursor from previous response\n\n- `includeInfo?: boolean`\n  When set to true you may use more of your alloted API rate-limit\n\n- `limit?: number`\n  Maximum number of results to return\n\n- `prefix?: string`\n  Filter expression (query param: prefix)\n\n- `query?: string`\n  Free-form search query\n\n- `sortOrder?: string`\n  Sort order for results (asc or desc by creation time)\n\n### Returns\n\n- `{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { value?: string; }; info?: { createdBy?: profile; lastUsedAt?: string; }; }`\n\n  - `metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `spec: { value?: string; }`\n  - `info?: { createdBy?: { metadata: account_resource_metadata; spec: profile_spec; }; lastUsedAt?: string; }`\n\n### Example\n\n```typescript\nimport Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya();\n\n// Automatically fetches more pages as needed.\nfor await (const workspaceSecret of client.workspaceSecrets.list()) {\n  console.log(workspaceSecret);\n}\n```",
    perLanguage: {
      cli: {
        method: 'workspace_secrets list',
        example: "cadenya workspace-secrets list \\\n  --api-key 'My API Key'",
      },
      go: {
        method: 'client.WorkspaceSecrets.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cadenya/cadenya-go"\n\t"github.com/cadenya/cadenya-go/option"\n)\n\nfunc main() {\n\tclient := cadenya.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.WorkspaceSecrets.List(context.TODO(), cadenya.WorkspaceSecretListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://api.cadenya.com/v1/workspace_secrets \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.workspaceSecrets.list',
        example:
          "import Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const workspaceSecret of client.workspaceSecrets.list()) {\n  console.log(workspaceSecret.metadata);\n}",
      },
    },
  },
  {
    name: 'create',
    endpoint: '/v1/workspace_secrets',
    httpMethod: 'post',
    summary: 'Create a new workspace secret',
    description: 'Creates a new workspace secret in the workspace',
    stainlessPath: '(resource) workspace_secrets > (method) create',
    qualified: 'client.workspaceSecrets.create',
    params: [
      'metadata: { name: string; externalId?: string; labels?: object; };',
      'spec: { value?: string; };',
    ],
    response:
      '{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { value?: string; }; info?: { createdBy?: profile; lastUsedAt?: string; }; }',
    markdown:
      '## create\n\n`client.workspaceSecrets.create(metadata: { name: string; externalId?: string; labels?: object; }, spec: { value?: string; }): { metadata: resource_metadata; spec: workspace_secret_spec; info?: workspace_secret_info; }`\n\n**post** `/v1/workspace_secrets`\n\nCreates a new workspace secret in the workspace\n\n### Parameters\n\n- `metadata: { name: string; externalId?: string; labels?: object; }`\n  CreateResourceMetadata contains the user-provided fields for creating\n a workspace-scoped resource. Read-only fields (id, account_id, workspace_id, profile_id,\n created_at) are excluded since they are set by the server.\n  - `name: string`\n    Human-readable name for the resource (e.g., "Customer Support Agent", "Email Tool")\n  - `externalId?: string`\n    External ID for the resource (e.g., a workflow ID from an external system)\n  - `labels?: object`\n    Arbitrary key-value pairs for categorization and filtering\n Examples: {"environment": "production", "team": "platform", "version": "v2"}\n\n- `spec: { value?: string; }`\n  - `value?: string`\n\n### Returns\n\n- `{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { value?: string; }; info?: { createdBy?: profile; lastUsedAt?: string; }; }`\n\n  - `metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `spec: { value?: string; }`\n  - `info?: { createdBy?: { metadata: account_resource_metadata; spec: profile_spec; }; lastUsedAt?: string; }`\n\n### Example\n\n```typescript\nimport Cadenya from \'@cadenya/cadenya\';\n\nconst client = new Cadenya();\n\nconst workspaceSecret = await client.workspaceSecrets.create({\n  metadata: { name: \'name\' },\n  spec: {},\n});\n\nconsole.log(workspaceSecret);\n```',
    perLanguage: {
      cli: {
        method: 'workspace_secrets create',
        example:
          "cadenya workspace-secrets create \\\n  --api-key 'My API Key' \\\n  --metadata '{name: name}' \\\n  --spec '{}'",
      },
      go: {
        method: 'client.WorkspaceSecrets.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cadenya/cadenya-go"\n\t"github.com/cadenya/cadenya-go/option"\n\t"github.com/cadenya/cadenya-go/shared"\n)\n\nfunc main() {\n\tclient := cadenya.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tworkspaceSecret, err := client.WorkspaceSecrets.New(context.TODO(), cadenya.WorkspaceSecretNewParams{\n\t\tMetadata: cadenya.F(shared.CreateResourceMetadataParam{\n\t\t\tName: cadenya.F("name"),\n\t\t}),\n\t\tSpec: cadenya.F(cadenya.WorkspaceSecretSpecParam{}),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", workspaceSecret.Metadata)\n}\n',
      },
      http: {
        example:
          'curl https://api.cadenya.com/v1/workspace_secrets \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $CADENYA_API_KEY" \\\n    -d \'{\n          "metadata": {\n            "name": "name"\n          },\n          "spec": {}\n        }\'',
      },
      typescript: {
        method: 'client.workspaceSecrets.create',
        example:
          "import Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nconst workspaceSecret = await client.workspaceSecrets.create({\n  metadata: { name: 'name' },\n  spec: {},\n});\n\nconsole.log(workspaceSecret.metadata);",
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/v1/workspace_secrets/{id}',
    httpMethod: 'get',
    summary: 'Get a workspace secret by ID',
    description: 'Retrieves a workspace secret by ID from the workspace',
    stainlessPath: '(resource) workspace_secrets > (method) retrieve',
    qualified: 'client.workspaceSecrets.retrieve',
    params: ['id: string;'],
    response:
      '{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { value?: string; }; info?: { createdBy?: profile; lastUsedAt?: string; }; }',
    markdown:
      "## retrieve\n\n`client.workspaceSecrets.retrieve(id: string): { metadata: resource_metadata; spec: workspace_secret_spec; info?: workspace_secret_info; }`\n\n**get** `/v1/workspace_secrets/{id}`\n\nRetrieves a workspace secret by ID from the workspace\n\n### Parameters\n\n- `id: string`\n\n### Returns\n\n- `{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { value?: string; }; info?: { createdBy?: profile; lastUsedAt?: string; }; }`\n\n  - `metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `spec: { value?: string; }`\n  - `info?: { createdBy?: { metadata: account_resource_metadata; spec: profile_spec; }; lastUsedAt?: string; }`\n\n### Example\n\n```typescript\nimport Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya();\n\nconst workspaceSecret = await client.workspaceSecrets.retrieve('id');\n\nconsole.log(workspaceSecret);\n```",
    perLanguage: {
      cli: {
        method: 'workspace_secrets retrieve',
        example: "cadenya workspace-secrets retrieve \\\n  --api-key 'My API Key' \\\n  --id id",
      },
      go: {
        method: 'client.WorkspaceSecrets.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cadenya/cadenya-go"\n\t"github.com/cadenya/cadenya-go/option"\n)\n\nfunc main() {\n\tclient := cadenya.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tworkspaceSecret, err := client.WorkspaceSecrets.Get(context.TODO(), "id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", workspaceSecret.Metadata)\n}\n',
      },
      http: {
        example:
          'curl https://api.cadenya.com/v1/workspace_secrets/$ID \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.workspaceSecrets.retrieve',
        example:
          "import Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nconst workspaceSecret = await client.workspaceSecrets.retrieve('id');\n\nconsole.log(workspaceSecret.metadata);",
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/v1/workspace_secrets/{id}',
    httpMethod: 'delete',
    summary: 'Delete a workspace secret',
    description: 'Deletes a workspace secret from the workspace',
    stainlessPath: '(resource) workspace_secrets > (method) delete',
    qualified: 'client.workspaceSecrets.delete',
    params: ['id: string;'],
    markdown:
      "## delete\n\n`client.workspaceSecrets.delete(id: string): void`\n\n**delete** `/v1/workspace_secrets/{id}`\n\nDeletes a workspace secret from the workspace\n\n### Parameters\n\n- `id: string`\n\n### Example\n\n```typescript\nimport Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya();\n\nawait client.workspaceSecrets.delete('id')\n```",
    perLanguage: {
      cli: {
        method: 'workspace_secrets delete',
        example: "cadenya workspace-secrets delete \\\n  --api-key 'My API Key' \\\n  --id id",
      },
      go: {
        method: 'client.WorkspaceSecrets.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/cadenya/cadenya-go"\n\t"github.com/cadenya/cadenya-go/option"\n)\n\nfunc main() {\n\tclient := cadenya.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\terr := client.WorkspaceSecrets.Delete(context.TODO(), "id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://api.cadenya.com/v1/workspace_secrets/$ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.workspaceSecrets.delete',
        example:
          "import Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.workspaceSecrets.delete('id');",
      },
    },
  },
  {
    name: 'update',
    endpoint: '/v1/workspace_secrets/{id}',
    httpMethod: 'patch',
    summary: 'Update a workspace secret',
    description: 'Updates a workspace secret in the workspace',
    stainlessPath: '(resource) workspace_secrets > (method) update',
    qualified: 'client.workspaceSecrets.update',
    params: [
      'id: string;',
      'metadata?: { name: string; externalId?: string; labels?: object; };',
      'spec?: { value?: string; };',
      'updateMask?: string;',
    ],
    response:
      '{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { value?: string; }; info?: { createdBy?: profile; lastUsedAt?: string; }; }',
    markdown:
      '## update\n\n`client.workspaceSecrets.update(id: string, metadata?: { name: string; externalId?: string; labels?: object; }, spec?: { value?: string; }, updateMask?: string): { metadata: resource_metadata; spec: workspace_secret_spec; info?: workspace_secret_info; }`\n\n**patch** `/v1/workspace_secrets/{id}`\n\nUpdates a workspace secret in the workspace\n\n### Parameters\n\n- `id: string`\n\n- `metadata?: { name: string; externalId?: string; labels?: object; }`\n  UpdateResourceMetadata contains the user-provided fields for updating\n a workspace-scoped resource. Read-only fields (id, account_id, workspace_id, profile_id,\n created_at) are excluded since they are set by the server.\n  - `name: string`\n    Human-readable name for the resource (e.g., "Customer Support Agent", "Email Tool")\n  - `externalId?: string`\n    External ID for the resource (e.g., a workflow ID from an external system)\n  - `labels?: object`\n    Arbitrary key-value pairs for categorization and filtering\n Examples: {"environment": "production", "team": "platform", "version": "v2"}\n\n- `spec?: { value?: string; }`\n  - `value?: string`\n\n- `updateMask?: string`\n  Fields to update\n\n### Returns\n\n- `{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { value?: string; }; info?: { createdBy?: profile; lastUsedAt?: string; }; }`\n\n  - `metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `spec: { value?: string; }`\n  - `info?: { createdBy?: { metadata: account_resource_metadata; spec: profile_spec; }; lastUsedAt?: string; }`\n\n### Example\n\n```typescript\nimport Cadenya from \'@cadenya/cadenya\';\n\nconst client = new Cadenya();\n\nconst workspaceSecret = await client.workspaceSecrets.update(\'id\');\n\nconsole.log(workspaceSecret);\n```',
    perLanguage: {
      cli: {
        method: 'workspace_secrets update',
        example: "cadenya workspace-secrets update \\\n  --api-key 'My API Key' \\\n  --id id",
      },
      go: {
        method: 'client.WorkspaceSecrets.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cadenya/cadenya-go"\n\t"github.com/cadenya/cadenya-go/option"\n)\n\nfunc main() {\n\tclient := cadenya.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tworkspaceSecret, err := client.WorkspaceSecrets.Update(\n\t\tcontext.TODO(),\n\t\t"id",\n\t\tcadenya.WorkspaceSecretUpdateParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", workspaceSecret.Metadata)\n}\n',
      },
      http: {
        example:
          "curl https://api.cadenya.com/v1/workspace_secrets/$ID \\\n    -X PATCH \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $CADENYA_API_KEY\" \\\n    -d '{}'",
      },
      typescript: {
        method: 'client.workspaceSecrets.update',
        example:
          "import Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nconst workspaceSecret = await client.workspaceSecrets.update('id');\n\nconsole.log(workspaceSecret.metadata);",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v1/workspaces',
    httpMethod: 'get',
    summary: 'List workspaces',
    description: 'Lists all workspaces for the current account',
    stainlessPath: '(resource) workspaces > (method) list',
    qualified: 'client.workspaces.list',
    params: ['cursor?: string;', 'includeInfo?: boolean;', 'limit?: number;', 'sortOrder?: string;'],
    response:
      '{ metadata: { id: string; accountId: string; name: string; profileId: string; externalId?: string; labels?: object; }; spec: { description?: string; }; }',
    markdown:
      "## list\n\n`client.workspaces.list(cursor?: string, includeInfo?: boolean, limit?: number, sortOrder?: string): { metadata: account_resource_metadata; spec: workspace_spec; }`\n\n**get** `/v1/workspaces`\n\nLists all workspaces for the current account\n\n### Parameters\n\n- `cursor?: string`\n  Pagination cursor from previous response\n\n- `includeInfo?: boolean`\n  When set to true you may use more of your alloted API rate-limit\n\n- `limit?: number`\n  Maximum number of results to return\n\n- `sortOrder?: string`\n  Sort order for results (asc or desc by creation time)\n\n### Returns\n\n- `{ metadata: { id: string; accountId: string; name: string; profileId: string; externalId?: string; labels?: object; }; spec: { description?: string; }; }`\n\n  - `metadata: { id: string; accountId: string; name: string; profileId: string; externalId?: string; labels?: object; }`\n  - `spec: { description?: string; }`\n\n### Example\n\n```typescript\nimport Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya();\n\n// Automatically fetches more pages as needed.\nfor await (const workspace of client.workspaces.list()) {\n  console.log(workspace);\n}\n```",
    perLanguage: {
      cli: {
        method: 'workspaces list',
        example: "cadenya workspaces list \\\n  --api-key 'My API Key'",
      },
      go: {
        method: 'client.Workspaces.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cadenya/cadenya-go"\n\t"github.com/cadenya/cadenya-go/option"\n)\n\nfunc main() {\n\tclient := cadenya.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Workspaces.List(context.TODO(), cadenya.WorkspaceListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://api.cadenya.com/v1/workspaces \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.workspaces.list',
        example:
          "import Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const workspace of client.workspaces.list()) {\n  console.log(workspace.metadata);\n}",
      },
    },
  },
  {
    name: 'get',
    endpoint: '/v1/workspaces/current',
    httpMethod: 'get',
    summary: 'Get the current workspace',
    description:
      'Retrieves the workspace associated with the current API token. Useful for workspace-scoped tokens to identify which workspace they belong to.',
    stainlessPath: '(resource) workspaces > (method) get',
    qualified: 'client.workspaces.get',
    response:
      '{ metadata: { id: string; accountId: string; name: string; profileId: string; externalId?: string; labels?: object; }; spec: { description?: string; }; }',
    markdown:
      "## get\n\n`client.workspaces.get(): { metadata: account_resource_metadata; spec: workspace_spec; }`\n\n**get** `/v1/workspaces/current`\n\nRetrieves the workspace associated with the current API token. Useful for workspace-scoped tokens to identify which workspace they belong to.\n\n### Returns\n\n- `{ metadata: { id: string; accountId: string; name: string; profileId: string; externalId?: string; labels?: object; }; spec: { description?: string; }; }`\n\n  - `metadata: { id: string; accountId: string; name: string; profileId: string; externalId?: string; labels?: object; }`\n  - `spec: { description?: string; }`\n\n### Example\n\n```typescript\nimport Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya();\n\nconst workspace = await client.workspaces.get();\n\nconsole.log(workspace);\n```",
    perLanguage: {
      cli: {
        method: 'workspaces get',
        example: "cadenya workspaces get \\\n  --api-key 'My API Key'",
      },
      go: {
        method: 'client.Workspaces.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cadenya/cadenya-go"\n\t"github.com/cadenya/cadenya-go/option"\n)\n\nfunc main() {\n\tclient := cadenya.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tworkspace, err := client.Workspaces.Get(context.TODO())\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", workspace.Metadata)\n}\n',
      },
      http: {
        example:
          'curl https://api.cadenya.com/v1/workspaces/current \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.workspaces.get',
        example:
          "import Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nconst workspace = await client.workspaces.get();\n\nconsole.log(workspace.metadata);",
      },
    },
  },
  {
    name: 'unwrap',
    endpoint: '',
    httpMethod: '',
    summary: '',
    description: '',
    stainlessPath: '(resource) webhooks > (method) unwrap',
    qualified: 'client.webhooks.unwrap',
    perLanguage: {
      cli: {
        example: "cadenya webhooks unwrap \\\n  --api-key 'My API Key'",
      },
      go: {
        method: 'client.Webhooks.Unwrap',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/cadenya/cadenya-go"\n\t"github.com/cadenya/cadenya-go/option"\n)\n\nfunc main() {\n\tclient := cadenya.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\terr := client.Webhooks.Unwrap(context.TODO())\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      typescript: {
        method: 'client.webhooks.unwrap',
        example:
          "import Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.webhooks.unwrap();",
      },
    },
  },
  {
    name: 'unsafe_unwrap',
    endpoint: '',
    httpMethod: '',
    summary: '',
    description: '',
    stainlessPath: '(resource) webhooks > (method) unsafe_unwrap',
    qualified: 'client.webhooks.unsafeUnwrap',
    perLanguage: {
      cli: {
        example: "cadenya webhooks unsafe-unwrap \\\n  --api-key 'My API Key'",
      },
      go: {
        method: 'client.Webhooks.UnsafeUnwrap',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/cadenya/cadenya-go"\n\t"github.com/cadenya/cadenya-go/option"\n)\n\nfunc main() {\n\tclient := cadenya.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\terr := client.Webhooks.UnsafeUnwrap(context.TODO())\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      typescript: {
        method: 'client.webhooks.unsafeUnwrap',
        example:
          "import Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.webhooks.unsafeUnwrap();",
      },
    },
  },
];

const EMBEDDED_READMES: { language: string; content: string }[] = [
  {
    language: 'cli',
    content:
      "# Cadenya CLI\n\nThe official CLI for the [Cadenya REST API](https://docs.cadenya.com).\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n<!-- x-release-please-start-version -->\n\n## Installation\n\n### Installing with Go\n\nTo test or install the CLI locally, you need [Go](https://go.dev/doc/install) version 1.22 or later installed.\n\n~~~sh\ngo install 'github.com/cadenya/cadenya-cli/cmd/cadenya@latest'\n~~~\n\nOnce you have run `go install`, the binary is placed in your Go bin directory:\n\n- **Default location**: `$HOME/go/bin` (or `$GOPATH/bin` if GOPATH is set)\n- **Check your path**: Run `go env GOPATH` to see the base directory\n\nIf commands aren't found after installation, add the Go bin directory to your PATH:\n\n~~~sh\n# Add to your shell profile (.zshrc, .bashrc, etc.)\nexport PATH=\"$PATH:$(go env GOPATH)/bin\"\n~~~\n\n<!-- x-release-please-end -->\n\n### Running Locally\n\nAfter cloning the git repository for this project, you can use the\n`scripts/run` script to run the tool locally:\n\n~~~sh\n./scripts/run args...\n~~~\n\n## Usage\n\nThe CLI follows a resource-based command structure:\n\n~~~sh\ncadenya [resource] <command> [flags...]\n~~~\n\n~~~sh\ncadenya account retrieve \\\n  --api-key 'My API Key'\n~~~\n\nFor details about specific commands, use the `--help` flag.\n\n### Environment variables\n\n| Environment variable  | Required | Default value |\n| --------------------- | -------- | ------------- |\n| `CADENYA_API_KEY`     | yes      |               |\n| `CADENYA_WEBHOOK_KEY` | no       | `null`        |\n\n### Global flags\n\n- `--api-key` (can also be set with `CADENYA_API_KEY` env var)\n- `--webhook-key` (can also be set with `CADENYA_WEBHOOK_KEY` env var)\n- `--help` - Show command line usage\n- `--debug` - Enable debug logging (includes HTTP request/response details)\n- `--version`, `-v` - Show the CLI version\n- `--base-url` - Use a custom API backend URL\n- `--format` - Change the output format (`auto`, `explore`, `json`, `jsonl`, `pretty`, `raw`, `yaml`)\n- `--format-error` - Change the output format for errors (`auto`, `explore`, `json`, `jsonl`, `pretty`, `raw`, `yaml`)\n- `--transform` - Transform the data output using [GJSON syntax](https://github.com/tidwall/gjson/blob/master/SYNTAX.md)\n- `--transform-error` - Transform the error output using [GJSON syntax](https://github.com/tidwall/gjson/blob/master/SYNTAX.md)\n\n### Passing files as arguments\n\nTo pass files to your API, you can use the `@myfile.ext` syntax:\n\n~~~bash\ncadenya <command> --arg @abe.jpg\n~~~\n\nFiles can also be passed inside JSON or YAML blobs:\n\n~~~bash\ncadenya <command> --arg '{image: \"@abe.jpg\"}'\n# Equivalent:\ncadenya <command> <<YAML\narg:\n  image: \"@abe.jpg\"\nYAML\n~~~\n\nIf you need to pass a string literal that begins with an `@` sign, you can\nescape the `@` sign to avoid accidentally passing a file.\n\n~~~bash\ncadenya <command> --username '\\@abe'\n~~~\n\n#### Explicit encoding\n\nFor JSON endpoints, the CLI tool does filetype sniffing to determine whether the\nfile contents should be sent as a string literal (for plain text files) or as a\nbase64-encoded string literal (for binary files). If you need to explicitly send\nthe file as either plain text or base64-encoded data, you can use\n`@file://myfile.txt` (for string encoding) or `@data://myfile.dat` (for\nbase64-encoding). Note that absolute paths will begin with `@file://` or\n`@data://`, followed by a third `/` (for example, `@file:///tmp/file.txt`).\n\n~~~bash\ncadenya <command> --arg @data://file.txt\n~~~\n\n## Linking different Go SDK versions\n\nYou can link the CLI against a different version of the Cadenya Go SDK\nfor development purposes using the `./scripts/link` script.\n\nTo link to a specific version from a repository (version can be a branch,\ngit tag, or commit hash):\n\n~~~bash\n./scripts/link github.com/org/repo@version\n~~~\n\nTo link to a local copy of the SDK:\n\n~~~bash\n./scripts/link ../path/to/cadenya-go\n~~~\n\nIf you run the link script without any arguments, it will default to `../cadenya-go`.\n",
  },
  {
    language: 'go',
    content:
      '# Cadenya Go API Library\n\n<a href="https://pkg.go.dev/github.com/cadenya/cadenya-go"><img src="https://pkg.go.dev/badge/github.com/cadenya/cadenya-go.svg" alt="Go Reference"></a>\n\nThe Cadenya Go library provides convenient access to the [Cadenya REST API](https://docs.cadenya.com)\nfrom applications written in Go.\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Cadenya MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=cadenya-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsImNhZGVueWEtbWNwIl0sImVudiI6eyJDQURFTllBX0FQSV9LRVkiOiJNeSBBUEkgS2V5IiwiQ0FERU5ZQV9XRUJIT09LX0tFWSI6Ik15IFdlYmhvb2sgS2V5In19)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22cadenya-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22cadenya-mcp%22%5D%2C%22env%22%3A%7B%22CADENYA_API_KEY%22%3A%22My%20API%20Key%22%2C%22CADENYA_WEBHOOK_KEY%22%3A%22My%20Webhook%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Installation\n\n<!-- x-release-please-start-version -->\n\n```go\nimport (\n\t"github.com/cadenya/cadenya-go" // imported as SDK_PackageName\n)\n```\n\n<!-- x-release-please-end -->\n\nOr to pin the version:\n\n<!-- x-release-please-start-version -->\n\n```sh\ngo get -u \'github.com/cadenya/cadenya-go@v0.0.1\'\n```\n\n<!-- x-release-please-end -->\n\n## Requirements\n\nThis library requires Go 1.22+.\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n```go\npackage main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/cadenya/cadenya-go"\n\t"github.com/cadenya/cadenya-go/option"\n)\n\nfunc main() {\n\tclient := cadenya.NewClient(\n\t\toption.WithAPIKey("My API Key"), // defaults to os.LookupEnv("CADENYA_API_KEY")\n\t)\n\taccount, err := client.Account.Get(context.TODO())\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", account.Info)\n}\n\n```\n\n### Request fields\n\nAll request parameters are wrapped in a generic `Field` type,\nwhich we use to distinguish zero values from null or omitted fields.\n\nThis prevents accidentally sending a zero value if you forget a required parameter,\nand enables explicitly sending `null`, `false`, `\'\'`, or `0` on optional parameters.\nAny field not specified is not sent.\n\nTo construct fields with values, use the helpers `String()`, `Int()`, `Float()`, or most commonly, the generic `F[T]()`.\nTo send a null, use `Null[T]()`, and to send a nonconforming value, use `Raw[T](any)`. For example:\n\n```go\nparams := FooParams{\n\tName: SDK_PackageName.F("hello"),\n\n\t// Explicitly send `"description": null`\n\tDescription: SDK_PackageName.Null[string](),\n\n\tPoint: SDK_PackageName.F(SDK_PackageName.Point{\n\t\tX: SDK_PackageName.Int(0),\n\t\tY: SDK_PackageName.Int(1),\n\n\t\t// In cases where the API specifies a given type,\n\t\t// but you want to send something else, use `Raw`:\n\t\tZ: SDK_PackageName.Raw[int64](0.01), // sends a float\n\t}),\n}\n```\n\n### Response objects\n\nAll fields in response structs are value types (not pointers or wrappers).\n\nIf a given field is `null`, not present, or invalid, the corresponding field\nwill simply be its zero value.\n\nAll response structs also include a special `JSON` field, containing more detailed\ninformation about each property, which you can use like so:\n\n```go\nif res.Name == "" {\n\t// true if `"name"` is either not present or explicitly null\n\tres.JSON.Name.IsNull()\n\n\t// true if the `"name"` key was not present in the response JSON at all\n\tres.JSON.Name.IsMissing()\n\n\t// When the API returns data that cannot be coerced to the expected type:\n\tif res.JSON.Name.IsInvalid() {\n\t\traw := res.JSON.Name.Raw()\n\n\t\tlegacyName := struct{\n\t\t\tFirst string `json:"first"`\n\t\t\tLast  string `json:"last"`\n\t\t}{}\n\t\tjson.Unmarshal([]byte(raw), &legacyName)\n\t\tname = legacyName.First + " " + legacyName.Last\n\t}\n}\n```\n\nThese `.JSON` structs also include an `Extras` map containing\nany properties in the json response that were not specified\nin the struct. This can be useful for API features not yet\npresent in the SDK.\n\n```go\nbody := res.JSON.ExtraFields["my_unexpected_field"].Raw()\n```\n\n### RequestOptions\n\nThis library uses the functional options pattern. Functions defined in the\n`SDK_PackageOptionName` package return a `RequestOption`, which is a closure that mutates a\n`RequestConfig`. These options can be supplied to the client or at individual\nrequests. For example:\n\n```go\nclient := SDK_PackageName.SDK_ClientInitializerName(\n\t// Adds a header to every request made by the client\n\tSDK_PackageOptionName.WithHeader("X-Some-Header", "custom_header_info"),\n)\n\nclient.Account.Get(context.TODO(), ...,\n\t// Override the header\n\tSDK_PackageOptionName.WithHeader("X-Some-Header", "some_other_custom_header_info"),\n\t// Add an undocumented field to the request body, using sjson syntax\n\tSDK_PackageOptionName.WithJSONSet("some.json.path", map[string]string{"my": "object"}),\n)\n```\n\nSee the [full list of request options](https://pkg.go.dev/github.com/cadenya/cadenya-go/SDK_PackageOptionName).\n\n### Pagination\n\nThis library provides some conveniences for working with paginated list endpoints.\n\nYou can use `.ListAutoPaging()` methods to iterate through items across all pages:\n\n```go\niter := client.Agents.ListAutoPaging(context.TODO(), cadenya.AgentListParams{})\n// Automatically fetches more pages as needed.\nfor iter.Next() {\n\tagent := iter.Current()\n\tfmt.Printf("%+v\\n", agent)\n}\nif err := iter.Err(); err != nil {\n\tpanic(err.Error())\n}\n```\n\nOr you can use simple `.List()` methods to fetch a single page and receive a standard response object\nwith additional helper methods like `.GetNextPage()`, e.g.:\n\n```go\npage, err := client.Agents.List(context.TODO(), cadenya.AgentListParams{})\nfor page != nil {\n\tfor _, agent := range page.Items {\n\t\tfmt.Printf("%+v\\n", agent)\n\t}\n\tpage, err = page.GetNextPage()\n}\nif err != nil {\n\tpanic(err.Error())\n}\n```\n\n### Errors\n\nWhen the API returns a non-success status code, we return an error with type\n`*SDK_PackageName.Error`. This contains the `StatusCode`, `*http.Request`, and\n`*http.Response` values of the request, as well as the JSON of the error body\n(much like other response objects in the SDK).\n\nTo handle errors, we recommend that you use the `errors.As` pattern:\n\n```go\n_, err := client.Account.Get(context.TODO())\nif err != nil {\n\tvar apierr *cadenya.Error\n\tif errors.As(err, &apierr) {\n\t\tprintln(string(apierr.DumpRequest(true)))  // Prints the serialized HTTP request\n\t\tprintln(string(apierr.DumpResponse(true))) // Prints the serialized HTTP response\n\t}\n\tpanic(err.Error()) // GET "/v1/account": 400 Bad Request { ... }\n}\n```\n\nWhen other errors occur, they are returned unwrapped; for example,\nif HTTP transport fails, you might receive `*url.Error` wrapping `*net.OpError`.\n\n### Timeouts\n\nRequests do not time out by default; use context to configure a timeout for a request lifecycle.\n\nNote that if a request is [retried](#retries), the context timeout does not start over.\nTo set a per-retry timeout, use `SDK_PackageOptionName.WithRequestTimeout()`.\n\n```go\n// This sets the timeout for the request, including all the retries.\nctx, cancel := context.WithTimeout(context.Background(), 5*time.Minute)\ndefer cancel()\nclient.Account.Get(\n\tctx,\n\t// This sets the per-retry timeout\n\toption.WithRequestTimeout(20*time.Second),\n)\n```\n\n### File uploads\n\nRequest parameters that correspond to file uploads in multipart requests are typed as\n`param.Field[io.Reader]`. The contents of the `io.Reader` will by default be sent as a multipart form\npart with the file name of "anonymous_file" and content-type of "application/octet-stream".\n\nThe file name and content-type can be customized by implementing `Name() string` or `ContentType()\nstring` on the run-time type of `io.Reader`. Note that `os.File` implements `Name() string`, so a\nfile returned by `os.Open` will be sent with the file name on disk.\n\nWe also provide a helper `SDK_PackageName.FileParam(reader io.Reader, filename string, contentType string)`\nwhich can be used to wrap any `io.Reader` with the appropriate file name and content type.\n\n\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\nWe retry by default all connection errors, 408 Request Timeout, 409 Conflict, 429 Rate Limit,\nand >=500 Internal errors.\n\nYou can use the `WithMaxRetries` option to configure or disable this:\n\n```go\n// Configure the default for all requests:\nclient := cadenya.NewClient(\n\toption.WithMaxRetries(0), // default is 2\n)\n\n// Override per-request:\nclient.Account.Get(context.TODO(), option.WithMaxRetries(5))\n```\n\n\n### Accessing raw response data (e.g. response headers)\n\nYou can access the raw HTTP response data by using the `option.WithResponseInto()` request option. This is useful when\nyou need to examine response headers, status codes, or other details.\n\n```go\n// Create a variable to store the HTTP response\nvar response *http.Response\naccount, err := client.Account.Get(context.TODO(), option.WithResponseInto(&response))\nif err != nil {\n\t// handle error\n}\nfmt.Printf("%+v\\n", account)\n\nfmt.Printf("Status Code: %d\\n", response.StatusCode)\nfmt.Printf("Headers: %+#v\\n", response.Header)\n```\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API. If you need to access undocumented\nendpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can use `client.Get`, `client.Post`, and other HTTP verbs.\n`RequestOptions` on the client, such as retries, will be respected when making these requests.\n\n```go\nvar (\n    // params can be an io.Reader, a []byte, an encoding/json serializable object,\n    // or a "…Params" struct defined in this library.\n    params map[string]interface{}\n\n    // result can be an []byte, *http.Response, a encoding/json deserializable object,\n    // or a model defined in this library.\n    result *http.Response\n)\nerr := client.Post(context.Background(), "/unspecified", params, &result)\nif err != nil {\n    …\n}\n```\n\n#### Undocumented request params\n\nTo make requests using undocumented parameters, you may use either the `SDK_PackageOptionName.WithQuerySet()`\nor the `SDK_PackageOptionName.WithJSONSet()` methods.\n\n```go\nparams := FooNewParams{\n    ID:   SDK_PackageName.F("id_xxxx"),\n    Data: SDK_PackageName.F(FooNewParamsData{\n        FirstName: SDK_PackageName.F("John"),\n    }),\n}\nclient.Foo.New(context.Background(), params, SDK_PackageOptionName.WithJSONSet("data.last_name", "Doe"))\n```\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you may either access the raw JSON of the response as a string\nwith `result.JSON.RawJSON()`, or get the raw JSON of a particular field on the result with\n`result.JSON.Foo.Raw()`.\n\nAny fields that are not present on the response struct will be saved and can be accessed by `result.JSON.ExtraFields()` which returns the extra fields as a `map[string]Field`.\n\n### Middleware\n\nWe provide `SDK_PackageOptionName.WithMiddleware` which applies the given\nmiddleware to requests.\n\n```go\nfunc Logger(req *http.Request, next SDK_PackageOptionName.MiddlewareNext) (res *http.Response, err error) {\n\t// Before the request\n\tstart := time.Now()\n\tLogReq(req)\n\n\t// Forward the request to the next handler\n\tres, err = next(req)\n\n\t// Handle stuff after the request\n\tend := time.Now()\n\tLogRes(res, err, start - end)\n\n    return res, err\n}\n\nclient := SDK_PackageName.SDK_ClientInitializerName(\n\tSDK_PackageOptionName.WithMiddleware(Logger),\n)\n```\n\nWhen multiple middlewares are provided as variadic arguments, the middlewares\nare applied left to right. If `SDK_PackageOptionName.WithMiddleware` is given\nmultiple times, for example first in the client then the method, the\nmiddleware in the client will run first and the middleware given in the method\nwill run next.\n\nYou may also replace the default `http.Client` with\n`SDK_PackageOptionName.WithHTTPClient(client)`. Only one http client is\naccepted (this overwrites any previous client) and receives requests after any\nmiddleware has been applied.\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n2. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/cadenya/cadenya-go/issues) with questions, bugs, or suggestions.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n',
  },
  {
    language: 'typescript',
    content:
      "# Cadenya TypeScript API Library\n\n[![NPM version](https://img.shields.io/npm/v/@cadenya/cadenya.svg?label=npm%20(stable))](https://npmjs.org/package/@cadenya/cadenya) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/@cadenya/cadenya)\n\nThis library provides convenient access to the Cadenya REST API from server-side TypeScript or JavaScript.\n\n\n\nThe REST API documentation can be found on [docs.cadenya.com](https://docs.cadenya.com). The full API of this library can be found in [api.md](api.md).\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Cadenya MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=cadenya-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsImNhZGVueWEtbWNwIl0sImVudiI6eyJDQURFTllBX0FQSV9LRVkiOiJNeSBBUEkgS2V5IiwiQ0FERU5ZQV9XRUJIT09LX0tFWSI6Ik15IFdlYmhvb2sgS2V5In19)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22cadenya-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22cadenya-mcp%22%5D%2C%22env%22%3A%7B%22CADENYA_API_KEY%22%3A%22My%20API%20Key%22%2C%22CADENYA_WEBHOOK_KEY%22%3A%22My%20Webhook%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Installation\n\n```sh\nnpm install @cadenya/cadenya\n```\n\n\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n<!-- prettier-ignore -->\n```js\nimport Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nconst account = await client.account.retrieve();\n\nconsole.log(account.info);\n```\n\n\n\n### Request & Response types\n\nThis library includes TypeScript definitions for all request params and response fields. You may import and use them like so:\n\n<!-- prettier-ignore -->\n```ts\nimport Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nconst account: Cadenya.Account = await client.account.retrieve();\n```\n\nDocumentation for each method, request param, and response field are available in docstrings and will appear on hover in most modern editors.\n\n\n\n\n\n## Handling errors\n\nWhen the library is unable to connect to the API,\nor if the API returns a non-success status code (i.e., 4xx or 5xx response),\na subclass of `APIError` will be thrown:\n\n<!-- prettier-ignore -->\n```ts\nconst account = await client.account.retrieve().catch(async (err) => {\n  if (err instanceof Cadenya.APIError) {\n    console.log(err.status); // 400\n    console.log(err.name); // BadRequestError\n    console.log(err.headers); // {server: 'nginx', ...}\n  } else {\n    throw err;\n  }\n});\n```\n\nError codes are as follows:\n\n| Status Code | Error Type                 |\n| ----------- | -------------------------- |\n| 400         | `BadRequestError`          |\n| 401         | `AuthenticationError`      |\n| 403         | `PermissionDeniedError`    |\n| 404         | `NotFoundError`            |\n| 422         | `UnprocessableEntityError` |\n| 429         | `RateLimitError`           |\n| >=500       | `InternalServerError`      |\n| N/A         | `APIConnectionError`       |\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,\n429 Rate Limit, and >=500 Internal errors will all be retried by default.\n\nYou can use the `maxRetries` option to configure or disable this:\n\n<!-- prettier-ignore -->\n```js\n// Configure the default for all requests:\nconst client = new Cadenya({\n  maxRetries: 0, // default is 2\n});\n\n// Or, configure per-request:\nawait client.account.retrieve({\n  maxRetries: 5,\n});\n```\n\n### Timeouts\n\nRequests time out after 1 minute by default. You can configure this with a `timeout` option:\n\n<!-- prettier-ignore -->\n```ts\n// Configure the default for all requests:\nconst client = new Cadenya({\n  timeout: 20 * 1000, // 20 seconds (default is 1 minute)\n});\n\n// Override per-request:\nawait client.account.retrieve({\n  timeout: 5 * 1000,\n});\n```\n\nOn timeout, an `APIConnectionTimeoutError` is thrown.\n\nNote that requests which time out will be [retried twice by default](#retries).\n\n## Auto-pagination\n\nList methods in the Cadenya API are paginated.\nYou can use the `for await … of` syntax to iterate through items across all pages:\n\n```ts\nasync function fetchAllAgents(params) {\n  const allAgents = [];\n  // Automatically fetches more pages as needed.\n  for await (const agent of client.agents.list()) {\n    allAgents.push(agent);\n  }\n  return allAgents;\n}\n```\n\nAlternatively, you can request a single page at a time:\n\n```ts\nlet page = await client.agents.list();\nfor (const agent of page.items) {\n  console.log(agent);\n}\n\n// Convenience methods are provided for manually paginating:\nwhile (page.hasNextPage()) {\n  page = await page.getNextPage();\n  // ...\n}\n```\n\n\n\n## Advanced Usage\n\n### Accessing raw Response data (e.g., headers)\n\nThe \"raw\" `Response` returned by `fetch()` can be accessed through the `.asResponse()` method on the `APIPromise` type that all methods return.\nThis method returns as soon as the headers for a successful response are received and does not consume the response body, so you are free to write custom parsing or streaming logic.\n\nYou can also use the `.withResponse()` method to get the raw `Response` along with the parsed data.\nUnlike `.asResponse()` this method consumes the body, returning once it is parsed.\n\n<!-- prettier-ignore -->\n```ts\nconst client = new Cadenya();\n\nconst response = await client.account.retrieve().asResponse();\nconsole.log(response.headers.get('X-My-Header'));\nconsole.log(response.statusText); // access the underlying Response object\n\nconst { data: account, response: raw } = await client.account.retrieve().withResponse();\nconsole.log(raw.headers.get('X-My-Header'));\nconsole.log(account.info);\n```\n\n### Logging\n\n> [!IMPORTANT]\n> All log messages are intended for debugging only. The format and content of log messages\n> may change between releases.\n\n#### Log levels\n\nThe log level can be configured in two ways:\n\n1. Via the `CADENYA_LOG` environment variable\n2. Using the `logLevel` client option (overrides the environment variable if set)\n\n```ts\nimport Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  logLevel: 'debug', // Show all log messages\n});\n```\n\nAvailable log levels, from most to least verbose:\n\n- `'debug'` - Show debug messages, info, warnings, and errors\n- `'info'` - Show info messages, warnings, and errors\n- `'warn'` - Show warnings and errors (default)\n- `'error'` - Show only errors\n- `'off'` - Disable all logging\n\nAt the `'debug'` level, all HTTP requests and responses are logged, including headers and bodies.\nSome authentication-related headers are redacted, but sensitive data in request and response bodies\nmay still be visible.\n\n#### Custom logger\n\nBy default, this library logs to `globalThis.console`. You can also provide a custom logger.\nMost logging libraries are supported, including [pino](https://www.npmjs.com/package/pino), [winston](https://www.npmjs.com/package/winston), [bunyan](https://www.npmjs.com/package/bunyan), [consola](https://www.npmjs.com/package/consola), [signale](https://www.npmjs.com/package/signale), and [@std/log](https://jsr.io/@std/log). If your logger doesn't work, please open an issue.\n\nWhen providing a custom logger, the `logLevel` option still controls which messages are emitted, messages\nbelow the configured level will not be sent to your logger.\n\n```ts\nimport Cadenya from '@cadenya/cadenya';\nimport pino from 'pino';\n\nconst logger = pino();\n\nconst client = new Cadenya({\n  logger: logger.child({ name: 'Cadenya' }),\n  logLevel: 'debug', // Send all messages to pino, allowing it to filter\n});\n```\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API. If you need to access undocumented\nendpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can use `client.get`, `client.post`, and other HTTP verbs.\nOptions on the client, such as retries, will be respected when making these requests.\n\n```ts\nawait client.post('/some/path', {\n  body: { some_prop: 'foo' },\n  query: { some_query_arg: 'bar' },\n});\n```\n\n#### Undocumented request params\n\nTo make requests using undocumented parameters, you may use `// @ts-expect-error` on the undocumented\nparameter. This library doesn't validate at runtime that the request matches the type, so any extra values you\nsend will be sent as-is.\n\n```ts\nclient.account.retrieve({\n  // ...\n  // @ts-expect-error baz is not yet public\n  baz: 'undocumented option',\n});\n```\n\nFor requests with the `GET` verb, any extra params will be in the query, all other requests will send the\nextra param in the body.\n\nIf you want to explicitly send an extra argument, you can do so with the `query`, `body`, and `headers` request\noptions.\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you may access the response object with `// @ts-expect-error` on\nthe response object, or cast the response object to the requisite type. Like the request params, we do not\nvalidate or strip extra properties from the response from the API.\n\n### Customizing the fetch client\n\nBy default, this library expects a global `fetch` function is defined.\n\nIf you want to use a different `fetch` function, you can either polyfill the global:\n\n```ts\nimport fetch from 'my-fetch';\n\nglobalThis.fetch = fetch;\n```\n\nOr pass it to the client:\n\n```ts\nimport Cadenya from '@cadenya/cadenya';\nimport fetch from 'my-fetch';\n\nconst client = new Cadenya({ fetch });\n```\n\n### Fetch options\n\nIf you want to set custom `fetch` options without overriding the `fetch` function, you can provide a `fetchOptions` object when instantiating the client or making a request. (Request-specific options override client options.)\n\n```ts\nimport Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  fetchOptions: {\n    // `RequestInit` options\n  },\n});\n```\n\n#### Configuring proxies\n\nTo modify proxy behavior, you can provide custom `fetchOptions` that add runtime-specific proxy\noptions to requests:\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/node.svg\" align=\"top\" width=\"18\" height=\"21\"> **Node** <sup>[[docs](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md#example---proxyagent-with-fetch)]</sup>\n\n```ts\nimport Cadenya from '@cadenya/cadenya';\nimport * as undici from 'undici';\n\nconst proxyAgent = new undici.ProxyAgent('http://localhost:8888');\nconst client = new Cadenya({\n  fetchOptions: {\n    dispatcher: proxyAgent,\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/bun.svg\" align=\"top\" width=\"18\" height=\"21\"> **Bun** <sup>[[docs](https://bun.sh/guides/http/proxy)]</sup>\n\n```ts\nimport Cadenya from '@cadenya/cadenya';\n\nconst client = new Cadenya({\n  fetchOptions: {\n    proxy: 'http://localhost:8888',\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/deno.svg\" align=\"top\" width=\"18\" height=\"21\"> **Deno** <sup>[[docs](https://docs.deno.com/api/deno/~/Deno.createHttpClient)]</sup>\n\n```ts\nimport Cadenya from 'npm:@cadenya/cadenya';\n\nconst httpClient = Deno.createHttpClient({ proxy: { url: 'http://localhost:8888' } });\nconst client = new Cadenya({\n  fetchOptions: {\n    client: httpClient,\n  },\n});\n```\n\n## Frequently Asked Questions\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes that only affect static types, without breaking runtime behavior.\n2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n3. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/cadenya/cadenya-typescript/issues) with questions, bugs, or suggestions.\n\n## Requirements\n\nTypeScript >= 4.9 is supported.\n\nThe following runtimes are supported:\n\n- Web browsers (Up-to-date Chrome, Firefox, Safari, Edge, and more)\n- Node.js 20 LTS or later ([non-EOL](https://endoflife.date/nodejs)) versions.\n- Deno v1.28.0 or higher.\n- Bun 1.0 or later.\n- Cloudflare Workers.\n- Vercel Edge Runtime.\n- Jest 28 or greater with the `\"node\"` environment (`\"jsdom\"` is not supported at this time).\n- Nitro v2.6 or greater.\n\nNote that React Native is not supported at this time.\n\nIf you are interested in other runtime environments, please open or upvote an issue on GitHub.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n",
  },
];

const INDEX_OPTIONS = {
  fields: [
    'name',
    'endpoint',
    'summary',
    'description',
    'qualified',
    'stainlessPath',
    'content',
    'sectionContext',
  ],
  storeFields: ['kind', '_original'],
  searchOptions: {
    prefix: true,
    fuzzy: 0.1,
    boost: {
      name: 5,
      stainlessPath: 3,
      endpoint: 3,
      qualified: 3,
      summary: 2,
      content: 1,
      description: 1,
    } as Record<string, number>,
  },
};

/**
 * Self-contained local search engine backed by MiniSearch.
 * Method data is embedded at SDK build time; prose documents
 * can be loaded from an optional docs directory at runtime.
 */
export class LocalDocsSearch {
  private methodIndex: MiniSearch<MiniSearchDocument>;
  private proseIndex: MiniSearch<MiniSearchDocument>;

  private constructor() {
    this.methodIndex = new MiniSearch<MiniSearchDocument>(INDEX_OPTIONS);
    this.proseIndex = new MiniSearch<MiniSearchDocument>(INDEX_OPTIONS);
  }

  static async create(opts?: { docsDir?: string }): Promise<LocalDocsSearch> {
    const instance = new LocalDocsSearch();
    instance.indexMethods(EMBEDDED_METHODS);
    for (const readme of EMBEDDED_READMES) {
      instance.indexProse(readme.content, `readme:${readme.language}`);
    }
    if (opts?.docsDir) {
      await instance.loadDocsDirectory(opts.docsDir);
    }
    return instance;
  }

  search(props: {
    query: string;
    language?: string;
    detail?: string;
    maxResults?: number;
    maxLength?: number;
  }): SearchResult {
    const { query, language = 'typescript', detail = 'default', maxResults = 5, maxLength = 100_000 } = props;

    const useMarkdown = detail === 'verbose' || detail === 'high';

    // Search both indices and merge results by score.
    // Filter prose hits so language-tagged content (READMEs and docs with
    // frontmatter) only matches the requested language.
    const methodHits = this.methodIndex
      .search(query)
      .map((hit) => ({ ...hit, _kind: 'http_method' as const }));
    const proseHits = this.proseIndex
      .search(query)
      .filter((hit) => {
        const source = ((hit as Record<string, unknown>)['_original'] as ProseChunk | undefined)?.source;
        if (!source) return true;
        // Check for language-tagged sources: "readme:<lang>" or "lang:<lang>:<filename>"
        let taggedLang: string | undefined;
        if (source.startsWith('readme:')) taggedLang = source.slice('readme:'.length);
        else if (source.startsWith('lang:')) taggedLang = source.split(':')[1];
        if (!taggedLang) return true;
        return taggedLang === language || (language === 'javascript' && taggedLang === 'typescript');
      })
      .map((hit) => ({ ...hit, _kind: 'prose' as const }));
    const merged = [...methodHits, ...proseHits].sort((a, b) => b.score - a.score);
    const top = merged.slice(0, maxResults);

    const fullResults: (string | Record<string, unknown>)[] = [];

    for (const hit of top) {
      const original = (hit as Record<string, unknown>)['_original'];
      if (hit._kind === 'http_method') {
        const m = original as MethodEntry;
        if (useMarkdown && m.markdown) {
          fullResults.push(m.markdown);
        } else {
          // Use per-language data when available, falling back to the
          // top-level fields (which are TypeScript-specific in the
          // legacy codepath).
          const langData = m.perLanguage?.[language];
          fullResults.push({
            method: langData?.method ?? m.qualified,
            summary: m.summary,
            description: m.description,
            endpoint: `${m.httpMethod.toUpperCase()} ${m.endpoint}`,
            ...(langData?.example ? { example: langData.example } : {}),
            ...(m.params ? { params: m.params } : {}),
            ...(m.response ? { response: m.response } : {}),
          });
        }
      } else {
        const c = original as ProseChunk;
        fullResults.push({
          content: c.content,
          ...(c.source ? { source: c.source } : {}),
        });
      }
    }

    let totalLength = 0;
    const results: (string | Record<string, unknown>)[] = [];
    for (const result of fullResults) {
      const len = typeof result === 'string' ? result.length : JSON.stringify(result).length;
      totalLength += len;
      if (totalLength > maxLength) break;
      results.push(result);
    }

    if (results.length < fullResults.length) {
      results.unshift(`Truncated; showing ${results.length} of ${fullResults.length} results.`);
    }

    return { results };
  }

  private indexMethods(methods: MethodEntry[]): void {
    const docs: MiniSearchDocument[] = methods.map((m, i) => ({
      id: `method-${i}`,
      kind: 'http_method' as const,
      name: m.name,
      endpoint: m.endpoint,
      summary: m.summary,
      description: m.description,
      qualified: m.qualified,
      stainlessPath: m.stainlessPath,
      _original: m as unknown as Record<string, unknown>,
    }));
    if (docs.length > 0) {
      this.methodIndex.addAll(docs);
    }
  }

  private async loadDocsDirectory(docsDir: string): Promise<void> {
    let entries;
    try {
      entries = await fs.readdir(docsDir, { withFileTypes: true });
    } catch (err) {
      getLogger().warn({ err, docsDir }, 'Could not read docs directory');
      return;
    }

    const files = entries
      .filter((e) => e.isFile())
      .filter((e) => e.name.endsWith('.md') || e.name.endsWith('.markdown') || e.name.endsWith('.json'));

    for (const file of files) {
      try {
        const filePath = path.join(docsDir, file.name);
        const content = await fs.readFile(filePath, 'utf-8');

        if (file.name.endsWith('.json')) {
          const texts = extractTexts(JSON.parse(content));
          if (texts.length > 0) {
            this.indexProse(texts.join('\n\n'), file.name);
          }
        } else {
          // Parse optional YAML frontmatter for language tagging.
          // Files with a "language" field in frontmatter will only
          // surface in searches for that language.
          //
          // Example:
          //   ---
          //   language: python
          //   ---
          //   # Error handling in Python
          //   ...
          const frontmatter = parseFrontmatter(content);
          const source = frontmatter.language ? `lang:${frontmatter.language}:${file.name}` : file.name;
          this.indexProse(content, source);
        }
      } catch (err) {
        getLogger().warn({ err, file: file.name }, 'Failed to index docs file');
      }
    }
  }

  private indexProse(markdown: string, source: string): void {
    const chunks = chunkMarkdown(markdown);
    const baseId = this.proseIndex.documentCount;

    const docs: MiniSearchDocument[] = chunks.map((chunk, i) => ({
      id: `prose-${baseId + i}`,
      kind: 'prose' as const,
      content: chunk.content,
      ...(chunk.sectionContext != null ? { sectionContext: chunk.sectionContext } : {}),
      _original: { ...chunk, source } as unknown as Record<string, unknown>,
    }));

    if (docs.length > 0) {
      this.proseIndex.addAll(docs);
    }
  }
}

/** Lightweight markdown chunker — splits on headers, chunks by word count. */
function chunkMarkdown(markdown: string): { content: string; tag: string; sectionContext?: string }[] {
  // Strip YAML frontmatter
  const stripped = markdown.replace(/^---\n[\s\S]*?\n---\n?/, '');
  const lines = stripped.split('\n');

  const chunks: { content: string; tag: string; sectionContext?: string }[] = [];
  const headers: string[] = [];
  let current: string[] = [];

  const flush = () => {
    const text = current.join('\n').trim();
    if (!text) return;
    const sectionContext = headers.length > 0 ? headers.join(' > ') : undefined;
    // Split into ~200-word chunks
    const words = text.split(/\s+/);
    for (let i = 0; i < words.length; i += 200) {
      const slice = words.slice(i, i + 200).join(' ');
      if (slice) {
        chunks.push({ content: slice, tag: 'p', ...(sectionContext != null ? { sectionContext } : {}) });
      }
    }
    current = [];
  };

  for (const line of lines) {
    const headerMatch = line.match(/^(#{1,6})\s+(.+)/);
    if (headerMatch) {
      flush();
      const level = headerMatch[1]!.length;
      const text = headerMatch[2]!.trim();
      while (headers.length >= level) headers.pop();
      headers.push(text);
    } else {
      current.push(line);
    }
  }
  flush();

  return chunks;
}

/** Recursively extracts string values from a JSON structure. */
function extractTexts(data: unknown, depth = 0): string[] {
  if (depth > 10) return [];
  if (typeof data === 'string') return data.trim() ? [data] : [];
  if (Array.isArray(data)) return data.flatMap((item) => extractTexts(item, depth + 1));
  if (typeof data === 'object' && data !== null) {
    return Object.values(data).flatMap((v) => extractTexts(v, depth + 1));
  }
  return [];
}

/** Parses YAML frontmatter from a markdown string, extracting the language field if present. */
function parseFrontmatter(markdown: string): { language?: string } {
  const match = markdown.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const body = match[1] ?? '';
  const langMatch = body.match(/^language:\s*(.+)$/m);
  return langMatch ? { language: langMatch[1]!.trim() } : {};
}
