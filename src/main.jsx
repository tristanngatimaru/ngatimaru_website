import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { initPerformanceTracking } from "./utils/performanceTracker.js";
import { preloadCriticalImages } from "./utils/imageUtils.js";
import { cachedFetch } from "./utils/lazyLoader.js";
import { getHomeContent } from "./api/siteContent.js";
import { getNavigationData } from "./api/navigation.js";

// Performance monitoring disabled for production

// Initialize performance tracking
initPerformanceTracking();

// Preload critical images in background
preloadCriticalImages();

// *** Start API fetches immediately — before React initialises ***
// Results land in cache so Home/Navbar get them instantly on mount.
cachedFetch("home-content", () => getHomeContent(), 10 * 60 * 1000);
getNavigationData();

// Get root element and start rendering immediately
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

// Render immediately - no delays
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// Performance tracking disabled for production
