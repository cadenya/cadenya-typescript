// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

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
  ConfigHTTP,
  ConfigMcp,
  ConfigOpenAPI,
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
  create(workspaceID: string, body: ToolSetCreateParams, options?: RequestOptions): APIPromise<ToolSet> {
    return this._client.post(path`/v1/workspaces/${workspaceID}/tool_sets`, { body, ...options });
  }

  /**
   * Retrieves a tool set by ID from the workspace
   */
  retrieve(id: string, params: ToolSetRetrieveParams, options?: RequestOptions): APIPromise<ToolSet> {
    const { workspaceId } = params;
    return this._client.get(path`/v1/workspaces/${workspaceId}/tool_sets/${id}`, options);
  }

  /**
   * Updates a tool set in the workspace
   */
  update(id: string, params: ToolSetUpdateParams, options?: RequestOptions): APIPromise<ToolSet> {
    const { workspaceId, ...body } = params;
    return this._client.patch(path`/v1/workspaces/${workspaceId}/tool_sets/${id}`, { body, ...options });
  }

  /**
   * Lists all tool sets in the workspace
   */
  list(
    workspaceID: string,
    query: ToolSetListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ToolSetsCursorPagination, ToolSet> {
    return this._client.getAPIList(path`/v1/workspaces/${workspaceID}/tool_sets`, CursorPagination<ToolSet>, {
      query,
      ...options,
    });
  }

  /**
   * Deletes a tool set in the workspace
   */
  delete(id: string, params: ToolSetDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { workspaceId } = params;
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
    const { workspaceId, ...body } = params;
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
    params: ToolSetGetOpenAPISpecParams,
    options?: RequestOptions,
  ): APIPromise<ToolSetGetOpenAPISpecResponse> {
    const { workspaceId } = params;
    return this._client.get(path`/v1/workspaces/${workspaceId}/tool_sets/${toolSetID}/openapi_spec`, options);
  }

  /**
   * Lists all events (including sync status) for a tool set
   */
  listEvents(
    toolSetID: string,
    params: ToolSetListEventsParams,
    options?: RequestOptions,
  ): PagePromise<ToolSetEventsCursorPagination, ToolSetEvent> {
    const { workspaceId, ...query } = params;
    return this._client.getAPIList(
      path`/v1/workspaces/${workspaceId}/tool_sets/${toolSetID}/events`,
      CursorPagination<ToolSetEvent>,
      { query, ...options },
    );
  }

  /**
   * Transitions an archived tool set back to STATE_ACTIVE. Managed tool sets resume
   * syncing on their next cycle and their tools become available to objectives
   * again.
   */
  unarchive(id: string, params: ToolSetUnarchiveParams, options?: RequestOptions): APIPromise<ToolSet> {
    const { workspaceId, ...body } = params;
    return this._client.post(path`/v1/workspaces/${workspaceId}/tool_sets/${id}:unarchive`, {
      body,
      ...options,
    });
  }
}

export type ToolSetsCursorPagination = CursorPagination<ToolSet>;

export type ToolSetEventsCursorPagination = CursorPagination<ToolSetEvent>;

/**
 * Approval filters that will automatically set the approval requirement on tools
 * synced from an external source
 */
export interface ApprovalRequirementFilter {
  always?: boolean;

  /**
   * Top-level filter with simple boolean logic (no nesting)
   */
  only?: ToolFilter;
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
export interface StringMatcher {
  caseSensitive?: boolean;

  contains?: string;

  endsWith?: string;

  exact?: string;

  regex?: string;

  startsWith?: string;
}

/**
 * Emitted when a tool set sync operation completes successfully.
 */
export interface SyncCompleted {
  /**
   * Optional message with additional details.
   */
  message?: string;

  /**
   * Number of tools synced.
   */
  toolsSynced?: number;
}

/**
 * Emitted when a tool set sync operation fails.
 */
export interface SyncFailed {
  /**
   * Indicates this is an error event.
   */
  error?: boolean;

  /**
   * Optional error type/code for programmatic handling.
   */
  errorType?: string;

  /**
   * Error message describing what went wrong.
   */
  message?: string;
}

/**
 * Emitted when a tool set sync operation begins.
 */
export interface SyncStarted {
  /**
   * Human-readable message describing the start of the sync.
   */
  message?: string;
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

export interface ToolSetAdapter {
  http?: ToolSetAdapterHTTP;

  mcp?: ToolSetAdapterMcp;

  openapi?: ToolSetAdapterOpenAPI;
}

export interface ToolSetAdapterHTTP {
  baseUrl?: string;

  headers?: { [key: string]: string };
}

export interface ToolSetAdapterMcp {
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
   * Approval filters that will automatically set the approval requirement on tools
   * synced from an external source
   */
  toolApprovals?: ApprovalRequirementFilter;

  url?: string;
}

export interface ToolSetAdapterOpenAPI {
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

  /**
   * ID of a COMPLETE Upload containing the OpenAPI spec document.
   */
  uploadId?: string;

  /**
   * URL to fetch the OpenAPI spec from. Synced automatically every hour.
   */
  url?: string;
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
  event?: ToolSetEventData;

  info?: ToolSetEvent.Info;

  /**
   * The tool set this event is associated with.
   */
  toolSetId?: string;
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
export interface ToolSetEventData {
  /**
   * Emitted when a tool set sync operation completes successfully.
   */
  syncCompleted?: SyncCompleted;

