// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as WorkspacesAPI from '../workspaces';
import { WorkspacesCursorPagination } from '../workspaces';
import * as MembersAPI from './members';
import { MemberAddParams, MemberListParams, MemberRemoveParams, Members } from './members';
import * as ProfilesAPI from './profiles';
import { ProfileListParams, Profiles } from './profiles';
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
export class WorkspaceAdmin extends APIResource {
  members: MembersAPI.Members = new MembersAPI.Members(this._client);
  profiles: ProfilesAPI.Profiles = new ProfilesAPI.Profiles(this._client);

  /**
   * Creates a new workspace in the account. Admin only.
   */
  create(body: WorkspaceAdminCreateParams, options?: RequestOptions): APIPromise<WorkspacesAPI.Workspace> {
    return this._client.post('/v1/account/workspaces', { body, ...options });
  }

  /**
   * Retrieves a workspace in the account by ID. Admin only.
   */
  retrieve(workspaceID: string, options?: RequestOptions): APIPromise<WorkspacesAPI.Workspace> {
    return this._client.get(path`/v1/account/workspaces/${workspaceID}`, options);
  }

  /**
   * Lists every workspace in the account, optionally including archived ones. Admin
   * only.
   */
  list(
    query: WorkspaceAdminListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<WorkspacesCursorPagination, WorkspacesAPI.Workspace> {
    return this._client.getAPIList('/v1/account/workspaces', CursorPagination<WorkspacesAPI.Workspace>, {
      query,
      ...options,
    });
  }

  /**
   * Archives a workspace (soft delete). The workspace is retained, but any
   * subsequent request scoped to it returns a permission error. Archiving the
   * account's last active (non-archived) workspace is not allowed and returns
   * FailedPrecondition. Admin only.
   */
  archive(workspaceID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/account/workspaces/${workspaceID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export type WorkspaceMembersCursorPagination = CursorPagination<WorkspaceMember>;

/**
 * A member of a workspace: the profile granted access plus the actor row that
 * links it to the workspace. Returned by member list/add operations.
 */
export interface WorkspaceMember {
  /**
   * The actor row linking the profile to the workspace (the junction record).
   */
  actorId: string;

  /**
   * The account profile that has access to the workspace.
   */
  profileId: string;

  /**
   * When the member was added to the workspace.
   */
  addedAt?: string;

  /**
   * Email address of the member's profile.
   */
  email?: string;

  /**
   * Display name of the member's profile.
   */
  name?: string;
}

export interface WorkspaceAdminCreateParams {
  /**
   * CreateAccountResourceMetadata contains the user-provided fields for creating an
   * account-scoped resource. Read-only fields (id, account_id, profile_id) are
   * excluded since they are set by the server.
   */
  metadata: WorkspaceAdminCreateParams.Metadata;

  spec: WorkspacesAPI.WorkspaceSpec;
}

export namespace WorkspaceAdminCreateParams {
  /**
   * CreateAccountResourceMetadata contains the user-provided fields for creating an
   * account-scoped resource. Read-only fields (id, account_id, profile_id) are
   * excluded since they are set by the server.
   */
  export interface Metadata {
    /**
     * Human-readable name for the resource (e.g., "Production API Key", "Staging
     * Workspace")
     */
    name: string;

    /**
     * External ID for the resource (e.g., a workflow ID from an external system)
     */
    externalId?: string;

    /**
     * Arbitrary key-value pairs for categorization and filtering Examples:
     * {"environment": "production", "team": "platform", "version": "v2"}
     */
    labels?: { [key: string]: string };
  }
}

export interface WorkspaceAdminListParams extends CursorPaginationParams {
  /**
   * When true, archived workspaces are included in the results. Defaults to false
   * (active workspaces only).
   */
  includeArchived?: boolean;
}

WorkspaceAdmin.Members = Members;
WorkspaceAdmin.Profiles = Profiles;

export declare namespace WorkspaceAdmin {
  export {
    type WorkspaceMember as WorkspaceMember,
    type WorkspaceAdminCreateParams as WorkspaceAdminCreateParams,
    type WorkspaceAdminListParams as WorkspaceAdminListParams,
  };

  export {
    Members as Members,
    type MemberListParams as MemberListParams,
    type MemberAddParams as MemberAddParams,
    type MemberRemoveParams as MemberRemoveParams,
  };

  export { Profiles as Profiles, type ProfileListParams as ProfileListParams };
}

export { type WorkspacesCursorPagination };
