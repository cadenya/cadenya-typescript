// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as AccountAPI from '../account';
import * as Shared from '../shared';
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
export class Tools extends APIResource {
  /**
   * Creates a new tool in the tool set
   */
  create(toolSetID: string, params: ToolCreateParams, options?: RequestOptions): APIPromise<Tool> {
    const { workspaceId, ...body } = params;
    return this._client.post(path`/v1/workspaces/${workspaceId}/tool_sets/${toolSetID}/tools`, {
      body,
      ...options,
    });
  }

  /**
   * Retrieves a tool by ID from the workspace
   */
  retrieve(id: string, params: ToolRetrieveParams, options?: RequestOptions): APIPromise<Tool> {
    const { workspaceId, toolSetId } = params;
    return this._client.get(path`/v1/workspaces/${workspaceId}/tool_sets/${toolSetId}/tools/${id}`, options);
  }

  /**
   * Updates a tool in the tool set
   */
  update(id: string, params: ToolUpdateParams, options?: RequestOptions): APIPromise<Tool> {
    const { workspaceId, toolSetId, ...body } = params;
    return this._client.patch(path`/v1/workspaces/${workspaceId}/tool_sets/${toolSetId}/tools/${id}`, {
      body,
      ...options,
    });
  }

  /**
   * Lists all tools in the tool set
   */
  list(
    toolSetID: string,
    params: ToolListParams,
    options?: RequestOptions,
  ): PagePromise<ToolsCursorPagination, Tool> {
    const { workspaceId, ...query } = params;
    return this._client.getAPIList(
      path`/v1/workspaces/${workspaceId}/tool_sets/${toolSetID}/tools`,
      CursorPagination<Tool>,
      { query, ...options },
    );
  }

