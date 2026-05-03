// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as AccountAPI from '../account';
import * as Shared from '../shared';
import * as AgentsAPI from '../agents/agents';
import * as SchedulesAPI from '../agents/schedules';
import * as VariationsAPI from '../agents/variations';
import * as ResultsAPI from './results';
import {
  BulkWorkspaceApplyResult,
  BulkWorkspaceApplyResultData,
  BulkWorkspaceApplyResultDataAgentOutcome,
  BulkWorkspaceApplyResultDataAgentScheduleOutcome,
  BulkWorkspaceApplyResultDataAgentVariationOutcome,
  BulkWorkspaceApplyResultDataMemoryEntryOutcome,
  BulkWorkspaceApplyResultDataMemoryLayerOutcome,
  BulkWorkspaceApplyResultDataToolOutcome,
  BulkWorkspaceApplyResultDataToolSetOutcome,
  BulkWorkspaceApplyResultDataVariationAssignmentOutcome,
  BulkWorkspaceApplyResultDataVariationMemoryLayerOutcome,
  BulkWorkspaceApplyResultsCursorPagination,
  ResultListParams,
  Results,
} from './results';
import * as MemoryLayersAPI from '../memory-layers/memory-layers';
import * as ToolSetsAPI from '../tool-sets/tool-sets';
import * as ToolsAPI from '../tool-sets/tools';
import { APIPromise } from '../../core/api-promise';
import { CursorPagination, type CursorPaginationParams, PagePromise } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * BulkWorkspaceResources is the workspace-scoped service that applies
 *  a declarative bundle of workspace resources (tool sets, memory
 *  layers, agents, variations, assignments, schedules) in one async
 *  operation. See docs/superpowers/specs/2026-05-02-bulk-workspace-resources-design.md
 *  for the full design.
 *
 *  Authentication: Bearer token (JWT)
 *  Scope: Workspace-level operations
 */
export class BulkWorkspaceResources extends APIResource {
  results: ResultsAPI.Results = new ResultsAPI.Results(this._client);

  /**
   * Retrieves a bulk workspace apply operation by ID.
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<BulkWorkspaceApply> {
    return this._client.get(path`/v1/bulk_workspace_applies/${id}`, options);
  }

  /**
   * Lists past and in-flight bulk workspace apply operations in the workspace.
   */
  list(
    query: BulkWorkspaceResourceListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<BulkWorkspaceAppliesCursorPagination, BulkWorkspaceApply> {
    return this._client.getAPIList('/v1/bulk_workspace_applies', CursorPagination<BulkWorkspaceApply>, {
      query,
      ...options,
    });
  }

  /**
   * Asynchronously applies a declarative bundle of workspace resources. Returns the
   * operation immediately in PENDING; clients poll Get to track progress.
   */
  apply(body: BulkWorkspaceResourceApplyParams, options?: RequestOptions): APIPromise<BulkWorkspaceApply> {
    return this._client.post('/v1/bulk_workspace_applies', { body, ...options });
  }
}

export type BulkWorkspaceAppliesCursorPagination = CursorPagination<BulkWorkspaceApply>;

export interface AgentEntry {
  name: string;

  /**
   * Agent specification (user-provided configuration)
   */
  spec: AgentsAPI.AgentSpec;

  labels?: { [key: string]: string };

  /**
   * Schedules under this agent, keyed by external_id.
   */
  schedules?: { [key: string]: AgentScheduleEntry };

  /**
   * Variations under this agent, keyed by external_id.
   */
  variations?: { [key: string]: AgentVariationEntry };
}

export interface AgentScheduleEntry {
  name: string;

  /**
   * AgentScheduleSpec is the user-provided configuration for a schedule.
   */
  spec: SchedulesAPI.AgentScheduleSpec;

  labels?: { [key: string]: string };
}

export interface AgentVariationEntry {
  name: string;

  /**
   * AgentVariationSpec defines the operational configuration for a variation
   */
  spec: VariationsAPI.AgentVariationSpec;

  /**
   * Reconciled list — server adjusts the variation's assignments to exactly this set
   * when the variation is bundle-owned.
   */
  assignments?: Array<VariationAssignmentEntry>;

  labels?: { [key: string]: string };

