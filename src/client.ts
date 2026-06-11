// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { RequestInit, RequestInfo, BodyInit } from './internal/builtin-types';
import type { HTTPMethod, PromiseOrValue, MergedRequestInit, FinalizedRequestInit } from './internal/types';
import { uuid4 } from './internal/utils/uuid';
import { validatePositiveInteger, isAbsoluteURL, safeJSON } from './internal/utils/values';
import { sleep } from './internal/utils/sleep';
export type { Logger, LogLevel } from './internal/utils/log';
import { castToError, isAbortError } from './internal/errors';
import type { APIResponseProps } from './internal/parse';
import { getPlatformHeaders } from './internal/detect-platform';
import * as Shims from './internal/shims';
import * as Opts from './internal/request-options';
import { stringifyQuery } from './internal/utils/query';
import { VERSION } from './version';
import * as Errors from './core/error';
import * as Pagination from './core/pagination';
import { AbstractPage, type CursorPaginationParams, CursorPaginationResponse } from './core/pagination';
import * as Uploads from './core/uploads';
import * as API from './resources/index';
import { APIPromise } from './core/api-promise';
import {
  Account,
  AccountInfo,
  AccountResource,
  AccountSpec,
  Profile,
  ProfileSpec,
  RotateWebhookSigningKeyResponse,
} from './resources/account';
import {
  AIProviderKey,
  AIProviderKeyCreateParams,
  AIProviderKeyDeleteParams,
  AIProviderKeyListParams,
  AIProviderKeyRetrieveParams,
  AIProviderKeySpec,
  AIProviderKeyUpdateParams,
  AIProviderKeys,
  AIProviderKeysCursorPagination,
} from './resources/ai-provider-keys';
import {
  Model,
  ModelDisableParams,
  ModelEnableParams,
  ModelListParams,
  ModelRetrieveParams,
  ModelSpec,
  ModelSwapParams,
  ModelSwapResponse,
  Models,
  ModelsCursorPagination,
} from './resources/models';
import {
  Search,
  SearchSearchToolsOrToolSetsParams,
  SearchSearchToolsOrToolSetsResponse,
} from './resources/search';
import {
  Upload,
  UploadCreateParams,
  UploadInfo,
  UploadRetrieveParams,
  UploadSpec,
  Uploads as UploadsAPIUploads,
} from './resources/uploads';
import { UnsafeUnwrapWebhookEvent, UnwrapWebhookEvent, Webhooks } from './resources/webhooks';
import {
  WorkspaceSecret,
  WorkspaceSecretCreateParams,
  WorkspaceSecretDeleteParams,
  WorkspaceSecretInfo,
  WorkspaceSecretListParams,
  WorkspaceSecretRetrieveParams,
  WorkspaceSecretSpec,
  WorkspaceSecretUpdateParams,
  WorkspaceSecrets,
  WorkspaceSecretsCursorPagination,
} from './resources/workspace-secrets';
import {
  Workspace,
  WorkspaceListParams,
  WorkspaceSpec,
  Workspaces,
  WorkspacesCursorPagination,
} from './resources/workspaces';
import {
  Agent,
  AgentArchiveParams,
  AgentCreateParams,
  AgentDeleteParams,
  AgentInfo,
  AgentListParams,
  AgentPublishParams,
  AgentRetrieveParams,
  AgentSpec,
  AgentUnarchiveParams,
  AgentUnpublishParams,
  AgentUpdateParams,
  Agents,
  AgentsCursorPagination,
  Page,
} from './resources/agents/agents';
import {
  APIKey,
  APIKeyCreateParams,
  APIKeyInfo,
  APIKeyListParams,
  APIKeyRotateParams,
  APIKeySpec,
  APIKeyUpdateParams,
  APIKeys,
  APIKeysCursorPagination,
} from './resources/api-keys/api-keys';
import {
  AgentEntry,
  AgentScheduleEntry,
  AgentVariationEntry,
  BulkWorkspaceAppliesCursorPagination,
  BulkWorkspaceApply,
  BulkWorkspaceApplyData,
  BulkWorkspaceApplyInfo,
  BulkWorkspaceApplyStatus,
  BulkWorkspaceResourceApplyParams,
  BulkWorkspaceResourceListParams,
  BulkWorkspaceResourceRetrieveParams,
  BulkWorkspaceResources,
  MemoryEntryItem,
  MemoryLayerEntry,
  ToolEntry,
  ToolSetEntry,
  VariationAssignmentEntry,
  VariationMemoryLayerEntry,
} from './resources/bulk-workspace-resources/bulk-workspace-resources';
import {
  MemoryLayer,
  MemoryLayerCreateParams,
  MemoryLayerDeleteParams,
  MemoryLayerInfo,
  MemoryLayerListParams,
  MemoryLayerRetrieveParams,
  MemoryLayerSpec,
  MemoryLayerUpdateParams,
  MemoryLayers,
  MemoryLayersCursorPagination,
} from './resources/memory-layers/memory-layers';
import {
  AssistantMessage,
  AssistantToolCall,
  CallableTool,
  ContextWindowCompacted,
  MemoryRead,
  MemoryReference,
  Objective,
  ObjectiveCancelParams,
  ObjectiveCompactParams,
  ObjectiveCompactResponse,
  ObjectiveConfigSnapshot,
  ObjectiveContextWindow,
  ObjectiveContextWindowData,
  ObjectiveContextWindowsCursorPagination,
  ObjectiveContinueParams,
  ObjectiveContinueResponse,
  ObjectiveCreateParams,
  ObjectiveError,
  ObjectiveEventData,
  ObjectiveEventInfo,
  ObjectiveEventWebhookData,
  ObjectiveInfo,
  ObjectiveListContextWindowsParams,
  ObjectiveListEventsParams,
  ObjectiveListEventsResponse,
  ObjectiveListEventsResponsesCursorPagination,
  ObjectiveListParams,
  ObjectiveRetrieveParams,
  ObjectiveSecret,
  Objectives,
  ObjectivesCursorPagination,
  SubAgentSpawned,
  SubAgentUpdated,
  ToolApprovalRequested,
  ToolApproved,
  ToolCalled,
  ToolDenied,
  ToolError,
  ToolResult,
  UserMessage,
} from './resources/objectives/objectives';
import {
  ApprovalRequirementFilter,
  AttributeFilter,
  StringMatcher,
  SyncCompleted,
  SyncFailed,
  SyncStarted,
  ToolFilter,
  ToolSet,
  ToolSetAdapter,
  ToolSetAdapterHTTP,
  ToolSetAdapterMcp,
  ToolSetAdapterOpenAPI,
  ToolSetArchiveParams,
  ToolSetCreateParams,
  ToolSetDeleteParams,
  ToolSetEvent,
  ToolSetEventData,
  ToolSetEventsCursorPagination,
  ToolSetGetOpenAPISpecParams,
  ToolSetGetOpenAPISpecResponse,
  ToolSetInfo,
  ToolSetListEventsParams,
  ToolSetListParams,
  ToolSetRetrieveParams,
  ToolSetSpec,
  ToolSetUnarchiveParams,
  ToolSetUpdateParams,
  ToolSets,
  ToolSetsCursorPagination,
} from './resources/tool-sets/tool-sets';
import {
  WorkspaceAdmin,
  WorkspaceAdminCreateParams,
  WorkspaceAdminListParams,
  WorkspaceAdminUpdateParams,
  WorkspaceMember,
} from './resources/workspace-admin/workspace-admin';
import { type Fetch } from './internal/builtin-types';
import { HeadersLike, NullableHeaders, buildHeaders } from './internal/headers';
import { FinalRequestOptions, RequestOptions } from './internal/request-options';
import { readEnv } from './internal/utils/env';
import {
  type LogLevel,
  type Logger,
  formatRequestDetails,
  loggerFor,
  parseLogLevel,
} from './internal/utils/log';
import { isEmptyObj } from './internal/utils/values';

