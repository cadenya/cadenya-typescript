import { HttpClient, RequestOptions, APIPromise } from '../core/http.js';
import { Page } from '../core/pagination.js';
import { AgentSchedules } from './agent-schedules.js';
import { AgentVariations } from './agent-variations.js';
import type { Agent, AgentServiceListAgentFeedbackSentiment, AgentServiceListAgentWebhookDeliveriesEventType, AgentServiceListAgentsState, AgentServiceListAgentsVariationSelectionMode, AgentSpec, CreateAgentVariationRequestParam, CreateResourceMetadata, ObjectiveFeedback, UpdateResourceMetadata, WebhookDelivery } from '../types.js';
export interface AgentListParams {
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
     * Filter by agent lifecycle state
     */
    state?: AgentServiceListAgentsState;
    /**
     * Filter by variation selection mode
     */
    variationSelectionMode?: AgentServiceListAgentsVariationSelectionMode;
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
     * When true, the `info` field on each returned agent is populated. Requests
     *  with this flag count more against your rate limit.
     */
    includeInfo?: boolean;
}
export interface AgentCreateParams {
    metadata: CreateResourceMetadata;
    spec: AgentSpec;
    /**
     * Workspace ID.
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
    /**
     * Optional default variation to add to the agent on create
     */
    defaultVariation?: CreateAgentVariationRequestParam;
}
export interface AgentListFeedbackParams {
    /**
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
     * Free-text search applied to the feedback comment. Case-insensitive substring match.
     */
    query?: string;
    /**
     * Filter by sentiment. UNSPECIFIED returns feedback regardless of score.
     */
    sentiment?: AgentServiceListAgentFeedbackSentiment;
    /**
     * Optional filter to limit results to feedback on objectives run by a single
     *  agent variation. Supports "external_id:" prefix for external IDs.
     */
    agentVariationId?: string;
    /**
     * Inclusive lower bound on feedback creation time.
     */
    createdAfter?: string;
    /**
     * Exclusive upper bound on feedback creation time.
     */
    createdBefore?: string;
    /**
     * Filters by metadata labels. Comma-separated key=value pairs,
     *  e.g. "env=prod,team=ai". A resource matches only if every pair
     *  matches exactly (AND semantics).
     */
    labels?: string;
    /**
     * When set to true you may use more of your alloted API rate-limit
     */
    includeInfo?: boolean;
}
export interface AgentListWebhookDeliveriesParams {
    /**
     * Workspace ID.
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
    /**
     * Pagination cursor from previous response
     */
    cursor?: string;
    /**
     * Maximum number of results to return
     */
    limit?: number;
    /**
     * Optional filter by objective ID
     */
    objectiveId?: string;
    /**
     * Optional filter by event type
     */
    eventType?: AgentServiceListAgentWebhookDeliveriesEventType;
    /**
     * Filters by metadata labels. Comma-separated key=value pairs,
     *  e.g. "env=prod,team=ai". A resource matches only if every pair
     *  matches exactly (AND semantics).
     */
    labels?: string;
}
export interface AgentRetrieveParams {
    /**
     * Workspace ID.
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
}
export interface AgentDeleteParams {
    /**
     * Workspace ID.
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
}
export interface AgentUpdateParams {
    /**
     * Workspace ID.
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
    metadata?: UpdateResourceMetadata;
    spec?: AgentSpec;
    /**
     * Fields to update
     */
    updateMask?: string;
}
export interface AgentArchiveParams {
    /**
     * Workspace ID.
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
}
export interface AgentPublishParams {
    /**
     * Workspace ID.
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
}
export interface AgentUnarchiveParams {
    /**
     * Workspace ID.
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
}
export interface AgentUnpublishParams {
    /**
     * Workspace ID.
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
}
export declare class Agents {
    private readonly _client;
    readonly schedules: AgentSchedules;
    readonly variations: AgentVariations;
    constructor(_client: HttpClient);
    /**
     * List agents
     *
     * @example
     * ```ts
     * const page = await client.agents.list();
     * for await (const item of page) {
     *   // auto-fetches every page
     * }
     * ```
     */
    list(params?: AgentListParams, options?: RequestOptions): Promise<Page<Agent>>;
    /**
     * Create a new agent
     *
     * @example
     * ```ts
     * const agent = await client.agents.create({ metadata: { name: 'sample' }, spec: { variationSelectionMode: 'VARIATION_SELECTION_MODE_RANDOM' } });
     * ```
     */
    create(params: AgentCreateParams, options?: RequestOptions): APIPromise<Agent>;
    /**
     * List feedback for an agent
     *
     * @example
     * ```ts
     * const page = await client.agents.listFeedback('agent_123');
     * for await (const item of page) {
     *   // auto-fetches every page
     * }
     * ```
     */
    listFeedback(agentId: string, params?: AgentListFeedbackParams, options?: RequestOptions): Promise<Page<ObjectiveFeedback>>;
    /**
     * List webhook deliveries
     *
     * @example
     * ```ts
     * const page = await client.agents.listWebhookDeliveries('agent_123');
     * for await (const item of page) {
     *   // auto-fetches every page
     * }
     * ```
     */
    listWebhookDeliveries(agentId: string, params?: AgentListWebhookDeliveriesParams, options?: RequestOptions): Promise<Page<WebhookDelivery>>;
    /**
     * Get an agent by ID
     *
     * @example
     * ```ts
     * const agent = await client.agents.retrieve('_123');
     * ```
     */
    retrieve(id: string, params?: AgentRetrieveParams, options?: RequestOptions): APIPromise<Agent>;
    /**
     * Delete an agent
     *
     * @example
     * ```ts
     * await client.agents.delete('_123');
     * ```
     */
    delete(id: string, params?: AgentDeleteParams, options?: RequestOptions): APIPromise<void>;
    /**
     * Update an agent
     *
     * @example
     * ```ts
     * const agent = await client.agents.update('_123');
     * ```
     */
    update(id: string, params?: AgentUpdateParams, options?: RequestOptions): APIPromise<Agent>;
    /**
     * Archive an agent
     *
     * @example
     * ```ts
     * const agent = await client.agents.archive('_123');
     * ```
     */
    archive(id: string, params?: AgentArchiveParams, options?: RequestOptions): APIPromise<Agent>;
    /**
     * Publish an agent
     *
     * @example
     * ```ts
     * const agent = await client.agents.publish('_123');
     * ```
     */
    publish(id: string, params?: AgentPublishParams, options?: RequestOptions): APIPromise<Agent>;
    /**
     * Unarchive an agent
     *
     * @example
     * ```ts
     * const agent = await client.agents.unarchive('_123');
     * ```
     */
    unarchive(id: string, params?: AgentUnarchiveParams, options?: RequestOptions): APIPromise<Agent>;
    /**
     * Unpublish an agent
     *
     * @example
     * ```ts
     * const agent = await client.agents.unpublish('_123');
     * ```
     */
    unpublish(id: string, params?: AgentUnpublishParams, options?: RequestOptions): APIPromise<Agent>;
}
//# sourceMappingURL=agents.d.ts.map