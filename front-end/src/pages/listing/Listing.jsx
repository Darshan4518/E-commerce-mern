import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import slideBanner2 from "../../../assets/slideBanner2.jpg";
import { IoIosMenu } from "react-icons/io";
import { PiDotsNine } from "react-icons/pi";
import { BsFillGridFill } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import ProductItem from "../home/ProductItem";
import Pagination from "@mui/material/Pagination";
import { Context } from "@/store/Store";
import axios from "axios";

const Listing = () => {
  const { products, setProducts } = useContext(Context);

  const [showItems, setShowItems] = useState(12);
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(1);

  const handlePage = (value) => {
    setPage(value);
  };

  useEffect(() => {
    getPaginationData();
  }, []);

  useEffect(() => {
    getPaginationData();
  }, [page, show]);

  const getPaginationData = async () => {
    const { data } = await axios.get(
      `http://localhost:8000/api/products?page=${page}&limit=${showItems}`
    );
    console.log(data);
    setProducts(data.products);
  };

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <div className=" flex gap-x-10 w-full  my-10 px-10">
      <div className=" w-[15%]">
        <Sidebar />
      </div>
      <div className=" w-[85%]">
        <img src={slideBanner2} alt="slideBanner" className="  " />
        <div className=" w-full bg-slate-200 h-[8vh]   my-5 flex justify-between px-5">
          <div className=" flex gap-x-5 h-full items-center text-[22px] ">
            <IoIosMenu />
            <BsFillGridFill className=" text-[19px]" />
            <PiDotsNine />
          </div>
          <div className=" flex items-center relative ">
            <h2
              className=" flex items-center font-semibold cursor-pointer "
              onClick={() => {
                setShow(!show);
              }}
            >
              <span className=" text-[16px] px-2">Show </span>
              <span className=" flex items-center gap-x-1">
                {showItems} <IoIosArrowDown />
              </span>
            </h2>
            {show ? (
              <ul className=" bg-white px-5 text-center py-2 space-y-2 cursor-pointer absolute top-11 -right-3 z-50 shadow-md">
                <li
                  onClick={() => {
                    setShowItems(6);
                    setShow(false);
                  }}
                >
                  6
                </li>
                <li
                  onClick={() => {
                    setShowItems(9);
                    setShow(false);
                  }}
                >
                  9
                </li>
                <li
                  onClick={() => {
                    setShowItems(12);
                    setShow(false);
                  }}
                >
                  12
                </li>
                <li
                  onClick={() => {
                    setShowItems(15);
                    setShow(false);
                  }}
                >
                  15
                </li>
              </ul>
            ) : null}
          </div>
        </div>
        <div className=" flex flex-wrap gap-4 mx-auto w-[95%]">
          {products?.length !== 0 ? (
            products?.map((product, ind) => {
              return <ProductItem product={product} key={ind} />;
            })
          ) : (
            <h2 className=" text-center p-20 w-full">No product found !</h2>
          )}
        </div>
        <div className=" my-8 w-full flex justify-center">
          <Pagination
            count={10}
            page={page}
            color="primary"
            size="large"
            onChange={(e, value) => {
              handlePage(value);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Listing;
