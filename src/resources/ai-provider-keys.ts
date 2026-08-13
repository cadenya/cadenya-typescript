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
  create(params: AIProviderKeyCreateParams, options?: RequestOptions): APIPromise<AIProviderKey> {
    const { workspaceId = this._client.workspaceID, ...body } = params;
    return this._client.post(path`/v1/workspaces/${workspaceId}/ai_provider_keys`, { body, ...options });
  }

  /**
   * Retrieves an AI provider key by ID from the workspace
   */
  retrieve(
    id: string,
    params: AIProviderKeyRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<AIProviderKey> {
    const { workspaceId = this._client.workspaceID } = params ?? {};
    return this._client.get(path`/v1/workspaces/${workspaceId}/ai_provider_keys/${id}`, options);
  }

  /**
   * Updates an AI provider key's name or key value in the workspace
   */
  update(id: string, params: AIProviderKeyUpdateParams, options?: RequestOptions): APIPromise<AIProviderKey> {
    const { workspaceId = this._client.workspaceID, ...body } = params;
    return this._client.patch(path`/v1/workspaces/${workspaceId}/ai_provider_keys/${id}`, {
      body,
      ...options,
    });
  }

  /**
   * Lists all customer-provided AI provider keys in the workspace
   */
  list(
    params: AIProviderKeyListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<AIProviderKeysCursorPagination, AIProviderKey> {
    const { workspaceId = this._client.workspaceID, ...query } = params ?? {};
    return this._client.getAPIList(
      path`/v1/workspaces/${workspaceId}/ai_provider_keys`,
      CursorPagination<AIProviderKey>,
      { query, ...options },
    );
  }

  /**
   * Deletes an AI provider key from the workspace
   */
  delete(
    id: string,
    params: AIProviderKeyDeleteParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<void> {
    const { workspaceId = this._client.workspaceID } = params ?? {};
    return this._client.delete(path`/v1/workspaces/${workspaceId}/ai_provider_keys/${id}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export type AIProviderKeysCursorPagination = CursorPagination<AIProviderKey>;

export interface AIProviderConfigOpenAI {
  /**
   * OpenAIConfig holds OpenAI-specific settings.
   */
  openai: AIProviderConfigOpenAI.OpenAI;

  type: 'openai';
}

export namespace AIProviderConfigOpenAI {
  /**
   * OpenAIConfig holds OpenAI-specific settings.
   */
  export interface OpenAI {
    /**
     * Sent as the OpenAI-Organization header when set.
     */
    organizationId?: string;

    /**
     * Sent as the OpenAI-Project header when set.
     */
    projectId?: string;
  }
}

export interface AIProviderConfigOpenAICompatible {
  /**
   * OpenAICompatibleConfig configures a generic endpoint that speaks the OpenAI Chat
   * Completions API. The base URL is required and its model catalog is discovered
   * live via GET {base_url}/models.
   */
  openaiCompatible: AIProviderConfigOpenAICompatible.OpenAICompatible;

  type: 'openaiCompatible';
}

export namespace AIProviderConfigOpenAICompatible {
  /**
   * OpenAICompatibleConfig configures a generic endpoint that speaks the OpenAI Chat
   * Completions API. The base URL is required and its model catalog is discovered
   * live via GET {base_url}/models.
   */
  export interface OpenAICompatible {
    baseUrl: string;
  }
}

export interface AIProviderConfigOpenrouter {
  /**
   * OpenRouterConfig holds OpenRouter-specific settings.
   */
  openrouter: AIProviderConfigOpenrouter.Openrouter;

  type: 'openrouter';
}

export namespace AIProviderConfigOpenrouter {
  /**
   * OpenRouterConfig holds OpenRouter-specific settings.
   */
  export interface Openrouter {
    /**
     * Data-residency region (e.g. "us", "eu"). Empty uses the provider default.
     */
    region?: string;
  }
}

export interface AIProviderCredentialAPIKey {
  /**
   * CredentialAPIKey carries a single bearer/header API key.
   */
  apiKey: AIProviderCredentialAPIKey.APIKey;

  type: 'apiKey';
}

export namespace AIProviderCredentialAPIKey {
  /**
   * CredentialAPIKey carries a single bearer/header API key.
   */
  export interface APIKey {
    apiKey?: string;
  }
}

export interface AIProviderCredentialHeaders {
  /**
   * CredentialHeaders carries arbitrary HTTP headers sent with every request to the
   * provider (e.g. {"Authorization": "Bearer ...", "X-Api-Key": "..."}).
   */
  headers: AIProviderCredentialHeaders.Headers;

  type: 'headers';
}

export namespace AIProviderCredentialHeaders {
  /**
   * CredentialHeaders carries arbitrary HTTP headers sent with every request to the
   * provider (e.g. {"Authorization": "Bearer ...", "X-Api-Key": "..."}).
   */
  export interface Headers {
    headers?: { [key: string]: string };
  }
}

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
    disabledModelCount: number;

    /**
     * Number of enabled models provisioned on this key.
     */
    enabledModelCount: number;

    /**
     * Cadenya includes promotional keys (one for onboarding, and potentially more in
     * the future). These are not added or maintained by account administrators.
     */
    isPromotional: boolean;
  }
}

export interface AIProviderKeySpec {
  /**
   * AIProviderConfig holds non-secret, provider-specific settings. The set case must
   * correspond to AIProviderKeySpec.provider. Providers with no settings (Anthropic,
   * Gemini) simply leave this unset. The endpoint of a named provider is fixed and
   * intentionally not overridable here; use the OpenAI-compatible provider to target
   * a custom endpoint.
   */
  config?: AIProviderConfigOpenrouter | AIProviderConfigOpenAI | AIProviderConfigOpenAICompatible;

  /**
   * AIProviderCredential is the secret material used to authenticate with a
   * provider. The set case must correspond to AIProviderKeySpec.provider. The server
   * encrypts the serialized message at rest and never returns it on reads.
   */
  credentials?: AIProviderCredentialAPIKey | AIProviderCredentialHeaders;

  /**
   * The AI provider this key authenticates against.
   */
  provider?:
    | 'AI_PROVIDER_UNSPECIFIED'
    | 'AI_PROVIDER_OPENROUTER'
    | 'AI_PROVIDER_OPENAI'
    | 'AI_PROVIDER_ANTHROPIC'
    | 'AI_PROVIDER_GEMINI'
    | 'AI_PROVIDER_OPENAI_COMPATIBLE';
}

export interface AIProviderKeyCreateParams {
  /**
   * Path param: The workspace that will own this key.
   */
  workspaceId?: string;

  /**
   * Body param: CreateResourceMetadata contains the user-provided fields for
   * creating a workspace-scoped resource. Read-only fields (id, account_id,
   * workspace_id, profile_id, created_at) are excluded since they are set by the
   * server.
   */
  metadata: Shared.CreateResourceMetadata;

  /**
   * Body param
   */
  spec: AIProviderKeySpec;
}

export interface AIProviderKeyRetrieveParams {
  /**
   * The workspace the key belongs to.
   */
  workspaceId?: string;
}

export interface AIProviderKeyUpdateParams {
  /**
   * Path param: The workspace the key belongs to.
   */
  workspaceId?: string;

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
   * Path param: The workspace whose keys will be listed.
   */
  workspaceId?: string;

  /**
   * Query param: When true, populate each item's info (model counts), at the cost of
   * extra lookups.
   */
  includeInfo?: boolean;

  /**
   * Query param: Filters by metadata labels. Comma-separated key=value pairs, e.g.
   * "env=prod,team=ai". A resource matches only if every pair matches exactly (AND
   * semantics).
   */
  labels?: string;

  /**
   * Query param: Filter expression (query param: prefix)
   */
  prefix?: string;

  /**
   * Query param: When true, return only promotional keys (provided by Cadenya, e.g.
   * for onboarding). Defaults to returning all keys, customer-provided and
   * promotional alike.
   */
  promotional?: boolean;

  /**
   * Query param: Free-form search query
   */
  query?: string;

  /**
   * Query param: Sort order for results (asc or desc by creation time)
   */
  sortOrder?: string;
}

export interface AIProviderKeyDeleteParams {
  /**
   * The workspace the key belongs to.
   */
  workspaceId?: string;
}

export declare namespace AIProviderKeys {
  export {
    type AIProviderConfigOpenAI as AIProviderConfigOpenAI,
    type AIProviderConfigOpenAICompatible as AIProviderConfigOpenAICompatible,
    type AIProviderConfigOpenrouter as AIProviderConfigOpenrouter,
    type AIProviderCredentialAPIKey as AIProviderCredentialAPIKey,
    type AIProviderCredentialHeaders as AIProviderCredentialHeaders,
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
