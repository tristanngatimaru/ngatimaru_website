import AppearRefresh from "./appearrefresh"; // adjust path as needed
import Navbar from "./navbar";
import HamburgerNav from "./hamburgerNav";

const HeroHeader = ({ image, title, subtitle }) => {
  return (
    <div className="relative">
      <HamburgerNav />

      <img
        src={image}
        alt=""
        className="w-full h-[500px] object-center object-cover overflow-hidden"
      />

      <div className="absolute flex flex-col w-full top-1/4 pt-20">
        <div className="overflow-hidden h-[80px] w-full flex justify-center">
          <AppearRefresh delay={2000}>
            <div className="uppercase transition-all duration-1000 ease-in-out text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-roboto-thin text-white text-center">
              {title}
            </div>
          </AppearRefresh>
        </div>

        <div className="overflow-hidden h-[80px] w-full flex justify-center">
          <AppearRefresh delay={2500}>
            <div className="uppercase transition-all duration-1000 ease-in-out text-xl sm:text-2xl md:text-3xl lg:text-4xl font-roboto-thin text-white text-center">
              {subtitle}
            </div>
          </AppearRefresh>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-full z-50 pt-10">
        <Navbar />
      </div>
    </div>
  );
};

export default HeroHeader;
