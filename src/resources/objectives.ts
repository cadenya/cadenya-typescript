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
   * ResourceReference is used when you only need the bare-bones of data about
   * something. Used for things like associations to keep API payloads/responses
   * lighter.
   */
  createdBy?: OperationMetadata.CreatedBy;

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
   * If a resource is marked as managed, it indicates that it should only be modified
   * the actor that created it in the first place
   */
  managed?: boolean;

  /**
   * Some resources only allow certain fields to be modified after they are created
   * (like a tool set backed by an MCP server) You'll still be able to send other
   * fields in an update request, but don't expect them to be updated if they are not
   * included in this list. An empty/null list indicates that any field (except
   * read-only fields) can be updated on the resource.
   */
  modifiableFields?: string;

  /**
   * Workspace this operation belongs to for organizational grouping (UUID v7)
   */
  workspaceId?: string;
}

export namespace OperationMetadata {
  /**
   * ResourceReference is used when you only need the bare-bones of data about
   * something. Used for things like associations to keep API payloads/responses
   * lighter.
   */
  export interface CreatedBy {
    id?: string;

    name?: string;

    type?: string;
  }
}

export interface ObjectiveContinueResponse {
  actor?: Shared.Actor;

  event?: ObjectiveContinueResponse.Event;

  /**
   * Metadata for ephemeral operations and activities (e.g., objectives, executions,
   * runs)
   */
  metadata?: OperationMetadata;

  objective?: Objective;
}

export namespace ObjectiveContinueResponse {
  export interface Event {
    message?: Event.Message;

    toolApprovalRequested?: Event.ToolApprovalRequested;

    toolApproved?: Event.ToolApproved;

    toolCalled?: Event.ToolCalled;

    toolDenied?: Event.ToolDenied;

    type?: string;
  }

  export namespace Event {
    export interface Message {
      content?: string;

      role?: string;
    }

    export interface ToolApprovalRequested {
      arguments?: { [key: string]: unknown };

      /**
       * CallableTool is a union that represents a tool that can be called by an agent.
       * In Cadenya, a tool that is used within an agent objective might be a
       * user-defined tool (IE: MCP, HTTP), another Agent (useful to separate context),
       * and a Cadenya Tool (one Cadenya provides). These tools
       */
      callable?: ToolApprovalRequested.Callable;
    }

    export namespace ToolApprovalRequested {
      /**
       * CallableTool is a union that represents a tool that can be called by an agent.
       * In Cadenya, a tool that is used within an agent objective might be a
       * user-defined tool (IE: MCP, HTTP), another Agent (useful to separate context),
       * and a Cadenya Tool (one Cadenya provides). These tools
       */
      export interface Callable {
        /**
         * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
         */
        agent?: Shared.ResourceMetadata;

        /**
         * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
         */
        cadenyaProvidedTool?: Shared.ResourceMetadata;

        /**
         * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
         */
        tool?: Shared.ResourceMetadata;
      }
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
      callable?: ToolApproved.Callable;
    }

    export namespace ToolApproved {
      /**
       * CallableTool is a union that represents a tool that can be called by an agent.
       * In Cadenya, a tool that is used within an agent objective might be a
       * user-defined tool (IE: MCP, HTTP), another Agent (useful to separate context),
       * and a Cadenya Tool (one Cadenya provides). These tools
       */
      export interface Callable {
        /**
         * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
         */
        agent?: Shared.ResourceMetadata;

        /**
         * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
         */
        cadenyaProvidedTool?: Shared.ResourceMetadata;

        /**
         * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
         */
        tool?: Shared.ResourceMetadata;
      }
    }

    export interface ToolCalled {
      /**
       * CallableTool is a union that represents a tool that can be called by an agent.
       * In Cadenya, a tool that is used within an agent objective might be a
       * user-defined tool (IE: MCP, HTTP), another Agent (useful to separate context),
       * and a Cadenya Tool (one Cadenya provides). These tools
       */
      callable?: ToolCalled.Callable;

      content?: string;
    }

    export namespace ToolCalled {
      /**
       * CallableTool is a union that represents a tool that can be called by an agent.
       * In Cadenya, a tool that is used within an agent objective might be a
       * user-defined tool (IE: MCP, HTTP), another Agent (useful to separate context),
       * and a Cadenya Tool (one Cadenya provides). These tools
       */
      export interface Callable {
        /**
         * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
         */
        agent?: Shared.ResourceMetadata;

        /**
         * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
         */
        cadenyaProvidedTool?: Shared.ResourceMetadata;

        /**
         * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
         */
        tool?: Shared.ResourceMetadata;
      }
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
      callable?: ToolDenied.Callable;

      reason?: string;
    }

    export namespace ToolDenied {
      /**
       * CallableTool is a union that represents a tool that can be called by an agent.
       * In Cadenya, a tool that is used within an agent objective might be a
       * user-defined tool (IE: MCP, HTTP), another Agent (useful to separate context),
       * and a Cadenya Tool (one Cadenya provides). These tools
       */
      export interface Callable {
        /**
         * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
         */
        agent?: Shared.ResourceMetadata;

