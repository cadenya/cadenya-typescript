// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'cadenya-mcp-server/filtering';
import { Metadata, asTextContentResult } from 'cadenya-mcp-server/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Cadenya from 'cadenya';

export const metadata: Metadata = {
  resource: 'tool_sets.tools',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/v1/tool_sets/{toolSetId}/tools',
  operationId: 'ToolService_ListTools',
};

export const tool: Tool = {
  name: 'list_tool_sets_tools',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nLists all tools in the tool set\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    items: {\n      type: 'array',\n      items: {\n        $ref: '#/$defs/tool'\n      }\n    },\n    pagination: {\n      $ref: '#/$defs/page'\n    }\n  },\n  $defs: {\n    tool: {\n      type: 'object',\n      properties: {\n        metadata: {\n          $ref: '#/$defs/resource_metadata'\n        },\n        spec: {\n          $ref: '#/$defs/tool_spec'\n        }\n      }\n    },\n    resource_metadata: {\n      type: 'object',\n      description: 'Standard metadata for persistent, named resources (e.g., agents, tools, prompts)',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'Unique identifier for the resource (UUID v7)'\n        },\n        accountId: {\n          type: 'string',\n          description: 'Account this resource belongs to for multi-tenant isolation (UUID v7)'\n        },\n        actorId: {\n          type: 'string',\n          description: 'ID of the actor (user or service account) that created or last modified this resource (UUID v7)'\n        },\n        callsign: {\n          type: 'string',\n          description: 'Optional short identifier for quick reference (e.g., \"CSA-1\", \"email-v2\")\\n Useful for agents where a memorable callsign is preferred over long UUIDs'\n        },\n        externalId: {\n          type: 'string',\n          description: 'External ID for the resource (e.g., a workflow ID from an external system)'\n        },\n        labels: {\n          type: 'object',\n          description: 'Arbitrary key-value pairs for categorization and filtering\\n Examples: {\"environment\": \"production\", \"team\": \"platform\", \"version\": \"v2\"}',\n          additionalProperties: true\n        },\n        name: {\n          type: 'string',\n          description: 'Human-readable name for the resource (e.g., \"Customer Support Agent\", \"Email Tool\")\\n Required for resources that users interact with directly'\n        },\n        workspaceId: {\n          type: 'string',\n          description: 'Workspace this resource belongs to for organizational grouping (UUID v7)'\n        }\n      }\n    },\n    tool_spec: {\n      type: 'object',\n      properties: {\n        config: {\n          type: 'object',\n          description: 'Config defines the adapter to use for the tool.\\n This is used to determine how the tool is called.\\n For example, if the tool is an HTTP tool, the adapter will be Http.\\n If the tool is an inline tool, the adapter will be Inline.',\n          properties: {\n            http: {\n              type: 'object',\n              properties: {\n                headers: {\n                  type: 'object',\n                  additionalProperties: true\n                },\n                path: {\n                  type: 'string'\n                },\n                query: {\n                  type: 'string'\n                },\n                requestBodyContentType: {\n                  type: 'string'\n                },\n                requestBodyTemplate: {\n                  type: 'string',\n                  description: 'These are only used when the request method is a POST, PUT, or PATCH'\n                },\n                requestMethod: {\n                  type: 'integer'\n                }\n              }\n            },\n            mcp: {\n              type: 'object',\n              properties: {\n                toolName: {\n                  type: 'string'\n                }\n              }\n            }\n          }\n        },\n        contentFilter: {\n          type: 'object',\n          properties: {\n            jq: {\n              type: 'string'\n            },\n            regex: {\n              type: 'string'\n            }\n          }\n        },\n        description: {\n          type: 'string'\n        },\n        indexContent: {\n          type: 'string'\n        },\n        name: {\n          type: 'string'\n        },\n        parameters: {\n          type: 'object',\n          additionalProperties: true\n        },\n        requiresApproval: {\n          type: 'boolean'\n        },\n        status: {\n          type: 'integer'\n        },\n        toolSetId: {\n          type: 'string'\n        }\n      }\n    },\n    page: {\n      type: 'object',\n      properties: {\n        nextCursor: {\n          type: 'string'\n        },\n        total: {\n          type: 'integer'\n        }\n      }\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      toolSetId: {
        type: 'string',
      },
      cursor: {
        type: 'string',
        description: 'Pagination cursor from previous response',
      },
      limit: {
        type: 'integer',
        description: 'Maximum number of results to return',
      },
      sortOrder: {
        type: 'string',
        description: 'Sort order for results (asc or desc by creation time)',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['toolSetId'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Cadenya, args: Record<string, unknown> | undefined) => {
  const { toolSetId, jq_filter, ...body } = args as any;
  const response = await client.toolSets.tools.list(toolSetId, body).asResponse();
  return asTextContentResult(await maybeFilter(jq_filter, await response.json()));
};

export default { metadata, tool, handler };
