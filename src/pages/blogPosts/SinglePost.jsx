import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FadeInOnLoad from "../../components/loadonstartanimation";
import HamburgerNav from "../../components/hamburgerNav";
import AppearRefresh from "../../components/appearrefresh";
import Navbar from "../../components/navbar";
import Header from "../../assets/images/headerimages/korowai.png"; // <-- Fix this path if incorrect
import Content from "../../components/sitecontent/content"; // <-- Fix this path if incorrect

const SinglePost = () => {
  const { id } = useParams(); // get post ID from URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
  }, [id]);

  if (loading) return <p className="text-center">Loading post...</p>;
  if (!post) return <p className="text-center">Post not found.</p>;

  const formattedDate = new Date(post.date).toLocaleDateString("en-NZ", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <FadeInOnLoad delay={500} mobileDelay={200}>
      <div className=" w-screen mx-auto">
        <div className="w-full">
          <HamburgerNav />

          <div>
            {post._embedded?.["wp:featuredmedia"] && (
              <img
                src={post._embedded["wp:featuredmedia"][0].source_url}
                alt={post.title.rendered}
                className="w-full h-[500px] object-center object-cover overflow-hidden brightness-75"
              />
            )}
            <div className="absolute flex flex-col w-full top-1/4 ">
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

          <div
            className="prose max-w-none py-20 px-30"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />
        </div>
      </div>
    </FadeInOnLoad>
  );
};

export default SinglePost;
