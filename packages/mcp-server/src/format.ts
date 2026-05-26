import type { DocsEntry, PluginEntry } from './types.js'

export function jsonText(value: unknown) {
  return {
    content: [
      {
        type: 'text' as const,
        text: JSON.stringify(value, null, 2),
      },
    ],
  }
}

export function text(value: string) {
  return {
    content: [
      {
        type: 'text' as const,
        text: value,
      },
    ],
  }
}

export function formatDoc(entry: DocsEntry): string {
  const codeBlocks = entry.codeBlocks
    .slice(0, 5)
    .map(
      (block) =>
        `\n\`\`\`${block.language}\n${block.content.slice(0, 3000)}\n\`\`\``
    )
    .join('\n')

  return [
    `# ${entry.title}`,
    entry.description,
    `URL: ${entry.url}`,
    `Source: ${entry.sourcePath}`,
    '',
    entry.content,
    codeBlocks ? `\n## Code examples${codeBlocks}` : '',
  ]
    .filter(Boolean)
    .join('\n')
}

export function pluginInstallCommand(plugin: PluginEntry): string | undefined {
  if (!plugin.packageName) return undefined
  return `npm install ${plugin.packageName}`
}
