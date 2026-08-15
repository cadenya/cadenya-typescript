# Cadenya TypeScript SDK reference

Plain methods return an awaitable APIPromise (with `.withResponse()` and
`.asResponse()` for raw Response access); pagination and streaming methods
return a Promise of a Page or Stream. See README.md for usage patterns.

## accounts

Retrieves the current account for the token accessing the API

```ts
client.accounts.retrieve(options?: RequestOptions): APIPromise<Account>
```
Rotates the challenge token for the account

```ts
client.accounts.rotateChallengeToken(options?: RequestOptions): APIPromise<RotateChallengeTokenResponse>
```
Rotates the webhook signing key for the account

```ts
client.accounts.rotateWebhookSigningKey(options?: RequestOptions): APIPromise<RotateWebhookEventsHmacSecretResponse>
```

## apiKeys

Get the global API key

```ts
client.apiKeys.retrieveGlobal(options?: RequestOptions): APIPromise<APIKey>
```
Disable the global API key

```ts
client.apiKeys.disableGlobal(options?: RequestOptions): APIPromise<APIKey>
```
Enable the global API key

```ts
client.apiKeys.enableGlobal(options?: RequestOptions): APIPromise<APIKey>
```
Rotate the global API key

```ts
client.apiKeys.rotateGlobal(options?: RequestOptions): APIPromise<APIKey>
```
List API keys

```ts
client.apiKeys.list(params?: ApiKeyListParams, options?: RequestOptions): Promise<Page<APIKey>>
```
Create a new API key

```ts
client.apiKeys.create(params: ApiKeyCreateParams, options?: RequestOptions): APIPromise<APIKey>
```
Get an API key by ID

```ts
client.apiKeys.retrieve(id: string, params?: ApiKeyRetrieveParams, options?: RequestOptions): APIPromise<APIKey>
```
Delete an API key

```ts
client.apiKeys.delete(id: string, params?: ApiKeyDeleteParams, options?: RequestOptions): APIPromise<void>
```
Update an API key

```ts
client.apiKeys.update(id: string, params?: ApiKeyUpdateParams, options?: RequestOptions): APIPromise<APIKey>
```
Disable an API key

```ts
client.apiKeys.disable(id: string, params?: ApiKeyDisableParams, options?: RequestOptions): APIPromise<APIKey>
```
Enable an API key

```ts
client.apiKeys.enable(id: string, params?: ApiKeyEnableParams, options?: RequestOptions): APIPromise<APIKey>
```
Rotate an API key

```ts
client.apiKeys.rotate(id: string, params?: ApiKeyRotateParams, options?: RequestOptions): APIPromise<APIKey>
```

## workspaceAdmin

Search account profiles

```ts
client.workspaceAdmin.listProfiles(params?: WorkspaceAdminListProfilesParams, options?: RequestOptions): Promise<Page<Profile>>
```
List all workspaces in the account

```ts
client.workspaceAdmin.listAccount(params?: WorkspaceAdminListAccountParams, options?: RequestOptions): Promise<Page<Workspace>>
```
Create a workspace

```ts
client.workspaceAdmin.create(params: WorkspaceAdminCreateParams, options?: RequestOptions): APIPromise<Workspace>
```
Get a workspace by ID

```ts
client.workspaceAdmin.retrieve(params?: WorkspaceAdminRetrieveParams, options?: RequestOptions): APIPromise<Workspace>
```
Archive a workspace

```ts
client.workspaceAdmin.archive(params?: WorkspaceAdminArchiveParams, options?: RequestOptions): APIPromise<void>
```
Update a workspace

```ts
client.workspaceAdmin.update(params?: WorkspaceAdminUpdateParams, options?: RequestOptions): APIPromise<Workspace>
```
List workspace members

```ts
client.workspaceAdmin.listMembers(params?: WorkspaceAdminListMembersParams, options?: RequestOptions): Promise<Page<WorkspaceMember>>
```
Add a member to a workspace

```ts
client.workspaceAdmin.addMember(params?: WorkspaceAdminAddMemberParams, options?: RequestOptions): APIPromise<WorkspaceMember>
```
Remove a member from a workspace

```ts
client.workspaceAdmin.removeMember(profileId: string, params?: WorkspaceAdminRemoveMemberParams, options?: RequestOptions): APIPromise<void>
```

## profiles

Retrieves the profile for the credentials accessing the API

