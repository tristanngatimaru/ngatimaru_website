import HamburgerNav from "../components/hamburgerNav";
import Navbar from "../components/navbar";
import Header from "../assets/images/headerimages/korowai.png";
import Content from "../components/sitecontent/content";
import Footer from "../components/footer";
import FadeInOnLoad from "../components/loadonstartanimation";
import AppearRefresh from "../components/appearrefresh";
import { useState, useEffect } from "react";
import Download from "../assets/images/icons/download.png";

function decodeHtml(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

// src/pages/about.jsx
const Documents = () => {
  const [documentsByCategory, setDocumentsByCategory] = useState({});

  useEffect(() => {
    fetch(
      "http://ngatimaruwebsitevite.local/wp-json/wp/v2/media?per_page=100&mime_type=application/pdf"
    )
      .then((res) => res.json())
      .then((data) => {
        const pdfs = data
          .filter((item) => item.mime_type === "application/pdf")
          .map((item) => {
            const [namePart, categoryPart] = item.title.rendered
              .replace(".pdf", "")
              .split("_");

            return {
              id: item.id,
              name: decodeHtml(namePart || item.title.rendered),
              category: decodeHtml(categoryPart || "Uncategorized"),
              url: item.source_url,
            };
          });

        // Group documents by category
        const grouped = pdfs.reduce((acc, doc) => {
          const category = doc.category;
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(doc);
          return acc;
        }, {});

        setDocumentsByCategory(grouped);
      });
  }, []);

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
              <AppearRefresh delay={2000}>
                <div
                  className={`uppercase transition-all duration-1000 ease-in-out text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-roboto-thin text-white text-center 
                `}
                >
                  {Content.documents.header}
                </div>
              </AppearRefresh>
            </div>
            <div className="overflow-hidden h-[80px] w-full flex justify-center">
              <AppearRefresh delay={2500}>
                <div
                  className={`uppercase transition-all duration-1000 ease-in-out text-xl sm:text-2xl md:text-3xl lg:text-4xl font-roboto-thin text-white text-center 
                `}
                >
                  {Content.documents.headerenglish}
                </div>
              </AppearRefresh>
            </div>
          </div>
        </div>

        <div className="absolute top-0 left-0 w-full z-50 pt-10">
          <Navbar />
        </div>

        {/* page content below */}

        <div className="py-20 px-20">
          <div className="">
            {Object.keys(documentsByCategory).map((category) => (
              <div key={category} className="mb-10">
                <h2 className="text-2xl font-roboto-light uppercase mb-4">
                  {category}
                </h2>

                <div className="flex flex-col md:grid grid-cols-2 gap-5">
                  {documentsByCategory[category].map((doc) => (
                    <div
                      key={doc.id}
                      className="flex justify-between items-center bg-gray-200 p-6"
                    >
                      <div>
                        <div className="font-roboto-light lg:text-lg">
                          {doc.name}
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <a
                          target="_blank"
                          href={doc.url}
                          download
                          className="hover:scale-105 ease-in-out duration-200 pl-5"
                        >
                          <img
                            src={Download}
                            alt=""
                            className="min-w-[40px] max-w-[40px]"
                          />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <Footer />
      </FadeInOnLoad>
    </div>
  );
};

export default Documents;
