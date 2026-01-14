import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import FadeInOnLoad from "../components/loadonstartanimation";
import AppearRefresh from "../components/appearrefresh";
import SmartImage from "../components/SmartImage";
import { getHomeContent } from "../api/siteContent";
import { cachedFetch } from "../utils/lazyLoader";
import { formatTextWithLineBreaks } from "../utils/textFormatter.jsx";

// Lazy load heavy components
const Navbar = lazy(() => import("../components/navbar"));
const Posts = lazy(() => import("../components/posts"));
const Footer = lazy(() => import("../components/footer"));
const HamburgerNav = lazy(() => import("../components/hamburgerNav"));

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

// Component loading fallback
const ComponentLoader = ({ name }) => (
  <div className="flex items-center justify-center p-4">
    <div className="animate-pulse text-gray-500">Loading {name}...</div>
  </div>
);

function Home() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAppear, setAppear] = useState(false);
  const isMobile = window.innerWidth < 1024;
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadContent() {
      // Set up a timeout to show fallback content if API is too slow
      const slowLoadingTimeout = setTimeout(() => {
        // Could set some basic content here if needed
      }, 5000); // 5 second warning

      try {
        // Use cached fetch for better performance
        const homeData = await cachedFetch(
          "home-content",
          () => getHomeContent(),
          10 * 60 * 1000 // Cache for 10 minutes
        );
        clearTimeout(slowLoadingTimeout);
        setContent(homeData);
      } catch (error) {
        clearTimeout(slowLoadingTimeout);
        setError(error);

        // Set fallback content to prevent infinite loading
        const fallbackContent = {
          HeaderSection: {
            TeReoTitle: "Ngāti Maru",
            EnglishTitle: "Welcome",
            BackgroundHeaderImage: { url: null },
          },
          MihiSection: {
            Title: "Loading...",
            MihiShortened: "Please wait while we load the content.",
            Image: { url: null },
          },
          Button: [],
        };
        setContent(fallbackContent);
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
        <div className="text-base lg:text-lg">Loading...</div>
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-base lg:text-lg">
          Error loading content. Please try again later.
        </div>
      </div>
    );
  if (!content)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-base lg:text-lg">No content available</div>
      </div>
    );

  return (
    <div>
      <FadeInOnLoad delay={500} mobileDelay={200}>
        <Suspense fallback={<ComponentLoader name="Navigation" />}>
          <HamburgerNav />
        </Suspense>

        <div className="relative w-full h-full overflow-hidden transition-all ease-in-out duration-500">
          <SmartImage
            src={content.HeaderSection?.BackgroundHeaderImage?.url}
            alt={
              content.HeaderSection?.BackgroundHeaderImage?.alternativeText ||
              "Header background"
            }
            context="header"
            className="w-full h-[800px] object-center object-cover overflow-hidden"
            loading="eager"
          />

          {/* Navbar on top of image */}
          <div className="absolute top-0 left-0 w-full z-50 pt-10">
            <Suspense fallback={<ComponentLoader name="Navbar" />}>
              <Navbar />
            </Suspense>
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
                      <button
                        onClick={() => navigate("/register")}
                        className="text-center outline-2 outline-white rounded-full text-white font-bold w-[200px] h-[60px] m-2 font-roboto-thin text-2xl hover:scale-105 duration-200 ease-in-out group relative cursor-pointer"
                        title={content.Button[0].TeReoLabel}
                      >
                        <span>{content.Button[0].EnglishLabel}</span>
                      </button>
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
                      className="hover:scale-110 active:scale-95 ease-in-out duration-300 rounded-full p-3 group"
                      style={{
                        animation: "pulse-outline 4s ease-in-out infinite",
                      }}
                    >
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:shadow-white/50 transition-all duration-300">
                        <ChevronDown className="w-6 h-6 text-gray-800 group-hover:translate-y-1 transition-transform duration-300 ease-out" />
                      </div>
                    </button>
                  </AppearRefresh>
                </div>
              </div>

              <style>{`
                @keyframes pulse-outline {
                  0%,
                  70%,
                  100% {
                    outline: 2px solid transparent;
                  }
                  15%,
                  25% {
                    outline: 2px solid rgba(255, 255, 255, 0.8);
                  }
                  20% {
                    outline: 2px solid rgba(255, 255, 255, 0.4);
                  }
                }
              `}</style>
            </div>
          </div>
        </div>

        <FadeInSection>
          <div
            ref={targetRef}
            className="pt-20 lg:pt-0 flex flex-col lg:flex-row"
          >
            <div className="hidden lg:flex lg:w-1/2">
              <SmartImage
                src={content.MihiSection?.Image?.url}
                alt={
                  content.MihiSection?.Image?.alternativeText ||
                  "Mihi section image"
                }
                context="mihi"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            <div className="w-full lg:w-1/2 bg-white flex flex-col items-center justify-center py-8 px-6 lg:px-10 text-center">
              <p className="font-roboto-light text-xl lg:text-2xl pb-4">
                {content.MihiSection?.Title}
              </p>
              <div className="font-roboto-light text-base lg:text-lg leading-relaxed max-w-prose">
                {content.MihiSection?.MihiShortened
                  ? (() => {
                      return formatTextWithLineBreaks(
                        content.MihiSection.MihiShortened
                      );
                    })()
                  : ""}
              </div>
              <p className="font-roboto-light text-base lg:text-lg pt-6 pb-3">
                Full Mihi
              </p>
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
            <div className="p-4 flex flex-col gap-12 px-10 lg:px-40 xl:px-96 py-20 items-center">
              <div className="text-center text-base lg:text-lg font-roboto-light">
                {content.MihiSection?.FullMihi
                  ? (() => {
                      return formatTextWithLineBreaks(
                        content.MihiSection.FullMihi
                      );
                    })()
                  : ""}
              </div>

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
          <Suspense fallback={<ComponentLoader name="Posts" />}>
            <Posts />
          </Suspense>
        </FadeInSection>

        <Suspense fallback={<ComponentLoader name="Footer" />}>
          <Footer />
        </Suspense>
      </FadeInOnLoad>
    </div>
  );
}

export default Home;
