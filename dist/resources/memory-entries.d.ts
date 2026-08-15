import { HttpClient, RequestOptions, APIPromise } from '../core/http.js';
import { Page } from '../core/pagination.js';
import type { CreateResourceMetadata, MemoryEntry, MemoryEntryCreateSpec, MemoryEntryDetail, MemoryEntryUpdateSpec, UpdateResourceMetadata } from '../types.js';
export interface MemoryEntryListParams {
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
     * Filter by key prefix (e.g., "skills/postmortem/" to list all entries
     *  under that hierarchy). Matches against the entry's key, not its name.
     */
    prefix?: string;
    /**
     * Free-form search query
     */
    query?: string;
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
export interface MemoryEntryCreateParams {
    metadata: CreateResourceMetadata;
    spec: MemoryEntryCreateSpec;
    /**
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
}
export interface MemoryEntryRetrieveParams {
    /**
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
}
export interface MemoryEntryDeleteParams {
    /**
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
}
export interface MemoryEntryUpdateParams {
    /**
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
    metadata?: UpdateResourceMetadata;
    spec?: MemoryEntryUpdateSpec;
    updateMask?: string;
}
export declare class MemoryEntries {
    private readonly _client;
    constructor(_client: HttpClient);
    /**
     * List memory entries
     *
     * @example
     * ```ts
     * const page = await client.memoryLayers.entries.list('memory_layer_123');
     * for await (const item of page) {
     *   // auto-fetches every page
     * }
     * ```
     */
    list(memoryLayerId: string, params?: MemoryEntryListParams, options?: RequestOptions): Promise<Page<MemoryEntry>>;
    /**
     * Create a new memory entry
     *
     * @example
     * ```ts
     * const memoryEntryDetail = await client.memoryLayers.entries.create('memory_layer_123', { metadata: { name: 'sample' }, spec: { content: 'sample', key: 'sample', type: 'content' } });
     * ```
     */
    create(memoryLayerId: string, params: MemoryEntryCreateParams, options?: RequestOptions): APIPromise<MemoryEntryDetail>;
    /**
     * Get a memory entry by ID
     *
     * @example
     * ```ts
     * const memoryEntryDetail = await client.memoryLayers.entries.retrieve('memory_layer_123', '_123');
     * ```
     */
    retrieve(memoryLayerId: string, id: string, params?: MemoryEntryRetrieveParams, options?: RequestOptions): APIPromise<MemoryEntryDetail>;
    /**
     * Delete a memory entry
     *
     * @example
     * ```ts
     * await client.memoryLayers.entries.delete('memory_layer_123', '_123');
     * ```
     */
    delete(memoryLayerId: string, id: string, params?: MemoryEntryDeleteParams, options?: RequestOptions): APIPromise<void>;
    /**
     * Update a memory entry
     *
     * @example
     * ```ts
     * const memoryEntryDetail = await client.memoryLayers.entries.update('memory_layer_123', '_123');
     * ```
     */
    update(memoryLayerId: string, id: string, params?: MemoryEntryUpdateParams, options?: RequestOptions): APIPromise<MemoryEntryDetail>;
}
//# sourceMappingURL=memory-entries.d.ts.map