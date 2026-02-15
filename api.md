# Shared

Types:

- <code><a href="./src/resources/shared.ts">Actor</a></code>
- <code><a href="./src/resources/shared.ts">CallableTool</a></code>
- <code><a href="./src/resources/shared.ts">OperationMetadata</a></code>
- <code><a href="./src/resources/shared.ts">ResourceMetadata</a></code>
- <code><a href="./src/resources/shared.ts">Workspace</a></code>

# Account

Types:

- <code><a href="./src/resources/account.ts">Account</a></code>

Methods:

- <code title="get /v1/account">client.account.<a href="./src/resources/account.ts">retrieve</a>() -> Account</code>

# Agents

Types:

- <code><a href="./src/resources/agents/agents.ts">Agent</a></code>
- <code><a href="./src/resources/agents/agents.ts">AgentSpec</a></code>
- <code><a href="./src/resources/agents/agents.ts">Page</a></code>

Methods:

- <code title="post /v1/agents">client.agents.<a href="./src/resources/agents/agents.ts">create</a>({ ...params }) -> Agent</code>
- <code title="get /v1/agents/{id}">client.agents.<a href="./src/resources/agents/agents.ts">retrieve</a>(id) -> Agent</code>
- <code title="patch /v1/agents/{id}">client.agents.<a href="./src/resources/agents/agents.ts">update</a>(id, { ...params }) -> Agent</code>
- <code title="get /v1/agents">client.agents.<a href="./src/resources/agents/agents.ts">list</a>({ ...params }) -> AgentsCursorPagination</code>
- <code title="delete /v1/agents/{id}">client.agents.<a href="./src/resources/agents/agents.ts">delete</a>(id) -> void</code>

## Variations

Types:

- <code><a href="./src/resources/agents/variations.ts">AgentVariation</a></code>
- <code><a href="./src/resources/agents/variations.ts">AgentVariationSpec</a></code>
- <code><a href="./src/resources/agents/variations.ts">AgentVariationSpecAgentMemory</a></code>
- <code><a href="./src/resources/agents/variations.ts">AgentVariationSpecAgentTool</a></code>
- <code><a href="./src/resources/agents/variations.ts">AgentVariationSpecConstraints</a></code>
- <code><a href="./src/resources/agents/variations.ts">AgentVariationSpecToolSelection</a></code>
- <code><a href="./src/resources/agents/variations.ts">ToolSelectionAssignedTools</a></code>
- <code><a href="./src/resources/agents/variations.ts">ToolSelectionAutoDiscovery</a></code>

Methods:

- <code title="post /v1/agents/{agentId}/variations">client.agents.variations.<a href="./src/resources/agents/variations.ts">create</a>(agentID, { ...params }) -> AgentVariation</code>
- <code title="get /v1/agents/{agentId}/variations/{id}">client.agents.variations.<a href="./src/resources/agents/variations.ts">retrieve</a>(id, { ...params }) -> AgentVariation</code>
- <code title="patch /v1/agents/{agentId}/variations/{id}">client.agents.variations.<a href="./src/resources/agents/variations.ts">update</a>(id, { ...params }) -> AgentVariation</code>
- <code title="get /v1/agents/{agentId}/variations">client.agents.variations.<a href="./src/resources/agents/variations.ts">list</a>(agentID, { ...params }) -> AgentVariationsCursorPagination</code>
- <code title="delete /v1/agents/{agentId}/variations/{id}">client.agents.variations.<a href="./src/resources/agents/variations.ts">delete</a>(id, { ...params }) -> void</code>

## WebhookDeliveries

Types:

- <code><a href="./src/resources/agents/webhook-deliveries.ts">WebhookDelivery</a></code>

Methods:

- <code title="get /v1/agents/{agentId}/webhook_deliveries">client.agents.webhookDeliveries.<a href="./src/resources/agents/webhook-deliveries.ts">list</a>(agentID, { ...params }) -> WebhookDeliveriesCursorPagination</code>

# Objectives

Types:

