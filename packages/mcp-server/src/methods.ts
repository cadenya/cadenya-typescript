// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { McpOptions } from './options';

export type SdkMethod = {
  clientCallName: string;
  fullyQualifiedName: string;
  httpMethod?: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'query';
  httpPath?: string;
};

export const sdkMethods: SdkMethod[] = [
  {
    clientCallName: 'client.account.retrieve',
    fullyQualifiedName: 'account.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/account',
  },
  {
    clientCallName: 'client.account.rotateWebhookSigningKey',
    fullyQualifiedName: 'account.rotateWebhookSigningKey',
    httpMethod: 'post',
    httpPath: '/v1/account/rotate_webhook_signing_key',
  },
  {
    clientCallName: 'client.agents.create',
    fullyQualifiedName: 'agents.create',
    httpMethod: 'post',
    httpPath: '/v1/workspaces/{workspaceId}/agents',
  },
  {
    clientCallName: 'client.agents.retrieve',
    fullyQualifiedName: 'agents.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/workspaces/{workspaceId}/agents/{id}',
  },
  {
    clientCallName: 'client.agents.update',
    fullyQualifiedName: 'agents.update',
    httpMethod: 'patch',
    httpPath: '/v1/workspaces/{workspaceId}/agents/{id}',
  },
  {
    clientCallName: 'client.agents.list',
    fullyQualifiedName: 'agents.list',
    httpMethod: 'get',
    httpPath: '/v1/workspaces/{workspaceId}/agents',
  },
  {
    clientCallName: 'client.agents.delete',
    fullyQualifiedName: 'agents.delete',
    httpMethod: 'delete',
    httpPath: '/v1/workspaces/{workspaceId}/agents/{id}',
  },
  {
    clientCallName: 'client.agents.feedback.list',
    fullyQualifiedName: 'agents.feedback.list',
    httpMethod: 'get',
    httpPath: '/v1/workspaces/{workspaceId}/agents/{agentId}/feedback',
  },
  {
    clientCallName: 'client.agents.webhookDeliveries.list',
    fullyQualifiedName: 'agents.webhookDeliveries.list',
    httpMethod: 'get',
    httpPath: '/v1/workspaces/{workspaceId}/agents/{agentId}/webhook_deliveries',
  },
  {
    clientCallName: 'client.agents.variations.create',
    fullyQualifiedName: 'agents.variations.create',
    httpMethod: 'post',
    httpPath: '/v1/workspaces/{workspaceId}/agents/{agentId}/variations',
  },
  {
    clientCallName: 'client.agents.variations.retrieve',
    fullyQualifiedName: 'agents.variations.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/workspaces/{workspaceId}/agents/{agentId}/variations/{id}',
  },
  {
    clientCallName: 'client.agents.variations.update',
    fullyQualifiedName: 'agents.variations.update',
    httpMethod: 'patch',
    httpPath: '/v1/workspaces/{workspaceId}/agents/{agentId}/variations/{id}',
  },
  {
    clientCallName: 'client.agents.variations.list',
    fullyQualifiedName: 'agents.variations.list',
    httpMethod: 'get',
    httpPath: '/v1/workspaces/{workspaceId}/agents/{agentId}/variations',
  },
  {
    clientCallName: 'client.agents.variations.delete',
    fullyQualifiedName: 'agents.variations.delete',
    httpMethod: 'delete',
    httpPath: '/v1/workspaces/{workspaceId}/agents/{agentId}/variations/{id}',
  },
  {
    clientCallName: 'client.agents.variations.addAssignment',
    fullyQualifiedName: 'agents.variations.addAssignment',
    httpMethod: 'post',
    httpPath: '/v1/workspaces/{workspaceId}/agents/{agentId}/variations/{variationId}/assignments',
  },
  {
    clientCallName: 'client.agents.variations.addMemoryLayer',
    fullyQualifiedName: 'agents.variations.addMemoryLayer',
    httpMethod: 'post',
    httpPath:
      '/v1/workspaces/{workspaceId}/agents/{agentId}/variations/{variationId}/memory_layer_assignments',
  },
  {
    clientCallName: 'client.agents.variations.removeAssignment',
    fullyQualifiedName: 'agents.variations.removeAssignment',
    httpMethod: 'delete',
    httpPath: '/v1/workspaces/{workspaceId}/agents/{agentId}/variations/{variationId}/assignments/{id}',
  },
  {
    clientCallName: 'client.agents.variations.removeMemoryLayer',
    fullyQualifiedName: 'agents.variations.removeMemoryLayer',
    httpMethod: 'delete',
    httpPath:
      '/v1/workspaces/{workspaceId}/agents/{agentId}/variations/{variationId}/memory_layer_assignments/{id}',
  },
  {
    clientCallName: 'client.agents.variations.updateMemoryLayer',
    fullyQualifiedName: 'agents.variations.updateMemoryLayer',
    httpMethod: 'patch',
    httpPath:
      '/v1/workspaces/{workspaceId}/agents/{agentId}/variations/{variationId}/memory_layer_assignments/{id}',
  },
  {
    clientCallName: 'client.agents.schedules.create',
    fullyQualifiedName: 'agents.schedules.create',
    httpMethod: 'post',
    httpPath: '/v1/workspaces/{workspaceId}/agents/{agentId}/schedules',
  },
  {
    clientCallName: 'client.agents.schedules.retrieve',
    fullyQualifiedName: 'agents.schedules.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/workspaces/{workspaceId}/agents/{agentId}/schedules/{id}',
  },
  {
    clientCallName: 'client.agents.schedules.update',
    fullyQualifiedName: 'agents.schedules.update',
    httpMethod: 'patch',
    httpPath: '/v1/workspaces/{workspaceId}/agents/{agentId}/schedules/{id}',
  },
  {
    clientCallName: 'client.agents.schedules.list',
    fullyQualifiedName: 'agents.schedules.list',
    httpMethod: 'get',
    httpPath: '/v1/workspaces/{workspaceId}/agents/{agentId}/schedules',
  },
  {
    clientCallName: 'client.agents.schedules.delete',
    fullyQualifiedName: 'agents.schedules.delete',
    httpMethod: 'delete',
    httpPath: '/v1/workspaces/{workspaceId}/agents/{agentId}/schedules/{id}',
  },
  {
    clientCallName: 'client.objectives.create',
    fullyQualifiedName: 'objectives.create',
    httpMethod: 'post',
    httpPath: '/v1/workspaces/{workspaceId}/objectives',
  },
  {
    clientCallName: 'client.objectives.retrieve',
    fullyQualifiedName: 'objectives.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/workspaces/{workspaceId}/objectives/{id}',
  },
  {
    clientCallName: 'client.objectives.list',
    fullyQualifiedName: 'objectives.list',
    httpMethod: 'get',
    httpPath: '/v1/workspaces/{workspaceId}/objectives',
  },
  {
    clientCallName: 'client.objectives.cancel',
    fullyQualifiedName: 'objectives.cancel',
    httpMethod: 'post',
    httpPath: '/v1/workspaces/{workspaceId}/objectives/{objectiveId}/cancel',
  },
  {
    clientCallName: 'client.objectives.compact',
    fullyQualifiedName: 'objectives.compact',
    httpMethod: 'post',
    httpPath: '/v1/workspaces/{workspaceId}/objectives/{objectiveId}/compact',
  },
  {
    clientCallName: 'client.objectives.continue',
    fullyQualifiedName: 'objectives.continue',
    httpMethod: 'post',
    httpPath: '/v1/workspaces/{workspaceId}/objectives/{objectiveId}/continue',
  },
  {
    clientCallName: 'client.objectives.listContextWindows',
    fullyQualifiedName: 'objectives.listContextWindows',
    httpMethod: 'get',
    httpPath: '/v1/workspaces/{workspaceId}/objectives/{objectiveId}/context_windows',
  },
  {
    clientCallName: 'client.objectives.listEvents',
    fullyQualifiedName: 'objectives.listEvents',
    httpMethod: 'get',
    httpPath: '/v1/workspaces/{workspaceId}/objectives/{objectiveId}/events',
  },
  {
    clientCallName: 'client.objectives.tools.list',
    fullyQualifiedName: 'objectives.tools.list',
    httpMethod: 'get',
    httpPath: '/v1/workspaces/{workspaceId}/objectives/{objectiveId}/tools',
  },
  {
    clientCallName: 'client.objectives.toolCalls.list',
    fullyQualifiedName: 'objectives.toolCalls.list',
    httpMethod: 'get',
    httpPath: '/v1/workspaces/{workspaceId}/objectives/{objectiveId}/tool_calls',
  },
  {
    clientCallName: 'client.objectives.toolCalls.approve',
    fullyQualifiedName: 'objectives.toolCalls.approve',
    httpMethod: 'put',
    httpPath: '/v1/workspaces/{workspaceId}/objectives/{objectiveId}/tool_calls/{toolCallId}/approve',
  },
  {
    clientCallName: 'client.objectives.toolCalls.deny',
    fullyQualifiedName: 'objectives.toolCalls.deny',
    httpMethod: 'put',
    httpPath: '/v1/workspaces/{workspaceId}/objectives/{objectiveId}/tool_calls/{toolCallId}/deny',
  },
  {
    clientCallName: 'client.objectives.tasks.retrieve',
    fullyQualifiedName: 'objectives.tasks.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/workspaces/{workspaceId}/objectives/{objectiveId}/tasks/{id}',
  },
  {
    clientCallName: 'client.objectives.tasks.list',
    fullyQualifiedName: 'objectives.tasks.list',
    httpMethod: 'get',
    httpPath: '/v1/workspaces/{workspaceId}/objectives/{objectiveId}/tasks',
  },
  {
    clientCallName: 'client.objectives.feedback.create',
    fullyQualifiedName: 'objectives.feedback.create',
    httpMethod: 'post',
    httpPath: '/v1/workspaces/{workspaceId}/objectives/{objectiveId}/feedback',
  },
  {
    clientCallName: 'client.objectives.feedback.list',
    fullyQualifiedName: 'objectives.feedback.list',
    httpMethod: 'get',
    httpPath: '/v1/workspaces/{workspaceId}/objectives/{objectiveId}/feedback',
  },
  {
    clientCallName: 'client.memoryLayers.create',
    fullyQualifiedName: 'memoryLayers.create',
    httpMethod: 'post',
    httpPath: '/v1/workspaces/{workspaceId}/memory_layers',
  },
  {
    clientCallName: 'client.memoryLayers.retrieve',
    fullyQualifiedName: 'memoryLayers.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/workspaces/{workspaceId}/memory_layers/{id}',
  },
  {
    clientCallName: 'client.memoryLayers.update',
    fullyQualifiedName: 'memoryLayers.update',
    httpMethod: 'patch',
    httpPath: '/v1/workspaces/{workspaceId}/memory_layers/{id}',
  },
  {
    clientCallName: 'client.memoryLayers.list',
    fullyQualifiedName: 'memoryLayers.list',
    httpMethod: 'get',
    httpPath: '/v1/workspaces/{workspaceId}/memory_layers',
  },
  {
    clientCallName: 'client.memoryLayers.delete',
    fullyQualifiedName: 'memoryLayers.delete',
    httpMethod: 'delete',
    httpPath: '/v1/workspaces/{workspaceId}/memory_layers/{id}',
  },
  {
    clientCallName: 'client.memoryLayers.entries.create',
    fullyQualifiedName: 'memoryLayers.entries.create',
    httpMethod: 'post',
    httpPath: '/v1/workspaces/{workspaceId}/memory_layers/{memoryLayerId}/entries',
  },
  {
    clientCallName: 'client.memoryLayers.entries.retrieve',
    fullyQualifiedName: 'memoryLayers.entries.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/workspaces/{workspaceId}/memory_layers/{memoryLayerId}/entries/{id}',
  },
  {
    clientCallName: 'client.memoryLayers.entries.update',
    fullyQualifiedName: 'memoryLayers.entries.update',
    httpMethod: 'patch',
    httpPath: '/v1/workspaces/{workspaceId}/memory_layers/{memoryLayerId}/entries/{id}',
  },
  {
    clientCallName: 'client.memoryLayers.entries.list',
    fullyQualifiedName: 'memoryLayers.entries.list',
    httpMethod: 'get',
    httpPath: '/v1/workspaces/{workspaceId}/memory_layers/{memoryLayerId}/entries',
  },
  {
    clientCallName: 'client.memoryLayers.entries.delete',
    fullyQualifiedName: 'memoryLayers.entries.delete',
    httpMethod: 'delete',
    httpPath: '/v1/workspaces/{workspaceId}/memory_layers/{memoryLayerId}/entries/{id}',
  },
  {
    clientCallName: 'client.uploads.create',
    fullyQualifiedName: 'uploads.create',
    httpMethod: 'post',
    httpPath: '/v1/workspaces/{workspaceId}/uploads',
  },
  {
    clientCallName: 'client.uploads.retrieve',
    fullyQualifiedName: 'uploads.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/workspaces/{workspaceId}/uploads/{id}',
  },
  {
    clientCallName: 'client.models.retrieve',
    fullyQualifiedName: 'models.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/workspaces/{workspaceId}/models/{id}',
  },
  {
    clientCallName: 'client.models.list',
    fullyQualifiedName: 'models.list',
    httpMethod: 'get',
    httpPath: '/v1/workspaces/{workspaceId}/models',
  },
  {
    clientCallName: 'client.models.setStatus',
    fullyQualifiedName: 'models.setStatus',
    httpMethod: 'put',
    httpPath: '/v1/workspaces/{workspaceId}/models/{id}/status',
  },
  {
    clientCallName: 'client.search.searchToolsOrToolSets',
    fullyQualifiedName: 'search.searchToolsOrToolSets',
    httpMethod: 'get',
    httpPath: '/v1/workspaces/{workspaceId}/search/tools_or_tool_sets',
  },
  {
    clientCallName: 'client.toolSets.create',
    fullyQualifiedName: 'toolSets.create',
    httpMethod: 'post',
    httpPath: '/v1/workspaces/{workspaceId}/tool_sets',
  },
  {
    clientCallName: 'client.toolSets.retrieve',
    fullyQualifiedName: 'toolSets.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/workspaces/{workspaceId}/tool_sets/{id}',
  },
  {
    clientCallName: 'client.toolSets.update',
    fullyQualifiedName: 'toolSets.update',
    httpMethod: 'put',
    httpPath: '/v1/workspaces/{workspaceId}/tool_sets/{id}',
  },
  {
    clientCallName: 'client.toolSets.list',
    fullyQualifiedName: 'toolSets.list',
    httpMethod: 'get',
    httpPath: '/v1/workspaces/{workspaceId}/tool_sets',
  },
  {
    clientCallName: 'client.toolSets.delete',
    fullyQualifiedName: 'toolSets.delete',
    httpMethod: 'delete',
    httpPath: '/v1/workspaces/{workspaceId}/tool_sets/{id}',
  },
  {
    clientCallName: 'client.toolSets.getOpenAPISpec',
    fullyQualifiedName: 'toolSets.getOpenAPISpec',
    httpMethod: 'get',
    httpPath: '/v1/workspaces/{workspaceId}/tool_sets/{toolSetId}/openapi_spec',
  },
  {
    clientCallName: 'client.toolSets.listEvents',
    fullyQualifiedName: 'toolSets.listEvents',
    httpMethod: 'get',
    httpPath: '/v1/workspaces/{workspaceId}/tool_sets/{toolSetId}/events',
  },
  {
    clientCallName: 'client.toolSets.tools.create',
    fullyQualifiedName: 'toolSets.tools.create',
    httpMethod: 'post',
    httpPath: '/v1/workspaces/{workspaceId}/tool_sets/{toolSetId}/tools',
  },
  {
    clientCallName: 'client.toolSets.tools.retrieve',
    fullyQualifiedName: 'toolSets.tools.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/workspaces/{workspaceId}/tool_sets/{toolSetId}/tools/{id}',
  },
  {
    clientCallName: 'client.toolSets.tools.update',
    fullyQualifiedName: 'toolSets.tools.update',
    httpMethod: 'put',
    httpPath: '/v1/workspaces/{workspaceId}/tool_sets/{toolSetId}/tools/{id}',
  },
  {
    clientCallName: 'client.toolSets.tools.list',
    fullyQualifiedName: 'toolSets.tools.list',
    httpMethod: 'get',
    httpPath: '/v1/workspaces/{workspaceId}/tool_sets/{toolSetId}/tools',
  },
  {
    clientCallName: 'client.toolSets.tools.delete',
    fullyQualifiedName: 'toolSets.tools.delete',
    httpMethod: 'delete',
    httpPath: '/v1/workspaces/{workspaceId}/tool_sets/{toolSetId}/tools/{id}',
  },
  {
    clientCallName: 'client.apiKeys.create',
    fullyQualifiedName: 'apiKeys.create',
    httpMethod: 'post',
    httpPath: '/v1/account/api_keys',
  },
  {
    clientCallName: 'client.apiKeys.retrieve',
    fullyQualifiedName: 'apiKeys.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/account/api_keys/{id}',
  },
  {
    clientCallName: 'client.apiKeys.update',
    fullyQualifiedName: 'apiKeys.update',
    httpMethod: 'patch',
    httpPath: '/v1/account/api_keys/{id}',
  },
  {
    clientCallName: 'client.apiKeys.list',
    fullyQualifiedName: 'apiKeys.list',
    httpMethod: 'get',
    httpPath: '/v1/account/api_keys',
  },
  {
    clientCallName: 'client.apiKeys.delete',
    fullyQualifiedName: 'apiKeys.delete',
    httpMethod: 'delete',
    httpPath: '/v1/account/api_keys/{id}',
  },
  {
    clientCallName: 'client.apiKeys.rotate',
    fullyQualifiedName: 'apiKeys.rotate',
    httpMethod: 'put',
    httpPath: '/v1/account/api_keys/{id}/rotate',
  },
  {
    clientCallName: 'client.apiKeys.access.list',
    fullyQualifiedName: 'apiKeys.access.list',
    httpMethod: 'get',
    httpPath: '/v1/account/api_keys/{id}/workspaces',
  },
  {
    clientCallName: 'client.apiKeys.access.add',
    fullyQualifiedName: 'apiKeys.access.add',
    httpMethod: 'post',
    httpPath: '/v1/account/api_keys/{id}/workspaces',
  },
  {
    clientCallName: 'client.apiKeys.access.remove',
    fullyQualifiedName: 'apiKeys.access.remove',
    httpMethod: 'delete',
    httpPath: '/v1/account/api_keys/{id}/workspaces/{workspaceId}',
  },
  {
    clientCallName: 'client.workspaceSecrets.create',
    fullyQualifiedName: 'workspaceSecrets.create',
    httpMethod: 'post',
    httpPath: '/v1/workspaces/{workspaceId}/workspace_secrets',
  },
  {
    clientCallName: 'client.workspaceSecrets.retrieve',
    fullyQualifiedName: 'workspaceSecrets.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/workspaces/{workspaceId}/workspace_secrets/{id}',
  },
  {
    clientCallName: 'client.workspaceSecrets.update',
    fullyQualifiedName: 'workspaceSecrets.update',
    httpMethod: 'patch',
    httpPath: '/v1/workspaces/{workspaceId}/workspace_secrets/{id}',
  },
  {
    clientCallName: 'client.workspaceSecrets.list',
    fullyQualifiedName: 'workspaceSecrets.list',
    httpMethod: 'get',
    httpPath: '/v1/workspaces/{workspaceId}/workspace_secrets',
  },
  {
    clientCallName: 'client.workspaceSecrets.delete',
    fullyQualifiedName: 'workspaceSecrets.delete',
    httpMethod: 'delete',
    httpPath: '/v1/workspaces/{workspaceId}/workspace_secrets/{id}',
  },
  {
    clientCallName: 'client.workspaces.list',
    fullyQualifiedName: 'workspaces.list',
    httpMethod: 'get',
    httpPath: '/v1/workspaces',
  },
  {
    clientCallName: 'client.workspaces.get',
    fullyQualifiedName: 'workspaces.get',
    httpMethod: 'get',
    httpPath: '/v1/workspaces/current',
  },
  {
    clientCallName: 'client.workspaceAdmin.create',
    fullyQualifiedName: 'workspaceAdmin.create',
    httpMethod: 'post',
    httpPath: '/v1/account/workspaces',
  },
  {
    clientCallName: 'client.workspaceAdmin.retrieve',
    fullyQualifiedName: 'workspaceAdmin.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/account/workspaces/{workspaceId}',
  },
  {
    clientCallName: 'client.workspaceAdmin.update',
    fullyQualifiedName: 'workspaceAdmin.update',
    httpMethod: 'patch',
    httpPath: '/v1/account/workspaces/{workspaceId}',
  },
  {
    clientCallName: 'client.workspaceAdmin.list',
    fullyQualifiedName: 'workspaceAdmin.list',
    httpMethod: 'get',
    httpPath: '/v1/account/workspaces',
  },
  {
    clientCallName: 'client.workspaceAdmin.archive',
    fullyQualifiedName: 'workspaceAdmin.archive',
    httpMethod: 'delete',
    httpPath: '/v1/account/workspaces/{workspaceId}',
  },
  {
    clientCallName: 'client.workspaceAdmin.members.list',
    fullyQualifiedName: 'workspaceAdmin.members.list',
    httpMethod: 'get',
    httpPath: '/v1/account/workspaces/{workspaceId}/members',
  },
  {
    clientCallName: 'client.workspaceAdmin.members.add',
    fullyQualifiedName: 'workspaceAdmin.members.add',
    httpMethod: 'post',
    httpPath: '/v1/account/workspaces/{workspaceId}/members',
  },
  {
    clientCallName: 'client.workspaceAdmin.members.remove',
    fullyQualifiedName: 'workspaceAdmin.members.remove',
    httpMethod: 'delete',
    httpPath: '/v1/account/workspaces/{workspaceId}/members/{profileId}',
  },
  {
    clientCallName: 'client.workspaceAdmin.profiles.list',
    fullyQualifiedName: 'workspaceAdmin.profiles.list',
    httpMethod: 'get',
    httpPath: '/v1/account/profiles',
  },
  { clientCallName: 'client.webhooks.unsafeUnwrap', fullyQualifiedName: 'webhooks.unsafeUnwrap' },
  { clientCallName: 'client.webhooks.unwrap', fullyQualifiedName: 'webhooks.unwrap' },
  {
    clientCallName: 'client.bulkWorkspaceResources.retrieve',
    fullyQualifiedName: 'bulkWorkspaceResources.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/workspaces/{workspaceId}/bulk_workspace_applies/{id}',
  },
  {
    clientCallName: 'client.bulkWorkspaceResources.list',
    fullyQualifiedName: 'bulkWorkspaceResources.list',
    httpMethod: 'get',
    httpPath: '/v1/workspaces/{workspaceId}/bulk_workspace_applies',
  },
  {
    clientCallName: 'client.bulkWorkspaceResources.apply',
    fullyQualifiedName: 'bulkWorkspaceResources.apply',
    httpMethod: 'post',
    httpPath: '/v1/workspaces/{workspaceId}/bulk_workspace_applies',
  },
  {
    clientCallName: 'client.bulkWorkspaceResources.results.list',
    fullyQualifiedName: 'bulkWorkspaceResources.results.list',
    httpMethod: 'get',
    httpPath: '/v1/workspaces/{workspaceId}/bulk_workspace_applies/{bulkWorkspaceApplyId}/results',
  },
];

function allowedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  if (!options) {
    return undefined;
  }

  let allowedMethods: SdkMethod[];

  if (options.codeAllowHttpGets || options.codeAllowedMethods) {
    // Start with nothing allowed and then add into it from options
    let allowedMethodsSet = new Set<SdkMethod>();

    if (options.codeAllowHttpGets) {
      // Add all methods that map to an HTTP GET
      sdkMethods
        .filter((method) => method.httpMethod === 'get')
        .forEach((method) => allowedMethodsSet.add(method));
    }

    if (options.codeAllowedMethods) {
      // Add all methods that match any of the allowed regexps
      const allowedRegexps = options.codeAllowedMethods.map((pattern) => {
        try {
          return new RegExp(pattern);
        } catch (e) {
          throw new Error(
            `Invalid regex pattern for allowed method: "${pattern}": ${e instanceof Error ? e.message : e}`,
          );
        }
      });

      sdkMethods
        .filter((method) => allowedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)))
        .forEach((method) => allowedMethodsSet.add(method));
    }

    allowedMethods = Array.from(allowedMethodsSet);
  } else {
    // Start with everything allowed
    allowedMethods = [...sdkMethods];
  }

  if (options.codeBlockedMethods) {
    // Filter down based on blocked regexps
    const blockedRegexps = options.codeBlockedMethods.map((pattern) => {
      try {
        return new RegExp(pattern);
      } catch (e) {
        throw new Error(
          `Invalid regex pattern for blocked method: "${pattern}": ${e instanceof Error ? e.message : e}`,
        );
      }
    });

    allowedMethods = allowedMethods.filter(
      (method) => !blockedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)),
    );
  }

  return allowedMethods;
}

export function blockedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  const allowedMethods = allowedMethodsForCodeTool(options);
  if (!allowedMethods) {
    return undefined;
  }

  const allowedSet = new Set(allowedMethods.map((method) => method.fullyQualifiedName));

  // Return any methods that are not explicitly allowed
  return sdkMethods.filter((method) => !allowedSet.has(method.fullyQualifiedName));
}
