import { APIResource } from '../core/resource';
import * as AccountAPI from './account';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { CursorPagination, type CursorPaginationParams, PagePromise } from '../core/pagination';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Issue, rotate, disable, and revoke a workspace's API keys. Every key
 *  belongs to exactly one workspace; the system-managed global account key is
 *  managed via GlobalAPIKeyService instead.
 */
export class APIKeys extends APIResource {
  /**
   * Creates a new API key in the workspace.
   */
  create(params: APIKeyCreateParams, options?: RequestOptions): APIPromise<APIKey> {
    const { workspaceId = this._client.workspaceID, ...body } = params;
    return this._client.post(path`/v1/workspaces/${workspaceId}/api_keys`, { body, ...options });
  }

  /**
   * Retrieves an API key by ID.
   */
  retrieve(
    id: string,
    params: APIKeyRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<APIKey> {
    const { workspaceId = this._client.workspaceID } = params ?? {};
    return this._client.get(path`/v1/workspaces/${workspaceId}/api_keys/${id}`, options);
  }

  /**
   * Updates an API key.
   */
  update(id: string, params: APIKeyUpdateParams, options?: RequestOptions): APIPromise<APIKey> {
    const { workspaceId = this._client.workspaceID, ...body } = params;
    return this._client.patch(path`/v1/workspaces/${workspaceId}/api_keys/${id}`, { body, ...options });
  }

  /**
   * Lists the workspace's API keys.
   */
  list(
    params: APIKeyListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<APIKeysCursorPagination, APIKey> {
    const { workspaceId = this._client.workspaceID, ...query } = params ?? {};
    return this._client.getAPIList(path`/v1/workspaces/${workspaceId}/api_keys`, CursorPagination<APIKey>, {
      query,
      ...options,
    });
  }

  /**
   * Deletes an API key.
   */
  delete(
    id: string,
    params: APIKeyDeleteParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<void> {
    const { workspaceId = this._client.workspaceID } = params ?? {};
    return this._client.delete(path`/v1/workspaces/${workspaceId}/api_keys/${id}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Disables an API key. While disabled, presenting the key's token fails
   * authentication on every endpoint; the key is retained. Idempotent.
   */
  disable(id: string, params: APIKeyDisableParams, options?: RequestOptions): APIPromise<APIKey> {
    const { workspaceId = this._client.workspaceID, ...body } = params;
    return this._client.post(path`/v1/workspaces/${workspaceId}/api_keys/${id}:disable`, {
      body,
      ...options,
    });
  }

  /**
   * Re-enables a disabled API key so its token authenticates again. Idempotent.
   */
  enable(id: string, params: APIKeyEnableParams, options?: RequestOptions): APIPromise<APIKey> {
    const { workspaceId = this._client.workspaceID, ...body } = params;
    return this._client.post(path`/v1/workspaces/${workspaceId}/api_keys/${id}:enable`, { body, ...options });
  }

  /**
   * Rotates an API key and returns a new token. All previous tokens for this key are
   * invalidated.
   */
  rotate(id: string, params: APIKeyRotateParams, options?: RequestOptions): APIPromise<APIKey> {
    const { workspaceId = this._client.workspaceID, ...body } = params;
    return this._client.post(path`/v1/workspaces/${workspaceId}/api_keys/${id}:rotate`, { body, ...options });
  }
}

export type APIKeysCursorPagination = CursorPagination<APIKey>;

/**
 * An API key. Every key belongs to exactly one workspace and is managed via the
 * workspace-scoped API key routes. The only exception is the system-managed global
 * account key, which spans all workspaces and is managed via the account
 * global_api_key routes.
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

  /**
   * The current lifecycle state of the API key. Output only. Keys are created
   * STATE_ENABLED; use the :disable and :enable actions to transition between
   * states.
   */
  state: 'STATE_UNSPECIFIED' | 'STATE_ENABLED' | 'STATE_DISABLED';

  info?: APIKeyInfo;
}

export interface APIKeyInfo {
  /**
   * A profile identifies a user or non-human principal (such as an API key) at the
   * account level. Profiles are account-scoped and can be granted access to multiple
   * workspaces.
   */
  createdBy?: AccountAPI.Profile;
}

/**
 * Configuration for an API key.
 */
export interface APIKeySpec {
  /**
   * The bearer token used to authenticate as this API key. Returned only on creation
   * and rotation; subsequent reads omit this field.
   */
  token: string;

  /**
   * Free-form description of what this API key is used for.
   */
  description?: string;

  /**
   * Scopes granted to this key. Each entry is a colon-separated resource:verb string
   * (e.g. "objectives:manage").
   *
   * Resources: agents, objectives, tools, memory, api_keys, workspaces, widgets,
   * widget_sessions, secrets, account. Verbs: read and manage, where manage implies
   * read — a stored scope set is normalized to drop "x:read" when "x:manage" is
   * present. The secrets and account resources support only manage. "\*" is an
   * explicit full-access grant.
   *
   * Scopes are deny-by-default: a key with an empty list can call only scope-free
   * endpoints. Full access is always an explicit "\*" grant.
   */
  permissions?: Array<string>;

  /**
   * True when this key is managed by the system (i.e. the auto-provisioned global
   * account key). System keys cannot be deleted but can be rotated.
   */
  system: boolean;
}

export interface APIKeyCreateParams {
  /**
   * Path param: The workspace this API key belongs to (path).
   */
  workspaceId?: string;

  /**
   * Body param: CreateAccountResourceMetadata contains the user-provided fields for
   * creating an account-scoped resource. Read-only fields (id, account_id,
   * profile_id) are excluded since they are set by the server.
   */
  metadata: APIKeyCreateParams.Metadata;

  /**
   * Body param: Configuration for an API key.
   */
  spec: APIKeySpec;
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

export interface APIKeyRetrieveParams {
  /**
   * The workspace the API key belongs to (path).
   */
  workspaceId?: string;
}

export interface APIKeyUpdateParams {
  /**
   * Path param: The workspace the API key belongs to (path).
   */
  workspaceId?: string;

  /**
   * Body param: UpdateAccountResourceMetadata contains the user-provided fields for
   * updating an account-scoped resource. Read-only fields (id, account_id,
   * profile_id) are excluded since they are set by the server.
   */
  metadata?: APIKeyUpdateParams.Metadata;

  /**
   * Body param: Configuration for an API key.
   */
  spec?: APIKeySpec;

  /**
   * Body param: Fields to update.
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
   * Path param: The workspace whose API keys will be listed (path).
   */
  workspaceId?: string;

  /**
   * Query param: When true, included info fields are populated. Requests with this
   * flag count more against your rate limit.
   */
  includeInfo?: boolean;

  /**
   * Query param: Filters by metadata labels. Comma-separated key=value pairs, e.g.
   * "env=prod,team=ai". A resource matches only if every pair matches exactly (AND
   * semantics).
   */
  labels?: string;

  /**
   * Query param: Filter by ID prefix.
   */
  prefix?: string;

  /**
   * Query param: Free-form search query.
   */
  query?: string;

  /**
   * Query param: Sort order for results (asc or desc by creation time).
   */
  sortOrder?: string;
}

export interface APIKeyDeleteParams {
  /**
   * The workspace the API key belongs to (path).
   */
  workspaceId?: string;
}

export interface APIKeyDisableParams {
  /**
   * The workspace the API key belongs to (path).
   */
  workspaceId?: string;
}

export interface APIKeyEnableParams {
  /**
   * The workspace the API key belongs to (path).
   */
  workspaceId?: string;
}

export interface APIKeyRotateParams {
  /**
   * The workspace the API key belongs to (path).
   */
  workspaceId?: string;
}

export declare namespace APIKeys {
  export {
    type APIKey as APIKey,
    type APIKeyInfo as APIKeyInfo,
    type APIKeySpec as APIKeySpec,
    type APIKeysCursorPagination as APIKeysCursorPagination,
    type APIKeyCreateParams as APIKeyCreateParams,
    type APIKeyRetrieveParams as APIKeyRetrieveParams,
    type APIKeyUpdateParams as APIKeyUpdateParams,
    type APIKeyListParams as APIKeyListParams,
    type APIKeyDeleteParams as APIKeyDeleteParams,
    type APIKeyDisableParams as APIKeyDisableParams,
    type APIKeyEnableParams as APIKeyEnableParams,
    type APIKeyRotateParams as APIKeyRotateParams,
  };
}
