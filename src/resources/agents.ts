// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Agents extends APIResource {
  /**
   * Agents
   */
  create(body: AgentCreateParams, options?: RequestOptions): APIPromise<Agent> {
    return this._client.post('/v1/agents', { body, ...options });
  }

  retrieve(id: string, options?: RequestOptions): APIPromise<Agent> {
    return this._client.get(path`/v1/agents/${id}`, options);
  }

  update(pathID: string, body: AgentUpdateParams, options?: RequestOptions): APIPromise<Agent> {
    return this._client.patch(path`/v1/agents/${pathID}`, { body, ...options });
  }

  list(
    query: AgentListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<AgentListResponse> {
    return this._client.get('/v1/agents', { query, ...options });
  }

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
   * Standard metadata for all resources
   */
  metadata?: ResourceMetadata;

  /**
   * Agent specification (user-provided configuration)
   */
  spec?: AgentSpec;
}

/**
 * Agent specification (user-provided configuration)
 */
export interface AgentSpec {
  /**
   * Description of the agent's purpose
   */
  description?: string;

  /**
   * Status of the agent
   */
  status?: number;
}

export interface Pagination {
  nextCursor?: string;

  total?: number;
}

/**
 * Standard metadata for all resources
 */
export interface ResourceMetadata {
  /**
   * Unique identifier for the resource
   */
  id?: string;

  /**
   * Optional human-readable identifier (e.g., callsign for agents)
   */
  callsign?: string;

  labels?: { [key: string]: string };

  name?: string;

  /**
   * Workspace this resource belongs to
   */
  workspaceId?: string;
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
   * Standard metadata for all resources
   */
  metadata?: ResourceMetadata;

  /**
   * Agent specification (user-provided configuration)
   */
  spec?: AgentSpec;
}

export interface AgentUpdateParams {
  /**
   * Agent ID (from path)
   */
  body_id?: string;

  /**
   * Standard metadata for all resources
   */
  metadata?: ResourceMetadata;

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

export declare namespace Agents {
  export {
    type Agent as Agent,
    type AgentSpec as AgentSpec,
    type Pagination as Pagination,
    type ResourceMetadata as ResourceMetadata,
    type AgentListResponse as AgentListResponse,
    type AgentCreateParams as AgentCreateParams,
    type AgentUpdateParams as AgentUpdateParams,
    type AgentListParams as AgentListParams,
  };
}
