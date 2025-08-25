// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as AgentsAPI from './agents';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Workspaces extends APIResource {
  /**
   * Creates a new workspace for the account
   */
  create(body: WorkspaceCreateParams, options?: RequestOptions): APIPromise<WorkspaceCreateResponse> {
    return this._client.post('/v1/workspaces', { body, ...options });
  }

  /**
   * Lists all workspaces
   */
  list(
    query: WorkspaceListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<WorkspaceListResponse> {
    return this._client.get('/v1/workspaces', { query, ...options });
  }
}

export interface WorkspaceCreateResponse {
  /**
   * Standard metadata for all resources
   */
  metadata?: AgentsAPI.ResourceMetadata;

  spec?: WorkspaceCreateResponse.Spec;
}

export namespace WorkspaceCreateResponse {
  export interface Spec {
    description?: string;
  }
}

export interface WorkspaceListResponse {
  items?: Array<WorkspaceListResponse.Item>;

  pagination?: AgentsAPI.Pagination;
}

export namespace WorkspaceListResponse {
  export interface Item {
    /**
     * Standard metadata for all resources
     */
    metadata?: AgentsAPI.ResourceMetadata;

    spec?: Item.Spec;
  }

  export namespace Item {
    export interface Spec {
      description?: string;
    }
  }
}

export interface WorkspaceCreateParams {
  /**
   * Standard metadata for all resources
   */
  metadata?: AgentsAPI.ResourceMetadata;

  spec?: WorkspaceCreateParams.Spec;
}

export namespace WorkspaceCreateParams {
  export interface Spec {
    description?: string;
  }
}

export interface WorkspaceListParams {
  page?: WorkspaceListParams.Page;
}

export namespace WorkspaceListParams {
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

export declare namespace Workspaces {
  export {
    type WorkspaceCreateResponse as WorkspaceCreateResponse,
    type WorkspaceListResponse as WorkspaceListResponse,
    type WorkspaceCreateParams as WorkspaceCreateParams,
    type WorkspaceListParams as WorkspaceListParams,
  };
}
