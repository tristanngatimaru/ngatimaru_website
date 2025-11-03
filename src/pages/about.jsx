import { useState, useEffect } from "react";
import Footer from "../components/footer";
import FadeInSection from "../components/fadeinanimation";
import FaceCard from "../components/facecard";
import FadeInOnLoad from "../components/loadonstartanimation";
import HeroHeader from "../components/header";
import { getAboutContent } from "../api/siteContent";
import {
  formatTextWithLineBreaks,
  formatTrusteesThreeColumn,
} from "../utils/textFormatter";

// src/pages/about.jsx
function About() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadContent() {
      try {
        const aboutData = await getAboutContent();
        setContent(aboutData);
      } catch (err) {
        console.error("Error loading about content:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    loadContent();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-base lg:text-lg">Loading about page...</div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-base lg:text-lg">
          Error loading content. Please try again later.
        </div>
      </div>
    );
  }

  // No content state
  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-base lg:text-lg">No about content available</div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <FadeInOnLoad delay={500} mobileDelay={200}>
        <HeroHeader
          image={content.Header?.BackgroundHeaderImage?.url || null} // TODO: Load from Strapi, no static fallback
          title={content.Header?.TeReoTitle || "Ko Wai not live"}
          subtitle={content.Header?.EnglishTitle || "About Us"}
        />

        {/* page content below */}

        <div className=" lg:grid flex flex-col lg:grid-cols-3 grid-cols-2 grid-rows-[500px_auto_auto_auto_500px] md:grid-rows-[700px_auto_auto_auto_700px]">
          <FadeInOnLoad delay={800} mobileDelay={600}>
            <img
              src={content.SidePanelImageOne?.url || "none"}
              alt=""
              className="h-full object-cover overflow-hidden object-center hidden lg:block row-span-2"
            />
          </FadeInOnLoad>

          <div className="lg:col-span-2 lg:row-span-2 lg:p-16 flex flex-col justify-center">
            <div className="p-6 lg:p-10">
              <FadeInOnLoad delay={800} mobileDelay={600}>
                <p className="font-roboto-bold text-lg lg:text-xl text-center lg:text-right pb-5 lg:pb-0">
                  {content.ContentHeader
                    ? formatTextWithLineBreaks(content.ContentHeader)
                    : "Description not available"}
                </p>
                <p className="font-roboto-light text-base lg:text-lg align-middle text-center lg:text-right">
                  {content.Content
                    ? formatTextWithLineBreaks(content.Content)
                    : "About content not available"}
                </p>
              </FadeInOnLoad>
            </div>
          </div>
          {/* Team member cards - Mobile responsive layout */}
          <div className="lg:col-span-3 lg:row-start-3">
            {content.FaceCard && content.FaceCard.length > 0 ? (
              // Dynamic team members from Strapi
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-0 px-4 lg:px-0">
                {content.FaceCard.map((member, index) => (
                  <div key={member.id || index}>
                    <FadeInSection delay={index * 200}>
                      <FaceCard
                        imageSrc={member.Image?.url || "image"}
                        name={member.Name || "Team Member"}
                        title={member.Detail || "Position"}
                        description={member.Description || ""}
                        className=""
                        direction={
                          index === 0 ? "right" : index === 1 ? "up" : "left"
                        }
                      />
                    </FadeInSection>
                  </div>
                ))}
              </div>
            ) : (
              // Fallback to hardcoded team members
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-0 px-4 lg:px-0">
                <div>
                  <FadeInSection>
                    <FaceCard
                      imageSrc={"placeholder"}
                      name="Waati Ngamane"
                      title="Chairperson & Treaty Negotiator"
                      description=""
                      className=""
                      direction="right"
                    />
                  </FadeInSection>
                </div>
                <div>
                  <FadeInSection delay={200}>
                    <FaceCard
                      imageSrc={"placeholder"}
                      name="David Taipari"
                      title="General Manager"
                      description=""
                      className=""
                      direction="up"
                    />
                  </FadeInSection>
                </div>
                <div>
                  <FadeInSection delay={400}>
                    <FaceCard
                      imageSrc={"placeholder"}
                      name="Paul Majurey"
                      title="Treaty Negotiator"
                      description=""
                      className=""
                      direction="left"
                    />
                  </FadeInSection>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-2 lg:row-span-2 lg:p-16 flex flex-col justify-center">
            <div className="p-6 lg:p-10">
              <FadeInSection delay={400}>
                <div className="text-center mb-8">
                  <h2 className="font-roboto-bold text-2xl lg:text-3xl text-gray-800 mb-3">
                    {content.TrusteesTitle || "Trustees"}
                  </h2>
                </div>
                <div className="trustees-container">
                  {content.TrusteesList ? (
                    formatTrusteesThreeColumn(content.TrusteesList)
                  ) : (
                    <div className="text-center text-gray-600 font-roboto-light text-lg italic">
                      Trustees information not available
                    </div>
                  )}
                </div>
              </FadeInSection>
            </div>
          </div>

          <div className="row-span-2 col-start-3 row-start-4 hidden lg:block">
            <FadeInSection>
              <img
                src={content.SidePanelImageTwo?.url || "placeholder"}
                alt=""
                className=" h-full object-cover overflow-hidden object-center"
              />
            </FadeInSection>
          </div>
        </div>
        <Footer />
      </FadeInOnLoad>
    </div>
  );
}

export default About;
