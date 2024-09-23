import React, { useContext, useEffect, useState } from "react";
import { IoIosMenu } from "react-icons/io";
import { Button } from "@mui/material";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Context } from "@/store/Store";

const AllCategaries = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { categories } = useContext(Context);

  return (
    <div className=" w-[15%] relative group ml-10">
      <Button
        className=" flex gap-x-3 items-center  "
        style={{
          backgroundColor: "orange",
          color: "white",
          borderRadius: "50px",
          padding: "10px 8px",
        }}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <span className=" text-[22px]">
          <IoIosMenu />
        </span>
        <span>ALL CATEGORIES</span>
        <span className=" text-[22px]">
          <MdKeyboardArrowDown />
        </span>
      </Button>
      {isOpen ? (
        <div className=" z-10 absolute top-[130%]  bg-white shadow-lg text-gray-500 font-medium  min-w-[220px] duration-300 space-y-3 -left-3">
          <ul className=" p-3 space-y-3 h-auto">
            {categories?.map((cat, ind) => {
              return <li key={ind}>{cat.name}</li>;
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default AllCategaries;
