// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as AccountAPI from './account';
import { APIPromise } from '../core/api-promise';
import { PagePromise, Pagination, type PaginationParams } from '../core/pagination';
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
  ): PagePromise<WorkspacesPagination, Workspace> {
    return this._client.getAPIList('/v1/workspaces', Pagination<Workspace>, { query, ...options });
  }
}

export type WorkspacesPagination = Pagination<Workspace>;

export interface Workspace {
  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  metadata?: AccountAPI.ResourceMetadata;

  spec?: WorkspaceSpec;
}

export interface WorkspaceSpec {
  description?: string;
}

export interface WorkspaceCreateParams {
  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  metadata?: AccountAPI.ResourceMetadata;

  spec?: WorkspaceSpec;
}

export interface WorkspaceListParams extends PaginationParams {
  /**
   * Sort order for results (asc or desc by creation time)
   */
  sortOrder?: string;
}

export declare namespace Workspaces {
  export {
    type Workspace as Workspace,
    type WorkspaceSpec as WorkspaceSpec,
    type WorkspacesPagination as WorkspacesPagination,
    type WorkspaceCreateParams as WorkspaceCreateParams,
    type WorkspaceListParams as WorkspaceListParams,
  };
}
