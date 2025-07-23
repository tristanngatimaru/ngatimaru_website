import { useState, useEffect } from "react";
import axios from "axios";
import Arrow from "../assets/images/icons/arrow.png";

import { Link } from "react-router-dom";

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
    <div className="  ">
      {loading ? (
        <p className="text-center">Loading posts...</p>
      ) : posts.length > 0 ? (
        posts.map((post) => (
          <div
            key={post.id}
            className=" relative w-full h-[300px]  shadow-lg group overflow-hidden"
          >
            {post._embedded?.["wp:featuredmedia"] && (
              <img
                src={post._embedded["wp:featuredmedia"][0].source_url}
                alt={post.title.rendered}
                className="w-full h-[300px] object-cover transition duration-500 group-hover:scale-105 group-hover:blur-sm group-hover:brightness-75"
              />
            )}

            <div className="absolute inset-0  bg-opacity-40 flex items-center">
              <div className="p-6 text-left max-w-md">
                <h2 className="text-3xl font-roboto-light text-white mb-3 uppercase">
                  {post.title.rendered}
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
