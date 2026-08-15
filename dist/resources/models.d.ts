import { HttpClient, RequestOptions, APIPromise } from '../core/http.js';
import { Page } from '../core/pagination.js';
import type { Model, ModelServiceListModelsState, SwapModelOnVariationsRequest_ModelSwap } from '../types.js';
export interface ModelListParams {
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
     * Filter by a prefix of the model's display name, external id, or id
     *  (case-insensitive). A model's external id is the form used in
     *  modelConfig.modelId, so a caller holding that can narrow the list by it.
     */
    prefix?: string;
    /**
     * Free-form search query
     */
    query?: string;
    /**
     * Filter by model state
     */
    state?: ModelServiceListModelsState;
    /**
     * Filter to models provisioned on a specific AI provider key. Accepts the
     *  key's id or an "external_id:"-prefixed slug.
     */
    aiProviderKeyId?: string;
    /**
     * Filter models to only ones assigned to an active agent variation/agent.
     *  Draft agents count as assigned; archived agents do not. Assignment does not
     *  imply recent traffic — see ModelInfo.last_used_at for that.
     */
    isAssigned?: boolean;
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
     * When true, populate each item's info (e.g. the AI provider), at the cost of
     *  extra lookups.
     */
    includeInfo?: boolean;
}
export interface ModelRetrieveParams {
    /**
     * Workspace ID.
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
}
export interface ModelDisableParams {
    /**
     * Workspace ID.
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
}
export interface ModelEnableParams {
    /**
     * Workspace ID.
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
}
export interface ModelSwapOnVariationsParams {
    /**
     * Workspace ID.
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
    /**
     * The swaps to perform.
     */
    modelSwaps?: Array<SwapModelOnVariationsRequest_ModelSwap>;
}
export declare class Models {
    private readonly _client;
    constructor(_client: HttpClient);
    /**
     * List models
     *
     * @example
     * ```ts
     * const page = await client.models.list();
     * for await (const item of page) {
     *   // auto-fetches every page
     * }
     * ```
     */
    list(params?: ModelListParams, options?: RequestOptions): Promise<Page<Model>>;
    /**
     * Get a model by ID
     *
     * @example
     * ```ts
     * const model = await client.models.retrieve('_123');
     * ```
     */
    retrieve(id: string, params?: ModelRetrieveParams, options?: RequestOptions): APIPromise<Model>;
    /**
     * Disable a model
     *
     * @example
     * ```ts
     * const model = await client.models.disable('_123');
     * ```
     */
    disable(id: string, params?: ModelDisableParams, options?: RequestOptions): APIPromise<Model>;
    /**
     * Enable a model
     *
     * @example
     * ```ts
     * const model = await client.models.enable('_123');
     * ```
     */
    enable(id: string, params?: ModelEnableParams, options?: RequestOptions): APIPromise<Model>;
    /**
     * Swap models on agent variations
     *
     * @example
     * ```ts
     * await client.models.swapOnVariations();
     * ```
     */
    swapOnVariations(params?: ModelSwapOnVariationsParams, options?: RequestOptions): APIPromise<void>;
}
//# sourceMappingURL=models.d.ts.map