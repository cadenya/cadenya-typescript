// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as Shared from './shared';
import * as ObjectivesAPI from './objectives/objectives';
import { Webhook } from 'standardwebhooks';

export class Webhooks extends APIResource {
  unsafeUnwrap(body: string): UnsafeUnwrapWebhookEvent {
    return JSON.parse(body) as UnsafeUnwrapWebhookEvent;
  }

  unwrap(
    body: string,
    { headers, key }: { headers: Record<string, string>; key?: string },
  ): UnwrapWebhookEvent {
    if (headers !== undefined) {
      const keyStr: string | null = key === undefined ? this._client.webhookKey : key;
      if (keyStr === null) throw new Error('Webhook key must not be null in order to unwrap');
      const wh = new Webhook(keyStr);
      wh.verify(body, headers);
    }
    return JSON.parse(body) as UnwrapWebhookEvent;
  }
}

/**
 * The envelope for an objective event webhook delivery. Contains timestamp, event
 * type, and the webhook data payload.
 */
export interface UnsafeUnwrapWebhookEvent {
  /**
   * The webhook data payload with flat top-level keys for agent, variation,
   * objective, and event.
   */
  data: UnsafeUnwrapWebhookEvent.Data;

  timestamp: string;

  /**
   * The event type, prefixed with objective_event. (e.g.,
   * objective_event.tool_result)
   */
  type: string;
}

export namespace UnsafeUnwrapWebhookEvent {
  /**
   * The webhook data payload with flat top-level keys for agent, variation,
   * objective, and event.
   */
  export interface Data {
    /**
     * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
     */
    agent: Shared.ResourceMetadata;

    /**
     * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
     */
    agentVariation: Shared.ResourceMetadata;

    /**
     * Metadata for ephemeral operations and activities (e.g., objectives, executions,
     * runs)
     */
    objective: Shared.OperationMetadata;

    objectiveEvent: Data.ObjectiveEvent;
  }

  export namespace Data {
    export interface ObjectiveEvent {
      data: ObjectivesAPI.ObjectiveEventData;

      /**
       * Metadata for ephemeral operations and activities (e.g., objectives, executions,
       * runs)
       */
      metadata: Shared.OperationMetadata;

      contextWindowId?: string;

      info?: ObjectivesAPI.ObjectiveEventInfo;
    }
  }
}

/**
 * The envelope for an objective event webhook delivery. Contains timestamp, event
 * type, and the webhook data payload.
 */
export interface UnwrapWebhookEvent {
  /**
   * The webhook data payload with flat top-level keys for agent, variation,
   * objective, and event.
   */
  data: UnwrapWebhookEvent.Data;

  timestamp: string;

  /**
   * The event type, prefixed with objective_event. (e.g.,
   * objective_event.tool_result)
   */
  type: string;
}

export namespace UnwrapWebhookEvent {
  /**
   * The webhook data payload with flat top-level keys for agent, variation,
   * objective, and event.
   */
  export interface Data {
    /**
     * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
     */
    agent: Shared.ResourceMetadata;

    /**
     * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
     */
    agentVariation: Shared.ResourceMetadata;

    /**
     * Metadata for ephemeral operations and activities (e.g., objectives, executions,
     * runs)
     */
    objective: Shared.OperationMetadata;

    objectiveEvent: Data.ObjectiveEvent;
  }

  export namespace Data {
    export interface ObjectiveEvent {
      data: ObjectivesAPI.ObjectiveEventData;

      /**
       * Metadata for ephemeral operations and activities (e.g., objectives, executions,
       * runs)
       */
      metadata: Shared.OperationMetadata;

      contextWindowId?: string;

      info?: ObjectivesAPI.ObjectiveEventInfo;
    }
  }
}

export declare namespace Webhooks {
  export {
    type UnsafeUnwrapWebhookEvent as UnsafeUnwrapWebhookEvent,
    type UnwrapWebhookEvent as UnwrapWebhookEvent,
  };
}
