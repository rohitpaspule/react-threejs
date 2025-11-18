# 360° Panorama Background Guide

## Overview

Instead of trying to embed Google Earth (which blocks iframes), you can use **360° panoramic images** as immersive backgrounds. This provides the best experience with no API keys, no 403 errors, and complete control.

## ✅ Benefits

- ✅ **No API keys required**
- ✅ **No embedding restrictions**
- ✅ **Works offline**
- ✅ **Better performance** (static images)
- ✅ **Full control** over the experience
- ✅ **Mouse/touch interactive** look-around
- ✅ **Free** (once you have the images)

---

## How to Get 360° Panoramas

### Method 1: Download from Google Street View (Free)

#### Using Street View Download Websites

Several free tools let you download Street View panoramas:

**1. StreetViewDownload.com** (Recommended)
- Go to: https://streetviewdownload.com/
- Enter coordinates or location
- Download equirectangular image (2048x1024 or 4096x2048)
- Free, no registration needed

**2. Street View Bulk Image Downloader**
- Chrome extension
- Batch download multiple locations
- High resolution options

#### Manual Method (Using Street View Directly)

1. Go to [Google Street View](https://www.google.com/maps/@0,0,3a,75y,90t/data=!3m4!1e1)
2. Navigate to your location
3. Right-click → "Save image as..."
4. Note: This gets lower resolution

### Method 2: Free 360° Image Libraries

#### **Flickr Equirectangular**
- Search: https://www.flickr.com/search/?text=equirectangular
- Filter by license: "Creative Commons" or "Public Domain"
- Download high-res images
- Credit the photographer

#### **Wikimedia Commons**
- Search: https://commons.wikimedia.org/
- Query: "360 panorama" or "equirectangular"
- All images are free to use
- Check specific license requirements

#### **Poly Haven (formerly HDRI Haven)**
- Website: https://polyhaven.com/hdris
- 100% free, no attribution required
- High-quality 360° HDRIs
- Great for nature scenes

### Method 3: Create Your Own

#### **Using Your Smartphone**

**Google Street View App** (Free)
1. Download "Street View" app (iOS/Android)
2. Tap camera icon
3. Choose "Camera" mode
4. Follow on-screen guide to capture 360°
5. Upload and download from Google Street View

**Cardboard Camera** (Free - iOS/Android)
- Simple 360° photo capture
- Export to equirectangular format

**Ricoh Theta App** (Requires Ricoh Theta camera)
- High-quality 360° photos
- Export as equirectangular JPG

#### **Using DSLR/Camera**

1. Take overlapping photos in a circle (minimum 8 photos)
2. Use stitching software:
   - **PTGui** (Paid, professional)
   - **Hugin** (Free, open-source)
   - **Adobe Photoshop** (Photomerge)
3. Export as equirectangular projection

---

## Image Requirements

### Format
- **Type**: Equirectangular projection (2:1 aspect ratio)
- **Extension**: `.jpg`, `.png`, `.webp`
- **Aspect Ratio**: 2:1 (e.g., 4096×2048, 2048×1024)

### Recommended Resolutions

| Quality | Resolution | File Size | Use Case |
|---------|-----------|-----------|----------|
| **Low** | 1024×512 | ~200 KB | Testing, mobile |
| **Medium** | 2048×1024 | ~800 KB | Standard quality |
| **High** | 4096×2048 | ~2-3 MB | Desktop, detail |
| **Ultra** | 8192×4096 | ~5-10 MB | Professional |

**Recommendation**: Start with **2048×1024** for best balance of quality and performance.

### Hosting

1. **Self-hosted** (in `/public/panoramas/`)
   ```
   /public/panoramas/north-pole-360.jpg
   ```

2. **CDN** (recommended for production)
   - Upload to Cloudflare Images, AWS S3, or DigitalOcean Spaces
   - Serve via CDN for fast loading
   - Example: `https://cdn.example.com/panoramas/location.jpg`

3. **Free Image Hosts**
   - Imgur (up to 20 MB)
   - ImgBB
   - Note: May have bandwidth limits

---

## Implementation

### 1. Add Image to Blog Frontmatter

```yaml
---
id: north-pole-1
title: "Journey to the North Pole"
coords:
  lat: 89.5
  lng: 0
panorama360Image: "/panoramas/north-pole-360.jpg"  # ← Add this line
# ... other fields
---
```

### 2. Place Image File

```bash
# Create panoramas directory
mkdir -p public/panoramas

# Add your image
mv downloaded-image.jpg public/panoramas/north-pole-360.jpg
```

### 3. Test

```bash
npm run dev
# Navigate to blog post
# Click "Show 360° View" button
# Move mouse to look around!
```

---

## Example: North Pole Setup

### Step 1: Get the Image

Using StreetViewDownload.com:
1. Go to https://streetviewdownload.com/
2. Enter coordinates: `89.5, 0`
3. Download 2048×1024 image
4. Save as `north-pole-360.jpg`

### Step 2: Add to Project

```bash
mv ~/Downloads/north-pole-360.jpg public/panoramas/
```

### Step 3: Update Frontmatter

```yaml
panorama360Image: "/panoramas/north-pole-360.jpg"
```

### Step 4: Enjoy!

The blog post now has an immersive 360° background view! 🎉

---

## Advanced Tips

### Optimize Images

#### Using ImageMagick
```bash
# Resize to 2048×1024
convert input.jpg -resize 2048x1024 output.jpg

# Compress
convert input.jpg -quality 80 output.jpg
```

#### Using Online Tools
- [TinyPNG](https://tinypng.com/) - Smart compression
- [Squoosh](https://squoosh.app/) - WebP conversion

### WebP Format

For better performance, convert to WebP:

```bash
# Using cwebp
cwebp -q 80 input.jpg -o output.webp

# Reduce file size by ~30% vs JPG
```

Update frontmatter:
```yaml
panorama360Image: "/panoramas/north-pole-360.webp"
```

### Progressive Loading

For large images, show low-res first:

```yaml
panorama360Image: "/panoramas/north-pole-360.jpg"
panorama360ImageLowRes: "/panoramas/north-pole-360-lowres.jpg"
```

---

## Finding Specific Locations

### Arctic/Polar Regions

**North Pole Area**
- Svalbard, Norway: `78.2232, 15.6267`
- Alert, Canada (northernmost): `82.5018, -62.3481`
- Barrow, Alaska: `71.2906, -156.7886`

**Antarctic** (Limited Street View)
- McMurdo Station: `-77.8419, 166.6863`
- Use Flickr/Wikimedia for Antarctic panoramas

### Famous Locations

**Nature**
- Grand Canyon: `36.1069, -112.1129`
- Yosemite: `37.8651, -119.5383`
- Machu Picchu: `-13.1631, -72.5450`

**Cities**
- Tokyo Shibuya: `35.6595, 139.7004`
- New York Times Square: `40.7580, -73.9855`
- Paris Eiffel Tower: `48.8584, 2.2945`

### Underwater

Use Flickr/Wikimedia:
- Search: "underwater 360 panorama"
- Search: "reef equirectangular"
- Or use Google's underwater Street View locations

---

## Legal Considerations

### Google Street View Images

**Can I download and use them?**
- Gray area - Google's ToS prohibit automated downloading
- Manual download for personal use: Generally tolerated
- **Safe approach**: Use Creative Commons images instead

### Best Practices

1. **Prefer Creative Commons** images from Flickr/Wikimedia
2. **Give attribution** when required
3. **Take your own** photos when possible
4. **Check licenses** before commercial use

### Recommended Sources (No Legal Issues)

- ✅ **Poly Haven** - Public domain, 100% free
- ✅ **Wikimedia Commons** - Free licenses
- ✅ **Your own photos** - Full rights
- ✅ **Flickr CC0** - Public domain

---

## Troubleshooting

### Image Not Showing

**Check**:
1. Image path is correct: `/panoramas/image.jpg`
2. File exists in `public/panoramas/`
3. Image is equirectangular (2:1 ratio)
4. Browser console for errors

### Image Distorted

**Issue**: Wrong projection type
**Solution**: Ensure image is equirectangular, not fisheye or cubemap

### Performance Issues

**Large file size?**
1. Resize to 2048×1024 max
2. Compress with TinyPNG
3. Convert to WebP
4. Use CDN for hosting

### Image Too Dark/Bright

**Solution**: Adjust in frontmatter (future feature) or edit image:
```bash
# Brighten with ImageMagick
convert input.jpg -brightness-contrast 10x0 output.jpg
```

---

## Future Enhancements

Potential improvements to the 360° viewer:

- [ ] Brightness/contrast controls
- [ ] Hotspots (clickable areas)
- [ ] VR mode (WebXR)
- [ ] Gyroscope support (mobile)
- [ ] Multiple panoramas per blog
- [ ] Smooth transitions between panoramas
- [ ] Audio spatialization (sound from directions)

---

## Resources

### Tools
- [StreetViewDownload.com](https://streetviewdownload.com/) - Download Street View
- [Poly Haven](https://polyhaven.com/hdris) - Free 360° HDRIs
- [Hugin](http://hugin.sourceforge.net/) - Free panorama stitcher
- [TinyPNG](https://tinypng.com/) - Image compression

### Learning
- [What is Equirectangular Projection?](https://en.wikipedia.org/wiki/Equirectangular_projection)
- [Creating 360° Photos](https://support.google.com/maps/answer/7012050)
- [Three.js Panorama Tutorial](https://threejs.org/examples/#webgl_panorama_equirectangular)

---

**Happy 360° blogging! 📷🌍**
