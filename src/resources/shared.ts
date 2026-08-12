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

  createdAt?: string;

  /**
   * External ID for the resource (e.g., a workflow ID from an external system)
   */
  externalId?: string;

  /**
   * Key-value pairs for categorization and filtering. Values are 0-63 alphanumeric
   * characters with "-", "\_", or "." allowed between; keys follow the same shape
   * and additionally accept an optional DNS-subdomain prefix (e.g. "cadenya.com/")
   * of at most 253 characters. Examples: {"environment": "production", "team":
   * "platform", "version": "v2"}
   */
  labels?: { [key: string]: string };
}

/**
 * BareMetadata contains the minimal metadata for a resource: the ID and an
 * optional human-readable name. These are used for reference fields where the full
 * metadata (account scoping, timestamps, labels, external IDs) is not needed —
 * e.g., the tool references inside an agent variation spec or the tools assigned
 * to an objective. Both fields are server-populated; clients provide IDs through
 * sibling fields rather than by constructing a BareMetadata themselves.
 */
export interface BareMetadata {
  id?: string;

  /**
   * Human-readable name of the referenced resource, populated by the server on reads
   * for convenience. Absent on references to resources that do not have a name
   * (e.g., objective tasks).
   */
  name?: string;
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
   * Key-value pairs for categorization and filtering. Values are 0-63 alphanumeric
   * characters with "-", "\_", or "." allowed between; keys follow the same shape
   * and additionally accept an optional DNS-subdomain prefix (e.g. "cadenya.com/")
   * of at most 253 characters. Examples: {"priority": "high", "source": "api",
   * "workflow": "onboarding"}
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
   * Key-value pairs for categorization and filtering. Values are 0-63 alphanumeric
   * characters with "-", "\_", or "." allowed between; keys follow the same shape
   * and additionally accept an optional DNS-subdomain prefix (e.g. "cadenya.com/")
   * of at most 253 characters. Examples: {"environment": "production", "team":
   * "platform", "version": "v2"}
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
   * Key-value pairs for categorization and filtering. Values are 0-63 alphanumeric
   * characters with "-", "\_", or "." allowed between; keys follow the same shape
   * and additionally accept an optional DNS-subdomain prefix (e.g. "cadenya.com/")
   * of at most 253 characters. Examples: {"priority": "high", "source": "api",
   * "workflow": "onboarding"}
   */
  labels?: { [key: string]: string };
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
   * Key-value pairs for categorization and filtering. Values are 0-63 alphanumeric
   * characters with "-", "\_", or "." allowed between; keys follow the same shape
   * and additionally accept an optional DNS-subdomain prefix (e.g. "cadenya.com/")
   * of at most 253 characters. Examples: {"environment": "production", "team":
   * "platform", "version": "v2"}
   */
  labels?: { [key: string]: string };

  /**
   * Timestamp when this resource was last updated
   */
  updatedAt?: string;
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
   * Key-value pairs for categorization and filtering. Values are 0-63 alphanumeric
   * characters with "-", "\_", or "." allowed between; keys follow the same shape
   * and additionally accept an optional DNS-subdomain prefix (e.g. "cadenya.com/")
   * of at most 253 characters. Examples: {"environment": "production", "team":
   * "platform", "version": "v2"}
   */
  labels?: { [key: string]: string };
}
