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

  actor?: Shared.Actor;

  /**
   * Has the currently assigned workspace for the request. If need to know which
   * workspace a token is for, reference this field.
   */
  current_workspace?: Shared.Workspace;

  /**
   * Indicates if an account needs setup. If you are calling this API with an API
   * key, this will always be true. If it isn't, something has gone horribly wrong.
   */
  needs_setup?: boolean;
}

export declare namespace Ping {
  export { type PingCheckResponse as PingCheckResponse };
}
