// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as AccountAPI from './account';
import { APIPromise } from '../core/api-promise';
import { CursorPagination, type CursorPaginationParams, PagePromise } from '../core/pagination';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class WorkspaceSecrets extends APIResource {
  /**
   * Creates a new workspace secret in the workspace
   */
  create(body: WorkspaceSecretCreateParams, options?: RequestOptions): APIPromise<WorkspaceSecret> {
    return this._client.post('/v1/workspace_secrets', { body, ...options });
  }

  /**
   * Retrieves a workspace secret by ID from the workspace
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<WorkspaceSecret> {
    return this._client.get(path`/v1/workspace_secrets/${id}`, options);
  }

  /**
   * Updates a workspace secret in the workspace
   */
  update(
    id: string,
    body: WorkspaceSecretUpdateParams,
    options?: RequestOptions,
  ): APIPromise<WorkspaceSecret> {
    return this._client.patch(path`/v1/workspace_secrets/${id}`, { body, ...options });
  }

  /**
   * Lists all workspace secrets in the workspace
   */
  list(
    query: WorkspaceSecretListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<WorkspaceSecretsCursorPagination, WorkspaceSecret> {
    return this._client.getAPIList('/v1/workspace_secrets', CursorPagination<WorkspaceSecret>, {
      query,
      ...options,
    });
  }

  /**
   * Deletes a workspace secret from the workspace
   */
  delete(id: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/workspace_secrets/${id}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export type WorkspaceSecretsCursorPagination = CursorPagination<WorkspaceSecret>;

export interface WorkspaceSecret {
  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  metadata?: AccountAPI.ResourceMetadata;

  spec?: WorkspaceSecretSpec;
}

export interface WorkspaceSecretSpec {
  name?: string;

  value?: string;
}

export interface WorkspaceSecretCreateParams {
  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  metadata?: AccountAPI.ResourceMetadata;

  spec?: WorkspaceSecretSpec;
}

export interface WorkspaceSecretUpdateParams {
  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  metadata?: AccountAPI.ResourceMetadata;

  spec?: WorkspaceSecretSpec;

  /**
   * Fields to update
   */
  updateMask?: string;
}

export interface WorkspaceSecretListParams extends CursorPaginationParams {
  /**
   * Filter expression (query param: prefix)
   */
  prefix?: string;

  /**
   * Sort order for results (asc or desc by creation time)
   */
  sortOrder?: string;
}

export declare namespace WorkspaceSecrets {
  export {
    type WorkspaceSecret as WorkspaceSecret,
    type WorkspaceSecretSpec as WorkspaceSecretSpec,
    type WorkspaceSecretsCursorPagination as WorkspaceSecretsCursorPagination,
    type WorkspaceSecretCreateParams as WorkspaceSecretCreateParams,
    type WorkspaceSecretUpdateParams as WorkspaceSecretUpdateParams,
    type WorkspaceSecretListParams as WorkspaceSecretListParams,
  };
}
