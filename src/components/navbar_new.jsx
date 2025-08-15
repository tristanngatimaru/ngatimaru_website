import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getNavigationContent } from "@/api/siteContent";

function Navbar() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAppeared, setIsAppeared] = useState(false);
  const [navigationItems, setNavigationItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    const timer2 = setTimeout(() => {
      setIsExpanded(true);
    }, 600);

    const timer3 = setTimeout(() => {
      setIsAppeared(true);
    }, 1100);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  useEffect(() => {
    const loadNavigation = async () => {
      try {
        const navData = await getNavigationContent();
        setNavigationItems(navData.filter((item) => item.Visible));
      } catch (error) {
        console.error("Error loading navigation:", error);
        // Fallback to default navigation if error occurs
        setNavigationItems([
          { href: "/", TitleEnglish: "HOME", TitleTeReo: "KAINGA" },
          { href: "/about", TitleEnglish: "ABOUT US", TitleTeReo: "KO WAI" },
          {
            href: "/bookingmataiwhetu",
            TitleEnglish: "BOOKING MATAI WHETŪ",
            TitleTeReo: "RĀHITA MATAI WHETŪ",
          },
          {
            href: "/fishingpermit",
            TitleEnglish: "FISHING PERMIT",
            TitleTeReo: "RIHITI HĪ IKA",
          },
          {
            href: "/documents",
            TitleEnglish: "DOCUMENTS",
            TitleTeReo: "NGĀ TUHINGA",
          },
          { href: "/register", TitleEnglish: "REGISTER", TitleTeReo: "RĀHITA" },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    loadNavigation();
  }, []);

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
          {/* Show loading indicator or render navigation items */}
          {isLoading ? (
            <div className="text-gray-300 text-center w-full py-4">
              Loading navigation...
            </div>
          ) : (
            navigationItems.map((item, index) => {
              // Calculate staggered delay for animations
              const baseDelay = 300;
              const delayIncrement = 100;
              const delay = baseDelay + index * delayIncrement;

              return (
                <Link
                  key={`${item.href}-${index}`}
                  to={item.href}
                  className="font-roboto-light text-gray-300 hover:scale-110 ease-in-out duration-200"
                >
                  <div className="items-center flex flex-col">
                    {/* Top text container */}
                    <div className="overflow-hidden h-6 w-full flex justify-center">
                      <h3
                        className={`text-base pb-0.5 transition-transform duration-700 ease-in-out
                ${isAppeared ? "translate-y-0" : "translate-y-6"}`}
                        style={{
                          transitionDelay: `${delay}ms`,
                        }}
                      >
                        {item.TitleTeReo}
                      </h3>
                    </div>

                    {/* Bottom text container */}
                    <div className="overflow-hidden h-4 w-full flex justify-center">
                      <h3
                        className={`text-xs pt-1 transition-transform duration-700 ease-in-out
                ${isAppeared ? "translate-y-0" : "-translate-y-6"}`}
                        style={{
                          transitionDelay: `${delay}ms`,
                        }}
                      >
                        {item.TitleEnglish}
                      </h3>
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
