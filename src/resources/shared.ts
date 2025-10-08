// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as Shared from './shared';
import * as WorkspacesAPI from './workspaces';
import { CursorPagination } from '../core/pagination';

export interface Account {
  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  metadata?: ResourceMetadata;

  spec?: Account.Spec;
}

export namespace Account {
  export interface Spec {
    billingEmail?: string;

    description?: string;

    domain?: string;

    workspaces?: Array<Shared.Workspace>;
  }
}

export interface Actor {
  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  metadata?: ResourceMetadata;

  spec?: Actor.Spec;
}

export namespace Actor {
  export interface Spec {
    /**
     * API Keys
     */
    apiKey?: Spec.APIKey;

    profile?: Shared.Profile;
  }

  export namespace Spec {
    /**
     * API Keys
     */
    export interface APIKey {
      /**
       * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
       */
      metadata?: Shared.ResourceMetadata;

      spec?: APIKey.Spec;
    }

    export namespace APIKey {
      export interface Spec {
        token?: string;
      }
    }
  }
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
   * If a resource is marked as managed, it indicates that it should only be modified
   * the actor that created it in the first place
   */
  managed?: boolean;

  /**
   * Some resources only allow certain fields to be modified after they are created
   * (like a tool set backed by an MCP server) You'll still be able to send other
   * fields in an update request, but don't expect them to be updated if they are not
   * included in this list. An empty/null list indicates that any field (except
   * read-only fields) can be updated on the resource.
   */
  modifiableFields?: string;

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

export interface Profile {
  email?: string;

  name?: string;
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
   * ID of the actor (user or service account) that created or last modified this
   * resource (UUID v7)
   */
  actorId?: string;

  /**
   * Optional short identifier for quick reference (e.g., "CSA-1", "email-v2") Useful
   * for agents where a memorable callsign is preferred over long UUIDs
   */
  callsign?: string;

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
