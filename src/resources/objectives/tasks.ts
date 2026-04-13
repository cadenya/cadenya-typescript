// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';
import { APIPromise } from '../../core/api-promise';
import { CursorPagination, type CursorPaginationParams, PagePromise } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Tasks extends APIResource {
  /**
   * Retrieves a task by ID from an objective
   */
  retrieve(id: string, params: TaskRetrieveParams, options?: RequestOptions): APIPromise<ObjectiveTask> {
    const { objectiveId } = params;
    return this._client.get(path`/v1/objectives/${objectiveId}/tasks/${id}`, options);
  }

  /**
   * Lists all tasks for an objective
   */
  list(
    objectiveID: string,
    query: TaskListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ObjectiveTasksCursorPagination, ObjectiveTask> {
    return this._client.getAPIList(
      path`/v1/objectives/${objectiveID}/tasks`,
      CursorPagination<ObjectiveTask>,
      { query, ...options },
    );
  }
}

export type ObjectiveTasksCursorPagination = CursorPagination<ObjectiveTask>;

/**
 * ObjectiveTask represents a task within an objective, typically created and
 * managed by an AI agent to track progress toward completing the objective.
 */
export interface ObjectiveTask {
  data: ObjectiveTaskData;

  /**
   * BareMetadata contains the minimal metadata for a resource: the ID and an
   * optional human-readable name. These are used for reference fields where the full
   * metadata (account scoping, timestamps, labels, external IDs) is not needed —
   * e.g., the tool references inside an agent variation spec or the tools assigned
   * to an objective. Both fields are server-populated; clients provide IDs through
   * sibling fields rather than by constructing a BareMetadata themselves.
   */
  metadata: Shared.BareMetadata;
}

export interface ObjectiveTaskData {
  /**
   * Whether the task has been completed
   */
  completed: boolean;

  /**
   * The sequential number of this task within the objective (auto-assigned, 1-based)
   */
  number: number;

  /**
   * Description of the task to be completed
   */
  task: string;

  /**
   * Timestamp when the task was marked as completed
   */
  completedAt?: string;
}

export interface TaskRetrieveParams {
  /**
   * The ID of the objective. Supports "external_id:" prefix for external IDs.
   */
  objectiveId: string;
}

export interface TaskListParams extends CursorPaginationParams {
  /**
   * Sort order for results
   */
  sortOrder?: string;
}

export declare namespace Tasks {
  export {
    type ObjectiveTask as ObjectiveTask,
    type ObjectiveTaskData as ObjectiveTaskData,
    type ObjectiveTasksCursorPagination as ObjectiveTasksCursorPagination,
    type TaskRetrieveParams as TaskRetrieveParams,
    type TaskListParams as TaskListParams,
  };
}
