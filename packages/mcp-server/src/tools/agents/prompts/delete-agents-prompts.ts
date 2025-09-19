// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'cadenya-mcp-server/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Cadenya from 'cadenya';

export const metadata: Metadata = {
  resource: 'agents.prompts',
  operation: 'write',
  tags: [],
  httpMethod: 'delete',
  httpPath: '/v1/agents/{agentId}/prompts/{id}',
  operationId: 'PromptService_DeletePrompt',
};

export const tool: Tool = {
  name: 'delete_agents_prompts',
  description: 'Deletes a prompt from an agent',
  inputSchema: {
    type: 'object',
    properties: {
      agentId: {
        type: 'string',
      },
      id: {
        type: 'string',
      },
    },
    required: ['agentId', 'id'],
  },
  annotations: {
    idempotentHint: true,
  },
};

export const handler = async (client: Cadenya, args: Record<string, unknown> | undefined) => {
  const { id, ...body } = args as any;
  const response = await client.agents.prompts.delete(id, body).asResponse();
  return asTextContentResult(await response.text());
};

export default { metadata, tool, handler };
