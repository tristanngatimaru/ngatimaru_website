import { useState, useEffect } from "react";

function Navbar() {
  //line in nav bar should appear on refresh
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAppeared, setIsAppeared] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

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

  //text on nav bar appear out of the line

  return (
    <div
      className={`w-full items-center flex flex-col transition-all ease-in-out duration-500
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
          <a href="" className="font-roboto-light text-gray-300">
            <div className="items-center flex flex-col">
              {/* Top text container */}
              <div className="overflow-hidden h-6 w-full flex justify-center">
                <h3
                  className={`delay-500 text-base pb-0.5 transition-transform duration-700 ease-in-out
          ${isAppeared ? "translate-y-0" : "translate-y-6"}`}
                >
                  KAINGA
                </h3>
              </div>

              {/* Bottom text container */}
              <div className="overflow-hidden h-4 w-full flex justify-center">
                <h3
                  className={` delay-500 text-xs pt-1 transition-transform duration-700 ease-in-out
          ${isAppeared ? "translate-y-0" : "-translate-y-6"}`}
                >
                  HOME
                </h3>
              </div>
            </div>
          </a>
          <a href="" className="font-roboto-light text-gray-300">
            <div className="items-center flex flex-col">
              {/* Top text container */}
              <div className="overflow-hidden h-6 w-full flex justify-center">
                <h3
                  className={`delay-300 text-base pb-0.5 transition-transform duration-700 ease-in-out
          ${isAppeared ? "translate-y-0" : "translate-y-6"}`}
                >
                  KO WAI
                </h3>
              </div>

              {/* Bottom text container */}
              <div className="overflow-hidden h-4 w-full flex justify-center">
                <h3
                  className={`delay-300 text-xs pt-1 transition-transform duration-700 ease-in-out
          ${isAppeared ? "translate-y-0" : "-translate-y-6"}`}
                >
                  ABOUT US
                </h3>
              </div>
            </div>
          </a>
          <a href="" className="font-roboto-light text-gray-300">
            <div className="items-center flex flex-col">
              {/* Top text container */}
              <div className="overflow-hidden h-6 w-full flex justify-center">
                <h3
                  className={`text-base pb-0.5 transition-transform duration-700 ease-in-out
          ${isAppeared ? "translate-y-0" : "translate-y-6"}`}
                >
                  RĀHITA MATAI WHETŪ
                </h3>
              </div>

              {/* Bottom text container */}
              <div className="overflow-hidden h-4 w-full flex justify-center">
                <h3
                  className={`text-xs pt-1 transition-transform duration-700 ease-in-out
          ${isAppeared ? "translate-y-0" : "-translate-y-6"}`}
                >
                  BOOKING MATAI WHETŪ
                </h3>
              </div>
            </div>
          </a>
          <a href="" className="font-roboto-light text-gray-300">
            <div className="items-center flex flex-col">
              {/* Top text container */}
              <div className="overflow-hidden h-6 w-full flex justify-center">
                <h3
                  className={`text-base pb-0.5 transition-transform duration-700 ease-in-out
          ${isAppeared ? "translate-y-0" : "translate-y-6"}`}
                >
                  RIHITI HĪ IKA
                </h3>
              </div>

              {/* Bottom text container */}
              <div className="overflow-hidden h-4 w-full flex justify-center">
                <h3
                  className={`text-xs pt-1 transition-transform duration-700 ease-in-out
          ${isAppeared ? "translate-y-0" : "-translate-y-6"}`}
                >
                  FISHING PERMIT
                </h3>
              </div>
            </div>
          </a>
          <a href="" className="font-roboto-light text-gray-300">
            <div className="items-center flex flex-col">
              {/* Top text container */}
              <div className="overflow-hidden h-6 w-full flex justify-center">
                <h3
                  className={`delay-300 text-base pb-0.5 transition-transform duration-700 ease-in-out
          ${isAppeared ? "translate-y-0" : "translate-y-6"}`}
                >
                  NGĀ TUHINGA
                </h3>
              </div>

              {/* Bottom text container */}
              <div className=" overflow-hidden h-4 w-full flex justify-center">
                <h3
                  className={`delay-300 text-xs pt-1 transition-transform duration-700 ease-in-out
          ${isAppeared ? "translate-y-0" : "-translate-y-6"}`}
                >
                  DOCUMENTS
                </h3>
              </div>
            </div>
          </a>
          <a href="" className="font-roboto-light text-gray-300 hidden">
            <div className="items-center flex flex-col">
              {/* Top text container */}
              <div className="overflow-hidden h-6 w-full flex justify-center">
                <h3
                  className={`text-base pb-0.5 transition-transform duration-700 ease-in-out
          ${isAppeared ? "translate-y-0" : "translate-y-6"}`}
                >
                  TOA
                </h3>
              </div>

              {/* Bottom text container */}
              <div className="overflow-hidden h-4 w-full flex justify-center">
                <h3
                  className={`text-xs pt-1 transition-transform duration-700 ease-in-out
          ${isAppeared ? "translate-y-0" : "-translate-y-6"}`}
                >
                  STORE
                </h3>
              </div>
            </div>
          </a>
          <a href="" className="font-roboto-light text-gray-300">
            <div className="items-center flex flex-col">
              {/* Top text container */}
              <div className="overflow-hidden h-6 w-full flex justify-center">
                <h3
                  className={`delay-500 text-base pb-0.5 transition-transform duration-700 ease-in-out
          ${isAppeared ? "translate-y-0" : "translate-y-6"}`}
                >
                  RĒHITA
                </h3>
              </div>

              {/* Bottom text container */}
              <div className="overflow-hidden h-4 w-full flex justify-center">
                <h3
                  className={` delay-500 text-xs pt-1 transition-transform duration-700 ease-in-out
          ${isAppeared ? "translate-y-0" : "-translate-y-6"}`}
                >
                  REGISTER
                </h3>
              </div>
            </div>
          </a>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
