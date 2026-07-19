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
   *
   * @example
   * ```ts
   * const workspace = await client.workspaceAdmin.create({
   *   metadata: { name: 'name' },
   *   spec: {},
   * });
   * ```
   */
  create(body: WorkspaceAdminCreateParams, options?: RequestOptions): APIPromise<WorkspacesAPI.Workspace> {
    return this._client.post('/v1/account/workspaces', { body, ...options });
  }

  /**
   * Retrieves a workspace in the account by ID. Admin only.
   *
   * @example
   * ```ts
   * const workspace = await client.workspaceAdmin.retrieve({
   *   workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q',
   * });
   * ```
   */
  retrieve(
    params: WorkspaceAdminRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<WorkspacesAPI.Workspace> {
    const { workspaceId = this._client.workspaceID } = params ?? {};
    return this._client.get(path`/v1/account/workspaces/${workspaceId}`, options);
  }

  /**
   * Updates a workspace's metadata (e.g. name) and spec. Admin only.
   *
   * @example
   * ```ts
   * const workspace = await client.workspaceAdmin.update({
   *   workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q',
   * });
   * ```
   */
  update(
    params: WorkspaceAdminUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<WorkspacesAPI.Workspace> {
    const { workspaceId = this._client.workspaceID, ...body } = params ?? {};
    return this._client.patch(path`/v1/account/workspaces/${workspaceId}`, { body, ...options });
  }

  /**
   * Lists every workspace in the account, optionally including archived ones. Admin
   * only.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const workspace of client.workspaceAdmin.list()) {
   *   // ...
   * }
   * ```
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
   *
   * @example
   * ```ts
   * await client.workspaceAdmin.archive({
   *   workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q',
   * });
   * ```
   */
  archive(
    params: WorkspaceAdminArchiveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<void> {
    const { workspaceId = this._client.workspaceID } = params ?? {};
    return this._client.delete(path`/v1/account/workspaces/${workspaceId}`, {
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
     * Key-value pairs for categorization and filtering. Values are 0-63 alphanumeric
     * characters with "-", "\_", or "." allowed between; keys follow the same shape
     * and additionally accept an optional DNS-subdomain prefix (e.g. "cadenya.com/")
     * of at most 253 characters. Examples: {"environment": "production", "team":
     * "platform", "version": "v2"}
     */
    labels?: { [key: string]: string };
  }
}

export interface WorkspaceAdminRetrieveParams {
  /**
   * Workspace ID to retrieve (path).
   */
  workspaceId?: string;
}

export interface WorkspaceAdminUpdateParams {
  /**
   * Path param: Workspace ID to update (path).
   */
  workspaceId?: string;

  /**
   * Body param: UpdateAccountResourceMetadata contains the user-provided fields for
   * updating an account-scoped resource. Read-only fields (id, account_id,
   * profile_id) are excluded since they are set by the server.
   */
  metadata?: WorkspaceAdminUpdateParams.Metadata;

  /**
   * Body param
   */
  spec?: WorkspacesAPI.WorkspaceSpec;

  /**
   * Body param: Fields to update.
   */
  updateMask?: string;
}

export namespace WorkspaceAdminUpdateParams {
  /**
   * UpdateAccountResourceMetadata contains the user-provided fields for updating an
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
     * Key-value pairs for categorization and filtering. Values are 0-63 alphanumeric
     * characters with "-", "\_", or "." allowed between; keys follow the same shape
     * and additionally accept an optional DNS-subdomain prefix (e.g. "cadenya.com/")
     * of at most 253 characters. Examples: {"environment": "production", "team":
     * "platform", "version": "v2"}
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

  /**
   * Filters by metadata labels. Comma-separated key=value pairs, e.g.
   * "env=prod,team=ai". A resource matches only if every pair matches exactly (AND
   * semantics).
   */
  labels?: string;
}

export interface WorkspaceAdminArchiveParams {
  /**
   * Workspace ID to archive (path).
   */
  workspaceId?: string;
}

WorkspaceAdmin.Members = Members;
WorkspaceAdmin.Profiles = Profiles;

export declare namespace WorkspaceAdmin {
  export {
    type WorkspaceMember as WorkspaceMember,
    type WorkspaceAdminCreateParams as WorkspaceAdminCreateParams,
    type WorkspaceAdminRetrieveParams as WorkspaceAdminRetrieveParams,
    type WorkspaceAdminUpdateParams as WorkspaceAdminUpdateParams,
    type WorkspaceAdminListParams as WorkspaceAdminListParams,
    type WorkspaceAdminArchiveParams as WorkspaceAdminArchiveParams,
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
