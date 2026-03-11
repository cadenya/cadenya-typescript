// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as Shared from './shared';
import { WorkspacesCursorPagination } from './shared';
import { APIPromise } from '../core/api-promise';
import { CursorPagination, type CursorPaginationParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';

/**
 * WorkspaceService manages workspaces at the ACCOUNT level.
 *  This service is responsible for creating and listing workspaces within an account.
 *  Workspaces provide organizational grouping for resources within an account.
 *
 *  Authentication: Bearer token (JWT)
 *  Scope: Account-level operations (manages workspaces themselves, not resources within workspaces)
 */
export class Workspaces extends APIResource {
  /**
   * Creates a new workspace for the account
   */
  create(body: WorkspaceCreateParams, options?: RequestOptions): APIPromise<Shared.Workspace> {
    return this._client.post('/v1/workspaces', { body, ...options });
  }

  /**
   * Lists all workspaces for the current account
   */
  list(
    query: WorkspaceListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<WorkspacesCursorPagination, Shared.Workspace> {
    return this._client.getAPIList('/v1/workspaces', CursorPagination<Shared.Workspace>, {
      query,
      ...options,
    });
  }

  /**
   * Retrieves the workspace associated with the current API token. Useful for
   * workspace-scoped tokens to identify which workspace they belong to.
   */
  get(options?: RequestOptions): APIPromise<Shared.Workspace> {
    return this._client.get('/v1/workspaces/current', options);
  }
}

export interface WorkspaceSpec {
  description?: string;
}

export interface WorkspaceCreateParams {
  /**
   * CreateResourceMetadata contains the user-provided fields for creating a
   * workspace-scoped resource. Read-only fields (id, account_id, workspace_id,
   * profile_id, created_at) are excluded since they are set by the server.
   */
  metadata: Shared.CreateResourceMetadata;

  spec: WorkspaceSpec;
}

export interface WorkspaceListParams extends CursorPaginationParams {
  /**
   * When set to true you may use more of your alloted API rate-limit
   */
  includeInfo?: boolean;

  /**
   * Sort order for results (asc or desc by creation time)
   */
  sortOrder?: string;
}

export declare namespace Workspaces {
  export {
    type WorkspaceSpec as WorkspaceSpec,
    type WorkspaceCreateParams as WorkspaceCreateParams,
    type WorkspaceListParams as WorkspaceListParams,
  };
}

export { type WorkspacesCursorPagination };
