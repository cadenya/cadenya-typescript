// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as AccountAPI from './account';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { CursorPagination, type CursorPaginationParams, PagePromise } from '../core/pagination';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class WorkspaceSecrets extends APIResource {
  /**
   * Creates a new workspace secret in the workspace
   */
  create(
    workspaceID: string,
    body: WorkspaceSecretCreateParams,
    options?: RequestOptions,
  ): APIPromise<WorkspaceSecret> {
    return this._client.post(path`/v1/workspaces/${workspaceID}/workspace_secrets`, { body, ...options });
  }

  /**
   * Retrieves a workspace secret by ID from the workspace
   */
  retrieve(
    id: string,
    params: WorkspaceSecretRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<WorkspaceSecret> {
    const { workspaceId } = params;
    return this._client.get(path`/v1/workspaces/${workspaceId}/workspace_secrets/${id}`, options);
  }

  /**
   * Updates a workspace secret in the workspace
   */
  update(
    id: string,
    params: WorkspaceSecretUpdateParams,
    options?: RequestOptions,
  ): APIPromise<WorkspaceSecret> {
    const { workspaceId, ...body } = params;
    return this._client.patch(path`/v1/workspaces/${workspaceId}/workspace_secrets/${id}`, {
      body,
      ...options,
    });
  }

  /**
   * Lists all workspace secrets in the workspace
   */
  list(
    workspaceID: string,
    query: WorkspaceSecretListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<WorkspaceSecretsCursorPagination, WorkspaceSecret> {
    return this._client.getAPIList(
      path`/v1/workspaces/${workspaceID}/workspace_secrets`,
      CursorPagination<WorkspaceSecret>,
      { query, ...options },
    );
  }

  /**
   * Deletes a workspace secret from the workspace
   */
  delete(id: string, params: WorkspaceSecretDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { workspaceId } = params;
    return this._client.delete(path`/v1/workspaces/${workspaceId}/workspace_secrets/${id}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export type WorkspaceSecretsCursorPagination = CursorPagination<WorkspaceSecret>;

export interface WorkspaceSecret {
  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  metadata: Shared.ResourceMetadata;

  spec: WorkspaceSecretSpec;

  /**
   * Workspace secret information
   */
  info?: WorkspaceSecretInfo;
}

export interface WorkspaceSecretInfo {
  /**
   * A profile identifies a user or non-human principal (such as an API key) at the
   * account level. Profiles are account-scoped and can be granted access to multiple
   * workspaces.
   */
  createdBy?: AccountAPI.Profile;

  lastUsedAt?: string;
}

export interface WorkspaceSecretSpec {
  value?: string;
}

export interface WorkspaceSecretCreateParams {
  /**
   * CreateResourceMetadata contains the user-provided fields for creating a
   * workspace-scoped resource. Read-only fields (id, account_id, workspace_id,
   * profile_id, created_at) are excluded since they are set by the server.
   */
  metadata: Shared.CreateResourceMetadata;

  spec: WorkspaceSecretSpec;
}

export interface WorkspaceSecretRetrieveParams {
  /**
   * The workspace the secret belongs to.
   */
  workspaceId: string;
}

export interface WorkspaceSecretUpdateParams {
  /**
   * Path param: The workspace the secret belongs to.
   */
  workspaceId: string;

  /**
   * Body param: UpdateResourceMetadata contains the user-provided fields for
   * updating a workspace-scoped resource. Read-only fields (id, account_id,
   * workspace_id, profile_id, created_at) are excluded since they are set by the
   * server.
   */
  metadata?: Shared.UpdateResourceMetadata;

  /**
   * Body param
   */
  spec?: WorkspaceSecretSpec;

  /**
   * Body param: Fields to update.
   */
  updateMask?: string;
}

export interface WorkspaceSecretListParams extends CursorPaginationParams {
  /**
   * When set to true you may use more of your alloted API rate-limit
   */
  includeInfo?: boolean;

  /**
   * Filter expression (query param: prefix)
   */
  prefix?: string;

  /**
   * Free-form search query
   */
  query?: string;

  /**
   * Sort order for results (asc or desc by creation time)
   */
  sortOrder?: string;
}

export interface WorkspaceSecretDeleteParams {
  /**
   * The workspace the secret belongs to.
   */
  workspaceId: string;
}

export declare namespace WorkspaceSecrets {
  export {
    type WorkspaceSecret as WorkspaceSecret,
    type WorkspaceSecretInfo as WorkspaceSecretInfo,
    type WorkspaceSecretSpec as WorkspaceSecretSpec,
    type WorkspaceSecretsCursorPagination as WorkspaceSecretsCursorPagination,
    type WorkspaceSecretCreateParams as WorkspaceSecretCreateParams,
    type WorkspaceSecretRetrieveParams as WorkspaceSecretRetrieveParams,
    type WorkspaceSecretUpdateParams as WorkspaceSecretUpdateParams,
    type WorkspaceSecretListParams as WorkspaceSecretListParams,
    type WorkspaceSecretDeleteParams as WorkspaceSecretDeleteParams,
  };
}
