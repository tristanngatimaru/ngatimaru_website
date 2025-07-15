import { useState, useEffect } from "react";
import axios from "axios";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://ngatimaruwebsitevite.local/wp-json/wp/v2/posts?_embed")
      .then((res) => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch posts:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="  min-h-screen">
      {loading ? (
        <p className="text-center">Loading posts...</p>
      ) : posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} className=" relative w-full h-[300px]  shadow-lg">
            {post._embedded?.["wp:featuredmedia"] && (
              <img
                src={post._embedded["wp:featuredmedia"][0].source_url}
                alt={post.title.rendered}
                className="w-full h-[300px] object-cover transition duration-500 hover:scale-105"
              />
            )}

            <div className="absolute inset-0  bg-opacity-40 flex items-center">
              <div className="p-6 text-left max-w-md">
                <h2 className="text-3xl font-roboto-light text-white mb-3">
                  {post.title.rendered}
                </h2>
                <div
                  className="text-white text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                />
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