- <code><a href="./src/resources/objectives.ts">Objective</a></code>
- <code><a href="./src/resources/objectives.ts">ObjectiveSpec</a></code>
- <code><a href="./src/resources/objectives.ts">ObjectiveApproveToolCallResponse</a></code>
- <code><a href="./src/resources/objectives.ts">ObjectiveContinueResponse</a></code>
- <code><a href="./src/resources/objectives.ts">ObjectiveDenyToolCallResponse</a></code>
- <code><a href="./src/resources/objectives.ts">ObjectiveListEventsResponse</a></code>

Methods:

- <code title="post /v1/objectives">client.objectives.<a href="./src/resources/objectives.ts">create</a>({ ...params }) -> Objective</code>
- <code title="get /v1/objectives/{id}">client.objectives.<a href="./src/resources/objectives.ts">retrieve</a>(id) -> Objective</code>
- <code title="get /v1/objectives">client.objectives.<a href="./src/resources/objectives.ts">list</a>({ ...params }) -> ObjectivesCursorPagination</code>
- <code title="put /v1/objectives/{objectiveId}/approve_tool_call/{objectiveEventId}">client.objectives.<a href="./src/resources/objectives.ts">approveToolCall</a>(objectiveEventID, { ...params }) -> ObjectiveApproveToolCallResponse</code>
- <code title="post /v1/objectives/{objectiveId}/continue">client.objectives.<a href="./src/resources/objectives.ts">continue</a>(objectiveID, { ...params }) -> ObjectiveContinueResponse</code>
- <code title="put /v1/objectives/{objectiveId}/deny_tool_call/{objectiveEventId}">client.objectives.<a href="./src/resources/objectives.ts">denyToolCall</a>(objectiveEventID, { ...params }) -> ObjectiveDenyToolCallResponse</code>
- <code title="get /v1/objectives/{objectiveId}/events">client.objectives.<a href="./src/resources/objectives.ts">listEvents</a>(objectiveID, { ...params }) -> ObjectiveListEventsResponsesCursorPagination</code>

# Ping

Types:

- <code><a href="./src/resources/ping.ts">PingCheckResponse</a></code>

Methods:

- <code title="get /v1/ping">client.ping.<a href="./src/resources/ping.ts">check</a>() -> PingCheckResponse</code>

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
- <code><a href="./src/resources/tool-sets/tools.ts">ToolSpec</a></code>
- <code><a href="./src/resources/tool-sets/tools.ts">ToolSpecConfig</a></code>
- <code><a href="./src/resources/tool-sets/tools.ts">ToolSpecContentFilter</a></code>

Methods:

- <code title="post /v1/tool_sets/{toolSetId}/tools">client.toolSets.tools.<a href="./src/resources/tool-sets/tools.ts">create</a>(toolSetID, { ...params }) -> Tool</code>
- <code title="get /v1/tool_sets/{toolSetId}/tools/{id}">client.toolSets.tools.<a href="./src/resources/tool-sets/tools.ts">retrieve</a>(id, { ...params }) -> Tool</code>
- <code title="put /v1/tool_sets/{toolSetId}/tools/{id}">client.toolSets.tools.<a href="./src/resources/tool-sets/tools.ts">update</a>(id, { ...params }) -> Tool</code>
- <code title="get /v1/tool_sets/{toolSetId}/tools">client.toolSets.tools.<a href="./src/resources/tool-sets/tools.ts">list</a>(toolSetID, { ...params }) -> ToolsCursorPagination</code>
- <code title="delete /v1/tool_sets/{toolSetId}/tools/{id}">client.toolSets.tools.<a href="./src/resources/tool-sets/tools.ts">delete</a>(id, { ...params }) -> void</code>

# APIKeys

Types:

- <code><a href="./src/resources/api-keys.ts">APIKey</a></code>
- <code><a href="./src/resources/api-keys.ts">APIKeySpec</a></code>

Methods:

- <code title="post /v1/api_keys">client.apiKeys.<a href="./src/resources/api-keys.ts">create</a>({ ...params }) -> APIKey</code>
- <code title="get /v1/api_keys/{id}">client.apiKeys.<a href="./src/resources/api-keys.ts">retrieve</a>(id) -> APIKey</code>
- <code title="patch /v1/api_keys/{id}">client.apiKeys.<a href="./src/resources/api-keys.ts">update</a>(id, { ...params }) -> APIKey</code>
- <code title="get /v1/api_keys">client.apiKeys.<a href="./src/resources/api-keys.ts">list</a>({ ...params }) -> APIKeysCursorPagination</code>
- <code title="delete /v1/api_keys/{id}">client.apiKeys.<a href="./src/resources/api-keys.ts">delete</a>(id) -> void</code>

