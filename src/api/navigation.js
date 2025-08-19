import fetchContentType from "./fetchContentType";

/**
 * Fetches navigation data from Strapi
 * @returns {Promise<Array>} Array of navigation items
 */
export async function getNavigationData() {
  console.log("🧭 Navigation: Fetching navigation data from API...");
  const navigationStart = performance.now();

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

    const navigationEnd = performance.now();
    console.log(
      `🧭 Navigation: API call completed (${(navigationEnd - navigationStart).toFixed(2)}ms)`
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

      console.log(
        `🧭 Navigation: Transformed ${transformedNavigation.length} navigation items`
      );
      return transformedNavigation;
    }

    console.warn(
      "🧭 Navigation: No navigation data found, returning empty array"
    );
    return [];
  } catch (error) {
    const navigationEnd = performance.now();
    console.error(
      `❌ Navigation: Error fetching navigation data (${(navigationEnd - navigationStart).toFixed(2)}ms):`,
      error
    );

    // Return fallback navigation data
    console.log("🧭 Navigation: Using fallback navigation data");
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
