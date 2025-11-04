import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FadeInOnLoad from "../../components/loadonstartanimation";
import HamburgerNav from "../../components/hamburgerNav";
import AppearRefresh from "../../components/appearrefresh";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { getBlogPost } from "../../api/blogPosts";
import { strapiImage } from "../../api/strapiImage";
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
    async function loadPost() {
      try {
        const data = await getBlogPost(id);
        if (!data) {
          setError("Post not found");
          return;
        }

        // Transform the data to match your component's expectations
        const transformedPost = {
          title: data.Title,
          eventDate: data.EventDate || data.publishedAt || data.createdAt,
          author: data.Author,
          heroMainImage: data.HeroMainImage
            ? strapiImage(data.HeroMainImage.url)
            : null,
          contentPartOne: data.ContentPartOne || "", // Use empty string if null
          excerptOne: data.ExcerptOne || "", // Use empty string if null
          secondaryImage: data.SecondaryImage
            ? strapiImage(data.SecondaryImage.url)
            : null,
          contentPartTwo: data.ContentPartTwo || "", // Use empty string if null
          excerptTwo: data.ExcerptTwo || "", // Use empty string if null
          thirdImage: data.ThirdImage ? strapiImage(data.ThirdImage.url) : null,
          contentPartThree: data.ContentPartThree || "", // Use empty string if null
          extraMediaContent: (() => {
            if (!Array.isArray(data.ExtraMediaContent)) {
              return [];
            }
            const urls = data.ExtraMediaContent.filter((img) => img && img.url) // Make sure we have valid image objects
              .map((img) => {
                const url = strapiImage(img.url);
                return url;
              });
            return urls;
          })(),
        };

        setPost(transformedPost);
      } catch {
        setError("Failed to load post");
      } finally {
        setLoading(false);
      }
    }

    loadPost();
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
          <div
            className={`relative ${post.heroMainImage ? "min-h-[500px]" : "min-h-[300px] bg-gray-800"}`}
          >
            {post.heroMainImage && (
              <img
                src={post.heroMainImage}
                alt={post.title}
                className="w-full h-[500px] object-center object-cover overflow-hidden brightness-75"
              />
            )}

            <div
              className={`${post.heroMainImage ? "absolute" : "relative"} flex flex-col w-full ${post.heroMainImage ? "top-1/4 pt-20" : "py-20"} z-20`}
            >
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
            {post.contentPartOne && post.contentPartOne.trim() && (
              <div className="max-w-5/6">{post.contentPartOne}</div>
            )}

            {post.excerptOne && post.excerptOne.trim() && (
              <div className="text-center text-3xl max-w-5/6">
                "{post.excerptOne}"
              </div>
            )}

            {post.secondaryImage && (
              <img
                src={post.secondaryImage}
                alt="Secondary"
                className="w-full my-8 h-[400px] object-cover"
              />
            )}

            {post.contentPartTwo && post.contentPartTwo.trim() && (
              <div className="max-w-5/6">{post.contentPartTwo}</div>
            )}

            {post.excerptTwo && post.excerptTwo.trim() && (
              <div className="text-center text-3xl max-w-5/6">
                "{post.excerptTwo}"
              </div>
            )}

            {post.thirdImage && (
              <img
                src={post.thirdImage}
                alt="Third"
                className="w-full my-8 h-[400px] object-cover"
              />
            )}

            {post.contentPartThree && post.contentPartThree.trim() && (
              <div className="max-w-5/6">{post.contentPartThree}</div>
            )}

            {(() => {
              return Array.isArray(post.extraMediaContent) &&
                post.extraMediaContent.length > 0 ? (
                <div className="w-full  py-12">
                  <div className="text-center mb-8 font-roboto-light text-2xl">
                    {/* {`Gallery (${post.extraMediaContent.length} images)`} */}
                  </div>
                  <div className="max-w-7xl mx-auto px-4">
                    <Carousel className="w-full">
                      <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-md hover:scale-110 transition-transform">
                        &#8592;
                      </CarouselPrevious>

                      <CarouselContent>
                        {post.extraMediaContent.map((url, index) => {
                          return (
                            <CarouselItem key={index} className="basis-full">
                              <div className="p-4">
                                <div className="relative w-full h-[600px] bg-gray-100 rounded-lg overflow-hidden">
                                  <img
                                    src={url}
                                    alt={`Gallery image ${index + 1}`}
                                    className="absolute inset-0 w-full h-full object-contain mx-auto"
                                  />
                                </div>
                              </div>
                            </CarouselItem>
                          );
                        })}
                      </CarouselContent>

                      <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-md hover:scale-110 transition-transform">
                        &#8594;
                      </CarouselNext>
                    </Carousel>
                  </div>
                </div>
              ) : null;
            })()}
          </div>
        </div>

        <Footer />
      </div>
    </FadeInOnLoad>
  );
};

export default SinglePost;
