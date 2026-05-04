// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as AccountAPI from '../account';
import * as Shared from '../shared';
import * as ObjectivesAPI from './objectives';
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
    params: ToolCallListParams,
    options?: RequestOptions,
  ): PagePromise<ObjectiveToolCallsCursorPagination, ObjectiveToolCall> {
    const { workspaceId, ...query } = params;
    return this._client.getAPIList(
      path`/v1/workspaces/${workspaceId}/objectives/${objectiveID}/tool_calls`,
      CursorPagination<ObjectiveToolCall>,
      { query, ...options },
    );
  }

  /**
   * When an agent attempts to use a tool that requires approval, use this endpoint
   * to mark it as approved.
   */
  approve(
    toolCallID: string,
    params: ToolCallApproveParams,
    options?: RequestOptions,
  ): APIPromise<ObjectiveToolCall> {
    const { workspaceId, objectiveId, ...body } = params;
    return this._client.put(
      path`/v1/workspaces/${workspaceId}/objectives/${objectiveId}/tool_calls/${toolCallID}/approve`,
      { body, ...options },
    );
  }

  /**
   * When an agent attempts to use a tool that requires approval, use this endpoint
   * to mark it as denied. Use a memo to steer the LLM to a different decision or
   * usage of the tool.
   */
  deny(
    toolCallID: string,
    params: ToolCallDenyParams,
    options?: RequestOptions,
  ): APIPromise<ObjectiveToolCall> {
    const { workspaceId, objectiveId, ...body } = params;
    return this._client.put(
      path`/v1/workspaces/${workspaceId}/objectives/${objectiveId}/tool_calls/${toolCallID}/deny`,
      { body, ...options },
    );
  }
}

export type ObjectiveToolCallsCursorPagination = CursorPagination<ObjectiveToolCall>;

/**
 * ObjectiveToolCall is a record of a tool call made during an objective's
 * execution. Tool calls are mutable — their status changes as they are approved,
 * denied, or executed.
 */
export interface ObjectiveToolCall {
  data: ObjectiveToolCallData;

  /**
   * Metadata for ephemeral operations and activities (e.g., objectives, executions,
   * runs)
   */
  metadata: Shared.OperationMetadata;

  /**
   * Current status of the tool call
   */
  status:
    | 'TOOL_CALL_STATUS_UNSPECIFIED'
    | 'TOOL_CALL_STATUS_AUTO_APPROVED'
    | 'TOOL_CALL_STATUS_WAITING_FOR_APPROVAL'
    | 'TOOL_CALL_STATUS_APPROVED'
    | 'TOOL_CALL_STATUS_DENIED';

  executionStatus?:
    | 'TOOL_CALL_EXECUTION_STATUS_UNSPECIFIED'
    | 'TOOL_CALL_EXECUTION_STATUS_PENDING'
    | 'TOOL_CALL_EXECUTION_STATUS_RUNNING'
    | 'TOOL_CALL_EXECUTION_STATUS_COMPLETED'
    | 'TOOL_CALL_EXECUTION_STATUS_ERRORED';

  info?: ObjectiveToolCallInfo;
}

export interface ObjectiveToolCallData {
  /**
   * CallableTool is a union that represents a tool that can be called by an agent.
   * In Cadenya, a tool that is used within an agent objective might be a
   * user-defined tool (IE: MCP, HTTP), another Agent (useful to separate context),
   * or a Cadenya Tool (one Cadenya provides).
   */
  callable: ObjectivesAPI.CallableTool;

  /**
   * The arguments passed to the tool
   */
  arguments?: { [key: string]: unknown };

  /**
   * A memo supplied by the reviewer when denying the tool call
   */
  memo?: string;

  /**
   * The result content returned by the tool after execution
   */
  result?: string;

  /**
   * A profile identifies a user or non-human principal (such as an API key) at the
   * account level. Profiles are account-scoped and can be granted access to multiple
   * workspaces.
   */
  statusChangedBy?: AccountAPI.Profile;
}

export interface ObjectiveToolCallInfo {
  /**
   * A profile identifies a user or non-human principal (such as an API key) at the
   * account level. Profiles are account-scoped and can be granted access to multiple
   * workspaces.
   */
  createdBy?: AccountAPI.Profile;

  /**
   * Metadata for ephemeral operations and activities (e.g., objectives, executions,
   * runs)
   */
  objective?: Shared.OperationMetadata;
}

export interface ToolCallListParams extends CursorPaginationParams {
  /**
   * Path param
   */
  workspaceId: string;

  /**
   * Query param: When set to true you may use more of your alloted API rate-limit
   */
  includeInfo?: boolean;

  /**
   * Query param: Filter by tool call status
   */
  status?:
    | 'TOOL_CALL_STATUS_UNSPECIFIED'
    | 'TOOL_CALL_STATUS_AUTO_APPROVED'
    | 'TOOL_CALL_STATUS_WAITING_FOR_APPROVAL'
    | 'TOOL_CALL_STATUS_APPROVED'
    | 'TOOL_CALL_STATUS_DENIED';
}

export interface ToolCallApproveParams {
  workspaceId: string;

  /**
   * The ID of the objective. Supports "external_id:" prefix for external IDs.
   */
  objectiveId: string;
}

export interface ToolCallDenyParams {
  /**
   * Path param
   */
  workspaceId: string;

  /**
   * Path param: The ID of the objective. Supports "external_id:" prefix for external
   * IDs.
   */
  objectiveId: string;

  /**
   * Body param: A memo to associate to the tool call denial. Use a memo to steer the
   * LLM to a different decision or usage of the tool.
   */
  memo?: string;
}

export declare namespace ToolCalls {
  export {
    type ObjectiveToolCall as ObjectiveToolCall,
    type ObjectiveToolCallData as ObjectiveToolCallData,
    type ObjectiveToolCallInfo as ObjectiveToolCallInfo,
    type ObjectiveToolCallsCursorPagination as ObjectiveToolCallsCursorPagination,
    type ToolCallListParams as ToolCallListParams,
    type ToolCallApproveParams as ToolCallApproveParams,
    type ToolCallDenyParams as ToolCallDenyParams,
  };
}
