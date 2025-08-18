import fetchContentType from "./fetchContentType";

/**
 * Fetches footer data from Strapi
 * @returns {Promise<Object>} Footer data with columns and copyright
 */
export async function getFooterData() {
  console.log("🦶 Footer: Fetching footer data from API...");
  const footerStart = performance.now();

  try {
    const rawData = await fetchContentType(
      "footer",
      {
        populate: {
          FooterColumn: {
            populate: "*",
          },
        },
      },
      true
    );

    const footerEnd = performance.now();
    console.log(
      `🦶 Footer: API call completed (${(footerEnd - footerStart).toFixed(2)}ms)`
    );

    console.log("🦶 Footer: Raw API response:", rawData);

    // Transform the footer data to match the new Strapi structure
    if (rawData) {
      const transformedFooter = {
        copyright:
          rawData.Copyright || "© 2025 Ngāti Maru. All rights reserved.",
        columns:
          rawData.FooterColumn && Array.isArray(rawData.FooterColumn)
            ? rawData.FooterColumn.map((column) => {
                console.log("🦶 Footer: Processing column:", column);

                const title =
                  column.ContentTItle || column.ContentTitle || "Unknown";

                // Extract content items from the nested structure
                const contentItems =
                  column.Content && Array.isArray(column.Content)
                    ? column.Content.map(
                        (item) => item.ContentText || item.text || ""
                      )
                    : [];

                console.log(
                  `🦶 Footer: Column "${title}" has ${contentItems.length} content items:`,
                  contentItems
                );

                return {
                  id: column.id,
                  title: title,
                  contentItems: contentItems,
                };
              })
            : [],
      };

      console.log(
        `🦶 Footer: Transformed footer with ${transformedFooter.columns.length} columns:`,
        transformedFooter
      );
      return transformedFooter;
    }

    console.warn("🦶 Footer: No footer data found, returning fallback");
    return getFallbackFooter();
  } catch (error) {
    const footerEnd = performance.now();
    console.error(
      `❌ Footer: Error fetching footer data (${(footerEnd - footerStart).toFixed(2)}ms):`,
      error
    );

    // Return fallback footer data
    console.log("🦶 Footer: Using fallback footer data");
    return getFallbackFooter();
  }
}

/**
 * Fallback footer data in case API fails
 * @returns {Object} Default footer data
 */
function getFallbackFooter() {
  return {
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
}
