import React from "react";
import SmartImage from "../components/SmartImage";

/**
 * Demo page to showcase the SmartImage component functionality
 * This helps visualize how local images load first, then transition to API images
 */
const ImageDemo = () => {
  // Simulate different API image scenarios
  const imageTests = [
    {
      name: "Working API Header Image",
      apiSrc: "https://picsum.photos/800/400?random=1",
      context: "header",
      alt: "Header background",
    },
    {
      name: "Broken API Image (Fallback Demo)",
      apiSrc: "https://broken-url-that-will-fail.com/image.jpg",
      context: "mihi",
      alt: "Mihi section image",
    },
    {
      name: "Slow Loading API Image",
      apiSrc: "https://picsum.photos/800/400?random=2&slow=true",
      context: "carving",
      alt: "Traditional carving",
    },
    {
      name: "No API Image (Local Only)",
      apiSrc: null,
      context: "beach",
      alt: "Beach scene",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">SmartImage Demo</h1>

        <div className="mb-8 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">How It Works:</h2>
          <div className="space-y-2 text-gray-700">
            <p>
              🖼️ <strong>Local First:</strong> Shows beautiful local fallback
              images immediately
            </p>
            <p>
              🌐 <strong>API Loading:</strong> Loads API images in the
              background
            </p>
            <p>
              ✨ <strong>Smooth Transition:</strong> Seamlessly transitions when
              API image loads
            </p>
            <p>
              🛡️ <strong>Fallback Safety:</strong> Falls back to local images if
              API fails
            </p>
            <p>
              🧠 <strong>Smart Selection:</strong> Auto-selects appropriate
              fallback based on context
            </p>
            <p>
              ⚡ <strong>Performance:</strong> Non-blocking, lazy loading,
              cached responses
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {imageTests.map((test, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="h-64 relative">
                <SmartImage
                  src={test.apiSrc}
                  alt={test.alt}
                  context={test.context}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onLoad={() => {}}
                  onError={() => {}}
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold">{test.name}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Context: {test.context}
                </p>
                <p className="text-sm text-gray-600">
                  API: {test.apiSrc || "None (local only)"}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 bg-blue-50 rounded-lg">
          <h3 className="text-xl font-semibold text-blue-900 mb-3">
            Development Status Indicators
          </h3>
          <p className="text-blue-700">
            In development mode, you'll see status indicators on images:
          </p>
          <div className="mt-2 space-y-1 text-sm">
            <p>
              ⏳{" "}
              <span className="bg-black text-white px-2 py-1 rounded">
                Local
              </span>{" "}
              - Showing local fallback image
            </p>
            <p>
              ✅{" "}
              <span className="bg-black text-white px-2 py-1 rounded">API</span>{" "}
              - Successfully loaded from API
            </p>
            <p>
              ❌{" "}
              <span className="bg-black text-white px-2 py-1 rounded">
                Fallback
              </span>{" "}
              - API failed, using local fallback
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageDemo;
