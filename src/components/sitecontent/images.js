// Lazy loading image objects with direct dynamic imports
const Images = {
  async Coromandel() {
    const module = await import("../../assets/images/headerimages/coromandel top.png");
    return module.default;
  },
  async BeachIsland() {
    const module = await import("../../assets/images/headerimages/beachIsland.png");
    return module.default;
  },
  async CarvingUpClose() {
    const module = await import("../../assets/images/headerimages/carvingcloseup.png");
    return module.default;
  },
  async Korowai() {
    const module = await import("../../assets/images/headerimages/korowai.png");
    return module.default;
  },
  async MataiWhetu() {
    const module = await import("../../assets/images/headerimages/matai whetu.png");
    return module.default;
  },
  async Mihi() {
    const module = await import("../../assets/images/headerimages/mihi background.png");
    return module.default;
  },
  async Pohutakawa() {
    const module = await import("../../assets/images/headerimages/pohutakawaflowers.png");
    return module.default;
  },
  async Shells() {
    const module = await import("../../assets/images/headerimages/shells on a beach.png");
    return module.default;
  },
  async VeryCloseCarving() {
    const module = await import("../../assets/images/headerimages/veryclosecarving.png");
    return module.default;
  },
};

const Icons = {
  async BlackArrow() {
    const module = await import("../../assets/images/icons/arrow_black.png");
    return module.default;
  },
  async Arrow() {
    const module = await import("../../assets/images/icons/arrow.png");
    return module.default;
  },
  async Download() {
    const module = await import("../../assets/images/icons/download.png");
    return module.default;
  },
};

const Cards = {
  async Paul() {
    const module = await import("../../assets/images/aboutus/paulmajourey.png");
    return module.default;
  },
  async David() {
    const module = await import("../../assets/images/aboutus/davidtaipari.png");
    return module.default;
  },
  async Waati() {
    const module = await import("../../assets/images/aboutus/waatingamani.png");
    return module.default;
  },
};

export { Images, Icons, Cards };
