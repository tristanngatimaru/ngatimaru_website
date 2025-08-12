import fetchContentType from "./fetchContentType";

/**
 * Fetch all blog posts
 * @param {Object} params - Query parameters for filtering, pagination, etc.
 * @returns {Promise<Array>} Array of blog posts
 */
export async function getBlogPosts(params = {}) {
  try {
    const response = await fetchContentType(
      "blog-posts",
      {
        populate: "*", // This will populate all fields, including nested relations
        sort: ["publishedAt:desc"],
        ...params,
      },
      false
    );
    return response.data || [];
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

/**
 * Fetch a single blog post by slug
 * @param {string} slug - The post slug
 * @returns {Promise<Object|null>} The blog post data
 */
export async function getBlogPost(documentId) {
  try {
    const response = await fetchContentType(
      "blog-posts",
      {
        filters: {
          documentId: {
            $eq: documentId,
          },
        },
        populate: "*", // This will populate all fields, including nested relations
      },
      true
    );
    return response || null;
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}
