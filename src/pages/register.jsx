import { useState, useEffect, lazy, Suspense } from "react";
import Footer from "../components/footer";
import HeroHeader from "../components/header";
import { getRegisterContent } from "@/api/siteContent";
import FadeInOnLoad from "../components/loadonstartanimation";
import FadeInSection from "../components/fadeinanimation";

// Lazy load the RegistrationForm component
const RegistrationForm = lazy(() => import("../components/RegistrationForm"));

function Register() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    async function loadContent() {
      try {
        const registerData = await getRegisterContent();
        setContent(registerData);
      } catch (err) {
        console.error("Error loading register content:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    loadContent();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading register page...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">
          Error loading register page. Please try again later.
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">No register content available</div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <FadeInOnLoad>
        <HeroHeader
          image={content.HeaderSection?.BackgroundHeaderImage?.url}
          title={content.HeaderSection?.TeReoTitle || "Register"}
          subtitle={content.HeaderSection?.EnglishTitle || "Register"}
        />

        <div className="py-6 md:py-10 lg:py-20 px-4 sm:px-6 md:px-10 lg:px-20">
          {/* Main Content Section */}
          <div className="max-w-4xl mx-auto">
            {content.Content && (
              <FadeInOnLoad delay={800} mobileDelay={600}>
                <div className="bg-white rounded-lg text-center p-6 md:p-8 mb-8">
                  <div className="prose prose-lg max-w-none">
                    {content.Content.split("\n\n").map((paragraph, index) => (
                      <p
                        key={index}
                        className="text-gray-700 leading-relaxed mb-4 last:mb-0"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </FadeInOnLoad>
            )}

            {/* Post Information Section */}
            {content.PostInfo && (
              <FadeInOnLoad delay={1000} mobileDelay={800}>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 md:p-8 mb-8">
                  <h3 className="text-xl font-roboto-medium text-emerald-800 mb-4">
                    Important Information
                  </h3>
                  <div className="prose max-w-none">
                    {content.PostInfo.split("\n\n").map((paragraph, index) => (
                      <p
                        key={index}
                        className="text-emerald-700 leading-relaxed mb-4 last:mb-0"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </FadeInOnLoad>
            )}

            {/* Registration Form Toggle */}
            {!showForm ? (
              <FadeInOnLoad delay={1000} mobileDelay={800}>
                <div className="text-center">
                  <button
                    onClick={() => setShowForm(true)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-roboto-medium px-8 py-4 rounded-lg text-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
                  >
                    Start Registration Application
                  </button>
                  <p className="mt-4 text-gray-600 text-sm">
                    Ready to join Te Rūnanga o Ngāti Maru? Click above to begin
                    your registration.
                  </p>
                </div>
              </FadeInOnLoad>
            ) : (
              <FadeInSection direction="up">
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-roboto-medium text-gray-800">
                      Registration Application
                    </h3>
                    <button
                      onClick={() => setShowForm(false)}
                      className="text-gray-500 hover:text-gray-700 text-sm underline"
                    >
                      ← Back to Information
                    </button>
                  </div>
                  <Suspense
                    fallback={
                      <div className="flex items-center justify-center p-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
                        <span className="ml-2 text-gray-600">
                          Loading registration form...
                        </span>
                      </div>
                    }
                  >
                    <RegistrationForm />
                  </Suspense>
                </div>
              </FadeInSection>
            )}
          </div>
        </div>

        <Footer />
      </FadeInOnLoad>
    </div>
  );
}

export default Register;
