// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as AgentsAPI from './agents/agents';
import * as ToolSetsAPI from './tool-sets/tool-sets';
import * as ToolsAPI from './tool-sets/tools';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Search extends APIResource {
  /**
   * Searches for tools or tool sets in the workspace
   */
  searchToolsOrToolSets(
    workspaceID: string,
    query: SearchSearchToolsOrToolSetsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SearchSearchToolsOrToolSetsResponse> {
    return this._client.get(path`/v1/workspaces/${workspaceID}/search/tools_or_tool_sets`, {
      query,
      ...options,
    });
  }
}

export interface SearchSearchToolsOrToolSetsResponse {
  agents?: Array<AgentsAPI.Agent>;

  tools?: Array<ToolsAPI.Tool>;

  toolSets?: Array<ToolSetsAPI.ToolSet>;
}

export interface SearchSearchToolsOrToolSetsParams {
  query?: string;
}

export declare namespace Search {
  export {
    type SearchSearchToolsOrToolSetsResponse as SearchSearchToolsOrToolSetsResponse,
    type SearchSearchToolsOrToolSetsParams as SearchSearchToolsOrToolSetsParams,
  };
}
