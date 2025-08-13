import fetchContentType from "./fetchContentType";
import { strapiImage } from "./strapiImage";

/**
 * Transforms image data from Strapi format
 * @param {Object} imageData - Raw image data from Strapi
 * @returns {Object|null} Formatted image data
 */
function transformImage(imageData) {
  console.log(
    "🎨 Transforming image data:",
    JSON.stringify(imageData, null, 2)
  );

  if (!imageData) {
    console.log("⚠️ No image data provided");
    return null;
  }

  // Handle both nested and direct data structures
  const data = imageData.data?.attributes || imageData;

  if (!data.url) {
    console.log("⚠️ No URL found in image data");
    return null;
  }

  console.log("🔗 Extracted image URL:", data.url);
  console.log("📝 Extracted alt text:", data.alternativeText);
  console.log("📐 Available formats:", Object.keys(data.formats || {}));

  return {
    url: strapiImage(data.url),
    alternativeText: data.alternativeText || data.name,
    formats: data.formats,
  };
}

/**
 * Universal page configuration for Strapi content types
 */
const PAGE_CONFIGS = {
  home: {
    contentType: "home",
    populate: {
      HeaderSection: {
        populate: {
          BackgroundHeaderImage: true,
        },
      },
      MihiSection: {
        populate: {
          Image: true,
        },
      },
      Button: true,
    },
    defaultContent: {
      HeaderSection: {
        TeReoTitle: "[Strapi Error: HeaderSection.TeReoTitle]",
        EnglishTitle: "[Strapi Error: HeaderSection.EnglishTitle]",
        BackgroundHeaderImage: {
          url: null,
          alternativeText:
            "[Strapi Error: HeaderSection.BackgroundHeaderImage]",
        },
      },
      MihiSection: {
        Title: "[Strapi Error: MihiSection.Title]",
        MihiShortened: "[Strapi Error: MihiSection.MihiShortened]",
        FullMihi: "[Strapi Error: MihiSection.FullMihi]",
        Image: {
          url: null,
          alternativeText: "[Strapi Error: MihiSection.Image]",
        },
      },
      Button: [
        {
          EnglishLabel: "[Strapi Error: Button.EnglishLabel]",
          TeReoLabel: "[Strapi Error: Button.TeReoLabel]",
          href: "[Strapi Error: Button.href]",
        },
      ],
    },
  },
  about: {
    contentType: "about",
    populate: {
      HeaderSection: {
        populate: {
          BackgroundHeaderImage: true,
        },
      },
      TeamMembers: {
        populate: {
          Image: true,
        },
      },
      Content: true,
    },
    defaultContent: {
      HeaderSection: {
        TeReoTitle: "[Strapi Error: About HeaderSection.TeReoTitle]",
        EnglishTitle: "[Strapi Error: About HeaderSection.EnglishTitle]",
        BackgroundHeaderImage: {
          url: null,
          alternativeText:
            "[Strapi Error: About HeaderSection.BackgroundHeaderImage]",
        },
      },
      TeamMembers: [],
      Content: "[Strapi Error: About Content]",
    },
  },
  bookingMataiWhetu: {
    contentType: "booking-matai-whetu",
    populate: "*",
    defaultContent: {
      Title: "[Strapi Error: BookingMataiWhetu Title]",
      Description: "[Strapi Error: BookingMataiWhetu Description]",
    },
  },
  fishingPermit: {
    contentType: "fishing-permit",
    populate: "*",
    defaultContent: {
      Title: "[Strapi Error: FishingPermit Title]",
      Description: "[Strapi Error: FishingPermit Description]",
    },
  },
  documents: {
    contentType: "documents",
    populate: "*",
    defaultContent: {
      Title: "[Strapi Error: Documents Title]",
      DocumentList: [],
    },
  },
  store: {
    contentType: "store",
    populate: "*",
    defaultContent: {
      Title: "[Strapi Error: Store Title]",
      Products: [],
    },
  },
  register: {
    contentType: "register",
    populate: "*",
    defaultContent: {
      Title: "[Strapi Error: Register Title]",
      Description: "[Strapi Error: Register Description]",
    },
  },
};

/**
 * Universal function to get content for any page
 * @param {string} pageName - The name of the page (e.g., 'home', 'about', etc.)
 * @returns {Promise<Object>} The page content
 */
