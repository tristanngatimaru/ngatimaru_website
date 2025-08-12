/**
 * Formats a Strapi image URL by combining it with the API URL if needed
 * @param {string} url - The image URL from Strapi
 * @returns {string} The complete image URL
 */
export function strapiImage(url) {
  if (url.startsWith("/")) {
    // Handle demo sites
    if (
      !import.meta.env.VITE_STRAPI_API_URL &&
      document?.location.host.endsWith(".strapidemo.com")
    ) {
      return `https://${document.location.host.replace("client-", "api-")}${url}`;
    }

    return import.meta.env.VITE_STRAPI_API_URL + url;
  }
  return url;
}
