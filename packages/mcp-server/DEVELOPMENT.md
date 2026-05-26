# Development

1. Build the MCP server from the repo root:

```bash
npm run build --workspace @schedule-x/mcp
```

2. Print the local MCP config:

```bash
npm run local:config --workspace @schedule-x/mcp
```

3. Paste the printed config into your MCP client config for the project where you want to test Schedule-X.

Example output:

```json
{
  "mcpServers": {
    "schedule-x": {
      "command": "node",
      "args": [
        "/Users/tomosterlund/Projects/schedule-x/schedule-x/packages/mcp-server/dist/cli.js"
      ]
    }
  }
}
```

4. Restart the MCP client.

5. In that project, ask the client to use the `schedule-x` MCP server. For example:

```txt
Use the schedule-x MCP server to search the docs for React setup and create a basic calendar.
```

6. After changing the MCP server code, rebuild it:

```bash
npm run build --workspace @schedule-x/mcp
```

7. Restart the MCP client again so it launches the rebuilt server.

8. Run the smoke test:

```bash
npm run test --workspace @schedule-x/mcp
```

9. Optional: start the stdio server manually:

```bash
npm run start --workspace @schedule-x/mcp
```

This is only a low-level sanity check. A stdio MCP server is normally started by the MCP client and waits for MCP messages on stdin.

10. Verify the npm package payload:

```bash
npm pack --dry-run --workspace @schedule-x/mcp
```
