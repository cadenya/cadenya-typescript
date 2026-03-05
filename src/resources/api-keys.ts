// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { CursorPagination, type CursorPaginationParams, PagePromise } from '../core/pagination';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * APIKeyService manages API Keys at the ACCOUNT level.
 *  API Keys belong directly to accounts and can be associated with multiple
 *  workspaces through the Actor model. This allows a single API Key to have
 *  cross-workspace access.
 *
 *  Authentication: Bearer token (JWT)
 *  Scope: Account-level operations
 */
export class APIKeys extends APIResource {
  /**
   * Creates a new API key at the account level. The API key can then be associated
   * with workspaces via the Actor model.
   */
  create(body: APIKeyCreateParams, options?: RequestOptions): APIPromise<APIKey> {
    return this._client.post('/v1/api_keys', { body, ...options });
  }

  /**
   * Retrieves an API key by ID from the account
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<APIKey> {
    return this._client.get(path`/v1/api_keys/${id}`, options);
  }

  /**
   * Updates an API key at the account level
   */
  update(id: string, body: APIKeyUpdateParams, options?: RequestOptions): APIPromise<APIKey> {
    return this._client.patch(path`/v1/api_keys/${id}`, { body, ...options });
  }

  /**
   * Lists all API keys in the account
   */
  list(
    query: APIKeyListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<APIKeysCursorPagination, APIKey> {
    return this._client.getAPIList('/v1/api_keys', CursorPagination<APIKey>, { query, ...options });
  }

  /**
   * Deletes an API key from the account
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
 * APIKey represents a machine/service account at the account level. API Keys are
 * account-scoped resources that can be associated with multiple workspaces through
 * the Actor model. Authentication for API Keys is handled via Cadenya-issued JWTs.
 * A single API Key can now have actors in multiple workspaces, allowing for
 * cross-workspace service accounts.
 */
export interface APIKey {
  /**
   * AccountResourceMetadata is used to represent a resource that is associated to an
   * account but not to a workspace.
   */
  metadata: Shared.AccountResourceMetadata;

  /**
   * APIKeySpec contains the API Key-specific fields
   */
  spec: APIKeySpec;
}

/**
 * APIKeySpec contains the API Key-specific fields
 */
export interface APIKeySpec {
  /**
   * The actual token value (only returned on creation, read-only)
   */
  token?: string;

  /**
   * Description of what this API Key is used for
   */
  description?: string;

  /**
   * workspace_id is used when an API key is scoped to a workspace
   */
  workspaceId?: string;
}

export interface APIKeyCreateParams {
  /**
   * CreateAccountResourceMetadata contains the user-provided fields for creating an
   * account-scoped resource. Read-only fields (id, account_id, profile_id) are
   * excluded since they are set by the server.
   */
  metadata: APIKeyCreateParams.Metadata;

  /**
   * APIKeySpec contains the API Key-specific fields
   */
  spec: APIKeySpec;
}

export namespace APIKeyCreateParams {
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

export interface APIKeyUpdateParams {
  /**
   * UpdateAccountResourceMetadata contains the user-provided fields for updating an
   * account-scoped resource. Read-only fields (id, account_id, profile_id) are
   * excluded since they are set by the server.
   */
  metadata?: APIKeyUpdateParams.Metadata;

  /**
   * APIKeySpec contains the API Key-specific fields
   */
  spec?: APIKeySpec;

  /**
   * Fields to update
   */
  updateMask?: string;
}

export namespace APIKeyUpdateParams {
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
     * Arbitrary key-value pairs for categorization and filtering Examples:
     * {"environment": "production", "team": "platform", "version": "v2"}
     */
    labels?: { [key: string]: string };
  }
}

export interface APIKeyListParams extends CursorPaginationParams {
  /**
   * Filter expression (query param: prefix)
   */
  prefix?: string;

  /**
   * Sort order for results (asc or desc by creation time)
   */
  sortOrder?: string;
}

export declare namespace APIKeys {
  export {
    type APIKey as APIKey,
    type APIKeySpec as APIKeySpec,
    type APIKeysCursorPagination as APIKeysCursorPagination,
    type APIKeyCreateParams as APIKeyCreateParams,
    type APIKeyUpdateParams as APIKeyUpdateParams,
    type APIKeyListParams as APIKeyListParams,
  };
}
