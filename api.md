# Shared

Types:

- <code><a href="./src/resources/shared.ts">AccountResourceMetadata</a></code>
- <code><a href="./src/resources/shared.ts">BareMetadata</a></code>
- <code><a href="./src/resources/shared.ts">CreateOperationMetadata</a></code>
- <code><a href="./src/resources/shared.ts">CreateResourceMetadata</a></code>
- <code><a href="./src/resources/shared.ts">OperationMetadata</a></code>
- <code><a href="./src/resources/shared.ts">ResourceMetadata</a></code>
- <code><a href="./src/resources/shared.ts">UpdateResourceMetadata</a></code>

# AIProviderKeys

Types:

- <code><a href="./src/resources/ai-provider-keys.ts">AIProviderConfigOpenAI</a></code>
- <code><a href="./src/resources/ai-provider-keys.ts">AIProviderConfigOpenAICompatible</a></code>
- <code><a href="./src/resources/ai-provider-keys.ts">AIProviderConfigOpenrouter</a></code>
- <code><a href="./src/resources/ai-provider-keys.ts">AIProviderCredentialAPIKey</a></code>
- <code><a href="./src/resources/ai-provider-keys.ts">AIProviderCredentialHeaders</a></code>
- <code><a href="./src/resources/ai-provider-keys.ts">AIProviderKey</a></code>
- <code><a href="./src/resources/ai-provider-keys.ts">AIProviderKeySpec</a></code>

Methods:

- <code title="post /v1/workspaces/{workspaceId}/ai_provider_keys">client.aiProviderKeys.<a href="./src/resources/ai-provider-keys.ts">create</a>({ ...params }) -> AIProviderKey</code>
- <code title="get /v1/workspaces/{workspaceId}/ai_provider_keys/{id}">client.aiProviderKeys.<a href="./src/resources/ai-provider-keys.ts">retrieve</a>(id, { ...params }) -> AIProviderKey</code>
- <code title="patch /v1/workspaces/{workspaceId}/ai_provider_keys/{id}">client.aiProviderKeys.<a href="./src/resources/ai-provider-keys.ts">update</a>(id, { ...params }) -> AIProviderKey</code>
- <code title="get /v1/workspaces/{workspaceId}/ai_provider_keys">client.aiProviderKeys.<a href="./src/resources/ai-provider-keys.ts">list</a>({ ...params }) -> AIProviderKeysCursorPagination</code>
- <code title="delete /v1/workspaces/{workspaceId}/ai_provider_keys/{id}">client.aiProviderKeys.<a href="./src/resources/ai-provider-keys.ts">delete</a>(id, { ...params }) -> void</code>

# Account

Types:

- <code><a href="./src/resources/account.ts">Account</a></code>
- <code><a href="./src/resources/account.ts">AccountInfo</a></code>
- <code><a href="./src/resources/account.ts">AccountSpec</a></code>
- <code><a href="./src/resources/account.ts">Profile</a></code>
- <code><a href="./src/resources/account.ts">ProfileSpec</a></code>
- <code><a href="./src/resources/account.ts">RotateChallengeTokenResponse</a></code>
- <code><a href="./src/resources/account.ts">RotateWebhookSigningKeyResponse</a></code>

Methods:

- <code title="get /v1/account">client.account.<a href="./src/resources/account.ts">retrieve</a>() -> Account</code>
- <code title="post /v1/account:rotateChallengeToken">client.account.<a href="./src/resources/account.ts">rotateChallengeToken</a>() -> RotateChallengeTokenResponse</code>
- <code title="post /v1/account:rotateWebhookSigningKey">client.account.<a href="./src/resources/account.ts">rotateWebhookSigningKey</a>() -> RotateWebhookSigningKeyResponse</code>

# Profiles

Methods:

- <code title="get /v1/whoami">client.profiles.<a href="./src/resources/profiles.ts">whoami</a>() -> Profile</code>

# Agents

Types:

- <code><a href="./src/resources/agents/agents.ts">Agent</a></code>
- <code><a href="./src/resources/agents/agents.ts">AgentInfo</a></code>
- <code><a href="./src/resources/agents/agents.ts">AgentSpec</a></code>
- <code><a href="./src/resources/agents/agents.ts">Page</a></code>

Methods:

- <code title="post /v1/workspaces/{workspaceId}/agents">client.agents.<a href="./src/resources/agents/agents.ts">create</a>({ ...params }) -> Agent</code>
- <code title="get /v1/workspaces/{workspaceId}/agents/{id}">client.agents.<a href="./src/resources/agents/agents.ts">retrieve</a>(id, { ...params }) -> Agent</code>
- <code title="patch /v1/workspaces/{workspaceId}/agents/{id}">client.agents.<a href="./src/resources/agents/agents.ts">update</a>(id, { ...params }) -> Agent</code>
- <code title="get /v1/workspaces/{workspaceId}/agents">client.agents.<a href="./src/resources/agents/agents.ts">list</a>({ ...params }) -> AgentsCursorPagination</code>
- <code title="delete /v1/workspaces/{workspaceId}/agents/{id}">client.agents.<a href="./src/resources/agents/agents.ts">delete</a>(id, { ...params }) -> void</code>
- <code title="post /v1/workspaces/{workspaceId}/agents/{id}:archive">client.agents.<a href="./src/resources/agents/agents.ts">archive</a>(id, { ...params }) -> Agent</code>
- <code title="post /v1/workspaces/{workspaceId}/agents/{id}:publish">client.agents.<a href="./src/resources/agents/agents.ts">publish</a>(id, { ...params }) -> Agent</code>
- <code title="post /v1/workspaces/{workspaceId}/agents/{id}:unarchive">client.agents.<a href="./src/resources/agents/agents.ts">unarchive</a>(id, { ...params }) -> Agent</code>
- <code title="post /v1/workspaces/{workspaceId}/agents/{id}:unpublish">client.agents.<a href="./src/resources/agents/agents.ts">unpublish</a>(id, { ...params }) -> Agent</code>

## Feedback

Methods:

- <code title="get /v1/workspaces/{workspaceId}/agents/{agentId}/feedback">client.agents.feedback.<a href="./src/resources/agents/feedback.ts">list</a>(agentID, { ...params }) -> ObjectiveFeedbacksCursorPagination</code>

## WebhookDeliveries

Types:

- <code><a href="./src/resources/agents/webhook-deliveries.ts">WebhookDelivery</a></code>
- <code><a href="./src/resources/agents/webhook-deliveries.ts">WebhookDeliveryData</a></code>

