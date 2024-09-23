import React, { useState } from "react";

const ProductZoom = ({ item }) => {
  const [mainImage, setMainImage] = useState(item.images ? item.images[0] : "");

  return (
    <div className=" relative w-[40%] ml-10">
      <div className=" absolute -top-4 -left-8">
        <p
          className="py-1  text-center   w-[50px] rounded-md text-[10px]  font-bold"
          style={{ backgroundColor: item?.category?.color }}
        >
          {item?.discount}%
        </p>
        <p className="  bg-gray-400 text-white text-[11px] py-1 px-2 mt-1 rounded-md font-semibold">
          Recomended
        </p>
      </div>
      <img
        src={mainImage == "" ? (item.images ? item.images[0] : "") : mainImage}
        alt="item"
        className=" w-[280px]"
      />

      <div className=" flex items-center my-10 flex-wrap w-[100%]">
        {item?.images?.length !== 0 &&
          item?.images?.map((image, ind) => {
            return (
              <div className="p-3" key={ind}>
                <img
                  src={image}
                  alt="item"
                  className=" w-[60px] h-[60px] border border-gray-300 cursor-pointer"
                  onClick={() => {
                    setMainImage(image);
                  }}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ProductZoom;
