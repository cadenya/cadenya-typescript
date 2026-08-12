import { APIResource } from '../../core/resource';
import * as TenantsAPI from './tenants';
import { SubjectsCursorPagination } from './tenants';
import { CursorPagination, type CursorPaginationParams, PagePromise } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Read and erase tenants and the subjects under them. Tenants and subjects are
 *  created by assertion — on objective creation or widget session mint — never
 *  directly, so this service has no create or update: it exists to enumerate what
 *  assertions have produced, and to destroy it on request.
 */
export class Subjects extends APIResource {
  /**
   * Lists the subjects asserted under a tenant. Subjects are only listable through
   * their tenant: a subject's external_id is unique within its tenant, not across
   * the workspace, so the same key can name different people under different
   * tenants.
   */
  list(
    tenantID: string,
    params: SubjectListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<SubjectsCursorPagination, TenantsAPI.Subject> {
    const { workspaceId = this._client.workspaceID, ...query } = params ?? {};
    return this._client.getAPIList(
      path`/v1/workspaces/${workspaceId}/tenants/${tenantID}/subjects`,
      CursorPagination<TenantsAPI.Subject>,
      { query, ...options },
    );
  }
}

export interface SubjectListParams extends CursorPaginationParams {
  /**
   * Path param: Workspace ID.
   */
  workspaceId?: string;

  /**
   * Query param: When true, the `info` field on each returned subject is populated.
   */
  includeInfo?: boolean;

  /**
   * Query param: Substring match against the subject's name and external_id.
   */
  query?: string;

  /**
   * Query param: Sort order for results (asc or desc by creation time).
   */
  sortOrder?: string;
}

export declare namespace Subjects {
  export { type SubjectListParams as SubjectListParams };
}

export { type SubjectsCursorPagination };
