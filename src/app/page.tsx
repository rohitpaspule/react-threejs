'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useAppStore } from '@/store/appStore'
import { isWebGLSupported } from '@/utils/webgl'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { WebGLFallback } from '@/components/ui/WebGLFallback'

// Dynamically import Scene to avoid SSR issues
const Scene = dynamic(() => import('@/components/3d/Scene').then(mod => ({ default: mod.Scene })), {
  ssr: false,
  loading: () => <LoadingSpinner />,
})

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const { setWebglSupported, webglSupported } = useAppStore()

  useEffect(() => {
    setMounted(true)
    const supported = isWebGLSupported()
    setWebglSupported(supported)
  }, [setWebglSupported])

  if (!mounted) {
    return <LoadingSpinner />
  }

  if (!webglSupported) {
    return <WebGLFallback />
  }

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* 3D Background */}
      <div className="canvas-container">
        <Scene blogMarkers={[]} />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center px-4 max-w-4xl">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent animate-pulse-slow">
            Immersive 3D Blog
          </h1>

          <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-2xl mx-auto">
            Where blog posts are <span className="text-primary-400 font-semibold">experiences</span>, not just text.
            Travel the world through immersive 3D stories.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/blogs"
              className="px-8 py-4 bg-primary-600 hover:bg-primary-700 rounded-lg text-white font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              Explore Blogs
            </Link>

            <Link
              href="/dashboard"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg text-white font-semibold text-lg border border-white/20 hover:border-white/40 transition-all"
            >
              View Dashboard
            </Link>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <div className="text-4xl mb-3">🌍</div>
              <h3 className="text-lg font-semibold mb-2">3D World</h3>
              <p className="text-white/70 text-sm">
                Navigate a beautiful 3D globe with pinned blog locations
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <div className="text-4xl mb-3">🎵</div>
              <h3 className="text-lg font-semibold mb-2">Ambient Audio</h3>
              <p className="text-white/70 text-sm">
                Immersive soundscapes that match each location
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <div className="text-4xl mb-3">🌌</div>
              <h3 className="text-lg font-semibold mb-2">Time-Aware</h3>
              <p className="text-white/70 text-sm">
                Dynamic day/night cycles with aurora effects
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
