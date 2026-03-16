// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';
import * as ToolSetsToolsAPI from '../tool-sets/tools';
import { CursorPagination, type CursorPaginationParams, PagePromise } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Tools extends APIResource {
  /**
   * Lists all tools that were assigned to an objective
   */
  list(
    objectiveID: string,
    query: ToolListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ObjectiveToolsCursorPagination, ObjectiveTool> {
    return this._client.getAPIList(
      path`/v1/objectives/${objectiveID}/tools`,
      CursorPagination<ObjectiveTool>,
      { query, ...options },
    );
  }
}

export type ObjectiveToolsCursorPagination = CursorPagination<ObjectiveTool>;

/**
 * ObjectiveTool represents a tool that was assigned to an objective.
 */
export interface ObjectiveTool {
  /**
   * BareMetadata contains the minimal metadata for a resource, including the ID.
   * These are used sparingly in Cadenya for resources where the full metadata is not
   * needed. You will come across them in list responses and other places where the
   * full metadata is not required like listing the tools that were assigned to an
   * objective. Because these types records are commonly created by other processes
   * in Cadenya, they do not have things like external IDs, labels, or names.
   */
  metadata: Shared.BareMetadata;

  /**
   * Snapshot of the tool at the time it was assigned to the objective. Because tools
   * can change over time, snapshots are used to ensure tools don't change
   * unexpectedly during an objective's lifecycle.
   */
  snapshot?: ToolSetsToolsAPI.Tool;
}

export interface ToolListParams extends CursorPaginationParams {}

export declare namespace Tools {
  export {
    type ObjectiveTool as ObjectiveTool,
    type ObjectiveToolsCursorPagination as ObjectiveToolsCursorPagination,
    type ToolListParams as ToolListParams,
  };
}
