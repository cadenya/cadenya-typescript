// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ObjectivesAPI from './objectives';
import * as AccountAPI from '../account';
import * as Shared from '../shared';
import * as WidgetSessionsAPI from '../widget-sessions';
import * as AgentsAPI from '../agents/agents';
import * as SchedulesAPI from '../agents/schedules';
import * as VariationsAPI from '../agents/variations';
import * as FeedbackAPI from './feedback';
import {
  Feedback,
  FeedbackCreateParams,
  FeedbackListParams,
  ObjectiveFeedback,
  ObjectiveFeedbackData,
  ObjectiveFeedbackInfo,
  ObjectiveFeedbacksCursorPagination,
} from './feedback';
import * as TasksAPI from './tasks';
import {
  ObjectiveTask,
  ObjectiveTaskData,
  ObjectiveTasksCursorPagination,
  TaskListParams,
  TaskRetrieveParams,
  Tasks,
} from './tasks';
import * as ToolCallsAPI from './tool-calls';
import {
  ObjectiveToolCall,
  ObjectiveToolCallData,
  ObjectiveToolCallInfo,
  ObjectiveToolCallResult,
  ObjectiveToolCallResultAudioBlock,
  ObjectiveToolCallResultContentBlock,
  ObjectiveToolCallResultContentBlockAudio,
  ObjectiveToolCallResultContentBlockImage,
  ObjectiveToolCallResultContentBlockText,
  ObjectiveToolCallResultImageBlock,
  ObjectiveToolCallResultTextBlock,
  ObjectiveToolCallWithResult,
  ObjectiveToolCallsCursorPagination,
  ResolvedSecret,
  SetToolCallContentRequestAudioBlock,
  SetToolCallContentRequestContentBlock,
  SetToolCallContentRequestContentBlockAudio,
  SetToolCallContentRequestContentBlockImage,
  SetToolCallContentRequestContentBlockText,
  SetToolCallContentRequestImageBlock,
  SetToolCallContentRequestTextBlock,
  ToolCallApproveParams,
  ToolCallDenyParams,
  ToolCallListParams,
  ToolCallRetrieveParams,
  ToolCallSetContentParams,
  ToolCalls,
} from './tool-calls';
import * as ToolsAPI from './tools';
import { ObjectiveTool, ObjectiveToolsCursorPagination, ToolListParams, Tools } from './tools';
import * as ToolSetsToolsAPI from '../tool-sets/tools';
import { APIPromise } from '../../core/api-promise';
import { CursorPagination, type CursorPaginationParams, PagePromise } from '../../core/pagination';
import { Stream } from '../../core/streaming';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Objectives extends APIResource {
  tools: ToolsAPI.Tools = new ToolsAPI.Tools(this._client);
  toolCalls: ToolCallsAPI.ToolCalls = new ToolCallsAPI.ToolCalls(this._client);
  tasks: TasksAPI.Tasks = new TasksAPI.Tasks(this._client);
  feedback: FeedbackAPI.Feedback = new FeedbackAPI.Feedback(this._client);

  /**
   * Creates a new objective in the workspace
   *
   * @example
   * ```ts
   * const objective = await client.objectives.create({
   *   workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q',
   *   agentId: 'agent_01HXKD2E5NQM3T9AYWCFMGWT9Y',
   *   systemPromptData: { foo: 'bar' },
   * });
   * ```
   */
  create(params: ObjectiveCreateParams, options?: RequestOptions): APIPromise<Objective> {
    const { workspaceId = this._client.workspaceID, ...body } = params;
    return this._client.post(path`/v1/workspaces/${workspaceId}/objectives`, { body, ...options });
  }

  /**
   * Retrieves an objective by ID from the workspace
   *
   * @example
   * ```ts
   * const objective = await client.objectives.retrieve(
   *   'obj_01HXKD2E5NQM3T9AYWCFQAZGFV',
   *   { workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q' },
   * );
   * ```
   */
  retrieve(
    id: string,
    params: ObjectiveRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<Objective> {
    const { workspaceId = this._client.workspaceID } = params ?? {};
    return this._client.get(path`/v1/workspaces/${workspaceId}/objectives/${id}`, options);
  }

  /**
   * Lists all objectives in the workspace
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const objective of client.objectives.list({
   *   workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q',
   * })) {
   *   // ...
   * }
   * ```
   */
  list(
    params: ObjectiveListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ObjectivesCursorPagination, Objective> {
    const { workspaceId = this._client.workspaceID, ...query } = params ?? {};
    return this._client.getAPIList(
      path`/v1/workspaces/${workspaceId}/objectives`,
      CursorPagination<Objective>,
      { query, ...options },
    );
  }

  /**
   * Cancels a running or pending objective. The objective's state will be set to
   * STATE_CANCELLED.
   *
   * @example
   * ```ts
   * const objective = await client.objectives.cancel(
   *   'obj_01HXKD2E5NQM3T9AYWCFQAZGFV',
   *   { workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q' },
   * );
   * ```
   */
  cancel(
    objectiveID: string,
    params: ObjectiveCancelParams,
    options?: RequestOptions,
  ): APIPromise<Objective> {
    const { workspaceId = this._client.workspaceID, ...body } = params;
    return this._client.post(path`/v1/workspaces/${workspaceId}/objectives/${objectiveID}:cancel`, {
      body,
      ...options,
    });
  }

  /**
   * Triggers compaction on a running objective. Optionally override the variation's
   * compaction config.
   *
   * @example
   * ```ts
   * const response = await client.objectives.compact(
   *   'obj_01HXKD2E5NQM3T9AYWCFQAZGFV',
   *   { workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q' },
   * );
   * ```
   */
  compact(
    objectiveID: string,
    params: ObjectiveCompactParams,
    options?: RequestOptions,
  ): APIPromise<ObjectiveCompactResponse> {
    const { workspaceId = this._client.workspaceID, ...body } = params;
    return this._client.post(path`/v1/workspaces/${workspaceId}/objectives/${objectiveID}:compact`, {
      body,
      ...options,
    });
  }

  /**
   * Continues an objective that has completed
   *
   * @example
   * ```ts
   * const objectiveEvent = await client.objectives.continue(
   *   'obj_01HXKD2E5NQM3T9AYWCFQAZGFV',
   *   {
   *     workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q',
   *     message: 'message',
   *   },
   * );
   * ```
   */
  continue(
    objectiveID: string,
    params: ObjectiveContinueParams,
    options?: RequestOptions,
  ): APIPromise<ObjectiveEvent> {
    const { workspaceId = this._client.workspaceID, ...body } = params;
    return this._client.post(path`/v1/workspaces/${workspaceId}/objectives/${objectiveID}:continue`, {
      body,
      ...options,
    });
  }

  /**
   * Read-only list of the last five windows of execution for this objective, ordered
   * by most recent first
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const objectiveContextWindow of client.objectives.listContextWindows(
   *   'obj_01HXKD2E5NQM3T9AYWCFQAZGFV',
   *   { workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q' },
   * )) {
   *   // ...
   * }
   * ```
   */
  listContextWindows(
    objectiveID: string,
    params: ObjectiveListContextWindowsParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ObjectiveContextWindowsCursorPagination, ObjectiveContextWindow> {
    const { workspaceId = this._client.workspaceID, ...query } = params ?? {};
    return this._client.getAPIList(
      path`/v1/workspaces/${workspaceId}/objectives/${objectiveID}/context_windows`,
      CursorPagination<ObjectiveContextWindow>,
      { query, ...options },
    );
  }

  /**
   * Lists all events for an objective
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const objectiveEvent of client.objectives.listEvents(
   *   'obj_01HXKD2E5NQM3T9AYWCFQAZGFV',
   *   { workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q' },
   * )) {
   *   // ...
   * }
   * ```
   */
  listEvents(
    objectiveID: string,
    params: ObjectiveListEventsParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ObjectiveEventsCursorPagination, ObjectiveEvent> {
    const { workspaceId = this._client.workspaceID, ...query } = params ?? {};
    return this._client.getAPIList(
      path`/v1/workspaces/${workspaceId}/objectives/${objectiveID}/events`,
      CursorPagination<ObjectiveEvent>,
      { query, ...options },
    );
  }

  /**
   * Returns the context-usage breakdown measured for the objective's most recent
   * iteration: character lengths per context component (system prompt, memory
   * appendices, tool definitions, messages by role) alongside the iteration's input
   * token counts.
   *
   * @example
   * ```ts
   * const response =
   *   await client.objectives.retrieveDiagnostics(
   *     'obj_01HXKD2E5NQM3T9AYWCFQAZGFV',
   *     { workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q' },
   *   );
   * ```
   */
  retrieveDiagnostics(
    objectiveID: string,
    params: ObjectiveRetrieveDiagnosticsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ObjectiveRetrieveDiagnosticsResponse> {
    const { workspaceId = this._client.workspaceID } = params ?? {};
    return this._client.get(
      path`/v1/workspaces/${workspaceId}/objectives/${objectiveID}/diagnostics`,
      options,
    );
  }

  /**
   * Streams events for an objective in real-time using server-sent events (SSE)
   *
   * @example
   * ```ts
   * const objectiveEvent = await client.objectives.streamEvents(
   *   'obj_01HXKD2E5NQM3T9AYWCFQAZGFV',
   *   { workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q' },
   * );
   * ```
   */
  streamEvents(
    objectiveID: string,
    params: ObjectiveStreamEventsParams | undefined = {},
    options?: RequestOptions,
  ): APIPromise<Stream<ObjectiveEvent>> {
    const { workspaceId = this._client.workspaceID } = params ?? {};
    return this._client.get(path`/v1/workspaces/${workspaceId}/objectives/${objectiveID}/events:stream`, {
      ...options,
      headers: buildHeaders([{ Accept: 'text/event-stream' }, options?.headers]),
      stream: true,
    }) as APIPromise<Stream<ObjectiveEvent>>;
  }
}

export type ObjectivesCursorPagination = CursorPagination<Objective>;

export type ObjectiveContextWindowsCursorPagination = CursorPagination<ObjectiveContextWindow>;

export type ObjectiveEventsCursorPagination = CursorPagination<ObjectiveEvent>;

export interface AssistantMessage {
  content?: string;

  toolCalls?: Array<AssistantToolCall>;
}

export interface AssistantToolCall {
  arguments?: string;

  functionName?: string;

  /**
   * CallableTool is a union that represents a tool that can be called by an agent.
   * In Cadenya, a tool that is used within an agent objective might be a
   * user-defined tool (IE: MCP, HTTP), another Agent (useful to separate context),
   * or a Cadenya Tool (one Cadenya provides).
   */
  tool?: CallableTool;
}

/**
 * CallableTool is a union that represents a tool that can be called by an agent.
 * In Cadenya, a tool that is used within an agent objective might be a
 * user-defined tool (IE: MCP, HTTP), another Agent (useful to separate context),
 * or a Cadenya Tool (one Cadenya provides).
 */
export type CallableTool = CallableToolTool | CallableToolAgent | CallableToolCadenyaProvidedTool;

export interface CallableToolAgent {
  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  agent: Shared.ResourceMetadata;

  type: 'agent';
}

export interface CallableToolCadenyaProvidedTool {
  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  cadenyaProvidedTool: Shared.ResourceMetadata;

  type: 'cadenyaProvidedTool';
}

export interface CallableToolTool {
  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  tool: Shared.ResourceMetadata;

  type: 'tool';
}

/**
 * ContextLengths is the measured character length of each distinct component of an
 * iteration's assembled context window. Values are raw character lengths of the
 * component as assembled into the request — token estimates are derived by the
 * client against input_tokens (component share = component length / sum of all
 * lengths).
 *
 * New components are added as new fields — wire-compatible; absent components read
 * as 0.
 */
export interface ContextLengths {
  /**
   * Character length of the chat history messages with the assistant role.
   */
  assistantMessages: number;

  /**
   * Character length of the discoverable/available-tools appendix attached to the
   * system prompt.
   */
  availableTools: number;

  /**
   * Character length of the episodic memory appendix attached to the system prompt.
   */
  episodicMemory: number;

  /**
   * Character length of the skills memory appendix attached to the system prompt.
   */
  skillsMemory: number;

  /**
   * Character length of the objective's base system prompt (rendered variation
   * template). Not tokens -- see the message comment.
   */
  systemPrompt: number;

  /**
   * Character length of the serialized tool definitions sent with the completion
   * request (names, descriptions, and JSON-schema parameters).
   */
  toolDefinitions: number;

  /**
   * Character length of the tool results present in the chat history.
   */
  toolResults: number;

  /**
   * Character length of the chat history messages with the user role.
   */
  userMessages: number;
}

export interface ContextWindowCompacted {
  /**
   * Number of messages that were compacted
   */
  messagesCompacted?: number;

  /**
   * The new context window created by this compaction
   */
  newContextWindow?: ObjectiveContextWindowData;

  /**
   * The strategies that were applied during this compaction
   */
  strategies?: Array<string>;

  /**
   * The summary generated by the summarization strategy, if used.
   */
  summary?: string;
}

/**
 * MemoryRead is emitted each time the agent resolves a key against the memory
 * cascade and loads an entry. Lookups that miss (key not found in any layer) do
 * not emit this event.
 */
export interface MemoryRead {
  /**
   * The specific entry that was read.
   */
  memoryEntryId?: string;

  /**
   * The layer the entry resolved to. The top-most layer that contained the key —
   * other layers beneath it that also contained the key are shadowed and not
   * referenced here.
   */
  memoryLayerId?: string;

  /**
   * Human-readable description of the read, set by the runtime. For example: "Loaded
   * skill", "Resolved context key". Not machine-parsed; intended for UI display
   * alongside the other events in an objective's timeline.
   */
  message?: string;
}

/**
 * MemoryReference identifies a memory layer or a specific entry within one, for
 * composition into a memory cascade. Used on objectives (where entry pinning is
 * permitted).
 *
 * memory*layer_id accepts both the canonical form (memlyr*…) and the external-id
 * form (external_id:my-custom-id). The same applies to memory_entry_id when set.
 */
export interface MemoryReference {
  memoryLayerId: string;

  /**
   * When set, inserts only this entry from memory_layer_id into the cascade —
   * behaves as a single-entry layer (only this key resolves at this position). The
   * entry must belong to memory_layer_id; mismatches are rejected with
   * InvalidArgument.
   */
  memoryEntryId?: string;
}

/**
 * Objective is the data for an objective. It contains the snapshotted fields for
 * the selected agent and variation. Secrets are returned only with their names,
 * and the output definition is copied from the agent's configuration.
 */
export interface Objective {
  /**
   * ObjectiveConfigSnapshot is the point-in-time snapshot of the agent, variation,
   * and (when applicable) schedule that an objective was started with.
   */
  configSnapshot: ObjectiveConfigSnapshot;

  /**
   * The first user message in the LLM chat history, either provided explicitly at
   * creation or rendered from the variation's first_user_message_template.
   */
  firstUserMessage: string;

  /**
   * Metadata for ephemeral operations and activities (e.g., objectives, executions,
   * runs)
   */
  metadata: Shared.OperationMetadata;

  /**
   * The current lifecycle state of the objective.
   */
  state:
    | 'STATE_UNSPECIFIED'
    | 'STATE_PENDING'
    | 'STATE_RUNNING'
    | 'STATE_WAITING'
    | 'STATE_FAILED'
    | 'STATE_CANCELLED'
    | 'STATE_FINALIZED'
    | 'STATE_TIMED_OUT';

  /**
   * system_prompt is read-only, derived from the selected variation's prompt
   */
  systemPrompt: string;

  /**
   * Episodic is used to configure the episodic memory for the objective
   */
  episodicMemory?: Objective.EpisodicMemory;

  /**
   * Arbitrary data rendered into the variation's first_user_message_template
   */
  firstUserMessageData?: { [key: string]: unknown };

  /**
   * ObjectiveInfo provides read-only aggregated statistics about an objective's
   * execution
   */
  info?: ObjectiveInfo;

  /**
   * Memory layers/entries layered over the baseline cascade inherited from the
   * selected variation — element-level rules over inherited styles, in CSS terms.
   *
   * Array order is resolution order: EARLIER elements are more specific and are
   * consulted first. Entries pinned via memory_entry_id behave as single-entry
   * layers at their position.
   *
   * System-managed layers (e.g., episodic) cannot be referenced here; they attach
   * themselves automatically based on the episodic key.
   *
   * Size cap: the TOTAL effective cascade (this field + the variation's memory layer
   * assignments) must not exceed 10 entries. A request that would produce a larger
   * cascade is rejected with InvalidArgument.
   */
  memoryCascade?: Array<MemoryReference>;

  /**
   * The output of the objective, populated when the objective completes. Will match
   * the schema of output_json_schema or output_json_inferred. This will only be set
   * if the state of the objective is set to STATE_FINALIZED
   */
  output?: { [key: string]: unknown };

  /**
   * A parent objective means the objective was spawned off using a separate agent to
   * complete an objective
   */
  parentObjectiveId?: string;

  /**
   * Parameters forced onto this objective's tool calls, as provided at creation. See
   * CreateObjectiveRequest.pinned_parameters for semantics.
   */
  pinnedParameters?: { [key: string]: string };

  /**
   * Secrets that can be used in the headers for tool calls using the secret
   * interpolation format.
   */
  secrets?: Array<ObjectiveSecret>;

  /**
   * Optional human-readable detail about the current state (e.g. a failure reason).
   */
  stateMessage?: string;

  /**
   * Arbitrary data rendered into the variation's system_prompt_template
   */
  systemPromptData?: { [key: string]: unknown };
}

export namespace Objective {
  /**
   * Episodic is used to configure the episodic memory for the objective
   */
  export interface EpisodicMemory {
    /**
     * The caller-supplied episodic key. Objectives created with the same key (for the
     * same agent) share one episodic memory layer.
     */
    key: string;

    /**
     * The episodic memory layer resolved (created or reused) for this objective's key.
     * Populated by the system at objective creation.
     */
    memoryLayerId?: string;
  }
}

/**
 * ObjectiveConfigSnapshot is the point-in-time snapshot of the agent, variation,
 * and (when applicable) schedule that an objective was started with.
 */
export interface ObjectiveConfigSnapshot {
  /**
   * Agent resource
   */
  agent?: AgentsAPI.Agent;

  /**
   * AgentSchedule resource — a recurring trigger attached to an agent that creates
   * objectives on its cadence.
   */
  agentSchedule?: SchedulesAPI.AgentSchedule;

  /**
   * AgentVariation resource
   */
  agentVariation?: VariationsAPI.AgentVariation;
}

/**
 * ObjectiveContextWindow is a window of chat completions that is grouped together
 * to prevent context-window overflows. Context windows also allow agents to
 * compact their windows and carry on into a new one.
 */
export interface ObjectiveContextWindow {
  data: ObjectiveContextWindowData;

  /**
   * Metadata for ephemeral operations and activities (e.g., objectives, executions,
   * runs)
   */
  metadata: Shared.OperationMetadata;

  info?: ObjectiveContextWindow.Info;
}

export namespace ObjectiveContextWindow {
  export interface Info {
    /**
     * A profile identifies a user or non-human principal (such as an API key) at the
     * account level. Profiles are account-scoped and can be granted access to multiple
     * workspaces.
     */
    createdBy?: AccountAPI.Profile;

    /**
     * Metadata for ephemeral operations and activities (e.g., objectives, executions,
     * runs)
     */
    objective?: Shared.OperationMetadata;
  }
}

export interface ObjectiveContextWindowData {
  /**
   * A calculated value for how many completion tokens (output tokens) have been used
   * in this context window
   */
  completionTokens?: number;

  /**
   * The objective's ID that this window belongs to
   */
  objectiveId?: string;

  /**
   * The instructions for this window to continue from a previous window's chat
   * history.
   */
  previousWindowContinueInstructions?: string;

  /**
   * A calculated value for how many prompt tokens (input tokens) have been used in
   * this context window
   */
  promptTokens?: number;

  /**
   * sequence is a numeric representation of which context window this is. Sequences
   * are useful to perform a max(sequence) on in order to calculate how many context
   * windows an objective has.
   */
  sequence?: number;
}

/**
 * ObjectiveDiagnostics is the context-usage breakdown measured for a single
 * iteration at request-assembly time. It reports how much of the context window
 * each component occupies so tool parameters, memory cascades, and prompts can be
 * tuned against real token usage.
 */
export interface ObjectiveDiagnostics {
  /**
   * The portion of input_tokens served from the provider's prompt cache. Lets
   * clients distinguish "big but cached" from "big and paid fresh every iteration".
   */
  cachedInputTokens: number;

  /**
   * ContextLengths is the measured character length of each distinct component of an
   * iteration's assembled context window. Values are raw character lengths of the
   * component as assembled into the request — token estimates are derived by the
   * client against input_tokens (component share = component length / sum of all
   * lengths).
   *
   * New components are added as new fields — wire-compatible; absent components read
   * as 0.
   */
  contextLengths: ContextLengths;

  /**
   * Input tokens reported by the LLM provider for the iteration's completion.
   */
  inputTokens: number;
}

export interface ObjectiveError {
  message?: string;

  type?: string;
}

export interface ObjectiveEvent {
  data: ObjectiveEventData;

  /**
   * Metadata for ephemeral operations and activities (e.g., objectives, executions,
   * runs)
   */
  metadata: Shared.OperationMetadata;

  contextWindowId?: string;

  /**
   * Elapsed time of the work this event records, when it is known at write time
   * (e.g. assistant message generation, tool execution for result/error events).
   * Unset means the event is instantaneous or the duration is not measurable.
   * Serialized as a canonical duration string (e.g. "4.1s"). Always set together
   * with started_at.
   */
  duration?: string;

  info?: ObjectiveEventInfo;

  /**
   * When the work this event records began. Set together with duration, so the work
   * interval is [started_at, started_at + duration]. The event's created_at remains
   * the time the event was persisted.
   */
  startedAt?: string;
}

export type ObjectiveEventData =
  | ObjectiveEventDataUserMessage
  | ObjectiveEventDataToolApprovalRequested
  | ObjectiveEventDataToolApproved
  | ObjectiveEventDataToolDenied
  | ObjectiveEventDataToolCalled
  | ObjectiveEventDataError
  | ObjectiveEventDataAssistantMessage
  | ObjectiveEventDataToolResult
  | ObjectiveEventDataToolError
  | ObjectiveEventDataContextWindowCompacted
  | ObjectiveEventDataMemoryRead
  | ObjectiveEventDataCancelled
  | ObjectiveEventDataSubAgentSpawned
  | ObjectiveEventDataSubAgentUpdated
  | ObjectiveEventDataFinalized
  | ObjectiveEventDataNotice
  | ObjectiveEventDataTimedOut
  | ObjectiveEventDataReasoning;

export interface ObjectiveEventDataAssistantMessage {
  assistantMessage: AssistantMessage;

  type: 'assistantMessage';
}

export interface ObjectiveEventDataCancelled {
  /**
   * ObjectiveCancelled is the terminal event written when an objective is cancelled.
   * After this event, the objective is super-terminal: no further iterations,
   * compaction, or continuation are permitted.
   */
  cancelled: ObjectiveEventDataCancelled.Cancelled;

  type: 'cancelled';
}

export namespace ObjectiveEventDataCancelled {
  /**
   * ObjectiveCancelled is the terminal event written when an objective is cancelled.
   * After this event, the objective is super-terminal: no further iterations,
   * compaction, or continuation are permitted.
   */
  export interface Cancelled {
    /**
     * Optional human-readable note recorded at cancel time. Today the workflow sets
     * "Cancelled" but this field leaves room for richer reasons (e.g. "Cancelled by
     * user", "Cancelled by schedule sweep", "Credit balance exhausted").
     */
    message?: string;
  }
}

export interface ObjectiveEventDataContextWindowCompacted {
  contextWindowCompacted: ContextWindowCompacted;

  type: 'contextWindowCompacted';
}

export interface ObjectiveEventDataError {
  error: ObjectiveError;

  type: 'error';
}

export interface ObjectiveEventDataFinalized {
  /**
   * ObjectiveFinalized is the terminal event written when an objective is finalized.
   * After this event, the objective is super-terminal: no further iterations,
   * compaction, or continuation are permitted.
   */
  finalized: ObjectiveEventDataFinalized.Finalized;

  type: 'finalized';
}

export namespace ObjectiveEventDataFinalized {
  /**
   * ObjectiveFinalized is the terminal event written when an objective is finalized.
   * After this event, the objective is super-terminal: no further iterations,
   * compaction, or continuation are permitted.
   */
  export interface Finalized {
    /**
     * If the objective was created with an output schema, and the agent successfully
     * completed the objective, this field will contain the structured output of the
     * objective.
     */
    output?: unknown;
  }
}

export interface ObjectiveEventDataMemoryRead {
  /**
   * MemoryRead is emitted each time the agent resolves a key against the memory
   * cascade and loads an entry. Lookups that miss (key not found in any layer) do
   * not emit this event.
   */
  memoryRead: MemoryRead;

  type: 'memoryRead';
}

export interface ObjectiveEventDataNotice {
  /**
   * Notice is a non-terminal diagnostic emitted by the runtime when something
   * noteworthy but non-fatal happens during an objective — for example a
   * just-in-time tool set failing to load, or a previously loaded tool being dropped
   * because it was archived. Notices carry no structured payload; they exist to make
   * the objective timeline self-explanatory.
   */
  notice: ObjectiveEventDataNotice.Notice;

  type: 'notice';
}

export namespace ObjectiveEventDataNotice {
  /**
   * Notice is a non-terminal diagnostic emitted by the runtime when something
   * noteworthy but non-fatal happens during an objective — for example a
   * just-in-time tool set failing to load, or a previously loaded tool being dropped
   * because it was archived. Notices carry no structured payload; they exist to make
   * the objective timeline self-explanatory.
   */
  export interface Notice {
    /**
     * Stable machine-readable identifier for the notice kind (for example
     * "tool_set_load_failed", "tool_archived"). Clients can switch on it or use it as
     * an i18n key; the message is the English fallback.
     */
    key?: string;

    level?: 'LEVEL_UNSPECIFIED' | 'LEVEL_INFO' | 'LEVEL_WARN';

    /**
     * Human-readable description of what happened.
     */
    message?: string;
  }
}

export interface ObjectiveEventDataReasoning {
  /**
   * Reasoning carries the human-readable reasoning text a model produced while
   * working on an iteration — extended thinking (Anthropic, Gemini) or reasoning
   * summaries (OpenAI). It is emitted alongside the assistant message from the same
   * model response and is purely informational: the text shown here is never sent
   * back to the model.
   */
  reasoning: Reasoning;

  type: 'reasoning';
}

export interface ObjectiveEventDataSubAgentSpawned {
  subAgentSpawned: SubAgentSpawned;

  type: 'subAgentSpawned';
}

export interface ObjectiveEventDataSubAgentUpdated {
  subAgentUpdated: SubAgentUpdated;

  type: 'subAgentUpdated';
}

export interface ObjectiveEventDataTimedOut {
  /**
   * ObjectiveTimedOut is the terminal event written when an objective is finalized
   * by the inactivity sweep because it saw no activity (no user messages, no LLM
   * calls) within its variation's inactivity timeout — or the system-wide 24 hour
   * maximum when no timeout is configured. The objective produces no output. After
   * this event, the objective is super-terminal: no further iterations, compaction,
   * or continuation are permitted.
   */
  timedOut: ObjectiveEventDataTimedOut.TimedOut;

  type: 'timedOut';
}

export namespace ObjectiveEventDataTimedOut {
  /**
   * ObjectiveTimedOut is the terminal event written when an objective is finalized
   * by the inactivity sweep because it saw no activity (no user messages, no LLM
   * calls) within its variation's inactivity timeout — or the system-wide 24 hour
   * maximum when no timeout is configured. The objective produces no output. After
   * this event, the objective is super-terminal: no further iterations, compaction,
   * or continuation are permitted.
   */
  export interface TimedOut {
    /**
     * Human-readable note recorded at timeout time (e.g. "Timed out after 2h of
     * inactivity").
     */
    message?: string;
  }
}

export interface ObjectiveEventDataToolApprovalRequested {
  toolApprovalRequested: ToolApprovalRequested;

  type: 'toolApprovalRequested';
}

export interface ObjectiveEventDataToolApproved {
  toolApproved: ToolApproved;

  type: 'toolApproved';
}

export interface ObjectiveEventDataToolCalled {
  toolCalled: ToolCalled;

  type: 'toolCalled';
}

export interface ObjectiveEventDataToolDenied {
  toolDenied: ToolDenied;

  type: 'toolDenied';
}

export interface ObjectiveEventDataToolError {
  toolError: ToolError;

  type: 'toolError';
}

export interface ObjectiveEventDataToolResult {
  toolResult: ToolResult;

  type: 'toolResult';
}

export interface ObjectiveEventDataUserMessage {
  type: 'userMessage';

  userMessage: UserMessage;
}

export interface ObjectiveEventInfo {
  /**
   * A profile identifies a user or non-human principal (such as an API key) at the
   * account level. Profiles are account-scoped and can be granted access to multiple
   * workspaces.
   */
  createdBy?: AccountAPI.Profile;

  /**
   * Metadata for ephemeral operations and activities (e.g., objectives, executions,
   * runs)
   */
  objective?: Shared.OperationMetadata;
}

/**
 * The envelope for an objective event webhook delivery. Contains timestamp, event
 * type, and the webhook data payload.
 */
export interface ObjectiveEventWebhookData {
  /**
   * The webhook data payload with flat top-level keys for agent, variation,
   * objective, and event.
   */
  data: ObjectiveEventWebhookData.Data;

  timestamp: string;

  /**
   * The event type, prefixed with objective_event. (e.g.,
   * objective_event.tool_result)
   */
  type: string;
}

export namespace ObjectiveEventWebhookData {
  /**
   * The webhook data payload with flat top-level keys for agent, variation,
   * objective, and event.
   */
  export interface Data {
    /**
     * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
     */
    agent: Shared.ResourceMetadata;

    /**
     * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
     */
    agentVariation: Shared.ResourceMetadata;

    /**
     * Metadata for ephemeral operations and activities (e.g., objectives, executions,
     * runs)
     */
    objective: Shared.OperationMetadata;

    objectiveEvent: ObjectivesAPI.ObjectiveEvent;
  }
}

/**
 * ObjectiveInfo provides read-only aggregated statistics about an objective's
 * execution
 */
export interface ObjectiveInfo {
  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  agent: Shared.ResourceMetadata;

  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  agentVariation: Shared.ResourceMetadata;

  /**
   * A profile identifies a user or non-human principal (such as an API key) at the
   * account level. Profiles are account-scoped and can be granted access to multiple
   * workspaces.
   */
  createdBy: AccountAPI.Profile;

  /**
   * ID of the objective's current (most recent) context window. Hydrated on demand;
   * empty when the objective has not yet produced a context window.
   */
  currentContextWindowId: string;

  /**
   * The effective memory cascade at objective creation time: the episodic layer
   * (when present), then Objective.memory_cascade, then the variation's baseline
   * layers by ascending position. Order is resolution order — index 0 is the most
   * specific and is consulted first; the first layer containing a key wins. Returned
   * on reads so clients can see exactly what the objective resolves against without
   * re-joining variation state.
   */
  effectiveMemoryCascade: Array<MemoryReference>;

  /**
   * Total number of context windows that this objective has generated
   */
  totalContextWindows: number;

  /**
   * Total number of events generated during this objective's execution
   */
  totalEvents: number;

  /**
   * Total input tokens consumed across all LLM completions across all context
   * windows
   */
  totalInputTokens: number;

  totalIterations: number;

  /**
   * Total output tokens generated across all LLM completions across all context
   * windows
   */
  totalOutputTokens: number;

  /**
   * Total number of tool calls made during execution
   */
  totalToolCalls: number;

  /**
   * SubjectReference is the read-only echo of a resource's subject association,
   * carrying both Cadenya's canonical id and the customer's own key.
   */
  subject?: WidgetSessionsAPI.SubjectReference;

  /**
   * TenantReference is the read-only echo of a resource's tenant association,
   * carrying both Cadenya's canonical id and the customer's own key.
   */
  tenant?: WidgetSessionsAPI.TenantReference;

  /**
   * BareMetadata contains the minimal metadata for a resource: the ID and an
   * optional human-readable name. These are used for reference fields where the full
   * metadata (account scoping, timestamps, labels, external IDs) is not needed —
   * e.g., the tool references inside an agent variation spec or the tools assigned
   * to an objective. Both fields are server-populated; clients provide IDs through
   * sibling fields rather than by constructing a BareMetadata themselves.
   */
  widget?: Shared.BareMetadata;
}

export interface ObjectiveSecret {
  name?: string;
}

/**
 * Reasoning carries the human-readable reasoning text a model produced while
 * working on an iteration — extended thinking (Anthropic, Gemini) or reasoning
 * summaries (OpenAI). It is emitted alongside the assistant message from the same
 * model response and is purely informational: the text shown here is never sent
 * back to the model.
 */
export interface Reasoning {
  /**
   * The reasoning text. May be a verbatim chain of thought or a provider-generated
   * summary depending on the model.
   */
  content: string;
}

export interface SubAgentSpawned {
  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  agent?: Shared.ResourceMetadata;

  /**
   * Metadata for ephemeral operations and activities (e.g., objectives, executions,
   * runs)
   */
  objective?: Shared.OperationMetadata;

  task?: string;
}

export interface SubAgentUpdated {
  /**
   * BareMetadata contains the minimal metadata for a resource: the ID and an
   * optional human-readable name. These are used for reference fields where the full
   * metadata (account scoping, timestamps, labels, external IDs) is not needed —
   * e.g., the tool references inside an agent variation spec or the tools assigned
   * to an objective. Both fields are server-populated; clients provide IDs through
   * sibling fields rather than by constructing a BareMetadata themselves.
   */
  agent?: Shared.BareMetadata;

  message?: string;

  /**
   * BareMetadata contains the minimal metadata for a resource: the ID and an
   * optional human-readable name. These are used for reference fields where the full
   * metadata (account scoping, timestamps, labels, external IDs) is not needed —
   * e.g., the tool references inside an agent variation spec or the tools assigned
   * to an objective. Both fields are server-populated; clients provide IDs through
   * sibling fields rather than by constructing a BareMetadata themselves.
   */
  objective?: Shared.BareMetadata;

  status?:
    | 'STATUS_UNSPECIFIED'
    | 'STATUS_PENDING'
    | 'STATUS_RUNNING'
    | 'STATUS_COMPLETED'
    | 'STATUS_FAILED'
    | 'STATUS_CANCELLED';
}

export interface ToolApprovalRequested {
  /**
   * The ID of the objective tool call record. Use this ID with the ApproveToolCall
   * or DenyToolCall RPCs to approve or deny the tool call.
   */
  toolCallId?: string;
}

export interface ToolApproved {
  /**
   * The ID of the objective tool call record that was approved via the
   * ApproveToolCall RPC.
   */
  toolCallId?: string;
}

export interface ToolCalled {
  /**
   * The arguments passed to the tool.
   */
  arguments?: { [key: string]: unknown };

  /**
   * Config defines the adapter to use for the tool. This is used to determine how
   * the tool is called. For example, if the tool is an HTTP tool, the adapter will
   * be Http. If the tool is an inline tool, the adapter will be Inline.
   */
  config?: ToolSetsToolsAPI.ToolSpecConfig;

  /**
   * CallableTool is a union that represents a tool that can be called by an agent.
   * In Cadenya, a tool that is used within an agent objective might be a
   * user-defined tool (IE: MCP, HTTP), another Agent (useful to separate context),
   * or a Cadenya Tool (one Cadenya provides).
   */
  tool?: CallableTool;

  /**
   * The ID of the objective tool call record that was executed.
   */
  toolCallId?: string;
}

export interface ToolDenied {
  /**
   * The memo provided by the reviewer when denying the tool call. This is passed to
   * the agent to provide further instructions.
   */
  memo?: string;

  /**
   * The ID of the objective tool call record that was denied via the DenyToolCall
   * RPC.
   */
  toolCallId?: string;
}

export interface ToolError {
  message?: string;

  /**
   * The ID of the objective tool call record that encountered an error during
   * execution.
   */
  toolCallId?: string;
}

export interface ToolResult {
  /**
   * ObjectiveToolCallResult is the content a tool returned after execution. Tools
   * can return multiple content blocks, and blocks can be multi-modal (text, image,
   * audio). Media blocks are stored by Cadenya and served as short-lived signed URLs
   * rather than inline bytes.
   */
  result: ToolCallsAPI.ObjectiveToolCallResult;

  toolCallId: string;
}

export interface UserMessage {
  content?: string;
}

/**
 * Compact objective response
 */
export interface ObjectiveCompactResponse {
  /**
   * The new context window created by the compaction
   */
  contextWindow?: ObjectiveContextWindowData;
}

export interface ObjectiveRetrieveDiagnosticsResponse {
  /**
   * ObjectiveDiagnostics is the context-usage breakdown measured for a single
   * iteration at request-assembly time. It reports how much of the context window
   * each component occupies so tool parameters, memory cascades, and prompts can be
   * tuned against real token usage.
   */
  diagnostics: ObjectiveDiagnostics;
}

export interface ObjectiveCreateParams {
  /**
   * Path param
   */
  workspaceId?: string;

  /**
   * Body param
   */
  agentId: string;

  /**
   * Body param: Arbitrary data rendered into the selected variation's
   * system_prompt_template (liquid) to produce the objective's system prompt. If the
   * agent has a system_prompt_data_schema, this must satisfy it.
   */
  systemPromptData: { [key: string]: unknown };

  /**
   * Body param: Episodic is used to configure the episodic memory for the objective
   */
  episodicMemory?: ObjectiveCreateParams.EpisodicMemory;

  /**
   * Body param: Optional explicit first user message for the LLM chat history. When
   * not set, the selected variation's first_user_message_template is rendered with
   * first_user_message_data instead. If neither this field nor a
   * first_user_message_template is present, the request is rejected with
   * InvalidArgument.
   */
  firstUserMessage?: string;

  /**
   * Body param: Arbitrary data rendered into the selected variation's
   * first_user_message_template (liquid) to produce the first user message. Separate
   * from `system_prompt_data`, which renders the system prompt template.
   */
  firstUserMessageData?: { [key: string]: unknown };

  /**
   * Body param: Memory layers/entries layered over the baseline cascade inherited
   * from the selected variation — element-level rules over inherited styles, in CSS
   * terms.
   *
   * Array order is resolution order: EARLIER elements are more specific and are
   * consulted first. Entries pinned via memory_entry_id behave as single-entry
   * layers at their position.
   *
   * System-managed layers (e.g., episodic) cannot be referenced here; they attach
   * themselves automatically based on the episodic key.
   *
   * Size cap: the TOTAL effective cascade (this field + the variation's memory layer
   * assignments) must not exceed 10 entries. A request that would produce a larger
   * cascade is rejected with InvalidArgument.
   */
  memoryCascade?: Array<MemoryReference>;

  /**
   * Body param: CreateOperationMetadata contains the user-provided fields for
   * creating an operation. Read-only fields (id, account_id, workspace_id,
   * created_at, profile_id) are excluded since they are set by the server.
   */
  metadata?: Shared.CreateOperationMetadata;

  /**
   * Body param: Parameters forced onto this objective's tool calls. A pinned
   * parameter is an overlay on a tool's JSON schema: the parameter is removed from
   * what the LLM sees, and its value is always overwritten server-side with the
   * pinned value — the model cannot choose a different value for it.
   */
  pinnedParameters?: { [key: string]: string };

  /**
   * Body param: Secrets that can be used in the headers for tool calls using the
   * secret interpolation format.
   */
  secrets?: Array<ObjectiveCreateParams.Secret>;

  /**
   * Body param: SubjectAssertion identifies a person within a tenant in the
   * customer's own namespace — typically their user id. Asserting a subject upserts
   * the subject record under the asserted tenant and associates the created resource
   * with it. A subject assertion is only valid alongside a tenant assertion: subject
   * identifiers are scoped to their tenant.
   */
  subject?: WidgetSessionsAPI.SubjectAssertion;

  /**
   * Body param: TenantAssertion identifies a tenant in the customer's own namespace
   * — their org, company, or team identifier for an end user. Asserting a tenant
   * upserts the tenant record in the workspace (keyed on `id` as the tenant's
   * external_id) and associates the created resource with it.
   */
  tenant?: WidgetSessionsAPI.TenantAssertion;

  /**
   * Body param: Optional explicit variation selection. Overrides the agent's
   * variation_selection_mode.
   */
  variationId?: string;
}

export namespace ObjectiveCreateParams {
  /**
   * Episodic is used to configure the episodic memory for the objective
   */
  export interface EpisodicMemory {
    /**
     * The caller-supplied episodic key. Objectives created with the same key (for the
     * same agent) share one episodic memory layer.
     */
    key: string;
  }

  export interface Secret {
    name?: string;

    value?: string;
  }
}

export interface ObjectiveRetrieveParams {
  workspaceId?: string;
}

export interface ObjectiveListParams extends CursorPaginationParams {
  /**
   * Path param
   */
  workspaceId?: string;

  /**
   * Query param: Agent ID for filtering
   */
  agentId?: string;

  /**
   * Query param: Filter to objectives produced by a specific AgentSchedule. Accepts
   * canonical as\_… form or external_id:<value> form.
   */
  agentScheduleId?: string;

  /**
   * Query param: When set to true you may use more of your alloted API rate-limit
   */
  includeInfo?: boolean;

  /**
   * Query param: Filters by metadata labels. Comma-separated key=value pairs, e.g.
   * "env=prod,team=ai". A resource matches only if every pair matches exactly (AND
   * semantics).
   */
  labels?: string;

  /**
   * Query param: Optional filters
   */
  parentObjectiveId?: string;

  /**
   * Query param
   */
  profileId?: string;

  /**
   * Query param: Sort order for results (asc or desc by creation time)
   */
  sortOrder?: string;

  /**
   * Query param: Filter by state
   */
  state?:
    | 'STATE_UNSPECIFIED'
    | 'STATE_PENDING'
    | 'STATE_RUNNING'
    | 'STATE_WAITING'
    | 'STATE_FAILED'
    | 'STATE_CANCELLED'
    | 'STATE_FINALIZED'
    | 'STATE_TIMED_OUT';

  /**
   * Query param: Filter to objectives associated with a subject. Accepts the
   * canonical `subj_…` form or the `external_id:<value>` form; the external_id form
   * is scoped within a tenant and requires `tenant_id` to also be set.
   */
  subjectId?: string;

  /**
   * Query param: Filter to objectives associated with a tenant. Accepts the
   * canonical `tenant_…` form or the `external_id:<value>` form.
   */
  tenantId?: string;

  /**
   * Query param: Filter to objectives whose conversation ran through a widget.
   * Accepts the canonical `wgt_…` form or the `external_id:<value>` form.
   */
  widgetId?: string;

  /**
   * Query param: Filter to objectives created by a specific widget session.
   */
  widgetSessionId?: string;
}

export interface ObjectiveCancelParams {
  /**
   * Path param
   */
  workspaceId?: string;

  /**
   * Body param: Optional reason for cancellation
   */
  reason?: string;
}

export interface ObjectiveCompactParams {
  /**
   * Path param
   */
  workspaceId?: string;

  /**
   * Body param: CompactionConfig defines how context window compaction behaves for
   * objectives using this variation.
   */
  compactionConfig?: VariationsAPI.AgentVariationSpecCompactionConfig;
}

export interface ObjectiveContinueParams {
  /**
   * Path param
   */
  workspaceId?: string;

  /**
   * Body param: The message to continue an objective that has completed (or you are
   * enqueing)
   */
  message: string;

  /**
   * Body param: When set to true, the message will be enqueued for when the agent
   * loop is available to process it.
   */
  enqueue?: boolean;
}

export interface ObjectiveListContextWindowsParams extends CursorPaginationParams {
  /**
   * Path param
   */
  workspaceId?: string;

  /**
   * Query param: When set to true you may use more of your alloted API rate-limit
   */
  includeInfo?: boolean;

  /**
   * Query param: Filters by metadata labels. Comma-separated key=value pairs, e.g.
   * "env=prod,team=ai". A resource matches only if every pair matches exactly (AND
   * semantics).
   */
  labels?: string;
}

export interface ObjectiveListEventsParams extends CursorPaginationParams {
  /**
   * Path param
   */
  workspaceId?: string;

  /**
   * Query param: When set to true you may use more of your alloted API rate-limit
   */
  includeInfo?: boolean;

  /**
   * Query param: Filters by metadata labels. Comma-separated key=value pairs, e.g.
   * "env=prod,team=ai". A resource matches only if every pair matches exactly (AND
   * semantics).
   */
  labels?: string;

  /**
   * Query param: Optional string to fetch events since an ID
   */
  sinceEventId?: string;

  /**
   * Query param: Sort order for results (asc or desc by creation time)
   */
  sortOrder?: string;

  /**
   * Query param: Optional context window ID to filter events by
   */
  windowId?: string;
}

export interface ObjectiveRetrieveDiagnosticsParams {
  workspaceId?: string;
}

export interface ObjectiveStreamEventsParams {
  workspaceId?: string;
}

Objectives.Tools = Tools;
Objectives.ToolCalls = ToolCalls;
Objectives.Tasks = Tasks;
Objectives.Feedback = Feedback;

export declare namespace Objectives {
  export {
    type AssistantMessage as AssistantMessage,
    type AssistantToolCall as AssistantToolCall,
    type CallableTool as CallableTool,
    type CallableToolAgent as CallableToolAgent,
    type CallableToolCadenyaProvidedTool as CallableToolCadenyaProvidedTool,
    type CallableToolTool as CallableToolTool,
    type ContextLengths as ContextLengths,
    type ContextWindowCompacted as ContextWindowCompacted,
    type MemoryRead as MemoryRead,
    type MemoryReference as MemoryReference,
    type Objective as Objective,
    type ObjectiveConfigSnapshot as ObjectiveConfigSnapshot,
    type ObjectiveContextWindow as ObjectiveContextWindow,
    type ObjectiveContextWindowData as ObjectiveContextWindowData,
    type ObjectiveDiagnostics as ObjectiveDiagnostics,
    type ObjectiveError as ObjectiveError,
    type ObjectiveEvent as ObjectiveEvent,
    type ObjectiveEventData as ObjectiveEventData,
    type ObjectiveEventDataAssistantMessage as ObjectiveEventDataAssistantMessage,
    type ObjectiveEventDataCancelled as ObjectiveEventDataCancelled,
    type ObjectiveEventDataContextWindowCompacted as ObjectiveEventDataContextWindowCompacted,
    type ObjectiveEventDataError as ObjectiveEventDataError,
    type ObjectiveEventDataFinalized as ObjectiveEventDataFinalized,
    type ObjectiveEventDataMemoryRead as ObjectiveEventDataMemoryRead,
    type ObjectiveEventDataNotice as ObjectiveEventDataNotice,
    type ObjectiveEventDataReasoning as ObjectiveEventDataReasoning,
    type ObjectiveEventDataSubAgentSpawned as ObjectiveEventDataSubAgentSpawned,
    type ObjectiveEventDataSubAgentUpdated as ObjectiveEventDataSubAgentUpdated,
    type ObjectiveEventDataTimedOut as ObjectiveEventDataTimedOut,
    type ObjectiveEventDataToolApprovalRequested as ObjectiveEventDataToolApprovalRequested,
    type ObjectiveEventDataToolApproved as ObjectiveEventDataToolApproved,
    type ObjectiveEventDataToolCalled as ObjectiveEventDataToolCalled,
    type ObjectiveEventDataToolDenied as ObjectiveEventDataToolDenied,
    type ObjectiveEventDataToolError as ObjectiveEventDataToolError,
    type ObjectiveEventDataToolResult as ObjectiveEventDataToolResult,
    type ObjectiveEventDataUserMessage as ObjectiveEventDataUserMessage,
    type ObjectiveEventInfo as ObjectiveEventInfo,
    type ObjectiveEventWebhookData as ObjectiveEventWebhookData,
    type ObjectiveInfo as ObjectiveInfo,
    type ObjectiveSecret as ObjectiveSecret,
    type Reasoning as Reasoning,
    type SubAgentSpawned as SubAgentSpawned,
    type SubAgentUpdated as SubAgentUpdated,
    type ToolApprovalRequested as ToolApprovalRequested,
    type ToolApproved as ToolApproved,
    type ToolCalled as ToolCalled,
    type ToolDenied as ToolDenied,
    type ToolError as ToolError,
    type ToolResult as ToolResult,
    type UserMessage as UserMessage,
    type ObjectiveCompactResponse as ObjectiveCompactResponse,
    type ObjectiveRetrieveDiagnosticsResponse as ObjectiveRetrieveDiagnosticsResponse,
    type ObjectivesCursorPagination as ObjectivesCursorPagination,
    type ObjectiveContextWindowsCursorPagination as ObjectiveContextWindowsCursorPagination,
    type ObjectiveEventsCursorPagination as ObjectiveEventsCursorPagination,
    type ObjectiveCreateParams as ObjectiveCreateParams,
    type ObjectiveRetrieveParams as ObjectiveRetrieveParams,
    type ObjectiveListParams as ObjectiveListParams,
    type ObjectiveCancelParams as ObjectiveCancelParams,
    type ObjectiveCompactParams as ObjectiveCompactParams,
    type ObjectiveContinueParams as ObjectiveContinueParams,
    type ObjectiveListContextWindowsParams as ObjectiveListContextWindowsParams,
    type ObjectiveListEventsParams as ObjectiveListEventsParams,
    type ObjectiveRetrieveDiagnosticsParams as ObjectiveRetrieveDiagnosticsParams,
    type ObjectiveStreamEventsParams as ObjectiveStreamEventsParams,
  };

  export {
    Tools as Tools,
    type ObjectiveTool as ObjectiveTool,
    type ObjectiveToolsCursorPagination as ObjectiveToolsCursorPagination,
    type ToolListParams as ToolListParams,
  };

  export {
    ToolCalls as ToolCalls,
    type ObjectiveToolCall as ObjectiveToolCall,
    type ObjectiveToolCallData as ObjectiveToolCallData,
    type ObjectiveToolCallInfo as ObjectiveToolCallInfo,
    type ObjectiveToolCallResult as ObjectiveToolCallResult,
    type ObjectiveToolCallResultAudioBlock as ObjectiveToolCallResultAudioBlock,
    type ObjectiveToolCallResultContentBlock as ObjectiveToolCallResultContentBlock,
    type ObjectiveToolCallResultContentBlockAudio as ObjectiveToolCallResultContentBlockAudio,
    type ObjectiveToolCallResultContentBlockImage as ObjectiveToolCallResultContentBlockImage,
    type ObjectiveToolCallResultContentBlockText as ObjectiveToolCallResultContentBlockText,
    type ObjectiveToolCallResultImageBlock as ObjectiveToolCallResultImageBlock,
    type ObjectiveToolCallResultTextBlock as ObjectiveToolCallResultTextBlock,
    type ObjectiveToolCallWithResult as ObjectiveToolCallWithResult,
    type ResolvedSecret as ResolvedSecret,
    type SetToolCallContentRequestAudioBlock as SetToolCallContentRequestAudioBlock,
    type SetToolCallContentRequestContentBlock as SetToolCallContentRequestContentBlock,
    type SetToolCallContentRequestContentBlockAudio as SetToolCallContentRequestContentBlockAudio,
    type SetToolCallContentRequestContentBlockImage as SetToolCallContentRequestContentBlockImage,
    type SetToolCallContentRequestContentBlockText as SetToolCallContentRequestContentBlockText,
    type SetToolCallContentRequestImageBlock as SetToolCallContentRequestImageBlock,
    type SetToolCallContentRequestTextBlock as SetToolCallContentRequestTextBlock,
    type ObjectiveToolCallsCursorPagination as ObjectiveToolCallsCursorPagination,
    type ToolCallRetrieveParams as ToolCallRetrieveParams,
    type ToolCallListParams as ToolCallListParams,
    type ToolCallApproveParams as ToolCallApproveParams,
    type ToolCallDenyParams as ToolCallDenyParams,
    type ToolCallSetContentParams as ToolCallSetContentParams,
  };

  export {
    Tasks as Tasks,
    type ObjectiveTask as ObjectiveTask,
    type ObjectiveTaskData as ObjectiveTaskData,
    type ObjectiveTasksCursorPagination as ObjectiveTasksCursorPagination,
    type TaskRetrieveParams as TaskRetrieveParams,
    type TaskListParams as TaskListParams,
  };

  export {
    Feedback as Feedback,
    type ObjectiveFeedback as ObjectiveFeedback,
    type ObjectiveFeedbackData as ObjectiveFeedbackData,
    type ObjectiveFeedbackInfo as ObjectiveFeedbackInfo,
    type ObjectiveFeedbacksCursorPagination as ObjectiveFeedbacksCursorPagination,
    type FeedbackCreateParams as FeedbackCreateParams,
    type FeedbackListParams as FeedbackListParams,
  };
}
