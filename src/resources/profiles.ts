// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as AccountAPI from './account';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

/**
 * Operations on profiles, the account-level principals (users, API keys,
 *  system) that authenticate against the API.
 */
export class Profiles extends APIResource {
  /**
   * Retrieves the profile of the authenticated caller. Useful to check which
   * principal a token belongs to.
   */
  whoami(options?: RequestOptions): APIPromise<AccountAPI.Profile> {
    return this._client.get('/v1/whoami', options);
  }
}
