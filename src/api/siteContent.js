import FaceCard from "@/components/facecard";
import fetchContentType from "./fetchContentType";
import { strapiImage } from "./strapiImage";

/**
 * Transforms image data from Strapi format
 * @param {Object} imageData - Raw image data from Strapi
 * @returns {Object|null} Formatted image data
 */
function transformImage(imageData) {
  if (!imageData) {
    return null;
  }

  // Handle both nested and direct data structures
  const data = imageData.data?.attributes || imageData;

  if (!data.url) {
    return null;
  }

  return {
    url: strapiImage(data.url),
    alternativeText: data.alternativeText || data.name,
    formats: data.formats,
  };
}

/**
 * Navigation configuration for Strapi navigation content type
 */
const NAVIGATION_CONFIG = {
  contentType: "navigation-bar",
  populate: "*",
  defaultContent: [
    { href: "/", TitleEnglish: "HOME", TitleTeReo: "KAINGA", Visible: true },
    {
      href: "/about",
      TitleEnglish: "ABOUT US",
      TitleTeReo: "KO WAI",
      Visible: true,
    },
    {
      href: "/bookingmataiwhetu",
      TitleEnglish: "BOOKING MATAI WHETŪ",
      TitleTeReo: "RĀHITA MATAI WHETŪ",
      Visible: true,
    },
    {
      href: "/fishingpermit",
      TitleEnglish: "FISHING PERMIT",
      TitleTeReo: "RIHITI HĪ IKA",
      Visible: true,
    },
    {
      href: "/documents",
      TitleEnglish: "DOCUMENTS",
      TitleTeReo: "NGĀ TUHINGA",
      Visible: true,
    },
    {
      href: "/store",
      TitleEnglish: "STORE",
      TitleTeReo: "TOA",
      Visible: false,
    },
    {
      href: "/register",
      TitleEnglish: "REGISTER",
      TitleTeReo: "RĀHITA",
      Visible: true,
    },
  ],
};

/**
 * Universal page configuration for Strapi content types
 */
