import React, { useState, useEffect } from "react";
import { getFooterData } from "../api/footer";

function Footer() {
  const [footerData, setFooterData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFooterData = async () => {
      console.log("🔍 Footer: Starting to load footer data...");
      try {
        const data = await getFooterData();
        console.log("✅ Footer: Successfully loaded data:", data);
        setFooterData(data);
      } catch (error) {
        console.error("❌ Footer: Failed to load footer data:", error);
        // Fallback data will be used from getFooterData
        const fallbackData = {
          copyright: "© 2025 Ngāti Maru. All rights reserved.",
          columns: [
            {
              id: 1,
              title: "PHONE",
              contentItems: ["Office - 07 867 9104", "Nikky - 021 905 192"],
            },
            {
              id: 2,
              title: "OFFICE",
              contentItems: ["111 Queen Street", "Directions (Google)"],
            },
            {
              id: 3,
              title: "POSTAL",
              contentItems: ["PO Box 37, Thames"],
            },
            {
              id: 4,
              title: "EMAIL",
              contentItems: ["office@ngatimaru.iwi.nz"],
            },
          ],
        };
        console.log("🔄 Footer: Using fallback data:", fallbackData);
        setFooterData(fallbackData);
      } finally {
        setIsLoading(false);
        console.log("🏁 Footer: Loading completed");
      }
    };

    loadFooterData();
  }, []);

  // Render loading state
  if (isLoading) {
    console.log("⏳ Footer: Rendering loading state");
    return (
      <div className="flex w-full justify-center px-20 items-center py-10 bg-gray-300">
        <div className="font-roboto-light text-xl">Loading footer...</div>
      </div>
    );
  }

  // Helper function to render content item with special formatting
  const renderContentItem = (item, columnTitle, index) => {
    const key = `${columnTitle}-${index}`;

    // Handle EMAIL column - make items clickable mailto links
    if (columnTitle === "EMAIL" && item.includes("@")) {
      return (
        <a
          key={key}
          href={`mailto:${item}`}
          className="underline hover:text-blue-600 transition-colors"
        >
          {item}
        </a>
      );
    }

    // Handle OFFICE column - make "Directions" links clickable
    if (columnTitle === "OFFICE" && item.toLowerCase().includes("directions")) {
      const mapsUrl =
        "https://www.google.com/maps/place/111+Queen+Street,+Thames+3500/@-37.1438297,175.5403264,17z/data=!3m1!4b1!4m6!3m5!1s0x6d728138d40d9627:0x163952e9277fe7e0!8m2!3d-37.143834!4d175.5429013!16s%2Fg%2F11jj788pdk?entry=ttu&g_ep=EgoyMDI1MDcyMC4wIKXMDSoASAFQAw%3D%3D";
      return (
        <a
          key={key}
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-blue-600 transition-colors"
        >
          {item}
        </a>
      );
    }

    // Default rendering for all other items
    return (
      <div key={key} className="text-gray-700">
        {item}
      </div>
    );
  };

  console.log("🎨 Footer: Rendering footer with data:", footerData);

  return (
    <div className="flex flex-col w-full bg-gray-300">
      {/* Main footer content */}
      <div className="flex w-full justify-between px-20 items-start py-10">
        {footerData?.columns.map((column) => (
          <div key={column.id} className="flex flex-col">
            <h1 className="pb-5 font-roboto-light text-2xl text-gray-800">
              {column.title}
            </h1>

            {/* Render all content items dynamically */}
            <div className="flex flex-col gap-2">
              {column.contentItems && column.contentItems.length > 0 ? (
                column.contentItems.map((item, index) =>
                  renderContentItem(item, column.title, index)
                )
              ) : (
                <div className="text-gray-500 italic text-sm">
                  No content available
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Copyright section at the very bottom */}
      {footerData?.copyright && (
        <div className="w-full border-t border-gray-400 py-4 px-20">
          <div className="text-center text-sm text-gray-600">
            {footerData.copyright}
          </div>
        </div>
      )}
    </div>
  );
}

export default Footer;
