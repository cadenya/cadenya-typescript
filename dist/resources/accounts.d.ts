import { HttpClient, RequestOptions, APIPromise } from '../core/http.js';
import type { Account, RotateChallengeTokenResponse, RotateWebhookEventsHmacSecretResponse } from '../types.js';
export declare class Accounts {
    private readonly _client;
    constructor(_client: HttpClient);
    /**
     * Retrieves the current account for the token accessing the API
     *
     * @example
     * ```ts
     * const account = await client.accounts.retrieve();
     * ```
     */
    retrieve(options?: RequestOptions): APIPromise<Account>;
    /**
     * Rotates the challenge token for the account
     *
     * @example
     * ```ts
     * const rotateChallengeTokenResponse = await client.accounts.rotateChallengeToken();
     * ```
     */
    rotateChallengeToken(options?: RequestOptions): APIPromise<RotateChallengeTokenResponse>;
    /**
     * Rotates the webhook signing key for the account
     *
     * @example
     * ```ts
     * const rotateWebhookEventsHmacSecretResponse = await client.accounts.rotateWebhookSigningKey();
     * ```
     */
    rotateWebhookSigningKey(options?: RequestOptions): APIPromise<RotateWebhookEventsHmacSecretResponse>;
}
//# sourceMappingURL=accounts.d.ts.map