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
      '{ metadata: { id: string; accountId: string; name: string; profileId: string; externalId?: string; labels?: object; }; spec: { billingEmail?: string; description?: string; domain?: string; workspaces?: object[]; }; }',
    markdown:
      "## retrieve\n\n`client.account.retrieve(): { metadata: account_resource_metadata; spec: object; }`\n\n**get** `/v1/account`\n\nRetrieves the current account for the token accessing the API. Useful to check if the credentials are valid.\n\n### Returns\n\n- `{ metadata: { id: string; accountId: string; name: string; profileId: string; externalId?: string; labels?: object; }; spec: { billingEmail?: string; description?: string; domain?: string; workspaces?: object[]; }; }`\n\n  - `metadata: { id: string; accountId: string; name: string; profileId: string; externalId?: string; labels?: object; }`\n  - `spec: { billingEmail?: string; description?: string; domain?: string; workspaces?: { metadata: object; spec: object; }[]; }`\n\n### Example\n\n```typescript\nimport Cadenya from 'cadenya';\n\nconst client = new Cadenya();\n\nconst account = await client.account.retrieve();\n\nconsole.log(account);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.cadenya.dev/v1/account \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.account.retrieve',
        example:
          "import Cadenya from 'cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nconst account = await client.account.retrieve();\n\nconsole.log(account.metadata);",
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
      'sortOrder?: string;',
    ],
    response:
      '{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { status: string; variationSelectionMode: string; description?: string; webhookEventsHmacSecret?: string; webhookEventsUrl?: string; }; info?: { createdBy?: profile; variationCount?: number; }; }',
    markdown:
      "## list\n\n`client.agents.list(cursor?: string, includeInfo?: boolean, limit?: number, prefix?: string, sortOrder?: string): { metadata: resource_metadata; spec: agent_spec; info?: agent_info; }`\n\n**get** `/v1/agents`\n\nLists all agents in the workspace\n\n### Parameters\n\n- `cursor?: string`\n  Pagination cursor from previous response\n\n- `includeInfo?: boolean`\n  When set to true you may use more of your alloted API rate-limit\n\n- `limit?: number`\n  Maximum number of results to return\n\n- `prefix?: string`\n  Filter expression (query param: prefix)\n\n- `sortOrder?: string`\n  Sort order for results (asc or desc by creation time)\n\n### Returns\n\n- `{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { status: string; variationSelectionMode: string; description?: string; webhookEventsHmacSecret?: string; webhookEventsUrl?: string; }; info?: { createdBy?: profile; variationCount?: number; }; }`\n  Agent resource\n\n  - `metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `spec: { status: string; variationSelectionMode: string; description?: string; webhookEventsHmacSecret?: string; webhookEventsUrl?: string; }`\n  - `info?: { createdBy?: { metadata: account_resource_metadata; spec: profile_spec; }; variationCount?: number; }`\n\n### Example\n\n```typescript\nimport Cadenya from 'cadenya';\n\nconst client = new Cadenya();\n\n// Automatically fetches more pages as needed.\nfor await (const agent of client.agents.list()) {\n  console.log(agent);\n}\n```",
    perLanguage: {
      http: {
        example: 'curl https://api.cadenya.dev/v1/agents \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.agents.list',
        example:
          "import Cadenya from 'cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const agent of client.agents.list()) {\n  console.log(agent.metadata);\n}",
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
      'spec: { status: string; variationSelectionMode: string; description?: string; webhookEventsHmacSecret?: string; webhookEventsUrl?: string; };',
      'defaultVariation?: { metadata: { name: string; externalId?: string; labels?: object; }; spec: { agentDocuments?: object[]; agentTools?: object[]; constraints?: object; description?: string; enableEpisodicMemory?: boolean; episodicMemoryTtl?: number; modelConfig?: object; prompt?: string; toolSelection?: object; weight?: number; }; agentId?: string; };',
    ],
    response:
      '{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { status: string; variationSelectionMode: string; description?: string; webhookEventsHmacSecret?: string; webhookEventsUrl?: string; }; info?: { createdBy?: profile; variationCount?: number; }; }',
    markdown:
      '## create\n\n`client.agents.create(metadata: { name: string; externalId?: string; labels?: object; }, spec: { status: string; variationSelectionMode: string; description?: string; webhookEventsHmacSecret?: string; webhookEventsUrl?: string; }, defaultVariation?: { metadata: object; spec: object; agentId?: string; }): { metadata: resource_metadata; spec: agent_spec; info?: agent_info; }`\n\n**post** `/v1/agents`\n\nCreates a new agent in the workspace\n\n### Parameters\n\n- `metadata: { name: string; externalId?: string; labels?: object; }`\n  CreateResourceMetadata contains the user-provided fields for creating\n a workspace-scoped resource. Read-only fields (id, account_id, workspace_id, profile_id,\n created_at) are excluded since they are set by the server.\n  - `name: string`\n    Human-readable name for the resource (e.g., "Customer Support Agent", "Email Tool")\n  - `externalId?: string`\n    External ID for the resource (e.g., a workflow ID from an external system)\n  - `labels?: object`\n    Arbitrary key-value pairs for categorization and filtering\n Examples: {"environment": "production", "team": "platform", "version": "v2"}\n\n- `spec: { status: string; variationSelectionMode: string; description?: string; webhookEventsHmacSecret?: string; webhookEventsUrl?: string; }`\n  Agent specification (user-provided configuration)\n  - `status: string`\n    Status of the agent\n  - `variationSelectionMode: string`\n    Controls how variations are automatically selected when creating objectives\n Defaults to RANDOM when unspecified\n  - `description?: string`\n    Description of the agent\'s purpose\n  - `webhookEventsHmacSecret?: string`\n    The generated secret that will sign all webhooks that are sent to your configured Webhook URL.\n Formatted as "wh_asdf1234" per the https://www.standardwebhooks.com/ format.\n  - `webhookEventsUrl?: string`\n    The URL that Cadenya will send events for any objective assigned to the agent.\n\n- `defaultVariation?: { metadata: { name: string; externalId?: string; labels?: object; }; spec: { agentDocuments?: object[]; agentTools?: object[]; constraints?: object; description?: string; enableEpisodicMemory?: boolean; episodicMemoryTtl?: number; modelConfig?: object; prompt?: string; toolSelection?: object; weight?: number; }; agentId?: string; }`\n  Create agent variation request\n  - `metadata: { name: string; externalId?: string; labels?: object; }`\n    CreateResourceMetadata contains the user-provided fields for creating\n a workspace-scoped resource. Read-only fields (id, account_id, workspace_id, profile_id,\n created_at) are excluded since they are set by the server.\n  - `spec: { agentDocuments?: { documentId?: string; documentMetadata?: resource_metadata; documentNamespaceId?: string; documentNamespaceMetadata?: resource_metadata; }[]; agentTools?: { agentId?: string; agentMetadata?: resource_metadata; toolId?: string; toolMetadata?: resource_metadata; toolSetId?: string; toolSetMetadata?: resource_metadata; }[]; constraints?: { maxSubObjectives?: number; maxToolCalls?: number; }; description?: string; enableEpisodicMemory?: boolean; episodicMemoryTtl?: number; modelConfig?: { modelId?: string; temperature?: number; }; prompt?: string; toolSelection?: { assignedTools?: tool_selection_assigned_tools; autoDiscovery?: tool_selection_auto_discovery; }; weight?: number; }`\n    AgentVariationSpec defines the operational configuration for a variation\n  - `agentId?: string`\n    Agent ID (from path)\n\n### Returns\n\n- `{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { status: string; variationSelectionMode: string; description?: string; webhookEventsHmacSecret?: string; webhookEventsUrl?: string; }; info?: { createdBy?: profile; variationCount?: number; }; }`\n  Agent resource\n\n  - `metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `spec: { status: string; variationSelectionMode: string; description?: string; webhookEventsHmacSecret?: string; webhookEventsUrl?: string; }`\n  - `info?: { createdBy?: { metadata: account_resource_metadata; spec: profile_spec; }; variationCount?: number; }`\n\n### Example\n\n```typescript\nimport Cadenya from \'cadenya\';\n\nconst client = new Cadenya();\n\nconst agent = await client.agents.create({\n  metadata: { name: \'name\' },\n  spec: { status: \'AGENT_STATUS_UNSPECIFIED\', variationSelectionMode: \'VARIATION_SELECTION_MODE_UNSPECIFIED\' },\n});\n\nconsole.log(agent);\n```',
    perLanguage: {
      http: {
        example:
          'curl https://api.cadenya.dev/v1/agents \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $CADENYA_API_KEY" \\\n    -d \'{\n          "metadata": {\n            "name": "name"\n          },\n          "spec": {\n            "status": "AGENT_STATUS_UNSPECIFIED",\n            "variationSelectionMode": "VARIATION_SELECTION_MODE_UNSPECIFIED"\n          }\n        }\'',
      },
      typescript: {
        method: 'client.agents.create',
        example:
          "import Cadenya from 'cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nconst agent = await client.agents.create({\n  metadata: { name: 'name' },\n  spec: {\n    status: 'AGENT_STATUS_UNSPECIFIED',\n    variationSelectionMode: 'VARIATION_SELECTION_MODE_UNSPECIFIED',\n  },\n});\n\nconsole.log(agent.metadata);",
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
      '{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { status: string; variationSelectionMode: string; description?: string; webhookEventsHmacSecret?: string; webhookEventsUrl?: string; }; info?: { createdBy?: profile; variationCount?: number; }; }',
    markdown:
      "## retrieve\n\n`client.agents.retrieve(id: string): { metadata: resource_metadata; spec: agent_spec; info?: agent_info; }`\n\n**get** `/v1/agents/{id}`\n\nRetrieves an agent by ID from the workspace\n\n### Parameters\n\n- `id: string`\n\n### Returns\n\n- `{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { status: string; variationSelectionMode: string; description?: string; webhookEventsHmacSecret?: string; webhookEventsUrl?: string; }; info?: { createdBy?: profile; variationCount?: number; }; }`\n  Agent resource\n\n  - `metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `spec: { status: string; variationSelectionMode: string; description?: string; webhookEventsHmacSecret?: string; webhookEventsUrl?: string; }`\n  - `info?: { createdBy?: { metadata: account_resource_metadata; spec: profile_spec; }; variationCount?: number; }`\n\n### Example\n\n```typescript\nimport Cadenya from 'cadenya';\n\nconst client = new Cadenya();\n\nconst agent = await client.agents.retrieve('id');\n\nconsole.log(agent);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.cadenya.dev/v1/agents/$ID \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.agents.retrieve',
        example:
          "import Cadenya from 'cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nconst agent = await client.agents.retrieve('id');\n\nconsole.log(agent.metadata);",
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
      "## delete\n\n`client.agents.delete(id: string): void`\n\n**delete** `/v1/agents/{id}`\n\nDeletes an agent from the workspace\n\n### Parameters\n\n- `id: string`\n\n### Example\n\n```typescript\nimport Cadenya from 'cadenya';\n\nconst client = new Cadenya();\n\nawait client.agents.delete('id')\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.cadenya.dev/v1/agents/$ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.agents.delete',
        example:
          "import Cadenya from 'cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.agents.delete('id');",
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
      'spec?: { status: string; variationSelectionMode: string; description?: string; webhookEventsHmacSecret?: string; webhookEventsUrl?: string; };',
      'updateMask?: string;',
    ],
    response:
      '{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { status: string; variationSelectionMode: string; description?: string; webhookEventsHmacSecret?: string; webhookEventsUrl?: string; }; info?: { createdBy?: profile; variationCount?: number; }; }',
    markdown:
      '## update\n\n`client.agents.update(id: string, metadata?: { name: string; externalId?: string; labels?: object; }, spec?: { status: string; variationSelectionMode: string; description?: string; webhookEventsHmacSecret?: string; webhookEventsUrl?: string; }, updateMask?: string): { metadata: resource_metadata; spec: agent_spec; info?: agent_info; }`\n\n**patch** `/v1/agents/{id}`\n\nUpdates an agent in the workspace\n\n### Parameters\n\n- `id: string`\n\n- `metadata?: { name: string; externalId?: string; labels?: object; }`\n  UpdateResourceMetadata contains the user-provided fields for updating\n a workspace-scoped resource. Read-only fields (id, account_id, workspace_id, profile_id,\n created_at) are excluded since they are set by the server.\n  - `name: string`\n    Human-readable name for the resource (e.g., "Customer Support Agent", "Email Tool")\n  - `externalId?: string`\n    External ID for the resource (e.g., a workflow ID from an external system)\n  - `labels?: object`\n    Arbitrary key-value pairs for categorization and filtering\n Examples: {"environment": "production", "team": "platform", "version": "v2"}\n\n- `spec?: { status: string; variationSelectionMode: string; description?: string; webhookEventsHmacSecret?: string; webhookEventsUrl?: string; }`\n  Agent specification (user-provided configuration)\n  - `status: string`\n    Status of the agent\n  - `variationSelectionMode: string`\n    Controls how variations are automatically selected when creating objectives\n Defaults to RANDOM when unspecified\n  - `description?: string`\n    Description of the agent\'s purpose\n  - `webhookEventsHmacSecret?: string`\n    The generated secret that will sign all webhooks that are sent to your configured Webhook URL.\n Formatted as "wh_asdf1234" per the https://www.standardwebhooks.com/ format.\n  - `webhookEventsUrl?: string`\n    The URL that Cadenya will send events for any objective assigned to the agent.\n\n- `updateMask?: string`\n  Fields to update\n\n### Returns\n\n- `{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { status: string; variationSelectionMode: string; description?: string; webhookEventsHmacSecret?: string; webhookEventsUrl?: string; }; info?: { createdBy?: profile; variationCount?: number; }; }`\n  Agent resource\n\n  - `metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `spec: { status: string; variationSelectionMode: string; description?: string; webhookEventsHmacSecret?: string; webhookEventsUrl?: string; }`\n  - `info?: { createdBy?: { metadata: account_resource_metadata; spec: profile_spec; }; variationCount?: number; }`\n\n### Example\n\n```typescript\nimport Cadenya from \'cadenya\';\n\nconst client = new Cadenya();\n\nconst agent = await client.agents.update(\'id\');\n\nconsole.log(agent);\n```',
    perLanguage: {
      http: {
        example:
          "curl https://api.cadenya.dev/v1/agents/$ID \\\n    -X PATCH \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $CADENYA_API_KEY\" \\\n    -d '{}'",
      },
      typescript: {
        method: 'client.agents.update',
        example:
          "import Cadenya from 'cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nconst agent = await client.agents.update('id');\n\nconsole.log(agent.metadata);",
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
      '{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { agentDocuments?: agent_variation_spec_agent_document[]; agentTools?: agent_variation_spec_agent_tool[]; constraints?: agent_variation_spec_constraints; description?: string; enableEpisodicMemory?: boolean; episodicMemoryTtl?: number; modelConfig?: agent_variation_spec_model_config; prompt?: string; toolSelection?: agent_variation_spec_tool_selection; weight?: number; }; info?: { createdBy?: profile; model?: resource_metadata; subAgentCount?: number; toolCount?: number; toolSetCount?: number; }; }',
    markdown:
      "## list\n\n`client.agents.variations.list(agentId: string, cursor?: string, includeInfo?: boolean, limit?: number, sortOrder?: string): { metadata: resource_metadata; spec: agent_variation_spec; info?: agent_variation_info; }`\n\n**get** `/v1/agents/{agentId}/variations`\n\nLists all variations for an agent\n\n### Parameters\n\n- `agentId: string`\n\n- `cursor?: string`\n  Pagination cursor from previous response\n\n- `includeInfo?: boolean`\n  When set to true you may use more of your alloted API rate-limit\n\n- `limit?: number`\n  Maximum number of results to return\n\n- `sortOrder?: string`\n  Sort order for results (asc or desc by creation time)\n\n### Returns\n\n- `{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { agentDocuments?: agent_variation_spec_agent_document[]; agentTools?: agent_variation_spec_agent_tool[]; constraints?: agent_variation_spec_constraints; description?: string; enableEpisodicMemory?: boolean; episodicMemoryTtl?: number; modelConfig?: agent_variation_spec_model_config; prompt?: string; toolSelection?: agent_variation_spec_tool_selection; weight?: number; }; info?: { createdBy?: profile; model?: resource_metadata; subAgentCount?: number; toolCount?: number; toolSetCount?: number; }; }`\n  AgentVariation resource\n\n  - `metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `spec: { agentDocuments?: { documentId?: string; documentMetadata?: resource_metadata; documentNamespaceId?: string; documentNamespaceMetadata?: resource_metadata; }[]; agentTools?: { agentId?: string; agentMetadata?: resource_metadata; toolId?: string; toolMetadata?: resource_metadata; toolSetId?: string; toolSetMetadata?: resource_metadata; }[]; constraints?: { maxSubObjectives?: number; maxToolCalls?: number; }; description?: string; enableEpisodicMemory?: boolean; episodicMemoryTtl?: number; modelConfig?: { modelId?: string; temperature?: number; }; prompt?: string; toolSelection?: { assignedTools?: tool_selection_assigned_tools; autoDiscovery?: tool_selection_auto_discovery; }; weight?: number; }`\n  - `info?: { createdBy?: { metadata: account_resource_metadata; spec: profile_spec; }; model?: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; subAgentCount?: number; toolCount?: number; toolSetCount?: number; }`\n\n### Example\n\n```typescript\nimport Cadenya from 'cadenya';\n\nconst client = new Cadenya();\n\n// Automatically fetches more pages as needed.\nfor await (const agentVariation of client.agents.variations.list('agentId')) {\n  console.log(agentVariation);\n}\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.cadenya.dev/v1/agents/$AGENT_ID/variations \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.agents.variations.list',
        example:
          "import Cadenya from 'cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const agentVariation of client.agents.variations.list('agentId')) {\n  console.log(agentVariation.metadata);\n}",
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
      'spec: { agentDocuments?: { documentId?: string; documentMetadata?: resource_metadata; documentNamespaceId?: string; documentNamespaceMetadata?: resource_metadata; }[]; agentTools?: { agentId?: string; agentMetadata?: resource_metadata; toolId?: string; toolMetadata?: resource_metadata; toolSetId?: string; toolSetMetadata?: resource_metadata; }[]; constraints?: { maxSubObjectives?: number; maxToolCalls?: number; }; description?: string; enableEpisodicMemory?: boolean; episodicMemoryTtl?: number; modelConfig?: { modelId?: string; temperature?: number; }; prompt?: string; toolSelection?: { assignedTools?: tool_selection_assigned_tools; autoDiscovery?: tool_selection_auto_discovery; }; weight?: number; };',
    ],
    response:
      '{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { agentDocuments?: agent_variation_spec_agent_document[]; agentTools?: agent_variation_spec_agent_tool[]; constraints?: agent_variation_spec_constraints; description?: string; enableEpisodicMemory?: boolean; episodicMemoryTtl?: number; modelConfig?: agent_variation_spec_model_config; prompt?: string; toolSelection?: agent_variation_spec_tool_selection; weight?: number; }; info?: { createdBy?: profile; model?: resource_metadata; subAgentCount?: number; toolCount?: number; toolSetCount?: number; }; }',
    markdown:
      '## create\n\n`client.agents.variations.create(agentId: string, metadata: { name: string; externalId?: string; labels?: object; }, spec: { agentDocuments?: agent_variation_spec_agent_document[]; agentTools?: agent_variation_spec_agent_tool[]; constraints?: agent_variation_spec_constraints; description?: string; enableEpisodicMemory?: boolean; episodicMemoryTtl?: number; modelConfig?: agent_variation_spec_model_config; prompt?: string; toolSelection?: agent_variation_spec_tool_selection; weight?: number; }): { metadata: resource_metadata; spec: agent_variation_spec; info?: agent_variation_info; }`\n\n**post** `/v1/agents/{agentId}/variations`\n\nCreates a new variation for an agent\n\n### Parameters\n\n- `agentId: string`\n\n- `metadata: { name: string; externalId?: string; labels?: object; }`\n  CreateResourceMetadata contains the user-provided fields for creating\n a workspace-scoped resource. Read-only fields (id, account_id, workspace_id, profile_id,\n created_at) are excluded since they are set by the server.\n  - `name: string`\n    Human-readable name for the resource (e.g., "Customer Support Agent", "Email Tool")\n  - `externalId?: string`\n    External ID for the resource (e.g., a workflow ID from an external system)\n  - `labels?: object`\n    Arbitrary key-value pairs for categorization and filtering\n Examples: {"environment": "production", "team": "platform", "version": "v2"}\n\n- `spec: { agentDocuments?: { documentId?: string; documentMetadata?: resource_metadata; documentNamespaceId?: string; documentNamespaceMetadata?: resource_metadata; }[]; agentTools?: { agentId?: string; agentMetadata?: resource_metadata; toolId?: string; toolMetadata?: resource_metadata; toolSetId?: string; toolSetMetadata?: resource_metadata; }[]; constraints?: { maxSubObjectives?: number; maxToolCalls?: number; }; description?: string; enableEpisodicMemory?: boolean; episodicMemoryTtl?: number; modelConfig?: { modelId?: string; temperature?: number; }; prompt?: string; toolSelection?: { assignedTools?: tool_selection_assigned_tools; autoDiscovery?: tool_selection_auto_discovery; }; weight?: number; }`\n  AgentVariationSpec defines the operational configuration for a variation\n  - `agentDocuments?: { documentId?: string; documentMetadata?: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; documentNamespaceId?: string; documentNamespaceMetadata?: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; }[]`\n    Documents assigned to this variation.\n Can include individual documents or entire document namespaces (which include all documents in the namespace).\n  - `agentTools?: { agentId?: string; agentMetadata?: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; toolId?: string; toolMetadata?: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; toolSetId?: string; toolSetMetadata?: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; }[]`\n    Tools assigned to this variation\n  - `constraints?: { maxSubObjectives?: number; maxToolCalls?: number; }`\n    Execution constraints\n  - `description?: string`\n    Human-readable description of what this variation does or when it should be used\n  - `enableEpisodicMemory?: boolean`\n    Enable episodic memory for objectives using this variation.\n When true, the system automatically creates a document namespace for each objective\n using the objective\'s episodic_key as the external_id, allowing the agent to\n store and retrieve documents specific to that episode.\n  - `episodicMemoryTtl?: number`\n    How long episodic memories should be retained.\n After this duration, episodic document namespaces can be automatically cleaned up.\n If not set, episodic memories are retained indefinitely.\n  - `modelConfig?: { modelId?: string; temperature?: number; }`\n    ModelConfig defines the model configuration for a variation\n  - `prompt?: string`\n    The system prompt for this variation\n  - `toolSelection?: { assignedTools?: { allowDiscovery?: boolean; }; autoDiscovery?: { hints?: string[]; maxTools?: number; }; }`\n    Tool selection strategy\n  - `weight?: number`\n    Weight for weighted random selection (>= 0). P(v) = v.weight / sum(all_weights).\n Only used when the agent\'s variation_selection_mode is WEIGHTED. A weight of 0 means never auto-selected, but can still be chosen explicitly via variation_id on CreateObjectiveRequest.\n\n### Returns\n\n- `{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { agentDocuments?: agent_variation_spec_agent_document[]; agentTools?: agent_variation_spec_agent_tool[]; constraints?: agent_variation_spec_constraints; description?: string; enableEpisodicMemory?: boolean; episodicMemoryTtl?: number; modelConfig?: agent_variation_spec_model_config; prompt?: string; toolSelection?: agent_variation_spec_tool_selection; weight?: number; }; info?: { createdBy?: profile; model?: resource_metadata; subAgentCount?: number; toolCount?: number; toolSetCount?: number; }; }`\n  AgentVariation resource\n\n  - `metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `spec: { agentDocuments?: { documentId?: string; documentMetadata?: resource_metadata; documentNamespaceId?: string; documentNamespaceMetadata?: resource_metadata; }[]; agentTools?: { agentId?: string; agentMetadata?: resource_metadata; toolId?: string; toolMetadata?: resource_metadata; toolSetId?: string; toolSetMetadata?: resource_metadata; }[]; constraints?: { maxSubObjectives?: number; maxToolCalls?: number; }; description?: string; enableEpisodicMemory?: boolean; episodicMemoryTtl?: number; modelConfig?: { modelId?: string; temperature?: number; }; prompt?: string; toolSelection?: { assignedTools?: tool_selection_assigned_tools; autoDiscovery?: tool_selection_auto_discovery; }; weight?: number; }`\n  - `info?: { createdBy?: { metadata: account_resource_metadata; spec: profile_spec; }; model?: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; subAgentCount?: number; toolCount?: number; toolSetCount?: number; }`\n\n### Example\n\n```typescript\nimport Cadenya from \'cadenya\';\n\nconst client = new Cadenya();\n\nconst agentVariation = await client.agents.variations.create(\'agentId\', {\n  metadata: { name: \'name\' },\n  spec: {},\n});\n\nconsole.log(agentVariation);\n```',
    perLanguage: {
      http: {
        example:
          'curl https://api.cadenya.dev/v1/agents/$AGENT_ID/variations \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $CADENYA_API_KEY" \\\n    -d \'{\n          "metadata": {\n            "name": "name"\n          },\n          "spec": {}\n        }\'',
      },
      typescript: {
        method: 'client.agents.variations.create',
        example:
          "import Cadenya from 'cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nconst agentVariation = await client.agents.variations.create('agentId', {\n  metadata: { name: 'name' },\n  spec: {},\n});\n\nconsole.log(agentVariation.metadata);",
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
      '{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { agentDocuments?: agent_variation_spec_agent_document[]; agentTools?: agent_variation_spec_agent_tool[]; constraints?: agent_variation_spec_constraints; description?: string; enableEpisodicMemory?: boolean; episodicMemoryTtl?: number; modelConfig?: agent_variation_spec_model_config; prompt?: string; toolSelection?: agent_variation_spec_tool_selection; weight?: number; }; info?: { createdBy?: profile; model?: resource_metadata; subAgentCount?: number; toolCount?: number; toolSetCount?: number; }; }',
    markdown:
      "## retrieve\n\n`client.agents.variations.retrieve(agentId: string, id: string): { metadata: resource_metadata; spec: agent_variation_spec; info?: agent_variation_info; }`\n\n**get** `/v1/agents/{agentId}/variations/{id}`\n\nRetrieves a variation by ID from an agent\n\n### Parameters\n\n- `agentId: string`\n\n- `id: string`\n\n### Returns\n\n- `{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { agentDocuments?: agent_variation_spec_agent_document[]; agentTools?: agent_variation_spec_agent_tool[]; constraints?: agent_variation_spec_constraints; description?: string; enableEpisodicMemory?: boolean; episodicMemoryTtl?: number; modelConfig?: agent_variation_spec_model_config; prompt?: string; toolSelection?: agent_variation_spec_tool_selection; weight?: number; }; info?: { createdBy?: profile; model?: resource_metadata; subAgentCount?: number; toolCount?: number; toolSetCount?: number; }; }`\n  AgentVariation resource\n\n  - `metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `spec: { agentDocuments?: { documentId?: string; documentMetadata?: resource_metadata; documentNamespaceId?: string; documentNamespaceMetadata?: resource_metadata; }[]; agentTools?: { agentId?: string; agentMetadata?: resource_metadata; toolId?: string; toolMetadata?: resource_metadata; toolSetId?: string; toolSetMetadata?: resource_metadata; }[]; constraints?: { maxSubObjectives?: number; maxToolCalls?: number; }; description?: string; enableEpisodicMemory?: boolean; episodicMemoryTtl?: number; modelConfig?: { modelId?: string; temperature?: number; }; prompt?: string; toolSelection?: { assignedTools?: tool_selection_assigned_tools; autoDiscovery?: tool_selection_auto_discovery; }; weight?: number; }`\n  - `info?: { createdBy?: { metadata: account_resource_metadata; spec: profile_spec; }; model?: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; subAgentCount?: number; toolCount?: number; toolSetCount?: number; }`\n\n### Example\n\n```typescript\nimport Cadenya from 'cadenya';\n\nconst client = new Cadenya();\n\nconst agentVariation = await client.agents.variations.retrieve('id', { agentId: 'agentId' });\n\nconsole.log(agentVariation);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.cadenya.dev/v1/agents/$AGENT_ID/variations/$ID \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.agents.variations.retrieve',
        example:
          "import Cadenya from 'cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nconst agentVariation = await client.agents.variations.retrieve('id', { agentId: 'agentId' });\n\nconsole.log(agentVariation.metadata);",
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
      "## delete\n\n`client.agents.variations.delete(agentId: string, id: string): void`\n\n**delete** `/v1/agents/{agentId}/variations/{id}`\n\nDeletes a variation from an agent\n\n### Parameters\n\n- `agentId: string`\n\n- `id: string`\n\n### Example\n\n```typescript\nimport Cadenya from 'cadenya';\n\nconst client = new Cadenya();\n\nawait client.agents.variations.delete('id', { agentId: 'agentId' })\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.cadenya.dev/v1/agents/$AGENT_ID/variations/$ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.agents.variations.delete',
        example:
          "import Cadenya from 'cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.agents.variations.delete('id', { agentId: 'agentId' });",
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
      'spec?: { agentDocuments?: { documentId?: string; documentMetadata?: resource_metadata; documentNamespaceId?: string; documentNamespaceMetadata?: resource_metadata; }[]; agentTools?: { agentId?: string; agentMetadata?: resource_metadata; toolId?: string; toolMetadata?: resource_metadata; toolSetId?: string; toolSetMetadata?: resource_metadata; }[]; constraints?: { maxSubObjectives?: number; maxToolCalls?: number; }; description?: string; enableEpisodicMemory?: boolean; episodicMemoryTtl?: number; modelConfig?: { modelId?: string; temperature?: number; }; prompt?: string; toolSelection?: { assignedTools?: tool_selection_assigned_tools; autoDiscovery?: tool_selection_auto_discovery; }; weight?: number; };',
      'updateMask?: string;',
    ],
    response:
      '{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { agentDocuments?: agent_variation_spec_agent_document[]; agentTools?: agent_variation_spec_agent_tool[]; constraints?: agent_variation_spec_constraints; description?: string; enableEpisodicMemory?: boolean; episodicMemoryTtl?: number; modelConfig?: agent_variation_spec_model_config; prompt?: string; toolSelection?: agent_variation_spec_tool_selection; weight?: number; }; info?: { createdBy?: profile; model?: resource_metadata; subAgentCount?: number; toolCount?: number; toolSetCount?: number; }; }',
    markdown:
      '## update\n\n`client.agents.variations.update(agentId: string, id: string, metadata?: { name: string; externalId?: string; labels?: object; }, spec?: { agentDocuments?: agent_variation_spec_agent_document[]; agentTools?: agent_variation_spec_agent_tool[]; constraints?: agent_variation_spec_constraints; description?: string; enableEpisodicMemory?: boolean; episodicMemoryTtl?: number; modelConfig?: agent_variation_spec_model_config; prompt?: string; toolSelection?: agent_variation_spec_tool_selection; weight?: number; }, updateMask?: string): { metadata: resource_metadata; spec: agent_variation_spec; info?: agent_variation_info; }`\n\n**patch** `/v1/agents/{agentId}/variations/{id}`\n\nUpdates a variation for an agent\n\n### Parameters\n\n- `agentId: string`\n\n- `id: string`\n\n- `metadata?: { name: string; externalId?: string; labels?: object; }`\n  UpdateResourceMetadata contains the user-provided fields for updating\n a workspace-scoped resource. Read-only fields (id, account_id, workspace_id, profile_id,\n created_at) are excluded since they are set by the server.\n  - `name: string`\n    Human-readable name for the resource (e.g., "Customer Support Agent", "Email Tool")\n  - `externalId?: string`\n    External ID for the resource (e.g., a workflow ID from an external system)\n  - `labels?: object`\n    Arbitrary key-value pairs for categorization and filtering\n Examples: {"environment": "production", "team": "platform", "version": "v2"}\n\n- `spec?: { agentDocuments?: { documentId?: string; documentMetadata?: resource_metadata; documentNamespaceId?: string; documentNamespaceMetadata?: resource_metadata; }[]; agentTools?: { agentId?: string; agentMetadata?: resource_metadata; toolId?: string; toolMetadata?: resource_metadata; toolSetId?: string; toolSetMetadata?: resource_metadata; }[]; constraints?: { maxSubObjectives?: number; maxToolCalls?: number; }; description?: string; enableEpisodicMemory?: boolean; episodicMemoryTtl?: number; modelConfig?: { modelId?: string; temperature?: number; }; prompt?: string; toolSelection?: { assignedTools?: tool_selection_assigned_tools; autoDiscovery?: tool_selection_auto_discovery; }; weight?: number; }`\n  AgentVariationSpec defines the operational configuration for a variation\n  - `agentDocuments?: { documentId?: string; documentMetadata?: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; documentNamespaceId?: string; documentNamespaceMetadata?: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; }[]`\n    Documents assigned to this variation.\n Can include individual documents or entire document namespaces (which include all documents in the namespace).\n  - `agentTools?: { agentId?: string; agentMetadata?: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; toolId?: string; toolMetadata?: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; toolSetId?: string; toolSetMetadata?: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; }[]`\n    Tools assigned to this variation\n  - `constraints?: { maxSubObjectives?: number; maxToolCalls?: number; }`\n    Execution constraints\n  - `description?: string`\n    Human-readable description of what this variation does or when it should be used\n  - `enableEpisodicMemory?: boolean`\n    Enable episodic memory for objectives using this variation.\n When true, the system automatically creates a document namespace for each objective\n using the objective\'s episodic_key as the external_id, allowing the agent to\n store and retrieve documents specific to that episode.\n  - `episodicMemoryTtl?: number`\n    How long episodic memories should be retained.\n After this duration, episodic document namespaces can be automatically cleaned up.\n If not set, episodic memories are retained indefinitely.\n  - `modelConfig?: { modelId?: string; temperature?: number; }`\n    ModelConfig defines the model configuration for a variation\n  - `prompt?: string`\n    The system prompt for this variation\n  - `toolSelection?: { assignedTools?: { allowDiscovery?: boolean; }; autoDiscovery?: { hints?: string[]; maxTools?: number; }; }`\n    Tool selection strategy\n  - `weight?: number`\n    Weight for weighted random selection (>= 0). P(v) = v.weight / sum(all_weights).\n Only used when the agent\'s variation_selection_mode is WEIGHTED. A weight of 0 means never auto-selected, but can still be chosen explicitly via variation_id on CreateObjectiveRequest.\n\n- `updateMask?: string`\n  Fields to update\n\n### Returns\n\n- `{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { agentDocuments?: agent_variation_spec_agent_document[]; agentTools?: agent_variation_spec_agent_tool[]; constraints?: agent_variation_spec_constraints; description?: string; enableEpisodicMemory?: boolean; episodicMemoryTtl?: number; modelConfig?: agent_variation_spec_model_config; prompt?: string; toolSelection?: agent_variation_spec_tool_selection; weight?: number; }; info?: { createdBy?: profile; model?: resource_metadata; subAgentCount?: number; toolCount?: number; toolSetCount?: number; }; }`\n  AgentVariation resource\n\n  - `metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `spec: { agentDocuments?: { documentId?: string; documentMetadata?: resource_metadata; documentNamespaceId?: string; documentNamespaceMetadata?: resource_metadata; }[]; agentTools?: { agentId?: string; agentMetadata?: resource_metadata; toolId?: string; toolMetadata?: resource_metadata; toolSetId?: string; toolSetMetadata?: resource_metadata; }[]; constraints?: { maxSubObjectives?: number; maxToolCalls?: number; }; description?: string; enableEpisodicMemory?: boolean; episodicMemoryTtl?: number; modelConfig?: { modelId?: string; temperature?: number; }; prompt?: string; toolSelection?: { assignedTools?: tool_selection_assigned_tools; autoDiscovery?: tool_selection_auto_discovery; }; weight?: number; }`\n  - `info?: { createdBy?: { metadata: account_resource_metadata; spec: profile_spec; }; model?: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; subAgentCount?: number; toolCount?: number; toolSetCount?: number; }`\n\n### Example\n\n```typescript\nimport Cadenya from \'cadenya\';\n\nconst client = new Cadenya();\n\nconst agentVariation = await client.agents.variations.update(\'id\', { agentId: \'agentId\' });\n\nconsole.log(agentVariation);\n```',
    perLanguage: {
      http: {
        example:
          "curl https://api.cadenya.dev/v1/agents/$AGENT_ID/variations/$ID \\\n    -X PATCH \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $CADENYA_API_KEY\" \\\n    -d '{}'",
      },
      typescript: {
        method: 'client.agents.variations.update',
        example:
          "import Cadenya from 'cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nconst agentVariation = await client.agents.variations.update('id', { agentId: 'agentId' });\n\nconsole.log(agentVariation.metadata);",
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
      "## list\n\n`client.agents.webhookDeliveries.list(agentId: string, cursor?: string, eventType?: string, limit?: number, objectiveId?: string): { data: webhook_delivery_data; metadata: operation_metadata; }`\n\n**get** `/v1/agents/{agentId}/webhook_deliveries`\n\nLists all webhook deliveries for an agent\n\n### Parameters\n\n- `agentId: string`\n\n- `cursor?: string`\n  Pagination cursor from previous response\n\n- `eventType?: string`\n  Optional filter by event type\n\n- `limit?: number`\n  Maximum number of results to return\n\n- `objectiveId?: string`\n  Optional filter by objective ID\n\n### Returns\n\n- `{ data: { agentId: string; attemptCount: number; eventType: string; httpStatusCode: number; lastAttemptAt: string; latencyMs: number; objectiveEventId: string; objectiveId: string; responseContentLength: string; status: string; webhookId: string; webhookUrl: string; errorMessage?: string; responseHeaders?: object; }; metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; }`\n\n  - `data: { agentId: string; attemptCount: number; eventType: string; httpStatusCode: number; lastAttemptAt: string; latencyMs: number; objectiveEventId: string; objectiveId: string; responseContentLength: string; status: string; webhookId: string; webhookUrl: string; errorMessage?: string; responseHeaders?: object; }`\n  - `metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n\n### Example\n\n```typescript\nimport Cadenya from 'cadenya';\n\nconst client = new Cadenya();\n\n// Automatically fetches more pages as needed.\nfor await (const webhookDelivery of client.agents.webhookDeliveries.list('agentId')) {\n  console.log(webhookDelivery);\n}\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.cadenya.dev/v1/agents/$AGENT_ID/webhook_deliveries \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.agents.webhookDeliveries.list',
        example:
          "import Cadenya from 'cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const webhookDelivery of client.agents.webhookDeliveries.list('agentId')) {\n  console.log(webhookDelivery.data);\n}",
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
      '{ data: { agent?: agent; data?: object; initialMessage?: string; parentObjectiveId?: string; secrets?: objective_data_secret[]; systemPrompt?: string; variation?: agent_variation; }; metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; status: { state: string; message?: string; }; info?: { callableTools?: callable_tool[]; createdBy?: profile; totalContextWindows?: number; totalEvents?: number; totalInputTokens?: number; totalOutputTokens?: number; totalToolCalls?: number; }; lastFiveWindows?: { data: objective_context_window_data; metadata: operation_metadata; info?: object; }[]; }',
    markdown:
      "## list\n\n`client.objectives.list(agentId?: string, cursor?: string, includeInfo?: boolean, limit?: number, parentObjectiveId?: string, profileId?: string, sortOrder?: string, state?: string): { data: objective_data; metadata: operation_metadata; status: objective_status; info?: objective_info; lastFiveWindows?: objective_context_window[]; }`\n\n**get** `/v1/objectives`\n\nLists all objectives in the workspace\n\n### Parameters\n\n- `agentId?: string`\n  Agent ID for filtering\n\n- `cursor?: string`\n  Pagination cursor from previous response\n\n- `includeInfo?: boolean`\n  When set to true you may use more of your alloted API rate-limit\n\n- `limit?: number`\n  Maximum number of results to return\n\n- `parentObjectiveId?: string`\n  Optional filters\n\n- `profileId?: string`\n\n- `sortOrder?: string`\n  Sort order for results (asc or desc by creation time)\n\n- `state?: string`\n  Filter by state\n\n### Returns\n\n- `{ data: { agent?: agent; data?: object; initialMessage?: string; parentObjectiveId?: string; secrets?: objective_data_secret[]; systemPrompt?: string; variation?: agent_variation; }; metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; status: { state: string; message?: string; }; info?: { callableTools?: callable_tool[]; createdBy?: profile; totalContextWindows?: number; totalEvents?: number; totalInputTokens?: number; totalOutputTokens?: number; totalToolCalls?: number; }; lastFiveWindows?: { data: objective_context_window_data; metadata: operation_metadata; info?: object; }[]; }`\n\n  - `data: { agent?: { metadata: resource_metadata; spec: agent_spec; info?: agent_info; }; data?: object; initialMessage?: string; parentObjectiveId?: string; secrets?: { name?: string; value?: string; }[]; systemPrompt?: string; variation?: { metadata: resource_metadata; spec: agent_variation_spec; info?: agent_variation_info; }; }`\n  - `metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `status: { state: string; message?: string; }`\n  - `info?: { callableTools?: { agent?: resource_metadata; cadenyaProvidedTool?: resource_metadata; tool?: resource_metadata; }[]; createdBy?: { metadata: account_resource_metadata; spec: profile_spec; }; totalContextWindows?: number; totalEvents?: number; totalInputTokens?: number; totalOutputTokens?: number; totalToolCalls?: number; }`\n  - `lastFiveWindows?: { data: { completionTokens?: number; objectiveId?: string; previousWindowContinueInstructions?: string; promptTokens?: number; sequence?: number; }; metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; info?: { createdBy?: object; objective?: object; }; }[]`\n\n### Example\n\n```typescript\nimport Cadenya from 'cadenya';\n\nconst client = new Cadenya();\n\n// Automatically fetches more pages as needed.\nfor await (const objective of client.objectives.list()) {\n  console.log(objective);\n}\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.cadenya.dev/v1/objectives \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.objectives.list',
        example:
          "import Cadenya from 'cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const objective of client.objectives.list()) {\n  console.log(objective.data);\n}",
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
      'data: { agent?: { metadata: resource_metadata; spec: agent_spec; info?: agent_info; }; data?: object; initialMessage?: string; parentObjectiveId?: string; secrets?: { name?: string; value?: string; }[]; systemPrompt?: string; variation?: { metadata: resource_metadata; spec: agent_variation_spec; info?: agent_variation_info; }; };',
      'metadata: { externalId?: string; labels?: object; };',
      'variationId?: string;',
    ],
    response:
      '{ data: { agent?: agent; data?: object; initialMessage?: string; parentObjectiveId?: string; secrets?: objective_data_secret[]; systemPrompt?: string; variation?: agent_variation; }; metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; status: { state: string; message?: string; }; info?: { callableTools?: callable_tool[]; createdBy?: profile; totalContextWindows?: number; totalEvents?: number; totalInputTokens?: number; totalOutputTokens?: number; totalToolCalls?: number; }; lastFiveWindows?: { data: objective_context_window_data; metadata: operation_metadata; info?: object; }[]; }',
    markdown:
      '## create\n\n`client.objectives.create(agentId: string, data: { agent?: agent; data?: object; initialMessage?: string; parentObjectiveId?: string; secrets?: objective_data_secret[]; systemPrompt?: string; variation?: agent_variation; }, metadata: { externalId?: string; labels?: object; }, variationId?: string): { data: objective_data; metadata: operation_metadata; status: objective_status; info?: objective_info; lastFiveWindows?: objective_context_window[]; }`\n\n**post** `/v1/objectives`\n\nCreates a new objective in the workspace\n\n### Parameters\n\n- `agentId: string`\n\n- `data: { agent?: { metadata: resource_metadata; spec: agent_spec; info?: agent_info; }; data?: object; initialMessage?: string; parentObjectiveId?: string; secrets?: { name?: string; value?: string; }[]; systemPrompt?: string; variation?: { metadata: resource_metadata; spec: agent_variation_spec; info?: agent_variation_info; }; }`\n  - `agent?: { metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { status: string; variationSelectionMode: string; description?: string; webhookEventsHmacSecret?: string; webhookEventsUrl?: string; }; info?: { createdBy?: profile; variationCount?: number; }; }`\n    Agent resource\n  - `data?: object`\n    Represents a dynamically typed value which can be either null, a number, a string, a boolean, a recursive struct value, or a list of values.\n  - `initialMessage?: string`\n    The initial message sent to the agent. This becomes the first user message in the LLM chat history.\n  - `parentObjectiveId?: string`\n    A parent objective means the objective was spawned off using a separate agent to complete an objective\n  - `secrets?: { name?: string; value?: string; }[]`\n    Secrets that can be used in the headers for tool calls using the secret interpolation format.\n  - `systemPrompt?: string`\n    system_prompt is read-only, derived from the selected variation\'s prompt\n  - `variation?: { metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { agentDocuments?: agent_variation_spec_agent_document[]; agentTools?: agent_variation_spec_agent_tool[]; constraints?: agent_variation_spec_constraints; description?: string; enableEpisodicMemory?: boolean; episodicMemoryTtl?: number; modelConfig?: agent_variation_spec_model_config; prompt?: string; toolSelection?: agent_variation_spec_tool_selection; weight?: number; }; info?: { createdBy?: profile; model?: resource_metadata; subAgentCount?: number; toolCount?: number; toolSetCount?: number; }; }`\n    AgentVariation resource\n\n- `metadata: { externalId?: string; labels?: object; }`\n  CreateOperationMetadata contains the user-provided fields for creating\n an operation. Read-only fields (id, account_id, workspace_id, created_at, profile_id)\n are excluded since they are set by the server.\n  - `externalId?: string`\n    External ID for the operation (e.g., a workflow ID from an external system)\n  - `labels?: object`\n    Arbitrary key-value pairs for categorization and filtering\n Examples: {"priority": "high", "source": "api", "workflow": "onboarding"}\n\n- `variationId?: string`\n  Optional explicit variation selection. Overrides the agent\'s variation_selection_mode.\n\n### Returns\n\n- `{ data: { agent?: agent; data?: object; initialMessage?: string; parentObjectiveId?: string; secrets?: objective_data_secret[]; systemPrompt?: string; variation?: agent_variation; }; metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; status: { state: string; message?: string; }; info?: { callableTools?: callable_tool[]; createdBy?: profile; totalContextWindows?: number; totalEvents?: number; totalInputTokens?: number; totalOutputTokens?: number; totalToolCalls?: number; }; lastFiveWindows?: { data: objective_context_window_data; metadata: operation_metadata; info?: object; }[]; }`\n\n  - `data: { agent?: { metadata: resource_metadata; spec: agent_spec; info?: agent_info; }; data?: object; initialMessage?: string; parentObjectiveId?: string; secrets?: { name?: string; value?: string; }[]; systemPrompt?: string; variation?: { metadata: resource_metadata; spec: agent_variation_spec; info?: agent_variation_info; }; }`\n  - `metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `status: { state: string; message?: string; }`\n  - `info?: { callableTools?: { agent?: resource_metadata; cadenyaProvidedTool?: resource_metadata; tool?: resource_metadata; }[]; createdBy?: { metadata: account_resource_metadata; spec: profile_spec; }; totalContextWindows?: number; totalEvents?: number; totalInputTokens?: number; totalOutputTokens?: number; totalToolCalls?: number; }`\n  - `lastFiveWindows?: { data: { completionTokens?: number; objectiveId?: string; previousWindowContinueInstructions?: string; promptTokens?: number; sequence?: number; }; metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; info?: { createdBy?: object; objective?: object; }; }[]`\n\n### Example\n\n```typescript\nimport Cadenya from \'cadenya\';\n\nconst client = new Cadenya();\n\nconst objective = await client.objectives.create({\n  agentId: \'agentId\',\n  data: {},\n  metadata: {},\n});\n\nconsole.log(objective);\n```',
    perLanguage: {
      http: {
        example:
          'curl https://api.cadenya.dev/v1/objectives \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $CADENYA_API_KEY" \\\n    -d \'{\n          "agentId": "agentId",\n          "data": {},\n          "metadata": {}\n        }\'',
      },
      typescript: {
        method: 'client.objectives.create',
        example:
          "import Cadenya from 'cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nconst objective = await client.objectives.create({\n  agentId: 'agentId',\n  data: {},\n  metadata: {},\n});\n\nconsole.log(objective.data);",
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
      '{ data: { agent?: agent; data?: object; initialMessage?: string; parentObjectiveId?: string; secrets?: objective_data_secret[]; systemPrompt?: string; variation?: agent_variation; }; metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; status: { state: string; message?: string; }; info?: { callableTools?: callable_tool[]; createdBy?: profile; totalContextWindows?: number; totalEvents?: number; totalInputTokens?: number; totalOutputTokens?: number; totalToolCalls?: number; }; lastFiveWindows?: { data: objective_context_window_data; metadata: operation_metadata; info?: object; }[]; }',
    markdown:
      "## retrieve\n\n`client.objectives.retrieve(id: string): { data: objective_data; metadata: operation_metadata; status: objective_status; info?: objective_info; lastFiveWindows?: objective_context_window[]; }`\n\n**get** `/v1/objectives/{id}`\n\nRetrieves an objective by ID from the workspace\n\n### Parameters\n\n- `id: string`\n\n### Returns\n\n- `{ data: { agent?: agent; data?: object; initialMessage?: string; parentObjectiveId?: string; secrets?: objective_data_secret[]; systemPrompt?: string; variation?: agent_variation; }; metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; status: { state: string; message?: string; }; info?: { callableTools?: callable_tool[]; createdBy?: profile; totalContextWindows?: number; totalEvents?: number; totalInputTokens?: number; totalOutputTokens?: number; totalToolCalls?: number; }; lastFiveWindows?: { data: objective_context_window_data; metadata: operation_metadata; info?: object; }[]; }`\n\n  - `data: { agent?: { metadata: resource_metadata; spec: agent_spec; info?: agent_info; }; data?: object; initialMessage?: string; parentObjectiveId?: string; secrets?: { name?: string; value?: string; }[]; systemPrompt?: string; variation?: { metadata: resource_metadata; spec: agent_variation_spec; info?: agent_variation_info; }; }`\n  - `metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `status: { state: string; message?: string; }`\n  - `info?: { callableTools?: { agent?: resource_metadata; cadenyaProvidedTool?: resource_metadata; tool?: resource_metadata; }[]; createdBy?: { metadata: account_resource_metadata; spec: profile_spec; }; totalContextWindows?: number; totalEvents?: number; totalInputTokens?: number; totalOutputTokens?: number; totalToolCalls?: number; }`\n  - `lastFiveWindows?: { data: { completionTokens?: number; objectiveId?: string; previousWindowContinueInstructions?: string; promptTokens?: number; sequence?: number; }; metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; info?: { createdBy?: object; objective?: object; }; }[]`\n\n### Example\n\n```typescript\nimport Cadenya from 'cadenya';\n\nconst client = new Cadenya();\n\nconst objective = await client.objectives.retrieve('id');\n\nconsole.log(objective);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.cadenya.dev/v1/objectives/$ID \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.objectives.retrieve',
        example:
          "import Cadenya from 'cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nconst objective = await client.objectives.retrieve('id');\n\nconsole.log(objective.data);",
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
      '{ data: { assistantMessage?: assistant_message; error?: objective_error; subObjectiveCreated?: sub_objective_created; toolApprovalRequested?: tool_approval_requested; toolApproved?: tool_approved; toolCalled?: tool_called; toolDenied?: tool_denied; toolError?: tool_error; toolResult?: tool_result; type?: string; userMessage?: user_message; }; metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; contextWindowId?: string; info?: { createdBy?: profile; objective?: operation_metadata; }; }',
    markdown:
      "## list_events\n\n`client.objectives.listEvents(objectiveId: string, cursor?: string, includeInfo?: boolean, limit?: number, sortOrder?: string, windowId?: string): { data: objective_event_data; metadata: operation_metadata; contextWindowId?: string; info?: objective_event_info; }`\n\n**get** `/v1/objectives/{objectiveId}/events`\n\nLists all events for an objective\n\n### Parameters\n\n- `objectiveId: string`\n\n- `cursor?: string`\n  Pagination cursor from previous response\n\n- `includeInfo?: boolean`\n  When set to true you may use more of your alloted API rate-limit\n\n- `limit?: number`\n  Maximum number of results to return\n\n- `sortOrder?: string`\n  Sort order for results (asc or desc by creation time)\n\n- `windowId?: string`\n  Optional context window ID to filter events by\n\n### Returns\n\n- `{ data: { assistantMessage?: assistant_message; error?: objective_error; subObjectiveCreated?: sub_objective_created; toolApprovalRequested?: tool_approval_requested; toolApproved?: tool_approved; toolCalled?: tool_called; toolDenied?: tool_denied; toolError?: tool_error; toolResult?: tool_result; type?: string; userMessage?: user_message; }; metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; contextWindowId?: string; info?: { createdBy?: profile; objective?: operation_metadata; }; }`\n\n  - `data: { assistantMessage?: { content?: string; toolCalls?: assistant_tool_call[]; }; error?: { message?: string; type?: string; }; subObjectiveCreated?: { metadata?: operation_metadata; }; toolApprovalRequested?: { toolCallId?: string; }; toolApproved?: { toolCallId?: string; }; toolCalled?: { toolCallId?: string; }; toolDenied?: { memo?: string; toolCallId?: string; }; toolError?: { message?: string; toolCallId?: string; }; toolResult?: { content?: string; toolCallId?: string; }; type?: string; userMessage?: { content?: string; }; }`\n  - `metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `contextWindowId?: string`\n  - `info?: { createdBy?: { metadata: account_resource_metadata; spec: profile_spec; }; objective?: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; }`\n\n### Example\n\n```typescript\nimport Cadenya from 'cadenya';\n\nconst client = new Cadenya();\n\n// Automatically fetches more pages as needed.\nfor await (const objectiveListEventsResponse of client.objectives.listEvents('objectiveId')) {\n  console.log(objectiveListEventsResponse);\n}\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.cadenya.dev/v1/objectives/$OBJECTIVE_ID/events \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.objectives.listEvents',
        example:
          "import Cadenya from 'cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const objectiveListEventsResponse of client.objectives.listEvents('objectiveId')) {\n  console.log(objectiveListEventsResponse.data);\n}",
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
      '{ data: { assistantMessage?: assistant_message; error?: objective_error; subObjectiveCreated?: sub_objective_created; toolApprovalRequested?: tool_approval_requested; toolApproved?: tool_approved; toolCalled?: tool_called; toolDenied?: tool_denied; toolError?: tool_error; toolResult?: tool_result; type?: string; userMessage?: user_message; }; metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; contextWindowId?: string; info?: { createdBy?: profile; objective?: operation_metadata; }; }',
    markdown:
      "## continue\n\n`client.objectives.continue(objectiveId: string, enqueue?: boolean, message?: string, secrets?: { name?: string; value?: string; }[]): { data: objective_event_data; metadata: operation_metadata; contextWindowId?: string; info?: objective_event_info; }`\n\n**post** `/v1/objectives/{objectiveId}/continue`\n\nContinues an objective that has completed\n\n### Parameters\n\n- `objectiveId: string`\n\n- `enqueue?: boolean`\n  When set to true, the message will be enqueued for when the agent loop is available to process it.\n\n- `message?: string`\n  The message to continue an objective that has completed (or you are enqueing)\n\n- `secrets?: { name?: string; value?: string; }[]`\n  Secrets that should be included with the message. Helpful for when you need to update secrets on the objective (IE: A secret expires and needs to be refreshed)\n\n### Returns\n\n- `{ data: { assistantMessage?: assistant_message; error?: objective_error; subObjectiveCreated?: sub_objective_created; toolApprovalRequested?: tool_approval_requested; toolApproved?: tool_approved; toolCalled?: tool_called; toolDenied?: tool_denied; toolError?: tool_error; toolResult?: tool_result; type?: string; userMessage?: user_message; }; metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; contextWindowId?: string; info?: { createdBy?: profile; objective?: operation_metadata; }; }`\n\n  - `data: { assistantMessage?: { content?: string; toolCalls?: assistant_tool_call[]; }; error?: { message?: string; type?: string; }; subObjectiveCreated?: { metadata?: operation_metadata; }; toolApprovalRequested?: { toolCallId?: string; }; toolApproved?: { toolCallId?: string; }; toolCalled?: { toolCallId?: string; }; toolDenied?: { memo?: string; toolCallId?: string; }; toolError?: { message?: string; toolCallId?: string; }; toolResult?: { content?: string; toolCallId?: string; }; type?: string; userMessage?: { content?: string; }; }`\n  - `metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `contextWindowId?: string`\n  - `info?: { createdBy?: { metadata: account_resource_metadata; spec: profile_spec; }; objective?: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; }`\n\n### Example\n\n```typescript\nimport Cadenya from 'cadenya';\n\nconst client = new Cadenya();\n\nconst response = await client.objectives.continue('objectiveId');\n\nconsole.log(response);\n```",
    perLanguage: {
      http: {
        example:
          "curl https://api.cadenya.dev/v1/objectives/$OBJECTIVE_ID/continue \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $CADENYA_API_KEY\" \\\n    -d '{}'",
      },
      typescript: {
        method: 'client.objectives.continue',
        example:
          "import Cadenya from 'cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.objectives.continue('objectiveId');\n\nconsole.log(response.data);",
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
      '{ data: { agent?: agent; data?: object; initialMessage?: string; parentObjectiveId?: string; secrets?: objective_data_secret[]; systemPrompt?: string; variation?: agent_variation; }; metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; status: { state: string; message?: string; }; info?: { callableTools?: callable_tool[]; createdBy?: profile; totalContextWindows?: number; totalEvents?: number; totalInputTokens?: number; totalOutputTokens?: number; totalToolCalls?: number; }; lastFiveWindows?: { data: objective_context_window_data; metadata: operation_metadata; info?: object; }[]; }',
    markdown:
      "## cancel\n\n`client.objectives.cancel(objectiveId: string, reason?: string): { data: objective_data; metadata: operation_metadata; status: objective_status; info?: objective_info; lastFiveWindows?: objective_context_window[]; }`\n\n**post** `/v1/objectives/{objectiveId}/cancel`\n\nCancels a running or pending objective. The objective's state will be set to STATE_CANCELLED.\n\n### Parameters\n\n- `objectiveId: string`\n\n- `reason?: string`\n  Optional reason for cancellation\n\n### Returns\n\n- `{ data: { agent?: agent; data?: object; initialMessage?: string; parentObjectiveId?: string; secrets?: objective_data_secret[]; systemPrompt?: string; variation?: agent_variation; }; metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; status: { state: string; message?: string; }; info?: { callableTools?: callable_tool[]; createdBy?: profile; totalContextWindows?: number; totalEvents?: number; totalInputTokens?: number; totalOutputTokens?: number; totalToolCalls?: number; }; lastFiveWindows?: { data: objective_context_window_data; metadata: operation_metadata; info?: object; }[]; }`\n\n  - `data: { agent?: { metadata: resource_metadata; spec: agent_spec; info?: agent_info; }; data?: object; initialMessage?: string; parentObjectiveId?: string; secrets?: { name?: string; value?: string; }[]; systemPrompt?: string; variation?: { metadata: resource_metadata; spec: agent_variation_spec; info?: agent_variation_info; }; }`\n  - `metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `status: { state: string; message?: string; }`\n  - `info?: { callableTools?: { agent?: resource_metadata; cadenyaProvidedTool?: resource_metadata; tool?: resource_metadata; }[]; createdBy?: { metadata: account_resource_metadata; spec: profile_spec; }; totalContextWindows?: number; totalEvents?: number; totalInputTokens?: number; totalOutputTokens?: number; totalToolCalls?: number; }`\n  - `lastFiveWindows?: { data: { completionTokens?: number; objectiveId?: string; previousWindowContinueInstructions?: string; promptTokens?: number; sequence?: number; }; metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; info?: { createdBy?: object; objective?: object; }; }[]`\n\n### Example\n\n```typescript\nimport Cadenya from 'cadenya';\n\nconst client = new Cadenya();\n\nconst objective = await client.objectives.cancel('objectiveId');\n\nconsole.log(objective);\n```",
    perLanguage: {
      http: {
        example:
          "curl https://api.cadenya.dev/v1/objectives/$OBJECTIVE_ID/cancel \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $CADENYA_API_KEY\" \\\n    -d '{}'",
      },
      typescript: {
        method: 'client.objectives.cancel',
        example:
          "import Cadenya from 'cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nconst objective = await client.objectives.cancel('objectiveId');\n\nconsole.log(objective.data);",
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
      "## list_context_windows\n\n`client.objectives.listContextWindows(objectiveId: string, cursor?: string, includeInfo?: boolean, limit?: number): { data: objective_context_window_data; metadata: operation_metadata; info?: object; }`\n\n**get** `/v1/objectives/{objectiveId}/context_windows`\n\nRead-only list of the last five windows of execution for this objective, ordered by most recent first\n\n### Parameters\n\n- `objectiveId: string`\n\n- `cursor?: string`\n  Pagination cursor from previous response\n\n- `includeInfo?: boolean`\n  When set to true you may use more of your alloted API rate-limit\n\n- `limit?: number`\n  Maximum number of results to return\n\n### Returns\n\n- `{ data: { completionTokens?: number; objectiveId?: string; previousWindowContinueInstructions?: string; promptTokens?: number; sequence?: number; }; metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; info?: { createdBy?: object; objective?: object; }; }`\n  ObjectiveContextWindow is a window of chat completions that is grouped together to prevent context-window overflows. Context windows also allow\n agents to compact their windows and carry on into a new one.\n\n  - `data: { completionTokens?: number; objectiveId?: string; previousWindowContinueInstructions?: string; promptTokens?: number; sequence?: number; }`\n  - `metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `info?: { createdBy?: { metadata: object; spec: object; }; objective?: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; }`\n\n### Example\n\n```typescript\nimport Cadenya from 'cadenya';\n\nconst client = new Cadenya();\n\n// Automatically fetches more pages as needed.\nfor await (const objectiveContextWindow of client.objectives.listContextWindows('objectiveId')) {\n  console.log(objectiveContextWindow);\n}\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.cadenya.dev/v1/objectives/$OBJECTIVE_ID/context_windows \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.objectives.listContextWindows',
        example:
          "import Cadenya from 'cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const objectiveContextWindow of client.objectives.listContextWindows('objectiveId')) {\n  console.log(objectiveContextWindow.data);\n}",
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
      '{ metadata: { id: string; }; snapshot?: { metadata: resource_metadata; spec: tool_spec; info?: tool_info; }; }',
    markdown:
      "## list\n\n`client.objectives.tools.list(objectiveId: string, cursor?: string, limit?: number): { metadata: bare_metadata; snapshot?: tool; }`\n\n**get** `/v1/objectives/{objectiveId}/tools`\n\nLists all tools that were assigned to an objective\n\n### Parameters\n\n- `objectiveId: string`\n\n- `cursor?: string`\n  Pagination cursor from previous response\n\n- `limit?: number`\n  Maximum number of results to return\n\n### Returns\n\n- `{ metadata: { id: string; }; snapshot?: { metadata: resource_metadata; spec: tool_spec; info?: tool_info; }; }`\n  ObjectiveTool represents a tool that was assigned to an objective.\n\n  - `metadata: { id: string; }`\n  - `snapshot?: { metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { config: tool_spec_config; description: string; parameters: object; status: string; requiresApproval?: boolean; }; info?: { createdBy?: profile; toolSet?: resource_metadata; }; }`\n\n### Example\n\n```typescript\nimport Cadenya from 'cadenya';\n\nconst client = new Cadenya();\n\n// Automatically fetches more pages as needed.\nfor await (const objectiveTool of client.objectives.tools.list('objectiveId')) {\n  console.log(objectiveTool);\n}\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.cadenya.dev/v1/objectives/$OBJECTIVE_ID/tools \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.objectives.tools.list',
        example:
          "import Cadenya from 'cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const objectiveTool of client.objectives.tools.list('objectiveId')) {\n  console.log(objectiveTool.metadata);\n}",
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
      '{ data: { callable: callable_tool; arguments?: object; memo?: string; result?: string; statusChangedBy?: profile; }; metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; status: string; info?: { createdBy?: profile; objective?: operation_metadata; }; }',
    markdown:
      "## list\n\n`client.objectives.toolCalls.list(objectiveId: string, cursor?: string, includeInfo?: boolean, limit?: number, status?: string): { data: objective_tool_call_data; metadata: operation_metadata; status: string; info?: objective_tool_call_info; }`\n\n**get** `/v1/objectives/{objectiveId}/tool_calls`\n\nLists all tool calls for an objective\n\n### Parameters\n\n- `objectiveId: string`\n\n- `cursor?: string`\n  Pagination cursor from previous response\n\n- `includeInfo?: boolean`\n  When set to true you may use more of your alloted API rate-limit\n\n- `limit?: number`\n  Maximum number of results to return\n\n- `status?: string`\n  Filter by tool call status\n\n### Returns\n\n- `{ data: { callable: callable_tool; arguments?: object; memo?: string; result?: string; statusChangedBy?: profile; }; metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; status: string; info?: { createdBy?: profile; objective?: operation_metadata; }; }`\n  ObjectiveToolCall is a record of a tool call made during an objective's execution.\n Tool calls are mutable — their status changes as they are approved, denied, or executed.\n\n  - `data: { callable: { agent?: resource_metadata; cadenyaProvidedTool?: resource_metadata; tool?: resource_metadata; }; arguments?: object; memo?: string; result?: string; statusChangedBy?: { metadata: account_resource_metadata; spec: profile_spec; }; }`\n  - `metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `status: string`\n  - `info?: { createdBy?: { metadata: account_resource_metadata; spec: profile_spec; }; objective?: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; }`\n\n### Example\n\n```typescript\nimport Cadenya from 'cadenya';\n\nconst client = new Cadenya();\n\n// Automatically fetches more pages as needed.\nfor await (const objectiveToolCall of client.objectives.toolCalls.list('objectiveId')) {\n  console.log(objectiveToolCall);\n}\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.cadenya.dev/v1/objectives/$OBJECTIVE_ID/tool_calls \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.objectives.toolCalls.list',
        example:
          "import Cadenya from 'cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const objectiveToolCall of client.objectives.toolCalls.list('objectiveId')) {\n  console.log(objectiveToolCall.data);\n}",
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
      '{ data: { callable: callable_tool; arguments?: object; memo?: string; result?: string; statusChangedBy?: profile; }; metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; status: string; info?: { createdBy?: profile; objective?: operation_metadata; }; }',
    markdown:
      "## approve\n\n`client.objectives.toolCalls.approve(objectiveId: string, toolCallId: string): { data: objective_tool_call_data; metadata: operation_metadata; status: string; info?: objective_tool_call_info; }`\n\n**put** `/v1/objectives/{objectiveId}/tool_calls/{toolCallId}/approve`\n\nWhen an agent attempts to use a tool that requires approval, use this endpoint to mark it as approved.\n\n### Parameters\n\n- `objectiveId: string`\n\n- `toolCallId: string`\n\n### Returns\n\n- `{ data: { callable: callable_tool; arguments?: object; memo?: string; result?: string; statusChangedBy?: profile; }; metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; status: string; info?: { createdBy?: profile; objective?: operation_metadata; }; }`\n  ObjectiveToolCall is a record of a tool call made during an objective's execution.\n Tool calls are mutable — their status changes as they are approved, denied, or executed.\n\n  - `data: { callable: { agent?: resource_metadata; cadenyaProvidedTool?: resource_metadata; tool?: resource_metadata; }; arguments?: object; memo?: string; result?: string; statusChangedBy?: { metadata: account_resource_metadata; spec: profile_spec; }; }`\n  - `metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `status: string`\n  - `info?: { createdBy?: { metadata: account_resource_metadata; spec: profile_spec; }; objective?: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; }`\n\n### Example\n\n```typescript\nimport Cadenya from 'cadenya';\n\nconst client = new Cadenya();\n\nconst objectiveToolCall = await client.objectives.toolCalls.approve('toolCallId', { objectiveId: 'objectiveId' });\n\nconsole.log(objectiveToolCall);\n```",
    perLanguage: {
      http: {
        example:
          "curl https://api.cadenya.dev/v1/objectives/$OBJECTIVE_ID/tool_calls/$TOOL_CALL_ID/approve \\\n    -X PUT \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $CADENYA_API_KEY\" \\\n    -d '{}'",
      },
      typescript: {
        method: 'client.objectives.toolCalls.approve',
        example:
          "import Cadenya from 'cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nconst objectiveToolCall = await client.objectives.toolCalls.approve('toolCallId', {\n  objectiveId: 'objectiveId',\n});\n\nconsole.log(objectiveToolCall.data);",
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
      '{ data: { callable: callable_tool; arguments?: object; memo?: string; result?: string; statusChangedBy?: profile; }; metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; status: string; info?: { createdBy?: profile; objective?: operation_metadata; }; }',
    markdown:
      "## deny\n\n`client.objectives.toolCalls.deny(objectiveId: string, toolCallId: string, memo?: string): { data: objective_tool_call_data; metadata: operation_metadata; status: string; info?: objective_tool_call_info; }`\n\n**put** `/v1/objectives/{objectiveId}/tool_calls/{toolCallId}/deny`\n\nWhen an agent attempts to use a tool that requires approval, use this endpoint to mark it as denied. Use a memo to steer the LLM to a different decision or usage of the tool.\n\n### Parameters\n\n- `objectiveId: string`\n\n- `toolCallId: string`\n\n- `memo?: string`\n  A memo to associate to the tool call denial. Use a memo to steer the LLM to a different decision or usage of the tool.\n\n### Returns\n\n- `{ data: { callable: callable_tool; arguments?: object; memo?: string; result?: string; statusChangedBy?: profile; }; metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; status: string; info?: { createdBy?: profile; objective?: operation_metadata; }; }`\n  ObjectiveToolCall is a record of a tool call made during an objective's execution.\n Tool calls are mutable — their status changes as they are approved, denied, or executed.\n\n  - `data: { callable: { agent?: resource_metadata; cadenyaProvidedTool?: resource_metadata; tool?: resource_metadata; }; arguments?: object; memo?: string; result?: string; statusChangedBy?: { metadata: account_resource_metadata; spec: profile_spec; }; }`\n  - `metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `status: string`\n  - `info?: { createdBy?: { metadata: account_resource_metadata; spec: profile_spec; }; objective?: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; }`\n\n### Example\n\n```typescript\nimport Cadenya from 'cadenya';\n\nconst client = new Cadenya();\n\nconst objectiveToolCall = await client.objectives.toolCalls.deny('toolCallId', { objectiveId: 'objectiveId' });\n\nconsole.log(objectiveToolCall);\n```",
    perLanguage: {
      http: {
        example:
          "curl https://api.cadenya.dev/v1/objectives/$OBJECTIVE_ID/tool_calls/$TOOL_CALL_ID/deny \\\n    -X PUT \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $CADENYA_API_KEY\" \\\n    -d '{}'",
      },
      typescript: {
        method: 'client.objectives.toolCalls.deny',
        example:
          "import Cadenya from 'cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nconst objectiveToolCall = await client.objectives.toolCalls.deny('toolCallId', {\n  objectiveId: 'objectiveId',\n});\n\nconsole.log(objectiveToolCall.data);",
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
      '{ data: { task: string; completed?: boolean; completedAt?: string; number?: number; }; metadata: { id: string; }; }',
    markdown:
      "## list\n\n`client.objectives.tasks.list(objectiveId: string, cursor?: string, limit?: number, sortOrder?: string): { data: objective_task_data; metadata: bare_metadata; }`\n\n**get** `/v1/objectives/{objectiveId}/tasks`\n\nLists all tasks for an objective\n\n### Parameters\n\n- `objectiveId: string`\n\n- `cursor?: string`\n  Pagination cursor from previous response\n\n- `limit?: number`\n  Maximum number of results to return\n\n- `sortOrder?: string`\n  Sort order for results\n\n### Returns\n\n- `{ data: { task: string; completed?: boolean; completedAt?: string; number?: number; }; metadata: { id: string; }; }`\n  ObjectiveTask represents a task within an objective, typically created and managed by an AI agent\n to track progress toward completing the objective.\n\n  - `data: { task: string; completed?: boolean; completedAt?: string; number?: number; }`\n  - `metadata: { id: string; }`\n\n### Example\n\n```typescript\nimport Cadenya from 'cadenya';\n\nconst client = new Cadenya();\n\n// Automatically fetches more pages as needed.\nfor await (const objectiveTask of client.objectives.tasks.list('objectiveId')) {\n  console.log(objectiveTask);\n}\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.cadenya.dev/v1/objectives/$OBJECTIVE_ID/tasks \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.objectives.tasks.list',
        example:
          "import Cadenya from 'cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const objectiveTask of client.objectives.tasks.list('objectiveId')) {\n  console.log(objectiveTask.data);\n}",
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
      '{ data: { task: string; completed?: boolean; completedAt?: string; number?: number; }; metadata: { id: string; }; }',
    markdown:
      "## retrieve\n\n`client.objectives.tasks.retrieve(objectiveId: string, id: string): { data: objective_task_data; metadata: bare_metadata; }`\n\n**get** `/v1/objectives/{objectiveId}/tasks/{id}`\n\nRetrieves a task by ID from an objective\n\n### Parameters\n\n- `objectiveId: string`\n\n- `id: string`\n\n### Returns\n\n- `{ data: { task: string; completed?: boolean; completedAt?: string; number?: number; }; metadata: { id: string; }; }`\n  ObjectiveTask represents a task within an objective, typically created and managed by an AI agent\n to track progress toward completing the objective.\n\n  - `data: { task: string; completed?: boolean; completedAt?: string; number?: number; }`\n  - `metadata: { id: string; }`\n\n### Example\n\n```typescript\nimport Cadenya from 'cadenya';\n\nconst client = new Cadenya();\n\nconst objectiveTask = await client.objectives.tasks.retrieve('id', { objectiveId: 'objectiveId' });\n\nconsole.log(objectiveTask);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.cadenya.dev/v1/objectives/$OBJECTIVE_ID/tasks/$ID \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.objectives.tasks.retrieve',
        example:
          "import Cadenya from 'cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nconst objectiveTask = await client.objectives.tasks.retrieve('id', { objectiveId: 'objectiveId' });\n\nconsole.log(objectiveTask.data);",
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
      'sortOrder?: string;',
      "status?: 'MODEL_STATUS_UNSPECIFIED' | 'MODEL_STATUS_ENABLED' | 'MODEL_STATUS_DISABLED';",
    ],
    response:
      "{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { family?: string; inputPricePerMillionTokens?: string; maxInputTokens?: number; maxOutputTokens?: number; outputPricePerMillionTokens?: string; provider?: string; status?: 'MODEL_STATUS_UNSPECIFIED' | 'MODEL_STATUS_ENABLED' | 'MODEL_STATUS_DISABLED'; }; }",
    markdown:
      "## list\n\n`client.models.list(cursor?: string, limit?: number, prefix?: string, sortOrder?: string, status?: 'MODEL_STATUS_UNSPECIFIED' | 'MODEL_STATUS_ENABLED' | 'MODEL_STATUS_DISABLED'): { metadata: resource_metadata; spec: model_spec; }`\n\n**get** `/v1/models`\n\nLists all models in the workspace\n\n### Parameters\n\n- `cursor?: string`\n  Pagination cursor from previous response\n\n- `limit?: number`\n  Maximum number of results to return\n\n- `prefix?: string`\n  Filter by name prefix\n\n- `sortOrder?: string`\n  Sort order for results (asc or desc by creation time)\n\n- `status?: 'MODEL_STATUS_UNSPECIFIED' | 'MODEL_STATUS_ENABLED' | 'MODEL_STATUS_DISABLED'`\n  Filter by model status\n\n### Returns\n\n- `{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { family?: string; inputPricePerMillionTokens?: string; maxInputTokens?: number; maxOutputTokens?: number; outputPricePerMillionTokens?: string; provider?: string; status?: 'MODEL_STATUS_UNSPECIFIED' | 'MODEL_STATUS_ENABLED' | 'MODEL_STATUS_DISABLED'; }; }`\n\n  - `metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `spec: { family?: string; inputPricePerMillionTokens?: string; maxInputTokens?: number; maxOutputTokens?: number; outputPricePerMillionTokens?: string; provider?: string; status?: 'MODEL_STATUS_UNSPECIFIED' | 'MODEL_STATUS_ENABLED' | 'MODEL_STATUS_DISABLED'; }`\n\n### Example\n\n```typescript\nimport Cadenya from 'cadenya';\n\nconst client = new Cadenya();\n\n// Automatically fetches more pages as needed.\nfor await (const model of client.models.list()) {\n  console.log(model);\n}\n```",
    perLanguage: {
      http: {
        example: 'curl https://api.cadenya.dev/v1/models \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.models.list',
        example:
          "import Cadenya from 'cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const model of client.models.list()) {\n  console.log(model.metadata);\n}",
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
      "## retrieve\n\n`client.models.retrieve(id: string): { metadata: resource_metadata; spec: model_spec; }`\n\n**get** `/v1/models/{id}`\n\nRetrieves a model by ID from the workspace\n\n### Parameters\n\n- `id: string`\n\n### Returns\n\n- `{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { family?: string; inputPricePerMillionTokens?: string; maxInputTokens?: number; maxOutputTokens?: number; outputPricePerMillionTokens?: string; provider?: string; status?: 'MODEL_STATUS_UNSPECIFIED' | 'MODEL_STATUS_ENABLED' | 'MODEL_STATUS_DISABLED'; }; }`\n\n  - `metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `spec: { family?: string; inputPricePerMillionTokens?: string; maxInputTokens?: number; maxOutputTokens?: number; outputPricePerMillionTokens?: string; provider?: string; status?: 'MODEL_STATUS_UNSPECIFIED' | 'MODEL_STATUS_ENABLED' | 'MODEL_STATUS_DISABLED'; }`\n\n### Example\n\n```typescript\nimport Cadenya from 'cadenya';\n\nconst client = new Cadenya();\n\nconst model = await client.models.retrieve('id');\n\nconsole.log(model);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.cadenya.dev/v1/models/$ID \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.models.retrieve',
        example:
          "import Cadenya from 'cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nconst model = await client.models.retrieve('id');\n\nconsole.log(model.metadata);",
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
      "## set_status\n\n`client.models.setStatus(id: string, status?: 'MODEL_STATUS_UNSPECIFIED' | 'MODEL_STATUS_ENABLED' | 'MODEL_STATUS_DISABLED'): { metadata: resource_metadata; spec: model_spec; }`\n\n**put** `/v1/models/{id}/status`\n\nEnables or disables a model in the workspace\n\n### Parameters\n\n- `id: string`\n\n- `status?: 'MODEL_STATUS_UNSPECIFIED' | 'MODEL_STATUS_ENABLED' | 'MODEL_STATUS_DISABLED'`\n  The new status for the model\n\n### Returns\n\n- `{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { family?: string; inputPricePerMillionTokens?: string; maxInputTokens?: number; maxOutputTokens?: number; outputPricePerMillionTokens?: string; provider?: string; status?: 'MODEL_STATUS_UNSPECIFIED' | 'MODEL_STATUS_ENABLED' | 'MODEL_STATUS_DISABLED'; }; }`\n\n  - `metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `spec: { family?: string; inputPricePerMillionTokens?: string; maxInputTokens?: number; maxOutputTokens?: number; outputPricePerMillionTokens?: string; provider?: string; status?: 'MODEL_STATUS_UNSPECIFIED' | 'MODEL_STATUS_ENABLED' | 'MODEL_STATUS_DISABLED'; }`\n\n### Example\n\n```typescript\nimport Cadenya from 'cadenya';\n\nconst client = new Cadenya();\n\nconst model = await client.models.setStatus('id');\n\nconsole.log(model);\n```",
    perLanguage: {
      http: {
        example:
          "curl https://api.cadenya.dev/v1/models/$ID/status \\\n    -X PUT \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $CADENYA_API_KEY\" \\\n    -d '{}'",
      },
      typescript: {
        method: 'client.models.setStatus',
        example:
          "import Cadenya from 'cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nconst model = await client.models.setStatus('id');\n\nconsole.log(model.metadata);",
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
      "## search_tools_or_tool_sets\n\n`client.search.searchToolsOrToolSets(query?: string): { agents?: agent[]; tools?: tool[]; toolSets?: tool_set[]; }`\n\n**get** `/v1/search/tools_or_tool_sets`\n\nSearches for tools or tool sets in the workspace\n\n### Parameters\n\n- `query?: string`\n\n### Returns\n\n- `{ agents?: { metadata: resource_metadata; spec: agent_spec; info?: agent_info; }[]; tools?: { metadata: resource_metadata; spec: tool_spec; info?: tool_info; }[]; toolSets?: { metadata: resource_metadata; spec: tool_set_spec; info?: tool_set_info; }[]; }`\n\n  - `agents?: { metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { status: string; variationSelectionMode: string; description?: string; webhookEventsHmacSecret?: string; webhookEventsUrl?: string; }; info?: { createdBy?: profile; variationCount?: number; }; }[]`\n  - `tools?: { metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { config: tool_spec_config; description: string; parameters: object; status: string; requiresApproval?: boolean; }; info?: { createdBy?: profile; toolSet?: resource_metadata; }; }[]`\n  - `toolSets?: { metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { adapter?: tool_set_adapter; description?: string; }; info?: { agentCount?: number; createdBy?: profile; lastSync?: string; toolCount?: number; }; }[]`\n\n### Example\n\n```typescript\nimport Cadenya from 'cadenya';\n\nconst client = new Cadenya();\n\nconst response = await client.search.searchToolsOrToolSets();\n\nconsole.log(response);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.cadenya.dev/v1/search/tools_or_tool_sets \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.search.searchToolsOrToolSets',
        example:
          "import Cadenya from 'cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.search.searchToolsOrToolSets();\n\nconsole.log(response.agents);",
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
      'sortOrder?: string;',
    ],
    response:
      '{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { adapter?: tool_set_adapter; description?: string; }; info?: { agentCount?: number; createdBy?: profile; lastSync?: string; toolCount?: number; }; }',
    markdown:
      "## list\n\n`client.toolSets.list(cursor?: string, includeInfo?: boolean, limit?: number, prefix?: string, sortOrder?: string): { metadata: resource_metadata; spec: tool_set_spec; info?: tool_set_info; }`\n\n**get** `/v1/tool_sets`\n\nLists all tool sets in the workspace\n\n### Parameters\n\n- `cursor?: string`\n  Pagination cursor from previous response\n\n- `includeInfo?: boolean`\n  When set to true you may use more of your alloted API rate-limit\n\n- `limit?: number`\n  Maximum number of results to return\n\n- `prefix?: string`\n  Filter expression (query param: prefix)\n\n- `sortOrder?: string`\n  Sort order for results (asc or desc by creation time)\n\n### Returns\n\n- `{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { adapter?: tool_set_adapter; description?: string; }; info?: { agentCount?: number; createdBy?: profile; lastSync?: string; toolCount?: number; }; }`\n\n  - `metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `spec: { adapter?: { http?: tool_set_adapter_http; mcp?: tool_set_adapter_mcp; }; description?: string; }`\n  - `info?: { agentCount?: number; createdBy?: { metadata: account_resource_metadata; spec: profile_spec; }; lastSync?: string; toolCount?: number; }`\n\n### Example\n\n```typescript\nimport Cadenya from 'cadenya';\n\nconst client = new Cadenya();\n\n// Automatically fetches more pages as needed.\nfor await (const toolSet of client.toolSets.list()) {\n  console.log(toolSet);\n}\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.cadenya.dev/v1/tool_sets \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.toolSets.list',
        example:
          "import Cadenya from 'cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const toolSet of client.toolSets.list()) {\n  console.log(toolSet.metadata);\n}",
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
      '## create\n\n`client.toolSets.create(metadata: { name: string; externalId?: string; labels?: object; }, spec: { adapter?: tool_set_adapter; description?: string; }): { metadata: resource_metadata; spec: tool_set_spec; info?: tool_set_info; }`\n\n**post** `/v1/tool_sets`\n\nCreates a new tool set in the workspace\n\n### Parameters\n\n- `metadata: { name: string; externalId?: string; labels?: object; }`\n  CreateResourceMetadata contains the user-provided fields for creating\n a workspace-scoped resource. Read-only fields (id, account_id, workspace_id, profile_id,\n created_at) are excluded since they are set by the server.\n  - `name: string`\n    Human-readable name for the resource (e.g., "Customer Support Agent", "Email Tool")\n  - `externalId?: string`\n    External ID for the resource (e.g., a workflow ID from an external system)\n  - `labels?: object`\n    Arbitrary key-value pairs for categorization and filtering\n Examples: {"environment": "production", "team": "platform", "version": "v2"}\n\n- `spec: { adapter?: { http?: tool_set_adapter_http; mcp?: tool_set_adapter_mcp; }; description?: string; }`\n  - `adapter?: { http?: { baseUrl?: string; headers?: object; }; mcp?: { excludeTools?: mcp_tool_filter; headers?: object; includeTools?: mcp_tool_filter; toolApprovals?: object; url?: string; }; }`\n  - `description?: string`\n\n### Returns\n\n- `{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { adapter?: tool_set_adapter; description?: string; }; info?: { agentCount?: number; createdBy?: profile; lastSync?: string; toolCount?: number; }; }`\n\n  - `metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `spec: { adapter?: { http?: tool_set_adapter_http; mcp?: tool_set_adapter_mcp; }; description?: string; }`\n  - `info?: { agentCount?: number; createdBy?: { metadata: account_resource_metadata; spec: profile_spec; }; lastSync?: string; toolCount?: number; }`\n\n### Example\n\n```typescript\nimport Cadenya from \'cadenya\';\n\nconst client = new Cadenya();\n\nconst toolSet = await client.toolSets.create({\n  metadata: { name: \'name\' },\n  spec: {},\n});\n\nconsole.log(toolSet);\n```',
    perLanguage: {
      http: {
        example:
          'curl https://api.cadenya.dev/v1/tool_sets \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $CADENYA_API_KEY" \\\n    -d \'{\n          "metadata": {\n            "name": "name"\n          },\n          "spec": {}\n        }\'',
      },
      typescript: {
        method: 'client.toolSets.create',
        example:
          "import Cadenya from 'cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nconst toolSet = await client.toolSets.create({\n  metadata: { name: 'name' },\n  spec: {},\n});\n\nconsole.log(toolSet.metadata);",
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
      "## retrieve\n\n`client.toolSets.retrieve(id: string): { metadata: resource_metadata; spec: tool_set_spec; info?: tool_set_info; }`\n\n**get** `/v1/tool_sets/{id}`\n\nRetrieves a tool set by ID from the workspace\n\n### Parameters\n\n- `id: string`\n\n### Returns\n\n- `{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { adapter?: tool_set_adapter; description?: string; }; info?: { agentCount?: number; createdBy?: profile; lastSync?: string; toolCount?: number; }; }`\n\n  - `metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `spec: { adapter?: { http?: tool_set_adapter_http; mcp?: tool_set_adapter_mcp; }; description?: string; }`\n  - `info?: { agentCount?: number; createdBy?: { metadata: account_resource_metadata; spec: profile_spec; }; lastSync?: string; toolCount?: number; }`\n\n### Example\n\n```typescript\nimport Cadenya from 'cadenya';\n\nconst client = new Cadenya();\n\nconst toolSet = await client.toolSets.retrieve('id');\n\nconsole.log(toolSet);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.cadenya.dev/v1/tool_sets/$ID \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.toolSets.retrieve',
        example:
          "import Cadenya from 'cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nconst toolSet = await client.toolSets.retrieve('id');\n\nconsole.log(toolSet.metadata);",
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
      '## update\n\n`client.toolSets.update(id: string, metadata?: { name: string; externalId?: string; labels?: object; }, spec?: { adapter?: tool_set_adapter; description?: string; }, updateMask?: string): { metadata: resource_metadata; spec: tool_set_spec; info?: tool_set_info; }`\n\n**put** `/v1/tool_sets/{id}`\n\nUpdates a tool set in the workspace\n\n### Parameters\n\n- `id: string`\n\n- `metadata?: { name: string; externalId?: string; labels?: object; }`\n  UpdateResourceMetadata contains the user-provided fields for updating\n a workspace-scoped resource. Read-only fields (id, account_id, workspace_id, profile_id,\n created_at) are excluded since they are set by the server.\n  - `name: string`\n    Human-readable name for the resource (e.g., "Customer Support Agent", "Email Tool")\n  - `externalId?: string`\n    External ID for the resource (e.g., a workflow ID from an external system)\n  - `labels?: object`\n    Arbitrary key-value pairs for categorization and filtering\n Examples: {"environment": "production", "team": "platform", "version": "v2"}\n\n- `spec?: { adapter?: { http?: tool_set_adapter_http; mcp?: tool_set_adapter_mcp; }; description?: string; }`\n  - `adapter?: { http?: { baseUrl?: string; headers?: object; }; mcp?: { excludeTools?: mcp_tool_filter; headers?: object; includeTools?: mcp_tool_filter; toolApprovals?: object; url?: string; }; }`\n  - `description?: string`\n\n- `updateMask?: string`\n\n### Returns\n\n- `{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { adapter?: tool_set_adapter; description?: string; }; info?: { agentCount?: number; createdBy?: profile; lastSync?: string; toolCount?: number; }; }`\n\n  - `metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `spec: { adapter?: { http?: tool_set_adapter_http; mcp?: tool_set_adapter_mcp; }; description?: string; }`\n  - `info?: { agentCount?: number; createdBy?: { metadata: account_resource_metadata; spec: profile_spec; }; lastSync?: string; toolCount?: number; }`\n\n### Example\n\n```typescript\nimport Cadenya from \'cadenya\';\n\nconst client = new Cadenya();\n\nconst toolSet = await client.toolSets.update(\'id\');\n\nconsole.log(toolSet);\n```',
    perLanguage: {
      http: {
        example:
          "curl https://api.cadenya.dev/v1/tool_sets/$ID \\\n    -X PUT \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $CADENYA_API_KEY\" \\\n    -d '{}'",
      },
      typescript: {
        method: 'client.toolSets.update',
        example:
          "import Cadenya from 'cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nconst toolSet = await client.toolSets.update('id');\n\nconsole.log(toolSet.metadata);",
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
      "## delete\n\n`client.toolSets.delete(id: string): void`\n\n**delete** `/v1/tool_sets/{id}`\n\nDeletes a tool set in the workspace\n\n### Parameters\n\n- `id: string`\n\n### Example\n\n```typescript\nimport Cadenya from 'cadenya';\n\nconst client = new Cadenya();\n\nawait client.toolSets.delete('id')\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.cadenya.dev/v1/tool_sets/$ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.toolSets.delete',
        example:
          "import Cadenya from 'cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.toolSets.delete('id');",
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
      "## list_events\n\n`client.toolSets.listEvents(toolSetId: string, cursor?: string, includeInfo?: boolean, limit?: number, sortOrder?: string): { metadata: operation_metadata; event?: tool_set_event_data; info?: object; toolSetId?: string; }`\n\n**get** `/v1/tool_sets/{toolSetId}/events`\n\nLists all events (including sync status) for a tool set\n\n### Parameters\n\n- `toolSetId: string`\n\n- `cursor?: string`\n  Pagination cursor from previous response\n\n- `includeInfo?: boolean`\n  When set to true you may use more of your alloted API rate-limit\n\n- `limit?: number`\n  Maximum number of results to return\n\n- `sortOrder?: string`\n  Sort order for results (asc or desc by creation time)\n\n### Returns\n\n- `{ metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; event?: { syncCompleted?: sync_completed; syncFailed?: sync_failed; syncStarted?: sync_started; type?: string; }; info?: { createdBy?: object; toolSet?: object; }; toolSetId?: string; }`\n  ToolSetEvent represents a single event in the tool set's operation timeline\n\n  - `metadata: { id: string; accountId: string; createdAt: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `event?: { syncCompleted?: { message?: string; toolsSynced?: number; }; syncFailed?: { error?: boolean; errorType?: string; message?: string; }; syncStarted?: { message?: string; }; type?: string; }`\n  - `info?: { createdBy?: { metadata: object; spec: object; }; toolSet?: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; }`\n  - `toolSetId?: string`\n\n### Example\n\n```typescript\nimport Cadenya from 'cadenya';\n\nconst client = new Cadenya();\n\n// Automatically fetches more pages as needed.\nfor await (const toolSetEvent of client.toolSets.listEvents('toolSetId')) {\n  console.log(toolSetEvent);\n}\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.cadenya.dev/v1/tool_sets/$TOOL_SET_ID/events \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.toolSets.listEvents',
        example:
          "import Cadenya from 'cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const toolSetEvent of client.toolSets.listEvents('toolSetId')) {\n  console.log(toolSetEvent.metadata);\n}",
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
      'sortOrder?: string;',
    ],
    response:
      '{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { config: tool_spec_config; description: string; parameters: object; status: string; requiresApproval?: boolean; }; info?: { createdBy?: profile; toolSet?: resource_metadata; }; }',
    markdown:
      "## list\n\n`client.toolSets.tools.list(toolSetId: string, cursor?: string, includeInfo?: boolean, limit?: number, prefix?: string, sortOrder?: string): { metadata: resource_metadata; spec: tool_spec; info?: tool_info; }`\n\n**get** `/v1/tool_sets/{toolSetId}/tools`\n\nLists all tools in the tool set\n\n### Parameters\n\n- `toolSetId: string`\n\n- `cursor?: string`\n  Pagination cursor from previous response\n\n- `includeInfo?: boolean`\n  When set to true you may use more of your alloted API rate-limit\n\n- `limit?: number`\n  Maximum number of results to return\n\n- `prefix?: string`\n  Filter expression (query param: prefix)\n\n- `sortOrder?: string`\n  Sort order for results (asc or desc by creation time)\n\n### Returns\n\n- `{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { config: tool_spec_config; description: string; parameters: object; status: string; requiresApproval?: boolean; }; info?: { createdBy?: profile; toolSet?: resource_metadata; }; }`\n\n  - `metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `spec: { config: { http?: config_http; mcp?: config_mcp; }; description: string; parameters: object; status: string; requiresApproval?: boolean; }`\n  - `info?: { createdBy?: { metadata: account_resource_metadata; spec: profile_spec; }; toolSet?: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; }`\n\n### Example\n\n```typescript\nimport Cadenya from 'cadenya';\n\nconst client = new Cadenya();\n\n// Automatically fetches more pages as needed.\nfor await (const tool of client.toolSets.tools.list('toolSetId')) {\n  console.log(tool);\n}\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.cadenya.dev/v1/tool_sets/$TOOL_SET_ID/tools \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.toolSets.tools.list',
        example:
          "import Cadenya from 'cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const tool of client.toolSets.tools.list('toolSetId')) {\n  console.log(tool.metadata);\n}",
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
      "## create\n\n`client.toolSets.tools.create(toolSetId: string, metadata: { name: string; externalId?: string; labels?: object; }, spec: { config: tool_spec_config; description: string; parameters: object; status: string; requiresApproval?: boolean; }): { metadata: resource_metadata; spec: tool_spec; info?: tool_info; }`\n\n**post** `/v1/tool_sets/{toolSetId}/tools`\n\nCreates a new tool in the tool set\n\n### Parameters\n\n- `toolSetId: string`\n\n- `metadata: { name: string; externalId?: string; labels?: object; }`\n  CreateResourceMetadata contains the user-provided fields for creating\n a workspace-scoped resource. Read-only fields (id, account_id, workspace_id, profile_id,\n created_at) are excluded since they are set by the server.\n  - `name: string`\n    Human-readable name for the resource (e.g., \"Customer Support Agent\", \"Email Tool\")\n  - `externalId?: string`\n    External ID for the resource (e.g., a workflow ID from an external system)\n  - `labels?: object`\n    Arbitrary key-value pairs for categorization and filtering\n Examples: {\"environment\": \"production\", \"team\": \"platform\", \"version\": \"v2\"}\n\n- `spec: { config: { http?: config_http; mcp?: config_mcp; }; description: string; parameters: object; status: string; requiresApproval?: boolean; }`\n  - `config: { http?: { requestMethod: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'; headers?: object; path?: string; query?: string; requestBodyContentType?: string; requestBodyTemplate?: string; toolName?: string; }; mcp?: { toolDescription?: string; toolName?: string; toolTitle?: string; }; }`\n    Config defines the adapter to use for the tool.\n This is used to determine how the tool is called.\n For example, if the tool is an HTTP tool, the adapter will be Http.\n If the tool is an inline tool, the adapter will be Inline.\n  - `description: string`\n  - `parameters: object`\n  - `status: string`\n  - `requiresApproval?: boolean`\n\n### Returns\n\n- `{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { config: tool_spec_config; description: string; parameters: object; status: string; requiresApproval?: boolean; }; info?: { createdBy?: profile; toolSet?: resource_metadata; }; }`\n\n  - `metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `spec: { config: { http?: config_http; mcp?: config_mcp; }; description: string; parameters: object; status: string; requiresApproval?: boolean; }`\n  - `info?: { createdBy?: { metadata: account_resource_metadata; spec: profile_spec; }; toolSet?: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; }`\n\n### Example\n\n```typescript\nimport Cadenya from 'cadenya';\n\nconst client = new Cadenya();\n\nconst tool = await client.toolSets.tools.create('toolSetId', {\n  metadata: { name: 'name' },\n  spec: {\n  config: {},\n  description: 'description',\n  parameters: { foo: 'bar' },\n  status: 'TOOL_STATUS_UNSPECIFIED',\n},\n});\n\nconsole.log(tool);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.cadenya.dev/v1/tool_sets/$TOOL_SET_ID/tools \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $CADENYA_API_KEY" \\\n    -d \'{\n          "metadata": {\n            "name": "name"\n          },\n          "spec": {\n            "config": {},\n            "description": "description",\n            "parameters": {\n              "foo": "bar"\n            },\n            "status": "TOOL_STATUS_UNSPECIFIED"\n          }\n        }\'',
      },
      typescript: {
        method: 'client.toolSets.tools.create',
        example:
          "import Cadenya from 'cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nconst tool = await client.toolSets.tools.create('toolSetId', {\n  metadata: { name: 'name' },\n  spec: {\n    config: {},\n    description: 'description',\n    parameters: { foo: 'bar' },\n    status: 'TOOL_STATUS_UNSPECIFIED',\n  },\n});\n\nconsole.log(tool.metadata);",
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
      "## retrieve\n\n`client.toolSets.tools.retrieve(toolSetId: string, id: string): { metadata: resource_metadata; spec: tool_spec; info?: tool_info; }`\n\n**get** `/v1/tool_sets/{toolSetId}/tools/{id}`\n\nRetrieves a tool by ID from the workspace\n\n### Parameters\n\n- `toolSetId: string`\n\n- `id: string`\n\n### Returns\n\n- `{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { config: tool_spec_config; description: string; parameters: object; status: string; requiresApproval?: boolean; }; info?: { createdBy?: profile; toolSet?: resource_metadata; }; }`\n\n  - `metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `spec: { config: { http?: config_http; mcp?: config_mcp; }; description: string; parameters: object; status: string; requiresApproval?: boolean; }`\n  - `info?: { createdBy?: { metadata: account_resource_metadata; spec: profile_spec; }; toolSet?: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; }`\n\n### Example\n\n```typescript\nimport Cadenya from 'cadenya';\n\nconst client = new Cadenya();\n\nconst tool = await client.toolSets.tools.retrieve('id', { toolSetId: 'toolSetId' });\n\nconsole.log(tool);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.cadenya.dev/v1/tool_sets/$TOOL_SET_ID/tools/$ID \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.toolSets.tools.retrieve',
        example:
          "import Cadenya from 'cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nconst tool = await client.toolSets.tools.retrieve('id', { toolSetId: 'toolSetId' });\n\nconsole.log(tool.metadata);",
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
      '## update\n\n`client.toolSets.tools.update(toolSetId: string, id: string, metadata?: { name: string; externalId?: string; labels?: object; }, spec?: { config: tool_spec_config; description: string; parameters: object; status: string; requiresApproval?: boolean; }, updateMask?: string): { metadata: resource_metadata; spec: tool_spec; info?: tool_info; }`\n\n**put** `/v1/tool_sets/{toolSetId}/tools/{id}`\n\nUpdates a tool in the tool set\n\n### Parameters\n\n- `toolSetId: string`\n\n- `id: string`\n\n- `metadata?: { name: string; externalId?: string; labels?: object; }`\n  UpdateResourceMetadata contains the user-provided fields for updating\n a workspace-scoped resource. Read-only fields (id, account_id, workspace_id, profile_id,\n created_at) are excluded since they are set by the server.\n  - `name: string`\n    Human-readable name for the resource (e.g., "Customer Support Agent", "Email Tool")\n  - `externalId?: string`\n    External ID for the resource (e.g., a workflow ID from an external system)\n  - `labels?: object`\n    Arbitrary key-value pairs for categorization and filtering\n Examples: {"environment": "production", "team": "platform", "version": "v2"}\n\n- `spec?: { config: { http?: config_http; mcp?: config_mcp; }; description: string; parameters: object; status: string; requiresApproval?: boolean; }`\n  - `config: { http?: { requestMethod: \'GET\' | \'POST\' | \'PUT\' | \'PATCH\' | \'DELETE\'; headers?: object; path?: string; query?: string; requestBodyContentType?: string; requestBodyTemplate?: string; toolName?: string; }; mcp?: { toolDescription?: string; toolName?: string; toolTitle?: string; }; }`\n    Config defines the adapter to use for the tool.\n This is used to determine how the tool is called.\n For example, if the tool is an HTTP tool, the adapter will be Http.\n If the tool is an inline tool, the adapter will be Inline.\n  - `description: string`\n  - `parameters: object`\n  - `status: string`\n  - `requiresApproval?: boolean`\n\n- `updateMask?: string`\n\n### Returns\n\n- `{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { config: tool_spec_config; description: string; parameters: object; status: string; requiresApproval?: boolean; }; info?: { createdBy?: profile; toolSet?: resource_metadata; }; }`\n\n  - `metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `spec: { config: { http?: config_http; mcp?: config_mcp; }; description: string; parameters: object; status: string; requiresApproval?: boolean; }`\n  - `info?: { createdBy?: { metadata: account_resource_metadata; spec: profile_spec; }; toolSet?: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; }`\n\n### Example\n\n```typescript\nimport Cadenya from \'cadenya\';\n\nconst client = new Cadenya();\n\nconst tool = await client.toolSets.tools.update(\'id\', { toolSetId: \'toolSetId\' });\n\nconsole.log(tool);\n```',
    perLanguage: {
      http: {
        example:
          "curl https://api.cadenya.dev/v1/tool_sets/$TOOL_SET_ID/tools/$ID \\\n    -X PUT \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $CADENYA_API_KEY\" \\\n    -d '{}'",
      },
      typescript: {
        method: 'client.toolSets.tools.update',
        example:
          "import Cadenya from 'cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nconst tool = await client.toolSets.tools.update('id', { toolSetId: 'toolSetId' });\n\nconsole.log(tool.metadata);",
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
      "## delete\n\n`client.toolSets.tools.delete(toolSetId: string, id: string): void`\n\n**delete** `/v1/tool_sets/{toolSetId}/tools/{id}`\n\nDeletes a tool in the tool set\n\n### Parameters\n\n- `toolSetId: string`\n\n- `id: string`\n\n### Example\n\n```typescript\nimport Cadenya from 'cadenya';\n\nconst client = new Cadenya();\n\nawait client.toolSets.tools.delete('id', { toolSetId: 'toolSetId' })\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.cadenya.dev/v1/tool_sets/$TOOL_SET_ID/tools/$ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.toolSets.tools.delete',
        example:
          "import Cadenya from 'cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.toolSets.tools.delete('id', { toolSetId: 'toolSetId' });",
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
      'sortOrder?: string;',
    ],
    response:
      '{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { token?: string; description?: string; }; info?: { createdBy?: profile; }; }',
    markdown:
      "## list\n\n`client.apiKeys.list(cursor?: string, includeInfo?: boolean, limit?: number, prefix?: string, sortOrder?: string): { metadata: resource_metadata; spec: api_key_spec; info?: api_key_info; }`\n\n**get** `/v1/api_keys`\n\nLists all API keys in the workspace\n\n### Parameters\n\n- `cursor?: string`\n  Pagination cursor from previous response\n\n- `includeInfo?: boolean`\n  When set to true you may use more of your alloted API rate-limit\n\n- `limit?: number`\n  Maximum number of results to return\n\n- `prefix?: string`\n  Filter expression (query param: prefix)\n\n- `sortOrder?: string`\n  Sort order for results (asc or desc by creation time)\n\n### Returns\n\n- `{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { token?: string; description?: string; }; info?: { createdBy?: profile; }; }`\n  APIKey represents a workspace-scoped API key.\n Each API key belongs to exactly one workspace, ensuring workspace isolation.\n Authentication is handled via Cadenya-issued JWTs signed with the key's own signing secret.\n\n  - `metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `spec: { token?: string; description?: string; }`\n  - `info?: { createdBy?: { metadata: account_resource_metadata; spec: profile_spec; }; }`\n\n### Example\n\n```typescript\nimport Cadenya from 'cadenya';\n\nconst client = new Cadenya();\n\n// Automatically fetches more pages as needed.\nfor await (const apiKey of client.apiKeys.list()) {\n  console.log(apiKey);\n}\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.cadenya.dev/v1/api_keys \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.apiKeys.list',
        example:
          "import Cadenya from 'cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const apiKey of client.apiKeys.list()) {\n  console.log(apiKey.metadata);\n}",
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
      '## create\n\n`client.apiKeys.create(metadata: { name: string; externalId?: string; labels?: object; }, spec: { token?: string; description?: string; }): { metadata: resource_metadata; spec: api_key_spec; info?: api_key_info; }`\n\n**post** `/v1/api_keys`\n\nCreates a new API key in the workspace.\n\n### Parameters\n\n- `metadata: { name: string; externalId?: string; labels?: object; }`\n  CreateResourceMetadata contains the user-provided fields for creating\n a workspace-scoped resource. Read-only fields (id, account_id, workspace_id, profile_id,\n created_at) are excluded since they are set by the server.\n  - `name: string`\n    Human-readable name for the resource (e.g., "Customer Support Agent", "Email Tool")\n  - `externalId?: string`\n    External ID for the resource (e.g., a workflow ID from an external system)\n  - `labels?: object`\n    Arbitrary key-value pairs for categorization and filtering\n Examples: {"environment": "production", "team": "platform", "version": "v2"}\n\n- `spec: { token?: string; description?: string; }`\n  APIKeySpec contains the API Key-specific fields\n  - `token?: string`\n    The actual token value (only returned on creation and rotation, read-only)\n  - `description?: string`\n    Description of what this API Key is used for\n\n### Returns\n\n- `{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { token?: string; description?: string; }; info?: { createdBy?: profile; }; }`\n  APIKey represents a workspace-scoped API key.\n Each API key belongs to exactly one workspace, ensuring workspace isolation.\n Authentication is handled via Cadenya-issued JWTs signed with the key\'s own signing secret.\n\n  - `metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `spec: { token?: string; description?: string; }`\n  - `info?: { createdBy?: { metadata: account_resource_metadata; spec: profile_spec; }; }`\n\n### Example\n\n```typescript\nimport Cadenya from \'cadenya\';\n\nconst client = new Cadenya();\n\nconst apiKey = await client.apiKeys.create({\n  metadata: { name: \'name\' },\n  spec: {},\n});\n\nconsole.log(apiKey);\n```',
    perLanguage: {
      http: {
        example:
          'curl https://api.cadenya.dev/v1/api_keys \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $CADENYA_API_KEY" \\\n    -d \'{\n          "metadata": {\n            "name": "name"\n          },\n          "spec": {}\n        }\'',
      },
      typescript: {
        method: 'client.apiKeys.create',
        example:
          "import Cadenya from 'cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nconst apiKey = await client.apiKeys.create({\n  metadata: { name: 'name' },\n  spec: {},\n});\n\nconsole.log(apiKey.metadata);",
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
      "## retrieve\n\n`client.apiKeys.retrieve(id: string): { metadata: resource_metadata; spec: api_key_spec; info?: api_key_info; }`\n\n**get** `/v1/api_keys/{id}`\n\nRetrieves an API key by ID from the workspace\n\n### Parameters\n\n- `id: string`\n\n### Returns\n\n- `{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { token?: string; description?: string; }; info?: { createdBy?: profile; }; }`\n  APIKey represents a workspace-scoped API key.\n Each API key belongs to exactly one workspace, ensuring workspace isolation.\n Authentication is handled via Cadenya-issued JWTs signed with the key's own signing secret.\n\n  - `metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `spec: { token?: string; description?: string; }`\n  - `info?: { createdBy?: { metadata: account_resource_metadata; spec: profile_spec; }; }`\n\n### Example\n\n```typescript\nimport Cadenya from 'cadenya';\n\nconst client = new Cadenya();\n\nconst apiKey = await client.apiKeys.retrieve('id');\n\nconsole.log(apiKey);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.cadenya.dev/v1/api_keys/$ID \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.apiKeys.retrieve',
        example:
          "import Cadenya from 'cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nconst apiKey = await client.apiKeys.retrieve('id');\n\nconsole.log(apiKey.metadata);",
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
      "## delete\n\n`client.apiKeys.delete(id: string): void`\n\n**delete** `/v1/api_keys/{id}`\n\nDeletes an API key from the workspace\n\n### Parameters\n\n- `id: string`\n\n### Example\n\n```typescript\nimport Cadenya from 'cadenya';\n\nconst client = new Cadenya();\n\nawait client.apiKeys.delete('id')\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.cadenya.dev/v1/api_keys/$ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.apiKeys.delete',
        example:
          "import Cadenya from 'cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.apiKeys.delete('id');",
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
      '## update\n\n`client.apiKeys.update(id: string, metadata?: { name: string; externalId?: string; labels?: object; }, spec?: { token?: string; description?: string; }, updateMask?: string): { metadata: resource_metadata; spec: api_key_spec; info?: api_key_info; }`\n\n**patch** `/v1/api_keys/{id}`\n\nUpdates an API key in the workspace\n\n### Parameters\n\n- `id: string`\n\n- `metadata?: { name: string; externalId?: string; labels?: object; }`\n  UpdateResourceMetadata contains the user-provided fields for updating\n a workspace-scoped resource. Read-only fields (id, account_id, workspace_id, profile_id,\n created_at) are excluded since they are set by the server.\n  - `name: string`\n    Human-readable name for the resource (e.g., "Customer Support Agent", "Email Tool")\n  - `externalId?: string`\n    External ID for the resource (e.g., a workflow ID from an external system)\n  - `labels?: object`\n    Arbitrary key-value pairs for categorization and filtering\n Examples: {"environment": "production", "team": "platform", "version": "v2"}\n\n- `spec?: { token?: string; description?: string; }`\n  APIKeySpec contains the API Key-specific fields\n  - `token?: string`\n    The actual token value (only returned on creation and rotation, read-only)\n  - `description?: string`\n    Description of what this API Key is used for\n\n- `updateMask?: string`\n  Fields to update\n\n### Returns\n\n- `{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { token?: string; description?: string; }; info?: { createdBy?: profile; }; }`\n  APIKey represents a workspace-scoped API key.\n Each API key belongs to exactly one workspace, ensuring workspace isolation.\n Authentication is handled via Cadenya-issued JWTs signed with the key\'s own signing secret.\n\n  - `metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `spec: { token?: string; description?: string; }`\n  - `info?: { createdBy?: { metadata: account_resource_metadata; spec: profile_spec; }; }`\n\n### Example\n\n```typescript\nimport Cadenya from \'cadenya\';\n\nconst client = new Cadenya();\n\nconst apiKey = await client.apiKeys.update(\'id\');\n\nconsole.log(apiKey);\n```',
    perLanguage: {
      http: {
        example:
          "curl https://api.cadenya.dev/v1/api_keys/$ID \\\n    -X PATCH \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $CADENYA_API_KEY\" \\\n    -d '{}'",
      },
      typescript: {
        method: 'client.apiKeys.update',
        example:
          "import Cadenya from 'cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nconst apiKey = await client.apiKeys.update('id');\n\nconsole.log(apiKey.metadata);",
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
      "## rotate\n\n`client.apiKeys.rotate(id: string): { metadata: resource_metadata; spec: api_key_spec; info?: api_key_info; }`\n\n**put** `/v1/api_keys/{id}/rotate`\n\nRotates an API Key and returns a new token. All previous API Key tokens in use will be invalidated.\n\n### Parameters\n\n- `id: string`\n\n### Returns\n\n- `{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { token?: string; description?: string; }; info?: { createdBy?: profile; }; }`\n  APIKey represents a workspace-scoped API key.\n Each API key belongs to exactly one workspace, ensuring workspace isolation.\n Authentication is handled via Cadenya-issued JWTs signed with the key's own signing secret.\n\n  - `metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `spec: { token?: string; description?: string; }`\n  - `info?: { createdBy?: { metadata: account_resource_metadata; spec: profile_spec; }; }`\n\n### Example\n\n```typescript\nimport Cadenya from 'cadenya';\n\nconst client = new Cadenya();\n\nconst apiKey = await client.apiKeys.rotate('id');\n\nconsole.log(apiKey);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.cadenya.dev/v1/api_keys/$ID/rotate \\\n    -X PUT \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.apiKeys.rotate',
        example:
          "import Cadenya from 'cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nconst apiKey = await client.apiKeys.rotate('id');\n\nconsole.log(apiKey.metadata);",
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
      'sortOrder?: string;',
    ],
    response:
      '{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { value?: string; }; info?: { createdBy?: profile; lastUsedAt?: string; }; }',
    markdown:
      "## list\n\n`client.workspaceSecrets.list(cursor?: string, includeInfo?: boolean, limit?: number, prefix?: string, sortOrder?: string): { metadata: resource_metadata; spec: workspace_secret_spec; info?: workspace_secret_info; }`\n\n**get** `/v1/workspace_secrets`\n\nLists all workspace secrets in the workspace\n\n### Parameters\n\n- `cursor?: string`\n  Pagination cursor from previous response\n\n- `includeInfo?: boolean`\n  When set to true you may use more of your alloted API rate-limit\n\n- `limit?: number`\n  Maximum number of results to return\n\n- `prefix?: string`\n  Filter expression (query param: prefix)\n\n- `sortOrder?: string`\n  Sort order for results (asc or desc by creation time)\n\n### Returns\n\n- `{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { value?: string; }; info?: { createdBy?: profile; lastUsedAt?: string; }; }`\n\n  - `metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `spec: { value?: string; }`\n  - `info?: { createdBy?: { metadata: account_resource_metadata; spec: profile_spec; }; lastUsedAt?: string; }`\n\n### Example\n\n```typescript\nimport Cadenya from 'cadenya';\n\nconst client = new Cadenya();\n\n// Automatically fetches more pages as needed.\nfor await (const workspaceSecret of client.workspaceSecrets.list()) {\n  console.log(workspaceSecret);\n}\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.cadenya.dev/v1/workspace_secrets \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.workspaceSecrets.list',
        example:
          "import Cadenya from 'cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const workspaceSecret of client.workspaceSecrets.list()) {\n  console.log(workspaceSecret.metadata);\n}",
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
      '## create\n\n`client.workspaceSecrets.create(metadata: { name: string; externalId?: string; labels?: object; }, spec: { value?: string; }): { metadata: resource_metadata; spec: workspace_secret_spec; info?: workspace_secret_info; }`\n\n**post** `/v1/workspace_secrets`\n\nCreates a new workspace secret in the workspace\n\n### Parameters\n\n- `metadata: { name: string; externalId?: string; labels?: object; }`\n  CreateResourceMetadata contains the user-provided fields for creating\n a workspace-scoped resource. Read-only fields (id, account_id, workspace_id, profile_id,\n created_at) are excluded since they are set by the server.\n  - `name: string`\n    Human-readable name for the resource (e.g., "Customer Support Agent", "Email Tool")\n  - `externalId?: string`\n    External ID for the resource (e.g., a workflow ID from an external system)\n  - `labels?: object`\n    Arbitrary key-value pairs for categorization and filtering\n Examples: {"environment": "production", "team": "platform", "version": "v2"}\n\n- `spec: { value?: string; }`\n  - `value?: string`\n\n### Returns\n\n- `{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { value?: string; }; info?: { createdBy?: profile; lastUsedAt?: string; }; }`\n\n  - `metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `spec: { value?: string; }`\n  - `info?: { createdBy?: { metadata: account_resource_metadata; spec: profile_spec; }; lastUsedAt?: string; }`\n\n### Example\n\n```typescript\nimport Cadenya from \'cadenya\';\n\nconst client = new Cadenya();\n\nconst workspaceSecret = await client.workspaceSecrets.create({\n  metadata: { name: \'name\' },\n  spec: {},\n});\n\nconsole.log(workspaceSecret);\n```',
    perLanguage: {
      http: {
        example:
          'curl https://api.cadenya.dev/v1/workspace_secrets \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $CADENYA_API_KEY" \\\n    -d \'{\n          "metadata": {\n            "name": "name"\n          },\n          "spec": {}\n        }\'',
      },
      typescript: {
        method: 'client.workspaceSecrets.create',
        example:
          "import Cadenya from 'cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nconst workspaceSecret = await client.workspaceSecrets.create({\n  metadata: { name: 'name' },\n  spec: {},\n});\n\nconsole.log(workspaceSecret.metadata);",
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
      "## retrieve\n\n`client.workspaceSecrets.retrieve(id: string): { metadata: resource_metadata; spec: workspace_secret_spec; info?: workspace_secret_info; }`\n\n**get** `/v1/workspace_secrets/{id}`\n\nRetrieves a workspace secret by ID from the workspace\n\n### Parameters\n\n- `id: string`\n\n### Returns\n\n- `{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { value?: string; }; info?: { createdBy?: profile; lastUsedAt?: string; }; }`\n\n  - `metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `spec: { value?: string; }`\n  - `info?: { createdBy?: { metadata: account_resource_metadata; spec: profile_spec; }; lastUsedAt?: string; }`\n\n### Example\n\n```typescript\nimport Cadenya from 'cadenya';\n\nconst client = new Cadenya();\n\nconst workspaceSecret = await client.workspaceSecrets.retrieve('id');\n\nconsole.log(workspaceSecret);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.cadenya.dev/v1/workspace_secrets/$ID \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.workspaceSecrets.retrieve',
        example:
          "import Cadenya from 'cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nconst workspaceSecret = await client.workspaceSecrets.retrieve('id');\n\nconsole.log(workspaceSecret.metadata);",
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
      "## delete\n\n`client.workspaceSecrets.delete(id: string): void`\n\n**delete** `/v1/workspace_secrets/{id}`\n\nDeletes a workspace secret from the workspace\n\n### Parameters\n\n- `id: string`\n\n### Example\n\n```typescript\nimport Cadenya from 'cadenya';\n\nconst client = new Cadenya();\n\nawait client.workspaceSecrets.delete('id')\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.cadenya.dev/v1/workspace_secrets/$ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.workspaceSecrets.delete',
        example:
          "import Cadenya from 'cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.workspaceSecrets.delete('id');",
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
      '## update\n\n`client.workspaceSecrets.update(id: string, metadata?: { name: string; externalId?: string; labels?: object; }, spec?: { value?: string; }, updateMask?: string): { metadata: resource_metadata; spec: workspace_secret_spec; info?: workspace_secret_info; }`\n\n**patch** `/v1/workspace_secrets/{id}`\n\nUpdates a workspace secret in the workspace\n\n### Parameters\n\n- `id: string`\n\n- `metadata?: { name: string; externalId?: string; labels?: object; }`\n  UpdateResourceMetadata contains the user-provided fields for updating\n a workspace-scoped resource. Read-only fields (id, account_id, workspace_id, profile_id,\n created_at) are excluded since they are set by the server.\n  - `name: string`\n    Human-readable name for the resource (e.g., "Customer Support Agent", "Email Tool")\n  - `externalId?: string`\n    External ID for the resource (e.g., a workflow ID from an external system)\n  - `labels?: object`\n    Arbitrary key-value pairs for categorization and filtering\n Examples: {"environment": "production", "team": "platform", "version": "v2"}\n\n- `spec?: { value?: string; }`\n  - `value?: string`\n\n- `updateMask?: string`\n  Fields to update\n\n### Returns\n\n- `{ metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }; spec: { value?: string; }; info?: { createdBy?: profile; lastUsedAt?: string; }; }`\n\n  - `metadata: { id: string; accountId: string; createdAt: string; name: string; profileId: string; workspaceId: string; externalId?: string; labels?: object; }`\n  - `spec: { value?: string; }`\n  - `info?: { createdBy?: { metadata: account_resource_metadata; spec: profile_spec; }; lastUsedAt?: string; }`\n\n### Example\n\n```typescript\nimport Cadenya from \'cadenya\';\n\nconst client = new Cadenya();\n\nconst workspaceSecret = await client.workspaceSecrets.update(\'id\');\n\nconsole.log(workspaceSecret);\n```',
    perLanguage: {
      http: {
        example:
          "curl https://api.cadenya.dev/v1/workspace_secrets/$ID \\\n    -X PATCH \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $CADENYA_API_KEY\" \\\n    -d '{}'",
      },
      typescript: {
        method: 'client.workspaceSecrets.update',
        example:
          "import Cadenya from 'cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nconst workspaceSecret = await client.workspaceSecrets.update('id');\n\nconsole.log(workspaceSecret.metadata);",
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
      "## list\n\n`client.workspaces.list(cursor?: string, includeInfo?: boolean, limit?: number, sortOrder?: string): { metadata: account_resource_metadata; spec: workspace_spec; }`\n\n**get** `/v1/workspaces`\n\nLists all workspaces for the current account\n\n### Parameters\n\n- `cursor?: string`\n  Pagination cursor from previous response\n\n- `includeInfo?: boolean`\n  When set to true you may use more of your alloted API rate-limit\n\n- `limit?: number`\n  Maximum number of results to return\n\n- `sortOrder?: string`\n  Sort order for results (asc or desc by creation time)\n\n### Returns\n\n- `{ metadata: { id: string; accountId: string; name: string; profileId: string; externalId?: string; labels?: object; }; spec: { description?: string; }; }`\n\n  - `metadata: { id: string; accountId: string; name: string; profileId: string; externalId?: string; labels?: object; }`\n  - `spec: { description?: string; }`\n\n### Example\n\n```typescript\nimport Cadenya from 'cadenya';\n\nconst client = new Cadenya();\n\n// Automatically fetches more pages as needed.\nfor await (const workspace of client.workspaces.list()) {\n  console.log(workspace);\n}\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.cadenya.dev/v1/workspaces \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.workspaces.list',
        example:
          "import Cadenya from 'cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const workspace of client.workspaces.list()) {\n  console.log(workspace.metadata);\n}",
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
      "## get\n\n`client.workspaces.get(): { metadata: account_resource_metadata; spec: workspace_spec; }`\n\n**get** `/v1/workspaces/current`\n\nRetrieves the workspace associated with the current API token. Useful for workspace-scoped tokens to identify which workspace they belong to.\n\n### Returns\n\n- `{ metadata: { id: string; accountId: string; name: string; profileId: string; externalId?: string; labels?: object; }; spec: { description?: string; }; }`\n\n  - `metadata: { id: string; accountId: string; name: string; profileId: string; externalId?: string; labels?: object; }`\n  - `spec: { description?: string; }`\n\n### Example\n\n```typescript\nimport Cadenya from 'cadenya';\n\nconst client = new Cadenya();\n\nconst workspace = await client.workspaces.get();\n\nconsole.log(workspace);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.cadenya.dev/v1/workspaces/current \\\n    -H "Authorization: Bearer $CADENYA_API_KEY"',
      },
      typescript: {
        method: 'client.workspaces.get',
        example:
          "import Cadenya from 'cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n});\n\nconst workspace = await client.workspaces.get();\n\nconsole.log(workspace.metadata);",
      },
    },
  },
];

const EMBEDDED_READMES: { language: string; content: string }[] = [
  {
    language: 'typescript',
    content:
      "# Cadenya TypeScript API Library\n\n[![NPM version](https://img.shields.io/npm/v/cadenya.svg?label=npm%20(stable))](https://npmjs.org/package/cadenya) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/cadenya)\n\nThis library provides convenient access to the Cadenya REST API from server-side TypeScript or JavaScript.\n\n\n\nThe REST API documentation can be found on [docs.cadenya.com](https://docs.cadenya.com). The full API of this library can be found in [api.md](api.md).\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Cadenya MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=cadenya-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsImNhZGVueWEtbWNwIl0sImVudiI6eyJDQURFTllBX0FQSV9LRVkiOiJNeSBBUEkgS2V5In19)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22cadenya-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22cadenya-mcp%22%5D%2C%22env%22%3A%7B%22CADENYA_API_KEY%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Installation\n\n```sh\nnpm install cadenya\n```\n\n\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n<!-- prettier-ignore -->\n```js\nimport Cadenya from 'cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n  environment: 'production', // defaults to 'staging'\n});\n\nconst account = await client.account.retrieve();\n\nconsole.log(account.metadata);\n```\n\n\n\n### Request & Response types\n\nThis library includes TypeScript definitions for all request params and response fields. You may import and use them like so:\n\n<!-- prettier-ignore -->\n```ts\nimport Cadenya from 'cadenya';\n\nconst client = new Cadenya({\n  apiKey: process.env['CADENYA_API_KEY'], // This is the default and can be omitted\n  environment: 'production', // defaults to 'staging'\n});\n\nconst account: Cadenya.Account = await client.account.retrieve();\n```\n\nDocumentation for each method, request param, and response field are available in docstrings and will appear on hover in most modern editors.\n\n\n\n\n\n## Handling errors\n\nWhen the library is unable to connect to the API,\nor if the API returns a non-success status code (i.e., 4xx or 5xx response),\na subclass of `APIError` will be thrown:\n\n<!-- prettier-ignore -->\n```ts\nconst account = await client.account.retrieve().catch(async (err) => {\n  if (err instanceof Cadenya.APIError) {\n    console.log(err.status); // 400\n    console.log(err.name); // BadRequestError\n    console.log(err.headers); // {server: 'nginx', ...}\n  } else {\n    throw err;\n  }\n});\n```\n\nError codes are as follows:\n\n| Status Code | Error Type                 |\n| ----------- | -------------------------- |\n| 400         | `BadRequestError`          |\n| 401         | `AuthenticationError`      |\n| 403         | `PermissionDeniedError`    |\n| 404         | `NotFoundError`            |\n| 422         | `UnprocessableEntityError` |\n| 429         | `RateLimitError`           |\n| >=500       | `InternalServerError`      |\n| N/A         | `APIConnectionError`       |\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,\n429 Rate Limit, and >=500 Internal errors will all be retried by default.\n\nYou can use the `maxRetries` option to configure or disable this:\n\n<!-- prettier-ignore -->\n```js\n// Configure the default for all requests:\nconst client = new Cadenya({\n  maxRetries: 0, // default is 2\n});\n\n// Or, configure per-request:\nawait client.account.retrieve({\n  maxRetries: 5,\n});\n```\n\n### Timeouts\n\nRequests time out after 1 minute by default. You can configure this with a `timeout` option:\n\n<!-- prettier-ignore -->\n```ts\n// Configure the default for all requests:\nconst client = new Cadenya({\n  timeout: 20 * 1000, // 20 seconds (default is 1 minute)\n});\n\n// Override per-request:\nawait client.account.retrieve({\n  timeout: 5 * 1000,\n});\n```\n\nOn timeout, an `APIConnectionTimeoutError` is thrown.\n\nNote that requests which time out will be [retried twice by default](#retries).\n\n## Auto-pagination\n\nList methods in the Cadenya API are paginated.\nYou can use the `for await … of` syntax to iterate through items across all pages:\n\n```ts\nasync function fetchAllAgents(params) {\n  const allAgents = [];\n  // Automatically fetches more pages as needed.\n  for await (const agent of client.agents.list()) {\n    allAgents.push(agent);\n  }\n  return allAgents;\n}\n```\n\nAlternatively, you can request a single page at a time:\n\n```ts\nlet page = await client.agents.list();\nfor (const agent of page.items) {\n  console.log(agent);\n}\n\n// Convenience methods are provided for manually paginating:\nwhile (page.hasNextPage()) {\n  page = await page.getNextPage();\n  // ...\n}\n```\n\n\n\n## Advanced Usage\n\n### Accessing raw Response data (e.g., headers)\n\nThe \"raw\" `Response` returned by `fetch()` can be accessed through the `.asResponse()` method on the `APIPromise` type that all methods return.\nThis method returns as soon as the headers for a successful response are received and does not consume the response body, so you are free to write custom parsing or streaming logic.\n\nYou can also use the `.withResponse()` method to get the raw `Response` along with the parsed data.\nUnlike `.asResponse()` this method consumes the body, returning once it is parsed.\n\n<!-- prettier-ignore -->\n```ts\nconst client = new Cadenya();\n\nconst response = await client.account.retrieve().asResponse();\nconsole.log(response.headers.get('X-My-Header'));\nconsole.log(response.statusText); // access the underlying Response object\n\nconst { data: account, response: raw } = await client.account.retrieve().withResponse();\nconsole.log(raw.headers.get('X-My-Header'));\nconsole.log(account.metadata);\n```\n\n### Logging\n\n> [!IMPORTANT]\n> All log messages are intended for debugging only. The format and content of log messages\n> may change between releases.\n\n#### Log levels\n\nThe log level can be configured in two ways:\n\n1. Via the `CADENYA_LOG` environment variable\n2. Using the `logLevel` client option (overrides the environment variable if set)\n\n```ts\nimport Cadenya from 'cadenya';\n\nconst client = new Cadenya({\n  logLevel: 'debug', // Show all log messages\n});\n```\n\nAvailable log levels, from most to least verbose:\n\n- `'debug'` - Show debug messages, info, warnings, and errors\n- `'info'` - Show info messages, warnings, and errors\n- `'warn'` - Show warnings and errors (default)\n- `'error'` - Show only errors\n- `'off'` - Disable all logging\n\nAt the `'debug'` level, all HTTP requests and responses are logged, including headers and bodies.\nSome authentication-related headers are redacted, but sensitive data in request and response bodies\nmay still be visible.\n\n#### Custom logger\n\nBy default, this library logs to `globalThis.console`. You can also provide a custom logger.\nMost logging libraries are supported, including [pino](https://www.npmjs.com/package/pino), [winston](https://www.npmjs.com/package/winston), [bunyan](https://www.npmjs.com/package/bunyan), [consola](https://www.npmjs.com/package/consola), [signale](https://www.npmjs.com/package/signale), and [@std/log](https://jsr.io/@std/log). If your logger doesn't work, please open an issue.\n\nWhen providing a custom logger, the `logLevel` option still controls which messages are emitted, messages\nbelow the configured level will not be sent to your logger.\n\n```ts\nimport Cadenya from 'cadenya';\nimport pino from 'pino';\n\nconst logger = pino();\n\nconst client = new Cadenya({\n  logger: logger.child({ name: 'Cadenya' }),\n  logLevel: 'debug', // Send all messages to pino, allowing it to filter\n});\n```\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API. If you need to access undocumented\nendpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can use `client.get`, `client.post`, and other HTTP verbs.\nOptions on the client, such as retries, will be respected when making these requests.\n\n```ts\nawait client.post('/some/path', {\n  body: { some_prop: 'foo' },\n  query: { some_query_arg: 'bar' },\n});\n```\n\n#### Undocumented request params\n\nTo make requests using undocumented parameters, you may use `// @ts-expect-error` on the undocumented\nparameter. This library doesn't validate at runtime that the request matches the type, so any extra values you\nsend will be sent as-is.\n\n```ts\nclient.account.retrieve({\n  // ...\n  // @ts-expect-error baz is not yet public\n  baz: 'undocumented option',\n});\n```\n\nFor requests with the `GET` verb, any extra params will be in the query, all other requests will send the\nextra param in the body.\n\nIf you want to explicitly send an extra argument, you can do so with the `query`, `body`, and `headers` request\noptions.\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you may access the response object with `// @ts-expect-error` on\nthe response object, or cast the response object to the requisite type. Like the request params, we do not\nvalidate or strip extra properties from the response from the API.\n\n### Customizing the fetch client\n\nBy default, this library expects a global `fetch` function is defined.\n\nIf you want to use a different `fetch` function, you can either polyfill the global:\n\n```ts\nimport fetch from 'my-fetch';\n\nglobalThis.fetch = fetch;\n```\n\nOr pass it to the client:\n\n```ts\nimport Cadenya from 'cadenya';\nimport fetch from 'my-fetch';\n\nconst client = new Cadenya({ fetch });\n```\n\n### Fetch options\n\nIf you want to set custom `fetch` options without overriding the `fetch` function, you can provide a `fetchOptions` object when instantiating the client or making a request. (Request-specific options override client options.)\n\n```ts\nimport Cadenya from 'cadenya';\n\nconst client = new Cadenya({\n  fetchOptions: {\n    // `RequestInit` options\n  },\n});\n```\n\n#### Configuring proxies\n\nTo modify proxy behavior, you can provide custom `fetchOptions` that add runtime-specific proxy\noptions to requests:\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/node.svg\" align=\"top\" width=\"18\" height=\"21\"> **Node** <sup>[[docs](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md#example---proxyagent-with-fetch)]</sup>\n\n```ts\nimport Cadenya from 'cadenya';\nimport * as undici from 'undici';\n\nconst proxyAgent = new undici.ProxyAgent('http://localhost:8888');\nconst client = new Cadenya({\n  fetchOptions: {\n    dispatcher: proxyAgent,\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/bun.svg\" align=\"top\" width=\"18\" height=\"21\"> **Bun** <sup>[[docs](https://bun.sh/guides/http/proxy)]</sup>\n\n```ts\nimport Cadenya from 'cadenya';\n\nconst client = new Cadenya({\n  fetchOptions: {\n    proxy: 'http://localhost:8888',\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/deno.svg\" align=\"top\" width=\"18\" height=\"21\"> **Deno** <sup>[[docs](https://docs.deno.com/api/deno/~/Deno.createHttpClient)]</sup>\n\n```ts\nimport Cadenya from 'npm:cadenya';\n\nconst httpClient = Deno.createHttpClient({ proxy: { url: 'http://localhost:8888' } });\nconst client = new Cadenya({\n  fetchOptions: {\n    client: httpClient,\n  },\n});\n```\n\n## Frequently Asked Questions\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes that only affect static types, without breaking runtime behavior.\n2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n3. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/cadenya/typescript-sdk/issues) with questions, bugs, or suggestions.\n\n## Requirements\n\nTypeScript >= 4.9 is supported.\n\nThe following runtimes are supported:\n\n- Web browsers (Up-to-date Chrome, Firefox, Safari, Edge, and more)\n- Node.js 20 LTS or later ([non-EOL](https://endoflife.date/nodejs)) versions.\n- Deno v1.28.0 or higher.\n- Bun 1.0 or later.\n- Cloudflare Workers.\n- Vercel Edge Runtime.\n- Jest 28 or greater with the `\"node\"` environment (`\"jsdom\"` is not supported at this time).\n- Nitro v2.6 or greater.\n\nNote that React Native is not supported at this time.\n\nIf you are interested in other runtime environments, please open or upvote an issue on GitHub.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n",
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