# WorkspaceSecrets

Types:

- <code><a href="./src/resources/workspace-secrets.ts">WorkspaceSecret</a></code>
- <code><a href="./src/resources/workspace-secrets.ts">WorkspaceSecretSpec</a></code>

Methods:

- <code title="post /v1/workspace_secrets">client.workspaceSecrets.<a href="./src/resources/workspace-secrets.ts">create</a>({ ...params }) -> WorkspaceSecret</code>
- <code title="get /v1/workspace_secrets/{id}">client.workspaceSecrets.<a href="./src/resources/workspace-secrets.ts">retrieve</a>(id) -> WorkspaceSecret</code>
- <code title="patch /v1/workspace_secrets/{id}">client.workspaceSecrets.<a href="./src/resources/workspace-secrets.ts">update</a>(id, { ...params }) -> WorkspaceSecret</code>
- <code title="get /v1/workspace_secrets">client.workspaceSecrets.<a href="./src/resources/workspace-secrets.ts">list</a>({ ...params }) -> WorkspaceSecretsCursorPagination</code>
- <code title="delete /v1/workspace_secrets/{id}">client.workspaceSecrets.<a href="./src/resources/workspace-secrets.ts">delete</a>(id) -> void</code>

# Workspaces

Types:

- <code><a href="./src/resources/workspaces.ts">WorkspaceSpec</a></code>

Methods:

- <code title="post /v1/workspaces">client.workspaces.<a href="./src/resources/workspaces.ts">create</a>({ ...params }) -> Workspace</code>
- <code title="get /v1/workspaces">client.workspaces.<a href="./src/resources/workspaces.ts">list</a>({ ...params }) -> WorkspacesCursorPagination</code>

# MemoryFolders

Types:

- <code><a href="./src/resources/memory-folders.ts">MemoryFolder</a></code>
- <code><a href="./src/resources/memory-folders.ts">MemoryFolderSpec</a></code>

Methods:

- <code title="post /v1/memory_folders">client.memoryFolders.<a href="./src/resources/memory-folders.ts">create</a>({ ...params }) -> MemoryFolder</code>
- <code title="get /v1/memory_folders/{id}">client.memoryFolders.<a href="./src/resources/memory-folders.ts">retrieve</a>(id) -> MemoryFolder</code>
- <code title="patch /v1/memory_folders/{id}">client.memoryFolders.<a href="./src/resources/memory-folders.ts">update</a>(pathID, { ...params }) -> MemoryFolder</code>
- <code title="get /v1/memory_folders">client.memoryFolders.<a href="./src/resources/memory-folders.ts">list</a>({ ...params }) -> MemoryFoldersCursorPagination</code>
- <code title="delete /v1/memory_folders/{id}">client.memoryFolders.<a href="./src/resources/memory-folders.ts">delete</a>(id) -> void</code>

# Memories

Types:

- <code><a href="./src/resources/memories.ts">Memory</a></code>
- <code><a href="./src/resources/memories.ts">MemorySpec</a></code>
- <code><a href="./src/resources/memories.ts">MemorySpecDocument</a></code>
- <code><a href="./src/resources/memories.ts">MemorySpecRemoteSource</a></code>

Methods:

- <code title="post /v1/memories">client.memories.<a href="./src/resources/memories.ts">create</a>({ ...params }) -> Memory</code>
- <code title="get /v1/memories/{id}">client.memories.<a href="./src/resources/memories.ts">retrieve</a>(id) -> Memory</code>
- <code title="patch /v1/memories/{id}">client.memories.<a href="./src/resources/memories.ts">update</a>(pathID, { ...params }) -> Memory</code>
- <code title="get /v1/memories">client.memories.<a href="./src/resources/memories.ts">list</a>({ ...params }) -> MemoriesCursorPagination</code>
- <code title="delete /v1/memories/{id}">client.memories.<a href="./src/resources/memories.ts">delete</a>(id) -> void</code>
