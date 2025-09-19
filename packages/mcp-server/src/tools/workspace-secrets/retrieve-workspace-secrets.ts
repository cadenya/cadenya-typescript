// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'cadenya-mcp-server/filtering';
import { Metadata, asTextContentResult } from 'cadenya-mcp-server/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Cadenya from 'cadenya';

export const metadata: Metadata = {
  resource: 'workspace_secrets',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/v1/workspace_secrets/{id}',
  operationId: 'WorkspaceSecretService_GetWorkspaceSecret',
};

export const tool: Tool = {
  name: 'retrieve_workspace_secrets',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nRetrieves a workspace secret by ID from the workspace\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/workspace_secret',\n  $defs: {\n    workspace_secret: {\n      type: 'object',\n      properties: {\n        metadata: {\n          $ref: '#/$defs/resource_metadata'\n        },\n        spec: {\n          $ref: '#/$defs/workspace_secret_spec'\n        }\n      }\n    },\n    resource_metadata: {\n      type: 'object',\n      description: 'Standard metadata for persistent, named resources (e.g., agents, tools, prompts)',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'Unique identifier for the resource (UUID v7)'\n        },\n        accountId: {\n          type: 'string',\n          description: 'Account this resource belongs to for multi-tenant isolation (UUID v7)'\n        },\n        actorId: {\n          type: 'string',\n          description: 'ID of the actor (user or service account) that created or last modified this resource (UUID v7)'\n        },\n        callsign: {\n          type: 'string',\n          description: 'Optional short identifier for quick reference (e.g., \"CSA-1\", \"email-v2\")\\n Useful for agents where a memorable callsign is preferred over long UUIDs'\n        },\n        externalId: {\n          type: 'string',\n          description: 'External ID for the resource (e.g., a workflow ID from an external system)'\n        },\n        labels: {\n          type: 'object',\n          description: 'Arbitrary key-value pairs for categorization and filtering\\n Examples: {\"environment\": \"production\", \"team\": \"platform\", \"version\": \"v2\"}',\n          additionalProperties: true\n        },\n        name: {\n          type: 'string',\n          description: 'Human-readable name for the resource (e.g., \"Customer Support Agent\", \"Email Tool\")\\n Required for resources that users interact with directly'\n        },\n        workspaceId: {\n          type: 'string',\n          description: 'Workspace this resource belongs to for organizational grouping (UUID v7)'\n        }\n      }\n    },\n    workspace_secret_spec: {\n      type: 'object',\n      properties: {\n        name: {\n          type: 'string'\n        },\n        value: {\n          type: 'string'\n        }\n      }\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['id'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Cadenya, args: Record<string, unknown> | undefined) => {
  const { id, jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.workspaceSecrets.retrieve(id)));
};

export default { metadata, tool, handler };