Methods:

- <code title="get /v1/workspaces/{workspaceId}/agents/{agentId}/webhook_deliveries">client.agents.webhookDeliveries.<a href="./src/resources/agents/webhook-deliveries.ts">list</a>(agentID, { ...params }) -> WebhookDeliveriesCursorPagination</code>

## Variations

Types:

- <code><a href="./src/resources/agents/variations.ts">AddAgentVariationAssignmentRequestSubAgentID</a></code>
- <code><a href="./src/resources/agents/variations.ts">AddAgentVariationAssignmentRequestToolID</a></code>
- <code><a href="./src/resources/agents/variations.ts">AddAgentVariationAssignmentRequestToolSetID</a></code>
- <code><a href="./src/resources/agents/variations.ts">AgentVariation</a></code>
- <code><a href="./src/resources/agents/variations.ts">AgentVariationInfo</a></code>
- <code><a href="./src/resources/agents/variations.ts">AgentVariationSpec</a></code>
- <code><a href="./src/resources/agents/variations.ts">AgentVariationSpecCompactionConfig</a></code>
- <code><a href="./src/resources/agents/variations.ts">AgentVariationSpecConstraints</a></code>
- <code><a href="./src/resources/agents/variations.ts">AgentVariationSpecModelConfig</a></code>
- <code><a href="./src/resources/agents/variations.ts">AgentVariationSpecProgressiveDiscovery</a></code>
- <code><a href="./src/resources/agents/variations.ts">CompactionConfigSummarizationStrategy</a></code>
- <code><a href="./src/resources/agents/variations.ts">CompactionConfigToolResultClearingStrategy</a></code>
- <code><a href="./src/resources/agents/variations.ts">VariationAssignment</a></code>
- <code><a href="./src/resources/agents/variations.ts">VariationAssignmentAgent</a></code>
- <code><a href="./src/resources/agents/variations.ts">VariationAssignmentTool</a></code>
- <code><a href="./src/resources/agents/variations.ts">VariationAssignmentToolSet</a></code>
- <code><a href="./src/resources/agents/variations.ts">VariationMemoryLayerAssignment</a></code>

Methods:

- <code title="post /v1/workspaces/{workspaceId}/agents/{agentId}/variations">client.agents.variations.<a href="./src/resources/agents/variations.ts">create</a>(agentID, { ...params }) -> AgentVariation</code>
- <code title="get /v1/workspaces/{workspaceId}/agents/{agentId}/variations/{id}">client.agents.variations.<a href="./src/resources/agents/variations.ts">retrieve</a>(agentID, id, { ...params }) -> AgentVariation</code>
- <code title="patch /v1/workspaces/{workspaceId}/agents/{agentId}/variations/{id}">client.agents.variations.<a href="./src/resources/agents/variations.ts">update</a>(agentID, id, { ...params }) -> AgentVariation</code>
- <code title="get /v1/workspaces/{workspaceId}/agents/{agentId}/variations">client.agents.variations.<a href="./src/resources/agents/variations.ts">list</a>(agentID, { ...params }) -> AgentVariationsCursorPagination</code>
- <code title="delete /v1/workspaces/{workspaceId}/agents/{agentId}/variations/{id}">client.agents.variations.<a href="./src/resources/agents/variations.ts">delete</a>(agentID, id, { ...params }) -> void</code>
- <code title="post /v1/workspaces/{workspaceId}/agents/{agentId}/variations/{variationId}/assignments">client.agents.variations.<a href="./src/resources/agents/variations.ts">addAssignment</a>(agentID, variationID, { ...params }) -> VariationAssignment</code>
- <code title="post /v1/workspaces/{workspaceId}/agents/{agentId}/variations/{variationId}/memory_layer_assignments">client.agents.variations.<a href="./src/resources/agents/variations.ts">addMemoryLayer</a>(agentID, variationID, { ...params }) -> VariationMemoryLayerAssignment</code>
- <code title="delete /v1/workspaces/{workspaceId}/agents/{agentId}/variations/{variationId}/assignments/{id}">client.agents.variations.<a href="./src/resources/agents/variations.ts">removeAssignment</a>(agentID, variationID, id, { ...params }) -> void</code>
- <code title="delete /v1/workspaces/{workspaceId}/agents/{agentId}/variations/{variationId}/memory_layer_assignments/{id}">client.agents.variations.<a href="./src/resources/agents/variations.ts">removeMemoryLayer</a>(agentID, variationID, id, { ...params }) -> void</code>
- <code title="patch /v1/workspaces/{workspaceId}/agents/{agentId}/variations/{variationId}/memory_layer_assignments/{id}">client.agents.variations.<a href="./src/resources/agents/variations.ts">updateMemoryLayer</a>(agentID, variationID, id, { ...params }) -> VariationMemoryLayerAssignment</code>

## Schedules

Types:

- <code><a href="./src/resources/agents/schedules.ts">AgentSchedule</a></code>
- <code><a href="./src/resources/agents/schedules.ts">AgentScheduleInfo</a></code>
- <code><a href="./src/resources/agents/schedules.ts">AgentScheduleSpec</a></code>
- <code><a href="./src/resources/agents/schedules.ts">AgentScheduleSpecSchedule</a></code>
- <code><a href="./src/resources/agents/schedules.ts">ScheduleCalendar</a></code>
- <code><a href="./src/resources/agents/schedules.ts">ScheduleInterval</a></code>
- <code><a href="./src/resources/agents/schedules.ts">ScheduleRange</a></code>

Methods:

