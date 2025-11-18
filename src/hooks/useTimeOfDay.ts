import { useEffect } from 'react'
import { useAppStore } from '@/store/appStore'
import { getCurrentTimeOfDay, shouldShowAurora } from '@/utils/time'
import { BlogFrontmatter } from '@/types/blog'

/**
 * Hook to automatically update time of day and aurora based on local time
 * Checks every minute for time changes
 */
export function useTimeOfDay(currentBlog?: BlogFrontmatter | null) {
  const { setTimeOfDay, setAuroraActive } = useAppStore()

  useEffect(() => {
    const updateTime = () => {
      // Check if blog has time preference override
      if (currentBlog?.timePref && currentBlog.timePref !== 'auto') {
        setTimeOfDay(currentBlog.timePref)
      } else {
        setTimeOfDay(getCurrentTimeOfDay())
      }

      // Update aurora if we have current blog location
      if (currentBlog) {
        const timeOfDay = currentBlog.timePref === 'auto' || !currentBlog.timePref
          ? getCurrentTimeOfDay()
          : currentBlog.timePref

        const auroraActive = shouldShowAurora(
          currentBlog.coords.lat,
          timeOfDay
        )
        setAuroraActive(auroraActive)
      } else {
        setAuroraActive(false)
      }
    }

    // Initial update
    updateTime()

    // Update every minute
    const interval = setInterval(updateTime, 60000)

    return () => clearInterval(interval)
  }, [currentBlog, setTimeOfDay, setAuroraActive])
}
