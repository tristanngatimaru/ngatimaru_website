import HamburgerNav from "../components/hamburgerNav";
import Navbar from "../components/navbar";
import Header from "../assets/images/headerimages/carvingcloseup.png";
import Flowers from "../assets/images/headerimages/pohutakawaflowers.png";
import Content from "../components/sitecontent/content";
import David from "../assets/images/aboutus/davidtaipari.png";
import Waati from "../assets/images/aboutus/waatingamani.png";
import Paul from "../assets/images/aboutus/paulmajourey.png";
import Footer from "../components/footer";
import { useState, useEffect } from "react";
import FadeInSection from "../components/fadeinanimation";
import FaceCard from "../components/facecard";
import FadeInOnLoad from "../components/loadonstartanimation";

// src/pages/about.jsx
function About() {
  const [isAppear, setAppear] = useState(false);

  useEffect(() => {
    const appearTimeout = setTimeout(() => setAppear(true));

    return () => {
      clearTimeout(appearTimeout);
    };
  });
  return (
    <div className="w-full">
      <FadeInOnLoad delay={500} mobileDelay={200}>
        <HamburgerNav />

        <div>
          <img
            src={Header}
            alt=""
            className="w-full h-[500px] object-center object-cover overflow-hidden"
          />
          <div className="absolute flex flex-col w-full top-1/4 ">
            <div className="overflow-hidden h-[80px] w-full flex justify-center">
              <h1
                className={`transition-all duration-1000 ease-in-out text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-roboto-thin text-white text-center ${
                  isAppear ? "translate-y-0" : "translate-y-20"
                }`}
              >
                {Content.about.header}
              </h1>
            </div>
            <div className="overflow-hidden h-[80px] w-full flex justify-center">
              <h1
                className={`transition-all duration-1000 ease-in-out text-xl sm:text-2xl md:text-3xl lg:text-4xl font-roboto-thin text-white text-center ${
                  isAppear ? "translate-y-0" : "translate-y-20"
                }`}
              >
                {Content.about.headerenglish}
              </h1>
            </div>
          </div>
        </div>

        <div className="absolute top-0 left-0 w-full z-50 pt-10">
          <Navbar />
        </div>

        {/* page content below */}

        <div className="lg:grid flex flex-col lg:grid-cols-3 grid-cols-2 grid-rows-[500px_auto_auto_auto_500px] md:grid-rows-[700px_auto_auto_auto_700px]">
          <FadeInSection className="row-span-2">
            <img
              src={Flowers}
              alt=""
              className="h-full object-cover overflow-hidden object-center hidden lg:block"
            />
          </FadeInSection>
          <div className="lg:col-span-2 lg:row-span-2 lg:p-32 flex ">
            <div>
              <FadeInSection>
                <img
                  src={Flowers}
                  alt=""
                  className="h-full w-80 object-cover overflow-hidden object-center block lg:hidden"
                />
              </FadeInSection>
            </div>

            <div className="p-10">
              <FadeInSection delay={400}>
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
                imageSrc={Waati}
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
                imageSrc={David}
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
                imageSrc={Paul}
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
                  src={Flowers}
                  alt=""
                  className="h-full w-80 object-cover overflow-hidden object-center block lg:hidden"
                />
              </FadeInSection>
            </div>
          </div>

          <div className="row-span-2 col-start-3 row-start-4 hidden lg:block">
            <FadeInSection>
              <img
                src={Flowers}
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
