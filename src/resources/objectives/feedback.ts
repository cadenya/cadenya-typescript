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
   */
  create(
    objectiveID: string,
    body: FeedbackCreateParams,
    options?: RequestOptions,
  ): APIPromise<ObjectiveFeedback> {
    return this._client.post(path`/v1/objectives/${objectiveID}/feedback`, { body, ...options });
  }

  /**
   * Lists all feedback submitted for an objective
   */
  list(
    objectiveID: string,
    query: FeedbackListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ObjectiveFeedbacksCursorPagination, ObjectiveFeedback> {
    return this._client.getAPIList(
      path`/v1/objectives/${objectiveID}/feedback`,
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
   * BareMetadata contains the minimal metadata for a resource, including the ID.
   * These are used sparingly in Cadenya for resources where the full metadata is not
   * needed. You will come across them in list responses and other places where the
   * full metadata is not required like listing the tools that were assigned to an
   * objective. Because these types records are commonly created by other processes
   * in Cadenya, they do not have things like external IDs, labels, or names.
   */
  metadata: Shared.BareMetadata;

  info?: ObjectiveFeedbackInfo;
}

export interface ObjectiveFeedbackData {
  /**
   * Arbitrary key-value pairs to identify the source of the feedback. Since the
   * submitting profile is typically an API key, use this to pass through
   * application-specific identifiers (e.g., {"user_id": "usr_123", "session_id":
   * "abc"}).
   */
  attributes?: { [key: string]: string };

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
   * Profile represents a human user at the account level. Profiles are
   * account-scoped resources that can be associated with multiple workspaces through
   * the Actor model. Authentication for profiles is handled via SSO/OAuth (WorkOS).
   */
  submittedBy?: AccountAPI.Profile;
}

export interface FeedbackCreateParams {
  data: ObjectiveFeedbackData;
}

export interface FeedbackListParams extends CursorPaginationParams {}

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
