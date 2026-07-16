// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as AccountAPI from '../account';
import * as Shared from '../shared';
import * as AccessAPI from './access';
import { Access, AccessAddParams, AccessListParams, AccessRemoveParams } from './access';
import { APIPromise } from '../../core/api-promise';
import { CursorPagination, type CursorPaginationParams, PagePromise } from '../../core/pagination';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Issue, rotate, and revoke API keys for the account, and grant or revoke
 *  each key's access to individual workspaces.
 */
export class APIKeys extends APIResource {
  access: AccessAPI.Access = new AccessAPI.Access(this._client);

  /**
   * Creates a new API key on the account. Optionally grants the key access to one or
   * more workspaces via initial_workspace_ids.
   */
  create(body: APIKeyCreateParams, options?: RequestOptions): APIPromise<APIKey> {
    return this._client.post('/v1/account/api_keys', { body, ...options });
  }

  /**
   * Retrieves an API key by ID.
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<APIKey> {
    return this._client.get(path`/v1/account/api_keys/${id}`, options);
  }

  /**
   * Updates an API key.
   */
  update(id: string, body: APIKeyUpdateParams, options?: RequestOptions): APIPromise<APIKey> {
    return this._client.patch(path`/v1/account/api_keys/${id}`, { body, ...options });
  }

