import { HttpClient, RequestOptions, APIPromise } from '../core/http.js';
import { Page } from '../core/pagination.js';
import type { CreateAccountResourceMetadata, Profile, UpdateAccountResourceMetadata, Workspace, WorkspaceMember, WorkspaceSpec } from '../types.js';
export interface WorkspaceAdminListProfilesParams {
    /**
     * Maximum number of results to return
     */
    limit?: number;
    /**
     * Pagination cursor from previous response
     */
    cursor?: string;
    /**
     * Free-form search over profile name and email. Case-insensitive substring
     *  match; empty returns all profiles.
     */
    query?: string;
    /**
     * Filters by metadata labels. Comma-separated key=value pairs,
     *  e.g. "env=prod,team=ai". A resource matches only if every pair
     *  matches exactly (AND semantics).
     */
    labels?: string;
}
export interface WorkspaceAdminListAccountParams {
    /**
     * Maximum number of results to return
     */
    limit?: number;
    /**
     * Pagination cursor from previous response
     */
    cursor?: string;
    /**
     * When true, archived workspaces are included in the results. Defaults to
     *  false (active workspaces only).
     */
    includeArchived?: boolean;
    /**
     * Filters by metadata labels. Comma-separated key=value pairs,
     *  e.g. "env=prod,team=ai". A resource matches only if every pair
     *  matches exactly (AND semantics).
     */
    labels?: string;
}
export interface WorkspaceAdminCreateParams {
    metadata: CreateAccountResourceMetadata;
    spec: WorkspaceSpec;
}
export interface WorkspaceAdminRetrieveParams {
    /**
     * Workspace ID to retrieve (path).
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
}
export interface WorkspaceAdminArchiveParams {
    /**
     * Workspace ID to archive (path).
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
}
export interface WorkspaceAdminUpdateParams {
    /**
     * Workspace ID to update (path).
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
    metadata?: UpdateAccountResourceMetadata;
    spec?: WorkspaceSpec;
    /**
     * Fields to update.
     */
    updateMask?: string;
}
export interface WorkspaceAdminListMembersParams {
    /**
     * The workspace whose members will be listed (path).
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
    /**
     * Maximum number of results to return
     */
    limit?: number;
    /**
     * Pagination cursor from previous response
     */
    cursor?: string;
}
export interface WorkspaceAdminAddMemberParams {
    /**
     * The workspace to add the member to (path).
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
    /**
     * An existing account profile to add. Mutually exclusive with email.
     */
    profileId?: string;
    /**
     * Email address to add (resolve-or-invite). Mutually exclusive with profile_id.
     */
    email?: string;
}
export interface WorkspaceAdminRemoveMemberParams {
    /**
     * The workspace to remove the member from (path).
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
}
export declare class WorkspaceAdmin {
    private readonly _client;
    constructor(_client: HttpClient);
    /**
     * Search account profiles
     *
     * @example
     * ```ts
     * const page = await client.workspaceAdmin.listProfiles();
     * for await (const item of page) {
     *   // auto-fetches every page
     * }
     * ```
     */
    listProfiles(params?: WorkspaceAdminListProfilesParams, options?: RequestOptions): Promise<Page<Profile>>;
    /**
     * List all workspaces in the account
     *
     * @example
     * ```ts
     * const page = await client.workspaceAdmin.listAccount();
     * for await (const item of page) {
     *   // auto-fetches every page
     * }
     * ```
     */
    listAccount(params?: WorkspaceAdminListAccountParams, options?: RequestOptions): Promise<Page<Workspace>>;
    /**
     * Create a workspace
     *
     * @example
     * ```ts
     * const workspace = await client.workspaceAdmin.create({ metadata: { name: 'sample' }, spec: {  } });
     * ```
     */
    create(params: WorkspaceAdminCreateParams, options?: RequestOptions): APIPromise<Workspace>;
    /**
     * Get a workspace by ID
     *
     * @example
     * ```ts
     * const workspace = await client.workspaceAdmin.retrieve();
     * ```
     */
    retrieve(params?: WorkspaceAdminRetrieveParams, options?: RequestOptions): APIPromise<Workspace>;
    /**
     * Archive a workspace
     *
     * @example
     * ```ts
     * await client.workspaceAdmin.archive();
     * ```
     */
    archive(params?: WorkspaceAdminArchiveParams, options?: RequestOptions): APIPromise<void>;
    /**
     * Update a workspace
     *
     * @example
     * ```ts
     * const workspace = await client.workspaceAdmin.update();
     * ```
     */
    update(params?: WorkspaceAdminUpdateParams, options?: RequestOptions): APIPromise<Workspace>;
    /**
     * List workspace members
     *
     * @example
     * ```ts
     * const page = await client.workspaceAdmin.listMembers();
     * for await (const item of page) {
     *   // auto-fetches every page
     * }
     * ```
     */
    listMembers(params?: WorkspaceAdminListMembersParams, options?: RequestOptions): Promise<Page<WorkspaceMember>>;
    /**
     * Add a member to a workspace
     *
     * @example
     * ```ts
     * const workspaceMember = await client.workspaceAdmin.addMember();
     * ```
     */
    addMember(params?: WorkspaceAdminAddMemberParams, options?: RequestOptions): APIPromise<WorkspaceMember>;
    /**
     * Remove a member from a workspace
     *
     * @example
     * ```ts
     * await client.workspaceAdmin.removeMember('profile_123');
     * ```
     */
    removeMember(profileId: string, params?: WorkspaceAdminRemoveMemberParams, options?: RequestOptions): APIPromise<void>;
}
//# sourceMappingURL=workspace-admin.d.ts.map