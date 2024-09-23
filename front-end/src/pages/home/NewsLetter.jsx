import { Button } from "@/components/ui/button";
import { EmailOutlined } from "@mui/icons-material";
import React from "react";
import coupon from "../../../assets/coupon.png";

const NewsLetter = () => {
  return (
    <div className=" bg-blue-900 w-full  h-[350px] my-6 text-white flex justify-between overflow-hidden">
      <div className=" ml-20 pt-16 flex flex-col gap-5">
        <h2 className=" font-semibold text-[19px] text-gray-300">
          $20 discount on your first order
        </h2>
        <p className=" font-semibold text-4xl">
          Join our newsletter and get....
        </p>
        <p className=" font-semibold text-gray-400">
          Join our email subscription now to get updates on <br />
          promotions and coupons
        </p>
        <div className=" w-[40vw] h-[8vh] bg-white">
          <span className=" text-gray-400 text-[25px] ml-3 w-[15%]">
            <EmailOutlined className=" " />
          </span>
          <input
            type="email"
            className=" w-[70%] h-full ml-3 border-none outline-none text-black"
            placeholder="Enter Email...."
            autoFocus
          />

          <Button className=" bg-blue-600 mx-4">Subscribe</Button>
        </div>
      </div>
      <img
        src={coupon}
        alt="coupon"
        className=" w-[30vw] h-[80%] mt-[5%] mr-5"
      />
    </div>
  );
};

export default NewsLetter;
