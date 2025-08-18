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
    // Force pre-bundling of these modules for faster dev startup
    force: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor libraries - be more specific to avoid conflicts
          if (id.includes("node_modules")) {
            // Keep React ecosystem together - smaller chunk
            if (id.includes("react") && !id.includes("react-router")) {
              return "vendor-react";
            }
            if (id.includes("react-router")) {
              return "vendor-router";
            }

            // UI libraries - smaller chunk
            if (
              id.includes("@radix-ui") ||
              id.includes("class-variance-authority") ||
              id.includes("clsx") ||
              id.includes("tailwind-merge") ||
              id.includes("lucide-react")
            ) {
              return "vendor-ui";
            }

            // API libraries - very small chunk
            if (id.includes("axios") || id.includes("qs")) {
              return "vendor-api";
            }

            // Animation libraries - separate chunk
            if (id.includes("embla-carousel")) {
              return "vendor-carousel";
            }

            // Let Rollup handle other smaller dependencies automatically
            return undefined;
          }

          // Large form components - separate chunks for lazy loading
          if (
            id.includes("RegistrationForm.jsx") ||
            id.includes("bookingmataiwhetudraft.jsx") ||
            id.includes("useMataiWhetuForm.js")
          ) {
            return "forms";
          }

          // API modules - critical for performance
          if (id.includes("/api/")) {
            return "api";
          }

          // Page components - lazy loaded
          if (id.includes("/pages/")) {
            return "pages";
          }

          // Form sections - lazy loaded
          if (id.includes("formSections/")) {
            return "form-sections";
          }
        },
      },
    },

    // Adjust chunk size warning limit for better performance
    chunkSizeWarningLimit: 500, // Smaller chunks for better caching

    // Enable aggressive minification
    minify: "esbuild",
    target: "es2015",

    // Disable source maps in production for smaller bundles
    sourcemap: false,

    // Enable CSS code splitting for better performance
    cssCodeSplit: true,

    // Enable tree-shaking
    assetsInlineLimit: 4096, // Inline small assets
  },

  // Performance optimizations
  server: {
    warmup: {
      // Pre-warm frequently used files
      clientFiles: [
        "./src/main.jsx",
        "./src/App.jsx",
        "./src/pages/home.jsx",
        "./src/api/lazyContentLoader.js",
      ],
    },
  },
});
