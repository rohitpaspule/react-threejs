'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars, PerspectiveCamera } from '@react-three/drei'
import { World } from './World'
import { Sky } from './Sky'
import { Aurora } from './Aurora'
import { BlogMarkerData } from '@/types/blog'
import { useAppStore } from '@/store/appStore'

interface SceneProps {
  blogMarkers: BlogMarkerData[]
  onMarkerClick?: (blogId: string) => void
  cameraPosition?: [number, number, number]
  cameraLookAt?: [number, number, number]
}

/**
 * Main 3D Scene component
 * Renders the globe, sky, stars, and blog markers
 */
export function Scene({
  blogMarkers,
  onMarkerClick,
  cameraPosition = [0, 0, 25],
  cameraLookAt = [0, 0, 0],
}: SceneProps) {
  const { timeOfDay, isAuroraActive } = useAppStore()

  return (
    <Canvas className="w-full h-full">
      <PerspectiveCamera
        makeDefault
        position={cameraPosition}
        fov={60}
        near={0.1}
        far={1000}
      />

      {/* Lighting */}
      <ambientLight intensity={timeOfDay === 'day' ? 0.6 : 0.3} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={timeOfDay === 'day' ? 1 : 0.5}
        castShadow
      />
      <pointLight position={[-10, -10, -5]} intensity={0.3} />

      {/* Sky and stars */}
      <Sky timeOfDay={timeOfDay} />
      {timeOfDay === 'night' && <Stars radius={100} depth={50} count={5000} factor={4} />}

      {/* Aurora effect for polar regions at night */}
      {isAuroraActive && <Aurora />}

      {/* Main world */}
      <Suspense fallback={null}>
        <World blogMarkers={blogMarkers} onMarkerClick={onMarkerClick} />
      </Suspense>

      {/* Camera controls */}
      <OrbitControls
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        minDistance={12}
        maxDistance={50}
        target={cameraLookAt}
      />
    </Canvas>
  )
}
