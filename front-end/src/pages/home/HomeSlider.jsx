import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const HomeSlider = () => {
  return (
    <div className=" w-[95%] m-auto select-none">
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        <SwiperSlide>
          <img
            src="https://m.media-amazon.com/images/G/31/img24/Fashion/AF/Flip/Springsummerflip/CMLheros/PC/7._CB580691776_.jpg"
            alt="banner"
            className=" h-[400px]"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://m.media-amazon.com/images/G/31/img24/Fashion/AF/Flip/Springsummerflip/CMLheros/PC/1._CB580691776_.jpg"
            alt="banner"
            className=" h-[400px]"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://m.media-amazon.com/images/G/31/img24/Fashion/AF/Flip/Springsummerflip/CMLheros/PC/3._CB580691776_.jpg"
            alt="banner"
            className=" h-[400px]"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://m.media-amazon.com/images/G/31/img24/Fashion/AF/Flip/Springsummerflip/CMLheros/PC/4._CB580691776_.jpg"
            alt="banner"
            className=" h-[400px]"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HomeSlider;
