// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { CursorPagination, type CursorPaginationParams, PagePromise } from '../core/pagination';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class APIKeys extends APIResource {
  /**
   * Creates a new API key in the workspace
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
}

export type APIKeysCursorPagination = CursorPagination<APIKey>;

/**
 * API Keys
 */
export interface APIKey {
  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  metadata?: Shared.ResourceMetadata;

  spec?: APIKeySpec;
}

export interface APIKeySpec {
  token?: string;

  description?: string;

  status?: 'STATUS_ENABLED' | 'STATUS_DISABLED' | 'STATUS_ARCHIVED';
}

export interface APIKeyCreateParams {
  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  metadata?: Shared.ResourceMetadata;

  spec?: APIKeySpec;
}

export interface APIKeyUpdateParams {
  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  metadata?: Shared.ResourceMetadata;

  spec?: APIKeySpec;

  /**
   * Fields to update
   */
  updateMask?: string;
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
