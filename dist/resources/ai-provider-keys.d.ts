import { HttpClient, RequestOptions, APIPromise } from '../core/http.js';
import { Page } from '../core/pagination.js';
import type { AIProviderKey, AIProviderKeySpec, CreateResourceMetadata, UpdateResourceMetadata } from '../types.js';
export interface AiProviderKeyListParams {
    /**
     * The workspace whose keys will be listed.
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
    /**
     * Maximum number of results to return
     */
    limit?: number;
    /**
     * Pagination cursor from previous response
     */
    cursor?: string;
    /**
     * Filter expression (query param: prefix)
     */
    prefix?: string;
    /**
     * Free-form search query
     */
    query?: string;
    /**
     * When true, return only promotional keys (provided by Cadenya, e.g. for
     *  onboarding). Defaults to returning all keys, customer-provided and
     *  promotional alike.
     */
    promotional?: boolean;
    /**
     * Filters by metadata labels. Comma-separated key=value pairs,
     *  e.g. "env=prod,team=ai". A resource matches only if every pair
     *  matches exactly (AND semantics).
     */
    labels?: string;
    /**
     * Sort order for results (asc or desc by creation time)
     */
    sortOrder?: string;
    /**
     * When true, populate each item's info (model counts), at the cost of extra
     *  lookups.
     */
    includeInfo?: boolean;
}
export interface AiProviderKeyCreateParams {
    metadata: CreateResourceMetadata;
    spec: AIProviderKeySpec;
    /**
     * The workspace that will own this key.
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
}
export interface AiProviderKeyRetrieveParams {
    /**
     * The workspace the key belongs to.
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
}
export interface AiProviderKeyDeleteParams {
    /**
     * The workspace the key belongs to.
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
}
export interface AiProviderKeyUpdateParams {
    /**
     * The workspace the key belongs to.
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
    metadata?: UpdateResourceMetadata;
    spec?: AIProviderKeySpec;
    /**
     * Fields to update.
     */
    updateMask?: string;
}
export declare class AiProviderKeys {
    private readonly _client;
    constructor(_client: HttpClient);
    /**
     * List AI provider keys
     *
     * @example
     * ```ts
     * const page = await client.aiProviderKeys.list();
     * for await (const item of page) {
     *   // auto-fetches every page
     * }
     * ```
     */
    list(params?: AiProviderKeyListParams, options?: RequestOptions): Promise<Page<AIProviderKey>>;
    /**
     * Create a new AI provider key
     *
     * @example
     * ```ts
     * const aiProviderKey = await client.aiProviderKeys.create({ metadata: { name: 'sample' }, spec: {  } });
     * ```
     */
    create(params: AiProviderKeyCreateParams, options?: RequestOptions): APIPromise<AIProviderKey>;
    /**
     * Get an AI provider key by ID
     *
     * @example
     * ```ts
     * const aiProviderKey = await client.aiProviderKeys.retrieve('_123');
     * ```
     */
    retrieve(id: string, params?: AiProviderKeyRetrieveParams, options?: RequestOptions): APIPromise<AIProviderKey>;
    /**
     * Delete an AI provider key
     *
     * @example
     * ```ts
     * await client.aiProviderKeys.delete('_123');
     * ```
     */
    delete(id: string, params?: AiProviderKeyDeleteParams, options?: RequestOptions): APIPromise<void>;
    /**
     * Update an AI provider key
     *
     * @example
     * ```ts
     * const aiProviderKey = await client.aiProviderKeys.update('_123');
     * ```
     */
    update(id: string, params?: AiProviderKeyUpdateParams, options?: RequestOptions): APIPromise<AIProviderKey>;
}
//# sourceMappingURL=ai-provider-keys.d.ts.map