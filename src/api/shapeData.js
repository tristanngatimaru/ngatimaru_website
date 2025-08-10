import { STRAPI_URL } from "./config";

function getImageUrl(media) {
  if (!media) return "";
  if (media.data) media = media.data; // unwrap
  if (Array.isArray(media)) {
    return media.map((m) => getImageUrl(m));
  }
  return media?.attributes?.url
    ? STRAPI_URL.replace("/api", "") + media.attributes.url
    : "";
}

export function shapeData(raw) {
  if (!raw) return {};
  const attrs = raw.attributes || raw;

  const shaped = {};

  for (const [key, value] of Object.entries(attrs)) {
    if (value && typeof value === "object") {
      // Media fields
      if (value.data && value.data.attributes?.url) {
        shaped[key] = getImageUrl(value);
      }
      // Nested object or relation
      else {
        shaped[key] = shapeData(value);
      }
    } else {
      shaped[key] = value;
    }
  }

  return shaped;
}
