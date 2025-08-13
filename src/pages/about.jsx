import { useState, useEffect } from "react";
import Footer from "../components/footer";
import FadeInSection from "../components/fadeinanimation";
import FaceCard from "../components/facecard";
import FadeInOnLoad from "../components/loadonstartanimation";
import HeroHeader from "../components/header";
import { getAboutContent } from "../api/siteContent";
import { Images, Cards } from "../components/sitecontent/images";

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
        <div className="text-xl">Loading about page...</div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">
          Error loading content. Please try again later.
        </div>
      </div>
    );
  }

  // No content state
  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">No about content available</div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <FadeInOnLoad delay={500} mobileDelay={200}>
        <HeroHeader
          image={
            content.HeaderSection?.BackgroundHeaderImage?.url ||
            Images.CarvingUpClose
          }
          title={content.Header?.TeReoTitle || "Ko Wai not live"}
          subtitle={content.HeaderSection?.EnglishTitle || "About Us"}
        />

        {/* page content below */}

        <div className=" lg:grid flex flex-col lg:grid-cols-3 grid-cols-2 grid-rows-[500px_auto_auto_auto_500px] md:grid-rows-[700px_auto_auto_auto_700px]">
          <FadeInSection delay={400} className="row-span-2">
            <img
              src={Images.Pohutakawa}
              alt=""
              className="h-full object-cover overflow-hidden object-center hidden lg:block"
            />
          </FadeInSection>
          <div className="lg:col-span-2 lg:row-span-2 lg:p-32 flex ">
            <div>
              <FadeInSection>
                <img
                  src={Images.Pohutakawa}
                  alt=""
                  className="h-full w-80 object-cover overflow-hidden object-center block lg:hidden"
                />
              </FadeInSection>
            </div>

            <div className="p-10">
              <FadeInSection>
                <p className="font-roboto-bold text-md lg:text-2xl text-right">
                  {content.ContentHeader || "Description not available"}
                </p>
                <p className="font-roboto-light text-xl lg:text-3xl pb-20 align-middle text-right">
                  {content.Content || "About content not available"}
                </p>
              </FadeInSection>
            </div>
          </div>

          {/* Team member cards - these could come from Strapi TeamMembers */}
          {content.TeamMembers && content.TeamMembers.length > 0 ? (
            // Dynamic team members from Strapi
            content.TeamMembers.map((member, index) => (
              <div key={member.id || index} className="row-start-3">
                <FadeInSection delay={index * 200}>
                  <FaceCard
                    imageSrc={member.Image?.url || Cards.Waati}
                    name={member.Name || "Team Member"}
                    title={member.Title || "Position"}
                    description={member.Description || ""}
                    className=""
                    direction={
                      index === 0 ? "right" : index === 1 ? "up" : "left"
                    }
                  />
                </FadeInSection>
              </div>
            ))
          ) : (
            // Fallback to hardcoded team members
            <>
              <div className="row-start-3 ">
                <FadeInSection>
                  <FaceCard
                    imageSrc={Cards.Waati}
                    name="Waati Ngamane"
                    title="Chairperson & Treaty Negotiator"
                    description=""
                    className=""
                    direction="right"
                  />
                </FadeInSection>
              </div>
              <div className="row-start-3 ">
                <FadeInSection delay={200}>
                  <FaceCard
                    imageSrc={Cards.David}
                    name="David Taipari"
                    title="General Manager"
                    description=""
                    className=""
                    direction="up"
                  />
                </FadeInSection>
              </div>
              <div className="row-start-3 ">
                <FadeInSection delay={400}>
                  <FaceCard
                    imageSrc={Cards.Paul}
                    name="Paul Majurey"
                    title="Treaty Negotiator"
                    description=""
                    className=""
                    direction="left"
                  />
                </FadeInSection>
              </div>
            </>
          )}

          <div className="lg:col-span-2 lg:row-span-2 lg:p-32 flex ">
            <div className="p-10">
              <FadeInSection delay={400}>
                <p className="font-roboto-bold text-xl lg:text-3xl pb-20 align-middle text-center">
                  {content.TrusteesTitle || "Trustees"}
                </p>
                <p className="font-roboto-light text-md lg:text-2xl text-center">
                  {content.TrusteesList || "Trustees information not available"}
                </p>
              </FadeInSection>
            </div>
            <div>
              <FadeInSection>
                <img
                  src={Images.Pohutakawa}
                  alt=""
                  className="h-full w-80 object-cover overflow-hidden object-center block lg:hidden"
                />
              </FadeInSection>
            </div>
          </div>

          <div className="row-span-2 col-start-3 row-start-4 hidden lg:block">
            <FadeInSection>
              <img
                src={Images.BeachIsland}
                alt=""
                className="h-full object-cover overflow-hidden object-center"
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
