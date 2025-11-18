import Link from 'next/link'
import { BlogPost } from '@/types/blog'

interface BlogCardProps {
  blog: BlogPost
}

export function BlogCard({ blog }: BlogCardProps) {
  const { frontmatter, slug } = blog

  return (
    <Link
      href={`/blogs/${slug}`}
      className="group block bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden hover:bg-white/20 transition-all hover:scale-105"
    >
      <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-primary-900 to-primary-600">
        {frontmatter.previewImage && (
          <img
            src={frontmatter.previewImage}
            alt={frontmatter.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        )}
      </div>

      <div className="p-4">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
          {frontmatter.title}
        </h3>

        <p className="text-white/70 text-sm mb-3 line-clamp-2">
          {frontmatter.description}
        </p>

        <div className="flex items-center justify-between text-xs text-white/60">
          <span>
            📍 {frontmatter.coords.lat.toFixed(2)}°,{' '}
            {frontmatter.coords.lng.toFixed(2)}°
          </span>
          <span>{new Date(frontmatter.date).toLocaleDateString()}</span>
        </div>

        {frontmatter.tags && frontmatter.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {frontmatter.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-primary-600/30 text-primary-300 text-xs rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}