- <code title="post /v1/workspaces/{workspaceId}/agents/{agentId}/schedules">client.agents.schedules.<a href="./src/resources/agents/schedules.ts">create</a>(agentID, { ...params }) -> AgentSchedule</code>
- <code title="get /v1/workspaces/{workspaceId}/agents/{agentId}/schedules/{id}">client.agents.schedules.<a href="./src/resources/agents/schedules.ts">retrieve</a>(agentID, id, { ...params }) -> AgentSchedule</code>
- <code title="patch /v1/workspaces/{workspaceId}/agents/{agentId}/schedules/{id}">client.agents.schedules.<a href="./src/resources/agents/schedules.ts">update</a>(agentID, id, { ...params }) -> AgentSchedule</code>
- <code title="get /v1/workspaces/{workspaceId}/agents/{agentId}/schedules">client.agents.schedules.<a href="./src/resources/agents/schedules.ts">list</a>(agentID, { ...params }) -> AgentSchedulesCursorPagination</code>
- <code title="delete /v1/workspaces/{workspaceId}/agents/{agentId}/schedules/{id}">client.agents.schedules.<a href="./src/resources/agents/schedules.ts">delete</a>(agentID, id, { ...params }) -> void</code>
- <code title="post /v1/workspaces/{workspaceId}/agents/{agentId}/schedules/{id}:archive">client.agents.schedules.<a href="./src/resources/agents/schedules.ts">archive</a>(agentID, id, { ...params }) -> AgentSchedule</code>
- <code title="post /v1/workspaces/{workspaceId}/agents/{agentId}/schedules/{id}:pause">client.agents.schedules.<a href="./src/resources/agents/schedules.ts">pause</a>(agentID, id, { ...params }) -> AgentSchedule</code>
- <code title="post /v1/workspaces/{workspaceId}/agents/{agentId}/schedules/{id}:resume">client.agents.schedules.<a href="./src/resources/agents/schedules.ts">resume</a>(agentID, id, { ...params }) -> AgentSchedule</code>

# Objectives

Types:

- <code><a href="./src/resources/objectives/objectives.ts">AssistantMessage</a></code>
- <code><a href="./src/resources/objectives/objectives.ts">AssistantToolCall</a></code>
- <code><a href="./src/resources/objectives/objectives.ts">CallableTool</a></code>
- <code><a href="./src/resources/objectives/objectives.ts">CallableToolAgent</a></code>
- <code><a href="./src/resources/objectives/objectives.ts">CallableToolCadenyaProvidedTool</a></code>
- <code><a href="./src/resources/objectives/objectives.ts">CallableToolTool</a></code>
- <code><a href="./src/resources/objectives/objectives.ts">ContextLengths</a></code>
- <code><a href="./src/resources/objectives/objectives.ts">ContextWindowCompacted</a></code>
- <code><a href="./src/resources/objectives/objectives.ts">MemoryRead</a></code>
- <code><a href="./src/resources/objectives/objectives.ts">MemoryReference</a></code>
- <code><a href="./src/resources/objectives/objectives.ts">Objective</a></code>
- <code><a href="./src/resources/objectives/objectives.ts">ObjectiveConfigSnapshot</a></code>
- <code><a href="./src/resources/objectives/objectives.ts">ObjectiveContextWindow</a></code>
- <code><a href="./src/resources/objectives/objectives.ts">ObjectiveContextWindowData</a></code>
- <code><a href="./src/resources/objectives/objectives.ts">ObjectiveDiagnostics</a></code>
- <code><a href="./src/resources/objectives/objectives.ts">ObjectiveError</a></code>
- <code><a href="./src/resources/objectives/objectives.ts">ObjectiveEvent</a></code>
- <code><a href="./src/resources/objectives/objectives.ts">ObjectiveEventData</a></code>
- <code><a href="./src/resources/objectives/objectives.ts">ObjectiveEventDataAssistantMessage</a></code>
- <code><a href="./src/resources/objectives/objectives.ts">ObjectiveEventDataCancelled</a></code>
- <code><a href="./src/resources/objectives/objectives.ts">ObjectiveEventDataContextWindowCompacted</a></code>
- <code><a href="./src/resources/objectives/objectives.ts">ObjectiveEventDataError</a></code>
- <code><a href="./src/resources/objectives/objectives.ts">ObjectiveEventDataFinalized</a></code>
- <code><a href="./src/resources/objectives/objectives.ts">ObjectiveEventDataMemoryRead</a></code>
- <code><a href="./src/resources/objectives/objectives.ts">ObjectiveEventDataNotice</a></code>
- <code><a href="./src/resources/objectives/objectives.ts">ObjectiveEventDataSubAgentSpawned</a></code>
- <code><a href="./src/resources/objectives/objectives.ts">ObjectiveEventDataSubAgentUpdated</a></code>
- <code><a href="./src/resources/objectives/objectives.ts">ObjectiveEventDataTimedOut</a></code>
- <code><a href="./src/resources/objectives/objectives.ts">ObjectiveEventDataToolApprovalRequested</a></code>
- <code><a href="./src/resources/objectives/objectives.ts">ObjectiveEventDataToolApproved</a></code>
- <code><a href="./src/resources/objectives/objectives.ts">ObjectiveEventDataToolCalled</a></code>
- <code><a href="./src/resources/objectives/objectives.ts">ObjectiveEventDataToolDenied</a></code>
- <code><a href="./src/resources/objectives/objectives.ts">ObjectiveEventDataToolError</a></code>
- <code><a href="./src/resources/objectives/objectives.ts">ObjectiveEventDataToolResult</a></code>
- <code><a href="./src/resources/objectives/objectives.ts">ObjectiveEventDataUserMessage</a></code>
- <code><a href="./src/resources/objectives/objectives.ts">ObjectiveEventInfo</a></code>
- <code><a href="./src/resources/objectives/objectives.ts">ObjectiveEventWebhookData</a></code>
- <code><a href="./src/resources/objectives/objectives.ts">ObjectiveInfo</a></code>
- <code><a href="./src/resources/objectives/objectives.ts">ObjectiveSecret</a></code>
- <code><a href="./src/resources/objectives/objectives.ts">SubAgentSpawned</a></code>
- <code><a href="./src/resources/objectives/objectives.ts">SubAgentUpdated</a></code>
- <code><a href="./src/resources/objectives/objectives.ts">ToolApprovalRequested</a></code>
- <code><a href="./src/resources/objectives/objectives.ts">ToolApproved</a></code>
- <code><a href="./src/resources/objectives/objectives.ts">ToolCalled</a></code>
- <code><a href="./src/resources/objectives/objectives.ts">ToolDenied</a></code>
- <code><a href="./src/resources/objectives/objectives.ts">ToolError</a></code>
- <code><a href="./src/resources/objectives/objectives.ts">ToolResult</a></code>
- <code><a href="./src/resources/objectives/objectives.ts">UserMessage</a></code>
- <code><a href="./src/resources/objectives/objectives.ts">ObjectiveCompactResponse</a></code>
- <code><a href="./src/resources/objectives/objectives.ts">ObjectiveRetrieveDiagnosticsResponse</a></code>

Methods:

