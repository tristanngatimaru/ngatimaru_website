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
        console.log("📊 Page Performance Metrics:");
        console.log(
          `- DNS Lookup: ${(perfData.domainLookupEnd - perfData.domainLookupStart).toFixed(2)}ms`
        );
        console.log(
          `- Server Response: ${(perfData.responseEnd - perfData.requestStart).toFixed(2)}ms`
        );
        console.log(
          `- DOM Content Loaded: ${(perfData.domContentLoadedEventEnd - perfData.navigationStart).toFixed(2)}ms`
        );
        console.log(
          `- Full Page Load: ${(perfData.loadEventEnd - perfData.navigationStart).toFixed(2)}ms`
        );
        console.log(
          `- First Paint: ${
            performance
              .getEntriesByType("paint")
              .find((entry) => entry.name === "first-paint")
              ?.startTime?.toFixed(2) || "N/A"
          }ms`
        );
      }

      // Track largest contentful paint
      if ("PerformanceObserver" in window) {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          console.log(
            `🎨 Largest Contentful Paint: ${lastEntry.startTime.toFixed(2)}ms`
          );
        });
        observer.observe({ entryTypes: ["largest-contentful-paint"] });
      }
    });
  }
};

// Track API performance
export const trackAPICall = async (apiName, apiCall) => {
  const startTime = performance.now();
  console.log(`🚀 API Call Started: ${apiName}`);

  try {
    const result = await apiCall();
    const endTime = performance.now();
    console.log(
      `✅ API Call Completed: ${apiName} (${(endTime - startTime).toFixed(2)}ms)`
    );
    return result;
  } catch (error) {
    const endTime = performance.now();
    console.error(
      `❌ API Call Failed: ${apiName} (${(endTime - startTime).toFixed(2)}ms)`,
      error
    );
    throw error;
  }
};

// Initialize performance tracking
export const initPerformanceTracking = () => {
  console.log("🔍 Performance tracking initialized");
  trackPageLoad();
};
