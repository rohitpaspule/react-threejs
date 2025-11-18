'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh, ShaderMaterial } from 'three'

/**
 * Aurora Borealis effect for polar locations at night
 * Uses custom shaders for realistic aurora waves
 */
export function Aurora() {
  const auroraRef = useRef<Mesh>(null)

  // Custom shader for aurora effect
  const shaderMaterial = useMemo(
    () =>
      new ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          color1: { value: [0.0, 1.0, 0.5] }, // Green
          color2: { value: [0.3, 0.5, 1.0] }, // Blue
        },
        vertexShader: `
          varying vec2 vUv;
          varying vec3 vPosition;

          void main() {
            vUv = uv;
            vPosition = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float time;
          uniform vec3 color1;
          uniform vec3 color2;
          varying vec2 vUv;
          varying vec3 vPosition;

          void main() {
            // Wave pattern
            float wave1 = sin(vUv.x * 10.0 + time * 0.5) * 0.5 + 0.5;
            float wave2 = sin(vUv.x * 15.0 - time * 0.3) * 0.5 + 0.5;
            float pattern = wave1 * wave2;

            // Vertical gradient
            float vertical = 1.0 - abs(vUv.y - 0.5) * 2.0;
            vertical = pow(vertical, 3.0);

            // Mix colors
            vec3 color = mix(color1, color2, pattern);

            // Final opacity
            float alpha = pattern * vertical * 0.6;

            gl_FragColor = vec4(color, alpha);
          }
        `,
        transparent: true,
        depthWrite: false,
      }),
    []
  )

  useFrame((state) => {
    if (auroraRef.current && shaderMaterial) {
      shaderMaterial.uniforms.time.value = state.clock.getElapsedTime()
    }
  })

  return (
    <mesh
      ref={auroraRef}
      position={[0, 15, 0]}
      rotation={[Math.PI / 2, 0, 0]}
      material={shaderMaterial}
    >
      <planeGeometry args={[80, 40, 32, 32]} />
    </mesh>
  )
}
