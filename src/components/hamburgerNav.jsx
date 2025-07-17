import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

export default function HamburgerNav() {
  const buttonControls = useAnimation();
  const [expanded, setExpanded] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

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
      buttonControls.start({ rotate: 0, transition: { duration: 2 } });
      setExpanded(false);
    }
  }, [showMenu, buttonControls]);

  const handleClick = async () => {
    if (!expanded) {
      await buttonControls.start({ rotate: 90, transition: { duration: 2 } });
      setExpanded(true);
    } else {
      await buttonControls.start({ rotate: 0, transition: { duration: 2 } });
      setExpanded(false);
    }
  };

  return (
    <>
      {/* Hamburger Circle (the background circle, animatable later) */}
      <div>
        <motion.div
          initial={{ opacity: 0 }}
          onClick={handleClick}
          animate={{ opacity: showMenu ? 0.7 : 0 }}
          className={`fixed top-10 right-10 z-40 w-16 h-16 bg-gray-300 rounded-full shadow-lg cursor-pointer transition-opacity  `}
          style={{
            transformOrigin: "center",
            pointerEvents: showMenu ? "auto" : "none",
          }}
        ></motion.div>

        <motion.div
          initial={{ translateX: "100%" }}
          animate={{ translateX: expanded ? "20%" : "100%" }}
          className="z-40 w-[30rem] h-full bg-white fixed right-0"
        >
          <ul class="font-roboto-light pl-10 pt-40 space-y-8 w-full flex flex-col gap-2">
            <li>
              <a href="" class="block group ">
                <h2 class="text-2xl font-roboto-regular absolute w-full bg-white z-10">
                  KAINGA
                </h2>
                <h2 className="text-xl group-hover:translate-y-8 duration-200 ease-in-out z-0">
                  HOME
                </h2>
              </a>
            </li>
            <li>
              <a href="" class="block group">
                <h2 className="text-2xl font-roboto-regular w-full absolute bg-white z-10">
                  KO WAI
                </h2>
                <h2 class="text-xl group-hover:translate-y-8 duration-200 ease-in-out z-0">
                  ABOUT US
                </h2>
              </a>
            </li>
            <li>
              <a href="" class="block group">
                <h2 className="text-2xl font-roboto-regular w-full absolute bg-white z-10">
                  RĀHITA MATAI WHETŪ
                </h2>
                <h2 class="text-xl group-hover:translate-y-8 duration-200 ease-in-out z-0">
                  BOOKING MATAI WHETŪ
                </h2>
              </a>
            </li>
            <li>
              <a href="" class="block group">
                <h2 className="text-2xl font-roboto-regular w-full absolute bg-white z-10">
                  RIHITI HĪ IKA
                </h2>
                <h2 class="text-xl group-hover:translate-y-8 duration-200 ease-in-out z-0">
                  FISHING PERMIT
                </h2>
              </a>
            </li>
            <li>
              <a href="" class="block group">
                <h2 className="text-2xl font-roboto-regular w-full absolute bg-white z-10">
                  NGĀ TUHINGA
                </h2>
                <h2 className="text-xl group-hover:translate-y-8 duration-200 ease-in-out z-0">
                  DOCUMENTS
                </h2>
              </a>
            </li>
            <li className="hidden">
              <a href="" className="block group">
                <h2 className="text-2xl font-roboto-regular w-full absolute bg-white z-10">
                  TOA
                </h2>
                <h2 className="text-xl group-hover:translate-y-8 duration-200 ease-in-out z-0">
                  STORE
                </h2>
              </a>
            </li>
            <li>
              <a href="" class="block group">
                <h2 className="text-2xl font-roboto-regular w-full absolute bg-white z-10">
                  RĀHITA
                </h2>
                <h2 class="text-xl group-hover:translate-y-8 duration-200 ease-in-out z-0">
                  REGISTER
                </h2>
              </a>
            </li>
          </ul>
        </motion.div>

        <motion.div
          className="fixed top-14 right-14 z-50 w-8 h-8 flex items-center justify-center cursor-pointer hover:scale-110 ease-in-out duration-200"
          onClick={handleClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: showMenu ? 0.7 : 0 }}
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
        </motion.div>
      </div>

      {/* Overlay */}
      {expanded && (
        <motion.div
          onClick={handleClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black z-30"
        />
      )}
    </>
  );
}
