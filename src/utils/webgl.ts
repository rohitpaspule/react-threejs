/**
 * Check if WebGL is supported in the current browser
 */
export function isWebGLSupported(): boolean {
  try {
    const canvas = document.createElement('canvas')
    const gl =
      canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    return !!gl
  } catch (e) {
    return false
  }
}

/**
 * Get WebGL capabilities
 */
export function getWebGLCapabilities(): {
  supported: boolean
  maxTextureSize?: number
  renderer?: string
} {
  try {
    const canvas = document.createElement('canvas')
    const gl = (canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null

    if (!gl) {
      return { supported: false }
    }

    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
    const renderer = debugInfo
      ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
      : 'Unknown'

    return {
      supported: true,
      maxTextureSize: gl.getParameter(gl.MAX_TEXTURE_SIZE) as number,
      renderer: renderer as string,
    }
  } catch (e) {
    return { supported: false }
  }
}
