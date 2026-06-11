// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';
import * as AgentsAPI from '../agents/agents';
import * as SchedulesAPI from '../agents/schedules';
import * as VariationsAPI from '../agents/variations';
import * as EntriesAPI from '../memory-layers/entries';
import * as MemoryLayersAPI from '../memory-layers/memory-layers';
import * as ToolSetsAPI from '../tool-sets/tool-sets';
import * as ToolsAPI from '../tool-sets/tools';
import { CursorPagination, type CursorPaginationParams, PagePromise } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Apply a declarative bundle of workspace resources — tool sets, memory
 *  layers, agents, variations, assignments, and schedules — in a single
 *  asynchronous operation.
 */
export class Results extends APIResource {
  /**
   * Lists each resource action recorded by a bulk workspace apply operation.
   */
  list(
    bulkWorkspaceApplyID: string,
    params: ResultListParams,
    options?: RequestOptions,
  ): PagePromise<BulkWorkspaceApplyResultsCursorPagination, BulkWorkspaceApplyResult> {
    const { workspaceId, ...query } = params;
    return this._client.getAPIList(
      path`/v1/workspaces/${workspaceId}/bulk_workspace_applies/${bulkWorkspaceApplyID}/results`,
      CursorPagination<BulkWorkspaceApplyResult>,
      { query, ...options },
    );
  }
}

export type BulkWorkspaceApplyResultsCursorPagination = CursorPagination<BulkWorkspaceApplyResult>;

/**
 * One row of the per-resource result list for a BulkWorkspaceApply. Each row is
 * itself an operation that can be paginated, sorted by created_at, and addressed
 * individually.
 */
export interface BulkWorkspaceApplyResult {
  /**
   * Outcome for a single resource within a bulk apply. The `type` field is the
   * discriminator string naming the populated `outcome` oneof variant (e.g.,
   * "toolSet", "memoryEntry"). Every outcome shell carries an `action` enum and
   * either a resulting resource snapshot (for ACTION_CREATED, ACTION_UPDATED,
   * ACTION_UNCHANGED, ACTION_DELETED) or a google.rpc.Status (for ACTION_FAILED).
   */
  data: BulkWorkspaceApplyResultData;

  /**
   * Metadata for ephemeral operations and activities (e.g., objectives, executions,
   * runs)
   */
  metadata: Shared.OperationMetadata;
}

/**
 * Outcome for a single resource within a bulk apply. The `type` field is the
 * discriminator string naming the populated `outcome` oneof variant (e.g.,
 * "toolSet", "memoryEntry"). Every outcome shell carries an `action` enum and
 * either a resulting resource snapshot (for ACTION_CREATED, ACTION_UPDATED,
 * ACTION_UNCHANGED, ACTION_DELETED) or a google.rpc.Status (for ACTION_FAILED).
 */
export interface BulkWorkspaceApplyResultData {
  agent?: BulkWorkspaceApplyResultDataAgentOutcome;

  agentSchedule?: BulkWorkspaceApplyResultDataAgentScheduleOutcome;

  agentVariation?: BulkWorkspaceApplyResultDataAgentVariationOutcome;

  memoryEntry?: BulkWorkspaceApplyResultDataMemoryEntryOutcome;

  memoryLayer?: BulkWorkspaceApplyResultDataMemoryLayerOutcome;

  tool?: BulkWorkspaceApplyResultDataToolOutcome;

  toolSet?: BulkWorkspaceApplyResultDataToolSetOutcome;

  type?: string;

  variationAssignment?: BulkWorkspaceApplyResultDataVariationAssignmentOutcome;

  variationMemoryLayer?: BulkWorkspaceApplyResultDataVariationMemoryLayerOutcome;
}

export interface BulkWorkspaceApplyResultDataAgentOutcome {
  action?:
    | 'ACTION_UNSPECIFIED'
    | 'ACTION_CREATED'
    | 'ACTION_UPDATED'
    | 'ACTION_UNCHANGED'
    | 'ACTION_DELETED'
    | 'ACTION_FAILED';

  /**
   * The `Status` type defines a logical error model that is suitable for different
   * programming environments, including REST APIs and RPC APIs. It is used by
   * [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of
   * data: error code, error message, and error details. You can find out more about
   * this error model and how to work with it in the
   * [API Design Guide](https://cloud.google.com/apis/design/errors).
   */
  error?: BulkWorkspaceApplyResultDataAgentOutcome.Error;

  externalId?: string;

