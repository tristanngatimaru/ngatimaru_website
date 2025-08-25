import { useState, useEffect } from "react";
import { getSmartFallback } from "../utils/imageUtils";

// Import local fallback images
import beachIsland from "../assets/images/headerimages/beachisland.png";
import carvingCloseup from "../assets/images/headerimages/carvingcloseup.png";
import coromandel from "../assets/images/headerimages/coromandel top.png";
import korowai from "../assets/images/headerimages/korowai.png";
import mataiWhetu from "../assets/images/headerimages/matai whetu.png";
import mihiBackground from "../assets/images/headerimages/mihi background.png";
import pohutukawa from "../assets/images/headerimages/pohutakawaflowers.png";
import shells from "../assets/images/headerimages/shells on a beach.png";
import veryCloseCarving from "../assets/images/headerimages/veryclosecarving.png";

// Fallback image mapping
const fallbackImages = {
  header: beachIsland,
  hero: korowai,
  mihi: mihiBackground,
  about: carvingCloseup,
  background: mataiWhetu,
  carving: veryCloseCarving,
  beach: shells,
  flowers: pohutukawa,
  coromandel: coromandel,
  default: beachIsland,
};

/**
 * Smart Image component that shows local fallback first, then loads API image
 * @param {string} src - API image URL
 * @param {string} fallbackType - Type of fallback image to use (auto-detected if not provided)
 * @param {string} alt - Alt text
 * @param {string} className - CSS classes
 * @param {string} loading - Loading strategy (eager/lazy)
 * @param {string} context - Context for smart fallback selection
 * @param {Function} onLoad - Callback when API image loads
 * @param {Function} onError - Callback when API image fails
 */
const SmartImage = ({
  src,
  fallbackType,
  alt = "",
  className = "",
  loading = "lazy",
  context = "",
  onLoad,
  onError,
  ...props
}) => {
  // Use smart fallback detection if no type specified
  const smartFallbackType = fallbackType || getSmartFallback(src, alt, context);
  const [currentSrc, setCurrentSrc] = useState(
    fallbackImages[smartFallbackType] || fallbackImages.default
  );
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (!src) {
      // No API source provided, stick with fallback
      return;
    }

    // Reset states when src changes
    setIsTransitioning(false);

    // Preload the API image
    const img = new Image();

    img.onload = () => {
      setIsTransitioning(true);

      // Smooth transition after a brief delay
      setTimeout(() => {
        setCurrentSrc(src);
        setIsTransitioning(false);
        onLoad?.(img);
      }, 150); // Brief transition delay
    };

    img.onerror = () => {
      setIsTransitioning(false);
      onError?.(img);
    };

    // Start loading the API image
    img.src = src;

    // Cleanup function
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, onLoad, onError]);

  return (
    <div className="relative overflow-hidden">
      <img
        src={currentSrc}
        alt={alt}
        className={`
          transition-all duration-500 ease-in-out
          ${isTransitioning ? "opacity-75 scale-105" : "opacity-100 scale-100"}
          ${className}
        `}
        loading={loading}
        {...props}
      />

      {/* Loading indicator when transitioning */}
      {isTransitioning && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default SmartImage;
