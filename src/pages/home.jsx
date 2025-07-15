import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/navbar";
import veryCloseCarving from "../assets/images/headerimages/veryclosecarving.png";
import korowai from "../assets/images/headerimages/korowai.png";
import arrow from "../assets/images/icons/arrow.png";

function Home() {
  const [posts, setPosts] = useState([]);
  const [isStartUp, setStartUp] = useState(false);
  const [isAppear, setAppear] = useState(false);
  const [isButton, setButton] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => setStartUp(true), 500);
    const appearTimeout = setTimeout(() => setAppear(true), 2000);
    const buttonTimeout = setTimeout(() => setButton(true), 2000);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(appearTimeout);
      clearTimeout(buttonTimeout);
    };
  }, []);

  useEffect(() => {
    axios
      .get("http://ngatimaruwebsitevite.local/wp-json/wp/v2/posts")
      .then((res) => setPosts(res.data))
      .catch((err) => console.error("Failed to fetch posts:", err));
  }, []);

  return (
    <div className="w-screen overflow-hidden">
      <div
        className={`relative w-screen h-full overflow-hidden transition-all ease-in-out duration-500 ${
          isStartUp ? "opacity-100" : "opacity-0"
        } `}
      >
        <img
          src={veryCloseCarving}
          alt=""
          className="w-full h-[800px] object-center object-cover "
        />

        {/* Navbar on top of image */}
        <div className="absolute top-0 left-0 w-full z-50 pt-10">
          <Navbar />
        </div>

        {/* Centered title text */}
        <div className="absolute w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center pt-28">
          <div className="overflow-hidden h-[80px] w-full flex justify-center">
            <h1
              className={`transition-all duration-1000 ease-in-out text-7xl font-roboto-thin text-white text-center ${
                isAppear ? "translate-y-0" : "translate-y-20"
              }`}
            >
              NGĀTI MARU RŪNANGA
            </h1>
          </div>

          {/* Space between title and buttons */}

          <div className="mt-16 flex flex-col items-center gap-6">
            {/* REGISTER Button */}
            <div className="overflow-hidden h-[70px] w-full flex justify-center">
              <button
                className={`
    text-center outline-2 outline-white rounded-full text-white font-bold w-[200px] h-[60px] m-2 font-roboto-thin text-2xl hover:gradient
    transform
    ${isAppear ? "translate-y-0" : "translate-y-20"}
    ${
      isAppear
        ? "transition-transform duration-1000 ease-in-out"
        : "transition-transform duration-200 ease-in-out"
    }
    hover:scale-105 hover:transition-transform hover:duration-200
  `}
              >
                REGISTER
              </button>
            </div>

            {/* ARROW Button */}
            <div className="overflow-hidden h-[90px] w-full flex justify-center">
              <button
                className={` rounded-full
        w-[60px] h-[60px] m-2 flex items-center justify-center
        transform
        ${isAppear ? "translate-y-0" : "translate-y-20"}
        transition-transform duration-1000 ease-in-out
        hover:scale-110 hover:transition-transform hover:duration-200
        outline-2 outline-transparent hover:outline-white
      `}
              >
                <img src={arrow} alt="" className="w-10" />
              </button>
            </div>
          </div>
        </div>
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
