import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getNavigationData } from "../api/navigation";

function Navbar() {
  //line in nav bar should appear on refresh
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAppeared, setIsAppeared] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [navigationItems, setNavigationItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadedTimeout = setTimeout(() => setIsLoaded(true), 500);
    const expandedTimeout = setTimeout(() => setIsExpanded(true), 1000);
    const appearedTimeout = setTimeout(() => setIsAppeared(true), 1500);

    return () => {
      clearTimeout(loadedTimeout);
      clearTimeout(expandedTimeout);
      clearTimeout(appearedTimeout);
    };
  }, []);

  // Load navigation data from Strapi
  useEffect(() => {
    async function loadNavigationData() {
      try {
        console.log("🧭 Navbar: Loading navigation data...");
        const navData = await getNavigationData();
        setNavigationItems(navData);
      } catch (error) {
        console.error("🧭 Navbar: Error loading navigation:", error);
      } finally {
        setLoading(false);
      }
    }

    loadNavigationData();
  }, []);

  //text on nav bar appear out of the line

  return (
    <div
      className={`w-full items-center hidden flex-col transition-all ease-in-out duration-500 lg:flex 
    ${isLoaded ? "opacity-100" : "opacity-0"}`}
    >
      <div className="w-[1000px] flex flex-col items-center">
        <span
          className={`h-0.5 rounded-3xl bg-gray-300 relative translate-y-[1.55rem] pointer-events-none
    transition-all duration-[1500ms] ease-in-out
    ${isExpanded ? "w-full" : "w-1"}
    
  `}
        />

        <nav className="w-full flex items-center justify-between ">
          {loading ? (
            // Loading placeholder
            <div className="w-full flex items-center justify-between">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="h-6 w-16 bg-gray-300 rounded mb-1"></div>
                  <div className="h-4 w-12 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            // Dynamic navigation items
            navigationItems.map((item, index) => (
              <Link
                key={item.id}
                to={item.href}
                className="font-roboto-light text-gray-300 hover:scale-110 ease-in-out duration-200"
              >
                <div className="items-center flex flex-col">
                  {/* Top text container */}
                  <div className="overflow-hidden h-6 w-full flex justify-center">
                    <h3
                      className={`text-base pb-0.5 transition-transform duration-700 ease-in-out ${
                        index % 3 === 0 ? "delay-500" : index % 3 === 1 ? "delay-300" : ""
                      } ${isAppeared ? "translate-y-0" : "translate-y-6"}`}
                    >
                      {item.titleTeReo}
                    </h3>
                  </div>

                  {/* Bottom text container */}
                  <div className="overflow-hidden h-4 w-full flex justify-center">
                    <h3
                      className={`text-xs pt-1 transition-transform duration-700 ease-in-out ${
                        index % 3 === 0 ? "delay-500" : index % 3 === 1 ? "delay-300" : ""
                      } ${isAppeared ? "translate-y-0" : "-translate-y-6"}`}
                    >
                      {item.titleEnglish}
                    </h3>
                  </div>
                </div>
              </Link>
            ))
          )}
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
