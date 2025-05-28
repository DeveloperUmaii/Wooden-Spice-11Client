import axios from "axios";
import React, { useEffect, useState } from "react";

const MovingImageRight = () => {
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
    <div className="overflow-hidden h-10 md:h-14 lg:h-18 xl:h-24 relative w-full bg-black">
      <div className="whitespace-nowrap animate-scrollRight absolute top-0 left-0 flex">
        {/* প্রথমবার লুপ */}
        {jobs.map((item, index) => (
          <img
            key={`first-${index}`}
            src={item.image_url}
            alt={`scroll-img-${index}`}
            className="h-10 md:h-14 lg:h-18 xl:h-24 w-auto inline-block "
          />
        ))}
        {/* দ্বিতীয়বার লুপ যেন ইনফিনিট চলে */}
        {jobs.map((item, index) => (
          <img
            key={`second-${index}`}
            src={item.image_url}
            alt={`scroll-img-duplicate-${index}`}
            className="h-10 md:h-14 lg:h-18 xl:h-24 w-auto inline-block "
          />
        ))}
        {/* দ্বিতীয়বার লুপ যেন ইনফিনিট চলে */}
        {jobs.map((item, index) => (
          <img
            key={`second-${index}`}
            src={item.image_url}
            alt={`scroll-img-duplicate-${index}`}
            className="h-10 md:h-14 lg:h-18 xl:h-24 w-auto inline-block "
          />
        ))}
      </div>
    </div>
  );
};

export default MovingImageRight;
