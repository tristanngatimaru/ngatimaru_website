const STRAPI_URL = "http://localhost:1337";

function getImageUrl(media) {
  return media?.url ? STRAPI_URL + media.url : "";
}

export function shapePostData(post) {
  // no longer destructure post.attributes
  return {
    id: post.id,
    title: post.Title || post.title || "No Title",
    excerpt: post.Excerpt || post.excerpt || "",
    content: post.Content || "",
    eventDate: post.EventDate || "",
    author: post.Author || "Unknown",
    heroMainImage: getImageUrl(post.HeroMainImage),
    secondaryImage: getImageUrl(post.SecondaryImage),
    thirdImage: getImageUrl(post.ThirdImage),
    extraMedia: (post.ExtraMediaContent?.data || []).map(
      (media) => STRAPI_URL + media.attributes.url
    ),
    publishedAt: post.publishedAt,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
  };
}
