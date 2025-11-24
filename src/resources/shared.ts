// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as WorkspacesAPI from './workspaces';
import { CursorPagination } from '../core/pagination';

/**
 * Actor is the "through model" that associates account-level resources (Profiles,
 * API Keys) to specific workspaces. This allows a single Profile or API Key to
 * have access to multiple workspaces while maintaining proper isolation and audit
 * trails.
 *
 * Key relationships:
 *
 * - Actor belongs to both an Account and a Workspace (via ResourceMetadata)
 * - Actor references either a Profile (human) or API Key (machine) via IDs
 * - Every resource creation and operation is tagged with the actor_id
 *
 * Authentication flow:
 *
 * 1.  JWT token is validated and issuer is checked
 * 2.  If issuer is WorkOS -> Profile lookup -> Find/create Actor in workspace
 * 3.  If issuer is Cadenya -> API Key lookup -> Find/create Actor in workspace
 * 4.  All subsequent operations use the actor_id for audit and authorization
 */
export interface Actor {
  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  metadata?: ResourceMetadata;

  /**
   * ActorSpec defines the properties of an actor
   */
  spec?: Actor.Spec;
}

export namespace Actor {
  /**
   * ActorSpec defines the properties of an actor
   */
  export interface Spec {
    /**
     * ID of the API Key (for service accounts authenticated via Cadenya JWT)
     */
    apiKeyId?: string;

    /**
     * Display name of the actor (copied from Profile.spec.display_name or
     * APIKey.spec.description)
     */
    displayName?: string;

    /**
     * Email address of the actor (copied from Profile.spec.email or
     * APIKey.spec.description)
     */
    email?: string;

    /**
     * ID of the Integration (reserved for future use)
     */
    integrationId?: string;

    /**
     * ID of the Profile (for human users authenticated via SSO/OAuth)
     */
    profileId?: string;

    /**
     * Status of this actor in the workspace (can be disabled without affecting the
     * underlying Profile/APIKey)
     */
    status?: 'ACTOR_STATUS_UNSPECIFIED' | 'ACTOR_STATUS_ENABLED' | 'ACTOR_STATUS_SUSPENDED';

    /**
     * The type of actor (PROFILE, API_KEY, or future INTEGRATION)
     */
    type?: 'ACTOR_TYPE_UNSPECIFIED' | 'ACTOR_TYPE_PROFILE' | 'ACTOR_TYPE_API_KEY' | 'ACTOR_TYPE_INTEGRATION';
  }
}

/**
 * CallableTool is a union that represents a tool that can be called by an agent.
 * In Cadenya, a tool that is used within an agent objective might be a
 * user-defined tool (IE: MCP, HTTP), another Agent (useful to separate context),
 * and a Cadenya Tool (one Cadenya provides). These tools
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
 * Metadata for ephemeral operations and activities (e.g., objectives, executions,
 * runs)
 */
export interface OperationMetadata {
  /**
   * Unique identifier for the operation (UUID v7)
   */
  id?: string;

  /**
   * Account this operation belongs to for multi-tenant isolation (UUID v7)
   */
  accountId?: string;

  /**
   * ID of the actor (user or service account) that initiated this operation (UUID
   * v7)
   */
  actorId?: string;

  /**
   * Timestamp when this operation was created UUID v7 includes timestamp
   * information, but this explicit field enables easier querying
   */
  createdAt?: string;

  /**
   * ResourceReference is used when you only need the bare-bones of data about
   * something. Used for things like associations to keep API payloads/responses
   * lighter.
   */
  createdBy?: OperationMetadata.CreatedBy;

  /**
   * External ID for the operation (e.g., a workflow ID from an external system)
   */
  externalId?: string;

  /**
   * Arbitrary key-value pairs for categorization and filtering Examples:
   * {"priority": "high", "source": "api", "workflow": "onboarding"}
   */
  labels?: { [key: string]: string };

  /**
   * Workspace this operation belongs to for organizational grouping (UUID v7)
   */
  workspaceId?: string;
}

export namespace OperationMetadata {
  /**
   * ResourceReference is used when you only need the bare-bones of data about
   * something. Used for things like associations to keep API payloads/responses
   * lighter.
   */
  export interface CreatedBy {
    id?: string;

    name?: string;

    type?: string;
  }
}

/**
 * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
 */
export interface ResourceMetadata {
  /**
   * Unique identifier for the resource (UUID v7)
   */
  id?: string;

  /**
   * Account this resource belongs to for multi-tenant isolation (UUID v7)
   */
  accountId?: string;

  /**
   * ID of the actor (user or service account) that created this resource
   */
  actorId?: string;

  /**
   * External ID for the resource (e.g., a workflow ID from an external system)
   */
  externalId?: string;

  /**
   * Arbitrary key-value pairs for categorization and filtering Examples:
   * {"environment": "production", "team": "platform", "version": "v2"}
   */
  labels?: { [key: string]: string };

  /**
   * Human-readable name for the resource (e.g., "Customer Support Agent", "Email
   * Tool") Required for resources that users interact with directly
   */
  name?: string;

  /**
   * Workspace this resource belongs to for organizational grouping (UUID v7)
   */
  workspaceId?: string;
}

export interface Workspace {
  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  metadata?: ResourceMetadata;

  spec?: WorkspacesAPI.WorkspaceSpec;
}

export type WorkspacesCursorPagination = CursorPagination<Workspace>;
