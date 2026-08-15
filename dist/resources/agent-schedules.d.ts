import { HttpClient, RequestOptions, APIPromise } from '../core/http.js';
import { Page } from '../core/pagination.js';
import type { AgentSchedule, AgentScheduleSpec, CreateResourceMetadata, UpdateResourceMetadata } from '../types.js';
export interface AgentScheduleListParams {
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
     * Filter expression (query param: prefix).
     */
    prefix?: string;
    /**
     * Free-form search query.
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
     * When true, the `info` field on each returned schedule is populated.
     *  Requests with this flag count more against your rate limit.
     */
    includeInfo?: boolean;
}
export interface AgentScheduleCreateParams {
    metadata: CreateResourceMetadata;
    spec: AgentScheduleSpec;
    /**
     * Workspace ID.
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
}
export interface AgentScheduleRetrieveParams {
    /**
     * Workspace ID.
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
}
export interface AgentScheduleDeleteParams {
    /**
     * Workspace ID.
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
}
export interface AgentScheduleUpdateParams {
    /**
     * Workspace ID.
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
    metadata?: UpdateResourceMetadata;
    spec?: AgentScheduleSpec;
    /**
     * Fields to update.
     */
    updateMask?: string;
}
export interface AgentScheduleArchiveParams {
    /**
     * Workspace ID.
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
}
export interface AgentSchedulePauseParams {
    /**
     * Workspace ID.
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
}
export interface AgentScheduleResumeParams {
    /**
     * Workspace ID.
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
}
export declare class AgentSchedules {
    private readonly _client;
    constructor(_client: HttpClient);
    /**
     * List schedules
     *
     * @example
     * ```ts
     * const page = await client.agents.schedules.list('agent_123');
     * for await (const item of page) {
     *   // auto-fetches every page
     * }
     * ```
     */
    list(agentId: string, params?: AgentScheduleListParams, options?: RequestOptions): Promise<Page<AgentSchedule>>;
    /**
     * Create a new schedule
     *
     * @example
     * ```ts
     * const agentSchedule = await client.agents.schedules.create('agent_123', { metadata: { name: 'sample' }, spec: { schedule: {  } } });
     * ```
     */
    create(agentId: string, params: AgentScheduleCreateParams, options?: RequestOptions): APIPromise<AgentSchedule>;
    /**
     * Get a schedule by ID
     *
     * @example
     * ```ts
     * const agentSchedule = await client.agents.schedules.retrieve('agent_123', '_123');
     * ```
     */
    retrieve(agentId: string, id: string, params?: AgentScheduleRetrieveParams, options?: RequestOptions): APIPromise<AgentSchedule>;
    /**
     * Delete a schedule
     *
     * @example
     * ```ts
     * await client.agents.schedules.delete('agent_123', '_123');
     * ```
     */
    delete(agentId: string, id: string, params?: AgentScheduleDeleteParams, options?: RequestOptions): APIPromise<void>;
    /**
     * Update a schedule
     *
     * @example
     * ```ts
     * const agentSchedule = await client.agents.schedules.update('agent_123', '_123');
     * ```
     */
    update(agentId: string, id: string, params?: AgentScheduleUpdateParams, options?: RequestOptions): APIPromise<AgentSchedule>;
    /**
     * Archive a schedule
     *
     * @example
     * ```ts
     * const agentSchedule = await client.agents.schedules.archive('agent_123', '_123');
     * ```
     */
    archive(agentId: string, id: string, params?: AgentScheduleArchiveParams, options?: RequestOptions): APIPromise<AgentSchedule>;
    /**
     * Pause a schedule
     *
     * @example
     * ```ts
     * const agentSchedule = await client.agents.schedules.pause('agent_123', '_123');
     * ```
     */
    pause(agentId: string, id: string, params?: AgentSchedulePauseParams, options?: RequestOptions): APIPromise<AgentSchedule>;
    /**
     * Resume a schedule
     *
     * @example
     * ```ts
     * const agentSchedule = await client.agents.schedules.resume('agent_123', '_123');
     * ```
     */
    resume(agentId: string, id: string, params?: AgentScheduleResumeParams, options?: RequestOptions): APIPromise<AgentSchedule>;
}
//# sourceMappingURL=agent-schedules.d.ts.map