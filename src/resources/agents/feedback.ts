// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ObjectivesFeedbackAPI from '../objectives/feedback';
import { ObjectiveFeedbacksCursorPagination } from '../objectives/feedback';
import { CursorPagination, type CursorPaginationParams, PagePromise } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * AgentService manages AI agents at the WORKSPACE level.
 *  Agents are workspace-scoped resources that define AI behavior and tool access.
 *  All operations are implicitly scoped to the workspace determined by the JWT token.
 *
 *  Authentication: Bearer token (JWT)
 *  Scope: Workspace-level operations
 */
export class Feedback extends APIResource {
  /**
   * Lists feedback submitted across all objectives belonging to an agent. Supports
   * search by comment, sentiment filter, agent variation filter, and creation date
   * range. Results are ordered by creation time, newest first.
   */
  list(
    agentID: string,
    query: FeedbackListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ObjectiveFeedbacksCursorPagination, ObjectivesFeedbackAPI.ObjectiveFeedback> {
    return this._client.getAPIList(
      path`/v1/agents/${agentID}/feedback`,
      CursorPagination<ObjectivesFeedbackAPI.ObjectiveFeedback>,
      { query, ...options },
    );
  }
}

export interface FeedbackListParams extends CursorPaginationParams {
  /**
   * Optional filter to limit results to feedback on objectives run by a single agent
   * variation. Supports "external_id:" prefix for external IDs.
   */
  agentVariationId?: string;

  /**
   * Inclusive lower bound on feedback creation time.
   */
  createdAfter?: string;

  /**
   * Exclusive upper bound on feedback creation time.
   */
  createdBefore?: string;

  /**
   * When set to true you may use more of your alloted API rate-limit
   */
  includeInfo?: boolean;

  /**
   * Free-text search applied to the feedback comment. Case-insensitive substring
   * match.
   */
  query?: string;

  /**
   * Filter by sentiment. UNSPECIFIED returns feedback regardless of score.
   */
  sentiment?:
    | 'FEEDBACK_SENTIMENT_UNSPECIFIED'
    | 'FEEDBACK_SENTIMENT_POSITIVE'
    | 'FEEDBACK_SENTIMENT_NEGATIVE';
}

export declare namespace Feedback {
  export { type FeedbackListParams as FeedbackListParams };
}

export { type ObjectiveFeedbacksCursorPagination };
