// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'cadenya-mcp-server/filtering';
import { Metadata, asTextContentResult } from 'cadenya-mcp-server/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Cadenya from 'cadenya';

export const metadata: Metadata = {
  resource: 'tool_sets',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/v1/tool_sets',
  operationId: 'ToolService_CreateToolSet',
};

export const tool: Tool = {
  name: 'create_tool_sets',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nCreates a new tool set in the workspace\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/tool_set',\n  $defs: {\n    tool_set: {\n      type: 'object',\n      properties: {\n        metadata: {\n          $ref: '#/$defs/resource_metadata'\n        },\n        spec: {\n          $ref: '#/$defs/tool_set_spec'\n        }\n      }\n    },\n    resource_metadata: {\n      type: 'object',\n      description: 'Standard metadata for persistent, named resources (e.g., agents, tools, prompts)',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'Unique identifier for the resource (UUID v7)'\n        },\n        accountId: {\n          type: 'string',\n          description: 'Account this resource belongs to for multi-tenant isolation (UUID v7)'\n        },\n        actorId: {\n          type: 'string',\n          description: 'ID of the actor (user or service account) that created or last modified this resource (UUID v7)'\n        },\n        callsign: {\n          type: 'string',\n          description: 'Optional short identifier for quick reference (e.g., \"CSA-1\", \"email-v2\")\\n Useful for agents where a memorable callsign is preferred over long UUIDs'\n        },\n        externalId: {\n          type: 'string',\n          description: 'External ID for the resource (e.g., a workflow ID from an external system)'\n        },\n        labels: {\n          type: 'object',\n          description: 'Arbitrary key-value pairs for categorization and filtering\\n Examples: {\"environment\": \"production\", \"team\": \"platform\", \"version\": \"v2\"}',\n          additionalProperties: true\n        },\n        name: {\n          type: 'string',\n          description: 'Human-readable name for the resource (e.g., \"Customer Support Agent\", \"Email Tool\")\\n Required for resources that users interact with directly'\n        },\n        workspaceId: {\n          type: 'string',\n          description: 'Workspace this resource belongs to for organizational grouping (UUID v7)'\n        }\n      }\n    },\n    tool_set_spec: {\n      type: 'object',\n      properties: {\n        adapter: {\n          type: 'object',\n          properties: {\n            http: {\n              type: 'object',\n              properties: {\n                baseUrl: {\n                  type: 'string'\n                },\n                headers: {\n                  type: 'object',\n                  additionalProperties: true\n                }\n              }\n            },\n            mcp: {\n              type: 'object',\n              properties: {\n                excludeTools: {\n                  type: 'object',\n                  properties: {\n                    contains: {\n                      type: 'string'\n                    },\n                    startsWith: {\n                      type: 'string'\n                    }\n                  }\n                },\n                headers: {\n                  type: 'object',\n                  additionalProperties: true\n                },\n                includeTools: {\n                  type: 'object',\n                  properties: {\n                    contains: {\n                      type: 'string'\n                    },\n                    startsWith: {\n                      type: 'string'\n                    }\n                  }\n                },\n                url: {\n                  type: 'string'\n                }\n              }\n            }\n          }\n        },\n        description: {\n          type: 'string'\n        },\n        status: {\n          type: 'integer'\n        }\n      }\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      metadata: {
        $ref: '#/$defs/resource_metadata',
      },
      spec: {
        $ref: '#/$defs/tool_set_spec',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: [],
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
      tool_set_spec: {
        type: 'object',
        properties: {
          adapter: {
            type: 'object',
            properties: {
              http: {
                type: 'object',
                properties: {
                  baseUrl: {
                    type: 'string',
                  },
                  headers: {
                    type: 'object',
                    additionalProperties: true,
                  },
                },
              },
              mcp: {
                type: 'object',
                properties: {
                  excludeTools: {
                    type: 'object',
                    properties: {
                      contains: {
                        type: 'string',
                      },
                      startsWith: {
                        type: 'string',
                      },
                    },
                  },
                  headers: {
                    type: 'object',
                    additionalProperties: true,
                  },
                  includeTools: {
                    type: 'object',
                    properties: {
                      contains: {
                        type: 'string',
                      },
                      startsWith: {
                        type: 'string',
                      },
                    },
                  },
                  url: {
                    type: 'string',
                  },
                },
              },
            },
          },
          description: {
            type: 'string',
          },
          status: {
            type: 'integer',
          },
        },
      },
    },
  },
  annotations: {},
};

export const handler = async (client: Cadenya, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.toolSets.create(body)));
};

export default { metadata, tool, handler };
