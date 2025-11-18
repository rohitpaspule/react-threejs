'use client'

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { Mesh } from 'three'
import { BlogMarkerData } from '@/types/blog'

interface BlogMarkerProps {
  marker: BlogMarkerData
  onClick?: () => void
}

/**
 * Individual blog marker component
 * Renders a pulsing pin at the blog location
 */
export function BlogMarker({ marker, onClick }: BlogMarkerProps) {
  const markerRef = useRef<Mesh>(null)
  const [hovered, setHovered] = useState(false)

  // Floating animation
  useFrame((state) => {
    if (markerRef.current) {
      const time = state.clock.getElapsedTime()
      markerRef.current.position.y =
        marker.position[1] + Math.sin(time * 2) * 0.1
    }
  })

  return (
    <group>
      <mesh
        ref={markerRef}
        position={marker.position}
        onClick={(e) => {
          e.stopPropagation()
          onClick?.()
        }}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          setHovered(false)
          document.body.style.cursor = 'auto'
        }}
      >
        {/* Marker pin */}
        <coneGeometry args={[0.2, 0.8, 8]} />
        <meshStandardMaterial
          color={hovered ? '#fbbf24' : '#ef4444'}
          emissive={hovered ? '#fbbf24' : '#ef4444'}
          emissiveIntensity={hovered ? 0.8 : 0.5}
        />
      </mesh>

      {/* Label on hover */}
      {hovered && (
        <Html position={marker.position} center>
          <div className="bg-black/80 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap pointer-events-none">
            {marker.title}
          </div>
        </Html>
      )}
    </group>
  )
}
