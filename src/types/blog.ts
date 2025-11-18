export interface BlogFrontmatter {
  id: string
  title: string
  description: string
  coords: {
    lat: number
    lng: number
    alt?: number
  }
  ge360Link?: string // Google Earth 360 link (opens in new tab)
  panorama360Image?: string // 360° equirectangular image URL for immersive background
  ambientSoundURL?: string
  previewImage: string
  timePref?: 'day' | 'night' | 'auto' // Override time of day
  date: string
  tags?: string[]
  weatherAmbience?: 'arctic' | 'ocean' | 'city' | 'forest' | 'desert'
}

export interface BlogPost {
  frontmatter: BlogFrontmatter
  content: string
  slug: string
}

export interface BlogMarkerData {
  id: string
  position: [number, number, number] // 3D position in scene
  title: string
  coords: BlogFrontmatter['coords']
  slug: string
}
