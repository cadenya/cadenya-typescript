// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'cadenya-mcp-server/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Cadenya from 'cadenya';

export const metadata: Metadata = {
  resource: 'objectives',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/v1/objectives',
  operationId: 'ObjectiveService_CreateObjective',
};

export const tool: Tool = {
  name: 'create_objectives',
  description: 'Creates a new objective in the workspace',
  inputSchema: {
    type: 'object',
    properties: {
      agentId: {
        type: 'string',
      },
      metadata: {
        $ref: '#/$defs/operation_metadata',
      },
      spec: {
        $ref: '#/$defs/objective_spec',
      },
    },
    required: [],
    $defs: {
      operation_metadata: {
        type: 'object',
        description: 'Metadata for ephemeral operations and activities (e.g., objectives, executions, runs)',
        properties: {
          id: {
            type: 'string',
            description: 'Unique identifier for the operation (UUID v7)',
          },
          accountId: {
            type: 'string',
            description: 'Account this operation belongs to for multi-tenant isolation (UUID v7)',
          },
          actorId: {
            type: 'string',
            description: 'ID of the actor (user or service account) that initiated this operation (UUID v7)',
          },
          createdAt: {
            type: 'string',
            description:
              'Timestamp when this operation was created\n UUID v7 includes timestamp information, but this explicit field enables easier querying',
            format: 'date-time',
          },
          externalId: {
            type: 'string',
            description: 'External ID for the operation (e.g., a workflow ID from an external system)',
          },
          labels: {
            type: 'object',
            description:
              'Arbitrary key-value pairs for categorization and filtering\n Examples: {"priority": "high", "source": "api", "workflow": "onboarding"}',
            additionalProperties: true,
          },
          workspaceId: {
            type: 'string',
            description: 'Workspace this operation belongs to for organizational grouping (UUID v7)',
          },
        },
      },
      objective_spec: {
        type: 'object',
        properties: {
          agent: {
            $ref: '#/$defs/agent',
          },
          callbackUrl: {
            type: 'string',
          },
          documents: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                content: {
                  type: 'string',
                },
                contentType: {
                  type: 'string',
                },
              },
            },
          },
          objective: {
            type: 'string',
          },
          parentObjectiveId: {
            type: 'string',
          },
          promptIds: {
            type: 'array',
            description:
              "prompt_ids can be an empty array on create, and the agent's prompts will be used to create assign the system prompt",
            items: {
              type: 'string',
            },
          },
          secrets: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                },
                value: {
                  type: 'string',
                },
              },
            },
          },
          systemPrompt: {
            type: 'string',
            description: "system_prompt is read-only, and is set by the agent's prompts",
          },
        },
      },
      agent: {
        type: 'object',
        description: 'Agent resource',
        properties: {
          metadata: {
            $ref: '#/$defs/resource_metadata',
          },
          spec: {
            $ref: '#/$defs/agent_spec',
          },
        },
      },
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
      agent_spec: {
        type: 'object',
        description: 'Agent specification (user-provided configuration)',
        properties: {
          agentTools: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                toolId: {
                  type: 'string',
                },
                toolMetadata: {
                  $ref: '#/$defs/resource_metadata',
                },
                toolSetId: {
                  type: 'string',
                },
                toolSetMetadata: {
                  $ref: '#/$defs/resource_metadata',
                },
              },
            },
          },
          constraints: {
            type: 'object',
            properties: {
              maxSubObjectives: {
                type: 'integer',
                description: 'The maximum number of sub-objectives that can be created. 0 means no limit.',
              },
              maxToolCalls: {
                type: 'integer',
                description: 'The maximum number of tool calls that can be made. 0 means no limit.',
              },
            },
          },
          description: {
            type: 'string',
            description: "Description of the agent's purpose",
          },
          status: {
            type: 'integer',
            description: 'Status of the agent',
          },
          toolSelection: {
            type: 'object',
            properties: {
              assignedTools: {
                type: 'object',
                description:
                  'AssignedTools is used to indicate that the agent should only use the tools/tool sets that are explicitly assigned to it.\n Allow discovery is used when the agent thinks it needs to discover more tools.',
                properties: {
                  allowDiscovery: {
                    type: 'boolean',
                  },
                },
              },
              autoDiscovery: {
                type: 'object',
                description:
                  'AutoDiscovery is used to indicate that the agent should automatically discover tools that are not explicitly assigned to it.\n Max tools is the maximum number of tools that can be discovered.\n Hints are optional hints for tool search. These are used in conjunction with the context-aware tool search and can help select the best tools for the task.',
                properties: {
                  hints: {
                    type: 'array',
                    items: {
                      type: 'string',
                    },
                  },
                  maxTools: {
                    type: 'integer',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  annotations: {},
};

export const handler = async (client: Cadenya, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await client.objectives.create(body));
};

export default { metadata, tool, handler };
