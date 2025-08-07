import { STRAPI_URL } from "./config";

function buildPopulate(fields) {
  const params = new URLSearchParams();
  fields.forEach((field) => {
    params.set(`populate[${field}]`, "true");
  });
  return `?${params.toString()}`;
}

export async function fetchCollection(type, fields = []) {
  const url = `${STRAPI_URL}/api/${type}${buildPopulate(fields)}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${type}: ${res.statusText}`);
  }
  const json = await res.json();
  return json.data;
}

export async function fetchPostById(id) {
  const url = `${STRAPI_URL}/api/blog-posts?filters[id][$eq]=${id}&populate=*`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch post with id ${id}`);
  const json = await res.json();
  if (json.data.length === 0) throw new Error(`No post found with id ${id}`);
  return json.data[0];
}

// strapi.js

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
