// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as ToolSetsAPI from './tool-sets/tool-sets';
import * as ToolsAPI from './tool-sets/tools';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Search extends APIResource {
  /**
   * Searches for tools or tool sets in the workspace
   */
  searchTools(
    query: SearchSearchToolsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SearchSearchToolsResponse> {
    return this._client.get('/v1/search/tools_or_tool_sets', { query, ...options });
  }
}

export interface SearchSearchToolsResponse {
  tools?: Array<ToolsAPI.Tool>;

  toolSets?: Array<ToolSetsAPI.ToolSet>;
}

export interface SearchSearchToolsParams {
  query?: string;
}

export declare namespace Search {
  export {
    type SearchSearchToolsResponse as SearchSearchToolsResponse,
    type SearchSearchToolsParams as SearchSearchToolsParams,
  };
}
