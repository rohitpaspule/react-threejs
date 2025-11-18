# Immersive 3D Blog 🌍

An immersive 3D blog platform where blog posts are **experiences**, not just text. Built with Next.js, React Three Fiber, and modern web technologies.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## ✨ Features

- 🌍 **Interactive 3D Globe** - Navigate a beautiful 3D world with blog posts pinned to real-world locations
- 🎵 **Ambient Audio** - Location-specific soundscapes with smart autoplay handling
- 🌌 **Time-Aware Sky** - Dynamic day/night cycles based on local time
- ✨ **Aurora Effects** - Realistic Aurora Borealis for polar regions at night
- 🗺️ **Google Earth Integration** - Direct links to view locations in Google Earth
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- ♿ **Accessible** - WebGL fallback, keyboard navigation, high-contrast support
- 🚀 **Performance Optimized** - Code splitting, lazy loading, and efficient rendering
- 📝 **Markdown-Based Content** - Easy blog creation with frontmatter

## 🎬 Demo

Visit the live demo: [Your Deployment URL]

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Installation](#installation)
- [Development](#development)
- [Adding Blog Posts](#adding-blog-posts)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Testing](#testing)
- [Performance Optimization](#performance-optimization)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/immersive-3d-blog.git
cd immersive-3d-blog

# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## 📦 Installation

### Prerequisites

- Node.js 18.0 or higher
- npm 9.0 or higher
- Modern browser with WebGL support

### Step-by-Step Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/immersive-3d-blog.git
   cd immersive-3d-blog
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```

4. **Edit `.env.local` with your settings:**
   ```env
   NEXT_PUBLIC_CDN_URL=https://your-cdn.com
   NEXT_PUBLIC_AUDIO_CDN=https://your-cdn.com/audio
   NEXT_PUBLIC_MODEL_CDN=https://your-cdn.com/models
   ```

5. **Run the development server:**
   ```bash
   npm run dev
   ```

6. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run type-check   # Run TypeScript type checking
```

### Development Workflow

1. **Start the dev server:** `npm run dev`
2. **Make your changes** in the `src` directory
3. **Test your changes** - The server auto-reloads
4. **Run tests:** `npm test`
5. **Type check:** `npm run type-check`
6. **Lint:** `npm run lint`

## 📝 Adding Blog Posts

### Creating a New Blog Post

1. Create a new `.md` file in `content/blogs/`:
   ```bash
   touch content/blogs/my-adventure.md
   ```

2. Add frontmatter and content:
   ```markdown
   ---
   id: my-adventure-1
   title: "My Amazing Adventure"
   description: "A short description of your experience"
   coords:
     lat: 40.7128
     lng: -74.0060
   ge360Link: "https://earth.google.com/web/@40.7128,-74.0060,0a,1000d,35y,0h,0t,0r"
   ambientSoundURL: "https://cdn.example.com/audio/city.mp3"
   previewImage: "https://images.unsplash.com/photo-example"
   timePref: auto
   date: "2024-03-15"
   tags: ["adventure", "city", "travel"]
   weatherAmbience: city
   ---

   # Your Blog Content Here

   Write your immersive story...
   ```

### Frontmatter Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | ✅ | Unique identifier |
| `title` | string | ✅ | Blog post title |
| `description` | string | ✅ | Short description |
| `coords.lat` | number | ✅ | Latitude (-90 to 90) |
| `coords.lng` | number | ✅ | Longitude (-180 to 180) |
| `coords.alt` | number | ❌ | Altitude (optional) |
| `previewImage` | string | ✅ | Preview image URL |
| `date` | string | ✅ | Publication date (ISO format) |
| `ge360Link` | string | ❌ | Google Earth 360 link |
| `ambientSoundURL` | string | ❌ | Audio file URL |
| `timePref` | string | ❌ | `day`, `night`, or `auto` (default: `auto`) |
| `tags` | array | ❌ | Array of tag strings |
| `weatherAmbience` | string | ❌ | `arctic`, `ocean`, `city`, `forest`, `desert` |

### Audio Assets

For best performance, host audio files on a CDN. Recommended format:

- **Format:** MP3 or OGG
- **Bitrate:** 128kbps (good quality, reasonable file size)
- **Loop-friendly:** Ensure clean loops (no pops/clicks)
- **Duration:** 30-60 seconds (will loop automatically)

### Finding Google Earth 360 Links

1. Go to [Google Earth Web](https://earth.google.com/web/)
2. Navigate to your location
3. Click the "Share" button
4. Copy the link
5. Paste into `ge360Link` field

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

4. **Set environment variables in Vercel dashboard:**
   - Go to your project settings
   - Add environment variables from `.env.example`

### Deploy to Netlify

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build the project:**
   ```bash
   npm run build
   ```

3. **Deploy:**
   ```bash
   netlify deploy --prod
   ```

### GitHub Actions Auto-Deploy

The project includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) for automatic deployment on push to main branch.

To enable:
1. Add `VERCEL_TOKEN` to GitHub Secrets
2. Add `VERCEL_ORG_ID` to GitHub Secrets
3. Add `VERCEL_PROJECT_ID` to GitHub Secrets

## 📁 Project Structure

```
immersive-3d-blog/
├── content/
│   └── blogs/              # Markdown blog posts
│       ├── north-pole-travel.md
│       ├── great-barrier-reef.md
│       └── tokyo-at-night.md
├── public/                 # Static assets
├── src/
│   ├── app/               # Next.js app directory
│   │   ├── layout.tsx
│   │   ├── page.tsx       # Home page
│   │   ├── blogs/         # Blog pages
│   │   ├── dashboard/     # Dashboard page
│   │   └── info/          # Info page
│   ├── components/
│   │   ├── 3d/           # Three.js components
│   │   │   ├── Scene.tsx
│   │   │   ├── World.tsx
│   │   │   ├── BlogMarker.tsx
│   │   │   ├── Sky.tsx
│   │   │   └── Aurora.tsx
│   │   └── ui/           # UI components
│   │       ├── Navigation.tsx
│   │       ├── AudioControls.tsx
│   │       ├── BlogCard.tsx
│   │       ├── FloatingPanel.tsx
│   │       └── WebGLFallback.tsx
│   ├── hooks/            # Custom hooks
│   │   ├── useAudio.ts
│   │   ├── useTimeOfDay.ts
│   │   └── useCameraTransition.ts
│   ├── store/            # Zustand store
│   │   └── appStore.ts
│   ├── types/            # TypeScript types
│   │   ├── blog.ts
│   │   └── scene.ts
│   └── utils/            # Utility functions
│       ├── coordinates.ts
│       ├── time.ts
│       ├── markdown.ts
│       └── webgl.ts
├── .github/
│   └── workflows/
│       └── deploy.yml     # CI/CD workflow
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.js
└── README.md
```

## ⚙️ Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# CDN Configuration
NEXT_PUBLIC_CDN_URL=https://cdn.example.com

# Asset URLs
NEXT_PUBLIC_AUDIO_CDN=https://cdn.example.com/audio
NEXT_PUBLIC_MODEL_CDN=https://cdn.example.com/models

# Optional: Google Maps API
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key

# Optional: Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### CDN Setup

For optimal performance, host large assets on a CDN:

1. **Cloudflare, AWS CloudFront, or similar**
2. **Upload audio files, 3D models, and images**
3. **Update URLs in blog frontmatter**
4. **Set CDN URL in environment variables**

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm test -- --coverage
```

### Test Coverage

The project includes tests for:
- ✅ Coordinate conversion utilities
- ✅ Time of day detection
- ✅ WebGL support detection
- ✅ Audio hook functionality
- ✅ Time-aware sky system

### Writing Tests

Tests are located in `__tests__` directories next to the files they test:

```
src/utils/
├── coordinates.ts
└── __tests__/
    └── coordinates.test.ts
```

## 🎯 Performance Optimization

### Best Practices Implemented

1. **Code Splitting**
   - Dynamic imports for 3D components
   - Route-based code splitting with Next.js

2. **Lazy Loading**
   - Audio files load on demand
   - Google Earth links open in new tabs (no iframe overhead)
   - Images use Next.js Image component

3. **Asset Optimization**
   - Use CDN for static assets
   - Compress audio files (128kbps MP3)
   - Optimize images (WebP when possible)

4. **3D Performance**
   - LOD (Level of Detail) for 3D models
   - Efficient geometry (low poly counts)
   - Texture compression

5. **Caching**
   - Static generation for blog pages
   - Service worker caching (if enabled)

### Performance Checklist

- [ ] Host assets on CDN
- [ ] Enable gzip/brotli compression
- [ ] Optimize images (use WebP)
- [ ] Compress audio files
- [ ] Enable HTTP/2
- [ ] Use Next.js Image optimization
- [ ] Monitor Core Web Vitals

## 🐛 Troubleshooting

### Common Issues

**3D scene doesn't render:**
- Check browser WebGL support: [webglreport.com](https://webglreport.com/)
- Ensure no browser extensions blocking WebGL
- Check browser console for errors

**Audio doesn't play:**
- Audio requires user interaction (browser policy)
- Check browser console for autoplay errors
- Ensure audio URL is accessible (CORS)
- Click "Enable Audio" button first

**Build fails:**
- Clear `.next` directory: `rm -rf .next`
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version: `node --version` (should be 18+)

**TypeScript errors:**
- Run type check: `npm run type-check`
- Ensure all dependencies are installed
- Check `tsconfig.json` configuration

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/) - React renderer for Three.js
- [Three.js](https://threejs.org/) - 3D graphics library
- [Howler.js](https://howlerjs.com/) - Audio library
- [TailwindCSS](https://tailwindcss.com/) - CSS framework
- [Zustand](https://github.com/pmndrs/zustand) - State management

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Built with ❤️ for immersive storytelling**
