// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as MemoryFoldersAPI from '../memory-folders';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Folders extends APIResource {
  /**
   * Lists all folders that a memory belongs to
   */
  list(memoryID: string, options?: RequestOptions): APIPromise<FolderListResponse> {
    return this._client.get(path`/v1/memories/${memoryID}/folders`, options);
  }
}

/**
 * ListMemoryFoldersForMemoryResponse contains the list of folders
 */
export interface FolderListResponse {
  /**
   * List of folders this memory belongs to
   */
  items?: Array<MemoryFoldersAPI.MemoryFolder>;
}

export declare namespace Folders {
  export { type FolderListResponse as FolderListResponse };
}
