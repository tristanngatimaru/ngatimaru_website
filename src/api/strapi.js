const STRAPI_URL = "http://localhost:1337";
const BlogFields = [
  "HeroMainImage",
  "SecondaryImage",
  "ThirdImage",
  "ExtraMediaContent",
];

function buildPopulate(fields) {
  const params = new URLSearchParams();
  fields.forEach((field) => {
    params.set(`populate[${field}]`, "true");
  });
  return `?${params.toString()}`;
}

export async function fetchBlogPosts() {
  const url = `${STRAPI_URL}/api/blog-posts${buildPopulate(BlogFields)}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch blog posts: ${res.statusText}`);
  }
  const json = await res.json();
  console.log("Strapi response:", json); // <-- Add this
  console.log("Strapi post raw data:", JSON.stringify(json.data[0], null, 2));

  return json.data;
}
