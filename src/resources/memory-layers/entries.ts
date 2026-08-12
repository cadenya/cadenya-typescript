import { APIResource } from '../../core/resource';
import * as AccountAPI from '../account';
import * as Shared from '../shared';
import { APIPromise } from '../../core/api-promise';
import { CursorPagination, type CursorPaginationParams, PagePromise } from '../../core/pagination';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Manage memory layers and their entries. Layers are named containers that can
 *  be composed into an objective's memory cascade; entries are the keyed values
 *  within a layer. System-managed layers (e.g., episodic layers created by the
 *  runtime) cannot be mutated through this API.
 */
export class Entries extends APIResource {
  /**
   * Creates a new entry in a memory layer. Returns the detail view, including the
   * resolved content body.
   */
  create(
    memoryLayerID: string,
    params: EntryCreateParams,
    options?: RequestOptions,
  ): APIPromise<MemoryEntryDetail> {
    const { workspaceId = this._client.workspaceID, ...body } = params;
    return this._client.post(path`/v1/workspaces/${workspaceId}/memory_layers/${memoryLayerID}/entries`, {
      body,
      ...options,
    });
  }

  /**
   * Retrieves a memory entry by ID from a memory layer. Returns the detail view,
   * including the content body.
   */
  retrieve(
    memoryLayerID: string,
    id: string,
    params: EntryRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<MemoryEntryDetail> {
    const { workspaceId = this._client.workspaceID } = params ?? {};
    return this._client.get(
      path`/v1/workspaces/${workspaceId}/memory_layers/${memoryLayerID}/entries/${id}`,
      options,
    );
  }

  /**
   * Updates a memory entry in a memory layer. Returns the detail view, including the
   * resolved content body.
   */
  update(
    memoryLayerID: string,
    id: string,
    params: EntryUpdateParams,
    options?: RequestOptions,
  ): APIPromise<MemoryEntryDetail> {
    const { workspaceId = this._client.workspaceID, ...body } = params;
    return this._client.patch(
      path`/v1/workspaces/${workspaceId}/memory_layers/${memoryLayerID}/entries/${id}`,
      { body, ...options },
    );
  }

  /**
   * Lists all entries in a memory layer
   */
  list(
    memoryLayerID: string,
    params: EntryListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<MemoryEntriesCursorPagination, MemoryEntry> {
    const { workspaceId = this._client.workspaceID, ...query } = params ?? {};
    return this._client.getAPIList(
      path`/v1/workspaces/${workspaceId}/memory_layers/${memoryLayerID}/entries`,
      CursorPagination<MemoryEntry>,
      { query, ...options },
    );
  }

  /**
   * Deletes a memory entry from a memory layer
   */
  delete(
    memoryLayerID: string,
    id: string,
    params: EntryDeleteParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<void> {
    const { workspaceId = this._client.workspaceID } = params ?? {};
    return this._client.delete(
      path`/v1/workspaces/${workspaceId}/memory_layers/${memoryLayerID}/entries/${id}`,
      { ...options, headers: buildHeaders([{ Accept: '*/*' }, options?.headers]) },
    );
  }
}

export type MemoryEntriesCursorPagination = CursorPagination<MemoryEntry>;

/**
 * MemoryEntry is a single keyed value within a MemoryLayer. Entries are addressed
 * by their key, which follows the S3 object key safe-character convention (see
 * MemoryEntrySpec.key for the full rule). Keys are unique within a single layer;
 * the same key may appear in multiple layers, in which case the cascade walk
 * determines which one wins for a given objective (most specific layer first).
 *
 * MemoryEntry is the summary shape, returned by ListMemoryEntries. It does not
 * carry the entry body — callers that need the body must fetch the entry
 * individually via GetMemoryEntry, which returns a MemoryEntryDetail.
 */
export interface MemoryEntry {
  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  metadata: Shared.ResourceMetadata;

  /**
   * MemoryEntrySpec is the metadata portion of an entry — the fields that identify
   * and describe it, without the body. It appears on both the summary (MemoryEntry)
   * and detail (MemoryEntryDetail) views.
   */
  spec: MemoryEntrySpec;

  info?: MemoryEntryInfo;
}

/**
 * MemoryEntryCreateSpec is the input shape for CreateMemoryEntry. It accepts
 * either inline content or a reference to a completed Upload; exactly one of the
 * two must be set.
 */
export type MemoryEntryCreateSpec = MemoryEntryCreateSpecContent | MemoryEntryCreateSpecUploadID;

export interface MemoryEntryCreateSpecContent {
  /**
   * Inline content, written directly into the entry.
   */
  content: string;

  type: 'content';

  description?: string;

  /**
   * See MemoryEntrySpec.key for the full rule set. Same constraints apply here.
   */
  key?: string;
}

export interface MemoryEntryCreateSpecUploadID {
  type: 'uploadId';

  /**
   * ID of a COMPLETE Upload. The server reads the object from storage, copies its
   * bytes into the entry, and marks the upload consumed.
   */
  uploadId: string;

  description?: string;

  /**
   * See MemoryEntrySpec.key for the full rule set. Same constraints apply here.
   */
  key?: string;
}

/**
 * MemoryEntryDetail is the full representation of an entry, including the resolved
 * content body. Returned by GetMemoryEntry, CreateMemoryEntry, and
 * UpdateMemoryEntry.
 */
export interface MemoryEntryDetail {
  /**
   * The resolved body of the entry. For entries created or updated via an upload_id,
   * this is the ingested content, not the original upload handle. May be empty; an
   * entry with only a key and description is valid (e.g., a stub skill being
   * drafted, or an entry where the frontmatter alone is the payload).
   */
  content: string;

  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  metadata: Shared.ResourceMetadata;

  /**
   * MemoryEntrySpec is the metadata portion of an entry — the fields that identify
   * and describe it, without the body. It appears on both the summary (MemoryEntry)
   * and detail (MemoryEntryDetail) views.
   */
  spec: MemoryEntrySpec;

  info?: MemoryEntryInfo;
}

export interface MemoryEntryInfo {
  /**
   * A profile identifies a user or non-human principal (such as an API key) at the
   * account level. Profiles are account-scoped and can be granted access to multiple
   * workspaces.
   */
  createdBy?: AccountAPI.Profile;

  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  memoryLayer?: Shared.ResourceMetadata;
}

/**
 * MemoryEntrySpec is the metadata portion of an entry — the fields that identify
 * and describe it, without the body. It appears on both the summary (MemoryEntry)
 * and detail (MemoryEntryDetail) views.
 */
export interface MemoryEntrySpec {
  /**
   * The lookup key for this entry within its layer. Must conform to the S3 object
   * key safe-characters spec: ASCII alphanumerics and the special characters !, -,
   * \_, ., \*, ', (, ), and /. Forward slashes may be used to suggest hierarchy
   * (e.g., "skills/postmortem/write"), but lookups are flat — the key is a single
   * opaque string, not a path.
   *
   * Additional rules enforced by the service:
   *
   * - May not begin or end with /
   * - May not contain consecutive slashes (//)
   * - May not begin with reserved prefixes (cadenya/, system/)
   * - Case-sensitive
   * - Unique within the parent layer
   *
   * For skills entries, this key is what the model passes to get_memory to load the
   * entry's content.
   */
  key: string;

  /**
   * One-line "when to use this" hint shown in the frontmatter manifest for skills
   * entries. The model uses this to decide whether to load the body, so it should be
   * written for the model as the audience. Ignored for layer types that do not
   * advertise frontmatter.
   */
  description?: string;
}

/**
 * MemoryEntryUpdateSpec is the input shape for UpdateMemoryEntry. Fields present
 * in the request's update_mask are applied; unset fields are left alone. The
 * source oneof is optional for updates — omit it to leave the body untouched, or
 * set exactly one branch to replace it.
 */
export interface MemoryEntryUpdateSpec {
  content?: string;

  description?: string;

  key?: string;

  uploadId?: string;
}

export interface EntryCreateParams {
  /**
   * Path param
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
   * Body param: MemoryEntryCreateSpec is the input shape for CreateMemoryEntry. It
   * accepts either inline content or a reference to a completed Upload; exactly one
   * of the two must be set.
   */
  spec: MemoryEntryCreateSpec;
}

export interface EntryRetrieveParams {
  workspaceId?: string;
}

export interface EntryUpdateParams {
  /**
   * Path param
   */
  workspaceId?: string;

  /**
   * Body param: UpdateResourceMetadata contains the user-provided fields for
   * updating a workspace-scoped resource. Read-only fields (id, account_id,
   * workspace_id, profile_id, created_at) are excluded since they are set by the
   * server.
   */
  metadata?: Shared.UpdateResourceMetadata;

  /**
   * Body param: MemoryEntryUpdateSpec is the input shape for UpdateMemoryEntry.
   * Fields present in the request's update_mask are applied; unset fields are left
   * alone. The source oneof is optional for updates — omit it to leave the body
   * untouched, or set exactly one branch to replace it.
   */
  spec?: MemoryEntryUpdateSpec;

  /**
   * Body param
   */
  updateMask?: string;
}

export interface EntryListParams extends CursorPaginationParams {
  /**
   * Path param
   */
  workspaceId?: string;

  /**
   * Query param: When set to true you may use more of your alloted API rate-limit
   */
  includeInfo?: boolean;

  /**
   * Query param: Filters by metadata labels. Comma-separated key=value pairs, e.g.
   * "env=prod,team=ai". A resource matches only if every pair matches exactly (AND
   * semantics).
   */
  labels?: string;

  /**
   * Query param: Filter by key prefix (e.g., "skills/postmortem/" to list all
   * entries under that hierarchy). Matches against the entry's key, not its name.
   */
  prefix?: string;

  /**
   * Query param: Free-form search query
   */
  query?: string;

  /**
   * Query param: Sort order for results (asc or desc by creation time)
   */
  sortOrder?: string;
}

export interface EntryDeleteParams {
  workspaceId?: string;
}

export declare namespace Entries {
  export {
    type MemoryEntry as MemoryEntry,
    type MemoryEntryCreateSpec as MemoryEntryCreateSpec,
    type MemoryEntryCreateSpecContent as MemoryEntryCreateSpecContent,
    type MemoryEntryCreateSpecUploadID as MemoryEntryCreateSpecUploadID,
    type MemoryEntryDetail as MemoryEntryDetail,
    type MemoryEntryInfo as MemoryEntryInfo,
    type MemoryEntrySpec as MemoryEntrySpec,
    type MemoryEntryUpdateSpec as MemoryEntryUpdateSpec,
    type MemoryEntriesCursorPagination as MemoryEntriesCursorPagination,
    type EntryCreateParams as EntryCreateParams,
    type EntryRetrieveParams as EntryRetrieveParams,
    type EntryUpdateParams as EntryUpdateParams,
    type EntryListParams as EntryListParams,
    type EntryDeleteParams as EntryDeleteParams,
  };
}
