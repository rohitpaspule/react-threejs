# Technical Documentation

This document provides detailed technical information about special features and implementation details.

## Table of Contents

- [Google Earth 360 Integration](#google-earth-360-integration)
- [Time-of-Day System](#time-of-day-system)
- [Aurora Borealis Effect](#aurora-borealis-effect)
- [Audio System & Autoplay Policies](#audio-system--autoplay-policies)
- [Performance Optimization](#performance-optimization)
- [Coordinate System](#coordinate-system)
- [Accessibility Features](#accessibility-features)

---

## Google Earth 360 Integration

### Overview

The platform integrates Google Earth Web to provide additional geographic context for blog posts. When a blog includes a `ge360Link`, a button appears that opens the location in Google Earth in a new tab.

### Why Not Iframe Embedding?

**Important**: Google Earth Web cannot be embedded in iframes due to security restrictions:

- **X-Frame-Options**: Google sets `X-Frame-Options: DENY` or `SAMEORIGIN`
- **Content Security Policy**: Prevents iframe embedding from external domains
- **403 Forbidden**: Attempting to embed returns a 403 error

This is intentional by Google to prevent unauthorized embedding and ensure users interact with Google Earth directly on their platform.

### Implementation

#### 1. Getting Google Earth Links

1. Navigate to [Google Earth Web](https://earth.google.com/web/)
2. Find your desired location
3. Adjust the view (altitude, angle, etc.)
4. Click the Share button
5. Copy the generated URL

Example URL format:
```
https://earth.google.com/web/@LAT,LNG,ALT,DISTANCE,HEADING,TILT,ROLL
```

Parameters:
- `LAT`: Latitude
- `LNG`: Longitude
- `ALT`: Altitude (in meters)
- `DISTANCE`: Camera distance from ground
- `HEADING`: Camera heading (0-360°)
- `TILT`: Camera tilt angle (0-90°)
- `ROLL`: Camera roll angle

#### 2. Adding to Blog Posts

Add to frontmatter:
```yaml
ge360Link: "https://earth.google.com/web/@89.5,0,0a,22251752.77375655d,35y,0h,0t,0r"
```

#### 3. Rendering Implementation

The link opens Google Earth in a new tab with security attributes:

```tsx
{blog.frontmatter.ge360Link && (
  <a
    href={blog.frontmatter.ge360Link}
    target="_blank"
    rel="noopener noreferrer"
    className="fixed top-20 right-4 z-40 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg shadow-lg"
  >
    🗺️ View in Google Earth
    {/* External link icon */}
  </a>
)}
```

**Security Attributes**:
- `target="_blank"`: Opens in new tab
- `rel="noopener"`: Prevents new tab from accessing `window.opener`
- `rel="noreferrer"`: Doesn't send referrer information

### User Experience

When users click the "View in Google Earth" button:
1. Google Earth opens in a new tab
2. The exact view specified in the URL is loaded
3. Users can interact with Google Earth's full feature set
4. The original blog tab remains open
5. Users can easily switch between tabs

### Benefits of New Tab Approach

✅ **Works Reliably**: No 403 errors or CORS issues
✅ **Full Features**: Users get complete Google Earth functionality
✅ **Better Performance**: No iframe overhead on blog page
✅ **Security**: Proper isolation between sites
✅ **Mobile Friendly**: Works better on mobile devices

### Alternative: Deep Links

For mobile apps, you can also use Google Earth mobile deep links:

```
google-earth://latitude,longitude
```

However, web URLs are more universal and work across all platforms.

---

## Time-of-Day System

### Overview

The sky and lighting automatically adjust based on the user's local time, creating a more immersive experience. Blog posts can override this with specific time preferences.

### Implementation

#### 1. Time Detection

```typescript
export function getCurrentTimeOfDay(): TimeOfDay {
  const hour = new Date().getHours()
  return hour >= 6 && hour < 18 ? 'day' : 'night'
}
```

- **Day**: 6:00 AM - 5:59 PM (06:00 - 17:59)
- **Night**: 6:00 PM - 5:59 AM (18:00 - 05:59)

#### 2. Sky Colors

```typescript
export function getSkyColor(timeOfDay: TimeOfDay): string {
  return timeOfDay === 'day' ? '#87CEEB' : '#0a0e27'
}
```

- **Day**: Light blue (#87CEEB - Sky Blue)
- **Night**: Dark blue (#0a0e27 - Deep Night)

#### 3. Lighting Adjustments

```typescript
export function getAmbientIntensity(timeOfDay: TimeOfDay): number {
  return timeOfDay === 'day' ? 0.6 : 0.3
}
```

Directional light also adjusts:
- **Day**: Full intensity (1.0)
- **Night**: Reduced intensity (0.5)

#### 4. Auto-Update

The `useTimeOfDay` hook checks every minute for time changes:

```typescript
const interval = setInterval(updateTime, 60000) // 60 seconds
```

### Override Mechanism

Blog posts can specify time preferences in frontmatter:

```yaml
timePref: night  # Options: day, night, auto
```

This is useful for:
- Night-themed content (city lights, aurora)
- Consistent presentation
- Creative control

---

## Aurora Borealis Effect

### Overview

A realistic Aurora Borealis effect appears automatically for polar regions during nighttime, adding visual drama to Arctic/Antarctic blog posts.

### Activation Logic

```typescript
export function shouldShowAurora(
  latitude: number,
  timeOfDay: TimeOfDay
): boolean {
  return timeOfDay === 'night' && (latitude > 60 || latitude < -60)
}
```

**Requirements**:
1. Nighttime (local or override)
2. Polar location (latitude > 60° or < -60°)

**Geographic Coverage**:
- **Northern**: Above 60°N (Alaska, Northern Canada, Scandinavia, Siberia)
- **Southern**: Below 60°S (Antarctica, Southern Ocean)

### Visual Implementation

#### Custom Shader

The aurora uses a custom WebGL shader for realistic wave patterns:

```glsl
// Vertex Shader
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vUv = uv;
  vPosition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
```

```glsl
// Fragment Shader
uniform float time;
uniform vec3 color1;  // Green: [0.0, 1.0, 0.5]
uniform vec3 color2;  // Blue: [0.3, 0.5, 1.0]

void main() {
  // Wave patterns
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
```

#### Animation

Time uniform updates each frame:

```typescript
useFrame((state) => {
  if (auroraRef.current && shaderMaterial) {
    shaderMaterial.uniforms.time.value = state.clock.getElapsedTime()
  }
})
```

### Customization Parameters

You can adjust these values in `Aurora.tsx`:

```typescript
// Colors
color1: [0.0, 1.0, 0.5]  // Green
color2: [0.3, 0.5, 1.0]  // Blue

// Position
position={[0, 15, 0]}  // Higher = higher in sky

// Size
<planeGeometry args={[80, 40, 32, 32]} />  // Width, height, segments

// Opacity
float alpha = pattern * vertical * 0.6  // 0.6 = max opacity
```

### Performance Notes

- Uses efficient shader rendering (GPU-accelerated)
- Only renders when conditions are met
- Transparent rendering with depth write disabled
- Low polygon count (32x32 segments)

---

## Audio System & Autoplay Policies

### Overview

The audio system provides ambient soundscapes for each location while respecting browser autoplay policies and providing user controls.

### Browser Autoplay Policies

**The Problem**: Browsers block autoplay of audio until user interaction.

**Why**: Prevents annoying auto-playing ads and improves user experience.

**Affected Browsers**:
- Chrome (all platforms)
- Safari (all platforms)
- Firefox (desktop & mobile)
- Edge (all platforms)

### Implementation Strategy

#### 1. User Gesture Requirement

```typescript
const [audioEnabled, setAudioEnabled] = useState(false)

// Show enable button until user clicks
if (!audioEnabled) {
  return (
    <button onClick={() => setAudioEnabled(true)}>
      🔊 Enable Audio
    </button>
  )
}
```

#### 2. Conditional Autoplay

```typescript
const sound = new Howl({
  src: [url],
  loop: true,
  onload: () => {
    // Only autoplay if user has enabled audio
    if (autoplay && audioEnabled && !isMuted) {
      sound.play()
      sound.fade(0, volume * globalVolume, fadeInDuration)
    }
  },
})
```

#### 3. Smooth Fade In/Out

Abrupt audio changes are jarring. We use fades:

```typescript
// Fade in (2 seconds)
sound.fade(0, targetVolume, 2000)

// Fade out (1 second)
sound.fade(currentVolume, 0, 1000)
```

### Audio Controls

#### Volume Control

```typescript
const [volume, setVolume] = useState(0.5) // 0.0 to 1.0

// Global volume affects all sounds
sound.volume(isMuted ? 0 : volume * globalVolume)
```

#### Mute/Unmute

```typescript
const toggleMute = () => {
  setMuted(!isMuted)
  // Volume automatically updates via useEffect
}
```

### Audio File Recommendations

#### Format

**Recommended**: MP3 (best compatibility)
**Alternative**: OGG (better quality, smaller size)

#### Quality Settings

```bash
# FFmpeg command for optimal audio
ffmpeg -i input.wav \
  -codec:a libmp3lame \
  -b:a 128k \
  -ar 44100 \
  -ac 2 \
  output.mp3
```

Parameters:
- **Bitrate**: 128kbps (good quality, reasonable size)
- **Sample Rate**: 44100 Hz (CD quality)
- **Channels**: 2 (stereo)

#### Creating Seamless Loops

For ambient sounds that loop continuously:

1. **Fade in/out**: Start and end with silence
2. **Match phases**: Ensure waveform aligns at loop point
3. **Test**: Listen for pops/clicks at loop boundary
4. **Normalize**: Consistent volume throughout

Tools:
- Audacity (free, open-source)
- Adobe Audition (professional)
- Logic Pro / Ableton Live (music production)

### CDN Hosting

Host audio files on CDN for:
- ✅ Faster loading
- ✅ Reduced server load
- ✅ Better caching
- ✅ Geographic distribution

Recommended CDNs:
- Cloudflare
- AWS CloudFront
- Bunny CDN
- DigitalOcean Spaces

### Accessibility

#### Audio Transcripts

For accessibility, provide transcripts:

```markdown
**Audio Description**: Arctic wind howling, ice cracking, distant wildlife sounds
```

#### Visual Indicators

Show audio state visually:
- 🔊 Playing
- 🔇 Muted
- ⏸️ Paused

---

## Performance Optimization

### 3D Rendering

#### Level of Detail (LOD)

Adjust model complexity based on camera distance:

```typescript
import { Lod } from '@react-three/drei'

<Lod distances={[0, 10, 20]}>
  <mesh geometry={highDetail} />
  <mesh geometry={mediumDetail} />
  <mesh geometry={lowDetail} />
</Lod>
```

#### Geometry Optimization

- Keep polygon counts low (< 10k for mobile)
- Use instanced meshes for repeated objects
- Merge geometries when possible

#### Texture Optimization

```typescript
// Compress textures
const texture = useTexture('/texture.jpg')
texture.anisotropy = 4  // Balance quality & performance
```

### Code Splitting

#### Dynamic Imports

All 3D code is dynamically imported to reduce initial bundle:

```typescript
const Scene = dynamic(
  () => import('@/components/3d/Scene').then(mod => ({ default: mod.Scene })),
  { ssr: false, loading: () => <LoadingSpinner /> }
)
```

Benefits:
- Smaller initial bundle
- Faster time to interactive
- No SSR hydration issues

### Asset Loading Strategy

#### Progressive Loading

1. **Critical**: HTML, CSS, minimal JS
2. **High Priority**: Hero images, fonts
3. **Medium Priority**: 3D assets, audio previews
4. **Low Priority**: Google Earth iframes, large media

#### Lazy Loading

```tsx
<iframe loading="lazy" />  // Native lazy loading
<img loading="lazy" />     // Native lazy loading
```

### Caching Strategy

#### Static Assets

```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/audio/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}
```

---

## Coordinate System

### Latitude/Longitude to 3D

Converting geographic coordinates to 3D positions on a sphere:

```typescript
export function latLngToVector3(
  lat: number,
  lng: number,
  radius: number = 10
): Vector3 {
  // Convert degrees to radians
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)

  // Spherical to Cartesian coordinates
  const x = -(radius * Math.sin(phi) * Math.cos(theta))
  const y = radius * Math.cos(phi)
  const z = radius * Math.sin(phi) * Math.sin(theta)

  return new Vector3(x, y, z)
}
```

**Explanation**:
- `phi`: Polar angle (from north pole)
- `theta`: Azimuthal angle (from prime meridian)
- Negative `x`: Aligns with Three.js coordinate system

### Camera Positioning

For optimal viewing angles:

```typescript
export function getCameraPositionForLocation(
  coords: { lat: number; lng: number },
  distance: number = 15
): [number, number, number] {
  // Position camera further from surface
  const vec = latLngToVector3(coords.lat, coords.lng, distance)
  return [vec.x, vec.y, vec.z]
}
```

**Distance Guidelines**:
- **Globe overview**: 25-30
- **Region view**: 15-20
- **Close-up**: 12-15

---

## Accessibility Features

### WebGL Fallback

For browsers without WebGL support:

```typescript
if (!isWebGLSupported()) {
  return <WebGLFallback blog={blog} />
}
```

The fallback provides:
- Static hero images
- Full blog content
- Readable layout
- Clear messaging about missing features

### Keyboard Navigation

All interactive elements support keyboard:

```tsx
<button
  onClick={handleClick}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
  aria-label="Descriptive label"
>
```

Tab order is logical and complete.

### Screen Readers

ARIA labels on all interactive elements:

```tsx
<button aria-label="Mute audio">🔇</button>
<nav aria-label="Main navigation">...</nav>
```

### High Contrast Mode

Respects user preferences:

```css
@media (prefers-contrast: high) {
  body {
    background: black;
    color: white;
  }
}
```

### Reduced Motion

Respects user preferences:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Focus Visible

Clear focus indicators:

```css
*:focus-visible {
  @apply outline-2 outline-primary-500 outline-offset-2;
}
```

---

## Additional Resources

- [Three.js Documentation](https://threejs.org/docs/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/)
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Next.js Performance](https://nextjs.org/docs/advanced-features/measuring-performance)
