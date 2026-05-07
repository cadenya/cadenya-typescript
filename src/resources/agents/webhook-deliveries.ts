// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';
import { CursorPagination, type CursorPaginationParams, PagePromise } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Manage AI agents within a workspace. Agents define AI behavior and tool access.
 */
export class WebhookDeliveries extends APIResource {
  /**
   * Lists all webhook deliveries for an agent
   */
  list(
    agentID: string,
    params: WebhookDeliveryListParams,
    options?: RequestOptions,
  ): PagePromise<WebhookDeliveriesCursorPagination, WebhookDelivery> {
    const { workspaceId, ...query } = params;
    return this._client.getAPIList(
      path`/v1/workspaces/${workspaceId}/agents/${agentID}/webhook_deliveries`,
      CursorPagination<WebhookDelivery>,
      { query, ...options },
    );
  }
}

export type WebhookDeliveriesCursorPagination = CursorPagination<WebhookDelivery>;

export interface WebhookDelivery {
  /**
   * Webhook delivery details.
   */
  data: WebhookDeliveryData;

  /**
   * Metadata for ephemeral operations and activities (e.g., objectives, executions,
   * runs)
   */
  metadata: Shared.OperationMetadata;
}

export interface WebhookDeliveryData {
  /**
   * Related resources
   */
  agentId: string;

  attemptCount: number;

  /**
   * The type of objective event that triggered this webhook delivery
   */
  eventType:
    | 'OBJECTIVE_EVENT_TYPE_UNSPECIFIED'
    | 'OBJECTIVE_EVENT_TYPE_USER_MESSAGE'
    | 'OBJECTIVE_EVENT_TYPE_TOOL_APPROVAL_REQUESTED'
    | 'OBJECTIVE_EVENT_TYPE_TOOL_APPROVED'
    | 'OBJECTIVE_EVENT_TYPE_TOOL_DENIED'
    | 'OBJECTIVE_EVENT_TYPE_TOOL_CALLED'
    | 'OBJECTIVE_EVENT_TYPE_ERROR'
    | 'OBJECTIVE_EVENT_TYPE_ASSISTANT_MESSAGE'
    | 'OBJECTIVE_EVENT_TYPE_TOOL_RESULT'
    | 'OBJECTIVE_EVENT_TYPE_TOOL_ERROR'
    | 'OBJECTIVE_EVENT_TYPE_CONTEXT_WINDOW_COMPACTED'
    | 'OBJECTIVE_EVENT_TYPE_MEMORY_READ'
    | 'OBJECTIVE_EVENT_TYPE_CANCELLED'
    | 'OBJECTIVE_EVENT_TYPE_SUB_AGENT_SPAWNED'
    | 'OBJECTIVE_EVENT_TYPE_SUB_AGENT_UPDATED';

  /**
   * Response details. The response body is not retained.
   */
  httpStatusCode: number;

  lastAttemptAt: string;

  latencyMs: number;

  objectiveEventId: string;

  objectiveId: string;

  /**
   * Content length of the response body in bytes
   */
  responseContentLength: string;

  status:
    | 'WEBHOOK_DELIVERY_STATUS_UNSPECIFIED'
    | 'WEBHOOK_DELIVERY_STATUS_PENDING'
    | 'WEBHOOK_DELIVERY_STATUS_COMPLETED'
    | 'WEBHOOK_DELIVERY_STATUS_FAILED'
    | 'WEBHOOK_DELIVERY_STATUS_DISABLED';

  webhookId: string;

  /**
   * Webhook delivery details
   */
  webhookUrl: string;

  errorMessage?: string;

  /**
   * Response headers received from the webhook endpoint
   */
  responseHeaders?: { [key: string]: string };
}

export interface WebhookDeliveryListParams extends CursorPaginationParams {
  /**
   * Path param: Workspace ID.
   */
  workspaceId: string;

  /**
   * Query param: Optional filter by event type
   */
  eventType?:
    | 'OBJECTIVE_EVENT_TYPE_UNSPECIFIED'
    | 'OBJECTIVE_EVENT_TYPE_USER_MESSAGE'
    | 'OBJECTIVE_EVENT_TYPE_TOOL_APPROVAL_REQUESTED'
    | 'OBJECTIVE_EVENT_TYPE_TOOL_APPROVED'
    | 'OBJECTIVE_EVENT_TYPE_TOOL_DENIED'
    | 'OBJECTIVE_EVENT_TYPE_TOOL_CALLED'
    | 'OBJECTIVE_EVENT_TYPE_ERROR'
    | 'OBJECTIVE_EVENT_TYPE_ASSISTANT_MESSAGE'
    | 'OBJECTIVE_EVENT_TYPE_TOOL_RESULT'
    | 'OBJECTIVE_EVENT_TYPE_TOOL_ERROR'
    | 'OBJECTIVE_EVENT_TYPE_CONTEXT_WINDOW_COMPACTED'
    | 'OBJECTIVE_EVENT_TYPE_MEMORY_READ'
    | 'OBJECTIVE_EVENT_TYPE_CANCELLED'
    | 'OBJECTIVE_EVENT_TYPE_SUB_AGENT_SPAWNED'
    | 'OBJECTIVE_EVENT_TYPE_SUB_AGENT_UPDATED';

  /**
   * Query param: Optional filter by objective ID
   */
  objectiveId?: string;
}

export declare namespace WebhookDeliveries {
  export {
    type WebhookDelivery as WebhookDelivery,
    type WebhookDeliveryData as WebhookDeliveryData,
    type WebhookDeliveriesCursorPagination as WebhookDeliveriesCursorPagination,
    type WebhookDeliveryListParams as WebhookDeliveryListParams,
  };
}
