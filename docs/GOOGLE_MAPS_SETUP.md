# Google Maps API Setup Guide

## Overview

The immersive 3D blog uses **Google Maps JavaScript API** to display satellite imagery as a background overlay when viewing blog posts. This provides a real-world geographic context for each location.

## Why Google Maps Instead of Google Earth?

**Google Earth Web cannot be embedded** - it blocks iframe embedding with 403 errors.

**Google Maps works** and provides:
- ✅ Satellite imagery
- ✅ Street View 360° panoramas
- ✅ 3D buildings
- ✅ Full embedding support
- ✅ Free tier (28,000 map loads/month)

---

## Step-by-Step Setup

### 1. Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click **Select a project** → **New Project**
3. Enter project name: "Immersive 3D Blog" (or your choice)
4. Click **Create**

### 2. Enable Maps JavaScript API

1. In the Google Cloud Console, go to **APIs & Services** → **Library**
2. Search for "Maps JavaScript API"
3. Click on **Maps JavaScript API**
4. Click **Enable**

### 3. Create API Key

1. Go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **API key**
3. Your API key will be created and displayed
4. **Copy the API key** - you'll need it for your `.env.local` file

### 4. Secure Your API Key (Recommended)

1. Click **Edit API key** (pencil icon) for the key you just created
2. Under **API restrictions**:
   - Select "Restrict key"
   - Choose **Maps JavaScript API**
3. Under **Website restrictions**:
   - Select "HTTP referrers (web sites)"
   - Add your domain(s):
     ```
     localhost:3000/*
     yourdomain.com/*
     *.vercel.app/*
     ```
4. Click **Save**

### 5. Add to Environment Variables

Create `.env.local` in your project root:

```bash
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

Replace with your actual API key.

### 6. Restart Development Server

```bash
# Stop the dev server (Ctrl+C)
npm run dev
```

The Google Maps overlay feature will now work!

---

## Pricing & Limits

### Free Tier

Google provides a generous free tier:

- **$200 free credit per month**
- **Maps JavaScript API**: $7 per 1,000 loads
- **Free limit**: ~28,000 map loads per month

### What Counts as a Load?

- Each time the satellite map is toggled on = 1 load
- If a user toggles it off and on again = 2 loads
- Simply viewing a blog (without toggling the map) = 0 loads

### Monitoring Usage

1. Go to Google Cloud Console
2. Navigate to **APIs & Services** → **Dashboard**
3. View usage charts for Maps JavaScript API

### Setting Budget Alerts

1. Go to **Billing** → **Budgets & alerts**
2. Click **Create budget**
3. Set a threshold (e.g., $50/month)
4. Add email notifications

---

## Testing the Feature

1. Run your development server: `npm run dev`
2. Navigate to any blog post page
3. Click **"Show Satellite Map"** button (top right)
4. You should see satellite imagery overlay the 3D scene

### Expected Behavior

- Map loads with satellite view
- Location centered on blog coordinates
- 70% opacity for blending with 3D scene
- Can zoom, pan, and explore
- Street View available if location supports it
- Close button returns to 3D-only view

---

## Troubleshooting

### "API key not configured" Error

**Solution**: Add your API key to `.env.local`:
```bash
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_actual_key_here
```

### "Failed to load Google Maps" Error

**Causes**:
1. Invalid API key
2. Maps JavaScript API not enabled
3. API key restrictions blocking localhost

**Solution**:
- Verify API key is correct
- Check Maps JavaScript API is enabled in Console
- Ensure localhost:3000/* is allowed in API restrictions

### Map Not Showing

**Check**:
1. Browser console for errors
2. Network tab - is the Maps API loading?
3. API key starts with `AIza...`
4. `.env.local` file exists in project root

### "This page can't load Google Maps correctly"

**Causes**:
1. Exceeded free tier limit
2. Billing not enabled
3. API key restrictions too strict

**Solution**:
- Check usage in Cloud Console
- Enable billing (only charged after free tier)
- Loosen API restrictions temporarily to test

---

## Alternative: Mapbox (No API Key Required for Development)

If you don't want to use Google Maps, you can use **Mapbox** instead:

### Mapbox Benefits
- ✅ Free tier: 50,000 loads/month
- ✅ Better 3D terrain
- ✅ Custom styling
- ✅ More permissive free tier

### Quick Mapbox Setup

1. Sign up at [mapbox.com](https://www.mapbox.com/)
2. Get your access token
3. Use `mapbox-gl` library instead

Let me know if you want Mapbox integration instead!

---

## Feature Comparison

| Feature | Google Maps | Mapbox | Cesium.js |
|---------|-------------|--------|-----------|
| **Satellite Imagery** | ✅ Excellent | ✅ Good | ✅ Good |
| **Street View** | ✅ Yes | ❌ No | ❌ No |
| **Free Tier** | 28k/month | 50k/month | Unlimited |
| **3D Buildings** | ✅ Yes | ✅ Yes | ✅ Advanced |
| **Setup Difficulty** | Easy | Easy | Moderate |
| **API Key Required** | Yes | Yes | No |
| **Best For** | Familiar UX | Custom styling | 3D globe |

---

## Security Best Practices

### 1. Never Commit API Keys

Add to `.gitignore`:
```
.env.local
.env.production.local
```

### 2. Use Environment Variables

```typescript
const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
```

### 3. Restrict API Key

- Set HTTP referrer restrictions
- Limit to Maps JavaScript API only
- Monitor usage regularly

### 4. Rotate Keys Periodically

If a key is compromised:
1. Create new API key
2. Update `.env.local`
3. Delete old key from Console

---

## Need Help?

- [Google Maps JavaScript API Docs](https://developers.google.com/maps/documentation/javascript)
- [API Key Best Practices](https://developers.google.com/maps/api-security-best-practices)
- [Pricing Calculator](https://mapsplatform.google.com/pricing/)

---

**Your satellite map overlay feature is ready to use! 🗺️**
