import { HttpClient, RequestOptions, APIPromise } from '../core/http.js';
import type { SearchToolsOrToolSetsResponse } from '../types.js';
export interface ToolSearchSearchOrSetsParams {
    query: string;
    /**
     * NOTE: `query` is runtime-required (buf.validate min_len), but gnostic
     *  does not propagate message-level schema `required` to GET query
     *  parameters — overlay.yaml marks the parameter required instead.
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
}
export declare class ToolSearch {
    private readonly _client;
    constructor(_client: HttpClient);
    /**
     * Search for tools or tool sets
     *
     * @example
     * ```ts
     * const searchToolsOrToolSetsResponse = await client.toolSearch.searchOrSets({ query: 'query_123' });
     * ```
     */
    searchOrSets(params: ToolSearchSearchOrSetsParams, options?: RequestOptions): APIPromise<SearchToolsOrToolSetsResponse>;
}
//# sourceMappingURL=tool-search.d.ts.map