import { getAllBlogs } from '@/utils/markdown'
import { BlogMarkerData } from '@/types/blog'
import { blogCoordsToPosition } from '@/utils/coordinates'
import { DashboardClient } from './DashboardClient'

export const metadata = {
  title: 'Dashboard | Immersive 3D Blog',
  description: 'Explore all blog posts on an interactive 3D globe',
}

export default function DashboardPage() {
  // Load blogs on the server
  const blogs = getAllBlogs()

  // Transform to marker data
  const blogMarkers: BlogMarkerData[] = blogs.map((blog) => ({
    id: blog.frontmatter.id,
    position: blogCoordsToPosition(blog.frontmatter.coords),
    title: blog.frontmatter.title,
    coords: blog.frontmatter.coords,
    slug: blog.slug,
  }))

  return <DashboardClient blogMarkers={blogMarkers} />
}
