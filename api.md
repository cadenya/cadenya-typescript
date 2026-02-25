# Shared

Types:

- <code><a href="./src/resources/shared.ts">AccountResourceMetadata</a></code>
- <code><a href="./src/resources/shared.ts">CallableTool</a></code>
- <code><a href="./src/resources/shared.ts">OperationMetadata</a></code>
- <code><a href="./src/resources/shared.ts">Profile</a></code>
- <code><a href="./src/resources/shared.ts">ProfileSpec</a></code>
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
- <code><a href="./src/resources/agents/variations.ts">AgentVariationSpecAgentDocument</a></code>
- <code><a href="./src/resources/agents/variations.ts">AgentVariationSpecAgentTool</a></code>
- <code><a href="./src/resources/agents/variations.ts">AgentVariationSpecConstraints</a></code>
- <code><a href="./src/resources/agents/variations.ts">AgentVariationSpecModelConfig</a></code>
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

- <code><a href="./src/resources/objectives/objectives.ts">Objective</a></code>
- <code><a href="./src/resources/objectives/objectives.ts">ObjectiveContinueResponse</a></code>
- <code><a href="./src/resources/objectives/objectives.ts">ObjectiveListContextWindowsResponse</a></code>
- <code><a href="./src/resources/objectives/objectives.ts">ObjectiveListEventsResponse</a></code>

Methods:

- <code title="post /v1/objectives">client.objectives.<a href="./src/resources/objectives/objectives.ts">create</a>({ ...params }) -> Objective</code>
- <code title="get /v1/objectives/{id}">client.objectives.<a href="./src/resources/objectives/objectives.ts">retrieve</a>(id) -> Objective</code>
- <code title="get /v1/objectives">client.objectives.<a href="./src/resources/objectives/objectives.ts">list</a>({ ...params }) -> ObjectivesCursorPagination</code>
- <code title="post /v1/objectives/{objectiveId}/cancel">client.objectives.<a href="./src/resources/objectives/objectives.ts">cancel</a>(objectiveID, { ...params }) -> Objective</code>
- <code title="post /v1/objectives/{objectiveId}/continue">client.objectives.<a href="./src/resources/objectives/objectives.ts">continue</a>(objectiveID, { ...params }) -> ObjectiveContinueResponse</code>
- <code title="get /v1/objectives/{objectiveId}/context_windows">client.objectives.<a href="./src/resources/objectives/objectives.ts">listContextWindows</a>(objectiveID, { ...params }) -> ObjectiveListContextWindowsResponsesCursorPagination</code>
- <code title="get /v1/objectives/{objectiveId}/events">client.objectives.<a href="./src/resources/objectives/objectives.ts">listEvents</a>(objectiveID, { ...params }) -> ObjectiveListEventsResponsesCursorPagination</code>

## ToolCalls

Types:

- <code><a href="./src/resources/objectives/tool-calls.ts">ObjectiveToolCall</a></code>

Methods:

- <code title="get /v1/objectives/{objectiveId}/tool_calls">client.objectives.toolCalls.<a href="./src/resources/objectives/tool-calls.ts">list</a>(objectiveID, { ...params }) -> ObjectiveToolCallsCursorPagination</code>
- <code title="put /v1/objectives/{objectiveId}/tool_calls/{toolCallId}/approve">client.objectives.toolCalls.<a href="./src/resources/objectives/tool-calls.ts">approve</a>(toolCallID, { ...params }) -> ObjectiveToolCall</code>
- <code title="put /v1/objectives/{objectiveId}/tool_calls/{toolCallId}/deny">client.objectives.toolCalls.<a href="./src/resources/objectives/tool-calls.ts">deny</a>(toolCallID, { ...params }) -> ObjectiveToolCall</code>

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
- <code title="put /v1/api_keys/{id}/rotate">client.apiKeys.<a href="./src/resources/api-keys.ts">rotate</a>(id) -> APIKey</code>

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

# DocumentNamespaces

Types:

- <code><a href="./src/resources/document-namespaces.ts">DocumentNamespace</a></code>
- <code><a href="./src/resources/document-namespaces.ts">DocumentNamespaceSpec</a></code>

Methods:

- <code title="post /v1/document_namespaces">client.documentNamespaces.<a href="./src/resources/document-namespaces.ts">create</a>({ ...params }) -> DocumentNamespace</code>
- <code title="get /v1/document_namespaces/{id}">client.documentNamespaces.<a href="./src/resources/document-namespaces.ts">retrieve</a>(id) -> DocumentNamespace</code>
- <code title="patch /v1/document_namespaces/{id}">client.documentNamespaces.<a href="./src/resources/document-namespaces.ts">update</a>(pathID, { ...params }) -> DocumentNamespace</code>
- <code title="get /v1/document_namespaces">client.documentNamespaces.<a href="./src/resources/document-namespaces.ts">list</a>({ ...params }) -> DocumentNamespacesCursorPagination</code>
- <code title="delete /v1/document_namespaces/{id}">client.documentNamespaces.<a href="./src/resources/document-namespaces.ts">delete</a>(id) -> void</code>

# Documents

Types:

- <code><a href="./src/resources/documents.ts">Any</a></code>
- <code><a href="./src/resources/documents.ts">AnyOrExpression</a></code>
- <code><a href="./src/resources/documents.ts">CallbacksOrReferences</a></code>
- <code><a href="./src/resources/documents.ts">Document</a></code>
- <code><a href="./src/resources/documents.ts">DocumentSpec</a></code>
- <code><a href="./src/resources/documents.ts">DocumentSpecInlineContent</a></code>
- <code><a href="./src/resources/documents.ts">DocumentSpecRemoteSource</a></code>
- <code><a href="./src/resources/documents.ts">Expression</a></code>
- <code><a href="./src/resources/documents.ts">GoogleProtobufAny</a></code>
- <code><a href="./src/resources/documents.ts">HeadersOrReferences</a></code>
- <code><a href="./src/resources/documents.ts">MediaTypes</a></code>
- <code><a href="./src/resources/documents.ts">NamedAny</a></code>
- <code><a href="./src/resources/documents.ts">NamedPathItem</a></code>
- <code><a href="./src/resources/documents.ts">NamedSchemaOrReference</a></code>
- <code><a href="./src/resources/documents.ts">NamedServerVariable</a></code>
- <code><a href="./src/resources/documents.ts">NamedString</a></code>
- <code><a href="./src/resources/documents.ts">OAuthFlow</a></code>
- <code><a href="./src/resources/documents.ts">Reference</a></code>
- <code><a href="./src/resources/documents.ts">SchemaOrReference</a></code>
- <code><a href="./src/resources/documents.ts">Server</a></code>
- <code><a href="./src/resources/documents.ts">ServerVariable</a></code>
- <code><a href="./src/resources/documents.ts">ServerVariables</a></code>
- <code><a href="./src/resources/documents.ts">Strings</a></code>

Methods:

- <code title="post /v1/documents">client.documents.<a href="./src/resources/documents.ts">create</a>({ ...params }) -> Document</code>
- <code title="get /v1/documents/{id}">client.documents.<a href="./src/resources/documents.ts">retrieve</a>(id) -> Document</code>
- <code title="patch /v1/documents/{id}">client.documents.<a href="./src/resources/documents.ts">update</a>(pathID, { ...params }) -> Document</code>
- <code title="get /v1/documents">client.documents.<a href="./src/resources/documents.ts">list</a>({ ...params }) -> DocumentsCursorPagination</code>
- <code title="delete /v1/documents/{id}">client.documents.<a href="./src/resources/documents.ts">delete</a>(id) -> void</code>
