// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as AccountAPI from '../account';
import * as Shared from '../shared';
import * as FeedbackAPI from './feedback';
import { Feedback, FeedbackListParams } from './feedback';
import * as SchedulesAPI from './schedules';
import {
  AgentSchedule,
  AgentScheduleInfo,
  AgentScheduleSpec,
  AgentScheduleSpecSchedule,
  AgentSchedulesCursorPagination,
  ScheduleArchiveParams,
  ScheduleCalendar,
  ScheduleCreateParams,
  ScheduleDeleteParams,
  ScheduleInterval,
  ScheduleListParams,
  SchedulePauseParams,
  ScheduleRange,
  ScheduleResumeParams,
  ScheduleRetrieveParams,
  ScheduleUpdateParams,
  Schedules,
} from './schedules';
import * as VariationsAPI from './variations';
import {
  AgentVariation,
  AgentVariationInfo,
  AgentVariationSpec,
  AgentVariationSpecCompactionConfig,
  AgentVariationSpecConstraints,
  AgentVariationSpecModelConfig,
  AgentVariationSpecProgressiveDiscovery,
  AgentVariationsCursorPagination,
  CompactionConfigSummarizationStrategy,
  CompactionConfigToolResultClearingStrategy,
  VariationAddAssignmentParams,
  VariationAddMemoryLayerParams,
  VariationAssignment,
  VariationCreateParams,
  VariationDeleteParams,
  VariationListParams,
  VariationMemoryLayerAssignment,
  VariationRemoveAssignmentParams,
  VariationRemoveMemoryLayerParams,
  VariationRetrieveParams,
  VariationUpdateMemoryLayerParams,
  VariationUpdateParams,
  Variations,
} from './variations';
import * as WebhookDeliveriesAPI from './webhook-deliveries';
import {
  WebhookDeliveries,
  WebhookDeliveriesCursorPagination,
  WebhookDelivery,
  WebhookDeliveryData,
  WebhookDeliveryListParams,
} from './webhook-deliveries';
import { APIPromise } from '../../core/api-promise';
import { CursorPagination, type CursorPaginationParams, PagePromise } from '../../core/pagination';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Manage AI agents within a workspace. Agents define AI behavior and tool access.
 */
export class Agents extends APIResource {
  feedback: FeedbackAPI.Feedback = new FeedbackAPI.Feedback(this._client);
  webhookDeliveries: WebhookDeliveriesAPI.WebhookDeliveries = new WebhookDeliveriesAPI.WebhookDeliveries(
    this._client,
  );
  variations: VariationsAPI.Variations = new VariationsAPI.Variations(this._client);
  schedules: SchedulesAPI.Schedules = new SchedulesAPI.Schedules(this._client);

  /**
   * Creates a new agent in the workspace
   */
  create(workspaceID: string, body: AgentCreateParams, options?: RequestOptions): APIPromise<Agent> {
    return this._client.post(path`/v1/workspaces/${workspaceID}/agents`, { body, ...options });
  }

  /**
   * Retrieves an agent by ID from the workspace
   */
  retrieve(id: string, params: AgentRetrieveParams, options?: RequestOptions): APIPromise<Agent> {
    const { workspaceId } = params;
    return this._client.get(path`/v1/workspaces/${workspaceId}/agents/${id}`, options);
  }

  /**
   * Updates an agent in the workspace
   */
  update(id: string, params: AgentUpdateParams, options?: RequestOptions): APIPromise<Agent> {
    const { workspaceId, ...body } = params;
    return this._client.patch(path`/v1/workspaces/${workspaceId}/agents/${id}`, { body, ...options });
  }

