import { APIResource } from '../../core/resource';
import * as Shared from '../shared';
import * as WidgetSessionsAPI from '../widget-sessions';
import * as SubjectsAPI from './subjects';
import { SubjectListParams, Subjects } from './subjects';
import { APIPromise } from '../../core/api-promise';
import { CursorPagination, type CursorPaginationParams, PagePromise } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Read and erase tenants and the subjects under them. Tenants and subjects are
 *  created by assertion — on objective creation or widget session mint — never
 *  directly, so this service has no create or update: it exists to enumerate what
 *  assertions have produced, and to destroy it on request.
 */
export class Tenants extends APIResource {
  subjects: SubjectsAPI.Subjects = new SubjectsAPI.Subjects(this._client);

  /**
   * Retrieves a tenant by its canonical id or by the `external_id:<value>` form the
   * customer asserted it under.
   */
  retrieve(
    id: string,
    params: TenantRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<Tenant> {
    const { workspaceId = this._client.workspaceID, ...query } = params ?? {};
    return this._client.get(path`/v1/workspaces/${workspaceId}/tenants/${id}`, { query, ...options });
  }

  /**
   * Lists the tenants asserted in a workspace, newest first. `query` matches against
   * a tenant's name and its external_id, for type-ahead filters.
   */
  list(
    params: TenantListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<TenantsCursorPagination, Tenant> {
    const { workspaceId = this._client.workspaceID, ...query } = params ?? {};
    return this._client.getAPIList(path`/v1/workspaces/${workspaceId}/tenants`, CursorPagination<Tenant>, {
      query,
      ...options,
    });
  }

  /**
   * Destroys the tenant, its subjects, every objective associated with it and
   * everything reachable from those objectives, and its widget sessions. This is the
   * full erasure hammer, wider than `DELETE /widget_sessions`, which removes only
   * what widget sessions created. The work runs in the background: this returns the
   * tenant in STATE_ERASING rather than a count of what was removed, since a large
   * tenant's history cannot be destroyed inside a request. Poll the tenant to follow
   * it — STATE_ERASING while it runs, NotFound once it finishes. Erasure is
   * terminal; a tenant cannot be recovered once it starts.
   */
  delete(
    id: string,
    params: TenantDeleteParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<Tenant> {
    const { workspaceId = this._client.workspaceID } = params ?? {};
    return this._client.delete(path`/v1/workspaces/${workspaceId}/tenants/${id}`, options);
  }
}

export type TenantsCursorPagination = CursorPagination<Tenant>;

export type SubjectsCursorPagination = CursorPagination<Subject>;

/**
 * Subject is a person within a tenant as a readable record. Like Tenant it carries
 * no spec — `metadata.external_id` is the customer's key for them, unique within
 * the tenant rather than the workspace.
 */
export interface Subject {
  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  metadata: Shared.ResourceMetadata;

  /**
   * SubjectInfo provides read-only server-derived data about a subject.
   */
  info?: SubjectInfo;
}

/**
 * SubjectInfo provides read-only server-derived data about a subject.
 */
export interface SubjectInfo {
  /**
   * Number of objectives associated with this subject.
   */
  objectiveCount?: number;

  /**
   * TenantReference is the read-only echo of a resource's tenant association,
   * carrying both Cadenya's canonical id and the customer's own key.
   */
  tenant?: WidgetSessionsAPI.TenantReference;
}

/**
 * Tenant is the customer's organization as a readable record rather than an echo.
 * It carries no spec: a tenant is never configured, only asserted, so everything
 * about it lives in the metadata envelope — `external_id` is the key the customer
 * asserted it under, `name` is the most recent name they asserted, and
 * `updated_at` is therefore when the tenant was last asserted.
 */
export interface Tenant {
  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  metadata: Shared.ResourceMetadata;

  /**
   * The current lifecycle state of the tenant. Output only.
   */
  state: 'STATE_UNSPECIFIED' | 'STATE_ACTIVE' | 'STATE_ERASING';

  /**
   * TenantInfo provides read-only server-derived data about a tenant.
   */
  info?: TenantInfo;
}

/**
 * TenantInfo provides read-only server-derived data about a tenant.
 */
export interface TenantInfo {
  /**
   * Number of objectives associated with this tenant, across every surface — widget
   * conversations and objectives created directly against the API alike. This is the
   * footprint a delete would destroy, which is why it is worth the count query that
   * populating `info` costs.
   */
  objectiveCount?: number;

  /**
   * Number of subjects asserted under this tenant.
   */
  subjectCount?: number;

  /**
   * Number of widget sessions minted for this tenant that still exist.
   */
  widgetSessionCount?: number;
}

export interface TenantRetrieveParams {
  /**
   * Path param: Workspace ID.
   */
  workspaceId?: string;

  /**
   * Query param: When true, the `info` field is populated.
   */
  includeInfo?: boolean;
}

export interface TenantListParams extends CursorPaginationParams {
  /**
   * Path param: Workspace ID.
   */
  workspaceId?: string;

  /**
   * Query param: When true, the `info` field on each returned tenant is populated.
   * This costs several count queries per tenant, so it is off by default.
   */
  includeInfo?: boolean;

  /**
   * Query param: Filters by metadata labels. Comma-separated key=value pairs, e.g.
   * "env=prod,team=ai". A resource matches only if every pair matches exactly (AND
   * semantics).
   */
  labels?: string;

  /**
   * Query param: Substring match against the tenant's name and external_id. Built
   * for type-ahead filter pickers, where the operator knows the customer's own
   * identifier rather than Cadenya's.
   */
  query?: string;

  /**
   * Query param: Sort order for results (asc or desc by creation time).
   */
  sortOrder?: string;
}

export interface TenantDeleteParams {
  /**
   * Workspace ID.
   */
  workspaceId?: string;
}

Tenants.Subjects = Subjects;

export declare namespace Tenants {
  export {
    type Subject as Subject,
    type SubjectInfo as SubjectInfo,
    type Tenant as Tenant,
    type TenantInfo as TenantInfo,
    type TenantsCursorPagination as TenantsCursorPagination,
    type TenantRetrieveParams as TenantRetrieveParams,
    type TenantListParams as TenantListParams,
    type TenantDeleteParams as TenantDeleteParams,
  };

  export { Subjects as Subjects, type SubjectListParams as SubjectListParams };
}
