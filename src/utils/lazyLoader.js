// Lazy loading utilities for better performance

/**
 * Preload a module without executing it
 * @param {() => Promise} importFunction - Dynamic import function
 * @param {string} name - Module name for logging
 */
export const preloadModule = (importFunction) => {
  return importFunction()
    .then((module) => {
      return module;
    })
    .catch(() => {
      // Silently handle preload failures
    });
};

/**
 * Lazy load an image with loading state
 * @param {string} src - Image source
 * @param {Function} onLoad - Callback when image loads
 * @param {Function} onError - Callback when image fails
 */
export const lazyLoadImage = (src, onLoad, onError) => {
  const img = new Image();
  img.onload = () => onLoad?.(img);
  img.onerror = () => onError?.(img);
  img.src = src;
  return img;
};

/**
 * Debounced function to prevent excessive API calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Cache for API responses to avoid repeated calls
 */
const cache = new Map();

/**
 * Cached fetch with expiration
 * @param {string} key - Cache key
 * @param {Function} fetchFunction - Function that returns a promise
 * @param {number} ttl - Time to live in milliseconds (default: 5 minutes)
 */
export const cachedFetch = async (key, fetchFunction, ttl = 5 * 60 * 1000) => {
  const now = Date.now();
  const cached = cache.get(key);

  if (cached && now - cached.timestamp < ttl) {
    return cached.data;
  }

  try {
    const data = await fetchFunction();
    cache.set(key, { data, timestamp: now });
    return data;
  } catch (error) {
    // Return cached data if available, even if expired
    if (cached) {
      return cached.data;
    }
    throw error;
  }
};

/**
 * Intersection Observer for lazy loading components
 * @param {Function} callback - Callback when element is visible
 * @param {Object} options - Intersection observer options
 */
export const createLazyObserver = (callback, options = {}) => {
  const defaultOptions = {
    threshold: 0.1,
    rootMargin: "50px",
    ...options,
  };

  return new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback(entry);
      }
    });
  }, defaultOptions);
};

/**
 * Progressive loading for heavy content
 * @param {Array} items - Items to load progressively
 * @param {Function} loadFunction - Function to load each item
 * @param {number} batchSize - Number of items to load at once
 * @param {number} delay - Delay between batches
 */
export const progressiveLoad = async (
  items,
  loadFunction,
  batchSize = 3,
  delay = 100
) => {
  const results = [];

  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const batchPromises = batch.map(loadFunction);

    try {
      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults);

      // Add delay between batches to avoid overwhelming the browser
      if (i + batchSize < items.length) {
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    } catch {
      // Silently handle batch errors
    }
  }

  return results;
};
