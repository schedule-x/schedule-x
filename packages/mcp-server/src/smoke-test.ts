import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js'
import { createScheduleXMcpServer } from './server.js'

const server = createScheduleXMcpServer()
const client = new Client({
  name: '@schedule-x/mcp-smoke-test',
  version: '0.0.0',
})

const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair()

await Promise.all([
  server.connect(serverTransport),
  client.connect(clientTransport),
])

const tools = await client.listTools()
if (!tools.tools.some((tool) => tool.name === 'search_docs')) {
  throw new Error('Expected search_docs tool to be registered')
}

const result = await client.callTool({
  name: 'search_docs',
  arguments: {
    query: 'events service',
  },
})

const content = result.content as unknown[]
if (content.length === 0) {
  throw new Error('Expected search_docs to return content')
}

await client.close()
await server.close()