const PAGE_CONFIGS = {
  mataiWhetu: {
    contentType: "matai-whetu-page",
    populate: {
      HeaderSection: {
        populate: "*",
      },
      Tikanga: true,
    },
  },

  fishingPermit: {
    contentType: "fishing-permit",
    populate: {
      HeaderSection: {
        populate: "*",
      },
    },
    defaultContent: {
      HeaderSection: {
        TeReoTitle: "[Strapi Error: FishingPermit HeaderSection.TeReoTitle]",
        EnglishTitle:
          "[Strapi Error: FishingPermit HeaderSection.EnglishTitle]",
        BackgroundHeaderImage: {
          url: null,
          alternativeText:
            "[Strapi Error: FishingPermit HeaderSection.BackgroundHeaderImage]",
        },
      },
      Content: "[Strapi Error: FishingPermit Content]",
    },
  },

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
      Header: {
        populate: "*",
      },
      FaceCard: {
        populate: "*",
      },
      SidePanelImageOne: true,
      SidePanelImageTwo: true,
    },
    defaultContent: {
      Header: {
        TeReoTitle: "[Strapi Error: About Header.TeReoTitle]",
        EnglishTitle: "[Strapi Error: About Header.EnglishTitle]",
        BackgroundHeaderImage: {
          url: null,
          alternativeText: "[Strapi Error: About Header.BackgroundHeaderImage]",
        },
      },
      FaceCard: [],
      ContentHeader: "[Strapi Error: About ContentHeader]",
      Content: "[Strapi Error: About Content]",
      TrusteesTitle: "[Strapi Error: About TrusteesTitle]",
      TrusteesList: "[Strapi Error: About TrusteesList]",
      SidePanelImageOne: {
        url: null,
        alternativeText: "[Strapi Error: About SidePanelImageOne]",
      },
      SidePanelImageTwo: {
        url: null,
        alternativeText: "[Strapi Error: About SidePanelImageTwo]",
      },
    },
  },

  documents: {
    contentType: "document-page",
    populate: {
      HeaderSection: {
        populate: {
          BackgroundHeaderImage: true,
        },
      },
      Documentation: {
        populate: "*",
      },
    },
    defaultContent: {
      HeaderSection: {
        TeReoTitle: "[Strapi Error: Documents HeaderSection.TeReoTitle]",
        EnglishTitle: "[Strapi Error: Documents HeaderSection.EnglishTitle]",
        BackgroundHeaderImage: {
          url: null,
          alternativeText:
            "[Strapi Error: Documents HeaderSection.BackgroundHeaderImage]",
        },
      },
      Documentation: [],
    },
  },

  register: {
    contentType: "register",
    populate: {
      HeaderSection: {
        populate: "*",
      },
    },
    defaultContent: {
      HeaderSection: {
        TeReoTitle: "[Strapi Error: Register HeaderSection.TeReoTitle]",
        EnglishTitle: "[Strapi Error: Register HeaderSection.EnglishTitle]",
        BackgroundHeaderImage: {
          url: null,
          alternativeText:
            "[Strapi Error: Register HeaderSection.BackgroundHeaderImage]",
        },
      },
      Content: "[Strapi Error: Register Content]",
      PostInfo: "[Strapi Error: Register PostInfo]",
    },
  },

  footer: {
    contentType: "footer",
    populate: {
      FooterColumn: {
        populate: {
          Content: true,
        },
      },
    },
    defaultContent: {
      FooterColumn: [
        {
          ContentTItle: "[Strapi Error: Footer Column Title]",
          Content: [
            {
              ContentText: "[Strapi Error: Footer Content Text]",
            },
          ],
        },
      ],
      Copyright: "[Strapi Error: Footer Copyright]",
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
  return getPageContent("mataiWhetu");
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
 * Gets the footer content
 * @returns {Promise<Object>} The footer content
 */
export async function getFooterContent() {
  return getPageContent("footer");
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
 * Gets the navigation content
 * @returns {Promise<Array>} The navigation items
 */
export async function getNavigationContent() {
  try {
    const navigationData = await fetchContentType(
      NAVIGATION_CONFIG.contentType,
      { populate: NAVIGATION_CONFIG.populate },
      true
    );

    if (
      navigationData &&
      navigationData.Navigation &&
      Array.isArray(navigationData.Navigation)
    ) {
      return navigationData.Navigation.map((item) => ({
        href: item.href || "/",
        TitleEnglish: item.TitleEnglish || "Unknown",
        TitleTeReo: item.TitleTeReo || "Unknown",
        Visible: item.Visible !== false, // Default to true if not specified
      }));
    }

    console.warn("⚠️ No navigation data received from Strapi, using defaults");
    return NAVIGATION_CONFIG.defaultContent;
  } catch (error) {
    console.error("❌ Error loading navigation content:", error);
    return NAVIGATION_CONFIG.defaultContent;
  }
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

  // For about page, use specific transformation
  if (pageName === "about") {
    return transformAboutData(rawData, config.defaultContent);
  }

  // For mataiWhetu page, use specific transformation
  if (pageName === "mataiWhetu") {
    return transformMataiWhetuData(rawData, config.defaultContent);
  }

  // For fishingPermit page, use specific transformation
  if (pageName === "fishingPermit") {
    return transformFishingPermitData(rawData, config.defaultContent);
  }

  // For documents page, use specific transformation
  if (pageName === "documents") {
    return transformDocumentsData(rawData, config.defaultContent);
  }

  // For register page, use specific transformation
  if (pageName === "register") {
    return transformRegisterData(rawData, config.defaultContent);
  }

  // For footer, use specific transformation
  if (pageName === "footer") {
    return transformFooterData(rawData, config.defaultContent);
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

  return transformedHome;
}

/**
 * Transform about page data (specific handling for Header and FaceCard)
 * @param {Object} aboutContent - Raw about data from Strapi
 * @param {Object} defaultContent - Default content for fallback
 * @returns {Object} Transformed about data
 */
function transformAboutData(aboutContent, defaultContent) {
  const transformed = {
    Header: {
      TeReoTitle:
        aboutContent.Header?.TeReoTitle || defaultContent.Header?.TeReoTitle,
      EnglishTitle:
        aboutContent.Header?.EnglishTitle ||
        defaultContent.Header?.EnglishTitle,
      BackgroundHeaderImage: transformImage(
        aboutContent.Header?.BackgroundHeaderImage
      ),
    },
    FaceCard: Array.isArray(aboutContent.FaceCard)
      ? aboutContent.FaceCard.map((member) => ({
          id: member.id,
          Name: member.Name,
          Detail: member.Detail,
          Image: transformImage(member.Image),
        }))
      : [],
    ContentHeader: aboutContent.ContentHeader || defaultContent.ContentHeader,
    Content: aboutContent.Content || defaultContent.Content,
    TrusteesTitle: aboutContent.TrusteesTitle || defaultContent.TrusteesTitle,
    TrusteesList: aboutContent.TrusteesList || defaultContent.TrusteesList,
    SidePanelImageOne: transformImage(aboutContent.SidePanelImageOne),
    SidePanelImageTwo: transformImage(aboutContent.SidePanelImageTwo),
  };

  return transformed;
}

/**
 * Transform Matai Whetu page data (specific handling for HeaderSection and Tikanga)
 * @param {Object} mataiWhetuContent - Raw matai whetu data from Strapi
 * @param {Object} defaultContent - Default content for fallback
 * @returns {Object} Transformed matai whetu data
 */
function transformMataiWhetuData(mataiWhetuContent, defaultContent) {
  const transformed = {
    HeaderSection: {
      TeReoTitle:
        mataiWhetuContent.HeaderSection?.TeReoTitle ||
        defaultContent.HeaderSection?.TeReoTitle,
      EnglishTitle:
        mataiWhetuContent.HeaderSection?.EnglishTitle ||
        defaultContent.HeaderSection?.EnglishTitle,
      BackgroundHeaderImage: transformImage(
        mataiWhetuContent.HeaderSection?.BackgroundHeaderImage
      ),
    },
    Content: mataiWhetuContent.Content || defaultContent.Content,
    Tikanga: mataiWhetuContent.Tikanga || null,
  };

  return transformed;
}

/**
 * Transform fishing permit page data
 * @param {Object} fishingPermitContent - Raw fishing permit data from Strapi
 * @param {Object} defaultContent - Default content for fallback
 * @returns {Object} Transformed fishing permit data
 */
function transformFishingPermitData(fishingPermitContent, defaultContent) {
  const transformed = {
    HeaderSection: {
      TeReoTitle:
        fishingPermitContent.HeaderSection?.TeReoTitle ||
        defaultContent.HeaderSection?.TeReoTitle,
      EnglishTitle:
        fishingPermitContent.HeaderSection?.EnglishTitle ||
        defaultContent.HeaderSection?.EnglishTitle,
      BackgroundHeaderImage: transformImage(
        fishingPermitContent.HeaderSection?.BackgroundHeaderImage
      ),
    },
    Content: fishingPermitContent.Content || defaultContent.Content,
  };

  return transformed;
}

/**
 * Transform register page data
 * @param {Object} registerContent - Raw register data from Strapi
 * @param {Object} defaultContent - Default content for fallback
 * @returns {Object} Transformed register data
 */
function transformRegisterData(registerContent, defaultContent) {
  const transformed = {
    HeaderSection: {
      TeReoTitle:
        registerContent.HeaderSection?.TeReoTitle ||
        defaultContent.HeaderSection?.TeReoTitle,
      EnglishTitle:
        registerContent.HeaderSection?.EnglishTitle ||
        defaultContent.HeaderSection?.EnglishTitle,
      BackgroundHeaderImage: transformImage(
        registerContent.HeaderSection?.BackgroundHeaderImage
      ),
    },
    Content: registerContent.Content || defaultContent.Content,
    PostInfo: registerContent.PostInfo || defaultContent.PostInfo,
  };

  return transformed;
}

/**
 * Transform documents page data (specific handling for HeaderSection and Documentation)
 * @param {Object} documentsContent - Raw documents data from Strapi
 * @param {Object} defaultContent - Default content for fallback
 * @returns {Object} Transformed documents data
 */
function transformDocumentsData(documentsContent, defaultContent) {
  // Transform documentation files and organize by category
  const transformedDocumentation = Array.isArray(documentsContent.Documentation)
    ? documentsContent.Documentation.map((doc) => {
        const transformedDoc = {
          id: doc.id,
          name: doc.name,
          url: strapiImage(doc.url),
          alternativeText: doc.alternativeText,
          size: doc.size,
          ext: doc.ext,
          mime: doc.mime,
        };

        // Parse category from filename using " _ " separator
        if (doc.name && doc.name.includes(" _ ")) {
          const parts = doc.name.split(" _ ");
          transformedDoc.displayName = parts[0].trim(); // Left side is display name
          transformedDoc.category = parts[1].trim().replace(/\.[^/.]+$/, ""); // Right side is category (remove extension)
        } else {
          transformedDoc.displayName =
            doc.name?.replace(/\.[^/.]+$/, "") || "Untitled"; // Remove extension
          transformedDoc.category = "Uncategorized";
        }

        return transformedDoc;
      })
    : [];

  const transformed = {
    HeaderSection: {
      TeReoTitle:
        documentsContent.HeaderSection?.TeReoTitle ||
        defaultContent.HeaderSection?.TeReoTitle,
      EnglishTitle:
        documentsContent.HeaderSection?.EnglishTitle ||
        defaultContent.HeaderSection?.EnglishTitle,
      BackgroundHeaderImage: transformImage(
        documentsContent.HeaderSection?.BackgroundHeaderImage
      ),
    },
    Documentation: transformedDocumentation,
  };

  return transformed;
}

/**
 * Transform footer data
 * @param {Object} footerContent - Raw footer data from Strapi
 * @param {Object} defaultContent - Default footer content for fallback
 * @returns {Object} Transformed footer data
 */
function transformFooterData(footerContent, defaultContent) {
  const transformed = {
    FooterColumn: [],
    Copyright: "",
  };

  // Handle FooterColumn (singular from Strapi)
  if (
    footerContent?.FooterColumn &&
    Array.isArray(footerContent.FooterColumn)
  ) {
    transformed.FooterColumn = footerContent.FooterColumn.map((column) => ({
      ContentTItle: column.ContentTItle || "",
      Content:
        column.Content && Array.isArray(column.Content)
          ? column.Content.map((contentItem) => ({
              ContentText: contentItem.ContentText || "",
            }))
          : [],
    }));
  } else {
    // Fallback to default content
    transformed.FooterColumn = defaultContent.FooterColumn || [];
  }

  // Handle Copyright
  transformed.Copyright =
    footerContent?.Copyright || defaultContent?.Copyright || "";

  return transformed;
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
