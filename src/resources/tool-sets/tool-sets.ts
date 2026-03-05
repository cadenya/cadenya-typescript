// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ToolSetsAPI from './tool-sets';
import * as Shared from '../shared';
import * as ToolsAPI from './tools';
import {
  ConfigHTTP,
  ConfigMcp,
  Tool,
  ToolCreateParams,
  ToolDeleteParams,
  ToolListParams,
  ToolRetrieveParams,
  ToolSpec,
  ToolSpecConfig,
  ToolSpecContentFilter,
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
 * ToolService manages tool sets and tools at the WORKSPACE level.
 *  Tool sets group related tools, and tools define specific capabilities for agents.
 *  All operations are implicitly scoped to the workspace determined by the JWT token.
 *
 *  Note: When a ToolSet has managed=true, only API Key actors can modify its tools.
 *  Profile actors (humans) are restricted from modifying managed tool sets.
 *
 *  Authentication: Bearer token (JWT)
 *  Scope: Workspace-level operations
 */
export class ToolSets extends APIResource {
  tools: ToolsAPI.Tools = new ToolsAPI.Tools(this._client);

  /**
   * Creates a new tool set in the workspace
   */
  create(body: ToolSetCreateParams, options?: RequestOptions): APIPromise<ToolSet> {
    return this._client.post('/v1/tool_sets', { body, ...options });
  }

  /**
   * Retrieves a tool set by ID from the workspace
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<ToolSet> {
    return this._client.get(path`/v1/tool_sets/${id}`, options);
  }

  /**
   * Updates a tool set in the workspace
   */
  update(id: string, body: ToolSetUpdateParams, options?: RequestOptions): APIPromise<ToolSet> {
    return this._client.put(path`/v1/tool_sets/${id}`, { body, ...options });
  }

  /**
   * Lists all tool sets in the workspace
   */
  list(
    query: ToolSetListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ToolSetsCursorPagination, ToolSet> {
    return this._client.getAPIList('/v1/tool_sets', CursorPagination<ToolSet>, { query, ...options });
  }

  /**
   * Deletes a tool set in the workspace
   */
  delete(id: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/tool_sets/${id}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Lists all events (including sync status) for a tool set
   */
  listEvents(
    toolSetID: string,
    query: ToolSetListEventsParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ToolSetEventsCursorPagination, ToolSetEvent> {
    return this._client.getAPIList(path`/v1/tool_sets/${toolSetID}/events`, CursorPagination<ToolSetEvent>, {
      query,
      ...options,
    });
  }
}

export type ToolSetsCursorPagination = CursorPagination<ToolSet>;

export type ToolSetEventsCursorPagination = CursorPagination<ToolSetEvent>;

/**
 * Top-level filter with simple boolean logic (no nesting)
 */
export interface McpToolFilter {
  filters?: Array<McpToolFilter.Filter>;

  operator?: 'OPERATOR_UNSPECIFIED' | 'OPERATOR_AND' | 'OPERATOR_OR';
}

export namespace McpToolFilter {
  /**
   * Single attribute filter
   */
  export interface Filter {
    attribute?: 'ATTRIBUTE_UNSPECIFIED' | 'ATTRIBUTE_NAME' | 'ATTRIBUTE_TITLE' | 'ATTRIBUTE_DESCRIPTION';

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
 * SyncCompleted is emitted when a tool set sync operation completes successfully
 */
export interface SyncCompleted {
  /**
   * Optional message with additional details
   */
  message?: string;

  /**
   * Number of tools synced
   */
  toolsSynced?: number;
}

/**
 * SyncFailed is emitted when a tool set sync operation fails
 */
export interface SyncFailed {
  /**
   * Indicates this is an error event
   */
  error?: boolean;

  /**
   * Optional error type/code for programmatic handling
   */
  errorType?: string;

  /**
   * Error message describing what went wrong
   */
  message?: string;
}

/**
 * SyncStarted is emitted when a tool set sync operation begins
 */
export interface SyncStarted {
  /**
   * Timestamp when the sync was initiated
   */
  message?: string;
}

export interface ToolSet {
  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  metadata: Shared.ResourceMetadata;

  spec: ToolSetSpec;
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
 * ToolSetEvent represents a single event in the tool set's operation timeline
 */
export interface ToolSetEvent {
  /**
   * Metadata for ephemeral operations and activities (e.g., objectives, executions,
   * runs)
   */
  metadata: Shared.OperationMetadata;

  /**
   * ToolSetEventData represents the actual event payload for tool set operations
   */
  event?: ToolSetEventData;

  /**
   * The tool set this event is associated with
   */
  toolSetId?: string;
}

/**
 * ToolSetEventData represents the actual event payload for tool set operations
 */
export interface ToolSetEventData {
  /**
   * SyncCompleted is emitted when a tool set sync operation completes successfully
   */
  syncCompleted?: SyncCompleted;

  /**
   * SyncFailed is emitted when a tool set sync operation fails
   */
  syncFailed?: SyncFailed;

  /**
   * SyncStarted is emitted when a tool set sync operation begins
   */
  syncStarted?: SyncStarted;

  /**
   * Type of the event (e.g., "sync_started", "sync_completed", "sync_failed")
   */
  type?: string;
}

export interface ToolSetSpec {
  adapter?: ToolSetAdapter;

  description?: string;
}

export interface ToolSetCreateParams {
  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  metadata: Shared.ResourceMetadata;

  spec: ToolSetSpec;
}

export interface ToolSetUpdateParams {
  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  metadata?: Shared.ResourceMetadata;

  spec?: ToolSetSpec;

  updateMask?: string;
}

export interface ToolSetListParams extends CursorPaginationParams {
  /**
   * Sort order for results (asc or desc by creation time)
   */
  sortOrder?: string;
}

export interface ToolSetListEventsParams extends CursorPaginationParams {
  /**
   * Sort order for results (asc or desc by creation time)
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
    type ToolSetSpec as ToolSetSpec,
    type ToolSetsCursorPagination as ToolSetsCursorPagination,
    type ToolSetEventsCursorPagination as ToolSetEventsCursorPagination,
    type ToolSetCreateParams as ToolSetCreateParams,
    type ToolSetUpdateParams as ToolSetUpdateParams,
    type ToolSetListParams as ToolSetListParams,
    type ToolSetListEventsParams as ToolSetListEventsParams,
  };

  export {
    Tools as Tools,
    type ConfigHTTP as ConfigHTTP,
    type ConfigMcp as ConfigMcp,
    type Tool as Tool,
    type ToolSpec as ToolSpec,
    type ToolSpecConfig as ToolSpecConfig,
    type ToolSpecContentFilter as ToolSpecContentFilter,
    type ToolsCursorPagination as ToolsCursorPagination,
    type ToolCreateParams as ToolCreateParams,
    type ToolRetrieveParams as ToolRetrieveParams,
    type ToolUpdateParams as ToolUpdateParams,
    type ToolListParams as ToolListParams,
    type ToolDeleteParams as ToolDeleteParams,
  };
}
