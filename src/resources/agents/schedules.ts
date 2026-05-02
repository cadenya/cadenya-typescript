// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as AccountAPI from '../account';
import * as Shared from '../shared';
import { APIPromise } from '../../core/api-promise';
import { CursorPagination, type CursorPaginationParams, PagePromise } from '../../core/pagination';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * AgentScheduleService manages recurring schedules attached to agents.
 *  Schedules trigger objectives on a cadence defined by AgentScheduleSpec.Schedule.
 *  All operations are implicitly scoped to the workspace determined by the JWT token.
 *
 *  Authentication: Bearer token (JWT)
 *  Scope: Workspace-level operations
 */
export class Schedules extends APIResource {
  /**
   * Creates a new schedule for an agent
   */
  create(agentID: string, body: ScheduleCreateParams, options?: RequestOptions): APIPromise<AgentSchedule> {
    return this._client.post(path`/v1/agents/${agentID}/schedules`, { body, ...options });
  }

  /**
   * Retrieves a schedule by ID from an agent
   */
  retrieve(id: string, params: ScheduleRetrieveParams, options?: RequestOptions): APIPromise<AgentSchedule> {
    const { agentId } = params;
    return this._client.get(path`/v1/agents/${agentId}/schedules/${id}`, options);
  }

  /**
   * Updates a schedule for an agent
   */
  update(id: string, params: ScheduleUpdateParams, options?: RequestOptions): APIPromise<AgentSchedule> {
    const { agentId, ...body } = params;
    return this._client.patch(path`/v1/agents/${agentId}/schedules/${id}`, { body, ...options });
  }