export interface ClientOptions {
  /**
   * Defaults to process.env['CADENYA_API_KEY'].
   */
  apiKey?: string | undefined;

  /**
   * Defaults to process.env['CADENYA_WEBHOOK_KEY'].
   */
  webhookKey?: string | null | undefined;

  /**
   * Override the default base URL for the API, e.g., "https://api.example.com/v2/"
   *
   * Defaults to process.env['CADENYA_BASE_URL'].
   */
  baseURL?: string | null | undefined;

  /**
   * The maximum amount of time (in milliseconds) that the client should wait for a response
   * from the server before timing out a single request.
   *
   * Note that request timeouts are retried by default, so in a worst-case scenario you may wait
   * much longer than this timeout before the promise succeeds or fails.
   *
   * @unit milliseconds
   */
  timeout?: number | undefined;
  /**
   * Additional `RequestInit` options to be passed to `fetch` calls.
   * Properties will be overridden by per-request `fetchOptions`.
   */
  fetchOptions?: MergedRequestInit | undefined;

  /**
   * Specify a custom `fetch` function implementation.
   *
   * If not provided, we expect that `fetch` is defined globally.
   */
  fetch?: Fetch | undefined;

  /**
   * The maximum number of times that the client will retry a request in case of a
   * temporary failure, like a network error or a 5XX error from the server.
   *
   * @default 2
   */
  maxRetries?: number | undefined;

  /**
   * Default headers to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * header to `null` in request options.
   */
  defaultHeaders?: HeadersLike | undefined;

  /**
   * Default query parameters to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * param to `undefined` in request options.
   */
  defaultQuery?: Record<string, string | undefined> | undefined;

  /**
   * Set the log level.
   *
   * Defaults to process.env['CADENYA_LOG'] or 'warn' if it isn't set.
   */
  logLevel?: LogLevel | undefined;

  /**
   * Set the logger.
   *
   * Defaults to globalThis.console.
   */
  logger?: Logger | undefined;
}

/**
 * API Client for interfacing with the Cadenya API.
 */
export class Cadenya {
  apiKey: string;
  webhookKey: string | null;

  baseURL: string;
  maxRetries: number;
  timeout: number;
  logger: Logger;
  logLevel: LogLevel | undefined;
  fetchOptions: MergedRequestInit | undefined;

  private fetch: Fetch;
  #encoder: Opts.RequestEncoder;
  protected idempotencyHeader?: string;
  private _options: ClientOptions;

  /**
   * API Client for interfacing with the Cadenya API.
   *
   * @param {string | undefined} [opts.apiKey=process.env['CADENYA_API_KEY'] ?? undefined]
   * @param {string | null | undefined} [opts.webhookKey=process.env['CADENYA_WEBHOOK_KEY'] ?? null]
   * @param {string} [opts.baseURL=process.env['CADENYA_BASE_URL'] ?? https://api.cadenya.com] - Override the default base URL for the API.
   * @param {number} [opts.timeout=1 minute] - The maximum amount of time (in milliseconds) the client will wait for a response before timing out.
   * @param {MergedRequestInit} [opts.fetchOptions] - Additional `RequestInit` options to be passed to `fetch` calls.
   * @param {Fetch} [opts.fetch] - Specify a custom `fetch` function implementation.
   * @param {number} [opts.maxRetries=2] - The maximum number of times the client will retry a request.
   * @param {HeadersLike} opts.defaultHeaders - Default headers to include with every request to the API.
   * @param {Record<string, string | undefined>} opts.defaultQuery - Default query parameters to include with every request to the API.
   */
  constructor({
    baseURL = readEnv('CADENYA_BASE_URL'),
    apiKey = readEnv('CADENYA_API_KEY'),
    webhookKey = readEnv('CADENYA_WEBHOOK_KEY') ?? null,
    ...opts
  }: ClientOptions = {}) {
    if (apiKey === undefined) {
      throw new Errors.CadenyaError(
        "The CADENYA_API_KEY environment variable is missing or empty; either provide it, or instantiate the Cadenya client with an apiKey option, like new Cadenya({ apiKey: 'My API Key' }).",
      );
    }

    const options: ClientOptions = {
      apiKey,
      webhookKey,
      ...opts,
      baseURL: baseURL || `https://api.cadenya.com`,
    };

    this.baseURL = options.baseURL!;
    this.timeout = options.timeout ?? Cadenya.DEFAULT_TIMEOUT /* 1 minute */;
    this.logger = options.logger ?? console;
    const defaultLogLevel = 'warn';
    // Set default logLevel early so that we can log a warning in parseLogLevel.
    this.logLevel = defaultLogLevel;
    this.logLevel =
      parseLogLevel(options.logLevel, 'ClientOptions.logLevel', this) ??
      parseLogLevel(readEnv('CADENYA_LOG'), "process.env['CADENYA_LOG']", this) ??
      defaultLogLevel;
    this.fetchOptions = options.fetchOptions;
    this.maxRetries = options.maxRetries ?? 2;
    this.fetch = options.fetch ?? Shims.getDefaultFetch();
    this.#encoder = Opts.FallbackEncoder;

    const customHeadersEnv = readEnv('CADENYA_CUSTOM_HEADERS');
    if (customHeadersEnv) {
      const parsed: Record<string, string> = {};
      for (const line of customHeadersEnv.split('\n')) {
        const colon = line.indexOf(':');
        if (colon >= 0) {
          parsed[line.substring(0, colon).trim()] = line.substring(colon + 1).trim();
        }
      }
      options.defaultHeaders = { ...parsed, ...options.defaultHeaders };
    }

    this._options = options;

    this.apiKey = apiKey;
    this.webhookKey = webhookKey;
  }

