import { APIResource } from '../core/resource';
import * as Shared from './shared';
import { CursorPagination, type CursorPaginationParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';

/**
 * Manage workspaces within an account. Workspaces provide organizational
 *  grouping and isolation for resources such as agents, tools, and API keys.
 *
 *  This is the workspace-scoped, end-user surface. Administrative operations
 *  (create / archive workspaces, manage members) live in WorkspaceAdminService
 *  under /v1/account/workspaces and require the admin role.
 */
export class Workspaces extends APIResource {
  /**
   * Lists all workspaces for the current account
   */
  list(
    query: WorkspaceListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<WorkspacesCursorPagination, Workspace> {
    return this._client.getAPIList('/v1/workspaces', CursorPagination<Workspace>, { query, ...options });
  }
}

export type WorkspacesCursorPagination = CursorPagination<Workspace>;

export interface Workspace {
  /**
   * AccountResourceMetadata is used to represent a resource that is associated to an
   * account but not to a workspace.
   */
  metadata: Shared.AccountResourceMetadata;

  spec: WorkspaceSpec;

  /**
   * WorkspaceInfo returns counts
   */
  info?: Workspace.Info;

  /**
   * Lifecycle status of the workspace. Archived workspaces reject all requests
   * scoped to them. Server-populated.
   */
  status?: 'STATUS_ENABLED' | 'STATUS_DISABLED' | 'STATUS_ARCHIVED';
}

export namespace Workspace {
  /**
   * WorkspaceInfo returns counts
   */
  export interface Info {
    totalAgents?: number;

    totalAgentVariations?: number;

    totalAvailableTools?: number;

    totalMemoryEntries?: number;
  }
}

export interface WorkspaceSpec {
  description?: string;
}

export interface WorkspaceListParams extends CursorPaginationParams {
  /**
   * When set to true you may use more of your alloted API rate-limit
   */
  includeInfo?: boolean;

  /**
   * Filters by metadata labels. Comma-separated key=value pairs, e.g.
   * "env=prod,team=ai". A resource matches only if every pair matches exactly (AND
   * semantics).
   */
  labels?: string;

  /**
   * Sort order for results (asc or desc by creation time)
   */
  sortOrder?: string;
}

export declare namespace Workspaces {
  export {
    type Workspace as Workspace,
    type WorkspaceSpec as WorkspaceSpec,
    type WorkspacesCursorPagination as WorkspacesCursorPagination,
    type WorkspaceListParams as WorkspaceListParams,
  };
}
