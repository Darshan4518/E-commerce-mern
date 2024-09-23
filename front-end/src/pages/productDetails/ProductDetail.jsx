import Rating from "@mui/material/Rating";
import ProductZoom from "../home/ProductZoom";
import ProductInfo from "../home/ProductInfo";
import ProductReviews from "./ProductReviews";
import RelatedProducts from "./RelatedProducts";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ReacentlyViewedProducts from "./ReacentlyViewedProduct";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    getProductData();
  }, [id]);

  const getProductData = async () => {
    const { data } = await axios.get(
      `http://localhost:8000/api/products/${id}`
    );
    setProduct(data?.product);
    setRating(data.product.rating);
  };

  return (
    <>
      <div className=" w-full bg-slate-200 p-10 h-auto ">
        <div className=" bg-white w-[80%] m-auto p-10">
          <h2 className=" text-[25px] font-bold text-gray-800 my-3">
            {product.name}
          </h2>
          <div className=" flex items-center gap-x-3">
            <span className=" border-r border-gray-400 px-3">
              {product.brand}
            </span>
            <span className=" flex items-center border-r border-gray-400 px-3">
              <Rating
                name="simple-controlled"
                value={rating}
                readOnly
                precision={0.5}
              />
            </span>
          </div>
          <hr className=" my-8" />
          <div>
            <div className=" flex gap-x-8">
              <ProductZoom item={product} />
              <ProductInfo item={product} />
            </div>
            <ProductReviews product={product} />
          </div>
        </div>
        <div></div>
      </div>
      <div>
        <RelatedProducts product={product} />
        <ReacentlyViewedProducts product={product} />
      </div>
    </>
  );
};

export default ProductDetail;
