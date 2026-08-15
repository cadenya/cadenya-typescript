/**
 * Standard Webhooks verification (https://www.standardwebhooks.com), built on
 * WebCrypto — no dependencies. The signature is HMAC-SHA256 over
 * `${id}.${timestamp}.${payload}` keyed by the base64-decoded secret
 * (`whsec_` prefix optional); `webhook-signature` may carry several
 * space-separated `v1,<base64>` candidates.
 */
export declare class WebhookVerificationError extends Error {
    constructor(message: string);
}
export interface WebhookVerifyOptions {
    /** Max allowed clock skew for webhook-timestamp, in seconds. Default 300. */
    toleranceSeconds?: number;
}
/** Plain header records and Fetch-style Headers objects are both accepted. */
export type WebhookHeaders = Record<string, string | string[] | undefined> | {
    get(name: string): string | null;
};
export declare class WebhookVerifier {
    private readonly key;
    constructor(secret: string);
    /** Throws WebhookVerificationError unless the payload is authentic. */
    verify(payload: string, headers: WebhookHeaders, options?: WebhookVerifyOptions): Promise<void>;
}
//# sourceMappingURL=webhooks.d.ts.map