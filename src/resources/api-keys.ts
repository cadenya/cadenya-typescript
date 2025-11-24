// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { CursorPagination, type CursorPaginationParams, PagePromise } from '../core/pagination';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

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
   * Account-level metadata (no workspace_id since API Keys belong to accounts)
   */
  metadata?: APIKey.Metadata;

  /**
   * APIKeySpec contains the API Key-specific fields
   */
  spec?: APIKeySpec;
}

export namespace APIKey {
  /**
   * Account-level metadata (no workspace_id since API Keys belong to accounts)
   */
  export interface Metadata {
    /**
     * Unique identifier for the resource (UUID v7)
     */
    id?: string;

    /**
     * Account this resource belongs to for multi-tenant isolation (UUID v7)
     */
    accountId?: string;

    /**
     * External ID for the resource (e.g., a workflow ID from an external system)
     */
    externalId?: string;

    /**
     * Arbitrary key-value pairs for categorization and filtering Examples:
     * {"environment": "production", "team": "platform", "version": "v2"}
     */
    labels?: { [key: string]: string };

    /**
     * Human-readable name for the resource (e.g., "Customer Support Agent", "Email
     * Tool") Required for resources that users interact with directly
     */
    name?: string;
  }
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
   * Status of the API Key (can be disabled without deleting)
   */
  status?: 'API_KEY_STATUS_UNSPECIFIED' | 'API_KEY_STATUS_ACTIVE' | 'API_KEY_STATUS_REVOKED';
}

export interface APIKeyCreateParams {
  /**
   * Account-level metadata for the new API Key
   */
  metadata?: APIKeyCreateParams.Metadata;

  /**
   * APIKeySpec contains the API Key-specific fields
   */
  spec?: APIKeySpec;
}

export namespace APIKeyCreateParams {
  /**
   * Account-level metadata for the new API Key
   */
  export interface Metadata {
    /**
     * External ID for the resource (e.g., a workflow ID from an external system)
     */
    externalId?: string;

    /**
     * Arbitrary key-value pairs for categorization and filtering Examples:
     * {"environment": "production", "team": "platform", "version": "v2"}
     */
    labels?: { [key: string]: string };

    /**
     * Human-readable name for the resource (e.g., "Customer Support Agent", "Email
     * Tool") Required for resources that users interact with directly
     */
    name?: string;
  }
}

export interface APIKeyUpdateParams {
  /**
   * Account-level metadata for the API Key
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
   * Account-level metadata for the API Key
   */
  export interface Metadata {
    /**
     * External ID for the resource (e.g., a workflow ID from an external system)
     */
    externalId?: string;

    /**
     * Arbitrary key-value pairs for categorization and filtering Examples:
     * {"environment": "production", "team": "platform", "version": "v2"}
     */
    labels?: { [key: string]: string };

    /**
     * Human-readable name for the resource (e.g., "Customer Support Agent", "Email
     * Tool") Required for resources that users interact with directly
     */
    name?: string;
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
