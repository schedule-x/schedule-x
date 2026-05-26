import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const packageDir = path.resolve(path.dirname(__filename), '..')
const cliPath = path.join(packageDir, 'dist/cli.js')

console.log(
  JSON.stringify(
    {
      mcpServers: {
        'schedule-x': {
          command: 'node',
          args: [cliPath],
        },
      },
    },
    null,
    2
  )
)