  /**
   * Agent resource
   */
  resource?: AgentsAPI.Agent;
}

export namespace BulkWorkspaceApplyResultDataAgentOutcome {
  /**
   * The `Status` type defines a logical error model that is suitable for different
   * programming environments, including REST APIs and RPC APIs. It is used by
   * [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of
   * data: error code, error message, and error details. You can find out more about
   * this error model and how to work with it in the
   * [API Design Guide](https://cloud.google.com/apis/design/errors).
   */
  export interface Error {
    /**
     * The status code, which should be an enum value of
     * [google.rpc.Code][google.rpc.Code].
     */
    code?: number;

    /**
     * A list of messages that carry the error details. There is a common set of
     * message types for APIs to use.
     */
    details?: Array<Error.Detail>;

    /**
     * A developer-facing error message, which should be in English. Any user-facing
     * error message should be localized and sent in the
     * [google.rpc.Status.details][google.rpc.Status.details] field, or localized by
     * the client.
     */
    message?: string;
  }

  export namespace Error {
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

export interface BulkWorkspaceApplyResultDataAgentScheduleOutcome {
  action?:
    | 'ACTION_UNSPECIFIED'
    | 'ACTION_CREATED'
    | 'ACTION_UPDATED'
    | 'ACTION_UNCHANGED'
    | 'ACTION_DELETED'
    | 'ACTION_FAILED';

  /**
   * The `Status` type defines a logical error model that is suitable for different
   * programming environments, including REST APIs and RPC APIs. It is used by
   * [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of
   * data: error code, error message, and error details. You can find out more about
   * this error model and how to work with it in the
   * [API Design Guide](https://cloud.google.com/apis/design/errors).
   */
  error?: BulkWorkspaceApplyResultDataAgentScheduleOutcome.Error;

  externalId?: string;

  /**
   * AgentSchedule resource — a recurring trigger attached to an agent that creates
   * objectives on its cadence.
   */
  resource?: SchedulesAPI.AgentSchedule;
}

export namespace BulkWorkspaceApplyResultDataAgentScheduleOutcome {
  /**
   * The `Status` type defines a logical error model that is suitable for different
   * programming environments, including REST APIs and RPC APIs. It is used by
   * [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of
   * data: error code, error message, and error details. You can find out more about
   * this error model and how to work with it in the
   * [API Design Guide](https://cloud.google.com/apis/design/errors).
   */
  export interface Error {
    /**
     * The status code, which should be an enum value of
     * [google.rpc.Code][google.rpc.Code].
     */
    code?: number;

    /**
     * A list of messages that carry the error details. There is a common set of
     * message types for APIs to use.
     */
    details?: Array<Error.Detail>;

    /**
     * A developer-facing error message, which should be in English. Any user-facing
     * error message should be localized and sent in the
     * [google.rpc.Status.details][google.rpc.Status.details] field, or localized by
     * the client.
     */
    message?: string;
  }

  export namespace Error {
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

export interface BulkWorkspaceApplyResultDataAgentVariationOutcome {
  action?:
    | 'ACTION_UNSPECIFIED'
    | 'ACTION_CREATED'
    | 'ACTION_UPDATED'
    | 'ACTION_UNCHANGED'
    | 'ACTION_DELETED'
    | 'ACTION_FAILED';

  /**
   * The `Status` type defines a logical error model that is suitable for different
   * programming environments, including REST APIs and RPC APIs. It is used by
   * [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of
   * data: error code, error message, and error details. You can find out more about
   * this error model and how to work with it in the
   * [API Design Guide](https://cloud.google.com/apis/design/errors).
   */
  error?: BulkWorkspaceApplyResultDataAgentVariationOutcome.Error;

  externalId?: string;

  /**
   * AgentVariation resource
   */
  resource?: VariationsAPI.AgentVariation;
}

export namespace BulkWorkspaceApplyResultDataAgentVariationOutcome {
  /**
   * The `Status` type defines a logical error model that is suitable for different
   * programming environments, including REST APIs and RPC APIs. It is used by
   * [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of
   * data: error code, error message, and error details. You can find out more about
   * this error model and how to work with it in the
   * [API Design Guide](https://cloud.google.com/apis/design/errors).
   */
  export interface Error {
    /**
     * The status code, which should be an enum value of
     * [google.rpc.Code][google.rpc.Code].
     */
    code?: number;

    /**
     * A list of messages that carry the error details. There is a common set of
     * message types for APIs to use.
     */
    details?: Array<Error.Detail>;

