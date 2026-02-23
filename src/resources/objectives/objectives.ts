// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';
import * as AgentsAPI from '../agents/agents';
import * as VariationsAPI from '../agents/variations';
import * as ToolCallsAPI from './tool-calls';
import {
  ObjectiveToolCall,
  ObjectiveToolCallsCursorPagination,
  ToolCallApproveParams,
  ToolCallDenyParams,
  ToolCallListParams,
  ToolCalls,
} from './tool-calls';
import { APIPromise } from '../../core/api-promise';
import { CursorPagination, type CursorPaginationParams, PagePromise } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Objectives extends APIResource {
  toolCalls: ToolCallsAPI.ToolCalls = new ToolCallsAPI.ToolCalls(this._client);

  /**
   * Creates a new objective in the workspace
   */
  create(body: ObjectiveCreateParams, options?: RequestOptions): APIPromise<Objective> {
    return this._client.post('/v1/objectives', { body, ...options });
  }

  /**
   * Retrieves an objective by ID from the workspace
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<Objective> {
    return this._client.get(path`/v1/objectives/${id}`, options);
  }

  /**
   * Lists all objectives in the workspace
   */
  list(
    query: ObjectiveListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ObjectivesCursorPagination, Objective> {
    return this._client.getAPIList('/v1/objectives', CursorPagination<Objective>, { query, ...options });
  }

  /**
   * Cancels a running or pending objective. The objective's state will be set to
   * STATE_CANCELLED.
   */
  cancel(objectiveID: string, body: ObjectiveCancelParams, options?: RequestOptions): APIPromise<Objective> {
    return this._client.post(path`/v1/objectives/${objectiveID}/cancel`, { body, ...options });
  }

  /**
   * Continues an objective that has completed
   */
  continue(
    objectiveID: string,
    body: ObjectiveContinueParams,
    options?: RequestOptions,
  ): APIPromise<ObjectiveContinueResponse> {
    return this._client.post(path`/v1/objectives/${objectiveID}/continue`, { body, ...options });
  }

  /**
   * Read-only list of the last five windows of execution for this objective, ordered
   * by most recent first
   */
  listContextWindows(
    objectiveID: string,
    query: ObjectiveListContextWindowsParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ObjectiveListContextWindowsResponsesCursorPagination, ObjectiveListContextWindowsResponse> {
    return this._client.getAPIList(
      path`/v1/objectives/${objectiveID}/context_windows`,
      CursorPagination<ObjectiveListContextWindowsResponse>,
      { query, ...options },
    );
  }

  /**
   * Lists all events for an objective
   */
  listEvents(
    objectiveID: string,
    query: ObjectiveListEventsParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ObjectiveListEventsResponsesCursorPagination, ObjectiveListEventsResponse> {
    return this._client.getAPIList(
      path`/v1/objectives/${objectiveID}/events`,
      CursorPagination<ObjectiveListEventsResponse>,
      { query, ...options },
    );
  }
}

export type ObjectivesCursorPagination = CursorPagination<Objective>;

export type ObjectiveListContextWindowsResponsesCursorPagination =
  CursorPagination<ObjectiveListContextWindowsResponse>;

export type ObjectiveListEventsResponsesCursorPagination = CursorPagination<ObjectiveListEventsResponse>;

export interface Objective {
  /**
   * ObjectiveDetails provides read-only aggregated statistics about an objective's
   * execution
   */
  details?: Objective.Details;

  /**
   * Read-only list of the last five windows of execution for this objective, ordered
   * by most recent first. Is only included in singular RPC calls (GetObjective, for
   * example).
   */
  lastFiveWindows?: Array<Objective.LastFiveWindow>;

  /**
   * Metadata for ephemeral operations and activities (e.g., objectives, executions,
   * runs)
   */
  metadata?: Shared.OperationMetadata;

  spec?: ObjectiveSpec;

  status?: Objective.Status;
}

export namespace Objective {
  /**
   * ObjectiveDetails provides read-only aggregated statistics about an objective's
   * execution
   */
  export interface Details {
    /**
     * List of callable tools assigned to the agent for this objective Includes tools,
     * agents, and cadenya-provided tools from the agent's configuration
     */
    callableTools?: Array<Shared.CallableTool>;

    /**
     * Total number of context windows that this objective has generated
     */
    totalContextWindows?: number;

    /**
     * Total number of events generated during this objective's execution
     */
    totalEvents?: number;

    /**
     * Total input tokens consumed across all LLM completions across all context
     * windows
     */
    totalInputTokens?: number;

    /**
     * Total output tokens generated across all LLM completions across all context
     * windows
     */
    totalOutputTokens?: number;

    /**
     * Total number of tool calls made during execution
     */
    totalToolCalls?: number;
  }

  /**
   * ObjectiveContextWindow is a window of chat completions that is grouped together
   * to prevent context-window overflows. Context windows also allow agents to
   * compact their windows and carry on into a new one.
   */
  export interface LastFiveWindow {
    /**
     * Metadata for ephemeral operations and activities (e.g., objectives, executions,
     * runs)
     */
    metadata?: Shared.OperationMetadata;

    spec?: LastFiveWindow.Spec;
  }

  export namespace LastFiveWindow {
    export interface Spec {
      /**
       * A calculated value for how many completion tokens (output tokens) have been used
       * in this context window
       */
      completionTokens?: number;

      /**
       * The objective's ID that this window belongs to
       */
      objectiveId?: string;

      /**
       * The instructions for this window to continue from a previous window's chat
       * history.
       */
      previousWindowContinueInstructions?: string;

      /**
       * A calculated value for how many prompt tokens (input tokens) have been used in
       * this context window
       */
      promptTokens?: number;

      /**
       * sequence is a numeric representation of which context window this is. Sequences
       * are useful to perform a max(sequence) on in order to calculate how many context
       * windows an objective has.
       */
      sequence?: number;
    }
  }

  export interface Status {
    message?: string;

    state?:
      | 'STATE_UNSPECIFIED'
      | 'STATE_PENDING'
      | 'STATE_RUNNING'
      | 'STATE_PAUSED'
      | 'STATE_COMPLETED'
      | 'STATE_FAILED'
      | 'STATE_CANCELLED';
  }
}

export interface ObjectiveSpec {
  /**
   * Agent resource
   */
  agent?: AgentsAPI.Agent;

  /**
   * The objective's events will be sent as an HTTP POST request to this endpoint
   */
  callbackUrl?: string;

  /**
   * Represents a dynamically typed value which can be either null, a number, a
   * string, a boolean, a recursive struct value, or a list of values.
   */
  data?: unknown;

  /**
   * Documents that can be accessed during the objective's iterations. These are not
   * included in the agent's objective unless requested.
   */
  documents?: Array<ObjectiveSpec.Document>;

  /**
   * The initial message sent to the agent. This becomes the first user message in
   * the LLM chat history.
   */
  initialMessage?: string;

  /**
   * A parent objective means the objective was spawned off using a separate agent to
   * complete an objective
   */
  parentObjectiveId?: string;

  /**
   * Secrets that can be used in the headers for tool calls using the secret
   * interpolation format.
   */
  secrets?: Array<ObjectiveSpec.Secret>;

  /**
   * system_prompt is read-only, derived from the selected variation's prompt
   */
  systemPrompt?: string;

  /**
   * AgentVariation resource
   */
  variation?: VariationsAPI.AgentVariation;
}

export namespace ObjectiveSpec {
  export interface Document {
    content?: string;

    contentType?: string;
  }

  export interface Secret {
    name?: string;

    value?: string;
  }
}

export interface ObjectiveContinueResponse {
  /**
   * Actor is the "through model" that associates account-level resources (Profiles,
   * API Keys) to specific workspaces. This allows a single Profile to have access to
   * multiple workspaces while maintaining proper isolation and audit trails.
   */
  actor?: Shared.Actor;

  data?: ObjectiveContinueResponse.Data;

  /**
   * Metadata for ephemeral operations and activities (e.g., objectives, executions,
   * runs)
   */
  metadata?: Shared.OperationMetadata;

  objective?: Objective;
}

export namespace ObjectiveContinueResponse {
  export interface Data {
    /**
     * The context window ID that this event belongs to
     */
    contextWindowId?: string;

    error?: Data.Error;

    message?: Data.Message;

    subObjectiveCreated?: Data.SubObjectiveCreated;

    toolApprovalRequested?: Data.ToolApprovalRequested;

    toolApproved?: Data.ToolApproved;

    toolCalled?: Data.ToolCalled;

    toolDenied?: Data.ToolDenied;

    type?: string;
  }

  export namespace Data {
    export interface Error {
      message?: string;

      type?: string;
    }

    export interface Message {
      content?: string;

      role?: string;
    }

    export interface SubObjectiveCreated {
      /**
       * Metadata for ephemeral operations and activities (e.g., objectives, executions,
       * runs)
       */
      metadata?: Shared.OperationMetadata;
    }

    export interface ToolApprovalRequested {
      /**
       * The ID of the tool call record
       */
      toolCallId?: string;
    }

    export interface ToolApproved {
      /**
       * The ID of the tool call record
       */
      toolCallId?: string;
    }

    export interface ToolCalled {
      /**
       * The ID of the tool call record
       */
      toolCallId?: string;
    }

    export interface ToolDenied {
      /**
       * The ID of the tool call record
       */
      toolCallId?: string;
    }
  }
}

/**
 * ObjectiveContextWindow is a window of chat completions that is grouped together
 * to prevent context-window overflows. Context windows also allow agents to
 * compact their windows and carry on into a new one.
 */
export interface ObjectiveListContextWindowsResponse {
  /**
   * Metadata for ephemeral operations and activities (e.g., objectives, executions,
   * runs)
   */
  metadata?: Shared.OperationMetadata;

  spec?: ObjectiveListContextWindowsResponse.Spec;
}

export namespace ObjectiveListContextWindowsResponse {
  export interface Spec {
    /**
     * A calculated value for how many completion tokens (output tokens) have been used
     * in this context window
     */
    completionTokens?: number;

    /**
     * The objective's ID that this window belongs to
     */
    objectiveId?: string;

    /**
     * The instructions for this window to continue from a previous window's chat
     * history.
     */
    previousWindowContinueInstructions?: string;

    /**
     * A calculated value for how many prompt tokens (input tokens) have been used in
     * this context window
     */
    promptTokens?: number;

    /**
     * sequence is a numeric representation of which context window this is. Sequences
     * are useful to perform a max(sequence) on in order to calculate how many context
     * windows an objective has.
     */
    sequence?: number;
  }
}

export interface ObjectiveListEventsResponse {
  /**
   * Actor is the "through model" that associates account-level resources (Profiles,
   * API Keys) to specific workspaces. This allows a single Profile to have access to
   * multiple workspaces while maintaining proper isolation and audit trails.
   */
  actor?: Shared.Actor;

  data?: ObjectiveListEventsResponse.Data;

  /**
   * Metadata for ephemeral operations and activities (e.g., objectives, executions,
   * runs)
   */
  metadata?: Shared.OperationMetadata;

  objective?: Objective;
}

export namespace ObjectiveListEventsResponse {
  export interface Data {
    /**
     * The context window ID that this event belongs to
     */
    contextWindowId?: string;

    error?: Data.Error;

    message?: Data.Message;

    subObjectiveCreated?: Data.SubObjectiveCreated;

    toolApprovalRequested?: Data.ToolApprovalRequested;

    toolApproved?: Data.ToolApproved;

    toolCalled?: Data.ToolCalled;

    toolDenied?: Data.ToolDenied;

    type?: string;
  }

  export namespace Data {
    export interface Error {
      message?: string;

      type?: string;
    }

    export interface Message {
      content?: string;

      role?: string;
    }

    export interface SubObjectiveCreated {
      /**
       * Metadata for ephemeral operations and activities (e.g., objectives, executions,
       * runs)
       */
      metadata?: Shared.OperationMetadata;
    }

    export interface ToolApprovalRequested {
      /**
       * The ID of the tool call record
       */
      toolCallId?: string;
    }

    export interface ToolApproved {
      /**
       * The ID of the tool call record
       */
      toolCallId?: string;
    }

    export interface ToolCalled {
      /**
       * The ID of the tool call record
       */
      toolCallId?: string;
    }

    export interface ToolDenied {
      /**
       * The ID of the tool call record
       */
      toolCallId?: string;
    }
  }
}

export interface ObjectiveCreateParams {
  agentId?: string;

  /**
   * Metadata for ephemeral operations and activities (e.g., objectives, executions,
   * runs)
   */
  metadata?: Shared.OperationMetadata;

  spec?: ObjectiveSpec;

  /**
   * Explicit variation selection (required when agent uses EXPLICIT mode)
   */
  variationId?: string;
}

export interface ObjectiveListParams extends CursorPaginationParams {
  /**
   * Agent ID for filtering
   */
  agentId?: string;

  /**
   * Optional filters
   */
  parentObjectiveId?: string;

  profileId?: string;

  /**
   * Sort order for results (asc or desc by creation time)
   */
  sortOrder?: string;

  /**
   * Filter by state
   */
  state?:
    | 'STATE_UNSPECIFIED'
    | 'STATE_PENDING'
    | 'STATE_RUNNING'
    | 'STATE_PAUSED'
    | 'STATE_COMPLETED'
    | 'STATE_FAILED'
    | 'STATE_CANCELLED';
}

export interface ObjectiveCancelParams {
  /**
   * The ID of the objective. Supports "eid:" prefix for external IDs.
   */
  body_objectiveId?: string;

  /**
   * Optional reason for cancellation
   */
  reason?: string;
}

export interface ObjectiveContinueParams {
  /**
   * The message to continue an objective that has completed.
   */
  message?: string;

  /**
   * The ID of the objective. If you have assigned an external ID to the objective,
   * you can prefix the ID with "eid:". For example, "eid:1234567890". Otherwise, the
   * ID assigned by Cadenya should be used.
   */
  body_objectiveId?: string;
}

export interface ObjectiveListContextWindowsParams extends CursorPaginationParams {}

export interface ObjectiveListEventsParams extends CursorPaginationParams {
  /**
   * Sort order for results (asc or desc by creation time)
   */
  sortOrder?: string;
}

Objectives.ToolCalls = ToolCalls;

export declare namespace Objectives {
  export {
    type Objective as Objective,
    type ObjectiveSpec as ObjectiveSpec,
    type ObjectiveContinueResponse as ObjectiveContinueResponse,
    type ObjectiveListContextWindowsResponse as ObjectiveListContextWindowsResponse,
    type ObjectiveListEventsResponse as ObjectiveListEventsResponse,
    type ObjectivesCursorPagination as ObjectivesCursorPagination,
    type ObjectiveListContextWindowsResponsesCursorPagination as ObjectiveListContextWindowsResponsesCursorPagination,
    type ObjectiveListEventsResponsesCursorPagination as ObjectiveListEventsResponsesCursorPagination,
    type ObjectiveCreateParams as ObjectiveCreateParams,
    type ObjectiveListParams as ObjectiveListParams,
    type ObjectiveCancelParams as ObjectiveCancelParams,
    type ObjectiveContinueParams as ObjectiveContinueParams,
    type ObjectiveListContextWindowsParams as ObjectiveListContextWindowsParams,
    type ObjectiveListEventsParams as ObjectiveListEventsParams,
  };

  export {
    ToolCalls as ToolCalls,
    type ObjectiveToolCall as ObjectiveToolCall,
    type ObjectiveToolCallsCursorPagination as ObjectiveToolCallsCursorPagination,
    type ToolCallListParams as ToolCallListParams,
    type ToolCallApproveParams as ToolCallApproveParams,
    type ToolCallDenyParams as ToolCallDenyParams,
  };
}
