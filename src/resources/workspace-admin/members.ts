// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as WorkspaceAdminAPI from './workspace-admin';
import { WorkspaceMembersCursorPagination } from './workspace-admin';
import { APIPromise } from '../../core/api-promise';
import { CursorPagination, type CursorPaginationParams, PagePromise } from '../../core/pagination';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Administer workspaces across the account: create and archive workspaces and
 *  manage their membership. These operations are account-scoped and require the
 *  admin role (a token whose profile holds the WorkOS admin role); they live
 *  under /v1/account/workspaces rather than the workspace-scoped /v1/workspaces
 *  tree so an admin can manage any workspace in the account, including ones they
 *  are not themselves a member of.
 */
export class Members extends APIResource {
  /**
   * Lists the members of a workspace. Admin only.
   */
  list(
    workspaceID: string,
    query: MemberListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<WorkspaceMembersCursorPagination, WorkspaceAdminAPI.WorkspaceMember> {
    return this._client.getAPIList(
      path`/v1/account/workspaces/${workspaceID}/members`,
      CursorPagination<WorkspaceAdminAPI.WorkspaceMember>,
      { query, ...options },
    );
  }

  /**
   * Grants a profile access to the workspace by creating (or reactivating) the actor
   * that links the profile to the workspace. Accepts either an existing profile_id
   * or an email to resolve-or-invite. Idempotent for an already-active member. Admin
   * only.
   */
  add(
    workspaceID: string,
    body: MemberAddParams,
    options?: RequestOptions,
  ): APIPromise<WorkspaceAdminAPI.WorkspaceMember> {
    return this._client.post(path`/v1/account/workspaces/${workspaceID}/members`, { body, ...options });
  }

  /**
   * Revokes a member's access by deactivating their actor; the member is immediately
   * cut off. The underlying profile is not deleted. Admin only.
   */
  remove(profileID: string, params: MemberRemoveParams, options?: RequestOptions): APIPromise<void> {
    const { workspaceId } = params;
    return this._client.delete(path`/v1/account/workspaces/${workspaceId}/members/${profileID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface MemberListParams extends CursorPaginationParams {}

export interface MemberAddParams {
  /**
   * Email address to add (resolve-or-invite). Mutually exclusive with profile_id.
   */
  email?: string;

  /**
   * An existing account profile to add. Mutually exclusive with email.
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
