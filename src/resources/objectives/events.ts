// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
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

/**
 * ObjectiveEvent is a union of all the possible event types that can be sent to
 * the objective. It also contains events for tool approvals, and events for when
 * the objective is completed. It is used to construct the complete timeline for an
 * objective.
 */
export interface ObjectiveEvent {
  id?: string;

  /**
   * Individual message in the conversation
   */
  assistantMessage?: ObjectiveEvent.AssistantMessage;

  /**
   * Must match one of the event_type keys below. IE: "assistant_message" This is so
   * API callers can distinguish between the different event types when accessing the
   * JSON payload
   */
  eventType?: string;

  /**
   * Individual message in the conversation
   */
  systemMessage?: ObjectiveEvent.SystemMessage;

  /**
   * Individual message in the conversation
   */
  toolMessage?: ObjectiveEvent.ToolMessage;

  /**
   * Individual message in the conversation
   */
  userMessage?: ObjectiveEvent.UserMessage;
}

export namespace ObjectiveEvent {
  /**
   * Individual message in the conversation
   */
  export interface AssistantMessage {
    content?: string;

    reasoning?: string;

    refusal?: string;

    role?: string;

    tool_call_id?: string;

    /**
     * We're overwriding the keys for JSON so that it is compatible with the OpenRouter
     * API
     */
    tool_calls?: Array<AssistantMessage.ToolCall>;
  }

  export namespace AssistantMessage {
    /**
     * Tool call made by assistant
     */
    export interface ToolCall {
      id?: string;

      /**
       * Function details within a tool call
       */
      function?: ToolCall.Function;

      type?: string;
    }

    export namespace ToolCall {
      /**
       * Function details within a tool call
       */
      export interface Function {
        arguments?: string;

        name?: string;
      }
    }
  }

  /**
   * Individual message in the conversation
   */
  export interface SystemMessage {
    content?: string;

    reasoning?: string;

    refusal?: string;

    role?: string;

    tool_call_id?: string;

    /**
     * We're overwriding the keys for JSON so that it is compatible with the OpenRouter
     * API
     */
    tool_calls?: Array<SystemMessage.ToolCall>;
  }

  export namespace SystemMessage {
    /**
     * Tool call made by assistant
     */
    export interface ToolCall {
      id?: string;

      /**
       * Function details within a tool call
       */
      function?: ToolCall.Function;

      type?: string;
    }

    export namespace ToolCall {
      /**
       * Function details within a tool call
       */
      export interface Function {
        arguments?: string;

        name?: string;
      }
    }
  }

  /**
   * Individual message in the conversation
   */
  export interface ToolMessage {
    content?: string;

    reasoning?: string;

    refusal?: string;

    role?: string;

    tool_call_id?: string;

    /**
     * We're overwriding the keys for JSON so that it is compatible with the OpenRouter
     * API
     */
    tool_calls?: Array<ToolMessage.ToolCall>;
  }

  export namespace ToolMessage {
    /**
     * Tool call made by assistant
     */
    export interface ToolCall {
      id?: string;

      /**
       * Function details within a tool call
       */
      function?: ToolCall.Function;

      type?: string;
    }

    export namespace ToolCall {
      /**
       * Function details within a tool call
       */
      export interface Function {
        arguments?: string;

        name?: string;
      }
    }
  }

  /**
   * Individual message in the conversation
   */
  export interface UserMessage {
    content?: string;

    reasoning?: string;

    refusal?: string;

    role?: string;

    tool_call_id?: string;

    /**
     * We're overwriding the keys for JSON so that it is compatible with the OpenRouter
     * API
     */
    tool_calls?: Array<UserMessage.ToolCall>;
  }

  export namespace UserMessage {
    /**
     * Tool call made by assistant
     */
    export interface ToolCall {
      id?: string;

      /**
       * Function details within a tool call
       */
      function?: ToolCall.Function;

      type?: string;
    }

    export namespace ToolCall {
      /**
       * Function details within a tool call
       */
      export interface Function {
        arguments?: string;

        name?: string;
      }
    }
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
    type ObjectiveEventsCursorPagination as ObjectiveEventsCursorPagination,
    type EventListParams as EventListParams,
  };
}
