// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'cadenya-mcp-server/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Cadenya from 'cadenya';

export const metadata: Metadata = {
  resource: 'tool_sets',
  operation: 'write',
  tags: [],
  httpMethod: 'delete',
  httpPath: '/v1/tool_sets/{id}',
  operationId: 'ToolService_DeleteToolSet',
};

export const tool: Tool = {
  name: 'delete_tool_sets',
  description: 'Deletes a tool set in the workspace',
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
    idempotentHint: true,
  },
};

export const handler = async (client: Cadenya, args: Record<string, unknown> | undefined) => {
  const { id, ...body } = args as any;
  const response = await client.toolSets.delete(id).asResponse();
  return asTextContentResult(await response.text());
};

export default { metadata, tool, handler };
