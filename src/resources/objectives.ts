// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
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

/**
 * Individual message in the conversation
 */
export interface Message {
  content?: string;

  reasoning?: string;

  refusal?: string;

  role?: string;

  tool_call_id?: string;

  /**
   * We're overwriding the keys for JSON so that it is compatible with the OpenRouter
   * API
   */
  tool_calls?: Array<Message.ToolCall>;
}

export namespace Message {
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

export interface Objective {
  /**
   * Metadata for ephemeral operations and activities (e.g., objectives, executions,
   * runs)
   */
  metadata?: OperationMetadata;

  spec?: ObjectiveSpec;

  status?: Objective.Status;
}

export namespace Objective {
  export interface Status {
    message?: string;

    state?: number;
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

/**
 * Metadata for ephemeral operations and activities (e.g., objectives, executions,
 * runs)
 */
export interface OperationMetadata {
  /**
   * Unique identifier for the operation (UUID v7)
   */
  id?: string;

  /**
   * Account this operation belongs to for multi-tenant isolation (UUID v7)
   */
  accountId?: string;

  /**
   * ID of the actor (user or service account) that initiated this operation (UUID
   * v7)
   */
  actorId?: string;

  /**
   * Timestamp when this operation was created UUID v7 includes timestamp
   * information, but this explicit field enables easier querying
   */
  createdAt?: string;

  /**
   * External ID for the operation (e.g., a workflow ID from an external system)
   */
  externalId?: string;

  /**
   * Arbitrary key-value pairs for categorization and filtering Examples:
   * {"priority": "high", "source": "api", "workflow": "onboarding"}
   */
  labels?: { [key: string]: string };

  /**
   * Workspace this operation belongs to for organizational grouping (UUID v7)
   */
  workspaceId?: string;
}

/**
 * ObjectiveEvent is a union of all the possible event types that can be sent to
 * the objective. It also contains events for tool approvals, and events for when
 * the objective is completed. It is used to construct the complete timeline for an
 * objective.
 */
export interface ObjectiveListEventsResponse {
  id?: string;

  /**
   * Individual message in the conversation
   */
  assistantMessage?: Message;

  /**
   * Must match one of the event_type keys below. IE: "assistant_message" This is so
   * API callers can distinguish between the different event types when accessing the
   * JSON payload
   */
  eventType?: string;

  /**
   * Individual message in the conversation
   */
  systemMessage?: Message;

  /**
   * Individual message in the conversation
   */
  toolMessage?: Message;

  /**
   * Individual message in the conversation
   */
  userMessage?: Message;
}

export interface ObjectiveCreateParams {
  agentId?: string;

  /**
   * Metadata for ephemeral operations and activities (e.g., objectives, executions,
   * runs)
   */
  metadata?: OperationMetadata;

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

export interface ObjectiveListEventsParams extends CursorPaginationParams {
  /**
   * Sort order for results (asc or desc by creation time)
   */
  sortOrder?: string;
}

export declare namespace Objectives {
  export {
    type Message as Message,
    type Objective as Objective,
    type ObjectiveSpec as ObjectiveSpec,
    type OperationMetadata as OperationMetadata,
    type ObjectiveListEventsResponse as ObjectiveListEventsResponse,
    type ObjectivesCursorPagination as ObjectivesCursorPagination,
    type ObjectiveListEventsResponsesCursorPagination as ObjectiveListEventsResponsesCursorPagination,
    type ObjectiveCreateParams as ObjectiveCreateParams,
    type ObjectiveListParams as ObjectiveListParams,
    type ObjectiveListEventsParams as ObjectiveListEventsParams,
  };
}
