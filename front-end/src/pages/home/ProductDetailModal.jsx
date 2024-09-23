import { Dialog } from "@mui/material";

import { IoCloseOutline } from "react-icons/io5";
import Rating from "@mui/material/Rating";

import ProductZoom from "./ProductZoom";
import ProductInfo from "./ProductInfo";

const ProductDetailModal = ({ setOpenModal, openModal, item }) => {
  return (
    <Dialog
      open={openModal}
      onClose={() => {
        setOpenModal(false);
      }}
      className="productmodal"
    >
      <div className=" p-5 relative ">
        <span
          className=" absolute top-4 right-2 text-2xl cursor-pointer"
          onClick={() => {
            setOpenModal(false);
          }}
        >
          <IoCloseOutline />
        </span>
        <div className=" px-5">
          <h2 className=" text-[25px] font-bold text-gray-800 my-3">
            {item?.name}
          </h2>
          <div className=" flex items-center gap-x-3">
            <span className=" border-r border-gray-400 px-3">
              Brand: {item?.brand}
            </span>
            <span className=" flex items-center border-r border-gray-400 px-3">
              <Rating
                name="simple-controlled"
                value={item?.rating}
                readOnly
                precision={0.5}
              />
            </span>
            <span>SKU: Z4GY8I</span>
          </div>
          <hr className=" my-8" />

          <div className=" flex px-10 ">
            {/* image part */}

            <ProductZoom item={item} />

            {/* product info part */}

            <ProductInfo item={item} />
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ProductDetailModal;