- <code title="post /v1/workspaces/{workspaceId}/objectives">client.objectives.<a href="./src/resources/objectives/objectives.ts">create</a>({ ...params }) -> Objective</code>
- <code title="get /v1/workspaces/{workspaceId}/objectives/{id}">client.objectives.<a href="./src/resources/objectives/objectives.ts">retrieve</a>(id, { ...params }) -> Objective</code>
- <code title="get /v1/workspaces/{workspaceId}/objectives">client.objectives.<a href="./src/resources/objectives/objectives.ts">list</a>({ ...params }) -> ObjectivesCursorPagination</code>
- <code title="post /v1/workspaces/{workspaceId}/objectives/{objectiveId}:cancel">client.objectives.<a href="./src/resources/objectives/objectives.ts">cancel</a>(objectiveID, { ...params }) -> Objective</code>
- <code title="post /v1/workspaces/{workspaceId}/objectives/{objectiveId}:compact">client.objectives.<a href="./src/resources/objectives/objectives.ts">compact</a>(objectiveID, { ...params }) -> ObjectiveCompactResponse</code>
- <code title="post /v1/workspaces/{workspaceId}/objectives/{objectiveId}:continue">client.objectives.<a href="./src/resources/objectives/objectives.ts">continue</a>(objectiveID, { ...params }) -> ObjectiveEvent</code>
- <code title="get /v1/workspaces/{workspaceId}/objectives/{objectiveId}/context_windows">client.objectives.<a href="./src/resources/objectives/objectives.ts">listContextWindows</a>(objectiveID, { ...params }) -> ObjectiveContextWindowsCursorPagination</code>
- <code title="get /v1/workspaces/{workspaceId}/objectives/{objectiveId}/events">client.objectives.<a href="./src/resources/objectives/objectives.ts">listEvents</a>(objectiveID, { ...params }) -> ObjectiveEventsCursorPagination</code>
- <code title="get /v1/workspaces/{workspaceId}/objectives/{objectiveId}/diagnostics">client.objectives.<a href="./src/resources/objectives/objectives.ts">retrieveDiagnostics</a>(objectiveID, { ...params }) -> ObjectiveRetrieveDiagnosticsResponse</code>
- <code title="get /v1/workspaces/{workspaceId}/objectives/{objectiveId}/events:stream">client.objectives.<a href="./src/resources/objectives/objectives.ts">streamEvents</a>(objectiveID, { ...params }) -> ObjectiveEvent</code>

## Tools

Types:

- <code><a href="./src/resources/objectives/tools.ts">ObjectiveTool</a></code>

Methods:

- <code title="get /v1/workspaces/{workspaceId}/objectives/{objectiveId}/tools">client.objectives.tools.<a href="./src/resources/objectives/tools.ts">list</a>(objectiveID, { ...params }) -> ObjectiveToolsCursorPagination</code>

## ToolCalls

Types:

- <code><a href="./src/resources/objectives/tool-calls.ts">ObjectiveToolCall</a></code>
- <code><a href="./src/resources/objectives/tool-calls.ts">ObjectiveToolCallData</a></code>
- <code><a href="./src/resources/objectives/tool-calls.ts">ObjectiveToolCallInfo</a></code>
- <code><a href="./src/resources/objectives/tool-calls.ts">ObjectiveToolCallResult</a></code>
- <code><a href="./src/resources/objectives/tool-calls.ts">ObjectiveToolCallResultAudioBlock</a></code>
- <code><a href="./src/resources/objectives/tool-calls.ts">ObjectiveToolCallResultContentBlock</a></code>
- <code><a href="./src/resources/objectives/tool-calls.ts">ObjectiveToolCallResultContentBlockAudio</a></code>
- <code><a href="./src/resources/objectives/tool-calls.ts">ObjectiveToolCallResultContentBlockImage</a></code>
- <code><a href="./src/resources/objectives/tool-calls.ts">ObjectiveToolCallResultContentBlockText</a></code>
- <code><a href="./src/resources/objectives/tool-calls.ts">ObjectiveToolCallResultImageBlock</a></code>
- <code><a href="./src/resources/objectives/tool-calls.ts">ObjectiveToolCallResultTextBlock</a></code>
- <code><a href="./src/resources/objectives/tool-calls.ts">ObjectiveToolCallWithResult</a></code>
- <code><a href="./src/resources/objectives/tool-calls.ts">ResolvedSecret</a></code>
- <code><a href="./src/resources/objectives/tool-calls.ts">SetToolCallContentRequestAudioBlock</a></code>
- <code><a href="./src/resources/objectives/tool-calls.ts">SetToolCallContentRequestContentBlock</a></code>
- <code><a href="./src/resources/objectives/tool-calls.ts">SetToolCallContentRequestContentBlockAudio</a></code>
- <code><a href="./src/resources/objectives/tool-calls.ts">SetToolCallContentRequestContentBlockImage</a></code>
- <code><a href="./src/resources/objectives/tool-calls.ts">SetToolCallContentRequestContentBlockText</a></code>
- <code><a href="./src/resources/objectives/tool-calls.ts">SetToolCallContentRequestImageBlock</a></code>
- <code><a href="./src/resources/objectives/tool-calls.ts">SetToolCallContentRequestTextBlock</a></code>

Methods:

- <code title="get /v1/workspaces/{workspaceId}/objectives/{objectiveId}/tool_calls/{toolCallId}">client.objectives.toolCalls.<a href="./src/resources/objectives/tool-calls.ts">retrieve</a>(objectiveID, toolCallID, { ...params }) -> ObjectiveToolCallWithResult</code>
- <code title="get /v1/workspaces/{workspaceId}/objectives/{objectiveId}/tool_calls">client.objectives.toolCalls.<a href="./src/resources/objectives/tool-calls.ts">list</a>(objectiveID, { ...params }) -> ObjectiveToolCallsCursorPagination</code>
- <code title="post /v1/workspaces/{workspaceId}/objectives/{objectiveId}/tool_calls/{toolCallId}:approve">client.objectives.toolCalls.<a href="./src/resources/objectives/tool-calls.ts">approve</a>(objectiveID, toolCallID, { ...params }) -> ObjectiveToolCall</code>
- <code title="post /v1/workspaces/{workspaceId}/objectives/{objectiveId}/tool_calls/{toolCallId}:deny">client.objectives.toolCalls.<a href="./src/resources/objectives/tool-calls.ts">deny</a>(objectiveID, toolCallID, { ...params }) -> ObjectiveToolCall</code>
- <code title="post /v1/workspaces/{workspaceId}/objectives/{objectiveId}/tool_calls/{toolCallId}:setContent">client.objectives.toolCalls.<a href="./src/resources/objectives/tool-calls.ts">setContent</a>(objectiveID, toolCallID, { ...params }) -> ObjectiveToolCall</code>

