// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as AccountAPI from '../account';
import * as Shared from '../shared';
import { APIPromise } from '../../core/api-promise';
import { CursorPagination, type CursorPaginationParams, PagePromise } from '../../core/pagination';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Variations extends APIResource {
  /**
   * Creates a new variation for an agent
   */
  create(agentID: string, body: VariationCreateParams, options?: RequestOptions): APIPromise<AgentVariation> {
    return this._client.post(path`/v1/agents/${agentID}/variations`, { body, ...options });
  }

  /**
   * Retrieves a variation by ID from an agent
   */
  retrieve(
    id: string,
    params: VariationRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<AgentVariation> {
    const { agentId } = params;
    return this._client.get(path`/v1/agents/${agentId}/variations/${id}`, options);
  }

  /**
   * Updates a variation for an agent
   */
  update(id: string, params: VariationUpdateParams, options?: RequestOptions): APIPromise<AgentVariation> {
    const { agentId, ...body } = params;
    return this._client.patch(path`/v1/agents/${agentId}/variations/${id}`, { body, ...options });
  }

  /**
   * Lists all variations for an agent
   */
  list(
    agentID: string,
    query: VariationListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<AgentVariationsCursorPagination, AgentVariation> {
    return this._client.getAPIList(path`/v1/agents/${agentID}/variations`, CursorPagination<AgentVariation>, {
      query,
      ...options,
    });
  }

  /**
   * Deletes a variation from an agent
   */
  delete(id: string, params: VariationDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { agentId } = params;
    return this._client.delete(path`/v1/agents/${agentId}/variations/${id}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export type AgentVariationsCursorPagination = CursorPagination<AgentVariation>;

/**
 * AgentVariation resource
 */
export interface AgentVariation {
  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  metadata: Shared.ResourceMetadata;

  /**
   * AgentVariationSpec defines the operational configuration for a variation
   */
  spec: AgentVariationSpec;

  /**
   * AgentVariationInfo provides read-only summary information about a variation
   */
  info?: AgentVariationInfo;
}

/**
 * AgentVariationInfo provides read-only summary information about a variation
 */
export interface AgentVariationInfo {
  /**
   * Profile represents a human user at the account level. Profiles are
   * account-scoped resources that can be associated with multiple workspaces through
   * the Actor model. Authentication for profiles is handled via SSO/OAuth (WorkOS).
   */
  createdBy?: AccountAPI.Profile;

  /**
   * Total number of objective feedbacks received for this variation
   */
  feedbackCount?: number;

  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  model?: Shared.ResourceMetadata;

  /**
   * Thompson Sampling score: posterior mean of Beta(ts_alpha, ts_beta). Range [0, 1]
   * where 0.5 = neutral, >0.5 = positive, <0.5 = negative.
   */
  score?: number;

  /**
   * Number of sub-agents assigned to this variation
   */
  subAgentCount?: number;

  /**
   * Number of individual tools assigned to this variation
   */
  toolCount?: number;

  /**
   * Number of tool sets assigned to this variation
   */
  toolSetCount?: number;
}

/**
 * AgentVariationSpec defines the operational configuration for a variation
 */
export interface AgentVariationSpec {
  /**
   * Tools assigned to this variation
   */
  agentTools?: Array<AgentVariationSpecAgentTool>;

  /**
   * CompactionConfig defines how context window compaction behaves for objectives
   * using this variation.
   */
  compactionConfig?: AgentVariationSpecCompactionConfig;

  /**
   * Execution constraints
   */
  constraints?: AgentVariationSpecConstraints;

  /**
   * Human-readable description of what this variation does or when it should be used
   */
  description?: string;

  /**
   * Enable episodic memory for objectives using this variation. When true, the
   * system automatically creates a document namespace for each objective using the
   * objective's episodic_key as the external_id, allowing the agent to store and
   * retrieve documents specific to that episode.
   */
  enableEpisodicMemory?: boolean;

  /**
   * How long episodic memories should be retained. After this duration, episodic
   * document namespaces can be automatically cleaned up. If not set, episodic
   * memories are retained indefinitely.
   */
  episodicMemoryTtl?: number;

  /**
   * ModelConfig defines the model configuration for a variation
   */
  modelConfig?: AgentVariationSpecModelConfig;

  /**
   * The system prompt for this variation
   */
  prompt?: string;

  /**
   * Tool selection strategy
   */
  toolSelection?: AgentVariationSpecToolSelection;

  /**
   * Weight for weighted random selection (>= 0). P(v) = v.weight / sum(all_weights).
   * Only used when the agent's variation_selection_mode is WEIGHTED. A weight of 0
   * means never auto-selected, but can still be chosen explicitly via variation_id
   * on CreateObjectiveRequest.
   */
  weight?: number;
}

export interface AgentVariationSpecAgentTool {
  agentId?: string;

  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  agentMetadata?: Shared.ResourceMetadata;

  toolId?: string;

  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  toolMetadata?: Shared.ResourceMetadata;

  toolSetId?: string;

  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  toolSetMetadata?: Shared.ResourceMetadata;
}

/**
 * CompactionConfig defines how context window compaction behaves for objectives
 * using this variation.
 */
export interface AgentVariationSpecCompactionConfig {
  /**
   * SummarizationStrategy configures LLM-powered summarization of older conversation
   * turns.
   */
  summarization?: CompactionConfigSummarizationStrategy;

  /**
   * ToolResultClearingStrategy configures clearing of older tool result content.
   */
  toolResultClearing?: CompactionConfigToolResultClearingStrategy;

  /**
   * Trigger threshold as a percentage of the model's context window (0.0 to 1.0).
   * When input tokens reach this percentage of the model's limit, compaction
   * triggers. Default: 0.75 (75%)
   */
  triggerThreshold?: number;
}

export interface AgentVariationSpecConstraints {
  /**
   * The maximum number of sub-objectives that can be created. 0 means no limit.
   */
  maxSubObjectives?: number;

  /**
   * The maximum number of tool calls that can be made. 0 means no limit.
   */
  maxToolCalls?: number;
}

/**
 * ModelConfig defines the model configuration for a variation
 */
export interface AgentVariationSpecModelConfig {
  /**
   * The model identifier in family/model format (e.g., "claude/opus-4.6",
   * "claude/sonnet-4.5")
   */
  modelId?: string;

  /**
   * Sampling temperature for model inference (0.0 to 1.0) Lower values produce more
   * deterministic outputs, higher values increase randomness
   */
  temperature?: number;
}

export interface AgentVariationSpecToolSelection {
  /**
   * AssignedTools is used to indicate that the agent should only use the tools/tool
   * sets that are explicitly assigned to it. Allow discovery is used when the agent
   * thinks it needs to discover more tools.
   */
  assignedTools?: ToolSelectionAssignedTools;

  /**
   * AutoDiscovery is used to indicate that the agent should automatically discover
   * tools that are not explicitly assigned to it. Max tools is the maximum number of
   * tools that can be discovered. Hints are optional hints for tool search. These
   * are used in conjunction with the context-aware tool search and can help select
   * the best tools for the task.
   */
  autoDiscovery?: ToolSelectionAutoDiscovery;
}

/**
 * SummarizationStrategy configures LLM-powered summarization of older conversation
 * turns.
 */
export interface CompactionConfigSummarizationStrategy {
  /**
   * Custom instructions that guide what the summarizer preserves. Replaces the
   * default summarization prompt entirely. Example: "Preserve all code snippets,
   * variable names, and technical decisions."
   */
  instructions?: string;
}

/**
 * ToolResultClearingStrategy configures clearing of older tool result content.
 */
export interface CompactionConfigToolResultClearingStrategy {
  /**
   * Number of most recent tool call results to keep intact. Older tool results have
   * their content replaced with "[result cleared]" while preserving the assistant
   * tool call message (function name, arguments). Default: 2
   */
  preserveRecentResults?: number;
}

/**
 * AssignedTools is used to indicate that the agent should only use the tools/tool
 * sets that are explicitly assigned to it. Allow discovery is used when the agent
 * thinks it needs to discover more tools.
 */
export interface ToolSelectionAssignedTools {
  allowDiscovery?: boolean;
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

  maxTools?: number;
}

export interface VariationCreateParams {
  /**
   * CreateResourceMetadata contains the user-provided fields for creating a
   * workspace-scoped resource. Read-only fields (id, account_id, workspace_id,
   * profile_id, created_at) are excluded since they are set by the server.
   */
  metadata: Shared.CreateResourceMetadata;

  /**
   * AgentVariationSpec defines the operational configuration for a variation
   */
  spec: AgentVariationSpec;
}

export interface VariationRetrieveParams {
  /**
   * Agent ID (from path)
   */
  agentId: string;
}

export interface VariationUpdateParams {
  /**
   * Path param: Agent ID (from path)
   */
  agentId: string;

  /**
   * Body param: UpdateResourceMetadata contains the user-provided fields for
   * updating a workspace-scoped resource. Read-only fields (id, account_id,
   * workspace_id, profile_id, created_at) are excluded since they are set by the
   * server.
   */
  metadata?: Shared.UpdateResourceMetadata;

  /**
   * Body param: AgentVariationSpec defines the operational configuration for a
   * variation
   */
  spec?: AgentVariationSpec;

  /**
   * Body param: Fields to update
   */
  updateMask?: string;
}

export interface VariationListParams extends CursorPaginationParams {
  /**
   * When set to true you may use more of your alloted API rate-limit
   */
  includeInfo?: boolean;

  /**
   * Sort order for results (asc or desc by creation time)
   */
  sortOrder?: string;
}

export interface VariationDeleteParams {
  /**
   * Agent ID (from path)
   */
  agentId: string;
}

export declare namespace Variations {
  export {
    type AgentVariation as AgentVariation,
    type AgentVariationInfo as AgentVariationInfo,
    type AgentVariationSpec as AgentVariationSpec,
    type AgentVariationSpecAgentTool as AgentVariationSpecAgentTool,
    type AgentVariationSpecCompactionConfig as AgentVariationSpecCompactionConfig,
    type AgentVariationSpecConstraints as AgentVariationSpecConstraints,
    type AgentVariationSpecModelConfig as AgentVariationSpecModelConfig,
    type AgentVariationSpecToolSelection as AgentVariationSpecToolSelection,
    type CompactionConfigSummarizationStrategy as CompactionConfigSummarizationStrategy,
    type CompactionConfigToolResultClearingStrategy as CompactionConfigToolResultClearingStrategy,
    type ToolSelectionAssignedTools as ToolSelectionAssignedTools,
    type ToolSelectionAutoDiscovery as ToolSelectionAutoDiscovery,
    type AgentVariationsCursorPagination as AgentVariationsCursorPagination,
    type VariationCreateParams as VariationCreateParams,
    type VariationRetrieveParams as VariationRetrieveParams,
    type VariationUpdateParams as VariationUpdateParams,
    type VariationListParams as VariationListParams,
    type VariationDeleteParams as VariationDeleteParams,
  };
}
