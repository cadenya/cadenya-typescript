import { HttpClient, RequestOptions, APIPromise } from '../core/http.js';
import type { Profile } from '../types.js';
export declare class Profiles {
    private readonly _client;
    constructor(_client: HttpClient);
    /**
     * Retrieves the profile for the credentials accessing the API
     *
     * @example
     * ```ts
     * const profile = await client.profiles.whoami();
     * ```
     */
    whoami(options?: RequestOptions): APIPromise<Profile>;
}
//# sourceMappingURL=profiles.d.ts.map