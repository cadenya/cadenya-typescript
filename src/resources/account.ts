// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Account extends APIResource {
  /**
   * Retrieves the current account for the token accessing the API. Useful to check
   * if the credentials are valid.
   */
  retrieve(options?: RequestOptions): APIPromise<Shared.Account> {
    return this._client.get('/v1/account', options);
  }

  /**
   * Setup the account
   */
  setup(body: AccountSetupParams, options?: RequestOptions): APIPromise<AccountSetupResponse> {
    return this._client.post('/v1/account/setup', { body, ...options });
  }
}

export interface AccountSetupResponse {
  account?: Shared.Account;

  workspace?: Shared.Workspace;
}

export interface AccountSetupParams {
  email?: string;

  externalUserId?: string;

  name?: string;
}

export declare namespace Account {
  export { type AccountSetupResponse as AccountSetupResponse, type AccountSetupParams as AccountSetupParams };
}
