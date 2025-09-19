// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, Endpoint, HandlerFunction } from './types';

export { Metadata, Endpoint, HandlerFunction };

import retrieve_account from './account/retrieve-account';
import setup_account from './account/setup-account';
import create_agents from './agents/create-agents';
import retrieve_agents from './agents/retrieve-agents';
import update_agents from './agents/update-agents';
import list_agents from './agents/list-agents';
import delete_agents from './agents/delete-agents';
import create_agents_prompts from './agents/prompts/create-agents-prompts';
import retrieve_agents_prompts from './agents/prompts/retrieve-agents-prompts';
import update_agents_prompts from './agents/prompts/update-agents-prompts';
import list_agents_prompts from './agents/prompts/list-agents-prompts';
import delete_agents_prompts from './agents/prompts/delete-agents-prompts';
import create_objectives from './objectives/create-objectives';
import retrieve_objectives from './objectives/retrieve-objectives';
import list_objectives from './objectives/list-objectives';
import list_objectives_events from './objectives/events/list-objectives-events';
import check_ping from './ping/check-ping';
import search_tools_or_tool_sets_search from './search/search-tools-or-tool-sets-search';
import create_tool_sets from './tool-sets/create-tool-sets';
import retrieve_tool_sets from './tool-sets/retrieve-tool-sets';
import update_tool_sets from './tool-sets/update-tool-sets';
import list_tool_sets from './tool-sets/list-tool-sets';
import delete_tool_sets from './tool-sets/delete-tool-sets';
import create_tool_sets_tools from './tool-sets/tools/create-tool-sets-tools';
import retrieve_tool_sets_tools from './tool-sets/tools/retrieve-tool-sets-tools';
import update_tool_sets_tools from './tool-sets/tools/update-tool-sets-tools';
import list_tool_sets_tools from './tool-sets/tools/list-tool-sets-tools';
import delete_tool_sets_tools from './tool-sets/tools/delete-tool-sets-tools';
import create_workspaces from './workspaces/create-workspaces';
import list_workspaces from './workspaces/list-workspaces';

export const endpoints: Endpoint[] = [];

function addEndpoint(endpoint: Endpoint) {
  endpoints.push(endpoint);
}

addEndpoint(retrieve_account);
addEndpoint(setup_account);
addEndpoint(create_agents);
addEndpoint(retrieve_agents);
addEndpoint(update_agents);
addEndpoint(list_agents);
addEndpoint(delete_agents);
addEndpoint(create_agents_prompts);
addEndpoint(retrieve_agents_prompts);
addEndpoint(update_agents_prompts);
addEndpoint(list_agents_prompts);
addEndpoint(delete_agents_prompts);
addEndpoint(create_objectives);
addEndpoint(retrieve_objectives);
addEndpoint(list_objectives);
addEndpoint(list_objectives_events);
addEndpoint(check_ping);
addEndpoint(search_tools_or_tool_sets_search);
addEndpoint(create_tool_sets);
addEndpoint(retrieve_tool_sets);
addEndpoint(update_tool_sets);
addEndpoint(list_tool_sets);
addEndpoint(delete_tool_sets);
addEndpoint(create_tool_sets_tools);
addEndpoint(retrieve_tool_sets_tools);
addEndpoint(update_tool_sets_tools);
addEndpoint(list_tool_sets_tools);
addEndpoint(delete_tool_sets_tools);
addEndpoint(create_workspaces);
addEndpoint(list_workspaces);

export type Filter = {
  type: 'resource' | 'operation' | 'tag' | 'tool';
  op: 'include' | 'exclude';
  value: string;
};

export function query(filters: Filter[], endpoints: Endpoint[]): Endpoint[] {
  const allExcludes = filters.length > 0 && filters.every((filter) => filter.op === 'exclude');
  const unmatchedFilters = new Set(filters);

  const filtered = endpoints.filter((endpoint: Endpoint) => {
    let included = false || allExcludes;

    for (const filter of filters) {
      if (match(filter, endpoint)) {
        unmatchedFilters.delete(filter);
        included = filter.op === 'include';
      }
    }

    return included;
  });

  // Check if any filters didn't match
  const unmatched = Array.from(unmatchedFilters).filter((f) => f.type === 'tool' || f.type === 'resource');
  if (unmatched.length > 0) {
    throw new Error(
      `The following filters did not match any endpoints: ${unmatched
        .map((f) => `${f.type}=${f.value}`)
        .join(', ')}`,
    );
  }

  return filtered;
}

function match({ type, value }: Filter, endpoint: Endpoint): boolean {
  switch (type) {
    case 'resource': {
      const regexStr = '^' + normalizeResource(value).replace(/\*/g, '.*') + '$';
      const regex = new RegExp(regexStr);
      return regex.test(normalizeResource(endpoint.metadata.resource));
    }
    case 'operation':
      return endpoint.metadata.operation === value;
    case 'tag':
      return endpoint.metadata.tags.includes(value);
    case 'tool':
      return endpoint.tool.name === value;
  }
}

function normalizeResource(resource: string): string {
  return resource.toLowerCase().replace(/[^a-z.*\-_]*/g, '');
}
