// Example implementation for a page with critical image loading
import React, { useState, useEffect } from "react";
import { getHomeContent } from "@/api/siteContent";
import { useImageLoader } from "@/hooks/useImageLoader";
import LoadingScreen from "@/components/LoadingScreen";
import HeroHeader from "@/components/header";
import Footer from "@/components/footer";

function HomePageWithImageLoading() {
  const [content, setContent] = useState(null);
  const [contentLoaded, setContentLoaded] = useState(false);
  const [error, setError] = useState(null);

  // Load content first
  useEffect(() => {
    async function loadContent() {
      try {
        const homeData = await getHomeContent();
        setContent(homeData);
        setContentLoaded(true);
      } catch (error) {
        console.error("Error loading home content:", error);
        setError(error);
        setContentLoaded(true); // Still show the page even if content fails
      }
    }
    loadContent();
  }, []);

  // Extract critical images once content is loaded
  const criticalImages = content
    ? [
        content.HeaderSection?.BackgroundHeaderImage?.url,
        content.MihiSection?.Image?.url,
        // Add other critical above-the-fold images
      ].filter(Boolean)
    : [];

  // Use the image loader hook
  const { imagesLoaded, progress, timedOut } = useImageLoader(criticalImages, {
    timeout: 8000, // 8 seconds max wait
    skipOnSlowConnection: true,
  });

  // Show loading screen until both content and critical images are loaded
  const shouldShowLoading = !contentLoaded || (!imagesLoaded && !timedOut);

  if (shouldShowLoading) {
    return (
      <LoadingScreen
        progress={progress}
        message={!contentLoaded ? "Loading content..." : "Loading images..."}
        showProgress={contentLoaded && criticalImages.length > 0}
      />
    );
  }

  // Show error state
  if (error && !content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-roboto-bold text-red-600 mb-4">
            Error Loading Content
          </h2>
          <p className="text-gray-600">Please try refreshing the page.</p>
        </div>
      </div>
    );
  }

  // Render the actual page content
  return (
    <div className="w-full">
      <HeroHeader
        image={content?.HeaderSection?.BackgroundHeaderImage?.url}
        title={content?.HeaderSection?.TeReoTitle || "Ngāti Maru"}
        subtitle={content?.HeaderSection?.EnglishTitle || "Welcome"}
      />

      {/* Rest of your page content */}
      <div className="py-10">
        <h2 className="text-2xl font-roboto-bold text-center">
          {content?.MihiSection?.Title || "Mihi"}
        </h2>
        {/* ... other content ... */}
      </div>

      <Footer />
    </div>
  );
}

export default HomePageWithImageLoading;
