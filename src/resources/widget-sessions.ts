// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { CursorPagination, type CursorPaginationParams, PagePromise } from '../core/pagination';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Mint and manage widget sessions. Session creation is server-to-server only:
 *  the customer's backend authenticates its visitor, asserts tenant/subject
 *  context, attaches any per-visitor secrets, and receives a short-lived
 *  bearer token the browser uses against the widget host.
 */
export class WidgetSessions extends APIResource {
  /**
   * Mints a session against a widget and returns the session bearer token
   * (`spec.token`, returned only on creation) plus the authoritative widget hostname
   * (`info.host`). Asserting a tenant upserts the tenant record; attached secrets
   * flow to every conversation the session creates.
   */
  create(params: WidgetSessionCreateParams, options?: RequestOptions): APIPromise<WidgetSession> {
    const { workspaceId = this._client.workspaceID, ...body } = params;
    return this._client.post(path`/v1/workspaces/${workspaceId}/widget_sessions`, { body, ...options });
  }

  /**
   * Retrieves a widget session. The bearer token is never returned on reads.
   */
  retrieve(
    id: string,
    params: WidgetSessionRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<WidgetSession> {
    const { workspaceId = this._client.workspaceID } = params ?? {};
    return this._client.get(path`/v1/workspaces/${workspaceId}/widget_sessions/${id}`, options);
  }

  /**
   * Lists widget sessions in a workspace, filterable by widget, tenant, subject, and
   * state
   */
  list(
    params: WidgetSessionListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<WidgetSessionsCursorPagination, WidgetSession> {
    const { workspaceId = this._client.workspaceID, ...query } = params ?? {};
    return this._client.getAPIList(
      path`/v1/workspaces/${workspaceId}/widget_sessions`,
      CursorPagination<WidgetSession>,
      { query, ...options },
    );
  }

  /**
   * Deletes a session and its secrets. The session's conversations are
   * disassociated, not deleted; use the tenant-level delete for full erasure.
   */
  delete(
    id: string,
    params: WidgetSessionDeleteParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<void> {
    const { workspaceId = this._client.workspaceID } = params ?? {};
    return this._client.delete(path`/v1/workspaces/${workspaceId}/widget_sessions/${id}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Deletes every session belonging to a tenant across all widgets in the workspace,
   * along with the conversations those sessions created — built for GDPR erasure
   * requests. The tenant is required; an empty value is rejected rather than
   * matching everything.
   */
  deleteTenant(
    params: WidgetSessionDeleteTenantParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<WidgetSessionDeleteTenantResponse> {
    const { workspaceId = this._client.workspaceID, tenantId } = params ?? {};
    return this._client.delete(path`/v1/workspaces/${workspaceId}/widget_sessions`, {
      query: { tenantId },
      ...options,
    });
  }

  /**
   * Transitions a session to STATE_REVOKED. Outstanding tokens stop working
   * immediately, open event streams close within seconds, and the session's secrets
   * are deleted. Terminal.
   */
  revoke(id: string, params: WidgetSessionRevokeParams, options?: RequestOptions): APIPromise<WidgetSession> {
    const { workspaceId = this._client.workspaceID, ...body } = params;
    return this._client.post(path`/v1/workspaces/${workspaceId}/widget_sessions/${id}:revoke`, {
      body,
      ...options,
    });
  }
}

export type WidgetSessionsCursorPagination = CursorPagination<WidgetSession>;

/**
 * SubjectAssertion identifies a person within a tenant in the customer's own
 * namespace — typically their user id. Asserting a subject upserts the subject
 * record under the asserted tenant and associates the created resource with it. A
 * subject assertion is only valid alongside a tenant assertion: subject
 * identifiers are scoped to their tenant.
 */
export interface SubjectAssertion {
  /**
   * The subject identifier in the customer's namespace (e.g. their user id). Stored
   * as the subject record's external_id; unique within the tenant.
   */
  id: string;

  /**
   * Optional human-readable name for the subject. Updates the subject record's name
   * on every assertion that provides it.
   */
  name?: string;
}

/**
 * SubjectReference is the read-only echo of a resource's subject association,
 * carrying both Cadenya's canonical id and the customer's own key.
 */
export interface SubjectReference {
  /**
   * Cadenya's canonical subject id.
   */
  id: string;

  /**
   * The subject identifier in the customer's namespace, as asserted. Unique within
   * the subject's tenant.
   */
  externalId: string;

  /**
   * Human-readable name of the subject, when one has been asserted.
   */
  name?: string;
}

/**
 * TenantAssertion identifies a tenant in the customer's own namespace — their org,
 * company, or team identifier for an end user. Asserting a tenant upserts the
 * tenant record in the workspace (keyed on `id` as the tenant's external_id) and
 * associates the created resource with it.
 */
export interface TenantAssertion {
  /**
   * The tenant identifier in the customer's namespace (e.g. "acme-corp"). Stored as
   * the tenant record's external_id; stable across requests.
   */
  id: string;

  /**
   * Optional human-readable name for the tenant. Updates the tenant record's name on
   * every assertion that provides it.
   */
  name?: string;
}

/**
 * TenantReference is the read-only echo of a resource's tenant association,
 * carrying both Cadenya's canonical id and the customer's own key.
 */
export interface TenantReference {
  /**
   * Cadenya's canonical tenant id.
   */
  id: string;

  /**
   * The tenant identifier in the customer's namespace, as asserted.
   */
  externalId: string;

  /**
   * Human-readable name of the tenant, when one has been asserted.
   */
  name?: string;
}

/**
 * WidgetSession is a delegated, narrowed credential for one visitor's use of a
 * widget, minted server-to-server by the customer's backend. The session carries
 * all customer-asserted context — tenant, subject, labels, secrets — and every
 * conversation (objective) created through the widget inherits it. The bearer
 * token returned at mint is short-lived and refreshed at the widget host; the
 * session row is what makes revocation possible.
 */
export interface WidgetSession {
  /**
   * Metadata for ephemeral operations and activities (e.g., objectives, executions,
   * runs)
   */
  metadata: Shared.OperationMetadata;

  /**
   * WidgetSessionSpec is the configuration of a session, fixed at mint.
   */
  spec: WidgetSessionSpec;

  /**
   * The current lifecycle state of the session. Output only. Sessions are created
   * STATE_ACTIVE; use :revoke to end one early.
   */
  state: 'STATE_UNSPECIFIED' | 'STATE_ACTIVE' | 'STATE_EXPIRED' | 'STATE_REVOKED' | 'STATE_EXHAUSTED';

  /**
   * WidgetSessionInfo provides read-only server-derived data about a session.
   */
  info?: WidgetSessionInfo;

  /**
   * Names of the secrets attached to the session. Values are write-only: provided at
   * creation, encrypted at rest, and interpolated into tool-call headers server-side
   * — never returned by any API.
   */
  secrets?: Array<WidgetSession.Secret>;
}

export namespace WidgetSession {
  /**
   * Secret is the name-only echo of a secret attached to the session. Values are
   * never returned.
   */
  export interface Secret {
    name?: string;
  }
}

/**
 * WidgetSessionInfo provides read-only server-derived data about a session.
 */
export interface WidgetSessionInfo {
  /**
   * BareMetadata contains the minimal metadata for a resource: the ID and an
   * optional human-readable name. These are used for reference fields where the full
   * metadata (account scoping, timestamps, labels, external IDs) is not needed —
   * e.g., the tool references inside an agent variation spec or the tools assigned
   * to an objective. Both fields are server-populated; clients provide IDs through
   * sibling fields rather than by constructing a BareMetadata themselves.
   */
  agent?: Shared.BareMetadata;

  /**
   * The widget hostname this session's tokens are bound to. Authoritative — clients
   * must use this value rather than constructing the hostname.
   */
  host?: string;

  /**
   * When the session last created a conversation, sent a message, or refreshed a
   * token.
   */
  lastActiveAt?: string;

  /**
   * Number of conversation messages created through this session, counted against
   * the session's message cap.
   */
  messageCount?: number;

  /**
   * SubjectReference is the read-only echo of a resource's subject association,
   * carrying both Cadenya's canonical id and the customer's own key.
   */
  subject?: SubjectReference;

  /**
   * TenantReference is the read-only echo of a resource's tenant association,
   * carrying both Cadenya's canonical id and the customer's own key.
   */
  tenant?: TenantReference;

  /**
   * BareMetadata contains the minimal metadata for a resource: the ID and an
   * optional human-readable name. These are used for reference fields where the full
   * metadata (account scoping, timestamps, labels, external IDs) is not needed —
   * e.g., the tool references inside an agent variation spec or the tools assigned
   * to an objective. Both fields are server-populated; clients provide IDs through
   * sibling fields rather than by constructing a BareMetadata themselves.
   */
  widget?: Shared.BareMetadata;
}

/**
 * WidgetSessionSpec is the configuration of a session, fixed at mint.
 */
export interface WidgetSessionSpec {
  /**
   * Widget this session is minted against. Accepts the canonical `wgt_…` form or the
   * `external_id:<value>` form.
   */
  widgetId: string;

  /**
   * The session bearer token. Returned only on creation — subsequent reads omit it.
   * The token is short-lived; the widget refreshes it at the widget host without
   * involving the customer's backend.
   */
  token?: string;

  /**
   * Hard session expiry. Tokens never outlive it; after it passes the session
   * transitions to STATE_EXPIRED. Defaults to a server-chosen horizon when unset.
   */
  expiresAt?: string;

  /**
   * Parameters forced onto tool calls made by this session's conversations. A pinned
   * parameter is an overlay on a tool's JSON schema: the parameter is removed from
   * what the LLM sees, and its value is always overwritten server-side with the
   * pinned value — so the model cannot be tricked into calling a tool with a
   * different id than the one the session was minted for (e.g. pin "workspaceId" for
   * an OpenAPI tool with a /workspaces/{workspaceId} path). Flows to every objective
   * the session creates.
   */
  pinnedParameters?: { [key: string]: string };

  /**
   * SubjectAssertion identifies a person within a tenant in the customer's own
   * namespace — typically their user id. Asserting a subject upserts the subject
   * record under the asserted tenant and associates the created resource with it. A
   * subject assertion is only valid alongside a tenant assertion: subject
   * identifiers are scoped to their tenant.
   */
  subject?: SubjectAssertion;

  /**
   * TenantAssertion identifies a tenant in the customer's own namespace — their org,
   * company, or team identifier for an end user. Asserting a tenant upserts the
   * tenant record in the workspace (keyed on `id` as the tenant's external_id) and
   * associates the created resource with it.
   */
  tenant?: TenantAssertion;

  /**
   * Expiry of the token returned in `token`. Distinct from `expires_at`, which
   * bounds the session itself.
   */
  tokenExpiresAt?: string;
}

/**
 * Delete tenant widget sessions response.
 */
export interface WidgetSessionDeleteTenantResponse {
  /**
   * Number of conversations (objectives) deleted along with the sessions.
   */
  objectivesDeleted?: number;

  /**
   * Number of sessions deleted.
   */
  sessionsDeleted?: number;
}

export interface WidgetSessionCreateParams {
  /**
   * Path param: Workspace ID.
   */
  workspaceId?: string;

  /**
   * Body param: WidgetSessionSpec is the configuration of a session, fixed at mint.
   */
  spec: WidgetSessionSpec;

  /**
   * Body param: CreateOperationMetadata contains the user-provided fields for
   * creating an operation. Read-only fields (id, account_id, workspace_id,
   * created_at, profile_id) are excluded since they are set by the server.
   */
  metadata?: Shared.CreateOperationMetadata;

  /**
   * Body param: Secrets to attach to the session.
   */
  secrets?: Array<WidgetSessionCreateParams.Secret>;
}

export namespace WidgetSessionCreateParams {
  /**
   * Secret is a named credential attached to the session — typically a token the
   * customer's backend minted for the visitor, so the agent acts against their API
   * as that subject. Values are captured at the boundary, encrypted at rest,
   * appended to every conversation the session creates (re-synced on each turn), and
   * never returned by any API. Session secrets take precedence over workspace and
   * tool-set secrets of the same name.
   */
  export interface Secret {
    name?: string;

    value?: string;
  }
}

export interface WidgetSessionRetrieveParams {
  /**
   * Workspace ID.
   */
  workspaceId?: string;
}

export interface WidgetSessionListParams extends CursorPaginationParams {
  /**
   * Path param: Workspace ID.
   */
  workspaceId?: string;

  /**
   * Query param: When true, the `info` field on each returned session is populated.
   * Requests with this flag count more against your rate limit.
   */
  includeInfo?: boolean;

  /**
   * Query param: Filters by metadata labels. Comma-separated key=value pairs, e.g.
   * "env=prod,team=ai". A resource matches only if every pair matches exactly (AND
   * semantics).
   */
  labels?: string;

  /**
   * Query param: Sort order for results (asc or desc by creation time).
   */
  sortOrder?: string;

  /**
   * Query param: Filter by state.
   */
  state?: 'STATE_UNSPECIFIED' | 'STATE_ACTIVE' | 'STATE_EXPIRED' | 'STATE_REVOKED' | 'STATE_EXHAUSTED';

  /**
   * Query param: Filter to sessions asserted for a subject. Accepts the canonical
   * `subj_…` form or the `external_id:<value>` form; the external_id form is scoped
   * within a tenant and requires `tenant_id` to also be set.
   */
  subjectId?: string;

  /**
   * Query param: Filter to sessions belonging to a tenant. Accepts the canonical
   * `tenant_…` form or the `external_id:<value>` form.
   */
  tenantId?: string;

  /**
   * Query param: Filter to sessions on a specific widget. Accepts the canonical
   * `wgt_…` form or the `external_id:<value>` form.
   */
  widgetId?: string;
}

export interface WidgetSessionDeleteParams {
  /**
   * Workspace ID.
   */
  workspaceId?: string;
}

export interface WidgetSessionDeleteTenantParams {
  /**
   * Path param: Workspace ID.
   */
  workspaceId?: string;

  /**
   * Query param: Tenant whose sessions to delete. Required — an empty value is
   * rejected rather than matching everything. Accepts the canonical `tenant_…` form
   * or the `external_id:<value>` form.
   */
  tenantId?: string;
}

export interface WidgetSessionRevokeParams {
  /**
   * Workspace ID.
   */
  workspaceId?: string;
}

export declare namespace WidgetSessions {
  export {
    type SubjectAssertion as SubjectAssertion,
    type SubjectReference as SubjectReference,
    type TenantAssertion as TenantAssertion,
    type TenantReference as TenantReference,
    type WidgetSession as WidgetSession,
    type WidgetSessionInfo as WidgetSessionInfo,
    type WidgetSessionSpec as WidgetSessionSpec,
    type WidgetSessionDeleteTenantResponse as WidgetSessionDeleteTenantResponse,
    type WidgetSessionsCursorPagination as WidgetSessionsCursorPagination,
    type WidgetSessionCreateParams as WidgetSessionCreateParams,
    type WidgetSessionRetrieveParams as WidgetSessionRetrieveParams,
    type WidgetSessionListParams as WidgetSessionListParams,
    type WidgetSessionDeleteParams as WidgetSessionDeleteParams,
    type WidgetSessionDeleteTenantParams as WidgetSessionDeleteTenantParams,
    type WidgetSessionRevokeParams as WidgetSessionRevokeParams,
  };
}
