import Coromandel from "../../assets/images/headerimages/coromandel top.png";
import BeachIsland from "../../assets/images/headerimages/beachIsland.png";
import CarvingUpClose from "../../assets/images/headerimages/carvingcloseup.png";
import Korowai from "../../assets/images/headerimages/korowai.png";
import MataiWhetu from "../../assets/images/headerimages/matai whetu.png";
import Mihi from "../../assets/images/headerimages/mihi background.png";
import Pohutakawa from "../../assets/images/headerimages/pohutakawaflowers.png";
import Shells from "../../assets/images/headerimages/shells on a beach.png";
import VeryCloseCarving from "../../assets/images/headerimages/veryclosecarving.png";
import BlackArrow from "../../assets/images/icons/arrow_black.png";
import Arrow from "../../assets/images/icons/arrow.png";
import Download from "../../assets/images/icons/download.png";
import Paul from "../../assets/images/aboutus/paulmajourey.png";
import David from "../../assets/images/aboutus/davidtaipari.png";
import Waati from "../../assets/images/aboutus/waatingamani.png";

// all png images that are not in wordpress for a blog post is held here, to change the image background of headers etc, locate the name of the file that looks like fits with
//what coresponds to the image you want to change, then only change the file path of that image which is found above
//adding in more images rather than changing them are more involved and best asked by either chatgpt or the corresponding IT developer to look into this.

const Images = {
  Coromandel: Coromandel,
  BeachIsland: BeachIsland,
  CarvingUpClose: CarvingUpClose,
  Korowai: Korowai,
  MataiWhetu: MataiWhetu,
  Mihi: Mihi,
  Pohutakawa: Pohutakawa,
  Shells: Shells,
  VeryCloseCarving: VeryCloseCarving,
};

const Icons = {
  BlackArrow: BlackArrow,
  Arrow: Arrow,
  Download: Download,
};

const Cards = {
  Paul: Paul,
  Waati: Waati,
  David: David,
};
export { Images, Icons, Cards };
