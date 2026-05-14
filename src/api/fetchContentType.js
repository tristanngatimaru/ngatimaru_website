import qs from "qs";

// --- In-memory cache (fast, within-session) ---
const memoryCache = new Map();
const pendingRequests = new Map();
const MEMORY_TTL = 30 * 60 * 1000; // 30 minutes

// --- localStorage cache (persists across refreshes) ---
const LS_PREFIX = "nm_v1_";
const LS_TTL = 24 * 60 * 60 * 1000; // 24 hours

function lsGet(key) {
  try {
    const raw = localStorage.getItem(LS_PREFIX + key);
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw);
    if (Date.now() - ts > LS_TTL) {
      localStorage.removeItem(LS_PREFIX + key);
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

function lsSet(key, data) {
  try {
    localStorage.setItem(
      LS_PREFIX + key,
      JSON.stringify({ data, ts: Date.now() }),
    );
  } catch {
    // localStorage full or unavailable — silent fail
  }
}

export function spreadStrapiData(data) {
  if (Array.isArray(data.data) && data.data.length > 0) {
    return data.data[0];
  }
  if (!Array.isArray(data.data)) {
    return data.data;
  }
  return null;
}

async function fetchFromNetwork(cacheKey, contentType, params, spreadData) {
  if (pendingRequests.has(cacheKey)) {
    return pendingRequests.get(cacheKey);
  }

  const promise = (async () => {
    const url = new URL(
      `api/${contentType}`,
      import.meta.env.VITE_STRAPI_API_URL,
    );
    const headers = { "Content-Type": "application/json" };
    if (import.meta.env.VITE_STRAPI_API_TOKEN) {
      headers.Authorization = `Bearer ${import.meta.env.VITE_STRAPI_API_TOKEN}`;
    }

    const response = await fetch(`${url.href}?${qs.stringify(params)}`, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch data from Strapi (url=${url.toString()}, status=${response.status})`,
      );
    }

    const jsonData = await response.json();
    const result = spreadData ? spreadStrapiData(jsonData) : jsonData;

    // Store in both caches
    memoryCache.set(cacheKey, { data: result, timestamp: Date.now() });
    lsSet(cacheKey, result);

    return result;
  })();

  pendingRequests.set(cacheKey, promise);
  try {
    return await promise;
  } finally {
    pendingRequests.delete(cacheKey);
  }
}

export default async function fetchContentType(
  contentType,
  params = {},
  spreadData = false,
) {
  const cacheKey = `${contentType}-${JSON.stringify(params)}-${spreadData}`;

  // 1. In-memory cache — fastest, valid within the current session
  const mem = memoryCache.get(cacheKey);
  if (mem && Date.now() - mem.timestamp < MEMORY_TTL) {
    return mem.data;
  }

  // 2. localStorage cache — instant on refresh/return visits
  //    Serve stale data immediately, then revalidate silently in the background.
  const lsCached = lsGet(cacheKey);
  if (lsCached) {
    memoryCache.set(cacheKey, { data: lsCached, timestamp: Date.now() });
    // Background revalidation — don't block the caller
    fetchFromNetwork(cacheKey, contentType, params, spreadData).catch(() => {});
    return lsCached;
  }

  // 3. No cache — fetch from network (first visit)
  try {
    return await fetchFromNetwork(cacheKey, contentType, params, spreadData);
  } catch (error) {
    pendingRequests.delete(cacheKey);
    throw error; // Re-throw to handle in components
  }
}
