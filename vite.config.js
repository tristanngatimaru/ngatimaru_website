import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";

// get __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom", "axios", "qs"],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor libraries - be more specific to avoid conflicts
          if (id.includes("node_modules")) {
            // Keep React ecosystem together
            if (id.includes("react") && !id.includes("react-router")) {
              return "vendor-react";
            }
            if (id.includes("react-router")) {
              return "vendor-router";
            }

            // UI libraries
            if (
              id.includes("@radix-ui") ||
              id.includes("class-variance-authority") ||
              id.includes("clsx") ||
              id.includes("tailwind-merge") ||
              id.includes("lucide-react")
            ) {
              return "vendor-ui";
            }

            // API libraries
            if (id.includes("axios") || id.includes("qs")) {
              return "vendor-api";
            }

            // Animation libraries
            if (id.includes("embla-carousel")) {
              return "vendor-carousel";
            }

            // Let Rollup handle other smaller dependencies automatically
            // This prevents chunking conflicts
            return undefined;
          }

          // Large form components
          if (
            id.includes("RegistrationForm.jsx") ||
            id.includes("bookingmataiwhetudraft.jsx") ||
            id.includes("useMataiWhetuForm.js")
          ) {
            return "forms";
          }

          // API modules
          if (id.includes("/api/")) {
            return "api";
          }

          // Page components
          if (id.includes("/pages/")) {
            return "pages";
          }

          // Form sections
          if (id.includes("formSections/")) {
            return "form-sections";
          }
        },
      },
    },

    // Adjust chunk size warning limit
    chunkSizeWarningLimit: 1000,

    // Enable minification and tree-shaking
    minify: "esbuild",
    target: "es2015",

    // Enable source maps for better debugging in development only
    sourcemap: false,

    // Optimize CSS
    cssCodeSplit: true,
  },
});
