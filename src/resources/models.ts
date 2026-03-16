// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { CursorPagination, type CursorPaginationParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * ModelService manages LLM models at the WORKSPACE level.
 *  Models represent available LLM providers and families (e.g., "anthropic/claude-sonnet-4.6").
 *  Models are seeded into workspaces and can be enabled or disabled.
 *  All operations are implicitly scoped to the workspace determined by the JWT token.
 *
 *  Authentication: Bearer token (JWT)
 *  Scope: Workspace-level operations
 */
export class Models extends APIResource {
  /**
   * Retrieves a model by ID from the workspace
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<Model> {
    return this._client.get(path`/v1/models/${id}`, options);
  }

  /**
   * Lists all models in the workspace
   */
  list(
    query: ModelListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ModelsCursorPagination, Model> {
    return this._client.getAPIList('/v1/models', CursorPagination<Model>, { query, ...options });
  }

  /**
   * Enables or disables a model in the workspace
   */
  setStatus(id: string, body: ModelSetStatusParams, options?: RequestOptions): APIPromise<Model> {
    return this._client.put(path`/v1/models/${id}/status`, { body, ...options });
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
   * Maximum number of input tokens the model supports
   */
  maxInputTokens?: number;

  /**
   * Maximum number of output tokens the model can generate
   */
  maxOutputTokens?: number;

  /**
   * The model provider (e.g., "anthropic", "openai", "google")
   */
  provider?: string;

  /**
   * The status of the model in the workspace
   */
  status?: 'MODEL_STATUS_UNSPECIFIED' | 'MODEL_STATUS_ENABLED' | 'MODEL_STATUS_DISABLED';
}

export interface ModelListParams extends CursorPaginationParams {
  /**
   * Filter by name prefix
   */
  prefix?: string;

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
   * The new status for the model
   */
  status?: 'MODEL_STATUS_UNSPECIFIED' | 'MODEL_STATUS_ENABLED' | 'MODEL_STATUS_DISABLED';
}

export declare namespace Models {
  export {
    type Model as Model,
    type ModelSpec as ModelSpec,
    type ModelsCursorPagination as ModelsCursorPagination,
    type ModelListParams as ModelListParams,
    type ModelSetStatusParams as ModelSetStatusParams,
  };
}
