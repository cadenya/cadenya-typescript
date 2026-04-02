// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as Shared from './shared';
import * as WorkspacesAPI from './workspaces';
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
  metadata: Shared.AccountResourceMetadata;

  spec: AccountSpec;
}

export interface AccountSpec {
  billingEmail?: string;

  description?: string;

  domain?: string;

  workspaces?: Array<WorkspacesAPI.Workspace>;
}

/**
 * Profile represents a human user at the account level. Profiles are
 * account-scoped resources that can be associated with multiple workspaces through
 * the Actor model. Authentication for profiles is handled via SSO/OAuth (WorkOS).
 */
export interface Profile {
  /**
   * AccountResourceMetadata is used to represent a resource that is associated to an
   * account but not to a workspace.
   */
  metadata: Shared.AccountResourceMetadata;

  /**
   * ProfileSpec contains the profile-specific fields
   */
  spec: ProfileSpec;
}

/**
 * ProfileSpec contains the profile-specific fields
 */
export interface ProfileSpec {
  /**
   * Type is the type of profile. User's are humans, API keys are computers. You know
   * the deal.
   */
  type: 'PROFILE_TYPE_USER' | 'PROFILE_TYPE_API_KEY' | 'PROFILE_TYPE_SYSTEM';

  /**
   * Email address of the user (required, unique per account)
   */
  email?: string;

  /**
   * Display name for the user (e.g., "Bobby Tables")
   */
  name?: string;
}

export declare namespace AccountResource {
  export {
    type Account as Account,
    type AccountSpec as AccountSpec,
    type Profile as Profile,
    type ProfileSpec as ProfileSpec,
  };
}
