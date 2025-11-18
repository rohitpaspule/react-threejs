import { useEffect, useRef, useState } from 'react'
import { Howl } from 'howler'
import { useAppStore } from '@/store/appStore'

interface UseAudioOptions {
  url: string | null
  loop?: boolean
  autoplay?: boolean
  volume?: number
  fadeInDuration?: number
  fadeOutDuration?: number
}

/**
 * Custom hook for managing ambient audio with Howler.js
 * Handles autoplay policies, fade in/out, and volume control
 */
export function useAudio({
  url,
  loop = true,
  autoplay = false,
  volume = 0.5,
  fadeInDuration = 2000,
  fadeOutDuration = 1000,
}: UseAudioOptions) {
  const soundRef = useRef<Howl | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  const { isMuted, volume: globalVolume, audioEnabled } = useAppStore()

  // Initialize sound
  useEffect(() => {
    if (!url) {
      // Clean up if no URL
      if (soundRef.current) {
        soundRef.current.unload()
        soundRef.current = null
      }
      setIsLoaded(false)
      setIsPlaying(false)
      return
    }

    // Create new Howl instance
    const sound = new Howl({
      src: [url],
      loop,
      volume: isMuted ? 0 : volume * globalVolume,
      onload: () => {
        setIsLoaded(true)
        // Only autoplay if user has interacted and enabled audio
        if (autoplay && audioEnabled && !isMuted) {
          sound.play()
          sound.fade(0, volume * globalVolume, fadeInDuration)
          setIsPlaying(true)
        }
      },
      onplay: () => setIsPlaying(true),
      onpause: () => setIsPlaying(false),
      onstop: () => setIsPlaying(false),
      onend: () => {
        if (!loop) setIsPlaying(false)
      },
    })

    soundRef.current = sound

    return () => {
      if (sound) {
        sound.fade(sound.volume(), 0, fadeOutDuration)
        setTimeout(() => {
          sound.unload()
        }, fadeOutDuration)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, loop, audioEnabled])

  // Handle mute changes
  useEffect(() => {
    if (soundRef.current) {
      soundRef.current.volume(isMuted ? 0 : volume * globalVolume)
    }
  }, [isMuted, globalVolume, volume])

  const play = () => {
    if (soundRef.current && audioEnabled) {
      soundRef.current.play()
      soundRef.current.fade(0, volume * globalVolume, fadeInDuration)
    }
  }

  const pause = () => {
    if (soundRef.current) {
      soundRef.current.fade(
        soundRef.current.volume(),
        0,
        fadeOutDuration
      )
      setTimeout(() => {
        soundRef.current?.pause()
      }, fadeOutDuration)
    }
  }

  const stop = () => {
    if (soundRef.current) {
      soundRef.current.fade(
        soundRef.current.volume(),
        0,
        fadeOutDuration
      )
      setTimeout(() => {
        soundRef.current?.stop()
      }, fadeOutDuration)
    }
  }

  const setVolume = (newVolume: number) => {
    if (soundRef.current) {
      soundRef.current.volume(isMuted ? 0 : newVolume * globalVolume)
    }
  }

  return {
    play,
    pause,
    stop,
    setVolume,
    isPlaying,
    isLoaded,
  }
}
