import { isWebGLSupported, getWebGLCapabilities } from '../webgl'

// Mock canvas and WebGL context
const mockCanvas = {
  getContext: jest.fn(),
}

global.document.createElement = jest.fn((tagName) => {
  if (tagName === 'canvas') {
    return mockCanvas as any
  }
  return {} as any
})

describe('WebGL Utilities', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('isWebGLSupported', () => {
    it('returns true when WebGL is supported', () => {
      mockCanvas.getContext.mockReturnValue({})
      expect(isWebGLSupported()).toBe(true)
    })

    it('returns false when WebGL is not supported', () => {
      mockCanvas.getContext.mockReturnValue(null)
      expect(isWebGLSupported()).toBe(false)
    })

    it('handles exceptions gracefully', () => {
      mockCanvas.getContext.mockImplementation(() => {
        throw new Error('WebGL not available')
      })
      expect(isWebGLSupported()).toBe(false)
    })
  })

  describe('getWebGLCapabilities', () => {
    it('returns capabilities when WebGL is supported', () => {
      const mockGL = {
        getParameter: jest.fn((param) => {
          if (param === 'MAX_TEXTURE_SIZE') return 4096
          return null
        }),
        getExtension: jest.fn(() => ({
          UNMASKED_RENDERER_WEBGL: 'renderer',
        })),
      }
      mockCanvas.getContext.mockReturnValue(mockGL)

      const result = getWebGLCapabilities()
      expect(result.supported).toBe(true)
      expect(result.maxTextureSize).toBe(4096)
    })

    it('returns not supported when WebGL is unavailable', () => {
      mockCanvas.getContext.mockReturnValue(null)
      const result = getWebGLCapabilities()
      expect(result.supported).toBe(false)
      expect(result.maxTextureSize).toBeUndefined()
    })
  })
})