## Tasks

Types:

- <code><a href="./src/resources/objectives/tasks.ts">ObjectiveTask</a></code>
- <code><a href="./src/resources/objectives/tasks.ts">ObjectiveTaskData</a></code>

Methods:

- <code title="get /v1/workspaces/{workspaceId}/objectives/{objectiveId}/tasks/{id}">client.objectives.tasks.<a href="./src/resources/objectives/tasks.ts">retrieve</a>(objectiveID, id, { ...params }) -> ObjectiveTask</code>
- <code title="get /v1/workspaces/{workspaceId}/objectives/{objectiveId}/tasks">client.objectives.tasks.<a href="./src/resources/objectives/tasks.ts">list</a>(objectiveID, { ...params }) -> ObjectiveTasksCursorPagination</code>

## Feedback

Types:

- <code><a href="./src/resources/objectives/feedback.ts">ObjectiveFeedback</a></code>
- <code><a href="./src/resources/objectives/feedback.ts">ObjectiveFeedbackData</a></code>
- <code><a href="./src/resources/objectives/feedback.ts">ObjectiveFeedbackInfo</a></code>

Methods:

- <code title="post /v1/workspaces/{workspaceId}/objectives/{objectiveId}/feedback">client.objectives.feedback.<a href="./src/resources/objectives/feedback.ts">create</a>(objectiveID, { ...params }) -> ObjectiveFeedback</code>
- <code title="get /v1/workspaces/{workspaceId}/objectives/{objectiveId}/feedback">client.objectives.feedback.<a href="./src/resources/objectives/feedback.ts">list</a>(objectiveID, { ...params }) -> ObjectiveFeedbacksCursorPagination</code>

# MemoryLayers

Types:

- <code><a href="./src/resources/memory-layers/memory-layers.ts">MemoryLayer</a></code>
- <code><a href="./src/resources/memory-layers/memory-layers.ts">MemoryLayerInfo</a></code>
- <code><a href="./src/resources/memory-layers/memory-layers.ts">MemoryLayerSpec</a></code>

Methods:

- <code title="post /v1/workspaces/{workspaceId}/memory_layers">client.memoryLayers.<a href="./src/resources/memory-layers/memory-layers.ts">create</a>({ ...params }) -> MemoryLayer</code>
- <code title="get /v1/workspaces/{workspaceId}/memory_layers/{id}">client.memoryLayers.<a href="./src/resources/memory-layers/memory-layers.ts">retrieve</a>(id, { ...params }) -> MemoryLayer</code>
- <code title="patch /v1/workspaces/{workspaceId}/memory_layers/{id}">client.memoryLayers.<a href="./src/resources/memory-layers/memory-layers.ts">update</a>(id, { ...params }) -> MemoryLayer</code>
- <code title="get /v1/workspaces/{workspaceId}/memory_layers">client.memoryLayers.<a href="./src/resources/memory-layers/memory-layers.ts">list</a>({ ...params }) -> MemoryLayersCursorPagination</code>
- <code title="delete /v1/workspaces/{workspaceId}/memory_layers/{id}">client.memoryLayers.<a href="./src/resources/memory-layers/memory-layers.ts">delete</a>(id, { ...params }) -> void</code>

## Entries

Types:

- <code><a href="./src/resources/memory-layers/entries.ts">MemoryEntry</a></code>
- <code><a href="./src/resources/memory-layers/entries.ts">MemoryEntryCreateSpec</a></code>
- <code><a href="./src/resources/memory-layers/entries.ts">MemoryEntryCreateSpecContent</a></code>
- <code><a href="./src/resources/memory-layers/entries.ts">MemoryEntryCreateSpecUploadID</a></code>
- <code><a href="./src/resources/memory-layers/entries.ts">MemoryEntryDetail</a></code>
- <code><a href="./src/resources/memory-layers/entries.ts">MemoryEntryInfo</a></code>
- <code><a href="./src/resources/memory-layers/entries.ts">MemoryEntrySpec</a></code>
- <code><a href="./src/resources/memory-layers/entries.ts">MemoryEntryUpdateSpec</a></code>

Methods:

- <code title="post /v1/workspaces/{workspaceId}/memory_layers/{memoryLayerId}/entries">client.memoryLayers.entries.<a href="./src/resources/memory-layers/entries.ts">create</a>(memoryLayerID, { ...params }) -> MemoryEntryDetail</code>
- <code title="get /v1/workspaces/{workspaceId}/memory_layers/{memoryLayerId}/entries/{id}">client.memoryLayers.entries.<a href="./src/resources/memory-layers/entries.ts">retrieve</a>(memoryLayerID, id, { ...params }) -> MemoryEntryDetail</code>
- <code title="patch /v1/workspaces/{workspaceId}/memory_layers/{memoryLayerId}/entries/{id}">client.memoryLayers.entries.<a href="./src/resources/memory-layers/entries.ts">update</a>(memoryLayerID, id, { ...params }) -> MemoryEntryDetail</code>
- <code title="get /v1/workspaces/{workspaceId}/memory_layers/{memoryLayerId}/entries">client.memoryLayers.entries.<a href="./src/resources/memory-layers/entries.ts">list</a>(memoryLayerID, { ...params }) -> MemoryEntriesCursorPagination</code>
- <code title="delete /v1/workspaces/{workspaceId}/memory_layers/{memoryLayerId}/entries/{id}">client.memoryLayers.entries.<a href="./src/resources/memory-layers/entries.ts">delete</a>(memoryLayerID, id, { ...params }) -> void</code>

# Uploads

Types:

- <code><a href="./src/resources/uploads.ts">Upload</a></code>
- <code><a href="./src/resources/uploads.ts">UploadInfo</a></code>
- <code><a href="./src/resources/uploads.ts">UploadSpec</a></code>

Methods:

- <code title="post /v1/workspaces/{workspaceId}/uploads">client.uploads.<a href="./src/resources/uploads.ts">create</a>({ ...params }) -> Upload</code>
- <code title="get /v1/workspaces/{workspaceId}/uploads/{id}">client.uploads.<a href="./src/resources/uploads.ts">retrieve</a>(id, { ...params }) -> Upload</code>

# Models

Types:

- <code><a href="./src/resources/models.ts">Model</a></code>
- <code><a href="./src/resources/models.ts">ModelSpec</a></code>
- <code><a href="./src/resources/models.ts">ModelSwapResponse</a></code>