```ts
client.profiles.whoami(options?: RequestOptions): APIPromise<Profile>
```

## workspaces

List workspaces

```ts
client.workspaces.list(params?: WorkspaceListParams, options?: RequestOptions): Promise<Page<Workspace>>
```

## agents

List agents

```ts
client.agents.list(params?: AgentListParams, options?: RequestOptions): Promise<Page<Agent>>
```
Create a new agent

```ts
client.agents.create(params: AgentCreateParams, options?: RequestOptions): APIPromise<Agent>
```
List feedback for an agent

```ts
client.agents.listFeedback(agentId: string, params?: AgentListFeedbackParams, options?: RequestOptions): Promise<Page<ObjectiveFeedback>>
```
List webhook deliveries

```ts
client.agents.listWebhookDeliveries(agentId: string, params?: AgentListWebhookDeliveriesParams, options?: RequestOptions): Promise<Page<WebhookDelivery>>
```
Get an agent by ID

```ts
client.agents.retrieve(id: string, params?: AgentRetrieveParams, options?: RequestOptions): APIPromise<Agent>
```
Delete an agent

```ts
client.agents.delete(id: string, params?: AgentDeleteParams, options?: RequestOptions): APIPromise<void>
```
Update an agent

```ts
client.agents.update(id: string, params?: AgentUpdateParams, options?: RequestOptions): APIPromise<Agent>
```
Archive an agent

```ts
client.agents.archive(id: string, params?: AgentArchiveParams, options?: RequestOptions): APIPromise<Agent>
```
Publish an agent

```ts
client.agents.publish(id: string, params?: AgentPublishParams, options?: RequestOptions): APIPromise<Agent>
```
Unarchive an agent

```ts
client.agents.unarchive(id: string, params?: AgentUnarchiveParams, options?: RequestOptions): APIPromise<Agent>
```
Unpublish an agent

```ts
client.agents.unpublish(id: string, params?: AgentUnpublishParams, options?: RequestOptions): APIPromise<Agent>
```

## agents.schedules

List schedules

```ts
client.agents.schedules.list(agentId: string, params?: AgentScheduleListParams, options?: RequestOptions): Promise<Page<AgentSchedule>>
```
Create a new schedule

```ts
client.agents.schedules.create(agentId: string, params: AgentScheduleCreateParams, options?: RequestOptions): APIPromise<AgentSchedule>
```
Get a schedule by ID

```ts
client.agents.schedules.retrieve(agentId: string, id: string, params?: AgentScheduleRetrieveParams, options?: RequestOptions): APIPromise<AgentSchedule>
```
Delete a schedule

```ts
client.agents.schedules.delete(agentId: string, id: string, params?: AgentScheduleDeleteParams, options?: RequestOptions): APIPromise<void>
```
Update a schedule

```ts
client.agents.schedules.update(agentId: string, id: string, params?: AgentScheduleUpdateParams, options?: RequestOptions): APIPromise<AgentSchedule>
```
Archive a schedule

```ts
client.agents.schedules.archive(agentId: string, id: string, params?: AgentScheduleArchiveParams, options?: RequestOptions): APIPromise<AgentSchedule>
```
Pause a schedule

```ts
client.agents.schedules.pause(agentId: string, id: string, params?: AgentSchedulePauseParams, options?: RequestOptions): APIPromise<AgentSchedule>
```
Resume a schedule

```ts
client.agents.schedules.resume(agentId: string, id: string, params?: AgentScheduleResumeParams, options?: RequestOptions): APIPromise<AgentSchedule>
```

## agents.variations

List variations

```ts
client.agents.variations.list(agentId: string, params?: AgentVariationListParams, options?: RequestOptions): Promise<Page<AgentVariation>>
```
Create a new variation

```ts
client.agents.variations.create(agentId: string, params: AgentVariationCreateParams, options?: RequestOptions): APIPromise<AgentVariation>
```
Get a variation by ID

```ts
client.agents.variations.retrieve(agentId: string, id: string, params?: AgentVariationRetrieveParams, options?: RequestOptions): APIPromise<AgentVariation>
```
Delete a variation

```ts
client.agents.variations.delete(agentId: string, id: string, params?: AgentVariationDeleteParams, options?: RequestOptions): APIPromise<void>
```
Update a variation

