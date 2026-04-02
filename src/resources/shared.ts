// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as WorkspacesAPI from './workspaces';
import { CursorPagination } from '../core/pagination';

export interface Account {
  /**
   * AccountResourceMetadata is used to represent a resource that is associated to an
   * account but not to a workspace.
   */
  metadata: AccountResourceMetadata;

  spec: AccountSpec;
}

/**
 * AccountResourceMetadata is used to represent a resource that is associated to an
 * account but not to a workspace.
 */
export interface AccountResourceMetadata {
  /**
   * Unique identifier for the resource (prefixed ULID, e.g., "apikey_01HXK...")
   */
  id: string;

  /**
   * Account this resource belongs to for multi-tenant isolation (prefixed ULID)
   */
  accountId: string;

  /**
   * Human-readable name for the resource (e.g., "Customer Support Agent", "Email
   * Tool") Required for resources that users interact with directly
   */
  name: string;

  profileId: string;

  /**
   * External ID for the resource (e.g., a workflow ID from an external system)
   */
  externalId?: string;

  /**
   * Arbitrary key-value pairs for categorization and filtering Examples:
   * {"environment": "production", "team": "platform", "version": "v2"}
   */
  labels?: { [key: string]: string };
}

export interface AccountSpec {
  billingEmail?: string;

  description?: string;

  domain?: string;

  workspaces?: Array<Workspace>;
}

/**
 * BareMetadata contains the minimal metadata for a resource, including the ID.
 * These are used sparingly in Cadenya for resources where the full metadata is not
 * needed. You will come across them in list responses and other places where the
 * full metadata is not required like listing the tools that were assigned to an
 * objective. Because these types records are commonly created by other processes
 * in Cadenya, they do not have things like external IDs, labels, or names.
 */
export interface BareMetadata {
  id: string;
}

/**
 * CallableTool is a union that represents a tool that can be called by an agent.
 * In Cadenya, a tool that is used within an agent objective might be a
 * user-defined tool (IE: MCP, HTTP), another Agent (useful to separate context),
 * or a Cadenya Tool (one Cadenya provides).
 */
export interface CallableTool {
  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  agent?: ResourceMetadata;

  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  cadenyaProvidedTool?: ResourceMetadata;

  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  tool?: ResourceMetadata;
}

/**
 * CreateOperationMetadata contains the user-provided fields for creating an
 * operation. Read-only fields (id, account_id, workspace_id, created_at,
 * profile_id) are excluded since they are set by the server.
 */
export interface CreateOperationMetadata {
  /**
   * External ID for the operation (e.g., a workflow ID from an external system)
   */
  externalId?: string;

  /**
   * Arbitrary key-value pairs for categorization and filtering Examples:
   * {"priority": "high", "source": "api", "workflow": "onboarding"}
   */
  labels?: { [key: string]: string };
}

/**
 * CreateResourceMetadata contains the user-provided fields for creating a
 * workspace-scoped resource. Read-only fields (id, account_id, workspace_id,
 * profile_id, created_at) are excluded since they are set by the server.
 */
export interface CreateResourceMetadata {
  /**
   * Human-readable name for the resource (e.g., "Customer Support Agent", "Email
   * Tool")
   */
  name: string;

  /**
   * External ID for the resource (e.g., a workflow ID from an external system)
   */
  externalId?: string;

  /**
   * Arbitrary key-value pairs for categorization and filtering Examples:
   * {"environment": "production", "team": "platform", "version": "v2"}
   */
  labels?: { [key: string]: string };
}

/**
 * Metadata for ephemeral operations and activities (e.g., objectives, executions,
 * runs)
 */
export interface OperationMetadata {
  /**
   * Unique identifier for the operation (prefixed ULID, e.g., "obj_01HXK...")
   */
  id: string;

  /**
   * Account this operation belongs to for multi-tenant isolation (prefixed ULID)
   */
  accountId: string;

  /**
   * Timestamp when this operation was created ULID includes timestamp information,
   * but this explicit field enables easier querying
   */
  createdAt: string;

  /**
   * ID of the actor (user or service account) that created this operation
   */
  profileId: string;

  /**
   * Workspace this operation belongs to for organizational grouping (prefixed ULID)
   */
  workspaceId: string;

  /**
   * External ID for the operation (e.g., a workflow ID from an external system)
   */
  externalId?: string;

  /**
   * Arbitrary key-value pairs for categorization and filtering Examples:
   * {"priority": "high", "source": "api", "workflow": "onboarding"}
   */
  labels?: { [key: string]: string };
}

/**
 * Profile represents a human user at the account level. Profiles are
 * account-scoped resources that can be associated with multiple workspaces through
 * the Actor model. Authentication for profiles is handled via SSO/OAuth (WorkOS).
 */
export interface Profile {
  /**
   * AccountResourceMetadata is used to represent a resource that is associated to an
   * account but not to a workspace.
   */
  metadata: AccountResourceMetadata;

  /**
   * ProfileSpec contains the profile-specific fields
   */
  spec: ProfileSpec;
}

/**
 * ProfileSpec contains the profile-specific fields
 */
export interface ProfileSpec {
  /**
   * Type is the type of profile. User's are humans, API keys are computers. You know
   * the deal.
   */
  type: 'PROFILE_TYPE_USER' | 'PROFILE_TYPE_API_KEY' | 'PROFILE_TYPE_SYSTEM';

  /**
   * Email address of the user (required, unique per account)
   */
  email?: string;

  /**
   * Display name for the user (e.g., "Bobby Tables")
   */
  name?: string;
}

/**
 * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
 */
export interface ResourceMetadata {
  /**
   * Unique identifier for the resource (prefixed ULID, e.g., "agent_01HXK...")
   */
  id: string;

  /**
   * Account this resource belongs to for multi-tenant isolation (prefixed ULID)
   */
  accountId: string;

  /**
   * Timestamp when this resource was created
   */
  createdAt: string;

  /**
   * Human-readable name for the resource (e.g., "Customer Support Agent", "Email
   * Tool") Required for resources that users interact with directly
   */
  name: string;

  /**
   * ID of the actor (user or service account) that created this resource
   */
  profileId: string;

  /**
   * Workspace this resource belongs to for organizational grouping (prefixed ULID)
   */
  workspaceId: string;

  /**
   * External ID for the resource (e.g., a workflow ID from an external system)
   */
  externalId?: string;

  /**
   * Arbitrary key-value pairs for categorization and filtering Examples:
   * {"environment": "production", "team": "platform", "version": "v2"}
   */
  labels?: { [key: string]: string };
}

/**
 * UpdateResourceMetadata contains the user-provided fields for updating a
 * workspace-scoped resource. Read-only fields (id, account_id, workspace_id,
 * profile_id, created_at) are excluded since they are set by the server.
 */
export interface UpdateResourceMetadata {
  /**
   * Human-readable name for the resource (e.g., "Customer Support Agent", "Email
   * Tool")
   */
  name: string;

  /**
   * External ID for the resource (e.g., a workflow ID from an external system)
   */
  externalId?: string;

  /**
   * Arbitrary key-value pairs for categorization and filtering Examples:
   * {"environment": "production", "team": "platform", "version": "v2"}
   */
  labels?: { [key: string]: string };
}

export interface Workspace {
  /**
   * AccountResourceMetadata is used to represent a resource that is associated to an
   * account but not to a workspace.
   */
  metadata: AccountResourceMetadata;

  spec: WorkspacesAPI.WorkspaceSpec;
}

export interface WorkspaceSpec {
  description?: string;
}

export type WorkspacesCursorPagination = CursorPagination<Workspace>;