Methods:

- <code title="get /v1/workspaces/{workspaceId}/models/{id}">client.models.<a href="./src/resources/models.ts">retrieve</a>(id, { ...params }) -> Model</code>
- <code title="get /v1/workspaces/{workspaceId}/models">client.models.<a href="./src/resources/models.ts">list</a>({ ...params }) -> ModelsCursorPagination</code>
- <code title="post /v1/workspaces/{workspaceId}/models/{id}:disable">client.models.<a href="./src/resources/models.ts">disable</a>(id, { ...params }) -> Model</code>
- <code title="post /v1/workspaces/{workspaceId}/models/{id}:enable">client.models.<a href="./src/resources/models.ts">enable</a>(id, { ...params }) -> Model</code>
- <code title="post /v1/workspaces/{workspaceId}/models:swapModelOnVariations">client.models.<a href="./src/resources/models.ts">swap</a>({ ...params }) -> unknown</code>

# Search

Types:

- <code><a href="./src/resources/search.ts">SearchSearchToolsOrToolSetsResponse</a></code>

Methods:

- <code title="get /v1/workspaces/{workspaceId}/search/tools_or_tool_sets">client.search.<a href="./src/resources/search.ts">searchToolsOrToolSets</a>({ ...params }) -> SearchSearchToolsOrToolSetsResponse</code>

# ToolSets

Types:

- <code><a href="./src/resources/tool-sets/tool-sets.ts">ApprovalRequirementFilter</a></code>
- <code><a href="./src/resources/tool-sets/tool-sets.ts">ApprovalRequirementFilterAlways</a></code>
- <code><a href="./src/resources/tool-sets/tool-sets.ts">ApprovalRequirementFilterOnly</a></code>
- <code><a href="./src/resources/tool-sets/tool-sets.ts">AttributeFilter</a></code>
- <code><a href="./src/resources/tool-sets/tool-sets.ts">StringMatcher</a></code>
- <code><a href="./src/resources/tool-sets/tool-sets.ts">StringMatcherContains</a></code>
- <code><a href="./src/resources/tool-sets/tool-sets.ts">StringMatcherEndsWith</a></code>
- <code><a href="./src/resources/tool-sets/tool-sets.ts">StringMatcherExact</a></code>
- <code><a href="./src/resources/tool-sets/tool-sets.ts">StringMatcherRegex</a></code>
- <code><a href="./src/resources/tool-sets/tool-sets.ts">StringMatcherStartsWith</a></code>
- <code><a href="./src/resources/tool-sets/tool-sets.ts">SyncCompleted</a></code>
- <code><a href="./src/resources/tool-sets/tool-sets.ts">SyncFailed</a></code>
- <code><a href="./src/resources/tool-sets/tool-sets.ts">SyncStarted</a></code>
- <code><a href="./src/resources/tool-sets/tool-sets.ts">ToolFilter</a></code>
- <code><a href="./src/resources/tool-sets/tool-sets.ts">ToolSet</a></code>
- <code><a href="./src/resources/tool-sets/tool-sets.ts">ToolSetAdapter</a></code>
- <code><a href="./src/resources/tool-sets/tool-sets.ts">ToolSetAdapterBare</a></code>
- <code><a href="./src/resources/tool-sets/tool-sets.ts">ToolSetAdapterBareVariant</a></code>
- <code><a href="./src/resources/tool-sets/tool-sets.ts">ToolSetAdapterHTTP</a></code>
- <code><a href="./src/resources/tool-sets/tool-sets.ts">ToolSetAdapterHTTPVariant</a></code>
- <code><a href="./src/resources/tool-sets/tool-sets.ts">ToolSetAdapterMCP</a></code>
- <code><a href="./src/resources/tool-sets/tool-sets.ts">ToolSetAdapterMCPVariant</a></code>
- <code><a href="./src/resources/tool-sets/tool-sets.ts">ToolSetAdapterOpenAPI</a></code>
- <code><a href="./src/resources/tool-sets/tool-sets.ts">ToolSetAdapterOpenAPIUploadID</a></code>
- <code><a href="./src/resources/tool-sets/tool-sets.ts">ToolSetAdapterOpenAPIURL</a></code>
- <code><a href="./src/resources/tool-sets/tool-sets.ts">ToolSetAdapterOpenAPIVariant</a></code>
- <code><a href="./src/resources/tool-sets/tool-sets.ts">ToolSetEvent</a></code>
- <code><a href="./src/resources/tool-sets/tool-sets.ts">ToolSetEventData</a></code>
- <code><a href="./src/resources/tool-sets/tool-sets.ts">ToolSetEventDataSyncCompleted</a></code>
- <code><a href="./src/resources/tool-sets/tool-sets.ts">ToolSetEventDataSyncFailed</a></code>
- <code><a href="./src/resources/tool-sets/tool-sets.ts">ToolSetEventDataSyncStarted</a></code>
- <code><a href="./src/resources/tool-sets/tool-sets.ts">ToolSetInfo</a></code>
- <code><a href="./src/resources/tool-sets/tool-sets.ts">ToolSetSpec</a></code>
- <code><a href="./src/resources/tool-sets/tool-sets.ts">ToolSetGetOpenAPISpecResponse</a></code>

Methods:

- <code title="post /v1/workspaces/{workspaceId}/tool_sets">client.toolSets.<a href="./src/resources/tool-sets/tool-sets.ts">create</a>({ ...params }) -> ToolSet</code>
- <code title="get /v1/workspaces/{workspaceId}/tool_sets/{id}">client.toolSets.<a href="./src/resources/tool-sets/tool-sets.ts">retrieve</a>(id, { ...params }) -> ToolSet</code>
- <code title="patch /v1/workspaces/{workspaceId}/tool_sets/{id}">client.toolSets.<a href="./src/resources/tool-sets/tool-sets.ts">update</a>(id, { ...params }) -> ToolSet</code>
- <code title="get /v1/workspaces/{workspaceId}/tool_sets">client.toolSets.<a href="./src/resources/tool-sets/tool-sets.ts">list</a>({ ...params }) -> ToolSetsCursorPagination</code>
- <code title="delete /v1/workspaces/{workspaceId}/tool_sets/{id}">client.toolSets.<a href="./src/resources/tool-sets/tool-sets.ts">delete</a>(id, { ...params }) -> void</code>
- <code title="post /v1/workspaces/{workspaceId}/tool_sets/{id}:archive">client.toolSets.<a href="./src/resources/tool-sets/tool-sets.ts">archive</a>(id, { ...params }) -> ToolSet</code>
- <code title="get /v1/workspaces/{workspaceId}/tool_sets/{toolSetId}/openapi_spec">client.toolSets.<a href="./src/resources/tool-sets/tool-sets.ts">getOpenAPISpec</a>(toolSetID, { ...params }) -> ToolSetGetOpenAPISpecResponse</code>
- <code title="get /v1/workspaces/{workspaceId}/tool_sets/{toolSetId}/events">client.toolSets.<a href="./src/resources/tool-sets/tool-sets.ts">listEvents</a>(toolSetID, { ...params }) -> ToolSetEventsCursorPagination</code>
- <code title="post /v1/workspaces/{workspaceId}/tool_sets/{id}:unarchive">client.toolSets.<a href="./src/resources/tool-sets/tool-sets.ts">unarchive</a>(id, { ...params }) -> ToolSet</code>

