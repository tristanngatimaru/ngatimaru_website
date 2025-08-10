import { fetchStrapiContent } from "./fetchFunction";
import { urlLink } from "./urlLink";
import { shapeData } from "./shapeData";

export async function loadSiteContent() {
  const entries = Object.entries(urlLink);

  const results = await Promise.all(
    entries.map(([key, { endpoint, populate }]) =>
      fetchStrapiContent(endpoint, populate)
    )
  );

  const siteContent = {};
  entries.forEach(([key], idx) => {
    siteContent[key] = shapeData(results[idx]);
  });

  return siteContent;
}
