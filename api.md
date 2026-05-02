# Shared

Types:

- <code><a href="./src/resources/shared.ts">AccountResourceMetadata</a></code>
- <code><a href="./src/resources/shared.ts">BareMetadata</a></code>
- <code><a href="./src/resources/shared.ts">CreateOperationMetadata</a></code>
- <code><a href="./src/resources/shared.ts">CreateResourceMetadata</a></code>
- <code><a href="./src/resources/shared.ts">OperationMetadata</a></code>
- <code><a href="./src/resources/shared.ts">ResourceMetadata</a></code>
- <code><a href="./src/resources/shared.ts">UpdateResourceMetadata</a></code>

# Account

Types:

- <code><a href="./src/resources/account.ts">Account</a></code>
- <code><a href="./src/resources/account.ts">AccountSpec</a></code>
- <code><a href="./src/resources/account.ts">Profile</a></code>
- <code><a href="./src/resources/account.ts">ProfileSpec</a></code>
- <code><a href="./src/resources/account.ts">RotateWebhookSigningKeyResponse</a></code>

Methods:

- <code title="get /v1/account">client.account.<a href="./src/resources/account.ts">retrieve</a>() -> Account</code>
- <code title="post /v1/account/rotate_webhook_signing_key">client.account.<a href="./src/resources/account.ts">rotateWebhookSigningKey</a>() -> RotateWebhookSigningKeyResponse</code>

# Agents

Types:

- <code><a href="./src/resources/agents/agents.ts">Agent</a></code>
- <code><a href="./src/resources/agents/agents.ts">AgentInfo</a></code>
- <code><a href="./src/resources/agents/agents.ts">AgentSpec</a></code>
- <code><a href="./src/resources/agents/agents.ts">Page</a></code>

Methods:

- <code title="post /v1/agents">client.agents.<a href="./src/resources/agents/agents.ts">create</a>({ ...params }) -> Agent</code>
- <code title="get /v1/agents/{id}">client.agents.<a href="./src/resources/agents/agents.ts">retrieve</a>(id) -> Agent</code>
- <code title="patch /v1/agents/{id}">client.agents.<a href="./src/resources/agents/agents.ts">update</a>(id, { ...params }) -> Agent</code>
- <code title="get /v1/agents">client.agents.<a href="./src/resources/agents/agents.ts">list</a>({ ...params }) -> AgentsCursorPagination</code>
- <code title="delete /v1/agents/{id}">client.agents.<a href="./src/resources/agents/agents.ts">delete</a>(id) -> void</code>

## Feedback

Methods:

- <code title="get /v1/agents/{agentId}/feedback">client.agents.feedback.<a href="./src/resources/agents/feedback.ts">list</a>(agentID, { ...params }) -> ObjectiveFeedbacksCursorPagination</code>

## WebhookDeliveries

Types:

- <code><a href="./src/resources/agents/webhook-deliveries.ts">WebhookDelivery</a></code>
- <code><a href="./src/resources/agents/webhook-deliveries.ts">WebhookDeliveryData</a></code>

Methods:

- <code title="get /v1/agents/{agentId}/webhook_deliveries">client.agents.webhookDeliveries.<a href="./src/resources/agents/webhook-deliveries.ts">list</a>(agentID, { ...params }) -> WebhookDeliveriesCursorPagination</code>

## Variations

Types:

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
- <code><a href="./src/resources/agents/variations.ts">VariationMemoryLayerAssignment</a></code>

Methods:

