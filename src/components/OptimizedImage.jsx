import React, { useState, useRef, useEffect } from "react";
import { strapiImage } from "../api/strapiImage";

/**
 * Performance-optimized image component with lazy loading
 * Maintains dynamic Strapi image loading while optimizing performance
 */
const OptimizedImage = ({
  image,
  alt = "",
  className = "",
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  placeholder = "blur",
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority); // Load immediately if priority
  const [error, setError] = useState(false);
  const imgRef = useRef(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "50px", // Start loading 50px before element enters viewport
        threshold: 0.1,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority, isInView]);

  // Generate optimized image URL from Strapi
  const getOptimizedImageUrl = (baseImage, width = 800, quality = 80) => {
    if (!baseImage) return "";

    try {
      const imageUrl = strapiImage(baseImage);
      if (!imageUrl) return "";

      // Add Strapi image transformation parameters if supported
      const url = new URL(imageUrl, import.meta.env.VITE_STRAPI_API_URL);
      url.searchParams.set("format", "webp"); // Use modern format
      url.searchParams.set("width", width.toString());
      url.searchParams.set("quality", quality.toString());

      return url.toString();
    } catch {
      return strapiImage(baseImage);
    }
  };

  // Generate srcSet for responsive images
  const generateSrcSet = (baseImage) => {
    if (!baseImage) return "";

    const widths = [320, 640, 768, 1024, 1280, 1920];
    return widths
      .map((width) => `${getOptimizedImageUrl(baseImage, width)} ${width}w`)
      .join(", ");
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setError(true);
  };

  // Don't render if no image
  if (!image || error) {
    return (
      <div
        ref={imgRef}
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        {...props}
      >
        <span className="text-gray-500 text-sm">Image unavailable</span>
      </div>
    );
  }

  const imageUrl = strapiImage(image);
  const optimizedUrl = getOptimizedImageUrl(image);
  const srcSet = generateSrcSet(image);

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
      {/* Placeholder/Loading state */}
      {!isLoaded && placeholder === "blur" && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}

      {/* Actual Image - only load when in view or priority */}
      {(isInView || priority) && (
        <img
          src={optimizedUrl || imageUrl}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          className={`
            w-full h-full object-cover transition-opacity duration-300
            ${isLoaded ? "opacity-100" : "opacity-0"}
            ${className}
          `}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          {...props}
        />
      )}

      {/* Loading indicator for priority images */}
      {priority && !isLoaded && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
