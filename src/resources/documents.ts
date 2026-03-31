// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';

export class Documents extends APIResource {}

/**
 * Contains an arbitrary serialized message along with a @type that describes the
 * type of the serialized message.
 */
export interface GoogleProtobufAny {
  /**
   * The type of the serialized message.
   */
  '@type'?: string;

  [k: string]: unknown;
}

export declare namespace Documents {
  export { type GoogleProtobufAny as GoogleProtobufAny };
}