- <code title="post /v1/agents/{agentId}/variations">client.agents.variations.<a href="./src/resources/agents/variations.ts">create</a>(agentID, { ...params }) -> AgentVariation</code>
- <code title="get /v1/agents/{agentId}/variations/{id}">client.agents.variations.<a href="./src/resources/agents/variations.ts">retrieve</a>(id, { ...params }) -> AgentVariation</code>
- <code title="patch /v1/agents/{agentId}/variations/{id}">client.agents.variations.<a href="./src/resources/agents/variations.ts">update</a>(id, { ...params }) -> AgentVariation</code>
- <code title="get /v1/agents/{agentId}/variations">client.agents.variations.<a href="./src/resources/agents/variations.ts">list</a>(agentID, { ...params }) -> AgentVariationsCursorPagination</code>
- <code title="delete /v1/agents/{agentId}/variations/{id}">client.agents.variations.<a href="./src/resources/agents/variations.ts">delete</a>(id, { ...params }) -> void</code>
- <code title="post /v1/agents/{agentId}/variations/{variationId}/assignments">client.agents.variations.<a href="./src/resources/agents/variations.ts">addAssignment</a>(variationID, { ...params }) -> VariationAssignment</code>
- <code title="post /v1/agents/{agentId}/variations/{variationId}/memory_layer_assignments">client.agents.variations.<a href="./src/resources/agents/variations.ts">addMemoryLayer</a>(variationID, { ...params }) -> VariationMemoryLayerAssignment</code>
- <code title="delete /v1/agents/{agentId}/variations/{variationId}/assignments/{id}">client.agents.variations.<a href="./src/resources/agents/variations.ts">removeAssignment</a>(id, { ...params }) -> void</code>
- <code title="delete /v1/agents/{agentId}/variations/{variationId}/memory_layer_assignments/{id}">client.agents.variations.<a href="./src/resources/agents/variations.ts">removeMemoryLayer</a>(id, { ...params }) -> void</code>
- <code title="patch /v1/agents/{agentId}/variations/{variationId}/memory_layer_assignments/{id}">client.agents.variations.<a href="./src/resources/agents/variations.ts">updateMemoryLayer</a>(id, { ...params }) -> VariationMemoryLayerAssignment</code>

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

- <code title="post /v1/agents/{agentId}/schedules">client.agents.schedules.<a href="./src/resources/agents/schedules.ts">create</a>(agentID, { ...params }) -> AgentSchedule</code>
- <code title="get /v1/agents/{agentId}/schedules/{id}">client.agents.schedules.<a href="./src/resources/agents/schedules.ts">retrieve</a>(id, { ...params }) -> AgentSchedule</code>
- <code title="patch /v1/agents/{agentId}/schedules/{id}">client.agents.schedules.<a href="./src/resources/agents/schedules.ts">update</a>(id, { ...params }) -> AgentSchedule</code>
- <code title="get /v1/agents/{agentId}/schedules">client.agents.schedules.<a href="./src/resources/agents/schedules.ts">list</a>(agentID, { ...params }) -> AgentSchedulesCursorPagination</code>
- <code title="delete /v1/agents/{agentId}/schedules/{id}">client.agents.schedules.<a href="./src/resources/agents/schedules.ts">delete</a>(id, { ...params }) -> void</code>

# Objectives

Types:

