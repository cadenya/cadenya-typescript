// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'cadenya-mcp-server/filtering';
import { Metadata, asTextContentResult } from 'cadenya-mcp-server/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Cadenya from 'cadenya';

export const metadata: Metadata = {
  resource: 'objectives.events',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/v1/objectives/{objectiveId}/events',
  operationId: 'ObjectiveService_ListObjectiveEvents',
};

export const tool: Tool = {
  name: 'list_objectives_events',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nLists all events for an objective\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    items: {\n      type: 'array',\n      items: {\n        $ref: '#/$defs/objective_event'\n      }\n    },\n    pagination: {\n      $ref: '#/$defs/page'\n    }\n  },\n  $defs: {\n    objective_event: {\n      type: 'object',\n      properties: {\n        metadata: {\n          $ref: '#/$defs/operation_metadata'\n        },\n        spec: {\n          $ref: '#/$defs/objective_event_spec'\n        }\n      }\n    },\n    operation_metadata: {\n      type: 'object',\n      description: 'Metadata for ephemeral operations and activities (e.g., objectives, executions, runs)',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'Unique identifier for the operation (UUID v7)'\n        },\n        accountId: {\n          type: 'string',\n          description: 'Account this operation belongs to for multi-tenant isolation (UUID v7)'\n        },\n        actorId: {\n          type: 'string',\n          description: 'ID of the actor (user or service account) that initiated this operation (UUID v7)'\n        },\n        createdAt: {\n          type: 'string',\n          description: 'Timestamp when this operation was created\\n UUID v7 includes timestamp information, but this explicit field enables easier querying',\n          format: 'date-time'\n        },\n        externalId: {\n          type: 'string',\n          description: 'External ID for the operation (e.g., a workflow ID from an external system)'\n        },\n        labels: {\n          type: 'object',\n          description: 'Arbitrary key-value pairs for categorization and filtering\\n Examples: {\"priority\": \"high\", \"source\": \"api\", \"workflow\": \"onboarding\"}',\n          additionalProperties: true\n        },\n        workspaceId: {\n          type: 'string',\n          description: 'Workspace this operation belongs to for organizational grouping (UUID v7)'\n        }\n      }\n    },\n    objective_event_spec: {\n      type: 'object',\n      properties: {\n        id: {\n          type: 'string'\n        },\n        actorId: {\n          type: 'string'\n        },\n        createdAt: {\n          type: 'string',\n          format: 'date-time'\n        },\n        message: {\n          type: 'object',\n          description: 'Message for a chat completion',\n          properties: {\n            content: {\n              type: 'string'\n            },\n            role: {\n              type: 'integer'\n            }\n          }\n        },\n        objectiveId: {\n          type: 'string'\n        },\n        subObjective: {\n          type: 'object',\n          description: 'Sub-objective branching',\n          properties: {\n            rationale: {\n              type: 'string'\n            },\n            subObjectiveId: {\n              type: 'string'\n            }\n          }\n        },\n        toolApproval: {\n          type: 'object',\n          description: 'Human approval events',\n          properties: {\n            reason: {\n              type: 'string'\n            },\n            toolCallId: {\n              type: 'string'\n            }\n          }\n        },\n        toolCall: {\n          type: 'object',\n          description: 'Tool call that the LLM generated for us to call',\n          properties: {\n            arguments: {\n              type: 'object',\n              description: 'The arguments sent to the tool',\n              additionalProperties: true\n            },\n            error: {\n              type: 'object',\n              description: 'Error details when status = FAILED',\n              properties: {\n                code: {\n                  type: 'string'\n                },\n                message: {\n                  type: 'string'\n                }\n              }\n            },\n            externalToolCallId: {\n              type: 'string',\n              description: 'The ID of the tool call that the LLM generated for us to call'\n            },\n            result: {\n              type: 'string',\n              description: 'The result from the tool execution'\n            },\n            status: {\n              type: 'integer',\n              description: 'Current status of the tool call'\n            },\n            toolId: {\n              type: 'string',\n              description: 'A reference to the tool that was called'\n            }\n          }\n        },\n        toolRejection: {\n          type: 'object',\n          properties: {\n            alternative: {\n              type: 'string'\n            },\n            reason: {\n              type: 'string'\n            },\n            toolCallId: {\n              type: 'string'\n            }\n          }\n        }\n      }\n    },\n    page: {\n      type: 'object',\n      properties: {\n        nextCursor: {\n          type: 'string'\n        },\n        total: {\n          type: 'integer'\n        }\n      }\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      objectiveId: {
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
    required: ['objectiveId'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Cadenya, args: Record<string, unknown> | undefined) => {
  const { objectiveId, jq_filter, ...body } = args as any;
  const response = await client.objectives.events.list(objectiveId, body).asResponse();
  return asTextContentResult(await maybeFilter(jq_filter, await response.json()));
};

export default { metadata, tool, handler };
