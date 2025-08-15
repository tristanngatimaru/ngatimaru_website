import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import TestApp from "./TestApp.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

// Safety check for global variables that might cause initialization errors
if (typeof window !== 'undefined') {
  // Prevent common variable initialization errors
  window.ga = window.ga || function() {};
  
  // Add debugging
  console.log('Starting app initialization...');
  
  // Catch any global errors
  window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
  });
  
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
  });
}

try {
  const root = createRoot(document.getElementById("root"));
  console.log('Root created, rendering app...');
  
  // Temporarily use TestApp to verify basic functionality
  // Switch back to <App /> once we confirm it's loading
  root.render(
    <ErrorBoundary>
      <StrictMode>
        <TestApp />
      </StrictMode>
    </ErrorBoundary>
  );
  
  console.log('App rendered successfully');
} catch (error) {
  console.error('Failed to initialize app:', error);
  
  // Fallback rendering
  document.getElementById("root").innerHTML = `
    <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; font-family: sans-serif;">
      <div style="text-align: center; padding: 2rem;">
        <h1 style="color: #dc2626; margin-bottom: 1rem;">Application Error</h1>
        <p style="color: #6b7280; margin-bottom: 1rem;">Failed to load the application.</p>
        <p style="color: #6b7280; font-size: 0.875rem;">Check the browser console for details.</p>
        <button onclick="window.location.reload()" style="background: #059669; color: white; padding: 0.5rem 1rem; border: none; border-radius: 0.375rem; margin-top: 1rem; cursor: pointer;">
          Reload Page
        </button>
      </div>
    </div>
  `;
}
