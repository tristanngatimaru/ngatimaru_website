import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getBlogPosts } from "../api/blogPosts";
import { strapiImage } from "../api/strapiImage";
import SmartImage from "./SmartImage";

// Optimized loading component
const PostsLoader = () => (
  <div className="w-full h-[300px] bg-gray-100 animate-pulse flex items-center justify-center">
    <div className="text-gray-500">Loading posts...</div>
  </div>
);

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
      } catch {
        setError("Failed to load posts.");
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  if (loading) return <PostsLoader />;
  if (error) return <p className="text-center text-red-600 p-8">{error}</p>;

  return (
    <div className="bg-gray-50 py-16">
      {/* Section Header */}
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-roboto-light text-gray-800 uppercase tracking-wide mb-4">
          Latest News & Stories
        </h2>
        <div className="w-24 h-1 bg-gray-800 mx-auto mb-6"></div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Stay updated with the latest happenings, cultural events, and
          community stories from Ngāti Maru
        </p>
      </div>

      {/* Posts Content */}
      <div className="w-screen ">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post.id}
              className="relative w-full h-[300px] shadow-lg group overflow-hidden"
            >
              <SmartImage
                src={post.heroMainImage}
                alt={post.title || "Post image"}
                context="post"
                className="w-full h-[300px] object-cover transition duration-500 group-hover:scale-105 group-hover:blur-sm group-hover:brightness-75"
                loading="lazy"
              />

              <div
                className="absolute inset-0 flex items-center"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
              >
                <div className="p-8 md:p-12 text-left max-w-2xl">
                  <div className="text-xs font-roboto-medium text-white opacity-90 uppercase tracking-wider mb-2">
                    Blog Post • {new Date(post.eventDate).toLocaleDateString()}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-roboto-light text-white mb-4 uppercase leading-tight">
                    {post.title || "No Title"}
                  </h3>
                  <p className="text-sm font-roboto-light text-white mb-6 opacity-90">
                    By {post.author}
                  </p>
                  <Link to={`/post/${post.documentId}`}>
                    <div className="flex items-center gap-4 hover:scale-105 hover:translate-x-3 ease-in-out duration-200 cursor-pointer">
                      <div className="flex flex-col">
                        <h4 className="text-xl font-roboto-medium text-white">
                          READ FULL STORY
                        </h4>
                        <div className="w-20 h-0.5 bg-white mt-2 transform transition-all duration-300 group-hover:w-32"></div>
                      </div>
                      <div className="text-white opacity-75 group-hover:opacity-100 transition-opacity duration-200">
                        →
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16">
            <h3 className="text-2xl text-gray-600 mb-4">
              No stories available
            </h3>
            <p className="text-gray-500">
              Check back soon for updates from our community.
            </p>
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="max-w-6xl mx-auto text-center mt-16">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h3 className="text-2xl md:text-3xl font-roboto-light text-gray-800 mb-4">
            Have a Story to Share?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            We'd love to hear from our community members. Share your
            experiences, achievements, or cultural insights with Ngāti Maru.
          </p>
          <a
            href="mailto:admin@ngatimaru.iwi.nz?subject=Story Submission - Ngāti Maru Website&body=Kia ora,%0D%0A%0D%0AI would like to share a story for the Ngāti Maru website.%0D%0A%0D%0A[Please describe your story here]%0D%0A%0D%0ANgā mihi,"
            className="inline-block px-8 py-3 border-2 border-green-800 text-green-800 font-roboto-medium uppercase tracking-wide hover:bg-green-800 hover:text-white transition-colors duration-300"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}

export default Posts;
