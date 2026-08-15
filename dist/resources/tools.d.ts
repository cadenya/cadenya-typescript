import { HttpClient, RequestOptions, APIPromise } from '../core/http.js';
import { Page } from '../core/pagination.js';
import type { CreateResourceMetadata, Tool, ToolServiceListToolsStates, ToolSpec, UpdateResourceMetadata } from '../types.js';
export interface ToolListParams {
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
     * Filter by tool name (exact match). Multiple values are OR'd together.
     */
    names?: Array<string>;
    /**
     * Filter by tool state. Multiple values are OR'd together.
     */
    states?: Array<ToolServiceListToolsStates>;
    /**
     * Filter by approval requirement. Omitted = no filter; true = only tools
     *  requiring approval; false = only tools not requiring approval.
     */
    requiresApproval?: boolean;
    /**
     * Filter to tools matched by the tool set overlays with these keys
     *  (ToolSetSpec.overlays), i.e. tools whose info.overlays contains the
     *  key. Multiple values are OR'd together. Selectors are evaluated
     *  against every tool in the set to answer this, so total counts reflect
     *  the filtered set. An unknown overlay key matches nothing.
     */
    overlays?: Array<string>;
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
export interface ToolCreateParams {
    metadata: CreateResourceMetadata;
    spec: ToolSpec;
    /**
     * Workspace ID.
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
}
export interface ToolRetrieveParams {
    /**
     * Workspace ID.
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
}
export interface ToolDeleteParams {
    /**
     * Workspace ID.
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
}
export interface ToolUpdateParams {
    /**
     * Workspace ID.
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
    metadata?: UpdateResourceMetadata;
    spec?: ToolSpec;
    updateMask?: string;
}
export interface ToolOmitParams {
    /**
     * Workspace ID.
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
}
export interface ToolRestoreParams {
    /**
     * Workspace ID.
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
}
export declare class Tools {
    private readonly _client;
    constructor(_client: HttpClient);
    /**
     * List tools
     *
     * @example
     * ```ts
     * const page = await client.toolSets.tools.list('tool_set_123');
     * for await (const item of page) {
     *   // auto-fetches every page
     * }
     * ```
     */
    list(toolSetId: string, params?: ToolListParams, options?: RequestOptions): Promise<Page<Tool>>;
    /**
     * Create a new tool
     *
     * @example
     * ```ts
     * const tool = await client.toolSets.tools.create('tool_set_123', { metadata: { name: 'sample' }, spec: { config: { http: { requestMethod: 'HTTP_METHOD_UNSPECIFIED' }, type: 'http' }, description: 'sample', parameters: {  }, requiresApproval: true } });
     * ```
     */
    create(toolSetId: string, params: ToolCreateParams, options?: RequestOptions): APIPromise<Tool>;
    /**
     * Get a tool by ID
     *
     * @example
     * ```ts
     * const tool = await client.toolSets.tools.retrieve('tool_set_123', '_123');
     * ```
     */
    retrieve(toolSetId: string, id: string, params?: ToolRetrieveParams, options?: RequestOptions): APIPromise<Tool>;
    /**
     * Delete a tool
     *
     * @example
     * ```ts
     * await client.toolSets.tools.delete('tool_set_123', '_123');
     * ```
     */
    delete(toolSetId: string, id: string, params?: ToolDeleteParams, options?: RequestOptions): APIPromise<void>;
    /**
     * Update a tool
     *
     * @example
     * ```ts
     * const tool = await client.toolSets.tools.update('tool_set_123', '_123');
     * ```
     */
    update(toolSetId: string, id: string, params?: ToolUpdateParams, options?: RequestOptions): APIPromise<Tool>;
    /**
     * Omit a tool
     *
     * @example
     * ```ts
     * const tool = await client.toolSets.tools.omit('tool_set_123', '_123');
     * ```
     */
    omit(toolSetId: string, id: string, params?: ToolOmitParams, options?: RequestOptions): APIPromise<Tool>;
    /**
     * Restore a tool
     *
     * @example
     * ```ts
     * const tool = await client.toolSets.tools.restore('tool_set_123', '_123');
     * ```
     */
    restore(toolSetId: string, id: string, params?: ToolRestoreParams, options?: RequestOptions): APIPromise<Tool>;
}
//# sourceMappingURL=tools.d.ts.map