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
        populate: {
          HeroMainImage: true,
          // Only populate essential fields instead of "*"
        },
        sort: ["publishedAt:desc"],
        ...params,
      },
      false
    );
    return response.data || [];
  } catch {
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
        populate: {
          HeroMainImage: true,
          SecondaryImage: true,
          ThirdImage: true,
          ExtraMediaContent: true,
          // Only populate essential fields instead of "*"
        },
      },
      true
    );
    return response || null;
  } catch {
    return null;
  }
}
