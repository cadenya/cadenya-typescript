// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'cadenya-mcp-server/filtering';
import { Metadata, asTextContentResult } from 'cadenya-mcp-server/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Cadenya from 'cadenya';

export const metadata: Metadata = {
  resource: 'agents.prompts',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/v1/agents/{agentId}/prompts',
  operationId: 'PromptService_CreatePrompt',
};

export const tool: Tool = {
  name: 'create_agents_prompts',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nCreates a new prompt for an agent\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/prompt',\n  $defs: {\n    prompt: {\n      type: 'object',\n      description: 'Prompt resource',\n      properties: {\n        metadata: {\n          $ref: '#/$defs/resource_metadata'\n        },\n        spec: {\n          $ref: '#/$defs/prompt_spec'\n        }\n      }\n    },\n    resource_metadata: {\n      type: 'object',\n      description: 'Standard metadata for persistent, named resources (e.g., agents, tools, prompts)',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'Unique identifier for the resource (UUID v7)'\n        },\n        accountId: {\n          type: 'string',\n          description: 'Account this resource belongs to for multi-tenant isolation (UUID v7)'\n        },\n        actorId: {\n          type: 'string',\n          description: 'ID of the actor (user or service account) that created or last modified this resource (UUID v7)'\n        },\n        callsign: {\n          type: 'string',\n          description: 'Optional short identifier for quick reference (e.g., \"CSA-1\", \"email-v2\")\\n Useful for agents where a memorable callsign is preferred over long UUIDs'\n        },\n        externalId: {\n          type: 'string',\n          description: 'External ID for the resource (e.g., a workflow ID from an external system)'\n        },\n        labels: {\n          type: 'object',\n          description: 'Arbitrary key-value pairs for categorization and filtering\\n Examples: {\"environment\": \"production\", \"team\": \"platform\", \"version\": \"v2\"}',\n          additionalProperties: true\n        },\n        name: {\n          type: 'string',\n          description: 'Human-readable name for the resource (e.g., \"Customer Support Agent\", \"Email Tool\")\\n Required for resources that users interact with directly'\n        },\n        workspaceId: {\n          type: 'string',\n          description: 'Workspace this resource belongs to for organizational grouping (UUID v7)'\n        }\n      }\n    },\n    prompt_spec: {\n      type: 'object',\n      description: 'Prompt specification (user-provided configuration)',\n      properties: {\n        content: {\n          type: 'string',\n          description: 'Content of the prompt'\n        },\n        default: {\n          type: 'boolean',\n          description: 'Whether this is the default prompt for the agent'\n        },\n        objectiveLabelsSelector: {\n          type: 'object',\n          description: 'Selector for the objective labels. If an objective matches the selector, the prompt will be included in the objective\\'s system prompt.\\n This label selector matches the Kubernetes label selector logic, where if a key is provided, the value must match the value of the objective\\'s label with the same key.\\n If a key is provided but no value is provided, the objective\\'s label with the same key must exist.',\n          additionalProperties: true\n        },\n        status: {\n          type: 'integer',\n          description: 'Status of the prompt'\n        }\n      }\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      agentId: {
        type: 'string',
      },
      metadata: {
        $ref: '#/$defs/resource_metadata',
      },
      spec: {
        $ref: '#/$defs/prompt_spec',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['agentId'],
    $defs: {
      resource_metadata: {
        type: 'object',
        description: 'Standard metadata for persistent, named resources (e.g., agents, tools, prompts)',
        properties: {
          id: {
            type: 'string',
            description: 'Unique identifier for the resource (UUID v7)',
          },
          accountId: {
            type: 'string',
            description: 'Account this resource belongs to for multi-tenant isolation (UUID v7)',
          },
          actorId: {
            type: 'string',
            description:
              'ID of the actor (user or service account) that created or last modified this resource (UUID v7)',
          },
          callsign: {
            type: 'string',
            description:
              'Optional short identifier for quick reference (e.g., "CSA-1", "email-v2")\n Useful for agents where a memorable callsign is preferred over long UUIDs',
          },
          externalId: {
            type: 'string',
            description: 'External ID for the resource (e.g., a workflow ID from an external system)',
          },
          labels: {
            type: 'object',
            description:
              'Arbitrary key-value pairs for categorization and filtering\n Examples: {"environment": "production", "team": "platform", "version": "v2"}',
            additionalProperties: true,
          },
          name: {
            type: 'string',
            description:
              'Human-readable name for the resource (e.g., "Customer Support Agent", "Email Tool")\n Required for resources that users interact with directly',
          },
          workspaceId: {
            type: 'string',
            description: 'Workspace this resource belongs to for organizational grouping (UUID v7)',
          },
        },
      },
      prompt_spec: {
        type: 'object',
        description: 'Prompt specification (user-provided configuration)',
        properties: {
          content: {
            type: 'string',
            description: 'Content of the prompt',
          },
          default: {
            type: 'boolean',
            description: 'Whether this is the default prompt for the agent',
          },
          objectiveLabelsSelector: {
            type: 'object',
            description:
              "Selector for the objective labels. If an objective matches the selector, the prompt will be included in the objective's system prompt.\n This label selector matches the Kubernetes label selector logic, where if a key is provided, the value must match the value of the objective's label with the same key.\n If a key is provided but no value is provided, the objective's label with the same key must exist.",
            additionalProperties: true,
          },
          status: {
            type: 'integer',
            description: 'Status of the prompt',
          },
        },
      },
    },
  },
  annotations: {},
};

export const handler = async (client: Cadenya, args: Record<string, unknown> | undefined) => {
  const { agentId, jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.agents.prompts.create(agentId, body)));
};

export default { metadata, tool, handler };
