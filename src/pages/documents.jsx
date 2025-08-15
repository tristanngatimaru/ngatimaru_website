import { useState, useEffect, useRef } from "react";
import Footer from "../components/footer";
import HeroHeader from "../components/header";
import { getDocumentsContent } from "@/api/siteContent";
import FadeInOnLoad from "../components/loadonstartanimation";
import { Icons } from "../components/sitecontent/images";

function FadeInSection({ children }) {
  const ref = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: "0px 0px -50px 0px", // Trigger 50px before the element comes into view
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
      className={`transition-all duration-1000 ease-out ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}
    >
      {children}
    </div>
  );
}

const Documents = () => {
  // 🔧 DEBUG MODE - Set to true to show debug info, false to hide
  const DEBUG_MODE = false;

  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [documentsByCategory, setDocumentsByCategory] = useState({});

  useEffect(() => {
    async function loadContent() {
      try {
        const documentsData = await getDocumentsContent();
        setContent(documentsData);

        // Group documents by category

        const grouped =
          documentsData.Documentation?.reduce((acc, doc) => {
            const category = doc.category || "Uncategorized";

            if (!acc[category]) {
              acc[category] = [];
            }

            acc[category].push(doc);
            return acc;
          }, {}) || {};

        // Force state update with a new object reference
        setDocumentsByCategory({ ...grouped });
      } catch (err) {
        console.error("Error loading documents content:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    loadContent();
  }, []);

  // Monitor documentsByCategory changes
  useEffect(() => {
    // State update tracking removed for production
  }, [documentsByCategory]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading documents...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">
          Error loading documents. Please try again later.
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">No documents content available</div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <FadeInOnLoad>
        <HeroHeader
          image={content.HeaderSection?.BackgroundHeaderImage?.url}
          title={content.HeaderSection?.TeReoTitle || "Documents"}
          subtitle={content.HeaderSection?.EnglishTitle || "Documents"}
        />

        <div className="py-6 md:py-10 lg:py-20 px-4 sm:px-6 md:px-10 lg:px-20">
          {/* 🐛 DEBUG INFO - Toggle with DEBUG_MODE flag above */}
          {DEBUG_MODE && (
            <>
              {/* Temporary Debug Info */}
              <div className="mb-4 p-3 bg-yellow-100 border rounded text-sm">
                <p>
                  <strong>Debug:</strong> Categories:{" "}
                  {Object.keys(documentsByCategory).length}
                </p>

                <p>
                  <strong>Category names:</strong>{" "}
                  {Object.keys(documentsByCategory).join(", ")}
                </p>
                <p>
                  <strong>Loading:</strong> {loading ? "true" : "false"}
                </p>
                <p>
                  <strong>Error:</strong> {error ? "true" : "false"}
                </p>
                <p>
                  <strong>Content exists:</strong> {content ? "true" : "false"}
                </p>
                <p>
                  <strong>Raw categories object:</strong>{" "}
                  {JSON.stringify(Object.keys(documentsByCategory))}
                </p>
              </div>

              {/* Success Message */}
              <div className="documents-container">
                <p className="text-green-600 mb-4 font-bold">
                  ✅ SUCCESS: Found {Object.keys(documentsByCategory).length}{" "}
                  categories!
                </p>
              </div>
            </>
          )}

          {Object.keys(documentsByCategory).length === 0 ? (
            <div className="text-center text-gray-600">
              <p className="text-lg">No documents available at this time.</p>
            </div>
          ) : (
            <div>
              {Object.keys(documentsByCategory).map((category) => (
                <FadeInSection key={category}>
                  <div className="mb-12 lg:mb-16">
                    {/* Category Header Section */}
                    <div className="border-b-2 border-emerald-200 pb-3 mb-6">
                      <h2 className="text-2xl md:text-3xl font-roboto-medium uppercase text-emerald-800">
                        {category}
                      </h2>
                      <p className="text-emerald-600 font-roboto-light text-lg mt-1">
                        {documentsByCategory[category]
                          ? documentsByCategory[category].length
                          : 0}{" "}
                        {documentsByCategory[category]?.length === 1
                          ? "document"
                          : "documents"}
                      </p>
                    </div>

                    {/* Documents Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                      {documentsByCategory[category].map((doc) => (
                        <div
                          key={doc.id}
                          className="bg-white border border-gray-200 rounded-lg p-5 md:p-6 hover:shadow-lg hover:border-emerald-200 transition-all duration-200 group"
                        >
                          <div className="flex justify-between items-center">
                            <div className="flex-1 min-w-0 pr-4">
                              <div className="font-roboto-medium text-base md:text-lg text-gray-900 mb-2 leading-tight">
                                {doc.displayName}
                              </div>
                              <div className="flex items-center space-x-3 text-sm text-gray-500">
                                <span className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full text-xs font-medium">
                                  {doc.ext?.toUpperCase()}
                                </span>
                                <span>
                                  {doc.size
                                    ? `${Math.round(doc.size / 1024)} KB`
                                    : "Unknown size"}
                                </span>
                              </div>
                            </div>
                            <div className="flex-shrink-0">
                              <a
                                target="_blank"
                                href={doc.url}
                                download
                                rel="noreferrer"
                                className="inline-flex items-center justify-center w-12 h-12 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors duration-200 group-hover:scale-105"
                                title={`Download ${doc.displayName}`}
                              >
                                <img
                                  src={Icons.Download}
                                  alt="Download"
                                  className="w-6 h-6"
                                />
                              </a>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeInSection>
              ))}
            </div>
          )}
        </div>

        <Footer />
      </FadeInOnLoad>
    </div>
  );
};

export default Documents;
