// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'cadenya-mcp-server/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Cadenya from 'cadenya';

export const metadata: Metadata = {
  resource: 'tool_sets.tools',
  operation: 'write',
  tags: [],
  httpMethod: 'delete',
  httpPath: '/v1/tool_sets/{toolSetId}/tools/{id}',
  operationId: 'ToolService_DeleteTool',
};

export const tool: Tool = {
  name: 'delete_tool_sets_tools',
  description: 'Deletes a tool in the tool set',
  inputSchema: {
    type: 'object',
    properties: {
      toolSetId: {
        type: 'string',
      },
      id: {
        type: 'string',
      },
    },
    required: ['toolSetId', 'id'],
  },
  annotations: {
    idempotentHint: true,
  },
};

export const handler = async (client: Cadenya, args: Record<string, unknown> | undefined) => {
  const { id, ...body } = args as any;
  const response = await client.toolSets.tools.delete(id, body).asResponse();
  return asTextContentResult(await response.text());
};

export default { metadata, tool, handler };
