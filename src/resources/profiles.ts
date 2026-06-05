// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as AccountAPI from './account';
import { ProfilesCursorPagination } from './account';
import { CursorPagination, type CursorPaginationParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';

/**
 * Read account profiles. Profiles are the account-level principals (users and
 *  API keys) that can be granted access to workspaces.
 */
export class Profiles extends APIResource {
  /**
   * Lists the profiles in the current account. Supports free-form search and a type
   * filter, intended for member-picker UIs (e.g. choosing a profile to add to a
   * workspace).
   */
  list(
    query: ProfileListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ProfilesCursorPagination, AccountAPI.Profile> {
    return this._client.getAPIList('/v1/profiles', CursorPagination<AccountAPI.Profile>, {
      query,
      ...options,
    });
  }
}

export interface ProfileListParams extends CursorPaginationParams {
  /**
   * Free-form search over profile name and email, for member-picker UIs.
   */
  query?: string;

  /**
   * Filter by profile type. Defaults to all types when unset; pass PROFILE_TYPE_USER
   * to list only human users (e.g. for a member picker).
   */
  type?: 'PROFILE_TYPE_USER' | 'PROFILE_TYPE_API_KEY' | 'PROFILE_TYPE_SYSTEM';
}

export declare namespace Profiles {
  export { type ProfileListParams as ProfileListParams };
}

export { type ProfilesCursorPagination };
