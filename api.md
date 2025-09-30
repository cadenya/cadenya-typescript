# Account

Types:

- <code><a href="./src/resources/account.ts">Account</a></code>
- <code><a href="./src/resources/account.ts">ResourceMetadata</a></code>
- <code><a href="./src/resources/account.ts">AccountSetupResponse</a></code>

Methods:

- <code title="get /v1/account">client.account.<a href="./src/resources/account.ts">retrieve</a>() -> Account</code>
- <code title="post /v1/account/setup">client.account.<a href="./src/resources/account.ts">setup</a>({ ...params }) -> AccountSetupResponse</code>

# Agents

Types:

- <code><a href="./src/resources/agents/agents.ts">Agent</a></code>
- <code><a href="./src/resources/agents/agents.ts">AgentSpec</a></code>
- <code><a href="./src/resources/agents/agents.ts">AgentSpecAgentTool</a></code>
- <code><a href="./src/resources/agents/agents.ts">AgentSpecConstraints</a></code>
- <code><a href="./src/resources/agents/agents.ts">AgentSpecToolSelection</a></code>
- <code><a href="./src/resources/agents/agents.ts">Page</a></code>
- <code><a href="./src/resources/agents/agents.ts">ToolSelectionAssignedTools</a></code>
- <code><a href="./src/resources/agents/agents.ts">ToolSelectionAutoDiscovery</a></code>

Methods:

- <code title="post /v1/agents">client.agents.<a href="./src/resources/agents/agents.ts">create</a>({ ...params }) -> Agent</code>
- <code title="get /v1/agents/{id}">client.agents.<a href="./src/resources/agents/agents.ts">retrieve</a>(id) -> Agent</code>
- <code title="patch /v1/agents/{id}">client.agents.<a href="./src/resources/agents/agents.ts">update</a>(id, { ...params }) -> Agent</code>
- <code title="get /v1/agents">client.agents.<a href="./src/resources/agents/agents.ts">list</a>({ ...params }) -> AgentsCursorPagination</code>
- <code title="delete /v1/agents/{id}">client.agents.<a href="./src/resources/agents/agents.ts">delete</a>(id) -> void</code>

## Prompts

Types:

- <code><a href="./src/resources/agents/prompts.ts">Prompt</a></code>
- <code><a href="./src/resources/agents/prompts.ts">PromptSpec</a></code>

Methods:

- <code title="post /v1/agents/{agentId}/prompts">client.agents.prompts.<a href="./src/resources/agents/prompts.ts">create</a>(agentID, { ...params }) -> Prompt</code>
- <code title="get /v1/agents/{agentId}/prompts/{id}">client.agents.prompts.<a href="./src/resources/agents/prompts.ts">retrieve</a>(id, { ...params }) -> Prompt</code>
- <code title="patch /v1/agents/{agentId}/prompts/{id}">client.agents.prompts.<a href="./src/resources/agents/prompts.ts">update</a>(id, { ...params }) -> Prompt</code>
- <code title="get /v1/agents/{agentId}/prompts">client.agents.prompts.<a href="./src/resources/agents/prompts.ts">list</a>(agentID, { ...params }) -> PromptsCursorPagination</code>
- <code title="delete /v1/agents/{agentId}/prompts/{id}">client.agents.prompts.<a href="./src/resources/agents/prompts.ts">delete</a>(id, { ...params }) -> void</code>

# Objectives

Types:

- <code><a href="./src/resources/objectives.ts">Objective</a></code>
- <code><a href="./src/resources/objectives.ts">ObjectiveSpec</a></code>
- <code><a href="./src/resources/objectives.ts">OperationMetadata</a></code>
- <code><a href="./src/resources/objectives.ts">ObjectiveContinueResponse</a></code>
- <code><a href="./src/resources/objectives.ts">ObjectiveListEventsResponse</a></code>

Methods:

- <code title="post /v1/objectives">client.objectives.<a href="./src/resources/objectives.ts">create</a>({ ...params }) -> Objective</code>
- <code title="get /v1/objectives/{id}">client.objectives.<a href="./src/resources/objectives.ts">retrieve</a>(id) -> Objective</code>
- <code title="get /v1/objectives">client.objectives.<a href="./src/resources/objectives.ts">list</a>({ ...params }) -> ObjectivesCursorPagination</code>
- <code title="post /v1/objectives/{objective_id}/continue">client.objectives.<a href="./src/resources/objectives.ts">continue</a>(objectiveID, { ...params }) -> ObjectiveContinueResponse</code>
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
- <code><a href="./src/resources/tool-sets/tool-sets.ts">ToolSet</a></code>
- <code><a href="./src/resources/tool-sets/tool-sets.ts">ToolSetAdapter</a></code>
- <code><a href="./src/resources/tool-sets/tool-sets.ts">ToolSetAdapterHTTP</a></code>
- <code><a href="./src/resources/tool-sets/tool-sets.ts">ToolSetAdapterMcp</a></code>
- <code><a href="./src/resources/tool-sets/tool-sets.ts">ToolSetSpec</a></code>

Methods:

- <code title="post /v1/tool_sets">client.toolSets.<a href="./src/resources/tool-sets/tool-sets.ts">create</a>({ ...params }) -> ToolSet</code>
- <code title="get /v1/tool_sets/{id}">client.toolSets.<a href="./src/resources/tool-sets/tool-sets.ts">retrieve</a>(id) -> ToolSet</code>
- <code title="put /v1/tool_sets/{id}">client.toolSets.<a href="./src/resources/tool-sets/tool-sets.ts">update</a>(id, { ...params }) -> ToolSet</code>
- <code title="get /v1/tool_sets">client.toolSets.<a href="./src/resources/tool-sets/tool-sets.ts">list</a>({ ...params }) -> ToolSetsCursorPagination</code>
- <code title="delete /v1/tool_sets/{id}">client.toolSets.<a href="./src/resources/tool-sets/tool-sets.ts">delete</a>(id) -> void</code>

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

- <code><a href="./src/resources/workspaces.ts">Workspace</a></code>
- <code><a href="./src/resources/workspaces.ts">WorkspaceSpec</a></code>

Methods:

- <code title="post /v1/workspaces">client.workspaces.<a href="./src/resources/workspaces.ts">create</a>({ ...params }) -> Workspace</code>
- <code title="get /v1/workspaces">client.workspaces.<a href="./src/resources/workspaces.ts">list</a>({ ...params }) -> WorkspacesCursorPagination</code>
