import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getBlogBySlug, getBlogSlugs } from '@/utils/markdown'
import { BlogDetailClient } from './BlogDetailClient'

interface BlogPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const slugs = getBlogSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const blog = getBlogBySlug(params.slug)

  if (!blog) {
    return {
      title: 'Blog Not Found',
    }
  }

  return {
    title: `${blog.frontmatter.title} | Immersive 3D Blog`,
    description: blog.frontmatter.description,
    openGraph: {
      title: blog.frontmatter.title,
      description: blog.frontmatter.description,
      images: blog.frontmatter.previewImage
        ? [blog.frontmatter.previewImage]
        : [],
    },
  }
}

export default function BlogPage({ params }: BlogPageProps) {
  const blog = getBlogBySlug(params.slug)

  if (!blog) {
    notFound()
  }

  return <BlogDetailClient blog={blog} />
}
