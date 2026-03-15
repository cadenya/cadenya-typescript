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
  ): PagePromise<ObjectiveContextWindowsCursorPagination, ObjectiveContextWindow> {
    return this._client.getAPIList(
      path`/v1/objectives/${objectiveID}/context_windows`,
      CursorPagination<ObjectiveContextWindow>,
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

export type ObjectiveContextWindowsCursorPagination = CursorPagination<ObjectiveContextWindow>;

export type ObjectiveListEventsResponsesCursorPagination = CursorPagination<ObjectiveListEventsResponse>;

export interface AssistantMessage {
  content?: string;

  toolCalls?: Array<AssistantToolCall>;
}

export interface AssistantToolCall {
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

export interface Objective {
  data: ObjectiveData;

  /**
   * Metadata for ephemeral operations and activities (e.g., objectives, executions,
   * runs)
   */
  metadata: Shared.OperationMetadata;

  status: ObjectiveStatus;

  /**
   * ObjectiveInfo provides read-only aggregated statistics about an objective's
   * execution
   */
  info?: ObjectiveInfo;

  /**
   * Read-only list of the last five windows of execution for this objective, ordered
   * by most recent first. Is only included in singular RPC calls (GetObjective, for
   * example).
   */
  lastFiveWindows?: Array<ObjectiveContextWindow>;
}

/**
 * ObjectiveContextWindow is a window of chat completions that is grouped together
 * to prevent context-window overflows. Context windows also allow agents to
 * compact their windows and carry on into a new one.
 */
export interface ObjectiveContextWindow {
  data: ObjectiveContextWindowData;

  /**
   * Metadata for ephemeral operations and activities (e.g., objectives, executions,
   * runs)
   */
  metadata: Shared.OperationMetadata;

  info?: ObjectiveContextWindow.Info;
}

export namespace ObjectiveContextWindow {
  export interface Info {
    /**
     * Profile represents a human user at the account level. Profiles are
     * account-scoped resources that can be associated with multiple workspaces through
     * the Actor model. Authentication for profiles is handled via SSO/OAuth (WorkOS).
     */
    createdBy?: Shared.Profile;

    /**
     * Metadata for ephemeral operations and activities (e.g., objectives, executions,
     * runs)
     */
    objective?: Shared.OperationMetadata;
  }
}

export interface ObjectiveContextWindowData {
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

export interface ObjectiveData {
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
  secrets?: Array<ObjectiveDataSecret>;

  /**
   * system_prompt is read-only, derived from the selected variation's prompt
   */
  systemPrompt?: string;

  /**
   * AgentVariation resource
   */
  variation?: VariationsAPI.AgentVariation;
}

export interface ObjectiveDataSecret {
  name?: string;

  value?: string;
}

export interface ObjectiveError {
  message?: string;

  type?: string;
}

export interface ObjectiveEventData {
  assistantMessage?: AssistantMessage;

  error?: ObjectiveError;

  subObjectiveCreated?: SubObjectiveCreated;

  toolApprovalRequested?: ToolApprovalRequested;

  toolApproved?: ToolApproved;

  toolCalled?: ToolCalled;

  toolDenied?: ToolDenied;

  toolError?: ToolError;

  toolResult?: ToolResult;

  type?: string;

  userMessage?: UserMessage;
}

/**
 * ObjectiveInfo provides read-only aggregated statistics about an objective's
 * execution
 */
export interface ObjectiveInfo {
  /**
   * List of callable tools assigned to the agent for this objective Includes tools,
   * agents, and cadenya-provided tools from the agent's configuration
   */
  callableTools?: Array<Shared.CallableTool>;

  /**
   * Profile represents a human user at the account level. Profiles are
   * account-scoped resources that can be associated with multiple workspaces through
   * the Actor model. Authentication for profiles is handled via SSO/OAuth (WorkOS).
   */
  createdBy?: Shared.Profile;

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

export interface ObjectiveStatus {
  state:
    | 'STATE_UNSPECIFIED'
    | 'STATE_PENDING'
    | 'STATE_RUNNING'
    | 'STATE_COMPLETED'
    | 'STATE_FAILED'
    | 'STATE_CANCELLED';

  message?: string;
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

export interface ObjectiveContinueResponse {
  data: ObjectiveEventData;

  /**
   * Metadata for ephemeral operations and activities (e.g., objectives, executions,
   * runs)
   */
  metadata: Shared.OperationMetadata;

  contextWindowId?: string;

  info?: ObjectiveContinueResponse.Info;

  /**
   * The tool call ID associated with this event, if applicable. Useful for webhook
   * receivers that need to approve or deny tool calls.
   */
  objectiveToolCallId?: string;
}

export namespace ObjectiveContinueResponse {
  export interface Info {
    /**
     * Profile represents a human user at the account level. Profiles are
     * account-scoped resources that can be associated with multiple workspaces through
     * the Actor model. Authentication for profiles is handled via SSO/OAuth (WorkOS).
     */
    createdBy?: Shared.Profile;

    /**
     * Metadata for ephemeral operations and activities (e.g., objectives, executions,
     * runs)
     */
    objective?: Shared.OperationMetadata;
  }
}

export interface ObjectiveListEventsResponse {
  data: ObjectiveEventData;

  /**
   * Metadata for ephemeral operations and activities (e.g., objectives, executions,
   * runs)
   */
  metadata: Shared.OperationMetadata;

  contextWindowId?: string;

  info?: ObjectiveListEventsResponse.Info;

  /**
   * The tool call ID associated with this event, if applicable. Useful for webhook
   * receivers that need to approve or deny tool calls.
   */
  objectiveToolCallId?: string;
}

export namespace ObjectiveListEventsResponse {
  export interface Info {
    /**
     * Profile represents a human user at the account level. Profiles are
     * account-scoped resources that can be associated with multiple workspaces through
     * the Actor model. Authentication for profiles is handled via SSO/OAuth (WorkOS).
     */
    createdBy?: Shared.Profile;

    /**
     * Metadata for ephemeral operations and activities (e.g., objectives, executions,
     * runs)
     */
    objective?: Shared.OperationMetadata;
  }
}

export interface ObjectiveCreateParams {
  agentId: string;

  data: ObjectiveData;

  /**
   * CreateOperationMetadata contains the user-provided fields for creating an
   * operation. Read-only fields (id, account_id, workspace_id, created_at,
   * profile_id) are excluded since they are set by the server.
   */
  metadata: Shared.CreateOperationMetadata;

  /**
   * Optional explicit variation selection. Overrides the agent's
   * variation_selection_mode.
   */
  variationId?: string;
}

export interface ObjectiveListParams extends CursorPaginationParams {
  /**
   * Agent ID for filtering
   */
  agentId?: string;

  /**
   * When set to true you may use more of your alloted API rate-limit
   */
  includeInfo?: boolean;

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
   * Optional reason for cancellation
   */
  reason?: string;
}

export interface ObjectiveContinueParams {
  /**
   * When set to true, the message will be enqueued for when the agent loop is
   * available to process it.
   */
  enqueue?: boolean;

  /**
   * The message to continue an objective that has completed (or you are enqueing)
   */
  message?: string;

  /**
   * Secrets that should be included with the message. Helpful for when you need to
   * update secrets on the objective (IE: A secret expires and needs to be refreshed)
   */
  secrets?: Array<ObjectiveContinueParams.Secret>;
}

export namespace ObjectiveContinueParams {
  export interface Secret {
    name?: string;

    value?: string;
  }
}

export interface ObjectiveListContextWindowsParams extends CursorPaginationParams {
  /**
   * When set to true you may use more of your alloted API rate-limit
   */
  includeInfo?: boolean;
}

export interface ObjectiveListEventsParams extends CursorPaginationParams {
  /**
   * When set to true you may use more of your alloted API rate-limit
   */
  includeInfo?: boolean;

  /**
   * Sort order for results (asc or desc by creation time)
   */
  sortOrder?: string;
}

Objectives.ToolCalls = ToolCalls;

export declare namespace Objectives {
  export {
    type AssistantMessage as AssistantMessage,
    type AssistantToolCall as AssistantToolCall,
    type Objective as Objective,
    type ObjectiveContextWindow as ObjectiveContextWindow,
    type ObjectiveContextWindowData as ObjectiveContextWindowData,
    type ObjectiveData as ObjectiveData,
    type ObjectiveDataSecret as ObjectiveDataSecret,
    type ObjectiveError as ObjectiveError,
    type ObjectiveEventData as ObjectiveEventData,
    type ObjectiveInfo as ObjectiveInfo,
    type ObjectiveStatus as ObjectiveStatus,
    type SubObjectiveCreated as SubObjectiveCreated,
    type ToolApprovalRequested as ToolApprovalRequested,
    type ToolApproved as ToolApproved,
    type ToolCalled as ToolCalled,
    type ToolDenied as ToolDenied,
    type ToolError as ToolError,
    type ToolResult as ToolResult,
    type UserMessage as UserMessage,
    type ObjectiveContinueResponse as ObjectiveContinueResponse,
    type ObjectiveListEventsResponse as ObjectiveListEventsResponse,
    type ObjectivesCursorPagination as ObjectivesCursorPagination,
    type ObjectiveContextWindowsCursorPagination as ObjectiveContextWindowsCursorPagination,
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
