// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as AccountAPI from '../account';
import * as AgentsAPI from '../agents';
import * as ToolsAPI from './tools';
import {
  Tool,
  ToolCreateParams,
  ToolDeleteParams,
  ToolListParams,
  ToolListResponse,
  ToolRetrieveParams,
  ToolSpec,
  ToolUpdateParams,
  Tools,
} from './tools';
import { APIPromise } from '../../core/api-promise';
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
  ): APIPromise<ToolSetListResponse> {
    return this._client.get('/v1/tool_sets', { query, ...options });
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

export interface ToolSet {
  /**
   * Standard metadata for all resources
   */
  metadata?: AccountAPI.ResourceMetadata;

  spec?: ToolSetSpec;
}

export interface ToolSetSpec {
  description?: string;

  status?: number;
}

export interface ToolSetListResponse {
  items?: Array<ToolSet>;

  pagination?: AgentsAPI.Pagination;
}

export interface ToolSetCreateParams {
  /**
   * Standard metadata for all resources
   */
  metadata?: AccountAPI.ResourceMetadata;

  spec?: ToolSetSpec;
}

export interface ToolSetUpdateParams {
  /**
   * Standard metadata for all resources
   */
  metadata?: AccountAPI.ResourceMetadata;

  spec?: ToolSetSpec;

  updateMask?: string;
}

export interface ToolSetListParams {
  page?: ToolSetListParams.Page;
}

export namespace ToolSetListParams {
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

ToolSets.Tools = Tools;

export declare namespace ToolSets {
  export {
    type ToolSet as ToolSet,
    type ToolSetSpec as ToolSetSpec,
    type ToolSetListResponse as ToolSetListResponse,
    type ToolSetCreateParams as ToolSetCreateParams,
    type ToolSetUpdateParams as ToolSetUpdateParams,
    type ToolSetListParams as ToolSetListParams,
  };

  export {
    Tools as Tools,
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
