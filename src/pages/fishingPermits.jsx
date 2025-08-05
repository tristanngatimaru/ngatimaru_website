import { useEffect, useState } from "react";
import { fetchBlogPosts } from "../api/strapi";
import { shapePostData } from "../hooks/strapifields";
import Footer from "../components/footer";
import HeroHeader from "../components/header";

function Fishing() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBlogPosts()
      .then((data) => {
        const shaped = data.map(shapePostData);
        setPosts(shaped);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load posts.");
      });
  }, []);

  return (
    <div className="w-full">
      <HeroHeader />

      <div className="px-10 py-20">
        <h1 className="text-3xl font-bold mb-6">Fishing Blog Posts</h1>

        {error && <p className="text-red-600">{error}</p>}

        {!error && posts.length === 0 ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {posts.map((post) => (
              <li key={post.id} className="mb-10">
                <h2 className="text-xl font-semibold">
                  {post.title || "No Titles"}
                </h2>
                <p className="text-gray-700 mb-2">{post.excerpt}</p>

                {/* Split content into paragraphs */}
                {post.content && (
                  <>
                    {post.content.split("\n\n").map((paragraph, i) => (
                      <div key={i} className="mb-4">
                        <p className="text-gray-700">{paragraph}</p>

                        {/* Insert images after certain paragraphs */}
                        {i === 0 && post.heroMainImage && (
                          <img
                            src={post.heroMainImage}
                            alt={`${post.title} hero`}
                            className="my-4 max-w-full h-auto"
                          />
                        )}
                        {i === 1 && post.secondaryImage && (
                          <img
                            src={post.secondaryImage}
                            alt={`${post.title} secondary`}
                            className="my-4 max-w-full h-auto"
                          />
                        )}
                        {i === 2 && post.thirdImage && (
                          <img
                            src={post.thirdImage}
                            alt={`${post.title} third`}
                            className="my-4 max-w-full h-auto"
                          />
                        )}
                      </div>
                    ))}
                  </>
                )}

                {/* Extra media gallery */}
                {post.extraMedia.length > 0 && (
                  <div className="flex flex-wrap gap-4 mt-4">
                    {post.extraMedia.map((url, i) => (
                      <img
                        key={i}
                        src={url}
                        alt={`${post.title} extra media ${i + 1}`}
                        className="max-w-[150px] h-auto rounded"
                      />
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Fishing;
