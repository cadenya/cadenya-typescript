// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as AgentsAPI from './agents';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Account extends APIResource {
  /**
   * Retrieves the current account for the token accessing the API. Useful to check
   * if the credentials are valid.
   */
  retrieveCurrent(options?: RequestOptions): APIPromise<AccountRetrieveCurrentResponse> {
    return this._client.get('/v1/account', options);
  }
}

export interface AccountRetrieveCurrentResponse {
  /**
   * Standard metadata for all resources
   */
  metadata?: AgentsAPI.ResourceMetadata;

  spec?: AccountRetrieveCurrentResponse.Spec;
}

export namespace AccountRetrieveCurrentResponse {
  export interface Spec {
    billingEmail?: string;

    description?: string;

    domain?: string;
  }
}

export declare namespace Account {
  export { type AccountRetrieveCurrentResponse as AccountRetrieveCurrentResponse };
}
