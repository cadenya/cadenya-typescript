import { APIResource } from '../../core/resource';
import * as AccountAPI from '../account';
import * as Shared from '../shared';
import * as SecretsAPI from './secrets';
import {
  SecretCreateParams,
  SecretDeleteParams,
  SecretListParams,
  SecretRetrieveParams,
  SecretUpdateParams,
  Secrets,
  ToolSetSecret,
  ToolSetSecretInfo,
  ToolSetSecretSpec,
  ToolSetSecretsCursorPagination,
} from './secrets';
import * as ToolsAPI from './tools';
import {
  ConfigBare,
  ConfigHTTP,
  ConfigMCP,
  ConfigOpenAPI,
  MCPAnnotations,
  Tool,
  ToolCreateParams,
  ToolDeleteParams,
  ToolInfo,
  ToolListParams,
  ToolOmitParams,
  ToolRestoreParams,
  ToolRetrieveParams,
  ToolSpec,
  ToolSpecConfig,
  ToolSpecConfigBare,
  ToolSpecConfigHTTP,
  ToolSpecConfigMCP,
  ToolSpecConfigOpenAPI,
  ToolUpdateParams,
  Tools,
  ToolsCursorPagination,
} from './tools';
import { APIPromise } from '../../core/api-promise';
import { CursorPagination, type CursorPaginationParams, PagePromise } from '../../core/pagination';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Manage tool sets and the tools they contain. Tool sets group related tools,
 *  and tools define specific capabilities available to agents.
 *
 *  When a tool set is managed, only API key actors can modify its tools; human
 *  (profile) actors cannot.
 */
export class ToolSets extends APIResource {
  tools: ToolsAPI.Tools = new ToolsAPI.Tools(this._client);
  secrets: SecretsAPI.Secrets = new SecretsAPI.Secrets(this._client);

  /**
   * Creates a new tool set in the workspace
   */
  create(params: ToolSetCreateParams, options?: RequestOptions): APIPromise<ToolSet> {
    const { workspaceId = this._client.workspaceID, ...body } = params;
    return this._client.post(path`/v1/workspaces/${workspaceId}/tool_sets`, { body, ...options });
  }

