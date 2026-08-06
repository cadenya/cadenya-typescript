// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as AccountAPI from '../account';
import * as Shared from '../shared';
import { APIPromise } from '../../core/api-promise';
import { CursorPagination, type CursorPaginationParams, PagePromise } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Feedback extends APIResource {
  /**
   * Submits feedback for an objective's execution. Feedback scores are used by the
   * agent variation scoring system to evaluate and rank variation performance.
   *
   * @example
   * ```ts
   * const objectiveFeedback =
   *   await client.objectives.feedback.create('objectiveId', {
   *     workspaceId: 'workspaceId',
   *     data: {},
   *     metadata: {},
   *   });
   * ```
   */
  create(
    objectiveID: string,
    params: FeedbackCreateParams,
    options?: RequestOptions,
  ): APIPromise<ObjectiveFeedback> {
    const { workspaceId = this._client.workspaceID, ...body } = params;
    return this._client.post(path`/v1/workspaces/${workspaceId}/objectives/${objectiveID}/feedback`, {
      body,
      ...options,
    });
  }

  /**
   * Lists all feedback submitted for an objective
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const objectiveFeedback of client.objectives.feedback.list(
   *   'objectiveId',
   *   { workspaceId: 'workspaceId' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(
    objectiveID: string,
    params: FeedbackListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ObjectiveFeedbacksCursorPagination, ObjectiveFeedback> {
    const { workspaceId = this._client.workspaceID, ...query } = params ?? {};
    return this._client.getAPIList(
      path`/v1/workspaces/${workspaceId}/objectives/${objectiveID}/feedback`,
      CursorPagination<ObjectiveFeedback>,
      { query, ...options },
    );
  }
}

export type ObjectiveFeedbacksCursorPagination = CursorPagination<ObjectiveFeedback>;

/**
 * ObjectiveFeedback represents feedback submitted for an objective's execution.
 * Feedback is used to score agent variations and improve agent performance over
 * time.
 */
export interface ObjectiveFeedback {
  data: ObjectiveFeedbackData;

  /**
   * Metadata for ephemeral operations and activities (e.g., objectives, executions,
   * runs)
   */
  metadata: Shared.OperationMetadata;

  info?: ObjectiveFeedbackInfo;
}

export interface ObjectiveFeedbackData {
  /**
   * Optional human-readable comment explaining the feedback
   */
  comment?: string;

  /**
   * A score between -1.0 and 1.0 representing the quality of the objective's
   * execution. -1.0 is the worst possible score, 0.0 is neutral, and 1.0 is the
   * best.
   */
  score?: number;
}

export interface ObjectiveFeedbackInfo {
  /**
   * BareMetadata contains the minimal metadata for a resource: the ID and an
   * optional human-readable name. These are used for reference fields where the full
   * metadata (account scoping, timestamps, labels, external IDs) is not needed —
   * e.g., the tool references inside an agent variation spec or the tools assigned
   * to an objective. Both fields are server-populated; clients provide IDs through
   * sibling fields rather than by constructing a BareMetadata themselves.
   */
  agentVariation?: Shared.BareMetadata;

  /**
   * BareMetadata contains the minimal metadata for a resource: the ID and an
   * optional human-readable name. These are used for reference fields where the full
   * metadata (account scoping, timestamps, labels, external IDs) is not needed —
   * e.g., the tool references inside an agent variation spec or the tools assigned
   * to an objective. Both fields are server-populated; clients provide IDs through
   * sibling fields rather than by constructing a BareMetadata themselves.
   */
  objective?: Shared.BareMetadata;

  /**
   * A profile identifies a user or non-human principal (such as an API key) at the
   * account level. Profiles are account-scoped and can be granted access to multiple
   * workspaces.
   */
  submittedBy?: AccountAPI.Profile;
}

export interface FeedbackCreateParams {
  /**
   * Path param
   */
  workspaceId?: string;

  /**
   * Body param
   */
  data: ObjectiveFeedbackData;

  /**
   * Body param: CreateOperationMetadata contains the user-provided fields for
   * creating an operation. Read-only fields (id, account_id, workspace_id,
   * created_at, profile_id) are excluded since they are set by the server.
   */
  metadata: Shared.CreateOperationMetadata;
}

export interface FeedbackListParams extends CursorPaginationParams {
  /**
   * Path param
   */
  workspaceId?: string;

  /**
   * Query param: Filters by metadata labels. Comma-separated key=value pairs, e.g.
   * "env=prod,team=ai". A resource matches only if every pair matches exactly (AND
   * semantics).
   */
  labels?: string;
}

export declare namespace Feedback {
  export {
    type ObjectiveFeedback as ObjectiveFeedback,
    type ObjectiveFeedbackData as ObjectiveFeedbackData,
    type ObjectiveFeedbackInfo as ObjectiveFeedbackInfo,
    type ObjectiveFeedbacksCursorPagination as ObjectiveFeedbacksCursorPagination,
    type FeedbackCreateParams as FeedbackCreateParams,
    type FeedbackListParams as FeedbackListParams,
  };
}
