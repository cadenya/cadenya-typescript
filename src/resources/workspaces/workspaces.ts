// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';
import * as MembersAPI from './members';
import { MemberAddParams, MemberListParams, MemberRemoveParams, Members } from './members';
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
export class Workspaces extends APIResource {
  members: MembersAPI.Members = new MembersAPI.Members(this._client);

  /**
   * Creates a new workspace in the current account. Requires the admin role.
   */
  create(body: WorkspaceCreateParams, options?: RequestOptions): APIPromise<Workspace> {
    return this._client.post('/v1/workspaces', { body, ...options });
  }

  /**
   * Retrieves a workspace by ID from the current account.
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<Workspace> {
    return this._client.get(path`/v1/workspaces/${id}`, options);
  }

  /**
   * Lists all workspaces for the current account
   */
  list(
    query: WorkspaceListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<WorkspacesCursorPagination, Workspace> {
    return this._client.getAPIList('/v1/workspaces', CursorPagination<Workspace>, { query, ...options });
  }

  /**
   * Archives a workspace. This is a soft delete: the workspace is retained but any
   * subsequent request scoped to it returns a permission error. Requires the admin
   * role.
   */
  delete(id: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/workspaces/${id}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Retrieves the workspace associated with the current API token. Useful for
   * workspace-scoped tokens to identify which workspace they belong to.
   */
  getCurrent(options?: RequestOptions): APIPromise<Workspace> {
    return this._client.get('/v1/workspaces/current', options);
  }
}

export type WorkspacesCursorPagination = CursorPagination<Workspace>;

export type WorkspaceMembersCursorPagination = CursorPagination<WorkspaceMember>;

export interface Workspace {
  /**
   * AccountResourceMetadata is used to represent a resource that is associated to an
   * account but not to a workspace.
   */
  metadata: Shared.AccountResourceMetadata;

  spec: WorkspaceSpec;

  /**
   * Lifecycle status of the workspace. Archived workspaces reject all requests
   * scoped to them. Server-populated.
   */
  status?: 'STATUS_ENABLED' | 'STATUS_DISABLED' | 'STATUS_ARCHIVED';
}

/**
 * A member of a workspace: the profile granted access plus the actor row that
 * links it to the workspace. Returned by member list/add operations.
 */
export interface WorkspaceMember {
  /**
   * The actor row linking the profile to the workspace (the junction record). This
   * is the id used to remove the member.
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

export interface WorkspaceSpec {
  description?: string;
}

export interface WorkspaceCreateParams {
  /**
   * CreateAccountResourceMetadata contains the user-provided fields for creating an
   * account-scoped resource. Read-only fields (id, account_id, profile_id) are
   * excluded since they are set by the server.
   */
  metadata: WorkspaceCreateParams.Metadata;

  spec: WorkspaceSpec;
}

export namespace WorkspaceCreateParams {
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

Workspaces.Members = Members;

export declare namespace Workspaces {
  export {
    type Workspace as Workspace,
    type WorkspaceMember as WorkspaceMember,
    type WorkspaceSpec as WorkspaceSpec,
    type WorkspacesCursorPagination as WorkspacesCursorPagination,
    type WorkspaceCreateParams as WorkspaceCreateParams,
    type WorkspaceListParams as WorkspaceListParams,
  };

  export {
    Members as Members,
    type MemberListParams as MemberListParams,
    type MemberAddParams as MemberAddParams,
    type MemberRemoveParams as MemberRemoveParams,
  };
}