## Tools

Types:

- <code><a href="./src/resources/tool-sets/tools.ts">ConfigBare</a></code>
- <code><a href="./src/resources/tool-sets/tools.ts">ConfigHTTP</a></code>
- <code><a href="./src/resources/tool-sets/tools.ts">ConfigMCP</a></code>
- <code><a href="./src/resources/tool-sets/tools.ts">ConfigOpenAPI</a></code>
- <code><a href="./src/resources/tool-sets/tools.ts">MCPAnnotations</a></code>
- <code><a href="./src/resources/tool-sets/tools.ts">Tool</a></code>
- <code><a href="./src/resources/tool-sets/tools.ts">ToolInfo</a></code>
- <code><a href="./src/resources/tool-sets/tools.ts">ToolSpec</a></code>
- <code><a href="./src/resources/tool-sets/tools.ts">ToolSpecConfig</a></code>
- <code><a href="./src/resources/tool-sets/tools.ts">ToolSpecConfigBare</a></code>
- <code><a href="./src/resources/tool-sets/tools.ts">ToolSpecConfigHTTP</a></code>
- <code><a href="./src/resources/tool-sets/tools.ts">ToolSpecConfigMCP</a></code>
- <code><a href="./src/resources/tool-sets/tools.ts">ToolSpecConfigOpenAPI</a></code>

Methods:

- <code title="post /v1/workspaces/{workspaceId}/tool_sets/{toolSetId}/tools">client.toolSets.tools.<a href="./src/resources/tool-sets/tools.ts">create</a>(toolSetID, { ...params }) -> Tool</code>
- <code title="get /v1/workspaces/{workspaceId}/tool_sets/{toolSetId}/tools/{id}">client.toolSets.tools.<a href="./src/resources/tool-sets/tools.ts">retrieve</a>(toolSetID, id, { ...params }) -> Tool</code>
- <code title="patch /v1/workspaces/{workspaceId}/tool_sets/{toolSetId}/tools/{id}">client.toolSets.tools.<a href="./src/resources/tool-sets/tools.ts">update</a>(toolSetID, id, { ...params }) -> Tool</code>
- <code title="get /v1/workspaces/{workspaceId}/tool_sets/{toolSetId}/tools">client.toolSets.tools.<a href="./src/resources/tool-sets/tools.ts">list</a>(toolSetID, { ...params }) -> ToolsCursorPagination</code>
- <code title="delete /v1/workspaces/{workspaceId}/tool_sets/{toolSetId}/tools/{id}">client.toolSets.tools.<a href="./src/resources/tool-sets/tools.ts">delete</a>(toolSetID, id, { ...params }) -> void</code>
- <code title="post /v1/workspaces/{workspaceId}/tool_sets/{toolSetId}/tools/{id}:omit">client.toolSets.tools.<a href="./src/resources/tool-sets/tools.ts">omit</a>(toolSetID, id, { ...params }) -> Tool</code>
- <code title="post /v1/workspaces/{workspaceId}/tool_sets/{toolSetId}/tools/{id}:restore">client.toolSets.tools.<a href="./src/resources/tool-sets/tools.ts">restore</a>(toolSetID, id, { ...params }) -> Tool</code>

## Secrets

Types:

- <code><a href="./src/resources/tool-sets/secrets.ts">ToolSetSecret</a></code>
- <code><a href="./src/resources/tool-sets/secrets.ts">ToolSetSecretInfo</a></code>
- <code><a href="./src/resources/tool-sets/secrets.ts">ToolSetSecretSpec</a></code>

Methods:

- <code title="post /v1/workspaces/{workspaceId}/tool_sets/{toolSetId}/secrets">client.toolSets.secrets.<a href="./src/resources/tool-sets/secrets.ts">create</a>(toolSetID, { ...params }) -> ToolSetSecret</code>
- <code title="get /v1/workspaces/{workspaceId}/tool_sets/{toolSetId}/secrets/{id}">client.toolSets.secrets.<a href="./src/resources/tool-sets/secrets.ts">retrieve</a>(toolSetID, id, { ...params }) -> ToolSetSecret</code>
- <code title="patch /v1/workspaces/{workspaceId}/tool_sets/{toolSetId}/secrets/{id}">client.toolSets.secrets.<a href="./src/resources/tool-sets/secrets.ts">update</a>(toolSetID, id, { ...params }) -> ToolSetSecret</code>
- <code title="get /v1/workspaces/{workspaceId}/tool_sets/{toolSetId}/secrets">client.toolSets.secrets.<a href="./src/resources/tool-sets/secrets.ts">list</a>(toolSetID, { ...params }) -> ToolSetSecretsCursorPagination</code>
- <code title="delete /v1/workspaces/{workspaceId}/tool_sets/{toolSetId}/secrets/{id}">client.toolSets.secrets.<a href="./src/resources/tool-sets/secrets.ts">delete</a>(toolSetID, id, { ...params }) -> void</code>

# APIKeys

Types:

- <code><a href="./src/resources/api-keys.ts">APIKey</a></code>
- <code><a href="./src/resources/api-keys.ts">APIKeyInfo</a></code>
- <code><a href="./src/resources/api-keys.ts">APIKeySpec</a></code>

Methods:

