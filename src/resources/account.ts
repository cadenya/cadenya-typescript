// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as WorkspacesAPI from './workspaces';
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
  setup(params: AccountSetupParams | null | undefined = {}, options?: RequestOptions): APIPromise<Account> {
    const { email, externalUserId, name } = params ?? {};
    return this._client.post('/v1/account/setup', { query: { email, externalUserId, name }, ...options });
  }
}

export interface Account {
  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  metadata?: ResourceMetadata;

  spec?: Account.Spec;
}

export namespace Account {
  export interface Spec {
    billingEmail?: string;

    description?: string;

    domain?: string;

    workspaces?: Array<WorkspacesAPI.Workspace>;
  }
}

/**
 * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
 */
export interface ResourceMetadata {
  /**
   * Unique identifier for the resource (UUID v7)
   */
  id?: string;

  /**
   * Account this resource belongs to for multi-tenant isolation (UUID v7)
   */
  accountId?: string;

  /**
   * ID of the actor (user or service account) that created or last modified this
   * resource (UUID v7)
   */
  actorId?: string;

  /**
   * Optional short identifier for quick reference (e.g., "CSA-1", "email-v2") Useful
   * for agents where a memorable callsign is preferred over long UUIDs
   */
  callsign?: string;

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

  /**
   * Workspace this resource belongs to for organizational grouping (UUID v7)
   */
  workspaceId?: string;
}

export interface AccountSetupParams {
  email?: string;

  externalUserId?: string;

  name?: string;
}

export declare namespace AccountResource {
  export {
    type Account as Account,
    type ResourceMetadata as ResourceMetadata,
    type AccountSetupParams as AccountSetupParams,
  };
}