  /**
   * Lists all API keys on the account.
   */
  list(
    query: APIKeyListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<APIKeysCursorPagination, APIKey> {
    return this._client.getAPIList('/v1/account/api_keys', CursorPagination<APIKey>, { query, ...options });
  }

  /**
   * Deletes an API key.
   */
  delete(id: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/account/api_keys/${id}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Rotates an API key and returns a new token. All previous tokens for this key are
   * invalidated.
   */
  rotate(id: string, body: APIKeyRotateParams, options?: RequestOptions): APIPromise<APIKey> {
    return this._client.post(path`/v1/account/api_keys/${id}:rotate`, { body, ...options });
  }
}

export type APIKeysCursorPagination = CursorPagination<APIKey>;

/**
 * An API key for the account. Use workspace-association RPCs to grant the key
 * access to specific workspaces; a key with zero workspaces is valid but cannot
 * access workspace-scoped resources.
 */
export interface APIKey {
  /**
   * AccountResourceMetadata is used to represent a resource that is associated to an
   * account but not to a workspace.
   */
  metadata: Shared.AccountResourceMetadata;

  /**
   * Configuration for an API key.
   */
  spec: APIKeySpec;

  info?: APIKeyInfo;
}

export interface APIKeyInfo {
  /**
   * A profile identifies a user or non-human principal (such as an API key) at the
   * account level. Profiles are account-scoped and can be granted access to multiple
   * workspaces.
   */
  createdBy?: AccountAPI.Profile;

  /**
   * Up to a small number of workspaces this key has access to, intended for display
   * ("Workspace 1, Workspace 2, and 4 more"). Use ListAPIKeyWorkspaces for the full
   * paginated list.
   */
  workspacesPreview?: Array<Shared.BareMetadata>;

  /**
   * Total number of workspaces this key has access to.
   */
  workspacesTotal?: number;
}

/**
 * Configuration for an API key.
 */
export interface APIKeySpec {
  /**
   * The bearer token used to authenticate as this API key. Returned only on creation
   * and rotation; subsequent reads omit this field.
   */
  token?: string;

  /**
   * Free-form description of what this API key is used for.
   */
  description?: string;

  /**
   * Scopes granted to this key. Each entry is a colon-separated resource:verb string
   * (e.g. "objectives:manage").
   *
   * Resources: agents, objectives, tools, memory, secrets, account. Verbs: read and
   * manage, where manage implies read — a stored scope set is normalized to drop
   * "x:read" when "x:manage" is present. The secrets and account resources support
   * only manage. "\*" is an explicit full-access grant.
   *
   * Scopes are deny-by-default: a key with an empty list can call only scope-free
   * endpoints. Full access is always an explicit "\*" grant.
   */
  permissions?: Array<string>;

  /**
   * True when this key is managed by the system (e.g. the auto-provisioned global
   * account key). System keys cannot be deleted but can be rotated.
   */
  system?: boolean;
}

export interface APIKeyCreateParams {
  /**
   * CreateAccountResourceMetadata contains the user-provided fields for creating an
   * account-scoped resource. Read-only fields (id, account_id, profile_id) are
   * excluded since they are set by the server.
   */
  metadata: APIKeyCreateParams.Metadata;

  /**
   * Configuration for an API key.
   */
  spec: APIKeySpec;

  /**
   * Workspaces this API key will have access to on creation. Optional — a key can be
   * created with no workspace access and granted later via AddAPIKeyWorkspace.
   */
  initialWorkspaceIds?: Array<string>;
}

export namespace APIKeyCreateParams {
  /**
   * CreateAccountResourceMetadata contains the user-provided fields for creating an
   * account-scoped resource. Read-only fields (id, account_id, profile_id) are
   * excluded since they are set by the server.
   */
  export interface Metadata {
    /**
     * Human-readable name for the resource (e.g., "Production API Key", "Staging
     * Workspace")
     */
    name: string;

    /**
     * External ID for the resource (e.g., a workflow ID from an external system)
     */
    externalId?: string;

    /**
     * Key-value pairs for categorization and filtering. Values are 0-63 alphanumeric
     * characters with "-", "\_", or "." allowed between; keys follow the same shape
     * and additionally accept an optional DNS-subdomain prefix (e.g. "cadenya.com/")
     * of at most 253 characters. Examples: {"environment": "production", "team":
     * "platform", "version": "v2"}
     */
    labels?: { [key: string]: string };
  }
}

export interface APIKeyUpdateParams {
  /**
   * UpdateAccountResourceMetadata contains the user-provided fields for updating an
   * account-scoped resource. Read-only fields (id, account_id, profile_id) are
   * excluded since they are set by the server.
   */
  metadata?: APIKeyUpdateParams.Metadata;

  /**
   * Configuration for an API key.
   */
  spec?: APIKeySpec;

  /**
   * Fields to update.
   */
  updateMask?: string;
}

export namespace APIKeyUpdateParams {
  /**
   * UpdateAccountResourceMetadata contains the user-provided fields for updating an
   * account-scoped resource. Read-only fields (id, account_id, profile_id) are
   * excluded since they are set by the server.
   */
  export interface Metadata {
    /**
     * Human-readable name for the resource (e.g., "Production API Key", "Staging
     * Workspace")
     */
    name: string;

    /**
     * External ID for the resource (e.g., a workflow ID from an external system)
     */
    externalId?: string;

    /**
     * Key-value pairs for categorization and filtering. Values are 0-63 alphanumeric
     * characters with "-", "\_", or "." allowed between; keys follow the same shape
     * and additionally accept an optional DNS-subdomain prefix (e.g. "cadenya.com/")
     * of at most 253 characters. Examples: {"environment": "production", "team":
     * "platform", "version": "v2"}
     */
    labels?: { [key: string]: string };
  }
}

export interface APIKeyListParams extends CursorPaginationParams {
  /**
   * When true, included info fields are populated. Requests with this flag count
   * more against your rate limit.
   */
  includeInfo?: boolean;

  /**
   * Filters by metadata labels. Comma-separated key=value pairs, e.g.
   * "env=prod,team=ai". A resource matches only if every pair matches exactly (AND
   * semantics).
   */
  labels?: string;

  /**
   * Filter by ID prefix.
   */
  prefix?: string;

  /**
   * Free-form search query.
   */
  query?: string;

  /**
   * Sort order for results (asc or desc by creation time).
   */
  sortOrder?: string;
}

export interface APIKeyRotateParams {}

APIKeys.Access = Access;

export declare namespace APIKeys {
  export {
    type APIKey as APIKey,
    type APIKeyInfo as APIKeyInfo,
    type APIKeySpec as APIKeySpec,
    type APIKeysCursorPagination as APIKeysCursorPagination,
    type APIKeyCreateParams as APIKeyCreateParams,
    type APIKeyUpdateParams as APIKeyUpdateParams,
    type APIKeyListParams as APIKeyListParams,
    type APIKeyRotateParams as APIKeyRotateParams,
  };

  export {
    Access as Access,
    type AccessListParams as AccessListParams,
    type AccessAddParams as AccessAddParams,
    type AccessRemoveParams as AccessRemoveParams,
  };
}
