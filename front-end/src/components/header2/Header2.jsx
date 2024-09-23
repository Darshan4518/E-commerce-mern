import React, { useContext, useEffect, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

import AllCategaries from "./AllCategaries";
import { Context } from "@/store/Store";
import { Link } from "react-router-dom";
import axios from "axios";
const Header2 = () => {
  const { categories, subCategories, setProducts } = useContext(Context);
  const [subCategory, setSubCategory] = useState("");

  const getSubCatData = async (subCat) => {
    setSubCategory(subCat);
    if (subCategory) {
      const { data } = await axios.get(
        `http://localhost:8000/api/product/filter/subcategory?subCat=${subCategory}`
      );
      console.log(data.products);
      setProducts(data.products);
    }
  };

  useEffect(() => {
    getSubCatData();
  }, [subCategory]);

  return (
    <nav className=" mt-8">
      <div className=" flex gap-x-15 w-[100%] items-center">
        <AllCategaries />
        <div className=" w-[85%]">
          <ul className=" flex justify-evenly items-center font-bold text-gray-600">
            <Link to="/">
              <li>HOME</li>
            </Link>
            <Link to="/shop">
              <li>SHOP</li>
            </Link>
            {categories?.map((cat, ind) => {
              return (
                <li
                  className=" flex items-center gap-x-1 relative group cursor-pointer uppercase"
                  key={ind}
                >
                  {cat.name}
                  <span className=" text-[20px] ">
                    <MdKeyboardArrowDown />
                  </span>
                  <div className=" absolute top-[150%]  bg-white shadow-lg text-gray-500 font-medium  min-w-[150px] duration-300  -left-6 opacity-0 group-hover:opacity-100 invisible group-hover:visible z-50 ">
                    <ul className="p-3 space-y-3">
                      {subCategories?.length !== 0 &&
                        subCategories?.map((subCat, ind) => {
                          return subCat.category.name == cat.name ? (
                            <li
                              key={ind}
                              className=" uppercase text-[13px]"
                              onClick={() => getSubCatData(subCat._id)}
                            >
                              {subCat.name}
                            </li>
                          ) : null;
                        })}
                    </ul>
                  </div>
                </li>
              );
            })}
            <li>BLOG</li>
            <li>CONTACT</li>
          </ul>
        </div>
      </div>
      <hr className=" mt-3" />
    </nav>
  );
};

export default Header2;
