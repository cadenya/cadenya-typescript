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

/**
 * Marks the tool as bare: it has no execution adapter of its own and relies on the
 * parent tool set being a Bare tool set. Present so a webhook consumer can tell a
 * tool is bare from the tool data alone, without cross-referencing the tool set.
 */
export interface ConfigBare {}

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

export interface ConfigMcp {
  /**
   * Behavior hints synced from the MCP server's tool definition (ToolAnnotations in
   * the MCP specification). All hints are advisory: servers are not required to send
   * them, and clients should not rely on them for security decisions. Absent hints
   * keep the MCP spec defaults (destructiveHint and openWorldHint default to true;
   * readOnlyHint and idempotentHint default to false).
   */
  annotations?: McpAnnotations;
}

export interface ConfigOpenAPI {
  method?: string;

  path?: string;
}

/**
 * Behavior hints synced from the MCP server's tool definition (ToolAnnotations in
 * the MCP specification). All hints are advisory: servers are not required to send
 * them, and clients should not rely on them for security decisions. Absent hints
 * keep the MCP spec defaults (destructiveHint and openWorldHint default to true;
 * readOnlyHint and idempotentHint default to false).
 */
export interface McpAnnotations {
  /**
   * If true, the tool may perform destructive updates to its environment. Only
   * meaningful when read_only_hint is false.
   */
  destructiveHint?: boolean;

  /**
   * If true, calling the tool repeatedly with the same arguments has no additional
   * effect. Only meaningful when read_only_hint is false.
   */
  idempotentHint?: boolean;

  /**
   * If true, the tool may interact with an "open world" of external entities (e.g.
   * web search); if false, its domain is closed.
   */
  openWorldHint?: boolean;

  /**
   * If true, the tool does not modify its environment.
   */
  readOnlyHint?: boolean;

  /**
   * A human-readable title for the tool.
   */
  title?: string;
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
   * Content signature identifying the tool within its tool set: a hash of the
   * sanitized llm_tool_name, description, and canonical parameters. Two tools with
   * the same llm_tool_name but different parameters or description (as MCP servers
   * may return per user) have distinct signatures.
   */
  signature?: string;

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

  /**
   * The tool's JSON Schema, as handed to the LLM. Required, but may be the empty
   * object `{}` for a tool that takes no arguments. Requiring it rather than
   * defaulting it means a misspelled field name (`inputSchema`, say) is a 400
   * instead of a silently parameterless tool.
   */
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
  /**
   * Marks the tool as bare: it has no execution adapter of its own and relies on the
   * parent tool set being a Bare tool set. Present so a webhook consumer can tell a
   * tool is bare from the tool data alone, without cross-referencing the tool set.
   */
  bare?: ConfigBare;

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
   * Query param: When set to true you may use more of your alloted API rate-limit
   */
  includeInfo?: boolean;

  /**
   * Query param: Filters by metadata labels. Comma-separated key=value pairs, e.g.
   * "env=prod,team=ai". A resource matches only if every pair matches exactly (AND
   * semantics).
   */
  labels?: string;

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
    type ConfigBare as ConfigBare,
    type ConfigHTTP as ConfigHTTP,
    type ConfigMcp as ConfigMcp,
    type ConfigOpenAPI as ConfigOpenAPI,
    type McpAnnotations as McpAnnotations,
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
