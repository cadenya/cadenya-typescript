import { HttpClient, RequestOptions, APIPromise } from '../core/http.js';
import { Page } from '../core/pagination.js';
import type { CreateResourceMetadata, UpdateResourceMetadata, WorkspaceSecret, WorkspaceSecretSpec } from '../types.js';
export interface WorkspaceSecretListParams {
    /**
     * The workspace whose secrets will be listed.
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
export interface WorkspaceSecretCreateParams {
    metadata: CreateResourceMetadata;
    spec: WorkspaceSecretSpec;
    /**
     * The workspace that will own this secret.
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
}
export interface WorkspaceSecretRetrieveParams {
    /**
     * The workspace the secret belongs to.
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
}
export interface WorkspaceSecretDeleteParams {
    /**
     * The workspace the secret belongs to.
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
}
export interface WorkspaceSecretUpdateParams {
    /**
     * The workspace the secret belongs to.
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
    metadata?: UpdateResourceMetadata;
    spec?: WorkspaceSecretSpec;
    /**
     * Fields to update.
     */
    updateMask?: string;
}
export declare class WorkspaceSecrets {
    private readonly _client;
    constructor(_client: HttpClient);
    /**
     * List workspace secrets
     *
     * @example
     * ```ts
     * const page = await client.workspaceSecrets.list();
     * for await (const item of page) {
     *   // auto-fetches every page
     * }
     * ```
     */
    list(params?: WorkspaceSecretListParams, options?: RequestOptions): Promise<Page<WorkspaceSecret>>;
    /**
     * Create a new workspace secret
     *
     * @example
     * ```ts
     * const workspaceSecret = await client.workspaceSecrets.create({ metadata: { name: 'sample' }, spec: {  } });
     * ```
     */
    create(params: WorkspaceSecretCreateParams, options?: RequestOptions): APIPromise<WorkspaceSecret>;
    /**
     * Get a workspace secret by ID
     *
     * @example
     * ```ts
     * const workspaceSecret = await client.workspaceSecrets.retrieve('_123');
     * ```
     */
    retrieve(id: string, params?: WorkspaceSecretRetrieveParams, options?: RequestOptions): APIPromise<WorkspaceSecret>;
    /**
     * Delete a workspace secret
     *
     * @example
     * ```ts
     * await client.workspaceSecrets.delete('_123');
     * ```
     */
    delete(id: string, params?: WorkspaceSecretDeleteParams, options?: RequestOptions): APIPromise<void>;
    /**
     * Update a workspace secret
     *
     * @example
     * ```ts
     * const workspaceSecret = await client.workspaceSecrets.update('_123');
     * ```
     */
    update(id: string, params?: WorkspaceSecretUpdateParams, options?: RequestOptions): APIPromise<WorkspaceSecret>;
}
//# sourceMappingURL=workspace-secrets.d.ts.map