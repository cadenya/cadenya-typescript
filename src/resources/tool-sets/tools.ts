// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';

export class Tools extends APIResource {}

export interface ConfigHTTP {
  headers?: { [key: string]: string };

  path?: string;

  query?: string;

  request_body_content_type?: string;

  /**
   * These are only used when the request method is a POST, PUT, or PATCH
   */
  request_body_template?: string;

  request_method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
}

export interface ConfigMcp {
  tool_description?: string;

  tool_name?: string;

  tool_title?: string;
}

export interface Tool {
  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  metadata?: Shared.ResourceMetadata;

  spec?: ToolSpec;
}

export interface ToolSpec {
  /**
   * Config defines the adapter to use for the tool. This is used to determine how
   * the tool is called. For example, if the tool is an HTTP tool, the adapter will
   * be Http. If the tool is an inline tool, the adapter will be Inline.
   */
  config?: ToolSpecConfig;

  content_filter?: ToolSpecContentFilter;

  description?: string;

  index_content?: string;

  name?: string;

  parameters?: { [key: string]: unknown };

  requires_approval?: boolean;

  status?: 'STATUS_ENABLED' | 'STATUS_DISABLED' | 'STATUS_ARCHIVED';

  tool_set_id?: string;
}

/**
 * Config defines the adapter to use for the tool. This is used to determine how
 * the tool is called. For example, if the tool is an HTTP tool, the adapter will
 * be Http. If the tool is an inline tool, the adapter will be Inline.
 */
export interface ToolSpecConfig {
  http?: ConfigHTTP;

  mcp?: ConfigMcp;
}

export interface ToolSpecContentFilter {
  jq?: string;

  regex?: string;
}

export declare namespace Tools {
  export {
    type ConfigHTTP as ConfigHTTP,
    type ConfigMcp as ConfigMcp,
    type Tool as Tool,
    type ToolSpec as ToolSpec,
    type ToolSpecConfig as ToolSpecConfig,
    type ToolSpecContentFilter as ToolSpecContentFilter,
  };
}
