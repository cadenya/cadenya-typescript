// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as AccountAPI from './account';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Ping extends APIResource {
  check(options?: RequestOptions): APIPromise<PingCheckResponse> {
    return this._client.get('/v1/ping', options);
  }
}

export interface PingCheckResponse {
  account?: AccountAPI.Account;

  /**
   * Actor is the "through model" that associates account-level resources (Profiles,
   * API Keys) to specific workspaces. This allows a single Profile or API Key to
   * have access to multiple workspaces while maintaining proper isolation and audit
   * trails.
   *
   * Key relationships:
   *
   * - Actor belongs to both an Account and a Workspace (via ResourceMetadata)
   * - Actor references either a Profile (human) or API Key (machine) via IDs
   * - Every resource creation and operation is tagged with the actor_id
   *
   * Authentication flow:
   *
   * 1.  JWT token is validated and issuer is checked
   * 2.  If issuer is WorkOS -> Profile lookup -> Find/create Actor in workspace
   * 3.  If issuer is Cadenya -> API Key lookup -> Find/create Actor in workspace
   * 4.  All subsequent operations use the actor_id for audit and authorization
   */
  actor?: Shared.Actor;

  /**
   * Has the currently assigned workspace for the request. If need to know which
   * workspace a token is for, reference this field.
   */
  currentWorkspace?: Shared.Workspace;

  /**
   * Indicates if an account needs setup. If you are calling this API with an API
   * key, this will always be true. If it isn't, something has gone horribly wrong.
   */
  needsSetup?: boolean;
}

export declare namespace Ping {
  export { type PingCheckResponse as PingCheckResponse };
}
