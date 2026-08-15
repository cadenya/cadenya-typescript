import { HttpClient, RequestOptions, APIPromise } from '../core/http.js';
import { Page } from '../core/pagination.js';
import { ToolSetSecrets } from './tool-set-secrets.js';
import { Tools } from './tools.js';
import type { CreateResourceMetadata, GetToolSetOpenAPISpecResponse, ToolServiceListToolSetsState, ToolSet, ToolSetEvent, ToolSetSpec, ToolSetUsage, UpdateResourceMetadata } from '../types.js';
export interface ToolSetListParams {
    /**
     * Workspace ID.
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
     * Filter by tool set lifecycle state. Defaults to STATE_ACTIVE when
     *  unspecified; pass STATE_ARCHIVED to list archived tool sets.
     */
    state?: ToolServiceListToolSetsState;
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
export interface ToolSetCreateParams {
    metadata: CreateResourceMetadata;
    spec: ToolSetSpec;
    /**
     * Workspace ID.
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
}
export interface ToolSetRetrieveParams {
    /**
     * Workspace ID.
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
}
export interface ToolSetDeleteParams {
    /**
     * Workspace ID.
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
}
export interface ToolSetUpdateParams {
    /**
     * Workspace ID.
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
    metadata?: UpdateResourceMetadata;
    spec?: ToolSetSpec;
    updateMask?: string;
}
export interface ToolSetArchiveParams {
    /**
     * Workspace ID.
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
}
export interface ToolSetUnarchiveParams {
    /**
     * Workspace ID.
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
}
export interface ToolSetListEventsParams {
    /**
     * Workspace ID.
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
     * Sort order for results (asc or desc by creation time)
     */
    sortOrder?: string;
    /**
     * When set to true you may use more of your alloted API rate-limit
     */
    includeInfo?: boolean;
    /**
     * Filters by metadata labels. Comma-separated key=value pairs,
     *  e.g. "env=prod,team=ai". A resource matches only if every pair
     *  matches exactly (AND semantics).
     */
    labels?: string;
}
export interface ToolSetRetrieveOpenApiSpecParams {
    /**
     * Workspace ID.
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
}
export interface ToolSetListUsageParams {
    /**
     * Workspace ID.
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
    /**
     * When set, lists only variations with a direct assignment of this
     *  individual tool. When unset, lists variations assigned the whole tool
     *  set. The tool must belong to the tool set.
     */
    toolId?: string;
    /**
     * Maximum number of results to return
     */
    limit?: number;
    /**
     * Pagination cursor from previous response
     */
    cursor?: string;
    /**
     * Sort order for results (asc or desc by assignment creation time)
     */
    sortOrder?: string;
}
export declare class ToolSets {
    private readonly _client;
    readonly secrets: ToolSetSecrets;
    readonly tools: Tools;
    constructor(_client: HttpClient);
    /**
     * List tool sets
     *
     * @example
     * ```ts
     * const page = await client.toolSets.list();
     * for await (const item of page) {
     *   // auto-fetches every page
     * }
     * ```
     */
    list(params?: ToolSetListParams, options?: RequestOptions): Promise<Page<ToolSet>>;
    /**
     * Create a new tool set
     *
     * @example
     * ```ts
     * const toolSet = await client.toolSets.create({ metadata: { name: 'sample' }, spec: { adapter: { mcp: {  }, type: 'mcp' } } });
     * ```
     */
    create(params: ToolSetCreateParams, options?: RequestOptions): APIPromise<ToolSet>;
    /**
     * Get a tool set by ID
     *
     * @example
     * ```ts
     * const toolSet = await client.toolSets.retrieve('_123');
     * ```
     */
    retrieve(id: string, params?: ToolSetRetrieveParams, options?: RequestOptions): APIPromise<ToolSet>;
    /**
     * Delete a tool set
     *
     * @example
     * ```ts
     * await client.toolSets.delete('_123');
     * ```
     */
    delete(id: string, params?: ToolSetDeleteParams, options?: RequestOptions): APIPromise<void>;
    /**
     * Update a tool set
     *
     * @example
     * ```ts
     * const toolSet = await client.toolSets.update('_123');
     * ```
     */
    update(id: string, params?: ToolSetUpdateParams, options?: RequestOptions): APIPromise<ToolSet>;
    /**
     * Archive a tool set
     *
     * @example
     * ```ts
     * const toolSet = await client.toolSets.archive('_123');
     * ```
     */
    archive(id: string, params?: ToolSetArchiveParams, options?: RequestOptions): APIPromise<ToolSet>;
    /**
     * Unarchive a tool set
     *
     * @example
     * ```ts
     * const toolSet = await client.toolSets.unarchive('_123');
     * ```
     */
    unarchive(id: string, params?: ToolSetUnarchiveParams, options?: RequestOptions): APIPromise<ToolSet>;
    /**
     * List tool set events
     *
     * @example
     * ```ts
     * const page = await client.toolSets.listEvents('tool_set_123');
     * for await (const item of page) {
     *   // auto-fetches every page
     * }
     * ```
     */
    listEvents(toolSetId: string, params?: ToolSetListEventsParams, options?: RequestOptions): Promise<Page<ToolSetEvent>>;
    /**
     * Get consumed OpenAPI spec
     *
     * @example
     * ```ts
     * const getToolSetOpenApiSpecResponse = await client.toolSets.retrieveOpenApiSpec('tool_set_123');
     * ```
     */
    retrieveOpenApiSpec(toolSetId: string, params?: ToolSetRetrieveOpenApiSpecParams, options?: RequestOptions): APIPromise<GetToolSetOpenAPISpecResponse>;
    /**
     * List tool set usage
     *
     * @example
     * ```ts
     * const page = await client.toolSets.listUsage('tool_set_123');
     * for await (const item of page) {
     *   // auto-fetches every page
     * }
     * ```
     */
    listUsage(toolSetId: string, params?: ToolSetListUsageParams, options?: RequestOptions): Promise<Page<ToolSetUsage>>;
}
//# sourceMappingURL=tool-sets.d.ts.map