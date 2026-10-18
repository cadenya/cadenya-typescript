import { HttpClient, RequestOptions, APIPromise } from '../core/http.js';
import { Page } from '../core/pagination.js';
import type { CreateAccountResourceMetadata, TrustedEndpoint, TrustedEndpointSpec, VerifyTrustedEndpointResponse } from '../types.js';
export interface TrustedEndpointListParams {
    /**
     * Maximum number of results to return
     */
    limit?: number;
    /**
     * Pagination cursor from previous response
     */
    cursor?: string;
    /**
     * Filters by metadata labels. Comma-separated key=value pairs,
     *  e.g. "env=prod,team=ai". A resource matches only if every pair
     *  matches exactly (AND semantics).
     */
    labels?: string;
}
export interface TrustedEndpointCreateParams {
    metadata: CreateAccountResourceMetadata;
    spec: TrustedEndpointSpec;
}
export interface TrustedEndpointVerifyParams {
    /**
     * The URL a tool set would send requests to, such as an MCP server URL or
     *  an OpenAPI specification URL. A bare host is also accepted. Only its host
     *  and port are checked.
     */
    url: string;
}
export declare class TrustedEndpoints {
    private readonly _client;
    constructor(_client: HttpClient);
    /**
     * List trusted endpoints
     *
     * @example
     * ```ts
     * const page = await client.trustedEndpoints.list();
     * for await (const item of page) {
     *   // auto-fetches every page
     * }
     * ```
     */
    list(params?: TrustedEndpointListParams, options?: RequestOptions): Promise<Page<TrustedEndpoint>>;
    /**
     * Create a trusted endpoint
     *
     * @example
     * ```ts
     * const trustedEndpoint = await client.trustedEndpoints.create({ metadata: { name: 'sample' }, spec: { host: 'sample' } });
     * ```
     */
    create(params: TrustedEndpointCreateParams, options?: RequestOptions): APIPromise<TrustedEndpoint>;
    /**
     * Get a trusted endpoint by ID
     *
     * @example
     * ```ts
     * const trustedEndpoint = await client.trustedEndpoints.retrieve('_123');
     * ```
     */
    retrieve(id: string, options?: RequestOptions): APIPromise<TrustedEndpoint>;
    /**
     * Delete a trusted endpoint
     *
     * @example
     * ```ts
     * await client.trustedEndpoints.delete('_123');
     * ```
     */
    delete(id: string, options?: RequestOptions): APIPromise<void>;
    /**
     * Verify a URL against the trusted endpoints
     *
     * @example
     * ```ts
     * const verifyTrustedEndpointResponse = await client.trustedEndpoints.verify({ url: 'sample' });
     * ```
     */
    verify(params: TrustedEndpointVerifyParams, options?: RequestOptions): APIPromise<VerifyTrustedEndpointResponse>;
}
//# sourceMappingURL=trusted-endpoints.d.ts.map