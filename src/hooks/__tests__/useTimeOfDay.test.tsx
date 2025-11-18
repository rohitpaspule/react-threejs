import { renderHook } from '@testing-library/react'
import { useTimeOfDay } from '../useTimeOfDay'
import { useAppStore } from '@/store/appStore'
import { BlogFrontmatter } from '@/types/blog'

jest.mock('@/store/appStore')

describe('useTimeOfDay Hook', () => {
  const mockSetTimeOfDay = jest.fn()
  const mockSetAuroraActive = jest.fn()
  const mockUseAppStore = useAppStore as jest.MockedFunction<typeof useAppStore>

  beforeEach(() => {
    jest.clearAllMocks()
    mockUseAppStore.mockReturnValue({
      setTimeOfDay: mockSetTimeOfDay,
      setAuroraActive: mockSetAuroraActive,
    } as any)
  })

  it('sets time of day on mount', () => {
    renderHook(() => useTimeOfDay(null))
    expect(mockSetTimeOfDay).toHaveBeenCalled()
  })

  it('respects blog time preference', () => {
    const blog: Partial<BlogFrontmatter> = {
      timePref: 'night',
      coords: { lat: 70, lng: 0 },
    }

    renderHook(() => useTimeOfDay(blog as BlogFrontmatter))
    expect(mockSetTimeOfDay).toHaveBeenCalledWith('night')
  })

  it('activates aurora for polar location at night', () => {
    const blog: Partial<BlogFrontmatter> = {
      timePref: 'night',
      coords: { lat: 70, lng: 0 },
    }

    renderHook(() => useTimeOfDay(blog as BlogFrontmatter))
    expect(mockSetAuroraActive).toHaveBeenCalledWith(true)
  })

  it('does not activate aurora for non-polar location', () => {
    const blog: Partial<BlogFrontmatter> = {
      timePref: 'night',
      coords: { lat: 35, lng: 139 },
    }

    renderHook(() => useTimeOfDay(blog as BlogFrontmatter))
    expect(mockSetAuroraActive).toHaveBeenCalledWith(false)
  })
})
