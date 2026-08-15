import { WebhookHeaders, WebhookVerifyOptions } from './core/webhooks.js';
import type { ObjectiveEventWebhookData } from './types.js';
/**
 * Objective user message event
 */
export type ObjectiveEventUserMessageWebhookEvent = ObjectiveEventWebhookData & {
    type: 'objective_event.user_message';
};
/**
 * Objective assistant message event
 */
export type ObjectiveEventAssistantMessageWebhookEvent = ObjectiveEventWebhookData & {
    type: 'objective_event.assistant_message';
};
/**
 * Objective tool result event
 */
export type ObjectiveEventToolResultWebhookEvent = ObjectiveEventWebhookData & {
    type: 'objective_event.tool_result';
};
/**
 * Objective tool approval requested event
 */
export type ObjectiveEventToolApprovalRequestedWebhookEvent = ObjectiveEventWebhookData & {
    type: 'objective_event.tool_approval_requested';
};
/**
 * Objective tool called event
 */
export type ObjectiveEventToolCalledWebhookEvent = ObjectiveEventWebhookData & {
    type: 'objective_event.tool_called';
};
/**
 * Objective tool approved event
 */
export type ObjectiveEventToolApprovedWebhookEvent = ObjectiveEventWebhookData & {
    type: 'objective_event.tool_approved';
};
/**
 * Objective tool denied event
 */
export type ObjectiveEventToolDeniedWebhookEvent = ObjectiveEventWebhookData & {
    type: 'objective_event.tool_denied';
};
/**
 * Objective tool error event
 */
export type ObjectiveEventToolErrorWebhookEvent = ObjectiveEventWebhookData & {
    type: 'objective_event.tool_error';
};
/**
 * Objective sub-agent spawned event
 */
export type ObjectiveEventSubAgentSpawnedWebhookEvent = ObjectiveEventWebhookData & {
    type: 'objective_event.sub_agent_spawned';
};
/**
 * Objective sub-agent updated event
 */
export type ObjectiveEventSubAgentUpdatedWebhookEvent = ObjectiveEventWebhookData & {
    type: 'objective_event.sub_agent_updated';
};
/**
 * Objective error event
 */
export type ObjectiveEventErrorWebhookEvent = ObjectiveEventWebhookData & {
    type: 'objective_event.error';
};
/**
 * Objective memory read event
 */
export type ObjectiveEventMemoryReadWebhookEvent = ObjectiveEventWebhookData & {
    type: 'objective_event.memory_read';
};
/**
 * Objective reasoning event
 */
export type ObjectiveEventReasoningWebhookEvent = ObjectiveEventWebhookData & {
    type: 'objective_event.reasoning';
};
export type UnwrapWebhookEvent = ObjectiveEventUserMessageWebhookEvent | ObjectiveEventAssistantMessageWebhookEvent | ObjectiveEventToolResultWebhookEvent | ObjectiveEventToolApprovalRequestedWebhookEvent | ObjectiveEventToolCalledWebhookEvent | ObjectiveEventToolApprovedWebhookEvent | ObjectiveEventToolDeniedWebhookEvent | ObjectiveEventToolErrorWebhookEvent | ObjectiveEventSubAgentSpawnedWebhookEvent | ObjectiveEventSubAgentUpdatedWebhookEvent | ObjectiveEventErrorWebhookEvent | ObjectiveEventMemoryReadWebhookEvent | ObjectiveEventReasoningWebhookEvent;
export declare class Webhooks {
    private readonly secret;
    constructor(secret: string | undefined);
    /**
     * Verify a Standard Webhooks delivery (webhook-id / webhook-timestamp /
     * webhook-signature headers) and return its typed payload.
     */
    unwrap(payload: string, headers: WebhookHeaders, options?: WebhookVerifyOptions & {
        secret?: string;
    }): Promise<UnwrapWebhookEvent>;
}
//# sourceMappingURL=webhooks.d.ts.map