import React from "react";
import { IoShirtOutline } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";
import { RiDiscountPercentLine } from "react-icons/ri";
import { LuBadgeDollarSign } from "react-icons/lu";
import { CiFacebook } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
const Footer = () => {
  return (
    <div className=" my-5">
      <div className=" flex w-[90%] m-auto justify-evenly">
        <p className=" flex items-center font-bold gap-x-3 border-r border-gray-300 px-5 py-5">
          <span className=" text-[20px]">
            <IoShirtOutline />
          </span>
          <span>Everyday fresh products</span>
        </p>
        <p className=" flex items-center font-bold gap-x-3 border-r border-gray-300 px-5 py-5">
          <span className=" text-[24px]">
            <TbTruckDelivery />
          </span>
          <span>free delivery for order over $70</span>
        </p>
        <p className=" flex items-center font-bold gap-x-3 border-r border-gray-300 px-5 py-5">
          <span className=" text-[24px]">
            <RiDiscountPercentLine />
          </span>
          <span>Daily Mega Discount</span>
        </p>
        <p className=" flex items-center font-bold gap-x-3  px-5 py-5">
          <span className=" text-[24px]">
            <LuBadgeDollarSign />
          </span>
          <span>Best price on the market</span>
        </p>
      </div>
      <hr className="my-5" />

      {/* footer 2 */}

      <div className=" w-[90%] m-auto">
        <ul className=" flex justify-evenly items-center font-bold text-gray-600">
          <li className=" ">
            SHOP
            <div className=" text-gray-500 font-medium  pt-5">
              <ul className=" space-y-3">
                <li>Clothing</li>
                <li>mens</li>
                <li>womens</li>
                <li>kids</li>
                <li>purple</li>
              </ul>
            </div>
          </li>
          <li className=" ">
            BEKARY
            <div className="text-gray-500 font-medium pt-5">
              <ul className="space-y-3">
                <li>Clothing</li>
                <li>mens</li>
                <li>womens</li>
                <li>kids</li>
                <li>purple</li>
              </ul>
            </div>
          </li>
          <li className=" ">
            BEVERAGES
            <div className="  text-gray-500 font-medium pt-5">
              <ul className=" space-y-3">
                <li>Clothing</li>
                <li>mens</li>
                <li>womens</li>
                <li>kids</li>
                <li>purple</li>
              </ul>
            </div>
          </li>
          <li className="">
            MEATS & SEAFOODS
            <div className="  text-gray-500 font-medium pt-5">
              <ul className="  space-y-3">
                <li>Clothing</li>
                <li>mens</li>
                <li>womens</li>
                <li>kids</li>
                <li>purple</li>
              </ul>
            </div>
          </li>
          <li className="">
            Fruits and Vegetables
            <div className="  text-gray-500 font-medium pt-5">
              <ul className="  space-y-3">
                <li>Clothing</li>
                <li>mens</li>
                <li>womens</li>
                <li>kids</li>
                <li>purple</li>
              </ul>
            </div>
          </li>
        </ul>
      </div>

      {/* copyright part */}

      <div className="w-[80%] m-auto mt-10 flex justify-between items-center">
        <p>Copy rights by Darshan 2024.All rights reserved</p>
        <div className=" flex gap-x-5 items-center">
          <span className=" text-[32px]">
            <CiFacebook className=" hover:bg-blue-700 hover:text-white rounded-full" />
          </span>
          <span className=" text-[30px]">
            <FaInstagram className=" hover:bg-red-700 hover:text-white rounded-full" />
          </span>
          <span className=" text-[27px]">
            <BsTwitterX className=" hover:bg-blue-700 hover:text-white rounded-full" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
