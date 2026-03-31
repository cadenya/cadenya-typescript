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
   * BareMetadata contains the minimal metadata for a resource, including the ID.
   * These are used sparingly in Cadenya for resources where the full metadata is not
   * needed. You will come across them in list responses and other places where the
   * full metadata is not required like listing the tools that were assigned to an
   * objective. Because these types records are commonly created by other processes
   * in Cadenya, they do not have things like external IDs, labels, or names.
   */
  metadata: Shared.BareMetadata;
}

export interface ObjectiveTaskData {
  /**
   * Description of the task to be completed
   */
  task: string;

  /**
   * Whether the task has been completed
   */
  completed?: boolean;

  /**
   * Timestamp when the task was marked as completed
   */
  completedAt?: string;

  /**
   * The sequential number of this task within the objective (auto-assigned, 1-based)
   */
  number?: number;
}

export interface TaskRetrieveParams {
  /**
   * The ID of the objective. Supports "eid:" prefix for external IDs.
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
