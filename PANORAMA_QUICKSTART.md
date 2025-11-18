# Quick Start: Add Your First 360° Panorama

This guide gets you a working 360° panorama background in under 5 minutes.

## The CORS Issue

**Problem**: External image URLs often have CORS restrictions that block Three.js from loading them.

**Solution**: Download and host images locally in your `/public/panoramas/` folder.

---

## Option 1: Quick Test with Sample Image (Recommended)

### Step 1: Download a Free Panorama

Visit any of these free sources:

**A) Poly Haven (Best Quality)**
1. Go to: https://polyhaven.com/hdris
2. Pick any scene (e.g., "snowy_forest_path_01")
3. Click the image
4. Download: **"JPG Background" → "2K"** (smaller file size)
5. Save as `panorama-test.jpg`

**B) Flickr (Easy)**
1. Go to: https://www.flickr.com/search/?text=equirectangular
2. Filter: "Any license" → "Commercial use allowed"
3. Download any 360° image
4. Save as `panorama-test.jpg`

**C) Wikimedia Commons (Free)**
1. Go to: https://commons.wikimedia.org/
2. Search: "equirectangular panorama"
3. Download any image (check license)
4. Save as `panorama-test.jpg`

### Step 2: Add to Your Project

```bash
# Create panoramas directory
mkdir -p public/panoramas

# Move your downloaded image
mv ~/Downloads/panorama-test.jpg public/panoramas/
```

### Step 3: Update Blog Frontmatter

Edit `content/blogs/north-pole-travel.md`:

```yaml
panorama360Image: "/panoramas/panorama-test.jpg"
```

### Step 4: Test

```bash
npm run dev
# Navigate to: http://localhost:3000/blogs/north-pole-travel
# Click: "Show 360° View" button
# Move your mouse to look around!
```

✅ You should now see the panorama as a background overlay!

---

## Option 2: Download from Street View

### Using StreetViewDownload.com

**Step 1: Find Location**
1. Go to: https://www.google.com/maps
2. Enable Street View (drag the person icon)
3. Navigate to desired location
4. Copy the coordinates from URL

**Step 2: Download**
1. Go to: https://streetviewdownload.com/
2. Paste coordinates (e.g., `35.6762, 139.6503`)
3. Click "Download"
4. Save image (usually 2048×1024)

**Step 3: Add to Project**
```bash
mv ~/Downloads/streetview.jpg public/panoramas/tokyo.jpg
```

**Step 4: Update Blog**
```yaml
panorama360Image: "/panoramas/tokyo.jpg"
```

---

## Option 3: Use CORS-Enabled CDN (Advanced)

If you must use external URLs, these CDNs support CORS:

### Imgur (Free)
1. Upload your panorama to Imgur
2. Get direct image link (ends in `.jpg`)
3. Use in frontmatter:
```yaml
panorama360Image: "https://i.imgur.com/XXXXX.jpg"
```

### Your Own CDN
If using Cloudflare/AWS/DigitalOcean:
1. Enable CORS headers:
   ```
   Access-Control-Allow-Origin: *
   ```
2. Use direct CDN URL

---

## Recommended First Images

### Arctic/Winter
- **Poly Haven**: "snowy_park" or "snowy_forest"
- **Coordinates**: `78.2232, 15.6267` (Svalbard)

### Ocean/Beach
- **Poly Haven**: "cape_hill" or "ocean_rocks"
- **Coordinates**: `21.3099, -157.8581` (Waikiki)

### City
- **Street View**: Tokyo Shibuya `35.6595, 139.7004`
- **Street View**: NYC Times Square `40.7580, -73.9855`

### Nature
- **Poly Haven**: "lakeside" or "forest_slope"
- **Coordinates**: `37.8651, -119.5383` (Yosemite)

---

## Troubleshooting

### "Image not loading"

**Check**:
1. File is in `/public/panoramas/` folder
2. Frontmatter path is correct: `/panoramas/image.jpg`
3. Image is equirectangular (2:1 ratio)
4. File extension matches (`.jpg`, `.png`)

**Test in browser**:
```
http://localhost:3000/panoramas/your-image.jpg
```
Should show the image directly.

### "CORS error"

**Solution**: Download and host locally!

External URLs need CORS headers. Don't use:
- ❌ `https://polyhaven.com/a/...` (page URL)
- ❌ Direct links without CORS

Do use:
- ✅ `/panoramas/image.jpg` (local)
- ✅ Imgur direct links
- ✅ Your CDN with CORS enabled

### "Image is distorted"

**Issue**: Wrong image format

**Solution**: Image must be equirectangular projection:
- ✅ Aspect ratio: 2:1 (e.g., 4096×2048)
- ❌ Not: Fisheye, cubemap, or square

**Test**: Image should look "stretched" when viewed normally:
- Horizon should be a straight line in the middle
- Poles (top/bottom) should be very stretched

---

## Example Setup (Complete)

### 1. Download Arctic Scene

```bash
# Visit https://polyhaven.com/hdris
# Download "snowy_forest_path_01" as 2K JPG
# Save to Downloads folder
```

### 2. Add to Project

```bash
mkdir -p public/panoramas
mv ~/Downloads/snowy_forest_path_01_2k.jpg public/panoramas/arctic.jpg
```

### 3. Update Blog

`content/blogs/north-pole-travel.md`:
```yaml
---
id: north-pole-1
title: "Journey to the North Pole"
coords:
  lat: 89.5
  lng: 0
panorama360Image: "/panoramas/arctic.jpg"
# ... rest of frontmatter
---
```

### 4. Verify

```bash
# Check file exists
ls -lh public/panoramas/arctic.jpg

# Should show file size (e.g., 1.5M)
```

### 5. Test

```bash
npm run dev
# Open: http://localhost:3000/blogs/north-pole-travel
# Click: "Show 360° View"
```

---

## Creating Multiple Locations

### Directory Structure

```
public/panoramas/
├── north-pole-360.jpg
├── tokyo-shibuya-360.jpg
├── great-barrier-reef-360.jpg
└── grand-canyon-360.jpg
```

### Update Each Blog

**North Pole**:
```yaml
panorama360Image: "/panoramas/north-pole-360.jpg"
```

**Tokyo**:
```yaml
panorama360Image: "/panoramas/tokyo-shibuya-360.jpg"
```

**Reef**:
```yaml
panorama360Image: "/panoramas/great-barrier-reef-360.jpg"
```

---

## Performance Tips

### Optimize File Size

```bash
# Using ImageMagick
convert input.jpg -resize 2048x1024 -quality 80 output.jpg

# Should be < 1 MB for 2K images
```

### Progressive Loading

Future feature: Add low-res preview
```yaml
panorama360Image: "/panoramas/location-2k.jpg"
panorama360ImagePreview: "/panoramas/location-lowres.jpg"
```

---

## Next Steps

1. ✅ Get your first panorama working (this guide)
2. 📖 Read full guide: `docs/360_PANORAMA_GUIDE.md`
3. 🎨 Optimize images for web
4. 🌍 Create panoramas for all your blog posts!

---

**You're ready to create immersive experiences! 🎉**
