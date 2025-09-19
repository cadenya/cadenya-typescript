// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'cadenya-mcp-server/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Cadenya from 'cadenya';

export const metadata: Metadata = {
  resource: 'objectives',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/v1/objectives/{id}',
  operationId: 'ObjectiveService_GetObjective',
};

export const tool: Tool = {
  name: 'retrieve_objectives',
  description: 'Retrieves an objective by ID from the workspace',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
    },
    required: ['id'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Cadenya, args: Record<string, unknown> | undefined) => {
  const { id, ...body } = args as any;
  return asTextContentResult(await client.objectives.retrieve(id));
};

export default { metadata, tool, handler };
