// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as WorkspacesAPI from './workspaces';
import { WorkspaceMembersCursorPagination } from './workspaces';
import { APIPromise } from '../../core/api-promise';
import { CursorPagination, type CursorPaginationParams, PagePromise } from '../../core/pagination';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Manage workspaces within an account. Workspaces provide organizational
 *  grouping and isolation for resources such as agents, tools, and API keys.
 *  Workspace creation, archival, and membership management require an account
 *  administrator (a token whose profile holds the admin role).
 */
export class Members extends APIResource {
  /**
   * Lists the members (actors) of a workspace. Requires the admin role.
   */
  list(
    workspaceID: string,
    query: MemberListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<WorkspaceMembersCursorPagination, WorkspacesAPI.WorkspaceMember> {
    return this._client.getAPIList(
      path`/v1/workspaces/${workspaceID}/members`,
      CursorPagination<WorkspacesAPI.WorkspaceMember>,
      { query, ...options },
    );
  }

  /**
   * Grants a profile access to the workspace by creating an actor that links the
   * profile to the workspace. Idempotent — re-adding an active member is a no-op.
   * Requires the admin role.
   */
  add(
    workspaceID: string,
    body: MemberAddParams,
    options?: RequestOptions,
  ): APIPromise<WorkspacesAPI.WorkspaceMember> {
    return this._client.post(path`/v1/workspaces/${workspaceID}/members`, { body, ...options });
  }

  /**
   * Revokes a member's access to the workspace by deactivating their actor. The
   * member is immediately cut off; the underlying profile is not deleted. Requires
   * the admin role.
   */
  remove(id: string, params: MemberRemoveParams, options?: RequestOptions): APIPromise<void> {
    const { workspaceId } = params;
    return this._client.delete(path`/v1/workspaces/${workspaceId}/members/${id}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface MemberListParams extends CursorPaginationParams {}

export interface MemberAddParams {
  /**
   * The existing account profile to add to the workspace.
   */
  profileId?: string;
}

export interface MemberRemoveParams {
  /**
   * The workspace to remove the member from (path).
   */
  workspaceId: string;
}

export declare namespace Members {
  export {
    type MemberListParams as MemberListParams,
    type MemberAddParams as MemberAddParams,
    type MemberRemoveParams as MemberRemoveParams,
  };
}

export { type WorkspaceMembersCursorPagination };