  /**
   * Lists all schedules for an agent
   */
  list(
    agentID: string,
    query: ScheduleListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<AgentSchedulesCursorPagination, AgentSchedule> {
    return this._client.getAPIList(path`/v1/agents/${agentID}/schedules`, CursorPagination<AgentSchedule>, {
      query,
      ...options,
    });
  }

  /**
   * Deletes a schedule from an agent
   */
  delete(id: string, params: ScheduleDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { agentId } = params;
    return this._client.delete(path`/v1/agents/${agentId}/schedules/${id}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export type AgentSchedulesCursorPagination = CursorPagination<AgentSchedule>;

/**
 * AgentSchedule resource — a recurring trigger attached to an agent that creates
 * objectives on its cadence.
 */
export interface AgentSchedule {
  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  metadata: Shared.ResourceMetadata;

  /**
   * AgentScheduleSpec is the user-provided configuration for a schedule.
   */
  spec: AgentScheduleSpec;

  /**
   * AgentScheduleInfo provides read-only runtime data about a schedule.
   */
  info?: AgentScheduleInfo;
}

/**
 * AgentScheduleInfo provides read-only runtime data about a schedule.
 */
export interface AgentScheduleInfo {
  /**
   * Profile represents a human user at the account level. Profiles are
   * account-scoped resources that can be associated with multiple workspaces through
   * the Actor model. Authentication for profiles is handled via SSO/OAuth (WorkOS).
   */
  createdBy?: AccountAPI.Profile;

  /**
   * When the schedule last fired (regardless of objective outcome).
   */
  lastFireAt?: string;

  /**
   * ID of the most recent objective the schedule created.
   */
  lastObjectiveId?: string;

  /**
   * When the schedule most recently skipped a fire (SKIP policy + prior in flight).
   */
  lastSkippedAt?: string;

  /**
   * Reason for the most recent skip (e.g. "previous objective still running").
   */
  lastSkipReason?: string;

  /**
   * When the schedule will next fire. Computed from the spec; absent when the
   * schedule is PAUSED/ARCHIVED or has no future fire times.
   */
  nextFireAt?: string;

  /**
   * Lifetime count of objectives created by this schedule.
   */
  totalFires?: number;
}

/**
 * AgentScheduleSpec is the user-provided configuration for a schedule.
 */
export interface AgentScheduleSpec {
  /**
   * The initial message passed to CreateObjective on each fire. Becomes the first
   * user message in the objective's chat history.
   */
  initialMessage: string;

  /**
   * Schedule defines WHEN the schedule fires. Temporal-style structured form: a list
   * of calendar rules (wall-clock) and/or interval rules (duration), OR'd together.
   * At least one rule is required.
   */
  schedule: AgentScheduleSpecSchedule;

  /**
   * Optional input data passed to the objective. If the agent has an
   * input_data_schema, this must satisfy it.
   */
  data?: unknown;

  /**
   * What to do when the previous run is still in flight. Defaults to SKIP.
   */
  overlapPolicy?: 'OVERLAP_POLICY_UNSPECIFIED' | 'OVERLAP_POLICY_ALLOW' | 'OVERLAP_POLICY_SKIP';

  /**
   * Lifecycle. Defaults to ACTIVE on create when unspecified.
   */
  status?:
    | 'AGENT_SCHEDULE_STATUS_UNSPECIFIED'
    | 'AGENT_SCHEDULE_STATUS_ACTIVE'
    | 'AGENT_SCHEDULE_STATUS_PAUSED'
    | 'AGENT_SCHEDULE_STATUS_ARCHIVED';

  /**
   * Optional explicit variation. When unset, the agent's variation_selection_mode
   * chooses per fire.
   */
  variationId?: string;
}

/**
 * Schedule defines WHEN the schedule fires. Temporal-style structured form: a list
 * of calendar rules (wall-clock) and/or interval rules (duration), OR'd together.
 * At least one rule is required.
 */
export interface AgentScheduleSpecSchedule {
  /**
   * Wall-clock rules. May be empty if `intervals` is non-empty.
   */
  calendars?: Array<ScheduleCalendar>;

  /**
   * Duration-based rules. May be empty if `calendars` is non-empty.
   */
  intervals?: Array<ScheduleInterval>;

  /**
   * IANA tz name (e.g. "America/New_York"). Required. Applies to calendars;
   * intervals fire on wall-clock cadence anchored in this zone.
   */
  timezone?: string;
}

/**
 * Calendar is a wall-clock rule. Empty field-list semantics:
 *
 * - second/minute/hour: empty means [{start: 0}] (top of the unit)
 * - day_of_month/month/day_of_week: empty means "any value" Fire times = cartesian
 *   product across all fields.
 */
export interface ScheduleCalendar {
  comment?: string;

  dayOfMonth?: Array<ScheduleRange>;

  dayOfWeek?: Array<ScheduleRange>;

  hour?: Array<ScheduleRange>;

  minute?: Array<ScheduleRange>;

  month?: Array<ScheduleRange>;

  second?: Array<ScheduleRange>;
}

/**
 * Interval is a duration-based rule. Fires every `every` from a stable anchor
 * (workspace epoch), optionally phase-shifted by `offset`.
 */
export interface ScheduleInterval {
  every?: string;

  /**
   * Phase shift within `every`. Must be < `every` (enforced at runtime).
   */
  offset?: string;
}

/**
 * Inclusive numeric range with optional step. {start: 9} → 9 {start: 9, end: 17} →
 * 9..17 {start: 0, end: 59, step: 15} → 0,15,30,45 `end` defaults to `start`;
 * `step` defaults to 1.
 */
export interface ScheduleRange {
  end?: number;

  start?: number;

  step?: number;
}

export interface ScheduleCreateParams {
  /**
   * CreateResourceMetadata contains the user-provided fields for creating a
   * workspace-scoped resource. Read-only fields (id, account_id, workspace_id,
   * profile_id, created_at) are excluded since they are set by the server.
   */
  metadata: Shared.CreateResourceMetadata;

  /**
   * AgentScheduleSpec is the user-provided configuration for a schedule.
   */
  spec: AgentScheduleSpec;
}

export interface ScheduleRetrieveParams {
  /**
   * Agent ID (from path). Accepts canonical agent\_… form or external_id:<value>
   * form (see common.proto "Path-parameter ID resolution").
   */
  agentId: string;
}

export interface ScheduleUpdateParams {
  /**
   * Path param: Agent ID (from path). Accepts canonical agent\_… form or
   * external_id:<value> form (see common.proto "Path-parameter ID resolution").
   */
  agentId: string;

  /**
   * Body param: UpdateResourceMetadata contains the user-provided fields for
   * updating a workspace-scoped resource. Read-only fields (id, account_id,
   * workspace_id, profile_id, created_at) are excluded since they are set by the
   * server.
   */
  metadata?: Shared.UpdateResourceMetadata;

  /**
   * Body param: AgentScheduleSpec is the user-provided configuration for a schedule.
   */
  spec?: AgentScheduleSpec;

  /**
   * Body param: Fields to update.
   */
  updateMask?: string;
}

export interface ScheduleListParams extends CursorPaginationParams {
  /**
   * Filter by bundle_key — return only resources owned by this bundle.
   */
  bundleKey?: string;

  /**
   * When set to true you may use more of your alloted API rate-limit.
   */
  includeInfo?: boolean;

  /**
   * Filter expression (query param: prefix).
   */
  prefix?: string;

  /**
   * Free-form search query.
   */
  query?: string;

  /**
   * Sort order for results (asc or desc by creation time).
   */
  sortOrder?: string;
}

export interface ScheduleDeleteParams {
  /**
   * Agent ID (from path). Accepts canonical agent\_… form or external_id:<value>
   * form (see common.proto "Path-parameter ID resolution").
   */
  agentId: string;
}

export declare namespace Schedules {
  export {
    type AgentSchedule as AgentSchedule,
    type AgentScheduleInfo as AgentScheduleInfo,
    type AgentScheduleSpec as AgentScheduleSpec,
    type AgentScheduleSpecSchedule as AgentScheduleSpecSchedule,
    type ScheduleCalendar as ScheduleCalendar,
    type ScheduleInterval as ScheduleInterval,
    type ScheduleRange as ScheduleRange,
    type AgentSchedulesCursorPagination as AgentSchedulesCursorPagination,
    type ScheduleCreateParams as ScheduleCreateParams,
    type ScheduleRetrieveParams as ScheduleRetrieveParams,
    type ScheduleUpdateParams as ScheduleUpdateParams,
    type ScheduleListParams as ScheduleListParams,
    type ScheduleDeleteParams as ScheduleDeleteParams,
  };
}
