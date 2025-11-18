'use client'

import { useEffect, useState, Suspense } from 'react'
import dynamic from 'next/dynamic'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { BlogPost } from '@/types/blog'
import { useAppStore } from '@/store/appStore'
import { useTimeOfDay } from '@/hooks/useTimeOfDay'
import { useAudio } from '@/hooks/useAudio'
import { FloatingPanel } from '@/components/ui/FloatingPanel'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { WebGLFallback } from '@/components/ui/WebGLFallback'
import { isWebGLSupported } from '@/utils/webgl'
import { blogCoordsToPosition } from '@/utils/coordinates'

const Scene = dynamic(
  () => import('@/components/3d/Scene').then((mod) => ({ default: mod.Scene })),
  { ssr: false, loading: () => <LoadingSpinner /> }
)

interface BlogDetailClientProps {
  blog: BlogPost
}

export function BlogDetailClient({ blog }: BlogDetailClientProps) {
  const [mounted, setMounted] = useState(false)
  const [showEarthView, setShowEarthView] = useState(false)
  const { setWebglSupported, webglSupported, setCurrentBlogId, audioEnabled } =
    useAppStore()

  // Initialize time of day and aurora
  useTimeOfDay(blog.frontmatter)

  // Initialize audio
  const { isPlaying } = useAudio({
    url: blog.frontmatter.ambientSoundURL || null,
    autoplay: true,
    loop: true,
  })

  useEffect(() => {
    setMounted(true)
    const supported = isWebGLSupported()
    setWebglSupported(supported)
    setCurrentBlogId(blog.frontmatter.id)

    return () => {
      setCurrentBlogId(null)
    }
  }, [setWebglSupported, setCurrentBlogId, blog.frontmatter.id])

  if (!mounted) {
    return <LoadingSpinner />
  }

  if (!webglSupported) {
    return <WebGLFallback blog={blog} />
  }

  const blogMarker = {
    id: blog.frontmatter.id,
    position: blogCoordsToPosition(blog.frontmatter.coords),
    title: blog.frontmatter.title,
    coords: blog.frontmatter.coords,
    slug: blog.slug,
  }

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* 3D Scene Background */}
      <div className="canvas-container">
        <Scene
          blogMarkers={[blogMarker]}
          cameraPosition={[
            blogMarker.position[0] * 1.5,
            blogMarker.position[1] * 1.5,
            blogMarker.position[2] * 1.5,
          ]}
          cameraLookAt={[0, 0, 0]}
        />
      </div>

      {/* Google Earth 360 View Toggle */}
      {blog.frontmatter.ge360Link && (
        <button
          onClick={() => setShowEarthView(!showEarthView)}
          className="fixed top-20 right-4 z-40 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg shadow-lg"
        >
          {showEarthView ? '🌍 Hide Earth View' : '🗺️ Show Earth View'}
        </button>
      )}

      {/* Google Earth 360 iframe (lazy loaded) */}
      {showEarthView && blog.frontmatter.ge360Link && (
        <div className="fixed inset-0 z-30 pointer-events-none">
          <iframe
            src={blog.frontmatter.ge360Link}
            className="w-full h-full opacity-50 pointer-events-auto"
            title="Google Earth 360 View"
            loading="lazy"
            allow="xr-spatial-tracking"
          />
        </div>
      )}

      {/* Floating Content Panel */}
      <div className="relative z-20 h-full flex items-center justify-center p-4 pointer-events-none">
        <FloatingPanel className="max-w-3xl w-full p-8 pointer-events-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-white mb-3">
              {blog.frontmatter.title}
            </h1>

            <div className="flex flex-wrap gap-4 text-sm text-white/70">
              <span>
                📍 {blog.frontmatter.coords.lat.toFixed(4)}°,{' '}
                {blog.frontmatter.coords.lng.toFixed(4)}°
              </span>
              <span>
                📅 {new Date(blog.frontmatter.date).toLocaleDateString()}
              </span>
              {blog.frontmatter.ambientSoundURL && (
                <span>
                  {isPlaying && audioEnabled ? '🔊 Audio Playing' : '🔇 Audio Ready'}
                </span>
              )}
            </div>

            {blog.frontmatter.tags && (
              <div className="flex flex-wrap gap-2 mt-3">
                {blog.frontmatter.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-primary-600/30 text-primary-300 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {blog.content}
            </ReactMarkdown>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <a
              href="/blogs"
              className="text-primary-400 hover:text-primary-300 font-medium"
            >
              ← Back to all experiences
            </a>
          </div>
        </FloatingPanel>
      </div>
    </div>
  )
}