- <code><a href="./src/resources/objectives/objectives.ts">AssistantMessage</a></code>
- <code><a href="./src/resources/objectives/objectives.ts">AssistantToolCall</a></code>
- <code><a href="./src/resources/objectives/objectives.ts">CallableTool</a></code>
- <code><a href="./src/resources/objectives/objectives.ts">ContextWindowCompacted</a></code>
- <code><a href="./src/resources/objectives/objectives.ts">MemoryRead</a></code>
- <code><a href="./src/resources/objectives/objectives.ts">MemoryReference</a></code>
- <code><a href="./src/resources/objectives/objectives.ts">Objective</a></code>
- <code><a href="./src/resources/objectives/objectives.ts">ObjectiveContextWindow</a></code>
- <code><a href="./src/resources/objectives/objectives.ts">ObjectiveContextWindowData</a></code>
- <code><a href="./src/resources/objectives/objectives.ts">ObjectiveData</a></code>
- <code><a href="./src/resources/objectives/objectives.ts">ObjectiveDataSecret</a></code>
- <code><a href="./src/resources/objectives/objectives.ts">ObjectiveError</a></code>
- <code><a href="./src/resources/objectives/objectives.ts">ObjectiveEventData</a></code>
- <code><a href="./src/resources/objectives/objectives.ts">ObjectiveEventInfo</a></code>
- <code><a href="./src/resources/objectives/objectives.ts">ObjectiveEventWebhookData</a></code>
- <code><a href="./src/resources/objectives/objectives.ts">ObjectiveInfo</a></code>
- <code><a href="./src/resources/objectives/objectives.ts">ObjectiveStatus</a></code>
- <code><a href="./src/resources/objectives/objectives.ts">SubObjectiveCreated</a></code>
- <code><a href="./src/resources/objectives/objectives.ts">ToolApprovalRequested</a></code>
- <code><a href="./src/resources/objectives/objectives.ts">ToolApproved</a></code>
- <code><a href="./src/resources/objectives/objectives.ts">ToolCalled</a></code>
- <code><a href="./src/resources/objectives/objectives.ts">ToolDenied</a></code>
- <code><a href="./src/resources/objectives/objectives.ts">ToolError</a></code>
- <code><a href="./src/resources/objectives/objectives.ts">ToolResult</a></code>
- <code><a href="./src/resources/objectives/objectives.ts">UserMessage</a></code>
- <code><a href="./src/resources/objectives/objectives.ts">ObjectiveCompactResponse</a></code>
- <code><a href="./src/resources/objectives/objectives.ts">ObjectiveContinueResponse</a></code>
- <code><a href="./src/resources/objectives/objectives.ts">ObjectiveListEventsResponse</a></code>

Methods:

- <code title="post /v1/objectives">client.objectives.<a href="./src/resources/objectives/objectives.ts">create</a>({ ...params }) -> Objective</code>
- <code title="get /v1/objectives/{id}">client.objectives.<a href="./src/resources/objectives/objectives.ts">retrieve</a>(id) -> Objective</code>
- <code title="get /v1/objectives">client.objectives.<a href="./src/resources/objectives/objectives.ts">list</a>({ ...params }) -> ObjectivesCursorPagination</code>
- <code title="post /v1/objectives/{objectiveId}/cancel">client.objectives.<a href="./src/resources/objectives/objectives.ts">cancel</a>(objectiveID, { ...params }) -> Objective</code>
- <code title="post /v1/objectives/{objectiveId}/compact">client.objectives.<a href="./src/resources/objectives/objectives.ts">compact</a>(objectiveID, { ...params }) -> ObjectiveCompactResponse</code>
- <code title="post /v1/objectives/{objectiveId}/continue">client.objectives.<a href="./src/resources/objectives/objectives.ts">continue</a>(objectiveID, { ...params }) -> ObjectiveContinueResponse</code>
- <code title="get /v1/objectives/{objectiveId}/context_windows">client.objectives.<a href="./src/resources/objectives/objectives.ts">listContextWindows</a>(objectiveID, { ...params }) -> ObjectiveContextWindowsCursorPagination</code>
- <code title="get /v1/objectives/{objectiveId}/events">client.objectives.<a href="./src/resources/objectives/objectives.ts">listEvents</a>(objectiveID, { ...params }) -> ObjectiveListEventsResponsesCursorPagination</code>

## Tools

Types:

- <code><a href="./src/resources/objectives/tools.ts">ObjectiveTool</a></code>

Methods:

- <code title="get /v1/objectives/{objectiveId}/tools">client.objectives.tools.<a href="./src/resources/objectives/tools.ts">list</a>(objectiveID, { ...params }) -> ObjectiveToolsCursorPagination</code>

## ToolCalls

Types:

- <code><a href="./src/resources/objectives/tool-calls.ts">ObjectiveToolCall</a></code>
- <code><a href="./src/resources/objectives/tool-calls.ts">ObjectiveToolCallData</a></code>
- <code><a href="./src/resources/objectives/tool-calls.ts">ObjectiveToolCallInfo</a></code>

