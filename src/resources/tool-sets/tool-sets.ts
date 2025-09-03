// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as AccountAPI from '../account';
import * as ToolsAPI from './tools';
import {
  Tool,
  ToolCreateParams,
  ToolDeleteParams,
  ToolListParams,
  ToolRetrieveParams,
  ToolSpec,
  ToolUpdateParams,
  Tools,
  ToolsPagination,
} from './tools';
import { APIPromise } from '../../core/api-promise';
import { PagePromise, Pagination, type PaginationParams } from '../../core/pagination';
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
  ): PagePromise<ToolSetsPagination, ToolSet> {
    return this._client.getAPIList('/v1/tool_sets', Pagination<ToolSet>, { query, ...options });
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

export type ToolSetsPagination = Pagination<ToolSet>;

export interface ToolSet {
  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  metadata?: AccountAPI.ResourceMetadata;

  spec?: ToolSetSpec;
}

export interface ToolSetSpec {
  description?: string;

  status?: number;
}

export interface ToolSetCreateParams {
  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  metadata?: AccountAPI.ResourceMetadata;

  spec?: ToolSetSpec;
}

export interface ToolSetUpdateParams {
  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  metadata?: AccountAPI.ResourceMetadata;

  spec?: ToolSetSpec;

  updateMask?: string;
}

export interface ToolSetListParams extends PaginationParams {
  /**
   * Sort order for results (asc or desc by creation time)
   */
  sortOrder?: string;
}

ToolSets.Tools = Tools;

export declare namespace ToolSets {
  export {
    type ToolSet as ToolSet,
    type ToolSetSpec as ToolSetSpec,
    type ToolSetsPagination as ToolSetsPagination,
    type ToolSetCreateParams as ToolSetCreateParams,
    type ToolSetUpdateParams as ToolSetUpdateParams,
    type ToolSetListParams as ToolSetListParams,
  };

  export {
    Tools as Tools,
    type Tool as Tool,
    type ToolSpec as ToolSpec,
    type ToolsPagination as ToolsPagination,
    type ToolCreateParams as ToolCreateParams,
    type ToolRetrieveParams as ToolRetrieveParams,
    type ToolUpdateParams as ToolUpdateParams,
    type ToolListParams as ToolListParams,
    type ToolDeleteParams as ToolDeleteParams,
  };
}
