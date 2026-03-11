// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { CursorPagination, type CursorPaginationParams, PagePromise } from '../core/pagination';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * DocumentService manages document namespaces and documents at the WORKSPACE level.
 *  Document namespaces categorize documents for use cases such as customer-specific
 *  documents, regionalized documentation, and agent-created episodic memories.
 *  Documents are key primitives of the platform containing knowledge as inline content
 *  or remote sources. Each document belongs to exactly one namespace.
 *  All operations are implicitly scoped to the workspace determined by the JWT token.
 *
 *  Authentication: Bearer token (JWT)
 *  Scope: Workspace-level operations
 */
export class DocumentNamespaces extends APIResource {
  /**
   * Creates a new document namespace in the workspace
   */
  create(body: DocumentNamespaceCreateParams, options?: RequestOptions): APIPromise<DocumentNamespace> {
    return this._client.post('/v1/document_namespaces', { body, ...options });
  }

  /**
   * Retrieves a document namespace by ID from the workspace
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<DocumentNamespace> {
    return this._client.get(path`/v1/document_namespaces/${id}`, options);
  }

  /**
   * Updates a document namespace in the workspace
   */
  update(
    id: string,
    body: DocumentNamespaceUpdateParams,
    options?: RequestOptions,
  ): APIPromise<DocumentNamespace> {
    return this._client.patch(path`/v1/document_namespaces/${id}`, { body, ...options });
  }

  /**
   * Lists all document namespaces in the workspace
   */
  list(
    query: DocumentNamespaceListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<DocumentNamespacesCursorPagination, DocumentNamespace> {
    return this._client.getAPIList('/v1/document_namespaces', CursorPagination<DocumentNamespace>, {
      query,
      ...options,
    });
  }

  /**
   * Deletes a document namespace from the workspace
   */
  delete(id: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/document_namespaces/${id}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export type DocumentNamespacesCursorPagination = CursorPagination<DocumentNamespace>;

/**
 * DocumentNamespace is a container that categorizes and organizes documents.
 * Namespaces support use cases such as customer-specific documents, regionalized
 * documentation, and agent-created episodic memories. A namespace can hold
 * thousands of documents, and each document belongs to exactly one namespace.
 */
export interface DocumentNamespace {
  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  metadata: Shared.ResourceMetadata;

  /**
   * DocumentNamespaceSpec defines the properties of a document namespace.
   */
  spec: DocumentNamespaceSpec;

  info?: DocumentNamespace.Info;
}

export namespace DocumentNamespace {
  export interface Info {
    /**
     * Profile represents a human user at the account level. Profiles are
     * account-scoped resources that can be associated with multiple workspaces through
     * the Actor model. Authentication for profiles is handled via SSO/OAuth (WorkOS).
     */
    createdBy?: Shared.Profile;

    documentCount?: number;
  }
}

/**
 * DocumentNamespaceSpec defines the properties of a document namespace.
 */
export interface DocumentNamespaceSpec {
  /**
   * Status of the document namespace
   */
  status:
    | 'DOCUMENT_STATUS_UNSPECIFIED'
    | 'DOCUMENT_STATUS_ENABLED'
    | 'DOCUMENT_STATUS_DISABLED'
    | 'DOCUMENT_STATUS_ARCHIVED';

  /**
   * Human-readable summary describing the purpose of this namespace
   */
  summary?: string;
}

export interface DocumentNamespaceCreateParams {
  /**
   * CreateResourceMetadata contains the user-provided fields for creating a
   * workspace-scoped resource. Read-only fields (id, account_id, workspace_id,
   * profile_id, created_at) are excluded since they are set by the server.
   */
  metadata: Shared.CreateResourceMetadata;

  /**
   * DocumentNamespaceSpec defines the properties of a document namespace.
   */
  spec: DocumentNamespaceSpec;
}

export interface DocumentNamespaceUpdateParams {
  /**
   * UpdateResourceMetadata contains the user-provided fields for updating a
   * workspace-scoped resource. Read-only fields (id, account_id, workspace_id,
   * profile_id, created_at) are excluded since they are set by the server.
   */
  metadata?: Shared.UpdateResourceMetadata;

  /**
   * DocumentNamespaceSpec defines the properties of a document namespace.
   */
  spec?: DocumentNamespaceSpec;

  /**
   * Fields to update (if empty, all fields are updated)
   */
  updateMask?: string;
}

export interface DocumentNamespaceListParams extends CursorPaginationParams {
  /**
   * When set to true you may use more of your alloted API rate-limit
   */
  includeInfo?: boolean;
}

export declare namespace DocumentNamespaces {
  export {
    type DocumentNamespace as DocumentNamespace,
    type DocumentNamespaceSpec as DocumentNamespaceSpec,
    type DocumentNamespacesCursorPagination as DocumentNamespacesCursorPagination,
    type DocumentNamespaceCreateParams as DocumentNamespaceCreateParams,
    type DocumentNamespaceUpdateParams as DocumentNamespaceUpdateParams,
    type DocumentNamespaceListParams as DocumentNamespaceListParams,
  };
}
