// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';
import { APIPromise } from '../../core/api-promise';
import { CursorPagination, type CursorPaginationParams, PagePromise } from '../../core/pagination';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Prompts extends APIResource {
  /**
   * Creates a new prompt for an agent
   */
  create(agentID: string, body: PromptCreateParams, options?: RequestOptions): APIPromise<Prompt> {
    return this._client.post(path`/v1/agents/${agentID}/prompts`, { body, ...options });
  }

  /**
   * Retrieves a prompt by ID from an agent
   */
  retrieve(id: string, params: PromptRetrieveParams, options?: RequestOptions): APIPromise<Prompt> {
    const { agentId } = params;
    return this._client.get(path`/v1/agents/${agentId}/prompts/${id}`, options);
  }

  /**
   * Updates a prompt for an agent
   */
  update(id: string, params: PromptUpdateParams, options?: RequestOptions): APIPromise<Prompt> {
    const { agentId, ...body } = params;
    return this._client.patch(path`/v1/agents/${agentId}/prompts/${id}`, { body, ...options });
  }

  /**
   * Lists all prompts for an agent
   */
  list(
    agentID: string,
    query: PromptListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<PromptsCursorPagination, Prompt> {
    return this._client.getAPIList(path`/v1/agents/${agentID}/prompts`, CursorPagination<Prompt>, {
      query,
      ...options,
    });
  }

  /**
   * Deletes a prompt from an agent
   */
  delete(id: string, params: PromptDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { agentId } = params;
    return this._client.delete(path`/v1/agents/${agentId}/prompts/${id}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export type PromptsCursorPagination = CursorPagination<Prompt>;

/**
 * Prompt resource
 */
export interface Prompt {
  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  metadata?: Shared.ResourceMetadata;

  /**
   * Prompt specification (user-provided configuration)
   */
  spec?: PromptSpec;
}

/**
 * Prompt specification (user-provided configuration)
 */
export interface PromptSpec {
  /**
   * Content of the prompt
   */
  content?: string;

  /**
   * Whether this is the default prompt for the agent
   */
  default?: boolean;

  /**
   * Selector for the objective labels. If an objective matches the selector, the
   * prompt will be included in the objective's system prompt. This label selector
   * matches the Kubernetes label selector logic, where if a key is provided, the
   * value must match the value of the objective's label with the same key. If a key
   * is provided but no value is provided, the objective's label with the same key
   * must exist.
   */
  objectiveLabelsSelector?: { [key: string]: string };

  /**
   * Status of the prompt
   */
  status?: 'PROMPT_STATUS_UNSPECIFIED' | 'PROMPT_STATUS_ENABLED' | 'PROMPT_STATUS_ARCHIVED';
}

export interface PromptCreateParams {
  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  metadata?: Shared.ResourceMetadata;

  /**
   * Prompt specification (user-provided configuration)
   */
  spec?: PromptSpec;
}

export interface PromptRetrieveParams {
  /**
   * Agent ID (from path)
   */
  agentId: string;
}

export interface PromptUpdateParams {
  /**
   * Path param: Agent ID (from path)
   */
  agentId: string;

  /**
   * Body param: Standard metadata for persistent, named resources (e.g., agents,
   * tools, prompts)
   */
  metadata?: Shared.ResourceMetadata;

  /**
   * Body param: Prompt specification (user-provided configuration)
   */
  spec?: PromptSpec;

  /**
   * Body param: Fields to update
   */
  updateMask?: string;
}

export interface PromptListParams extends CursorPaginationParams {
  /**
   * Sort order for results (asc or desc by creation time)
   */
  sortOrder?: string;
}

export interface PromptDeleteParams {
  /**
   * Agent ID (from path)
   */
  agentId: string;
}

export declare namespace Prompts {
  export {
    type Prompt as Prompt,
    type PromptSpec as PromptSpec,
    type PromptsCursorPagination as PromptsCursorPagination,
    type PromptCreateParams as PromptCreateParams,
    type PromptRetrieveParams as PromptRetrieveParams,
    type PromptUpdateParams as PromptUpdateParams,
    type PromptListParams as PromptListParams,
    type PromptDeleteParams as PromptDeleteParams,
  };
}
