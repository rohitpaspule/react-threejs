# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-03-15

### Added

#### Core Features
- 🌍 Interactive 3D globe with React Three Fiber
- 📍 Blog posts pinned to real-world coordinates
- 🎵 Ambient audio system with Howler.js
- 🌌 Time-aware day/night sky system
- ✨ Aurora Borealis effect for polar regions
- 🗺️ Google Earth 360° integration
- 📱 Fully responsive design
- ♿ Comprehensive accessibility features
- 🚀 Performance optimizations (code splitting, lazy loading)

#### Pages
- Home page with 3D hero section
- Blog list page with card grid
- Blog detail page with immersive 3D view
- Interactive dashboard with globe navigation
- Info/About page

#### Components
- Scene wrapper with lighting and camera controls
- Rotating Earth globe
- Blog marker pins with hover labels
- Time-aware sky sphere
- Aurora shader effect
- Navigation bar
- Audio controls (mute/volume)
- Blog preview cards
- Floating content panel
- WebGL fallback view
- Loading spinner

#### Hooks
- `useAudio` - Audio playback with autoplay handling
- `useTimeOfDay` - Automatic time detection and aurora activation
- `useCameraTransition` - Smooth camera animations

#### Utilities
- Coordinate conversion (lat/lng to 3D)
- Time-of-day detection
- Markdown parsing with frontmatter
- WebGL support detection

#### Content
- Sample blog post: "Journey to the North Pole"
- Sample blog post: "Diving the Great Barrier Reef"
- Sample blog post: "Tokyo After Dark"

#### Testing
- Unit tests for utilities (coordinates, time, webgl)
- Unit tests for hooks (useAudio, useTimeOfDay)
- Jest configuration and setup
- Testing documentation

#### Documentation
- Comprehensive README with setup instructions
- Technical documentation (TECHNICAL.md)
- Testing strategy and plan (TESTING.md)
- Quick start guide (QUICKSTART.md)
- Project structure overview
- Changelog

#### DevOps
- GitHub Actions CI/CD workflow
- Vercel deployment configuration
- ESLint configuration
- TypeScript strict mode
- Prettier (via ESLint)

#### Configuration
- Next.js 14 with App Router
- TypeScript with strict type checking
- TailwindCSS with custom theme
- Zustand for state management
- Environment variable support

### Technical Specifications

- **Framework**: Next.js 14.2.3
- **React**: 18.3.1
- **3D**: React Three Fiber 8.16.2, Three.js 0.163.0
- **Audio**: Howler.js 2.2.4
- **Styling**: TailwindCSS 3.4.3
- **State**: Zustand 4.5.2
- **Content**: Gray Matter 4.0.3, React Markdown 9.0.1
- **Testing**: Jest 29.7.0, React Testing Library 15.0.2
- **Node**: >= 18.0.0

### Performance

- Code splitting for 3D components
- Lazy loading for audio and iframes
- Static generation for blog pages
- Optimized bundle size
- 60fps 3D rendering
- Responsive images

### Accessibility

- WebGL fallback for unsupported browsers
- Keyboard navigation support
- Screen reader compatible
- ARIA labels on interactive elements
- High contrast mode support
- Reduced motion support
- Focus indicators

### Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+
- Mobile browsers (iOS Safari, Chrome Android)

---

## [Unreleased]

### Planned Features

- VR mode with WebXR
- Snapshot sharing functionality
- Real-time multi-user visits (WebSocket)
- CMS integration (Sanity/NetlifyCMS)
- Advanced search and filtering
- Blog categories and tags filtering
- User comments system
- Admin dashboard for content management
- Analytics integration
- PWA support with offline capability
- Additional 3D effects (weather, particles)
- More ambient sound options
- Custom 3D models for locations
- Video background support
- Social media sharing enhancements

---

## Version History

### Version Naming

- **Major** (1.x.x): Breaking changes, major new features
- **Minor** (x.1.x): New features, backwards compatible
- **Patch** (x.x.1): Bug fixes, minor improvements

### Release Notes

Version 1.0.0 represents the initial production-ready release with all core features implemented and tested.
