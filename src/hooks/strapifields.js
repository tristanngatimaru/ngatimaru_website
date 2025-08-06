import { STRAPI_URL } from "../api/config";

function getImageUrl(mediaAttributes) {
  return mediaAttributes?.url ? STRAPI_URL + mediaAttributes.url : "";
}

export async function fetchPostById(id) {
  const url = `${STRAPI_URL}/api/blog-posts/${id}?populate=*`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch post with id ${id}`);
  const json = await res.json();
  if (!json.data) throw new Error(`No post found with id ${id}`);
  return json.data;
}

export function shapePostData(post) {
  const attrs = post.attributes || post;

  console.log("Raw ExtraMediaContent:", attrs.ExtraMediaContent);
  console.log("Raw ExtraMediaContent.data:", attrs.ExtraMediaContent?.data);

  return {
    id: post.id,
    title: attrs.Title || attrs.title || "No Title",
    excerptOne: attrs.ExcerptOne || "",
    excerptTwo: attrs.ExcerptTwo || "",
    contentPartOne: attrs.ContentPartOne || "",
    contentPartTwo: attrs.ContentPartTwo || "",
    contentPartThree: attrs.ContentPartThree || "",
    eventDate: attrs.EventDate || "",
    author: attrs.Author || "Unknown",
    heroMainImage: getImageUrl(attrs.HeroMainImage),
    secondaryImage: getImageUrl(attrs.SecondaryImage),
    thirdImage: getImageUrl(attrs.ThirdImage),
    extraMediaContent: Array.isArray(attrs.ExtraMediaContent)
      ? attrs.ExtraMediaContent.map((img) => getImageUrl(img))
      : "",

    publishedAt: post.publishedAt,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
  };
}
