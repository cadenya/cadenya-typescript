// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'cadenya-mcp-server/filtering';
import { Metadata, asTextContentResult } from 'cadenya-mcp-server/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Cadenya from 'cadenya';

export const metadata: Metadata = {
  resource: 'agents',
  operation: 'write',
  tags: [],
  httpMethod: 'patch',
  httpPath: '/v1/agents/{id}',
  operationId: 'AgentService_UpdateAgent',
};

export const tool: Tool = {
  name: 'update_agents',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nUpdates an agent in the workspace\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/agent',\n  $defs: {\n    agent: {\n      type: 'object',\n      description: 'Agent resource',\n      properties: {\n        metadata: {\n          $ref: '#/$defs/resource_metadata'\n        },\n        spec: {\n          $ref: '#/$defs/agent_spec'\n        }\n      }\n    },\n    resource_metadata: {\n      type: 'object',\n      description: 'Standard metadata for persistent, named resources (e.g., agents, tools, prompts)',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'Unique identifier for the resource (UUID v7)'\n        },\n        accountId: {\n          type: 'string',\n          description: 'Account this resource belongs to for multi-tenant isolation (UUID v7)'\n        },\n        actorId: {\n          type: 'string',\n          description: 'ID of the actor (user or service account) that created or last modified this resource (UUID v7)'\n        },\n        callsign: {\n          type: 'string',\n          description: 'Optional short identifier for quick reference (e.g., \"CSA-1\", \"email-v2\")\\n Useful for agents where a memorable callsign is preferred over long UUIDs'\n        },\n        externalId: {\n          type: 'string',\n          description: 'External ID for the resource (e.g., a workflow ID from an external system)'\n        },\n        labels: {\n          type: 'object',\n          description: 'Arbitrary key-value pairs for categorization and filtering\\n Examples: {\"environment\": \"production\", \"team\": \"platform\", \"version\": \"v2\"}',\n          additionalProperties: true\n        },\n        name: {\n          type: 'string',\n          description: 'Human-readable name for the resource (e.g., \"Customer Support Agent\", \"Email Tool\")\\n Required for resources that users interact with directly'\n        },\n        workspaceId: {\n          type: 'string',\n          description: 'Workspace this resource belongs to for organizational grouping (UUID v7)'\n        }\n      }\n    },\n    agent_spec: {\n      type: 'object',\n      description: 'Agent specification (user-provided configuration)',\n      properties: {\n        agentTools: {\n          type: 'array',\n          items: {\n            type: 'object',\n            properties: {\n              toolId: {\n                type: 'string'\n              },\n              toolMetadata: {\n                $ref: '#/$defs/resource_metadata'\n              },\n              toolSetId: {\n                type: 'string'\n              },\n              toolSetMetadata: {\n                $ref: '#/$defs/resource_metadata'\n              }\n            }\n          }\n        },\n        constraints: {\n          type: 'object',\n          properties: {\n            maxSubObjectives: {\n              type: 'integer',\n              description: 'The maximum number of sub-objectives that can be created. 0 means no limit.'\n            },\n            maxToolCalls: {\n              type: 'integer',\n              description: 'The maximum number of tool calls that can be made. 0 means no limit.'\n            }\n          }\n        },\n        description: {\n          type: 'string',\n          description: 'Description of the agent\\'s purpose'\n        },\n        status: {\n          type: 'integer',\n          description: 'Status of the agent'\n        },\n        toolSelection: {\n          type: 'object',\n          properties: {\n            assignedTools: {\n              type: 'object',\n              description: 'AssignedTools is used to indicate that the agent should only use the tools/tool sets that are explicitly assigned to it.\\n Allow discovery is used when the agent thinks it needs to discover more tools.',\n              properties: {\n                allowDiscovery: {\n                  type: 'boolean'\n                }\n              }\n            },\n            autoDiscovery: {\n              type: 'object',\n              description: 'AutoDiscovery is used to indicate that the agent should automatically discover tools that are not explicitly assigned to it.\\n Max tools is the maximum number of tools that can be discovered.\\n Hints are optional hints for tool search. These are used in conjunction with the context-aware tool search and can help select the best tools for the task.',\n              properties: {\n                hints: {\n                  type: 'array',\n                  items: {\n                    type: 'string'\n                  }\n                },\n                maxTools: {\n                  type: 'integer'\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
      metadata: {
        $ref: '#/$defs/resource_metadata',
      },
      spec: {
        $ref: '#/$defs/agent_spec',
      },
      updateMask: {
        type: 'string',
        description: 'Fields to update',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['id'],
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
      agent_spec: {
        type: 'object',
        description: 'Agent specification (user-provided configuration)',
        properties: {
          agentTools: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                toolId: {
                  type: 'string',
                },
                toolMetadata: {
                  $ref: '#/$defs/resource_metadata',
                },
                toolSetId: {
                  type: 'string',
                },
                toolSetMetadata: {
                  $ref: '#/$defs/resource_metadata',
                },
              },
            },
          },
          constraints: {
            type: 'object',
            properties: {
              maxSubObjectives: {
                type: 'integer',
                description: 'The maximum number of sub-objectives that can be created. 0 means no limit.',
              },
              maxToolCalls: {
                type: 'integer',
                description: 'The maximum number of tool calls that can be made. 0 means no limit.',
              },
            },
          },
          description: {
            type: 'string',
            description: "Description of the agent's purpose",
          },
          status: {
            type: 'integer',
            description: 'Status of the agent',
          },
          toolSelection: {
            type: 'object',
            properties: {
              assignedTools: {
                type: 'object',
                description:
                  'AssignedTools is used to indicate that the agent should only use the tools/tool sets that are explicitly assigned to it.\n Allow discovery is used when the agent thinks it needs to discover more tools.',
                properties: {
                  allowDiscovery: {
                    type: 'boolean',
                  },
                },
              },
              autoDiscovery: {
                type: 'object',
                description:
                  'AutoDiscovery is used to indicate that the agent should automatically discover tools that are not explicitly assigned to it.\n Max tools is the maximum number of tools that can be discovered.\n Hints are optional hints for tool search. These are used in conjunction with the context-aware tool search and can help select the best tools for the task.',
                properties: {
                  hints: {
                    type: 'array',
                    items: {
                      type: 'string',
                    },
                  },
                  maxTools: {
                    type: 'integer',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  annotations: {},
};

export const handler = async (client: Cadenya, args: Record<string, unknown> | undefined) => {
  const { id, jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.agents.update(id, body)));
};

export default { metadata, tool, handler };
