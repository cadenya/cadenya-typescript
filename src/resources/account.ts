// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

/**
 * AccountService manages account-level operations.
 *  Accounts are the top-level organizational unit in the system.
 *  All operations are scoped to the authenticated account determined by the JWT token.
 *
 *  Authentication: Bearer token (JWT)
 *  Scope: Account-level operations
 */
export class AccountResource extends APIResource {
  /**
   * Retrieves the current account for the token accessing the API. Useful to check
   * if the credentials are valid.
   */
  retrieve(options?: RequestOptions): APIPromise<Account> {
    return this._client.get('/v1/account', options);
  }
}

export interface Account {
  /**
   * AccountResourceMetadata is used to represent a resource that is associated to an
   * account but not to a workspace.
   */
  metadata?: Shared.AccountResourceMetadata;

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

export declare namespace AccountResource {
  export { type Account as Account };
}
