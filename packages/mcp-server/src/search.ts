import type { DocsEntry } from './types.js'

const maxSnippetLength = 360

function normalize(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

function scoreEntry(entry: DocsEntry, terms: string[]): number {
  const title = normalize(entry.title)
  const headings = normalize(entry.headings.join(' '))
  const content = normalize(entry.content)

  return terms.reduce((score, term) => {
    if (title.includes(term)) return score + 8
    if (headings.includes(term)) return score + 5
    if (entry.id.includes(term)) return score + 4
    if (content.includes(term)) return score + 1
    return score
  }, 0)
}

function snippetFor(entry: DocsEntry, terms: string[]): string {
  const content = entry.content
  const normalizedContent = normalize(content)
  const firstMatch = terms
    .map((term) => normalizedContent.indexOf(term))
    .filter((index) => index >= 0)
    .sort((a, b) => a - b)[0]

  if (firstMatch === undefined) return content.slice(0, maxSnippetLength)

  const start = Math.max(0, firstMatch - 80)
  return content.slice(start, start + maxSnippetLength).trim()
}

export function searchDocs(
  docs: DocsEntry[],
  query: string,
  limit = 6
): {
  id: string
  title: string
  url: string
  section: string
  score: number
  snippet: string
}[] {
  const terms = normalize(query).split(/\s+/).filter(Boolean)
  if (terms.length === 0) return []

  return docs
    .map((entry) => ({
      id: entry.id,
      title: entry.title,
      url: entry.url,
      section: entry.section,
      score: scoreEntry(entry, terms),
      snippet: snippetFor(entry, terms),
    }))
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
    .slice(0, limit)
}
