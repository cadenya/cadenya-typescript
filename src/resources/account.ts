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

  /**
   * Rotates the webhook signing key for the account. Returns only the new key.
   */
  rotateWebhookSigningKey(options?: RequestOptions): APIPromise<RotateWebhookSigningKeyResponse> {
    return this._client.post('/v1/account/rotate_webhook_signing_key', options);
  }
}

/**
 * Account is an account resource.
 */
export interface Account {
  /**
   * AccountInfo contains information about the account.
   */
  info: Account.Info;

  /**
   * AccountResourceMetadata is used to represent a resource that is associated to an
   * account but not to a workspace.
   */
  metadata: Shared.AccountResourceMetadata;

  /**
   * AccountSpec contains the specification for an account.
   */
  spec: AccountSpec;
}

export namespace Account {
  /**
   * AccountInfo contains information about the account.
   */
  export interface Info {
    /**
     * The generated secret that will sign all webhooks that are sent to your
     * configured Webhook URL. Formatted as "wh_asdf1234" per the
     * https://www.standardwebhooks.com/ format.
     */
    webhookEventsHmacSecret?: string;
  }
}

/**
 * AccountSpec contains the specification for an account.
 */
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

/**
 * RotateWebhookEventsHmacSecretResponse is a response to a
 * RotateWebhookEventsHmacSecretRequest.
 */
export interface RotateWebhookSigningKeyResponse {
  webhookEventsHmacSecret?: string;
}

export declare namespace AccountResource {
  export {
    type Account as Account,
    type AccountSpec as AccountSpec,
    type Profile as Profile,
    type ProfileSpec as ProfileSpec,
    type RotateWebhookSigningKeyResponse as RotateWebhookSigningKeyResponse,
  };
}