export async function getPageContent(pageName) {
  const allContent = await loadSiteContent();
  return allContent[pageName] || PAGE_CONFIGS[pageName]?.defaultContent || {};
}

/**
 * Gets the home page content
 * @returns {Promise<Object>} The home page content
 */
export async function getHomeContent() {
  return getPageContent("home");
}

/**
 * Gets the about page content
 * @returns {Promise<Object>} The about page content
 */
export async function getAboutContent() {
  return getPageContent("about");
}

/**
 * Gets the booking matai whetu page content
 * @returns {Promise<Object>} The booking matai whetu page content
 */
export async function getBookingMataiWhetuContent() {
  return getPageContent("bookingMataiWhetu");
}

/**
 * Gets the fishing permit page content
 * @returns {Promise<Object>} The fishing permit page content
 */
export async function getFishingPermitContent() {
  return getPageContent("fishingPermit");
}

/**
 * Gets the documents page content
 * @returns {Promise<Object>} The documents page content
 */
export async function getDocumentsContent() {
  return getPageContent("documents");
}

/**
 * Gets the store page content
 * @returns {Promise<Object>} The store page content
 */
export async function getStoreContent() {
  return getPageContent("store");
}

/**
 * Gets the register page content
 * @returns {Promise<Object>} The register page content
 */
export async function getRegisterContent() {
  return getPageContent("register");
}

/**
 * Universal data transformation function
 * @param {string} pageName - The name of the page
 * @param {Object} rawData - Raw data from Strapi
 * @returns {Object} Transformed data
 */
function transformPageData(pageName, rawData) {
  const config = PAGE_CONFIGS[pageName];
  if (!config || !rawData) {
    return config?.defaultContent || {};
  }

  // For home page, use existing transformation logic
  if (pageName === "home") {
    return transformHomeData(rawData, config.defaultContent);
  }

  // For other pages, use generic transformation
  return transformGenericData(rawData, config.defaultContent);
}

/**
 * Transform home page data (existing logic preserved)
 * @param {Object} homeContent - Raw home data from Strapi
 * @param {Object} defaultContent - Default content for fallback
 * @returns {Object} Transformed home data
 */
function transformHomeData(homeContent, defaultContent) {
  console.log("📥 Raw home data:", JSON.stringify(homeContent, null, 2));

  // Validate required fields and log missing ones
  const requiredFields = {
    HeaderSection: ["TeReoTitle", "EnglishTitle", "BackgroundHeaderImage"],
    MihiSection: ["Title", "MihiShortened", "FullMihi", "Image"],
    Button: ["EnglishLabel", "TeReoLabel", "href"],
  };

  Object.entries(requiredFields).forEach(([section, fields]) => {
    fields.forEach((field) => {
      if (!homeContent[section]?.[field]) {
        console.warn(`⚠️ Missing required field: ${section}.${field}`);
      }
    });
  });

  // Extract data from potentially nested Strapi response
  const extractField = (section, field) => {
    return (
      section?.[field] ||
      section?.attributes?.[field] ||
      section?.data?.attributes?.[field]
    );
  };

  const extractButton = (button) => {
    if (!button) return null;

    const data = button.attributes || button;
    return {
      EnglishLabel: data.EnglishLabel || defaultContent.Button[0].EnglishLabel,
      TeReoLabel: data.TeReoLabel || defaultContent.Button[0].TeReoLabel,
      href: data.href || defaultContent.Button[0].href,
    };
  };

  // Transform the home data
  const transformedHome = {
    HeaderSection: {
      TeReoTitle:
        extractField(homeContent.HeaderSection, "TeReoTitle") ||
        defaultContent.HeaderSection.TeReoTitle,
      EnglishTitle:
        extractField(homeContent.HeaderSection, "EnglishTitle") ||
        defaultContent.HeaderSection.EnglishTitle,
      BackgroundHeaderImage: transformImage(
        homeContent.HeaderSection?.BackgroundHeaderImage ||
          homeContent.HeaderSection?.data?.BackgroundHeaderImage
      ),
    },
    MihiSection: {
      Title:
        extractField(homeContent.MihiSection, "Title") ||
        defaultContent.MihiSection.Title,
      MihiShortened:
        extractField(homeContent.MihiSection, "MihiShortened") ||
        defaultContent.MihiSection.MihiShortened,
      FullMihi:
        extractField(homeContent.MihiSection, "FullMihi") ||
        defaultContent.MihiSection.FullMihi,
      Image: transformImage(
        homeContent.MihiSection?.Image || homeContent.MihiSection?.data?.Image
      ),
    },
    Button: (() => {
      if (Array.isArray(homeContent.Button)) {
        return homeContent.Button.map(extractButton);
      }
      if (homeContent.Button?.data) {
        if (Array.isArray(homeContent.Button.data)) {
          return homeContent.Button.data.map(extractButton);
        }
        return [extractButton(homeContent.Button.data)];
      }
      if (homeContent.Button) {
        return [extractButton(homeContent.Button)];
      }
      return defaultContent.Button;
    })(),
  };

  console.log(
    "✅ Transformed home data:",
    JSON.stringify(transformedHome, null, 2)
  );
  return transformedHome;
}

