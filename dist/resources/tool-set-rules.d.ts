import { HttpClient, RequestOptions, APIPromise } from '../core/http.js';
import type { ListToolSetRulesResponse, ToolActions, ToolRule } from '../types.js';
export interface ToolSetRuleListParams {
    /**
     * The workspace that owns the tool set.
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
}
export interface ToolSetRuleCreateParams {
    /**
     * A short name for the rule. Unique within the tool set, ignoring case.
     */
    name: string;
    /**
     * The workspace that owns the tool set.
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
    /**
     * Why the rule exists.
     */
    description?: string;
    /**
     * CEL expression over `tool`. Empty matches every tool in the set.
     */
    when?: string;
    /**
     * What the rule does to the tools it applies to.
     */
    actions?: ToolActions;
    /**
     * Create the rule switched off.
     */
    disabled?: boolean;
    /**
     * Zero-based place to insert the rule at. Rules at and after it move down
     *  by one. Omit to append the rule to the end of the list.
     */
    position?: number;
}
export interface ToolSetRuleRetrieveParams {
    /**
     * The workspace that owns the tool set.
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
}
export interface ToolSetRuleDeleteParams {
    /**
     * The workspace that owns the tool set.
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
}
export interface ToolSetRuleUpdateParams {
    /**
     * The workspace that owns the tool set.
     *
     * Defaults to the client-level `workspaceId` option or the CADENYA_WORKSPACE_ID environment variable.
     */
    workspaceId?: string;
    name?: string;
    description?: string;
    when?: string;
    actions?: ToolActions;
    disabled?: boolean;
    /**
     * Moves the rule to this zero-based place. The rules in between shift by
     *  one to make room.
     */
    position?: number;
    /**
     * Fields to update: any of `name`, `description`, `when`, `actions`,
     *  `disabled` and `position`.
     */
    updateMask?: string;
}
export declare class ToolSetRules {
    private readonly _client;
    constructor(_client: HttpClient);
    /**
     * List tool set rules
     *
     * @example
     * ```ts
     * const listToolSetRulesResponse = await client.toolSets.rules.list('tool_set_123');
     * ```
     */
    list(toolSetId: string, params?: ToolSetRuleListParams, options?: RequestOptions): APIPromise<ListToolSetRulesResponse>;
    /**
     * Create a tool set rule
     *
     * @example
     * ```ts
     * const toolRule = await client.toolSets.rules.create('tool_set_123', { name: 'sample' });
     * ```
     */
    create(toolSetId: string, params: ToolSetRuleCreateParams, options?: RequestOptions): APIPromise<ToolRule>;
    /**
     * Get a tool set rule by ID
     *
     * @example
     * ```ts
     * const toolRule = await client.toolSets.rules.retrieve('tool_set_123', '_123');
     * ```
     */
    retrieve(toolSetId: string, id: string, params?: ToolSetRuleRetrieveParams, options?: RequestOptions): APIPromise<ToolRule>;
    /**
     * Delete a tool set rule
     *
     * @example
     * ```ts
     * await client.toolSets.rules.delete('tool_set_123', '_123');
     * ```
     */
    delete(toolSetId: string, id: string, params?: ToolSetRuleDeleteParams, options?: RequestOptions): APIPromise<void>;
    /**
     * Update a tool set rule
     *
     * @example
     * ```ts
     * const toolRule = await client.toolSets.rules.update('tool_set_123', '_123');
     * ```
     */
    update(toolSetId: string, id: string, params?: ToolSetRuleUpdateParams, options?: RequestOptions): APIPromise<ToolRule>;
}
//# sourceMappingURL=tool-set-rules.d.ts.map