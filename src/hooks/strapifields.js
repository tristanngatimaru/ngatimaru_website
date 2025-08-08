// Import the base URL of your Strapi backend from a config file.
// STRAPI_URL should look something like: "http://localhost:1337" or your deployed Strapi instance.
import { STRAPI_URL } from "../api/config";

/**
 * Helper function to generate the full image URL from a media attribute object.
 * Strapi media objects store relative URLs like "/uploads/image.jpg", so we need to add the STRAPI_URL in front.
 *
 * @param {object} mediaAttributes - The media object returned from Strapi.
 * @returns {string} - The full image URL or an empty string if no valid image found.
 */
function getImageUrl(mediaAttributes) {
  return mediaAttributes?.url ? STRAPI_URL + mediaAttributes.url : "";
}

/**
 * Fetches a single blog post from Strapi using its ID.
 *
 * @param {string|number} id - The ID of the blog post to fetch.
 * @returns {Promise<object>} - The blog post data from Strapi, or throws an error if not found or fails.
 */
export async function fetchPostById(id) {
  // We use populate=* to include all related fields (like images, relations, etc.)
  const url = `${STRAPI_URL}/api/blog-posts/${id}?populate=*`;

  // Make the API request to Strapi
  const res = await fetch(url);

  // Check if the request was successful
  if (!res.ok) throw new Error(`Failed to fetch post with id ${id}`);

  // Parse the response body as JSON
  const json = await res.json();

  // If the post doesn't exist, throw a specific error
  if (!json.data) throw new Error(`No post found with id ${id}`);

  // Return the data object which contains the post attributes
  return json.data;
}

/**
 * Takes raw post data from Strapi and restructures it into a shape your front-end expects.
 * This is important to simplify usage in your components, and avoid repeated data transformation logic there.
 *
 * @param {object} post - The raw blog post object from Strapi.
 * @returns {object} - A cleaned-up and reshaped blog post object.
 */
export function shapePostData(post) {
  // Strapi returns attributes inside a nested object: { id, attributes: { Title, Author, etc. } }
  // In some cases you might pass just attributes, so we fallback with `|| post`
  const attrs = post.attributes || post;

  // Debug logging to understand how ExtraMediaContent looks in raw form
  console.log("Raw ExtraMediaContent:", attrs.ExtraMediaContent);
  console.log("Raw ExtraMediaContent.data:", attrs.ExtraMediaContent?.data);

  return {
    // Basic metadata
    id: post.id,

    // Titles and excerpts
    title: attrs.Title || attrs.title || "No Title", // fallback if "Title" uses different casing
    excerptOne: attrs.ExcerptOne || "",
    excerptTwo: attrs.ExcerptTwo || "",

    // Main content blocks
    contentPartOne: attrs.ContentPartOne || "",
    contentPartTwo: attrs.ContentPartTwo || "",
    contentPartThree: attrs.ContentPartThree || "",

    // Custom fields from Strapi (dates, authors, etc.)
    eventDate: attrs.EventDate || "",
    author: attrs.Author || "Unknown",

    // Images — we use the getImageUrl helper to attach the full URL
    heroMainImage: getImageUrl(attrs.HeroMainImage),
    secondaryImage: getImageUrl(attrs.SecondaryImage),
    thirdImage: getImageUrl(attrs.ThirdImage),

    // Extra media content (array of images)
    // Sometimes Strapi wraps these in `.data`, other times it's a direct array — so you’ll want to adapt this
    extraMediaContent: Array.isArray(attrs.ExtraMediaContent)
      ? attrs.ExtraMediaContent.map((img) => getImageUrl(img))
      : "",

    // Timestamps for display or debugging
    publishedAt: post.publishedAt,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
  };
}