  /**
   * Lists all agents in the workspace
   */
  list(
    workspaceID: string,
    query: AgentListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<AgentsCursorPagination, Agent> {
    return this._client.getAPIList(path`/v1/workspaces/${workspaceID}/agents`, CursorPagination<Agent>, {
      query,
      ...options,
    });
  }

  /**
   * Deletes an agent from the workspace
   */
  delete(id: string, params: AgentDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { workspaceId } = params;
    return this._client.delete(path`/v1/workspaces/${workspaceId}/agents/${id}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Transitions an agent to STATE_ARCHIVED. Archived agents are hidden from list
   * results and cannot be used for objectives; active schedules are paused.
   */
  archive(id: string, params: AgentArchiveParams, options?: RequestOptions): APIPromise<Agent> {
    const { workspaceId, ...body } = params;
    return this._client.post(path`/v1/workspaces/${workspaceId}/agents/${id}:archive`, { body, ...options });
  }

  /**
   * Transitions an agent to STATE_PUBLISHED, making it available for objectives. The
   * agent must have at least one variation.
   */
  publish(id: string, params: AgentPublishParams, options?: RequestOptions): APIPromise<Agent> {
    const { workspaceId, ...body } = params;
    return this._client.post(path`/v1/workspaces/${workspaceId}/agents/${id}:publish`, { body, ...options });
  }

  /**
   * Transitions an archived agent back to STATE_DRAFT. Publish the agent again to
   * make it available for objectives.
   */
  unarchive(id: string, params: AgentUnarchiveParams, options?: RequestOptions): APIPromise<Agent> {
    const { workspaceId, ...body } = params;
    return this._client.post(path`/v1/workspaces/${workspaceId}/agents/${id}:unarchive`, {
      body,
      ...options,
    });
  }

  /**
   * Transitions a published agent back to STATE_DRAFT. Active schedules for the
   * agent are paused until it is published again.
   */
  unpublish(id: string, params: AgentUnpublishParams, options?: RequestOptions): APIPromise<Agent> {
    const { workspaceId, ...body } = params;
    return this._client.post(path`/v1/workspaces/${workspaceId}/agents/${id}:unpublish`, {
      body,
      ...options,
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
  metadata: Shared.ResourceMetadata;

  /**
   * Agent specification (user-provided configuration)
   */
  spec: AgentSpec;

  /**
   * The current lifecycle state of the agent. Output only. Agents are created in
   * STATE_DRAFT; use the :publish, :unpublish, :archive, and :unarchive actions to
   * transition between states.
   */
  state: 'STATE_UNSPECIFIED' | 'STATE_DRAFT' | 'STATE_PUBLISHED' | 'STATE_ARCHIVED';

  /**
   * AgentInfo contains simple information about an agent for display or quick
   * reference
   */
  info?: AgentInfo;
}

/**
 * AgentInfo contains simple information about an agent for display or quick
 * reference
 */
export interface AgentInfo {
  /**
   * A profile identifies a user or non-human principal (such as an API key) at the
   * account level. Profiles are account-scoped and can be granted access to multiple
   * workspaces.
   */
  createdBy?: AccountAPI.Profile;

  variationCount?: number;
}

/**
 * Agent specification (user-provided configuration)
 */
export interface AgentSpec {
  /**
   * Controls how variations are automatically selected when creating objectives
   * Defaults to RANDOM when unspecified
   */
  variationSelectionMode:
    | 'VARIATION_SELECTION_MODE_UNSPECIFIED'
    | 'VARIATION_SELECTION_MODE_RANDOM'
    | 'VARIATION_SELECTION_MODE_WEIGHTED';

  /**
   * Description of the agent's purpose
   */
  description?: string;

  /**
   * Enable episodic memory for objectives created for this agent. When true,
   * objective creation requires an episodic_memory key and the system finds or
   * creates a memory layer for that (agent, key) pair, letting the agent store and
   * retrieve memories across objectives that share the key. Memory is agent-level so
   * all variations of the agent share the same layers.
   */
  enableEpisodicMemory?: boolean;

  /**
   * How long episodic memories should be retained. Each new objective slides the
   * layer's expiry forward by this duration, and stored entries expire this long
   * after they are written. If not set, episodic memories are retained indefinitely.
   */
  episodicMemoryTtl?: number;

  /**
   * Optional output definition for objectives created for this agent. When provided,
   * Cadenya will append a tool to that will be called by the LLM in use by the
   * variant to extract information in the format provided here. Use this option when
   * you want structured data to be created by your objectives.
   */
  outputDefinition?: { [key: string]: unknown };

  /**
   * SystemPromptDataSchema enforces the shape of system_prompt_data when objectives
   * are created. This is valuable when using liquid formatting in agent variation
   * system prompt templates. The schema is also used when the agent is attached as a
   * sub-agent, as it becomes the tool's input parameter schema. If omitted, the
   * sub-agent schema will be loaded with a simple "prompt" free text string as its
   * schema.
   */
  systemPromptDataSchema?: { [key: string]: unknown };

  /**
   * The URL that Cadenya will send events for any objective assigned to the agent.
   */
  webhookEventsUrl?: string;
}

/**
 * Page carries cursor-based pagination state. There is no total: the cursor walks
 * the result set without ever counting it, and a count would cost a second query
 * on every list.
 */
export interface Page {
  nextCursor?: string;
}

export interface AgentCreateParams {
  /**
   * CreateResourceMetadata contains the user-provided fields for creating a
   * workspace-scoped resource. Read-only fields (id, account_id, workspace_id,
   * profile_id, created_at) are excluded since they are set by the server.
   */
  metadata: Shared.CreateResourceMetadata;

  /**
   * Agent specification (user-provided configuration)
   */
  spec: AgentSpec;

  /**
   * Create agent variation request
   */
  defaultVariation?: AgentCreateParams.DefaultVariation;
}

export namespace AgentCreateParams {
  /**
   * Create agent variation request
   */
  export interface DefaultVariation {
    /**
     * CreateResourceMetadata contains the user-provided fields for creating a
     * workspace-scoped resource. Read-only fields (id, account_id, workspace_id,
     * profile_id, created_at) are excluded since they are set by the server.
     */
    metadata: Shared.CreateResourceMetadata;

    /**
     * AgentVariationSpec defines the operational configuration for a variation
     */
    spec: VariationsAPI.AgentVariationSpec;
  }
}

export interface AgentRetrieveParams {
  /**
   * Workspace ID.
   */
  workspaceId: string;
}

export interface AgentUpdateParams {
  /**
   * Path param: Workspace ID.
   */
  workspaceId: string;

  /**
   * Body param: UpdateResourceMetadata contains the user-provided fields for
   * updating a workspace-scoped resource. Read-only fields (id, account_id,
   * workspace_id, profile_id, created_at) are excluded since they are set by the
   * server.
   */
  metadata?: Shared.UpdateResourceMetadata;

  /**
   * Body param: Agent specification (user-provided configuration)
   */
  spec?: AgentSpec;

  /**
   * Body param: Fields to update
   */
  updateMask?: string;
}

export interface AgentListParams extends CursorPaginationParams {
  /**
   * When true, the `info` field on each returned agent is populated. Requests with
   * this flag count more against your rate limit.
   */
  includeInfo?: boolean;

  /**
   * Filters by metadata labels. Comma-separated key=value pairs, e.g.
   * "env=prod,team=ai". A resource matches only if every pair matches exactly (AND
   * semantics).
   */
  labels?: string;

  /**
   * Filter expression (query param: prefix)
   */
  prefix?: string;

  /**
   * Free-form search query
   */
  query?: string;

  /**
   * Sort order for results (asc or desc by creation time)
   */
  sortOrder?: string;

  /**
   * Filter by agent lifecycle state
   */
  state?: 'STATE_UNSPECIFIED' | 'STATE_DRAFT' | 'STATE_PUBLISHED' | 'STATE_ARCHIVED';

  /**
   * Filter by variation selection mode
   */
  variationSelectionMode?:
    | 'VARIATION_SELECTION_MODE_UNSPECIFIED'
    | 'VARIATION_SELECTION_MODE_RANDOM'
    | 'VARIATION_SELECTION_MODE_WEIGHTED';
}

export interface AgentDeleteParams {
  /**
   * Workspace ID.
   */
  workspaceId: string;
}

export interface AgentArchiveParams {
  /**
   * Workspace ID.
   */
  workspaceId: string;
}

export interface AgentPublishParams {
  /**
   * Workspace ID.
   */
  workspaceId: string;
}

export interface AgentUnarchiveParams {
  /**
   * Workspace ID.
   */
  workspaceId: string;
}

export interface AgentUnpublishParams {
  /**
   * Workspace ID.
   */
  workspaceId: string;
}

Agents.Feedback = Feedback;
Agents.WebhookDeliveries = WebhookDeliveries;
Agents.Variations = Variations;
Agents.Schedules = Schedules;

export declare namespace Agents {
  export {
    type Agent as Agent,
    type AgentInfo as AgentInfo,
    type AgentSpec as AgentSpec,
    type Page as Page,
    type AgentsCursorPagination as AgentsCursorPagination,
    type AgentCreateParams as AgentCreateParams,
    type AgentRetrieveParams as AgentRetrieveParams,
    type AgentUpdateParams as AgentUpdateParams,
    type AgentListParams as AgentListParams,
    type AgentDeleteParams as AgentDeleteParams,
    type AgentArchiveParams as AgentArchiveParams,
    type AgentPublishParams as AgentPublishParams,
    type AgentUnarchiveParams as AgentUnarchiveParams,
    type AgentUnpublishParams as AgentUnpublishParams,
  };

  export { Feedback as Feedback, type FeedbackListParams as FeedbackListParams };

  export {
    WebhookDeliveries as WebhookDeliveries,
    type WebhookDelivery as WebhookDelivery,
    type WebhookDeliveryData as WebhookDeliveryData,
    type WebhookDeliveriesCursorPagination as WebhookDeliveriesCursorPagination,
    type WebhookDeliveryListParams as WebhookDeliveryListParams,
  };

  export {
    Variations as Variations,
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

  export {
    Schedules as Schedules,
    type AgentSchedule as AgentSchedule,
    type AgentScheduleInfo as AgentScheduleInfo,
    type AgentScheduleSpec as AgentScheduleSpec,
    type AgentScheduleSpecSchedule as AgentScheduleSpecSchedule,
    type ScheduleCalendar as ScheduleCalendar,
    type ScheduleInterval as ScheduleInterval,
    type ScheduleRange as ScheduleRange,
    type AgentSchedulesCursorPagination as AgentSchedulesCursorPagination,
    type ScheduleCreateParams as ScheduleCreateParams,
    type ScheduleRetrieveParams as ScheduleRetrieveParams,
    type ScheduleUpdateParams as ScheduleUpdateParams,
    type ScheduleListParams as ScheduleListParams,
    type ScheduleDeleteParams as ScheduleDeleteParams,
    type ScheduleArchiveParams as ScheduleArchiveParams,
    type SchedulePauseParams as SchedulePauseParams,
    type ScheduleResumeParams as ScheduleResumeParams,
  };
}
