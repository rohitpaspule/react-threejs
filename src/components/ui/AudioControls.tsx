'use client'

import { useState } from 'react'
import { useAppStore } from '@/store/appStore'

export function AudioControls() {
  const { isMuted, volume, setMuted, setVolume, audioEnabled, setAudioEnabled } =
    useAppStore()
  const [showVolume, setShowVolume] = useState(false)

  // If audio not enabled yet, show enable button
  if (!audioEnabled) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setAudioEnabled(true)}
          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg shadow-lg transition-colors"
          aria-label="Enable audio"
        >
          🔊 Enable Audio
        </button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2">
      {/* Volume slider */}
      {showVolume && (
        <div className="bg-black/80 backdrop-blur-sm px-3 py-2 rounded-lg flex items-center gap-2">
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-24"
            aria-label="Volume"
          />
          <span className="text-white text-sm w-8">
            {Math.round(volume * 100)}%
          </span>
        </div>
      )}

      {/* Mute/unmute button */}
      <button
        onClick={() => setMuted(!isMuted)}
        onMouseEnter={() => setShowVolume(true)}
        onMouseLeave={() => setShowVolume(false)}
        className="bg-black/80 backdrop-blur-sm hover:bg-black/90 text-white p-3 rounded-lg shadow-lg transition-colors"
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? '🔇' : '🔊'}
      </button>
    </div>
  )
}
