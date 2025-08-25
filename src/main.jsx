import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { initPerformanceTracking } from "./utils/performanceTracker.js";
import { preloadCriticalImages } from "./utils/imageUtils.js";

// Performance monitoring
const appStartTime = performance.now();

// Initialize performance tracking
initPerformanceTracking();

// Preload critical images in background
preloadCriticalImages();

// Get root element and start rendering immediately
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

// Render immediately - no delays
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Log performance metrics when fully ready
window.addEventListener("load", () => {
  const totalTime = performance.now() - appStartTime;

  // Log performance insights only if significantly slow
  if (totalTime > 5000) {
    console.warn(
      "Consider optimizing: image sizes, API response times, or bundle size"
    );
  }
});
