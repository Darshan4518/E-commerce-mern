import React, { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "@/components/ui/button";
import { IoMdArrowForward } from "react-icons/io";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import ProductItem from "../home/ProductItem";
import { Link } from "react-router-dom";
const ReacentlyViewedProducts = ({ product }) => {
  const [swiperRef, setSwiperRef] = useState(null);
  const [viewedProducts, setViewedProducts] = useState([product]);

  useEffect(() => {
    if (viewedProducts == "") {
      setViewedProducts(product);
    }

    if (!viewedProducts.includes(product)) {
      setViewedProducts([...viewedProducts, product]);
    }
  }, [product]);

  return (
    <div className=" w-[90%] m-auto my-10">
      <div className=" flex justify-between items-center my-8">
        <div>
          <h2 className=" text-[20px] font-bold uppercase">
            recently viewed Product
          </h2>
        </div>
        <Link to={"/shop"}>
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
          slidesPerView={5}
          spaceBetween={20}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
        >
          {viewedProducts.length !== 0 &&
            viewedProducts.map((product, ind) => {
              return (
                <SwiperSlide key={ind}>
                  <ProductItem product={product} />
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </div>
  );
};

export default ReacentlyViewedProducts;
