import fetchContentType from "./fetchContentType.js";
import { transformPageData, PAGE_CONFIGS } from "./siteContent.js";

// Page-specific content cache
const pageCache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Load content for a specific page only (lazy loading)
 * @param {string} pageName - The name of the page to load content for
 * @returns {Promise<Object>} The page content
 */
export async function loadPageContent(pageName) {
  // Check cache first
  const cacheKey = pageName;
  const cached = pageCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  try {
    const config = PAGE_CONFIGS[pageName];
    if (!config) {
      return {};
    }

    // Fetch only this page's content
    const result = await fetchContentType(
      config.contentType,
      { populate: config.populate },
      true
    );

    // Transform the data
    const pageContent = transformPageData(pageName, result);

    // Cache the result
    pageCache.set(cacheKey, {
      data: pageContent,
      timestamp: Date.now(),
    });

    return pageContent;
  } catch {
    return {};
  }
}

/**
 * Load essential content for initial page load (home page + navigation)
 * @returns {Promise<Object>} Essential site content
 */
export async function loadEssentialContent() {
  try {
    // Load only home page and navigation content
    const essentialPages = ["home", "navigation"];
    const fetchPromises = essentialPages.map((pageName) =>
      loadPageContent(pageName)
    );

    const results = await Promise.allSettled(fetchPromises);

    const content = {};
    essentialPages.forEach((pageName, index) => {
      if (results[index].status === "fulfilled") {
        content[pageName] = results[index].value;
      } else {
        content[pageName] = {};
      }
    });

    return content;
  } catch {
    return {};
  }
}

/**
 * Preload content for a page (for navigation prefetching)
 * @param {string} pageName - Page to preload
 */
export function preloadPageContent(pageName) {
  // Don't await - just start loading in background
  loadPageContent(pageName).catch(() => {
    // Preload failed silently
  });
}

/**
 * Get cached content if available
 * @param {string} pageName - Page name
 * @returns {Object|null} Cached content or null
 */
export function getCachedContent(pageName) {
  const cached = pageCache.get(pageName);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  return null;
}

/**
 * Clear page cache (useful for forced refreshes)
 */
export function clearPageCache() {
  pageCache.clear();
}
