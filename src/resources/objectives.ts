// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as ObjectivesAPI from './objectives';
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
}

export type ObjectivesCursorPagination = CursorPagination<Objective>;

export interface Objective {
  events?: Array<Objective.Event>;

  /**
   * Metadata for ephemeral operations and activities (e.g., objectives, executions,
   * runs)
   */
  metadata?: OperationMetadata;

  spec?: ObjectiveSpec;

  status?: Objective.Status;
}

export namespace Objective {
  export interface Event {
    /**
     * Metadata for ephemeral operations and activities (e.g., objectives, executions,
     * runs)
     */
    metadata?: ObjectivesAPI.OperationMetadata;

    spec?: Event.Spec;
  }

  export namespace Event {
    export interface Spec {
      id?: string;

      actorId?: string;

      createdAt?: string;

      /**
       * Message for a chat completion
       */
      message?: Spec.Message;

      objectiveId?: string;

      /**
       * Sub-objective branching
       */
      subObjective?: Spec.SubObjective;

      /**
       * Human approval events
       */
      toolApproval?: Spec.ToolApproval;

      /**
       * Tool call that the LLM generated for us to call
       */
      toolCall?: Spec.ToolCall;

      toolRejection?: Spec.ToolRejection;
    }

    export namespace Spec {
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
  }

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

  callbackUrl?: string;

  documents?: Array<ObjectiveSpec.Document>;

  objective?: string;

  parentObjectiveId?: string;

  /**
   * prompt_ids can be an empty array on create, and the agent's prompts will be used
   * to create assign the system prompt
   */
  promptIds?: Array<string>;

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

export declare namespace Objectives {
  export {
    type Objective as Objective,
    type ObjectiveSpec as ObjectiveSpec,
    type OperationMetadata as OperationMetadata,
    type ObjectivesCursorPagination as ObjectivesCursorPagination,
    type ObjectiveCreateParams as ObjectiveCreateParams,
    type ObjectiveListParams as ObjectiveListParams,
  };
}
