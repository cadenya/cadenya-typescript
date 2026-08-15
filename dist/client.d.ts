import type { Logger, LogLevel } from './core/http.js';
import { Webhooks } from './webhooks.js';
import { Accounts } from './resources/accounts.js';
import { ApiKeys } from './resources/api-keys.js';
import { WorkspaceAdmin } from './resources/workspace-admin.js';
import { Profiles } from './resources/profiles.js';
import { Workspaces } from './resources/workspaces.js';
import { Agents } from './resources/agents.js';
import { AiProviderKeys } from './resources/ai-provider-keys.js';
import { MemoryLayers } from './resources/memory-layers.js';
import { Models } from './resources/models.js';
import { Objectives } from './resources/objectives.js';
import { ToolSearch } from './resources/tool-search.js';
import { Tenants } from './resources/tenants.js';
import { ToolSets } from './resources/tool-sets.js';
import { Uploads } from './resources/uploads.js';
import { WidgetSessions } from './resources/widget-sessions.js';
import { Widgets } from './resources/widgets.js';
import { WorkspaceSecrets } from './resources/workspace-secrets.js';
export interface ClientOptions {
    /** API key. Defaults to the CADENYA_API_KEY environment variable. */
    apiKey?: string;
    /** Override the API base URL. Defaults to https://api.cadenya.com. */
    baseURL?: string;
    /** Max automatic retries for retryable failures. Defaults to 0. */
    maxRetries?: number;
    /**
     * Deadline for ordinary (non-streaming) requests in milliseconds; override
     * per request with `options.timeout`. Streams bound only response-header
     * acquisition — body lifetime stays under the caller's AbortSignal.
     * Defaults to 60000; a non-finite or <= 0 value disables the deadline.
     */
    timeout?: number;
    /** Headers sent with every request. */
    defaultHeaders?: Record<string, string>;
    /** Custom fetch implementation. */
    fetch?: typeof fetch;
    /** Destination for SDK logs. Defaults to `console`. */
    logger?: Logger;
    /** 'debug' | 'warn' (default) | 'off'. Never logs headers or bodies. */
    logLevel?: LogLevel;
    /** Default `workspaceId` for every call that takes one. Defaults to the CADENYA_WORKSPACE_ID environment variable. */
    workspaceId?: string;
    /** Secret for webhook signature verification. Defaults to the CADENYA_WEBHOOK_SECRET environment variable. */
    webhookSecret?: string;
}
export declare class Cadenya {
    readonly accounts: Accounts;
    readonly apiKeys: ApiKeys;
    readonly workspaceAdmin: WorkspaceAdmin;
    readonly profiles: Profiles;
    readonly workspaces: Workspaces;
    readonly agents: Agents;
    readonly aiProviderKeys: AiProviderKeys;
    readonly memoryLayers: MemoryLayers;
    readonly models: Models;
    readonly objectives: Objectives;
    readonly toolSearch: ToolSearch;
    readonly tenants: Tenants;
    readonly toolSets: ToolSets;
    readonly uploads: Uploads;
    readonly widgetSessions: WidgetSessions;
    readonly widgets: Widgets;
    readonly workspaceSecrets: WorkspaceSecrets;
    readonly webhooks: Webhooks;
    private readonly _client;
    constructor(options?: ClientOptions);
}
//# sourceMappingURL=client.d.ts.map