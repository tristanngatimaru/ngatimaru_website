import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FadeInOnLoad from "../../components/loadonstartanimation";
import HamburgerNav from "../../components/hamburgerNav";
import AppearRefresh from "../../components/appearrefresh";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { fetchPostById } from "@/api/fetchFunction";
import { shapePostData } from "../../hooks/strapifields";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPostById(id)
      .then((data) => {
        console.log("Raw post data:", data); // <-- Add this
        const shaped = shapePostData(data);
        console.log("Shaped post data:", shaped); // <-- And this
        setPost(shaped);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch post:", err);
        setError("Failed to load post");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center">Loading post...</p>;
  if (error || !post)
    return <p className="text-center">{error || "Post not found."}</p>;

  const formattedDate = new Date(post.eventDate).toLocaleDateString("en-NZ", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <FadeInOnLoad delay={500} mobileDelay={200}>
      <div className="w-screen mx-auto">
        <div className="w-full">
          <HamburgerNav />

          {/* Hero section */}
          <div className="relative">
            {post.heroMainImage && (
              <img
                src={post.heroMainImage}
                alt={post.title}
                className="w-full h-[500px] object-center object-cover overflow-hidden brightness-75"
              />
            )}

            <div className="absolute flex flex-col w-full top-1/4 pt-20 z-20">
              <div className="overflow-hidden h-[80px] w-full flex justify-center">
                <AppearRefresh delay={2000}>
                  <div className="uppercase text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-roboto-thin text-white text-center">
                    {post.title}
                  </div>
                </AppearRefresh>
              </div>
              <div className="overflow-hidden h-[80px] w-full flex flex-col justify-center">
                <AppearRefresh delay={2500}>
                  <div className="uppercase text-xl sm:text-2xl md:text-3xl lg:text-4xl font-roboto-thin text-white text-center">
                    {formattedDate}
                  </div>
                </AppearRefresh>
              </div>
            </div>

            <div className="absolute top-0 left-0 w-full z-50 pt-10">
              <Navbar />
            </div>
          </div>

          {/* Main content */}
          <div className="flex flex-col gap-10 items-center w-full py-20   mx-auto text-lg leading-relaxed whitespace-pre-line font-roboto-light text-center ">
            {post.contentPartOne && (
              <div className="max-w-5/6">{post.contentPartOne}</div>
            )}

            <div className=" text-center text-3xl max-w-5/6">
              "{post.excerptOne}"
            </div>

            <img
              src={post.secondaryImage}
              alt="Secondary"
              className="w-full my-8 h-[400px] object-cover"
            />

            {post.contentPartTwo && (
              <div className="max-w-5/6">{post.contentPartTwo}</div>
            )}

            <div className=" text-center text-3xl max-w-5/6">
              "{post.excerptTwo}"
            </div>

            <img
              src={post.thirdImage}
              alt="Third"
              className="w-full my-8 h-[400px] object-cover"
            />

            {post.contentPartThree && (
              <div className="max-w-5/6">{post.contentPartThree}</div>
            )}

            {Array.isArray(post.extraMediaContent) &&
              post.extraMediaContent.length > 0 && (
                <div className="my-8 max-w-4xl mx-auto">
                  <Carousel>
                    <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md">
                      {/* You can use any icon or character for arrows */}
                      &#8592;
                    </CarouselPrevious>

                    <CarouselContent className="overflow-hidden">
                      {post.extraMediaContent.map((url, index) => (
                        <CarouselItem
                          key={index}
                          className="w-full flex justify-center"
                          value={index}
                        >
                          <img
                            src={url}
                            alt={`Extra media ${index + 1}`}
                            className="max-h-[400px] object-cover rounded-md"
                          />
                        </CarouselItem>
                      ))}
                    </CarouselContent>

                    <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md">
                      &#8594;
                    </CarouselNext>
                  </Carousel>
                </div>
              )}
          </div>
        </div>

        <Footer />
      </div>
    </FadeInOnLoad>
  );
};

export default SinglePost;
