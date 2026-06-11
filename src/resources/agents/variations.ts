// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as AccountAPI from '../account';
import * as Shared from '../shared';
import { APIPromise } from '../../core/api-promise';
import { CursorPagination, type CursorPaginationParams, PagePromise } from '../../core/pagination';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Manage variations of an agent and their tool, sub-agent, and memory layer assignments.
 */
export class Variations extends APIResource {
  /**
   * Creates a new variation for an agent
   */
  create(
    agentID: string,
    params: VariationCreateParams,
    options?: RequestOptions,
  ): APIPromise<AgentVariation> {
    const { workspaceId, ...body } = params;
    return this._client.post(path`/v1/workspaces/${workspaceId}/agents/${agentID}/variations`, {
      body,
      ...options,
    });
  }

  /**
   * Retrieves a variation by ID from an agent
   */
  retrieve(
    id: string,
    params: VariationRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<AgentVariation> {
    const { workspaceId, agentId } = params;
    return this._client.get(path`/v1/workspaces/${workspaceId}/agents/${agentId}/variations/${id}`, options);
  }

  /**
   * Updates a variation for an agent
   */
  update(id: string, params: VariationUpdateParams, options?: RequestOptions): APIPromise<AgentVariation> {
    const { workspaceId, agentId, ...body } = params;
    return this._client.patch(path`/v1/workspaces/${workspaceId}/agents/${agentId}/variations/${id}`, {
      body,
      ...options,
    });
  }

  /**
   * Lists all variations for an agent
   */
  list(
    agentID: string,
    params: VariationListParams,
    options?: RequestOptions,
  ): PagePromise<AgentVariationsCursorPagination, AgentVariation> {
    const { workspaceId, ...query } = params;
    return this._client.getAPIList(
      path`/v1/workspaces/${workspaceId}/agents/${agentID}/variations`,
      CursorPagination<AgentVariation>,
      { query, ...options },
    );
  }

  /**
   * Deletes a variation from an agent
   */
  delete(id: string, params: VariationDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { workspaceId, agentId } = params;
    return this._client.delete(path`/v1/workspaces/${workspaceId}/agents/${agentId}/variations/${id}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Assigns a tool, tool set, or sub-agent to a variation. Exactly one target ID
   * must be set.
   */
  addAssignment(
    variationID: string,
    params: VariationAddAssignmentParams,
    options?: RequestOptions,
  ): APIPromise<VariationAssignment> {
    const { workspaceId, agentId, ...body } = params;
    return this._client.post(
      path`/v1/workspaces/${workspaceId}/agents/${agentId}/variations/${variationID}/assignments`,
      { body, ...options },
    );
  }

  /**
   * Attaches a memory layer to a variation at a given position in the variation's
   * baseline memory stack.
   */
  addMemoryLayer(
    variationID: string,
    params: VariationAddMemoryLayerParams,
    options?: RequestOptions,
  ): APIPromise<VariationMemoryLayerAssignment> {
    const { workspaceId, agentId, ...body } = params;
    return this._client.post(
      path`/v1/workspaces/${workspaceId}/agents/${agentId}/variations/${variationID}/memory_layer_assignments`,
      { body, ...options },
    );
  }

  /**
   * Detaches an assignment from a variation, identified by the assignment ID
   * returned when it was added.
   */
  removeAssignment(
    id: string,
    params: VariationRemoveAssignmentParams,
    options?: RequestOptions,
  ): APIPromise<void> {
    const { workspaceId, agentId, variationId } = params;
    return this._client.delete(
      path`/v1/workspaces/${workspaceId}/agents/${agentId}/variations/${variationId}/assignments/${id}`,
      { ...options, headers: buildHeaders([{ Accept: '*/*' }, options?.headers]) },
    );
  }

  /**
   * Detaches a memory layer assignment from a variation, identified by the
   * assignment id.
   */
  removeMemoryLayer(
    id: string,
    params: VariationRemoveMemoryLayerParams,
    options?: RequestOptions,
  ): APIPromise<void> {
    const { workspaceId, agentId, variationId } = params;
    return this._client.delete(
      path`/v1/workspaces/${workspaceId}/agents/${agentId}/variations/${variationId}/memory_layer_assignments/${id}`,
      { ...options, headers: buildHeaders([{ Accept: '*/*' }, options?.headers]) },
    );
  }

  /**
   * Updates the position of a memory layer assignment on a variation.
   */
  updateMemoryLayer(
    id: string,
    params: VariationUpdateMemoryLayerParams,
    options?: RequestOptions,
  ): APIPromise<VariationMemoryLayerAssignment> {
    const { workspaceId, agentId, variationId, ...body } = params;
    return this._client.patch(
      path`/v1/workspaces/${workspaceId}/agents/${agentId}/variations/${variationId}/memory_layer_assignments/${id}`,
      { body, ...options },
    );
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
   * All tools, tool sets, and sub-agents assigned to this variation. Populated on
   * reads so clients can render a variation's full assignment list without calling
   * the add/remove endpoints just to enumerate.
   */
  assignments?: Array<VariationAssignment>;

  /**
   * A profile identifies a user or non-human principal (such as an API key) at the
   * account level. Profiles are account-scoped and can be granted access to multiple
   * workspaces.
   */
  createdBy?: AccountAPI.Profile;

  /**
   * Total number of objective feedbacks received for this variation
   */
  feedbackCount?: number;

  /**
   * Read-only list of memory layer assignments for this variation, returned in
   * ascending `position` (bottom → top). Capped at 10 entries.
   */
  memoryLayerAssignments?: Array<VariationMemoryLayerAssignment>;

  /**
   * Count of memory layer assignments.
   */
  memoryLayerCount?: number;

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
   * ModelConfig defines the model configuration for a variation
   */
  modelConfig?: AgentVariationSpecModelConfig;

  /**
   * ProgressiveDiscovery is used to indicate that the agent should automatically
   * discover tools that are not explicitly assigned to it. Max tools is the maximum
   * number of tools that can be discovered per search. Hints are optional hints for
   * tool search. These are used in conjunction with the context-aware tool search
   * and can help select the best tools for the task.
   */
  progressiveDiscovery?: AgentVariationSpecProgressiveDiscovery;

  /**
   * Liquid template for the system prompt of objectives using this variation.
   * Rendered with CreateObjectiveRequest.data into Objective.system_prompt.
   */
  systemPromptTemplate?: string;

  /**
   * Liquid template for the initial user message of objectives using this variation.
   * Rendered with CreateObjectiveRequest.user_data and becomes the first user
   * message in the LLM chat history. CreateObjectiveRequest.initial_message, when
   * set, overrides the rendered result. If neither this template nor initial_message
   * is present, objective creation is rejected with InvalidArgument.
   */
  userMessageTemplate?: string;

  /**
   * Weight for weighted random selection (>= 0). P(v) = v.weight / sum(all_weights).
   * Only used when the agent's variation_selection_mode is WEIGHTED. A weight of 0
   * means never auto-selected, but can still be chosen explicitly via variation_id
   * on CreateObjectiveRequest.
   */
  weight?: number;
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

/**
 * ProgressiveDiscovery is used to indicate that the agent should automatically
 * discover tools that are not explicitly assigned to it. Max tools is the maximum
 * number of tools that can be discovered per search. Hints are optional hints for
 * tool search. These are used in conjunction with the context-aware tool search
 * and can help select the best tools for the task.
 */
export interface AgentVariationSpecProgressiveDiscovery {
  hints?: Array<string>;

  maxTools?: number;

  /**
   * Rerank Threshold is an optional value that instructs whether or not to run a
   * search result through a embedding/reranker process which can improve performance
   * and reduce context bloat when tools reach the configured threshold. If a tool
   * match must exceed 0.8, for example, the tool very closely match the query the
   * tool search performed.
   */
  rerankThreshold?: number;
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
 * A read-only reference to a single tool, tool set, or sub-agent attached to a
 * variation. Read the full set of assignments via
 * `AgentVariationInfo.assignments`; mutations go through the dedicated add/remove
 * assignment endpoints.
 *
 * The `id` identifies the assignment itself (not the referenced resource) and is
 * the handle used to remove the assignment. It is returned by the add endpoint and
 * present on every entry in `AgentVariationInfo.assignments`.
 */
export interface VariationAssignment {
  id?: string;

  /**
   * BareMetadata contains the minimal metadata for a resource: the ID and an
   * optional human-readable name. These are used for reference fields where the full
   * metadata (account scoping, timestamps, labels, external IDs) is not needed —
   * e.g., the tool references inside an agent variation spec or the tools assigned
   * to an objective. Both fields are server-populated; clients provide IDs through
   * sibling fields rather than by constructing a BareMetadata themselves.
   */
  agent?: Shared.BareMetadata;

  /**
   * BareMetadata contains the minimal metadata for a resource: the ID and an
   * optional human-readable name. These are used for reference fields where the full
   * metadata (account scoping, timestamps, labels, external IDs) is not needed —
   * e.g., the tool references inside an agent variation spec or the tools assigned
   * to an objective. Both fields are server-populated; clients provide IDs through
   * sibling fields rather than by constructing a BareMetadata themselves.
   */
  tool?: Shared.BareMetadata;

  /**
   * BareMetadata contains the minimal metadata for a resource: the ID and an
   * optional human-readable name. These are used for reference fields where the full
   * metadata (account scoping, timestamps, labels, external IDs) is not needed —
   * e.g., the tool references inside an agent variation spec or the tools assigned
   * to an objective. Both fields are server-populated; clients provide IDs through
   * sibling fields rather than by constructing a BareMetadata themselves.
   */
  toolSet?: Shared.BareMetadata;
}

/**
 * VariationMemoryLayerAssignment attaches a single MemoryLayer to a variation at a
 * given position in the variation's baseline memory stack. A variation has at most
 * one assignment per memory_layer_id.
 *
 * Variations only support whole-layer attachments — entry pinning is an
 * objective-level capability.
 */
export interface VariationMemoryLayerAssignment {
  /**
   * Assignment row id — handle for removing the assignment. Distinct from the
   * referenced memory layer's id.
   */
  id?: string;

  /**
   * BareMetadata contains the minimal metadata for a resource: the ID and an
   * optional human-readable name. These are used for reference fields where the full
   * metadata (account scoping, timestamps, labels, external IDs) is not needed —
   * e.g., the tool references inside an agent variation spec or the tools assigned
   * to an objective. Both fields are server-populated; clients provide IDs through
   * sibling fields rather than by constructing a BareMetadata themselves.
   */
  memoryLayer?: Shared.BareMetadata;

  /**
   * Position in the variation's baseline stack. Lower values sit lower; the
   * highest-position assignment is on top of the variation's baseline. Gaps are fine
   * — only relative position matters. Positions must be unique within a variation; a
   * request that would collide with an existing assignment's position is rejected
   * with InvalidArgument.
   */
  position?: number;
}

export interface VariationCreateParams {
  /**
   * Path param: Workspace ID.
   */
  workspaceId: string;

  /**
   * Body param: CreateResourceMetadata contains the user-provided fields for
   * creating a workspace-scoped resource. Read-only fields (id, account_id,
   * workspace_id, profile_id, created_at) are excluded since they are set by the
   * server.
   */
  metadata: Shared.CreateResourceMetadata;

  /**
   * Body param: AgentVariationSpec defines the operational configuration for a
   * variation
   */
  spec: AgentVariationSpec;
}

export interface VariationRetrieveParams {
  /**
   * Workspace ID.
   */
  workspaceId: string;

  /**
   * Agent ID. Accepts the canonical `agent_…` form or the `external_id:<value>`
   * form.
   */
  agentId: string;
}

export interface VariationUpdateParams {
  /**
   * Path param: Workspace ID.
   */
  workspaceId: string;

  /**
   * Path param: Agent ID. Accepts the canonical `agent_…` form or the
   * `external_id:<value>` form.
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
   * Path param: Workspace ID.
   */
  workspaceId: string;

  /**
   * Query param: Filter by bundle_key — return only resources owned by this bundle.
   */
  bundleKey?: string;

  /**
   * Query param: When true, the `info` field on each returned variation is
   * populated. Requests with this flag count more against your rate limit.
   */
  includeInfo?: boolean;

  /**
   * Query param: Sort order for results (asc or desc by creation time)
   */
  sortOrder?: string;
}

export interface VariationDeleteParams {
  /**
   * Workspace ID.
   */
  workspaceId: string;

  /**
   * Agent ID. Accepts the canonical `agent_…` form or the `external_id:<value>`
   * form.
   */
  agentId: string;
}

export interface VariationAddAssignmentParams {
  /**
   * Path param: Workspace ID.
   */
  workspaceId: string;

  /**
   * Path param: Agent ID. Accepts the canonical `agent_…` form or the
   * `external_id:<value>` form.
   */
  agentId: string;

  /**
   * Body param
   */
  subAgentId?: string;

  /**
   * Body param
   */
  toolId?: string;

  /**
   * Body param
   */
  toolSetId?: string;
}

export interface VariationAddMemoryLayerParams {
  /**
   * Path param: Workspace ID.
   */
  workspaceId: string;

  /**
   * Path param: Agent ID. Accepts the canonical `agent_…` form or the
   * `external_id:<value>` form.
   */
  agentId: string;

  /**
   * Body param: Layer to attach. Accepts the canonical `memlyr_…` form or the
   * `external_id:<value>` form.
   */
  memoryLayerId?: string;

  /**
   * Body param: Position in the stack. If omitted, server appends (max existing
   * position + 1).
   */
  position?: number;
}

export interface VariationRemoveAssignmentParams {
  /**
   * Workspace ID.
   */
  workspaceId: string;

  /**
   * Agent ID. Accepts the canonical `agent_…` form or the `external_id:<value>`
   * form.
   */
  agentId: string;

  /**
   * Variation ID. Accepts the canonical `av_…` form or the `external_id:<value>`
   * form.
   */
  variationId: string;
}

export interface VariationRemoveMemoryLayerParams {
  /**
   * Workspace ID.
   */
  workspaceId: string;

  /**
   * Agent ID. Accepts the canonical `agent_…` form or the `external_id:<value>`
   * form.
   */
  agentId: string;

  /**
   * Variation ID. Accepts the canonical `av_…` form or the `external_id:<value>`
   * form.
   */
  variationId: string;
}

export interface VariationUpdateMemoryLayerParams {
  /**
   * Path param: Workspace ID.
   */
  workspaceId: string;

  /**
   * Path param: Agent ID. Accepts the canonical `agent_…` form or the
   * `external_id:<value>` form.
   */
  agentId: string;

  /**
   * Path param: Variation ID. Accepts the canonical `av_…` form or the
   * `external_id:<value>` form.
   */
  variationId: string;

  /**
   * Body param: New position. Only field currently updatable on an assignment.
   */
  position?: number;
}

export declare namespace Variations {
  export {
    type AgentVariation as AgentVariation,
    type AgentVariationInfo as AgentVariationInfo,
    type AgentVariationSpec as AgentVariationSpec,
    type AgentVariationSpecCompactionConfig as AgentVariationSpecCompactionConfig,
    type AgentVariationSpecConstraints as AgentVariationSpecConstraints,
    type AgentVariationSpecModelConfig as AgentVariationSpecModelConfig,
    type AgentVariationSpecProgressiveDiscovery as AgentVariationSpecProgressiveDiscovery,
    type CompactionConfigSummarizationStrategy as CompactionConfigSummarizationStrategy,
    type CompactionConfigToolResultClearingStrategy as CompactionConfigToolResultClearingStrategy,
    type VariationAssignment as VariationAssignment,
    type VariationMemoryLayerAssignment as VariationMemoryLayerAssignment,
    type AgentVariationsCursorPagination as AgentVariationsCursorPagination,
    type VariationCreateParams as VariationCreateParams,
    type VariationRetrieveParams as VariationRetrieveParams,
    type VariationUpdateParams as VariationUpdateParams,
    type VariationListParams as VariationListParams,
    type VariationDeleteParams as VariationDeleteParams,
    type VariationAddAssignmentParams as VariationAddAssignmentParams,
    type VariationAddMemoryLayerParams as VariationAddMemoryLayerParams,
    type VariationRemoveAssignmentParams as VariationRemoveAssignmentParams,
    type VariationRemoveMemoryLayerParams as VariationRemoveMemoryLayerParams,
    type VariationUpdateMemoryLayerParams as VariationUpdateMemoryLayerParams,
  };
}