    /**
     * A developer-facing error message, which should be in English. Any user-facing
     * error message should be localized and sent in the
     * [google.rpc.Status.details][google.rpc.Status.details] field, or localized by
     * the client.
     */
    message?: string;
  }

  export namespace Error {
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

export interface BulkWorkspaceApplyResultDataMemoryEntryOutcome {
  action?:
    | 'ACTION_UNSPECIFIED'
    | 'ACTION_CREATED'
    | 'ACTION_UPDATED'
    | 'ACTION_UNCHANGED'
    | 'ACTION_DELETED'
    | 'ACTION_FAILED';

  /**
   * The `Status` type defines a logical error model that is suitable for different
   * programming environments, including REST APIs and RPC APIs. It is used by
   * [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of
   * data: error code, error message, and error details. You can find out more about
   * this error model and how to work with it in the
   * [API Design Guide](https://cloud.google.com/apis/design/errors).
   */
  error?: BulkWorkspaceApplyResultDataMemoryEntryOutcome.Error;

  externalId?: string;

  /**
   * MemoryEntry is a single keyed value within a MemoryLayer. Entries are addressed
   * by their key, which follows the S3 object key safe-character convention (see
   * MemoryEntrySpec.key for the full rule). Keys are unique within a single layer;
   * the same key may appear in multiple layers, in which case the cascade walk
   * determines which one wins for a given objective (most specific layer first).
   *
   * MemoryEntry is the summary shape, returned by ListMemoryEntries. It does not
   * carry the entry body — callers that need the body must fetch the entry
   * individually via GetMemoryEntry, which returns a MemoryEntryDetail.
   */
  resource?: EntriesAPI.MemoryEntry;
}

export namespace BulkWorkspaceApplyResultDataMemoryEntryOutcome {
  /**
   * The `Status` type defines a logical error model that is suitable for different
   * programming environments, including REST APIs and RPC APIs. It is used by
   * [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of
   * data: error code, error message, and error details. You can find out more about
   * this error model and how to work with it in the
   * [API Design Guide](https://cloud.google.com/apis/design/errors).
   */
  export interface Error {
    /**
     * The status code, which should be an enum value of
     * [google.rpc.Code][google.rpc.Code].
     */
    code?: number;

    /**
     * A list of messages that carry the error details. There is a common set of
     * message types for APIs to use.
     */
    details?: Array<Error.Detail>;

    /**
     * A developer-facing error message, which should be in English. Any user-facing
     * error message should be localized and sent in the
     * [google.rpc.Status.details][google.rpc.Status.details] field, or localized by
     * the client.
     */
    message?: string;
  }

  export namespace Error {
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

export interface BulkWorkspaceApplyResultDataMemoryLayerOutcome {
  action?:
    | 'ACTION_UNSPECIFIED'
    | 'ACTION_CREATED'
    | 'ACTION_UPDATED'
    | 'ACTION_UNCHANGED'
    | 'ACTION_DELETED'
    | 'ACTION_FAILED';

  /**
   * The `Status` type defines a logical error model that is suitable for different
   * programming environments, including REST APIs and RPC APIs. It is used by
   * [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of
   * data: error code, error message, and error details. You can find out more about
   * this error model and how to work with it in the
   * [API Design Guide](https://cloud.google.com/apis/design/errors).
   */
  error?: BulkWorkspaceApplyResultDataMemoryLayerOutcome.Error;

  externalId?: string;

  /**
   * MemoryLayer is a named container of memory entries that can be composed into an
   * objective's memory cascade. Layers are workspace-scoped resources. The layer
   * type controls how its entries participate in the agent loop — see
   * MemoryLayerType for details.
   *
   * See "Memory cascade composition" above for how layers compose at lookup time.
   */
  resource?: MemoryLayersAPI.MemoryLayer;
}

export namespace BulkWorkspaceApplyResultDataMemoryLayerOutcome {
  /**
   * The `Status` type defines a logical error model that is suitable for different
   * programming environments, including REST APIs and RPC APIs. It is used by
   * [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of
   * data: error code, error message, and error details. You can find out more about
   * this error model and how to work with it in the
   * [API Design Guide](https://cloud.google.com/apis/design/errors).
   */
  export interface Error {
    /**
     * The status code, which should be an enum value of
     * [google.rpc.Code][google.rpc.Code].
     */
    code?: number;

