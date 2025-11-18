import { getCurrentTimeOfDay, shouldShowAurora, getSkyColor, getAmbientIntensity } from '../time'

describe('Time Utilities', () => {
  describe('getCurrentTimeOfDay', () => {
    it('returns day or night based on current hour', () => {
      const result = getCurrentTimeOfDay()
      expect(['day', 'night']).toContain(result)
    })
  })

  describe('shouldShowAurora', () => {
    it('shows aurora for north polar region at night', () => {
      expect(shouldShowAurora(70, 'night')).toBe(true)
      expect(shouldShowAurora(85, 'night')).toBe(true)
    })

    it('shows aurora for south polar region at night', () => {
      expect(shouldShowAurora(-70, 'night')).toBe(true)
      expect(shouldShowAurora(-85, 'night')).toBe(true)
    })

    it('does not show aurora during day', () => {
      expect(shouldShowAurora(70, 'day')).toBe(false)
      expect(shouldShowAurora(-70, 'day')).toBe(false)
    })

    it('does not show aurora in non-polar regions', () => {
      expect(shouldShowAurora(30, 'night')).toBe(false)
      expect(shouldShowAurora(0, 'night')).toBe(false)
      expect(shouldShowAurora(-30, 'night')).toBe(false)
    })

    it('does not show aurora at exactly 60 degrees', () => {
      expect(shouldShowAurora(60, 'night')).toBe(false)
      expect(shouldShowAurora(-60, 'night')).toBe(false)
    })

    it('shows aurora just above 60 degrees', () => {
      expect(shouldShowAurora(60.1, 'night')).toBe(true)
      expect(shouldShowAurora(-60.1, 'night')).toBe(true)
    })
  })

  describe('getSkyColor', () => {
    it('returns light blue for day', () => {
      expect(getSkyColor('day')).toBe('#87CEEB')
    })

    it('returns dark blue for night', () => {
      expect(getSkyColor('night')).toBe('#0a0e27')
    })
  })

  describe('getAmbientIntensity', () => {
    it('returns higher intensity for day', () => {
      const dayIntensity = getAmbientIntensity('day')
      const nightIntensity = getAmbientIntensity('night')
      expect(dayIntensity).toBeGreaterThan(nightIntensity)
    })

    it('returns correct values', () => {
      expect(getAmbientIntensity('day')).toBe(0.6)
      expect(getAmbientIntensity('night')).toBe(0.3)
    })
  })
})
