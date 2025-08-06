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
