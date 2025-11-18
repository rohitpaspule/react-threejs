import { Vector3 } from 'three'
import { BlogFrontmatter } from '@/types/blog'

/**
 * Convert latitude/longitude coordinates to 3D position on a sphere
 * @param lat Latitude in degrees (-90 to 90)
 * @param lng Longitude in degrees (-180 to 180)
 * @param radius Radius of the sphere (default: 10)
 * @returns Vector3 position
 */
export function latLngToVector3(
  lat: number,
  lng: number,
  radius: number = 10
): Vector3 {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)

  const x = -(radius * Math.sin(phi) * Math.cos(theta))
  const y = radius * Math.cos(phi)
  const z = radius * Math.sin(phi) * Math.sin(theta)

  return new Vector3(x, y, z)
}

/**
 * Convert blog coordinates to 3D marker position
 * @param coords Blog coordinates
 * @returns [x, y, z] position tuple
 */
export function blogCoordsToPosition(
  coords: BlogFrontmatter['coords']
): [number, number, number] {
  const vec = latLngToVector3(coords.lat, coords.lng)
  return [vec.x, vec.y, vec.z]
}

/**
 * Get camera position for viewing a specific location
 * Offsets the camera from the surface to provide a good view
 */
export function getCameraPositionForLocation(
  coords: BlogFrontmatter['coords'],
  distance: number = 15
): [number, number, number] {
  const vec = latLngToVector3(coords.lat, coords.lng, distance)
  return [vec.x, vec.y, vec.z]
}