  /**
   * Create a new client instance re-using the same options given to the current client with optional overriding.
   */
  withOptions(options: Partial<ClientOptions>): this {
    const client = new (this.constructor as any as new (props: ClientOptions) => typeof this)({
      ...this._options,
      baseURL: this.baseURL,
      maxRetries: this.maxRetries,
      timeout: this.timeout,
      logger: this.logger,
      logLevel: this.logLevel,
      fetch: this.fetch,
      fetchOptions: this.fetchOptions,
      apiKey: this.apiKey,
      webhookKey: this.webhookKey,
      ...options,
    });
    return client;
  }

  /**
   * Check whether the base URL is set to its default.
   */
  #baseURLOverridden(): boolean {
    return this.baseURL !== 'https://api.cadenya.com';
  }

  protected defaultQuery(): Record<string, string | undefined> | undefined {
    return this._options.defaultQuery;
  }

  protected validateHeaders({ values, nulls }: NullableHeaders) {
    return;
  }

  protected async authHeaders(opts: FinalRequestOptions): Promise<NullableHeaders | undefined> {
    return buildHeaders([{ Authorization: `Bearer ${this.apiKey}` }]);
  }

  protected stringifyQuery(query: object | Record<string, unknown>): string {
    return stringifyQuery(query);
  }

  private getUserAgent(): string {
    return `${this.constructor.name}/JS ${VERSION}`;
  }

  protected defaultIdempotencyKey(): string {
    return `stainless-node-retry-${uuid4()}`;
  }

  protected makeStatusError(
    status: number,
    error: Object,
    message: string | undefined,
    headers: Headers,
  ): Errors.APIError {
    return Errors.APIError.generate(status, error, message, headers);
  }

  buildURL(
    path: string,
    query: Record<string, unknown> | null | undefined,
    defaultBaseURL?: string | undefined,
  ): string {
    const baseURL = (!this.#baseURLOverridden() && defaultBaseURL) || this.baseURL;
    const url =
      isAbsoluteURL(path) ?
        new URL(path)
      : new URL(baseURL + (baseURL.endsWith('/') && path.startsWith('/') ? path.slice(1) : path));

    const defaultQuery = this.defaultQuery();
    const pathQuery = Object.fromEntries(url.searchParams);
    if (!isEmptyObj(defaultQuery) || !isEmptyObj(pathQuery)) {
      query = { ...pathQuery, ...defaultQuery, ...query };
    }

    if (typeof query === 'object' && query && !Array.isArray(query)) {
      url.search = this.stringifyQuery(query);
    }

    return url.toString();
  }

  /**
   * Used as a callback for mutating the given `FinalRequestOptions` object.
   */
  protected async prepareOptions(options: FinalRequestOptions): Promise<void> {}

  /**
   * Used as a callback for mutating the given `RequestInit` object.
   *
   * This is useful for cases where you want to add certain headers based off of
   * the request properties, e.g. `method` or `url`.
   */
  protected async prepareRequest(
    request: RequestInit,
    { url, options }: { url: string; options: FinalRequestOptions },
  ): Promise<void> {}

  get<Rsp>(path: string, opts?: PromiseOrValue<RequestOptions>): APIPromise<Rsp> {
    return this.methodRequest('get', path, opts);
  }

  post<Rsp>(path: string, opts?: PromiseOrValue<RequestOptions>): APIPromise<Rsp> {
    return this.methodRequest('post', path, opts);
  }

  patch<Rsp>(path: string, opts?: PromiseOrValue<RequestOptions>): APIPromise<Rsp> {
    return this.methodRequest('patch', path, opts);
  }

  put<Rsp>(path: string, opts?: PromiseOrValue<RequestOptions>): APIPromise<Rsp> {
    return this.methodRequest('put', path, opts);
  }

  delete<Rsp>(path: string, opts?: PromiseOrValue<RequestOptions>): APIPromise<Rsp> {
    return this.methodRequest('delete', path, opts);
  }

  private methodRequest<Rsp>(
    method: HTTPMethod,
    path: string,
    opts?: PromiseOrValue<RequestOptions>,
  ): APIPromise<Rsp> {
    return this.request(
      Promise.resolve(opts).then((opts) => {
        return { method, path, ...opts };
      }),
    );
  }

  request<Rsp>(
    options: PromiseOrValue<FinalRequestOptions>,
    remainingRetries: number | null = null,
  ): APIPromise<Rsp> {
    return new APIPromise(this, this.makeRequest(options, remainingRetries, undefined));
  }

  private async makeRequest(
    optionsInput: PromiseOrValue<FinalRequestOptions>,
    retriesRemaining: number | null,
    retryOfRequestLogID: string | undefined,
  ): Promise<APIResponseProps> {
    const options = await optionsInput;
    const maxRetries = options.maxRetries ?? this.maxRetries;
    if (retriesRemaining == null) {
      retriesRemaining = maxRetries;
    }

    await this.prepareOptions(options);

    const { req, url, timeout } = await this.buildRequest(options, {
      retryCount: maxRetries - retriesRemaining,
    });

    await this.prepareRequest(req, { url, options });

    /** Not an API request ID, just for correlating local log entries. */
    const requestLogID = 'log_' + ((Math.random() * (1 << 24)) | 0).toString(16).padStart(6, '0');
    const retryLogStr = retryOfRequestLogID === undefined ? '' : `, retryOf: ${retryOfRequestLogID}`;
    const startTime = Date.now();

    loggerFor(this).debug(
      `[${requestLogID}] sending request`,
      formatRequestDetails({
        retryOfRequestLogID,
        method: options.method,
        url,
        options,
        headers: req.headers,
      }),
    );

    if (options.signal?.aborted) {
      throw new Errors.APIUserAbortError();
    }

    const controller = new AbortController();
    const response = await this.fetchWithTimeout(url, req, timeout, controller).catch(castToError);
    const headersTime = Date.now();

    if (response instanceof globalThis.Error) {
      const retryMessage = `retrying, ${retriesRemaining} attempts remaining`;
      if (options.signal?.aborted) {
        throw new Errors.APIUserAbortError();
      }
      // detect native connection timeout errors
      // deno throws "TypeError: error sending request for url (https://example/): client error (Connect): tcp connect error: Operation timed out (os error 60): Operation timed out (os error 60)"
      // undici throws "TypeError: fetch failed" with cause "ConnectTimeoutError: Connect Timeout Error (attempted address: example:443, timeout: 1ms)"
      // others do not provide enough information to distinguish timeouts from other connection errors
      const isTimeout =
        isAbortError(response) ||
        /timed? ?out/i.test(String(response) + ('cause' in response ? String(response.cause) : ''));
      if (retriesRemaining) {
        loggerFor(this).info(
          `[${requestLogID}] connection ${isTimeout ? 'timed out' : 'failed'} - ${retryMessage}`,
        );
        loggerFor(this).debug(
          `[${requestLogID}] connection ${isTimeout ? 'timed out' : 'failed'} (${retryMessage})`,
          formatRequestDetails({
            retryOfRequestLogID,
            url,
            durationMs: headersTime - startTime,
            message: response.message,
          }),
        );
        return this.retryRequest(options, retriesRemaining, retryOfRequestLogID ?? requestLogID);
      }
      loggerFor(this).info(
        `[${requestLogID}] connection ${isTimeout ? 'timed out' : 'failed'} - error; no more retries left`,
      );
      loggerFor(this).debug(
        `[${requestLogID}] connection ${isTimeout ? 'timed out' : 'failed'} (error; no more retries left)`,
        formatRequestDetails({
          retryOfRequestLogID,
          url,
          durationMs: headersTime - startTime,
          message: response.message,
        }),
      );
      if (isTimeout) {
        throw new Errors.APIConnectionTimeoutError();
      }
      throw new Errors.APIConnectionError({ cause: response });
    }

    const responseInfo = `[${requestLogID}${retryLogStr}] ${req.method} ${url} ${
      response.ok ? 'succeeded' : 'failed'
    } with status ${response.status} in ${headersTime - startTime}ms`;

    if (!response.ok) {
      const shouldRetry = await this.shouldRetry(response);
      if (retriesRemaining && shouldRetry) {
        const retryMessage = `retrying, ${retriesRemaining} attempts remaining`;

        // We don't need the body of this response.
        await Shims.CancelReadableStream(response.body);
        loggerFor(this).info(`${responseInfo} - ${retryMessage}`);
        loggerFor(this).debug(
          `[${requestLogID}] response error (${retryMessage})`,
          formatRequestDetails({
            retryOfRequestLogID,
            url: response.url,
            status: response.status,
            headers: response.headers,
            durationMs: headersTime - startTime,
          }),
        );
        return this.retryRequest(
          options,
          retriesRemaining,
          retryOfRequestLogID ?? requestLogID,
          response.headers,
        );
      }

      const retryMessage = shouldRetry ? `error; no more retries left` : `error; not retryable`;

      loggerFor(this).info(`${responseInfo} - ${retryMessage}`);

      const errText = await response.text().catch((err: any) => castToError(err).message);
      const errJSON = safeJSON(errText) as any;
      const errMessage = errJSON ? undefined : errText;

      loggerFor(this).debug(
        `[${requestLogID}] response error (${retryMessage})`,
        formatRequestDetails({
          retryOfRequestLogID,
          url: response.url,
          status: response.status,
          headers: response.headers,
          message: errMessage,
          durationMs: Date.now() - startTime,
        }),
      );

      const err = this.makeStatusError(response.status, errJSON, errMessage, response.headers);
      throw err;
    }

    loggerFor(this).info(responseInfo);
    loggerFor(this).debug(
      `[${requestLogID}] response start`,
      formatRequestDetails({
        retryOfRequestLogID,
        url: response.url,
        status: response.status,
        headers: response.headers,
        durationMs: headersTime - startTime,
      }),
    );

    return { response, options, controller, requestLogID, retryOfRequestLogID, startTime };
  }

  getAPIList<Item, PageClass extends Pagination.AbstractPage<Item> = Pagination.AbstractPage<Item>>(
    path: string,
    Page: new (...args: any[]) => PageClass,
    opts?: PromiseOrValue<RequestOptions>,
  ): Pagination.PagePromise<PageClass, Item> {
    return this.requestAPIList(
      Page,
      opts && 'then' in opts ?
        opts.then((opts) => ({ method: 'get', path, ...opts }))
      : { method: 'get', path, ...opts },
    );
  }

  requestAPIList<
    Item = unknown,
    PageClass extends Pagination.AbstractPage<Item> = Pagination.AbstractPage<Item>,
  >(
    Page: new (...args: ConstructorParameters<typeof Pagination.AbstractPage>) => PageClass,
    options: PromiseOrValue<FinalRequestOptions>,
  ): Pagination.PagePromise<PageClass, Item> {
    const request = this.makeRequest(options, null, undefined);
    return new Pagination.PagePromise<PageClass, Item>(this as any as Cadenya, request, Page);
  }

  async fetchWithTimeout(
    url: RequestInfo,
    init: RequestInit | undefined,
    ms: number,
    controller: AbortController,
  ): Promise<Response> {
    const { signal, method, ...options } = init || {};
    const abort = this._makeAbort(controller);
    if (signal) signal.addEventListener('abort', abort, { once: true });

    const timeout = setTimeout(abort, ms);

    const isReadableBody =
      ((globalThis as any).ReadableStream && options.body instanceof (globalThis as any).ReadableStream) ||
      (typeof options.body === 'object' && options.body !== null && Symbol.asyncIterator in options.body);

    const fetchOptions: RequestInit = {
      signal: controller.signal as any,
      ...(isReadableBody ? { duplex: 'half' } : {}),
      method: 'GET',
      ...options,
    };
    if (method) {
      // Custom methods like 'patch' need to be uppercased
      // See https://github.com/nodejs/undici/issues/2294
      fetchOptions.method = method.toUpperCase();
    }

    try {
      // use undefined this binding; fetch errors if bound to something else in browser/cloudflare
      return await this.fetch.call(undefined, url, fetchOptions);
    } finally {
      clearTimeout(timeout);
    }
  }

  private async shouldRetry(response: Response): Promise<boolean> {
    // Note this is not a standard header.
    const shouldRetryHeader = response.headers.get('x-should-retry');

    // If the server explicitly says whether or not to retry, obey.
    if (shouldRetryHeader === 'true') return true;
    if (shouldRetryHeader === 'false') return false;

    // Retry on request timeouts.
    if (response.status === 408) return true;

    // Retry on lock timeouts.
    if (response.status === 409) return true;

    // Retry on rate limits.
    if (response.status === 429) return true;

    // Retry internal errors.
    if (response.status >= 500) return true;

    return false;
  }

  private async retryRequest(
    options: FinalRequestOptions,
    retriesRemaining: number,
    requestLogID: string,
    responseHeaders?: Headers | undefined,
  ): Promise<APIResponseProps> {
    let timeoutMillis: number | undefined;

    // Note the `retry-after-ms` header may not be standard, but is a good idea and we'd like proactive support for it.
    const retryAfterMillisHeader = responseHeaders?.get('retry-after-ms');
    if (retryAfterMillisHeader) {
      const timeoutMs = parseFloat(retryAfterMillisHeader);
      if (!Number.isNaN(timeoutMs)) {
        timeoutMillis = timeoutMs;
      }
    }

    // About the Retry-After header: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Retry-After
    const retryAfterHeader = responseHeaders?.get('retry-after');
    if (retryAfterHeader && !timeoutMillis) {
      const timeoutSeconds = parseFloat(retryAfterHeader);
      if (!Number.isNaN(timeoutSeconds)) {
        timeoutMillis = timeoutSeconds * 1000;
      } else {
        timeoutMillis = Date.parse(retryAfterHeader) - Date.now();
      }
    }

    // If the API asks us to wait a certain amount of time, just do what it
    // says, but otherwise calculate a default
    if (timeoutMillis === undefined) {
      const maxRetries = options.maxRetries ?? this.maxRetries;
      timeoutMillis = this.calculateDefaultRetryTimeoutMillis(retriesRemaining, maxRetries);
    }
    await sleep(timeoutMillis);

    return this.makeRequest(options, retriesRemaining - 1, requestLogID);
  }

  private calculateDefaultRetryTimeoutMillis(retriesRemaining: number, maxRetries: number): number {
    const initialRetryDelay = 0.5;
    const maxRetryDelay = 8.0;

    const numRetries = maxRetries - retriesRemaining;

    // Apply exponential backoff, but not more than the max.
    const sleepSeconds = Math.min(initialRetryDelay * Math.pow(2, numRetries), maxRetryDelay);

    // Apply some jitter, take up to at most 25 percent of the retry time.
    const jitter = 1 - Math.random() * 0.25;

    return sleepSeconds * jitter * 1000;
  }

  async buildRequest(
    inputOptions: FinalRequestOptions,
    { retryCount = 0 }: { retryCount?: number } = {},
  ): Promise<{ req: FinalizedRequestInit; url: string; timeout: number }> {
    const options = { ...inputOptions };
    const { method, path, query, defaultBaseURL } = options;

    const url = this.buildURL(path!, query as Record<string, unknown>, defaultBaseURL);
    if ('timeout' in options) validatePositiveInteger('timeout', options.timeout);
    options.timeout = options.timeout ?? this.timeout;
    const { bodyHeaders, body } = this.buildBody({ options });
    const reqHeaders = await this.buildHeaders({ options: inputOptions, method, bodyHeaders, retryCount });

    const req: FinalizedRequestInit = {
      method,
      headers: reqHeaders,
      ...(options.signal && { signal: options.signal }),
      ...((globalThis as any).ReadableStream &&
        body instanceof (globalThis as any).ReadableStream && { duplex: 'half' }),
      ...(body && { body }),
      ...((this.fetchOptions as any) ?? {}),
      ...((options.fetchOptions as any) ?? {}),
    };

    return { req, url, timeout: options.timeout };
  }

  private async buildHeaders({
    options,
    method,
    bodyHeaders,
    retryCount,
  }: {
    options: FinalRequestOptions;
    method: HTTPMethod;
    bodyHeaders: HeadersLike;
    retryCount: number;
  }): Promise<Headers> {
    let idempotencyHeaders: HeadersLike = {};
    if (this.idempotencyHeader && method !== 'get') {
      if (!options.idempotencyKey) options.idempotencyKey = this.defaultIdempotencyKey();
      idempotencyHeaders[this.idempotencyHeader] = options.idempotencyKey;
    }

    const headers = buildHeaders([
      idempotencyHeaders,
      {
        Accept: 'application/json',
        'User-Agent': this.getUserAgent(),
        'X-Stainless-Retry-Count': String(retryCount),
        ...(options.timeout ? { 'X-Stainless-Timeout': String(Math.trunc(options.timeout / 1000)) } : {}),
        ...getPlatformHeaders(),
      },
      await this.authHeaders(options),
      this._options.defaultHeaders,
      bodyHeaders,
      options.headers,
    ]);

    this.validateHeaders(headers);

    return headers.values;
  }

  private _makeAbort(controller: AbortController) {
    // note: we can't just inline this method inside `fetchWithTimeout()` because then the closure
    //       would capture all request options, and cause a memory leak.
    return () => controller.abort();
  }

  private buildBody({ options: { body, headers: rawHeaders } }: { options: FinalRequestOptions }): {
    bodyHeaders: HeadersLike;
    body: BodyInit | undefined;
  } {
    if (!body) {
      return { bodyHeaders: undefined, body: undefined };
    }
    const headers = buildHeaders([rawHeaders]);
    if (
      // Pass raw type verbatim
      ArrayBuffer.isView(body) ||
      body instanceof ArrayBuffer ||
      body instanceof DataView ||
      (typeof body === 'string' &&
        // Preserve legacy string encoding behavior for now
        headers.values.has('content-type')) ||
      // `Blob` is superset of `File`
      ((globalThis as any).Blob && body instanceof (globalThis as any).Blob) ||
      // `FormData` -> `multipart/form-data`
      body instanceof FormData ||
      // `URLSearchParams` -> `application/x-www-form-urlencoded`
      body instanceof URLSearchParams ||
      // Send chunked stream (each chunk has own `length`)
      ((globalThis as any).ReadableStream && body instanceof (globalThis as any).ReadableStream)
    ) {
      return { bodyHeaders: undefined, body: body as BodyInit };
    } else if (
      typeof body === 'object' &&
      (Symbol.asyncIterator in body ||
        (Symbol.iterator in body && 'next' in body && typeof body.next === 'function'))
    ) {
      return { bodyHeaders: undefined, body: Shims.ReadableStreamFrom(body as AsyncIterable<Uint8Array>) };
    } else if (
      typeof body === 'object' &&
      headers.values.get('content-type') === 'application/x-www-form-urlencoded'
    ) {
      return {
        bodyHeaders: { 'content-type': 'application/x-www-form-urlencoded' },
        body: this.stringifyQuery(body),
      };
    } else {
      return this.#encoder({ body, headers });
    }
  }

  static Cadenya = this;
  static DEFAULT_TIMEOUT = 60000; // 1 minute

  static CadenyaError = Errors.CadenyaError;
  static APIError = Errors.APIError;
  static APIConnectionError = Errors.APIConnectionError;
  static APIConnectionTimeoutError = Errors.APIConnectionTimeoutError;
  static APIUserAbortError = Errors.APIUserAbortError;
  static NotFoundError = Errors.NotFoundError;
  static ConflictError = Errors.ConflictError;
  static RateLimitError = Errors.RateLimitError;
  static BadRequestError = Errors.BadRequestError;
  static AuthenticationError = Errors.AuthenticationError;
  static InternalServerError = Errors.InternalServerError;
  static PermissionDeniedError = Errors.PermissionDeniedError;
  static UnprocessableEntityError = Errors.UnprocessableEntityError;

  static toFile = Uploads.toFile;

  aiProviderKeys: API.AIProviderKeys = new API.AIProviderKeys(this);
  /**
   * Manage the authenticated account. Accounts are the top-level organizational
   *  unit and contain one or more workspaces.
   */
  account: API.AccountResource = new API.AccountResource(this);
  /**
   * Manage AI agents within a workspace. Agents define AI behavior and tool access.
   */
  agents: API.Agents = new API.Agents(this);
  objectives: API.Objectives = new API.Objectives(this);
  /**
   * Manage memory layers and their entries. Layers are named containers that can
   *  be composed into an objective's memory cascade; entries are the keyed values
   *  within a layer. System-managed layers (e.g., episodic layers created by the
   *  runtime) cannot be mutated through this API.
   */
  memoryLayers: API.MemoryLayers = new API.MemoryLayers(this);
  /**
   * Issue short-lived presigned URLs for direct client-to-object-storage
   *  uploads. Created uploads can be referenced by id when creating or updating
   *  resources that accept binary content (e.g., MemoryEntry).
   */
  uploads: API.Uploads = new API.Uploads(this);
  /**
   * Manage LLM models available to a workspace. Models represent provider and
   *  family pairs (e.g., "anthropic/claude-sonnet-4.6"). Workspaces are seeded
   *  with the supported models and you can enable or disable each one.
   */
  models: API.Models = new API.Models(this);
  search: API.Search = new API.Search(this);
  /**
   * Manage tool sets and the tools they contain. Tool sets group related tools,
   *  and tools define specific capabilities available to agents.
   *
   *  When a tool set is managed, only API key actors can modify its tools; human
   *  (profile) actors cannot.
   */
  toolSets: API.ToolSets = new API.ToolSets(this);
  /**
   * Issue, rotate, and revoke API keys for the account, and grant or revoke
   *  each key's access to individual workspaces.
   */
  apiKeys: API.APIKeys = new API.APIKeys(this);
  workspaceSecrets: API.WorkspaceSecrets = new API.WorkspaceSecrets(this);
  /**
   * Manage workspaces within an account. Workspaces provide organizational
   *  grouping and isolation for resources such as agents, tools, and API keys.
   *
   *  This is the workspace-scoped, end-user surface. Administrative operations
   *  (create / archive workspaces, manage members) live in WorkspaceAdminService
   *  under /v1/account/workspaces and require the admin role.
   */
  workspaces: API.Workspaces = new API.Workspaces(this);
  /**
   * Administer workspaces across the account: create and archive workspaces and
   *  manage their membership. These operations are account-scoped and require the
   *  admin role (a token whose profile holds the WorkOS admin role); they live
   *  under /v1/account/workspaces rather than the workspace-scoped /v1/workspaces
   *  tree so an admin can manage any workspace in the account, including ones they
   *  are not themselves a member of.
   */
  workspaceAdmin: API.WorkspaceAdmin = new API.WorkspaceAdmin(this);
  webhooks: API.Webhooks = new API.Webhooks(this);
  /**
   * Apply a declarative bundle of workspace resources — tool sets, memory
   *  layers, agents, variations, assignments, and schedules — in a single
   *  asynchronous operation.
   */
  bulkWorkspaceResources: API.BulkWorkspaceResources = new API.BulkWorkspaceResources(this);
}

