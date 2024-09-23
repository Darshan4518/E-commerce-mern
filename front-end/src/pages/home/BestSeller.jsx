import banner1 from "../../../assets/banner1.jpg";
import { Button } from "@/components/ui/button";
import { IoMdArrowForward } from "react-icons/io";
import React, { useContext, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";

import ProductItem from "./ProductItem";
import { Context } from "@/store/Store";
import { Link } from "react-router-dom";

const BestSeller = () => {
  const [swiperRef, setSwiperRef] = useState(null);
  const { products } = useContext(Context);

  return (
    <div className=" my-10 flex gap-x-10 ">
      <div className=" ml-10 ">
        <img src={banner1} alt="banner1" className="sticky top-[10px] z-50" />
      </div>
      <div className=" w-[75vw]">
        <div className=" flex justify-between items-center ">
          <div>
            <h2 className=" text-[25px] font-bold">BEST SELLERS</h2>
            <p className=" font-light text-gray-600 mb-5">
              Don't miss the current offers until the end of july
            </p>
          </div>
          <Link to="/shop">
            <Button
              variant="outline"
              className="rounded-2xl border border-red-600"
            >
              View All
              <span className=" ml-3 text-[18px]">
                <IoMdArrowForward />
              </span>
            </Button>
          </Link>
        </div>
        <div>
          <Swiper
            onSwiper={setSwiperRef}
            slidesPerView={4}
            spaceBetween={15}
            navigation={true}
            modules={[Navigation]}
            className="mySwiper"
          >
            {products?.length !== 0 &&
              products?.map((product, ind) => {
                return (
                  <SwiperSlide key={ind}>
                    <ProductItem product={product} />
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default BestSeller;