  /**
   * Retrieves a tool set by ID from the workspace
   */
  retrieve(
    id: string,
    params: ToolSetRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ToolSet> {
    const { workspaceId = this._client.workspaceID } = params ?? {};
    return this._client.get(path`/v1/workspaces/${workspaceId}/tool_sets/${id}`, options);
  }

  /**
   * Updates a tool set in the workspace
   */
  update(id: string, params: ToolSetUpdateParams, options?: RequestOptions): APIPromise<ToolSet> {
    const { workspaceId = this._client.workspaceID, ...body } = params;
    return this._client.patch(path`/v1/workspaces/${workspaceId}/tool_sets/${id}`, { body, ...options });
  }

  /**
   * Lists all tool sets in the workspace
   */
  list(
    params: ToolSetListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ToolSetsCursorPagination, ToolSet> {
    const { workspaceId = this._client.workspaceID, ...query } = params ?? {};
    return this._client.getAPIList(path`/v1/workspaces/${workspaceId}/tool_sets`, CursorPagination<ToolSet>, {
      query,
      ...options,
    });
  }

  /**
   * Deletes a tool set in the workspace
   */
  delete(
    id: string,
    params: ToolSetDeleteParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<void> {
    const { workspaceId = this._client.workspaceID } = params ?? {};
    return this._client.delete(path`/v1/workspaces/${workspaceId}/tool_sets/${id}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Transitions a tool set to STATE_ARCHIVED. Syncing stops, the tool set is hidden
   * from list results, its tools are no longer offered to objectives, and new
   * variation assignments are rejected. Existing assignments are retained, and
   * history is preserved — unlike delete, archiving works while the tool set is
   * still assigned to agent variations.
   */
  archive(id: string, params: ToolSetArchiveParams, options?: RequestOptions): APIPromise<ToolSet> {
    const { workspaceId = this._client.workspaceID, ...body } = params;
    return this._client.post(path`/v1/workspaces/${workspaceId}/tool_sets/${id}:archive`, {
      body,
      ...options,
    });
  }

  /**
   * Retrieves the current OpenAPI specification JSON that has been consumed by the
   * tool set. Only applicable to tool sets using the OpenAPI adapter.
   */
  getOpenAPISpec(
    toolSetID: string,
    params: ToolSetGetOpenAPISpecParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ToolSetGetOpenAPISpecResponse> {
    const { workspaceId = this._client.workspaceID } = params ?? {};
    return this._client.get(path`/v1/workspaces/${workspaceId}/tool_sets/${toolSetID}/openapi_spec`, options);
  }

  /**
   * Lists all events (including sync status) for a tool set
   */
  listEvents(
    toolSetID: string,
    params: ToolSetListEventsParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ToolSetEventsCursorPagination, ToolSetEvent> {
    const { workspaceId = this._client.workspaceID, ...query } = params ?? {};
    return this._client.getAPIList(
      path`/v1/workspaces/${workspaceId}/tool_sets/${toolSetID}/events`,
      CursorPagination<ToolSetEvent>,
      { query, ...options },
    );
  }

  /**
   * Lists the agent variations (with their parent agent) that have the tool set
   * assigned. Pass tool_id to instead list variations with a direct assignment of
   * that individual tool; variations that receive the tool implicitly through a
   * whole-set assignment are not included in that filtered view.
   */
  listUsage(
    toolSetID: string,
    params: ToolSetListUsageParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ToolSetUsagesCursorPagination, ToolSetUsage> {
    const { workspaceId = this._client.workspaceID, ...query } = params ?? {};
    return this._client.getAPIList(
      path`/v1/workspaces/${workspaceId}/tool_sets/${toolSetID}/usage`,
      CursorPagination<ToolSetUsage>,
      { query, ...options },
    );
  }

  /**
   * Transitions an archived tool set back to STATE_ACTIVE. Managed tool sets resume
   * syncing on their next cycle and their tools become available to objectives
   * again.
   */
  unarchive(id: string, params: ToolSetUnarchiveParams, options?: RequestOptions): APIPromise<ToolSet> {
    const { workspaceId = this._client.workspaceID, ...body } = params;
    return this._client.post(path`/v1/workspaces/${workspaceId}/tool_sets/${id}:unarchive`, {
      body,
      ...options,
    });
  }
}

export type ToolSetsCursorPagination = CursorPagination<ToolSet>;

export type ToolSetEventsCursorPagination = CursorPagination<ToolSetEvent>;

export type ToolSetUsagesCursorPagination = CursorPagination<ToolSetUsage>;

/**
 * Approval filters that will automatically set the approval requirement on tools
 * synced from an external source
 */
export type ApprovalRequirementFilter = ApprovalRequirementFilterAlways | ApprovalRequirementFilterOnly;

export interface ApprovalRequirementFilterAlways {
  always: boolean;

  type: 'always';
}

export interface ApprovalRequirementFilterOnly {
  /**
   * Top-level filter with simple boolean logic (no nesting)
   */
  only: ToolFilter;

  type: 'only';
}

/**
 * Single attribute filter
 */
export interface AttributeFilter {
  attribute: 'ATTRIBUTE_UNSPECIFIED' | 'ATTRIBUTE_NAME' | 'ATTRIBUTE_TITLE' | 'ATTRIBUTE_DESCRIPTION';

  /**
   * String matching operations
   */
  matcher?: StringMatcher;
}

/**
 * String matching operations
 */
export type StringMatcher =
  | StringMatcherExact
  | StringMatcherStartsWith
  | StringMatcherEndsWith
  | StringMatcherContains
  | StringMatcherRegex;

export interface StringMatcherContains {
  contains: string;

  type: 'contains';

  caseSensitive?: boolean;
}

export interface StringMatcherEndsWith {
  endsWith: string;

  type: 'endsWith';

  caseSensitive?: boolean;
}

export interface StringMatcherExact {
  exact: string;

  type: 'exact';

  caseSensitive?: boolean;
}

export interface StringMatcherRegex {
  regex: string;

  type: 'regex';

  caseSensitive?: boolean;
}

export interface StringMatcherStartsWith {
  startsWith: string;

  type: 'startsWith';

  caseSensitive?: boolean;
}

/**
 * Emitted when a tool set sync operation completes successfully.
 */
export interface SyncCompleted {
  /**
   * Optional message with additional details.
   */
  message: string;

  /**
   * Number of tools synced.
   */
  toolsSynced: number;
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
   * Optional error type/code for programmatic handling.
   */
  errorType: string;

  /**
   * Error message describing what went wrong.
   */
  message: string;
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
 * Top-level filter with simple boolean logic (no nesting)
 */
export interface ToolFilter {
  operator: 'OPERATOR_UNSPECIFIED' | 'OPERATOR_AND' | 'OPERATOR_OR';

  filters?: Array<AttributeFilter>;
}

export interface ToolSet {
  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  metadata: Shared.ResourceMetadata;

  spec: ToolSetSpec;

  /**
   * The current lifecycle state of the tool set. Output only. Tool sets are created
   * STATE_ACTIVE; use the :archive and :unarchive actions to transition between
   * states.
   */
  state: 'STATE_UNSPECIFIED' | 'STATE_ACTIVE' | 'STATE_ARCHIVED';

  /**
   * Tool set information
   */
  info?: ToolSetInfo;
}

export type ToolSetAdapter =
  | ToolSetAdapterMCPVariant
  | ToolSetAdapterHTTPVariant
  | ToolSetAdapterOpenAPIVariant
  | ToolSetAdapterBareVariant;

/**
 * Bare tool sets define tools without an execution adapter. A bare tool call
 * doesn't fire anything: the objective's workflow pauses and waits for an external
 * API consumer to set the tool call's content (e.g. human-in-the-loop tools, or a
 * reverse harness that polls for pending tool calls, executes locally, and reports
 * results back via SetToolCallContent).
 */
export interface ToolSetAdapterBare {
  /**
   * How long to wait for content to be set before the tool call errors. If unset,
   * the call waits indefinitely.
   */
  contentTimeout?: number;
}

export interface ToolSetAdapterBareVariant {
  /**
   * Bare tool sets define tools without an execution adapter. A bare tool call
   * doesn't fire anything: the objective's workflow pauses and waits for an external
   * API consumer to set the tool call's content (e.g. human-in-the-loop tools, or a
   * reverse harness that polls for pending tool calls, executes locally, and reports
   * results back via SetToolCallContent).
   */
  bare: ToolSetAdapterBare;

  type: 'bare';
}

export interface ToolSetAdapterHTTP {
  baseUrl?: string;

  headers?: { [key: string]: string };
}

export interface ToolSetAdapterHTTPVariant {
  http: ToolSetAdapterHTTP;

  type: 'http';
}

export interface ToolSetAdapterMCP {
  /**
   * Top-level filter with simple boolean logic (no nesting)
   */
  excludeTools?: ToolFilter;

  headers?: { [key: string]: string };

  /**
   * Top-level filter with simple boolean logic (no nesting)
   */
  includeTools?: ToolFilter;

  /**
   * Defines behavior for just-in-time capable tool set adapters (IE: MCP).
   */
  justInTime?: ToolSetAdapterMCP.JustInTime;

  /**
   * Approval filters that will automatically set the approval requirement on tools
   * synced from an external source
   */
  toolApprovals?: ApprovalRequirementFilter;

  url?: string;
}

export namespace ToolSetAdapterMCP {
  /**
   * Defines behavior for just-in-time capable tool set adapters (IE: MCP).
   */
  export interface JustInTime {
    enabled?: boolean;

    /**
     * If set, an objective will automatically be failed if tools cannot be loaded in
     * the initial stages of an objective being created. Tools are loaded
     * asynchronously, so this setting is useful for ensuring that an objective
     * continued any further if tools are not available.
     */
    failObjectiveOnToolListError?: boolean;
  }
}

export interface ToolSetAdapterMCPVariant {
  mcp: ToolSetAdapterMCP;

  type: 'mcp';
}

export type ToolSetAdapterOpenAPI = ToolSetAdapterOpenAPIURL | ToolSetAdapterOpenAPIUploadID;

export interface ToolSetAdapterOpenAPIUploadID {
  type: 'uploadId';

  /**
   * ID of a COMPLETE Upload containing the OpenAPI spec document.
   */
  uploadId: string;

  /**
   * Base URL for dispatching tool calls. If set, overrides the server resolved from
   * the spec's servers array.
   */
  baseUrl?: string;

  /**
   * Top-level filter with simple boolean logic (no nesting)
   */
  excludeTools?: ToolFilter;

  /**
   * Headers sent when fetching the spec from a URL and when dispatching tool calls.
   */
  headers?: { [key: string]: string };

  /**
   * Top-level filter with simple boolean logic (no nesting)
   */
  includeTools?: ToolFilter;

  /**
   * Name of the server entry in the spec's servers array (OpenAPI 3.2 server.name
   * field). Used to select which server URL to dispatch to when base_url is not set.
   * If unset, the first server is used. Ignored when base_url is set.
   */
  serverName?: string;

  /**
   * Approval filters that will automatically set the approval requirement on tools
   * synced from an external source
   */
  toolApprovals?: ApprovalRequirementFilter;
}

export interface ToolSetAdapterOpenAPIURL {
  type: 'url';

  /**
   * URL to fetch the OpenAPI spec from. Synced automatically every hour.
   */
  url: string;

  /**
   * Base URL for dispatching tool calls. If set, overrides the server resolved from
   * the spec's servers array.
   */
  baseUrl?: string;

  /**
   * Top-level filter with simple boolean logic (no nesting)
   */
  excludeTools?: ToolFilter;

  /**
   * Headers sent when fetching the spec from a URL and when dispatching tool calls.
   */
  headers?: { [key: string]: string };

  /**
   * Top-level filter with simple boolean logic (no nesting)
   */
  includeTools?: ToolFilter;

  /**
   * Name of the server entry in the spec's servers array (OpenAPI 3.2 server.name
   * field). Used to select which server URL to dispatch to when base_url is not set.
   * If unset, the first server is used. Ignored when base_url is set.
   */
  serverName?: string;

  /**
   * Approval filters that will automatically set the approval requirement on tools
   * synced from an external source
   */
  toolApprovals?: ApprovalRequirementFilter;
}

export interface ToolSetAdapterOpenAPIVariant {
  openapi: ToolSetAdapterOpenAPI;

  type: 'openapi';
}

/**
 * A single event in the tool set's operation timeline.
 */
export interface ToolSetEvent {
  /**
   * Metadata for ephemeral operations and activities (e.g., objectives, executions,
   * runs)
   */
  metadata: Shared.OperationMetadata;

  /**
   * Event payload for a tool set operation.
   */
  event: ToolSetEventData;

  info?: ToolSetEvent.Info;

  /**
   * The tool set this event is associated with.
   */
  toolSetId: string;
}

export namespace ToolSetEvent {
  export interface Info {
    /**
     * A profile identifies a user or non-human principal (such as an API key) at the
     * account level. Profiles are account-scoped and can be granted access to multiple
     * workspaces.
     */
    createdBy?: AccountAPI.Profile;

    /**
     * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
     */
    toolSet?: Shared.ResourceMetadata;
  }
}

/**
 * Event payload for a tool set operation.
 */
export type ToolSetEventData =
  | ToolSetEventDataSyncStarted
  | ToolSetEventDataSyncCompleted
  | ToolSetEventDataSyncFailed;

export interface ToolSetEventDataSyncCompleted {
  /**
   * Emitted when a tool set sync operation completes successfully.
   */
  syncCompleted: SyncCompleted;

  type: 'syncCompleted';
}

export interface ToolSetEventDataSyncFailed {
  /**
   * Emitted when a tool set sync operation fails.
   */
  syncFailed: SyncFailed;

  type: 'syncFailed';
}

export interface ToolSetEventDataSyncStarted {
  /**
   * Emitted when a tool set sync operation begins.
   */
  syncStarted: SyncStarted;

  type: 'syncStarted';
}

export interface ToolSetInfo {
  agentCount: number;

  availableTools: number;

  /**
   * A profile identifies a user or non-human principal (such as an API key) at the
   * account level. Profiles are account-scoped and can be granted access to multiple
   * workspaces.
   */
  createdBy?: AccountAPI.Profile;

  lastSync?: string;

  omittedTools: number;

  toolCount: number;
}

export interface ToolSetSpec {
  adapter: ToolSetAdapter;

  description?: string;
}

/**
 * ToolSetUsage describes one agent variation that uses the tool set (or, when
 * filtering by tool, an individual tool within it).
 */
export interface ToolSetUsage {
  /**
   * When the assignment was created.
   */
  assignedAt: string;

  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  agent: Shared.ResourceMetadata;

  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  agentVariation: Shared.ResourceMetadata;

  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  model: Shared.ResourceMetadata;
}

export interface ToolSetGetOpenAPISpecResponse {
  /**
   * The consumed OpenAPI specification as a JSON string.
   */
  spec: string;
}

export interface ToolSetCreateParams {
  /**
   * Path param: Workspace ID.
   */
  workspaceId?: string;

  /**
   * Body param: CreateResourceMetadata contains the user-provided fields for
   * creating a workspace-scoped resource. Read-only fields (id, account_id,
   * workspace_id, profile_id, created_at) are excluded since they are set by the
   * server.
   */
  metadata: Shared.CreateResourceMetadata;

  /**
   * Body param
   */
  spec: ToolSetSpec;
}

export interface ToolSetRetrieveParams {
  /**
   * Workspace ID.
   */
  workspaceId?: string;
}

export interface ToolSetUpdateParams {
  /**
   * Path param: Workspace ID.
   */
  workspaceId?: string;

  /**
   * Body param: UpdateResourceMetadata contains the user-provided fields for
   * updating a workspace-scoped resource. Read-only fields (id, account_id,
   * workspace_id, profile_id, created_at) are excluded since they are set by the
   * server.
   */
  metadata?: Shared.UpdateResourceMetadata;

  /**
   * Body param
   */
  spec?: ToolSetSpec;

  /**
   * Body param
   */
  updateMask?: string;
}

export interface ToolSetListParams extends CursorPaginationParams {
  /**
   * Path param: Workspace ID.
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
   * Query param: Filter expression (query param: prefix)
   */
  prefix?: string;

  /**
   * Query param: Free-form search query
   */
  query?: string;

  /**
   * Query param: Sort order for results (asc or desc by creation time)
   */
  sortOrder?: string;

  /**
   * Query param: Filter by tool set lifecycle state. Defaults to STATE_ACTIVE when
   * unspecified; pass STATE_ARCHIVED to list archived tool sets.
   */
  state?: 'STATE_UNSPECIFIED' | 'STATE_ACTIVE' | 'STATE_ARCHIVED';
}

export interface ToolSetDeleteParams {
  /**
   * Workspace ID.
   */
  workspaceId?: string;
}

export interface ToolSetArchiveParams {
  /**
   * Workspace ID.
   */
  workspaceId?: string;
}

export interface ToolSetGetOpenAPISpecParams {
  /**
   * Workspace ID.
   */
  workspaceId?: string;
}

export interface ToolSetListEventsParams extends CursorPaginationParams {
  /**
   * Path param: Workspace ID.
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
   * Query param: Sort order for results (asc or desc by creation time)
   */
  sortOrder?: string;
}

export interface ToolSetListUsageParams extends CursorPaginationParams {
  /**
   * Path param: Workspace ID.
   */
  workspaceId?: string;

  /**
   * Query param: Sort order for results (asc or desc by assignment creation time)
   */
  sortOrder?: string;

  /**
   * Query param: When set, lists only variations with a direct assignment of this
   * individual tool. When unset, lists variations assigned the whole tool set. The
   * tool must belong to the tool set.
   */
  toolId?: string;
}

export interface ToolSetUnarchiveParams {
  /**
   * Workspace ID.
   */
  workspaceId?: string;
}

ToolSets.Tools = Tools;
ToolSets.Secrets = Secrets;

export declare namespace ToolSets {
  export {
    type ApprovalRequirementFilter as ApprovalRequirementFilter,
    type ApprovalRequirementFilterAlways as ApprovalRequirementFilterAlways,
    type ApprovalRequirementFilterOnly as ApprovalRequirementFilterOnly,
    type AttributeFilter as AttributeFilter,
    type StringMatcher as StringMatcher,
    type StringMatcherContains as StringMatcherContains,
    type StringMatcherEndsWith as StringMatcherEndsWith,
    type StringMatcherExact as StringMatcherExact,
    type StringMatcherRegex as StringMatcherRegex,
    type StringMatcherStartsWith as StringMatcherStartsWith,
    type SyncCompleted as SyncCompleted,
    type SyncFailed as SyncFailed,
    type SyncStarted as SyncStarted,
    type ToolFilter as ToolFilter,
    type ToolSet as ToolSet,
    type ToolSetAdapter as ToolSetAdapter,
    type ToolSetAdapterBare as ToolSetAdapterBare,
    type ToolSetAdapterBareVariant as ToolSetAdapterBareVariant,
    type ToolSetAdapterHTTP as ToolSetAdapterHTTP,
    type ToolSetAdapterHTTPVariant as ToolSetAdapterHTTPVariant,
    type ToolSetAdapterMCP as ToolSetAdapterMCP,
    type ToolSetAdapterMCPVariant as ToolSetAdapterMCPVariant,
    type ToolSetAdapterOpenAPI as ToolSetAdapterOpenAPI,
    type ToolSetAdapterOpenAPIUploadID as ToolSetAdapterOpenAPIUploadID,
    type ToolSetAdapterOpenAPIURL as ToolSetAdapterOpenAPIURL,
    type ToolSetAdapterOpenAPIVariant as ToolSetAdapterOpenAPIVariant,
    type ToolSetEvent as ToolSetEvent,
    type ToolSetEventData as ToolSetEventData,
    type ToolSetEventDataSyncCompleted as ToolSetEventDataSyncCompleted,
    type ToolSetEventDataSyncFailed as ToolSetEventDataSyncFailed,
    type ToolSetEventDataSyncStarted as ToolSetEventDataSyncStarted,
    type ToolSetInfo as ToolSetInfo,
    type ToolSetSpec as ToolSetSpec,
    type ToolSetUsage as ToolSetUsage,
    type ToolSetGetOpenAPISpecResponse as ToolSetGetOpenAPISpecResponse,
    type ToolSetsCursorPagination as ToolSetsCursorPagination,
    type ToolSetEventsCursorPagination as ToolSetEventsCursorPagination,
    type ToolSetUsagesCursorPagination as ToolSetUsagesCursorPagination,
    type ToolSetCreateParams as ToolSetCreateParams,
    type ToolSetRetrieveParams as ToolSetRetrieveParams,
    type ToolSetUpdateParams as ToolSetUpdateParams,
    type ToolSetListParams as ToolSetListParams,
    type ToolSetDeleteParams as ToolSetDeleteParams,
    type ToolSetArchiveParams as ToolSetArchiveParams,
    type ToolSetGetOpenAPISpecParams as ToolSetGetOpenAPISpecParams,
    type ToolSetListEventsParams as ToolSetListEventsParams,
    type ToolSetListUsageParams as ToolSetListUsageParams,
    type ToolSetUnarchiveParams as ToolSetUnarchiveParams,
  };

  export {
    Tools as Tools,
    type ConfigBare as ConfigBare,
    type ConfigHTTP as ConfigHTTP,
    type ConfigMCP as ConfigMCP,
    type ConfigOpenAPI as ConfigOpenAPI,
    type MCPAnnotations as MCPAnnotations,
    type Tool as Tool,
    type ToolInfo as ToolInfo,
    type ToolSpec as ToolSpec,
    type ToolSpecConfig as ToolSpecConfig,
    type ToolSpecConfigBare as ToolSpecConfigBare,
    type ToolSpecConfigHTTP as ToolSpecConfigHTTP,
    type ToolSpecConfigMCP as ToolSpecConfigMCP,
    type ToolSpecConfigOpenAPI as ToolSpecConfigOpenAPI,
    type ToolsCursorPagination as ToolsCursorPagination,
    type ToolCreateParams as ToolCreateParams,
    type ToolRetrieveParams as ToolRetrieveParams,
    type ToolUpdateParams as ToolUpdateParams,
    type ToolListParams as ToolListParams,
    type ToolDeleteParams as ToolDeleteParams,
    type ToolOmitParams as ToolOmitParams,
    type ToolRestoreParams as ToolRestoreParams,
  };

  export {
    Secrets as Secrets,
    type ToolSetSecret as ToolSetSecret,
    type ToolSetSecretInfo as ToolSetSecretInfo,
    type ToolSetSecretSpec as ToolSetSecretSpec,
    type ToolSetSecretsCursorPagination as ToolSetSecretsCursorPagination,
    type SecretCreateParams as SecretCreateParams,
    type SecretRetrieveParams as SecretRetrieveParams,
    type SecretUpdateParams as SecretUpdateParams,
    type SecretListParams as SecretListParams,
    type SecretDeleteParams as SecretDeleteParams,
  };
}