Cadenya.AIProviderKeys = AIProviderKeys;
Cadenya.AccountResource = AccountResource;
Cadenya.Agents = Agents;
Cadenya.Objectives = Objectives;
Cadenya.MemoryLayers = MemoryLayers;
Cadenya.Uploads = UploadsAPIUploads;
Cadenya.Models = Models;
Cadenya.Search = Search;
Cadenya.ToolSets = ToolSets;
Cadenya.APIKeys = APIKeys;
Cadenya.WorkspaceSecrets = WorkspaceSecrets;
Cadenya.Workspaces = Workspaces;
Cadenya.WorkspaceAdmin = WorkspaceAdmin;
Cadenya.Webhooks = Webhooks;
Cadenya.BulkWorkspaceResources = BulkWorkspaceResources;

export declare namespace Cadenya {
  export type RequestOptions = Opts.RequestOptions;

  export import CursorPagination = Pagination.CursorPagination;
  export {
    type CursorPaginationParams as CursorPaginationParams,
    type CursorPaginationResponse as CursorPaginationResponse,
  };

  export {
    AIProviderKeys as AIProviderKeys,
    type AIProviderKey as AIProviderKey,
    type AIProviderKeySpec as AIProviderKeySpec,
    type AIProviderKeysCursorPagination as AIProviderKeysCursorPagination,
    type AIProviderKeyCreateParams as AIProviderKeyCreateParams,
    type AIProviderKeyRetrieveParams as AIProviderKeyRetrieveParams,
    type AIProviderKeyUpdateParams as AIProviderKeyUpdateParams,
    type AIProviderKeyListParams as AIProviderKeyListParams,
    type AIProviderKeyDeleteParams as AIProviderKeyDeleteParams,
  };

