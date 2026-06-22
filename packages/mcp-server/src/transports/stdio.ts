import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { createScheduleXMcpServer } from '../server.js'

export async function startStdioServer() {
  const server = createScheduleXMcpServer()
  await server.connect(new StdioServerTransport())
}