```ts
client.agents.variations.update(agentId: string, id: string, params?: AgentVariationUpdateParams, options?: RequestOptions): APIPromise<AgentVariation>
```
Add an assignment to a variation

```ts
client.agents.variations.addAssignment(agentId: string, variationId: string, params: AgentVariationAddAssignmentParams, options?: RequestOptions): APIPromise<VariationAssignment>
```
Remove an assignment from a variation

```ts
client.agents.variations.removeAssignment(agentId: string, variationId: string, id: string, params?: AgentVariationRemoveAssignmentParams, options?: RequestOptions): APIPromise<void>
```
Attach a memory layer to a variation

```ts
client.agents.variations.addMemoryLayer(agentId: string, variationId: string, params: AgentVariationAddMemoryLayerParams, options?: RequestOptions): APIPromise<VariationMemoryLayerAssignment>
```
Remove a memory layer assignment from a variation

```ts
client.agents.variations.removeMemoryLayer(agentId: string, variationId: string, id: string, params?: AgentVariationRemoveMemoryLayerParams, options?: RequestOptions): APIPromise<void>
```
Update a variation's memory layer assignment

```ts
client.agents.variations.updateMemoryLayer(agentId: string, variationId: string, id: string, params?: AgentVariationUpdateMemoryLayerParams, options?: RequestOptions): APIPromise<VariationMemoryLayerAssignment>
```

## aiProviderKeys

List AI provider keys

```ts
client.aiProviderKeys.list(params?: AiProviderKeyListParams, options?: RequestOptions): Promise<Page<AIProviderKey>>
```
Create a new AI provider key

```ts
client.aiProviderKeys.create(params: AiProviderKeyCreateParams, options?: RequestOptions): APIPromise<AIProviderKey>
```
Get an AI provider key by ID

```ts
client.aiProviderKeys.retrieve(id: string, params?: AiProviderKeyRetrieveParams, options?: RequestOptions): APIPromise<AIProviderKey>
```
Delete an AI provider key

```ts
client.aiProviderKeys.delete(id: string, params?: AiProviderKeyDeleteParams, options?: RequestOptions): APIPromise<void>
```
Update an AI provider key

```ts
client.aiProviderKeys.update(id: string, params?: AiProviderKeyUpdateParams, options?: RequestOptions): APIPromise<AIProviderKey>
```

## memoryLayers

List memory layers

```ts
client.memoryLayers.list(params?: MemoryLayerListParams, options?: RequestOptions): Promise<Page<MemoryLayer>>
```
Create a new memory layer

```ts
client.memoryLayers.create(params: MemoryLayerCreateParams, options?: RequestOptions): APIPromise<MemoryLayer>
```
Get a memory layer by ID

```ts
client.memoryLayers.retrieve(id: string, params?: MemoryLayerRetrieveParams, options?: RequestOptions): APIPromise<MemoryLayer>
```
Delete a memory layer

```ts
client.memoryLayers.delete(id: string, params?: MemoryLayerDeleteParams, options?: RequestOptions): APIPromise<void>
```
Update a memory layer

```ts
client.memoryLayers.update(id: string, params?: MemoryLayerUpdateParams, options?: RequestOptions): APIPromise<MemoryLayer>
```

## memoryLayers.entries

List memory entries

```ts
client.memoryLayers.entries.list(memoryLayerId: string, params?: MemoryEntryListParams, options?: RequestOptions): Promise<Page<MemoryEntry>>
```
Create a new memory entry

```ts
client.memoryLayers.entries.create(memoryLayerId: string, params: MemoryEntryCreateParams, options?: RequestOptions): APIPromise<MemoryEntryDetail>
```
Get a memory entry by ID

```ts
client.memoryLayers.entries.retrieve(memoryLayerId: string, id: string, params?: MemoryEntryRetrieveParams, options?: RequestOptions): APIPromise<MemoryEntryDetail>
```
Delete a memory entry

```ts
client.memoryLayers.entries.delete(memoryLayerId: string, id: string, params?: MemoryEntryDeleteParams, options?: RequestOptions): APIPromise<void>
```
Update a memory entry

```ts
client.memoryLayers.entries.update(memoryLayerId: string, id: string, params?: MemoryEntryUpdateParams, options?: RequestOptions): APIPromise<MemoryEntryDetail>
```

## models

List models

```ts
client.models.list(params?: ModelListParams, options?: RequestOptions): Promise<Page<Model>>
```
Get a model by ID

