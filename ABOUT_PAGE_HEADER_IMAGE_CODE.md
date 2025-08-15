# ABOUT PAGE HEADER IMAGE - Complete Code Chain

## 1. PAGE_CONFIGS - About Configuration (siteContent.js lines ~87-89)

```javascript
about: {
  contentType: "about",
  populate: "*",
  // ... defaultContent
}
```

## 2. fetchContentType Call (siteContent.js lines ~420-427)

```javascript
const fetchPromises = pageNames.map((pageName) => {
  const config = PAGE_CONFIGS[pageName];
  return fetchContentType(
    config.contentType, // "about"
    { populate: config.populate }, // "*" (populate everything)
    true
  );
});
```

## 3. transformAboutData Function (siteContent.js lines ~304-340)

```javascript
function transformAboutData(aboutContent, defaultContent) {
  console.log("📥 Raw about data:", JSON.stringify(aboutContent, null, 2));

  const transformed = {
    Header: {
      TeReoTitle:
        aboutContent.Header?.TeReoTitle || defaultContent.Header?.TeReoTitle,
      EnglishTitle:
        aboutContent.Header?.EnglishTitle ||
        defaultContent.Header?.EnglishTitle,
      BackgroundHeaderImage: transformImage(
        aboutContent.Header?.BackgroundHeaderImage
      ),
    },
    FaceCard: Array.isArray(aboutContent.FaceCard)
      ? aboutContent.FaceCard.map((member) => ({
          id: member.id,
          Name: member.Name,
          Detail: member.Detail,
          Image: transformImage(member.Image),
        }))
      : [],
    ContentHeader: aboutContent.ContentHeader || defaultContent.ContentHeader,
    Content: aboutContent.Content || defaultContent.Content,
    TrusteesTitle: aboutContent.TrusteesTitle || defaultContent.TrusteesTitle,
    TrusteesList: aboutContent.TrusteesList || defaultContent.TrusteesList,
    SidePanelImageOne: transformImage(aboutContent.SidePanelImageOne),
    SidePanelImageTwo: transformImage(aboutContent.SidePanelImageTwo),
  };

  console.log(
    "✅ Transformed about data:",
    JSON.stringify(transformed, null, 2)
  );
  return transformed;
}
```

## 4. transformImage Function (Same as Home - siteContent.js lines ~8-37)

```javascript
function transformImage(imageData) {
  console.log(
    "🎨 Transforming image data:",
    JSON.stringify(imageData, null, 2)
  );

  if (!imageData) {
    console.log("⚠️ No image data provided");
    return null;
  }

  // Handle both nested and direct data structures
  const data = imageData.data?.attributes || imageData;

  if (!data.url) {
    console.log("⚠️ No URL found in image data");
    return null;
  }

  console.log("🔗 Extracted image URL:", data.url);
  console.log("📝 Extracted alt text:", data.alternativeText);
  console.log("📐 Available formats:", Object.keys(data.formats || {}));

  return {
    url: strapiImage(data.url),
    alternativeText: data.alternativeText || data.name,
    formats: data.formats,
  };
}
```

## 5. strapiImage Function (Same as Home - strapiImage.js)

```javascript
export function strapiImage(url) {
  if (!url) return null;

  // If already a full URL, return as is
  if (url.startsWith("http")) return url;

  // Otherwise prepend Strapi base URL
  const baseUrl =
    import.meta.env.VITE_STRAPI_API_URL?.replace("/api", "") ||
    "http://localhost:1337";
  return `${baseUrl}${url}`;
}
```

## 6. About Page Component Usage (about.jsx lines ~53-59)

```javascript
<HeroHeader
  image={content.Header?.BackgroundHeaderImage?.url || "Images.CarvingUpClose"}
  title={content.Header?.TeReoTitle || "Ko Wai not live"}
  subtitle={content.Header?.EnglishTitle || "About Us"}
/>
```

## 7. Data Flow Summary:

1. `PAGE_CONFIGS.about.populate` → "\*" (tells Strapi to include everything)
2. `fetchContentType()` → Makes API call with populate: "\*"
3. `transformAboutData()` → Tries to extract `aboutContent.Header.BackgroundHeaderImage`
4. `transformImage()` → Receives `undefined` because BackgroundHeaderImage doesn't exist
5. Returns `null` because no image data provided
6. `about.jsx` → Gets `null` for `content.Header.BackgroundHeaderImage.url`, shows fallback

## 8. PROBLEM: Current Strapi Response Structure:

```json
{
  "Header": {
    "id": 23,
    "TeReoTitle": "KO WAI MĀTAU",
    "EnglishTitle": "ABOUT US"
    // ❌ MISSING: "BackgroundHeaderImage": {...}
  }
}
```

## 9. EXPECTED Strapi Response Structure:

```json
{
  "Header": {
    "id": 23,
    "TeReoTitle": "KO WAI MĀTAU",
    "EnglishTitle": "ABOUT US",
    "BackgroundHeaderImage": {    // ❌ THIS IS MISSING IN YOUR DATA
      "url": "/uploads/carvingcloseup.png",
      "alternativeText": "Carving closeup",
      "formats": {...}
    }
  }
}
```

## 10. THE EXACT ISSUE:

- **Home page**: Gets `homeContent.HeaderSection.BackgroundHeaderImage` (exists in Strapi data)
- **About page**: Tries to get `aboutContent.Header.BackgroundHeaderImage` (DOES NOT EXIST in your Strapi data)
- **transformImage()** receives `undefined` and returns `null`
- **about.jsx** gets `null` and shows fallback string
