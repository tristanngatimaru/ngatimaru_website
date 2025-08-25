// Image type detection and smart fallback selection

/**
 * Analyze image URL/content to suggest appropriate fallback
 * @param {string} src - Image source URL
 * @param {string} alt - Alt text for context
 * @param {string} context - Component context (header, post, etc.)
 */
export const getSmartFallback = (src, alt = "", context = "") => {
  const lowerSrc = (src || "").toLowerCase();
  const lowerAlt = alt.toLowerCase();
  const lowerContext = context.toLowerCase();

  // Check for specific keywords in URL or alt text
  if (lowerSrc.includes("header") || lowerContext.includes("header")) {
    return "header";
  }

  if (
    lowerSrc.includes("mihi") ||
    lowerAlt.includes("mihi") ||
    lowerContext.includes("mihi")
  ) {
    return "mihi";
  }

  if (lowerSrc.includes("carving") || lowerAlt.includes("carving")) {
    return "carving";
  }

  if (lowerSrc.includes("beach") || lowerAlt.includes("beach")) {
    return "beach";
  }

  if (
    lowerSrc.includes("flower") ||
    lowerAlt.includes("flower") ||
    lowerAlt.includes("pohutukawa")
  ) {
    return "flowers";
  }

  if (lowerSrc.includes("korowai") || lowerAlt.includes("korowai")) {
    return "hero";
  }

  if (lowerContext.includes("about") || lowerAlt.includes("about")) {
    return "about";
  }

  if (lowerContext.includes("background")) {
    return "background";
  }

  // Default fallback
  return "default";
};

/**
 * Preload critical images for better performance
 */
export const preloadCriticalImages = async () => {
  const criticalImages = [
    // Add your most important local images here
    "../assets/images/headerimages/beachisland.png",
    "../assets/images/headerimages/mihiBackground.png",
    "../assets/images/headerimages/korowai.png",
  ];

  const preloadPromises = criticalImages.map((src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`Failed to preload ${src}`));
      img.src = src;
    });
  });

  try {
    await Promise.allSettled(preloadPromises);
  } catch {
    // Silently handle preload failures
  }
};
