import { HttpClient, RequestOptions, APIPromise } from '../core/http.js';
import { Page } from '../core/pagination.js';
import { Stream } from '../core/sse.js';
import type { AgentVariationSpec_CompactionConfig, CompactObjectiveResponse, CreateObjectiveRequest_Secret, CreateOperationMetadata, GetObjectiveDiagnosticsResponse, MemoryReference, Objective, ObjectiveContextWindow, ObjectiveEpisodicConfigParam, ObjectiveEvent, ObjectiveFeedback, ObjectiveFeedbackData, ObjectiveServiceListObjectiveToolCallsExecutionStatus, ObjectiveServiceListObjectiveToolCallsStatus, ObjectiveServiceListObjectivesState, ObjectiveTask, ObjectiveTool, ObjectiveToolCall, ObjectiveToolCallWithResult, SetToolCallContentRequest_ContentBlock, SubjectAssertion, TenantAssertion } from '../types.js';
export interface ObjectiveListParams {
    /**
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
     * Agent ID for filtering
     */
    agentId?: string;
    /**
     * Optional filters
     */
    parentObjectiveId?: string;
    /**
     * Filter by state
     */
    state?: ObjectiveServiceListObjectivesState;
    profileId?: string;
    /**
     * Sort order for results (asc or desc by creation time)
     */
    sortOrder?: string;
    /**
     * When set to true you may use more of your alloted API rate-limit
     */
    includeInfo?: boolean;
    /**
     * Filter to objectives produced by a specific AgentSchedule. Accepts
     *  canonical as_… form or external_id:<value> form.
     */
    agentScheduleId?: string;
    /**
     * Filters by metadata labels. Comma-separated key=value pairs,
     *  e.g. "env=prod,team=ai". A resource matches only if every pair
     *  matches exactly (AND semantics).
     */
    labels?: string;
    /**
     * Filter to objectives associated with a tenant. Accepts the canonical
     *  `tenant_…` form or the `external_id:<value>` form.
     */
    tenantId?: string;
    /**
     * Filter to objectives associated with a subject. Accepts the canonical
     *  `subj_…` form or the `external_id:<value>` form; the external_id form is
     *  scoped within a tenant and requires `tenant_id` to also be set.
     */
    subjectId?: string;
    /**
     * Filter to objectives whose conversation ran through a widget. Accepts
     *  the canonical `wgt_…` form or the `external_id:<value>` form.
     */
    widgetId?: string;
    /**
     * Filter to objectives created by a specific widget session.
     */
    widgetSessionId?: string;
}
export interface ObjectiveCreateParams {
    agentId: string;
    /**
     * Arbitrary data rendered into the selected variation's system_prompt_template
     *  (liquid) to produce the objective's system prompt. If the agent has a
     *  system_prompt_data_schema, this must satisfy it.
     */
    systemPromptData: Record<string, unknown>;
    /**
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
    /**
     * Optional explicit variation selection. Overrides the agent's variation_selection_mode.
     */
    variationId?: string;
    metadata?: CreateOperationMetadata;
    /**
     * Optional explicit first user message for the LLM chat history. When not set,
     *  the selected variation's first_user_message_template is rendered with
     *  first_user_message_data instead. If neither this field nor a
     *  first_user_message_template is present, the request is rejected with InvalidArgument.
     */
    firstUserMessage?: string;
    /**
     * Secrets that can be used in the headers for tool calls using the secret interpolation format.
     */
    secrets?: Array<CreateObjectiveRequest_Secret>;
    /**
     * Memory layers/entries layered over the baseline cascade inherited
     *  from the selected variation — element-level rules over inherited
     *  styles, in CSS terms.
     *
     *  Array order is resolution order: EARLIER elements are more specific
     *  and are consulted first. Entries pinned via memory_entry_id behave
     *  as single-entry layers at their position.
     *
     *  System-managed layers (e.g., episodic) cannot be referenced here;
     *  they attach themselves automatically based on the episodic key.
     *
     *  Size cap: the TOTAL effective cascade (this field + the variation's
     *  memory layer assignments) must not exceed 10 entries. A request
     *  that would produce a larger cascade is rejected with
     *  InvalidArgument.
     */
    memoryCascade?: Array<MemoryReference>;
    /**
     * Arbitrary data rendered into the selected variation's first_user_message_template
     *  (liquid) to produce the first user message. Separate from `system_prompt_data`,
     *  which renders the system prompt template.
     */
    firstUserMessageData?: Record<string, unknown>;
    /**
     * If the agent variation that is selected has episodic memory enabled, then this key is used to create/update a memory layer
     *  specific to the episodic memory. The layer may have a TTL configured by the variation.
     */
    episodicMemory?: ObjectiveEpisodicConfigParam;
    /**
     * Optional tenant assertion — the customer's org/company identifier for the
     *  end user this objective serves. Upserts the tenant record in the
     *  workspace and associates the objective with it.
     */
    tenant?: TenantAssertion;
    /**
     * Optional subject assertion — the person within the tenant this objective
     *  serves. Requires `tenant`; a subject asserted without a tenant is
     *  rejected with InvalidArgument.
     */
    subject?: SubjectAssertion;
    /**
     * Parameters forced onto this objective's tool calls. A pinned parameter
     *  is removed from the tool schema the LLM sees, and its value is always
     *  overwritten server-side with the pinned value — the model cannot choose
     *  a different value for it. By default a pinned key applies to every tool
     *  with a top-level parameter of the same name; a tool set's overlays
     *  (ToolSetSpec.overlays) can bind pinned keys to nested paths, differently
     *  named parameters, or a subset of tools.
     */
    pinnedParameters?: Record<string, string>;
}
export interface ObjectiveRetrieveParams {
    /**
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
}
export interface ObjectiveListContextWindowsParams {
    /**
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
     * When set to true you may use more of your alloted API rate-limit
     */
    includeInfo?: boolean;
    /**
     * Filters by metadata labels. Comma-separated key=value pairs,
     *  e.g. "env=prod,team=ai". A resource matches only if every pair
     *  matches exactly (AND semantics).
     */
    labels?: string;
}
export interface ObjectiveRetrieveDiagnosticsParams {
    /**
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
}
export interface ObjectiveListEventsParams {
    /**
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
     * When set to true you may use more of your alloted API rate-limit
     */
    includeInfo?: boolean;
    /**
     * Optional context window ID to filter events by
     */
    windowId?: string;
    /**
     * Optional string to fetch events since an ID
     */
    sinceEventId?: string;
    /**
     * Filters by metadata labels. Comma-separated key=value pairs,
     *  e.g. "env=prod,team=ai". A resource matches only if every pair
     *  matches exactly (AND semantics).
     */
    labels?: string;
}
export interface ObjectiveStreamEventsParams {
    /**
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
}
export interface ObjectiveListFeedbackParams {
    /**
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
     * Filters by metadata labels. Comma-separated key=value pairs,
     *  e.g. "env=prod,team=ai". A resource matches only if every pair
     *  matches exactly (AND semantics).
     */
    labels?: string;
}
export interface ObjectiveCreateFeedbackParams {
    metadata: CreateOperationMetadata;
    data: ObjectiveFeedbackData;
    /**
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
}
export interface ObjectiveListTasksParams {
    /**
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
     * Sort order for results
     */
    sortOrder?: string;
}
export interface ObjectiveRetrieveTaskParams {
    /**
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
}
export interface ObjectiveListToolCallsParams {
    /**
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
     * Filter by tool call status
     */
    status?: ObjectiveServiceListObjectiveToolCallsStatus;
    /**
     * When set to true you may use more of your alloted API rate-limit
     */
    includeInfo?: boolean;
    /**
     * Filter by tool call execution status. Useful for reverse-harness
     *  polling of bare tool calls waiting for externally supplied content
     *  (TOOL_CALL_EXECUTION_STATUS_WAITING_FOR_CONTENT).
     */
    executionStatus?: ObjectiveServiceListObjectiveToolCallsExecutionStatus;
    /**
     * Filters by metadata labels. Comma-separated key=value pairs,
     *  e.g. "env=prod,team=ai". A resource matches only if every pair
     *  matches exactly (AND semantics).
     */
    labels?: string;
}
export interface ObjectiveRetrieveToolCallParams {
    /**
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
}
export interface ObjectiveApproveToolCallParams {
    /**
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
}
export interface ObjectiveDenyToolCallParams {
    /**
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
    /**
     * A memo to associate to the tool call denial. Use a memo to steer the LLM to a different decision or usage of the tool.
     */
    memo?: string;
}
export interface ObjectiveSetToolCallContentParams {
    /**
     * The content to set on the tool call. Mirrors
     *  ObjectiveToolCallResult.ContentBlock but writable: media blocks carry
     *  raw data on input where the result-side carries a signed url on output.
     */
    content: Array<SetToolCallContentRequest_ContentBlock>;
    /**
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
}
export interface ObjectiveListToolsParams {
    /**
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
}
export interface ObjectiveCancelParams {
    /**
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
    /**
     * Optional reason for cancellation
     */
    reason?: string;
}
export interface ObjectiveCompactParams {
    /**
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
    /**
     * Optional compaction config override. When not set, uses the variation's compaction_config.
     */
    compactionConfig?: AgentVariationSpec_CompactionConfig;
}
export interface ObjectiveContinueParams {
    /**
     * The message to continue an objective that has completed (or you are enqueing)
     */
    message: string;
    /**
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
    /**
     * When set to true, the message will be enqueued for when the agent loop is available to process it.
     */
    enqueue?: boolean;
}
export declare class Objectives {
    private readonly _client;
    constructor(_client: HttpClient);
    /**
     * List objectives
     *
     * @example
     * ```ts
     * const page = await client.objectives.list();
     * for await (const item of page) {
     *   // auto-fetches every page
     * }
     * ```
     */
    list(params?: ObjectiveListParams, options?: RequestOptions): Promise<Page<Objective>>;
    /**
     * Create a new objective
     *
     * @example
     * ```ts
     * const objective = await client.objectives.create({ agentId: 'sample', systemPromptData: {  } });
     * ```
     */
    create(params: ObjectiveCreateParams, options?: RequestOptions): APIPromise<Objective>;
    /**
     * Get an objective by ID
     *
     * @example
     * ```ts
     * const objective = await client.objectives.retrieve('_123');
     * ```
     */
    retrieve(id: string, params?: ObjectiveRetrieveParams, options?: RequestOptions): APIPromise<Objective>;
    /**
     * List objective context windows
     *
     * @example
     * ```ts
     * const page = await client.objectives.listContextWindows('objective_123');
     * for await (const item of page) {
     *   // auto-fetches every page
     * }
     * ```
     */
    listContextWindows(objectiveId: string, params?: ObjectiveListContextWindowsParams, options?: RequestOptions): Promise<Page<ObjectiveContextWindow>>;
    /**
     * Get objective context usage
     *
     * @example
     * ```ts
     * const getObjectiveDiagnosticsResponse = await client.objectives.retrieveDiagnostics('objective_123');
     * ```
     */
    retrieveDiagnostics(objectiveId: string, params?: ObjectiveRetrieveDiagnosticsParams, options?: RequestOptions): APIPromise<GetObjectiveDiagnosticsResponse>;
    /**
     * List objective events
     *
     * @example
     * ```ts
     * const page = await client.objectives.listEvents('objective_123');
     * for await (const item of page) {
     *   // auto-fetches every page
     * }
     * ```
     */
    listEvents(objectiveId: string, params?: ObjectiveListEventsParams, options?: RequestOptions): Promise<Page<ObjectiveEvent>>;
    /**
     * Stream objective events
     *
     * @example
     * ```ts
     * const stream = await client.objectives.streamEvents('objective_123');
     * for await (const event of stream) {
     *   // typed event payloads; housekeeping frames are skipped
     * }
     * ```
     */
    streamEvents(objectiveId: string, params?: ObjectiveStreamEventsParams, options?: RequestOptions): Promise<Stream<ObjectiveEvent>>;
    /**
     * List feedback for an objective
     *
     * @example
     * ```ts
     * const page = await client.objectives.listFeedback('objective_123');
     * for await (const item of page) {
     *   // auto-fetches every page
     * }
     * ```
     */
    listFeedback(objectiveId: string, params?: ObjectiveListFeedbackParams, options?: RequestOptions): Promise<Page<ObjectiveFeedback>>;
    /**
     * Submit feedback for an objective
     *
     * @example
     * ```ts
     * const objectiveFeedback = await client.objectives.createFeedback('objective_123', { metadata: {  }, data: {  } });
     * ```
     */
    createFeedback(objectiveId: string, params: ObjectiveCreateFeedbackParams, options?: RequestOptions): APIPromise<ObjectiveFeedback>;
    /**
     * List objective tasks
     *
     * @example
     * ```ts
     * const page = await client.objectives.listTasks('objective_123');
     * for await (const item of page) {
     *   // auto-fetches every page
     * }
     * ```
     */
    listTasks(objectiveId: string, params?: ObjectiveListTasksParams, options?: RequestOptions): Promise<Page<ObjectiveTask>>;
    /**
     * Get an objective task by ID
     *
     * @example
     * ```ts
     * const objectiveTask = await client.objectives.retrieveTask('objective_123', '_123');
     * ```
     */
    retrieveTask(objectiveId: string, id: string, params?: ObjectiveRetrieveTaskParams, options?: RequestOptions): APIPromise<ObjectiveTask>;
    /**
     * List objective tool calls
     *
     * @example
     * ```ts
     * const page = await client.objectives.listToolCalls('objective_123');
     * for await (const item of page) {
     *   // auto-fetches every page
     * }
     * ```
     */
    listToolCalls(objectiveId: string, params?: ObjectiveListToolCallsParams, options?: RequestOptions): Promise<Page<ObjectiveToolCall>>;
    /**
     * Get an objective tool call by ID
     *
     * @example
     * ```ts
     * const objectiveToolCallWithResult = await client.objectives.retrieveToolCall('objective_123', 'tool_call_123');
     * ```
     */
    retrieveToolCall(objectiveId: string, toolCallId: string, params?: ObjectiveRetrieveToolCallParams, options?: RequestOptions): APIPromise<ObjectiveToolCallWithResult>;
    /**
     * Approve a tool call
     *
     * @example
     * ```ts
     * const objectiveToolCall = await client.objectives.approveToolCall('objective_123', 'tool_call_123');
     * ```
     */
    approveToolCall(objectiveId: string, toolCallId: string, params?: ObjectiveApproveToolCallParams, options?: RequestOptions): APIPromise<ObjectiveToolCall>;
    /**
     * Deny a tool call
     *
     * @example
     * ```ts
     * const objectiveToolCall = await client.objectives.denyToolCall('objective_123', 'tool_call_123');
     * ```
     */
    denyToolCall(objectiveId: string, toolCallId: string, params?: ObjectiveDenyToolCallParams, options?: RequestOptions): APIPromise<ObjectiveToolCall>;
    /**
     * Set a bare tool call's content
     *
     * @example
     * ```ts
     * const objectiveToolCall = await client.objectives.setToolCallContent('objective_123', 'tool_call_123', { content: [{ text: { text: 'sample' }, type: 'text' }] });
     * ```
     */
    setToolCallContent(objectiveId: string, toolCallId: string, params: ObjectiveSetToolCallContentParams, options?: RequestOptions): APIPromise<ObjectiveToolCall>;
    /**
     * List objective tools
     *
     * @example
     * ```ts
     * const page = await client.objectives.listTools('objective_123');
     * for await (const item of page) {
     *   // auto-fetches every page
     * }
     * ```
     */
    listTools(objectiveId: string, params?: ObjectiveListToolsParams, options?: RequestOptions): Promise<Page<ObjectiveTool>>;
    /**
     * Cancel an objective
     *
     * @example
     * ```ts
     * const objective = await client.objectives.cancel('objective_123');
     * ```
     */
    cancel(objectiveId: string, params?: ObjectiveCancelParams, options?: RequestOptions): APIPromise<Objective>;
    /**
     * Compact an objective
     *
     * @example
     * ```ts
     * const compactObjectiveResponse = await client.objectives.compact('objective_123');
     * ```
     */
    compact(objectiveId: string, params?: ObjectiveCompactParams, options?: RequestOptions): APIPromise<CompactObjectiveResponse>;
    /**
     * Continue an objective
     *
     * @example
     * ```ts
     * const objectiveEvent = await client.objectives.continue('objective_123', { message: 'sample' });
     * ```
     */
    continue(objectiveId: string, params: ObjectiveContinueParams, options?: RequestOptions): APIPromise<ObjectiveEvent>;
}
//# sourceMappingURL=objectives.d.ts.map