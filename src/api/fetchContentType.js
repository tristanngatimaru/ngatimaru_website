import qs from "qs";

/**
 * Fetches data for a specified Strapi content type.
 *
 * @param {string} contentType - The type of content to fetch from Strapi.
 * @param {Object} params - Query parameters to append to the API request.
 * @return {Promise<object>} The fetched data.
 */

export function spreadStrapiData(data) {
  if (Array.isArray(data.data) && data.data.length > 0) {
    return data.data[0];
  }
  if (!Array.isArray(data.data)) {
    return data.data;
  }
  return null;
}

export default async function fetchContentType(
  contentType,
  params = {},
  spreadData = false
) {
  try {
    const queryParams = { ...params };

    // Construct the full URL for the API request
    const url = new URL(
      `api/${contentType}`,
      import.meta.env.VITE_STRAPI_API_URL
    );

    // Add authorization header if token exists
    const headers = {
      "Content-Type": "application/json",
    };

    if (import.meta.env.VITE_STRAPI_API_TOKEN) {
      headers.Authorization = `Bearer ${import.meta.env.VITE_STRAPI_API_TOKEN}`;
    }

    // Perform the fetch request with the provided query parameters
    const response = await fetch(`${url.href}?${qs.stringify(queryParams)}`, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch data from Strapi (url=${url.toString()}, status=${response.status})`
      );
    }

    const jsonData = await response.json();
    return spreadData ? spreadStrapiData(jsonData) : jsonData;
  } catch (error) {
    console.error("FetchContentTypeError:", error);
    throw error; // Re-throw to handle in components
  }
}