  /**
   * Reconciled list — capped at 10 to match the existing variation
   * memory-layer-assignment cap.
   */
  memoryLayers?: Array<VariationMemoryLayerEntry>;
}

/**
 * BulkWorkspaceApply is the operation resource produced by a call to
 * BulkWorkspaceResources.Apply. It is operation-typed (uses OperationMetadata,
 * like Objective and ObjectiveEvent) and carries the input bundle in `data`, the
 * lifecycle state in `status`, and aggregate counts in `info`.
 */
export interface BulkWorkspaceApply {
  data: BulkWorkspaceApplyData;

  /**
   * Metadata for ephemeral operations and activities (e.g., objectives, executions,
   * runs)
   */
  metadata: Shared.OperationMetadata;

  status: BulkWorkspaceApplyStatus;

  info?: BulkWorkspaceApplyInfo;
}

export interface BulkWorkspaceApplyData {
  /**
   * Required. Bundle ownership key. Resources created or updated by an Apply have
   * their `metadata.bundle_key` set to this value. On subsequent applies with the
   * same bundle_key, resources currently bearing this bundle_key but absent from the
   * spec are soft-deleted.
   */
  bundleKey: string;

  /**
   * Agents to upsert, keyed by external_id.
   */
  agents?: { [key: string]: AgentEntry };

  /**
   * Memory layers to upsert, keyed by external_id.
   */
  memoryLayers?: { [key: string]: MemoryLayerEntry };

  /**
   * Optional URL pointing to the source of this apply (GitHub PR, Jenkins build,
   * GitLab pipeline, etc.). Surfaced in the dashboard so users can jump from an
   * apply back to the change that produced it. Free-form HTTPS URI; not interpreted
   * by the server.
   */
  sourceUrl?: string;

  /**
   * Tool sets to upsert, keyed by external_id.
   */
  toolSets?: { [key: string]: ToolSetEntry };
}

export interface BulkWorkspaceApplyInfo {
  completedAt?: string;

  /**
   * Profile represents a human user at the account level. Profiles are
   * account-scoped resources that can be associated with multiple workspaces through
   * the Actor model. Authentication for profiles is handled via SSO/OAuth (WorkOS).
   */
  createdBy?: AccountAPI.Profile;

  createdCount?: number;

  deletedCount?: number;

  failedCount?: number;

  startedAt?: string;

  totalCount?: number;

  unchangedCount?: number;

  updatedCount?: number;
}

export interface BulkWorkspaceApplyStatus {
  state:
    | 'STATE_UNSPECIFIED'
    | 'STATE_PENDING'
    | 'STATE_VALIDATING'
    | 'STATE_RUNNING'
    | 'STATE_SUCCEEDED'
    | 'STATE_PARTIALLY_APPLIED'
    | 'STATE_FAILED'
    | 'STATE_CANCELLED';

  message?: string;

  /**
   * The `Status` type defines a logical error model that is suitable for different
   * programming environments, including REST APIs and RPC APIs. It is used by
   * [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of
   * data: error code, error message, and error details. You can find out more about
   * this error model and how to work with it in the
   * [API Design Guide](https://cloud.google.com/apis/design/errors).
   */
  preflightError?: BulkWorkspaceApplyStatus.PreflightError;
}

export namespace BulkWorkspaceApplyStatus {
  /**
   * The `Status` type defines a logical error model that is suitable for different
   * programming environments, including REST APIs and RPC APIs. It is used by
   * [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of
   * data: error code, error message, and error details. You can find out more about
   * this error model and how to work with it in the
   * [API Design Guide](https://cloud.google.com/apis/design/errors).
   */
  export interface PreflightError {
    /**
     * The status code, which should be an enum value of
     * [google.rpc.Code][google.rpc.Code].
     */
    code?: number;

    /**
     * A list of messages that carry the error details. There is a common set of
     * message types for APIs to use.
     */
    details?: Array<PreflightError.Detail>;

    /**
     * A developer-facing error message, which should be in English. Any user-facing
     * error message should be localized and sent in the
     * [google.rpc.Status.details][google.rpc.Status.details] field, or localized by
     * the client.
     */
    message?: string;
  }

  export namespace PreflightError {
    /**
     * Contains an arbitrary serialized message along with a @type that describes the
     * type of the serialized message.
     */
    export interface Detail {
      /**
       * The type of the serialized message.
       */
      '@type'?: string;

      [k: string]: unknown;
    }
  }
}

export interface MemoryEntryItem {
  key: string;

  content?: string;

  description?: string;

  uploadId?: string;
}

export interface MemoryLayerEntry {
  name: string;

  spec: MemoryLayersAPI.MemoryLayerSpec;

  /**
   * Memory entries in this layer, keyed by external_id.
   */
  entries?: { [key: string]: MemoryEntryItem };

