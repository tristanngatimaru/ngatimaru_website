import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { initPerformanceTracking } from "./utils/performanceTracker.js";
import { preloadCriticalImages } from "./utils/imageUtils.js";

// Performance monitoring disabled for production

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

// Performance tracking disabled for production
