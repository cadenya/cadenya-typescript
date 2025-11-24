// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { CursorPagination, type CursorPaginationParams, PagePromise } from '../core/pagination';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class MemoryFolders extends APIResource {
  /**
   * Creates a new memory folder in the workspace
   */
  create(body: MemoryFolderCreateParams, options?: RequestOptions): APIPromise<MemoryFolder> {
    return this._client.post('/v1/memory_folders', { body, ...options });
  }

  /**
   * Retrieves a memory folder by ID from the workspace
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<MemoryFolder> {
    return this._client.get(path`/v1/memory_folders/${id}`, options);
  }

  /**
   * Updates a memory folder in the workspace
   */
  update(pathID: string, body: MemoryFolderUpdateParams, options?: RequestOptions): APIPromise<MemoryFolder> {
    return this._client.patch(path`/v1/memory_folders/${pathID}`, { body, ...options });
  }

  /**
   * Lists all memory folders in the workspace
   */
  list(
    query: MemoryFolderListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<MemoryFoldersCursorPagination, MemoryFolder> {
    return this._client.getAPIList('/v1/memory_folders', CursorPagination<MemoryFolder>, {
      query,
      ...options,
    });
  }

  /**
   * Deletes a memory folder from the workspace
   */
  delete(id: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/memory_folders/${id}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export type MemoryFoldersCursorPagination = CursorPagination<MemoryFolder>;

/**
 * MemoryFolder represents a container for organizing memories. Folders allow
 * grouping related memories together for better organization.
 */
export interface MemoryFolder {
  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  metadata?: Shared.ResourceMetadata;

  /**
   * MemoryFolderSpec defines the properties of a memory folder
   */
  spec?: MemoryFolderSpec;
}

/**
 * MemoryFolderSpec defines the properties of a memory folder
 */
export interface MemoryFolderSpec {
  /**
   * Human-readable summary describing the purpose of this folder
   */
  summary?: string;
}

export interface MemoryFolderCreateParams {
  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  metadata?: Shared.ResourceMetadata;

  /**
   * MemoryFolderSpec defines the properties of a memory folder
   */
  spec?: MemoryFolderSpec;
}

export interface MemoryFolderUpdateParams {
  /**
   * Unique identifier of the memory folder to update
   */
  body_id?: string;

  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  metadata?: Shared.ResourceMetadata;

  /**
   * MemoryFolderSpec defines the properties of a memory folder
   */
  spec?: MemoryFolderSpec;

  /**
   * Fields to update (if empty, all fields are updated)
   */
  updateMask?: string;
}

export interface MemoryFolderListParams extends CursorPaginationParams {}

export declare namespace MemoryFolders {
  export {
    type MemoryFolder as MemoryFolder,
    type MemoryFolderSpec as MemoryFolderSpec,
    type MemoryFoldersCursorPagination as MemoryFoldersCursorPagination,
    type MemoryFolderCreateParams as MemoryFolderCreateParams,
    type MemoryFolderUpdateParams as MemoryFolderUpdateParams,
    type MemoryFolderListParams as MemoryFolderListParams,
  };
}
