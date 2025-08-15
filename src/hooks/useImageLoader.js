import { useState, useEffect } from "react";

/**
 * Custom hook to track image loading status
 * @param {string[]} imageUrls - Array of image URLs to track
 * @param {Object} options - Configuration options
 * @returns {Object} Loading state and helper functions
 */
export function useImageLoader(imageUrls = [], options = {}) {
  const {
    timeout = 10000, // 10 second timeout
    skipOnSlowConnection = true,
  } = options;

  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    // Filter out null/undefined URLs
    const validUrls = imageUrls.filter((url) => url && typeof url === "string");

    if (validUrls.length === 0) {
      setImagesLoaded(true);
      return;
    }

    setTotalCount(validUrls.length);
    setLoadedCount(0);
    setImagesLoaded(false);
    setTimedOut(false);

    // Check for slow connection
    if (skipOnSlowConnection && navigator.connection) {
      const connection = navigator.connection;
      if (
        connection.effectiveType === "slow-2g" ||
        connection.effectiveType === "2g"
      ) {
        console.log("Slow connection detected, skipping image preload");
        setImagesLoaded(true);
        return;
      }
    }

    let loadedImages = 0;
    let timeoutId;

    // Set up timeout
    timeoutId = setTimeout(() => {
      console.log("Image loading timeout reached");
      setTimedOut(true);
      setImagesLoaded(true);
    }, timeout);

    // Preload images
    const imagePromises = validUrls.map((url) => {
      return new Promise((resolve) => {
        const img = new Image();

        img.onload = () => {
          loadedImages++;
          setLoadedCount(loadedImages);
          resolve(true);
        };

        img.onerror = () => {
          loadedImages++;
          setLoadedCount(loadedImages);
          console.warn(`Failed to load image: ${url}`);
          resolve(false);
        };

        img.src = url;
      });
    });

    // Wait for all images to load (or fail)
    Promise.all(imagePromises).then(() => {
      clearTimeout(timeoutId);
      setImagesLoaded(true);
    });

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [imageUrls, timeout, skipOnSlowConnection]);

  return {
    imagesLoaded,
    loadedCount,
    totalCount,
    timedOut,
    progress: totalCount > 0 ? (loadedCount / totalCount) * 100 : 100,
  };
}
