// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';

export class Prompts extends APIResource {}

/**
 * Prompt resource
 */
export interface Prompt {
  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  metadata?: Shared.ResourceMetadata;

  /**
   * Prompt specification (user-provided configuration)
   */
  spec?: PromptSpec;
}

/**
 * Prompt specification (user-provided configuration)
 */
export interface PromptSpec {
  /**
   * Content of the prompt
   */
  content?: string;

  /**
   * Whether this is the default prompt for the agent
   */
  default?: boolean;

  /**
   * Selector for the objective labels. If an objective matches the selector, the
   * prompt will be included in the objective's system prompt. This label selector
   * matches the Kubernetes label selector logic, where if a key is provided, the
   * value must match the value of the objective's label with the same key. If a key
   * is provided but no value is provided, the objective's label with the same key
   * must exist.
   */
  objective_labels_selector?: { [key: string]: string };

  /**
   * Status of the prompt
   */
  status?: 'STATUS_ENABLED' | 'STATUS_DISABLED' | 'STATUS_ARCHIVED';
}

export declare namespace Prompts {
  export { type Prompt as Prompt, type PromptSpec as PromptSpec };
}
