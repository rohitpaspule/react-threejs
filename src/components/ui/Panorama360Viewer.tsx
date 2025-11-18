'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface Panorama360ViewerProps {
  imageUrl: string
  onClose?: () => void
}

/**
 * 360° Panorama Viewer
 * Displays equirectangular 360° images as an immersive background
 * No API keys required - just provide a 360° image URL
 */
export function Panorama360Viewer({
  imageUrl,
  onClose,
}: Panorama360ViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const requestRef = useRef<number>()
  const mouseRef = useRef({ x: 0, y: 0 })
  const targetRef = useRef({ lon: 0, lat: 0 })
  const currentRef = useRef({ lon: 0, lat: 0 })

  useEffect(() => {
    if (!containerRef.current) return

    // Create scene
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Create camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.set(0, 0, 0.1)
    cameraRef.current = camera

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Load 360° texture
    const textureLoader = new THREE.TextureLoader()
    textureLoader.load(
      imageUrl,
      (texture) => {
        // Create sphere geometry (inside-out for panorama)
        const geometry = new THREE.SphereGeometry(500, 60, 40)
        geometry.scale(-1, 1, 1) // Flip inside-out

        const material = new THREE.MeshBasicMaterial({
          map: texture,
          opacity: 0.7,
          transparent: true,
        })

        const mesh = new THREE.Mesh(geometry, material)
        scene.add(mesh)
      },
      undefined,
      (error) => {
        console.error('Error loading panorama:', error)
      }
    )

    // Handle mouse movement
    const onMouseMove = (event: MouseEvent) => {
      mouseRef.current = {
        x: event.clientX,
        y: event.clientY,
      }

      targetRef.current.lon = (mouseRef.current.x / window.innerWidth) * 360 - 180
      targetRef.current.lat = (mouseRef.current.y / window.innerHeight) * 180 - 90
    }

    // Handle touch movement
    const onTouchMove = (event: TouchEvent) => {
      if (event.touches.length === 1) {
        event.preventDefault()
        mouseRef.current = {
          x: event.touches[0].clientX,
          y: event.touches[0].clientY,
        }

        targetRef.current.lon =
          (mouseRef.current.x / window.innerWidth) * 360 - 180
        targetRef.current.lat =
          (mouseRef.current.y / window.innerHeight) * 180 - 90
      }
    }

    // Handle window resize
    const onResize = () => {
      if (!camera || !renderer) return
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    // Animation loop
    const animate = () => {
      requestRef.current = requestAnimationFrame(animate)

      // Smooth camera rotation
      currentRef.current.lon += (targetRef.current.lon - currentRef.current.lon) * 0.1
      currentRef.current.lat += (targetRef.current.lat - currentRef.current.lat) * 0.1

      // Clamp latitude
      currentRef.current.lat = Math.max(-85, Math.min(85, currentRef.current.lat))

      // Update camera rotation
      const phi = THREE.MathUtils.degToRad(90 - currentRef.current.lat)
      const theta = THREE.MathUtils.degToRad(currentRef.current.lon)

      camera.target = new THREE.Vector3(
        500 * Math.sin(phi) * Math.cos(theta),
        500 * Math.cos(phi),
        500 * Math.sin(phi) * Math.sin(theta)
      )

      camera.lookAt(camera.target)
      renderer.render(scene, camera)
    }

    // Add event listeners
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('touchmove', onTouchMove)
    window.addEventListener('resize', onResize)

    // Start animation
    animate()

    // Cleanup
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('resize', onResize)
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement)
        rendererRef.current.dispose()
      }
    }
  }, [imageUrl])

  return (
    <div className="fixed inset-0 z-30 bg-black/20">
      <div ref={containerRef} className="w-full h-full opacity-70" />
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-sm px-4 py-2 rounded-lg text-white text-sm pointer-events-none">
        💡 Move your mouse to look around
      </div>
    </div>
  )
}