- <code title="post /v1/workspaces/{workspaceId}/api_keys">client.apiKeys.<a href="./src/resources/api-keys.ts">create</a>({ ...params }) -> APIKey</code>
- <code title="get /v1/workspaces/{workspaceId}/api_keys/{id}">client.apiKeys.<a href="./src/resources/api-keys.ts">retrieve</a>(id, { ...params }) -> APIKey</code>
- <code title="patch /v1/workspaces/{workspaceId}/api_keys/{id}">client.apiKeys.<a href="./src/resources/api-keys.ts">update</a>(id, { ...params }) -> APIKey</code>
- <code title="get /v1/workspaces/{workspaceId}/api_keys">client.apiKeys.<a href="./src/resources/api-keys.ts">list</a>({ ...params }) -> APIKeysCursorPagination</code>
- <code title="delete /v1/workspaces/{workspaceId}/api_keys/{id}">client.apiKeys.<a href="./src/resources/api-keys.ts">delete</a>(id, { ...params }) -> void</code>
- <code title="post /v1/workspaces/{workspaceId}/api_keys/{id}:disable">client.apiKeys.<a href="./src/resources/api-keys.ts">disable</a>(id, { ...params }) -> APIKey</code>
- <code title="post /v1/workspaces/{workspaceId}/api_keys/{id}:enable">client.apiKeys.<a href="./src/resources/api-keys.ts">enable</a>(id, { ...params }) -> APIKey</code>
- <code title="post /v1/workspaces/{workspaceId}/api_keys/{id}:rotate">client.apiKeys.<a href="./src/resources/api-keys.ts">rotate</a>(id, { ...params }) -> APIKey</code>

# GlobalAPIKey

Methods:

- <code title="get /v1/account/global_api_key">client.globalAPIKey.<a href="./src/resources/global-api-key.ts">retrieve</a>() -> APIKey</code>
- <code title="post /v1/account/global_api_key:disable">client.globalAPIKey.<a href="./src/resources/global-api-key.ts">disable</a>() -> APIKey</code>
- <code title="post /v1/account/global_api_key:enable">client.globalAPIKey.<a href="./src/resources/global-api-key.ts">enable</a>() -> APIKey</code>
- <code title="post /v1/account/global_api_key:rotate">client.globalAPIKey.<a href="./src/resources/global-api-key.ts">rotate</a>() -> APIKey</code>

# WorkspaceSecrets

Types:

- <code><a href="./src/resources/workspace-secrets.ts">WorkspaceSecret</a></code>
- <code><a href="./src/resources/workspace-secrets.ts">WorkspaceSecretInfo</a></code>
- <code><a href="./src/resources/workspace-secrets.ts">WorkspaceSecretSpec</a></code>

Methods:

- <code title="post /v1/workspaces/{workspaceId}/workspace_secrets">client.workspaceSecrets.<a href="./src/resources/workspace-secrets.ts">create</a>({ ...params }) -> WorkspaceSecret</code>
- <code title="get /v1/workspaces/{workspaceId}/workspace_secrets/{id}">client.workspaceSecrets.<a href="./src/resources/workspace-secrets.ts">retrieve</a>(id, { ...params }) -> WorkspaceSecret</code>
- <code title="patch /v1/workspaces/{workspaceId}/workspace_secrets/{id}">client.workspaceSecrets.<a href="./src/resources/workspace-secrets.ts">update</a>(id, { ...params }) -> WorkspaceSecret</code>
- <code title="get /v1/workspaces/{workspaceId}/workspace_secrets">client.workspaceSecrets.<a href="./src/resources/workspace-secrets.ts">list</a>({ ...params }) -> WorkspaceSecretsCursorPagination</code>
- <code title="delete /v1/workspaces/{workspaceId}/workspace_secrets/{id}">client.workspaceSecrets.<a href="./src/resources/workspace-secrets.ts">delete</a>(id, { ...params }) -> void</code>

# Workspaces

Types:

- <code><a href="./src/resources/workspaces.ts">Workspace</a></code>
- <code><a href="./src/resources/workspaces.ts">WorkspaceSpec</a></code>

Methods:

- <code title="get /v1/workspaces">client.workspaces.<a href="./src/resources/workspaces.ts">list</a>({ ...params }) -> WorkspacesCursorPagination</code>

# WorkspaceAdmin

Types:

- <code><a href="./src/resources/workspace-admin/workspace-admin.ts">WorkspaceMember</a></code>

Methods:

- <code title="post /v1/account/workspaces">client.workspaceAdmin.<a href="./src/resources/workspace-admin/workspace-admin.ts">create</a>({ ...params }) -> Workspace</code>
- <code title="get /v1/account/workspaces/{workspaceId}">client.workspaceAdmin.<a href="./src/resources/workspace-admin/workspace-admin.ts">retrieve</a>({ ...params }) -> Workspace</code>
- <code title="patch /v1/account/workspaces/{workspaceId}">client.workspaceAdmin.<a href="./src/resources/workspace-admin/workspace-admin.ts">update</a>({ ...params }) -> Workspace</code>
- <code title="get /v1/account/workspaces">client.workspaceAdmin.<a href="./src/resources/workspace-admin/workspace-admin.ts">list</a>({ ...params }) -> WorkspacesCursorPagination</code>
- <code title="delete /v1/account/workspaces/{workspaceId}">client.workspaceAdmin.<a href="./src/resources/workspace-admin/workspace-admin.ts">archive</a>({ ...params }) -> void</code>

## Members

Methods:

- <code title="get /v1/account/workspaces/{workspaceId}/members">client.workspaceAdmin.members.<a href="./src/resources/workspace-admin/members.ts">list</a>({ ...params }) -> WorkspaceMembersCursorPagination</code>
- <code title="post /v1/account/workspaces/{workspaceId}/members">client.workspaceAdmin.members.<a href="./src/resources/workspace-admin/members.ts">add</a>({ ...params }) -> WorkspaceMember</code>
- <code title="delete /v1/account/workspaces/{workspaceId}/members/{profileId}">client.workspaceAdmin.members.<a href="./src/resources/workspace-admin/members.ts">remove</a>(profileID, { ...params }) -> void</code>

## Profiles

Methods:

- <code title="get /v1/account/profiles">client.workspaceAdmin.profiles.<a href="./src/resources/workspace-admin/profiles.ts">list</a>({ ...params }) -> ProfilesCursorPagination</code>

# Webhooks

Types:

- <code><a href="./src/resources/webhooks.ts">UnsafeUnwrapWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">UnwrapWebhookEvent</a></code>

Methods:

- <code>client.webhooks.<a href="./src/resources/webhooks.ts">unsafeUnwrap</a>(body) -> void</code>
- <code>client.webhooks.<a href="./src/resources/webhooks.ts">unwrap</a>(body) -> void</code>
