import { STRAPI_URL } from "./config";

fetch`(${STRAPI_URL}/data)`
  .then((response) => response.json()) // Parse the response as JSON
  .then((data) => {
    // Do something with the data
    console.log(data);
  })
  .catch((error) => {
    // Handle any errors
    console.error("Error:", error);
  });
