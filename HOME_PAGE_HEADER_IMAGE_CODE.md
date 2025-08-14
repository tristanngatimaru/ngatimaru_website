# HOME PAGE HEADER IMAGE - Complete Code Chain

## 1. PAGE_CONFIGS - Home Configuration (siteContent.js lines ~44-57)

```javascript
home: {
  contentType: "home",
  populate: {
    HeaderSection: {
      populate: {
        BackgroundHeaderImage: true,
      },
    },
    MihiSection: {
      populate: {
        Image: true,
      },
    },
    Button: true,
  },
  // ... defaultContent
}
```

## 2. fetchContentType Call (siteContent.js lines ~420-427)

```javascript
const fetchPromises = pageNames.map((pageName) => {
  const config = PAGE_CONFIGS[pageName];
  return fetchContentType(
    config.contentType, // "home"
    { populate: config.populate }, // HeaderSection: { populate: { BackgroundHeaderImage: true } }
    true
  );
});
```

## 3. transformHomeData Function (siteContent.js lines ~208-302)

```javascript
function transformHomeData(homeContent, defaultContent) {
  console.log("📥 Raw home data:", JSON.stringify(homeContent, null, 2));

  // Extract data from potentially nested Strapi response
  const extractField = (section, field) => {
    return (
      section?.[field] ||
      section?.attributes?.[field] ||
      section?.data?.attributes?.[field]
    );
  };

  // Transform the home data
  const transformedHome = {
    HeaderSection: {
      TeReoTitle:
        extractField(homeContent.HeaderSection, "TeReoTitle") ||
        defaultContent.HeaderSection.TeReoTitle,
      EnglishTitle:
        extractField(homeContent.HeaderSection, "EnglishTitle") ||
        defaultContent.HeaderSection.EnglishTitle,
      BackgroundHeaderImage: transformImage(
        homeContent.HeaderSection?.BackgroundHeaderImage ||
          homeContent.HeaderSection?.data?.BackgroundHeaderImage
      ),
    },
    // ... rest of sections
  };

  console.log(
    "✅ Transformed home data:",
    JSON.stringify(transformedHome, null, 2)
  );
  return transformedHome;
}
```

## 4. transformImage Function (siteContent.js lines ~8-37)

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

## 5. strapiImage Function (strapiImage.js)

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

## 6. Home Page Component Usage (home.jsx lines ~103-113)

```javascript
{
  content.HeaderSection?.BackgroundHeaderImage?.url ? (
    <img
      src={content.HeaderSection.BackgroundHeaderImage.url}
      alt={
        content.HeaderSection.BackgroundHeaderImage.alternativeText ||
        "Background header image"
      }
      className="w-full h-[800px] object-center object-cover overflow-hidden"
    />
  ) : (
    <div className="w-full h-[800px] bg-gray-200" />
  );
}
```

## 7. Data Flow Summary:

1. `PAGE_CONFIGS.home.populate` → Tells Strapi to include `HeaderSection.BackgroundHeaderImage`
2. `fetchContentType()` → Makes API call with populate params
3. `transformHomeData()` → Extracts `homeContent.HeaderSection.BackgroundHeaderImage`
4. `transformImage()` → Processes image object, extracts URL
5. `strapiImage()` → Converts relative URL to full URL
6. `home.jsx` → Displays `content.HeaderSection.BackgroundHeaderImage.url`

## 8. Working Strapi Response Structure (Expected):

```json
{
  "HeaderSection": {
    "BackgroundHeaderImage": {
      "url": "/uploads/image.jpg",
      "alternativeText": "Header image",
      "formats": {...}
    }
  }
}
```
