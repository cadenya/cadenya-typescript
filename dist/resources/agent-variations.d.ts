import { HttpClient, RequestOptions, APIPromise } from '../core/http.js';
import { Page } from '../core/pagination.js';
import type { AddAgentVariationAssignmentRequestParam, AgentVariation, AgentVariationSpec, CreateResourceMetadata, UpdateResourceMetadata, VariationAssignment, VariationMemoryLayerAssignment } from '../types.js';
export interface AgentVariationListParams {
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
     * When true, the `info` field on each returned variation is populated.
     *  Requests with this flag count more against your rate limit.
     */
    includeInfo?: boolean;
    /**
     * Filters by metadata labels. Comma-separated key=value pairs,
     *  e.g. "env=prod,team=ai". A resource matches only if every pair
     *  matches exactly (AND semantics).
     */
    labels?: string;
}
export interface AgentVariationCreateParams {
    metadata: CreateResourceMetadata;
    spec: AgentVariationSpec;
    /**
     * Workspace ID.
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
}
export interface AgentVariationRetrieveParams {
    /**
     * Workspace ID.
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
}
export interface AgentVariationDeleteParams {
    /**
     * Workspace ID.
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
}
export interface AgentVariationUpdateParams {
    /**
     * Workspace ID.
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
    metadata?: UpdateResourceMetadata;
    spec?: AgentVariationSpec;
    /**
     * Fields to update
     */
    updateMask?: string;
}
export interface AgentVariationAddAssignmentParams {
    /**
     * The request body, sent as-is.
     */
    body: AddAgentVariationAssignmentRequestParam;
    /**
     * Workspace ID.
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
}
export interface AgentVariationRemoveAssignmentParams {
    /**
     * Workspace ID.
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
}
export interface AgentVariationAddMemoryLayerParams {
    /**
     * Layer to attach. Accepts the canonical `memlyr_…` form or the `external_id:<value>` form.
     */
    memoryLayerId: string;
    /**
     * Workspace ID.
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
    /**
     * Position in the baseline cascade (lower = more specific). If
     *  omitted, the server appends at the most general end (max existing
     *  position + 1).
     */
    position?: number;
}
export interface AgentVariationRemoveMemoryLayerParams {
    /**
     * Workspace ID.
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
}
export interface AgentVariationUpdateMemoryLayerParams {
    /**
     * Workspace ID.
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
    /**
     * New position. Only field currently updatable on an assignment.
     */
    position?: number;
}
export declare class AgentVariations {
    private readonly _client;
    constructor(_client: HttpClient);
    /**
     * List variations
     *
     * @example
     * ```ts
     * const page = await client.agents.variations.list('agent_123');
     * for await (const item of page) {
     *   // auto-fetches every page
     * }
     * ```
     */
    list(agentId: string, params?: AgentVariationListParams, options?: RequestOptions): Promise<Page<AgentVariation>>;
    /**
     * Create a new variation
     *
     * @example
     * ```ts
     * const agentVariation = await client.agents.variations.create('agent_123', { metadata: { name: 'sample' }, spec: {  } });
     * ```
     */
    create(agentId: string, params: AgentVariationCreateParams, options?: RequestOptions): APIPromise<AgentVariation>;
    /**
     * Get a variation by ID
     *
     * @example
     * ```ts
     * const agentVariation = await client.agents.variations.retrieve('agent_123', '_123');
     * ```
     */
    retrieve(agentId: string, id: string, params?: AgentVariationRetrieveParams, options?: RequestOptions): APIPromise<AgentVariation>;
    /**
     * Delete a variation
     *
     * @example
     * ```ts
     * await client.agents.variations.delete('agent_123', '_123');
     * ```
     */
    delete(agentId: string, id: string, params?: AgentVariationDeleteParams, options?: RequestOptions): APIPromise<void>;
    /**
     * Update a variation
     *
     * @example
     * ```ts
     * const agentVariation = await client.agents.variations.update('agent_123', '_123');
     * ```
     */
    update(agentId: string, id: string, params?: AgentVariationUpdateParams, options?: RequestOptions): APIPromise<AgentVariation>;
    /**
     * Add an assignment to a variation
     *
     * @example
     * ```ts
     * const variationAssignment = await client.agents.variations.addAssignment('agent_123', 'variation_123', { body: { toolId: 'sample', type: 'toolId' } });
     * ```
     */
    addAssignment(agentId: string, variationId: string, params: AgentVariationAddAssignmentParams, options?: RequestOptions): APIPromise<VariationAssignment>;
    /**
     * Remove an assignment from a variation
     *
     * @example
     * ```ts
     * await client.agents.variations.removeAssignment('agent_123', 'variation_123', '_123');
     * ```
     */
    removeAssignment(agentId: string, variationId: string, id: string, params?: AgentVariationRemoveAssignmentParams, options?: RequestOptions): APIPromise<void>;
    /**
     * Attach a memory layer to a variation
     *
     * @example
     * ```ts
     * const variationMemoryLayerAssignment = await client.agents.variations.addMemoryLayer('agent_123', 'variation_123', { memoryLayerId: 'sample' });
     * ```
     */
    addMemoryLayer(agentId: string, variationId: string, params: AgentVariationAddMemoryLayerParams, options?: RequestOptions): APIPromise<VariationMemoryLayerAssignment>;
    /**
     * Remove a memory layer assignment from a variation
     *
     * @example
     * ```ts
     * await client.agents.variations.removeMemoryLayer('agent_123', 'variation_123', '_123');
     * ```
     */
    removeMemoryLayer(agentId: string, variationId: string, id: string, params?: AgentVariationRemoveMemoryLayerParams, options?: RequestOptions): APIPromise<void>;
    /**
     * Update a variation's memory layer assignment
     *
     * @example
     * ```ts
     * const variationMemoryLayerAssignment = await client.agents.variations.updateMemoryLayer('agent_123', 'variation_123', '_123');
     * ```
     */
    updateMemoryLayer(agentId: string, variationId: string, id: string, params?: AgentVariationUpdateMemoryLayerParams, options?: RequestOptions): APIPromise<VariationMemoryLayerAssignment>;
}
//# sourceMappingURL=agent-variations.d.ts.map