    /**
     * A list of messages that carry the error details. There is a common set of
     * message types for APIs to use.
     */
    details?: Array<Error.Detail>;

    /**
     * A developer-facing error message, which should be in English. Any user-facing
     * error message should be localized and sent in the
     * [google.rpc.Status.details][google.rpc.Status.details] field, or localized by
     * the client.
     */
    message?: string;
  }

  export namespace Error {
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

export interface BulkWorkspaceApplyResultDataToolOutcome {
  action?:
    | 'ACTION_UNSPECIFIED'
    | 'ACTION_CREATED'
    | 'ACTION_UPDATED'
    | 'ACTION_UNCHANGED'
    | 'ACTION_DELETED'
    | 'ACTION_FAILED';

  /**
   * The `Status` type defines a logical error model that is suitable for different
   * programming environments, including REST APIs and RPC APIs. It is used by
   * [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of
   * data: error code, error message, and error details. You can find out more about
   * this error model and how to work with it in the
   * [API Design Guide](https://cloud.google.com/apis/design/errors).
   */
  error?: BulkWorkspaceApplyResultDataToolOutcome.Error;

  externalId?: string;

  resource?: ToolsAPI.Tool;
}

export namespace BulkWorkspaceApplyResultDataToolOutcome {
  /**
   * The `Status` type defines a logical error model that is suitable for different
   * programming environments, including REST APIs and RPC APIs. It is used by
   * [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of
   * data: error code, error message, and error details. You can find out more about
   * this error model and how to work with it in the
   * [API Design Guide](https://cloud.google.com/apis/design/errors).
   */
  export interface Error {
    /**
     * The status code, which should be an enum value of
     * [google.rpc.Code][google.rpc.Code].
     */
    code?: number;

    /**
     * A list of messages that carry the error details. There is a common set of
     * message types for APIs to use.
     */
    details?: Array<Error.Detail>;

    /**
     * A developer-facing error message, which should be in English. Any user-facing
     * error message should be localized and sent in the
     * [google.rpc.Status.details][google.rpc.Status.details] field, or localized by
     * the client.
     */
    message?: string;
  }

  export namespace Error {
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

export interface BulkWorkspaceApplyResultDataToolSetOutcome {
  action?:
    | 'ACTION_UNSPECIFIED'
    | 'ACTION_CREATED'
    | 'ACTION_UPDATED'
    | 'ACTION_UNCHANGED'
    | 'ACTION_DELETED'
    | 'ACTION_FAILED';

  /**
   * The `Status` type defines a logical error model that is suitable for different
   * programming environments, including REST APIs and RPC APIs. It is used by
   * [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of
   * data: error code, error message, and error details. You can find out more about
   * this error model and how to work with it in the
   * [API Design Guide](https://cloud.google.com/apis/design/errors).
   */
  error?: BulkWorkspaceApplyResultDataToolSetOutcome.Error;

  externalId?: string;

  resource?: ToolSetsAPI.ToolSet;
}

export namespace BulkWorkspaceApplyResultDataToolSetOutcome {
  /**
   * The `Status` type defines a logical error model that is suitable for different
   * programming environments, including REST APIs and RPC APIs. It is used by
   * [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of
   * data: error code, error message, and error details. You can find out more about
   * this error model and how to work with it in the
   * [API Design Guide](https://cloud.google.com/apis/design/errors).
   */
  export interface Error {
    /**
     * The status code, which should be an enum value of
     * [google.rpc.Code][google.rpc.Code].
     */
    code?: number;

    /**
     * A list of messages that carry the error details. There is a common set of
     * message types for APIs to use.
     */
    details?: Array<Error.Detail>;

    /**
     * A developer-facing error message, which should be in English. Any user-facing
     * error message should be localized and sent in the
     * [google.rpc.Status.details][google.rpc.Status.details] field, or localized by
     * the client.
     */
    message?: string;
  }

  export namespace Error {
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

export interface BulkWorkspaceApplyResultDataVariationAssignmentOutcome {
  action?:
    | 'ACTION_UNSPECIFIED'
    | 'ACTION_CREATED'
    | 'ACTION_UPDATED'
    | 'ACTION_UNCHANGED'
    | 'ACTION_DELETED'
    | 'ACTION_FAILED';

  /**
   * The `Status` type defines a logical error model that is suitable for different
   * programming environments, including REST APIs and RPC APIs. It is used by
   * [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of
   * data: error code, error message, and error details. You can find out more about
   * this error model and how to work with it in the
   * [API Design Guide](https://cloud.google.com/apis/design/errors).
   */
  error?: BulkWorkspaceApplyResultDataVariationAssignmentOutcome.Error;

