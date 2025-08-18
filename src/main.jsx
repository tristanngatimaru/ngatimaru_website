import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Performance monitoring
const appStartTime = performance.now();
console.log("🚀 App initialization started...");

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
