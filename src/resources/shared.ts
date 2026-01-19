// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as WorkspacesAPI from './workspaces';
import { CursorPagination } from '../core/pagination';

/**
 * Actor is the "through model" that associates account-level resources (Profiles,
 * API Keys) to specific workspaces. This allows a single Profile to have access to
 * multiple workspaces while maintaining proper isolation and audit trails.
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
    email?: string;

    name?: string;

    profileId?: string;
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
   * External ID for the operation (e.g., a workflow ID from an external system)
   */
  externalId?: string;

  /**
   * Arbitrary key-value pairs for categorization and filtering Examples:
   * {"priority": "high", "source": "api", "workflow": "onboarding"}
   */
  labels?: { [key: string]: string };

  /**
   * The actor that created the resource
   */
  profileId?: string;

  /**
   * Workspace this operation belongs to for organizational grouping (UUID v7)
   */
  workspaceId?: string;
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
   * ID of the actor (user or service account) that created this resource
   */
  profileId?: string;

  /**
   * Workspace this resource belongs to for organizational grouping (UUID v7)
   */
  workspaceId?: string;
}

export interface Workspace {
  /**
   * AccountResourceMetadata is used to represent a resource that is associated to an
   * account but not to a workspace.
   */
  metadata?: Workspace.Metadata;

  spec?: WorkspacesAPI.WorkspaceSpec;
}

export namespace Workspace {
  /**
   * AccountResourceMetadata is used to represent a resource that is associated to an
   * account but not to a workspace.
   */
  export interface Metadata {
    /**
     * Unique identifier for the resource (UUID v7)
     */
    id?: string;

    /**
     * Account this resource belongs to for multi-tenant isolation (UUID v7)
     */
    accountId?: string;

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

    profileId?: string;
  }
}

export type WorkspacesCursorPagination = CursorPagination<Workspace>;
