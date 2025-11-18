import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Vector3 } from 'three'

interface CameraTransitionOptions {
  targetPosition: Vector3 | [number, number, number]
  targetLookAt: Vector3 | [number, number, number]
  duration?: number // in seconds
  onComplete?: () => void
  easing?: (t: number) => number
}

/**
 * Custom hook for smooth camera transitions with easing
 * Uses requestAnimationFrame for 60fps animations
 */
export function useCameraTransition() {
  const { camera } = useThree()
  const transitionRef = useRef<{
    active: boolean
    startPosition: Vector3
    startLookAt: Vector3
    targetPosition: Vector3
    targetLookAt: Vector3
    startTime: number
    duration: number
    onComplete?: () => void
    easing: (t: number) => number
  } | null>(null)

  // Default easing function (ease-in-out cubic)
  const defaultEasing = (t: number): number => {
    return t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2
  }

  const startTransition = (options: CameraTransitionOptions) => {
    const {
      targetPosition,
      targetLookAt,
      duration = 2,
      onComplete,
      easing = defaultEasing,
    } = options

    // Get current camera look-at point
    const currentLookAt = new Vector3(0, 0, -1)
      .applyQuaternion(camera.quaternion)
      .add(camera.position)

    transitionRef.current = {
      active: true,
      startPosition: camera.position.clone(),
      startLookAt: currentLookAt,
      targetPosition: Array.isArray(targetPosition)
        ? new Vector3(...targetPosition)
        : targetPosition.clone(),
      targetLookAt: Array.isArray(targetLookAt)
        ? new Vector3(...targetLookAt)
        : targetLookAt.clone(),
      startTime: Date.now(),
      duration: duration * 1000,
      onComplete,
      easing,
    }
  }

  useFrame(() => {
    if (!transitionRef.current?.active) return

    const {
      startPosition,
      startLookAt,
      targetPosition,
      targetLookAt,
      startTime,
      duration,
      onComplete,
      easing,
    } = transitionRef.current

    const elapsed = Date.now() - startTime
    const progress = Math.min(elapsed / duration, 1)
    const easedProgress = easing(progress)

    // Interpolate position
    camera.position.lerpVectors(
      startPosition,
      targetPosition,
      easedProgress
    )

    // Interpolate look-at and update camera rotation
    const currentLookAt = new Vector3().lerpVectors(
      startLookAt,
      targetLookAt,
      easedProgress
    )
    camera.lookAt(currentLookAt)

    // Check if transition is complete
    if (progress >= 1) {
      transitionRef.current.active = false
      onComplete?.()
    }
  })

  return { startTransition }
}
