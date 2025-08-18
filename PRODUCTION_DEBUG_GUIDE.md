# 🚨 Production Build Blank Screen Troubleshooting Guide

## Quick Diagnosis Steps

### 1. **Open Browser Developer Tools**

1. Right-click on the blank page and select "Inspect" or press F12
2. Go to the **Console** tab
3. Look for any red error messages

### 2. **Check Network Tab**

1. In Developer Tools, go to the **Network** tab
2. Refresh the page
3. Look for any failed requests (red entries)
4. Pay special attention to:
   - The main JavaScript file (index-xxxxx.js)
   - CSS files
   - API calls to Strapi

### 3. **Use the Debug Helper**

Open this file in your browser: `debug.html` (located in your project root)
This will automatically test your API connection and show detailed error information.

## Most Common Issues & Solutions

### 🔥 **Issue 1: Environment Variables Not Loading**

**Symptoms:** Console shows "VITE_STRAPI_API_URL environment variable is not set"

**Solution:**

```bash
# Check if .env file exists
ls -la .env

# Rebuild with environment variables
npm run build
```

**Verification:** The console should show:

```
🏗️ Environment: PRODUCTION
🔧 Production Environment Variables:
- VITE_STRAPI_API_URL: ✅ Set
- VITE_STRAPI_API_TOKEN: ✅ Set
```

### 🌐 **Issue 2: API Connection Failing**

**Symptoms:** Console shows API errors like "Failed to fetch" or CORS errors

**Solutions:**

1. **Check Strapi Server Status:**

   - Visit: https://colorful-animal-7c45d1cc5a.strapiapp.com/admin
   - Make sure the server is running

2. **CORS Configuration:**

   - Your Strapi server needs to allow your production domain
   - Check Strapi's CORS settings

3. **API Token Issues:**
   - Verify the token is still valid in Strapi admin

### 🎨 **Issue 3: CSS/Font Loading Issues**

**Symptoms:** Page loads but looks unstyled or fonts are missing

**Solution:**
Check if these files load correctly in Network tab:

- `index-xxxxx.css`
- Font files (Roboto-\*.ttf)

### 📦 **Issue 4: JavaScript Bundle Issues**

**Symptoms:** Console shows "Uncaught SyntaxError" or module loading errors

**Solution:**

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### 🔄 **Issue 5: Caching Problems**

**Symptoms:** Old version of site shows or mixed content

**Solution:**

```bash
# Hard refresh in browser
Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)

# Or clear browser cache manually
```

## Debug Console Commands

Open browser console and run these commands:

```javascript
// Check if main app loaded
document.getElementById("root").innerHTML;

// Check React is available
typeof React;

// Test API directly
fetch("https://colorful-animal-7c45d1cc5a.strapiapp.com/api/home", {
  headers: {
    Authorization:
      "Bearer a58f6decb132ca208709cefa62c594ab247284715424efc3f032bbd6fb654b5e633897ace5d63436e1870722457cf142b70a1479c4c90e72dba299962b7839110c6379aecb254fd120053b083687ea9fcf50d4008e0f6b1b825d0d735cdb35fd2be35114e1345e8331f902aa42544de62af7f08d8db2ef057e3df1181124b366",
  },
})
  .then((r) => r.json())
  .then(console.log);

// Check environment
console.log("Environment:", import.meta?.env?.MODE);
```

## What the Console Logs Should Show

### ✅ **Successful Load Sequence:**

```
🚀 main.jsx starting...
🏗️ Environment: PRODUCTION
🔧 Production Environment Variables:
- VITE_STRAPI_API_URL: ✅ Set
- VITE_STRAPI_API_TOKEN: ✅ Set
✅ React core imported successfully (5ms)
✅ CSS imported (15ms)
✅ App component imported (8ms)
📦 App.jsx: Starting component imports...
🏗️ App component rendering...
🏠 Home component: Starting initialization...
📄 SiteContent: Loading content for home page only...
🔗 API: Starting fetch for home...
🔗 API: Constructed URL: https://colorful-animal-7c45d1cc5a.strapiapp.com/api/home
🔗 API: Network request completed (250ms)
✅ API: home fetch completed (280ms)
✅ SiteContent: home content loaded successfully (285ms)
🏠 Home: Content received: Success
```

### ❌ **Failed Load Indicators:**

```
❌ API: VITE_STRAPI_API_URL environment variable is not set
❌ API: Network error - check internet connection and CORS settings
💥 Global Error: TypeError: Cannot read properties of undefined
❌ API: FetchContentTypeError for home (5000ms): Failed to fetch
```

## Advanced Debugging

### Check Build Output

```bash
# Analyze bundle size
npm run build
ls -la dist/assets/

# Check if all assets are generated
ls dist/assets/ | grep -E "(css|js)$"
```

### Test Production Build Locally

```bash
# Build and preview
npm run build
npm run preview

# Then open http://localhost:4173/
```

### Verify Asset Paths

In browser, check if these URLs work:

- http://localhost:4173/assets/index-xxxxx.js
- http://localhost:4173/assets/index-xxxxx.css

## Quick Fixes to Try

1. **Rebuild from scratch:**

   ```bash
   npm run build
   npm run preview
   ```

2. **Clear all caches:**

   - Browser cache (Ctrl+Shift+Delete)
   - Node modules: `rm -rf node_modules && npm install`

3. **Test with debug.html:**

   - Open `debug.html` in your browser
   - Run the API connectivity test

4. **Check Strapi server:**
   - Visit the admin panel
   - Verify API endpoints are accessible

## Need More Help?

If you're still seeing a blank screen:

1. **Copy all console output** from the browser's Developer Tools
2. **Share the exact error messages** you see
3. **Test the debug.html file** and share those results
4. **Check if the preview works locally** with `npm run preview`

The enhanced logging I've added should give you much more specific information about what's failing!
