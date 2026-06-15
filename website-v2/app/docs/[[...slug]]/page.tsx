import { getMDXComponents } from '@/components/mdx'
import { source } from '@/lib/source'
import { DocsBody, DocsPage } from 'fumadocs-ui/layouts/docs/page'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

type PageProps = {
  params: Promise<{
    slug?: string[]
  }>
}

export async function generateStaticParams() {
  return source.generateParams()
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params
  const page = source.getPage(params.slug)

  if (!page) notFound()

  return {
    title: page.data.title,
    description: page.data.description,
  }
}

export default async function Page(props: PageProps) {
  const params = await props.params
  const page = source.getPage(params.slug)

  if (!page) notFound()

  const MDX = page.data.body

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsBody>
        <MDX components={getMDXComponents()} />
      </DocsBody>
    </DocsPage>
  )
}
