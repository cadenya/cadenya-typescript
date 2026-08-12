import { APIResource } from '../core/resource';
import * as AIProviderKeysAPI from './ai-provider-keys';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { CursorPagination, type CursorPaginationParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Manage LLM models available to a workspace. Models represent provider and
 *  family pairs (e.g., "anthropic/claude-sonnet-4.6"). Workspaces are seeded
 *  with the supported models and you can enable or disable each one.
 */
export class Models extends APIResource {
  /**
   * Retrieves a model by ID from the workspace
   */
  retrieve(
    id: string,
    params: ModelRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<Model> {
    const { workspaceId = this._client.workspaceID } = params ?? {};
    return this._client.get(path`/v1/workspaces/${workspaceId}/models/${id}`, options);
  }

  /**
   * Lists all models in the workspace
   */
  list(
    params: ModelListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ModelsCursorPagination, Model> {
    const { workspaceId = this._client.workspaceID, ...query } = params ?? {};
    return this._client.getAPIList(path`/v1/workspaces/${workspaceId}/models`, CursorPagination<Model>, {
      query,
      ...options,
    });
  }

  /**
   * Transitions a model to STATE_DISABLED. Fails while agent variations are still
   * provisioned on the model; use :swapModelOnVariations to move them first.
   */
  disable(id: string, params: ModelDisableParams, options?: RequestOptions): APIPromise<Model> {
    const { workspaceId = this._client.workspaceID, ...body } = params;
    return this._client.post(path`/v1/workspaces/${workspaceId}/models/${id}:disable`, { body, ...options });
  }

  /**
   * Transitions a model to STATE_ENABLED, making it available for agent variations
   * in the workspace
   */
  enable(id: string, params: ModelEnableParams, options?: RequestOptions): APIPromise<Model> {
    const { workspaceId = this._client.workspaceID, ...body } = params;
    return this._client.post(path`/v1/workspaces/${workspaceId}/models/${id}:enable`, { body, ...options });
  }

  /**
   * Reassigns agent variations from one model to another in bulk. Runs
   * asynchronously and returns immediately.
   */
  swap(params: ModelSwapParams | null | undefined = {}, options?: RequestOptions): APIPromise<unknown> {
    const { workspaceId = this._client.workspaceID, ...body } = params ?? {};
    return this._client.post(path`/v1/workspaces/${workspaceId}/models:swapModelOnVariations`, {
      body,
      ...options,
    });
  }
}

export type ModelsCursorPagination = CursorPagination<Model>;

/**
 * Prompt/token caching (ModelConfig.caching_enabled). A model that cannot cache
 * prompt prefixes simply omits this capability. When the capability is present,
 * caching defaults to ON — a variation opts out by setting caching_enabled to
 * false.
 */
export type CapabilityCaching = unknown;

/**
 * Per-request output token cap (ModelConfig.max_output_tokens). The effective
 * ceiling is ModelSpec.max_output_tokens.
 */
export type CapabilityMaxOutputTokens = unknown;

/**
 * Reasoning / extended thinking (ModelConfig.reasoning_effort). A model that does
 * not reason simply omits this capability.
 */
export interface CapabilityReasoning {
  /**
   * How reasoning is enabled for this model. Catalog data used to decide whether
   * thinking is requested for objective iterations on this model.
   */
  mode?: 'MODE_UNSPECIFIED' | 'MODE_ADAPTIVE' | 'MODE_BUDGET';
}

/**
 * Custom stop sequences (ModelConfig.stop_sequences).
 */
export interface CapabilityStopSequences {
  /**
   * Maximum number of stop sequences the model accepts per request. 0 means the
   * provider imposes no meaningful limit.
   */
  limit?: number;
}

/**
 * Sampling temperature (ModelConfig.temperature).
 */
export type CapabilityTemperature = unknown;

/**
 * Top-k sampling (ModelConfig.top_k).
 */
export type CapabilityTopK = unknown;

/**
 * Nucleus sampling (ModelConfig.top_p).
 */
export type CapabilityTopP = unknown;

export interface Model {
  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  metadata: Shared.ResourceMetadata;

  /**
   * Model specification
   */
  spec: ModelSpec;

  /**
   * Whether the model is usable in this workspace. Output only. Use the :enable and
   * :disable actions to transition.
   */
  state: 'STATE_UNSPECIFIED' | 'STATE_ENABLED' | 'STATE_DISABLED';

  /**
   * ModelInfo carries server-derived, read-only details about a model.
   */
  info?: Model.Info;
}

export namespace Model {
  /**
   * ModelInfo carries server-derived, read-only details about a model.
   */
  export interface Info {
    /**
     * Number of agent variations currently provisioned on this model. Useful for
     * previewing how many variations a swap would affect.
     */
    agentVariationCount?: number;

    /**
     * AIProviderKey is a credential for an AI provider, scoped to a workspace. Most
     * keys are customer-provided (BYOK); Cadenya also provisions promotional keys (see
     * AIProviderKeyInfo.is_promotional), which cannot be modified or deleted by
     * account administrators. The secret value is never returned in responses.
     */
    aiProviderKey?: AIProviderKeysAPI.AIProviderKey;

    /**
     * Represents the last time this model was used in an agent objective
     */
    lastUsedAt?: string;
  }
}

export interface ModelSpec {
  /**
   * The model family (e.g., "claude-sonnet-4.6", "gpt-5.4", "gemini-2.5-flash")
   */
  family: string;

  /**
   * The model provider (e.g., "anthropic", "openai", "google")
   */
  provider: string;

  /**
   * The inference knobs this model supports. Catalog data; drives which ModelConfig
   * fields a variation on this model may set. Reasoning support (and its mode) lives
   * here too, as the "reasoning" capability.
   */
  capabilities?: Array<ModelSpecCapability>;

  /**
   * Cost per million input tokens in cents (e.g., 300 = $3.00)
   */
  inputPricePerMillionTokens?: string;

  /**
   * Maximum number of input tokens the model supports
   */
  maxInputTokens?: number;

  /**
   * Maximum number of output tokens the model can generate
   */
  maxOutputTokens?: number;

  /**
   * Cost per million output tokens in cents (e.g., 1500 = $15.00)
   */
  outputPricePerMillionTokens?: string;
}

/**
 * Capability describes one inference knob this model supports, with any
 * model-specific parameters for it. A variation's ModelConfig may only set a knob
 * whose capability is listed on the model's spec.
 */
export type ModelSpecCapability =
  | ModelSpecCapabilityTemperature
  | ModelSpecCapabilityTopP
  | ModelSpecCapabilityTopK
  | ModelSpecCapabilityStopSequences
  | ModelSpecCapabilityMaxOutputTokens
  | ModelSpecCapabilityReasoning
  | ModelSpecCapabilityCaching;

export interface ModelSpecCapabilityCaching {
  /**
   * Prompt/token caching (ModelConfig.caching_enabled). A model that cannot cache
   * prompt prefixes simply omits this capability. When the capability is present,
   * caching defaults to ON — a variation opts out by setting caching_enabled to
   * false.
   */
  caching: CapabilityCaching;

  type: 'caching';
}

export interface ModelSpecCapabilityMaxOutputTokens {
  /**
   * Per-request output token cap (ModelConfig.max_output_tokens). The effective
   * ceiling is ModelSpec.max_output_tokens.
   */
  maxOutputTokens: CapabilityMaxOutputTokens;

  type: 'maxOutputTokens';
}

export interface ModelSpecCapabilityReasoning {
  /**
   * Reasoning / extended thinking (ModelConfig.reasoning_effort). A model that does
   * not reason simply omits this capability.
   */
  reasoning: CapabilityReasoning;

  type: 'reasoning';
}

export interface ModelSpecCapabilityStopSequences {
  /**
   * Custom stop sequences (ModelConfig.stop_sequences).
   */
  stopSequences: CapabilityStopSequences;

  type: 'stopSequences';
}

export interface ModelSpecCapabilityTemperature {
  /**
   * Sampling temperature (ModelConfig.temperature).
   */
  temperature: CapabilityTemperature;

  type: 'temperature';
}

export interface ModelSpecCapabilityTopK {
  /**
   * Top-k sampling (ModelConfig.top_k).
   */
  topK: CapabilityTopK;

  type: 'topK';
}

export interface ModelSpecCapabilityTopP {
  /**
   * Nucleus sampling (ModelConfig.top_p).
   */
  topP: CapabilityTopP;

  type: 'topP';
}

/**
 * Swap model on variations response. Empty: the work runs asynchronously, so no
 * counts are returned (a large data set would make the call slow).
 */
export type ModelSwapResponse = unknown;

export interface ModelRetrieveParams {
  /**
   * Workspace ID.
   */
  workspaceId?: string;
}

export interface ModelListParams extends CursorPaginationParams {
  /**
   * Path param: Workspace ID.
   */
  workspaceId?: string;

  /**
   * Query param: Filter to models provisioned on a specific AI provider key. Accepts
   * the key's id or an "external_id:"-prefixed slug.
   */
  aiProviderKeyId?: string;

  /**
   * Query param: When true, populate each item's info (e.g. the AI provider), at the
   * cost of extra lookups.
   */
  includeInfo?: boolean;

  /**
   * Query param: Filter models to only ones assigned to an active agent
   * variation/agent. Draft agents count as assigned; archived agents do not.
   * Assignment does not imply recent traffic — see ModelInfo.last_used_at for that.
   */
  isAssigned?: boolean;

  /**
   * Query param: Filters by metadata labels. Comma-separated key=value pairs, e.g.
   * "env=prod,team=ai". A resource matches only if every pair matches exactly (AND
   * semantics).
   */
  labels?: string;

  /**
   * Query param: Filter by a prefix of the model's display name, external id, or id
   * (case-insensitive). A model's external id is the form used in
   * modelConfig.modelId, so a caller holding that can narrow the list by it.
   */
  prefix?: string;

  /**
   * Query param: Free-form search query
   */
  query?: string;

  /**
   * Query param: Sort order for results (asc or desc by creation time)
   */
  sortOrder?: string;

  /**
   * Query param: Filter by model state
   */
  state?: 'STATE_UNSPECIFIED' | 'STATE_ENABLED' | 'STATE_DISABLED';
}

export interface ModelDisableParams {
  /**
   * Workspace ID.
   */
  workspaceId?: string;
}

export interface ModelEnableParams {
  /**
   * Workspace ID.
   */
  workspaceId?: string;
}

export interface ModelSwapParams {
  /**
   * Path param: Workspace ID.
   */
  workspaceId?: string;

  /**
   * Body param: The swaps to perform.
   */
  modelSwaps?: Array<ModelSwapParams.ModelSwap>;
}

export namespace ModelSwapParams {
  export interface ModelSwap {
    /**
     * The model variations are currently on. Accepts an id or "external_id:" slug.
     */
    currentModelId?: string;

    /**
     * Whether to disable the current model after the swap.
     */
    disableCurrentAfterSwap?: boolean;

    /**
     * The model to move variations to. Accepts an id or "external_id:" slug.
     */
    nextModelId?: string;
  }
}

export declare namespace Models {
  export {
    type CapabilityCaching as CapabilityCaching,
    type CapabilityMaxOutputTokens as CapabilityMaxOutputTokens,
    type CapabilityReasoning as CapabilityReasoning,
    type CapabilityStopSequences as CapabilityStopSequences,
    type CapabilityTemperature as CapabilityTemperature,
    type CapabilityTopK as CapabilityTopK,
    type CapabilityTopP as CapabilityTopP,
    type Model as Model,
    type ModelSpec as ModelSpec,
    type ModelSpecCapability as ModelSpecCapability,
    type ModelSpecCapabilityCaching as ModelSpecCapabilityCaching,
    type ModelSpecCapabilityMaxOutputTokens as ModelSpecCapabilityMaxOutputTokens,
    type ModelSpecCapabilityReasoning as ModelSpecCapabilityReasoning,
    type ModelSpecCapabilityStopSequences as ModelSpecCapabilityStopSequences,
    type ModelSpecCapabilityTemperature as ModelSpecCapabilityTemperature,
    type ModelSpecCapabilityTopK as ModelSpecCapabilityTopK,
    type ModelSpecCapabilityTopP as ModelSpecCapabilityTopP,
    type ModelSwapResponse as ModelSwapResponse,
    type ModelsCursorPagination as ModelsCursorPagination,
    type ModelRetrieveParams as ModelRetrieveParams,
    type ModelListParams as ModelListParams,
    type ModelDisableParams as ModelDisableParams,
    type ModelEnableParams as ModelEnableParams,
    type ModelSwapParams as ModelSwapParams,
  };
}
