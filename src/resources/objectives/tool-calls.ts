// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';
import { APIPromise } from '../../core/api-promise';
import { CursorPagination, type CursorPaginationParams, PagePromise } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class ToolCalls extends APIResource {
  /**
   * Lists all tool calls for an objective
   */
  list(
    objectiveID: string,
    query: ToolCallListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ObjectiveToolCallsCursorPagination, ObjectiveToolCall> {
    return this._client.getAPIList(
      path`/v1/objectives/${objectiveID}/tool_calls`,
      CursorPagination<ObjectiveToolCall>,
      { query, ...options },
    );
  }

  /**
   * When an agent attempts to use a tool that requires approval, use this endpoint
   * to mark it as approved. You may optionally include a memo in the approval as
   * well.
   */
  approve(
    toolCallID: string,
    params: ToolCallApproveParams,
    options?: RequestOptions,
  ): APIPromise<ObjectiveToolCall> {
    const { objectiveId, ...body } = params;
    return this._client.put(path`/v1/objectives/${objectiveId}/tool_calls/${toolCallID}/approve`, {
      body,
      ...options,
    });
  }

  /**
   * When an agent attempts to use a tool that requires approval, use this endpoint
   * to mark it as denied. You may optionally include a memo in the denial as well.
   * If provided, the memo is passed to the agent when a rejection occurs so you may
   * provide further instructions.
   */
  deny(
    toolCallID: string,
    params: ToolCallDenyParams,
    options?: RequestOptions,
  ): APIPromise<ObjectiveToolCall> {
    const { objectiveId, ...body } = params;
    return this._client.put(path`/v1/objectives/${objectiveId}/tool_calls/${toolCallID}/deny`, {
      body,
      ...options,
    });
  }
}

export type ObjectiveToolCallsCursorPagination = CursorPagination<ObjectiveToolCall>;

/**
 * ObjectiveToolCall is a record of a tool call made during an objective's
 * execution. Tool calls are mutable — their status changes as they are approved,
 * denied, or executed.
 */
export interface ObjectiveToolCall {
  /**
   * Metadata for ephemeral operations and activities (e.g., objectives, executions,
   * runs)
   */
  metadata: Shared.OperationMetadata;

  /**
   * Profile represents a human user at the account level. Profiles are
   * account-scoped resources that can be associated with multiple workspaces through
   * the Actor model. Authentication for profiles is handled via SSO/OAuth (WorkOS).
   */
  approvedBy?: Shared.Profile;

  /**
   * The arguments passed to the tool
   */
  arguments?: { [key: string]: unknown };

  /**
   * CallableTool is a union that represents a tool that can be called by an agent.
   * In Cadenya, a tool that is used within an agent objective might be a
   * user-defined tool (IE: MCP, HTTP), another Agent (useful to separate context),
   * and a Cadenya Tool (one Cadenya provides). These tools
   */
  callable?: Shared.CallableTool;

  /**
   * Profile represents a human user at the account level. Profiles are
   * account-scoped resources that can be associated with multiple workspaces through
   * the Actor model. Authentication for profiles is handled via SSO/OAuth (WorkOS).
   */
  deniedBy?: Shared.Profile;

  /**
   * A memo supplied by the approver or denier
   */
  memo?: string;

  /**
   * The objective this tool call belongs to
   */
  objectiveId?: string;

  /**
   * The result content returned by the tool after execution
   */
  result?: string;

  /**
   * Current status of the tool call
   */
  status?:
    | 'TOOL_CALL_STATUS_PENDING'
    | 'TOOL_CALL_STATUS_APPROVED'
    | 'TOOL_CALL_STATUS_DENIED'
    | 'TOOL_CALL_STATUS_EXECUTED';
}

export interface ToolCallListParams extends CursorPaginationParams {}

export interface ToolCallApproveParams {
  /**
   * Path param: The ID of the objective. Supports "eid:" prefix for external IDs.
   */
  objectiveId: string;

  /**
   * Body param: A memo to associate to the tool call approval
   */
  memo?: string;
}

export interface ToolCallDenyParams {
  /**
   * Path param: The ID of the objective. Supports "eid:" prefix for external IDs.
   */
  objectiveId: string;

  /**
   * Body param: A memo to associate to the tool call denial
   */
  memo?: string;
}

export declare namespace ToolCalls {
  export {
    type ObjectiveToolCall as ObjectiveToolCall,
    type ObjectiveToolCallsCursorPagination as ObjectiveToolCallsCursorPagination,
    type ToolCallListParams as ToolCallListParams,
    type ToolCallApproveParams as ToolCallApproveParams,
    type ToolCallDenyParams as ToolCallDenyParams,
  };
}
