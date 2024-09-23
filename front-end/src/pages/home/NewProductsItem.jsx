import React, { useContext } from "react";
import banner2 from "../../../assets/banner2.jpg";
import banner3 from "../../../assets/banner3.jpg";
import banner4 from "../../../assets/banner4.jpg";
import { Button } from "@/components/ui/button";
import { IoMdArrowForward } from "react-icons/io";
import ProductItem from "./ProductItem";
import { Context } from "@/store/Store";
import { Link } from "react-router-dom";

const NewProductsItem = () => {
  const { products } = useContext(Context);
  return (
    <section className=" mb-5">
      <div className="  mb-10 flex gap-x-10">
        <div className=" ml-10 ">
          <img src={banner2} alt="banner2" className="sticky top-[10px] z-50" />
        </div>
        <div className=" w-[75vw]">
          {/* products header */}

          <div className=" flex justify-between items-center ">
            <div>
              <h2 className=" text-[25px] font-bold">New Products</h2>
              <p className=" font-light text-gray-600 mb-5">
                New Products with updated stocks
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

          {/* products */}

          <div className=" flex flex-wrap gap-y-3">
            {products?.lenth !== 0 &&
              products?.map((product, ind) => {
                return <ProductItem product={product} key={ind} />;
              })}
          </div>
        </div>
      </div>

      {/* Banners */}

      <div className=" mb-5 mr-5 flex gap-x-8 w-[75vw] m-auto items-center">
        <img src={banner3} alt="banner3" className=" w-[500px] rounded-lg" />
        <img src={banner4} alt="banner4" className=" w-[500px] rounded-lg" />
      </div>
    </section>
  );
};

export default NewProductsItem;
