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
- <code><a href="./src/resources/agents/agents.ts">Pagination</a></code>
- <code><a href="./src/resources/agents/agents.ts">AgentListResponse</a></code>

Methods:

- <code title="post /v1/agents">client.agents.<a href="./src/resources/agents/agents.ts">create</a>({ ...params }) -> Agent</code>
- <code title="get /v1/agents/{id}">client.agents.<a href="./src/resources/agents/agents.ts">retrieve</a>(id) -> Agent</code>
- <code title="patch /v1/agents/{id}">client.agents.<a href="./src/resources/agents/agents.ts">update</a>(id, { ...params }) -> Agent</code>
- <code title="get /v1/agents">client.agents.<a href="./src/resources/agents/agents.ts">list</a>({ ...params }) -> AgentListResponse</code>
- <code title="delete /v1/agents/{id}">client.agents.<a href="./src/resources/agents/agents.ts">delete</a>(id) -> void</code>

## Objectives

Types:

- <code><a href="./src/resources/agents/objectives.ts">Objective</a></code>
- <code><a href="./src/resources/agents/objectives.ts">ObjectiveSpec</a></code>
- <code><a href="./src/resources/agents/objectives.ts">OperationMetadata</a></code>
- <code><a href="./src/resources/agents/objectives.ts">ObjectiveListResponse</a></code>

Methods:

- <code title="post /v1/agents/{agentId}/objectives">client.agents.objectives.<a href="./src/resources/agents/objectives.ts">create</a>(agentID, { ...params }) -> Objective</code>
- <code title="get /v1/agents/{agentId}/objectives/{id}">client.agents.objectives.<a href="./src/resources/agents/objectives.ts">retrieve</a>(id, { ...params }) -> Objective</code>
- <code title="get /v1/agents/{agentId}/objectives">client.agents.objectives.<a href="./src/resources/agents/objectives.ts">list</a>(agentID, { ...params }) -> ObjectiveListResponse</code>

## Prompts

Types:

- <code><a href="./src/resources/agents/prompts.ts">Prompt</a></code>
- <code><a href="./src/resources/agents/prompts.ts">PromptSpec</a></code>
- <code><a href="./src/resources/agents/prompts.ts">PromptListResponse</a></code>

Methods:

- <code title="post /v1/agents/{agentId}/prompts">client.agents.prompts.<a href="./src/resources/agents/prompts.ts">create</a>(agentID, { ...params }) -> Prompt</code>
- <code title="get /v1/agents/{agentId}/prompts/{id}">client.agents.prompts.<a href="./src/resources/agents/prompts.ts">retrieve</a>(id, { ...params }) -> Prompt</code>
- <code title="patch /v1/agents/{agentId}/prompts/{id}">client.agents.prompts.<a href="./src/resources/agents/prompts.ts">update</a>(id, { ...params }) -> Prompt</code>
- <code title="get /v1/agents/{agentId}/prompts">client.agents.prompts.<a href="./src/resources/agents/prompts.ts">list</a>(agentID, { ...params }) -> PromptListResponse</code>
- <code title="delete /v1/agents/{agentId}/prompts/{id}">client.agents.prompts.<a href="./src/resources/agents/prompts.ts">delete</a>(id, { ...params }) -> void</code>

# ToolSets

Types:

- <code><a href="./src/resources/tool-sets/tool-sets.ts">ToolSet</a></code>
- <code><a href="./src/resources/tool-sets/tool-sets.ts">ToolSetSpec</a></code>
- <code><a href="./src/resources/tool-sets/tool-sets.ts">ToolSetListResponse</a></code>

Methods:

- <code title="post /v1/tool_sets">client.toolSets.<a href="./src/resources/tool-sets/tool-sets.ts">create</a>({ ...params }) -> ToolSet</code>
- <code title="get /v1/tool_sets/{id}">client.toolSets.<a href="./src/resources/tool-sets/tool-sets.ts">retrieve</a>(id) -> ToolSet</code>
- <code title="put /v1/tool_sets/{id}">client.toolSets.<a href="./src/resources/tool-sets/tool-sets.ts">update</a>(id, { ...params }) -> ToolSet</code>
- <code title="get /v1/tool_sets">client.toolSets.<a href="./src/resources/tool-sets/tool-sets.ts">list</a>({ ...params }) -> ToolSetListResponse</code>
- <code title="delete /v1/tool_sets/{id}">client.toolSets.<a href="./src/resources/tool-sets/tool-sets.ts">delete</a>(id) -> void</code>

## Tools

Types:

- <code><a href="./src/resources/tool-sets/tools.ts">Tool</a></code>
- <code><a href="./src/resources/tool-sets/tools.ts">ToolSpec</a></code>
- <code><a href="./src/resources/tool-sets/tools.ts">ToolListResponse</a></code>

Methods:

- <code title="post /v1/tool_sets/{toolSetId}/tools">client.toolSets.tools.<a href="./src/resources/tool-sets/tools.ts">create</a>(toolSetID, { ...params }) -> Tool</code>
- <code title="get /v1/tool_sets/{toolSetId}/tools/{id}">client.toolSets.tools.<a href="./src/resources/tool-sets/tools.ts">retrieve</a>(id, { ...params }) -> Tool</code>
- <code title="put /v1/tool_sets/{toolSetId}/tools/{id}">client.toolSets.tools.<a href="./src/resources/tool-sets/tools.ts">update</a>(id, { ...params }) -> Tool</code>
- <code title="get /v1/tool_sets/{toolSetId}/tools">client.toolSets.tools.<a href="./src/resources/tool-sets/tools.ts">list</a>(toolSetID, { ...params }) -> ToolListResponse</code>
- <code title="delete /v1/tool_sets/{toolSetId}/tools/{id}">client.toolSets.tools.<a href="./src/resources/tool-sets/tools.ts">delete</a>(id, { ...params }) -> void</code>

# Workspaces

Types:

- <code><a href="./src/resources/workspaces.ts">Workspace</a></code>
- <code><a href="./src/resources/workspaces.ts">WorkspaceSpec</a></code>
- <code><a href="./src/resources/workspaces.ts">WorkspaceListResponse</a></code>

Methods:

- <code title="post /v1/workspaces">client.workspaces.<a href="./src/resources/workspaces.ts">create</a>({ ...params }) -> Workspace</code>
- <code title="get /v1/workspaces">client.workspaces.<a href="./src/resources/workspaces.ts">list</a>({ ...params }) -> WorkspaceListResponse</code>
