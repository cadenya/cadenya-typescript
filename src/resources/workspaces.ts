// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as AccountAPI from './account';
import * as AgentsAPI from './agents';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Workspaces extends APIResource {
  /**
   * Creates a new workspace for the account
   */
  create(body: WorkspaceCreateParams, options?: RequestOptions): APIPromise<Workspace> {
    return this._client.post('/v1/workspaces', { body, ...options });
  }

  /**
   * Lists all workspaces for the current account
   */
  list(
    query: WorkspaceListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<WorkspaceListResponse> {
    return this._client.get('/v1/workspaces', { query, ...options });
  }
}

export interface Workspace {
  /**
   * Standard metadata for all resources
   */
  metadata?: AccountAPI.ResourceMetadata;

  spec?: WorkspaceSpec;
}

export interface WorkspaceSpec {
  description?: string;
}

export interface WorkspaceListResponse {
  items?: Array<Workspace>;

  pagination?: AgentsAPI.Pagination;
}

export interface WorkspaceCreateParams {
  /**
   * Standard metadata for all resources
   */
  metadata?: AccountAPI.ResourceMetadata;

  spec?: WorkspaceSpec;
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
    type Workspace as Workspace,
    type WorkspaceSpec as WorkspaceSpec,
    type WorkspaceListResponse as WorkspaceListResponse,
    type WorkspaceCreateParams as WorkspaceCreateParams,
    type WorkspaceListParams as WorkspaceListParams,
  };
}
