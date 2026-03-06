// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';
import * as VariationsAPI from './variations';
import {
  AgentVariation,
  AgentVariationSpec,
  AgentVariationSpecAgentDocument,
  AgentVariationSpecAgentTool,
  AgentVariationSpecConstraints,
  AgentVariationSpecModelConfig,
  AgentVariationSpecToolSelection,
  AgentVariationsCursorPagination,
  ToolSelectionAssignedTools,
  ToolSelectionAutoDiscovery,
  VariationCreateParams,
  VariationDeleteParams,
  VariationListParams,
  VariationRetrieveParams,
  VariationUpdateParams,
  Variations,
} from './variations';
import * as WebhookDeliveriesAPI from './webhook-deliveries';
import {
  WebhookDeliveries,
  WebhookDeliveriesCursorPagination,
  WebhookDelivery,
  WebhookDeliveryListParams,
} from './webhook-deliveries';
import { APIPromise } from '../../core/api-promise';
import { CursorPagination, type CursorPaginationParams, PagePromise } from '../../core/pagination';
import { buildHeaders } from '../../internal/headers';
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
export class Agents extends APIResource {
  variations: VariationsAPI.Variations = new VariationsAPI.Variations(this._client);
  webhookDeliveries: WebhookDeliveriesAPI.WebhookDeliveries = new WebhookDeliveriesAPI.WebhookDeliveries(
    this._client,
  );

  /**
   * Creates a new agent in the workspace
   */
  create(body: AgentCreateParams, options?: RequestOptions): APIPromise<Agent> {
    return this._client.post('/v1/agents', { body, ...options });
  }

  /**
   * Retrieves an agent by ID from the workspace
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<Agent> {
    return this._client.get(path`/v1/agents/${id}`, options);
  }

  /**
   * Updates an agent in the workspace
   */
  update(id: string, body: AgentUpdateParams, options?: RequestOptions): APIPromise<Agent> {
    return this._client.patch(path`/v1/agents/${id}`, { body, ...options });
  }

