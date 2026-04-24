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
 * APIKeyService manages workspace-scoped API Keys.
 *  Each API key belongs to a single workspace, ensuring isolation between environments.
 *
 *  Authentication: Bearer token (JWT)
 *  Scope: Workspace-level operations
 */
export class APIKeys extends APIResource {
  /**
   * Creates a new API key in the workspace.
   */
  create(body: APIKeyCreateParams, options?: RequestOptions): APIPromise<APIKey> {
    return this._client.post('/v1/api_keys', { body, ...options });
  }

  /**
   * Retrieves an API key by ID from the workspace
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<APIKey> {
    return this._client.get(path`/v1/api_keys/${id}`, options);
  }

  /**
   * Updates an API key in the workspace
   */
  update(id: string, body: APIKeyUpdateParams, options?: RequestOptions): APIPromise<APIKey> {
    return this._client.patch(path`/v1/api_keys/${id}`, { body, ...options });
  }

  /**
   * Lists all API keys in the workspace
   */
  list(
    query: APIKeyListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<APIKeysCursorPagination, APIKey> {
    return this._client.getAPIList('/v1/api_keys', CursorPagination<APIKey>, { query, ...options });
  }

  /**
   * Deletes an API key from the workspace
   */
  delete(id: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/api_keys/${id}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Rotates an API Key and returns a new token. All previous API Key tokens in use
   * will be invalidated.
   */
  rotate(id: string, options?: RequestOptions): APIPromise<APIKey> {
    return this._client.put(path`/v1/api_keys/${id}/rotate`, options);
  }
}

export type APIKeysCursorPagination = CursorPagination<APIKey>;

/**
 * APIKey represents a workspace-scoped API key. Each API key belongs to exactly
 * one workspace, ensuring workspace isolation. Authentication is handled via
 * Cadenya-issued JWTs signed with the key's own signing secret.
 */
export interface APIKey {
  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  metadata: Shared.ResourceMetadata;

  /**
   * APIKeySpec contains the API Key-specific fields
   */
  spec: APIKeySpec;

  info?: APIKeyInfo;
}

export interface APIKeyInfo {
  /**
   * Profile represents a human user at the account level. Profiles are
   * account-scoped resources that can be associated with multiple workspaces through
   * the Actor model. Authentication for profiles is handled via SSO/OAuth (WorkOS).
   */
  createdBy?: AccountAPI.Profile;
}

/**
 * APIKeySpec contains the API Key-specific fields
 */
export interface APIKeySpec {
  /**
   * The actual token value (only returned on creation and rotation, read-only)
   */
  token?: string;

  /**
   * Description of what this API Key is used for
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
   * APIKeySpec contains the API Key-specific fields
   */
  spec: APIKeySpec;
}

export interface APIKeyUpdateParams {
  /**
   * UpdateResourceMetadata contains the user-provided fields for updating a
   * workspace-scoped resource. Read-only fields (id, account_id, workspace_id,
   * profile_id, created_at) are excluded since they are set by the server.
   */
  metadata?: Shared.UpdateResourceMetadata;

  /**
   * APIKeySpec contains the API Key-specific fields
   */
  spec?: APIKeySpec;

  /**
   * Fields to update
   */
  updateMask?: string;
}

export interface APIKeyListParams extends CursorPaginationParams {
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

export declare namespace APIKeys {
  export {
    type APIKey as APIKey,
    type APIKeyInfo as APIKeyInfo,
    type APIKeySpec as APIKeySpec,
    type APIKeysCursorPagination as APIKeysCursorPagination,
    type APIKeyCreateParams as APIKeyCreateParams,
    type APIKeyUpdateParams as APIKeyUpdateParams,
    type APIKeyListParams as APIKeyListParams,
  };
}
