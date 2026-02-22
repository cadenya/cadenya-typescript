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
  metadata?: Shared.ResourceMetadata;

  /**
   * Agent specification (user-provided configuration)
   */
  spec?: AgentSpec;
}

/**
 * Agent specification (user-provided configuration)
 */
export interface AgentSpec {
  /**
   * Description of the agent's purpose
   */
  description?: string;

  /**
   * Status of the agent
   */
  status?:
    | 'AGENT_STATUS_UNSPECIFIED'
    | 'AGENT_STATUS_DRAFT'
    | 'AGENT_STATUS_PUBLISHED'
    | 'AGENT_STATUS_ARCHIVED';

  /**
   * Controls how variations are selected when creating objectives Defaults to
   * WEIGHTED when unspecified
   */
  variationSelectionMode?:
    | 'VARIATION_SELECTION_MODE_UNSPECIFIED'
    | 'VARIATION_SELECTION_MODE_WEIGHTED'
    | 'VARIATION_SELECTION_MODE_EXPLICIT';

  /**
   * The URL that Cadenya will send events for any objective assigned to the agent.
   */
  webhookEventsUrl?: string;

  webhookEventsUrlSecret?: string;
}

export interface Page {
  nextCursor?: string;

  total?: number;
}

export interface AgentCreateParams {
  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  metadata?: Shared.ResourceMetadata;

  /**
   * Agent specification (user-provided configuration)
   */
  spec?: AgentSpec;
}

export interface AgentUpdateParams {
  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  metadata?: Shared.ResourceMetadata;

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
