# Project Structure

Complete file tree for the Immersive 3D Blog project.

```
immersive-3d-blog/
│
├── .github/
│   └── workflows/
│       └── deploy.yml                 # CI/CD workflow for Vercel
│
├── content/
│   └── blogs/                         # Markdown blog posts
│       ├── north-pole-travel.md       # Sample: Arctic adventure
│       ├── great-barrier-reef.md      # Sample: Ocean diving
│       └── tokyo-at-night.md          # Sample: Urban exploration
│
├── docs/
│   ├── TECHNICAL.md                   # Technical documentation
│   └── TESTING.md                     # Testing strategy & plan
│
├── public/                            # Static assets (add images, fonts here)
│
├── src/
│   ├── app/                           # Next.js App Router
│   │   ├── layout.tsx                 # Root layout with Navigation & AudioControls
│   │   ├── page.tsx                   # Home page with 3D hero
│   │   ├── globals.css                # Global styles & Tailwind imports
│   │   │
│   │   ├── blogs/
│   │   │   ├── page.tsx              # Blog list page
│   │   │   └── [slug]/
│   │   │       ├── page.tsx          # Blog detail (SSG)
│   │   │       └── BlogDetailClient.tsx  # Client-side 3D blog viewer
│   │   │
│   │   ├── dashboard/
│   │   │   └── page.tsx              # Interactive globe dashboard
│   │   │
│   │   └── info/
│   │       └── page.tsx              # About/Info page
│   │
│   ├── components/
│   │   ├── 3d/                        # Three.js/R3F components
│   │   │   ├── Scene.tsx             # Main 3D scene wrapper
│   │   │   ├── World.tsx             # Globe with rotation
│   │   │   ├── BlogMarker.tsx        # Blog location pins
│   │   │   ├── Sky.tsx               # Time-aware sky sphere
│   │   │   └── Aurora.tsx            # Aurora Borealis shader effect
│   │   │
│   │   └── ui/                        # UI components
│   │       ├── Navigation.tsx         # Top navigation bar
│   │       ├── AudioControls.tsx      # Mute/volume controls
│   │       ├── BlogCard.tsx           # Blog preview card
│   │       ├── FloatingPanel.tsx      # Translucent content panel
│   │       ├── WebGLFallback.tsx      # Non-WebGL fallback view
│   │       └── LoadingSpinner.tsx     # Loading indicator
│   │
│   ├── hooks/                         # Custom React hooks
│   │   ├── useAudio.ts               # Howler.js audio management
│   │   ├── useTimeOfDay.ts           # Auto-updating time detection
│   │   ├── useCameraTransition.ts    # Smooth camera animations
│   │   │
│   │   └── __tests__/                # Hook tests
│   │       ├── useAudio.test.tsx
│   │       └── useTimeOfDay.test.tsx
│   │
│   ├── store/
│   │   └── appStore.ts               # Zustand global state
│   │
│   ├── types/
│   │   ├── blog.ts                   # Blog & frontmatter types
│   │   └── scene.ts                  # 3D scene types
│   │
│   └── utils/
│       ├── coordinates.ts             # Lat/lng to 3D conversion
│       ├── time.ts                    # Time-of-day utilities
│       ├── markdown.ts                # Blog loading & parsing
│       ├── webgl.ts                   # WebGL detection
│       │
│       └── __tests__/                 # Utility tests
│           ├── coordinates.test.ts
│           ├── time.test.ts
│           └── webgl.test.ts
│
├── .env.example                       # Environment variables template
├── .eslintrc.json                     # ESLint configuration
├── .gitignore                         # Git ignore rules
├── jest.config.js                     # Jest configuration
├── jest.setup.js                      # Jest setup & mocks
├── next.config.js                     # Next.js configuration
├── package.json                       # Dependencies & scripts
├── postcss.config.js                  # PostCSS configuration
├── PROJECT_STRUCTURE.md               # This file
├── README.md                          # Main documentation
├── tailwind.config.js                 # Tailwind CSS configuration
└── tsconfig.json                      # TypeScript configuration
```

## File Counts

- **Configuration Files**: 10
- **Pages**: 5 (including dynamic route)
- **3D Components**: 5
- **UI Components**: 6
- **Custom Hooks**: 3
- **Utilities**: 4
- **Tests**: 5 test files (15+ test suites)
- **Sample Blogs**: 3
- **Documentation**: 3 files

**Total**: 50+ files

## Key Directories Explained

### `/content/blogs/`
Markdown files with frontmatter for blog posts. Each file becomes a static page.

### `/src/app/`
Next.js 14 App Router pages. Each folder is a route.

### `/src/components/3d/`
React Three Fiber components for 3D rendering. Only loaded client-side.

### `/src/components/ui/`
Reusable UI components (navigation, controls, cards, etc.)

### `/src/hooks/`
Custom React hooks for audio, time detection, and camera control.

### `/src/store/`
Zustand store for global state management.

### `/src/utils/`
Pure utility functions (coordinate conversion, time detection, markdown parsing).

### `/docs/`
Technical and testing documentation.

### `/.github/workflows/`
GitHub Actions CI/CD configuration.

## Adding New Files

### New Blog Post
```bash
content/blogs/my-new-post.md
```

### New Page
```bash
src/app/my-page/page.tsx
```

### New Component
```bash
src/components/ui/MyComponent.tsx
```

### New Test
```bash
src/utils/__tests__/myUtil.test.ts
```

## Build Output

After running `npm run build`, Next.js generates:

```
.next/
├── cache/
├── server/
├── static/
└── BUILD_ID
```

And for production:

```
out/              # Static export (if using `next export`)
```

## Environment Files

```
.env.local        # Local development (gitignored)
.env.production   # Production variables (gitignored)
.env.example      # Template (committed)
```

## Assets Organization

Recommended structure for public assets:

```
public/
├── images/
│   ├── heroes/
│   └── previews/
├── audio/
│   ├── ambient/
│   └── effects/
├── models/
│   └── *.glb
└── fonts/
```

**Note**: For production, host large assets on CDN instead of `public/`.