  /**
   * Deletes a tool in the tool set
   */
  delete(id: string, params: ToolDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { workspaceId, toolSetId } = params;
    return this._client.delete(path`/v1/workspaces/${workspaceId}/tool_sets/${toolSetId}/tools/${id}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Transitions a tool to STATE_OMITTED, excluding it from agent use. Fails if the
   * tool is currently assigned to agent variations.
   */
  omit(id: string, params: ToolOmitParams, options?: RequestOptions): APIPromise<Tool> {
    const { workspaceId, toolSetId, ...body } = params;
    return this._client.post(path`/v1/workspaces/${workspaceId}/tool_sets/${toolSetId}/tools/${id}:omit`, {
      body,
      ...options,
    });
  }

  /**
   * Transitions an omitted tool back to STATE_AVAILABLE. For managed tool sets, the
   * next sync may omit the tool again if its filters still exclude it.
   */
  restore(id: string, params: ToolRestoreParams, options?: RequestOptions): APIPromise<Tool> {
    const { workspaceId, toolSetId, ...body } = params;
    return this._client.post(path`/v1/workspaces/${workspaceId}/tool_sets/${toolSetId}/tools/${id}:restore`, {
      body,
      ...options,
    });
  }
}

export type ToolsCursorPagination = CursorPagination<Tool>;

export interface ConfigHTTP {
  requestMethod: 'HTTP_METHOD_UNSPECIFIED' | 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

  headers?: { [key: string]: string };

  path?: string;

  query?: string;

  requestBodyContentType?: string;

  /**
   * These are only used when the request method is a POST, PUT, or PATCH
   */
  requestBodyTemplate?: string;
}

export type ConfigMcp = unknown;

export interface ConfigOpenAPI {
  method?: string;

  path?: string;
}

export interface Tool {
  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  metadata: Shared.ResourceMetadata;

  spec: ToolSpec;

  /**
   * The current lifecycle state of the tool. Output only. Use the :omit and :restore
   * actions to transition; tool set syncs may also update it.
   */
  state: 'STATE_UNSPECIFIED' | 'STATE_AVAILABLE' | 'STATE_OMITTED' | 'STATE_ARCHIVED';

  info?: ToolInfo;
}

export interface ToolInfo {
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

export interface ToolSpec {
  /**
   * Config defines the adapter to use for the tool. This is used to determine how
   * the tool is called. For example, if the tool is an HTTP tool, the adapter will
   * be Http. If the tool is an inline tool, the adapter will be Inline.
   */
  config: ToolSpecConfig;

  description: string;

  parameters: { [key: string]: unknown };

  requiresApproval: boolean;

  /**
   * The name provided to the LLM, which may differ from the metadata.name on the
   * tool. LLMs have specific length and format requirements, and tool set sources
   * may not comply with them, so Cadenya does its best to format names into a usable
   * format.
   */
  llmToolName?: string;
}

/**
 * Config defines the adapter to use for the tool. This is used to determine how
 * the tool is called. For example, if the tool is an HTTP tool, the adapter will
 * be Http. If the tool is an inline tool, the adapter will be Inline.
 */
export interface ToolSpecConfig {
  http?: ConfigHTTP;

  mcp?: ConfigMcp;

  openapi?: ConfigOpenAPI;
}

export interface ToolCreateParams {
  /**
   * Path param: Workspace ID.
   */
  workspaceId: string;

  /**
   * Body param: CreateResourceMetadata contains the user-provided fields for
   * creating a workspace-scoped resource. Read-only fields (id, account_id,
   * workspace_id, profile_id, created_at) are excluded since they are set by the
   * server.
   */
  metadata: Shared.CreateResourceMetadata;

  /**
   * Body param
   */
  spec: ToolSpec;
}

export interface ToolRetrieveParams {
  /**
   * Workspace ID.
   */
  workspaceId: string;

  /**
   * Tool set ID. Accepts the canonical ts\_… form or the external_id:<value> form.
   */
  toolSetId: string;
}

export interface ToolUpdateParams {
  /**
   * Path param: Workspace ID.
   */
  workspaceId: string;

  /**
   * Path param: Tool set ID. Accepts the canonical ts\_… form or the
   * external_id:<value> form.
   */
  toolSetId: string;

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
  spec?: ToolSpec;

  /**
   * Body param
   */
  updateMask?: string;
}

export interface ToolListParams extends CursorPaginationParams {
  /**
   * Path param: Workspace ID.
   */
  workspaceId: string;

  /**
   * Query param: Filter by bundle_key — return only resources owned by this bundle.
   */
  bundleKey?: string;

  /**
   * Query param: When set to true you may use more of your alloted API rate-limit
   */
  includeInfo?: boolean;

  /**
   * Query param: Filter by tool name (exact match). Multiple values are OR'd
   * together.
   */
  names?: Array<string>;

  /**
   * Query param: Filter expression (query param: prefix)
   */
  prefix?: string;

  /**
   * Query param: Free-form search query
   */
  query?: string;

  /**
   * Query param: Filter by approval requirement. Omitted = no filter; true = only
   * tools requiring approval; false = only tools not requiring approval.
   */
  requiresApproval?: boolean;

  /**
   * Query param: Sort order for results (asc or desc by creation time)
   */
  sortOrder?: string;

  /**
   * Query param: Filter by tool state. Multiple values are OR'd together.
   */
  states?: Array<'STATE_UNSPECIFIED' | 'STATE_AVAILABLE' | 'STATE_OMITTED' | 'STATE_ARCHIVED'>;
}

export interface ToolDeleteParams {
  /**
   * Workspace ID.
   */
  workspaceId: string;

  /**
   * Tool set ID. Accepts the canonical ts\_… form or the external_id:<value> form.
   */
  toolSetId: string;
}

export interface ToolOmitParams {
  /**
   * Workspace ID.
   */
  workspaceId: string;

  /**
   * Tool set ID. Accepts the canonical ts\_… form or the external_id:<value> form.
   */
  toolSetId: string;
}

export interface ToolRestoreParams {
  /**
   * Workspace ID.
   */
  workspaceId: string;

  /**
   * Tool set ID. Accepts the canonical ts\_… form or the external_id:<value> form.
   */
  toolSetId: string;
}

export declare namespace Tools {
  export {
    type ConfigHTTP as ConfigHTTP,
    type ConfigMcp as ConfigMcp,
    type ConfigOpenAPI as ConfigOpenAPI,
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
    type ToolOmitParams as ToolOmitParams,
    type ToolRestoreParams as ToolRestoreParams,
  };
}
