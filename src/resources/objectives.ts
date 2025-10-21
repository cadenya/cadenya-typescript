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
   * Metadata for ephemeral operations and activities (e.g., objectives, executions,
   * runs)
   */
  metadata?: Shared.OperationMetadata;

  spec?: ObjectiveSpec;

  status?: Objective.Status;
}

export namespace Objective {
  export interface Status {
    message?: string;

    state?:
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
    message?: Event.Message;

    subObjectiveCreated?: Event.SubObjectiveCreated;

    toolApprovalRequested?: Event.ToolApprovalRequested;

    toolApproved?: Event.ToolApproved;

    toolCalled?: Event.ToolCalled;

    toolCallStatus?: Event.ToolCallStatus;

    toolDenied?: Event.ToolDenied;

    type?: string;
  }

  export namespace Event {
    export interface Message {
      content?: string;

      role?: string;
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

    export interface ToolCallStatus {
      approved?: boolean;

      message?: string;

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
    message?: Event.Message;

    subObjectiveCreated?: Event.SubObjectiveCreated;

    toolApprovalRequested?: Event.ToolApprovalRequested;

    toolApproved?: Event.ToolApproved;

    toolCalled?: Event.ToolCalled;

    toolCallStatus?: Event.ToolCallStatus;

    toolDenied?: Event.ToolDenied;

    type?: string;
  }

  export namespace Event {
    export interface Message {
      content?: string;

      role?: string;
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

    export interface ToolCallStatus {
      approved?: boolean;

      message?: string;

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
    message?: Event.Message;

    subObjectiveCreated?: Event.SubObjectiveCreated;

    toolApprovalRequested?: Event.ToolApprovalRequested;

    toolApproved?: Event.ToolApproved;

    toolCalled?: Event.ToolCalled;

    toolCallStatus?: Event.ToolCallStatus;

    toolDenied?: Event.ToolDenied;

    type?: string;
  }

  export namespace Event {
    export interface Message {
      content?: string;

      role?: string;
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

    export interface ToolCallStatus {
      approved?: boolean;

      message?: string;

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
    message?: Event.Message;

    subObjectiveCreated?: Event.SubObjectiveCreated;

    toolApprovalRequested?: Event.ToolApprovalRequested;

    toolApproved?: Event.ToolApproved;

    toolCalled?: Event.ToolCalled;

    toolCallStatus?: Event.ToolCallStatus;

    toolDenied?: Event.ToolDenied;

    type?: string;
  }

  export namespace Event {
    export interface Message {
      content?: string;

      role?: string;
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

    export interface ToolCallStatus {
      approved?: boolean;

      message?: string;

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

  state?: number;
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
