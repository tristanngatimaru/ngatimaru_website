import HamburgerNav from "./hamburgerNav";
import Navbar from "./navbar";
import Header from "../assets/images/headerimages/carvingcloseup.png";
// src/pages/about.jsx
function About() {
  return (
    <div className="w-full">
      <HamburgerNav />

      <div>
        <img
          src={Header}
          alt=""
          className="w-full h-[500px] object-center object-cover overflow-hidden"
        />
      </div>

      <div className="absolute top-0 left-0 w-full z-50 pt-10">
        <Navbar />
      </div>
    </div>
  );
}
export default About;
