import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const packageDir = path.resolve(path.dirname(__filename), '..')
const repoRoot = path.resolve(packageDir, '../..')
const docsDir = path.join(repoRoot, 'website/app/docs')
const packagesDir = path.join(repoRoot, 'packages')
const outputFile = path.join(packageDir, 'src/generated/docs-index.ts')

const packageJson = JSON.parse(
  fs.readFileSync(path.join(packageDir, 'package.json'), 'utf8')
)

const premiumPluginIds = new Set([
  'drag-and-drop',
  'drag-to-create',
  'draw',
  'interactive-event-modal',
  'resize',
  'scheduling-assistant',
  'sidebar',
])

const pluginPackageOverrides = {
  'event-modal': '@schedule-x/event-modal',
  'events-service': '@schedule-x/events-service',
  'calendar-controls': '@schedule-x/calendar-controls',
  recurrence: '@schedule-x/event-recurrence',
  'scroll-controller': '@schedule-x/scroll-controller',
  'current-time': '@schedule-x/current-time',
  'timezone-select': '@schedule-x/timezone-select',
  ical: '@schedule-x/ical',
}

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) return walk(fullPath)
    if (entry.isFile() && entry.name === 'page.mdx') return [fullPath]
    return []
  })
}

function parseFrontmatter(source) {
  if (!source.startsWith('---')) return { metadata: {}, body: source }

  const end = source.indexOf('\n---', 3)
  if (end === -1) return { metadata: {}, body: source }

  const frontmatter = source.slice(3, end).trim()
  const metadata = Object.fromEntries(
    frontmatter
      .split('\n')
      .map((line) => {
        const [key, ...valueParts] = line.split(':')
        return [
          key.trim(),
          valueParts
            .join(':')
            .trim()
            .replace(/^['"]|['"]$/g, ''),
        ]
      })
      .filter(([key]) => Boolean(key))
  )

  return { metadata, body: source.slice(end + 4) }
}

function extractCodeBlocks(body) {
  const codeBlocks = []
  const codeBlockRegex = /```([^\n`]*)\n([\s\S]*?)```/g
  let match

  while ((match = codeBlockRegex.exec(body))) {
    const language = match[1].trim().split(/\s+/)[0] || 'text'
    codeBlocks.push({
      language,
      content: match[2].trim(),
    })
  }

  return codeBlocks
}

function stripMdx(body) {
  return body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/^import .*$/gm, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\{[^}\n]+\}/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[`*_#>|]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function slugFromFile(filePath) {
  const relative = path.relative(docsDir, path.dirname(filePath))
  return relative === '' ? 'docs' : relative.replaceAll(path.sep, '-')
}

function urlFromFile(filePath) {
  const relative = path.relative(docsDir, path.dirname(filePath))
  return `https://schedule-x.dev/docs${relative ? `/${relative.replaceAll(path.sep, '/')}` : ''}`
}

function sectionFromFile(filePath) {
  const relative = path.relative(docsDir, path.dirname(filePath))
  return relative.split(path.sep)[0] || 'docs'
}

function docsEntryFromFile(filePath) {
  const source = fs.readFileSync(filePath, 'utf8')
  const { metadata, body } = parseFrontmatter(source)
  const headings = [...body.matchAll(/^#{1,3}\s+(.+)$/gm)].map((match) =>
    match[1].replace(/<[^>]+>/g, '').trim()
  )
  const title = metadata.title || headings[0] || slugFromFile(filePath)

  return {
    id: slugFromFile(filePath),
    title,
    description: metadata.description,
    url: urlFromFile(filePath),
    sourcePath: path.relative(repoRoot, filePath),
    section: sectionFromFile(filePath),
    headings,
    codeBlocks: extractCodeBlocks(body),
    content: stripMdx(body),
  }
}

function packageNames() {
  return new Set(
    fs
      .readdirSync(packagesDir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => path.join(packagesDir, entry.name, 'package.json'))
      .filter((packagePath) => fs.existsSync(packagePath))
      .map((packagePath) => {
        const parsed = JSON.parse(fs.readFileSync(packagePath, 'utf8'))
        return parsed.name
      })
      .filter(Boolean)
  )
}

function pluginEntries(docs) {
  const workspacePackageNames = packageNames()

  return docs
    .filter((entry) => entry.id.startsWith('calendar-plugins-'))
    .map((entry) => {
      const pluginId = entry.id.replace('calendar-plugins-', '')
      const packageName =
        pluginPackageOverrides[pluginId] ||
        (workspacePackageNames.has(`@schedule-x/${pluginId}`)
          ? `@schedule-x/${pluginId}`
          : undefined)

      return {
        id: pluginId,
        title: entry.title.replace(/^.*?-\s*/, ''),
        packageName,
        docsUrl: entry.url,
        description: entry.description,
        isPremium: premiumPluginIds.has(pluginId),
      }
    })
    .sort((a, b) => a.title.localeCompare(b.title))
}

const docs = walk(docsDir)
  .map(docsEntryFromFile)
  .sort((a, b) => a.id.localeCompare(b.id))

const docsIndex = {
  docsVersion: packageJson.version,
  docsBaseUrl: 'https://schedule-x.dev',
  docs,
  plugins: pluginEntries(docs),
}

const output = `import type { DocsIndex } from '../types.js'

export const docsIndex: DocsIndex = ${JSON.stringify(docsIndex, null, 2)}
`

fs.writeFileSync(outputFile, output)