/**
 * Transform generic page data
 * @param {Object} rawData - Raw data from Strapi
 * @param {Object} defaultContent - Default content for fallback
 * @returns {Object} Transformed data
 */
function transformGenericData(rawData, defaultContent) {
  // Generic transformation that handles most common Strapi structures
  const transformed = {};

  // Extract fields from Strapi format
  const extractField = (data, field) => {
    return (
      data?.[field] ||
      data?.attributes?.[field] ||
      data?.data?.attributes?.[field]
    );
  };

  // Transform all fields in defaultContent
  Object.keys(defaultContent).forEach((key) => {
    const value = extractField(rawData, key);

    // Handle images
    if (
      value &&
      typeof value === "object" &&
      (value.url || value.data?.attributes?.url)
    ) {
      transformed[key] = transformImage(value);
    }
    // Handle arrays
    else if (Array.isArray(value)) {
      transformed[key] = value.map((item) => {
        if (
          item &&
          typeof item === "object" &&
          (item.url || item.data?.attributes?.url)
        ) {
          return transformImage(item);
        }
        return item;
      });
    }
    // Handle regular fields
    else {
      transformed[key] = value || defaultContent[key];
    }
  });

  return transformed;
}

/**
 * Loads site content from Strapi for all configured pages
 * @returns {Promise<Object>} An object containing all site content
 */
export async function loadSiteContent() {
  try {
    console.log("🔄 Fetching all page data from Strapi...");

    // Log the API URL and token presence
    console.log("🌐 API URL:", import.meta.env.VITE_STRAPI_API_URL);
    console.log(
      "🔑 API Token present:",
      !!import.meta.env.VITE_STRAPI_API_TOKEN
    );

    // Fetch all configured pages in parallel
    const pageNames = Object.keys(PAGE_CONFIGS);
    const fetchPromises = pageNames.map((pageName) => {
      const config = PAGE_CONFIGS[pageName];
      return fetchContentType(
        config.contentType,
        { populate: config.populate },
        true
      );
    });

    const results = await Promise.allSettled(fetchPromises);

    // Transform all page data
    const allContent = {};
    pageNames.forEach((pageName, index) => {
      const result = results[index];
      const rawData = result.status === "fulfilled" ? result.value : null;

      if (!rawData) {
        console.warn(
          `⚠️ No ${pageName} data received from Strapi, using defaults`
        );
      }

      allContent[pageName] = transformPageData(pageName, rawData);
    });

    console.log(
      "✅ All content loaded and transformed:",
      Object.keys(allContent)
    );
    return allContent;
  } catch (error) {
    console.error("❌ Error loading site content:", error);
    if (error.response) {
      console.error("❌ Strapi response status:", error.response.status);
      console.error("❌ Strapi error details:", error.response.data);
    }
    if (!import.meta.env.VITE_STRAPI_API_URL) {
      console.error("❌ Missing VITE_STRAPI_API_URL environment variable");
    }
    if (!import.meta.env.VITE_STRAPI_API_TOKEN) {
      console.error("❌ Missing VITE_STRAPI_API_TOKEN environment variable");
    }

    // Return default content for all pages
    const fallbackContent = {};
    Object.keys(PAGE_CONFIGS).forEach((pageName) => {
      fallbackContent[pageName] = PAGE_CONFIGS[pageName].defaultContent;
    });
    return fallbackContent;
  }
}
