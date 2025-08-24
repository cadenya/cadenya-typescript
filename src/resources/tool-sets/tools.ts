// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as AgentsAPI from '../agents';
import { APIPromise } from '../../core/api-promise';
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
  update(pathID: string, params: ToolUpdateParams, options?: RequestOptions): APIPromise<Tool> {
    const { path_toolSetId, ...body } = params;
    return this._client.put(path`/v1/tool_sets/${path_toolSetId}/tools/${pathID}`, { body, ...options });
  }

  /**
   * Lists all tools in the tool set
   */
  list(
    toolSetID: string,
    query: ToolListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ToolListResponse> {
    return this._client.get(path`/v1/tool_sets/${toolSetID}/tools`, { query, ...options });
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

export interface Tool {
  /**
   * Standard metadata for all resources
   */
  metadata?: AgentsAPI.ResourceMetadata;

  spec?: ToolSpec;
}

export interface ToolSpec {
  description?: string;

  indexContent?: string;

  inputSchema?: unknown;

  name?: string;

  requiresApproval?: boolean;

  status?: number;

  toolSetId?: string;
}

export interface ToolListResponse {
  items?: Array<Tool>;

  pagination?: AgentsAPI.Pagination;
}

export interface ToolCreateParams {
  /**
   * Standard metadata for all resources
   */
  metadata?: AgentsAPI.ResourceMetadata;

  spec?: ToolSpec;

  body_toolSetId?: string;
}

export interface ToolRetrieveParams {
  toolSetId: string;
}

export interface ToolUpdateParams {
  /**
   * Path param:
   */
  path_toolSetId: string;

  /**
   * Body param:
   */
  body_id?: string;

  /**
   * Body param: Standard metadata for all resources
   */
  metadata?: AgentsAPI.ResourceMetadata;

  /**
   * Body param:
   */
  spec?: ToolSpec;

  /**
   * Body param:
   */
  body_toolSetId?: string;

  /**
   * Body param:
   */
  updateMask?: string;
}

export interface ToolListParams {
  page?: ToolListParams.Page;
}

export namespace ToolListParams {
  export interface Page {
    /**
     * Pagination cursor from previous response
     */
    cursor?: string;

    /**
     * Maximum number of results to return
     */
    limit?: number;
  }
}

export interface ToolDeleteParams {
  toolSetId: string;
}

export declare namespace Tools {
  export {
    type Tool as Tool,
    type ToolSpec as ToolSpec,
    type ToolListResponse as ToolListResponse,
    type ToolCreateParams as ToolCreateParams,
    type ToolRetrieveParams as ToolRetrieveParams,
    type ToolUpdateParams as ToolUpdateParams,
    type ToolListParams as ToolListParams,
    type ToolDeleteParams as ToolDeleteParams,
  };
}
