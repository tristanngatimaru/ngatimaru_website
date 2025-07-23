import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FadeInOnLoad from "../../components/loadonstartanimation";
import HamburgerNav from "../../components/hamburgerNav";
import AppearRefresh from "../../components/appearrefresh";
import Navbar from "../../components/navbar";
import Header from "../../assets/images/headerimages/korowai.png"; // <-- Fix this path if incorrect
import Content from "../../components/sitecontent/content"; // <-- Fix this path if incorrect
import Footer from "../../components/footer";

const SinglePost = () => {
  const { id } = useParams(); // get post ID from URL
  const [post, setPost] = useState(null);
  const [extraImages, setExtraImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch post data with embedded featured media
    const apiUrl = `http://ngatimaruwebsitevite.local/wp-json/wp/v2/posts/${id}?_embed`;

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch post:", err);
        setLoading(false);
      });

    // Fetch attached media (images) for this post
    const mediaApi = `http://ngatimaruwebsitevite.local/wp-json/wp/v2/media?parent=${id}`;

    fetch(mediaApi)
      .then((res) => res.json())
      .then((media) => {
        // Filter for images only, take first 2
        const images = media
          .filter((item) => item.media_type === "image")
          .slice(0, 2);
        setExtraImages(images);
      })
      .catch((err) => console.error("Failed to fetch media:", err));
  }, [id]);

  if (loading) return <p className="text-center">Loading post...</p>;
  if (!post) return <p className="text-center">Post not found.</p>;

  const formattedDate = new Date(post.date).toLocaleDateString("en-NZ", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Split content by closing </p> tag to separate paragraphs
  const paragraphs = post.content.rendered.split("</p>");

  return (
    <FadeInOnLoad delay={500} mobileDelay={200}>
      <div className="w-screen mx-auto">
        <div className="w-full">
          <HamburgerNav />

          <div className="relative">
            {post._embedded?.["wp:featuredmedia"] && (
              <img
                src={post._embedded["wp:featuredmedia"][0].source_url}
                alt={post.title.rendered}
                className="w-full h-[500px] object-center object-cover overflow-hidden brightness-75"
              />
            )}

            <div className="absolute flex flex-col w-full top-1/4 z-20">
              <div className="overflow-hidden h-[80px] w-full flex justify-center">
                <AppearRefresh delay={2000}>
                  <div
                    className={`uppercase transition-all duration-1000 ease-in-out text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-roboto-thin text-white text-center`}
                  >
                    {post.title.rendered}
                  </div>
                </AppearRefresh>
              </div>
              <div className="overflow-hidden h-[80px] w-full flex flex-col justify-center">
                <AppearRefresh delay={2500}>
                  <div
                    className={`uppercase transition-all duration-1000 ease-in-out text-xl sm:text-2xl md:text-3xl lg:text-4xl font-roboto-thin text-white text-center`}
                  >
                    {formattedDate}
                  </div>
                </AppearRefresh>
              </div>
            </div>
          </div>

          <div className="absolute top-0 left-0 w-full z-50 pt-10">
            <Navbar />
          </div>

          {/* Render paragraphs and insert extra images at different points */}
          <div className="prose max-w-none py-20 px-10 lg:px-60 relative z-10 font-roboto-light text-sm lg:text-xl">
            {paragraphs.map((para, i) => {
              if (!para.trim()) return null;
              const paragraphHTML = para + "</p>";

              return (
                <div key={i}>
                  <div dangerouslySetInnerHTML={{ __html: paragraphHTML }} />

                  {/* Parallax image after paragraph 0 */}
                  {i === 0 && extraImages[0] && (
                    <div
                      className="w-screen h-[400px] my-20 bg-center bg-cover bg-fixed"
                      style={{
                        backgroundImage: `url(${extraImages[0].source_url})`,
                        marginLeft: "calc(-50vw + 50%)",
                      }}
                      aria-label={extraImages[0].alt_text || "Extra image 1"}
                      role="img"
                    />
                  )}

                  {/* Parallax image after paragraph 2 */}
                  {i === 2 && extraImages[1] && (
                    <div
                      className="w-screen h-[400px] my-20 bg-center bg-cover bg-fixed"
                      style={{
                        backgroundImage: `url(${extraImages[1].source_url})`,
                        marginLeft: "calc(-50vw + 50%)",
                      }}
                      aria-label={extraImages[1].alt_text || "Extra image 2"}
                      role="img"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </FadeInOnLoad>
  );
};

export default SinglePost;
