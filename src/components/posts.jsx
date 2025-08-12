import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Arrow from "../assets/images/icons/arrow.png";
import { getBlogPosts } from "../api/blogPosts";
import { strapiImage } from "../api/strapiImage";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await getBlogPosts({
          sort: ["publishedAt:desc"],
          pagination: {
            limit: 2,
          },
        });

        if (!Array.isArray(data)) {
          setError("Invalid data format");
          return;
        }

        // Transform the posts for UI
        const transformedPosts = data.map((post) => ({
          id: post.id,
          documentId: post.documentId,
          title: post.Title,
          heroMainImage: post.HeroMainImage?.url
            ? strapiImage(post.HeroMainImage.url)
            : null,
          createdAt: post.createdAt,
          author: post.Author,
          eventDate: post.EventDate,
        }));

        setPosts(transformedPosts);
      } catch (err) {
        console.error(err);
        setError("Failed to load posts.");
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  if (loading) return <p className="text-center">Loading posts...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div
            key={post.id}
            className="relative w-full h-[300px] shadow-lg group overflow-hidden"
          >
            {post.heroMainImage ? (
              <img
                src={post.heroMainImage}
                alt={post.title || "Post image"}
                className="w-full h-[300px] object-cover transition duration-500 group-hover:scale-105 group-hover:blur-sm group-hover:brightness-75"
                onError={(e) => {
                  console.warn("Image failed to load:", post.heroMainImage);
                  e.target.src = ""; // Clear the broken image
                  e.target.classList.add("bg-gray-500");
                }}
              />
            ) : (
              <div className="w-full h-[300px] bg-gray-500 flex items-center justify-center text-white">
                No Image Available
              </div>
            )}

            <div className="absolute inset-0 bg-opacity-40 flex items-center">
              <div className="p-6 text-left max-w-md">
                <h2 className="text-3xl font-roboto-light text-white mb-3 uppercase">
                  {post.title || "No Title"}
                </h2>
                <Link to={`/post/${post.documentId}`}>
                  <div className="flex items-center gap-10 hover:scale-110 hover:translate-x-5 ease-in-out duration-200 cursor-pointer">
                    <div className="flex flex-col">
                      <h2 className="text-2xl font-roboto-light text-white">
                        READ MORE
                      </h2>
                      <p className="text-sm font-roboto-light text-white mt-1">
                        By {post.author} -{" "}
                        {new Date(post.eventDate).toLocaleDateString()}
                      </p>
                    </div>
                    <img src={Arrow} alt="" className="w-[40px] -rotate-90" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center">No posts found.</p>
      )}
    </div>
  );
}

export default Posts;
