// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { CursorPagination, type CursorPaginationParams, PagePromise } from '../core/pagination';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class AIProviderKeys extends APIResource {
  /**
   * Creates a new customer-provided AI provider key in the workspace
   */
  create(
    workspaceID: string,
    body: AIProviderKeyCreateParams,
    options?: RequestOptions,
  ): APIPromise<AIProviderKey> {
    return this._client.post(path`/v1/workspaces/${workspaceID}/ai_provider_keys`, { body, ...options });
  }

  /**
   * Retrieves an AI provider key by ID from the workspace
   */
  retrieve(
    id: string,
    params: AIProviderKeyRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<AIProviderKey> {
    const { workspaceId } = params;
    return this._client.get(path`/v1/workspaces/${workspaceId}/ai_provider_keys/${id}`, options);
  }

  /**
   * Updates an AI provider key's name or key value in the workspace
   */
  update(id: string, params: AIProviderKeyUpdateParams, options?: RequestOptions): APIPromise<AIProviderKey> {
    const { workspaceId, ...body } = params;
    return this._client.patch(path`/v1/workspaces/${workspaceId}/ai_provider_keys/${id}`, {
      body,
      ...options,
    });
  }

  /**
   * Lists all customer-provided AI provider keys in the workspace
   */
  list(
    workspaceID: string,
    query: AIProviderKeyListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<AIProviderKeysCursorPagination, AIProviderKey> {
    return this._client.getAPIList(
      path`/v1/workspaces/${workspaceID}/ai_provider_keys`,
      CursorPagination<AIProviderKey>,
      { query, ...options },
    );
  }

  /**
   * Deletes an AI provider key from the workspace
   */
  delete(id: string, params: AIProviderKeyDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { workspaceId } = params;
    return this._client.delete(path`/v1/workspaces/${workspaceId}/ai_provider_keys/${id}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export type AIProviderKeysCursorPagination = CursorPagination<AIProviderKey>;

/**
 * AIProviderKey is a customer-provided (BYOK) credential for an AI provider,
 * scoped to a workspace. The secret value is never returned in responses.
 */
export interface AIProviderKey {
  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  metadata: Shared.ResourceMetadata;

  spec: AIProviderKeySpec;
}

export interface AIProviderKeySpec {
  /**
   * The provider credential. Accepted on create/update; never populated in responses
   * (the server returns an empty value to avoid leaking it).
   */
  apiKey?: string;

  /**
   * The AI provider this key authenticates against. Currently "openrouter".
   */
  provider?: string;

  /**
   * The provider region. "us" or "eu". Defaults to "us".
   */
  region?: string;
}

export interface AIProviderKeyCreateParams {
  /**
   * CreateResourceMetadata contains the user-provided fields for creating a
   * workspace-scoped resource. Read-only fields (id, account_id, workspace_id,
   * profile_id, created_at) are excluded since they are set by the server.
   */
  metadata: Shared.CreateResourceMetadata;

  spec: AIProviderKeySpec;
}

export interface AIProviderKeyRetrieveParams {
  /**
   * The workspace the key belongs to.
   */
  workspaceId: string;
}

export interface AIProviderKeyUpdateParams {
  /**
   * Path param: The workspace the key belongs to.
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
  spec?: AIProviderKeySpec;

  /**
   * Body param: Fields to update.
   */
  updateMask?: string;
}

export interface AIProviderKeyListParams extends CursorPaginationParams {
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

export interface AIProviderKeyDeleteParams {
  /**
   * The workspace the key belongs to.
   */
  workspaceId: string;
}

export declare namespace AIProviderKeys {
  export {
    type AIProviderKey as AIProviderKey,
    type AIProviderKeySpec as AIProviderKeySpec,
    type AIProviderKeysCursorPagination as AIProviderKeysCursorPagination,
    type AIProviderKeyCreateParams as AIProviderKeyCreateParams,
    type AIProviderKeyRetrieveParams as AIProviderKeyRetrieveParams,
    type AIProviderKeyUpdateParams as AIProviderKeyUpdateParams,
    type AIProviderKeyListParams as AIProviderKeyListParams,
    type AIProviderKeyDeleteParams as AIProviderKeyDeleteParams,
  };
}
