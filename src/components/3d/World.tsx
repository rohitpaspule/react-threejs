'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere } from '@react-three/drei'
import { Mesh, TextureLoader } from 'three'
import { BlogMarker } from './BlogMarker'
import { BlogMarkerData } from '@/types/blog'

interface WorldProps {
  blogMarkers: BlogMarkerData[]
  onMarkerClick?: (blogId: string) => void
}

/**
 * The main globe/world component
 * Renders Earth with blog markers
 */
export function World({ blogMarkers, onMarkerClick }: WorldProps) {
  const globeRef = useRef<Mesh>(null)

  // Slow rotation animation
  useFrame((state, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.05
    }
  })

  return (
    <group>
      {/* Earth sphere */}
      <Sphere ref={globeRef} args={[10, 64, 64]}>
        <meshStandardMaterial
          color="#1e40af"
          metalness={0.4}
          roughness={0.7}
        />
      </Sphere>

      {/* Blog markers */}
      {blogMarkers.map((marker) => (
        <BlogMarker
          key={marker.id}
          marker={marker}
          onClick={() => onMarkerClick?.(marker.id)}
        />
      ))}
    </group>
  )
}
