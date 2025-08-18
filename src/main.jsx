import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { initPerformanceTracking } from "./utils/performanceTracker.js";

// Performance monitoring
const appStartTime = performance.now();
console.log("🚀 App initialization started...");

// Initialize performance tracking
initPerformanceTracking();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Log total initialization time
window.addEventListener("load", () => {
  const totalTime = performance.now() - appStartTime;
  console.log(`✅ App fully loaded (${totalTime.toFixed(2)}ms)`);
});
