import { APIResource } from '../core/resource';
import * as AccountAPI from './account';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Issue short-lived presigned URLs for direct client-to-object-storage
 *  uploads. Created uploads can be referenced by id when creating or updating
 *  resources that accept binary content (e.g., MemoryEntry).
 */
export class Uploads extends APIResource {
  /**
   * Issues a short-lived presigned URL for direct upload to object storage. The
   * returned id is used to reference the upload from resources that accept binary
   * content.
   */
  create(params: UploadCreateParams, options?: RequestOptions): APIPromise<Upload> {
    const { workspaceId = this._client.workspaceID, ...body } = params;
    return this._client.post(path`/v1/workspaces/${workspaceId}/uploads`, { body, ...options });
  }

  /**
   * Retrieves the current state of an upload, including its lifecycle status
   */
  retrieve(
    id: string,
    params: UploadRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<Upload> {
    const { workspaceId = this._client.workspaceID } = params ?? {};
    return this._client.get(path`/v1/workspaces/${workspaceId}/uploads/${id}`, options);
  }
}

/**
 * A handle representing a single file upload flow. Clients call CreateUpload to
 * receive a short-lived presigned URL, PUT the file directly to object storage,
 * then reference the upload by id when creating or updating resources that accept
 * binary content.
 *
 * Uploads are one-shot: once consumed by a creating or updating resource the
 * upload transitions to UPLOAD_STATUS_CONSUMED and cannot be reused. Unused
 * uploads expire and are garbage-collected.
 */
export interface Upload {
  info: UploadInfo;

  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  metadata: Shared.ResourceMetadata;

  spec: UploadSpec;
}

export interface UploadInfo {
  /**
   * A profile identifies a user or non-human principal (such as an API key) at the
   * account level. Profiles are account-scoped and can be granted access to multiple
   * workspaces.
   */
  createdBy?: AccountAPI.Profile;

  /**
   * Lifecycle state. Transitions PENDING → COMPLETE (storage confirms the object
   * exists) → CONSUMED (a resource referenced this upload), or → EXPIRED (URL
   * elapsed without a PUT).
   */
  status?:
    | 'UPLOAD_STATUS_UNSPECIFIED'
    | 'UPLOAD_STATUS_PENDING'
    | 'UPLOAD_STATUS_COMPLETE'
    | 'UPLOAD_STATUS_CONSUMED'
    | 'UPLOAD_STATUS_EXPIRED';

  /**
   * Presigned PUT URL. Short-lived. The client must PUT with the exact Content-Type
   * declared in the spec, and the body length must match size_bytes.
   */
  uploadUrl?: string;

  /**
   * Absolute time at which upload_url stops working.
   */
  uploadUrlExpiresAt?: string;
}

export interface UploadSpec {
  /**
   * MIME type the client will send. Baked into the presigned URL's signature — the
   * PUT must match exactly or object storage will reject it.
   */
  contentType: string;

  /**
   * Client-supplied filename. Used for audit and display only; does not control the
   * object's storage path.
   */
  filename: string;

  /**
   * Expected size of the upload in bytes. Baked into the presigned URL as a
   * Content-Length constraint.
   */
  sizeBytes: string;
}

export interface UploadCreateParams {
  /**
   * Path param: Workspace ID.
   */
  workspaceId?: string;

  /**
   * Body param: CreateResourceMetadata contains the user-provided fields for
   * creating a workspace-scoped resource. Read-only fields (id, account_id,
   * workspace_id, profile_id, created_at) are excluded since they are set by the
   * server.
   */
  metadata: Shared.CreateResourceMetadata;

  /**
   * Body param
   */
  spec: UploadSpec;
}

export interface UploadRetrieveParams {
  /**
   * Workspace ID.
   */
  workspaceId?: string;
}

export declare namespace Uploads {
  export {
    type Upload as Upload,
    type UploadInfo as UploadInfo,
    type UploadSpec as UploadSpec,
    type UploadCreateParams as UploadCreateParams,
    type UploadRetrieveParams as UploadRetrieveParams,
  };
}
