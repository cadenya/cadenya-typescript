/**
 * AIProviderConfig holds non-secret, provider-specific settings. The set case
 *  must correspond to AIProviderKeySpec.provider. Providers with no settings
 *  (Anthropic, Gemini) simply leave this unset. The endpoint of a named provider
 *  is fixed and intentionally not overridable here; use the OpenAI-compatible
 *  provider to target a custom endpoint.
 */
export type AIProviderConfig = AIProviderConfig_Openrouter | AIProviderConfig_Openai | AIProviderConfig_OpenaiCompatible;
/**
 * AIProviderCredential is the secret material used to authenticate with a
 *  provider. The set case must correspond to AIProviderKeySpec.provider. The
 *  server encrypts the serialized message at rest and never returns it on reads.
 */
export type AIProviderCredential = AIProviderCredential_ApiKey | AIProviderCredential_Headers;
/**
 * AIProviderKey is a credential for an AI provider, scoped to a workspace.
 *  Most keys are customer-provided (BYOK); Cadenya also provisions promotional
 *  keys (see AIProviderKeyInfo.is_promotional), which cannot be modified or
 *  deleted by account administrators. The secret value is never returned in
 *  responses.
 */
export interface AIProviderKey {
    metadata: ResourceMetadata;
    spec: AIProviderKeySpec;
    /**
     * Server-populated info (e.g. how many models route through this key).
     *  Populated on reads when requested; see ListAIProviderKeysRequest.include_info.
     */
    info?: AIProviderKeyInfo;
}
/**
 * AIProviderKeyInfo carries server-derived, read-only details about a key, for
 *  AI provider management UIs.
 */
export interface AIProviderKeyInfo {
    /**
     * Number of enabled models provisioned on this key.
     */
    enabledModelCount: number;
    /**
     * Number of disabled models provisioned on this key.
     */
    disabledModelCount: number;
    /**
     * Cadenya includes promotional keys (one for onboarding, and potentially more in the future).
     *  These are not added or maintained by account administrators.
     */
    isPromotional: boolean;
}
/**
 * The AI provider this key authenticates against.
 */
export type AiProviderKeySpecProvider = 'AI_PROVIDER_UNSPECIFIED' | 'AI_PROVIDER_OPENROUTER' | 'AI_PROVIDER_OPENAI' | 'AI_PROVIDER_ANTHROPIC' | 'AI_PROVIDER_GEMINI' | 'AI_PROVIDER_OPENAI_COMPATIBLE';
export interface AIProviderKeySpec {
    /**
     * The AI provider this key authenticates against.
     */
    provider?: AiProviderKeySpecProvider;
    /**
     * The provider credential. Accepted on create/update; never populated in
     *  responses (the server returns an empty value to avoid leaking the secret).
     */
    credentials?: AIProviderCredential;
    /**
     * Non-secret, provider-specific settings (OpenAI org/project, OpenRouter
     *  region, OpenAI-compatible base URL). The set case must correspond to
     *  `provider`. Returned on reads. Optional: omit to accept provider defaults.
     */
    config?: AIProviderConfig;
}
/**
 * The current lifecycle state of the API key. Output only. Keys are
 *  created STATE_ENABLED; use the :disable and :enable actions to
 *  transition between states.
 */
export type ApiKeyState = 'STATE_UNSPECIFIED' | 'STATE_ENABLED' | 'STATE_DISABLED';
/**
 * An API key. Every key belongs to exactly one workspace and is managed via
 *  the workspace-scoped API key routes. The only exception is the
 *  system-managed global account key, which spans all workspaces and is
 *  managed via the account global_api_key routes.
 */
export interface APIKey {
    metadata: AccountResourceMetadata;
    spec: APIKeySpec;
    info?: APIKeyInfo;
    /**
     * The current lifecycle state of the API key. Output only. Keys are
     *  created STATE_ENABLED; use the :disable and :enable actions to
     *  transition between states.
     */
    state: ApiKeyState;
}
export interface APIKeyInfo {
    /**
     * The profile that created the key.
     */
    createdBy?: Profile;
}
/**
 * Configuration for an API key.
 */
export interface APIKeySpec {
    /**
     * The bearer token used to authenticate as this API key. Returned only on
     *  creation and rotation; subsequent reads omit this field.
     */
    token: string;
    /**
     * Free-form description of what this API key is used for.
     */
    description?: string;
    /**
     * Scopes granted to this key. Each entry is a colon-separated
     *  resource:verb string (e.g. "objectives:manage").
     *
     *  Resources: agents, objectives, tools, memory, api_keys, workspaces,
     *  widgets, widget_sessions, secrets, account.
     *  Verbs: read and manage, where manage implies read — a stored scope set
     *  is normalized to drop "x:read" when "x:manage" is present. The secrets
     *  and account resources support only manage. "*" is an explicit
     *  full-access grant.
     *
     *  Scopes are deny-by-default: a key with an empty list can call only
     *  scope-free endpoints. Full access is always an explicit "*" grant.
     */
    permissions?: Array<string>;
    /**
     * True when this key is managed by the system (i.e. the auto-provisioned
     *  global account key). System keys cannot be deleted but can be rotated.
     */
    system: boolean;
}
/**
 * An account, the top-level organizational unit. Contains workspaces and
 *  account-wide settings such as the webhook signing secret.
 */
export interface Account {
    metadata: AccountResourceMetadata;
    spec: AccountSpec;
    info: AccountInfo;
}
/**
 * Server-populated information about the account.
 */
export interface AccountInfo {
    /**
     * The generated secret that will sign all webhooks that are sent to your configured Webhook URL.
     *  Formatted as "wh_asdf1234" per the https://www.standardwebhooks.com/ format.
     */
    webhookEventsHmacSecret: string;
    /**
     * The challenge token Cadenya sends in the X-Cadenya-Challenge-Token header
     *  on every MCP tools/list request. Server implementations can accept a valid
     *  challenge token in place of per-user auth when listing tools, while still
     *  requiring real auth on tools/call. Rotate with RotateChallengeToken; update
     *  any servers validating the token before rotating.
     */
    challengeToken: string;
}
/**
 * AccountResourceMetadata is used to represent a resource that is associated to an account but not to a workspace.
 */
export interface AccountResourceMetadata {
    /**
     * Unique identifier for the resource (prefixed ULID, e.g., "apikey_01HXK...")
     */
    id: string;
    /**
     * Account this resource belongs to for multi-tenant isolation (prefixed ULID)
     */
    accountId: string;
    /**
     * Human-readable name for the resource (e.g., "Customer Support Agent", "Email Tool")
     *  Required for resources that users interact with directly
     */
    name: string;
    /**
     * External ID for the resource (e.g., a workflow ID from an external system)
     */
    externalId: string;
    /**
     * Key-value pairs for categorization and filtering. Values are 0-63
     *  alphanumeric characters with "-", "_", or "." allowed between; keys
     *  follow the same shape and additionally accept an optional DNS-subdomain
     *  prefix (e.g. "cadenya.com/") of at most 253 characters.
     *  Examples: {"environment": "production", "team": "platform", "version": "v2"}
     */
    labels: Record<string, string>;
    profileId: string;
    createdAt?: string;
}
/**
 * Configuration for an account.
 */
export interface AccountSpec {
    description: string;
    domain: string;
    billingEmail: string;
    workspaces: Array<Workspace>;
}
/**
 * Attach a single tool, tool set, or sub-agent to a variation. Exactly one
 *  of the target fields must be set; the assignment kind is inferred from the
 *  populated field.
 */
export type AddAgentVariationAssignmentRequest = AddAgentVariationAssignmentRequest_ToolId | AddAgentVariationAssignmentRequest_ToolSetId | AddAgentVariationAssignmentRequest_SubAgentId;
/**
 * Attach a memory layer to a variation. The request is rejected when:
 *    - the layer is system-managed (FailedPrecondition)
 *    - the layer is already assigned to this variation (AlreadyExists)
 *    - the variation is already at the 10-assignment cap (FailedPrecondition)
 *    - the position is already in use on this variation (InvalidArgument)
 */
export interface AddAgentVariationMemoryLayerRequest {
    /**
     * Workspace ID.
     */
    workspaceId?: string;
    /**
     * Agent ID. Accepts the canonical `agent_…` form or the `external_id:<value>` form.
     */
    agentId?: string;
    /**
     * Variation ID. Accepts the canonical `agentvar_…` form or the `external_id:<value>` form.
     */
    variationId?: string;
    /**
     * Layer to attach. Accepts the canonical `memlyr_…` form or the `external_id:<value>` form.
     */
    memoryLayerId: string;
    /**
     * Position in the baseline cascade (lower = more specific). If
     *  omitted, the server appends at the most general end (max existing
     *  position + 1).
     */
    position?: number;
}
/**
 * AddWorkspaceMemberRequest grants a profile access to a workspace. Provide
 *  exactly one of profile_id (an existing account profile) or email. When email
 *  is given, the backend resolves it to an existing account profile or invites a
 *  new one before linking it to the workspace via an actor.
 */
export interface AddWorkspaceMemberRequest {
    /**
     * The workspace to add the member to (path).
     */
    workspaceId?: string;
    /**
     * An existing account profile to add. Mutually exclusive with email.
     */
    profileId?: string;
    /**
     * Email address to add (resolve-or-invite). Mutually exclusive with profile_id.
     */
    email?: string;
}
/**
 * The current lifecycle state of the agent. Output only. Agents are created
 *  in STATE_DRAFT; use the :publish, :unpublish, :archive, and :unarchive
 *  actions to transition between states.
 */
export type AgentState = 'STATE_UNSPECIFIED' | 'STATE_DRAFT' | 'STATE_PUBLISHED' | 'STATE_ARCHIVED';
/**
 * Agent resource
 */
export interface Agent {
    /**
     * Resource metadata
     */
    metadata: ResourceMetadata;
    /**
     * Agent specification
     */
    spec: AgentSpec;
    /**
     * Agent information
     */
    info: AgentInfo;
    /**
     * The current lifecycle state of the agent. Output only. Agents are created
     *  in STATE_DRAFT; use the :publish, :unpublish, :archive, and :unarchive
     *  actions to transition between states.
     */
    state: AgentState;
}
/**
 * AgentInfo contains simple information about an agent for display or quick reference
 */
export interface AgentInfo {
    variationCount: number;
    createdBy?: Profile;
}
/**
 * The current lifecycle state of the schedule. Output only. Schedules are
 *  created STATE_ACTIVE; use the :pause, :resume, and :archive actions to
 *  transition between states.
 */
export type AgentScheduleState = 'STATE_UNSPECIFIED' | 'STATE_ACTIVE' | 'STATE_PAUSED' | 'STATE_ARCHIVED';
/**
 * AgentSchedule resource — a recurring trigger attached to an agent that
 *  creates objectives on its cadence.
 */
export interface AgentSchedule {
    metadata: ResourceMetadata;
    spec: AgentScheduleSpec;
    info: AgentScheduleInfo;
    /**
     * The current lifecycle state of the schedule. Output only. Schedules are
     *  created STATE_ACTIVE; use the :pause, :resume, and :archive actions to
     *  transition between states.
     */
    state: AgentScheduleState;
}
/**
 * AgentScheduleInfo provides read-only runtime data about a schedule.
 */
export interface AgentScheduleInfo {
    /**
     * When the schedule will next fire. Computed from the spec; absent when
     *  the schedule is STATE_PAUSED/STATE_ARCHIVED or has no future fire times.
     */
    nextFireAt?: string;
    /**
     * When the schedule last fired (regardless of objective outcome).
     */
    lastFireAt?: string;
    /**
     * ID of the most recent objective the schedule created.
     */
    lastObjectiveId?: string;
    /**
     * When the schedule most recently skipped a fire (SKIP policy + prior in flight).
     */
    lastSkippedAt?: string;
    /**
     * Reason for the most recent skip (e.g. "previous objective still running").
     */
    lastSkipReason?: string;
    /**
     * Lifetime count of objectives created by this schedule.
     */
    totalFires: number;
    createdBy?: Profile;
}
/**
 * What to do when the previous run is still in flight. Defaults to SKIP.
 */
export type AgentScheduleSpecOverlapPolicy = 'OVERLAP_POLICY_UNSPECIFIED' | 'OVERLAP_POLICY_ALLOW' | 'OVERLAP_POLICY_SKIP';
/**
 * AgentScheduleSpec is the user-provided configuration for a schedule.
 */
export interface AgentScheduleSpec {
    /**
     * When to fire. Required.
     */
    schedule: AgentScheduleSpec_Schedule;
    /**
     * What to do when the previous run is still in flight. Defaults to SKIP.
     */
    overlapPolicy?: AgentScheduleSpecOverlapPolicy;
    /**
     * Optional explicit first user message passed to CreateObjective on each fire.
     *  Becomes the first user message in the objective's chat history. When unset, the
     *  fired objective defers to the selected variation's first_user_message_template.
     */
    firstUserMessage?: string;
    /**
     * Optional explicit variation. When unset, the agent's variation_selection_mode
     *  chooses per fire.
     */
    variationId?: string;
    /**
     * Optional data rendered into the variation's system_prompt_template when each
     *  fired objective is created. If the agent has a system_prompt_data_schema,
     *  this must satisfy it.
     */
    systemPromptData?: Record<string, unknown>;
    /**
     * Optional data rendered into the variation's first_user_message_template when
     *  each fired objective is created. Separate from `system_prompt_data`, which
     *  renders the system prompt template.
     */
    firstUserMessageData?: Record<string, unknown>;
}
/**
 * Schedule defines WHEN the schedule fires. Temporal-style structured form:
 *  a list of calendar rules (wall-clock) and/or interval rules (duration),
 *  OR'd together. At least one rule is required.
 */
export interface AgentScheduleSpec_Schedule {
    /**
     * Wall-clock rules. May be empty if `intervals` is non-empty.
     */
    calendars?: Array<Schedule_Calendar>;
    /**
     * Duration-based rules. May be empty if `calendars` is non-empty.
     */
    intervals?: Array<Schedule_Interval>;
    /**
     * IANA tz name (e.g. "America/New_York"). Required. Applies to calendars;
     *  intervals fire on wall-clock cadence anchored in this zone.
     */
    timezone?: string;
}
/**
 * Controls how variations are automatically selected when creating objectives
 *  Defaults to RANDOM when unspecified
 */
export type AgentSpecVariationSelectionMode = 'VARIATION_SELECTION_MODE_UNSPECIFIED' | 'VARIATION_SELECTION_MODE_RANDOM' | 'VARIATION_SELECTION_MODE_WEIGHTED';
/**
 * Agent specification (user-provided configuration)
 */
export interface AgentSpec {
    /**
     * Description of the agent's purpose
     */
    description?: string;
    /**
     * The URL that Cadenya will send events for any objective assigned to the agent.
     */
    webhookEventsUrl?: string;
    /**
     * Controls how variations are automatically selected when creating objectives
     *  Defaults to RANDOM when unspecified
     */
    variationSelectionMode: AgentSpecVariationSelectionMode;
    /**
     * SystemPromptDataSchema enforces the shape of system_prompt_data when objectives are created. This is valuable when using liquid formatting in agent
     *  variation system prompt templates. The schema is also used when the agent is attached as a sub-agent, as it becomes the tool's input parameter schema.
     *  If omitted, the sub-agent schema will be loaded with a simple "prompt" free text string as its schema.
     */
    systemPromptDataSchema?: Record<string, unknown>;
    /**
     * Optional output definition for objectives created for this agent.
     *  When provided, Cadenya will append a tool to that will be called by the LLM in use by the variant to extract information in the format provided here.
     *  Use this option when you want structured data to be created by your objectives.
     */
    outputDefinition?: Record<string, unknown>;
    /**
     * Enable episodic memory for objectives created for this agent.
     *  When true, objective creation requires an episodic_memory key and the
     *  system finds or creates a memory layer for that (agent, key) pair, letting
     *  the agent store and retrieve memories across objectives that share the key.
     *  Memory is agent-level so all variations of the agent share the same layers.
     */
    enableEpisodicMemory?: boolean;
    /**
     * How long episodic memories should be retained.
     *  Each new objective slides the layer's expiry forward by this duration, and
     *  stored entries expire this long after they are written.
     *  If not set, episodic memories are retained indefinitely.
     */
    episodicMemoryTtl?: number;
}
/**
 * AgentVariation resource
 */
export interface AgentVariation {
    /**
     * Resource metadata
     */
    metadata: ResourceMetadata;
    /**
     * Variation specification
     */
    spec: AgentVariationSpec;
    /**
     * Read-only summary information
     */
    info: AgentVariationInfo;
}
/**
 * AgentVariationInfo provides read-only summary information about a variation
 */
export interface AgentVariationInfo {
    /**
     * Number of individual tools assigned to this variation
     */
    toolCount: number;
    /**
     * Number of tool sets assigned to this variation
     */
    toolSetCount: number;
    /**
     * Number of sub-agents assigned to this variation
     */
    subAgentCount: number;
    createdBy?: Profile;
    /**
     * Metadata for the model assigned to this variation
     */
    model?: ResourceMetadata;
    /**
     * Thompson Sampling score: posterior mean of Beta(ts_alpha, ts_beta).
     *  Range [0, 1] where 0.5 = neutral, >0.5 = positive, <0.5 = negative.
     */
    score: number;
    /**
     * Total number of objective feedbacks received for this variation
     */
    feedbackCount: number;
    /**
     * All tools, tool sets, and sub-agents assigned to this variation.
     *  Populated on reads so clients can render a variation's full assignment
     *  list without calling the add/remove endpoints just to enumerate.
     */
    assignments: Array<VariationAssignment>;
    /**
     * Read-only list of memory layer assignments for this variation,
     *  returned in ascending `position` (most specific first — resolution
     *  order). Capped at 10 entries.
     */
    memoryLayerAssignments: Array<VariationMemoryLayerAssignment>;
    /**
     * Count of memory layer assignments.
     */
    memoryLayerCount: number;
}
/**
 * AgentVariationSpec defines the operational configuration for a variation
 */
export interface AgentVariationSpec {
    /**
     * Liquid template for the system prompt of objectives using this variation.
     *  Rendered with CreateObjectiveRequest.system_prompt_data into Objective.system_prompt.
     */
    systemPromptTemplate?: string;
    /**
     * ProgressiveDiscovery is an optional config that, when set, will load a Cadenya provided tool that
     *  can search for tools in the assigned tool sets or tools.
     *
     *  Note: Sub-agents are always loaded as a tool regardless of this value.
     */
    progressiveDiscovery?: AgentVariationSpec_ProgressiveDiscovery;
    /**
     * Execution constraints
     */
    constraints?: AgentVariationSpec_Constraints;
    /**
     * Human-readable description of what this variation does or when it should be used
     */
    description?: string;
    /**
     * Model configuration for this variation
     */
    modelConfig?: AgentVariationSpec_ModelConfig;
    /**
     * Compaction configuration for managing context window limits during long-running objectives.
     *  When not set, the system uses a default summarization strategy at 75% context window usage.
     */
    compactionConfig?: AgentVariationSpec_CompactionConfig;
    /**
     * Liquid template for the first user message of objectives using this variation.
     *  Rendered with CreateObjectiveRequest.first_user_message_data into
     *  Objective.first_user_message, the first user message in the LLM chat history.
     *  CreateObjectiveRequest.first_user_message, when set, overrides the rendered
     *  result. If neither this template nor first_user_message is present, objective
     *  creation is rejected with InvalidArgument.
     */
    firstUserMessageTemplate?: string;
}
/**
 * CompactionConfig defines how context window compaction behaves for objectives using this variation.
 */
export interface AgentVariationSpec_CompactionConfig {
    /**
     * Trigger threshold as a percentage of the model's context window (0.0 to 1.0).
     *  When input tokens reach this percentage of the model's limit, compaction triggers.
     *  Default: 0.75 (75%)
     */
    triggerThreshold?: number;
    /**
     * Strategies — set one or more. When multiple are set, they execute in order:
     *  tool_result_clearing → summarization.
     *  When none are set, defaults to summarization with the system default prompt.
     */
    summarization?: CompactionConfig_SummarizationStrategy;
    toolResultClearing?: CompactionConfig_ToolResultClearingStrategy;
}
export interface AgentVariationSpec_Constraints {
    /**
     * The maximum number of tool calls that can be made. 0 means no limit.
     */
    maxToolCalls?: number;
    /**
     * The maximum number of sub-objectives that can be created. 0 means no limit.
     */
    maxSubObjectives?: number;
    /**
     * How long an objective may sit with no activity (no user messages, no
     *  LLM calls) before it is finalized as timed out. Between 1 minute and
     *  24 hours, expressed as a duration string in seconds (e.g. "7200s").
     *  When not set, objectives are still swept at the system-wide 24 hour
     *  maximum — every objective eventually reaches a terminal state.
     *
     *  Note: no gnostic integer hint here on purpose. The Envoy gRPC-JSON
     *  transcoder only accepts the canonical protobuf JSON form for
     *  Durations — a "<seconds>s" string — so the SDKs must type this as a
     *  string (like AgentScheduleSpec.every), not an integer.
     */
    inactivityTimeout?: string;
}
/**
 * Reasoning effort. Requires the model's "reasoning" capability.
 */