  export {
    AccountResource as AccountResource,
    type Account as Account,
    type AccountInfo as AccountInfo,
    type AccountSpec as AccountSpec,
    type Profile as Profile,
    type ProfileSpec as ProfileSpec,
    type RotateWebhookSigningKeyResponse as RotateWebhookSigningKeyResponse,
  };

  export {
    Agents as Agents,
    type Agent as Agent,
    type AgentInfo as AgentInfo,
    type AgentSpec as AgentSpec,
    type Page as Page,
    type AgentsCursorPagination as AgentsCursorPagination,
    type AgentCreateParams as AgentCreateParams,
    type AgentRetrieveParams as AgentRetrieveParams,
    type AgentUpdateParams as AgentUpdateParams,
    type AgentListParams as AgentListParams,
    type AgentDeleteParams as AgentDeleteParams,
    type AgentArchiveParams as AgentArchiveParams,
    type AgentPublishParams as AgentPublishParams,
    type AgentUnarchiveParams as AgentUnarchiveParams,
    type AgentUnpublishParams as AgentUnpublishParams,
  };

  export {
    Objectives as Objectives,
    type AssistantMessage as AssistantMessage,
    type AssistantToolCall as AssistantToolCall,
    type CallableTool as CallableTool,
    type ContextWindowCompacted as ContextWindowCompacted,
    type MemoryRead as MemoryRead,
    type MemoryReference as MemoryReference,
    type Objective as Objective,
    type ObjectiveConfigSnapshot as ObjectiveConfigSnapshot,
    type ObjectiveContextWindow as ObjectiveContextWindow,
    type ObjectiveContextWindowData as ObjectiveContextWindowData,
    type ObjectiveError as ObjectiveError,
    type ObjectiveEventData as ObjectiveEventData,
    type ObjectiveEventInfo as ObjectiveEventInfo,
    type ObjectiveEventWebhookData as ObjectiveEventWebhookData,
    type ObjectiveInfo as ObjectiveInfo,
    type ObjectiveSecret as ObjectiveSecret,
    type SubAgentSpawned as SubAgentSpawned,
    type SubAgentUpdated as SubAgentUpdated,
    type ToolApprovalRequested as ToolApprovalRequested,
    type ToolApproved as ToolApproved,
    type ToolCalled as ToolCalled,
    type ToolDenied as ToolDenied,
    type ToolError as ToolError,
    type ToolResult as ToolResult,
    type UserMessage as UserMessage,
    type ObjectiveCompactResponse as ObjectiveCompactResponse,
    type ObjectiveContinueResponse as ObjectiveContinueResponse,
    type ObjectiveListEventsResponse as ObjectiveListEventsResponse,
    type ObjectivesCursorPagination as ObjectivesCursorPagination,
    type ObjectiveContextWindowsCursorPagination as ObjectiveContextWindowsCursorPagination,
    type ObjectiveListEventsResponsesCursorPagination as ObjectiveListEventsResponsesCursorPagination,
    type ObjectiveCreateParams as ObjectiveCreateParams,
    type ObjectiveRetrieveParams as ObjectiveRetrieveParams,
    type ObjectiveListParams as ObjectiveListParams,
    type ObjectiveCancelParams as ObjectiveCancelParams,
    type ObjectiveCompactParams as ObjectiveCompactParams,
    type ObjectiveContinueParams as ObjectiveContinueParams,
    type ObjectiveListContextWindowsParams as ObjectiveListContextWindowsParams,
    type ObjectiveListEventsParams as ObjectiveListEventsParams,
  };

