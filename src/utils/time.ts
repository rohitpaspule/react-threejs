import { TimeOfDay } from '@/types/scene'

/**
 * Determine if it's day or night based on local time
 * Day: 6am - 6pm (06:00 - 18:00)
 * Night: 6pm - 6am (18:00 - 06:00)
 */
export function getCurrentTimeOfDay(): TimeOfDay {
  const hour = new Date().getHours()
  return hour >= 6 && hour < 18 ? 'day' : 'night'
}

/**
 * Check if aurora should be active based on:
 * 1. It's nighttime
 * 2. Location is polar (latitude > 60° or < -60°)
 */
export function shouldShowAurora(
  latitude: number,
  timeOfDay: TimeOfDay
): boolean {
  return timeOfDay === 'night' && (latitude > 60 || latitude < -60)
}

/**
 * Get sky color based on time of day
 */
export function getSkyColor(timeOfDay: TimeOfDay): string {
  return timeOfDay === 'day' ? '#87CEEB' : '#0a0e27'
}

/**
 * Get ambient light intensity based on time of day
 */
export function getAmbientIntensity(timeOfDay: TimeOfDay): number {
  return timeOfDay === 'day' ? 0.6 : 0.3
}