```ts
client.models.retrieve(id: string, params?: ModelRetrieveParams, options?: RequestOptions): APIPromise<Model>
```
Disable a model

```ts
client.models.disable(id: string, params?: ModelDisableParams, options?: RequestOptions): APIPromise<Model>
```
Enable a model

```ts
client.models.enable(id: string, params?: ModelEnableParams, options?: RequestOptions): APIPromise<Model>
```
Swap models on agent variations

```ts
client.models.swapOnVariations(params?: ModelSwapOnVariationsParams, options?: RequestOptions): APIPromise<void>
```

## objectives

List objectives

```ts
client.objectives.list(params?: ObjectiveListParams, options?: RequestOptions): Promise<Page<Objective>>
```
Create a new objective

```ts
client.objectives.create(params: ObjectiveCreateParams, options?: RequestOptions): APIPromise<Objective>
```
Get an objective by ID

```ts
client.objectives.retrieve(id: string, params?: ObjectiveRetrieveParams, options?: RequestOptions): APIPromise<Objective>
```
List objective context windows

```ts
client.objectives.listContextWindows(objectiveId: string, params?: ObjectiveListContextWindowsParams, options?: RequestOptions): Promise<Page<ObjectiveContextWindow>>
```
Get objective context diagnostics

```ts
client.objectives.retrieveDiagnostics(objectiveId: string, params?: ObjectiveRetrieveDiagnosticsParams, options?: RequestOptions): APIPromise<GetObjectiveDiagnosticsResponse>
```
List objective events

```ts
client.objectives.listEvents(objectiveId: string, params?: ObjectiveListEventsParams, options?: RequestOptions): Promise<Page<ObjectiveEvent>>
```
Stream objective events

```ts
client.objectives.streamEvents(objectiveId: string, params?: ObjectiveStreamEventsParams, options?: RequestOptions): Promise<Stream<ObjectiveEvent>>
```
List feedback for an objective

```ts
client.objectives.listFeedback(objectiveId: string, params?: ObjectiveListFeedbackParams, options?: RequestOptions): Promise<Page<ObjectiveFeedback>>
```
Submit feedback for an objective

```ts
client.objectives.createFeedback(objectiveId: string, params: ObjectiveCreateFeedbackParams, options?: RequestOptions): APIPromise<ObjectiveFeedback>
```
List objective tasks

```ts
client.objectives.listTasks(objectiveId: string, params?: ObjectiveListTasksParams, options?: RequestOptions): Promise<Page<ObjectiveTask>>
```
Get an objective task by ID

```ts
client.objectives.retrieveTask(objectiveId: string, id: string, params?: ObjectiveRetrieveTaskParams, options?: RequestOptions): APIPromise<ObjectiveTask>
```
List objective tool calls

```ts
client.objectives.listToolCalls(objectiveId: string, params?: ObjectiveListToolCallsParams, options?: RequestOptions): Promise<Page<ObjectiveToolCall>>
```
Get an objective tool call by ID

```ts
client.objectives.retrieveToolCall(objectiveId: string, toolCallId: string, params?: ObjectiveRetrieveToolCallParams, options?: RequestOptions): APIPromise<ObjectiveToolCallWithResult>
```
Approve a tool call

```ts
client.objectives.approveToolCall(objectiveId: string, toolCallId: string, params?: ObjectiveApproveToolCallParams, options?: RequestOptions): APIPromise<ObjectiveToolCall>
```
Deny a tool call

```ts
client.objectives.denyToolCall(objectiveId: string, toolCallId: string, params?: ObjectiveDenyToolCallParams, options?: RequestOptions): APIPromise<ObjectiveToolCall>
```
Set a bare tool call's content

```ts
client.objectives.setToolCallContent(objectiveId: string, toolCallId: string, params: ObjectiveSetToolCallContentParams, options?: RequestOptions): APIPromise<ObjectiveToolCall>
```
List objective tools

```ts
client.objectives.listTools(objectiveId: string, params?: ObjectiveListToolsParams, options?: RequestOptions): Promise<Page<ObjectiveTool>>
```
Cancel an objective

```ts
client.objectives.cancel(objectiveId: string, params?: ObjectiveCancelParams, options?: RequestOptions): APIPromise<Objective>
```
Compact an objective

```ts
client.objectives.compact(objectiveId: string, params?: ObjectiveCompactParams, options?: RequestOptions): APIPromise<CompactObjectiveResponse>
```
Continue an objective

