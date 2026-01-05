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
}

export interface Account {
  metadata?: Account.Metadata;

  spec?: Account.Spec;
}

export namespace Account {
  export interface Metadata {
    /**
     * Unique identifier for the resource (UUID v7)
     */
    id?: string;

    /**
     * Account this resource belongs to for multi-tenant isolation (UUID v7)
     */
    accountId?: string;

    /**
     * External ID for the resource (e.g., a workflow ID from an external system)
     */
    externalId?: string;

    /**
     * Arbitrary key-value pairs for categorization and filtering Examples:
     * {"environment": "production", "team": "platform", "version": "v2"}
     */
    labels?: { [key: string]: string };

    /**
     * Human-readable name for the resource (e.g., "Customer Support Agent", "Email
     * Tool") Required for resources that users interact with directly
     */
    name?: string;
  }

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
