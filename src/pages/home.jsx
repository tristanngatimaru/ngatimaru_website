import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/navbar";
import veryCloseCarving from "../assets/images/headerimages/veryclosecarving.png";
import korowai from "../assets/images/headerimages/korowai.png";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://ngatimaruwebsitevite.local/wp-json/wp/v2/posts")
      .then((res) => setPosts(res.data))
      .catch((err) => console.error("Failed to fetch posts:", err));
  }, []);

  return (
    <div className="w-screen">
      <div className="relative w-screen h-full overflow-hidden">
        <img
          src={veryCloseCarving}
          alt=""
          className="w-full h-screen object-center object-cover "
        />

        {/* Navbar on top of image */}
        <div className="absolute top-0 left-0 w-full z-50 pt-10">
          <Navbar />
        </div>

        {/* Centered title text */}
        <h1 className="absolute w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl font-roboto-thin text-white text-center">
          NGĀTI MARU RŪNANGA
        </h1>
      </div>

      <div className="h-[500px] flex flex-col overflow-hidden">
        <img src={korowai} alt="" className="object-cover w-1/2" />
        <div className="w-1/2">
          <p className="text-black">hello</p>
        </div>
      </div>

      {/* Content below */}
      <h1 className="text-2xl font-bold mb-4">Latest Posts</h1>
      {posts.map((post) => (
        <div key={post.id} className="mb-6">
          <h2 className="text-xl font-semibold">{post.title.rendered}</h2>
          <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
        </div>
      ))}
    </div>
  );
}
export default Home;
