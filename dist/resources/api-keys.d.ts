import { HttpClient, RequestOptions, APIPromise } from '../core/http.js';
import { Page } from '../core/pagination.js';
import type { APIKey, APIKeySpecParam, CreateAccountResourceMetadata, UpdateAccountResourceMetadata } from '../types.js';
export interface ApiKeyListParams {
    /**
     * The workspace whose API keys will be listed (path).
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
    /**
     * Maximum number of results to return.
     */
    limit?: number;
    /**
     * Pagination cursor from previous response.
     */
    cursor?: string;
    /**
     * Filter by ID prefix.
     */
    prefix?: string;
    /**
     * Free-form search query.
     */
    query?: string;
    /**
     * Filters by metadata labels. Comma-separated key=value pairs,
     *  e.g. "env=prod,team=ai". A resource matches only if every pair
     *  matches exactly (AND semantics).
     */
    labels?: string;
    /**
     * Sort order for results (asc or desc by creation time).
     */
    sortOrder?: string;
    /**
     * When true, included info fields are populated. Requests with this
     *  flag count more against your rate limit.
     */
    includeInfo?: boolean;
}
export interface ApiKeyCreateParams {
    metadata: CreateAccountResourceMetadata;
    spec: APIKeySpecParam;
    /**
     * The workspace this API key belongs to (path).
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
}
export interface ApiKeyRetrieveParams {
    /**
     * The workspace the API key belongs to (path).
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
}
export interface ApiKeyDeleteParams {
    /**
     * The workspace the API key belongs to (path).
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
}
export interface ApiKeyUpdateParams {
    /**
     * The workspace the API key belongs to (path).
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
    metadata?: UpdateAccountResourceMetadata;
    spec?: APIKeySpecParam;
    /**
     * Fields to update.
     */
    updateMask?: string;
}
export interface ApiKeyDisableParams {
    /**
     * The workspace the API key belongs to (path).
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
}
export interface ApiKeyEnableParams {
    /**
     * The workspace the API key belongs to (path).
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
}
export interface ApiKeyRotateParams {
    /**
     * The workspace the API key belongs to (path).
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
}
export declare class ApiKeys {
    private readonly _client;
    constructor(_client: HttpClient);
    /**
     * Get the global API key
     *
     * @example
     * ```ts
     * const apiKey = await client.apiKeys.retrieveGlobal();
     * ```
     */
    retrieveGlobal(options?: RequestOptions): APIPromise<APIKey>;
    /**
     * Disable the global API key
     *
     * @example
     * ```ts
     * const apiKey = await client.apiKeys.disableGlobal();
     * ```
     */
    disableGlobal(options?: RequestOptions): APIPromise<APIKey>;
    /**
     * Enable the global API key
     *
     * @example
     * ```ts
     * const apiKey = await client.apiKeys.enableGlobal();
     * ```
     */
    enableGlobal(options?: RequestOptions): APIPromise<APIKey>;
    /**
     * Rotate the global API key
     *
     * @example
     * ```ts
     * const apiKey = await client.apiKeys.rotateGlobal();
     * ```
     */
    rotateGlobal(options?: RequestOptions): APIPromise<APIKey>;
    /**
     * List API keys
     *
     * @example
     * ```ts
     * const page = await client.apiKeys.list();
     * for await (const item of page) {
     *   // auto-fetches every page
     * }
     * ```
     */
    list(params?: ApiKeyListParams, options?: RequestOptions): Promise<Page<APIKey>>;
    /**
     * Create a new API key
     *
     * @example
     * ```ts
     * const apiKey = await client.apiKeys.create({ metadata: { name: 'sample' }, spec: {  } });
     * ```
     */
    create(params: ApiKeyCreateParams, options?: RequestOptions): APIPromise<APIKey>;
    /**
     * Get an API key by ID
     *
     * @example
     * ```ts
     * const apiKey = await client.apiKeys.retrieve('_123');
     * ```
     */
    retrieve(id: string, params?: ApiKeyRetrieveParams, options?: RequestOptions): APIPromise<APIKey>;
    /**
     * Delete an API key
     *
     * @example
     * ```ts
     * await client.apiKeys.delete('_123');
     * ```
     */
    delete(id: string, params?: ApiKeyDeleteParams, options?: RequestOptions): APIPromise<void>;
    /**
     * Update an API key
     *
     * @example
     * ```ts
     * const apiKey = await client.apiKeys.update('_123');
     * ```
     */
    update(id: string, params?: ApiKeyUpdateParams, options?: RequestOptions): APIPromise<APIKey>;
    /**
     * Disable an API key
     *
     * @example
     * ```ts
     * const apiKey = await client.apiKeys.disable('_123');
     * ```
     */
    disable(id: string, params?: ApiKeyDisableParams, options?: RequestOptions): APIPromise<APIKey>;
    /**
     * Enable an API key
     *
     * @example
     * ```ts
     * const apiKey = await client.apiKeys.enable('_123');
     * ```
     */
    enable(id: string, params?: ApiKeyEnableParams, options?: RequestOptions): APIPromise<APIKey>;
    /**
     * Rotate an API key
     *
     * @example
     * ```ts
     * const apiKey = await client.apiKeys.rotate('_123');
     * ```
     */
    rotate(id: string, params?: ApiKeyRotateParams, options?: RequestOptions): APIPromise<APIKey>;
}
//# sourceMappingURL=api-keys.d.ts.map