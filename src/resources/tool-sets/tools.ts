// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as AccountAPI from '../account';
import { APIPromise } from '../../core/api-promise';
import { CursorPagination, type CursorPaginationParams, PagePromise } from '../../core/pagination';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Tools extends APIResource {
  /**
   * Creates a new tool in the tool set
   */
  create(toolSetID: string, body: ToolCreateParams, options?: RequestOptions): APIPromise<Tool> {
    return this._client.post(path`/v1/tool_sets/${toolSetID}/tools`, { body, ...options });
  }

  /**
   * Retrieves a tool by ID from the workspace
   */
  retrieve(id: string, params: ToolRetrieveParams, options?: RequestOptions): APIPromise<Tool> {
    const { toolSetId } = params;
    return this._client.get(path`/v1/tool_sets/${toolSetId}/tools/${id}`, options);
  }

  /**
   * Updates a tool in the tool set
   */
  update(id: string, params: ToolUpdateParams, options?: RequestOptions): APIPromise<Tool> {
    const { toolSetId, ...body } = params;
    return this._client.put(path`/v1/tool_sets/${toolSetId}/tools/${id}`, { body, ...options });
  }

  /**
   * Lists all tools in the tool set
   */
  list(
    toolSetID: string,
    query: ToolListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ToolsCursorPagination, Tool> {
    return this._client.getAPIList(path`/v1/tool_sets/${toolSetID}/tools`, CursorPagination<Tool>, {
      query,
      ...options,
    });
  }

  /**
   * Deletes a tool in the tool set
   */
  delete(id: string, params: ToolDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { toolSetId } = params;
    return this._client.delete(path`/v1/tool_sets/${toolSetId}/tools/${id}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export type ToolsCursorPagination = CursorPagination<Tool>;

export interface Tool {
  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  metadata?: AccountAPI.ResourceMetadata;

  spec?: ToolSpec;
}

export interface ToolSpec {
  /**
   * Config defines the adapter to use for the tool. This is used to determine how
   * the tool is called. For example, if the tool is an HTTP tool, the adapter will
   * be Http. If the tool is an inline tool, the adapter will be Inline.
   */
  config?: ToolSpec.Config;

  contentFilter?: ToolSpec.ContentFilter;

  description?: string;

  indexContent?: string;

  name?: string;

  parameters?: unknown;

  requiresApproval?: boolean;

  status?: number;

  toolSetId?: string;
}

export namespace ToolSpec {
  /**
   * Config defines the adapter to use for the tool. This is used to determine how
   * the tool is called. For example, if the tool is an HTTP tool, the adapter will
   * be Http. If the tool is an inline tool, the adapter will be Inline.
   */
  export interface Config {
    http?: Config.HTTP;

    mcp?: Config.Mcp;
  }

  export namespace Config {
    export interface HTTP {
      headers?: { [key: string]: string };

      path?: string;

      query?: string;

      requestMethod?: number;
    }

    export interface Mcp {
      toolName?: string;
    }
  }

  export interface ContentFilter {
    jq?: string;

    regex?: string;
  }
}

export interface ToolCreateParams {
  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  metadata?: AccountAPI.ResourceMetadata;

  spec?: ToolSpec;
}

export interface ToolRetrieveParams {
  toolSetId: string;
}

export interface ToolUpdateParams {
  /**
   * Path param:
   */
  toolSetId: string;

  /**
   * Body param: Standard metadata for persistent, named resources (e.g., agents,
   * tools, prompts)
   */
  metadata?: AccountAPI.ResourceMetadata;

  /**
   * Body param:
   */
  spec?: ToolSpec;

  /**
   * Body param:
   */
  updateMask?: string;
}

export interface ToolListParams extends CursorPaginationParams {
  /**
   * Sort order for results (asc or desc by creation time)
   */
  sortOrder?: string;
}

export interface ToolDeleteParams {
  toolSetId: string;
}

export declare namespace Tools {
  export {
    type Tool as Tool,
    type ToolSpec as ToolSpec,
    type ToolsCursorPagination as ToolsCursorPagination,
    type ToolCreateParams as ToolCreateParams,
    type ToolRetrieveParams as ToolRetrieveParams,
    type ToolUpdateParams as ToolUpdateParams,
    type ToolListParams as ToolListParams,
    type ToolDeleteParams as ToolDeleteParams,
  };
}
