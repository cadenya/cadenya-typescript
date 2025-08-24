// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { Cadenya } from '../client';

export abstract class APIResource {
  protected _client: Cadenya;

  constructor(client: Cadenya) {
    this._client = client;
  }
}
