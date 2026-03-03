// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';
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
export class WebhookDeliveries extends APIResource {
  /**
   * Lists all webhook deliveries for an agent
   */
  list(
    agentID: string,
    query: WebhookDeliveryListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<WebhookDeliveriesCursorPagination, WebhookDelivery> {
    return this._client.getAPIList(
      path`/v1/agents/${agentID}/webhook_deliveries`,
      CursorPagination<WebhookDelivery>,
      { query, ...options },
    );
  }
}

export type WebhookDeliveriesCursorPagination = CursorPagination<WebhookDelivery>;

export interface WebhookDelivery {
  /**
   * Webhook delivery data
   */
  data?: WebhookDelivery.Data;

  /**
   * Metadata for ephemeral operations and activities (e.g., objectives, executions,
   * runs)
   */
  metadata?: Shared.OperationMetadata;
}

export namespace WebhookDelivery {
  /**
   * Webhook delivery data
   */
  export interface Data {
    /**
     * Related resources
     */
    agentId?: string;

    attemptCount?: number;

    errorMessage?: string;

    /**
     * Response details (no response_body to avoid storing large payloads)
     */
    httpStatusCode?: number;

    lastAttemptAt?: string;

    latencyMs?: number;

    objectiveEventId?: string;

    objectiveId?: string;

    status?:
      | 'WEBHOOK_DELIVERY_STATUS_UNSPECIFIED'
      | 'WEBHOOK_DELIVERY_STATUS_PENDING'
      | 'WEBHOOK_DELIVERY_STATUS_COMPLETED'
      | 'WEBHOOK_DELIVERY_STATUS_FAILED'
      | 'WEBHOOK_DELIVERY_STATUS_DISABLED';

    webhookId?: string;

    /**
     * Webhook delivery details
     */
    webhookUrl?: string;
  }
}

export interface WebhookDeliveryListParams extends CursorPaginationParams {}

export declare namespace WebhookDeliveries {
  export {
    type WebhookDelivery as WebhookDelivery,
    type WebhookDeliveriesCursorPagination as WebhookDeliveriesCursorPagination,
    type WebhookDeliveryListParams as WebhookDeliveryListParams,
  };
}
