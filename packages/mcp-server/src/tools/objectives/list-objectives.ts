// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'cadenya-mcp-server/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Cadenya from 'cadenya';

export const metadata: Metadata = {
  resource: 'objectives',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/v1/objectives',
  operationId: 'ObjectiveService_ListObjectives',
};

export const tool: Tool = {
  name: 'list_objectives',
  description: 'Lists all objectives in the workspace',
  inputSchema: {
    type: 'object',
    properties: {
      actorId: {
        type: 'string',
      },
      agentId: {
        type: 'string',
        description: 'Agent ID for filtering',
      },
      cursor: {
        type: 'string',
        description: 'Pagination cursor from previous response',
      },
      limit: {
        type: 'integer',
        description: 'Maximum number of results to return',
      },
      parentObjectiveId: {
        type: 'string',
        description: 'Optional filters',
      },
      sortOrder: {
        type: 'string',
        description: 'Sort order for results (asc or desc by creation time)',
      },
      state: {
        type: 'integer',
      },
    },
    required: [],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Cadenya, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  const response = await client.objectives.list(body).asResponse();
  return asTextContentResult(await response.json());
};

export default { metadata, tool, handler };
