import { HttpClient, RequestOptions, APIPromise } from '../core/http.js';
import { Page } from '../core/pagination.js';
import type { Subject, Tenant } from '../types.js';
export interface TenantListParams {
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
     * Substring match against the tenant's name and external_id. Built for
     *  type-ahead filter pickers, where the operator knows the customer's own
     *  identifier rather than Cadenya's.
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
     * When true, the `info` field on each returned tenant is populated. This
     *  costs several count queries per tenant, so it is off by default.
     */
    includeInfo?: boolean;
}
export interface TenantRetrieveParams {
    /**
     * Workspace ID.
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
    /**
     * When true, the `info` field is populated.
     */
    includeInfo?: boolean;
}
export interface TenantDeleteParams {
    /**
     * Workspace ID.
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
}
export interface TenantListSubjectsParams {
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
     * Substring match against the subject's name and external_id.
     */
    query?: string;
    /**
     * Sort order for results (asc or desc by creation time).
     */
    sortOrder?: string;
    /**
     * When true, the `info` field on each returned subject is populated.
     */
    includeInfo?: boolean;
}
export declare class Tenants {
    private readonly _client;
    constructor(_client: HttpClient);
    /**
     * List tenants
     *
     * @example
     * ```ts
     * const page = await client.tenants.list();
     * for await (const item of page) {
     *   // auto-fetches every page
     * }
     * ```
     */
    list(params?: TenantListParams, options?: RequestOptions): Promise<Page<Tenant>>;
    /**
     * Get a tenant by ID
     *
     * @example
     * ```ts
     * const tenant = await client.tenants.retrieve('_123');
     * ```
     */
    retrieve(id: string, params?: TenantRetrieveParams, options?: RequestOptions): APIPromise<Tenant>;
    /**
     * Erase a tenant
     *
     * @example
     * ```ts
     * const tenant = await client.tenants.delete('_123');
     * ```
     */
    delete(id: string, params?: TenantDeleteParams, options?: RequestOptions): APIPromise<Tenant>;
    /**
     * List a tenant's subjects
     *
     * @example
     * ```ts
     * const page = await client.tenants.listSubjects('tenant_123');
     * for await (const item of page) {
     *   // auto-fetches every page
     * }
     * ```
     */
    listSubjects(tenantId: string, params?: TenantListSubjectsParams, options?: RequestOptions): Promise<Page<Subject>>;
}
//# sourceMappingURL=tenants.d.ts.map