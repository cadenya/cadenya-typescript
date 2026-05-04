// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ToolSetsAPI from './tool-sets';
import * as AccountAPI from '../account';
import * as Shared from '../shared';
import * as ToolsAPI from './tools';
import {
  ConfigHTTP,
  ConfigMcp,
  Tool,
  ToolCreateParams,
  ToolDeleteParams,
  ToolInfo,
  ToolListParams,
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
    return this._client.put(path`/v1/workspaces/${workspaceId}/tool_sets/${id}`, { body, ...options });
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
}

export type ToolSetsCursorPagination = CursorPagination<ToolSet>;

export type ToolSetEventsCursorPagination = CursorPagination<ToolSetEvent>;

/**
 * Top-level filter with simple boolean logic (no nesting)
 */
export interface McpToolFilter {
  operator: 'OPERATOR_UNSPECIFIED' | 'OPERATOR_AND' | 'OPERATOR_OR';

  filters?: Array<McpToolFilter.Filter>;
}

export namespace McpToolFilter {
  /**
   * Single attribute filter
   */
  export interface Filter {
    attribute: 'ATTRIBUTE_UNSPECIFIED' | 'ATTRIBUTE_NAME' | 'ATTRIBUTE_TITLE' | 'ATTRIBUTE_DESCRIPTION';

    /**
     * String matching operations
     */
    matcher?: Filter.Matcher;
  }

  export namespace Filter {
    /**
     * String matching operations
     */
    export interface Matcher {
      caseSensitive?: boolean;

      contains?: string;

      endsWith?: string;

      exact?: string;

      regex?: string;

      startsWith?: string;
    }
  }
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

export interface ToolSet {
  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  metadata: Shared.ResourceMetadata;

  spec: ToolSetSpec;

  /**
   * Tool set information
   */
  info?: ToolSetInfo;
}

export interface ToolSetAdapter {
  http?: ToolSetAdapterHTTP;

  mcp?: ToolSetAdapterMcp;
}

export interface ToolSetAdapterHTTP {
  baseUrl?: string;

  headers?: { [key: string]: string };
}

export interface ToolSetAdapterMcp {
  /**
   * Top-level filter with simple boolean logic (no nesting)
   */
  excludeTools?: McpToolFilter;

  headers?: { [key: string]: string };

  /**
   * Top-level filter with simple boolean logic (no nesting)
   */
  includeTools?: McpToolFilter;

  /**
   * Approval filters that will automatically set the approval requirement on the
   * tools synced from the MCP server
   */
  toolApprovals?: ToolSetAdapterMcp.ToolApprovals;

  url?: string;
}

export namespace ToolSetAdapterMcp {
  /**
   * Approval filters that will automatically set the approval requirement on the
   * tools synced from the MCP server
   */
  export interface ToolApprovals {
    always?: boolean;

    /**
     * Top-level filter with simple boolean logic (no nesting)
     */
    only?: ToolSetsAPI.McpToolFilter;
  }
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

  /**
   * A profile identifies a user or non-human principal (such as an API key) at the
   * account level. Profiles are account-scoped and can be granted access to multiple
   * workspaces.
   */
  createdBy?: AccountAPI.Profile;

  lastSync?: string;

  toolCount?: number;
}

export interface ToolSetSpec {
  adapter?: ToolSetAdapter;

  description?: string;
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
}

export interface ToolSetDeleteParams {
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

ToolSets.Tools = Tools;

export declare namespace ToolSets {
  export {
    type McpToolFilter as McpToolFilter,
    type SyncCompleted as SyncCompleted,
    type SyncFailed as SyncFailed,
    type SyncStarted as SyncStarted,
    type ToolSet as ToolSet,
    type ToolSetAdapter as ToolSetAdapter,
    type ToolSetAdapterHTTP as ToolSetAdapterHTTP,
    type ToolSetAdapterMcp as ToolSetAdapterMcp,
    type ToolSetEvent as ToolSetEvent,
    type ToolSetEventData as ToolSetEventData,
    type ToolSetInfo as ToolSetInfo,
    type ToolSetSpec as ToolSetSpec,
    type ToolSetsCursorPagination as ToolSetsCursorPagination,
    type ToolSetEventsCursorPagination as ToolSetEventsCursorPagination,
    type ToolSetCreateParams as ToolSetCreateParams,
    type ToolSetRetrieveParams as ToolSetRetrieveParams,
    type ToolSetUpdateParams as ToolSetUpdateParams,
    type ToolSetListParams as ToolSetListParams,
    type ToolSetDeleteParams as ToolSetDeleteParams,
    type ToolSetListEventsParams as ToolSetListEventsParams,
  };

  export {
    Tools as Tools,
    type ConfigHTTP as ConfigHTTP,
    type ConfigMcp as ConfigMcp,
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
  };
}
