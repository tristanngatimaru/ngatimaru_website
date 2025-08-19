import qs from "qs";

// Simple in-memory cache for API responses
const cache = new Map();
const pendingRequests = new Map(); // Prevent duplicate requests
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes (was 5 minutes)

/**
 * Fetches data for a specified Strapi content type.
 *
 * @param {string} contentType - The type of content to fetch from Strapi.
 * @param {Object} params - Query parameters to append to the API request.
 * @return {Promise<object>} The fetched data.
 */

export function spreadStrapiData(data) {
  if (Array.isArray(data.data) && data.data.length > 0) {
    return data.data[0];
  }
  if (!Array.isArray(data.data)) {
    return data.data;
  }
  return null;
}

export default async function fetchContentType(
  contentType,
  params = {},
  spreadData = false
) {
  // Create cache key from contentType and params
  const cacheKey = `${contentType}-${JSON.stringify(params)}-${spreadData}`;

  // Check cache first
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  // Check if same request is already pending (deduplication)
  if (pendingRequests.has(cacheKey)) {
    return pendingRequests.get(cacheKey);
  }

  try {
    const queryParams = { ...params };

    // Store the promise to prevent duplicate requests
    const requestPromise = (async () => {
      // Construct the full URL for the API request
      const url = new URL(
        `api/${contentType}`,
        import.meta.env.VITE_STRAPI_API_URL
      );

      // Add authorization header if token exists
      const headers = {
        "Content-Type": "application/json",
      };

      if (import.meta.env.VITE_STRAPI_API_TOKEN) {
        headers.Authorization = `Bearer ${import.meta.env.VITE_STRAPI_API_TOKEN}`;
      }

      // Perform the fetch request with the provided query parameters
      const response = await fetch(`${url.href}?${qs.stringify(queryParams)}`, {
        method: "GET",
        headers,
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch data from Strapi (url=${url.toString()}, status=${response.status})`
        );
      }

      const jsonData = await response.json();
      const result = spreadData ? spreadStrapiData(jsonData) : jsonData;

      // Cache the result
      cache.set(cacheKey, {
        data: result,
        timestamp: Date.now(),
      });

      return result;
    })();

    // Store the promise
    pendingRequests.set(cacheKey, requestPromise);
    
    const result = await requestPromise;
    
    // Clean up pending request
    pendingRequests.delete(cacheKey);
    
    return result;
  } catch (error) {
    // Clean up pending request on error
    pendingRequests.delete(cacheKey);
    console.error("FetchContentTypeError:", error);
    throw error; // Re-throw to handle in components
  }
}
