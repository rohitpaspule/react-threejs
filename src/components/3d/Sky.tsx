'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh, BackSide } from 'three'
import { TimeOfDay } from '@/types/scene'
import { getSkyColor } from '@/utils/time'

interface SkyProps {
  timeOfDay: TimeOfDay
}

/**
 * Animated sky sphere that changes based on time of day
 */
export function Sky({ timeOfDay }: SkyProps) {
  const skyRef = useRef<Mesh>(null)

  useFrame((state, delta) => {
    if (skyRef.current) {
      skyRef.current.rotation.y += delta * 0.01
    }
  })

  const skyColor = getSkyColor(timeOfDay)

  return (
    <mesh ref={skyRef}>
      <sphereGeometry args={[100, 32, 32]} />
      <meshBasicMaterial color={skyColor} side={BackSide} />
    </mesh>
  )
}
