import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getNavigationData } from "../api/navigation";

export default function HamburgerNav() {
  const [expanded, setExpanded] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [buttonRotation, setButtonRotation] = useState(0);
  const [navigationItems, setNavigationItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleScrollAndResize = () => {
      const isMobile = window.innerWidth < 1024;
      const scrolledDown = window.scrollY > 100;
      setShowMenu(isMobile || scrolledDown);
    };

    handleScrollAndResize();
    window.addEventListener("resize", handleScrollAndResize);
    window.addEventListener("scroll", handleScrollAndResize);

    return () => {
      window.removeEventListener("resize", handleScrollAndResize);
      window.removeEventListener("scroll", handleScrollAndResize);
    };
  }, []);

  useEffect(() => {
    if (!showMenu) {
      setButtonRotation(0);
      setExpanded(false);
    }
  }, [showMenu]);

  // Load navigation data from Strapi
  useEffect(() => {
    async function loadNavigationData() {
      try {
        console.log("🧭 HamburgerNav: Loading navigation data...");
        const navData = await getNavigationData();
        setNavigationItems(navData);
      } catch (error) {
        console.error("🧭 HamburgerNav: Error loading navigation:", error);
      } finally {
        setLoading(false);
      }
    }

    loadNavigationData();
  }, []);

  const handleClick = () => {
    if (!expanded) {
      setButtonRotation(90);
      setExpanded(true);
    } else {
      setButtonRotation(0);
      setExpanded(false);
    }
  };

  return (
    <>
      {/* Hamburger Circle (the background circle, animatable later) */}
      <div>
        <div
          onClick={handleClick}
          className={`fixed top-10 right-10 z-40 w-16 h-16 bg-gray-300 rounded-full shadow-lg cursor-pointer transition-opacity duration-500 ease-in-out ${
            showMenu ? "opacity-70" : "opacity-0 pointer-events-none"
          }`}
          style={{
            transformOrigin: "center",
            transform: `rotate(${buttonRotation}deg)`,
            transition: "transform 2s ease-in-out, opacity 0.5s ease-in-out",
          }}
        ></div>

        <div
          className={`z-40 w-[30rem] h-full bg-white fixed right-0 transition-transform duration-500 ease-in-out ${
            expanded ? "translate-x-[20%]" : "translate-x-full"
          }`}
        >
          <ul className="font-roboto-light pl-10 pt-40 space-y-8 w-full flex flex-col gap-2">
            {loading ? (
              // Loading placeholder
              [...Array(6)].map((_, index) => (
                <li key={index} className="animate-pulse">
                  <div className="h-8 w-48 bg-gray-300 rounded mb-2"></div>
                  <div className="h-6 w-32 bg-gray-200 rounded"></div>
                </li>
              ))
            ) : (
              // Dynamic navigation items
              navigationItems.map((item) => (
                <li key={item.id}>
                  <Link to={item.href} className="block group">
                    <h2 className="text-2xl font-roboto-regular absolute w-full bg-white z-10">
                      {item.titleTeReo}
                    </h2>
                    <h2 className="text-xl group-hover:translate-y-8 duration-200 ease-in-out z-0">
                      {item.titleEnglish}
                    </h2>
                  </Link>
                </li>
              ))
            )}
          </ul>
        </div>

        <div
          className={`fixed top-14 right-14 z-50 w-8 h-8 flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-200 ${
            showMenu ? "opacity-70" : "opacity-0"
          }`}
          onClick={handleClick}
        >
          <div
            className={`duration-200 ease-in-out absolute w-4 h-1 bg-black rounded translate-x-[7px] ${
              expanded
                ? "translate-x-[20px] opacity-0"
                : "translate-x-[7px] opacity-100"
            }`}
          ></div>
          <div
            className={`duration-200 ease-in-out absolute w-4 h-1 bg-black rounded  ${
              expanded
                ? "-translate-x-[20px] opacity-0"
                : "-translate-x-[7px] opacity-100"
            }`}
          ></div>
          <div
            className={`ease-in-out duration-200 absolute w-4 h-1 bg-black rounded   ${
              expanded
                ? "rotate-45 translate-y-1 translate-x-[4px]"
                : "rotate-0 translate-y-2 translate-x-[7px]"
            }`}
          ></div>
          <div
            className={`ease-in-out duration-200 absolute w-4 h-1 bg-black rounded   ${
              expanded
                ? "-rotate-45 translate-y-1 -translate-x-[4px]"
                : "rotate-0 translate-y-2 -translate-x-[7px]"
            }`}
          ></div>
          <div
            className={`ease-in-out duration-200 absolute w-4 h-1 bg-black rounded   ${
              expanded
                ? "rotate-45 -translate-y-1 -translate-x-[4px]"
                : "rotate-0 -translate-y-2 -translate-x-[7px]"
            }`}
          ></div>
          <div
            className={`ease-in-out duration-200 absolute w-4 h-1 bg-black rounded   ${
              expanded
                ? "-rotate-45 -translate-y-1 translate-x-[4px]"
                : "rotate-0 -translate-y-2 translate-x-[7px]"
            }`}
          ></div>
        </div>
      </div>

      {/* Overlay */}
      <div
        onClick={handleClick}
        className={`fixed inset-0 bg-black z-30 transition-opacity duration-300 ease-in-out ${
          expanded
            ? "opacity-30 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />
    </>
  );
}
