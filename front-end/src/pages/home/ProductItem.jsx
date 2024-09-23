import React, { useContext, useEffect, useState } from "react";
import Rating from "@mui/material/Rating";

import { SlSizeFullscreen } from "react-icons/sl";
import { MdFavoriteBorder } from "react-icons/md";
import ProductDetailModal from "./ProductDetailModal";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { IoCartOutline } from "react-icons/io5";

import { Context } from "@/store/Store";

const ProductItem = ({ product }) => {
  const [openModal, setOpenModal] = useState(false);
  const [item, setItem] = useState({});
  const { getCartData } = useContext(Context);

  const handleCartData = async (id) => {
    const cartItem = {
      id,
      quantity: 1,
      subTotal: product.price,
    };
    const { data } = await axios.post(
      `http://localhost:8000/api/cart/create`,
      cartItem
    );
    if (data.msg !== undefined) {
      alert(data.msg);
    }
    getCartData();
  };

  return (
    <>
      <div className=" w-[270px] h-[400px] border p-3 relative group">
        <span
          className="py-1  px-3  text-white absolute top-3 left-3 rounded-lg text-[12px] "
          style={{ backgroundColor: product?.category?.color }}
        >
          {product?.discount}%
        </span>
        <div className=" absolute  space-y-7 opacity-0 invisible  top-4 right-5 group-hover:opacity-100 group-hover:visible duration-300 ease-in-out">
          <p
            className=" text-[20px] cursor-pointer"
            onClick={() => {
              setOpenModal(true);
              setItem(product);
            }}
          >
            <SlSizeFullscreen />
          </p>
          <p className=" text-[25px] cursor-pointer">
            <MdFavoriteBorder />
          </p>
        </div>
        <div className=" h-[40%] w-full mt-5">
          <img
            src={product?.images ? product?.images[0] : ""}
            alt="item"
            className=" h-[150px] m-auto "
          />
        </div>
        <div className="mt-4 flex flex-col gap-3">
          <Link to={`/product/${product?._id}`}>
            <h2 className=" text-[18px] font-semibold text-gray-500 line-clamp-1">
              {product?.name}
            </h2>
          </Link>
          <p className=" text-green-400 text-[14px] font-semibold">IN STOCK</p>
          <Rating
            name="simple-controlled"
            value={product?.rating}
            readOnly
            precision={0.5}
          />
          <p className=" flex gap-x-3 items-center">
            <span className=" line-through text-gray-500 text-[17px] font-bold">
              ${product?.oldPrice}
            </span>
            <span className=" text-orange-800 text-[20px] font-bold">
              ${product?.price}
            </span>
          </p>
          <Button
            variant="outline"
            className="rounded-2xl border border-blue-600"
            style={{
              color: "blue",
            }}
            onClick={() => handleCartData(product._id)}
          >
            <span className=" cursor-pointer">Add to cart</span>
            <span className=" ml-3 text-[22px] cursor-pointer">
              <IoCartOutline />
            </span>
          </Button>
        </div>
      </div>
      {openModal ? (
        <ProductDetailModal
          setOpenModal={setOpenModal}
          openModal={openModal}
          item={item}
        />
      ) : null}
    </>
  );
};

export default ProductItem;
