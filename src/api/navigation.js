import fetchContentType from "./fetchContentType";

/**
 * Fetches navigation data from Strapi
 * @returns {Promise<Array>} Array of navigation items
 */
export async function getNavigationData() {
  try {
    const rawData = await fetchContentType(
      "navigation-bar",
      {
        populate: {
          Navigation: true, // Only populate navigation items, not everything
        },
      },
      true
    );

    // Transform and filter the navigation data
    if (rawData?.Navigation && Array.isArray(rawData.Navigation)) {
      const transformedNavigation = rawData.Navigation.filter(
        (item) => item.Visible
      ) // Only include visible items
        .map((item) => ({
          id: item.id,
          href: transformHref(item.href),
          titleEnglish: item.TitleEnglish,
          titleTeReo: item.TitleTeReo,
          visible: item.Visible,
        }));

      return transformedNavigation;
    }

    return [];
  } catch {
    // Return fallback navigation data
    return getFallbackNavigation();
  }
}

/**
 * Transform href from localhost to relative paths
 * @param {string} href - The original href from Strapi
 * @returns {string} Transformed href
 */
function transformHref(href) {
  if (!href) return "/";

  // Convert localhost URLs to relative paths
  if (href.includes("localhost:5173")) {
    return href.replace(/^https?:\/\/localhost:5173/, "") || "/";
  }

  // If it's already a relative path, return as is
  if (href.startsWith("/")) {
    return href;
  }

  // If it's an external URL, return as is
  return href;
}

/**
 * Fallback navigation data in case API fails
 * @returns {Array} Default navigation items
 */
function getFallbackNavigation() {
  return [
    {
      id: 1,
      href: "/",
      titleEnglish: "HOME",
      titleTeReo: "KAINGA",
      visible: true,
    },
    {
      id: 2,
      href: "/about",
      titleEnglish: "ABOUT US",
      titleTeReo: "KO WAI",
      visible: true,
    },
    {
      id: 3,
      href: "/bookingmataiwhetu",
      titleEnglish: "BOOKING MĀTAI WHETŪ",
      titleTeReo: "RĀHITA MĀTAI WHETŪ",
      visible: true,
    },
    {
      id: 4,
      href: "/fishingpermit",
      titleEnglish: "FISHING PERMIT",
      titleTeReo: "RIHITI HĪ IKA",
      visible: true,
    },
    {
      id: 5,
      href: "/documents",
      titleEnglish: "DOCUMENTS",
      titleTeReo: "NGĀ TUHINGA",
      visible: true,
    },
    {
      id: 6,
      href: "/register",
      titleEnglish: "REGISTER",
      titleTeReo: "RĒHITA",
      visible: true,
    },
  ];
}