Methods:

- <code title="get /v1/objectives/{objectiveId}/tool_calls">client.objectives.toolCalls.<a href="./src/resources/objectives/tool-calls.ts">list</a>(objectiveID, { ...params }) -> ObjectiveToolCallsCursorPagination</code>
- <code title="put /v1/objectives/{objectiveId}/tool_calls/{toolCallId}/approve">client.objectives.toolCalls.<a href="./src/resources/objectives/tool-calls.ts">approve</a>(toolCallID, { ...params }) -> ObjectiveToolCall</code>
- <code title="put /v1/objectives/{objectiveId}/tool_calls/{toolCallId}/deny">client.objectives.toolCalls.<a href="./src/resources/objectives/tool-calls.ts">deny</a>(toolCallID, { ...params }) -> ObjectiveToolCall</code>

## Tasks

Types:

- <code><a href="./src/resources/objectives/tasks.ts">ObjectiveTask</a></code>
- <code><a href="./src/resources/objectives/tasks.ts">ObjectiveTaskData</a></code>

Methods:

- <code title="get /v1/objectives/{objectiveId}/tasks/{id}">client.objectives.tasks.<a href="./src/resources/objectives/tasks.ts">retrieve</a>(id, { ...params }) -> ObjectiveTask</code>
- <code title="get /v1/objectives/{objectiveId}/tasks">client.objectives.tasks.<a href="./src/resources/objectives/tasks.ts">list</a>(objectiveID, { ...params }) -> ObjectiveTasksCursorPagination</code>

## Feedback

Types:

- <code><a href="./src/resources/objectives/feedback.ts">ObjectiveFeedback</a></code>
- <code><a href="./src/resources/objectives/feedback.ts">ObjectiveFeedbackData</a></code>
- <code><a href="./src/resources/objectives/feedback.ts">ObjectiveFeedbackInfo</a></code>

Methods:

- <code title="post /v1/objectives/{objectiveId}/feedback">client.objectives.feedback.<a href="./src/resources/objectives/feedback.ts">create</a>(objectiveID, { ...params }) -> ObjectiveFeedback</code>
- <code title="get /v1/objectives/{objectiveId}/feedback">client.objectives.feedback.<a href="./src/resources/objectives/feedback.ts">list</a>(objectiveID, { ...params }) -> ObjectiveFeedbacksCursorPagination</code>

# MemoryLayers

Types:

- <code><a href="./src/resources/memory-layers/memory-layers.ts">MemoryLayer</a></code>
- <code><a href="./src/resources/memory-layers/memory-layers.ts">MemoryLayerInfo</a></code>
- <code><a href="./src/resources/memory-layers/memory-layers.ts">MemoryLayerSpec</a></code>

Methods:

- <code title="post /v1/memory_layers">client.memoryLayers.<a href="./src/resources/memory-layers/memory-layers.ts">create</a>({ ...params }) -> MemoryLayer</code>
- <code title="get /v1/memory_layers/{id}">client.memoryLayers.<a href="./src/resources/memory-layers/memory-layers.ts">retrieve</a>(id) -> MemoryLayer</code>
- <code title="patch /v1/memory_layers/{id}">client.memoryLayers.<a href="./src/resources/memory-layers/memory-layers.ts">update</a>(id, { ...params }) -> MemoryLayer</code>
- <code title="get /v1/memory_layers">client.memoryLayers.<a href="./src/resources/memory-layers/memory-layers.ts">list</a>({ ...params }) -> MemoryLayersCursorPagination</code>
- <code title="delete /v1/memory_layers/{id}">client.memoryLayers.<a href="./src/resources/memory-layers/memory-layers.ts">delete</a>(id) -> void</code>

## Entries

Types:

