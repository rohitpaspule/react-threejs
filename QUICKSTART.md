# Quick Start Guide

Get up and running in 5 minutes.

## Prerequisites

- Node.js 18+ installed
- npm 9+ installed
- Modern browser with WebGL support

## Installation

```bash
# Install dependencies
npm install
```

## Development

```bash
# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Your First Blog Post

1. **Create file:**
   ```bash
   touch content/blogs/my-first-post.md
   ```

2. **Add content:**
   ```markdown
   ---
   id: my-first-post-1
   title: "My First Adventure"
   description: "An amazing journey"
   coords:
     lat: 40.7128
     lng: -74.0060
   previewImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
   date: "2024-03-15"
   tags: ["travel"]
   ---

   # My First Adventure

   This is my story...
   ```

3. **View it:**
   Navigate to `/blogs` and click your post!

## Testing

```bash
npm test
```

## Build for Production

```bash
npm run build
npm start
```

## Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## Common Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm test` | Run tests |
| `npm run lint` | Lint code |
| `npm run type-check` | Check TypeScript |

## File Structure

```
content/blogs/          # Your blog posts (Markdown)
src/app/               # Pages
src/components/        # Reusable components
src/hooks/             # Custom hooks
src/utils/             # Utility functions
```

## Key Features

- ✅ 3D globe navigation
- ✅ Ambient audio
- ✅ Day/night sky
- ✅ Aurora effects (polar regions)
- ✅ Google Earth 360 integration
- ✅ Markdown blog posts
- ✅ Fully accessible
- ✅ Mobile responsive

## Need Help?

- 📖 See [README.md](README.md) for full documentation
- 🔧 See [docs/TECHNICAL.md](docs/TECHNICAL.md) for technical details
- 🧪 See [docs/TESTING.md](docs/TESTING.md) for testing guide

## Next Steps

1. ✅ Install dependencies
2. ✅ Run dev server
3. ✅ Browse to localhost:3000
4. ✅ Create your first blog post
5. ✅ Customize the theme
6. ✅ Deploy to Vercel

---

**Happy blogging! 🌍✨**
