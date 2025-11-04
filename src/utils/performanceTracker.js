/**
 * Performance debugging utilities
 */

// Track page load performance
export const trackPageLoad = () => {
  if (typeof window !== "undefined") {
    window.addEventListener("load", () => {
      // Get performance timing data
      const perfData = performance.getEntriesByType("navigation")[0];

      if (perfData) {
        // Performance tracking disabled for production
      }

      // Track largest contentful paint
      if ("PerformanceObserver" in window) {
        const observer = new PerformanceObserver(() => {
          // Performance tracking disabled for production
        });
        observer.observe({ entryTypes: ["largest-contentful-paint"] });
      }
    });
  }
};

// Track API performance
export const trackAPICall = async (apiName, apiCall) => {
  return await apiCall();
};

// Initialize performance tracking
export const initPerformanceTracking = () => {
  trackPageLoad();
  // Performance tracking disabled for production
};
