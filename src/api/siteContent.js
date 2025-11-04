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
 * Universal page configuration for Strapi content types
 */
export const PAGE_CONFIGS = {
  mataiWhetu: {
    contentType: "matai-whetu-page",
    populate: {
      HeaderSection: {
        populate: {
          BackgroundHeaderImage: {
            fields: ["url", "alternativeText"],
          },
        },
        fields: ["TeReoTitle", "EnglishTitle"],
      },
      Tikanga: true,
    },
  },

  fishingPermit: {
    contentType: "fishing-permit",
    populate: {
      HeaderSection: {
        populate: {
          BackgroundHeaderImage: {
            fields: ["url", "alternativeText"],
          },
        },
        fields: ["TeReoTitle", "EnglishTitle"],
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
        populate: {
          BackgroundHeaderImage: {
            fields: ["url", "alternativeText"],
          },
        },
        fields: ["TeReoTitle", "EnglishTitle"],
      },
      FaceCard: {
        populate: {
          Image: {
            fields: ["url", "alternativeText"],
          },
        },
        fields: ["Name", "Detail"],
      },
      SidePanelImageOne: {
        fields: ["url", "alternativeText"],
      },
      SidePanelImageTwo: {
        fields: ["url", "alternativeText"],
      },
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
          BackgroundHeaderImage: {
            fields: ["url", "alternativeText"],
          },
        },
        fields: ["TeReoTitle", "EnglishTitle"],
      },
      Documentation: {
        fields: ["name", "url", "size", "ext", "mime"], // Only essential file data
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
        populate: {
          BackgroundHeaderImage: {
            fields: ["url", "alternativeText"],
          },
        },
        fields: ["TeReoTitle", "EnglishTitle"],
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
 * Gets the home page content (optimized to load only home page)
 * @returns {Promise<Object>} The home page content
 */
export async function getHomeContent() {
  try {
    const config = PAGE_CONFIGS["home"];
    if (!config) {
      return {};
    }

    // Step 2: Optimized populate - only load what's immediately needed for first render
    const optimizedPopulate = {
      HeaderSection: {
        populate: {
          BackgroundHeaderImage: {
            fields: ["url", "alternativeText"], // Only essential fields
          },
        },
        fields: ["TeReoTitle", "EnglishTitle"], // Only text fields needed
      },
      MihiSection: {
        populate: {
          Image: {
            fields: ["url", "alternativeText"], // Only essential fields
          },
        },
        fields: ["Title", "MihiShortened", "FullMihi"], // Only text fields needed
      },
      Button: {
        fields: ["EnglishLabel", "TeReoLabel", "href"], // Only essential fields
      },
    };

    // Step 3: Fetch with timeout and retry logic
    const result = await Promise.race([
      fetchContentType(
        config.contentType,
        { populate: optimizedPopulate },
        true
      ),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("API timeout after 5 seconds")), 5000)
      ),
    ]);

    // Step 4: Transform the data
    const homeContent = transformHomeData(result, config.defaultContent);

    return homeContent;
  } catch {
    // Return default content for better user experience
    const defaultContent = PAGE_CONFIGS["home"]?.defaultContent || {};
    return defaultContent;
  }
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
export function transformPageData(pageName, rawData) {
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
        // Using default content
      }

      allContent[pageName] = transformPageData(pageName, rawData);
    });

    return allContent;
  } catch {
    // Error loading content, using defaults

    // Return default content for all pages
    const fallbackContent = {};
    Object.keys(PAGE_CONFIGS).forEach((pageName) => {
      fallbackContent[pageName] = PAGE_CONFIGS[pageName].defaultContent;
    });
    return fallbackContent;
  }
}
