import { APIResource } from '../core/resource';
import * as APIKeysAPI from './api-keys';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

/**
 * Manage the account's system-provisioned global API key. The global key is
 *  the only key that spans every workspace; it is created by the system and
 *  cannot be deleted, so the surface is retrieve, rotate, and the
 *  disable/enable kill switch.
 */
export class GlobalAPIKey extends APIResource {
  /**
   * Retrieves the account's global API key. The token is included only when the
   * caller's scopes dominate the key's.
   */
  retrieve(options?: RequestOptions): APIPromise<APIKeysAPI.APIKey> {
    return this._client.get('/v1/account/global_api_key', options);
  }

  /**
   * Disables the global API key. While disabled, presenting its token fails
   * authentication on every endpoint; the key is retained. Idempotent.
   */
  disable(options?: RequestOptions): APIPromise<APIKeysAPI.APIKey> {
    return this._client.post('/v1/account/global_api_key:disable', options);
  }

  /**
   * Re-enables the disabled global API key so its token authenticates again.
   * Idempotent.
   */
  enable(options?: RequestOptions): APIPromise<APIKeysAPI.APIKey> {
    return this._client.post('/v1/account/global_api_key:enable', options);
  }

  /**
   * Rotates the global API key and returns a new token. All previous tokens are
   * invalidated.
   */
  rotate(options?: RequestOptions): APIPromise<APIKeysAPI.APIKey> {
    return this._client.post('/v1/account/global_api_key:rotate', options);
  }
}
