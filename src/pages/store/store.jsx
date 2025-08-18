import HamburgerNav from "./hamburgerNav";
import Navbar from "./navbar";
// Removed static Header import - all images should be dynamic from Strapi
// src/pages/about.jsx
function About() {
  return (
    <div className="w-full">
      <HamburgerNav />

      <div>
        <div className="w-full h-[500px] bg-gray-200 flex items-center justify-center">
          {/* TODO: Load store header image dynamically from Strapi */}
          <p className="text-gray-600">Store Header Image</p>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-full z-50 pt-10">
        <Navbar />
      </div>
    </div>
  );
}
export default About;
