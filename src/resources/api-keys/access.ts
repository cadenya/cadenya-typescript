// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as WorkspacesAPI from '../workspaces';
import { WorkspacesCursorPagination } from '../workspaces';
import * as APIKeysAPI from './api-keys';
import { APIPromise } from '../../core/api-promise';
import { CursorPagination, type CursorPaginationParams, PagePromise } from '../../core/pagination';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Issue, rotate, and revoke API keys for the account, and grant or revoke
 *  each key's access to individual workspaces.
 */
export class Access extends APIResource {
  /**
   * Lists the workspaces this API key has access to. Cursor-paginated.
   */
  list(
    id: string,
    query: AccessListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<WorkspacesCursorPagination, WorkspacesAPI.Workspace> {
    return this._client.getAPIList(
      path`/v1/account/api_keys/${id}/workspaces`,
      CursorPagination<WorkspacesAPI.Workspace>,
      { query, ...options },
    );
  }

  /**
   * Grants this API key access to the specified workspace. Idempotent — adding an
   * already-associated workspace is a no-op. Returns the updated API key with
   * refreshed workspace preview and total.
   */
  add(id: string, body: AccessAddParams, options?: RequestOptions): APIPromise<APIKeysAPI.APIKey> {
    return this._client.post(path`/v1/account/api_keys/${id}/workspaces`, { body, ...options });
  }

  /**
   * Revokes this API key's access to the specified workspace. Idempotent. A key may
   * have zero workspaces and remains valid.
   */
  remove(workspaceID: string, params: AccessRemoveParams, options?: RequestOptions): APIPromise<void> {
    const { id } = params;
    return this._client.delete(path`/v1/account/api_keys/${id}/workspaces/${workspaceID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface AccessListParams extends CursorPaginationParams {}

export interface AccessAddParams {
  /**
   * The workspace to grant access to.
   */
  workspaceId?: string;
}

export interface AccessRemoveParams {
  /**
   * The API key losing workspace access (path).
   */
  id: string;
}

export declare namespace Access {
  export {
    type AccessListParams as AccessListParams,
    type AccessAddParams as AccessAddParams,
    type AccessRemoveParams as AccessRemoveParams,
  };
}

export { type WorkspacesCursorPagination };