- <code><a href="./src/resources/memory-layers/entries.ts">MemoryEntry</a></code>
- <code><a href="./src/resources/memory-layers/entries.ts">MemoryEntryCreateSpec</a></code>
- <code><a href="./src/resources/memory-layers/entries.ts">MemoryEntryDetail</a></code>
- <code><a href="./src/resources/memory-layers/entries.ts">MemoryEntryInfo</a></code>
- <code><a href="./src/resources/memory-layers/entries.ts">MemoryEntrySpec</a></code>
- <code><a href="./src/resources/memory-layers/entries.ts">MemoryEntryUpdateSpec</a></code>

Methods:

- <code title="post /v1/memory_layers/{memoryLayerId}/entries">client.memoryLayers.entries.<a href="./src/resources/memory-layers/entries.ts">create</a>(memoryLayerID, { ...params }) -> MemoryEntryDetail</code>
- <code title="get /v1/memory_layers/{memoryLayerId}/entries/{id}">client.memoryLayers.entries.<a href="./src/resources/memory-layers/entries.ts">retrieve</a>(id, { ...params }) -> MemoryEntryDetail</code>
- <code title="patch /v1/memory_layers/{memoryLayerId}/entries/{id}">client.memoryLayers.entries.<a href="./src/resources/memory-layers/entries.ts">update</a>(id, { ...params }) -> MemoryEntryDetail</code>
- <code title="get /v1/memory_layers/{memoryLayerId}/entries">client.memoryLayers.entries.<a href="./src/resources/memory-layers/entries.ts">list</a>(memoryLayerID, { ...params }) -> MemoryEntriesCursorPagination</code>
- <code title="delete /v1/memory_layers/{memoryLayerId}/entries/{id}">client.memoryLayers.entries.<a href="./src/resources/memory-layers/entries.ts">delete</a>(id, { ...params }) -> void</code>

# Uploads

Types:

- <code><a href="./src/resources/uploads.ts">Upload</a></code>
- <code><a href="./src/resources/uploads.ts">UploadInfo</a></code>
- <code><a href="./src/resources/uploads.ts">UploadSpec</a></code>

Methods:

- <code title="post /v1/uploads">client.uploads.<a href="./src/resources/uploads.ts">create</a>({ ...params }) -> Upload</code>
- <code title="get /v1/uploads/{id}">client.uploads.<a href="./src/resources/uploads.ts">retrieve</a>(id) -> Upload</code>

# Models

Types:

- <code><a href="./src/resources/models.ts">Model</a></code>
- <code><a href="./src/resources/models.ts">ModelSpec</a></code>

Methods:

- <code title="get /v1/models/{id}">client.models.<a href="./src/resources/models.ts">retrieve</a>(id) -> Model</code>
- <code title="get /v1/models">client.models.<a href="./src/resources/models.ts">list</a>({ ...params }) -> ModelsCursorPagination</code>
- <code title="put /v1/models/{id}/status">client.models.<a href="./src/resources/models.ts">setStatus</a>(id, { ...params }) -> Model</code>

# Search

Types:

- <code><a href="./src/resources/search.ts">SearchSearchToolsOrToolSetsResponse</a></code>

Methods:

- <code title="get /v1/search/tools_or_tool_sets">client.search.<a href="./src/resources/search.ts">searchToolsOrToolSets</a>({ ...params }) -> SearchSearchToolsOrToolSetsResponse</code>

# ToolSets

Types:

