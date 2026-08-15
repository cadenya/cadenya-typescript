import { HttpClient, RequestOptions, APIPromise } from '../core/http.js';
import { Page } from '../core/pagination.js';
import type { CreateResourceMetadata, UpdateResourceMetadata, Widget, WidgetSpec } from '../types.js';
export interface WidgetListParams {
    /**
     * Workspace ID.
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
     * Filter to widgets bound to a specific agent. Accepts the canonical
     *  `agent_…` form or the `external_id:<value>` form.
     */
    agentId?: string;
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
     * When true, the `info` field on each returned widget is populated.
     *  Requests with this flag count more against your rate limit.
     */
    includeInfo?: boolean;
}
export interface WidgetCreateParams {
    metadata: CreateResourceMetadata;
    spec: WidgetSpec;
    /**
     * Workspace ID.
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
}
export interface WidgetRetrieveParams {
    /**
     * Workspace ID.
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
}
export interface WidgetDeleteParams {
    /**
     * Workspace ID.
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
}
export interface WidgetUpdateParams {
    /**
     * Workspace ID.
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
    metadata?: UpdateResourceMetadata;
    spec?: WidgetSpec;
    /**
     * Fields to update.
     */
    updateMask?: string;
}
export interface WidgetArchiveParams {
    /**
     * Workspace ID.
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
}
export interface WidgetUnarchiveParams {
    /**
     * Workspace ID.
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
}
export declare class Widgets {
    private readonly _client;
    constructor(_client: HttpClient);
    /**
     * List widgets
     *
     * @example
     * ```ts
     * const page = await client.widgets.list();
     * for await (const item of page) {
     *   // auto-fetches every page
     * }
     * ```
     */
    list(params?: WidgetListParams, options?: RequestOptions): Promise<Page<Widget>>;
    /**
     * Create a new widget
     *
     * @example
     * ```ts
     * const widget = await client.widgets.create({ metadata: { name: 'sample' }, spec: { agentId: 'sample' } });
     * ```
     */
    create(params: WidgetCreateParams, options?: RequestOptions): APIPromise<Widget>;
    /**
     * Get a widget by ID
     *
     * @example
     * ```ts
     * const widget = await client.widgets.retrieve('_123');
     * ```
     */
    retrieve(id: string, params?: WidgetRetrieveParams, options?: RequestOptions): APIPromise<Widget>;
    /**
     * Delete a widget
     *
     * @example
     * ```ts
     * await client.widgets.delete('_123');
     * ```
     */
    delete(id: string, params?: WidgetDeleteParams, options?: RequestOptions): APIPromise<void>;
    /**
     * Update a widget
     *
     * @example
     * ```ts
     * const widget = await client.widgets.update('_123');
     * ```
     */
    update(id: string, params?: WidgetUpdateParams, options?: RequestOptions): APIPromise<Widget>;
    /**
     * Archive a widget
     *
     * @example
     * ```ts
     * const widget = await client.widgets.archive('_123');
     * ```
     */
    archive(id: string, params?: WidgetArchiveParams, options?: RequestOptions): APIPromise<Widget>;
    /**
     * Unarchive a widget
     *
     * @example
     * ```ts
     * const widget = await client.widgets.unarchive('_123');
     * ```
     */
    unarchive(id: string, params?: WidgetUnarchiveParams, options?: RequestOptions): APIPromise<Widget>;
}
//# sourceMappingURL=widgets.d.ts.map