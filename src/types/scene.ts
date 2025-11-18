import { Vector3 } from 'three'

export interface CameraTarget {
  position: Vector3 | [number, number, number]
  lookAt: Vector3 | [number, number, number]
  duration?: number
}

export type TimeOfDay = 'day' | 'night'

export interface SceneState {
  timeOfDay: TimeOfDay
  isAuroraActive: boolean
  currentBlogId: string | null
  isTransitioning: boolean
  webglSupported: boolean
}
