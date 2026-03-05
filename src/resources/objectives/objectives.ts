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
  data: Objective.Data;

  /**
   * Metadata for ephemeral operations and activities (e.g., objectives, executions,
   * runs)
   */
  metadata: Shared.OperationMetadata;

  status: Objective.Status;

  /**
   * ObjectiveInfo provides read-only aggregated statistics about an objective's
   * execution
   */
  info?: Objective.Info;

  /**
   * Read-only list of the last five windows of execution for this objective, ordered
   * by most recent first. Is only included in singular RPC calls (GetObjective, for
   * example).
   */
  lastFiveWindows?: Array<Objective.LastFiveWindow>;
}

export namespace Objective {
  export interface Data {
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
    secrets?: Array<Data.Secret>;

    /**
     * system_prompt is read-only, derived from the selected variation's prompt
     */
    systemPrompt?: string;

    /**
     * AgentVariation resource
     */
    variation?: VariationsAPI.AgentVariation;
  }

  export namespace Data {
    export interface Secret {
      name?: string;

      value?: string;
    }
  }

  export interface Status {
    message?: string;

    state?:
      | 'STATE_UNSPECIFIED'
      | 'STATE_PENDING'
      | 'STATE_RUNNING'
      | 'STATE_COMPLETED'
      | 'STATE_FAILED'
      | 'STATE_CANCELLED';
  }

  /**
   * ObjectiveInfo provides read-only aggregated statistics about an objective's
   * execution
   */
  export interface Info {
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
    data: LastFiveWindow.Data;

    /**
     * Metadata for ephemeral operations and activities (e.g., objectives, executions,
     * runs)
     */
    metadata: Shared.OperationMetadata;
  }

  export namespace LastFiveWindow {
    export interface Data {
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
}

export interface ObjectiveContinueResponse {
  data: ObjectiveContinueResponse.Data;

  /**
   * Metadata for ephemeral operations and activities (e.g., objectives, executions,
   * runs)
   */
  metadata: Shared.OperationMetadata;

  contextWindowId?: string;

  /**
   * Profile represents a human user at the account level. Profiles are
   * account-scoped resources that can be associated with multiple workspaces through
   * the Actor model. Authentication for profiles is handled via SSO/OAuth (WorkOS).
   */
  profile?: Shared.Profile;
}

export namespace ObjectiveContinueResponse {
  export interface Data {
    assistantMessage?: Data.AssistantMessage;

    error?: Data.Error;

    subObjectiveCreated?: Data.SubObjectiveCreated;

    toolApprovalRequested?: Data.ToolApprovalRequested;

    toolApproved?: Data.ToolApproved;

    toolCalled?: Data.ToolCalled;

    toolDenied?: Data.ToolDenied;

    toolError?: Data.ToolError;

    toolResult?: Data.ToolResult;

    type?: string;

    userMessage?: Data.UserMessage;
  }

  export namespace Data {
    export interface AssistantMessage {
      content?: string;

      toolCalls?: Array<AssistantMessage.ToolCall>;
    }

    export namespace AssistantMessage {
      export interface ToolCall {
        arguments?: string;

        functionName?: string;

        /**
         * CallableTool is a union that represents a tool that can be called by an agent.
         * In Cadenya, a tool that is used within an agent objective might be a
         * user-defined tool (IE: MCP, HTTP), another Agent (useful to separate context),
         * and a Cadenya Tool (one Cadenya provides). These tools
         */
        tool?: Shared.CallableTool;

        toolCallId?: string;
      }
    }

    export interface Error {
      message?: string;

      type?: string;
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

    export interface ToolError {
      message?: string;

      toolCallId?: string;
    }

    export interface ToolResult {
      content?: string;

      toolCallId?: string;
    }

    export interface UserMessage {
      content?: string;
    }
  }
}

/**
 * ObjectiveContextWindow is a window of chat completions that is grouped together
 * to prevent context-window overflows. Context windows also allow agents to
 * compact their windows and carry on into a new one.
 */
export interface ObjectiveListContextWindowsResponse {
  data: ObjectiveListContextWindowsResponse.Data;

  /**
   * Metadata for ephemeral operations and activities (e.g., objectives, executions,
   * runs)
   */
  metadata: Shared.OperationMetadata;
}

export namespace ObjectiveListContextWindowsResponse {
  export interface Data {
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
  data: ObjectiveListEventsResponse.Data;

  /**
   * Metadata for ephemeral operations and activities (e.g., objectives, executions,
   * runs)
   */
  metadata: Shared.OperationMetadata;

  contextWindowId?: string;

  /**
   * Profile represents a human user at the account level. Profiles are
   * account-scoped resources that can be associated with multiple workspaces through
   * the Actor model. Authentication for profiles is handled via SSO/OAuth (WorkOS).
   */
  profile?: Shared.Profile;
}

export namespace ObjectiveListEventsResponse {
  export interface Data {
    assistantMessage?: Data.AssistantMessage;

    error?: Data.Error;

    subObjectiveCreated?: Data.SubObjectiveCreated;

    toolApprovalRequested?: Data.ToolApprovalRequested;

    toolApproved?: Data.ToolApproved;

    toolCalled?: Data.ToolCalled;

    toolDenied?: Data.ToolDenied;

    toolError?: Data.ToolError;

    toolResult?: Data.ToolResult;

    type?: string;

    userMessage?: Data.UserMessage;
  }

  export namespace Data {
    export interface AssistantMessage {
      content?: string;

      toolCalls?: Array<AssistantMessage.ToolCall>;
    }

    export namespace AssistantMessage {
      export interface ToolCall {
        arguments?: string;

        functionName?: string;

        /**
         * CallableTool is a union that represents a tool that can be called by an agent.
         * In Cadenya, a tool that is used within an agent objective might be a
         * user-defined tool (IE: MCP, HTTP), another Agent (useful to separate context),
         * and a Cadenya Tool (one Cadenya provides). These tools
         */
        tool?: Shared.CallableTool;

        toolCallId?: string;
      }
    }

    export interface Error {
      message?: string;

      type?: string;
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

    export interface ToolError {
      message?: string;

      toolCallId?: string;
    }

    export interface ToolResult {
      content?: string;

      toolCallId?: string;
    }

    export interface UserMessage {
      content?: string;
    }
  }
}

export interface ObjectiveCreateParams {
  agentId: string;

  data: ObjectiveCreateParams.Data;

  /**
   * Metadata for ephemeral operations and activities (e.g., objectives, executions,
   * runs)
   */
  metadata: Shared.OperationMetadata;

  /**
   * Optional explicit variation selection. Overrides the agent's
   * variation_selection_mode.
   */
  variationId?: string;
}

export namespace ObjectiveCreateParams {
  export interface Data {
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
     * The initial message sent to the agent. This becomes the first user message in
     * the LLM chat history.
     */
    initialMessage?: string;

    /**
     * Secrets that can be used in the headers for tool calls using the secret
     * interpolation format.
     */
    secrets?: Array<Data.Secret>;
  }

  export namespace Data {
    export interface Secret {
      name?: string;

      value?: string;
    }
  }
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
