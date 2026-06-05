// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as AccountAPI from '../account';
import { ProfilesCursorPagination } from '../account';
import { CursorPagination, type CursorPaginationParams, PagePromise } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';

/**
 * Administer workspaces across the account: create and archive workspaces and
 *  manage their membership. These operations are account-scoped and require the
 *  admin role (a token whose profile holds the WorkOS admin role); they live
 *  under /v1/account/workspaces rather than the workspace-scoped /v1/workspaces
 *  tree so an admin can manage any workspace in the account, including ones they
 *  are not themselves a member of.
 */
export class Profiles extends APIResource {
  /**
   * Searches the account's profiles for a member picker, with free-form name/email
   * search and an optional type filter. Account-scoped; admin only.
   */
  list(
    query: ProfileListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ProfilesCursorPagination, AccountAPI.Profile> {
    return this._client.getAPIList('/v1/account/profiles', CursorPagination<AccountAPI.Profile>, {
      query,
      ...options,
    });
  }
}

export interface ProfileListParams extends CursorPaginationParams {
  /**
   * Free-form search over profile name and email. Case-insensitive substring match;
   * empty returns all profiles (subject to the type filter).
   */
  query?: string;

  /**
   * Filter by profile type. Defaults to all types when unset; pass PROFILE_TYPE_USER
   * to list only human users (the common case for a member picker).
   */
  type?: 'PROFILE_TYPE_USER' | 'PROFILE_TYPE_API_KEY' | 'PROFILE_TYPE_SYSTEM';
}

export declare namespace Profiles {
  export { type ProfileListParams as ProfileListParams };
}

export { type ProfilesCursorPagination };
