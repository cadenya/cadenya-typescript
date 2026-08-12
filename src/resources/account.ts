import { APIResource } from '../core/resource';
import * as Shared from './shared';
import * as WorkspacesAPI from './workspaces';
import { APIPromise } from '../core/api-promise';
import { CursorPagination } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';

/**
 * Manage the authenticated account. Accounts are the top-level organizational
 *  unit and contain one or more workspaces.
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
   * Rotates the challenge token sent in the X-Cadenya-Challenge-Token header on MCP
   * tools/list requests. Returns only the new token.
   */
  rotateChallengeToken(options?: RequestOptions): APIPromise<RotateChallengeTokenResponse> {
    return this._client.post('/v1/account:rotateChallengeToken', options);
  }

  /**
   * Rotates the webhook signing key for the account. Returns only the new key.
   */
  rotateWebhookSigningKey(options?: RequestOptions): APIPromise<RotateWebhookSigningKeyResponse> {
    return this._client.post('/v1/account:rotateWebhookSigningKey', options);
  }
}

export type ProfilesCursorPagination = CursorPagination<Profile>;

/**
 * An account, the top-level organizational unit. Contains workspaces and
 * account-wide settings such as the webhook signing secret.
 */
export interface Account {
  /**
   * Server-populated information about the account.
   */
  info: AccountInfo;

  /**
   * AccountResourceMetadata is used to represent a resource that is associated to an
   * account but not to a workspace.
   */
  metadata: Shared.AccountResourceMetadata;

  /**
   * Configuration for an account.
   */
  spec: AccountSpec;
}

/**
 * Server-populated information about the account.
 */
export interface AccountInfo {
  /**
   * The challenge token Cadenya sends in the X-Cadenya-Challenge-Token header on
   * every MCP tools/list request. Server implementations can accept a valid
   * challenge token in place of per-user auth when listing tools, while still
   * requiring real auth on tools/call. Rotate with RotateChallengeToken; update any
   * servers validating the token before rotating.
   */
  challengeToken?: string;

  /**
   * The generated secret that will sign all webhooks that are sent to your
   * configured Webhook URL. Formatted as "wh_asdf1234" per the
   * https://www.standardwebhooks.com/ format.
   */
  webhookEventsHmacSecret?: string;
}

/**
 * Configuration for an account.
 */
export interface AccountSpec {
  billingEmail?: string;

  description?: string;

  domain?: string;

  workspaces?: Array<WorkspacesAPI.Workspace>;
}

/**
 * A profile identifies a user or non-human principal (such as an API key) at the
 * account level. Profiles are account-scoped and can be granted access to multiple
 * workspaces.
 */
export interface Profile {
  /**
   * AccountResourceMetadata is used to represent a resource that is associated to an
   * account but not to a workspace.
   */
  metadata: Shared.AccountResourceMetadata;

  /**
   * Configuration for a profile.
   */
  spec: ProfileSpec;
}

/**
 * Configuration for a profile.
 */
export interface ProfileSpec {
  /**
   * Whether this profile represents a human user, an API key, or a system principal.
   */
  type: 'PROFILE_TYPE_UNSPECIFIED' | 'PROFILE_TYPE_USER' | 'PROFILE_TYPE_API_KEY' | 'PROFILE_TYPE_SYSTEM';

  /**
   * Email address of the profile. Required and unique within an account for user
   * profiles.
   */
  email?: string;

  /**
   * Display name (e.g., "Bobby Tables").
   */
  name?: string;
}

/**
 * Response containing the newly generated challenge token.
 */
export interface RotateChallengeTokenResponse {
  challengeToken?: string;
}

/**
 * Response containing the newly generated webhook signing secret.
 */
export interface RotateWebhookSigningKeyResponse {
  webhookEventsHmacSecret?: string;
}

export declare namespace AccountResource {
  export {
    type Account as Account,
    type AccountInfo as AccountInfo,
    type AccountSpec as AccountSpec,
    type Profile as Profile,
    type ProfileSpec as ProfileSpec,
    type RotateChallengeTokenResponse as RotateChallengeTokenResponse,
    type RotateWebhookSigningKeyResponse as RotateWebhookSigningKeyResponse,
  };
}
