// ✅ Import the base Strapi URL (e.g., http://localhost:1337) from a shared config file
import { STRAPI_URL } from "./config";

/**
 * ✅ Helper function to build a populate query string for Strapi
 *
 * ⚙️ Strapi uses the `populate` query param to include related fields like images, components, etc.
 *    This function dynamically builds that string for any number of fields.
 *
 * Example:
 *   buildPopulate(['image', 'author']) -> "?populate[image]=true&populate[author]=true"
 *
 * @param {string[]} fields - Array of field names you want to populate from Strapi.
 * @returns {string} - URL query string for populating fields.
 */
function buildPopulate(fields) {
  const params = new URLSearchParams(); // A built-in way to build query strings
  fields.forEach((field) => {
    params.set(`populate[${field}]`, "true");
  });
  return `?${params.toString()}`;
}

/**
 * ✅ Fetches a collection (like blog-posts, events, etc.) from Strapi.
 *
 * ⚙️ Accepts any collection type and an optional list of fields to populate.
 *    For example: fetchCollection('blog-posts', ['heroImage', 'author'])
 *
 * @param {string} type - The collection name in Strapi (e.g., 'blog-posts').
 * @param {string[]} fields - Fields to populate from relationships/media.
 * @returns {Promise<Array>} - An array of collection items.
 */
export async function fetchCollection(type, fields = []) {
  const url = `${STRAPI_URL}/api/${type}${buildPopulate(fields)}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to fetch ${type}: ${res.statusText}`);
  }

  const json = await res.json();
  return json.data; // Always comes in a `.data` array in Strapi v4
}

/**
 * ✅ Fetch a specific blog post by ID using Strapi’s filtering system.
 *
 * ⚙️ Uses the `filters[id][$eq]=` format to get an item with a matching ID.
 *    populate=* ensures all nested data is returned.
 *
 * @param {string|number} id - The blog post ID
 * @returns {Promise<Object>} - The blog post object (just one item)
 */
export async function fetchPostById(id) {
  const url = `${STRAPI_URL}/api/blog-posts?filters[id][$eq]=${id}&populate=*`;
  const res = await fetch(url);

  if (!res.ok) throw new Error(`Failed to fetch post with id ${id}`);

  const json = await res.json();

  if (json.data.length === 0) throw new Error(`No post found with id ${id}`);

  return json.data[0]; // Get the first (and only) result
}

/**
 * ✅ Fetch and group PDF documents stored in a single-type called "document-page"
 *
 * ⚙️ Assumes `document-page` is a single-type with a repeatable component or relation field called `Documentation`
 *    - Each doc item has a `name` (e.g. "Whānau Hui _ Meetings.pdf")
 *    - This splits the name into category & clean title
 *
 * 🧠 This function restructures them into a grouped object like:
 *    {
 *      "Meetings": [ { id, name, url } ],
 *      "Agendas": [ { id, name, url } ]
 *    }
 *
 * @returns {Promise<Object>} - Grouped document object, or {} if error.
 */
export async function fetchGroupedDocuments() {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/document-page?populate=Documentation`
    );
    const data = await res.json();

    const rawData = data.data;

    // ✅ Validate that Documentation is an array
    if (!rawData || !Array.isArray(rawData.Documentation)) {
      console.error("Invalid documentation data");
      return {};
    }

    const docs = rawData.Documentation.map((doc) => {
      let category = "Uncategorized";

      // 🧠 Split based on the " _ " delimiter. E.g., "Hui Plan _ Planning.pdf"
      const splitName = doc.name.split(" _ ");

      if (splitName.length > 1) {
        category = splitName[1].trim().replace(/\.pdf$/i, ""); // Remove .pdf if it's there
      }

      // Get clean name (remove extension)
      const rawName = splitName[0].trim();
      const nameWithoutExt = rawName.replace(/\.pdf$/i, "");

      return {
        id: doc.id,
        name: nameWithoutExt,
        url: doc.url ? `${STRAPI_URL}${doc.url}` : null,
        category,
      };
    });

    // ✅ Group by category
    const grouped = docs.reduce((acc, doc) => {
      if (!doc.url) return acc; // Skip if there's no URL

      if (!acc[doc.category]) acc[doc.category] = [];

      acc[doc.category].push(doc);
      return acc;
    }, {}); // Start with an empty object

    return grouped;
  } catch (err) {
    console.error("Error fetching documents:", err);
    return {};
  }
}