  /**
   * A read-only reference to a single tool, tool set, or sub-agent attached to a
   * variation. Read the full set of assignments via
   * `AgentVariationInfo.assignments`; mutations go through the dedicated add/remove
   * assignment endpoints.
   *
   * The `id` identifies the assignment itself (not the referenced resource) and is
   * the handle used to remove the assignment. It is returned by the add endpoint and
   * present on every entry in `AgentVariationInfo.assignments`.
   */
  resource?: VariationsAPI.VariationAssignment;
}

export namespace BulkWorkspaceApplyResultDataVariationAssignmentOutcome {
  /**
   * The `Status` type defines a logical error model that is suitable for different
   * programming environments, including REST APIs and RPC APIs. It is used by
   * [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of
   * data: error code, error message, and error details. You can find out more about
   * this error model and how to work with it in the
   * [API Design Guide](https://cloud.google.com/apis/design/errors).
   */
  export interface Error {
    /**
     * The status code, which should be an enum value of
     * [google.rpc.Code][google.rpc.Code].
     */
    code?: number;

    /**
     * A list of messages that carry the error details. There is a common set of
     * message types for APIs to use.
     */
    details?: Array<Error.Detail>;

    /**
     * A developer-facing error message, which should be in English. Any user-facing
     * error message should be localized and sent in the
     * [google.rpc.Status.details][google.rpc.Status.details] field, or localized by
     * the client.
     */
    message?: string;
  }

  export namespace Error {
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

export interface BulkWorkspaceApplyResultDataVariationMemoryLayerOutcome {
  action?:
    | 'ACTION_UNSPECIFIED'
    | 'ACTION_CREATED'
    | 'ACTION_UPDATED'
    | 'ACTION_UNCHANGED'
    | 'ACTION_DELETED'
    | 'ACTION_FAILED';

  /**
   * The `Status` type defines a logical error model that is suitable for different
   * programming environments, including REST APIs and RPC APIs. It is used by
   * [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of
   * data: error code, error message, and error details. You can find out more about
   * this error model and how to work with it in the
   * [API Design Guide](https://cloud.google.com/apis/design/errors).
   */
  error?: BulkWorkspaceApplyResultDataVariationMemoryLayerOutcome.Error;

  /**
   * VariationMemoryLayerAssignment attaches a single MemoryLayer to a variation at a
   * given position in the variation's baseline memory cascade. A variation has at
   * most one assignment per memory_layer_id.
   *
   * Variations only support whole-layer attachments — entry pinning is an
   * objective-level capability.
   */
  resource?: VariationsAPI.VariationMemoryLayerAssignment;
}

export namespace BulkWorkspaceApplyResultDataVariationMemoryLayerOutcome {
  /**
   * The `Status` type defines a logical error model that is suitable for different
   * programming environments, including REST APIs and RPC APIs. It is used by
   * [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of
   * data: error code, error message, and error details. You can find out more about
   * this error model and how to work with it in the
   * [API Design Guide](https://cloud.google.com/apis/design/errors).
   */
  export interface Error {
    /**
     * The status code, which should be an enum value of
     * [google.rpc.Code][google.rpc.Code].
     */
    code?: number;

    /**
     * A list of messages that carry the error details. There is a common set of
     * message types for APIs to use.
     */
    details?: Array<Error.Detail>;

    /**
     * A developer-facing error message, which should be in English. Any user-facing
     * error message should be localized and sent in the
     * [google.rpc.Status.details][google.rpc.Status.details] field, or localized by
     * the client.
     */
    message?: string;
  }

  export namespace Error {
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

export interface ResultListParams extends CursorPaginationParams {
  /**
   * Path param: Workspace ID.
   */
  workspaceId: string;

  /**
   * Query param: Filter by action.
   */
  action?:
    | 'ACTION_UNSPECIFIED'
    | 'ACTION_CREATED'
    | 'ACTION_UPDATED'
    | 'ACTION_UNCHANGED'
    | 'ACTION_DELETED'
    | 'ACTION_FAILED';

  /**
   * Query param: Sort order for results (asc or desc by creation time)
   */
  sortOrder?: string;

  /**
   * Query param: Filter by data.type discriminator (e.g., "toolSet", "memoryEntry").
   */
  type?: string;
}

export declare namespace Results {
  export {
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
