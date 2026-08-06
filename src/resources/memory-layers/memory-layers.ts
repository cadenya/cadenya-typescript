// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as AccountAPI from '../account';
import * as Shared from '../shared';
import * as EntriesAPI from './entries';
import {
  Entries,
  EntryCreateParams,
  EntryDeleteParams,
  EntryListParams,
  EntryRetrieveParams,
  EntryUpdateParams,
  MemoryEntriesCursorPagination,
  MemoryEntry,
  MemoryEntryCreateSpec,
  MemoryEntryCreateSpecContent,
  MemoryEntryCreateSpecUploadID,
  MemoryEntryDetail,
  MemoryEntryInfo,
  MemoryEntrySpec,
  MemoryEntryUpdateSpec,
} from './entries';
import { APIPromise } from '../../core/api-promise';
import { CursorPagination, type CursorPaginationParams, PagePromise } from '../../core/pagination';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Manage memory layers and their entries. Layers are named containers that can
 *  be composed into an objective's memory cascade; entries are the keyed values
 *  within a layer. System-managed layers (e.g., episodic layers created by the
 *  runtime) cannot be mutated through this API.
 */
export class MemoryLayers extends APIResource {
  entries: EntriesAPI.Entries = new EntriesAPI.Entries(this._client);

  /**
   * Creates a new memory layer in the workspace
   */
  create(params: MemoryLayerCreateParams, options?: RequestOptions): APIPromise<MemoryLayer> {
    const { workspaceId = this._client.workspaceID, ...body } = params;
    return this._client.post(path`/v1/workspaces/${workspaceId}/memory_layers`, { body, ...options });
  }

