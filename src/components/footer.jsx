import { useState, useEffect } from "react";
import { getFooterContent } from "@/api/siteContent";

function Footer() {
  const [footerData, setFooterData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadFooterContent() {
      try {
        const data = await getFooterContent();
        console.log("Footer data received:", data); // Debug logging
        setFooterData(data);
      } catch (err) {
        console.error("Error loading footer content:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    loadFooterContent();
  }, []);

  if (loading) {
    return (
      <div className="flex w-full justify-center px-20 items-center py-10 bg-gray-300">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-600"></div>
      </div>
    );
  }

  if (error || !footerData) {
    // Fallback to original static content if Strapi fails
    return (
      <div className="flex w-full justify-between px-20 items-start py-10 bg-gray-300"></div>
    );
  }

  // Helper function to render content with smart formatting
  const renderContent = (contentText) => {
    // Check if it's a URL
    if (contentText.includes("http")) {
      const isGoogleMaps = contentText.includes("google.com/maps");
      return (
        <a
          href={contentText}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-gray-700 transition-colors"
        >
          {isGoogleMaps ? "Directions" : "Link"}
        </a>
      );
    }

    // Check if it's a phone number format with " - "
    if (contentText.includes(" - ")) {
      const parts = contentText.split(" - ");
      return (
        <div className="flex gap-2 items-start">
          {parts.map((part, partIndex) => (
            <span key={partIndex} className="text-gray-800">
              {partIndex > 0 && <span className="mx-1">-</span>}
              {part}
            </span>
          ))}
        </div>
      );
    }

    // Check if it's an email
    if (contentText.includes("@") && contentText.includes(".")) {
      return (
        <a
          href={`mailto:${contentText}`}
          className="hover:text-gray-700 transition-colors underline"
        >
          {contentText}
        </a>
      );
    }

    // Regular text
    return <div className="text-gray-800">{contentText}</div>;
  };

  return (
    <div className="relative bg-gray-300">
      <div className="flex w-full justify-between px-4 md:px-20 items-start py-10 flex-wrap gap-6 md:gap-4">
        {/* Render Footer Columns from Strapi */}
        {footerData.FooterColumn?.map((column, index) => (
          <div key={index} className="flex-col flex min-w-[200px]">
            <h1 className="pb-5 font-roboto-light text-xl md:text-2xl text-gray-900 uppercase">
              {column.ContentTItle}
            </h1>
            <div className="space-y-2">
              {column.Content?.map((contentItem, contentIndex) => (
                <div key={contentIndex}>
                  {renderContent(contentItem.ContentText)}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Copyright section */}
      {footerData.Copyright && (
        <div className="w-full text-center py-3 text-sm text-gray-600 bg-gray-200 border-t border-gray-400">
          {footerData.Copyright}
        </div>
      )}
    </div>
  );
}

export default Footer;
