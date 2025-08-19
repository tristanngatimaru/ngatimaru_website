import fetchContentType from "./fetchContentType";

/**
 * Fetches footer data from Strapi
 * @returns {Promise<Object>} Footer data with columns and copyright
 */
export async function getFooterData() {
  try {
    const rawData = await fetchContentType(
      "footer",
      {
        populate: {
          FooterColumn: {
            populate: {
              Content: true, // Only populate content, not everything
            },
          },
        },
      },
      true
    );

    // Transform the footer data to match the Strapi structure
    if (rawData) {
      const transformedFooter = {
        copyright: rawData.Copyright || "",
        columns:
          rawData.FooterColumn && Array.isArray(rawData.FooterColumn)
            ? rawData.FooterColumn.map((column) => {
                const title = column.ContentTItle || column.ContentTitle || "";

                // Extract content items from the nested structure
                const contentItems =
                  column.Content && Array.isArray(column.Content)
                    ? column.Content.map(
                        (item) => item.ContentText || item.text || ""
                      )
                    : [];

                return {
                  id: column.id,
                  title: title,
                  contentItems: contentItems,
                };
              })
            : [],
      };

      return transformedFooter;
    }

    return null;
  } catch (error) {
    console.error("Error fetching footer data:", error);
    return null;
  }
}
