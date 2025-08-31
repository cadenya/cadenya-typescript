// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as AccountAPI from '../account';
import * as ObjectivesAPI from './objectives';
import {
  Objective,
  ObjectiveCreateParams,
  ObjectiveListParams,
  ObjectiveListResponse,
  ObjectiveRetrieveParams,
  ObjectiveSpec,
  Objectives,
  OperationMetadata,
} from './objectives';
import * as PromptsAPI from './prompts';
import {
  Prompt,
  PromptCreateParams,
  PromptDeleteParams,
  PromptListParams,
  PromptListResponse,
  PromptRetrieveParams,
  PromptSpec,
  PromptUpdateParams,
  Prompts,
} from './prompts';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Agents extends APIResource {
  objectives: ObjectivesAPI.Objectives = new ObjectivesAPI.Objectives(this._client);
  prompts: PromptsAPI.Prompts = new PromptsAPI.Prompts(this._client);

  /**
   * Creates a new agent in the workspace
   */
  create(body: AgentCreateParams, options?: RequestOptions): APIPromise<Agent> {
    return this._client.post('/v1/agents', { body, ...options });
  }

  /**
   * Retrieves an agent by ID from the workspace
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<Agent> {
    return this._client.get(path`/v1/agents/${id}`, options);
  }

  /**
   * Updates an agent in the workspace
   */
  update(id: string, body: AgentUpdateParams, options?: RequestOptions): APIPromise<Agent> {
    return this._client.patch(path`/v1/agents/${id}`, { body, ...options });
  }

  /**
   * Lists all agents in the workspace
   */
  list(
    query: AgentListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<AgentListResponse> {
    return this._client.get('/v1/agents', { query, ...options });
  }

  /**
   * Deletes an agent from the workspace
   */
  delete(id: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/agents/${id}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

/**
 * Agent resource
 */
export interface Agent {
  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  metadata?: AccountAPI.ResourceMetadata;

  /**
   * Agent specification (user-provided configuration)
   */
  spec?: AgentSpec;
}

/**
 * Agent specification (user-provided configuration)
 */
export interface AgentSpec {
  agentTools?: Array<AgentSpec.AgentTool>;

  constraints?: AgentSpec.Constraints;

  /**
   * Description of the agent's purpose
   */
  description?: string;

  /**
   * Status of the agent
   */
  status?: number;

  toolSelection?: AgentSpec.ToolSelection;
}

export namespace AgentSpec {
  export interface AgentTool {
    toolId?: string;

    toolSetId?: string;
  }

  export interface Constraints {
    /**
     * The maximum number of sub-objectives that can be created. 0 means no limit.
     */
    maxSubObjectives?: number;

    /**
     * The maximum number of tool calls that can be made. 0 means no limit.
     */
    maxToolCalls?: number;
  }

  export interface ToolSelection {
    /**
     * AssignedTools is used to indicate that the agent should only use the tools/tool
     * sets that are explicitly assigned to it. Allow discovery is used when the agent
     * thinks it needs to discover more tools.
     */
    assignedTools?: ToolSelection.AssignedTools;

    /**
     * AutoDiscovery is used to indicate that the agent should automatically discover
     * tools that are not explicitly assigned to it. Max tools is the maximum number of
     * tools that can be discovered. Hints are optional hints for tool search. These
     * are used in conjunction with the context-aware tool search and can help select
     * the best tools for the task.
     */
    autoDiscovery?: ToolSelection.AutoDiscovery;
  }

  export namespace ToolSelection {
    /**
     * AssignedTools is used to indicate that the agent should only use the tools/tool
     * sets that are explicitly assigned to it. Allow discovery is used when the agent
     * thinks it needs to discover more tools.
     */
    export interface AssignedTools {
      allowDiscovery?: boolean;
    }

    /**
     * AutoDiscovery is used to indicate that the agent should automatically discover
     * tools that are not explicitly assigned to it. Max tools is the maximum number of
     * tools that can be discovered. Hints are optional hints for tool search. These
     * are used in conjunction with the context-aware tool search and can help select
     * the best tools for the task.
     */
    export interface AutoDiscovery {
      hints?: Array<string>;

      maxTools?: number;
    }
  }
}

export interface Pagination {
  nextCursor?: string;

  total?: number;
}

/**
 * List agents response
 */
export interface AgentListResponse {
  items?: Array<Agent>;

  pagination?: Pagination;
}

export interface AgentCreateParams {
  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  metadata?: AccountAPI.ResourceMetadata;

  /**
   * Agent specification (user-provided configuration)
   */
  spec?: AgentSpec;
}

export interface AgentUpdateParams {
  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  metadata?: AccountAPI.ResourceMetadata;

  /**
   * Agent specification (user-provided configuration)
   */
  spec?: AgentSpec;

  /**
   * Fields to update
   */
  updateMask?: string;
}

export interface AgentListParams {
  page?: AgentListParams.Page;

  /**
   * Filter expression (query param: prefix)
   */
  prefix?: string;
}

export namespace AgentListParams {
  export interface Page {
    /**
     * Pagination cursor from previous response
     */
    cursor?: string;

    /**
     * Maximum number of results to return
     */
    limit?: number;
  }
}

Agents.Objectives = Objectives;
Agents.Prompts = Prompts;

export declare namespace Agents {
  export {
    type Agent as Agent,
    type AgentSpec as AgentSpec,
    type Pagination as Pagination,
    type AgentListResponse as AgentListResponse,
    type AgentCreateParams as AgentCreateParams,
    type AgentUpdateParams as AgentUpdateParams,
    type AgentListParams as AgentListParams,
  };

  export {
    Objectives as Objectives,
    type Objective as Objective,
    type ObjectiveSpec as ObjectiveSpec,
    type OperationMetadata as OperationMetadata,
    type ObjectiveListResponse as ObjectiveListResponse,
    type ObjectiveCreateParams as ObjectiveCreateParams,
    type ObjectiveRetrieveParams as ObjectiveRetrieveParams,
    type ObjectiveListParams as ObjectiveListParams,
  };

  export {
    Prompts as Prompts,
    type Prompt as Prompt,
    type PromptSpec as PromptSpec,
    type PromptListResponse as PromptListResponse,
    type PromptCreateParams as PromptCreateParams,
    type PromptRetrieveParams as PromptRetrieveParams,
    type PromptUpdateParams as PromptUpdateParams,
    type PromptListParams as PromptListParams,
    type PromptDeleteParams as PromptDeleteParams,
  };
}
