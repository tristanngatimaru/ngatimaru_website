import { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Navbar from "../components/navbar";
import Posts from "../components/posts";
import Footer from "../components/footer";
import HamburgerNav from "../components/hamburgerNav";
import FadeInOnLoad from "../components/loadonstartanimation";
import AppearRefresh from "../components/appearrefresh";
// Removed static Icons import - all images should be dynamic from Strapi
import { loadPageContent } from "../api/lazyContentLoader";

function FadeInSection({ children }) {
  const ref = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.5,
      }
    );

    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-[2000ms] ease-in-out ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
      }`}
    >
      {children}
    </div>
  );
}

function Home() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAppear, setAppear] = useState(false);
  const isMobile = window.innerWidth < 1024;
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    async function loadContent() {
      console.log("🚀 Starting home page content load...");
      const startTime = performance.now();

      try {
        // Load only home page content (not all pages)
        const homeData = await loadPageContent("home");
        setContent(homeData);

        const loadTime = performance.now() - startTime;
        console.log(
          `✅ Home content loaded successfully (${loadTime.toFixed(2)}ms)`
        );
      } catch (error) {
        console.error("❌ Error loading home content:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    loadContent();
  }, []);

  useEffect(() => {
    const appearTimeout = setTimeout(
      () => setAppear(true),
      isMobile ? 500 : 2000
    );
    return () => clearTimeout(appearTimeout);
  }, [isMobile]);

  const expandMihi = () => setIsExpanded((prev) => !prev);
  const targetRef = useRef(null);
  const handleScroll = () =>
    targetRef.current.scrollIntoView({ behavior: "smooth" });

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">
          Error loading content. Please try again later.
        </div>
      </div>
    );
  if (!content)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">No content available</div>
      </div>
    );

  return (
    <div>
      <FadeInOnLoad delay={500} mobileDelay={200}>
        <HamburgerNav />
        <div className="relative w-full h-full overflow-hidden transition-all ease-in-out duration-500">
          {content.HeaderSection?.BackgroundHeaderImage?.url ? (
            <img
              src={content.HeaderSection.BackgroundHeaderImage.url}
              alt={
                content.HeaderSection.BackgroundHeaderImage.alternativeText ||
                "Background header image"
              }
              className="w-full h-[800px] object-center object-cover overflow-hidden"
            />
          ) : (
            <div className="w-full h-[800px] bg-gray-200" />
          )}

          {/* Navbar on top of image */}
          <div className="absolute top-0 left-0 w-full z-50 pt-10">
            <Navbar />
          </div>

          {/* Centered title text */}
          <div className="absolute w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center pt-28">
            <div className="overflow-hidden h-[80px] w-full flex justify-center">
              <AppearRefresh delay={2000}>
                <h1 className="transition-all duration-1000 ease-in-out text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-roboto-thin text-white text-center">
                  {content.HeaderSection?.TeReoTitle || "has not loaded"}
                </h1>
              </AppearRefresh>
            </div>

            {/* Space between title and buttons */}
            <div className="mt-16 flex flex-col items-center gap-6">
              {/* REGISTER Button */}
              {content.Button?.length > 0 && (
                <div className="overflow-hidden h-[80px] w-full flex justify-center">
                  <div className="transition-all duration-1000 ease-in-out">
                    <AppearRefresh delay={2200}>
                      <a href={content.Button[0].href}>
                        <button
                          className="text-center outline-2 outline-white rounded-full text-white font-bold w-[200px] h-[60px] m-2 font-roboto-thin text-2xl hover:scale-105 duration-200 ease-in-out group relative"
                          title={content.Button[0].TeReoLabel}
                        >
                          <span>{content.Button[0].EnglishLabel}</span>
                        </button>
                      </a>
                    </AppearRefresh>
                  </div>
                </div>
              )}

              {/* ARROW Button */}
              <div className="overflow-hidden h-[90px] w-full flex justify-center">
                <div
                  className={`rounded-full w-[60px] h-[60px] m-2 flex items-center justify-center transform ${
                    isAppear ? "translate-y-0" : "translate-y-20"
                  } transition-transform duration-1000 ease-in-out`}
                >
                  <AppearRefresh delay={2400}>
                    <button
                      onClick={handleScroll}
                      className="hover:scale-110 active:scale-95 ease-in-out duration-200 hover:outline-white outline-transparent outline-2 rounded-full p-3"
                    >
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                        <ChevronDown className="w-6 h-6 text-gray-800" />
                      </div>
                    </button>
                  </AppearRefresh>
                </div>
              </div>
            </div>
          </div>
        </div>

        <FadeInSection>
          <div
            ref={targetRef}
            className="h-[500px] pt-20 lg:pt-0 flex flex-row overflow-hidden"
          >
            {content.MihiSection?.Image?.url ? (
              <img
                src={content.MihiSection.Image.url}
                alt={
                  content.MihiSection.Image.alternativeText ||
                  "Mihi section image"
                }
                className="object-cover w-1/2 h-full lg:block hidden"
              />
            ) : (
              <div className="w-1/2 h-full bg-gray-200 lg:block hidden" />
            )}

            <div className="w-screen lg:w-1/2 h-full bg-white flex flex-col items-center justify-center py-6 px-18 text-center">
              <p className="font-roboto-light text-3xl pb-10">
                {content.MihiSection?.Title}
              </p>
              <p className="font-roboto-light text-xl md:text-3xl">
                {content.MihiSection?.MihiShortened}
              </p>
              <p className="font-roboto-light text-3xl pt-10 pb-5">Full Mihi</p>
              <button
                onClick={expandMihi}
                className={`hover:outline-black active:scale-95 hover:scale-110 ease-in-out outline-transparent outline-2 rounded-full p-3 transition-all duration-300 ${
                  isExpanded ? "rotate-180" : "rotate-0"
                }`}
              >
                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white">
                  <ChevronDown className="w-6 h-6 text-white" />
                </div>
              </button>
            </div>
          </div>

          <div
            className={`transition-all duration-700 ease-in-out overflow-hidden bg-gray-200 shadow-inner ${
              isExpanded ? "max-h-[400vh]" : "max-h-0"
            }`}
          >
            <div className="p-4 flex flex-col gap-12 px-10 lg:px-40 py-20 items-center">
              <p className="text-center text-2xl font-roboto-light">
                {content.MihiSection?.FullMihi}
              </p>

              <div>
                <button
                  onClick={expandMihi}
                  className="hover:outline-black hover:scale-110 ease-in-out duration-200 outline-transparent outline-2 rounded-full p-3 active:scale-95"
                >
                  <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white">
                    <ChevronUp className="w-6 h-6 text-white" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </FadeInSection>

        <FadeInSection>
          <Posts />
        </FadeInSection>

        <Footer />
      </FadeInOnLoad>
    </div>
  );
}

export default Home;
