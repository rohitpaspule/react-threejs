import { getAllBlogs } from '@/utils/markdown'
import { BlogCard } from '@/components/ui/BlogCard'

export const metadata = {
  title: 'All Blogs | Immersive 3D Blog',
  description: 'Explore all our immersive 3D blog experiences',
}

export default function BlogsPage() {
  const blogs = getAllBlogs()

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold text-white mb-4">
            Explore Experiences
          </h1>
          <p className="text-white/70 text-lg mb-12">
            Discover immersive stories from around the world
          </p>

          {blogs.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-white/50 text-lg">
                No blogs found. Add some markdown files to the content/blogs directory.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog) => (
                <BlogCard key={blog.slug} blog={blog} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