export type AgentVariationSpecModelConfigReasoningEffort = 'REASONING_EFFORT_UNSPECIFIED' | 'REASONING_EFFORT_NONE' | 'REASONING_EFFORT_LOW' | 'REASONING_EFFORT_MEDIUM' | 'REASONING_EFFORT_HIGH';
/**
 * ModelConfig defines the model configuration for a variation.
 *
 *  Every knob besides model_id is honored only when the assigned model's
 *  spec.capabilities lists the matching capability.
 */
export interface AgentVariationSpec_ModelConfig {
    /**
     * The model identifier in family/model format (e.g., "claude/opus-4.6", "claude/sonnet-4.5")
     */
    modelId: string;
    /**
     * Sampling temperature for model inference (0.0 to 1.0)
     *  Lower values produce more deterministic outputs, higher values increase randomness.
     *  Presence-tracked so a deliberate 0.0 (fully deterministic) is
     *  distinguishable from unset.
     */
    temperature?: number;
    /**
     * Nucleus sampling: only tokens comprising the top_p probability mass
     *  are considered. Requires the model's "topP" capability.
     */
    topP?: number;
    /**
     * Only sample from the top_k most likely tokens.
     *  Requires the model's "topK" capability.
     */
    topK?: number;
    /**
     * Sequences that stop generation when produced. Empty means none.
     *  No count cap here — providers impose their own limits (surfaced as
     *  the "stopSequences" capability's `limit` on the model spec), and it
     *  is the caller's responsibility to stay within the selected model's
     *  limit. Requires the model's "stopSequences" capability.
     */
    stopSequences?: Array<string>;
    /**
     * Cap on output tokens per LLM call. Must not exceed the model's
     *  spec.max_output_tokens. Requires the model's "maxOutputTokens"
     *  capability.
     */
    maxOutputTokens?: number;
    /**
     * Reasoning effort. Requires the model's "reasoning" capability.
     */
    reasoningEffort?: AgentVariationSpecModelConfigReasoningEffort;
    /**
     * Prompt/token caching. Requires the model's "caching" capability.
     *  Presence-tracked tri-state: unset means the default — caching is ON
     *  whenever the model has the capability; false opts this variation
     *  out; true is an explicit opt-in (equivalent to unset).
     */
    cachingEnabled?: boolean;
}
/**
 * ProgressiveDiscovery is used to indicate that the agent should automatically discover tools that are not explicitly assigned to it.
 *  Max tools is the maximum number of tools that can be discovered per search.
 *  Hints are optional hints for tool search. These are used in conjunction with the context-aware tool search and can help select the best tools for the task.
 */
export interface AgentVariationSpec_ProgressiveDiscovery {
    /**
     * The most tool names tool_search will load in a single call. Requesting more
     *  than this returns an error telling the model to retry in smaller batches --
     *  it is a per-call batch limit, not a ceiling on how many tools an objective
     *  may end up with.
     */
    maxTools?: number;
    /**
     * Free-text guidance appended to the discoverable-tools appendix in the
     *  system prompt. Hints steer the model's choice of tool names; they do not
     *  filter or rank anything, because tool_search matches names exactly rather
     *  than searching.
     */
    hints?: Array<string>;
}
export interface ApproveToolCallRequest {
    workspaceId?: string;
    /**
     * The ID of the objective. Supports "external_id:" prefix for external IDs.
     */
    objectiveId?: string;
    /**
     * The ID of the tool call to approve
     */
    toolCallId?: string;
}
/**
 * Archive agent request
 */
export interface ArchiveAgentRequest {
    /**
     * Workspace ID.
     */
    workspaceId?: string;
    /**
     * Agent ID. Accepts the canonical `agent_…` form or the `external_id:<value>` form.
     */
    id?: string;
}
/**
 * Archive agent schedule request.
 */
export interface ArchiveAgentScheduleRequest {
    /**
     * Workspace ID.
     */
    workspaceId?: string;
    /**
     * Agent ID. Accepts the canonical `agent_…` form or the `external_id:<value>` form.
     */
    agentId?: string;
    /**
     * Schedule ID. Accepts the canonical `as_…` form or the `external_id:<value>` form.
     */
    id?: string;
}
/**
 * Archive tool set request
 */
export interface ArchiveToolSetRequest {
    /**
     * Workspace ID.
     */
    workspaceId?: string;
    /**
     * Tool set ID. Accepts the canonical ts_… form or the
     *  external_id:<value> form.
     */
    id?: string;
}
/**
 * Archive widget request.
 */
export interface ArchiveWidgetRequest {
    /**
     * Workspace ID.
     */
    workspaceId?: string;
    /**
     * Widget ID. Accepts the canonical `wgt_…` form or the `external_id:<value>` form.
     */
    id?: string;
}
export interface AssistantMessage {
    content?: string;
    toolCalls: Array<AssistantToolCall>;
}
export interface AssistantToolCall {
    tool?: CallableTool;
    arguments: string;
    functionName: string;
}
/**
 * BareMetadata contains the minimal metadata for a resource: the ID and an
 *  optional human-readable name. These are used for reference fields where the
 *  full metadata (account scoping, timestamps, labels, external IDs) is not
 *  needed — e.g., the tool references inside an agent variation spec or the
 *  tools assigned to an objective. Both fields are server-populated; clients
 *  provide IDs through sibling fields rather than by constructing a
 *  BareMetadata themselves.
 */
export interface BareMetadata {
    id: string;
    /**
     * Human-readable name of the referenced resource, populated by the server
     *  on reads for convenience. Absent on references to resources that do not
     *  have a name (e.g., objective tasks).
     */
    name?: string;
}
/**
 * CallableTool is a union that represents a tool that can be called by an agent. In Cadenya, a tool that is used within an agent objective
 *  might be a user-defined tool (IE: MCP, HTTP), another Agent (useful to separate context), or a Cadenya Tool (one Cadenya provides).
 */
export type CallableTool = CallableTool_Tool | CallableTool_Agent | CallableTool_CadenyaProvidedTool;
export interface CancelObjectiveRequest {
    workspaceId?: string;
    /**
     * The ID of the objective. Supports "external_id:" prefix for external IDs.
     */
    objectiveId?: string;
    /**
     * Optional reason for cancellation
     */
    reason?: string;
}
/**
 * Prompt/token caching (ModelConfig.caching_enabled). A model that
 *  cannot cache prompt prefixes simply omits this capability. When the
 *  capability is present, caching defaults to ON — a variation opts out
 *  by setting caching_enabled to false.
 */
export interface Capability_Caching {
}
/**
 * Per-request output token cap (ModelConfig.max_output_tokens).
 *  The effective ceiling is ModelSpec.max_output_tokens.
 */
export interface Capability_MaxOutputTokens {
}
/**
 * How reasoning is enabled for this model. Catalog data used to decide
 *  whether thinking is requested for objective iterations on this model.
 */
export type CapabilityReasoningMode = 'MODE_UNSPECIFIED' | 'MODE_ADAPTIVE' | 'MODE_BUDGET';
/**
 * Reasoning / extended thinking (ModelConfig.reasoning_effort). A model
 *  that does not reason simply omits this capability.
 */
export interface Capability_Reasoning {
    /**
     * How reasoning is enabled for this model. Catalog data used to decide
     *  whether thinking is requested for objective iterations on this model.
     */
    mode: CapabilityReasoningMode;
}
/**
 * Custom stop sequences (ModelConfig.stop_sequences).
 */
export interface Capability_StopSequences {
    /**
     * Maximum number of stop sequences the model accepts per request.
     *  0 means the provider imposes no meaningful limit.
     */
    limit: number;
}
/**
 * Sampling temperature (ModelConfig.temperature).
 */
export interface Capability_Temperature {
}
/**
 * Top-k sampling (ModelConfig.top_k).
 */
export interface Capability_TopK {
}
/**
 * Nucleus sampling (ModelConfig.top_p).
 */
export interface Capability_TopP {
}
/**
 * Compact objective request — triggers compaction on a running objective.
 */
export interface CompactObjectiveRequest {
    workspaceId?: string;
    /**
     * The ID of the objective. Supports "external_id:" prefix for external IDs.
     */
    objectiveId?: string;
    /**
     * Optional compaction config override. When not set, uses the variation's compaction_config.
     */
    compactionConfig?: AgentVariationSpec_CompactionConfig;
}
/**
 * Compact objective response
 */
export interface CompactObjectiveResponse {
    /**
     * The new context window created by the compaction
     */
    contextWindow?: ObjectiveContextWindowData;
}
/**
 * SummarizationStrategy configures LLM-powered summarization of older conversation turns.
 */
export interface CompactionConfig_SummarizationStrategy {
    /**
     * Custom instructions that guide what the summarizer preserves.
     *  Replaces the default summarization prompt entirely.
     *  Example: "Preserve all code snippets, variable names, and technical decisions."
     */
    instructions?: string;
}
/**
 * ToolResultClearingStrategy configures clearing of older tool result content.
 */
export interface CompactionConfig_ToolResultClearingStrategy {
    /**
     * Number of most recent tool call results to keep intact.
     *  Older tool results have their content replaced with "[result cleared]"
     *  while preserving the assistant tool call message (function name, arguments).
     *  Default: 2
     */
    preserveRecentResults?: number;
}
/**
 * Marks the tool as bare: it has no execution adapter of its own and
 *  relies on the parent tool set being a Bare tool set. Present so a
 *  webhook consumer can tell a tool is bare from the tool data alone,
 *  without cross-referencing the tool set.
 */
export interface Config_Bare {
    /**
     * When set, the tool call's result is recorded immediately as this
     *  fixed text instead of parking the call to wait for externally
     *  supplied content. The tool_called event is still emitted. Useful for
     *  tools whose dispatch is the intent (e.g. a frontend renders a
     *  component from the call parameters) but whose LLM turn still needs
     *  tool-result content.
     */
    alwaysSetResult?: string;
}
export type ConfigHttpRequestMethod = 'HTTP_METHOD_UNSPECIFIED' | 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
export interface Config_HTTP {
    requestMethod: ConfigHttpRequestMethod;
    path?: string;
    query?: string;
    headers?: Record<string, string>;
    /**
     * These are only used when the request method is a POST, PUT, or PATCH
     */
    requestBodyTemplate?: string;
    requestBodyContentType?: string;
}
export interface Config_MCP {
    /**
     * Tool behavior annotations from the MCP server, captured during sync.
     */
    annotations?: MCP_Annotations;
}
export interface Config_OpenAPI {
    path?: string;
    method?: string;
}
/**
 * ContextLengths is the measured character length of each distinct component
 *  of an iteration's assembled context window. Values are raw character
 *  lengths of the component as assembled into the request — token estimates
 *  are derived by the client against input_tokens (component share =
 *  component length / sum of all lengths).
 *
 *  New components are added as new fields — wire-compatible; absent
 *  components read as 0.
 */
export interface ContextLengths {
    /**
     * Character length of the objective's base system prompt (rendered variation
     *  template). Not tokens -- see the message comment.
     */
    systemPrompt: number;
    /**
     * Character length of the skills memory appendix attached to the system prompt.
     */
    skillsMemory: number;
    /**
     * Character length of the episodic memory appendix attached to the system prompt.
     */
    episodicMemory: number;
    /**
     * Character length of the discoverable/available-tools appendix attached to the
     *  system prompt.
     */
    availableTools: number;
    /**
     * Character length of the serialized tool definitions sent with the completion
     *  request (names, descriptions, and JSON-schema parameters).
     */
    toolDefinitions: number;
    /**
     * Character length of the chat history messages with the user role.
     */
    userMessages: number;
    /**
     * Character length of the chat history messages with the assistant role.
     */
    assistantMessages: number;
    /**
     * Character length of the tool results present in the chat history.
     */
    toolResults: number;
}
export interface ContextWindowCompacted {
    /**
     * The new context window created by this compaction
     */
    newContextWindow: ObjectiveContextWindowData;
    /**
     * The strategies that were applied during this compaction
     */
    strategies: Array<string>;
    /**
     * Number of messages that were compacted
     */
    messagesCompacted: number;
    /**
     * The summary generated by the summarization strategy, if used.
     */
    summary?: string;
}
export interface ContinueObjectiveRequest {
    workspaceId?: string;
    /**
     * The ID of the objective. If you have assigned an external ID to the objective, you can prefix the ID with "external_id:". For example, "external_id:1234567890". Otherwise, the ID assigned by Cadenya should be used.
     */
    objectiveId?: string;
    /**
     * The message to continue an objective that has completed (or you are enqueing)
     */
    message: string;
    /**
     * When set to true, the message will be enqueued for when the agent loop is available to process it.
     */
    enqueue?: boolean;
}
export interface CreateAIProviderKeyRequest {
    /**
     * The workspace that will own this key.
     */
    workspaceId?: string;
    metadata: CreateResourceMetadata;
    spec: AIProviderKeySpec;
}
export interface CreateAPIKeyRequest {
    metadata: CreateAccountResourceMetadata;
    spec: APIKeySpec;
    /**
     * The workspace this API key belongs to (path).
     */
    workspaceId?: string;
}
/**
 * CreateAccountResourceMetadata contains the user-provided fields for creating
 *  an account-scoped resource. Read-only fields (id, account_id, profile_id) are excluded
 *  since they are set by the server.
 */
export interface CreateAccountResourceMetadata {
    /**
     * Human-readable name for the resource (e.g., "Production API Key", "Staging Workspace")
     */
    name: string;
    /**
     * External ID for the resource (e.g., a workflow ID from an external system)
     */
    externalId?: string;
    /**
     * Key-value pairs for categorization and filtering. Values are 0-63
     *  alphanumeric characters with "-", "_", or "." allowed between; keys
     *  follow the same shape and additionally accept an optional DNS-subdomain
     *  prefix (e.g. "cadenya.com/") of at most 253 characters.
     *  Examples: {"environment": "production", "team": "platform", "version": "v2"}
     */
    labels?: Record<string, string>;
}
/**
 * Create agent request
 */
export interface CreateAgentRequest {
    /**
     * Workspace ID.
     */
    workspaceId?: string;
    metadata: CreateResourceMetadata;
    spec: AgentSpec;
    /**
     * Optional default variation to add to the agent on create
     */
    defaultVariation?: CreateAgentVariationRequest;
}
/**
 * Create agent schedule request.
 */
export interface CreateAgentScheduleRequest {
    /**
     * Workspace ID.
     */
    workspaceId?: string;
    /**
     * Agent ID. Accepts the canonical `agent_…` form or the `external_id:<value>` form.
     */
    agentId?: string;
    metadata: CreateResourceMetadata;
    spec: AgentScheduleSpec;
}
/**
 * Create agent variation request
 */
export interface CreateAgentVariationRequest {
    /**
     * Workspace ID.
     */
    workspaceId?: string;
    /**
     * Agent ID. Accepts the canonical `agent_…` form or the `external_id:<value>` form.
     */
    agentId?: string;
    metadata: CreateResourceMetadata;
    spec: AgentVariationSpec;
}
export interface CreateMemoryEntryRequest {
    workspaceId?: string;
    /**
     * Memory layer ID. Accepts canonical memlyr_… form or external_id:<value> form.
     */
    memoryLayerId?: string;
    metadata: CreateResourceMetadata;
    spec: MemoryEntryCreateSpec;
}
export interface CreateMemoryLayerRequest {
    workspaceId?: string;
    metadata: CreateResourceMetadata;
    spec: MemoryLayerSpec;
}
/**
 * Request to submit feedback for an objective
 */