- <code><a href="./src/resources/tool-sets/tool-sets.ts">McpToolFilter</a></code>
- <code><a href="./src/resources/tool-sets/tool-sets.ts">SyncCompleted</a></code>
- <code><a href="./src/resources/tool-sets/tool-sets.ts">SyncFailed</a></code>
- <code><a href="./src/resources/tool-sets/tool-sets.ts">SyncStarted</a></code>
- <code><a href="./src/resources/tool-sets/tool-sets.ts">ToolSet</a></code>
- <code><a href="./src/resources/tool-sets/tool-sets.ts">ToolSetAdapter</a></code>
- <code><a href="./src/resources/tool-sets/tool-sets.ts">ToolSetAdapterHTTP</a></code>
- <code><a href="./src/resources/tool-sets/tool-sets.ts">ToolSetAdapterMcp</a></code>
- <code><a href="./src/resources/tool-sets/tool-sets.ts">ToolSetEvent</a></code>
- <code><a href="./src/resources/tool-sets/tool-sets.ts">ToolSetEventData</a></code>
- <code><a href="./src/resources/tool-sets/tool-sets.ts">ToolSetInfo</a></code>
- <code><a href="./src/resources/tool-sets/tool-sets.ts">ToolSetSpec</a></code>

Methods:

- <code title="post /v1/tool_sets">client.toolSets.<a href="./src/resources/tool-sets/tool-sets.ts">create</a>({ ...params }) -> ToolSet</code>
- <code title="get /v1/tool_sets/{id}">client.toolSets.<a href="./src/resources/tool-sets/tool-sets.ts">retrieve</a>(id) -> ToolSet</code>
- <code title="put /v1/tool_sets/{id}">client.toolSets.<a href="./src/resources/tool-sets/tool-sets.ts">update</a>(id, { ...params }) -> ToolSet</code>
- <code title="get /v1/tool_sets">client.toolSets.<a href="./src/resources/tool-sets/tool-sets.ts">list</a>({ ...params }) -> ToolSetsCursorPagination</code>
- <code title="delete /v1/tool_sets/{id}">client.toolSets.<a href="./src/resources/tool-sets/tool-sets.ts">delete</a>(id) -> void</code>
- <code title="get /v1/tool_sets/{toolSetId}/events">client.toolSets.<a href="./src/resources/tool-sets/tool-sets.ts">listEvents</a>(toolSetID, { ...params }) -> ToolSetEventsCursorPagination</code>

## Tools

Types:

- <code><a href="./src/resources/tool-sets/tools.ts">ConfigHTTP</a></code>
- <code><a href="./src/resources/tool-sets/tools.ts">ConfigMcp</a></code>
- <code><a href="./src/resources/tool-sets/tools.ts">Tool</a></code>
- <code><a href="./src/resources/tool-sets/tools.ts">ToolInfo</a></code>
- <code><a href="./src/resources/tool-sets/tools.ts">ToolSpec</a></code>
- <code><a href="./src/resources/tool-sets/tools.ts">ToolSpecConfig</a></code>

Methods:

- <code title="post /v1/tool_sets/{toolSetId}/tools">client.toolSets.tools.<a href="./src/resources/tool-sets/tools.ts">create</a>(toolSetID, { ...params }) -> Tool</code>
- <code title="get /v1/tool_sets/{toolSetId}/tools/{id}">client.toolSets.tools.<a href="./src/resources/tool-sets/tools.ts">retrieve</a>(id, { ...params }) -> Tool</code>
- <code title="put /v1/tool_sets/{toolSetId}/tools/{id}">client.toolSets.tools.<a href="./src/resources/tool-sets/tools.ts">update</a>(id, { ...params }) -> Tool</code>
- <code title="get /v1/tool_sets/{toolSetId}/tools">client.toolSets.tools.<a href="./src/resources/tool-sets/tools.ts">list</a>(toolSetID, { ...params }) -> ToolsCursorPagination</code>
- <code title="delete /v1/tool_sets/{toolSetId}/tools/{id}">client.toolSets.tools.<a href="./src/resources/tool-sets/tools.ts">delete</a>(id, { ...params }) -> void</code>

# APIKeys

Types:

- <code><a href="./src/resources/api-keys.ts">APIKey</a></code>
- <code><a href="./src/resources/api-keys.ts">APIKeyInfo</a></code>
- <code><a href="./src/resources/api-keys.ts">APIKeySpec</a></code>

Methods:

