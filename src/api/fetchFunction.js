// strapiClient.js
import { STRAPI_URL } from "./config";

/**
 * Helper to build a populate query string for Strapi
 * Accepts array of fields and returns query params like:
 * "?populate[field1]=true&populate[field2]=true"
 */
function buildPopulate(fields) {
  if (!fields || fields.length === 0) return "";

  const params = new URLSearchParams();
  fields.forEach((field) => {
    params.set(`populate[${field}]`, "true");
  });
  return `?${params.toString()}`;
}

/**
 * Universal fetcher for Strapi endpoints with optional populate
 * @param {string} endpoint - API endpoint without /api/
 * @param {string|array} populate - "*" or array of fields
 * @returns {object|null} - fetched data or null on error
 */
export async function fetchStrapiContent(endpoint, populate = "*") {
  let url = `${STRAPI_URL}/api/${endpoint}`;

  if (populate === "*") {
    url += "?populate=*";
  } else if (Array.isArray(populate)) {
    url += buildPopulate(populate);
  }

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch: ${url}`);
    const json = await res.json();
    return json?.data || null;
  } catch (err) {
    console.error(`Error fetching ${endpoint}:`, err);
    return null;
  }
}

/**
 * Fetch a collection with populated fields
 * @param {string} type - Collection name
 * @param {string[]} fields - Fields to populate
 * @returns {array} - Array of items
 */
export async function fetchCollection(type, fields = []) {
  const url = `${STRAPI_URL}/api/${type}${buildPopulate(fields)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${type}: ${res.statusText}`);
  const json = await res.json();
  return json.data;
}

/**
 * Fetch a single blog post by ID, with all nested data populated
 * @param {string|number} id - Post ID
 * @returns {object} - Single post object
 */
export async function fetchPostById(id) {
  const url = `${STRAPI_URL}/api/blog-posts?filters[id][$eq]=${id}&populate=*`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch post with id ${id}`);
  const json = await res.json();
  if (!json.data || json.data.length === 0)
    throw new Error(`No post found with id ${id}`);
  return json.data[0];
}

/**
 * Fetch and group PDF documents from the 'document-page' single-type
 * Assumes Documentation is an array of documents with 'name' and 'url'
 * Groups documents by category parsed from the filename
 * @returns {object} - Grouped documents by category
 */
export async function fetchGroupedDocuments() {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/document-page?populate=Documentation`
    );
    const data = await res.json();

    const rawData = data.data;

    if (!rawData || !Array.isArray(rawData.Documentation)) {
      console.error("Invalid documentation data");
      return {};
    }

    const docs = rawData.Documentation.map((doc) => {
      let category = "Uncategorized";

      const splitName = doc.name.split(" _ ");
      if (splitName.length > 1) {
        category = splitName[1].trim().replace(/\.pdf$/i, "");
      }

      const rawName = splitName[0].trim();
      const nameWithoutExt = rawName.replace(/\.pdf$/i, "");

      return {
        id: doc.id,
        name: nameWithoutExt,
        url: doc.url ? `${STRAPI_URL}${doc.url}` : null,
        category,
      };
    });

    const grouped = docs.reduce((acc, doc) => {
      if (!doc.url) return acc;
      if (!acc[doc.category]) acc[doc.category] = [];
      acc[doc.category].push(doc);
      return acc;
    }, {});

    return grouped;
  } catch (err) {
    console.error("Error fetching documents:", err);
    return {};
  }
}
