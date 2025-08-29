// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
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

/**
 * Standard metadata for all resources
 */
export interface ResourceMetadata {
  /**
   * Unique identifier for the resource
   */
  id?: string;

  /**
   * Account this resource belongs to
   */
  accountId?: string;

  /**
   * Optional human-readable identifier (e.g., callsign for agents)
   */
  callsign?: string;

  labels?: { [key: string]: string };

  name?: string;

  /**
   * Workspace this resource belongs to
   */
  workspaceId?: string;
}

export interface AccountRetrieveCurrentResponse {
  /**
   * Standard metadata for all resources
   */
  metadata?: ResourceMetadata;

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
  export {
    type ResourceMetadata as ResourceMetadata,
    type AccountRetrieveCurrentResponse as AccountRetrieveCurrentResponse,
  };
}
