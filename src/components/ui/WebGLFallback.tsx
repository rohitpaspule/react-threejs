import { BlogPost } from '@/types/blog'

interface WebGLFallbackProps {
  blog?: BlogPost
}

/**
 * Fallback component for browsers without WebGL support
 * Shows a static view with readable content
 */
export function WebGLFallback({ blog }: WebGLFallbackProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="bg-yellow-900/50 border border-yellow-500/50 rounded-lg p-4 mb-8">
            <h3 className="font-bold mb-2">⚠️ WebGL Not Supported</h3>
            <p className="text-sm">
              Your browser doesn't support WebGL, which is required for the 3D
              experience. You're viewing a simplified version. Please use a
              modern browser like Chrome, Firefox, or Safari for the full
              experience.
            </p>
          </div>

          {blog ? (
            <>
              {blog.frontmatter.previewImage && (
                <img
                  src={blog.frontmatter.previewImage}
                  alt={blog.frontmatter.title}
                  className="w-full aspect-video object-cover rounded-lg mb-8"
                />
              )}

              <h1 className="text-4xl font-bold mb-4">
                {blog.frontmatter.title}
              </h1>

              <div className="text-white/70 mb-8">
                <p className="mb-2">{blog.frontmatter.description}</p>
                <p className="text-sm">
                  📍 Location: {blog.frontmatter.coords.lat.toFixed(4)}°,{' '}
                  {blog.frontmatter.coords.lng.toFixed(4)}°
                </p>
                <p className="text-sm">
                  📅 {new Date(blog.frontmatter.date).toLocaleDateString()}
                </p>
              </div>

              <div className="prose prose-invert max-w-none">
                <div
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                  className="whitespace-pre-wrap"
                />
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <h1 className="text-4xl font-bold mb-4">
                Welcome to Immersive Blog
              </h1>
              <p className="text-white/70 mb-8">
                Please use a WebGL-enabled browser for the full 3D experience.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