- <code title="post /v1/api_keys">client.apiKeys.<a href="./src/resources/api-keys.ts">create</a>({ ...params }) -> APIKey</code>
- <code title="get /v1/api_keys/{id}">client.apiKeys.<a href="./src/resources/api-keys.ts">retrieve</a>(id) -> APIKey</code>
- <code title="patch /v1/api_keys/{id}">client.apiKeys.<a href="./src/resources/api-keys.ts">update</a>(id, { ...params }) -> APIKey</code>
- <code title="get /v1/api_keys">client.apiKeys.<a href="./src/resources/api-keys.ts">list</a>({ ...params }) -> APIKeysCursorPagination</code>
- <code title="delete /v1/api_keys/{id}">client.apiKeys.<a href="./src/resources/api-keys.ts">delete</a>(id) -> void</code>
- <code title="put /v1/api_keys/{id}/rotate">client.apiKeys.<a href="./src/resources/api-keys.ts">rotate</a>(id) -> APIKey</code>

# WorkspaceSecrets

Types:

- <code><a href="./src/resources/workspace-secrets.ts">WorkspaceSecret</a></code>
- <code><a href="./src/resources/workspace-secrets.ts">WorkspaceSecretInfo</a></code>
- <code><a href="./src/resources/workspace-secrets.ts">WorkspaceSecretSpec</a></code>

Methods:

- <code title="post /v1/workspace_secrets">client.workspaceSecrets.<a href="./src/resources/workspace-secrets.ts">create</a>({ ...params }) -> WorkspaceSecret</code>
- <code title="get /v1/workspace_secrets/{id}">client.workspaceSecrets.<a href="./src/resources/workspace-secrets.ts">retrieve</a>(id) -> WorkspaceSecret</code>
- <code title="patch /v1/workspace_secrets/{id}">client.workspaceSecrets.<a href="./src/resources/workspace-secrets.ts">update</a>(id, { ...params }) -> WorkspaceSecret</code>
- <code title="get /v1/workspace_secrets">client.workspaceSecrets.<a href="./src/resources/workspace-secrets.ts">list</a>({ ...params }) -> WorkspaceSecretsCursorPagination</code>
- <code title="delete /v1/workspace_secrets/{id}">client.workspaceSecrets.<a href="./src/resources/workspace-secrets.ts">delete</a>(id) -> void</code>

# Workspaces

Types:

- <code><a href="./src/resources/workspaces.ts">Workspace</a></code>
- <code><a href="./src/resources/workspaces.ts">WorkspaceSpec</a></code>

Methods:

- <code title="get /v1/workspaces">client.workspaces.<a href="./src/resources/workspaces.ts">list</a>({ ...params }) -> WorkspacesCursorPagination</code>
- <code title="get /v1/workspaces/current">client.workspaces.<a href="./src/resources/workspaces.ts">get</a>() -> Workspace</code>

# Webhooks

Types:

- <code><a href="./src/resources/webhooks.ts">UnsafeUnwrapWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">UnwrapWebhookEvent</a></code>

Methods:

- <code>client.webhooks.<a href="./src/resources/webhooks.ts">unsafeUnwrap</a>(body) -> void</code>
- <code>client.webhooks.<a href="./src/resources/webhooks.ts">unwrap</a>(body) -> void</code>

# BulkWorkspaceResources

Types:

