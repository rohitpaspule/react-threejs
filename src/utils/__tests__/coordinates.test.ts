import { latLngToVector3, blogCoordsToPosition, getCameraPositionForLocation } from '../coordinates'
import { Vector3 } from 'three'

describe('Coordinate Utilities', () => {
  describe('latLngToVector3', () => {
    it('converts North Pole coordinates correctly', () => {
      const result = latLngToVector3(90, 0, 10)
      expect(result.y).toBeCloseTo(10, 1)
      expect(result.x).toBeCloseTo(0, 1)
      expect(result.z).toBeCloseTo(0, 1)
    })

    it('converts South Pole coordinates correctly', () => {
      const result = latLngToVector3(-90, 0, 10)
      expect(result.y).toBeCloseTo(-10, 1)
      expect(result.x).toBeCloseTo(0, 1)
      expect(result.z).toBeCloseTo(0, 1)
    })

    it('converts equator coordinates correctly', () => {
      const result = latLngToVector3(0, 0, 10)
      expect(result.y).toBeCloseTo(0, 1)
      expect(Math.abs(result.x)).toBeGreaterThan(0)
    })

    it('respects custom radius', () => {
      const result1 = latLngToVector3(45, 45, 10)
      const result2 = latLngToVector3(45, 45, 20)

      const length1 = Math.sqrt(result1.x ** 2 + result1.y ** 2 + result1.z ** 2)
      const length2 = Math.sqrt(result2.x ** 2 + result2.y ** 2 + result2.z ** 2)

      expect(length1).toBeCloseTo(10, 1)
      expect(length2).toBeCloseTo(20, 1)
    })
  })

  describe('blogCoordsToPosition', () => {
    it('converts blog coordinates to position tuple', () => {
      const coords = { lat: 35.6762, lng: 139.6503 }
      const result = blogCoordsToPosition(coords)

      expect(Array.isArray(result)).toBe(true)
      expect(result).toHaveLength(3)
      expect(typeof result[0]).toBe('number')
      expect(typeof result[1]).toBe('number')
      expect(typeof result[2]).toBe('number')
    })
  })

  describe('getCameraPositionForLocation', () => {
    it('returns position further from origin than marker', () => {
      const coords = { lat: 0, lng: 0 }
      const markerPos = blogCoordsToPosition(coords)
      const cameraPos = getCameraPositionForLocation(coords, 15)

      const markerDist = Math.sqrt(markerPos[0] ** 2 + markerPos[1] ** 2 + markerPos[2] ** 2)
      const cameraDist = Math.sqrt(cameraPos[0] ** 2 + cameraPos[1] ** 2 + cameraPos[2] ** 2)

      expect(cameraDist).toBeGreaterThan(markerDist)
    })
  })
})