  export {
    MemoryLayers as MemoryLayers,
    type MemoryLayer as MemoryLayer,
    type MemoryLayerInfo as MemoryLayerInfo,
    type MemoryLayerSpec as MemoryLayerSpec,
    type MemoryLayersCursorPagination as MemoryLayersCursorPagination,
    type MemoryLayerCreateParams as MemoryLayerCreateParams,
    type MemoryLayerRetrieveParams as MemoryLayerRetrieveParams,
    type MemoryLayerUpdateParams as MemoryLayerUpdateParams,
    type MemoryLayerListParams as MemoryLayerListParams,
    type MemoryLayerDeleteParams as MemoryLayerDeleteParams,
  };

  export {
    UploadsAPIUploads as Uploads,
    type Upload as Upload,
    type UploadInfo as UploadInfo,
    type UploadSpec as UploadSpec,
    type UploadCreateParams as UploadCreateParams,
    type UploadRetrieveParams as UploadRetrieveParams,
  };

  export {
    Models as Models,
    type Model as Model,
    type ModelSpec as ModelSpec,
    type ModelSwapResponse as ModelSwapResponse,
    type ModelsCursorPagination as ModelsCursorPagination,
    type ModelRetrieveParams as ModelRetrieveParams,
    type ModelListParams as ModelListParams,
    type ModelDisableParams as ModelDisableParams,
    type ModelEnableParams as ModelEnableParams,
    type ModelSwapParams as ModelSwapParams,
  };

