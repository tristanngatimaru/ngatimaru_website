import { useState, useEffect } from "react";

import Navbar from "../components/navbar";
import veryCloseCarving from "../assets/images/headerimages/veryclosecarving.png";
import korowai from "../assets/images/headerimages/korowai.png";
import arrow from "../assets/images/icons/arrow.png";
import arrowBlack from "../assets/images/icons/arrow_Black.png";
import Posts from "../components/posts";

function Home() {
  const [isStartUp, setStartUp] = useState(false);
  const [isAppear, setAppear] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => setStartUp(true), 500);
    const appearTimeout = setTimeout(() => setAppear(true), 2000);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(appearTimeout);
    };
  }, []);

  return (
    <div className=" overflow-hidden">
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
      <div className="h-[500px] flex flex-row overflow-hidden">
        <img src={korowai} alt="" className="object-cover w-1/2 h-full" />
        <div className="w-1/2 h-full bg-white flex flex-col items-center justify-center py-6 px-18 text-center">
          <p className="font-roboto-light text-3xl">Nau mai, haere mai</p>
          <p className="font-roboto-light text-3xl mt-10">
            Mai i Ngā Kuri-a-Whārei ki Tīkapa Moana, ko Hauraki te rohe whenua,
            ko Marutūāhu te tangata, ko Ngāti Maru te iwi. Tātou te hunga ora –
            hui e, tāiki e!
          </p>
          <p className="font-roboto-light text-3xl mt-15 ">Full Mihi</p>
          <button className="hover:outline-black outline-transparent outline-2 rounded-full p-10 ease-in-out duration-200">
            <img
              src={arrowBlack}
              alt=""
              className="w-10 hover:scale-110 ease-in-out duration-200"
            />
          </button>
        </div>
      </div>
      d
      <Posts />
    </div>
  );
}
export default Home;
