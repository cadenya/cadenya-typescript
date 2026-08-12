import type { Cadenya } from '../client';

export abstract class APIResource {
  protected _client: Cadenya;

  constructor(client: Cadenya) {
    this._client = client;
  }
}
