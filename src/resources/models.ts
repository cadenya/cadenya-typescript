// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { CursorPagination, type CursorPaginationParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Manage LLM models available to a workspace. Models represent provider and
 *  family pairs (e.g., "anthropic/claude-sonnet-4.6"). Workspaces are seeded
 *  with the supported models and you can enable or disable each one.
 */
export class Models extends APIResource {
  /**
   * Retrieves a model by ID from the workspace
   */
  retrieve(id: string, params: ModelRetrieveParams, options?: RequestOptions): APIPromise<Model> {
    const { workspaceId } = params;
    return this._client.get(path`/v1/workspaces/${workspaceId}/models/${id}`, options);
  }

  /**
   * Lists all models in the workspace
   */
  list(
    workspaceID: string,
    query: ModelListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ModelsCursorPagination, Model> {
    return this._client.getAPIList(path`/v1/workspaces/${workspaceID}/models`, CursorPagination<Model>, {
      query,
      ...options,
    });
  }

  /**
   * Enables or disables a model in the workspace
   */
  setStatus(id: string, params: ModelSetStatusParams, options?: RequestOptions): APIPromise<Model> {
    const { workspaceId, ...body } = params;
    return this._client.put(path`/v1/workspaces/${workspaceId}/models/${id}/status`, { body, ...options });
  }
}

export type ModelsCursorPagination = CursorPagination<Model>;

export interface Model {
  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  metadata: Shared.ResourceMetadata;

  /**
   * Model specification
   */
  spec: ModelSpec;
}

export interface ModelSpec {
  /**
   * The model family (e.g., "claude-sonnet-4.6", "gpt-5.4", "gemini-2.5-flash")
   */
  family?: string;

  /**
   * Cost per million input tokens in cents (e.g., 300 = $3.00)
   */
  inputPricePerMillionTokens?: string;

  /**
   * Maximum number of input tokens the model supports
   */
  maxInputTokens?: number;

  /**
   * Maximum number of output tokens the model can generate
   */
  maxOutputTokens?: number;

  /**
   * Cost per million output tokens in cents (e.g., 1500 = $15.00)
   */
  outputPricePerMillionTokens?: string;

  /**
   * The model provider (e.g., "anthropic", "openai", "google")
   */
  provider?: string;

  /**
   * The status of the model in the workspace
   */
  status?: 'MODEL_STATUS_UNSPECIFIED' | 'MODEL_STATUS_ENABLED' | 'MODEL_STATUS_DISABLED';
}

export interface ModelRetrieveParams {
  /**
   * Workspace ID.
   */
  workspaceId: string;
}

export interface ModelListParams extends CursorPaginationParams {
  /**
   * Filter by bundle_key — return only resources owned by this bundle.
   */
  bundleKey?: string;

  /**
   * Filter by name prefix
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

  /**
   * Filter by model status
   */
  status?: 'MODEL_STATUS_UNSPECIFIED' | 'MODEL_STATUS_ENABLED' | 'MODEL_STATUS_DISABLED';
}

export interface ModelSetStatusParams {
  /**
   * Path param: Workspace ID.
   */
  workspaceId: string;

  /**
   * Body param: The new status for the model
   */
  status?: 'MODEL_STATUS_UNSPECIFIED' | 'MODEL_STATUS_ENABLED' | 'MODEL_STATUS_DISABLED';
}

export declare namespace Models {
  export {
    type Model as Model,
    type ModelSpec as ModelSpec,
    type ModelsCursorPagination as ModelsCursorPagination,
    type ModelRetrieveParams as ModelRetrieveParams,
    type ModelListParams as ModelListParams,
    type ModelSetStatusParams as ModelSetStatusParams,
  };
}
