// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as AccountAPI from './account';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { CursorPagination, type CursorPaginationParams, PagePromise } from '../core/pagination';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Issue, rotate, and revoke API keys for a workspace. Each API key belongs to
 *  exactly one workspace, ensuring isolation between environments.
 */
export class APIKeys extends APIResource {
  /**
   * Creates a new API key in the workspace.
   */
  create(workspaceID: string, body: APIKeyCreateParams, options?: RequestOptions): APIPromise<APIKey> {
    return this._client.post(path`/v1/workspaces/${workspaceID}/api_keys`, { body, ...options });
  }

  /**
   * Retrieves an API key by ID from the workspace
   */
  retrieve(id: string, params: APIKeyRetrieveParams, options?: RequestOptions): APIPromise<APIKey> {
    const { workspaceId } = params;
    return this._client.get(path`/v1/workspaces/${workspaceId}/api_keys/${id}`, options);
  }

  /**
   * Updates an API key in the workspace
   */
  update(id: string, params: APIKeyUpdateParams, options?: RequestOptions): APIPromise<APIKey> {
    const { workspaceId, ...body } = params;
    return this._client.patch(path`/v1/workspaces/${workspaceId}/api_keys/${id}`, { body, ...options });
  }

  /**
   * Lists all API keys in the workspace
   */
  list(
    workspaceID: string,
    query: APIKeyListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<APIKeysCursorPagination, APIKey> {
    return this._client.getAPIList(path`/v1/workspaces/${workspaceID}/api_keys`, CursorPagination<APIKey>, {
      query,
      ...options,
    });
  }

  /**
   * Deletes an API key from the workspace
   */
  delete(id: string, params: APIKeyDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { workspaceId } = params;
    return this._client.delete(path`/v1/workspaces/${workspaceId}/api_keys/${id}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Rotates an API Key and returns a new token. All previous API Key tokens in use
   * will be invalidated.
   */
  rotate(id: string, params: APIKeyRotateParams, options?: RequestOptions): APIPromise<APIKey> {
    const { workspaceId } = params;
    return this._client.put(path`/v1/workspaces/${workspaceId}/api_keys/${id}/rotate`, options);
  }
}

export type APIKeysCursorPagination = CursorPagination<APIKey>;

/**
 * An API key scoped to a single workspace. The key's token is used to authenticate
 * requests against that workspace's resources.
 */
export interface APIKey {
  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  metadata: Shared.ResourceMetadata;

  /**
   * Configuration for an API key.
   */
  spec: APIKeySpec;

  info?: APIKeyInfo;
}

export interface APIKeyInfo {
  /**
   * A profile identifies a user or non-human principal (such as an API key) at the
   * account level. Profiles are account-scoped and can be granted access to multiple
   * workspaces.
   */
  createdBy?: AccountAPI.Profile;
}

/**
 * Configuration for an API key.
 */
export interface APIKeySpec {
  /**
   * The bearer token used to authenticate as this API key. Returned only on creation
   * and rotation; subsequent reads omit this field.
   */
  token?: string;

  /**
   * Free-form description of what this API key is used for.
   */
  description?: string;
}

export interface APIKeyCreateParams {
  /**
   * CreateResourceMetadata contains the user-provided fields for creating a
   * workspace-scoped resource. Read-only fields (id, account_id, workspace_id,
   * profile_id, created_at) are excluded since they are set by the server.
   */
  metadata: Shared.CreateResourceMetadata;

  /**
   * Configuration for an API key.
   */
  spec: APIKeySpec;
}

export interface APIKeyRetrieveParams {
  /**
   * The workspace the API key belongs to.
   */
  workspaceId: string;
}

export interface APIKeyUpdateParams {
  /**
   * Path param: The workspace the API key belongs to.
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
   * Body param: Configuration for an API key.
   */
  spec?: APIKeySpec;

  /**
   * Body param: Fields to update.
   */
  updateMask?: string;
}

export interface APIKeyListParams extends CursorPaginationParams {
  /**
   * Filter by bundle_key — return only resources owned by this bundle.
   */
  bundleKey?: string;

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

export interface APIKeyDeleteParams {
  /**
   * The workspace the API key belongs to.
   */
  workspaceId: string;
}

export interface APIKeyRotateParams {
  /**
   * The workspace the API key belongs to.
   */
  workspaceId: string;
}

export declare namespace APIKeys {
  export {
    type APIKey as APIKey,
    type APIKeyInfo as APIKeyInfo,
    type APIKeySpec as APIKeySpec,
    type APIKeysCursorPagination as APIKeysCursorPagination,
    type APIKeyCreateParams as APIKeyCreateParams,
    type APIKeyRetrieveParams as APIKeyRetrieveParams,
    type APIKeyUpdateParams as APIKeyUpdateParams,
    type APIKeyListParams as APIKeyListParams,
    type APIKeyDeleteParams as APIKeyDeleteParams,
    type APIKeyRotateParams as APIKeyRotateParams,
  };
}
