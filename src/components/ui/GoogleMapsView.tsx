'use client'

import { useEffect, useRef, useState } from 'react'

interface GoogleMapsViewProps {
  latitude: number
  longitude: number
  onClose?: () => void
}

/**
 * Google Maps satellite view overlay
 * Requires NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in .env
 */
export function GoogleMapsView({
  latitude,
  longitude,
  onClose,
}: GoogleMapsViewProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

    if (!apiKey) {
      setError('Google Maps API key not configured')
      return
    }

    // Load Google Maps API
    if (!window.google) {
      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`
      script.async = true
      script.defer = true
      script.onload = () => initMap()
      script.onerror = () => setError('Failed to load Google Maps')
      document.head.appendChild(script)
    } else {
      initMap()
    }

    function initMap() {
      if (!mapRef.current) return

      try {
        const map = new google.maps.Map(mapRef.current, {
          center: { lat: latitude, lng: longitude },
          zoom: 15,
          mapTypeId: 'satellite', // Satellite view
          tilt: 45, // 3D view
          heading: 0,
          disableDefaultUI: false,
          zoomControl: true,
          mapTypeControl: true,
          streetViewControl: true,
          fullscreenControl: true,
        })

        // Try to load Street View if available
        const panorama = new google.maps.StreetViewPanorama(
          document.createElement('div'),
          {
            position: { lat: latitude, lng: longitude },
            pov: { heading: 0, pitch: 0 },
            zoom: 1,
          }
        )

        map.setStreetView(panorama)
        setIsLoaded(true)
      } catch (err) {
        setError('Failed to initialize map')
        console.error('Map initialization error:', err)
      }
    }

    return () => {
      // Cleanup if needed
    }
  }, [latitude, longitude])

  if (error) {
    return (
      <div className="fixed inset-0 z-30 bg-black/80 backdrop-blur-sm flex items-center justify-center">
        <div className="bg-red-900/50 border border-red-500 rounded-lg p-6 max-w-md">
          <h3 className="text-white font-bold mb-2">⚠️ Map Error</h3>
          <p className="text-white/80 text-sm mb-4">{error}</p>
          {error.includes('API key') && (
            <p className="text-white/60 text-xs">
              Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your .env.local file
            </p>
          )}
          {onClose && (
            <button
              onClick={onClose}
              className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 rounded text-white text-sm"
            >
              Close
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-30 bg-black/20">
      <div
        ref={mapRef}
        className="w-full h-full opacity-70 pointer-events-auto"
        style={{ filter: 'saturate(0.8)' }}
      />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="text-white">Loading map...</div>
        </div>
      )}
    </div>
  )
}
