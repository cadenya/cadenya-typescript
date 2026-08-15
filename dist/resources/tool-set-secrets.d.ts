import { HttpClient, RequestOptions, APIPromise } from '../core/http.js';
import { Page } from '../core/pagination.js';
import type { CreateResourceMetadata, ToolSetSecret, ToolSetSecretSpec, UpdateResourceMetadata } from '../types.js';
export interface ToolSetSecretListParams {
    /**
     * The workspace that owns the tool set.
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
     * Sort order for results (asc or desc by creation time)
     */
    sortOrder?: string;
    /**
     * When set to true you may use more of your alloted API rate-limit
     */
    includeInfo?: boolean;
}
export interface ToolSetSecretCreateParams {
    metadata: CreateResourceMetadata;
    spec: ToolSetSecretSpec;
    /**
     * The workspace that owns the tool set.
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
}
export interface ToolSetSecretRetrieveParams {
    /**
     * The workspace that owns the tool set.
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
}
export interface ToolSetSecretDeleteParams {
    /**
     * The workspace that owns the tool set.
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
}
export interface ToolSetSecretUpdateParams {
    /**
     * The workspace that owns the tool set.
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
    metadata?: UpdateResourceMetadata;
    spec?: ToolSetSecretSpec;
    /**
     * Fields to update.
     */
    updateMask?: string;
}
export declare class ToolSetSecrets {
    private readonly _client;
    constructor(_client: HttpClient);
    /**
     * List tool set secrets
     *
     * @example
     * ```ts
     * const page = await client.toolSets.secrets.list('tool_set_123');
     * for await (const item of page) {
     *   // auto-fetches every page
     * }
     * ```
     */
    list(toolSetId: string, params?: ToolSetSecretListParams, options?: RequestOptions): Promise<Page<ToolSetSecret>>;
    /**
     * Create a new tool set secret
     *
     * @example
     * ```ts
     * const toolSetSecret = await client.toolSets.secrets.create('tool_set_123', { metadata: { name: 'sample' }, spec: {  } });
     * ```
     */
    create(toolSetId: string, params: ToolSetSecretCreateParams, options?: RequestOptions): APIPromise<ToolSetSecret>;
    /**
     * Get a tool set secret by ID
     *
     * @example
     * ```ts
     * const toolSetSecret = await client.toolSets.secrets.retrieve('tool_set_123', '_123');
     * ```
     */
    retrieve(toolSetId: string, id: string, params?: ToolSetSecretRetrieveParams, options?: RequestOptions): APIPromise<ToolSetSecret>;
    /**
     * Delete a tool set secret
     *
     * @example
     * ```ts
     * await client.toolSets.secrets.delete('tool_set_123', '_123');
     * ```
     */
    delete(toolSetId: string, id: string, params?: ToolSetSecretDeleteParams, options?: RequestOptions): APIPromise<void>;
    /**
     * Update a tool set secret
     *
     * @example
     * ```ts
     * const toolSetSecret = await client.toolSets.secrets.update('tool_set_123', '_123');
     * ```
     */
    update(toolSetId: string, id: string, params?: ToolSetSecretUpdateParams, options?: RequestOptions): APIPromise<ToolSetSecret>;
}
//# sourceMappingURL=tool-set-secrets.d.ts.map