// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class AccountResource extends APIResource {
  /**
   * Retrieves the current account for the token accessing the API. Useful to check
   * if the credentials are valid.
   */
  retrieve(options?: RequestOptions): APIPromise<Account> {
    return this._client.get('/v1/account', options);
  }

  /**
   * Setup the account
   */
  setup(body: AccountSetupParams, options?: RequestOptions): APIPromise<AccountSetupResponse> {
    return this._client.post('/v1/account/setup', { body, ...options });
  }
}

export interface Account {
  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  metadata?: Shared.ResourceMetadata;

  spec?: Account.Spec;
}

export namespace Account {
  export interface Spec {
    billingEmail?: string;

    description?: string;

    domain?: string;

    workspaces?: Array<Shared.Workspace>;
  }
}

export interface AccountSetupResponse {
  account?: Account;

  workspace?: Shared.Workspace;
}

export interface AccountSetupParams {
  email?: string;

  externalUserId?: string;

  name?: string;
}

export declare namespace AccountResource {
  export {
    type Account as Account,
    type AccountSetupResponse as AccountSetupResponse,
    type AccountSetupParams as AccountSetupParams,
  };
}
