import { HttpClient, RequestOptions, APIPromise } from '../core/http.js';
import { Page } from '../core/pagination.js';
import type { CreateOperationMetadata, CreateWidgetSessionRequest_Secret, DeleteTenantWidgetSessionsResponse, WidgetSession, WidgetSessionServiceListWidgetSessionsState, WidgetSessionSpecParam } from '../types.js';
export interface WidgetSessionListParams {
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
     * Filter to sessions on a specific widget. Accepts the canonical `wgt_…`
     *  form or the `external_id:<value>` form.
     */
    widgetId?: string;
    /**
     * Filter to sessions belonging to a tenant. Accepts the canonical
     *  `tenant_…` form or the `external_id:<value>` form.
     */
    tenantId?: string;
    /**
     * Filter to sessions asserted for a subject. Accepts the canonical
     *  `subj_…` form or the `external_id:<value>` form; the external_id form is
     *  scoped within a tenant and requires `tenant_id` to also be set.
     */
    subjectId?: string;
    /**
     * Filter by state.
     */
    state?: WidgetSessionServiceListWidgetSessionsState;
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
     * When true, the `info` field on each returned session is populated.
     *  Requests with this flag count more against your rate limit.
     */
    includeInfo?: boolean;
}
export interface WidgetSessionCreateParams {
    spec: WidgetSessionSpecParam;
    /**
     * Workspace ID.
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
    metadata?: CreateOperationMetadata;
    /**
     * Secrets to attach to the session.
     */
    secrets?: Array<CreateWidgetSessionRequest_Secret>;
}
export interface WidgetSessionDeleteTenantParams {
    /**
     * Workspace ID.
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
    /**
     * Tenant whose sessions to delete. Required — an empty value is rejected
     *  rather than matching everything. Accepts the canonical `tenant_…` form or
     *  the `external_id:<value>` form.
     */
    tenantId?: string;
}
export interface WidgetSessionRetrieveParams {
    /**
     * Workspace ID.
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
}
export interface WidgetSessionDeleteParams {
    /**
     * Workspace ID.
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
}
export interface WidgetSessionRevokeParams {
    /**
     * Workspace ID.
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
}
export declare class WidgetSessions {
    private readonly _client;
    constructor(_client: HttpClient);
    /**
     * List widget sessions
     *
     * @example
     * ```ts
     * const page = await client.widgetSessions.list();
     * for await (const item of page) {
     *   // auto-fetches every page
     * }
     * ```
     */
    list(params?: WidgetSessionListParams, options?: RequestOptions): Promise<Page<WidgetSession>>;
    /**
     * Create a widget session
     *
     * @example
     * ```ts
     * const widgetSession = await client.widgetSessions.create({ spec: { widgetId: 'sample' } });
     * ```
     */
    create(params: WidgetSessionCreateParams, options?: RequestOptions): APIPromise<WidgetSession>;
    /**
     * Delete all of a tenant's widget sessions
     *
     * @example
     * ```ts
     * const deleteTenantWidgetSessionsResponse = await client.widgetSessions.deleteTenant();
     * ```
     */
    deleteTenant(params?: WidgetSessionDeleteTenantParams, options?: RequestOptions): APIPromise<DeleteTenantWidgetSessionsResponse>;
    /**
     * Get a widget session by ID
     *
     * @example
     * ```ts
     * const widgetSession = await client.widgetSessions.retrieve('_123');
     * ```
     */
    retrieve(id: string, params?: WidgetSessionRetrieveParams, options?: RequestOptions): APIPromise<WidgetSession>;
    /**
     * Delete a widget session
     *
     * @example
     * ```ts
     * await client.widgetSessions.delete('_123');
     * ```
     */
    delete(id: string, params?: WidgetSessionDeleteParams, options?: RequestOptions): APIPromise<void>;
    /**
     * Revoke a widget session
     *
     * @example
     * ```ts
     * const widgetSession = await client.widgetSessions.revoke('_123');
     * ```
     */
    revoke(id: string, params?: WidgetSessionRevokeParams, options?: RequestOptions): APIPromise<WidgetSession>;
}
//# sourceMappingURL=widget-sessions.d.ts.map