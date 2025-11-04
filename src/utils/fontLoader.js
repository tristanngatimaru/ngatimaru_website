/**
 * Lazy font loader to reduce initial page load time
 */
export const loadLazyFonts = () => {
  // Create a link element for lazy fonts
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "/src/assets/fonts/lazy-fonts.css";
  link.media = "print"; // Load as non-blocking
  link.onload = function () {
    // Make it apply to screen once loaded
    this.media = "all";
  };

  // Fallback for browsers that don't support onload
  setTimeout(() => {
    link.media = "all";
  }, 100);

  document.head.appendChild(link);
};

/**
 * Preload critical fonts to reduce font flash
 */
export const preloadCriticalFonts = () => {
  const fonts = [
    "/src/assets/fonts/Roboto-Regular.ttf",
    "/src/assets/fonts/Roboto-Medium.ttf",
  ];

  fonts.forEach((fontUrl) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "font";
    link.type = "font/ttf";
    link.crossOrigin = "anonymous";
    link.href = fontUrl;
    document.head.appendChild(link);
  });
};

/**
 * Initialize font loading strategy
 */
export const initializeFontLoading = () => {
  // Preload critical fonts immediately
  preloadCriticalFonts();

  // Load additional fonts after page load
  if (document.readyState === "complete") {
    loadLazyFonts();
  } else {
    window.addEventListener("load", loadLazyFonts);
  }
};
