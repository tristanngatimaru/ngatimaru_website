import Content from "../components/sitecontent/content";
import Footer from "../components/footer";
import FadeInSection from "../components/fadeinanimation";
import FaceCard from "../components/facecard";
import FadeInOnLoad from "../components/loadonstartanimation";
import HeroHeader from "../components/header";
import content from "../components/sitecontent/content";
import { Images, Icons, Cards } from "../components/sitecontent/images";

// src/pages/about.jsx
function About() {
  return (
    <div className="w-full">
      <FadeInOnLoad delay={500} mobileDelay={200}>
        <HeroHeader
          image={Images.CarvingUpClose}
          title={content.about.header}
          subtitle={content.about.headerenglish}
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
                {" "}
                <p className="font-roboto-bold text-xl lg:text-3xl pb-20 align-middle text-right">
                  {Content.about.Quote}
                </p>
                <p className="font-roboto-light text-md lg:text-2xl text-right">
                  {Content.about.Info1}
                </p>
              </FadeInSection>
            </div>
          </div>

          {/* large screen version of the profile cards */}
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

          <div className="lg:col-span-2 lg:row-span-2 lg:p-32 flex ">
            <div className="p-10">
              <FadeInSection delay={400}>
                {" "}
                <p className="font-roboto-bold text-xl lg:text-3xl pb-20 align-middle text-center">
                  {Content.about.trusteesheader}
                </p>
                <p className="font-roboto-light text-md lg:text-2xl text-center">
                  {Content.about.trustees}
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
