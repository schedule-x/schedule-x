import {
  McpServer,
  ResourceTemplate,
} from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'
import { docsIndex } from './generated/docs-index.js'
import { formatDoc, jsonText, pluginInstallCommand, text } from './format.js'
import { searchDocs } from './search.js'
import { getStarter } from './starters.js'
import { validateCalendarConfig, validateEvent } from './validation.js'

const serverName = '@schedule-x/mcp'

function getDocById(id: string) {
  return docsIndex.docs.find((entry) => entry.id === id)
}

function getPlugin(id: string) {
  return docsIndex.plugins.find((plugin) => plugin.id === id)
}

export function createScheduleXMcpServer() {
  const server = new McpServer({
    name: serverName,
    version: docsIndex.docsVersion,
  })

  server.registerTool(
    'search_docs',
    {
      title: 'Search Schedule-X docs',
      description:
        'Search the generated Schedule-X documentation index. Use this before implementing unfamiliar Schedule-X APIs.',
      inputSchema: {
        query: z.string().min(1),
        limit: z.number().int().min(1).max(12).optional(),
      },
    },
    ({ query, limit }) => jsonText(searchDocs(docsIndex.docs, query, limit))
  )

  server.registerTool(
    'get_doc',
    {
      title: 'Get Schedule-X doc',
      description:
        'Return a full generated docs entry by id. Use search_docs first if the id is unknown.',
      inputSchema: {
        id: z.string().min(1),
      },
    },
    ({ id }) => {
      const doc = getDocById(id)
      if (!doc) return text(`No Schedule-X docs entry found for id: ${id}`)
      return text(formatDoc(doc))
    }
  )

  server.registerTool(
    'list_plugins',
    {
      title: 'List Schedule-X plugins',
      description:
        'List known Schedule-X plugins with docs URLs, package names, and premium status.',
      inputSchema: {},
    },
    () => jsonText(docsIndex.plugins)
  )

  server.registerTool(
    'get_plugin_setup',
    {
      title: 'Get plugin setup',
      description:
        'Return package and docs guidance for a Schedule-X plugin by id, such as events-service or calendar-controls.',
      inputSchema: {
        pluginId: z.string().min(1),
      },
    },
    ({ pluginId }) => {
      const plugin = getPlugin(pluginId)
      if (!plugin) return text(`No Schedule-X plugin found for id: ${pluginId}`)

      return jsonText({
        ...plugin,
        install: pluginInstallCommand(plugin),
        notes: plugin.isPremium
          ? [
              'This is a premium plugin. See the plugin docs for installation details.',
            ]
          : [],
      })
    }
  )

  server.registerTool(
    'get_starter',
    {
      title: 'Get Schedule-X starter',
      description:
        'Generate starter installation and code guidance for a framework. Currently strongest for vanilla and React.',
      inputSchema: {
        framework: z
          .enum(['vanilla', 'react', 'vue', 'angular', 'svelte', 'preact'])
          .default('vanilla'),
        features: z.array(z.string()).optional(),
      },
    },
    ({ framework, features }) => jsonText(getStarter(framework, features))
  )

  server.registerTool(
    'validate_event',
    {
      title: 'Validate Schedule-X event',
      description:
        'Check a Schedule-X event object for common shape mistakes and Temporal usage issues.',
      inputSchema: {
        event: z.record(z.string(), z.unknown()),
        calendars: z.record(z.string(), z.unknown()).optional(),
      },
    },
    ({ event, calendars }) => jsonText(validateEvent(event, calendars))
  )

  server.registerTool(
    'validate_calendar_config',
    {
      title: 'Validate Schedule-X calendar config',
      description:
        'Check a Schedule-X calendar config object for common setup mistakes.',
      inputSchema: {
        config: z.record(z.string(), z.unknown()),
      },
    },
    ({ config }) => jsonText(validateCalendarConfig(config))
  )

  server.registerTool(
    'explain_temporal_usage',
    {
      title: 'Explain Schedule-X Temporal usage',
      description:
        'Explain when to use Temporal.PlainDate versus Temporal.ZonedDateTime in Schedule-X events.',
      inputSchema: {
        eventType: z.enum(['timed', 'full-day', 'mixed', 'unknown']).optional(),
      },
    },
    ({ eventType }) =>
      text(
        [
          'Schedule-X accepts Temporal.PlainDate and Temporal.ZonedDateTime for event start/end values.',
          'Use Temporal.PlainDate for full-day events. Use Temporal.ZonedDateTime for timed events.',
          'Do not mix PlainDate and ZonedDateTime inside the same event.',
          eventType
            ? `Requested event type: ${eventType}.`
            : 'Docs: https://schedule-x.dev/docs/calendar/events and https://schedule-x.dev/docs/calendar/temporal.',
        ].join('\n')
      )
  )

  server.registerResource(
    'schedule-x-docs',
    new ResourceTemplate('schedulex://docs/{id}', {
      list: () => ({
        resources: docsIndex.docs.map((entry) => ({
          uri: `schedulex://docs/${entry.id}`,
          name: entry.id,
          title: entry.title,
          description: entry.description,
          mimeType: 'text/markdown',
        })),
      }),
    }),
    {
      title: 'Schedule-X docs',
      description: 'Generated Schedule-X documentation entries.',
    },
    (_uri, variables) => {
      const id = String(variables.id)
      const doc = getDocById(id)
      return {
        contents: [
          {
            uri: `schedulex://docs/${id}`,
            mimeType: 'text/markdown',
            text: doc
              ? formatDoc(doc)
              : `No Schedule-X docs entry found: ${id}`,
          },
        ],
      }
    }
  )

  server.registerPrompt(
    'create-schedule-x-calendar',
    {
      title: 'Create a Schedule-X calendar',
      description:
        'Prompt template for implementing a Schedule-X calendar in an application.',
      argsSchema: {
        framework: z.string().optional(),
        requirements: z.string().optional(),
      },
    },
    ({ framework, requirements }) => ({
      messages: [
        {
          role: 'user',
          content: {
            type: 'text',
            text: [
              `Implement a Schedule-X calendar${framework ? ` for ${framework}` : ''}.`,
              requirements ? `Requirements: ${requirements}` : undefined,
              'Use Schedule-X docs and tools before choosing packages.',
              'Use Temporal.PlainDate for full-day events and Temporal.ZonedDateTime for timed events.',
              'Use @schedule-x/events-service for event CRUD after render.',
            ]
              .filter(Boolean)
              .join('\n'),
          },
        },
      ],
    })
  )

  return server
}
