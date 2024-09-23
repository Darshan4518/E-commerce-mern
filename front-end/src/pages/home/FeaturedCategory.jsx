import React, { useContext, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Context } from "@/store/Store";

const FeaturedCategory = () => {
  const [swiperRef, setSwiperRef] = useState(null);

  const { categories } = useContext(Context);

  return (
    <div className=" w-[95%] m-auto my-10">
      <h2 className=" font-bold text-2xl my-3 uppercase">
        Featured Categories
      </h2>
      <Swiper
        onSwiper={setSwiperRef}
        slidesPerView={10}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        {categories.length !== 0 &&
          categories?.map((cat, ind) => {
            return (
              <SwiperSlide key={ind} className=" py-2 cursor-pointer">
                <div
                  className={`w-[130px] h-[130px] flex flex-col gap-3    p-4 items-center rounded-lg shadow-xl`}
                  style={{ backgroundColor: cat.color }}
                >
                  <img
                    src={cat.images[0]}
                    alt="category"
                    className=" w-[60%] h-[60%] object-fill"
                  />
                  <p className=" text-center text-[13pxpx] font-bold">
                    {cat.name}
                  </p>
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
};

export default FeaturedCategory;
