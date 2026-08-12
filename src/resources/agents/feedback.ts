import { APIResource } from '../../core/resource';
import * as ObjectivesFeedbackAPI from '../objectives/feedback';
import { ObjectiveFeedbacksCursorPagination } from '../objectives/feedback';
import { CursorPagination, type CursorPaginationParams, PagePromise } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Manage AI agents within a workspace. Agents define AI behavior and tool access.
 */
export class Feedback extends APIResource {
  /**
   * Lists feedback submitted across all objectives belonging to an agent. Supports
   * search by comment, sentiment filter, agent variation filter, and creation date
   * range. Results are ordered by creation time, newest first.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const objectiveFeedback of client.agents.feedback.list(
   *   'agent_01HXKD2E5NQM3T9AYWCFMGWT9Y',
   *   { workspaceId: 'workspace_01HXKD2E5NQM3T9AYWCF133E3Q' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(
    agentID: string,
    params: FeedbackListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ObjectiveFeedbacksCursorPagination, ObjectivesFeedbackAPI.ObjectiveFeedback> {
    const { workspaceId = this._client.workspaceID, ...query } = params ?? {};
    return this._client.getAPIList(
      path`/v1/workspaces/${workspaceId}/agents/${agentID}/feedback`,
      CursorPagination<ObjectivesFeedbackAPI.ObjectiveFeedback>,
      { query, ...options },
    );
  }
}

export interface FeedbackListParams extends CursorPaginationParams {
  /**
   * Path param
   */
  workspaceId?: string;

  /**
   * Query param: Optional filter to limit results to feedback on objectives run by a
   * single agent variation. Supports "external_id:" prefix for external IDs.
   */
  agentVariationId?: string;

  /**
   * Query param: Inclusive lower bound on feedback creation time.
   */
  createdAfter?: string;

  /**
   * Query param: Exclusive upper bound on feedback creation time.
   */
  createdBefore?: string;

  /**
   * Query param: When set to true you may use more of your alloted API rate-limit
   */
  includeInfo?: boolean;

  /**
   * Query param: Filters by metadata labels. Comma-separated key=value pairs, e.g.
   * "env=prod,team=ai". A resource matches only if every pair matches exactly (AND
   * semantics).
   */
  labels?: string;

  /**
   * Query param: Free-text search applied to the feedback comment. Case-insensitive
   * substring match.
   */
  query?: string;

  /**
   * Query param: Filter by sentiment. UNSPECIFIED returns feedback regardless of
   * score.
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