```ts
client.objectives.continue(objectiveId: string, params: ObjectiveContinueParams, options?: RequestOptions): APIPromise<ObjectiveEvent>
```

## toolSearch

Search for tools or tool sets

```ts
client.toolSearch.searchOrSets(params: ToolSearchSearchOrSetsParams, options?: RequestOptions): APIPromise<SearchToolsOrToolSetsResponse>
```

## tenants

List tenants

```ts
client.tenants.list(params?: TenantListParams, options?: RequestOptions): Promise<Page<Tenant>>
```
Get a tenant by ID

```ts
client.tenants.retrieve(id: string, params?: TenantRetrieveParams, options?: RequestOptions): APIPromise<Tenant>
```
Erase a tenant

```ts
client.tenants.delete(id: string, params?: TenantDeleteParams, options?: RequestOptions): APIPromise<Tenant>
```
List a tenant's subjects

```ts
client.tenants.listSubjects(tenantId: string, params?: TenantListSubjectsParams, options?: RequestOptions): Promise<Page<Subject>>
```

## toolSets

List tool sets

```ts
client.toolSets.list(params?: ToolSetListParams, options?: RequestOptions): Promise<Page<ToolSet>>
```
Create a new tool set

```ts
client.toolSets.create(params: ToolSetCreateParams, options?: RequestOptions): APIPromise<ToolSet>
```
Get a tool set by ID

```ts
client.toolSets.retrieve(id: string, params?: ToolSetRetrieveParams, options?: RequestOptions): APIPromise<ToolSet>
```
Delete a tool set

```ts
client.toolSets.delete(id: string, params?: ToolSetDeleteParams, options?: RequestOptions): APIPromise<void>
```
Update a tool set

```ts
client.toolSets.update(id: string, params?: ToolSetUpdateParams, options?: RequestOptions): APIPromise<ToolSet>
```
Archive a tool set

```ts
client.toolSets.archive(id: string, params?: ToolSetArchiveParams, options?: RequestOptions): APIPromise<ToolSet>
```
Unarchive a tool set

```ts
client.toolSets.unarchive(id: string, params?: ToolSetUnarchiveParams, options?: RequestOptions): APIPromise<ToolSet>
```
List tool set events

```ts
client.toolSets.listEvents(toolSetId: string, params?: ToolSetListEventsParams, options?: RequestOptions): Promise<Page<ToolSetEvent>>
```
Get consumed OpenAPI spec

```ts
client.toolSets.retrieveOpenApiSpec(toolSetId: string, params?: ToolSetRetrieveOpenApiSpecParams, options?: RequestOptions): APIPromise<GetToolSetOpenAPISpecResponse>
```
List tool set usage

```ts
client.toolSets.listUsage(toolSetId: string, params?: ToolSetListUsageParams, options?: RequestOptions): Promise<Page<ToolSetUsage>>
```

## toolSets.secrets

List tool set secrets

```ts
client.toolSets.secrets.list(toolSetId: string, params?: ToolSetSecretListParams, options?: RequestOptions): Promise<Page<ToolSetSecret>>
```
Create a new tool set secret

```ts
client.toolSets.secrets.create(toolSetId: string, params: ToolSetSecretCreateParams, options?: RequestOptions): APIPromise<ToolSetSecret>
```
Get a tool set secret by ID

```ts
client.toolSets.secrets.retrieve(toolSetId: string, id: string, params?: ToolSetSecretRetrieveParams, options?: RequestOptions): APIPromise<ToolSetSecret>
```
Delete a tool set secret

```ts
client.toolSets.secrets.delete(toolSetId: string, id: string, params?: ToolSetSecretDeleteParams, options?: RequestOptions): APIPromise<void>
```
Update a tool set secret

```ts
client.toolSets.secrets.update(toolSetId: string, id: string, params?: ToolSetSecretUpdateParams, options?: RequestOptions): APIPromise<ToolSetSecret>
```

## toolSets.tools

List tools

```ts
client.toolSets.tools.list(toolSetId: string, params?: ToolListParams, options?: RequestOptions): Promise<Page<Tool>>
```
Create a new tool

```ts
client.toolSets.tools.create(toolSetId: string, params: ToolCreateParams, options?: RequestOptions): APIPromise<Tool>
```
Get a tool by ID

