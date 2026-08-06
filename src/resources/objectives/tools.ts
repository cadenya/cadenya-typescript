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
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const objectiveTool of client.objectives.tools.list(
   *   'objectiveId',
   *   { workspaceId: 'workspaceId' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(
    objectiveID: string,
    params: ToolListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ObjectiveToolsCursorPagination, ObjectiveTool> {
    const { workspaceId = this._client.workspaceID, ...query } = params ?? {};
    return this._client.getAPIList(
      path`/v1/workspaces/${workspaceId}/objectives/${objectiveID}/tools`,
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
   * BareMetadata contains the minimal metadata for a resource: the ID and an
   * optional human-readable name. These are used for reference fields where the full
   * metadata (account scoping, timestamps, labels, external IDs) is not needed —
   * e.g., the tool references inside an agent variation spec or the tools assigned
   * to an objective. Both fields are server-populated; clients provide IDs through
   * sibling fields rather than by constructing a BareMetadata themselves.
   */
  metadata: Shared.BareMetadata;

  /**
   * Snapshot of the tool at the time it was assigned to the objective. Because tools
   * can change over time, snapshots are used to ensure tools don't change
   * unexpectedly during an objective's lifecycle.
   */
  snapshot?: ToolSetsToolsAPI.Tool;
}

export interface ToolListParams extends CursorPaginationParams {
  /**
   * Path param
   */
  workspaceId?: string;
}

export declare namespace Tools {
  export {
    type ObjectiveTool as ObjectiveTool,
    type ObjectiveToolsCursorPagination as ObjectiveToolsCursorPagination,
    type ToolListParams as ToolListParams,
  };
}
