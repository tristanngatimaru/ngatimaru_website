// Dynamic image loader for better performance
const imageCache = new Map();

/**
 * Dynamically imports an image only when needed
 * @param {string} imageName - Name of the image file
 * @param {string} folder - Folder path (headerimages, icons, aboutus)
 * @returns {Promise<string>} Image URL
 */
async function loadImage(imageName, folder) {
  const cacheKey = `${folder}/${imageName}`;

  if (imageCache.has(cacheKey)) {
    return imageCache.get(cacheKey);
  }

  try {
    const imageModule = await import(
      `../../assets/images/${folder}/${imageName}`
    );
    const imageUrl = imageModule.default;
    imageCache.set(cacheKey, imageUrl);
    return imageUrl;
  } catch {
    console.warn(`Failed to load image: ${folder}/${imageName}`);
    return null;
  }
}

// Lazy loading image objects
const Images = {
  async Coromandel() {
    return await loadImage("coromandel top.png", "headerimages");
  },
  async BeachIsland() {
    return await loadImage("beachIsland.png", "headerimages");
  },
  async CarvingUpClose() {
    return await loadImage("carvingcloseup.png", "headerimages");
  },
  async Korowai() {
    return await loadImage("korowai.png", "headerimages");
  },
  async MataiWhetu() {
    return await loadImage("matai whetu.png", "headerimages");
  },
  async Mihi() {
    return await loadImage("mihi background.png", "headerimages");
  },
  async Pohutakawa() {
    return await loadImage("pohutakawaflowers.png", "headerimages");
  },
  async Shells() {
    return await loadImage("shells on a beach.png", "headerimages");
  },
  async VeryCloseCarving() {
    return await loadImage("veryclosecarving.png", "headerimages");
  },
};

const Icons = {
  async BlackArrow() {
    return await loadImage("arrow_black.png", "icons");
  },
  async Arrow() {
    return await loadImage("arrow.png", "icons");
  },
  async Download() {
    return await loadImage("download.png", "icons");
  },
};

const Cards = {
  async Paul() {
    return await loadImage("paulmajourey.png", "aboutus");
  },
  async David() {
    return await loadImage("davidtaipari.png", "aboutus");
  },
  async Waati() {
    return await loadImage("waatingamani.png", "aboutus");
  },
};

export { Images, Icons, Cards };
