// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as AccountAPI from './account';
import * as WorkspacesAPI from './workspaces';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Ping extends APIResource {
  check(options?: RequestOptions): APIPromise<PingCheckResponse> {
    return this._client.get('/v1/ping', options);
  }
}

export interface PingCheckResponse {
  account?: AccountAPI.Account;

  actor?: PingCheckResponse.Actor;

  workspace?: WorkspacesAPI.Workspace;
}

export namespace PingCheckResponse {
  export interface Actor {
    /**
     * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
     */
    metadata?: AccountAPI.ResourceMetadata;

    spec?: Actor.Spec;
  }

  export namespace Actor {
    export interface Spec {
      /**
       * API Keys
       */
      apiKey?: Spec.APIKey;

      profile?: Spec.Profile;
    }

    export namespace Spec {
      /**
       * API Keys
       */
      export interface APIKey {
        /**
         * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
         */
        metadata?: AccountAPI.ResourceMetadata;

        spec?: APIKey.Spec;
      }

      export namespace APIKey {
        export interface Spec {
          token?: string;
        }
      }

      export interface Profile {
        email?: string;

        name?: string;
      }
    }
  }
}

export declare namespace Ping {
  export { type PingCheckResponse as PingCheckResponse };
}
