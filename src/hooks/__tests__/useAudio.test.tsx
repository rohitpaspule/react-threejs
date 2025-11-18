import { renderHook } from '@testing-library/react'
import { useAudio } from '../useAudio'
import { useAppStore } from '@/store/appStore'

// Mock the store
jest.mock('@/store/appStore')

describe('useAudio Hook', () => {
  const mockUseAppStore = useAppStore as jest.MockedFunction<typeof useAppStore>

  beforeEach(() => {
    mockUseAppStore.mockReturnValue({
      isMuted: false,
      volume: 0.5,
      audioEnabled: true,
      setMuted: jest.fn(),
      setVolume: jest.fn(),
      setAudioEnabled: jest.fn(),
    } as any)
  })

  it('initializes with correct state', () => {
    const { result } = renderHook(() =>
      useAudio({
        url: 'test.mp3',
        loop: true,
      })
    )

    expect(result.current.isPlaying).toBe(false)
    expect(result.current.isLoaded).toBe(false)
  })

  it('handles null URL', () => {
    const { result } = renderHook(() =>
      useAudio({
        url: null,
      })
    )

    expect(result.current.isPlaying).toBe(false)
    expect(result.current.isLoaded).toBe(false)
  })

  it('provides play, pause, stop, and setVolume functions', () => {
    const { result } = renderHook(() =>
      useAudio({
        url: 'test.mp3',
      })
    )

    expect(typeof result.current.play).toBe('function')
    expect(typeof result.current.pause).toBe('function')
    expect(typeof result.current.stop).toBe('function')
    expect(typeof result.current.setVolume).toBe('function')
  })
})
