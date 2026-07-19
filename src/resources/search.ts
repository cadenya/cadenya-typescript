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
    params: SearchSearchToolsOrToolSetsParams,
    options?: RequestOptions,
  ): APIPromise<SearchSearchToolsOrToolSetsResponse> {
    const { workspaceId = this._client.workspaceID, ...query } = params;
    return this._client.get(path`/v1/workspaces/${workspaceId}/search/tools_or_tool_sets`, {
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
  /**
   * Path param: NOTE: `query` is runtime-required (buf.validate min_len), but
   * gnostic does not propagate message-level schema `required` to GET query
   * parameters — overlay.yaml marks the parameter required instead.
   */
  workspaceId?: string;

  /**
   * Query param
   */
  query: string;
}

export declare namespace Search {
  export {
    type SearchSearchToolsOrToolSetsResponse as SearchSearchToolsOrToolSetsResponse,
    type SearchSearchToolsOrToolSetsParams as SearchSearchToolsOrToolSetsParams,
  };
}
