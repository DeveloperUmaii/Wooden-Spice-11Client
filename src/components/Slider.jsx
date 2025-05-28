import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';

const Slider = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios(`${import.meta.env.VITE_API_URL}/foods`);
        setJobs(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, []);

  return (
    <div className="my-8 w-full max-w-6xl mx-auto px-4">
      <div className="relative rounded-xl overflow-hidden shadow-lg">
        {/* Overlay Content */}
        <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-white bg-black bg-opacity-20 pointer-events-none">
          <NavLink to='/gallery' className="mt-11 bg-[#ff4a1363] hover:bg-[#ff4a1398] text-white font-semibold px-6 py-2 rounded-lg pointer-events-auto">
            Explore More
          </NavLink>
        </div>

        {/* Swiper Content */}
        <Swiper
          modules={[Autoplay]}
          spaceBetween={10}
          slidesPerView={1}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          className="w-full"
        >
          {jobs.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative w-full h-40 sm:h-52 md:h-64 lg:h-80 xl:h-96">
                            <img
                                src={slide.image_url}
                                alt={`Slide ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                            {/* Overlay content */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-30 text-white">
                                <h2 className="tracking-[.75em] text-lg md:text-2xl text-[#fff] font-bold mb-10">{slide.job_title}</h2>
                            </div>
                        </div>
                    </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Slider;
