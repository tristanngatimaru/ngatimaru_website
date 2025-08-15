import React from "react";

/**
 * Enhanced loading screen with progress indicator
 */
const LoadingScreen = ({
  progress = 0,
  message = "Loading...",
  showProgress = false,
  className = "",
}) => {
  return (
    <div
      className={`fixed inset-0 bg-white z-50 flex items-center justify-center ${className}`}
    >
      <div className="text-center">
        {/* Logo or Brand */}
        <div className="mb-8">
          <h1 className="text-2xl font-roboto-bold text-emerald-800">
            Ngāti Maru
          </h1>
          <p className="text-emerald-600 font-roboto-light">
            Loading content...
          </p>
        </div>

        {/* Loading Spinner */}
        <div className="mb-6">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
        </div>

        {/* Progress Bar (if enabled) */}
        {showProgress && (
          <div className="w-64 mx-auto mb-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-emerald-600 h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${Math.min(progress, 100)}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {Math.round(progress)}% loaded
            </p>
          </div>
        )}

        {/* Loading Message */}
        <p className="text-gray-600 font-roboto-light">{message}</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