  export {
    Search as Search,
    type SearchSearchToolsOrToolSetsResponse as SearchSearchToolsOrToolSetsResponse,
    type SearchSearchToolsOrToolSetsParams as SearchSearchToolsOrToolSetsParams,
  };

  export {
    ToolSets as ToolSets,
    type ApprovalRequirementFilter as ApprovalRequirementFilter,
    type AttributeFilter as AttributeFilter,
    type StringMatcher as StringMatcher,
    type SyncCompleted as SyncCompleted,
    type SyncFailed as SyncFailed,
    type SyncStarted as SyncStarted,
    type ToolFilter as ToolFilter,
    type ToolSet as ToolSet,
    type ToolSetAdapter as ToolSetAdapter,
    type ToolSetAdapterHTTP as ToolSetAdapterHTTP,
    type ToolSetAdapterMcp as ToolSetAdapterMcp,
    type ToolSetAdapterOpenAPI as ToolSetAdapterOpenAPI,
    type ToolSetEvent as ToolSetEvent,
    type ToolSetEventData as ToolSetEventData,
    type ToolSetInfo as ToolSetInfo,
    type ToolSetSpec as ToolSetSpec,
    type ToolSetGetOpenAPISpecResponse as ToolSetGetOpenAPISpecResponse,
    type ToolSetsCursorPagination as ToolSetsCursorPagination,
    type ToolSetEventsCursorPagination as ToolSetEventsCursorPagination,
    type ToolSetCreateParams as ToolSetCreateParams,
    type ToolSetRetrieveParams as ToolSetRetrieveParams,
    type ToolSetUpdateParams as ToolSetUpdateParams,
    type ToolSetListParams as ToolSetListParams,
    type ToolSetDeleteParams as ToolSetDeleteParams,
    type ToolSetArchiveParams as ToolSetArchiveParams,
    type ToolSetGetOpenAPISpecParams as ToolSetGetOpenAPISpecParams,
    type ToolSetListEventsParams as ToolSetListEventsParams,
    type ToolSetUnarchiveParams as ToolSetUnarchiveParams,
  };

