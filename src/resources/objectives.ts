// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as Shared from './shared';
import * as AgentsAPI from './agents/agents';
import { APIPromise } from '../core/api-promise';
import { CursorPagination, type CursorPaginationParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Objectives extends APIResource {
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
   * When an agent attempts to use a tool that requires approval, use this endpoint
   * to mark it as approved. You may optionally include a message in the approval as
   * well.
   */
  approveToolCall(
    objectiveEventID: string,
    params: ObjectiveApproveToolCallParams,
    options?: RequestOptions,
  ): APIPromise<ObjectiveApproveToolCallResponse> {
    const { path_objectiveId, ...body } = params;
    return this._client.put(path`/v1/objectives/${path_objectiveId}/approve_tool_call/${objectiveEventID}`, {
      body,
      ...options,
    });
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
   * When an agent attempts to use a tool that requires approval, use this endpoint
   * to mark it as denied. You may optionally include a message in the denial as
   * well. If provided, the message is passed to the agent when a rejection occurs so
   * you may provide further instructions.
   */
  denyToolCall(
    objectiveEventID: string,
    params: ObjectiveDenyToolCallParams,
    options?: RequestOptions,
  ): APIPromise<ObjectiveDenyToolCallResponse> {
    const { path_objectiveId, ...body } = params;
    return this._client.put(path`/v1/objectives/${path_objectiveId}/deny_tool_call/${objectiveEventID}`, {
      body,
      ...options,
    });
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
   * Contains the objective to be completed. For example: "Respond to the users
   * request"
   */
  objective?: string;

  /**
   * A parent objective means the objective was spawned off using a separate agent to
   * complete an objective
   */
  parentObjectiveId?: string;

  /**
   * prompt_ids can be an empty array on create, and the agent's prompts will be used
   * to create assign the system prompt
   */
  promptIds?: Array<string>;

  /**
   * Secrets that can be used in the headers for tool calls using the secret
   * interpolation format.
   */
  secrets?: Array<ObjectiveSpec.Secret>;

  /**
   * system_prompt is read-only, and is set by the agent's prompts
   */
  systemPrompt?: string;
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

export interface ObjectiveApproveToolCallResponse {
  /**
   * Actor is the "through model" that associates account-level resources (Profiles,
   * API Keys) to specific workspaces. This allows a single Profile or API Key to
   * have access to multiple workspaces while maintaining proper isolation and audit
   * trails.
   *
   * Key relationships:
   *
   * - Actor belongs to both an Account and a Workspace (via ResourceMetadata)
   * - Actor references either a Profile (human) or API Key (machine) via IDs
   * - Every resource creation and operation is tagged with the actor_id
   *
   * Authentication flow:
   *
   * 1.  JWT token is validated and issuer is checked
   * 2.  If issuer is WorkOS -> Profile lookup -> Find/create Actor in workspace
   * 3.  If issuer is Cadenya -> API Key lookup -> Find/create Actor in workspace
   * 4.  All subsequent operations use the actor_id for audit and authorization
   */
  actor?: Shared.Actor;

  event?: ObjectiveApproveToolCallResponse.Event;

  /**
   * Metadata for ephemeral operations and activities (e.g., objectives, executions,
   * runs)
   */
  metadata?: Shared.OperationMetadata;

  objective?: Objective;
}

export namespace ObjectiveApproveToolCallResponse {
  export interface Event {
    /**
     * ChatHistoryCompaction represents a compaction event where chat history was
     * summarized to reduce token usage and prevent context window overflow
     */
    chatHistoryCompaction?: Event.ChatHistoryCompaction;

    error?: Event.Error;

    message?: Event.Message;

    /**
     * NewContextWindow represents the creation of a new context window Context windows
     * are created when approaching token limits
     */
    newContextWindow?: Event.NewContextWindow;

    subObjectiveCreated?: Event.SubObjectiveCreated;

    toolApprovalRequested?: Event.ToolApprovalRequested;

    toolApproved?: Event.ToolApproved;

    toolCalled?: Event.ToolCalled;

    /**
     * ToolCallStatusUpdated represents a change in tool call approval status Generated
     * when ApproveToolCall or DenyToolCall RPCs are called
     */
    toolCallStatusUpdated?: Event.ToolCallStatusUpdated;

    toolDenied?: Event.ToolDenied;

    type?: string;
  }

  export namespace Event {
    /**
     * ChatHistoryCompaction represents a compaction event where chat history was
     * summarized to reduce token usage and prevent context window overflow
     */
    export interface ChatHistoryCompaction {
      /**
       * Number of messages that were compacted/summarized
       */
      messagesCompacted?: number;

      /**
       * Optional summary text describing what was compacted
       */
      summary?: string;

      /**
       * Number of prompt tokens after compaction
       */
      tokensAfter?: number;

      /**
       * Number of prompt tokens before compaction
       */
      tokensBefore?: number;
    }

    export interface Error {
      message?: string;

      type?: string;
    }

    export interface Message {
      content?: string;

      role?: string;
    }

    /**
     * NewContextWindow represents the creation of a new context window Context windows
     * are created when approaching token limits
     */
    export interface NewContextWindow {
      /**
       * ID of the newly created ObjectiveContextWindow resource References
       * ObjectiveContextWindow.metadata.id
       */
      contextWindowId?: string;
    }

    export interface SubObjectiveCreated {
      /**
       * Metadata for ephemeral operations and activities (e.g., objectives, executions,
       * runs)
       */
      objective?: Shared.OperationMetadata;
    }

    export interface ToolApprovalRequested {
      arguments?: { [key: string]: unknown };

      /**
       * CallableTool is a union that represents a tool that can be called by an agent.
       * In Cadenya, a tool that is used within an agent objective might be a
       * user-defined tool (IE: MCP, HTTP), another Agent (useful to separate context),
       * and a Cadenya Tool (one Cadenya provides). These tools
       */
      callable?: Shared.CallableTool;
    }

    export interface ToolApproved {
      /**
       * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
       */
      actor?: Shared.ResourceMetadata;

      /**
       * CallableTool is a union that represents a tool that can be called by an agent.
       * In Cadenya, a tool that is used within an agent objective might be a
       * user-defined tool (IE: MCP, HTTP), another Agent (useful to separate context),
       * and a Cadenya Tool (one Cadenya provides). These tools
       */
      callable?: Shared.CallableTool;
    }

    export interface ToolCalled {
      /**
       * CallableTool is a union that represents a tool that can be called by an agent.
       * In Cadenya, a tool that is used within an agent objective might be a
       * user-defined tool (IE: MCP, HTTP), another Agent (useful to separate context),
       * and a Cadenya Tool (one Cadenya provides). These tools
       */
      callable?: Shared.CallableTool;

      content?: string;
    }

    /**
     * ToolCallStatusUpdated represents a change in tool call approval status Generated
     * when ApproveToolCall or DenyToolCall RPCs are called
     */
    export interface ToolCallStatusUpdated {
      /**
       * Whether the tool call was approved (true) or denied (false)
       */
      approved?: boolean;

      /**
       * Optional message from the approver/denier For denials, this is passed to the
       * agent for additional context
       */
      message?: string;

      /**
       * Actor is the "through model" that associates account-level resources (Profiles,
       * API Keys) to specific workspaces. This allows a single Profile or API Key to
       * have access to multiple workspaces while maintaining proper isolation and audit
       * trails.
       *
       * Key relationships:
       *
       * - Actor belongs to both an Account and a Workspace (via ResourceMetadata)
       * - Actor references either a Profile (human) or API Key (machine) via IDs
       * - Every resource creation and operation is tagged with the actor_id
       *
       * Authentication flow:
       *
       * 1.  JWT token is validated and issuer is checked
       * 2.  If issuer is WorkOS -> Profile lookup -> Find/create Actor in workspace
       * 3.  If issuer is Cadenya -> API Key lookup -> Find/create Actor in workspace
       * 4.  All subsequent operations use the actor_id for audit and authorization
       */
      modifiedBy?: Shared.Actor;
    }

    export interface ToolDenied {
      /**
       * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
       */
      actor?: Shared.ResourceMetadata;

      /**
       * CallableTool is a union that represents a tool that can be called by an agent.
       * In Cadenya, a tool that is used within an agent objective might be a
       * user-defined tool (IE: MCP, HTTP), another Agent (useful to separate context),
       * and a Cadenya Tool (one Cadenya provides). These tools
       */
      callable?: Shared.CallableTool;

      reason?: string;
    }
  }
}

export interface ObjectiveContinueResponse {
  /**
   * Actor is the "through model" that associates account-level resources (Profiles,
   * API Keys) to specific workspaces. This allows a single Profile or API Key to
   * have access to multiple workspaces while maintaining proper isolation and audit
   * trails.
   *
   * Key relationships:
   *
   * - Actor belongs to both an Account and a Workspace (via ResourceMetadata)
   * - Actor references either a Profile (human) or API Key (machine) via IDs
   * - Every resource creation and operation is tagged with the actor_id
   *
   * Authentication flow:
   *
   * 1.  JWT token is validated and issuer is checked
   * 2.  If issuer is WorkOS -> Profile lookup -> Find/create Actor in workspace
   * 3.  If issuer is Cadenya -> API Key lookup -> Find/create Actor in workspace
   * 4.  All subsequent operations use the actor_id for audit and authorization
   */
  actor?: Shared.Actor;

  event?: ObjectiveContinueResponse.Event;

  /**
   * Metadata for ephemeral operations and activities (e.g., objectives, executions,
   * runs)
   */
  metadata?: Shared.OperationMetadata;

  objective?: Objective;
}

export namespace ObjectiveContinueResponse {
  export interface Event {
    /**
     * ChatHistoryCompaction represents a compaction event where chat history was
     * summarized to reduce token usage and prevent context window overflow
     */
    chatHistoryCompaction?: Event.ChatHistoryCompaction;

    error?: Event.Error;

    message?: Event.Message;

    /**
     * NewContextWindow represents the creation of a new context window Context windows
     * are created when approaching token limits
     */
    newContextWindow?: Event.NewContextWindow;

    subObjectiveCreated?: Event.SubObjectiveCreated;

    toolApprovalRequested?: Event.ToolApprovalRequested;

    toolApproved?: Event.ToolApproved;

    toolCalled?: Event.ToolCalled;

    /**
     * ToolCallStatusUpdated represents a change in tool call approval status Generated
     * when ApproveToolCall or DenyToolCall RPCs are called
     */
    toolCallStatusUpdated?: Event.ToolCallStatusUpdated;

    toolDenied?: Event.ToolDenied;

    type?: string;
  }

  export namespace Event {
    /**
     * ChatHistoryCompaction represents a compaction event where chat history was
     * summarized to reduce token usage and prevent context window overflow
     */
    export interface ChatHistoryCompaction {
      /**
       * Number of messages that were compacted/summarized
       */
      messagesCompacted?: number;

      /**
       * Optional summary text describing what was compacted
       */
      summary?: string;

      /**
       * Number of prompt tokens after compaction
       */
      tokensAfter?: number;

      /**
       * Number of prompt tokens before compaction
       */
      tokensBefore?: number;
    }

    export interface Error {
      message?: string;

      type?: string;
    }

    export interface Message {
      content?: string;

      role?: string;
    }

    /**
     * NewContextWindow represents the creation of a new context window Context windows
     * are created when approaching token limits
     */
    export interface NewContextWindow {
      /**
       * ID of the newly created ObjectiveContextWindow resource References
       * ObjectiveContextWindow.metadata.id
       */
      contextWindowId?: string;
    }

    export interface SubObjectiveCreated {
      /**
       * Metadata for ephemeral operations and activities (e.g., objectives, executions,
       * runs)
       */
      objective?: Shared.OperationMetadata;
    }

    export interface ToolApprovalRequested {
      arguments?: { [key: string]: unknown };

      /**
       * CallableTool is a union that represents a tool that can be called by an agent.
       * In Cadenya, a tool that is used within an agent objective might be a
       * user-defined tool (IE: MCP, HTTP), another Agent (useful to separate context),
       * and a Cadenya Tool (one Cadenya provides). These tools
       */
      callable?: Shared.CallableTool;
    }

    export interface ToolApproved {
      /**
       * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
       */
      actor?: Shared.ResourceMetadata;

      /**
       * CallableTool is a union that represents a tool that can be called by an agent.
       * In Cadenya, a tool that is used within an agent objective might be a
       * user-defined tool (IE: MCP, HTTP), another Agent (useful to separate context),
       * and a Cadenya Tool (one Cadenya provides). These tools
       */
      callable?: Shared.CallableTool;
    }

    export interface ToolCalled {
      /**
       * CallableTool is a union that represents a tool that can be called by an agent.
       * In Cadenya, a tool that is used within an agent objective might be a
       * user-defined tool (IE: MCP, HTTP), another Agent (useful to separate context),
       * and a Cadenya Tool (one Cadenya provides). These tools
       */
      callable?: Shared.CallableTool;

      content?: string;
    }

    /**
     * ToolCallStatusUpdated represents a change in tool call approval status Generated
     * when ApproveToolCall or DenyToolCall RPCs are called
     */
    export interface ToolCallStatusUpdated {
      /**
       * Whether the tool call was approved (true) or denied (false)
       */
      approved?: boolean;

      /**
       * Optional message from the approver/denier For denials, this is passed to the
       * agent for additional context
       */
      message?: string;

      /**
       * Actor is the "through model" that associates account-level resources (Profiles,
       * API Keys) to specific workspaces. This allows a single Profile or API Key to
       * have access to multiple workspaces while maintaining proper isolation and audit
       * trails.
       *
       * Key relationships:
       *
       * - Actor belongs to both an Account and a Workspace (via ResourceMetadata)
       * - Actor references either a Profile (human) or API Key (machine) via IDs
       * - Every resource creation and operation is tagged with the actor_id
       *
       * Authentication flow:
       *
       * 1.  JWT token is validated and issuer is checked
       * 2.  If issuer is WorkOS -> Profile lookup -> Find/create Actor in workspace
       * 3.  If issuer is Cadenya -> API Key lookup -> Find/create Actor in workspace
       * 4.  All subsequent operations use the actor_id for audit and authorization
       */
      modifiedBy?: Shared.Actor;
    }

    export interface ToolDenied {
      /**
       * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
       */
      actor?: Shared.ResourceMetadata;

      /**
       * CallableTool is a union that represents a tool that can be called by an agent.
       * In Cadenya, a tool that is used within an agent objective might be a
       * user-defined tool (IE: MCP, HTTP), another Agent (useful to separate context),
       * and a Cadenya Tool (one Cadenya provides). These tools
       */
      callable?: Shared.CallableTool;

      reason?: string;
    }
  }
}

export interface ObjectiveDenyToolCallResponse {
  /**
   * Actor is the "through model" that associates account-level resources (Profiles,
   * API Keys) to specific workspaces. This allows a single Profile or API Key to
   * have access to multiple workspaces while maintaining proper isolation and audit
   * trails.
   *
   * Key relationships:
   *
   * - Actor belongs to both an Account and a Workspace (via ResourceMetadata)
   * - Actor references either a Profile (human) or API Key (machine) via IDs
   * - Every resource creation and operation is tagged with the actor_id
   *
   * Authentication flow:
   *
   * 1.  JWT token is validated and issuer is checked
   * 2.  If issuer is WorkOS -> Profile lookup -> Find/create Actor in workspace
   * 3.  If issuer is Cadenya -> API Key lookup -> Find/create Actor in workspace
   * 4.  All subsequent operations use the actor_id for audit and authorization
   */
  actor?: Shared.Actor;

  event?: ObjectiveDenyToolCallResponse.Event;

  /**
   * Metadata for ephemeral operations and activities (e.g., objectives, executions,
   * runs)
   */
  metadata?: Shared.OperationMetadata;

  objective?: Objective;
}

export namespace ObjectiveDenyToolCallResponse {
  export interface Event {
    /**
     * ChatHistoryCompaction represents a compaction event where chat history was
     * summarized to reduce token usage and prevent context window overflow
     */
    chatHistoryCompaction?: Event.ChatHistoryCompaction;

    error?: Event.Error;

    message?: Event.Message;

    /**
     * NewContextWindow represents the creation of a new context window Context windows
     * are created when approaching token limits
     */
    newContextWindow?: Event.NewContextWindow;

    subObjectiveCreated?: Event.SubObjectiveCreated;

    toolApprovalRequested?: Event.ToolApprovalRequested;

    toolApproved?: Event.ToolApproved;

    toolCalled?: Event.ToolCalled;

    /**
     * ToolCallStatusUpdated represents a change in tool call approval status Generated
     * when ApproveToolCall or DenyToolCall RPCs are called
     */
    toolCallStatusUpdated?: Event.ToolCallStatusUpdated;

    toolDenied?: Event.ToolDenied;

    type?: string;
  }

  export namespace Event {
    /**
     * ChatHistoryCompaction represents a compaction event where chat history was
     * summarized to reduce token usage and prevent context window overflow
     */
    export interface ChatHistoryCompaction {
      /**
       * Number of messages that were compacted/summarized
       */
      messagesCompacted?: number;

      /**
       * Optional summary text describing what was compacted
       */
      summary?: string;

      /**
       * Number of prompt tokens after compaction
       */
      tokensAfter?: number;

      /**
       * Number of prompt tokens before compaction
       */
      tokensBefore?: number;
    }

    export interface Error {
      message?: string;

      type?: string;
    }

    export interface Message {
      content?: string;

      role?: string;
    }

    /**
     * NewContextWindow represents the creation of a new context window Context windows
     * are created when approaching token limits
     */
    export interface NewContextWindow {
      /**
       * ID of the newly created ObjectiveContextWindow resource References
       * ObjectiveContextWindow.metadata.id
       */
      contextWindowId?: string;
    }

    export interface SubObjectiveCreated {
      /**
       * Metadata for ephemeral operations and activities (e.g., objectives, executions,
       * runs)
       */
      objective?: Shared.OperationMetadata;
    }

    export interface ToolApprovalRequested {
      arguments?: { [key: string]: unknown };

      /**
       * CallableTool is a union that represents a tool that can be called by an agent.
       * In Cadenya, a tool that is used within an agent objective might be a
       * user-defined tool (IE: MCP, HTTP), another Agent (useful to separate context),
       * and a Cadenya Tool (one Cadenya provides). These tools
       */
      callable?: Shared.CallableTool;
    }

    export interface ToolApproved {
      /**
       * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
       */
      actor?: Shared.ResourceMetadata;

      /**
       * CallableTool is a union that represents a tool that can be called by an agent.
       * In Cadenya, a tool that is used within an agent objective might be a
       * user-defined tool (IE: MCP, HTTP), another Agent (useful to separate context),
       * and a Cadenya Tool (one Cadenya provides). These tools
       */
      callable?: Shared.CallableTool;
    }

    export interface ToolCalled {
      /**
       * CallableTool is a union that represents a tool that can be called by an agent.
       * In Cadenya, a tool that is used within an agent objective might be a
       * user-defined tool (IE: MCP, HTTP), another Agent (useful to separate context),
       * and a Cadenya Tool (one Cadenya provides). These tools
       */
      callable?: Shared.CallableTool;

      content?: string;
    }

    /**
     * ToolCallStatusUpdated represents a change in tool call approval status Generated
     * when ApproveToolCall or DenyToolCall RPCs are called
     */
    export interface ToolCallStatusUpdated {
      /**
       * Whether the tool call was approved (true) or denied (false)
       */
      approved?: boolean;

      /**
       * Optional message from the approver/denier For denials, this is passed to the
       * agent for additional context
       */
      message?: string;

      /**
       * Actor is the "through model" that associates account-level resources (Profiles,
       * API Keys) to specific workspaces. This allows a single Profile or API Key to
       * have access to multiple workspaces while maintaining proper isolation and audit
       * trails.
       *
       * Key relationships:
       *
       * - Actor belongs to both an Account and a Workspace (via ResourceMetadata)
       * - Actor references either a Profile (human) or API Key (machine) via IDs
       * - Every resource creation and operation is tagged with the actor_id
       *
       * Authentication flow:
       *
       * 1.  JWT token is validated and issuer is checked
       * 2.  If issuer is WorkOS -> Profile lookup -> Find/create Actor in workspace
       * 3.  If issuer is Cadenya -> API Key lookup -> Find/create Actor in workspace
       * 4.  All subsequent operations use the actor_id for audit and authorization
       */
      modifiedBy?: Shared.Actor;
    }

    export interface ToolDenied {
      /**
       * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
       */
      actor?: Shared.ResourceMetadata;

      /**
       * CallableTool is a union that represents a tool that can be called by an agent.
       * In Cadenya, a tool that is used within an agent objective might be a
       * user-defined tool (IE: MCP, HTTP), another Agent (useful to separate context),
       * and a Cadenya Tool (one Cadenya provides). These tools
       */
      callable?: Shared.CallableTool;

      reason?: string;
    }
  }
}

export interface ObjectiveListEventsResponse {
  /**
   * Actor is the "through model" that associates account-level resources (Profiles,
   * API Keys) to specific workspaces. This allows a single Profile or API Key to
   * have access to multiple workspaces while maintaining proper isolation and audit
   * trails.
   *
   * Key relationships:
   *
   * - Actor belongs to both an Account and a Workspace (via ResourceMetadata)
   * - Actor references either a Profile (human) or API Key (machine) via IDs
   * - Every resource creation and operation is tagged with the actor_id
   *
   * Authentication flow:
   *
   * 1.  JWT token is validated and issuer is checked
   * 2.  If issuer is WorkOS -> Profile lookup -> Find/create Actor in workspace
   * 3.  If issuer is Cadenya -> API Key lookup -> Find/create Actor in workspace
   * 4.  All subsequent operations use the actor_id for audit and authorization
   */
  actor?: Shared.Actor;

  event?: ObjectiveListEventsResponse.Event;

  /**
   * Metadata for ephemeral operations and activities (e.g., objectives, executions,
   * runs)
   */
  metadata?: Shared.OperationMetadata;

  objective?: Objective;
}

export namespace ObjectiveListEventsResponse {
  export interface Event {
    /**
     * ChatHistoryCompaction represents a compaction event where chat history was
     * summarized to reduce token usage and prevent context window overflow
     */
    chatHistoryCompaction?: Event.ChatHistoryCompaction;

    error?: Event.Error;

    message?: Event.Message;

    /**
     * NewContextWindow represents the creation of a new context window Context windows
     * are created when approaching token limits
     */
    newContextWindow?: Event.NewContextWindow;

    subObjectiveCreated?: Event.SubObjectiveCreated;

    toolApprovalRequested?: Event.ToolApprovalRequested;

    toolApproved?: Event.ToolApproved;

    toolCalled?: Event.ToolCalled;

    /**
     * ToolCallStatusUpdated represents a change in tool call approval status Generated
     * when ApproveToolCall or DenyToolCall RPCs are called
     */
    toolCallStatusUpdated?: Event.ToolCallStatusUpdated;

    toolDenied?: Event.ToolDenied;

    type?: string;
  }

  export namespace Event {
    /**
     * ChatHistoryCompaction represents a compaction event where chat history was
     * summarized to reduce token usage and prevent context window overflow
     */
    export interface ChatHistoryCompaction {
      /**
       * Number of messages that were compacted/summarized
       */
      messagesCompacted?: number;

      /**
       * Optional summary text describing what was compacted
       */
      summary?: string;

      /**
       * Number of prompt tokens after compaction
       */
      tokensAfter?: number;

      /**
       * Number of prompt tokens before compaction
       */
      tokensBefore?: number;
    }

    export interface Error {
      message?: string;

      type?: string;
    }

    export interface Message {
      content?: string;

      role?: string;
    }

    /**
     * NewContextWindow represents the creation of a new context window Context windows
     * are created when approaching token limits
     */
    export interface NewContextWindow {
      /**
       * ID of the newly created ObjectiveContextWindow resource References
       * ObjectiveContextWindow.metadata.id
       */
      contextWindowId?: string;
    }

    export interface SubObjectiveCreated {
      /**
       * Metadata for ephemeral operations and activities (e.g., objectives, executions,
       * runs)
       */
      objective?: Shared.OperationMetadata;
    }

    export interface ToolApprovalRequested {
      arguments?: { [key: string]: unknown };

      /**
       * CallableTool is a union that represents a tool that can be called by an agent.
       * In Cadenya, a tool that is used within an agent objective might be a
       * user-defined tool (IE: MCP, HTTP), another Agent (useful to separate context),
       * and a Cadenya Tool (one Cadenya provides). These tools
       */
      callable?: Shared.CallableTool;
    }

    export interface ToolApproved {
      /**
       * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
       */
      actor?: Shared.ResourceMetadata;

      /**
       * CallableTool is a union that represents a tool that can be called by an agent.
       * In Cadenya, a tool that is used within an agent objective might be a
       * user-defined tool (IE: MCP, HTTP), another Agent (useful to separate context),
       * and a Cadenya Tool (one Cadenya provides). These tools
       */
      callable?: Shared.CallableTool;
    }

    export interface ToolCalled {
      /**
       * CallableTool is a union that represents a tool that can be called by an agent.
       * In Cadenya, a tool that is used within an agent objective might be a
       * user-defined tool (IE: MCP, HTTP), another Agent (useful to separate context),
       * and a Cadenya Tool (one Cadenya provides). These tools
       */
      callable?: Shared.CallableTool;

      content?: string;
    }

    /**
     * ToolCallStatusUpdated represents a change in tool call approval status Generated
     * when ApproveToolCall or DenyToolCall RPCs are called
     */
    export interface ToolCallStatusUpdated {
      /**
       * Whether the tool call was approved (true) or denied (false)
       */
      approved?: boolean;

      /**
       * Optional message from the approver/denier For denials, this is passed to the
       * agent for additional context
       */
      message?: string;

      /**
       * Actor is the "through model" that associates account-level resources (Profiles,
       * API Keys) to specific workspaces. This allows a single Profile or API Key to
       * have access to multiple workspaces while maintaining proper isolation and audit
       * trails.
       *
       * Key relationships:
       *
       * - Actor belongs to both an Account and a Workspace (via ResourceMetadata)
       * - Actor references either a Profile (human) or API Key (machine) via IDs
       * - Every resource creation and operation is tagged with the actor_id
       *
       * Authentication flow:
       *
       * 1.  JWT token is validated and issuer is checked
       * 2.  If issuer is WorkOS -> Profile lookup -> Find/create Actor in workspace
       * 3.  If issuer is Cadenya -> API Key lookup -> Find/create Actor in workspace
       * 4.  All subsequent operations use the actor_id for audit and authorization
       */
      modifiedBy?: Shared.Actor;
    }

    export interface ToolDenied {
      /**
       * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
       */
      actor?: Shared.ResourceMetadata;

      /**
       * CallableTool is a union that represents a tool that can be called by an agent.
       * In Cadenya, a tool that is used within an agent objective might be a
       * user-defined tool (IE: MCP, HTTP), another Agent (useful to separate context),
       * and a Cadenya Tool (one Cadenya provides). These tools
       */
      callable?: Shared.CallableTool;

      reason?: string;
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
}

export interface ObjectiveListParams extends CursorPaginationParams {
  actorId?: string;

  /**
   * Agent ID for filtering
   */
  agentId?: string;

  /**
   * Optional filters
   */
  parentObjectiveId?: string;

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

export interface ObjectiveApproveToolCallParams {
  /**
   * Path param: The ID of the objective. If you have assigned an external ID to the
   * objective, you can prefix the ID with "eid:". For example, "eid:1234567890".
   * Otherwise, the ID assigned by Cadenya should be used.
   */
  path_objectiveId: string;

  /**
   * Body param: A message to associate to the tool call approval
   */
  message?: string;

  /**
   * Body param: The objective event associated with the tool call approval requested
   */
  body_objectiveEventId?: string;

  /**
   * Body param: The ID of the objective. If you have assigned an external ID to the
   * objective, you can prefix the ID with "eid:". For example, "eid:1234567890".
   * Otherwise, the ID assigned by Cadenya should be used.
   */
  body_objectiveId?: string;
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

export interface ObjectiveDenyToolCallParams {
  /**
   * Path param: The ID of the objective. If you have assigned an external ID to the
   * objective, you can prefix the ID with "eid:". For example, "eid:1234567890".
   * Otherwise, the ID assigned by Cadenya should be used.
   */
  path_objectiveId: string;

  /**
   * Body param: A message to associate to the tool call denial
   */
  message?: string;

  /**
   * Body param: The objective event associated with the tool call approval requested
   */
  body_objectiveEventId?: string;

  /**
   * Body param: The ID of the objective. If you have assigned an external ID to the
   * objective, you can prefix the ID with "eid:". For example, "eid:1234567890".
   * Otherwise, the ID assigned by Cadenya should be used.
   */
  body_objectiveId?: string;
}

export interface ObjectiveListEventsParams extends CursorPaginationParams {
  /**
   * Sort order for results (asc or desc by creation time)
   */
  sortOrder?: string;
}

export declare namespace Objectives {
  export {
    type Objective as Objective,
    type ObjectiveSpec as ObjectiveSpec,
    type ObjectiveApproveToolCallResponse as ObjectiveApproveToolCallResponse,
    type ObjectiveContinueResponse as ObjectiveContinueResponse,
    type ObjectiveDenyToolCallResponse as ObjectiveDenyToolCallResponse,
    type ObjectiveListEventsResponse as ObjectiveListEventsResponse,
    type ObjectivesCursorPagination as ObjectivesCursorPagination,
    type ObjectiveListEventsResponsesCursorPagination as ObjectiveListEventsResponsesCursorPagination,
    type ObjectiveCreateParams as ObjectiveCreateParams,
    type ObjectiveListParams as ObjectiveListParams,
    type ObjectiveApproveToolCallParams as ObjectiveApproveToolCallParams,
    type ObjectiveContinueParams as ObjectiveContinueParams,
    type ObjectiveDenyToolCallParams as ObjectiveDenyToolCallParams,
    type ObjectiveListEventsParams as ObjectiveListEventsParams,
  };
}
