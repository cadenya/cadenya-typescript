// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';
import * as PromptsAPI from './prompts';
import { Prompt, PromptSpec, Prompts } from './prompts';
import { APIPromise } from '../../core/api-promise';
import { CursorPagination, type CursorPaginationParams, PagePromise } from '../../core/pagination';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Agents extends APIResource {
  prompts: PromptsAPI.Prompts = new PromptsAPI.Prompts(this._client);

  /**
   * Creates a new agent in the workspace
   */
  create(body: AgentCreateParams, options?: RequestOptions): APIPromise<Agent> {
    return this._client.post('/v1/agents', { body, ...options });
  }

  /**
   * Retrieves an agent by ID from the workspace
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<Agent> {
    return this._client.get(path`/v1/agents/${id}`, options);
  }

  /**
   * Updates an agent in the workspace
   */
  update(id: string, body: AgentUpdateParams, options?: RequestOptions): APIPromise<Agent> {
    return this._client.patch(path`/v1/agents/${id}`, { body, ...options });
  }

  /**
   * Lists all agents in the workspace
   */
  list(
    query: AgentListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<AgentsCursorPagination, Agent> {
    return this._client.getAPIList('/v1/agents', CursorPagination<Agent>, { query, ...options });
  }

  /**
   * Deletes an agent from the workspace
   */
  delete(id: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/agents/${id}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export type AgentsCursorPagination = CursorPagination<Agent>;

/**
 * Agent resource
 */
export interface Agent {
  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  metadata?: Shared.ResourceMetadata;

  /**
   * Agent specification (user-provided configuration)
   */
  spec?: AgentSpec;
}

/**
 * Agent specification (user-provided configuration)
 */
export interface AgentSpec {
  agent_tools?: Array<AgentSpecAgentTool>;

  constraints?: AgentSpecConstraints;

  /**
   * Description of the agent's purpose
   */
  description?: string;

  /**
   * Status of the agent
   */
  status?: 'STATUS_ENABLED' | 'STATUS_DISABLED' | 'STATUS_ARCHIVED';

  tool_selection?: AgentSpecToolSelection;

  /**
   * The URL that Cadenya will send events for any objective assigned to the agent.
   */
  webhook_events_url?: string;

  webhook_events_url_secret?: string;
}

export interface AgentSpecAgentTool {
  agent_id?: string;

  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  agent_metadata?: Shared.ResourceMetadata;

  tool_id?: string;

  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  tool_metadata?: Shared.ResourceMetadata;

  tool_set_id?: string;

  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  tool_set_metadata?: Shared.ResourceMetadata;
}

export interface AgentSpecConstraints {
  /**
   * The maximum number of sub-objectives that can be created. 0 means no limit.
   */
  max_sub_objectives?: number;

  /**
   * The maximum number of tool calls that can be made. 0 means no limit.
   */
  max_tool_calls?: number;
}

export interface AgentSpecToolSelection {
  /**
   * AssignedTools is used to indicate that the agent should only use the tools/tool
   * sets that are explicitly assigned to it. Allow discovery is used when the agent
   * thinks it needs to discover more tools.
   */
  assigned_tools?: ToolSelectionAssignedTools;

  /**
   * AutoDiscovery is used to indicate that the agent should automatically discover
   * tools that are not explicitly assigned to it. Max tools is the maximum number of
   * tools that can be discovered. Hints are optional hints for tool search. These
   * are used in conjunction with the context-aware tool search and can help select
   * the best tools for the task.
   */
  auto_discovery?: ToolSelectionAutoDiscovery;
}

export interface Page {
  next_cursor?: string;

  total?: number;
}

/**
 * AssignedTools is used to indicate that the agent should only use the tools/tool
 * sets that are explicitly assigned to it. Allow discovery is used when the agent
 * thinks it needs to discover more tools.
 */
export interface ToolSelectionAssignedTools {
  allow_discovery?: boolean;
}

/**
 * AutoDiscovery is used to indicate that the agent should automatically discover
 * tools that are not explicitly assigned to it. Max tools is the maximum number of
 * tools that can be discovered. Hints are optional hints for tool search. These
 * are used in conjunction with the context-aware tool search and can help select
 * the best tools for the task.
 */
export interface ToolSelectionAutoDiscovery {
  hints?: Array<string>;

  max_tools?: number;
}

export interface AgentCreateParams {
  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  metadata?: Shared.ResourceMetadata;

  /**
   * Agent specification (user-provided configuration)
   */
  spec?: AgentSpec;
}

export interface AgentUpdateParams {
  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  metadata?: Shared.ResourceMetadata;

  /**
   * Agent specification (user-provided configuration)
   */
  spec?: AgentSpec;

  /**
   * Fields to update
   */
  update_mask?: string;
}

export interface AgentListParams extends CursorPaginationParams {
  /**
   * Filter expression (query param: prefix)
   */
  prefix?: string;

  /**
   * Sort order for results (asc or desc by creation time)
   */
  sort_order?: string;
}

Agents.Prompts = Prompts;

export declare namespace Agents {
  export {
    type Agent as Agent,
    type AgentSpec as AgentSpec,
    type AgentSpecAgentTool as AgentSpecAgentTool,
    type AgentSpecConstraints as AgentSpecConstraints,
    type AgentSpecToolSelection as AgentSpecToolSelection,
    type Page as Page,
    type ToolSelectionAssignedTools as ToolSelectionAssignedTools,
    type ToolSelectionAutoDiscovery as ToolSelectionAutoDiscovery,
    type AgentsCursorPagination as AgentsCursorPagination,
    type AgentCreateParams as AgentCreateParams,
    type AgentUpdateParams as AgentUpdateParams,
    type AgentListParams as AgentListParams,
  };

  export { Prompts as Prompts, type Prompt as Prompt, type PromptSpec as PromptSpec };
}
