import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Arrow from "../assets/images/icons/arrow.png";
import { fetchCollection } from "../api/strapi";
import { shapePostData } from "../hooks/strapifields";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    fetchCollection("blog-posts", ["HeroMainImage"])
      .then((data) => {
        // Sort posts by createdAt descending (most recent first)
        const sorted = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        // Take only the first 2 posts
        const recentTwo = sorted.slice(0, 2);

        // Shape posts as you do
        const shaped = recentTwo.map(shapePostData);

        setPosts(shaped);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load posts.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center">Loading posts...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

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
                alt={post.title}
                onError={() =>
                  console.warn("Image failed to load:", post.heroMainImage)
                }
                className="w-full h-[300px] object-cover transition duration-500 group-hover:scale-105 group-hover:blur-sm group-hover:brightness-75"
              />
            ) : (
              <div className="w-full h-[300px] bg-gray-500 flex items-center justify-center text-white">
                No Image Found
              </div>
            )}

            <div className="absolute inset-0 bg-opacity-40 flex items-center">
              <div className="p-6 text-left max-w-md">
                <h2 className="text-3xl font-roboto-light text-white mb-3 uppercase">
                  {post.title || "No Title"}
                </h2>
                <Link to={`/post/${post.id}`}>
                  <div className="flex items-center gap-10 hover:scale-110 hover:translate-x-5 ease-in-out duration-200 cursor-pointer">
                    <h2 className="text-2xl font-roboto-light text-white">
                      READ MORE
                    </h2>
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
