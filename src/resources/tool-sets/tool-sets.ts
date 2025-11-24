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
}

export type ToolSetsCursorPagination = CursorPagination<ToolSet>;

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

export interface ToolSet {
  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  metadata?: Shared.ResourceMetadata;

  spec?: ToolSetSpec;
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

export interface ToolSetSpec {
  adapter?: ToolSetAdapter;

  description?: string;

  /**
   * If a tool set is an MCP server, for example, this will be a read only field. If
   * the adapter type is an HTTP endpoint, then you may modify this to true yourself.
   * When a tool set is managed, all of the tools associated with it cannot be
   * created or modified by a profile actor (ie: a human). Instead, tools within a
   * tool set must be created/modified by an API Key type.
   */
  managed?: boolean;

  status?: 'TOOL_SET_STATUS_UNSPECIFIED' | 'TOOL_SET_STATUS_ENABLED' | 'TOOL_SET_STATUS_ARCHIVED';
}

export interface ToolSetCreateParams {
  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  metadata?: Shared.ResourceMetadata;

  spec?: ToolSetSpec;
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

ToolSets.Tools = Tools;

export declare namespace ToolSets {
  export {
    type McpToolFilter as McpToolFilter,
    type ToolSet as ToolSet,
    type ToolSetAdapter as ToolSetAdapter,
    type ToolSetAdapterHTTP as ToolSetAdapterHTTP,
    type ToolSetAdapterMcp as ToolSetAdapterMcp,
    type ToolSetSpec as ToolSetSpec,
    type ToolSetsCursorPagination as ToolSetsCursorPagination,
    type ToolSetCreateParams as ToolSetCreateParams,
    type ToolSetUpdateParams as ToolSetUpdateParams,
    type ToolSetListParams as ToolSetListParams,
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