  /**
   * Emitted when a tool set sync operation fails.
   */
  syncFailed?: SyncFailed;

  /**
   * Emitted when a tool set sync operation begins.
   */
  syncStarted?: SyncStarted;

  /**
   * Type of the event (e.g., "sync_started", "sync_completed", "sync_failed").
   */
  type?: string;
}

export interface ToolSetInfo {
  agentCount?: number;

  availableTools?: number;

  /**
   * A profile identifies a user or non-human principal (such as an API key) at the
   * account level. Profiles are account-scoped and can be granted access to multiple
   * workspaces.
   */
  createdBy?: AccountAPI.Profile;

  lastSync?: string;

  omittedTools?: number;

  toolCount?: number;
}

export interface ToolSetSpec {
  adapter?: ToolSetAdapter;

  description?: string;
}

export interface ToolSetGetOpenAPISpecResponse {
  /**
   * The consumed OpenAPI specification as a JSON string.
   */
  spec?: string;
}

export interface ToolSetCreateParams {
  /**
   * CreateResourceMetadata contains the user-provided fields for creating a
   * workspace-scoped resource. Read-only fields (id, account_id, workspace_id,
   * profile_id, created_at) are excluded since they are set by the server.
   */
  metadata: Shared.CreateResourceMetadata;

  spec: ToolSetSpec;
}

export interface ToolSetRetrieveParams {
  /**
   * Workspace ID.
   */
  workspaceId: string;
}

export interface ToolSetUpdateParams {
  /**
   * Path param: Workspace ID.
   */
  workspaceId: string;

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
   * Filter by bundle_key — return only resources owned by this bundle.
   */
  bundleKey?: string;

  /**
   * When set to true you may use more of your alloted API rate-limit
   */
  includeInfo?: boolean;

  /**
   * Filter expression (query param: prefix)
   */
  prefix?: string;

  /**
   * Free-form search query
   */
  query?: string;

  /**
   * Sort order for results (asc or desc by creation time)
   */
  sortOrder?: string;

  /**
   * Filter by tool set lifecycle state. Defaults to STATE_ACTIVE when unspecified;
   * pass STATE_ARCHIVED to list archived tool sets.
   */
  state?: 'STATE_UNSPECIFIED' | 'STATE_ACTIVE' | 'STATE_ARCHIVED';
}

export interface ToolSetDeleteParams {
  /**
   * Workspace ID.
   */
  workspaceId: string;
}

export interface ToolSetArchiveParams {
  /**
   * Workspace ID.
   */
  workspaceId: string;
}

export interface ToolSetGetOpenAPISpecParams {
  /**
   * Workspace ID.
   */
  workspaceId: string;
}

export interface ToolSetListEventsParams extends CursorPaginationParams {
  /**
   * Path param: Workspace ID.
   */
  workspaceId: string;

  /**
   * Query param: When set to true you may use more of your alloted API rate-limit
   */
  includeInfo?: boolean;

  /**
   * Query param: Sort order for results (asc or desc by creation time)
   */
  sortOrder?: string;
}

export interface ToolSetUnarchiveParams {
  /**
   * Workspace ID.
   */
  workspaceId: string;
}

ToolSets.Tools = Tools;
ToolSets.Secrets = Secrets;

export declare namespace ToolSets {
  export {
    type ApprovalRequirementFilter as ApprovalRequirementFilter,
    type AttributeFilter as AttributeFilter,
    type StringMatcher as StringMatcher,
    type SyncCompleted as SyncCompleted,
    type SyncFailed as SyncFailed,
    type SyncStarted as SyncStarted,
    type ToolFilter as ToolFilter,
    type ToolSet as ToolSet,
    type ToolSetAdapter as ToolSetAdapter,
    type ToolSetAdapterHTTP as ToolSetAdapterHTTP,
    type ToolSetAdapterMcp as ToolSetAdapterMcp,
    type ToolSetAdapterOpenAPI as ToolSetAdapterOpenAPI,
    type ToolSetEvent as ToolSetEvent,
    type ToolSetEventData as ToolSetEventData,
    type ToolSetInfo as ToolSetInfo,
    type ToolSetSpec as ToolSetSpec,
    type ToolSetGetOpenAPISpecResponse as ToolSetGetOpenAPISpecResponse,
    type ToolSetsCursorPagination as ToolSetsCursorPagination,
    type ToolSetEventsCursorPagination as ToolSetEventsCursorPagination,
    type ToolSetCreateParams as ToolSetCreateParams,
    type ToolSetRetrieveParams as ToolSetRetrieveParams,
    type ToolSetUpdateParams as ToolSetUpdateParams,
    type ToolSetListParams as ToolSetListParams,
    type ToolSetDeleteParams as ToolSetDeleteParams,
    type ToolSetArchiveParams as ToolSetArchiveParams,
    type ToolSetGetOpenAPISpecParams as ToolSetGetOpenAPISpecParams,
    type ToolSetListEventsParams as ToolSetListEventsParams,
    type ToolSetUnarchiveParams as ToolSetUnarchiveParams,
  };

  export {
    Tools as Tools,
    type ConfigHTTP as ConfigHTTP,
    type ConfigMcp as ConfigMcp,
    type ConfigOpenAPI as ConfigOpenAPI,
    type Tool as Tool,
    type ToolInfo as ToolInfo,
    type ToolSpec as ToolSpec,
    type ToolSpecConfig as ToolSpecConfig,
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
