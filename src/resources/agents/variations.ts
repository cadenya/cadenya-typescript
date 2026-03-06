// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
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
}

/**
 * AgentVariationSpec defines the operational configuration for a variation
 */
export interface AgentVariationSpec {
  /**
   * Documents assigned to this variation. Can include individual documents or entire
   * document namespaces (which include all documents in the namespace).
   */
  agentDocuments?: Array<AgentVariationSpecAgentDocument>;

  /**
   * Tools assigned to this variation
   */
  agentTools?: Array<AgentVariationSpecAgentTool>;

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

export interface AgentVariationSpecAgentDocument {
  documentId?: string;

  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  documentMetadata?: Shared.ResourceMetadata;

  documentNamespaceId?: string;

  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  documentNamespaceMetadata?: Shared.ResourceMetadata;
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
    type AgentVariationSpec as AgentVariationSpec,
    type AgentVariationSpecAgentDocument as AgentVariationSpecAgentDocument,
    type AgentVariationSpecAgentTool as AgentVariationSpecAgentTool,
    type AgentVariationSpecConstraints as AgentVariationSpecConstraints,
    type AgentVariationSpecModelConfig as AgentVariationSpecModelConfig,
    type AgentVariationSpecToolSelection as AgentVariationSpecToolSelection,
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
