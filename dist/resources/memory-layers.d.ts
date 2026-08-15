import { HttpClient, RequestOptions, APIPromise } from '../core/http.js';
import { Page } from '../core/pagination.js';
import { MemoryEntries } from './memory-entries.js';
import type { CreateResourceMetadata, MemoryLayer, MemoryLayerSpecParam, MemoryServiceListMemoryLayersType, UpdateResourceMetadata } from '../types.js';
export interface MemoryLayerListParams {
    /**
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
     * Filter by layer type
     */
    type?: MemoryServiceListMemoryLayersType;
    /**
     * Filter to episodic layers belonging to this agent.
     */
    agentId?: string;
    /**
     * Filter to episodic layers whose episodic key starts with this prefix
     *  (e.g. "customer/" matches "customer/42" and "customer/43"). Useful for
     *  namespaced keys, similar to a redis key scan.
     */
    episodicKeyPrefix?: string;
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
     * When set to true you may use more of your alloted API rate-limit
     */
    includeInfo?: boolean;
}
export interface MemoryLayerCreateParams {
    metadata: CreateResourceMetadata;
    spec: MemoryLayerSpecParam;
    /**
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
}
export interface MemoryLayerRetrieveParams {
    /**
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
}
export interface MemoryLayerDeleteParams {
    /**
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
}
export interface MemoryLayerUpdateParams {
    /**
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
    metadata?: UpdateResourceMetadata;
    spec?: MemoryLayerSpecParam;
    updateMask?: string;
}
export declare class MemoryLayers {
    private readonly _client;
    readonly entries: MemoryEntries;
    constructor(_client: HttpClient);
    /**
     * List memory layers
     *
     * @example
     * ```ts
     * const page = await client.memoryLayers.list();
     * for await (const item of page) {
     *   // auto-fetches every page
     * }
     * ```
     */
    list(params?: MemoryLayerListParams, options?: RequestOptions): Promise<Page<MemoryLayer>>;
    /**
     * Create a new memory layer
     *
     * @example
     * ```ts
     * const memoryLayer = await client.memoryLayers.create({ metadata: { name: 'sample' }, spec: { type: 'MEMORY_LAYER_TYPE_UNSPECIFIED' } });
     * ```
     */
    create(params: MemoryLayerCreateParams, options?: RequestOptions): APIPromise<MemoryLayer>;
    /**
     * Get a memory layer by ID
     *
     * @example
     * ```ts
     * const memoryLayer = await client.memoryLayers.retrieve('_123');
     * ```
     */
    retrieve(id: string, params?: MemoryLayerRetrieveParams, options?: RequestOptions): APIPromise<MemoryLayer>;
    /**
     * Delete a memory layer
     *
     * @example
     * ```ts
     * await client.memoryLayers.delete('_123');
     * ```
     */
    delete(id: string, params?: MemoryLayerDeleteParams, options?: RequestOptions): APIPromise<void>;
    /**
     * Update a memory layer
     *
     * @example
     * ```ts
     * const memoryLayer = await client.memoryLayers.update('_123');
     * ```
     */
    update(id: string, params?: MemoryLayerUpdateParams, options?: RequestOptions): APIPromise<MemoryLayer>;
}
//# sourceMappingURL=memory-layers.d.ts.map