  /**
   * Retrieves a memory layer by ID from the workspace
   */
  retrieve(
    id: string,
    params: MemoryLayerRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<MemoryLayer> {
    const { workspaceId = this._client.workspaceID } = params ?? {};
    return this._client.get(path`/v1/workspaces/${workspaceId}/memory_layers/${id}`, options);
  }

  /**
   * Updates a memory layer in the workspace
   */
  update(id: string, params: MemoryLayerUpdateParams, options?: RequestOptions): APIPromise<MemoryLayer> {
    const { workspaceId = this._client.workspaceID, ...body } = params;
    return this._client.patch(path`/v1/workspaces/${workspaceId}/memory_layers/${id}`, { body, ...options });
  }

  /**
   * Lists all memory layers in the workspace
   */
  list(
    params: MemoryLayerListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<MemoryLayersCursorPagination, MemoryLayer> {
    const { workspaceId = this._client.workspaceID, ...query } = params ?? {};
    return this._client.getAPIList(
      path`/v1/workspaces/${workspaceId}/memory_layers`,
      CursorPagination<MemoryLayer>,
      { query, ...options },
    );
  }

  /**
   * Deletes a memory layer from the workspace
   */
  delete(
    id: string,
    params: MemoryLayerDeleteParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<void> {
    const { workspaceId = this._client.workspaceID } = params ?? {};
    return this._client.delete(path`/v1/workspaces/${workspaceId}/memory_layers/${id}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export type MemoryLayersCursorPagination = CursorPagination<MemoryLayer>;

/**
 * MemoryLayer is a named container of memory entries that can be composed into an
 * objective's memory cascade. Layers are workspace-scoped resources. The layer
 * type controls how its entries participate in the agent loop — see
 * MemoryLayerType for details.
 *
 * See "Memory cascade composition" above for how layers compose at lookup time.
 */
export interface MemoryLayer {
  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  metadata: Shared.ResourceMetadata;

  spec: MemoryLayerSpec;

  info?: MemoryLayerInfo;
}

export interface MemoryLayerInfo {
  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  agent?: Shared.ResourceMetadata;

  /**
   * A profile identifies a user or non-human principal (such as an API key) at the
   * account level. Profiles are account-scoped and can be granted access to multiple
   * workspaces.
   */
  createdBy?: AccountAPI.Profile;

  /**
   * Number of entries currently in this layer.
   */
  entryCount?: number;

  /**
   * Timestamp of the most recent objective that resolved against this layer. Useful
   * for surfacing unused layers in the dashboard.
   */
  lastUsedAt?: string;
}

export interface MemoryLayerSpec {
  type: 'MEMORY_LAYER_TYPE_UNSPECIFIED' | 'MEMORY_LAYER_TYPE_EPISODIC' | 'MEMORY_LAYER_TYPE_SKILLS';

  /**
   * Server-set on episodic layers: the agent this layer belongs to. Unset for
   * non-episodic layers.
   */
  agentId?: string;

  /**
   * Human-readable description of the layer's purpose. Encouraged for user-created
   * layers; system-managed layers may have a generated description.
   */
  description?: string;

  /**
   * Server-set on episodic layers: the caller-supplied episodic key the layer was
   * created for. Unset for non-episodic layers.
   */
  episodicKey?: string;

  /**
   * For layers with a finite lifetime (e.g., episodic), the time at which the layer
   * becomes eligible for cleanup. Set by the system; unset for persistent layers.
   */
  expiresAt?: string;

  /**
   * Server-set. True for layers managed by the system (e.g., episodic layers created
   * automatically when an objective uses an episodic_key). System-managed layers
   * cannot be assigned to objective cascades via the API and cannot be mutated by
   * clients — their lifecycle is controlled entirely by the runtime.
   */
  systemManaged?: boolean;
}

export interface MemoryLayerCreateParams {
  /**
   * Path param
   */
  workspaceId?: string;

  /**
   * Body param: CreateResourceMetadata contains the user-provided fields for
   * creating a workspace-scoped resource. Read-only fields (id, account_id,
   * workspace_id, profile_id, created_at) are excluded since they are set by the
   * server.
   */
  metadata: Shared.CreateResourceMetadata;

  /**
   * Body param
   */
  spec: MemoryLayerSpec;
}

export interface MemoryLayerRetrieveParams {
  workspaceId?: string;
}

export interface MemoryLayerUpdateParams {
  /**
   * Path param
   */
  workspaceId?: string;

  /**
   * Body param: UpdateResourceMetadata contains the user-provided fields for
   * updating a workspace-scoped resource. Read-only fields (id, account_id,
   * workspace_id, profile_id, created_at) are excluded since they are set by the
   * server.
   */
  metadata?: Shared.UpdateResourceMetadata;

  /**
   * Body param
   */
  spec?: MemoryLayerSpec;

  /**
   * Body param
   */
  updateMask?: string;
}

export interface MemoryLayerListParams extends CursorPaginationParams {
  /**
   * Path param
   */
  workspaceId?: string;

  /**
   * Query param: Filter to episodic layers belonging to this agent.
   */
  agentId?: string;

  /**
   * Query param: Filter to episodic layers whose episodic key starts with this
   * prefix (e.g. "customer/" matches "customer/42" and "customer/43"). Useful for
   * namespaced keys, similar to a redis key scan.
   */
  episodicKeyPrefix?: string;

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
   * Query param: Filter expression (query param: prefix)
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
   * Query param: Filter by layer type
   */
  type?: 'MEMORY_LAYER_TYPE_UNSPECIFIED' | 'MEMORY_LAYER_TYPE_EPISODIC' | 'MEMORY_LAYER_TYPE_SKILLS';
}

export interface MemoryLayerDeleteParams {
  workspaceId?: string;
}

MemoryLayers.Entries = Entries;

export declare namespace MemoryLayers {
  export {
    type MemoryLayer as MemoryLayer,
    type MemoryLayerInfo as MemoryLayerInfo,
    type MemoryLayerSpec as MemoryLayerSpec,
    type MemoryLayersCursorPagination as MemoryLayersCursorPagination,
    type MemoryLayerCreateParams as MemoryLayerCreateParams,
    type MemoryLayerRetrieveParams as MemoryLayerRetrieveParams,
    type MemoryLayerUpdateParams as MemoryLayerUpdateParams,
    type MemoryLayerListParams as MemoryLayerListParams,
    type MemoryLayerDeleteParams as MemoryLayerDeleteParams,
  };

  export {
    Entries as Entries,
    type MemoryEntry as MemoryEntry,
    type MemoryEntryCreateSpec as MemoryEntryCreateSpec,
    type MemoryEntryCreateSpecContent as MemoryEntryCreateSpecContent,
    type MemoryEntryCreateSpecUploadID as MemoryEntryCreateSpecUploadID,
    type MemoryEntryDetail as MemoryEntryDetail,
    type MemoryEntryInfo as MemoryEntryInfo,
    type MemoryEntrySpec as MemoryEntrySpec,
    type MemoryEntryUpdateSpec as MemoryEntryUpdateSpec,
    type MemoryEntriesCursorPagination as MemoryEntriesCursorPagination,
    type EntryCreateParams as EntryCreateParams,
    type EntryRetrieveParams as EntryRetrieveParams,
    type EntryUpdateParams as EntryUpdateParams,
    type EntryListParams as EntryListParams,
    type EntryDeleteParams as EntryDeleteParams,
  };
}
