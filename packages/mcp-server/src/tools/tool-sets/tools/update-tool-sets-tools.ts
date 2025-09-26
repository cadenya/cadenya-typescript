// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'cadenya-mcp-server/filtering';
import { Metadata, asTextContentResult } from 'cadenya-mcp-server/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Cadenya from 'cadenya';

export const metadata: Metadata = {
  resource: 'tool_sets.tools',
  operation: 'write',
  tags: [],
  httpMethod: 'put',
  httpPath: '/v1/tool_sets/{toolSetId}/tools/{id}',
  operationId: 'ToolService_UpdateTool',
};

export const tool: Tool = {
  name: 'update_tool_sets_tools',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nUpdates a tool in the tool set\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/tool',\n  $defs: {\n    tool: {\n      type: 'object',\n      properties: {\n        metadata: {\n          $ref: '#/$defs/resource_metadata'\n        },\n        spec: {\n          $ref: '#/$defs/tool_spec'\n        }\n      }\n    },\n    resource_metadata: {\n      type: 'object',\n      description: 'Standard metadata for persistent, named resources (e.g., agents, tools, prompts)',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'Unique identifier for the resource (UUID v7)'\n        },\n        accountId: {\n          type: 'string',\n          description: 'Account this resource belongs to for multi-tenant isolation (UUID v7)'\n        },\n        actorId: {\n          type: 'string',\n          description: 'ID of the actor (user or service account) that created or last modified this resource (UUID v7)'\n        },\n        callsign: {\n          type: 'string',\n          description: 'Optional short identifier for quick reference (e.g., \"CSA-1\", \"email-v2\")\\n Useful for agents where a memorable callsign is preferred over long UUIDs'\n        },\n        externalId: {\n          type: 'string',\n          description: 'External ID for the resource (e.g., a workflow ID from an external system)'\n        },\n        labels: {\n          type: 'object',\n          description: 'Arbitrary key-value pairs for categorization and filtering\\n Examples: {\"environment\": \"production\", \"team\": \"platform\", \"version\": \"v2\"}',\n          additionalProperties: true\n        },\n        name: {\n          type: 'string',\n          description: 'Human-readable name for the resource (e.g., \"Customer Support Agent\", \"Email Tool\")\\n Required for resources that users interact with directly'\n        },\n        workspaceId: {\n          type: 'string',\n          description: 'Workspace this resource belongs to for organizational grouping (UUID v7)'\n        }\n      }\n    },\n    tool_spec: {\n      type: 'object',\n      properties: {\n        config: {\n          type: 'object',\n          description: 'Config defines the adapter to use for the tool.\\n This is used to determine how the tool is called.\\n For example, if the tool is an HTTP tool, the adapter will be Http.\\n If the tool is an inline tool, the adapter will be Inline.',\n          properties: {\n            http: {\n              type: 'object',\n              properties: {\n                headers: {\n                  type: 'object',\n                  additionalProperties: true\n                },\n                path: {\n                  type: 'string'\n                },\n                query: {\n                  type: 'string'\n                },\n                requestBodyContentType: {\n                  type: 'string'\n                },\n                requestBodyTemplate: {\n                  type: 'string',\n                  description: 'These are only used when the request method is a POST, PUT, or PATCH'\n                },\n                requestMethod: {\n                  type: 'integer'\n                }\n              }\n            },\n            mcp: {\n              type: 'object',\n              properties: {\n                toolName: {\n                  type: 'string'\n                }\n              }\n            }\n          }\n        },\n        contentFilter: {\n          type: 'object',\n          properties: {\n            jq: {\n              type: 'string'\n            },\n            regex: {\n              type: 'string'\n            }\n          }\n        },\n        description: {\n          type: 'string'\n        },\n        indexContent: {\n          type: 'string'\n        },\n        name: {\n          type: 'string'\n        },\n        parameters: {\n          type: 'object',\n          additionalProperties: true\n        },\n        requiresApproval: {\n          type: 'boolean'\n        },\n        status: {\n          type: 'integer'\n        },\n        toolSetId: {\n          type: 'string'\n        }\n      }\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      toolSetId: {
        type: 'string',
      },
      id: {
        type: 'string',
      },
      metadata: {
        $ref: '#/$defs/resource_metadata',
      },
      spec: {
        $ref: '#/$defs/tool_spec',
      },
      updateMask: {
        type: 'string',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['toolSetId', 'id'],
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
      tool_spec: {
        type: 'object',
        properties: {
          config: {
            type: 'object',
            description:
              'Config defines the adapter to use for the tool.\n This is used to determine how the tool is called.\n For example, if the tool is an HTTP tool, the adapter will be Http.\n If the tool is an inline tool, the adapter will be Inline.',
            properties: {
              http: {
                type: 'object',
                properties: {
                  headers: {
                    type: 'object',
                    additionalProperties: true,
                  },
                  path: {
                    type: 'string',
                  },
                  query: {
                    type: 'string',
                  },
                  requestBodyContentType: {
                    type: 'string',
                  },
                  requestBodyTemplate: {
                    type: 'string',
                    description: 'These are only used when the request method is a POST, PUT, or PATCH',
                  },
                  requestMethod: {
                    type: 'integer',
                  },
                },
              },
              mcp: {
                type: 'object',
                properties: {
                  toolName: {
                    type: 'string',
                  },
                },
              },
            },
          },
          contentFilter: {
            type: 'object',
            properties: {
              jq: {
                type: 'string',
              },
              regex: {
                type: 'string',
              },
            },
          },
          description: {
            type: 'string',
          },
          indexContent: {
            type: 'string',
          },
          name: {
            type: 'string',
          },
          parameters: {
            type: 'object',
            additionalProperties: true,
          },
          requiresApproval: {
            type: 'boolean',
          },
          status: {
            type: 'integer',
          },
          toolSetId: {
            type: 'string',
          },
        },
      },
    },
  },
  annotations: {
    idempotentHint: true,
  },
};

export const handler = async (client: Cadenya, args: Record<string, unknown> | undefined) => {
  const { id, jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.toolSets.tools.update(id, body)));
};

export default { metadata, tool, handler };