- <code><a href="./src/resources/bulk-workspace-resources/bulk-workspace-resources.ts">AgentEntry</a></code>
- <code><a href="./src/resources/bulk-workspace-resources/bulk-workspace-resources.ts">AgentScheduleEntry</a></code>
- <code><a href="./src/resources/bulk-workspace-resources/bulk-workspace-resources.ts">AgentVariationEntry</a></code>
- <code><a href="./src/resources/bulk-workspace-resources/bulk-workspace-resources.ts">BulkWorkspaceApply</a></code>
- <code><a href="./src/resources/bulk-workspace-resources/bulk-workspace-resources.ts">BulkWorkspaceApplyData</a></code>
- <code><a href="./src/resources/bulk-workspace-resources/bulk-workspace-resources.ts">BulkWorkspaceApplyInfo</a></code>
- <code><a href="./src/resources/bulk-workspace-resources/bulk-workspace-resources.ts">BulkWorkspaceApplyStatus</a></code>
- <code><a href="./src/resources/bulk-workspace-resources/bulk-workspace-resources.ts">MemoryEntryItem</a></code>
- <code><a href="./src/resources/bulk-workspace-resources/bulk-workspace-resources.ts">MemoryLayerEntry</a></code>
- <code><a href="./src/resources/bulk-workspace-resources/bulk-workspace-resources.ts">ToolEntry</a></code>
- <code><a href="./src/resources/bulk-workspace-resources/bulk-workspace-resources.ts">ToolSetEntry</a></code>
- <code><a href="./src/resources/bulk-workspace-resources/bulk-workspace-resources.ts">VariationAssignmentEntry</a></code>
- <code><a href="./src/resources/bulk-workspace-resources/bulk-workspace-resources.ts">VariationMemoryLayerEntry</a></code>

Methods:

- <code title="get /v1/bulk_workspace_applies/{id}">client.bulkWorkspaceResources.<a href="./src/resources/bulk-workspace-resources/bulk-workspace-resources.ts">retrieve</a>(id) -> BulkWorkspaceApply</code>
- <code title="get /v1/bulk_workspace_applies">client.bulkWorkspaceResources.<a href="./src/resources/bulk-workspace-resources/bulk-workspace-resources.ts">list</a>({ ...params }) -> BulkWorkspaceAppliesCursorPagination</code>
- <code title="post /v1/bulk_workspace_applies">client.bulkWorkspaceResources.<a href="./src/resources/bulk-workspace-resources/bulk-workspace-resources.ts">apply</a>({ ...params }) -> BulkWorkspaceApply</code>

## Results

Types:

- <code><a href="./src/resources/bulk-workspace-resources/results.ts">BulkWorkspaceApplyResult</a></code>
- <code><a href="./src/resources/bulk-workspace-resources/results.ts">BulkWorkspaceApplyResultData</a></code>
- <code><a href="./src/resources/bulk-workspace-resources/results.ts">BulkWorkspaceApplyResultDataAgentOutcome</a></code>
- <code><a href="./src/resources/bulk-workspace-resources/results.ts">BulkWorkspaceApplyResultDataAgentScheduleOutcome</a></code>
- <code><a href="./src/resources/bulk-workspace-resources/results.ts">BulkWorkspaceApplyResultDataAgentVariationOutcome</a></code>
- <code><a href="./src/resources/bulk-workspace-resources/results.ts">BulkWorkspaceApplyResultDataMemoryEntryOutcome</a></code>
- <code><a href="./src/resources/bulk-workspace-resources/results.ts">BulkWorkspaceApplyResultDataMemoryLayerOutcome</a></code>
- <code><a href="./src/resources/bulk-workspace-resources/results.ts">BulkWorkspaceApplyResultDataToolOutcome</a></code>
- <code><a href="./src/resources/bulk-workspace-resources/results.ts">BulkWorkspaceApplyResultDataToolSetOutcome</a></code>
- <code><a href="./src/resources/bulk-workspace-resources/results.ts">BulkWorkspaceApplyResultDataVariationAssignmentOutcome</a></code>
- <code><a href="./src/resources/bulk-workspace-resources/results.ts">BulkWorkspaceApplyResultDataVariationMemoryLayerOutcome</a></code>

Methods:

- <code title="get /v1/bulk_workspace_applies/{bulkWorkspaceApplyId}/results">client.bulkWorkspaceResources.results.<a href="./src/resources/bulk-workspace-resources/results.ts">list</a>(bulkWorkspaceApplyID, { ...params }) -> BulkWorkspaceApplyResultsCursorPagination</code>
