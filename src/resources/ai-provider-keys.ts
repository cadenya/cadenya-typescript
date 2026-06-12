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
 * AIProviderKey is a credential for an AI provider, scoped to a workspace. Most
 * keys are customer-provided (BYOK); Cadenya also provisions promotional keys (see
 * AIProviderKeyInfo.is_promotional), which cannot be modified or deleted by
 * account administrators. The secret value is never returned in responses.
 */
export interface AIProviderKey {
  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  metadata: Shared.ResourceMetadata;

  spec: AIProviderKeySpec;

  /**
   * AIProviderKeyInfo carries server-derived, read-only details about a key, for AI
   * provider management UIs.
   */
  info?: AIProviderKey.Info;
}

export namespace AIProviderKey {
  /**
   * AIProviderKeyInfo carries server-derived, read-only details about a key, for AI
   * provider management UIs.
   */
  export interface Info {
    /**
     * Number of disabled models provisioned on this key.
     */
    disabledModelCount?: number;

    /**
     * Number of enabled models provisioned on this key.
     */
    enabledModelCount?: number;

    /**
     * Cadenya includes promotional keys (one for onboarding, and potentially more in
     * the future). These are not added or maintained by account administrators.
     */
    isPromotional?: boolean;
  }
}

export interface AIProviderKeySpec {
  /**
   * The provider credential. Accepted on create/update; never populated in responses
   * (the server returns an empty value to avoid leaking it).
   */
  apiKey?: string;

  /**
   * OpenRouterConfig holds OpenRouter-specific settings. Empty for now; it exists as
   * the oneof seam so provider-specific options (region, base URL, etc.) can be
   * added later without restructuring the spec.
   */
  openrouter?: unknown;

  /**
   * The AI provider this key authenticates against.
   */
  provider?: 'AI_PROVIDER_UNSPECIFIED' | 'AI_PROVIDER_OPENROUTER';
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
   * When true, populate each item's info (model counts), at the cost of extra
   * lookups.
   */
  includeInfo?: boolean;

  /**
   * Filter expression (query param: prefix)
   */
  prefix?: string;

  /**
   * When true, return only promotional keys (provided by Cadenya, e.g. for
   * onboarding). Defaults to returning all keys, customer-provided and promotional
   * alike.
   */
  promotional?: boolean;

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
