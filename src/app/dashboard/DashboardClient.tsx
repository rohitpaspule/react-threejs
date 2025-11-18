'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { BlogMarkerData } from '@/types/blog'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { WebGLFallback } from '@/components/ui/WebGLFallback'
import { isWebGLSupported } from '@/utils/webgl'
import { useAppStore } from '@/store/appStore'

const Scene = dynamic(
  () => import('@/components/3d/Scene').then((mod) => ({ default: mod.Scene })),
  { ssr: false, loading: () => <LoadingSpinner /> }
)

interface DashboardClientProps {
  blogMarkers: BlogMarkerData[]
}

export function DashboardClient({ blogMarkers }: DashboardClientProps) {
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const { setWebglSupported, webglSupported } = useAppStore()

  useEffect(() => {
    setMounted(true)
    const supported = isWebGLSupported()
    setWebglSupported(supported)
  }, [setWebglSupported])

  const handleMarkerClick = (blogId: string) => {
    const blog = blogMarkers.find((m) => m.id === blogId)
    if (blog) {
      router.push(`/blogs/${blog.slug}`)
    }
  }

  if (!mounted) {
    return <LoadingSpinner />
  }

  if (!webglSupported) {
    return <WebGLFallback />
  }

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* 3D Globe with all markers */}
      <div className="canvas-container">
        <Scene blogMarkers={blogMarkers} onMarkerClick={handleMarkerClick} />
      </div>

      {/* Info Panel */}
      <div className="fixed top-20 left-4 z-20 bg-black/60 backdrop-blur-lg rounded-lg p-6 max-w-sm border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-4">
          Interactive Dashboard
        </h2>
        <p className="text-white/70 mb-4">
          Navigate the globe to explore {blogMarkers.length} immersive experiences.
          Click on any marker to visit that location.
        </p>

        <div className="space-y-2">
          <p className="text-sm text-white/60">
            🖱️ <strong>Click & Drag:</strong> Rotate globe
          </p>
          <p className="text-sm text-white/60">
            🔍 <strong>Scroll:</strong> Zoom in/out
          </p>
          <p className="text-sm text-white/60">
            📍 <strong>Click Marker:</strong> Visit location
          </p>
        </div>

        {/* Blog list */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-white mb-3">Locations</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {blogMarkers.map((marker) => (
              <button
                key={marker.id}
                onClick={() => handleMarkerClick(marker.id)}
                className="w-full text-left px-3 py-2 bg-white/10 hover:bg-white/20 rounded text-sm text-white/90 transition-colors"
              >
                📍 {marker.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