  /**
   * Lists all agents in the workspace
   */
  list(
    query: AgentListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<AgentsCursorPagination, Agent> {
    return this._client.getAPIList('/v1/agents', CursorPagination<Agent>, { query, ...options });
  }

  /**
   * Deletes an agent from the workspace
   */
  delete(id: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/agents/${id}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export type AgentsCursorPagination = CursorPagination<Agent>;

/**
 * Agent resource
 */
export interface Agent {
  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  metadata: Shared.ResourceMetadata;

  /**
   * Agent specification (user-provided configuration)
   */
  spec: AgentSpec;

  /**
   * AgentInfo contains simple information about an agent for display or quick
   * reference
   */
  info?: AgentInfo;
}

/**
 * AgentInfo contains simple information about an agent for display or quick
 * reference
 */
export interface AgentInfo {
  variationCount?: number;
}

/**
 * Agent specification (user-provided configuration)
 */
export interface AgentSpec {
  /**
   * Status of the agent
   */
  status:
    | 'AGENT_STATUS_UNSPECIFIED'
    | 'AGENT_STATUS_DRAFT'
    | 'AGENT_STATUS_PUBLISHED'
    | 'AGENT_STATUS_ARCHIVED';

  /**
   * Controls how variations are automatically selected when creating objectives
   * Defaults to RANDOM when unspecified
   */
  variationSelectionMode:
    | 'VARIATION_SELECTION_MODE_UNSPECIFIED'
    | 'VARIATION_SELECTION_MODE_RANDOM'
    | 'VARIATION_SELECTION_MODE_WEIGHTED';

  /**
   * Description of the agent's purpose
   */
  description?: string;

  /**
   * The generated secret that will sign all webhooks that are sent to your
   * configured Webhook URL. Formatted as "wh_asdf1234" per the
   * https://www.standardwebhooks.com/ format.
   */
  webhookEventsHmacSecret?: string;

  /**
   * The URL that Cadenya will send events for any objective assigned to the agent.
   */
  webhookEventsUrl?: string;
}

export interface Page {
  nextCursor?: string;

  total?: number;
}

export interface AgentCreateParams {
  /**
   * CreateResourceMetadata contains the user-provided fields for creating a
   * workspace-scoped resource. Read-only fields (id, account_id, workspace_id,
   * profile_id, created_at) are excluded since they are set by the server.
   */
  metadata: Shared.CreateResourceMetadata;

  /**
   * Agent specification (user-provided configuration)
   */
  spec: AgentSpec;

  /**
   * Create agent variation request
   */
  defaultVariation?: AgentCreateParams.DefaultVariation;
}

export namespace AgentCreateParams {
  /**
   * Create agent variation request
   */
  export interface DefaultVariation {
    /**
     * CreateResourceMetadata contains the user-provided fields for creating a
     * workspace-scoped resource. Read-only fields (id, account_id, workspace_id,
     * profile_id, created_at) are excluded since they are set by the server.
     */
    metadata: Shared.CreateResourceMetadata;

    /**
     * AgentVariationSpec defines the operational configuration for a variation
     */
    spec: VariationsAPI.AgentVariationSpec;
  }
}

export interface AgentUpdateParams {
  /**
   * UpdateResourceMetadata contains the user-provided fields for updating a
   * workspace-scoped resource. Read-only fields (id, account_id, workspace_id,
   * profile_id, created_at) are excluded since they are set by the server.
   */
  metadata?: Shared.UpdateResourceMetadata;

  /**
   * Agent specification (user-provided configuration)
   */
  spec?: AgentSpec;

  /**
   * Fields to update
   */
  updateMask?: string;
}

export interface AgentListParams extends CursorPaginationParams {
  /**
   * Filter expression (query param: prefix)
   */
  prefix?: string;

  /**
   * Sort order for results (asc or desc by creation time)
   */
  sortOrder?: string;
}

Agents.Variations = Variations;
Agents.WebhookDeliveries = WebhookDeliveries;

export declare namespace Agents {
  export {
    type Agent as Agent,
    type AgentInfo as AgentInfo,
    type AgentSpec as AgentSpec,
    type Page as Page,
    type AgentsCursorPagination as AgentsCursorPagination,
    type AgentCreateParams as AgentCreateParams,
    type AgentUpdateParams as AgentUpdateParams,
    type AgentListParams as AgentListParams,
  };

  export {
    Variations as Variations,
    type AgentVariation as AgentVariation,
    type AgentVariationSpec as AgentVariationSpec,
    type AgentVariationSpecAgentDocument as AgentVariationSpecAgentDocument,
    type AgentVariationSpecAgentTool as AgentVariationSpecAgentTool,
    type AgentVariationSpecConstraints as AgentVariationSpecConstraints,
    type AgentVariationSpecModelConfig as AgentVariationSpecModelConfig,
    type AgentVariationSpecToolSelection as AgentVariationSpecToolSelection,
    type ToolSelectionAssignedTools as ToolSelectionAssignedTools,
    type ToolSelectionAutoDiscovery as ToolSelectionAutoDiscovery,
    type AgentVariationsCursorPagination as AgentVariationsCursorPagination,
    type VariationCreateParams as VariationCreateParams,
    type VariationRetrieveParams as VariationRetrieveParams,
    type VariationUpdateParams as VariationUpdateParams,
    type VariationListParams as VariationListParams,
    type VariationDeleteParams as VariationDeleteParams,
  };

  export {
    WebhookDeliveries as WebhookDeliveries,
    type WebhookDelivery as WebhookDelivery,
    type WebhookDeliveriesCursorPagination as WebhookDeliveriesCursorPagination,
    type WebhookDeliveryListParams as WebhookDeliveryListParams,
  };
}