export interface CreateObjectiveFeedbackRequest {
    workspaceId?: string;
    /**
     * The ID of the objective. Supports "external_id:" prefix for external IDs.
     */
    objectiveId?: string;
    metadata: CreateOperationMetadata;
    data: ObjectiveFeedbackData;
}
export interface CreateObjectiveRequest {
    workspaceId: string;
    agentId: string;
    /**
     * Optional explicit variation selection. Overrides the agent's variation_selection_mode.
     */
    variationId?: string;
    metadata?: CreateOperationMetadata;
    /**
     * Arbitrary data rendered into the selected variation's system_prompt_template
     *  (liquid) to produce the objective's system prompt. If the agent has a
     *  system_prompt_data_schema, this must satisfy it.
     */
    systemPromptData: Record<string, unknown>;
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
    episodicMemory?: ObjectiveEpisodicConfig;
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
export interface CreateObjectiveRequest_Secret {
    name?: string;
    value?: string;
}
/**
 * CreateOperationMetadata contains the user-provided fields for creating
 *  an operation. Read-only fields (id, account_id, workspace_id, created_at, profile_id)
 *  are excluded since they are set by the server.
 */
export interface CreateOperationMetadata {
    /**
     * Key-value pairs for categorization and filtering. Values are 0-63
     *  alphanumeric characters with "-", "_", or "." allowed between; keys
     *  follow the same shape and additionally accept an optional DNS-subdomain
     *  prefix (e.g. "cadenya.com/") of at most 253 characters.
     *  Examples: {"priority": "high", "source": "api", "workflow": "onboarding"}
     */
    labels?: Record<string, string>;
    /**
     * External ID for the operation (e.g., a workflow ID from an external system)
     */
    externalId?: string;
}
/**
 * CreateResourceMetadata contains the user-provided fields for creating
 *  a workspace-scoped resource. Read-only fields (id, account_id, workspace_id, profile_id,
 *  created_at) are excluded since they are set by the server.
 */
export interface CreateResourceMetadata {
    /**
     * Human-readable name for the resource (e.g., "Customer Support Agent", "Email Tool")
     */
    name: string;
    /**
     * External ID for the resource (e.g., a workflow ID from an external system)
     */
    externalId?: string;
    /**
     * Key-value pairs for categorization and filtering. Values are 0-63
     *  alphanumeric characters with "-", "_", or "." allowed between; keys
     *  follow the same shape and additionally accept an optional DNS-subdomain
     *  prefix (e.g. "cadenya.com/") of at most 253 characters.
     *  Examples: {"environment": "production", "team": "platform", "version": "v2"}
     */
    labels?: Record<string, string>;
}
export interface CreateToolRequest {
    /**
     * Workspace ID.
     */
    workspaceId?: string;
    /**
     * Tool set ID. Accepts the canonical ts_… form or the
     *  external_id:<value> form.
     */
    toolSetId?: string;
    metadata: CreateResourceMetadata;
    spec: ToolSpec;
}
export interface CreateToolSetRequest {
    /**
     * Workspace ID.
     */
    workspaceId?: string;
    metadata: CreateResourceMetadata;
    spec: ToolSetSpec;
}
export interface CreateToolSetSecretRequest {
    /**
     * The workspace that owns the tool set.
     */
    workspaceId?: string;
    /**
     * The tool set that will own this secret. Accepts the canonical ts_… form
     *  or the external_id:<value> form.
     */
    toolSetId?: string;
    metadata: CreateResourceMetadata;
    spec: ToolSetSecretSpec;
}
export interface CreateUploadRequest {
    /**
     * Workspace ID.
     */
    workspaceId?: string;
    metadata: CreateResourceMetadata;
    spec: UploadSpec;
}
/**
 * Create widget request.
 */
export interface CreateWidgetRequest {
    /**
     * Workspace ID.
     */
    workspaceId?: string;
    metadata: CreateResourceMetadata;
    spec: WidgetSpec;
}
/**
 * Create widget session request.
 */
export interface CreateWidgetSessionRequest {
    /**
     * Workspace ID.
     */
    workspaceId: string;
    metadata?: CreateOperationMetadata;
    spec: WidgetSessionSpec;
    /**
     * Secrets to attach to the session.
     */
    secrets?: Array<CreateWidgetSessionRequest_Secret>;
}
/**
 * Secret is a named credential attached to the session — typically a token
 *  the customer's backend minted for the visitor, so the agent acts against
 *  their API as that subject. Values are captured at the boundary, encrypted
 *  at rest, appended to every conversation the session creates (re-synced on
 *  each turn), and never returned by any API. Session secrets take
 *  precedence over workspace and tool-set secrets of the same name.
 */
export interface CreateWidgetSessionRequest_Secret {
    name?: string;
    value?: string;
}
export interface CreateWorkspaceRequest {
    metadata: CreateAccountResourceMetadata;
    spec: WorkspaceSpec;
}
export interface CreateWorkspaceSecretRequest {
    /**
     * The workspace that will own this secret.
     */
    workspaceId?: string;
    metadata: CreateResourceMetadata;
    spec: WorkspaceSecretSpec;
}
/**
 * CredentialAPIKey carries a single bearer/header API key.
 */
export interface CredentialAPIKey {
    apiKey?: string;
}
/**
 * CredentialHeaders carries arbitrary HTTP headers sent with every request to
 *  the provider (e.g. {"Authorization": "Bearer ...", "X-Api-Key": "..."}).
 */
export interface CredentialHeaders {
    headers?: Record<string, string>;
}
/**
 * Delete tenant widget sessions response.
 */
export interface DeleteTenantWidgetSessionsResponse {
    /**
     * Number of sessions deleted.
     */
    sessionsDeleted: number;
    /**
     * Number of conversations (objectives) deleted along with the sessions.
     */
    objectivesDeleted: number;
}
export interface DenyToolCallRequest {
    workspaceId?: string;
    /**
     * The ID of the objective. Supports "external_id:" prefix for external IDs.
     */
    objectiveId?: string;
    /**
     * The ID of the tool call to deny
     */
    toolCallId?: string;
    /**
     * A memo to associate to the tool call denial. Use a memo to steer the LLM to a different decision or usage of the tool.
     */
    memo?: string;
}
export interface DisableAPIKeyRequest {
    /**
     * The workspace the API key belongs to (path).
     */
    workspaceId?: string;
    /**
     * The API key to disable.
     */
    id?: string;
}
/**
 * Disable model request
 */
export interface DisableModelRequest {
    /**
     * Workspace ID.
     */
    workspaceId?: string;
    /**
     * Model ID
     */
    id?: string;
}
export interface EnableAPIKeyRequest {
    /**
     * The workspace the API key belongs to (path).
     */
    workspaceId?: string;
    /**
     * The API key to enable.
     */
    id?: string;
}
/**
 * Enable model request
 */
export interface EnableModelRequest {
    /**
     * Workspace ID.
     */
    workspaceId?: string;
    /**
     * Model ID
     */
    id?: string;
}
export interface GetObjectiveDiagnosticsResponse {
    /**
     * Diagnostics from the objective's most recent iteration.
     */
    diagnostics: ObjectiveDiagnostics;
}
export interface GetToolSetOpenAPISpecResponse {
    /**
     * The consumed OpenAPI specification as a JSON string.
     */
    spec: string;
}
/**
 * Contains an arbitrary serialized message along with a @type that describes the type of the serialized message.
 */
export interface GoogleProtobufAny {
    /**
     * The type of the serialized message.
     */
    '@type'?: string;
}
export interface ListAIProviderKeysResponse {
    items: Array<AIProviderKey>;
    pagination?: Page;
}
export interface ListAPIKeysResponse {
    items: Array<APIKey>;
    pagination?: Page;
}
export interface ListAccountWorkspacesResponse {
    items: Array<Workspace>;
    pagination?: Page;
}
/**
 * Response for listing feedback across an agent.
 */
export interface ListAgentFeedbackResponse {
    items: Array<ObjectiveFeedback>;
    pagination?: Page;
}
/**
 * List agent schedules response.
 */
export interface ListAgentSchedulesResponse {
    items: Array<AgentSchedule>;
    pagination?: Page;
}
/**
 * List agent variations response
 */
export interface ListAgentVariationsResponse {
    items: Array<AgentVariation>;
    pagination?: Page;
}
export interface ListAgentWebhookDeliveriesResponse {
    items: Array<WebhookDelivery>;
    pagination?: Page;
}
/**
 * List agents response
 */
export interface ListAgentsResponse {
    items: Array<Agent>;
    pagination?: Page;
}
export interface ListMemoryEntriesResponse {
    items: Array<MemoryEntry>;
    pagination?: Page;
}
export interface ListMemoryLayersResponse {
    items: Array<MemoryLayer>;
    pagination?: Page;
}
/**
 * List models response
 */
export interface ListModelsResponse {
    items: Array<Model>;
    pagination?: Page;
}
/**
 * ListObjectiveContextWindowsResponse is the response to a ListObjectiveContextWindowsRequest
 */
export interface ListObjectiveContextWindowsResponse {
    items: Array<ObjectiveContextWindow>;
    pagination?: Page;
}
export interface ListObjectiveEventsResponse {
    items: Array<ObjectiveEvent>;
    pagination?: Page;
}
/**
 * Response for listing feedback
 */
export interface ListObjectiveFeedbackResponse {
    items: Array<ObjectiveFeedback>;
    pagination?: Page;
}
export interface ListObjectiveTasksResponse {
    items: Array<ObjectiveTask>;
    pagination?: Page;
}
export interface ListObjectiveToolCallsResponse {
    items: Array<ObjectiveToolCall>;
    pagination?: Page;
}
export interface ListObjectiveToolsResponse {
    items: Array<ObjectiveTool>;
    pagination?: Page;
}
export interface ListObjectivesResponse {
    items: Array<Objective>;
    pagination?: Page;
}
export interface ListProfilesResponse {
    items: Array<Profile>;
    pagination?: Page;
}
/**
 * List tenant subjects response.
 */
export interface ListTenantSubjectsResponse {
    items: Array<Subject>;
    pagination?: Page;
}
/**
 * List tenants response.
 */
export interface ListTenantsResponse {
    items: Array<Tenant>;
    pagination?: Page;
}
export interface ListToolSetEventsResponse {
    items: Array<ToolSetEvent>;
    pagination?: Page;
}
export interface ListToolSetSecretsResponse {
    items: Array<ToolSetSecret>;
    pagination?: Page;
}
export interface ListToolSetUsageResponse {
    items: Array<ToolSetUsage>;
    pagination?: Page;
}
export interface ListToolSetsResponse {
    items: Array<ToolSet>;
    pagination?: Page;
}
export interface ListToolsResponse {
    items: Array<Tool>;
    pagination?: Page;
}
/**
 * List widget sessions response.
 */
export interface ListWidgetSessionsResponse {
    items: Array<WidgetSession>;
    pagination?: Page;
}
/**
 * List widgets response.
 */
export interface ListWidgetsResponse {
    items: Array<Widget>;
    pagination?: Page;
}
export interface ListWorkspaceMembersResponse {
    items: Array<WorkspaceMember>;
    pagination?: Page;
}
export interface ListWorkspaceSecretsResponse {
    items: Array<WorkspaceSecret>;
    pagination?: Page;
}
export interface ListWorkspacesResponse {
    items: Array<Workspace>;
    pagination?: Page;
}
/**
 * Behavior hints synced from the MCP server's tool definition
 *  (ToolAnnotations in the MCP specification). All hints are advisory:
 *  servers are not required to send them, and clients should not rely
 *  on them for security decisions. Absent hints keep the MCP spec
 *  defaults (destructiveHint and openWorldHint default to true;
 *  readOnlyHint and idempotentHint default to false).
 */
export interface MCP_Annotations {
    /**
     * A human-readable title for the tool.
     */
    title?: string;
    /**
     * If true, the tool does not modify its environment.
     */
    readOnlyHint?: boolean;
    /**
     * If true, the tool may perform destructive updates to its environment.
     *  Only meaningful when read_only_hint is false.
     */
    destructiveHint?: boolean;
    /**
     * If true, calling the tool repeatedly with the same arguments has no
     *  additional effect. Only meaningful when read_only_hint is false.
     */
    idempotentHint?: boolean;
    /**
     * If true, the tool may interact with an "open world" of external
     *  entities (e.g. web search); if false, its domain is closed.
     */
    openWorldHint?: boolean;
}
/**
 * MemoryEntry is a single keyed value within a MemoryLayer. Entries are
 *  addressed by their key, which follows the S3 object key safe-character
 *  convention (see MemoryEntrySpec.key for the full rule). Keys are unique
 *  within a single layer; the same key may appear in multiple layers, in which
 *  case the cascade walk determines which one wins for a given objective (most
 *  specific layer first).
 *
 *  MemoryEntry is the summary shape, returned by ListMemoryEntries. It does
 *  not carry the entry body — callers that need the body must fetch the entry
 *  individually via GetMemoryEntry, which returns a MemoryEntryDetail.
 */
export interface MemoryEntry {
    metadata: ResourceMetadata;
    spec: MemoryEntrySpec;
    info: MemoryEntryInfo;
}
/**
 * MemoryEntryCreateSpec is the input shape for CreateMemoryEntry. It accepts
 *  either inline content or a reference to a completed Upload; exactly one of
 *  the two must be set.
 */
export type MemoryEntryCreateSpec = MemoryEntryCreateSpec_Content | MemoryEntryCreateSpec_UploadId;
/**
 * MemoryEntryDetail is the full representation of an entry, including the
 *  resolved content body. Returned by GetMemoryEntry, CreateMemoryEntry, and
 *  UpdateMemoryEntry.
 */
export interface MemoryEntryDetail {
    metadata: ResourceMetadata;
    spec: MemoryEntrySpec;
    info: MemoryEntryInfo;
    /**
     * The resolved body of the entry. For entries created or updated via an
     *  upload_id, this is the ingested content, not the original upload handle.
     *  May be empty; an entry with only a key and description is valid
     *  (e.g., a stub skill being drafted, or an entry where the frontmatter
     *  alone is the payload).
     */
    content: string;
}
export interface MemoryEntryInfo {
    /**
     * The layer this entry belongs to.
     */
    memoryLayer?: ResourceMetadata;
    createdBy?: Profile;
}
/**
 * MemoryEntrySpec is the metadata portion of an entry — the fields that
 *  identify and describe it, without the body. It appears on both the summary
 *  (MemoryEntry) and detail (MemoryEntryDetail) views.
 */
export interface MemoryEntrySpec {
    /**
     * The lookup key for this entry within its layer. Must conform to the S3
     *  object key safe-characters spec: ASCII alphanumerics and the special
     *  characters !, -, _, ., *, ', (, ), and /. Forward slashes may be used to
     *  suggest hierarchy (e.g., "skills/postmortem/write"), but lookups are flat
     *  — the key is a single opaque string, not a path.
     *
     *  Additional rules enforced by the service:
     *    - May not begin or end with /
     *    - May not contain consecutive slashes (//)
     *    - May not begin with reserved prefixes (cadenya/, system/)
     *    - Case-sensitive
     *    - Unique within the parent layer
     *
     *  For skills entries, this key is what the model passes to get_memory to
     *  load the entry's content.
     */
    key: string;
    /**
     * One-line "when to use this" hint shown in the frontmatter manifest for
     *  skills entries. The model uses this to decide whether to load the body,
     *  so it should be written for the model as the audience. Ignored for layer
     *  types that do not advertise frontmatter.
     */
    description: string;
}
/**
 * MemoryEntryUpdateSpec is the input shape for UpdateMemoryEntry. Fields
 *  present in the request's update_mask are applied; unset fields are left
 *  alone. The source oneof is optional for updates — omit it to leave the
 *  body untouched, or set exactly one branch to replace it.
 */
export interface MemoryEntryUpdateSpec {
    key?: string;
    description?: string;
    content?: string;
    uploadId?: string;
}
/**
 * MemoryLayer is a named container of memory entries that can be composed into
 *  an objective's memory cascade. Layers are workspace-scoped resources. The layer
 *  type controls how its entries participate in the agent loop — see
 *  MemoryLayerType for details.
 *
 *  See "Memory cascade composition" above for how layers compose at lookup time.
 */
export interface MemoryLayer {
    metadata: ResourceMetadata;
    spec: MemoryLayerSpec;
    info: MemoryLayerInfo;
}
export interface MemoryLayerInfo {
    /**
     * Number of entries currently in this layer.
     */
    entryCount: number;
    createdBy?: Profile;
    /**
     * Timestamp of the most recent objective that resolved against this layer.
     *  Useful for surfacing unused layers in the dashboard.
     */
    lastUsedAt?: string;
    /**
     * For episodic layers, the metadata of the agent the layer belongs to
     *  (resolved from MemoryLayerSpec.agent_id). Unset for non-episodic layers.
     */
    agent?: ResourceMetadata;
}
export type MemoryLayerSpecType = 'MEMORY_LAYER_TYPE_UNSPECIFIED' | 'MEMORY_LAYER_TYPE_EPISODIC' | 'MEMORY_LAYER_TYPE_SKILLS';
export interface MemoryLayerSpec {
    type: MemoryLayerSpecType;
    /**
     * Human-readable description of the layer's purpose. Encouraged for
     *  user-created layers; system-managed layers may have a generated description.
     */
    description?: string;
    /**
     * Server-set. True for layers managed by the system (e.g., episodic layers
     *  created automatically when an objective uses an episodic_key). System-managed
     *  layers cannot be assigned to objective cascades via the API and cannot be
     *  mutated by clients — their lifecycle is controlled entirely by the runtime.
     */
    systemManaged: boolean;
    /**
     * For layers with a finite lifetime (e.g., episodic), the time at which the
     *  layer becomes eligible for cleanup. Set by the system; unset for
     *  persistent layers.
     */
    expiresAt?: string;
    /**
     * Server-set on episodic layers: the agent this layer belongs to. Unset for
     *  non-episodic layers.
     */
    agentId: string;
    /**
     * Server-set on episodic layers: the caller-supplied episodic key the layer
     *  was created for. Unset for non-episodic layers.
     */
    episodicKey: string;
}
/**
 * MemoryRead is emitted each time the agent resolves a key against the
 *  memory cascade and loads an entry. Lookups that miss (key not found in
 *  any layer) do not emit this event.
 */
export interface MemoryRead {
    /**
     * Human-readable description of the read, set by the runtime. For
     *  example: "Loaded skill", "Resolved context key". Not machine-parsed;
     *  intended for UI display alongside the other events in an objective's
     *  timeline.
     */
    message: string;
    /**
     * The layer the entry resolved to. The top-most layer that contained
     *  the key — other layers beneath it that also contained the key are
     *  shadowed and not referenced here.
     */
    memoryLayerId: string;
    /**
     * The specific entry that was read.
     */
    memoryEntryId: string;
}
/**
 * MemoryReference identifies a memory layer or a specific entry within
 *  one, for composition into a memory cascade. Used on objectives (where
 *  entry pinning is permitted).
 *
 *  memory_layer_id accepts both the canonical form (memlyr_…) and the
 *  external-id form (external_id:my-custom-id). The same applies to
 *  memory_entry_id when set.
 */
export interface MemoryReference {
    memoryLayerId: string;
    /**
     * When set, inserts only this entry from memory_layer_id into the cascade —
     *  behaves as a single-entry layer (only this key resolves at this
     *  position). The entry must belong to memory_layer_id; mismatches are
     *  rejected with InvalidArgument.
     */
    memoryEntryId?: string;
}
/**
 * Whether the model is usable in this workspace. Output only. Use the
 *  :enable and :disable actions to transition.
 */
export type ModelState = 'STATE_UNSPECIFIED' | 'STATE_ENABLED' | 'STATE_DISABLED';
export interface Model {
    /**
     * Resource metadata
     */
    metadata: ResourceMetadata;
    /**
     * Model specification
     */
    spec: ModelSpec;
    /**
     * Server-populated info (e.g. the AI provider this model routes through).
     *  Populated on reads when requested; see ListModelsRequest.include_info.
     */
    info?: ModelInfo;
    /**
     * Whether the model is usable in this workspace. Output only. Use the
     *  :enable and :disable actions to transition.
     */
    state: ModelState;
}
/**
 * ModelInfo carries server-derived, read-only details about a model.
 */
export interface ModelInfo {
    /**
     * The AI provider key powering this model, embedded so clients can read the
     *  provider, key name, and promotional status (info.is_promotional) without a
     *  second lookup. The key's model counts are not populated here; use the AI
     *  provider key endpoints for those.
     */
    aiProviderKey?: AIProviderKey;
    /**
     * Number of agent variations currently provisioned on this model. Useful for
     *  previewing how many variations a swap would affect.
     */
    agentVariationCount: number;
    /**
     * Represents the last time this model was used in an agent objective
     */
    lastUsedAt?: string;
}
export interface ModelSpec {
    /**
     * The model provider (e.g., "anthropic", "openai", "google")
     */
    provider: string;
    /**
     * The model family (e.g., "claude-sonnet-4.6", "gpt-5.4", "gemini-2.5-flash")
     */
    family: string;
    /**
     * Maximum number of input tokens the model supports
     */
    maxInputTokens: number;
    /**
     * Maximum number of output tokens the model can generate
     */
    maxOutputTokens: number;
    /**
     * Cost per million input tokens in cents (e.g., 300 = $3.00)
     */
    inputPricePerMillionTokens: string;
    /**
     * Cost per million output tokens in cents (e.g., 1500 = $15.00)
     */
    outputPricePerMillionTokens: string;
    /**
     * The inference knobs this model supports. Catalog data; drives which
     *  ModelConfig fields a variation on this model may set. Reasoning support
     *  (and its mode) lives here too, as the "reasoning" capability.
     */
    capabilities: Array<ModelSpec_Capability>;
}
/**
 * Capability describes one inference knob this model supports, with any
 *  model-specific parameters for it. A variation's ModelConfig may only
 *  set a knob whose capability is listed on the model's spec.
 */
export type ModelSpec_Capability = ModelSpec_Capability_Temperature | ModelSpec_Capability_TopP | ModelSpec_Capability_TopK | ModelSpec_Capability_StopSequences | ModelSpec_Capability_MaxOutputTokens | ModelSpec_Capability_Reasoning | ModelSpec_Capability_Caching;
export type NoticeLevel = 'LEVEL_UNSPECIFIED' | 'LEVEL_INFO' | 'LEVEL_WARN';
/**
 * Notice is a non-terminal diagnostic emitted by the runtime when something
 *  noteworthy but non-fatal happens during an objective — for example a
 *  just-in-time tool set failing to load, or a previously loaded tool being
 *  dropped because it was archived. Notices carry no structured payload; they
 *  exist to make the objective timeline self-explanatory.
 */
export interface Notice {
    level: NoticeLevel;
    /**
     * Human-readable description of what happened.
     */
    message: string;
    /**
     * Stable machine-readable identifier for the notice kind (for example
     *  "tool_set_load_failed", "tool_archived"). Clients can switch on it or use
     *  it as an i18n key; the message is the English fallback.
     */
    key: string;
}
/**
 * The current lifecycle state of the objective.
 */
export type ObjectiveState = 'STATE_UNSPECIFIED' | 'STATE_PENDING' | 'STATE_RUNNING' | 'STATE_WAITING' | 'STATE_FAILED' | 'STATE_CANCELLED' | 'STATE_FINALIZED' | 'STATE_TIMED_OUT';
/**
 * Objective is the data for an objective. It contains the snapshotted fields for the selected agent and variation. Secrets are returned
 *  only with their names, and the output definition is copied from the agent's configuration.
 */
export interface Objective {
    metadata: OperationMetadata;
    /**
     * The snapshot of the agent and the variation selected (either explicitly or by sampling) will be set here. Cadenya stores
     *  the point-in-time snapshot of the configuration used to start an objective and maintains it throughout the entire lifecycle
     *  so that changes to agents and variations in the middle of a cycle don't impact the objective itself
     */
    configSnapshot: ObjectiveConfigSnapshot;
    /**
     * The current lifecycle state of the objective.
     */
    state: ObjectiveState;
    /**
     * Optional human-readable detail about the current state (e.g. a failure reason).
     */
    stateMessage: string;
    /**
     * Read-only aggregated info about this objective's execution
     */
    info?: ObjectiveInfo;
    /**
     * system_prompt is read-only, derived from the selected variation's prompt
     */
    systemPrompt: string;
    /**
     * The first user message in the LLM chat history, either provided explicitly at
     *  creation or rendered from the variation's first_user_message_template.
     */
    firstUserMessage: string;
    /**
     * A parent objective means the objective was spawned off using a separate agent to complete an objective
     */
    parentObjectiveId: string;
    /**
     * Secrets that can be used in the headers for tool calls using the secret interpolation format.
     */
    secrets: Array<Objective_Secret>;
    /**
     * Arbitrary data rendered into the variation's system_prompt_template
     */
    systemPromptData?: Record<string, unknown>;
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
    memoryCascade: Array<MemoryReference>;
    /**
     * The output of the objective, populated when the objective completes. Will match the schema of output_json_schema or output_json_inferred.
     *  This will only be set if the state of the objective is set to STATE_FINALIZED
     */
    output?: Record<string, unknown>;
    /**
     * Arbitrary data rendered into the variation's first_user_message_template
     */
    firstUserMessageData?: Record<string, unknown>;
    /**
     * If the agent variation that is selected has episodic memory enabled, then this key is used to create/update a memory layer
     *  specific to the episodic memory. The layer may have a TTL configured by the variation.
     */
    episodicMemory?: ObjectiveEpisodicConfig;
    /**
     * Parameters forced onto this objective's tool calls, as provided at
     *  creation. See CreateObjectiveRequest.pinned_parameters for semantics.
     */
    pinnedParameters: Record<string, string>;
}
/**
 * ObjectiveCancelled is the terminal event written when an objective is
 *  cancelled. After this event, the objective is super-terminal: no further
 *  iterations, compaction, or continuation are permitted.
 */
export interface ObjectiveCancelled {
    /**
     * Optional human-readable note recorded at cancel time. Today the workflow
     *  sets "Cancelled" but this field leaves room for richer reasons (e.g.
     *  "Cancelled by user", "Cancelled by schedule sweep", "Credit balance exhausted").
     */
    message: string;
}
/**
 * ObjectiveConfigSnapshot is the point-in-time snapshot of the agent, variation, and
 *  (when applicable) schedule that an objective was started with.
 */
export interface ObjectiveConfigSnapshot {
    agent: Agent;
    agentVariation: AgentVariation;
    agentSchedule?: AgentSchedule;
}
/**
 * ObjectiveContextWindow is a window of chat completions that is grouped together to prevent context-window overflows. Context windows also allow
 *  agents to compact their windows and carry on into a new one.
 */
export interface ObjectiveContextWindow {
    metadata: OperationMetadata;
    data: ObjectiveContextWindowData;
    info?: ObjectiveContextWindowInfo;
}
export interface ObjectiveContextWindowData {
    /**
     * The objective's ID that this window belongs to
     */
    objectiveId: string;
    /**
     * sequence is a numeric representation of which context window this is. Sequences are useful to perform a max(sequence) on in order
     *  to calculate how many context windows an objective has.
     */
    sequence: number;
    /**
     * A calculated value for how many prompt tokens (input tokens) have been used in this context window
     */
    promptTokens: number;
    /**
     * A calculated value for how many completion tokens (output tokens) have been used in this context window
     */
    completionTokens: number;
    /**
     * The instructions for this window to continue from a previous window's chat history.
     */
    previousWindowContinueInstructions: string;
}
export interface ObjectiveContextWindowInfo {
    objective?: OperationMetadata;
    createdBy?: Profile;
}
/**
 * ObjectiveDiagnostics is the context-usage breakdown measured for a single
 *  iteration at request-assembly time. It reports how much of the context
 *  window each component occupies so tool parameters, memory cascades, and
 *  prompts can be tuned against real token usage.
 */
export interface ObjectiveDiagnostics {
    /**
     * Measured character lengths per context component.
     */
    contextLengths: ContextLengths;
    /**
     * Input tokens reported by the LLM provider for the iteration's completion.
     */
    inputTokens: number;
    /**
     * The portion of input_tokens served from the provider's prompt cache.
     *  Lets clients distinguish "big but cached" from "big and paid fresh
     *  every iteration".
     */
    cachedInputTokens: number;
}
/**
 * Episodic is used to configure the episodic memory for the objective
 */
export interface ObjectiveEpisodicConfig {
    /**
     * The caller-supplied episodic key. Objectives created with the same key
     *  (for the same agent) share one episodic memory layer.
     */
    key: string;
    /**
     * The episodic memory layer resolved (created or reused) for this
     *  objective's key. Populated by the system at objective creation.
     */
    memoryLayerId: string;
}
export interface ObjectiveError {
    type: string;
    message: string;
}
export interface ObjectiveEvent {
    metadata: OperationMetadata;
    data: ObjectiveEventData;
    contextWindowId: string;
    info?: ObjectiveEventInfo;
    /**
     * Elapsed time of the work this event records, when it is known at
     *  write time (e.g. assistant message generation, tool execution for
     *  result/error events). Unset means the event is instantaneous or the
     *  duration is not measurable. Serialized as a canonical duration
     *  string (e.g. "4.1s"). Always set together with started_at.
     */
    duration?: string;
    /**
     * When the work this event records began. Set together with duration,
     *  so the work interval is [started_at, started_at + duration]. The
     *  event's created_at remains the time the event was persisted.
     */
    startedAt?: string;
}
export type ObjectiveEventData = ObjectiveEventData_UserMessage | ObjectiveEventData_ToolApprovalRequested | ObjectiveEventData_ToolApproved | ObjectiveEventData_ToolDenied | ObjectiveEventData_ToolCalled | ObjectiveEventData_Error | ObjectiveEventData_AssistantMessage | ObjectiveEventData_ToolResult | ObjectiveEventData_ToolError | ObjectiveEventData_ContextWindowCompacted | ObjectiveEventData_MemoryRead | ObjectiveEventData_Cancelled | ObjectiveEventData_SubAgentSpawned | ObjectiveEventData_SubAgentUpdated | ObjectiveEventData_Finalized | ObjectiveEventData_Notice | ObjectiveEventData_TimedOut | ObjectiveEventData_Reasoning;
export interface ObjectiveEventInfo {
    objective?: OperationMetadata;
    createdBy: Profile;
}
/**
 * ObjectiveFeedback represents feedback submitted for an objective's execution.
 *  Feedback is used to score agent variations and improve agent performance over time.
 */
export interface ObjectiveFeedback {
    metadata: OperationMetadata;
    data: ObjectiveFeedbackData;
    info: ObjectiveFeedbackInfo;
}
export interface ObjectiveFeedbackData {
    /**
     * A score between -1.0 and 1.0 representing the quality of the objective's execution.
     *  -1.0 is the worst possible score, 0.0 is neutral, and 1.0 is the best.
     */
    score?: number;
    /**
     * Optional human-readable comment explaining the feedback
     */
    comment?: string;
}
export interface ObjectiveFeedbackInfo {
    /**
     * The profile that submitted the feedback
     */
    submittedBy: Profile;
    /**
     * The objective the feedback was submitted for.
     */
    objective?: BareMetadata;
    /**
     * The agent variation that executed the objective this feedback is about.
     */
    agentVariation?: BareMetadata;
}
/**
 * ObjectiveFinalized is the terminal event written when an objective is
 *  finalized. After this event, the objective is super-terminal: no further
 *  iterations, compaction, or continuation are permitted.
 */
export interface ObjectiveFinalized {
    /**
     * If the objective was created with an output schema, and the agent
     *  successfully completed the objective, this field will contain the
     *  structured output of the objective.
     */
    output?: Record<string, unknown>;
}
/**
 * ObjectiveInfo provides read-only aggregated statistics about an objective's execution
 */
export interface ObjectiveInfo {
    /**
     * Total number of events generated during this objective's execution
     */
    totalEvents: number;
    /**
     * Total number of tool calls made during execution
     */
    totalToolCalls: number;
    /**
     * Total input tokens consumed across all LLM completions across all context windows
     */
    totalInputTokens: number;
    /**
     * Total output tokens generated across all LLM completions across all context windows
     */
    totalOutputTokens: number;
    /**
     * Total number of context windows that this objective has generated
     */
    totalContextWindows: number;
    totalIterations: number;
    createdBy: Profile;
    /**
     * The effective memory cascade at objective creation time: the
     *  episodic layer (when present), then Objective.memory_cascade, then
     *  the variation's baseline layers by ascending position. Order is
     *  resolution order — index 0 is the most specific and is consulted
     *  first; the first layer containing a key wins. Returned on reads so
     *  clients can see exactly what the objective resolves against without
     *  re-joining variation state.
     */
    effectiveMemoryCascade: Array<MemoryReference>;
    /**
     * Agent details (not snapshotted).
     */
    agent: ResourceMetadata;
    /**
     * Agent variation details (not snapshotted).
     */
    agentVariation: ResourceMetadata;
    /**
     * ID of the objective's current (most recent) context window. Hydrated on
     *  demand; empty when the objective has not yet produced a context window.
     */
    currentContextWindowId: string;
    /**
     * The tenant this objective is associated with, when one was asserted at
     *  creation (directly or via a widget session).
     */
    tenant?: TenantReference;
    /**
     * The subject (person within the tenant) this objective is associated
     *  with, when one was asserted at creation.
     */
    subject?: SubjectReference;
    /**
     * The widget this objective's conversation ran through, when it was
     *  created via a widget session.
     */
    widget?: BareMetadata;
}
/**
 * ObjectiveTask represents a task within an objective, typically created and managed by an AI agent
 *  to track progress toward completing the objective.
 */
export interface ObjectiveTask {
    metadata: BareMetadata;
    data: ObjectiveTaskData;
}
export interface ObjectiveTaskData {
    /**
     * The sequential number of this task within the objective (auto-assigned, 1-based)
     */
    number: number;
    /**
     * Description of the task to be completed
     */
    task: string;
    /**
     * Whether the task has been completed
     */
    completed: boolean;
    /**
     * Timestamp when the task was marked as completed
     */
    completedAt?: string;
}
/**
 * ObjectiveTimedOut is the terminal event written when an objective is
 *  finalized by the inactivity sweep because it saw no activity (no user
 *  messages, no LLM calls) within its variation's inactivity timeout — or the
 *  system-wide 24 hour maximum when no timeout is configured. The objective
 *  produces no output. After this event, the objective is super-terminal: no
 *  further iterations, compaction, or continuation are permitted.
 */
export interface ObjectiveTimedOut {
    /**
     * Human-readable note recorded at timeout time (e.g. "Timed out after 2h
     *  of inactivity").
     */
    message: string;
}
/**
 * ObjectiveTool represents a tool that was assigned to an objective.
 */
export interface ObjectiveTool {
    metadata: BareMetadata;
    /**
     * Snapshot of the tool at the time it was assigned to the objective. Because tools can change over time, snapshots
     *  are used to ensure tools don't change unexpectedly during an objective's lifecycle.
     */
    snapshot: Tool;
}
/**
 * Current status of the tool call
 */
export type ObjectiveToolCallStatus = 'TOOL_CALL_STATUS_UNSPECIFIED' | 'TOOL_CALL_STATUS_AUTO_APPROVED' | 'TOOL_CALL_STATUS_WAITING_FOR_APPROVAL' | 'TOOL_CALL_STATUS_APPROVED' | 'TOOL_CALL_STATUS_DENIED';
export type ObjectiveToolCallExecutionStatus = 'TOOL_CALL_EXECUTION_STATUS_UNSPECIFIED' | 'TOOL_CALL_EXECUTION_STATUS_PENDING' | 'TOOL_CALL_EXECUTION_STATUS_RUNNING' | 'TOOL_CALL_EXECUTION_STATUS_COMPLETED' | 'TOOL_CALL_EXECUTION_STATUS_ERRORED' | 'TOOL_CALL_EXECUTION_STATUS_WAITING_FOR_CONTENT';
/**
 * ObjectiveToolCall is a record of a tool call made during an objective's execution.
 *  Tool calls are mutable — their status changes as they are approved, denied, or executed.
 */
export interface ObjectiveToolCall {
    metadata: OperationMetadata;
    data: ObjectiveToolCallData;
    /**
     * Current status of the tool call
     */
    status: ObjectiveToolCallStatus;
    info?: ObjectiveToolCallInfo;
    executionStatus: ObjectiveToolCallExecutionStatus;
}
export interface ObjectiveToolCallData {
    /**
     * The tool that was called
     */
    callable: CallableTool;
    /**
     * The arguments passed to the tool
     */
    arguments: Record<string, unknown>;
    /**
     * A memo supplied by the reviewer when denying the tool call
     */
    memo?: string;
    /**
     * The profile that changed the status of this tool call. Set when the status is changed to APPROVED or DENIED by a user.
     */
    statusChangedBy?: Profile;
    /**
     * List of resolved secrets used by the tool call
     */
    resolvedSecrets: Array<ResolvedSecret>;
}
export interface ObjectiveToolCallInfo {
    objective: OperationMetadata;
    createdBy?: Profile;
    tool?: BareMetadata;
    toolSet?: BareMetadata;
}
/**
 * ObjectiveToolCallResult is the content a tool returned after execution.
 *  Tools can return multiple content blocks, and blocks can be multi-modal
 *  (text, image, audio). Media blocks are stored by Cadenya and served as
 *  short-lived signed URLs rather than inline bytes.
 */
export interface ObjectiveToolCallResult {
    /**
     * The result content as recorded — which is what the model was shown.
     *  When a tool set overlay transformed the result (ToolOverlay
     *  result_actions), this is the transformed content; the adapter's raw
     *  response is kept in the tool call's debug log, not here.
     */
    content: Array<ObjectiveToolCallResult_ContentBlock>;
}
export interface ObjectiveToolCallResult_AudioBlock {
    /**
     * Short-lived signed URL to download the stored audio.
     */
    url: string;
    /**
     * IANA media type of the stored audio, e.g. audio/wav.
     */
    mimeType: string;
    /**
     * Size of the stored audio in bytes.
     */
    sizeBytes: string;
    /**
     * When the signed URL expires.
     */
    expiresAt: string;
}
/**
 * ContentBlock is a single block of tool result content. Exactly one of
 *  the variants is set.
 */
export type ObjectiveToolCallResult_ContentBlock = ObjectiveToolCallResult_ContentBlock_Text | ObjectiveToolCallResult_ContentBlock_Image | ObjectiveToolCallResult_ContentBlock_Audio;
export interface ObjectiveToolCallResult_ImageBlock {
    /**
     * Short-lived signed URL to download the stored image.
     */
    url: string;
    /**
     * IANA media type of the stored image, e.g. image/png.
     */
    mimeType: string;
    /**
     * Size of the stored image in bytes.
     */
    sizeBytes: string;
    /**
     * When the signed URL expires.
     */
    expiresAt: string;
}
export interface ObjectiveToolCallResult_TextBlock {
    text: string;
}
/**
 * Current status of the tool call
 */
export type ObjectiveToolCallWithResultStatus = 'TOOL_CALL_STATUS_UNSPECIFIED' | 'TOOL_CALL_STATUS_AUTO_APPROVED' | 'TOOL_CALL_STATUS_WAITING_FOR_APPROVAL' | 'TOOL_CALL_STATUS_APPROVED' | 'TOOL_CALL_STATUS_DENIED';
export type ObjectiveToolCallWithResultExecutionStatus = 'TOOL_CALL_EXECUTION_STATUS_UNSPECIFIED' | 'TOOL_CALL_EXECUTION_STATUS_PENDING' | 'TOOL_CALL_EXECUTION_STATUS_RUNNING' | 'TOOL_CALL_EXECUTION_STATUS_COMPLETED' | 'TOOL_CALL_EXECUTION_STATUS_ERRORED' | 'TOOL_CALL_EXECUTION_STATUS_WAITING_FOR_CONTENT';
/**
 * ObjectiveToolCallWithResult is an ObjectiveToolCall plus the content the
 *  tool returned. Returned by GetObjectiveToolCall.
 */
export interface ObjectiveToolCallWithResult {
    metadata: OperationMetadata;
    data: ObjectiveToolCallData;
    /**
     * Current status of the tool call
     */
    status: ObjectiveToolCallWithResultStatus;
    info: ObjectiveToolCallInfo;
    executionStatus: ObjectiveToolCallWithResultExecutionStatus;
    /**
     * The content returned by the tool. Only set once execution_status is
     *  TOOL_CALL_EXECUTION_STATUS_COMPLETED.
     */
    result?: ObjectiveToolCallResult;
    /**
     * List of resolved secrets used by the tool call
     */
    resolvedSecrets: Array<ResolvedSecret>;
}
export interface Objective_Secret {
    name: string;
}
/**
 * Omit tool request
 */
export interface OmitToolRequest {
    /**
     * Workspace ID.
     */
    workspaceId?: string;
    /**
     * Tool set ID. Accepts the canonical ts_… form or the
     *  external_id:<value> form.
     */
    toolSetId?: string;
    /**
     * Tool ID. Accepts the canonical tool_… form or the
     *  external_id:<value> form.
     */
    id?: string;
}
/**
 * OpenAICompatibleConfig configures a generic endpoint that speaks the OpenAI
 *  Chat Completions API. The base URL is required and its model catalog is
 *  discovered live via GET {base_url}/models.
 */
export interface OpenAICompatibleConfig {
    baseUrl: string;
}
/**
 * OpenAIConfig holds OpenAI-specific settings.
 */
export interface OpenAIConfig {
    /**
     * Sent as the OpenAI-Organization header when set.
     */
    organizationId?: string;
    /**
     * Sent as the OpenAI-Project header when set.
     */
    projectId?: string;
}
/**
 * OpenRouterConfig holds OpenRouter-specific settings.
 */
export interface OpenRouterConfig {
    /**
     * Data-residency region (e.g. "us", "eu"). Empty uses the provider default.
     */
    region?: string;
}
/**
 * Metadata for ephemeral operations and activities (e.g., objectives, executions, runs)
 */
export interface OperationMetadata {
    /**
     * Unique identifier for the operation (prefixed ULID, e.g., "obj_01HXK...")
     */
    id: string;
    /**
     * Account this operation belongs to for multi-tenant isolation (prefixed ULID)
     */
    accountId: string;
    /**
     * Workspace this operation belongs to for organizational grouping (prefixed ULID)
     */
    workspaceId: string;
    /**
     * Key-value pairs for categorization and filtering. Values are 0-63
     *  alphanumeric characters with "-", "_", or "." allowed between; keys
     *  follow the same shape and additionally accept an optional DNS-subdomain
     *  prefix (e.g. "cadenya.com/") of at most 253 characters.
     *  Examples: {"priority": "high", "source": "api", "workflow": "onboarding"}
     */
    labels: Record<string, string>;
    /**
     * Timestamp when this operation was created
     *  ULID includes timestamp information, but this explicit field enables easier querying
     */
    createdAt: string;
    /**
     * External ID for the operation (e.g., a workflow ID from an external system)
     */
    externalId: string;
    /**
     * ID of the actor (user or service account) that created this operation
     */
    profileId: string;
}
/**
 * Page carries cursor-based pagination state. There is no total: the cursor
 *  walks the result set without ever counting it, and a count would cost a second
 *  query on every list.
 */
export interface Page {
    nextCursor: string;
}
/**
 * Default: ON_MISSING_FAIL.
 */
export type ParameterActionPinOnMissing = 'ON_MISSING_UNSPECIFIED' | 'ON_MISSING_FAIL' | 'ON_MISSING_SKIP';
/**
 * Bind the parameter to one of the objective's pinned parameters. It is
 *  deleted from the schema (including any `required` entry), and on every
 *  call the pinned value is written into the arguments, overwriting
 *  anything the model supplied.
 *  This is the authoritative-value action: the model never sees the
 *  parameter and cannot influence it.
 *
 *  `pin` differs from `set` with `{{ pinned_parameters.key }}` only in
 *  how a missing key is handled (see `on_missing`) and in intent —
 *  reading the tool set config, `pin` says "this comes from the caller".
 */
export interface ParameterAction_Pin {
    path: string;
    /**
     * Key into the objective's pinned_parameters map. Need not equal the
     *  last segment of `path` — this is how a pinned `orgId` reaches a
     *  tool whose parameter is named `organizationId`.
     */
    pinnedParameter: string;
    /**
     * Default: ON_MISSING_FAIL.
     */
    onMissing: ParameterActionPinOnMissing;
}
/**
 * Remove the parameter entirely. It is deleted from the schema
 *  (including any `required` entry) and stripped from the arguments if
 *  the model supplies it anyway. The tool receives no value for it — the
 *  upstream default, if any, applies. Use this to save context on
 *  parameters the model has no business setting (pagination cursors,
 *  expansion flags, debug toggles).
 */
export interface ParameterAction_Remove {
    path: string;
}
/**
 * Force the parameter to a value. It is deleted from the schema
 *  (including any `required` entry), and on every call the rendered
 *  value is written into the arguments, overwriting anything the model
 *  supplied.
 *
 *  `value_template` is a Liquid template rendered against the objective:
 *
 *    {{ pinned_parameters.<key> }}  the objective's pinned parameters
 *    {{ objective.id }}             the objective's id
 *    {{ objective.external_id }}    the objective's external id
 *    {{ objective.labels.<key> }}   the objective's labels
 *
 *  Templates render with strict variables: referencing a pinned
 *  parameter or label that does not exist fails the call rather than
 *  rendering an empty value.
 *
 *  Tool set secrets are intentionally not exposed here: overlay-set
 *  values are recorded as tool call arguments in events and tool call
 *  history, and would leak. Use adapter headers for credentials.
 *
 *  The rendered string is coerced to the parameter's declared schema
 *  type: for a non-string parameter (integer, number, boolean, object,
 *  array) the output is parsed as JSON. A value that fails to parse
 *  errors the tool call. Prefer `pin` when the value is simply a pinned
 *  parameter — it fails loudly when the key is absent instead of
 *  rendering an empty string.
 */
export interface ParameterAction_Set {
    path: string;
    valueTemplate: string;
}
/**
 * Pause agent schedule request.
 */
export interface PauseAgentScheduleRequest {
    /**
     * Workspace ID.
     */
    workspaceId?: string;
    /**
     * Agent ID. Accepts the canonical `agent_…` form or the `external_id:<value>` form.
     */
    agentId?: string;
    /**
     * Schedule ID. Accepts the canonical `as_…` form or the `external_id:<value>` form.
     */
    id?: string;
}
/**
 * A profile identifies a user or non-human principal (such as an API key)
 *  at the account level. Profiles are account-scoped and can be granted access
 *  to multiple workspaces.
 */
export interface Profile {
    metadata: AccountResourceMetadata;
    spec: ProfileSpec;
}
/**
 * Whether this profile represents a human user, an API key, or a system
 *  principal.
 */
export type ProfileSpecType = 'PROFILE_TYPE_UNSPECIFIED' | 'PROFILE_TYPE_USER' | 'PROFILE_TYPE_API_KEY' | 'PROFILE_TYPE_SYSTEM';
/**
 * Configuration for a profile.
 */
export interface ProfileSpec {
    /**
     * Email address of the profile. Required and unique within an account for
     *  user profiles.
     */
    email: string;
    /**
     * Display name (e.g., "Bobby Tables").
     */
    name: string;
    /**
     * Whether this profile represents a human user, an API key, or a system
     *  principal.
     */
    type: ProfileSpecType;
}
/**
 * Publish agent request
 */
export interface PublishAgentRequest {
    /**
     * Workspace ID.
     */
    workspaceId?: string;
    /**
     * Agent ID. Accepts the canonical `agent_…` form or the `external_id:<value>` form.
     */
    id?: string;
}
/**
 * Reasoning carries the human-readable reasoning text a model produced while
 *  working on an iteration — extended thinking (Anthropic, Gemini) or reasoning
 *  summaries (OpenAI). It is emitted alongside the assistant message from the
 *  same model response and is purely informational: the text shown here is
 *  never sent back to the model.
 */
export interface Reasoning {
    /**
     * The reasoning text. May be a verbatim chain of thought or a
     *  provider-generated summary depending on the model.
     */
    content: string;
}
export type ResolvedSecretSource = 'RESOLVED_SECRET_SOURCE_UNSPECIFIED' | 'RESOLVED_SECRET_SOURCE_WORKSPACE' | 'RESOLVED_SECRET_SOURCE_TOOLSET' | 'RESOLVED_SECRET_SOURCE_OBJECTIVE';
/**
 * ResolvedSecret is a resolved secret value from the workspace, toolset, or objective. When a tool is called, it will rely
 *  on secrets in the order of:
 *  - Objective
 *  - Toolset
 *  - Workspace
 */
export interface ResolvedSecret {
    key: string;
    source: ResolvedSecretSource;
}
/**
 * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
 */
export interface ResourceMetadata {
    /**
     * Unique identifier for the resource (prefixed ULID, e.g., "agent_01HXK...")
     */
    id: string;
    /**
     * Account this resource belongs to for multi-tenant isolation (prefixed ULID)
     */
    accountId: string;
    /**
     * Workspace this resource belongs to for organizational grouping (prefixed ULID)
     */
    workspaceId: string;
    /**
     * Human-readable name for the resource (e.g., "Customer Support Agent", "Email Tool")
     *  Required for resources that users interact with directly
     */
    name: string;
    /**
     * External ID for the resource (e.g., a workflow ID from an external system)
     */
    externalId: string;
    /**
     * Key-value pairs for categorization and filtering. Values are 0-63
     *  alphanumeric characters with "-", "_", or "." allowed between; keys
     *  follow the same shape and additionally accept an optional DNS-subdomain
     *  prefix (e.g. "cadenya.com/") of at most 253 characters.
     *  Examples: {"environment": "production", "team": "platform", "version": "v2"}
     */
    labels: Record<string, string>;
    /**
     * ID of the actor (user or service account) that created this resource
     */
    profileId: string;
    /**
     * Timestamp when this resource was created
     */
    createdAt: string;
    /**
     * Timestamp when this resource was last updated
     */
    updatedAt?: string;
}
/**
 * Restore tool request
 */
export interface RestoreToolRequest {
    /**
     * Workspace ID.
     */
    workspaceId?: string;
    /**
     * Tool set ID. Accepts the canonical ts_… form or the
     *  external_id:<value> form.
     */
    toolSetId?: string;
    /**
     * Tool ID. Accepts the canonical tool_… form or the
     *  external_id:<value> form.
     */
    id?: string;
}
/**
 * Default: ON_ERROR_RAW_CONTENT.
 */
export type ResultActionTransformOnError = 'ON_ERROR_UNSPECIFIED' | 'ON_ERROR_RAW_CONTENT' | 'ON_ERROR_FAIL';
/**
 * Replace the result's text content with a rendered Liquid template.
 *  Used to compact verbose responses to the fields the model actually
 *  needs, or to rewrite a JSON response into a smaller JSON document.
 *
 *  `content_template` is rendered against the call:
 *
 *    {{ result.text }}        the result's text content (text blocks
 *                             joined with newlines)
 *    {{ result.json }}        result.text parsed as JSON — objects and
 *                             arrays are navigable (`result.json.items`,
 *                             `| map: "id"`); absent when the text is not
 *                             valid JSON
 *    {{ result.blocks }}      every content block: [{type, text?,
 *                             mime_type?, size_bytes?}]
 *    {{ parameters }}         the arguments the tool was called with,
 *                             after parameter actions were applied
 *    {{ tool.name }}          the tool's metadata.name
 *    {{ tool.llm_tool_name }} the name the model called it by
 *    {{ pinned_parameters }}  the objective's pinned parameters
 *    {{ objective.id }} / {{ objective.external_id }} /
 *    {{ objective.labels.<key> }}
 *
 *  Templates render with strict variables: referencing `result.json` on
 *  a non-JSON result, or any other undefined variable, is a render error
 *  and `on_error` decides the outcome. The `json` filter pretty-prints a
 *  value as JSON; `sanitized_json` emits it compact and escaped for
 *  embedding.
 *
 *  Transforms are text-only. `result.text` and `result.json` are built
 *  from the result's text blocks; media blocks (images, audio) are opaque
 *  to the template and pass through unchanged. The rendered text replaces
 *  the text blocks as a single text block. A result with no text blocks
 *  at all (an image-only or audio-only result) is out of scope: the
 *  transform is skipped, the result is recorded as returned, and the
 *  skip is noted in the tool call's debug log — this is not an `on_error`
 *  case, nothing was attempted. The one exception is `expect_json`, where
 *  a result with no text is a violated precondition and `on_error`
 *  applies.
 */
export interface ResultAction_Transform {
    contentTemplate: string;
    /**
     * Default: ON_ERROR_RAW_CONTENT.
     */
    onError: ResultActionTransformOnError;
    /**
     * Require the tool result to have text content that parses as JSON
     *  before rendering. A non-JSON (or text-less) result is then an error
     *  subject to `on_error` even if the template never reads
     *  `result.json`. Off by default: `result.json` is simply absent for
     *  non-JSON results, and text-less results skip the transform.
     */
    expectJson: boolean;
}
/**
 * Resume agent schedule request.
 */
export interface ResumeAgentScheduleRequest {
    /**
     * Workspace ID.
     */
    workspaceId?: string;
    /**
     * Agent ID. Accepts the canonical `agent_…` form or the `external_id:<value>` form.
     */
    agentId?: string;
    /**
     * Schedule ID. Accepts the canonical `as_…` form or the `external_id:<value>` form.
     */
    id?: string;
}
/**
 * Revoke widget session request.
 */
export interface RevokeWidgetSessionRequest {
    /**
     * Workspace ID.
     */
    workspaceId?: string;
    /**
     * Session ID. Accepts the canonical `wsess_…` form or the `external_id:<value>` form.
     */
    id?: string;
}
export interface RotateAPIKeyRequest {
    /**
     * The workspace the API key belongs to (path).
     */
    workspaceId?: string;
    /**
     * The API key to rotate. A new token is issued and any existing token is
     *  invalidated.
     */
    id?: string;
}
/**
 * Response containing the newly generated challenge token.
 */
export interface RotateChallengeTokenResponse {
    challengeToken: string;
}
/**
 * Response containing the newly generated webhook signing secret.
 */
export interface RotateWebhookEventsHmacSecretResponse {
    webhookEventsHmacSecret: string;
}
/**
 * Calendar is a wall-clock rule. Empty field-list semantics:
 *    - second/minute/hour: empty means [{start: 0}] (top of the unit)
 *    - day_of_month/month/day_of_week: empty means "any value"
 *  Fire times = cartesian product across all fields.
 */
export interface Schedule_Calendar {
    second?: Array<Schedule_Range>;
    minute?: Array<Schedule_Range>;
    hour?: Array<Schedule_Range>;
    dayOfMonth?: Array<Schedule_Range>;
    month?: Array<Schedule_Range>;
    dayOfWeek?: Array<Schedule_Range>;
    comment?: string;
}
/**
 * Interval is a duration-based rule. Fires every `every` from a stable
 *  anchor (workspace epoch), optionally phase-shifted by `offset`.
 */
export interface Schedule_Interval {
    every?: string;
    /**
     * Phase shift within `every`. Must be < `every` (enforced at runtime).
     */
    offset?: string;
}
/**
 * Inclusive numeric range with optional step.
 *    {start: 9}                    → 9
 *    {start: 9, end: 17}           → 9..17
 *    {start: 0, end: 59, step: 15} → 0,15,30,45
 *  `end` defaults to `start`; `step` defaults to 1.
 */
export interface Schedule_Range {
    start?: number;
    end?: number;
    step?: number;
}
export interface SearchToolsOrToolSetsResponse {
    tools: Array<Tool>;
    toolSets: Array<ToolSet>;
    agents: Array<Agent>;
}
/**
 * A single selector condition.
 */
export type Selector_Condition = Selector_Condition_Attribute | Selector_Condition_HasParameter | Selector_Condition_Tools;
/**
 * An explicit list of tools, matched on spec.llm_tool_name — the name
 *  the model calls the tool by. It identifies a tool across versions:
 *  just-in-time MCP sets keep one tool per signature and every version
 *  shares the LLM name, so the condition keeps matching as the source
 *  evolves. Any name in the list matches (OR). Names of tools not (or
 *  not yet) present in the set are allowed and match nothing.
 */
export interface Selector_ToolNames {
    names?: Array<string>;
}
/**
 * SetToolCallContentRequest lets an external API consumer supply the result
 *  of a bare tool call (one whose tool set has no execution adapter). Used
 *  for human-in-the-loop tools and reverse harnesses that execute tools
 *  locally and report results back.
 */
export interface SetToolCallContentRequest {
    workspaceId?: string;
    /**
     * The ID of the objective. Supports "external_id:" prefix for external IDs.
     */
    objectiveId?: string;
    /**
     * The ID of the tool call to set content for
     */
    toolCallId?: string;
    /**
     * The content to set on the tool call. Mirrors
     *  ObjectiveToolCallResult.ContentBlock but writable: media blocks carry
     *  raw data on input where the result-side carries a signed url on output.
     */
    content: Array<SetToolCallContentRequest_ContentBlock>;
}
export interface SetToolCallContentRequest_AudioBlock {
    /**
     * Base64-encoded audio bytes.
     */
    data: string;
    /**
     * IANA media type of the audio, e.g. audio/wav.
     */
    mimeType: string;
}
/**
 * ContentBlock is a single block of tool call content supplied on input.
 *  Exactly one of the variants is set.
 */
export type SetToolCallContentRequest_ContentBlock = SetToolCallContentRequest_ContentBlock_Text | SetToolCallContentRequest_ContentBlock_Image | SetToolCallContentRequest_ContentBlock_Audio;
export interface SetToolCallContentRequest_ImageBlock {
    /**
     * Base64-encoded image bytes.
     */
    data: string;
    /**
     * IANA media type of the image, e.g. image/png.
     */
    mimeType: string;
}
export interface SetToolCallContentRequest_TextBlock {
    text: string;
}
/**
 * The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors).
 */
export interface Status {
    /**
     * The status code, which should be an enum value of [google.rpc.Code][google.rpc.Code].
     */
    code?: number;
    /**
     * A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the [google.rpc.Status.details][google.rpc.Status.details] field, or localized by the client.
     */
    message?: string;
    /**
     * A list of messages that carry the error details.  There is a common set of message types for APIs to use.
     */
    details?: Array<GoogleProtobufAny>;
}
export interface SubAgentSpawned {
    agent: ResourceMetadata;
    objective: OperationMetadata;
    task: string;
}
export type SubAgentUpdatedStatus = 'STATUS_UNSPECIFIED' | 'STATUS_PENDING' | 'STATUS_RUNNING' | 'STATUS_COMPLETED' | 'STATUS_FAILED' | 'STATUS_CANCELLED';
export interface SubAgentUpdated {
    agent?: BareMetadata;
    objective?: BareMetadata;
    status: SubAgentUpdatedStatus;
    message?: string;
}
/**
 * Subject is a person within a tenant as a readable record. Like Tenant it
 *  carries no spec — `metadata.external_id` is the customer's key for them,
 *  unique within the tenant rather than the workspace.
 */
export interface Subject {
    metadata: ResourceMetadata;
    info?: SubjectInfo;
}
/**
 * SubjectAssertion identifies a person within a tenant in the customer's own
 *  namespace — typically their user id. Asserting a subject upserts the
 *  subject record under the asserted tenant and associates the created
 *  resource with it. A subject assertion is only valid alongside a tenant
 *  assertion: subject identifiers are scoped to their tenant.
 */
export interface SubjectAssertion {
    /**
     * The subject identifier in the customer's namespace (e.g. their user id).
     *  Stored as the subject record's external_id; unique within the tenant.
     */
    id: string;
    /**
     * Optional human-readable name for the subject. Updates the subject
     *  record's name on every assertion that provides it.
     */
    name?: string;
}
/**
 * SubjectInfo provides read-only server-derived data about a subject.
 */
export interface SubjectInfo {
    /**
     * The tenant this subject belongs to.
     */
    tenant: TenantReference;
    /**
     * Number of objectives associated with this subject.
     */
    objectiveCount: number;
}
/**
 * SubjectReference is the read-only echo of a resource's subject association,
 *  carrying both Cadenya's canonical id and the customer's own key.
 */
export interface SubjectReference {
    /**
     * Cadenya's canonical subject id.
     */
    id: string;
    /**
     * The subject identifier in the customer's namespace, as asserted. Unique
     *  within the subject's tenant.
     */
    externalId: string;
    /**
     * Human-readable name of the subject, when one has been asserted.
     */
    name?: string;
}
/**
 * Swap model on variations request. Each ModelSwap reassigns every agent
 *  variation on current_model_id to next_model_id. The work runs asynchronously.
 */
export interface SwapModelOnVariationsRequest {
    /**
     * Workspace ID.
     */
    workspaceId?: string;
    /**
     * The swaps to perform.
     */
    modelSwaps?: Array<SwapModelOnVariationsRequest_ModelSwap>;
}
export interface SwapModelOnVariationsRequest_ModelSwap {
    /**
     * The model variations are currently on. Accepts an id or "external_id:" slug.
     */
    currentModelId?: string;
    /**
     * The model to move variations to. Accepts an id or "external_id:" slug.
     */
    nextModelId?: string;
    /**
     * Whether to disable the current model after the swap.
     */
    disableCurrentAfterSwap?: boolean;
}
/**
 * Swap model on variations response. Empty: the work runs asynchronously, so no
 *  counts are returned (a large data set would make the call slow).
 */
export interface SwapModelOnVariationsResponse {
}
/**
 * Emitted when a tool set sync operation completes successfully.
 */
export interface SyncCompleted {
    /**
     * Number of tools synced.
     */
    toolsSynced: number;
    /**
     * Optional message with additional details.
     */
    message: string;
}
/**
 * Emitted when a tool set sync operation fails.
 */
export interface SyncFailed {
    /**
     * Indicates this is an error event.
     */
    error: boolean;
    /**
     * Error message describing what went wrong.
     */
    message: string;
    /**
     * Optional error type/code for programmatic handling.
     */
    errorType: string;
}
/**
 * Emitted when a tool set sync operation begins.
 */
export interface SyncStarted {
    /**
     * Human-readable message describing the start of the sync.
     */
    message: string;
}
/**
 * The current lifecycle state of the tenant. Output only.
 */
export type TenantState = 'STATE_UNSPECIFIED' | 'STATE_ACTIVE' | 'STATE_ERASING';
/**
 * Tenant is the customer's organization as a readable record rather than an
 *  echo. It carries no spec: a tenant is never configured, only asserted, so
 *  everything about it lives in the metadata envelope — `external_id` is the key
 *  the customer asserted it under, `name` is the most recent name they asserted,
 *  and `updated_at` is therefore when the tenant was last asserted.
 */
export interface Tenant {
    metadata: ResourceMetadata;
    info?: TenantInfo;
    /**
     * The current lifecycle state of the tenant. Output only.
     */
    state: TenantState;
}
/**
 * TenantAssertion identifies a tenant in the customer's own namespace — their
 *  org, company, or team identifier for an end user. Asserting a tenant
 *  upserts the tenant record in the workspace (keyed on `id` as the tenant's
 *  external_id) and associates the created resource with it.
 */
export interface TenantAssertion {
    /**
     * The tenant identifier in the customer's namespace (e.g. "acme-corp").
     *  Stored as the tenant record's external_id; stable across requests.
     */
    id: string;
    /**
     * Optional human-readable name for the tenant. Updates the tenant record's
     *  name on every assertion that provides it.
     */
    name?: string;
}
/**
 * TenantInfo provides read-only server-derived data about a tenant.
 */
export interface TenantInfo {
    /**
     * Number of subjects asserted under this tenant.
     */
    subjectCount: number;
    /**
     * Number of objectives associated with this tenant, across every surface —
     *  widget conversations and objectives created directly against the API
     *  alike. This is the footprint a delete would destroy, which is why it is
     *  worth the count query that populating `info` costs.
     */
    objectiveCount: number;
    /**
     * Number of widget sessions minted for this tenant that still exist.
     */
    widgetSessionCount: number;
}
/**
 * TenantReference is the read-only echo of a resource's tenant association,
 *  carrying both Cadenya's canonical id and the customer's own key.
 */
export interface TenantReference {
    /**
     * Cadenya's canonical tenant id.
     */
    id: string;
    /**
     * The tenant identifier in the customer's namespace, as asserted.
     */
    externalId: string;
    /**
     * Human-readable name of the tenant, when one has been asserted.
     */
    name?: string;
}
/**
 * The current lifecycle state of the tool. Output only. Use the :omit and
 *  :restore actions to transition; tool set syncs may also update it.
 */
export type ToolState = 'STATE_UNSPECIFIED' | 'STATE_AVAILABLE' | 'STATE_OMITTED' | 'STATE_ARCHIVED';
export interface Tool {
    metadata: ResourceMetadata;
    spec: ToolSpec;
    info?: ToolInfo;
    /**
     * The current lifecycle state of the tool. Output only. Use the :omit and
     *  :restore actions to transition; tool set syncs may also update it.
     */
    state: ToolState;
}
export interface ToolApprovalRequested {
    /**
     * The ID of the objective tool call record. Use this ID with the ApproveToolCall or DenyToolCall RPCs to approve or deny the tool call.
     */
    toolCallId: string;
}
export interface ToolApproved {
    /**
     * The ID of the objective tool call record that was approved via the ApproveToolCall RPC.
     */
    toolCallId: string;
}
export interface ToolCalled {
    /**
     * The ID of the objective tool call record that was executed.
     */
    toolCallId: string;
    /**
     * The tool that was called.
     */
    tool?: CallableTool;
    /**
     * The called tool's adapter configuration, including the bare adapter
     *  marker for bare tools. Lets a webhook consumer act on the call (e.g.
     *  detect a bare tool call and prepare to supply its content) without a
     *  round-trip to GetObjectiveToolCall.
     */
    config?: ToolSpec_Config;
    /**
     * The arguments passed to the tool.
     */
    arguments?: Record<string, unknown>;
    /**
     * Whether the runtime authorized this call's arguments to be exposed in
     *  public widget events. This records the resolved policy at call time so
     *  consumers do not need to re-evaluate the tool set's current overlays.
     */
    argumentsExposedInWidgets?: boolean;
}
export interface ToolDenied {
    /**
     * The ID of the objective tool call record that was denied via the DenyToolCall RPC.
     */
    toolCallId: string;
    /**
     * The memo provided by the reviewer when denying the tool call. This is passed to the agent to provide further instructions.
     */
    memo: string;
}
export interface ToolError {
    /**
     * The ID of the objective tool call record that encountered an error during execution.
     */
    toolCallId: string;
    message: string;
}
export interface ToolInfo {
    toolSet?: ResourceMetadata;
    createdBy?: Profile;
    /**
     * Content signature identifying the tool within its tool set: a hash of the
     *  sanitized llm_tool_name, description, and canonical parameters. Two tools
     *  with the same llm_tool_name but different parameters or description (as
     *  MCP servers may return per user) have distinct signatures. Computed over
     *  the raw spec — overlays do not change a tool's signature.
     */
    signature: string;
    /**
     * Keys of the tool set's overlays whose selectors match this tool
     *  (ToolSetSpec.overlays), in evaluation order. Disabled overlays are
     *  excluded. An overlay is listed when its selector matches even if none
     *  of its actions changed this tool's schema (all its paths were absent),
     *  so this answers "which policies apply to this tool" — diff
     *  effective_parameters against spec.parameters for "what changed".
     *  Empty when no overlay applies.
     */
    overlays?: Array<string>;
    /**
     * The parameter schema as presented to the model: spec.parameters after
     *  every matching overlay's parameter actions have been applied, in order,
     *  including maintenance of the schema's `required` list. Actions whose
     *  outcome depends on the objective (pin with ON_MISSING_SKIP) are applied
     *  as if the pinned key were present, so this reflects the intended steady
     *  state rather than any one objective. Equals spec.parameters when no
     *  overlay applies. Result actions have no effect here.
     */
    effectiveParameters?: Record<string, unknown>;
}
/**
 * A tool overlay is a policy attached to a tool set that reshapes the tools
 *  the model sees and calls. It pairs a selector (which tools it applies to)
 *  with actions that run before a call — rewriting the tool's parameter
 *  schema and the arguments the model supplied — and after a call —
 *  rewriting the result before it enters the model's context. It can also
 *  explicitly allow the final call arguments to cross the otherwise-private
 *  widget API boundary.
 *
 *  Overlays exist for three reasons:
 *
 *    - Authority. Adapter-derived tool sets (OpenAPI especially) expose many
 *      parameters the model must never guess — a workspace id, a tenant id,
 *      an account scope. Overlays bind those parameters to the objective's
 *      `pinned_parameters` (see CreateObjectiveRequest.pinned_parameters):
 *      the parameter disappears from the schema and the value is forced
 *      server-side, so the model has no opportunity to supply a different
 *      one.
 *    - Context. Large specs carry pagination cursors, expansion flags and
 *      verbose responses that cost tokens without helping the model.
 *      Overlays strip parameters, fix them to literals, and compact results.
 *    - Widget presentation. Tool arguments are private by default. An overlay
 *      can opt matching tools into exposing their final call arguments in
 *      visitor-facing widget events so an embedding UI can select a custom
 *      renderer or presentation.
 *
 *  Pinned parameters and overlays are complementary: pinned parameters are
 *  *data* supplied per objective (or per widget session) by the caller;
 *  overlays are *policy* authored once on the tool set. Pinning by name
 *  still works without an overlay — a pinned key that matches a top-level
 *  parameter name is applied to every tool in the objective — overlays are
 *  for the cases that needs more: nested paths, renamed keys, a subset of
 *  tools, or values that are literals rather than caller-supplied.
 *
 *  Evaluation model:
 *
 *    - Overlays are evaluated in list order; within an overlay, actions are
 *      evaluated in list order. Later actions win on the same path (a `set`
 *      followed by a `remove` leaves the parameter removed).
 *    - The parameter schema the model sees is computed when tools are
 *      assembled for an objective, so pre-call actions can consult that
 *      objective's pinned parameters (this is what makes `pin` with
 *      ON_MISSING_SKIP meaningful). Argument rewriting runs on every call.
 *    - An action whose `path` does not exist in the tool's parameter schema
 *      changes nothing in the schema the model sees. This is deliberate: a
 *      broad selector (every `list_*` tool) may match tools with different
 *      shapes, and one overlay should be able to cover all of them without
 *      erroring on the ones that lack a given parameter. At call time the
 *      model's arguments can still not widen what it controls: `remove`
 *      strips the path whether or not it is declared, and `set`/`pin`
 *      overwrite a value the model sent at an undeclared path (a schema this
 *      evaluator cannot see through, e.g. behind $ref/allOf) while injecting
 *      nothing into tools that lack the parameter.
 *    - Overlays apply to just-in-time tool sets as well; the tools are
 *      evaluated against overlays at the moment they are loaded.
 *    - Result actions run once, when the tool call's result is recorded; the
 *      stored result is the transformed one, so every reader (the model,
 *      compaction, the API) sees the same content. They are not supported on
 *      bare tool sets.
 */
export interface ToolOverlay {
    /**
     * Identifies the overlay within its tool set. Unique across the tool
     *  set's overlays (enforced by the server), stable across reorders, and
     *  surfaced in tool call diagnostics ("parameter removed by overlay
     *  strip-list-knobs") so an operator can trace a rewritten call back to
     *  the policy that rewrote it. Referenced by ToolInfo.overlays and the
     *  ListToolsRequest.overlays filter.
     */
    key: string;
    /**
     * Which tools this overlay applies to. Required; an empty selector
     *  (no conditions) matches every tool in the set.
     */
    selector: ToolOverlay_Selector;
    /**
     * Pre-call actions, applied in order. See ParameterAction.
     */
    parameterActions?: Array<ToolOverlay_ParameterAction>;
    /**
     * Post-call actions, applied in order. See ResultAction.
     */
    resultActions?: Array<ToolOverlay_ResultAction>;
    /**
     * When true the overlay is retained in the spec but not evaluated. Lets an
     *  operator switch a policy off to diagnose a misbehaving tool without
     *  deleting it and losing the configuration.
     */
    disabled: boolean;
    /**
     * Arguments may carry sensitive customer data, including values injected by
     *  parameter actions, so they stay private unless an overlay enables them.
     *
     *  Unset means this overlay has no opinion. When several enabled overlays
     *  match a tool, they are evaluated in list order and the last overlay that
     *  supplies this policy wins. If none supplies it, arguments stay private.
     *  Disabled overlays never participate.
     */
    widgetArgumentExposure?: ToolOverlay_WidgetArgumentExposure;
}
/**
 * A pre-call action. Parameter actions rewrite the tool's parameter
 *  schema as presented to the model and the arguments the model supplies
 *  when it calls the tool. Both sides are always kept in agreement: a
 *  parameter that is hidden from the schema is also stripped from (or
 *  forced in) the arguments, so the model can neither see nor smuggle it.
 */
export type ToolOverlay_ParameterAction = ToolOverlay_ParameterAction_Remove | ToolOverlay_ParameterAction_Set | ToolOverlay_ParameterAction_Pin;
/**
 * A dotted path into a tool's parameter schema. Each segment is a property
 *  name; the path `filter.workspaceId` addresses
 *  `properties.filter.properties.workspaceId` in the schema and
 *  `arguments.filter.workspaceId` in the call. Only object properties are
 *  addressable — there is no array indexing, wildcarding or filtering.
 *
 *  This is deliberately not JSONPath: every action needs a single,
 *  unambiguous location in both the schema and the arguments so that
 *  removing a parameter from the schema and stripping it from the call are
 *  guaranteed to agree.
 */
export interface ToolOverlay_ParameterPath {
    path: string;
}
/**
 * A post-call action. Result actions rewrite a tool call's result after
 *  the adapter returns and before it is recorded: the transformed content
 *  is what is stored and what the model reads (ObjectiveToolCallResult
 *  content). The adapter's raw response is kept in the tool call's debug
 *  log for operators; it is not otherwise retained.
 *
 *  Result actions apply to MCP, OpenAPI and HTTP tool sets. They are not
 *  supported on bare tool sets — a bare tool's content is supplied by an
 *  external consumer, so there is nothing for the platform to reshape —
 *  and a tool set whose adapter is `bare` rejects overlays that carry
 *  result actions.
 *
 *  When several matching overlays carry transforms they run in overlay
 *  order, each one reading the previous one's output.
 */
export type ToolOverlay_ResultAction = ToolOverlay_ResultAction_Transform;
/**
 * Default: OPERATOR_AND.
 */
export type ToolOverlaySelectorOperator = 'OPERATOR_UNSPECIFIED' | 'OPERATOR_AND' | 'OPERATOR_OR';
/**
 * Which tools in the tool set an overlay applies to. Conditions are
 *  combined with `operator`; an overlay with no conditions matches every
 *  tool in the set.
 */
export interface ToolOverlay_Selector {
    conditions?: Array<Selector_Condition>;
    /**
     * Default: OPERATOR_AND.
     */
    operator: ToolOverlaySelectorOperator;
}
/**
 * Controls whether matching tool calls may expose their final arguments to
 *  visitor-facing widget events. The containing message's presence means the
 *  overlay has an opinion; enabled selects whether that opinion is on or off.
 */
export interface ToolOverlay_WidgetArgumentExposure {
    enabled: boolean;
}
export interface ToolResult {
    toolCallId: string;
    /**
     * The content returned by the tool.
     */
    result: ObjectiveToolCallResult;
}
/**
 * The current lifecycle state of the tool set. Output only. Tool sets are
 *  created STATE_ACTIVE; use the :archive and :unarchive actions to
 *  transition between states.
 */
export type ToolSetState = 'STATE_UNSPECIFIED' | 'STATE_ACTIVE' | 'STATE_ARCHIVED';
export interface ToolSet {
    metadata: ResourceMetadata;
    spec: ToolSetSpec;
    /**
     * Tool set information
     */
    info?: ToolSetInfo;
    /**
     * The current lifecycle state of the tool set. Output only. Tool sets are
     *  created STATE_ACTIVE; use the :archive and :unarchive actions to
     *  transition between states.
     */
    state: ToolSetState;
}
export type ToolSetAdapter = ToolSetAdapter_McpVariant | ToolSetAdapter_HttpVariant | ToolSetAdapter_OpenapiVariant | ToolSetAdapter_BareVariant;
/**
 * Approval filters that will automatically set the approval requirement on tools synced from an external source
 */
export type ToolSetAdapter_ApprovalRequirementFilter = ToolSetAdapter_ApprovalRequirementFilter_Always | ToolSetAdapter_ApprovalRequirementFilter_Only;
export type ToolSetAdapterAttributeFilterAttribute = 'ATTRIBUTE_UNSPECIFIED' | 'ATTRIBUTE_NAME' | 'ATTRIBUTE_TITLE' | 'ATTRIBUTE_DESCRIPTION' | 'ATTRIBUTE_LLM_TOOL_NAME';
/**
 * Single attribute filter
 */
export interface ToolSetAdapter_AttributeFilter {
    attribute: ToolSetAdapterAttributeFilterAttribute;
    matcher?: ToolSetAdapter_StringMatcher;
}
/**
 * Bare tool sets define tools without an execution adapter. A bare tool
 *  call doesn't fire anything: the objective's workflow pauses and waits
 *  for an external API consumer to set the tool call's content (e.g.
 *  human-in-the-loop tools, or a reverse harness that polls for pending
 *  tool calls, executes locally, and reports results back via
 *  SetToolCallContent).
 */
export interface ToolSetAdapter_Bare {
    /**
     * How long to wait for content to be set before the tool call errors.
     *  If unset, the call waits indefinitely.
     */
    contentTimeout?: number;
}
export interface ToolSetAdapter_HTTP {
    /**
     * Base URL for dispatching tool calls.
     *
     *  May be templated. Two reference forms are supported, and they resolve
     *  in a single pass each so neither can inject into the other:
     *
     *    ${SECRET_NAME}                 a workspace or tool set secret
     *    {{ pinned_parameters.<key> }}  the objective's pinned parameters
     *      (see CreateObjectiveRequest.pinned_parameters)
     *
     *  Pinned parameters are what make a per-tenant host possible: one tool
     *  set can serve every customer of a product that assigns each of them
     *  their own subdomain, e.g.
     *
     *    https://{{ pinned_parameters.tenant }}.example.com
     *
     *  Because the value may be a template rather than a literal URL, this
     *  field is not constrained to a URI shape. It is validated as an
     *  absolute http(s) URL after references are resolved, both on write
     *  (with references stubbed) and again before each tool call.
     */
    baseUrl?: string;
    headers?: Record<string, string>;
}
/**
 * Defines behavior for just-in-time capable tool set adapters (IE: MCP).
 */
export interface ToolSetAdapter_JustInTime {
    enabled?: boolean;
    /**
     * If set, an objective will automatically be failed if tools cannot be loaded
     *  in the initial stages of an objective being created. Tools are loaded asynchronously,
     *  so this setting is useful for ensuring that an objective continued any further if tools are not available.
     */
    failObjectiveOnToolListError?: boolean;
}
export interface ToolSetAdapter_MCP {
    url?: string;
    headers?: Record<string, string>;
    /**
     * Include/exclude with flat filters
     */
    includeTools?: ToolSetAdapter_ToolFilter;
    excludeTools?: ToolSetAdapter_ToolFilter;
    /**
     * Setting for how to assign tool approval requirements when they are synced from an MCP server
     */
    toolApprovals?: ToolSetAdapter_ApprovalRequirementFilter;
    /**
     * When enabled, tools are loaded from the MCP server just-in-time at
     *  objective creation using the objective's resolved secrets, instead of
     *  being synced ahead of time. Just-in-time tool sets are excluded from
     *  the background sync system.
     */
    justInTime?: ToolSetAdapter_JustInTime;
}
export type ToolSetAdapter_OpenAPI = ToolSetAdapter_OpenAPI_Url | ToolSetAdapter_OpenAPI_UploadId;
/**
 * String matching operations
 */
export type ToolSetAdapter_StringMatcher = ToolSetAdapter_StringMatcher_Exact | ToolSetAdapter_StringMatcher_StartsWith | ToolSetAdapter_StringMatcher_EndsWith | ToolSetAdapter_StringMatcher_Contains | ToolSetAdapter_StringMatcher_Regex;
export type ToolSetAdapterToolFilterOperator = 'OPERATOR_UNSPECIFIED' | 'OPERATOR_AND' | 'OPERATOR_OR';
/**
 * Top-level filter with simple boolean logic (no nesting)
 */
export interface ToolSetAdapter_ToolFilter {
    filters?: Array<ToolSetAdapter_AttributeFilter>;
    operator: ToolSetAdapterToolFilterOperator;
}
/**
 * A single event in the tool set's operation timeline.
 */
export interface ToolSetEvent {
    /**
     * Metadata for this operation event.
     */
    metadata: OperationMetadata;
    /**
     * The tool set this event is associated with.
     */
    toolSetId: string;
    /**
     * The event payload.
     */
    event: ToolSetEventData;
    info?: ToolSetEventInfo;
}
/**
 * Event payload for a tool set operation.
 */
export type ToolSetEventData = ToolSetEventData_SyncStarted | ToolSetEventData_SyncCompleted | ToolSetEventData_SyncFailed;
export interface ToolSetEventInfo {
    toolSet?: ResourceMetadata;
    createdBy?: Profile;
}
export interface ToolSetInfo {
    toolCount: number;
    agentCount: number;
    lastSync?: string;
    createdBy?: Profile;
    availableTools: number;
    omittedTools: number;
}
export interface ToolSetSecret {
    metadata: ResourceMetadata;
    spec: ToolSetSecretSpec;
    /**
     * Tool set secret information
     */
    info?: ToolSetSecretInfo;
}
export interface ToolSetSecretInfo {
    lastUsedAt?: string;
    createdBy?: Profile;
}
export interface ToolSetSecretSpec {
    value?: string;
}
export interface ToolSetSpec {
    description?: string;
    adapter: ToolSetAdapter;
    /**
     * Overlays applied to this tool set's tools, evaluated in order. See
     *  ToolOverlay. Overlay keys must be unique within the list.
     *
     *  As a repeated field this is replaced wholesale on update: an
     *  update_mask of `spec.overlays` swaps the entire list for the one in the
     *  request. Read-modify-write to add or remove a single overlay.
     */
    overlays?: Array<ToolOverlay>;
}
/**
 * ToolSetUsage describes one agent variation that uses the tool set (or, when
 *  filtering by tool, an individual tool within it).
 */
export interface ToolSetUsage {
    /**
     * Metadata for the agent variation the assignment belongs to.
     */
    agentVariation: ResourceMetadata;
    /**
     * Metadata for the variation's parent agent.
     */
    agent: ResourceMetadata;
    /**
     * Metadata for the model assigned to the variation.
     */
    model: ResourceMetadata;
    /**
     * When the assignment was created.
     */
    assignedAt: string;
}
export interface ToolSpec {
    description: string;
    requiresApproval: boolean;
    /**
     * The tool's JSON Schema, as handed to the LLM. Required, but may be the
     *  empty object `{}` for a tool that takes no arguments. Requiring it rather
     *  than defaulting it means a misspelled field name (`inputSchema`, say) is a
     *  400 instead of a silently parameterless tool.
     */
    parameters: Record<string, unknown>;
    /**
     * Configuration for this specific tool. Transport/Protocol are derived from the tool set adapter, while specifics
     *  such as endpoint, method, etc, are stored on the tool itself.
     *
     *  Required, and exactly one adapter must be set.
     */
    config: ToolSpec_Config;
    /**
     * The name provided to the LLM, which may differ from the metadata.name on the tool.
     *  LLMs have specific length and format requirements, and tool set sources may not comply
     *  with them, so Cadenya does its best to format names into a usable format.
     */
    llmToolName?: string;
}
/**
 * Config defines the adapter to use for the tool.
 *  This is used to determine how the tool is called.
 *  For example, if the tool is an HTTP tool, the adapter will be Http.
 *  If the tool is an inline tool, the adapter will be Inline.
 */
export type ToolSpec_Config = ToolSpec_Config_Http | ToolSpec_Config_Mcp | ToolSpec_Config_Openapi | ToolSpec_Config_Bare;
/**
 * Unarchive agent request
 */
export interface UnarchiveAgentRequest {
    /**
     * Workspace ID.
     */
    workspaceId?: string;
    /**
     * Agent ID. Accepts the canonical `agent_…` form or the `external_id:<value>` form.
     */
    id?: string;
}
/**
 * Unarchive tool set request
 */
export interface UnarchiveToolSetRequest {
    /**
     * Workspace ID.
     */
    workspaceId?: string;
    /**
     * Tool set ID. Accepts the canonical ts_… form or the
     *  external_id:<value> form.
     */
    id?: string;
}
/**
 * Unarchive widget request.
 */
export interface UnarchiveWidgetRequest {
    /**
     * Workspace ID.
     */
    workspaceId?: string;
    /**
     * Widget ID. Accepts the canonical `wgt_…` form or the `external_id:<value>` form.
     */
    id?: string;
}
/**
 * Unpublish agent request
 */
export interface UnpublishAgentRequest {
    /**
     * Workspace ID.
     */
    workspaceId?: string;
    /**
     * Agent ID. Accepts the canonical `agent_…` form or the `external_id:<value>` form.
     */
    id?: string;
}
export interface UpdateAIProviderKeyRequest {
    /**
     * The workspace the key belongs to.
     */
    workspaceId?: string;
    /**
     * The key to update.
     */
    id?: string;
    metadata?: UpdateResourceMetadata;
    spec?: AIProviderKeySpec;
    /**
     * Fields to update.
     */
    updateMask?: string;
}
export interface UpdateAPIKeyRequest {
    /**
     * The workspace the API key belongs to (path).
     */
    workspaceId?: string;
    /**
     * The API key to update.
     */
    id?: string;
    metadata?: UpdateAccountResourceMetadata;
    spec?: APIKeySpec;
    /**
     * Fields to update.
     */
    updateMask?: string;
}
/**
 * UpdateAccountResourceMetadata contains the user-provided fields for updating
 *  an account-scoped resource. Read-only fields (id, account_id, profile_id) are excluded
 *  since they are set by the server.
 */
export interface UpdateAccountResourceMetadata {
    /**
     * Human-readable name for the resource (e.g., "Production API Key", "Staging Workspace")
     */
    name: string;
    /**
     * External ID for the resource (e.g., a workflow ID from an external system)
     */
    externalId?: string;
    /**
     * Key-value pairs for categorization and filtering. Values are 0-63
     *  alphanumeric characters with "-", "_", or "." allowed between; keys
     *  follow the same shape and additionally accept an optional DNS-subdomain
     *  prefix (e.g. "cadenya.com/") of at most 253 characters.
     *  Examples: {"environment": "production", "team": "platform", "version": "v2"}
     */
    labels?: Record<string, string>;
}
/**
 * Update agent request
 */
export interface UpdateAgentRequest {
    /**
     * Workspace ID.
     */
    workspaceId?: string;
    /**
     * Agent ID. Accepts the canonical `agent_…` form or the `external_id:<value>` form.
     */
    id?: string;
    metadata?: UpdateResourceMetadata;
    spec?: AgentSpec;
    /**
     * Fields to update
     */
    updateMask?: string;
}
/**
 * Update agent schedule request.
 */
export interface UpdateAgentScheduleRequest {
    /**
     * Workspace ID.
     */
    workspaceId?: string;
    /**
     * Agent ID. Accepts the canonical `agent_…` form or the `external_id:<value>` form.
     */
    agentId?: string;
    /**
     * Schedule ID. Accepts the canonical `as_…` form or the `external_id:<value>` form.
     */
    id?: string;
    metadata?: UpdateResourceMetadata;
    spec?: AgentScheduleSpec;
    /**
     * Fields to update.
     */
    updateMask?: string;
}
/**
 * Update an existing memory layer assignment. Only `position` is mutable.
 *  A new position that collides with another assignment on the same variation
 *  is rejected with InvalidArgument.
 */
export interface UpdateAgentVariationMemoryLayerRequest {
    /**
     * Workspace ID.
     */
    workspaceId?: string;
    /**
     * Agent ID. Accepts the canonical `agent_…` form or the `external_id:<value>` form.
     */
    agentId?: string;
    /**
     * Variation ID. Accepts the canonical `agentvar_…` form or the `external_id:<value>` form.
     */
    variationId?: string;
    id?: string;
    /**
     * New position. Only field currently updatable on an assignment.
     */
    position?: number;
}
/**
 * Update agent variation request
 */
export interface UpdateAgentVariationRequest {
    /**
     * Workspace ID.
     */
    workspaceId?: string;
    /**
     * Agent ID. Accepts the canonical `agent_…` form or the `external_id:<value>` form.
     */
    agentId?: string;
    /**
     * Variation ID. Accepts the canonical `agentvar_…` form or the `external_id:<value>` form.
     */
    id?: string;
    metadata?: UpdateResourceMetadata;
    spec?: AgentVariationSpec;
    /**
     * Fields to update
     */
    updateMask?: string;
}
export interface UpdateMemoryEntryRequest {
    workspaceId?: string;
    /**
     * Memory layer ID. Accepts canonical memlyr_… form or external_id:<value> form.
     */
    memoryLayerId?: string;
    id?: string;
    metadata?: UpdateResourceMetadata;
    spec?: MemoryEntryUpdateSpec;
    updateMask?: string;
}
export interface UpdateMemoryLayerRequest {
    workspaceId?: string;
    /**
     * Memory layer ID. Accepts canonical memlyr_… form or external_id:<value> form.
     */
    id?: string;
    metadata?: UpdateResourceMetadata;
    spec?: MemoryLayerSpec;
    updateMask?: string;
}
/**
 * UpdateResourceMetadata contains the user-provided fields for updating
 *  a workspace-scoped resource. Read-only fields (id, account_id, workspace_id, profile_id,
 *  created_at) are excluded since they are set by the server.
 */
export interface UpdateResourceMetadata {
    /**
     * Human-readable name for the resource (e.g., "Customer Support Agent", "Email Tool")
     */
    name: string;
    /**
     * External ID for the resource (e.g., a workflow ID from an external system)
     */
    externalId?: string;
    /**
     * Key-value pairs for categorization and filtering. Values are 0-63
     *  alphanumeric characters with "-", "_", or "." allowed between; keys
     *  follow the same shape and additionally accept an optional DNS-subdomain
     *  prefix (e.g. "cadenya.com/") of at most 253 characters.
     *  Examples: {"environment": "production", "team": "platform", "version": "v2"}
     */
    labels?: Record<string, string>;
}
export interface UpdateToolRequest {
    /**
     * Workspace ID.
     */
    workspaceId?: string;
    /**
     * Tool set ID. Accepts the canonical ts_… form or the
     *  external_id:<value> form.
     */
    toolSetId?: string;
    /**
     * Tool ID. Accepts the canonical tool_… form or the
     *  external_id:<value> form.
     */
    id?: string;
    metadata?: UpdateResourceMetadata;
    spec?: ToolSpec;
    updateMask?: string;
}
export interface UpdateToolSetRequest {
    /**
     * Workspace ID.
     */
    workspaceId?: string;
    /**
     * Tool set ID. Accepts the canonical ts_… form or the
     *  external_id:<value> form.
     */
    id?: string;
    metadata?: UpdateResourceMetadata;
    spec?: ToolSetSpec;
    updateMask?: string;
}
export interface UpdateToolSetSecretRequest {
    /**
     * The workspace that owns the tool set.
     */
    workspaceId?: string;
    /**
     * The tool set the secret belongs to. Accepts the canonical ts_… form
     *  or the external_id:<value> form.
     */
    toolSetId?: string;
    /**
     * The secret to update.
     */
    id?: string;
    metadata?: UpdateResourceMetadata;
    spec?: ToolSetSecretSpec;
    /**
     * Fields to update.
     */
    updateMask?: string;
}
/**
 * Update widget request.
 */
export interface UpdateWidgetRequest {
    /**
     * Workspace ID.
     */
    workspaceId?: string;
    /**
     * Widget ID. Accepts the canonical `wgt_…` form or the `external_id:<value>` form.
     */
    id?: string;
    metadata?: UpdateResourceMetadata;
    spec?: WidgetSpec;
    /**
     * Fields to update.
     */
    updateMask?: string;
}
export interface UpdateWorkspaceRequest {
    /**
     * Workspace ID to update (path).
     */
    workspaceId?: string;
    metadata?: UpdateAccountResourceMetadata;
    spec?: WorkspaceSpec;
    /**
     * Fields to update.
     */
    updateMask?: string;
}
export interface UpdateWorkspaceSecretRequest {
    /**
     * The workspace the secret belongs to.
     */
    workspaceId?: string;
    /**
     * The secret to update.
     */
    id?: string;
    metadata?: UpdateResourceMetadata;
    spec?: WorkspaceSecretSpec;
    /**
     * Fields to update.
     */
    updateMask?: string;
}
/**
 * A handle representing a single file upload flow. Clients call CreateUpload
 *  to receive a short-lived presigned URL, PUT the file directly to object
 *  storage, then reference the upload by id when creating or updating
 *  resources that accept binary content.
 *
 *  Uploads are one-shot: once consumed by a creating or updating resource the
 *  upload transitions to UPLOAD_STATUS_CONSUMED and cannot be reused. Unused
 *  uploads expire and are garbage-collected.
 */
export interface Upload {
    metadata: ResourceMetadata;
    spec: UploadSpec;
    info: UploadInfo;
}
/**
 * Lifecycle state. Transitions PENDING → COMPLETE (storage confirms the
 *  object exists) → CONSUMED (a resource referenced this upload), or
 *  → EXPIRED (URL elapsed without a PUT).
 */
export type UploadInfoStatus = 'UPLOAD_STATUS_UNSPECIFIED' | 'UPLOAD_STATUS_PENDING' | 'UPLOAD_STATUS_COMPLETE' | 'UPLOAD_STATUS_CONSUMED' | 'UPLOAD_STATUS_EXPIRED';
export interface UploadInfo {
    /**
     * Presigned PUT URL. Short-lived. The client must PUT with the exact
     *  Content-Type declared in the spec, and the body length must match
     *  size_bytes.
     */
    uploadUrl: string;
    /**
     * Absolute time at which upload_url stops working.
     */
    uploadUrlExpiresAt?: string;
    /**
     * Lifecycle state. Transitions PENDING → COMPLETE (storage confirms the
     *  object exists) → CONSUMED (a resource referenced this upload), or
     *  → EXPIRED (URL elapsed without a PUT).
     */
    status: UploadInfoStatus;
    createdBy?: Profile;
}
export interface UploadSpec {
    /**
     * Client-supplied filename. Used for audit and display only; does not
     *  control the object's storage path.
     */
    filename: string;
    /**
     * MIME type the client will send. Baked into the presigned URL's signature
     *  — the PUT must match exactly or object storage will reject it.
     */
    contentType: string;
    /**
     * Expected size of the upload in bytes. Baked into the presigned URL as a
     *  Content-Length constraint.
     */
    sizeBytes: string;
}
export interface UserMessage {
    content: string;
}
/**
 * A read-only reference to a single tool, tool set, or sub-agent attached to
 *  a variation. Read the full set of assignments via `AgentVariationInfo.assignments`;
 *  mutations go through the dedicated add/remove assignment endpoints.
 *
 *  The `id` identifies the assignment itself (not the referenced resource) and
 *  is the handle used to remove the assignment. It is returned by the add
 *  endpoint and present on every entry in `AgentVariationInfo.assignments`.
 */
export type VariationAssignment = VariationAssignment_Tool | VariationAssignment_ToolSet | VariationAssignment_Agent;
/**
 * VariationMemoryLayerAssignment attaches a single MemoryLayer to a
 *  variation at a given position in the variation's baseline memory
 *  cascade. A variation has at most one assignment per memory_layer_id.
 *
 *  Variations only support whole-layer attachments — entry pinning is an
 *  objective-level capability.
 */
export interface VariationMemoryLayerAssignment {
    /**
     * Assignment row id — handle for removing the assignment. Distinct
     *  from the referenced memory layer's id.
     */
    id: string;
    /**
     * The attached memory layer.
     */
    memoryLayer: BareMetadata;
    /**
     * Position in the variation's baseline cascade. Position is
     *  specificity, CSS-style: a LOWER position is more specific and is
     *  consulted first; the highest-position assignment is the most
     *  general fallback. Gaps are fine — only relative position matters.
     *  Positions must be unique within a variation; a request that would
     *  collide with an existing assignment's position is rejected with
     *  InvalidArgument.
     */
    position: number;
}
export interface WebhookDelivery {
    metadata: OperationMetadata;
    /**
     * Webhook delivery details.
     */
    data: WebhookDeliveryData;
}
export type WebhookDeliveryDataStatus = 'WEBHOOK_DELIVERY_STATUS_UNSPECIFIED' | 'WEBHOOK_DELIVERY_STATUS_PENDING' | 'WEBHOOK_DELIVERY_STATUS_COMPLETED' | 'WEBHOOK_DELIVERY_STATUS_FAILED' | 'WEBHOOK_DELIVERY_STATUS_DISABLED';
/**
 * The type of objective event that triggered this webhook delivery
 */
export type WebhookDeliveryDataEventType = 'OBJECTIVE_EVENT_TYPE_UNSPECIFIED' | 'OBJECTIVE_EVENT_TYPE_USER_MESSAGE' | 'OBJECTIVE_EVENT_TYPE_TOOL_APPROVAL_REQUESTED' | 'OBJECTIVE_EVENT_TYPE_TOOL_APPROVED' | 'OBJECTIVE_EVENT_TYPE_TOOL_DENIED' | 'OBJECTIVE_EVENT_TYPE_TOOL_CALLED' | 'OBJECTIVE_EVENT_TYPE_ERROR' | 'OBJECTIVE_EVENT_TYPE_ASSISTANT_MESSAGE' | 'OBJECTIVE_EVENT_TYPE_TOOL_RESULT' | 'OBJECTIVE_EVENT_TYPE_TOOL_ERROR' | 'OBJECTIVE_EVENT_TYPE_CONTEXT_WINDOW_COMPACTED' | 'OBJECTIVE_EVENT_TYPE_MEMORY_READ' | 'OBJECTIVE_EVENT_TYPE_CANCELLED' | 'OBJECTIVE_EVENT_TYPE_SUB_AGENT_SPAWNED' | 'OBJECTIVE_EVENT_TYPE_SUB_AGENT_UPDATED' | 'OBJECTIVE_EVENT_TYPE_FINALIZED' | 'OBJECTIVE_EVENT_TYPE_NOTICE' | 'OBJECTIVE_EVENT_TYPE_TIMED_OUT' | 'OBJECTIVE_EVENT_TYPE_REASONING';
export interface WebhookDeliveryData {
    /**
     * Related resources
     */
    agentId: string;
    objectiveId: string;
    objectiveEventId: string;
    /**
     * Webhook delivery details
     */
    webhookUrl: string;
    webhookId: string;
    status: WebhookDeliveryDataStatus;
    attemptCount: number;
    lastAttemptAt: string;
    /**
     * Response details. The response body is not retained.
     */
    httpStatusCode: number;
    errorMessage: string;
    latencyMs: number;
    /**
     * The type of objective event that triggered this webhook delivery
     */
    eventType: WebhookDeliveryDataEventType;
    /**
     * Response headers received from the webhook endpoint
     */
    responseHeaders: Record<string, string>;
    /**
     * Content length of the response body in bytes
     */
    responseContentLength: string;
}
/**
 * The current lifecycle state of the widget. Output only. Widgets are
 *  created STATE_ACTIVE; use the :archive and :unarchive actions to
 *  transition between states.
 */
export type WidgetState = 'STATE_UNSPECIFIED' | 'STATE_ACTIVE' | 'STATE_ARCHIVED';
/**
 * Widget is an embeddable chat surface bound to a single agent. Each widget
 *  owns a globally unique, immutable DNS label under the widgets domain
 *  (e.g. "k7m2xq9fp4wn.widgets.cadenya.com"): one widget = one hostname = one
 *  origin allowlist = one agent binding. Browsers talk to the widget host with
 *  session bearer tokens minted server-side via WidgetSessionService.
 */
export interface Widget {
    metadata: ResourceMetadata;
    spec: WidgetSpec;
    info?: WidgetInfo;
    /**
     * The current lifecycle state of the widget. Output only. Widgets are
     *  created STATE_ACTIVE; use the :archive and :unarchive actions to
     *  transition between states.
     */
    state: WidgetState;
}
/**
 * WidgetInfo provides read-only server-derived data about a widget.
 */
export interface WidgetInfo {
    /**
     * The widget's DNS label — the single hostname label under the widgets
     *  domain. Server-generated at creation, globally unique, immutable, and
     *  deliberately unrelated to the widget's id.
     */
    dnsLabel: string;
    /**
     * The full hostname browsers talk to. Authoritative — clients must use this
     *  value rather than constructing the hostname themselves.
     */
    host: string;
    /**
     * The agent this widget is bound to.
     */
    agent: BareMetadata;
    createdBy?: Profile;
}
/**
 * The current lifecycle state of the session. Output only. Sessions are
 *  created STATE_ACTIVE; use :revoke to end one early.
 */
export type WidgetSessionState = 'STATE_UNSPECIFIED' | 'STATE_ACTIVE' | 'STATE_EXPIRED' | 'STATE_REVOKED' | 'STATE_EXHAUSTED';
/**
 * WidgetSession is a delegated, narrowed credential for one visitor's use of
 *  a widget, minted server-to-server by the customer's backend. The session
 *  carries all customer-asserted context — tenant, subject, labels, secrets —
 *  and every conversation (objective) created through the widget inherits it.
 *  The bearer token returned at mint is short-lived and refreshed at the
 *  widget host; the session row is what makes revocation possible.
 */
export interface WidgetSession {
    metadata: OperationMetadata;
    spec: WidgetSessionSpec;
    info?: WidgetSessionInfo;
    /**
     * The current lifecycle state of the session. Output only. Sessions are
     *  created STATE_ACTIVE; use :revoke to end one early.
     */
    state: WidgetSessionState;
    /**
     * Names of the secrets attached to the session. Values are write-only:
     *  provided at creation, encrypted at rest, and interpolated into tool-call
     *  headers server-side — never returned by any API.
     */
    secrets: Array<WidgetSession_Secret>;
}
/**
 * WidgetSessionInfo provides read-only server-derived data about a session.
 */
export interface WidgetSessionInfo {
    /**
     * The widget this session belongs to.
     */
    widget: BareMetadata;
    /**
     * The agent serving this session. Copied from the widget at mint and
     *  immutable for the session's lifetime — re-pointing the widget's agent
     *  affects new sessions only.
     */
    agent: BareMetadata;
    /**
     * The resolved tenant record, when a tenant was asserted at mint.
     */
    tenant?: TenantReference;
    /**
     * The resolved subject record, when a subject was asserted at mint.
     */
    subject?: SubjectReference;
    /**
     * The widget hostname this session's tokens are bound to. Authoritative —
     *  clients must use this value rather than constructing the hostname.
     */
    host: string;
    /**
     * Number of conversation messages created through this session, counted
     *  against the session's message cap.
     */
    messageCount: number;
    /**
     * When the session last created a conversation, sent a message, or
     *  refreshed a token.
     */
    lastActiveAt?: string;
}
/**
 * WidgetSessionSpec is the configuration of a session, fixed at mint.
 */
export interface WidgetSessionSpec {
    /**
     * Widget this session is minted against. Accepts the canonical `wgt_…` form
     *  or the `external_id:<value>` form.
     */
    widgetId: string;
    /**
     * Optional tenant assertion — the customer's org/company identifier for the
     *  visitor. Upserts the tenant record in the workspace and tags the session
     *  and every conversation it creates. Conversation listing at the widget
     *  host is scoped to this tenant.
     */
    tenant?: TenantAssertion;
    /**
     * Optional subject assertion — the visitor within the tenant (e.g. their
     *  user id in the customer's namespace). Requires `tenant`; a subject
     *  asserted without a tenant is rejected with InvalidArgument.
     */
    subject?: SubjectAssertion;
    /**
     * Hard session expiry. Tokens never outlive it; after it passes the session
     *  transitions to STATE_EXPIRED. Defaults to a server-chosen horizon when
     *  unset.
     */
    expiresAt?: string;
    /**
     * The session bearer token. Returned only on creation — subsequent reads
     *  omit it. The token is short-lived; the widget refreshes it at the widget
     *  host without involving the customer's backend.
     */
    token: string;
    /**
     * Expiry of the token returned in `token`. Distinct from `expires_at`,
     *  which bounds the session itself.
     */
    tokenExpiresAt?: string;
    /**
     * Parameters forced onto tool calls made by this session's conversations.
     *  A pinned parameter is removed from the tool schema the LLM sees, and its
     *  value is always overwritten server-side with the pinned value — so the
     *  model cannot be tricked into calling a tool with a different id than the
     *  one the session was minted for (e.g. pin "workspaceId" for an OpenAPI
     *  tool with a /workspaces/{workspaceId} path). Flows to every objective
     *  the session creates. See ToolSetSpec.overlays for binding pinned keys to
     *  nested or differently named parameters.
     */
    pinnedParameters?: Record<string, string>;
}
/**
 * Secret is the name-only echo of a secret attached to the session. Values
 *  are never returned.
 */
export interface WidgetSession_Secret {
    name: string;
}
/**
 * WidgetSpec is the user-provided configuration for a widget.
 */
export interface WidgetSpec {
    /**
     * Agent this widget is bound to. Accepts the canonical `agent_…` form or the
     *  `external_id:<value>` form. Sessions copy the agent at mint: re-pointing a
     *  widget's agent affects new sessions only.
     */
    agentId: string;
    /**
     * Optional explicit variation pin. Must belong to the widget's agent. When
     *  set, every objective created through the widget runs this variation —
     *  bypassing the agent's variation_selection_mode (staged rollout: pin in
     *  production, follow in staging, promote by clearing). When unset, the
     *  agent's selection mode chooses per conversation.
     */
    variationId?: string;
    /**
     * Web origins allowed to embed and use this widget, enforced at the edge on
     *  every browser request. Exact origins only (scheme + host + optional
     *  port), no paths, no wildcard subdomains.
     */
    originAllowlist?: Array<string>;
}
/**
 * Lifecycle status of the workspace. Archived workspaces reject all
 *  requests scoped to them. Server-populated.
 */
export type WorkspaceStatus = 'STATUS_ENABLED' | 'STATUS_DISABLED' | 'STATUS_ARCHIVED';
export interface Workspace {
    metadata: AccountResourceMetadata;
    spec: WorkspaceSpec;
    /**
     * Lifecycle status of the workspace. Archived workspaces reject all
     *  requests scoped to them. Server-populated.
     */
    status: WorkspaceStatus;
    /**
     * The workspace information
     */
    info?: WorkspaceInfo;
}
/**
 * WorkspaceInfo returns counts
 */
export interface WorkspaceInfo {
    totalAvailableTools: number;
    totalMemoryEntries: number;
    totalAgents: number;
    totalAgentVariations: number;
}
/**
 * A member of a workspace: the profile granted access plus the actor row that
 *  links it to the workspace. Returned by member list/add operations.
 */
export interface WorkspaceMember {
    /**
     * The account profile that has access to the workspace.
     */
    profileId: string;
    /**
     * The actor row linking the profile to the workspace (the junction record).
     */
    actorId: string;
    /**
     * Display name of the member's profile.
     */
    name: string;
    /**
     * Email address of the member's profile.
     */
    email: string;
    /**
     * When the member was added to the workspace.
     */
    addedAt?: string;
}
export interface WorkspaceSecret {
    metadata: ResourceMetadata;
    spec: WorkspaceSecretSpec;
    /**
     * Workspace secret information
     */
    info?: WorkspaceSecretInfo;
}
export interface WorkspaceSecretInfo {
    lastUsedAt?: string;
    createdBy?: Profile;
}
export interface WorkspaceSecretSpec {
    value?: string;
}
export interface WorkspaceSpec {
    description?: string;
}
/**
 * The webhook data payload with flat top-level keys for agent, variation, objective, and event.
 */
export interface ObjectiveEventWebhookDataData {
    agent: ResourceMetadata;
    agentVariation: ResourceMetadata;
    objective: OperationMetadata;
    objectiveEvent: ObjectiveEvent;
}
/**
 * The envelope for an objective event webhook delivery. Contains timestamp, event type, and the webhook data payload.
 */
export interface ObjectiveEventWebhookData {
    /**
     * The event type, prefixed with objective_event. (e.g., objective_event.tool_result)
     */
    type: string;
    timestamp: string;
    /**
     * The webhook data payload with flat top-level keys for agent, variation, objective, and event.
     */
    data: ObjectiveEventWebhookDataData;
}
export interface VariationAssignment_Tool {
    type: 'tool';
    tool: BareMetadata;
    id: string;
}
export interface VariationAssignment_ToolSet {
    type: 'toolSet';
    toolSet: BareMetadata;
    id: string;
}
export interface VariationAssignment_Agent {
    type: 'agent';
    agent: BareMetadata;
    id: string;
}
export interface ObjectiveToolCallResult_ContentBlock_Text {
    type: 'text';
    text: ObjectiveToolCallResult_TextBlock;
}
export interface ObjectiveToolCallResult_ContentBlock_Image {
    type: 'image';
    image: ObjectiveToolCallResult_ImageBlock;
}
export interface ObjectiveToolCallResult_ContentBlock_Audio {
    type: 'audio';
    audio: ObjectiveToolCallResult_AudioBlock;
}
export interface ToolSetEventData_SyncStarted {
    type: 'syncStarted';
    syncStarted: SyncStarted;
}
export interface ToolSetEventData_SyncCompleted {
    type: 'syncCompleted';
    syncCompleted: SyncCompleted;
}
export interface ToolSetEventData_SyncFailed {
    type: 'syncFailed';
    syncFailed: SyncFailed;
}
export interface ToolSetAdapter_McpVariant {
    type: 'mcp';
    mcp: ToolSetAdapter_MCP;
}
export interface ToolSetAdapter_HttpVariant {
    type: 'http';
    http: ToolSetAdapter_HTTP;
}
export interface ToolSetAdapter_OpenapiVariant {
    type: 'openapi';
    openapi: ToolSetAdapter_OpenAPI;
}
export interface ToolSetAdapter_BareVariant {
    type: 'bare';
    bare: ToolSetAdapter_Bare;
}
export interface ToolSetAdapter_StringMatcher_Exact {
    type: 'exact';
    exact: string;
    caseSensitive?: boolean;
}
export interface ToolSetAdapter_StringMatcher_StartsWith {
    type: 'startsWith';
    startsWith: string;
    caseSensitive?: boolean;
}
export interface ToolSetAdapter_StringMatcher_EndsWith {
    type: 'endsWith';
    endsWith: string;
    caseSensitive?: boolean;
}
export interface ToolSetAdapter_StringMatcher_Contains {
    type: 'contains';
    contains: string;
    caseSensitive?: boolean;
}
export interface ToolSetAdapter_StringMatcher_Regex {
    type: 'regex';
    regex: string;
    caseSensitive?: boolean;
}
export interface ToolSetAdapter_ApprovalRequirementFilter_Always {
    type: 'always';
    always: boolean;
}
export interface ToolSetAdapter_ApprovalRequirementFilter_Only {
    type: 'only';
    only: ToolSetAdapter_ToolFilter;
}
export interface ToolSetAdapter_OpenAPI_Url {
    type: 'url';
    /**
     * URL to fetch the OpenAPI spec from. Synced automatically every hour.
     */
    url: string;
    /**
     * Headers sent when fetching the spec from a URL and when dispatching tool calls.
     */
    headers?: Record<string, string>;
    includeTools?: ToolSetAdapter_ToolFilter;
    excludeTools?: ToolSetAdapter_ToolFilter;
    toolApprovals?: ToolSetAdapter_ApprovalRequirementFilter;
    /**
     * Base URL for dispatching tool calls. If set, overrides the server
     *  resolved from the spec's servers array.
     *
     *  May be templated with the same two reference forms the HTTP adapter's
     *  base_url accepts:
     *
     *    ${SECRET_NAME}                 a workspace or tool set secret
     *    {{ pinned_parameters.<key> }}  the objective's pinned parameters
     *
     *  A spec written against a single host can therefore be dispatched to a
     *  per-tenant one, e.g. https://{{ pinned_parameters.tenant }}.example.com,
     *  without cloning the tool set per customer. Validated as an absolute
     *  http(s) URL after references are resolved rather than as a literal URI.
     */
    baseUrl?: string;
    /**
     * Name of the server entry in the spec's servers array (OpenAPI 3.2
     *  server.name field). Used to select which server URL to dispatch to
     *  when base_url is not set. If unset, the first server is used.
     *  Ignored when base_url is set.
     */
    serverName?: string;
}
export interface ToolSetAdapter_OpenAPI_UploadId {
    type: 'uploadId';
    /**
     * ID of a COMPLETE Upload containing the OpenAPI spec document.
     */
    uploadId: string;
    /**
     * Headers sent when fetching the spec from a URL and when dispatching tool calls.
     */
    headers?: Record<string, string>;
    includeTools?: ToolSetAdapter_ToolFilter;
    excludeTools?: ToolSetAdapter_ToolFilter;
    toolApprovals?: ToolSetAdapter_ApprovalRequirementFilter;
    /**
     * Base URL for dispatching tool calls. If set, overrides the server
     *  resolved from the spec's servers array.
     *
     *  May be templated with the same two reference forms the HTTP adapter's
     *  base_url accepts:
     *
     *    ${SECRET_NAME}                 a workspace or tool set secret
     *    {{ pinned_parameters.<key> }}  the objective's pinned parameters
     *
     *  A spec written against a single host can therefore be dispatched to a
     *  per-tenant one, e.g. https://{{ pinned_parameters.tenant }}.example.com,
     *  without cloning the tool set per customer. Validated as an absolute
     *  http(s) URL after references are resolved rather than as a literal URI.
     */
    baseUrl?: string;
    /**
     * Name of the server entry in the spec's servers array (OpenAPI 3.2
     *  server.name field). Used to select which server URL to dispatch to
     *  when base_url is not set. If unset, the first server is used.
     *  Ignored when base_url is set.
     */
    serverName?: string;
}
export interface Selector_Condition_Attribute {
    type: 'attribute';
    /**
     * Match on a tool attribute (name, title, description,
     *  llm_tool_name) with a string matcher — the same filter used by
     *  the adapter's include/exclude lists.
     */
    attribute: ToolSetAdapter_AttributeFilter;
}
export interface Selector_Condition_HasParameter {
    type: 'hasParameter';
    /**
     * Match tools whose parameter schema contains the given path. This
     *  is the usual way to target "every tool that takes a workspaceId"
     *  without enumerating tools by name.
     */
    hasParameter: ToolOverlay_ParameterPath;
}
export interface Selector_Condition_Tools {
    type: 'tools';
    /**
     * Match specific tools by LLM tool name. The direct way to assign an
     *  overlay to one tool (or a handful) without writing a matcher.
     */
    tools: Selector_ToolNames;
}
export interface ToolOverlay_ParameterAction_Remove {
    type: 'remove';
    remove: ParameterAction_Remove;
}
export interface ToolOverlay_ParameterAction_Set {
    type: 'set';
    set: ParameterAction_Set;
}
export interface ToolOverlay_ParameterAction_Pin {
    type: 'pin';
    pin: ParameterAction_Pin;
}
export interface ToolOverlay_ResultAction_Transform {
    type: 'transform';
    transform: ResultAction_Transform;
}
export interface ToolSpec_Config_Http {
    type: 'http';
    http: Config_HTTP;
}
export interface ToolSpec_Config_Mcp {
    type: 'mcp';
    mcp: Config_MCP;
}
export interface ToolSpec_Config_Openapi {
    type: 'openapi';
    openapi: Config_OpenAPI;
}
export interface ToolSpec_Config_Bare {
    type: 'bare';
    bare: Config_Bare;
}
export interface ObjectiveEventData_UserMessage {
    type: 'userMessage';
    userMessage: UserMessage;
}
export interface ObjectiveEventData_ToolApprovalRequested {
    type: 'toolApprovalRequested';
    toolApprovalRequested: ToolApprovalRequested;
}
export interface ObjectiveEventData_ToolApproved {
    type: 'toolApproved';
    toolApproved: ToolApproved;
}
export interface ObjectiveEventData_ToolDenied {
    type: 'toolDenied';
    toolDenied: ToolDenied;
}
export interface ObjectiveEventData_ToolCalled {
    type: 'toolCalled';
    toolCalled: ToolCalled;
}
export interface ObjectiveEventData_Error {
    type: 'error';
    error: ObjectiveError;
}
export interface ObjectiveEventData_AssistantMessage {
    type: 'assistantMessage';
    assistantMessage: AssistantMessage;
}
export interface ObjectiveEventData_ToolResult {
    type: 'toolResult';
    toolResult: ToolResult;
}
export interface ObjectiveEventData_ToolError {
    type: 'toolError';
    toolError: ToolError;
}
export interface ObjectiveEventData_ContextWindowCompacted {
    type: 'contextWindowCompacted';
    contextWindowCompacted: ContextWindowCompacted;
}
export interface ObjectiveEventData_MemoryRead {
    type: 'memoryRead';
    memoryRead: MemoryRead;
}
export interface ObjectiveEventData_Cancelled {
    type: 'cancelled';
    cancelled: ObjectiveCancelled;
}
export interface ObjectiveEventData_SubAgentSpawned {
    type: 'subAgentSpawned';
    subAgentSpawned: SubAgentSpawned;
}
export interface ObjectiveEventData_SubAgentUpdated {
    type: 'subAgentUpdated';
    subAgentUpdated: SubAgentUpdated;
}
export interface ObjectiveEventData_Finalized {
    type: 'finalized';
    finalized: ObjectiveFinalized;
}
export interface ObjectiveEventData_Notice {
    type: 'notice';
    notice: Notice;
}
export interface ObjectiveEventData_TimedOut {
    type: 'timedOut';
    timedOut: ObjectiveTimedOut;
}
export interface ObjectiveEventData_Reasoning {
    type: 'reasoning';
    reasoning: Reasoning;
}
export interface CallableTool_Tool {
    type: 'tool';
    tool: ResourceMetadata;
}
export interface CallableTool_Agent {
    type: 'agent';
    agent: ResourceMetadata;
}
export interface CallableTool_CadenyaProvidedTool {
    type: 'cadenyaProvidedTool';
    cadenyaProvidedTool: ResourceMetadata;
}
export interface MemoryEntryCreateSpec_Content {
    type: 'content';
    /**
     * Inline content, written directly into the entry.
     */
    content: string;
    /**
     * See MemoryEntrySpec.key for the full rule set. Same constraints apply
     *  here.
     */
    key: string;
    description?: string;
}
export interface MemoryEntryCreateSpec_UploadId {
    type: 'uploadId';
    /**
     * ID of a COMPLETE Upload. The server reads the object from storage,
     *  copies its bytes into the entry, and marks the upload consumed.
     */
    uploadId: string;
    /**
     * See MemoryEntrySpec.key for the full rule set. Same constraints apply
     *  here.
     */
    key: string;
    description?: string;
}
export interface SetToolCallContentRequest_ContentBlock_Text {
    type: 'text';
    text: SetToolCallContentRequest_TextBlock;
}
export interface SetToolCallContentRequest_ContentBlock_Image {
    type: 'image';
    image: SetToolCallContentRequest_ImageBlock;
}
export interface SetToolCallContentRequest_ContentBlock_Audio {
    type: 'audio';
    audio: SetToolCallContentRequest_AudioBlock;
}
export interface AddAgentVariationAssignmentRequest_ToolId {
    type: 'toolId';
    toolId: string;
    /**
     * Workspace ID.
     */
    workspaceId?: string;
    /**
     * Agent ID. Accepts the canonical `agent_…` form or the `external_id:<value>` form.
     */
    agentId?: string;
    /**
     * Variation ID. Accepts the canonical `agentvar_…` form or the `external_id:<value>` form.
     */
    variationId?: string;
}
export interface AddAgentVariationAssignmentRequest_ToolSetId {
    type: 'toolSetId';
    toolSetId: string;
    /**
     * Workspace ID.
     */
    workspaceId?: string;
    /**
     * Agent ID. Accepts the canonical `agent_…` form or the `external_id:<value>` form.
     */
    agentId?: string;
    /**
     * Variation ID. Accepts the canonical `agentvar_…` form or the `external_id:<value>` form.
     */
    variationId?: string;
}
export interface AddAgentVariationAssignmentRequest_SubAgentId {
    type: 'subAgentId';
    subAgentId: string;
    /**
     * Workspace ID.
     */
    workspaceId?: string;
    /**
     * Agent ID. Accepts the canonical `agent_…` form or the `external_id:<value>` form.
     */
    agentId?: string;
    /**
     * Variation ID. Accepts the canonical `agentvar_…` form or the `external_id:<value>` form.
     */
    variationId?: string;
}
export interface AIProviderCredential_ApiKey {
    type: 'apiKey';
    /**
     * Single API key (OpenRouter, OpenAI, Anthropic, Gemini, and most others).
     */
    apiKey: CredentialAPIKey;
}
export interface AIProviderCredential_Headers {
    type: 'headers';
    /**
     * Arbitrary auth headers, for generic endpoints that authenticate with a
     *  custom header rather than a bearer key (pairs with the OpenAI-compatible
     *  provider).
     */
    headers: CredentialHeaders;
}
export interface AIProviderConfig_Openrouter {
    type: 'openrouter';
    openrouter: OpenRouterConfig;
}
export interface AIProviderConfig_Openai {
    type: 'openai';
    openai: OpenAIConfig;
}
export interface AIProviderConfig_OpenaiCompatible {
    type: 'openaiCompatible';
    openaiCompatible: OpenAICompatibleConfig;
}
export interface ModelSpec_Capability_Temperature {
    type: 'temperature';
    temperature: Capability_Temperature;
}
export interface ModelSpec_Capability_TopP {
    type: 'topP';
    topP: Capability_TopP;
}
export interface ModelSpec_Capability_TopK {
    type: 'topK';
    topK: Capability_TopK;
}
export interface ModelSpec_Capability_StopSequences {
    type: 'stopSequences';
    stopSequences: Capability_StopSequences;
}
export interface ModelSpec_Capability_MaxOutputTokens {
    type: 'maxOutputTokens';
    maxOutputTokens: Capability_MaxOutputTokens;
}
export interface ModelSpec_Capability_Reasoning {
    type: 'reasoning';
    reasoning: Capability_Reasoning;
}
export interface ModelSpec_Capability_Caching {
    type: 'caching';
    caching: Capability_Caching;
}
export type AgentServiceListAgentsState = 'STATE_UNSPECIFIED' | 'STATE_DRAFT' | 'STATE_PUBLISHED' | 'STATE_ARCHIVED';
export type AgentServiceListAgentsVariationSelectionMode = 'VARIATION_SELECTION_MODE_UNSPECIFIED' | 'VARIATION_SELECTION_MODE_RANDOM' | 'VARIATION_SELECTION_MODE_WEIGHTED';
export type AgentServiceListAgentFeedbackSentiment = 'FEEDBACK_SENTIMENT_UNSPECIFIED' | 'FEEDBACK_SENTIMENT_POSITIVE' | 'FEEDBACK_SENTIMENT_NEGATIVE';
export type AgentServiceListAgentWebhookDeliveriesEventType = 'OBJECTIVE_EVENT_TYPE_UNSPECIFIED' | 'OBJECTIVE_EVENT_TYPE_USER_MESSAGE' | 'OBJECTIVE_EVENT_TYPE_TOOL_APPROVAL_REQUESTED' | 'OBJECTIVE_EVENT_TYPE_TOOL_APPROVED' | 'OBJECTIVE_EVENT_TYPE_TOOL_DENIED' | 'OBJECTIVE_EVENT_TYPE_TOOL_CALLED' | 'OBJECTIVE_EVENT_TYPE_ERROR' | 'OBJECTIVE_EVENT_TYPE_ASSISTANT_MESSAGE' | 'OBJECTIVE_EVENT_TYPE_TOOL_RESULT' | 'OBJECTIVE_EVENT_TYPE_TOOL_ERROR' | 'OBJECTIVE_EVENT_TYPE_CONTEXT_WINDOW_COMPACTED' | 'OBJECTIVE_EVENT_TYPE_MEMORY_READ' | 'OBJECTIVE_EVENT_TYPE_CANCELLED' | 'OBJECTIVE_EVENT_TYPE_SUB_AGENT_SPAWNED' | 'OBJECTIVE_EVENT_TYPE_SUB_AGENT_UPDATED' | 'OBJECTIVE_EVENT_TYPE_FINALIZED' | 'OBJECTIVE_EVENT_TYPE_NOTICE' | 'OBJECTIVE_EVENT_TYPE_TIMED_OUT' | 'OBJECTIVE_EVENT_TYPE_REASONING';
export type MemoryServiceListMemoryLayersType = 'MEMORY_LAYER_TYPE_UNSPECIFIED' | 'MEMORY_LAYER_TYPE_EPISODIC' | 'MEMORY_LAYER_TYPE_SKILLS';
export type ModelServiceListModelsState = 'STATE_UNSPECIFIED' | 'STATE_ENABLED' | 'STATE_DISABLED';
export type ObjectiveServiceListObjectivesState = 'STATE_UNSPECIFIED' | 'STATE_PENDING' | 'STATE_RUNNING' | 'STATE_WAITING' | 'STATE_FAILED' | 'STATE_CANCELLED' | 'STATE_FINALIZED' | 'STATE_TIMED_OUT';
export type ObjectiveServiceListObjectiveToolCallsStatus = 'TOOL_CALL_STATUS_UNSPECIFIED' | 'TOOL_CALL_STATUS_AUTO_APPROVED' | 'TOOL_CALL_STATUS_WAITING_FOR_APPROVAL' | 'TOOL_CALL_STATUS_APPROVED' | 'TOOL_CALL_STATUS_DENIED';
export type ObjectiveServiceListObjectiveToolCallsExecutionStatus = 'TOOL_CALL_EXECUTION_STATUS_UNSPECIFIED' | 'TOOL_CALL_EXECUTION_STATUS_PENDING' | 'TOOL_CALL_EXECUTION_STATUS_RUNNING' | 'TOOL_CALL_EXECUTION_STATUS_COMPLETED' | 'TOOL_CALL_EXECUTION_STATUS_ERRORED' | 'TOOL_CALL_EXECUTION_STATUS_WAITING_FOR_CONTENT';
export type ToolServiceListToolSetsState = 'STATE_UNSPECIFIED' | 'STATE_ACTIVE' | 'STATE_ARCHIVED';
export type ToolServiceListToolsStates = 'STATE_UNSPECIFIED' | 'STATE_AVAILABLE' | 'STATE_OMITTED' | 'STATE_ARCHIVED';
export type WidgetSessionServiceListWidgetSessionsState = 'STATE_UNSPECIFIED' | 'STATE_ACTIVE' | 'STATE_EXPIRED' | 'STATE_REVOKED' | 'STATE_EXHAUSTED';
export interface APIKeySpecParam {
    /**
     * Free-form description of what this API key is used for.
     */
    description?: string;
    /**
     * Scopes granted to this key. Each entry is a colon-separated
     *  resource:verb string (e.g. "objectives:manage").
     *
     *  Resources: agents, objectives, tools, memory, api_keys, workspaces,
     *  widgets, widget_sessions, secrets, account.
     *  Verbs: read and manage, where manage implies read — a stored scope set
     *  is normalized to drop "x:read" when "x:manage" is present. The secrets
     *  and account resources support only manage. "*" is an explicit
     *  full-access grant.
     *
     *  Scopes are deny-by-default: a key with an empty list can call only
     *  scope-free endpoints. Full access is always an explicit "*" grant.
     */
    permissions?: Array<string>;
}
export type AddAgentVariationAssignmentRequestParam = AddAgentVariationAssignmentRequest_ToolIdParam | AddAgentVariationAssignmentRequest_ToolSetIdParam | AddAgentVariationAssignmentRequest_SubAgentIdParam;
export interface CreateAgentVariationRequestParam {
    metadata: CreateResourceMetadata;
    spec: AgentVariationSpec;
}
export interface MemoryLayerSpecParam {
    type: MemoryLayerSpecType;
    /**
     * Human-readable description of the layer's purpose. Encouraged for
     *  user-created layers; system-managed layers may have a generated description.
     */
    description?: string;
}
export interface ObjectiveEpisodicConfigParam {
    /**
     * The caller-supplied episodic key. Objectives created with the same key
     *  (for the same agent) share one episodic memory layer.
     */
    key: string;
}
export interface WidgetSessionSpecParam {
    /**
     * Widget this session is minted against. Accepts the canonical `wgt_…` form
     *  or the `external_id:<value>` form.
     */
    widgetId: string;
    /**
     * Optional tenant assertion — the customer's org/company identifier for the
     *  visitor. Upserts the tenant record in the workspace and tags the session
     *  and every conversation it creates. Conversation listing at the widget
     *  host is scoped to this tenant.
     */
    tenant?: TenantAssertion;
    /**
     * Optional subject assertion — the visitor within the tenant (e.g. their
     *  user id in the customer's namespace). Requires `tenant`; a subject
     *  asserted without a tenant is rejected with InvalidArgument.
     */
    subject?: SubjectAssertion;
    /**
     * Hard session expiry. Tokens never outlive it; after it passes the session
     *  transitions to STATE_EXPIRED. Defaults to a server-chosen horizon when
     *  unset.
     */
    expiresAt?: string;
    /**
     * Parameters forced onto tool calls made by this session's conversations.
     *  A pinned parameter is removed from the tool schema the LLM sees, and its
     *  value is always overwritten server-side with the pinned value — so the
     *  model cannot be tricked into calling a tool with a different id than the
     *  one the session was minted for (e.g. pin "workspaceId" for an OpenAPI
     *  tool with a /workspaces/{workspaceId} path). Flows to every objective
     *  the session creates. See ToolSetSpec.overlays for binding pinned keys to
     *  nested or differently named parameters.
     */
    pinnedParameters?: Record<string, string>;
}
export interface AddAgentVariationAssignmentRequest_ToolIdParam {
    type: 'toolId';
    toolId: string;
}
export interface AddAgentVariationAssignmentRequest_ToolSetIdParam {
    type: 'toolSetId';
    toolSetId: string;
}
export interface AddAgentVariationAssignmentRequest_SubAgentIdParam {
    type: 'subAgentId';
    subAgentId: string;
}
export declare function wireArray<T>(value: Array<T> | null | undefined, fn: (v: T) => unknown): unknown;
export declare function wireMap<T>(value: Record<string, T> | null | undefined, fn: (v: T) => unknown): unknown;
export declare function wireAPIKeySpec(value: APIKeySpecParam | null | undefined): unknown;
export declare function wireAddAgentVariationAssignmentRequest(value: AddAgentVariationAssignmentRequestParam | null | undefined): unknown;
export declare function wireCreateAgentVariationRequest(value: CreateAgentVariationRequestParam | null | undefined): unknown;
export declare function wireMemoryLayerSpec(value: MemoryLayerSpecParam | null | undefined): unknown;
export declare function wireObjectiveEpisodicConfig(value: ObjectiveEpisodicConfigParam | null | undefined): unknown;
export declare function wireWidgetSessionSpec(value: WidgetSessionSpecParam | null | undefined): unknown;
export declare function wireAddAgentVariationAssignmentRequest_ToolId(value: AddAgentVariationAssignmentRequest_ToolIdParam | null | undefined): unknown;
export declare function wireAddAgentVariationAssignmentRequest_ToolSetId(value: AddAgentVariationAssignmentRequest_ToolSetIdParam | null | undefined): unknown;
export declare function wireAddAgentVariationAssignmentRequest_SubAgentId(value: AddAgentVariationAssignmentRequest_SubAgentIdParam | null | undefined): unknown;
//# sourceMappingURL=types.d.ts.map