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
   * Retrieves a single tool call, including the content the tool returned. Media
   * content (images, audio) is served as short-lived signed URLs.
   */
  retrieve(
    toolCallID: string,
    params: ToolCallRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<ObjectiveToolCallWithResult> {
    const { workspaceId, objectiveId } = params;
    return this._client.get(
      path`/v1/workspaces/${workspaceId}/objectives/${objectiveId}/tool_calls/${toolCallID}`,
      options,
    );
  }

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
    return this._client.post(
      path`/v1/workspaces/${workspaceId}/objectives/${objectiveId}/tool_calls/${toolCallID}:approve`,
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
    return this._client.post(
      path`/v1/workspaces/${workspaceId}/objectives/${objectiveId}/tool_calls/${toolCallID}:deny`,
      { body, ...options },
    );
  }

  /**
   * For bare tool calls (tool sets with no execution adapter), sets the content an
   * external API consumer supplies for the call — used for human-in-the-loop tools
   * and reverse harnesses that execute tools locally and report results back.
   */
  setContent(
    toolCallID: string,
    params: ToolCallSetContentParams,
    options?: RequestOptions,
  ): APIPromise<ObjectiveToolCall> {
    const { workspaceId, objectiveId, ...body } = params;
    return this._client.post(
      path`/v1/workspaces/${workspaceId}/objectives/${objectiveId}/tool_calls/${toolCallID}:setContent`,
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

  executionStatus:
    | 'TOOL_CALL_EXECUTION_STATUS_UNSPECIFIED'
    | 'TOOL_CALL_EXECUTION_STATUS_PENDING'
    | 'TOOL_CALL_EXECUTION_STATUS_RUNNING'
    | 'TOOL_CALL_EXECUTION_STATUS_COMPLETED'
    | 'TOOL_CALL_EXECUTION_STATUS_ERRORED'
    | 'TOOL_CALL_EXECUTION_STATUS_WAITING_FOR_CONTENT';

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
   * List of resolved secrets used by the tool call
   */
  resolvedSecrets?: Array<ResolvedSecret>;

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

  /**
   * BareMetadata contains the minimal metadata for a resource: the ID and an
   * optional human-readable name. These are used for reference fields where the full
   * metadata (account scoping, timestamps, labels, external IDs) is not needed —
   * e.g., the tool references inside an agent variation spec or the tools assigned
   * to an objective. Both fields are server-populated; clients provide IDs through
   * sibling fields rather than by constructing a BareMetadata themselves.
   */
  tool?: Shared.BareMetadata;

  /**
   * BareMetadata contains the minimal metadata for a resource: the ID and an
   * optional human-readable name. These are used for reference fields where the full
   * metadata (account scoping, timestamps, labels, external IDs) is not needed —
   * e.g., the tool references inside an agent variation spec or the tools assigned
   * to an objective. Both fields are server-populated; clients provide IDs through
   * sibling fields rather than by constructing a BareMetadata themselves.
   */
  toolSet?: Shared.BareMetadata;
}

/**
 * ObjectiveToolCallResult is the content a tool returned after execution. Tools
 * can return multiple content blocks, and blocks can be multi-modal (text, image,
 * audio). Media blocks are stored by Cadenya and served as short-lived signed URLs
 * rather than inline bytes.
 */
export interface ObjectiveToolCallResult {
  content: Array<ObjectiveToolCallResultContentBlock>;
}

export interface ObjectiveToolCallResultAudioBlock {
  /**
   * When the signed URL expires.
   */
  expiresAt: string;

  /**
   * IANA media type of the stored audio, e.g. audio/wav.
   */
  mimeType: string;

  /**
   * Size of the stored audio in bytes.
   */
  sizeBytes: string;

  /**
   * Short-lived signed URL to download the stored audio.
   */
  url: string;
}

/**
 * ContentBlock is a single block of tool result content. Exactly one of the
 * variants is set.
 */
export interface ObjectiveToolCallResultContentBlock {
  audio?: ObjectiveToolCallResultAudioBlock;

  image?: ObjectiveToolCallResultImageBlock;

  text?: ObjectiveToolCallResultTextBlock;
}

export interface ObjectiveToolCallResultImageBlock {
  /**
   * When the signed URL expires.
   */
  expiresAt: string;

  /**
   * IANA media type of the stored image, e.g. image/png.
   */
  mimeType: string;

  /**
   * Size of the stored image in bytes.
   */
  sizeBytes: string;

  /**
   * Short-lived signed URL to download the stored image.
   */
  url: string;
}

export interface ObjectiveToolCallResultTextBlock {
  text: string;
}

/**
 * ObjectiveToolCallWithResult is an ObjectiveToolCall plus the content the tool
 * returned. Returned by GetObjectiveToolCall.
 */
export interface ObjectiveToolCallWithResult {
  data: ObjectiveToolCallData;

  executionStatus:
    | 'TOOL_CALL_EXECUTION_STATUS_UNSPECIFIED'
    | 'TOOL_CALL_EXECUTION_STATUS_PENDING'
    | 'TOOL_CALL_EXECUTION_STATUS_RUNNING'
    | 'TOOL_CALL_EXECUTION_STATUS_COMPLETED'
    | 'TOOL_CALL_EXECUTION_STATUS_ERRORED'
    | 'TOOL_CALL_EXECUTION_STATUS_WAITING_FOR_CONTENT';

  info: ObjectiveToolCallInfo;

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

  /**
   * List of resolved secrets used by the tool call
   */
  resolvedSecrets?: Array<ResolvedSecret>;

  /**
   * ObjectiveToolCallResult is the content a tool returned after execution. Tools
   * can return multiple content blocks, and blocks can be multi-modal (text, image,
   * audio). Media blocks are stored by Cadenya and served as short-lived signed URLs
   * rather than inline bytes.
   */
  result?: ObjectiveToolCallResult;
}

/**
 * ResolvedSecret is a resolved secret value from the workspace, toolset, or
 * objective. When a tool is called, it will rely on secrets in the order of:
 *
 * - Objective
 * - Toolset
 * - Workspace
 */
export interface ResolvedSecret {
  key?: string;

  source?:
    | 'RESOLVED_SECRET_SOURCE_UNSPECIFIED'
    | 'RESOLVED_SECRET_SOURCE_WORKSPACE'
    | 'RESOLVED_SECRET_SOURCE_TOOLSET'
    | 'RESOLVED_SECRET_SOURCE_OBJECTIVE';
}

export interface SetToolCallContentRequestAudioBlock {
  /**
   * Base64-encoded audio bytes.
   */
  data: string;

  /**
   * IANA media type of the audio, e.g. audio/wav.
   */
  mimeType: string;
}

/**
 * ContentBlock is a single block of tool call content supplied on input. Exactly
 * one of the variants is set.
 */
export interface SetToolCallContentRequestContentBlock {
  audio?: SetToolCallContentRequestAudioBlock;

  image?: SetToolCallContentRequestImageBlock;

  text?: SetToolCallContentRequestTextBlock;
}

export interface SetToolCallContentRequestImageBlock {
  /**
   * Base64-encoded image bytes.
   */
  data: string;

  /**
   * IANA media type of the image, e.g. image/png.
   */
  mimeType: string;
}

export interface SetToolCallContentRequestTextBlock {
  text: string;
}

export interface ToolCallRetrieveParams {
  workspaceId: string;

  /**
   * The ID of the objective. Supports "external_id:" prefix for external IDs.
   */
  objectiveId: string;
}

export interface ToolCallListParams extends CursorPaginationParams {
  /**
   * Path param
   */
  workspaceId: string;

  /**
   * Query param: Filter by tool call execution status. Useful for reverse-harness
   * polling of bare tool calls waiting for externally supplied content
   * (TOOL_CALL_EXECUTION_STATUS_WAITING_FOR_CONTENT).
   */
  executionStatus?:
    | 'TOOL_CALL_EXECUTION_STATUS_UNSPECIFIED'
    | 'TOOL_CALL_EXECUTION_STATUS_PENDING'
    | 'TOOL_CALL_EXECUTION_STATUS_RUNNING'
    | 'TOOL_CALL_EXECUTION_STATUS_COMPLETED'
    | 'TOOL_CALL_EXECUTION_STATUS_ERRORED'
    | 'TOOL_CALL_EXECUTION_STATUS_WAITING_FOR_CONTENT';

  /**
   * Query param: When set to true you may use more of your alloted API rate-limit
   */
  includeInfo?: boolean;

  /**
   * Query param: Filters by metadata labels. Comma-separated key=value pairs, e.g.
   * "env=prod,team=ai". A resource matches only if every pair matches exactly (AND
   * semantics).
   */
  labels?: string;

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

export interface ToolCallSetContentParams {
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
   * Body param: The content to set on the tool call. Mirrors
   * ObjectiveToolCallResult.ContentBlock but writable: media blocks carry raw data
   * on input where the result-side carries a signed url on output.
   */
  content: Array<SetToolCallContentRequestContentBlock>;
}

export declare namespace ToolCalls {
  export {
    type ObjectiveToolCall as ObjectiveToolCall,
    type ObjectiveToolCallData as ObjectiveToolCallData,
    type ObjectiveToolCallInfo as ObjectiveToolCallInfo,
    type ObjectiveToolCallResult as ObjectiveToolCallResult,
    type ObjectiveToolCallResultAudioBlock as ObjectiveToolCallResultAudioBlock,
    type ObjectiveToolCallResultContentBlock as ObjectiveToolCallResultContentBlock,
    type ObjectiveToolCallResultImageBlock as ObjectiveToolCallResultImageBlock,
    type ObjectiveToolCallResultTextBlock as ObjectiveToolCallResultTextBlock,
    type ObjectiveToolCallWithResult as ObjectiveToolCallWithResult,
    type ResolvedSecret as ResolvedSecret,
    type SetToolCallContentRequestAudioBlock as SetToolCallContentRequestAudioBlock,
    type SetToolCallContentRequestContentBlock as SetToolCallContentRequestContentBlock,
    type SetToolCallContentRequestImageBlock as SetToolCallContentRequestImageBlock,
    type SetToolCallContentRequestTextBlock as SetToolCallContentRequestTextBlock,
    type ObjectiveToolCallsCursorPagination as ObjectiveToolCallsCursorPagination,
    type ToolCallRetrieveParams as ToolCallRetrieveParams,
    type ToolCallListParams as ToolCallListParams,
    type ToolCallApproveParams as ToolCallApproveParams,
    type ToolCallDenyParams as ToolCallDenyParams,
    type ToolCallSetContentParams as ToolCallSetContentParams,
  };
}