  export {
    APIKeys as APIKeys,
    type APIKey as APIKey,
    type APIKeyInfo as APIKeyInfo,
    type APIKeySpec as APIKeySpec,
    type APIKeysCursorPagination as APIKeysCursorPagination,
    type APIKeyCreateParams as APIKeyCreateParams,
    type APIKeyUpdateParams as APIKeyUpdateParams,
    type APIKeyListParams as APIKeyListParams,
    type APIKeyRotateParams as APIKeyRotateParams,
  };

  export {
    WorkspaceSecrets as WorkspaceSecrets,
    type WorkspaceSecret as WorkspaceSecret,
    type WorkspaceSecretInfo as WorkspaceSecretInfo,
    type WorkspaceSecretSpec as WorkspaceSecretSpec,
    type WorkspaceSecretsCursorPagination as WorkspaceSecretsCursorPagination,
    type WorkspaceSecretCreateParams as WorkspaceSecretCreateParams,
    type WorkspaceSecretRetrieveParams as WorkspaceSecretRetrieveParams,
    type WorkspaceSecretUpdateParams as WorkspaceSecretUpdateParams,
    type WorkspaceSecretListParams as WorkspaceSecretListParams,
    type WorkspaceSecretDeleteParams as WorkspaceSecretDeleteParams,
  };

  export {
    Workspaces as Workspaces,
    type Workspace as Workspace,
    type WorkspaceSpec as WorkspaceSpec,
    type WorkspacesCursorPagination as WorkspacesCursorPagination,
    type WorkspaceListParams as WorkspaceListParams,
  };

  export {
    WorkspaceAdmin as WorkspaceAdmin,
    type WorkspaceMember as WorkspaceMember,
    type WorkspaceAdminCreateParams as WorkspaceAdminCreateParams,
    type WorkspaceAdminUpdateParams as WorkspaceAdminUpdateParams,
    type WorkspaceAdminListParams as WorkspaceAdminListParams,
  };

  export {
    Webhooks as Webhooks,
    type UnsafeUnwrapWebhookEvent as UnsafeUnwrapWebhookEvent,
    type UnwrapWebhookEvent as UnwrapWebhookEvent,
  };

  export {
    BulkWorkspaceResources as BulkWorkspaceResources,
    type AgentEntry as AgentEntry,
    type AgentScheduleEntry as AgentScheduleEntry,
    type AgentVariationEntry as AgentVariationEntry,
    type BulkWorkspaceApply as BulkWorkspaceApply,
    type BulkWorkspaceApplyData as BulkWorkspaceApplyData,
    type BulkWorkspaceApplyInfo as BulkWorkspaceApplyInfo,
    type BulkWorkspaceApplyStatus as BulkWorkspaceApplyStatus,
    type MemoryEntryItem as MemoryEntryItem,
    type MemoryLayerEntry as MemoryLayerEntry,
    type ToolEntry as ToolEntry,
    type ToolSetEntry as ToolSetEntry,
    type VariationAssignmentEntry as VariationAssignmentEntry,
    type VariationMemoryLayerEntry as VariationMemoryLayerEntry,
    type BulkWorkspaceAppliesCursorPagination as BulkWorkspaceAppliesCursorPagination,
    type BulkWorkspaceResourceRetrieveParams as BulkWorkspaceResourceRetrieveParams,
    type BulkWorkspaceResourceListParams as BulkWorkspaceResourceListParams,
    type BulkWorkspaceResourceApplyParams as BulkWorkspaceResourceApplyParams,
  };

  export type AccountResourceMetadata = API.AccountResourceMetadata;
  export type BareMetadata = API.BareMetadata;
  export type CreateOperationMetadata = API.CreateOperationMetadata;
  export type CreateResourceMetadata = API.CreateResourceMetadata;
  export type OperationMetadata = API.OperationMetadata;
  export type ResourceMetadata = API.ResourceMetadata;
  export type UpdateResourceMetadata = API.UpdateResourceMetadata;
}
