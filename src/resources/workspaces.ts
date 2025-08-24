// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as AgentsAPI from './agents';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Workspaces extends APIResource {
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
    type WorkspaceListResponse as WorkspaceListResponse,
    type WorkspaceListParams as WorkspaceListParams,
  };
}