```ts
client.toolSets.tools.retrieve(toolSetId: string, id: string, params?: ToolRetrieveParams, options?: RequestOptions): APIPromise<Tool>
```
Delete a tool

```ts
client.toolSets.tools.delete(toolSetId: string, id: string, params?: ToolDeleteParams, options?: RequestOptions): APIPromise<void>
```
Update a tool

```ts
client.toolSets.tools.update(toolSetId: string, id: string, params?: ToolUpdateParams, options?: RequestOptions): APIPromise<Tool>
```
Omit a tool

```ts
client.toolSets.tools.omit(toolSetId: string, id: string, params?: ToolOmitParams, options?: RequestOptions): APIPromise<Tool>
```
Restore a tool

```ts
client.toolSets.tools.restore(toolSetId: string, id: string, params?: ToolRestoreParams, options?: RequestOptions): APIPromise<Tool>
```

## uploads

Create an upload

```ts
client.uploads.create(params: UploadCreateParams, options?: RequestOptions): APIPromise<Upload>
```
Get an upload by ID

```ts
client.uploads.retrieve(id: string, params?: UploadRetrieveParams, options?: RequestOptions): APIPromise<Upload>
```

## widgetSessions

List widget sessions

```ts
client.widgetSessions.list(params?: WidgetSessionListParams, options?: RequestOptions): Promise<Page<WidgetSession>>
```
Create a widget session

```ts
client.widgetSessions.create(params: WidgetSessionCreateParams, options?: RequestOptions): APIPromise<WidgetSession>
```
Delete all of a tenant's widget sessions

```ts
client.widgetSessions.deleteTenant(params?: WidgetSessionDeleteTenantParams, options?: RequestOptions): APIPromise<DeleteTenantWidgetSessionsResponse>
```
Get a widget session by ID

```ts
client.widgetSessions.retrieve(id: string, params?: WidgetSessionRetrieveParams, options?: RequestOptions): APIPromise<WidgetSession>
```
Delete a widget session

```ts
client.widgetSessions.delete(id: string, params?: WidgetSessionDeleteParams, options?: RequestOptions): APIPromise<void>
```
Revoke a widget session

```ts
client.widgetSessions.revoke(id: string, params?: WidgetSessionRevokeParams, options?: RequestOptions): APIPromise<WidgetSession>
```

## widgets

List widgets

```ts
client.widgets.list(params?: WidgetListParams, options?: RequestOptions): Promise<Page<Widget>>
```
Create a new widget

```ts
client.widgets.create(params: WidgetCreateParams, options?: RequestOptions): APIPromise<Widget>
```
Get a widget by ID

```ts
client.widgets.retrieve(id: string, params?: WidgetRetrieveParams, options?: RequestOptions): APIPromise<Widget>
```
Delete a widget

```ts
client.widgets.delete(id: string, params?: WidgetDeleteParams, options?: RequestOptions): APIPromise<void>
```
Update a widget

```ts
client.widgets.update(id: string, params?: WidgetUpdateParams, options?: RequestOptions): APIPromise<Widget>
```
Archive a widget

```ts
client.widgets.archive(id: string, params?: WidgetArchiveParams, options?: RequestOptions): APIPromise<Widget>
```
Unarchive a widget

```ts
client.widgets.unarchive(id: string, params?: WidgetUnarchiveParams, options?: RequestOptions): APIPromise<Widget>
```

## workspaceSecrets

List workspace secrets

```ts
client.workspaceSecrets.list(params?: WorkspaceSecretListParams, options?: RequestOptions): Promise<Page<WorkspaceSecret>>
```
Create a new workspace secret

```ts
client.workspaceSecrets.create(params: WorkspaceSecretCreateParams, options?: RequestOptions): APIPromise<WorkspaceSecret>
```
Get a workspace secret by ID

```ts
client.workspaceSecrets.retrieve(id: string, params?: WorkspaceSecretRetrieveParams, options?: RequestOptions): APIPromise<WorkspaceSecret>
```
Delete a workspace secret

```ts
client.workspaceSecrets.delete(id: string, params?: WorkspaceSecretDeleteParams, options?: RequestOptions): APIPromise<void>
```
Update a workspace secret

```ts
client.workspaceSecrets.update(id: string, params?: WorkspaceSecretUpdateParams, options?: RequestOptions): APIPromise<WorkspaceSecret>
```
