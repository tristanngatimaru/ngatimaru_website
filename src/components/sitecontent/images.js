// All png images that are not in wordpress for a blog post are held here
// To change the image background of headers etc, locate the name of the file that corresponds
// to the image you want to change, then only change the file path of that image which is found above
// Adding more images rather than changing them are more involved and best asked by either ChatGPT or the corresponding IT developer

import BlackArrow from "../../assets/images/icons/arrow_black.png";
import Arrow from "../../assets/images/icons/arrow.png";
import Download from "../../assets/images/icons/download.png";

const Images = {
  Coromandel: "no image",
  BeachIsland: "",
  CarvingUpClose: "CarvingUpClose",
  Korowai: "",
  MataiWhetu: "MataiWhetu",
  Mihi: "not found",
  Pohutakawa: "Pohutakawa",
  Shells: "not found",
  VeryCloseCarving: "not found",
};

const Icons = {
  BlackArrow: BlackArrow,
  Arrow: Arrow,
  Download: Download,
};

const Cards = {
  Paul: "Paul",
  Waati: "Waati",
  David: "David",
};

export { Images, Icons, Cards };
