import { create } from 'zustand'
import { TimeOfDay } from '@/types/scene'

interface AppState {
  // Scene state
  timeOfDay: TimeOfDay
  isAuroraActive: boolean
  currentBlogId: string | null
  isTransitioning: boolean
  webglSupported: boolean

  // Audio state
  isMuted: boolean
  volume: number
  currentAudioUrl: string | null
  audioEnabled: boolean // User has interacted, audio can play

  // UI state
  showEarthView: boolean
  isLoading: boolean

  // Actions
  setTimeOfDay: (time: TimeOfDay) => void
  setAuroraActive: (active: boolean) => void
  setCurrentBlogId: (id: string | null) => void
  setTransitioning: (transitioning: boolean) => void
  setWebglSupported: (supported: boolean) => void
  setMuted: (muted: boolean) => void
  setVolume: (volume: number) => void
  setCurrentAudioUrl: (url: string | null) => void
  setAudioEnabled: (enabled: boolean) => void
  setShowEarthView: (show: boolean) => void
  setLoading: (loading: boolean) => void
}

export const useAppStore = create<AppState>((set) => ({
  // Initial state
  timeOfDay: 'day',
  isAuroraActive: false,
  currentBlogId: null,
  isTransitioning: false,
  webglSupported: true,
  isMuted: false,
  volume: 0.5,
  currentAudioUrl: null,
  audioEnabled: false,
  showEarthView: false,
  isLoading: false,

  // Actions
  setTimeOfDay: (time) => set({ timeOfDay: time }),
  setAuroraActive: (active) => set({ isAuroraActive: active }),
  setCurrentBlogId: (id) => set({ currentBlogId: id }),
  setTransitioning: (transitioning) => set({ isTransitioning: transitioning }),
  setWebglSupported: (supported) => set({ webglSupported: supported }),
  setMuted: (muted) => set({ isMuted: muted }),
  setVolume: (volume) => set({ volume }),
  setCurrentAudioUrl: (url) => set({ currentAudioUrl: url }),
  setAudioEnabled: (enabled) => set({ audioEnabled: enabled }),
  setShowEarthView: (show) => set({ showEarthView: show }),
  setLoading: (loading) => set({ isLoading: loading }),
}))