        /**
         * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
         */
        cadenyaProvidedTool?: Shared.ResourceMetadata;

        /**
         * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
         */
        tool?: Shared.ResourceMetadata;
      }
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
  metadata?: OperationMetadata;

  objective?: Objective;
}

export namespace ObjectiveListEventsResponse {
  export interface Event {
    message?: Event.Message;

    toolApprovalRequested?: Event.ToolApprovalRequested;

    toolApproved?: Event.ToolApproved;

    toolCalled?: Event.ToolCalled;

    toolDenied?: Event.ToolDenied;

    type?: string;
  }

  export namespace Event {
    export interface Message {
      content?: string;

      role?: string;
    }

    export interface ToolApprovalRequested {
      arguments?: { [key: string]: unknown };

      /**
       * CallableTool is a union that represents a tool that can be called by an agent.
       * In Cadenya, a tool that is used within an agent objective might be a
       * user-defined tool (IE: MCP, HTTP), another Agent (useful to separate context),
       * and a Cadenya Tool (one Cadenya provides). These tools
       */
      callable?: ToolApprovalRequested.Callable;
    }

    export namespace ToolApprovalRequested {
      /**
       * CallableTool is a union that represents a tool that can be called by an agent.
       * In Cadenya, a tool that is used within an agent objective might be a
       * user-defined tool (IE: MCP, HTTP), another Agent (useful to separate context),
       * and a Cadenya Tool (one Cadenya provides). These tools
       */
      export interface Callable {
        /**
         * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
         */
        agent?: Shared.ResourceMetadata;

        /**
         * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
         */
        cadenyaProvidedTool?: Shared.ResourceMetadata;

        /**
         * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
         */
        tool?: Shared.ResourceMetadata;
      }
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
      callable?: ToolApproved.Callable;
    }

    export namespace ToolApproved {
      /**
       * CallableTool is a union that represents a tool that can be called by an agent.
       * In Cadenya, a tool that is used within an agent objective might be a
       * user-defined tool (IE: MCP, HTTP), another Agent (useful to separate context),
       * and a Cadenya Tool (one Cadenya provides). These tools
       */
      export interface Callable {
        /**
         * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
         */
        agent?: Shared.ResourceMetadata;

        /**
         * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
         */
        cadenyaProvidedTool?: Shared.ResourceMetadata;

        /**
         * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
         */
        tool?: Shared.ResourceMetadata;
      }
    }

    export interface ToolCalled {
      /**
       * CallableTool is a union that represents a tool that can be called by an agent.
       * In Cadenya, a tool that is used within an agent objective might be a
       * user-defined tool (IE: MCP, HTTP), another Agent (useful to separate context),
       * and a Cadenya Tool (one Cadenya provides). These tools
       */
      callable?: ToolCalled.Callable;

      content?: string;
    }

    export namespace ToolCalled {
      /**
       * CallableTool is a union that represents a tool that can be called by an agent.
       * In Cadenya, a tool that is used within an agent objective might be a
       * user-defined tool (IE: MCP, HTTP), another Agent (useful to separate context),
       * and a Cadenya Tool (one Cadenya provides). These tools
       */
      export interface Callable {
        /**
         * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
         */
        agent?: Shared.ResourceMetadata;

        /**
         * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
         */
        cadenyaProvidedTool?: Shared.ResourceMetadata;

        /**
         * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
         */
        tool?: Shared.ResourceMetadata;
      }
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
      callable?: ToolDenied.Callable;

      reason?: string;
    }

    export namespace ToolDenied {
      /**
       * CallableTool is a union that represents a tool that can be called by an agent.
       * In Cadenya, a tool that is used within an agent objective might be a
       * user-defined tool (IE: MCP, HTTP), another Agent (useful to separate context),
       * and a Cadenya Tool (one Cadenya provides). These tools
       */
      export interface Callable {
        /**
         * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
         */
        agent?: Shared.ResourceMetadata;

        /**
         * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
         */
        cadenyaProvidedTool?: Shared.ResourceMetadata;

        /**
         * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
         */
        tool?: Shared.ResourceMetadata;
      }
    }
  }
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
    type OperationMetadata as OperationMetadata,
    type ObjectiveContinueResponse as ObjectiveContinueResponse,
    type ObjectiveListEventsResponse as ObjectiveListEventsResponse,
    type ObjectivesCursorPagination as ObjectivesCursorPagination,
    type ObjectiveListEventsResponsesCursorPagination as ObjectiveListEventsResponsesCursorPagination,
    type ObjectiveCreateParams as ObjectiveCreateParams,
    type ObjectiveListParams as ObjectiveListParams,
    type ObjectiveContinueParams as ObjectiveContinueParams,
    type ObjectiveListEventsParams as ObjectiveListEventsParams,
  };
}
