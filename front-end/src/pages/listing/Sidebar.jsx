import React, { useContext, useEffect, useState } from "react";
import Slider from "@mui/material/Slider";
import banner2 from "../../../assets/banner2.jpg";
import axios from "axios";
import { Context } from "@/store/Store";
import { Button } from "@/components/ui/button";
const Sidebar = () => {
  const [price, setPrice] = useState([10, 500]);
  const { categories, setProducts, brands } = useContext(Context);
  const [categoryCheckList, setCategoryCheckList] = useState([]);
  const [brandCheckList, setBrandCheckList] = useState([]);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  useEffect(() => {
    getFilterCategoryCheckListList();
    window.scroll(0, 150);
  }, [categoryCheckList]);

  useEffect(() => {
    getFilterBrandCheckListList();
    window.scroll(0, 150);
  }, [brandCheckList]);

  const handleChange = async (event, newPrice) => {
    setPrice(newPrice);
    const { data } = await axios.get(
      `http://localhost:8000/api/product/filter/range?lprice=${price[0]}&gprice=${price[1]}`
    );
    setProducts(data.products);
  };

  const handleCategoryCheckList = (e) => {
    let newList = [];
    if (e.target.checked) {
      newList.push(...categoryCheckList, e.target.value);
      setCategoryCheckList(newList);
      return;
    }
    newList = categoryCheckList.filter((i) => i !== e.target.value);
    setCategoryCheckList(newList);
  };
  const getFilterCategoryCheckListList = async () => {
    const { data } = await axios.get(
      `http://localhost:8000/api/product/filter/checked?category=${categoryCheckList}`
    );
    setProducts(data.products);
  };

  const handleBrandCheckList = (e) => {
    let newList = [];
    if (e.target.checked) {
      newList.push(...brandCheckList, e.target.value);
      setBrandCheckList(newList);
      return;
    }
    newList = brandCheckList.filter((i) => i !== e.target.value);
    setBrandCheckList(newList);
  };
  const getFilterBrandCheckListList = async () => {
    const { data } = await axios.get(
      `http://localhost:8000/api/product/filter/checked?brand=${brandCheckList}`
    );
    let arr = [];
    let brands = data.products;
    brands.forEach((elm) => {
      arr.push(elm);
    });

    setProducts(arr);
  };

  let subCategory = [];

  return (
    <div className="sticky top-[20px]">
      <div className=" ">
        <p className="  uppercase text-gray-600 font-bold text-[15px]">
          Product Category
        </p>
        <ul className=" flex flex-col gap-3 my-3 h-auto  overflow-scroll">
          {categories?.length !== 0 &&
            categories?.map((cat, ind) => {
              return (
                <li className=" flex  items-center gap-x-5  " key={ind}>
                  <input
                    type="checkbox"
                    id={cat?.name}
                    value={cat?.name}
                    onChange={(e) => handleCategoryCheckList(e)}
                  />
                  <label
                    htmlFor={cat?.name}
                    className=" capitalize cursor-pointer"
                  >
                    {cat.name}
                  </label>
                </li>
              );
            })}
        </ul>
      </div>

      {/* Fiter by price */}

      <div className="my-8">
        <p className="  uppercase text-gray-600 font-bold text-[15px] mb-5">
          FILTER BY PRICE
        </p>
        <Slider
          value={price}
          onChange={handleChange}
          max={60000}
          min={10}
          pricelabeldisplay="auto"
        />
        <div className=" w-full  items-center">
          <p className=" my-2 text-[12px] font-bold ">
            <span className=" font-semibold">Price:</span> ${price[0]} -- $
            {price[1]}
          </p>
        </div>
      </div>

      {/* product status */}

      <div className="my-8">
        <p className="  uppercase text-gray-600 font-bold text-[15px] my-2">
          product status
        </p>
        <ul className=" flex flex-col gap-3  ">
          <li className=" flex items-center gap-x-2">
            <input type="checkbox" /> <span>In Stock</span>
          </li>
          <li className=" flex items-center gap-x-2">
            <input type="checkbox" /> <span>On Sale</span>
          </li>
        </ul>
      </div>

      {/* Brands */}

      <div>
        <p className="  uppercase text-gray-600 font-bold text-[15px]">
          Brands
        </p>
        <ul className=" flex flex-col gap-3 my-3 h-[200px]  overflow-scroll">
          {brands.length !== 0 &&
            brands.map((prod, ind) => {
              if (!subCategory.includes(prod.brand)) {
                subCategory.push(prod.brand);
                return (
                  <li
                    className=" flex items-center gap-x-2 cursor-pointer"
                    key={ind}
                  >
                    <input
                      type="checkbox"
                      id={prod?._id}
                      value={prod?.brand}
                      onChange={(e) => handleBrandCheckList(e)}
                    />
                    <label htmlFor={prod?._id} className=" cursor-pointer">
                      {prod?.brand}
                    </label>
                  </li>
                );
              }
            })}
        </ul>
      </div>
      <img src={banner2} alt="banner" className=" mb-5  mt-5" />
    </div>
  );
};

export default Sidebar;
