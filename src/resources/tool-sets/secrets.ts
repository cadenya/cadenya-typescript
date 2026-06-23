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
export class Secrets extends APIResource {
  /**
   * Creates a new secret scoped to the tool set
   */
  create(toolSetID: string, params: SecretCreateParams, options?: RequestOptions): APIPromise<ToolSetSecret> {
    const { workspaceId, ...body } = params;
    return this._client.post(path`/v1/workspaces/${workspaceId}/tool_sets/${toolSetID}/secrets`, {
      body,
      ...options,
    });
  }

  /**
   * Retrieves a tool set secret by ID from the tool set
   */
  retrieve(id: string, params: SecretRetrieveParams, options?: RequestOptions): APIPromise<ToolSetSecret> {
    const { workspaceId, toolSetId } = params;
    return this._client.get(
      path`/v1/workspaces/${workspaceId}/tool_sets/${toolSetId}/secrets/${id}`,
      options,
    );
  }

  /**
   * Updates a secret scoped to the tool set
   */
  update(id: string, params: SecretUpdateParams, options?: RequestOptions): APIPromise<ToolSetSecret> {
    const { workspaceId, toolSetId, ...body } = params;
    return this._client.patch(path`/v1/workspaces/${workspaceId}/tool_sets/${toolSetId}/secrets/${id}`, {
      body,
      ...options,
    });
  }

  /**
   * Lists all secrets scoped to the tool set
   */
  list(
    toolSetID: string,
    params: SecretListParams,
    options?: RequestOptions,
  ): PagePromise<ToolSetSecretsCursorPagination, ToolSetSecret> {
    const { workspaceId, ...query } = params;
    return this._client.getAPIList(
      path`/v1/workspaces/${workspaceId}/tool_sets/${toolSetID}/secrets`,
      CursorPagination<ToolSetSecret>,
      { query, ...options },
    );
  }

  /**
   * Deletes a secret scoped to the tool set
   */
  delete(id: string, params: SecretDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { workspaceId, toolSetId } = params;
    return this._client.delete(path`/v1/workspaces/${workspaceId}/tool_sets/${toolSetId}/secrets/${id}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export type ToolSetSecretsCursorPagination = CursorPagination<ToolSetSecret>;

export interface ToolSetSecret {
  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  metadata: Shared.ResourceMetadata;

  spec: ToolSetSecretSpec;

  /**
   * Tool set secret information
   */
  info?: ToolSetSecretInfo;
}

export interface ToolSetSecretInfo {
  /**
   * A profile identifies a user or non-human principal (such as an API key) at the
   * account level. Profiles are account-scoped and can be granted access to multiple
   * workspaces.
   */
  createdBy?: AccountAPI.Profile;

  lastUsedAt?: string;
}

export interface ToolSetSecretSpec {
  value?: string;
}

export interface SecretCreateParams {
  /**
   * Path param: The workspace that owns the tool set.
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
  spec: ToolSetSecretSpec;
}

export interface SecretRetrieveParams {
  /**
   * The workspace that owns the tool set.
   */
  workspaceId: string;

  /**
   * The tool set the secret belongs to. Accepts the canonical ts\_… form or the
   * external_id:<value> form.
   */
  toolSetId: string;
}

export interface SecretUpdateParams {
  /**
   * Path param: The workspace that owns the tool set.
   */
  workspaceId: string;

  /**
   * Path param: The tool set the secret belongs to. Accepts the canonical ts\_… form
   * or the external_id:<value> form.
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
  spec?: ToolSetSecretSpec;

  /**
   * Body param: Fields to update.
   */
  updateMask?: string;
}

export interface SecretListParams extends CursorPaginationParams {
  /**
   * Path param: The workspace that owns the tool set.
   */
  workspaceId: string;

  /**
   * Query param: When set to true you may use more of your alloted API rate-limit
   */
  includeInfo?: boolean;

  /**
   * Query param: Filter expression (query param: prefix)
   */
  prefix?: string;

  /**
   * Query param: Free-form search query
   */
  query?: string;

  /**
   * Query param: Sort order for results (asc or desc by creation time)
   */
  sortOrder?: string;
}

export interface SecretDeleteParams {
  /**
   * The workspace that owns the tool set.
   */
  workspaceId: string;

  /**
   * The tool set the secret belongs to. Accepts the canonical ts\_… form or the
   * external_id:<value> form.
   */
  toolSetId: string;
}

export declare namespace Secrets {
  export {
    type ToolSetSecret as ToolSetSecret,
    type ToolSetSecretInfo as ToolSetSecretInfo,
    type ToolSetSecretSpec as ToolSetSecretSpec,
    type ToolSetSecretsCursorPagination as ToolSetSecretsCursorPagination,
    type SecretCreateParams as SecretCreateParams,
    type SecretRetrieveParams as SecretRetrieveParams,
    type SecretUpdateParams as SecretUpdateParams,
    type SecretListParams as SecretListParams,
    type SecretDeleteParams as SecretDeleteParams,
  };
}
