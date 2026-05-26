# @schedule-x/mcp

MCP server for Schedule-X documentation, starter guidance, and integration validation.

## Usage

```json
{
  "mcpServers": {
    "schedule-x": {
      "command": "npx",
      "args": ["-y", "@schedule-x/mcp"]
    }
  }
}
```

The server is local-first and runs over stdio. Its documentation index is generated from the Schedule-X website docs at package build time, so it does not need network access at runtime.

## Tools

- `search_docs`
- `get_doc`
- `list_plugins`
- `get_plugin_setup`
- `get_starter`
- `validate_event`
- `validate_calendar_config`
- `explain_temporal_usage`
