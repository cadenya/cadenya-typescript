# Cadenya TypeScript MCP Server

It is generated with [Stainless](https://www.stainless.com/).

## Installation

### Building

Because it's not published yet, clone the repo and build it:

```sh
git clone git@github.com:stainless-sdks/cadenya-typescript.git
cd cadenya-typescript
./scripts/bootstrap
./scripts/build
```

### Running

```sh
# set env vars as needed
export CADENYA_API_KEY="My API Key"
node ./packages/mcp-server/dist/index.js
```

> [!NOTE]
> Once this package is [published to npm](https://www.stainless.com/docs/guides/publish), this will become: `npx -y cadenya-mcp-server`

### Via MCP Client

[Build the project](#building) as mentioned above.

There is a partial list of existing clients at [modelcontextprotocol.io](https://modelcontextprotocol.io/clients). If you already
have a client, consult their documentation to install the MCP server.

For clients with a configuration JSON, it might look something like this:

```json
{
  "mcpServers": {
    "cadenya_api": {
      "command": "node",
      "args": ["/path/to/local/cadenya-typescript/packages/mcp-server", "--client=claude", "--tools=dynamic"],
      "env": {
        "CADENYA_API_KEY": "My API Key"
      }
    }
  }
}
```

## Exposing endpoints to your MCP Client

There are two ways to expose endpoints as tools in the MCP server:

1. Exposing one tool per endpoint, and filtering as necessary
2. Exposing a set of tools to dynamically discover and invoke endpoints from the API

### Filtering endpoints and tools

You can run the package on the command line to discover and filter the set of tools that are exposed by the
MCP Server. This can be helpful for large APIs where including all endpoints at once is too much for your AI's
context window.

You can filter by multiple aspects:

- `--tool` includes a specific tool by name
- `--resource` includes all tools under a specific resource, and can have wildcards, e.g. `my.resource*`
- `--operation` includes just read (get/list) or just write operations

### Dynamic tools

If you specify `--tools=dynamic` to the MCP server, instead of exposing one tool per endpoint in the API, it will
expose the following tools:

1. `list_api_endpoints` - Discovers available endpoints, with optional filtering by search query
2. `get_api_endpoint_schema` - Gets detailed schema information for a specific endpoint
3. `invoke_api_endpoint` - Executes any endpoint with the appropriate parameters

This allows you to have the full set of API endpoints available to your MCP Client, while not requiring that all
of their schemas be loaded into context at once. Instead, the LLM will automatically use these tools together to
search for, look up, and invoke endpoints dynamically. However, due to the indirect nature of the schemas, it
can struggle to provide the correct properties a bit more than when tools are imported explicitly. Therefore,
you can opt-in to explicit tools, the dynamic tools, or both.

See more information with `--help`.

All of these command-line options can be repeated, combined together, and have corresponding exclusion versions (e.g. `--no-tool`).

Use `--list` to see the list of available tools, or see below.

### Specifying the MCP Client

Different clients have varying abilities to handle arbitrary tools and schemas.

You can specify the client you are using with the `--client` argument, and the MCP server will automatically
serve tools and schemas that are more compatible with that client.

- `--client=<type>`: Set all capabilities based on a known MCP client

  - Valid values: `openai-agents`, `claude`, `claude-code`, `cursor`
  - Example: `--client=cursor`

Additionally, if you have a client not on the above list, or the client has gotten better
over time, you can manually enable or disable certain capabilities:

- `--capability=<name>`: Specify individual client capabilities
  - Available capabilities:
    - `top-level-unions`: Enable support for top-level unions in tool schemas
    - `valid-json`: Enable JSON string parsing for arguments
    - `refs`: Enable support for $ref pointers in schemas
    - `unions`: Enable support for union types (anyOf) in schemas
    - `formats`: Enable support for format validations in schemas (e.g. date-time, email)
    - `tool-name-length=N`: Set maximum tool name length to N characters
  - Example: `--capability=top-level-unions --capability=tool-name-length=40`
  - Example: `--capability=top-level-unions,tool-name-length=40`

### Examples

1. Filter for read operations on cards:

```bash
--resource=cards --operation=read
```

2. Exclude specific tools while including others:

```bash
--resource=cards --no-tool=create_cards
```

3. Configure for Cursor client with custom max tool name length:

```bash
--client=cursor --capability=tool-name-length=40
```

4. Complex filtering with multiple criteria:

```bash
--resource=cards,accounts --operation=read --tag=kyc --no-tool=create_cards
```

## Running remotely

Launching the client with `--transport=http` launches the server as a remote server using Streamable HTTP transport. The `--port` setting can choose the port it will run on, and the `--socket` setting allows it to run on a Unix socket.

Authorization can be provided via the `Authorization` header using the Bearer scheme.

Additionally, authorization can be provided via the following headers:
| Header | Equivalent client option | Security scheme |
| ------------------- | ------------------------ | --------------- |
| `x-cadenya-api-key` | `apiKey` | bearerAuth |

A configuration JSON for this server might look like this, assuming the server is hosted at `http://localhost:3000`:

```json
{
  "mcpServers": {
    "cadenya_api": {
      "url": "http://localhost:3000",
      "headers": {
        "Authorization": "Bearer <auth value>"
      }
    }
  }
}
```

The command-line arguments for filtering tools and specifying clients can also be used as query parameters in the URL.
For example, to exclude specific tools while including others, use the URL:

```
http://localhost:3000?resource=cards&resource=accounts&no_tool=create_cards
```

Or, to configure for the Cursor client, with a custom max tool name length, use the URL:

```
http://localhost:3000?client=cursor&capability=tool-name-length%3D40
```

## Importing the tools and server individually

```js
// Import the server, generated endpoints, or the init function
import { server, endpoints, init } from "cadenya-mcp-server/server";

// import a specific tool
import retrieveAccount from "cadenya-mcp-server/tools/account/retrieve-account";

// initialize the server and all endpoints
init({ server, endpoints });

// manually start server
const transport = new StdioServerTransport();
await server.connect(transport);

// or initialize your own server with specific tools
const myServer = new McpServer(...);

// define your own endpoint
const myCustomEndpoint = {
  tool: {
    name: 'my_custom_tool',
    description: 'My custom tool',
    inputSchema: zodToJsonSchema(z.object({ a_property: z.string() })),
  },
  handler: async (client: client, args: any) => {
    return { myResponse: 'Hello world!' };
  })
};

// initialize the server with your custom endpoints
init({ server: myServer, endpoints: [retrieveAccount, myCustomEndpoint] });
```

## Available Tools

The following tools are available in this MCP server.

### Resource `account`:

- `retrieve_account` (`read`): Retrieves the current account for the token accessing the API. Useful to check if the credentials are valid.
- `setup_account` (`write`): Setup the account

### Resource `agents`:

- `create_agents` (`write`): Creates a new agent in the workspace
- `retrieve_agents` (`read`): Retrieves an agent by ID from the workspace
- `update_agents` (`write`): Updates an agent in the workspace
- `list_agents` (`read`): Lists all agents in the workspace
- `delete_agents` (`write`): Deletes an agent from the workspace

### Resource `agents.prompts`:

- `create_agents_prompts` (`write`): Creates a new prompt for an agent
- `retrieve_agents_prompts` (`read`): Retrieves a prompt by ID from an agent
- `update_agents_prompts` (`write`): Updates a prompt for an agent
- `list_agents_prompts` (`read`): Lists all prompts for an agent
- `delete_agents_prompts` (`write`): Deletes a prompt from an agent

### Resource `objectives`:

- `create_objectives` (`write`): Creates a new objective in the workspace
- `retrieve_objectives` (`read`): Retrieves an objective by ID from the workspace
- `list_objectives` (`read`): Lists all objectives in the workspace

### Resource `objectives.events`:

- `list_objectives_events` (`read`): Lists all events for an objective

### Resource `ping`:

- `check_ping` (`read`):

### Resource `search`:

- `search_tools_or_tool_sets_search` (`read`): Searches for tools or tool sets in the workspace

### Resource `tool_sets`:

- `create_tool_sets` (`write`): Creates a new tool set in the workspace
- `retrieve_tool_sets` (`read`): Retrieves a tool set by ID from the workspace
- `update_tool_sets` (`write`): Updates a tool set in the workspace
- `list_tool_sets` (`read`): Lists all tool sets in the workspace
- `delete_tool_sets` (`write`): Deletes a tool set in the workspace

### Resource `tool_sets.tools`:

- `create_tool_sets_tools` (`write`): Creates a new tool in the tool set
- `retrieve_tool_sets_tools` (`read`): Retrieves a tool by ID from the workspace
- `update_tool_sets_tools` (`write`): Updates a tool in the tool set
- `list_tool_sets_tools` (`read`): Lists all tools in the tool set
- `delete_tool_sets_tools` (`write`): Deletes a tool in the tool set

### Resource `workspaces`:

- `create_workspaces` (`write`): Creates a new workspace for the account
- `list_workspaces` (`read`): Lists all workspaces for the current account