  labels?: { [key: string]: string };
}

export interface ToolEntry {
  name: string;

  spec: ToolsAPI.ToolSpec;

  labels?: { [key: string]: string };
}

export interface ToolSetEntry {
  name: string;

  spec: ToolSetsAPI.ToolSetSpec;

  labels?: { [key: string]: string };

  /**
   * Tools in this tool set, keyed by external_id.
   */
  tools?: { [key: string]: ToolEntry };
}

export interface VariationAssignmentEntry {
  subAgentId?: string;

  toolId?: string;

  toolSetId?: string;
}

export interface VariationMemoryLayerEntry {
  /**
   * external_id:<value> form. Canonical IDs are rejected.
   */
  memoryLayerId?: string;

  position?: number;
}

export interface BulkWorkspaceResourceListParams extends CursorPaginationParams {
  /**
   * Filter by bundle_key — list every apply for a given bundle.
   */
  bundleKey?: string;

  /**
   * Sort order for results (asc or desc by creation time)
   */
  sortOrder?: string;

  /**
   * Filter by lifecycle state.
   */
  state?:
    | 'STATE_UNSPECIFIED'
    | 'STATE_PENDING'
    | 'STATE_VALIDATING'
    | 'STATE_RUNNING'
    | 'STATE_SUCCEEDED'
    | 'STATE_PARTIALLY_APPLIED'
    | 'STATE_FAILED'
    | 'STATE_CANCELLED';
}

export interface BulkWorkspaceResourceApplyParams {
  data: BulkWorkspaceApplyData;
}

BulkWorkspaceResources.Results = Results;

export declare namespace BulkWorkspaceResources {
  export {
    type AgentEntry as AgentEntry,
    type AgentScheduleEntry as AgentScheduleEntry,
    type AgentVariationEntry as AgentVariationEntry,
    type BulkWorkspaceApply as BulkWorkspaceApply,
    type BulkWorkspaceApplyData as BulkWorkspaceApplyData,
    type BulkWorkspaceApplyInfo as BulkWorkspaceApplyInfo,
    type BulkWorkspaceApplyStatus as BulkWorkspaceApplyStatus,
    type MemoryEntryItem as MemoryEntryItem,
    type MemoryLayerEntry as MemoryLayerEntry,
    type ToolEntry as ToolEntry,
    type ToolSetEntry as ToolSetEntry,
    type VariationAssignmentEntry as VariationAssignmentEntry,
    type VariationMemoryLayerEntry as VariationMemoryLayerEntry,
    type BulkWorkspaceAppliesCursorPagination as BulkWorkspaceAppliesCursorPagination,
    type BulkWorkspaceResourceListParams as BulkWorkspaceResourceListParams,
    type BulkWorkspaceResourceApplyParams as BulkWorkspaceResourceApplyParams,
  };

  export {
    Results as Results,
    type BulkWorkspaceApplyResult as BulkWorkspaceApplyResult,
    type BulkWorkspaceApplyResultData as BulkWorkspaceApplyResultData,
    type BulkWorkspaceApplyResultDataAgentOutcome as BulkWorkspaceApplyResultDataAgentOutcome,
    type BulkWorkspaceApplyResultDataAgentScheduleOutcome as BulkWorkspaceApplyResultDataAgentScheduleOutcome,
    type BulkWorkspaceApplyResultDataAgentVariationOutcome as BulkWorkspaceApplyResultDataAgentVariationOutcome,
    type BulkWorkspaceApplyResultDataMemoryEntryOutcome as BulkWorkspaceApplyResultDataMemoryEntryOutcome,
    type BulkWorkspaceApplyResultDataMemoryLayerOutcome as BulkWorkspaceApplyResultDataMemoryLayerOutcome,
    type BulkWorkspaceApplyResultDataToolOutcome as BulkWorkspaceApplyResultDataToolOutcome,
    type BulkWorkspaceApplyResultDataToolSetOutcome as BulkWorkspaceApplyResultDataToolSetOutcome,
    type BulkWorkspaceApplyResultDataVariationAssignmentOutcome as BulkWorkspaceApplyResultDataVariationAssignmentOutcome,
    type BulkWorkspaceApplyResultDataVariationMemoryLayerOutcome as BulkWorkspaceApplyResultDataVariationMemoryLayerOutcome,
    type BulkWorkspaceApplyResultsCursorPagination as BulkWorkspaceApplyResultsCursorPagination,
    type ResultListParams as ResultListParams,
  };
}
