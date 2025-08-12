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
 * Default content to use when Strapi data is not available
 */
const defaultContent = {
  home: {
    HeaderSection: {
      TeReoTitle: "[Strapi Error: HeaderSection.TeReoTitle]",
      EnglishTitle: "[Strapi Error: HeaderSection.EnglishTitle]",
      BackgroundHeaderImage: {
        url: null,
        alternativeText: "[Strapi Error: HeaderSection.BackgroundHeaderImage]",
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
  about: {
    HeaderSection: {
      TeReoTitle: "[Strapi Error: About.HeaderSection.TeReoTitle]",
      EnglishTitle: "[Strapi Error: About.HeaderSection.EnglishTitle]",
      BackgroundHeaderImage: {
        url: null,
        alternativeText:
          "[Strapi Error: About.HeaderSection.BackgroundHeaderImage]",
      },
    },
    Content: [
      {
        Title: "[Strapi Error: About.Content.Title]",
        Description: "[Strapi Error: About.Content.Description]",
        Image: {
          url: null,
          alternativeText: "[Strapi Error: About.Content.Image]",
        },
      },
    ],
  },
};

/**
 * Gets the home page content
 * @returns {Promise<Object>} The home page content
 */
export async function getHomeContent() {
  const allContent = await loadSiteContent();
  return allContent.home;
}

/**
 * Gets the about page content
 * @returns {Promise<Object>} The about page content
 */
export async function getAboutContent() {
  const allContent = await loadSiteContent();
  return allContent.about;
}

/**
 * Loads site content from Strapi
 * @returns {Promise<Object>} An object containing all site content
 */
export async function loadSiteContent() {
  try {
    console.log("🔄 Fetching home data from Strapi...");

    // Log the API URL and token presence
    console.log("🌐 API URL:", import.meta.env.VITE_STRAPI_API_URL);
    console.log(
      "🔑 API Token present:",
      !!import.meta.env.VITE_STRAPI_API_TOKEN
    );

    const [homeData, aboutData] = await Promise.all([
      fetchContentType(
        "home",
        {
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
        },
        true
      ),
      fetchContentType(
        "about",
        {
          populate: {
            HeaderSection: {
              populate: {
                BackgroundHeaderImage: true,
              },
            },
            Content: {
              populate: {
                Image: true,
              },
            },
          },
        },
        true
      ),
    ]);

    console.log("📥 Raw home data structure:", {
      hasHeaderSection: !!homeData?.HeaderSection,
      headerSectionFields: homeData?.HeaderSection
        ? Object.keys(homeData.HeaderSection)
        : [],
      hasMihiSection: !!homeData?.MihiSection,
      mihiSectionFields: homeData?.MihiSection
        ? Object.keys(homeData.MihiSection)
        : [],
      hasButton: !!homeData?.Button,
      buttonFields: homeData?.Button ? Object.keys(homeData.Button) : [],
    });

    console.log("📥 Raw home data:", JSON.stringify(homeData, null, 2));

    if (!homeData) {
      console.warn("⚠️ No home data received from Strapi, using defaults");
      return defaultContent;
    }

    // Validate required fields and log missing ones
    const requiredFields = {
      HeaderSection: ["TeReoTitle", "EnglishTitle", "BackgroundHeaderImage"],
      MihiSection: ["Title", "MihiShortened", "FullMihi", "Image"],
      Button: ["EnglishLabel", "TeReoLabel", "href"],
    };

    Object.entries(requiredFields).forEach(([section, fields]) => {
      fields.forEach((field) => {
        if (!homeData[section]?.[field]) {
          console.warn(`⚠️ Missing required field: ${section}.${field}`);
        }
      });
    });

    // Extract data from potentially nested Strapi response
    const extractField = (section, field) => {
      // Try different possible paths in the Strapi response
      return (
        section?.[field] || // Direct access
        section?.attributes?.[field] || // Strapi v4 format
        section?.data?.attributes?.[field]
      ); // Nested Strapi v4 format
    };

    const extractButton = (button) => {
      if (!button) return null;

      console.log(
        "🔍 Extracting button from:",
        JSON.stringify(button, null, 2)
      );

      // Handle both direct and Strapi v4 attribute format
      const data = button.attributes || button;

      console.log(
        "📦 Button data after attribute extraction:",
        JSON.stringify(data, null, 2)
      );

      const result = {
        EnglishLabel:
          data.EnglishLabel || defaultContent.home.Button[0].EnglishLabel,
        TeReoLabel: data.TeReoLabel || defaultContent.home.Button[0].TeReoLabel,
        href: data.href || defaultContent.home.Button[0].href,
      };

      console.log(
        "🎯 Extracted button result:",
        JSON.stringify(result, null, 2)
      );

      return result;
    };

    // Transform the home data
    const transformedHome = {
      HeaderSection: (() => {
        console.log(
          "🖼️ Raw HeaderSection data:",
          JSON.stringify(homeData.HeaderSection, null, 2)
        );
        console.log(
          "🖼️ BackgroundHeaderImage data:",
          JSON.stringify(homeData.HeaderSection?.BackgroundHeaderImage, null, 2)
        );

        return {
          TeReoTitle:
            extractField(homeData.HeaderSection, "TeReoTitle") ||
            defaultContent.home.HeaderSection.TeReoTitle,
          EnglishTitle:
            extractField(homeData.HeaderSection, "EnglishTitle") ||
            defaultContent.home.HeaderSection.EnglishTitle,
          BackgroundHeaderImage: transformImage(
            homeData.HeaderSection?.BackgroundHeaderImage ||
              homeData.HeaderSection?.data?.BackgroundHeaderImage
          ),
        };
      })(),
      MihiSection: {
        Title:
          extractField(homeData.MihiSection, "Title") ||
          defaultContent.home.MihiSection.Title,
        MihiShortened:
          extractField(homeData.MihiSection, "MihiShortened") ||
          defaultContent.home.MihiSection.MihiShortened,
        FullMihi:
          extractField(homeData.MihiSection, "FullMihi") ||
          defaultContent.home.MihiSection.FullMihi,
        Image: transformImage(
          homeData.MihiSection?.Image || homeData.MihiSection?.data?.Image
        ),
      },
      Button: (() => {
        console.log(
          "🔵 Button data from Strapi:",
          JSON.stringify(homeData.Button, null, 2)
        );

        if (Array.isArray(homeData.Button)) {
          console.log("📋 Found Button array directly");
          return homeData.Button.map(extractButton);
        }

        if (homeData.Button?.data) {
          console.log(
            "📋 Found Button data property:",
            JSON.stringify(homeData.Button.data, null, 2)
          );
          if (Array.isArray(homeData.Button.data)) {
            console.log("📋 Button data is an array");
            return homeData.Button.data.map(extractButton);
          }
          console.log("📋 Button data is a single object");
          return [extractButton(homeData.Button.data)];
        }

        if (homeData.Button) {
          console.log("📋 Found Button as single object");
          return [extractButton(homeData.Button)];
        }

        console.log("⚠️ No valid Button data found, using default");
        return defaultContent.home.Button;
      })(),
    };

    console.log(
      "✅ Transformed home data:",
      JSON.stringify(transformedHome, null, 2)
    );

    // Log what sections are using default values
    Object.entries(transformedHome).forEach(([section, content]) => {
      Object.entries(content).forEach(([key, value]) => {
        if (value === defaultContent.home[section][key]) {
          console.warn(`⚠️ Using default value for: ${section}.${key}`);
        }
      });
    });

    const transformedAbout = aboutData
      ? {
          HeaderSection: {
            TeReoTitle:
              extractField(aboutData.HeaderSection, "TeReoTitle") ||
              defaultContent.about.HeaderSection.TeReoTitle,
            EnglishTitle:
              extractField(aboutData.HeaderSection, "EnglishTitle") ||
              defaultContent.about.HeaderSection.EnglishTitle,
            BackgroundHeaderImage: transformImage(
              aboutData.HeaderSection?.BackgroundHeaderImage ||
                aboutData.HeaderSection?.data?.BackgroundHeaderImage
            ),
          },
          Content: Array.isArray(aboutData.Content)
            ? aboutData.Content.map((section) => ({
                Title: section.Title || defaultContent.about.Content[0].Title,
                Description:
                  section.Description ||
                  defaultContent.about.Content[0].Description,
                Image: transformImage(section.Image),
              }))
            : defaultContent.about.Content,
        }
      : defaultContent.about;

    return {
      home: transformedHome,
      about: transformedAbout,
      bookingMataiWhetu: null,
      fishingPermit: null,
      documents: null,
      store: null,
      register: null,
    };
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
    return defaultContent;
  }
}
