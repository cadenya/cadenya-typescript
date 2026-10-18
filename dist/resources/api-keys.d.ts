import { HttpClient, RequestOptions, APIPromise } from '../core/http.js';
import { Page } from '../core/pagination.js';
import type { APIKey, APIKeySpecParam, CreateAccountResourceMetadata, UpdateAccountResourceMetadata } from '../types.js';
export interface ApiKeyListParams {
    /**
     * Lists only keys that can reach this workspace (query parameter). Accepts
     *  the canonical ID or the `external_id:<value>` form.
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
}
export interface ApiKeyUpdateParams {
    metadata?: UpdateAccountResourceMetadata;
    spec?: APIKeySpecParam;
    /**
     * Fields to update. Selecting spec.workspace_assignments replaces the whole
     *  set; selecting spec.all_workspaces turns the all-workspaces grant on or
     *  off. Turning it off keeps the workspaces the key currently reaches.
     */
    updateMask?: string;
}
export interface ApiKeyAddWorkspaceParams {
    /**
     * The workspace to assign. Accepts the canonical ID or the
     *  `external_id:<value>` form.
     */
    workspaceId: string;
}
export interface ApiKeyRemoveWorkspaceParams {
    /**
     * The workspace to remove. Accepts the canonical ID or the
     *  `external_id:<value>` form.
     */
    workspaceId: string;
}
export declare class ApiKeys {
    private readonly _client;
    constructor(_client: HttpClient);
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
     * const apiKey = await client.apiKeys.create({ metadata: { name: 'sample' }, spec: { allWorkspaces: true, workspaceAssignments: [{ workspaceId: 'sample' }] } });
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
    retrieve(id: string, options?: RequestOptions): APIPromise<APIKey>;
    /**
     * Delete an API key
     *
     * @example
     * ```ts
     * await client.apiKeys.delete('_123');
     * ```
     */
    delete(id: string, options?: RequestOptions): APIPromise<void>;
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
     * Assign a workspace to an API key
     *
     * @example
     * ```ts
     * const apiKey = await client.apiKeys.addWorkspace('_123', { workspaceId: 'sample' });
     * ```
     */
    addWorkspace(id: string, params: ApiKeyAddWorkspaceParams, options?: RequestOptions): APIPromise<APIKey>;
    /**
     * Disable an API key
     *
     * @example
     * ```ts
     * const apiKey = await client.apiKeys.disable('_123');
     * ```
     */
    disable(id: string, options?: RequestOptions): APIPromise<APIKey>;
    /**
     * Enable an API key
     *
     * @example
     * ```ts
     * const apiKey = await client.apiKeys.enable('_123');
     * ```
     */
    enable(id: string, options?: RequestOptions): APIPromise<APIKey>;
    /**
     * Remove a workspace from an API key
     *
     * @example
     * ```ts
     * const apiKey = await client.apiKeys.removeWorkspace('_123', { workspaceId: 'sample' });
     * ```
     */
    removeWorkspace(id: string, params: ApiKeyRemoveWorkspaceParams, options?: RequestOptions): APIPromise<APIKey>;
    /**
     * Reveal an API key's token
     *
     * @example
     * ```ts
     * const apiKey = await client.apiKeys.reveal('_123');
     * ```
     */
    reveal(id: string, options?: RequestOptions): APIPromise<APIKey>;
    /**
     * Rotate an API key
     *
     * @example
     * ```ts
     * const apiKey = await client.apiKeys.rotate('_123');
     * ```
     */
    rotate(id: string, options?: RequestOptions): APIPromise<APIKey>;
}
//# sourceMappingURL=api-keys.d.ts.map