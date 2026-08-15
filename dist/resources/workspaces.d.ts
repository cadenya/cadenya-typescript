import { HttpClient, RequestOptions } from '../core/http.js';
import { Page } from '../core/pagination.js';
import type { Workspace } from '../types.js';
export interface WorkspaceListParams {
    /**
     * Maximum number of results to return
     */
    limit?: number;
    /**
     * Pagination cursor from previous response
     */
    cursor?: string;
    /**
     * Sort order for results (asc or desc by creation time)
     */
    sortOrder?: string;
    /**
     * When set to true you may use more of your alloted API rate-limit
     */
    includeInfo?: boolean;
    /**
     * Filters by metadata labels. Comma-separated key=value pairs,
     *  e.g. "env=prod,team=ai". A resource matches only if every pair
     *  matches exactly (AND semantics).
     */
    labels?: string;
}
export declare class Workspaces {
    private readonly _client;
    constructor(_client: HttpClient);
    /**
     * List workspaces
     *
     * @example
     * ```ts
     * const page = await client.workspaces.list();
     * for await (const item of page) {
     *   // auto-fetches every page
     * }
     * ```
     */
    list(params?: WorkspaceListParams, options?: RequestOptions): Promise<Page<Workspace>>;
}
//# sourceMappingURL=workspaces.d.ts.map