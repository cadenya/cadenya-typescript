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
 * ToolService manages tool sets and tools at the WORKSPACE level.
 *  Tool sets group related tools, and tools define specific capabilities for agents.
 *  All operations are implicitly scoped to the workspace determined by the JWT token.
 *
 *  Note: When a ToolSet has managed=true, only API Key actors can modify its tools.
 *  Profile actors (humans) are restricted from modifying managed tool sets.
 *
 *  Authentication: Bearer token (JWT)
 *  Scope: Workspace-level operations
 */
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

  /**
   * The tool name (commonly an "operation id" in OpenAPI specs) to call on the HTTP
   * adapter. This is used to match the tool spec to the correct endpoint on the HTTP
   * adapter. it will be derived from the name of the tool if not provided.
   */
  toolName?: string;
}

export interface ConfigMcp {
  toolDescription?: string;

  toolName?: string;

  toolTitle?: string;
}

export interface Tool {
  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  metadata: Shared.ResourceMetadata;

  spec: ToolSpec;

  info?: ToolInfo;
}

export interface ToolInfo {
  /**
   * Profile represents a human user at the account level. Profiles are
   * account-scoped resources that can be associated with multiple workspaces through
   * the Actor model. Authentication for profiles is handled via SSO/OAuth (WorkOS).
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

  status:
    | 'TOOL_STATUS_UNSPECIFIED'
    | 'TOOL_STATUS_AVAILABLE'
    | 'TOOL_STATUS_FILTERED'
    | 'TOOL_STATUS_ARCHIVED';

  requiresApproval?: boolean;
}

/**
 * Config defines the adapter to use for the tool. This is used to determine how
 * the tool is called. For example, if the tool is an HTTP tool, the adapter will
 * be Http. If the tool is an inline tool, the adapter will be Inline.
 */
export interface ToolSpecConfig {
  http?: ConfigHTTP;

  mcp?: ConfigMcp;
}

export interface ToolCreateParams {
  /**
   * CreateResourceMetadata contains the user-provided fields for creating a
   * workspace-scoped resource. Read-only fields (id, account_id, workspace_id,
   * profile_id, created_at) are excluded since they are set by the server.
   */
  metadata: Shared.CreateResourceMetadata;

  spec: ToolSpec;
}

export interface ToolRetrieveParams {
  /**
   * Tool set ID (from path). Accepts canonical ts\_… form or external_id:<value>
   * form (see common.proto "Path-parameter ID resolution").
   */
  toolSetId: string;
}

export interface ToolUpdateParams {
  /**
   * Path param: Tool set ID (from path). Accepts canonical ts\_… form or
   * external_id:<value> form (see common.proto "Path-parameter ID resolution").
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
   * When set to true you may use more of your alloted API rate-limit
   */
  includeInfo?: boolean;

  /**
   * Filter expression (query param: prefix)
   */
  prefix?: string;

  /**
   * Free-form search query
   */
  query?: string;

  /**
   * Sort order for results (asc or desc by creation time)
   */
  sortOrder?: string;
}

export interface ToolDeleteParams {
  /**
   * Tool set ID (from path). Accepts canonical ts\_… form or external_id:<value>
   * form (see common.proto "Path-parameter ID resolution").
   */
  toolSetId: string;
}

export declare namespace Tools {
  export {
    type ConfigHTTP as ConfigHTTP,
    type ConfigMcp as ConfigMcp,
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
  };
}
