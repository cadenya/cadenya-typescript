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
    clientCallName: 'client.agents.create',
    fullyQualifiedName: 'agents.create',
    httpMethod: 'post',
    httpPath: '/v1/agents',
  },
  {
    clientCallName: 'client.agents.retrieve',
    fullyQualifiedName: 'agents.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/agents/{id}',
  },
  {
    clientCallName: 'client.agents.update',
    fullyQualifiedName: 'agents.update',
    httpMethod: 'patch',
    httpPath: '/v1/agents/{id}',
  },
  {
    clientCallName: 'client.agents.list',
    fullyQualifiedName: 'agents.list',
    httpMethod: 'get',
    httpPath: '/v1/agents',
  },
  {
    clientCallName: 'client.agents.delete',
    fullyQualifiedName: 'agents.delete',
    httpMethod: 'delete',
    httpPath: '/v1/agents/{id}',
  },
  {
    clientCallName: 'client.agents.variations.create',
    fullyQualifiedName: 'agents.variations.create',
    httpMethod: 'post',
    httpPath: '/v1/agents/{agentId}/variations',
  },
  {
    clientCallName: 'client.agents.variations.retrieve',
    fullyQualifiedName: 'agents.variations.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/agents/{agentId}/variations/{id}',
  },
  {
    clientCallName: 'client.agents.variations.update',
    fullyQualifiedName: 'agents.variations.update',
    httpMethod: 'patch',
    httpPath: '/v1/agents/{agentId}/variations/{id}',
  },
  {
    clientCallName: 'client.agents.variations.list',
    fullyQualifiedName: 'agents.variations.list',
    httpMethod: 'get',
    httpPath: '/v1/agents/{agentId}/variations',
  },
  {
    clientCallName: 'client.agents.variations.delete',
    fullyQualifiedName: 'agents.variations.delete',
    httpMethod: 'delete',
    httpPath: '/v1/agents/{agentId}/variations/{id}',
  },
  {
    clientCallName: 'client.agents.webhookDeliveries.list',
    fullyQualifiedName: 'agents.webhookDeliveries.list',
    httpMethod: 'get',
    httpPath: '/v1/agents/{agentId}/webhook_deliveries',
  },
  {
    clientCallName: 'client.objectives.create',
    fullyQualifiedName: 'objectives.create',
    httpMethod: 'post',
    httpPath: '/v1/objectives',
  },
  {
    clientCallName: 'client.objectives.retrieve',
    fullyQualifiedName: 'objectives.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/objectives/{id}',
  },
  {
    clientCallName: 'client.objectives.list',
    fullyQualifiedName: 'objectives.list',
    httpMethod: 'get',
    httpPath: '/v1/objectives',
  },
  {
    clientCallName: 'client.objectives.cancel',
    fullyQualifiedName: 'objectives.cancel',
    httpMethod: 'post',
    httpPath: '/v1/objectives/{objectiveId}/cancel',
  },
  {
    clientCallName: 'client.objectives.continue',
    fullyQualifiedName: 'objectives.continue',
    httpMethod: 'post',
    httpPath: '/v1/objectives/{objectiveId}/continue',
  },
  {
    clientCallName: 'client.objectives.listContextWindows',
    fullyQualifiedName: 'objectives.listContextWindows',
    httpMethod: 'get',
    httpPath: '/v1/objectives/{objectiveId}/context_windows',
  },
  {
    clientCallName: 'client.objectives.listEvents',
    fullyQualifiedName: 'objectives.listEvents',
    httpMethod: 'get',
    httpPath: '/v1/objectives/{objectiveId}/events',
  },
  {
    clientCallName: 'client.objectives.tools.list',
    fullyQualifiedName: 'objectives.tools.list',
    httpMethod: 'get',
    httpPath: '/v1/objectives/{objectiveId}/tools',
  },
  {
    clientCallName: 'client.objectives.toolCalls.list',
    fullyQualifiedName: 'objectives.toolCalls.list',
    httpMethod: 'get',
    httpPath: '/v1/objectives/{objectiveId}/tool_calls',
  },
  {
    clientCallName: 'client.objectives.toolCalls.approve',
    fullyQualifiedName: 'objectives.toolCalls.approve',
    httpMethod: 'put',
    httpPath: '/v1/objectives/{objectiveId}/tool_calls/{toolCallId}/approve',
  },
  {
    clientCallName: 'client.objectives.toolCalls.deny',
    fullyQualifiedName: 'objectives.toolCalls.deny',
    httpMethod: 'put',
    httpPath: '/v1/objectives/{objectiveId}/tool_calls/{toolCallId}/deny',
  },
  {
    clientCallName: 'client.models.retrieve',
    fullyQualifiedName: 'models.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/models/{id}',
  },
  {
    clientCallName: 'client.models.list',
    fullyQualifiedName: 'models.list',
    httpMethod: 'get',
    httpPath: '/v1/models',
  },
  {
    clientCallName: 'client.models.setStatus',
    fullyQualifiedName: 'models.setStatus',
    httpMethod: 'put',
    httpPath: '/v1/models/{id}/status',
  },
  {
    clientCallName: 'client.search.searchToolsOrToolSets',
    fullyQualifiedName: 'search.searchToolsOrToolSets',
    httpMethod: 'get',
    httpPath: '/v1/search/tools_or_tool_sets',
  },
  {
    clientCallName: 'client.toolSets.create',
    fullyQualifiedName: 'toolSets.create',
    httpMethod: 'post',
    httpPath: '/v1/tool_sets',
  },
  {
    clientCallName: 'client.toolSets.retrieve',
    fullyQualifiedName: 'toolSets.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/tool_sets/{id}',
  },
  {
    clientCallName: 'client.toolSets.update',
    fullyQualifiedName: 'toolSets.update',
    httpMethod: 'put',
    httpPath: '/v1/tool_sets/{id}',
  },
  {
    clientCallName: 'client.toolSets.list',
    fullyQualifiedName: 'toolSets.list',
    httpMethod: 'get',
    httpPath: '/v1/tool_sets',
  },
  {
    clientCallName: 'client.toolSets.delete',
    fullyQualifiedName: 'toolSets.delete',
    httpMethod: 'delete',
    httpPath: '/v1/tool_sets/{id}',
  },
  {
    clientCallName: 'client.toolSets.listEvents',
    fullyQualifiedName: 'toolSets.listEvents',
    httpMethod: 'get',
    httpPath: '/v1/tool_sets/{toolSetId}/events',
  },
  {
    clientCallName: 'client.toolSets.tools.create',
    fullyQualifiedName: 'toolSets.tools.create',
    httpMethod: 'post',
    httpPath: '/v1/tool_sets/{toolSetId}/tools',
  },
  {
    clientCallName: 'client.toolSets.tools.retrieve',
    fullyQualifiedName: 'toolSets.tools.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/tool_sets/{toolSetId}/tools/{id}',
  },
  {
    clientCallName: 'client.toolSets.tools.update',
    fullyQualifiedName: 'toolSets.tools.update',
    httpMethod: 'put',
    httpPath: '/v1/tool_sets/{toolSetId}/tools/{id}',
  },
  {
    clientCallName: 'client.toolSets.tools.list',
    fullyQualifiedName: 'toolSets.tools.list',
    httpMethod: 'get',
    httpPath: '/v1/tool_sets/{toolSetId}/tools',
  },
  {
    clientCallName: 'client.toolSets.tools.delete',
    fullyQualifiedName: 'toolSets.tools.delete',
    httpMethod: 'delete',
    httpPath: '/v1/tool_sets/{toolSetId}/tools/{id}',
  },
  {
    clientCallName: 'client.apiKeys.create',
    fullyQualifiedName: 'apiKeys.create',
    httpMethod: 'post',
    httpPath: '/v1/api_keys',
  },
  {
    clientCallName: 'client.apiKeys.retrieve',
    fullyQualifiedName: 'apiKeys.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/api_keys/{id}',
  },
  {
    clientCallName: 'client.apiKeys.update',
    fullyQualifiedName: 'apiKeys.update',
    httpMethod: 'patch',
    httpPath: '/v1/api_keys/{id}',
  },
  {
    clientCallName: 'client.apiKeys.list',
    fullyQualifiedName: 'apiKeys.list',
    httpMethod: 'get',
    httpPath: '/v1/api_keys',
  },
  {
    clientCallName: 'client.apiKeys.delete',
    fullyQualifiedName: 'apiKeys.delete',
    httpMethod: 'delete',
    httpPath: '/v1/api_keys/{id}',
  },
  {
    clientCallName: 'client.apiKeys.rotate',
    fullyQualifiedName: 'apiKeys.rotate',
    httpMethod: 'put',
    httpPath: '/v1/api_keys/{id}/rotate',
  },
  {
    clientCallName: 'client.workspaceSecrets.create',
    fullyQualifiedName: 'workspaceSecrets.create',
    httpMethod: 'post',
    httpPath: '/v1/workspace_secrets',
  },
  {
    clientCallName: 'client.workspaceSecrets.retrieve',
    fullyQualifiedName: 'workspaceSecrets.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/workspace_secrets/{id}',
  },
  {
    clientCallName: 'client.workspaceSecrets.update',
    fullyQualifiedName: 'workspaceSecrets.update',
    httpMethod: 'patch',
    httpPath: '/v1/workspace_secrets/{id}',
  },
  {
    clientCallName: 'client.workspaceSecrets.list',
    fullyQualifiedName: 'workspaceSecrets.list',
    httpMethod: 'get',
    httpPath: '/v1/workspace_secrets',
  },
  {
    clientCallName: 'client.workspaceSecrets.delete',
    fullyQualifiedName: 'workspaceSecrets.delete',
    httpMethod: 'delete',
    httpPath: '/v1/workspace_secrets/{id}',
  },
  {
    clientCallName: 'client.workspaces.create',
    fullyQualifiedName: 'workspaces.create',
    httpMethod: 'post',
    httpPath: '/v1/workspaces',
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
    clientCallName: 'client.documentNamespaces.create',
    fullyQualifiedName: 'documentNamespaces.create',
    httpMethod: 'post',
    httpPath: '/v1/document_namespaces',
  },
  {
    clientCallName: 'client.documentNamespaces.retrieve',
    fullyQualifiedName: 'documentNamespaces.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/document_namespaces/{id}',
  },
  {
    clientCallName: 'client.documentNamespaces.update',
    fullyQualifiedName: 'documentNamespaces.update',
    httpMethod: 'patch',
    httpPath: '/v1/document_namespaces/{id}',
  },
  {
    clientCallName: 'client.documentNamespaces.list',
    fullyQualifiedName: 'documentNamespaces.list',
    httpMethod: 'get',
    httpPath: '/v1/document_namespaces',
  },
  {
    clientCallName: 'client.documentNamespaces.delete',
    fullyQualifiedName: 'documentNamespaces.delete',
    httpMethod: 'delete',
    httpPath: '/v1/document_namespaces/{id}',
  },
  {
    clientCallName: 'client.documents.create',
    fullyQualifiedName: 'documents.create',
    httpMethod: 'post',
    httpPath: '/v1/documents',
  },
  {
    clientCallName: 'client.documents.retrieve',
    fullyQualifiedName: 'documents.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/documents/{id}',
  },
  {
    clientCallName: 'client.documents.update',
    fullyQualifiedName: 'documents.update',
    httpMethod: 'patch',
    httpPath: '/v1/documents/{id}',
  },
  {
    clientCallName: 'client.documents.list',
    fullyQualifiedName: 'documents.list',
    httpMethod: 'get',
    httpPath: '/v1/documents',
  },
  {
    clientCallName: 'client.documents.delete',
    fullyQualifiedName: 'documents.delete',
    httpMethod: 'delete',
    httpPath: '/v1/documents/{id}',
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
