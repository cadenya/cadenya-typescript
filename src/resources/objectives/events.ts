// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ObjectivesAPI from './objectives';
import { CursorPagination, type CursorPaginationParams, PagePromise } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Events extends APIResource {
  /**
   * Lists all events for an objective
   */
  list(
    objectiveID: string,
    query: EventListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ObjectiveEventsCursorPagination, ObjectiveEvent> {
    return this._client.getAPIList(
      path`/v1/objectives/${objectiveID}/events`,
      CursorPagination<ObjectiveEvent>,
      { query, ...options },
    );
  }
}

export type ObjectiveEventsCursorPagination = CursorPagination<ObjectiveEvent>;

export interface ObjectiveEvent {
  /**
   * Metadata for ephemeral operations and activities (e.g., objectives, executions,
   * runs)
   */
  metadata?: ObjectivesAPI.OperationMetadata;

  spec?: ObjectiveEventSpec;
}

export interface ObjectiveEventSpec {
  id?: string;

  actorId?: string;

  createdAt?: string;

  /**
   * Message for a chat completion
   */
  message?: ObjectiveEventSpec.Message;

  objectiveId?: string;

  /**
   * Sub-objective branching
   */
  subObjective?: ObjectiveEventSpec.SubObjective;

  /**
   * Human approval events
   */
  toolApproval?: ObjectiveEventSpec.ToolApproval;

  /**
   * Tool call that the LLM generated for us to call
   */
  toolCall?: ObjectiveEventSpec.ToolCall;

  toolRejection?: ObjectiveEventSpec.ToolRejection;
}

export namespace ObjectiveEventSpec {
  /**
   * Message for a chat completion
   */
  export interface Message {
    content?: string;

    role?: number;
  }

  /**
   * Sub-objective branching
   */
  export interface SubObjective {
    rationale?: string;

    subObjectiveId?: string;
  }

  /**
   * Human approval events
   */
  export interface ToolApproval {
    reason?: string;

    toolCallId?: string;
  }

  /**
   * Tool call that the LLM generated for us to call
   */
  export interface ToolCall {
    /**
     * The arguments sent to the tool
     */
    arguments?: unknown;

    /**
     * Error details when status = FAILED
     */
    error?: ToolCall.Error;

    /**
     * The ID of the tool call that the LLM generated for us to call
     */
    externalToolCallId?: string;

    /**
     * The result from the tool execution
     */
    result?: string;

    /**
     * Current status of the tool call
     */
    status?: number;

    /**
     * A reference to the tool that was called
     */
    toolId?: string;
  }

  export namespace ToolCall {
    /**
     * Error details when status = FAILED
     */
    export interface Error {
      code?: string;

      message?: string;
    }
  }

  export interface ToolRejection {
    alternative?: string;

    reason?: string;

    toolCallId?: string;
  }
}

export interface EventListParams extends CursorPaginationParams {
  /**
   * Sort order for results (asc or desc by creation time)
   */
  sortOrder?: string;
}

export declare namespace Events {
  export {
    type ObjectiveEvent as ObjectiveEvent,
    type ObjectiveEventSpec as ObjectiveEventSpec,
    type ObjectiveEventsCursorPagination as ObjectiveEventsCursorPagination,
    type EventListParams as EventListParams,
  };
}
