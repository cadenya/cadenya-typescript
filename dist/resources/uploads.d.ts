import { HttpClient, RequestOptions, APIPromise } from '../core/http.js';
import type { CreateResourceMetadata, Upload, UploadSpec } from '../types.js';
export interface UploadCreateParams {
    metadata: CreateResourceMetadata;
    spec: UploadSpec;
    /**
     * Workspace ID.
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
}
export interface UploadRetrieveParams {
    /**
     * Workspace ID.
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
}
export declare class Uploads {
    private readonly _client;
    constructor(_client: HttpClient);
    /**
     * Create an upload
     *
     * @example
     * ```ts
     * const upload = await client.uploads.create({ metadata: { name: 'sample' }, spec: { contentType: 'sample', filename: 'sample', sizeBytes: 'sample' } });
     * ```
     */
    create(params: UploadCreateParams, options?: RequestOptions): APIPromise<Upload>;
    /**
     * Get an upload by ID
     *
     * @example
     * ```ts
     * const upload = await client.uploads.retrieve('_123');
     * ```
     */
    retrieve(id: string, params?: UploadRetrieveParams, options?: RequestOptions): APIPromise<Upload>;
}
//# sourceMappingURL=uploads.d.ts.map