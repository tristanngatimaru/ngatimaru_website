import { useState, useEffect, useRef } from "react";

import Navbar from "../components/navbar";
import veryCloseCarving from "../assets/images/headerimages/veryclosecarving.png";
import korowai from "../assets/images/headerimages/korowai.png";
import arrow from "../assets/images/icons/arrow.png";
import arrowBlack from "../assets/images/icons/arrow_Black.png";
import Posts from "../components/posts";
import Footer from "../components/footer";
import HamburgerNav from "../components/hamburgerNav";

function FadeInSection({ children }) {
  const ref = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.5,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-[2000ms] ease-in-out ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
      }`}
    >
      {children}
    </div>
  );
}

function Home() {
  const [isStartUp, setStartUp] = useState(false);
  const [isAppear, setAppear] = useState(false);
  const isMobile = window.innerWidth < 1024;

  const [isExpanded, setIsExpanded] = useState(false);

  const expandMihi = () => {
    setIsExpanded(!isExpanded);
  };

  const targetRef = useRef(null);

  const handleScroll = () => {
    targetRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => setStartUp(true), 500);
    const appearTimeout = setTimeout(
      () => setAppear(true),
      isMobile ? 500 : 2000
    );

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(appearTimeout);
    };
  });

  return (
    <div className="">
      <HamburgerNav />
      <div
        className={`relative w-full h-full overflow-hidden transition-all ease-in-out duration-500 ${
          isStartUp ? "opacity-100" : "opacity-0"
        } `}
      >
        <img
          src={veryCloseCarving}
          alt=""
          className="w-full h-[800px] object-center object-cover overflow-hidden"
        />

        {/* Navbar on top of image */}
        <div className="absolute top-0 left-0 w-full z-50 pt-10">
          <Navbar />
        </div>

        {/* Centered title text */}
        <div className="absolute w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center pt-28">
          <div className="overflow-hidden h-[80px] w-full flex justify-center">
            <h1
              className={`transition-all duration-1000 ease-in-out text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-roboto-thin text-white text-center ${
                isAppear ? "translate-y-0" : "translate-y-20"
              }`}
            >
              NGĀTI MARU RŪNANGA
            </h1>
          </div>

          {/* Space between title and buttons */}

          <div className="mt-16 flex flex-col items-center gap-6">
            {/* REGISTER Button */}
            <div className="overflow-hidden h-[80px] w-full flex justify-center">
              <div
                className={`
      transition-all duration-1000 ease-in-out
      ${isAppear ? "translate-y-0" : "translate-y-20"}
    `}
              >
                <button className="text-center outline-2 outline-white rounded-full text-white font-bold w-[200px] h-[60px] m-2 font-roboto-thin text-2xl hover:scale-105 duration-200 ease-in-out">
                  REGISTER
                </button>
              </div>
            </div>

            {/* ARROW Button */}
            <div className="overflow-hidden h-[90px] w-full flex justify-center ">
              <div
                className={` rounded-full
        w-[60px] h-[60px] m-2 flex items-center justify-center
        transform
        ${isAppear ? "translate-y-0" : "translate-y-20"}
        transition-transform duration-1000 ease-in-out

        
      `}
              >
                <button
                  onClick={handleScroll}
                  className="hover:scale-110 active:scale-95 ease-in-out duration-200 hover:outline-white outline-transparent outline-2 rounded-full p-3"
                >
                  <img src={arrow} alt="" className="w-10" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FadeInSection>
        <div
          ref={targetRef}
          className="h-[500px] pt-20 lg:pt-0 flex flex-row overflow-hidden"
        >
          <img
            src={korowai}
            alt=""
            className={`object-cover w-1/2 h-full lg:block hidden`}
          />
          <div
            className={`w-screen lg:w-1/2 h-full bg-white flex flex-col items-center justify-center py-6 px-18 text-center `}
          >
            <p className="font-roboto-light text-3xl pb-10">
              Nau mai, haere mai
            </p>
            <p className="font-roboto-light text-xl md:text-3xl ">
              Mai i Ngā Kuri-a-Whārei ki Tīkapa Moana, ko Hauraki te rohe
              whenua, ko Marutūāhu te tangata, ko Ngāti Maru te iwi. Tātou te
              hunga ora – hui e, tāiki e!
            </p>
            <p className="font-roboto-light text-3xl pt-10 pb-5">Full Mihi</p>
            <button
              onClick={expandMihi}
              className={`hover:outline-black active:scale-95 hover:scale-110 ease-in-out duration-200  outline-transparent outline-2 rounded-full p-3 ${
                isExpanded ? "rotate-180" : "rotate-0"
              }`}
            >
              <img src={arrowBlack} alt="" className="w-10 " />
            </button>
          </div>
        </div>
        <div
          className={` transition-all duration-700 ease-in-out overflow-hidden ${
            isExpanded ? "max-h-[400vh]" : "max-h-0"
          }`}
        >
          <div className="p-4 flex flex-col gap-12 px-10 lg:px-40 py-20 items-center">
            <p className="text-center text-2xl font-roboto-light">
              Tènei te raukawakawa, i waiwai i roto i Te Puna Wai-ora-o-Tàne kia
              pata pata kei runga i to tinana; ànei te rau kawakawa; unuhia te
              peka ki runga; kia whakataka te hau ki te Tonga; unuhia te peka ki
              raro; ka whakataka te hau ki te Muri; kia màkinakina a uta, kia
              màtaratara ki tai, kia hiake ana te atakura; he tio, he huka, he
              hau hunga… Kia whakatù ki te rangi, whakamaua rangi, kia tìna! hui
              e, Taiki e!
            </p>
            <p className="text-center text-2xl font-roboto-light">
              Mai i Ngà Kurì-a-whàrei i te Tonga , ki Mahurangi i te Muri, Ànei
              ngà maunga tapu, mai Moehau ka piki ki Te Aroha, peke atu ki te
              Uru, ko Te Hapu-a-Kohe, ka heke ki Te Kohukohunui, tae atu ki
              Mahurangi, Ko Tìkapa, ko Te Taitamawahine, ngà moana karekare, ngà
              moana marino, e hora nei Hauraki te rohe whenua Marutùàhu te
              tangata. Ngàti Maru te iwi.
            </p>

            <p className="text-center text-2xl font-roboto-light">
              Ko te kupu tuatahi, ki to tàtou kaihanga, nàna nei te kàkano i
              ruia mai i Rangiàtea, arà, nàna nei tàtou katoa. Ngà mihi maioha
              ki Te Whare Kàhui Àriki, ki tò tàtou Kìngi, Tùheitia, e noho nei i
              te taumata tapu ò òna tùpuna, ò tòna whaea. Ki a koutou rà rire,
              rire, hau, pai màrire. Ki ò tàtou tini aitua, ki a ràtou mà kua
              huri ki tua o te àrai, ki Te Pùtahitanga o Rehua, hàere koutou,
              hàere koutou, hàere atu rà. Ràtou te hunga wairua, ràtou ki a
              ràtou, tàtou te hunga ora, tàtou nei ki a tàtou, tàtou te hunga
              oranga pùmautanga, tau atu rà, tau mai nei, e tau ana nei i runga
              i te pepehà e paiheretia e tàtou.
            </p>
            <div>
              <button
                onClick={expandMihi}
                className={`hover:outline-black hover:scale-110 ease-in-out duration-200  outline-transparent outline-2 rounded-full p-3 rotate-180 active:scale-95`}
              >
                <img src={arrowBlack} alt="" className="w-10 " />
              </button>
            </div>
          </div>
        </div>
      </FadeInSection>
      <FadeInSection>
        <Posts />
      </FadeInSection>

      <Footer />
    </div>
  );
}
export default Home;
