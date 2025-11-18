import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { BlogPost, BlogFrontmatter } from '@/types/blog'

const BLOGS_DIRECTORY = path.join(process.cwd(), 'content/blogs')

/**
 * Get all blog slugs
 */
export function getBlogSlugs(): string[] {
  try {
    const files = fs.readdirSync(BLOGS_DIRECTORY)
    return files
      .filter((file) => file.endsWith('.md'))
      .map((file) => file.replace(/\.md$/, ''))
  } catch (error) {
    console.error('Error reading blog directory:', error)
    return []
  }
}

/**
 * Get blog post by slug
 */
export function getBlogBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(BLOGS_DIRECTORY, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      frontmatter: data as BlogFrontmatter,
      content,
      slug,
    }
  } catch (error) {
    console.error(`Error reading blog ${slug}:`, error)
    return null
  }
}

/**
 * Get all blog posts
 */
export function getAllBlogs(): BlogPost[] {
  const slugs = getBlogSlugs()
  const blogs = slugs
    .map((slug) => getBlogBySlug(slug))
    .filter((blog): blog is BlogPost => blog !== null)
    .sort((a, b) => {
      // Sort by date, newest first
      return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
    })

  return blogs
}

/**
 * Validate blog frontmatter
 */
export function validateBlogFrontmatter(data: any): data is BlogFrontmatter {
  return (
    typeof data.id === 'string' &&
    typeof data.title === 'string' &&
    typeof data.coords === 'object' &&
    typeof data.coords.lat === 'number' &&
    typeof data.coords.lng === 'number' &&
    typeof data.previewImage === 'string' &&
    typeof data.date === 'string'
  )
}
