// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';
import * as FoldersAPI from './folders';
import { FolderListResponse, Folders } from './folders';
import { APIPromise } from '../../core/api-promise';
import { CursorPagination, type CursorPaginationParams, PagePromise } from '../../core/pagination';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Memories extends APIResource {
  folders: FoldersAPI.Folders = new FoldersAPI.Folders(this._client);

  /**
   * Creates a new memory in the workspace, optionally adding it to folders
   */
  create(body: MemoryCreateParams, options?: RequestOptions): APIPromise<Memory> {
    return this._client.post('/v1/memories', { body, ...options });
  }

  /**
   * Retrieves a memory by ID from the workspace
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<Memory> {
    return this._client.get(path`/v1/memories/${id}`, options);
  }

  /**
   * Updates a memory in the workspace, including adding/removing folder memberships
   */
  update(pathID: string, body: MemoryUpdateParams, options?: RequestOptions): APIPromise<Memory> {
    return this._client.patch(path`/v1/memories/${pathID}`, { body, ...options });
  }

  /**
   * Lists all memories in the workspace, optionally filtered by folder
   */
  list(
    query: MemoryListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<MemoriesCursorPagination, Memory> {
    return this._client.getAPIList('/v1/memories', CursorPagination<Memory>, { query, ...options });
  }

  /**
   * Deletes a memory from the workspace
   */
  delete(id: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/memories/${id}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export type MemoriesCursorPagination = CursorPagination<Memory>;

/**
 * Memory represents a piece of knowledge stored in the system. Memories can
 * contain documents or reference remote sources.
 */
export interface Memory {
  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  metadata?: Shared.ResourceMetadata;

  /**
   * MemorySpec defines the content and properties of a memory
   */
  spec?: MemorySpec;
}

/**
 * MemorySpec defines the content and properties of a memory
 */
export interface MemorySpec {
  /**
   * Document represents an inline document stored directly in the memory
   */
  document?: MemorySpecDocument;

  /**
   * RemoteSource represents a reference to an external document
   */
  remoteSource?: MemorySpecRemoteSource;

  /**
   * Status of the memory
   */
  status?:
    | 'MEMORY_STATUS_UNSPECIFIED'
    | 'MEMORY_STATUS_ENABLED'
    | 'MEMORY_STATUS_DISABLED'
    | 'MEMORY_STATUS_ARCHIVED';

  /**
   * Human-readable summary of what this memory contains
   */
  summary?: string;

  /**
   * The type of memory being stored
   */
  type?:
    | 'MEMORY_TYPE_UNSPECIFIED'
    | 'MEMORY_TYPE_EPISODIC'
    | 'MEMORY_TYPE_SEMANTIC'
    | 'MEMORY_TYPE_PROCEDURAL';
}

/**
 * Document represents an inline document stored directly in the memory
 */
export interface MemorySpecDocument {
  /**
   * The actual content of the document
   */
  content?: string;

  /**
   * Length of the document in bytes (computed automatically)
   */
  length?: number;

  /**
   * MIME type of the document (e.g., "text/plain", "application/pdf")
   */
  mimeType?: string;
}

/**
 * RemoteSource represents a reference to an external document
 */
export interface MemorySpecRemoteSource {
  /**
   * HTTP headers to include when fetching the remote source Useful for
   * authentication, content negotiation, etc.
   */
  headers?: { [key: string]: string };

  /**
   * HTTP method to use when fetching the remote source (e.g., "GET", "POST")
   * Defaults to GET if not specified
   */
  method?: string;

  /**
   * URL pointing to the remote source
   */
  url?: string;
}

export interface MemoryCreateParams {
  /**
   * Optional: Initial folder IDs to add the memory to A memory can belong to up to
   * 10 folders
   */
  folderIds?: Array<string>;

  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  metadata?: Shared.ResourceMetadata;

  /**
   * MemorySpec defines the content and properties of a memory
   */
  spec?: MemorySpec;
}

export interface MemoryUpdateParams {
  /**
   * Unique identifier of the memory to update
   */
  body_id?: string;

  /**
   * Optional: Folder IDs to add this memory to A memory can belong to a maximum of
   * 10 folders total
   */
  addToFolders?: Array<string>;

  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  metadata?: Shared.ResourceMetadata;

  /**
   * Optional: Folder IDs to remove this memory from
   */
  removeFromFolders?: Array<string>;

  /**
   * MemorySpec defines the content and properties of a memory
   */
  spec?: MemorySpec;

  /**
   * Fields to update (if empty, all fields are updated)
   */
  updateMask?: string;
}

export interface MemoryListParams extends CursorPaginationParams {
  /**
   * Optional: Filter memories by folder ID If provided, only returns memories that
   * belong to this folder
   */
  folderId?: string;
}

Memories.Folders = Folders;

export declare namespace Memories {
  export {
    type Memory as Memory,
    type MemorySpec as MemorySpec,
    type MemorySpecDocument as MemorySpecDocument,
    type MemorySpecRemoteSource as MemorySpecRemoteSource,
    type MemoriesCursorPagination as MemoriesCursorPagination,
    type MemoryCreateParams as MemoryCreateParams,
    type MemoryUpdateParams as MemoryUpdateParams,
    type MemoryListParams as MemoryListParams,
  };

  export { Folders as Folders, type FolderListResponse as FolderListResponse };
}
