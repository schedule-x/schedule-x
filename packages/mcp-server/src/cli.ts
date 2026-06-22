#!/usr/bin/env node
import { startStdioServer } from './transports/stdio.js'

startStdioServer().catch((error) => {
  console.error(error)
  process.exit(1)
})
