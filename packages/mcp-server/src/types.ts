export type DocsEntry = {
  id: string
  title: string
  description?: string
  url: string
  sourcePath: string
  section: string
  headings: string[]
  codeBlocks: {
    language: string
    content: string
  }[]
  content: string
}

export type PluginEntry = {
  id: string
  title: string
  packageName?: string
  docsUrl: string
  description?: string
  isPremium: boolean
}

export type DocsIndex = {
  docsVersion: string
  docsBaseUrl: string
  docs: DocsEntry[]
  plugins: PluginEntry[]
}
