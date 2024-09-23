import { Button } from "@/components/ui/button";
import { Context } from "@/store/Store";
import { Rating } from "@mui/material";
import axios from "axios";
import { ShoppingBagIcon } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import QuantityBox from "@/components/quantityBox/QuantityBox";
const Cart = () => {
  const { cart, getCartData } = useContext(Context);
  const [subTotal, setSubTotal] = useState(0);

  const deleteCart = async (id) => {
    await axios.delete(`http://localhost:8000/api/cart/${id}`);
    getCartData();
  };
  const updatesubTotal = async (id, item) => {
    setSubTotal(item.quantity * item?.product?.price);
    await axios.put(`http://localhost:8000/api/cart/${id}`, {
      subTotal,
    });
  };

  return (
    <div className=" p-5">
      <h3 className=" font-bold  text-[25px]">Your Cart</h3>
      <p>There are 3 product in your cart</p>
      <div className=" flex my-5 gap-x-5">
        <div className=" rounded-lg   overflow-hidden w-[75%]">
          <Table className=" ">
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow className="bg-slate-200">
                <TableHead className="w-[100px] text-center">Product</TableHead>
                <TableHead className="w-[300px] text-center">
                  ProductName
                </TableHead>
                <TableHead className=" text-center w-[150px]">
                  Quanity
                </TableHead>
                <TableHead className="w-[100px] text-center">Price</TableHead>
                <TableHead className="w-[100px] text-center">
                  sub Total
                </TableHead>
                <TableHead className=" w-[100px] text-center">Remove</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cart?.map((item, ind) => {
                return (
                  <TableRow key={ind}>
                    <TableCell className="font-medium border-r-0 ">
                      <img
                        src={item.product.images[0]}
                        alt="item"
                        className=" w-[70px] h-[70px] mx-auto"
                      />
                    </TableCell>
                    <TableCell className=" border-x-0">
                      <div className=" space-y-3 w-full px-3">
                        <h2 className=" font-semibold text-[17px] ">
                          {item.product.name}
                        </h2>
                        <Rating
                          name="simple-controlled"
                          value={item.product.rating}
                          readOnly
                          precision={0.5}
                        />
                      </div>
                    </TableCell>
                    <TableCell className=" border-x-0">
                      <QuantityBox
                        item={item}
                        updatesubTotal={updatesubTotal}
                      />
                    </TableCell>
                    <TableCell className=" text-center border-x-0">
                      Rs {item.product.price}
                    </TableCell>
                    <TableCell className=" text-center border-x-0">
                      Rs {item.subTotal}
                    </TableCell>
                    <TableCell className=" border-l-0 ">
                      <IoTrashOutline
                        className=" text-[25px] text-center mx-auto cursor-pointer"
                        onClick={() => deleteCart(item._id)}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={5}>Total</TableCell>
                <TableCell className="text-center">$0</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
        <div className=" w-[20%] mx-auto border h-[40vh]">
          <h2 className=" p-4 border-b font-bold mx-3"> CART TOTALS </h2>
          <ul className=" px-5 my-3 space-y-5">
            <li className=" flex justify-between ">
              <span className=" font-bold text-gray-500">Shipping</span>
              <span className=" font-bold text-red-500">Free</span>
            </li>
            <li className=" flex justify-between ">
              <span className=" font-bold text-gray-500">Estimate For</span>
              <span className=" font-bold text-black">India</span>
            </li>
            <li className=" flex justify-between ">
              <span className=" font-bold text-gray-500">Total</span>
              <span className=" font-bold text-blue-500">$141.5</span>
            </li>
            <Button className="bg-purple-800 text-white hover:bg-green-700 hover:text-white w-full px-8 font-bold">
              Add to cart
              <ShoppingBagIcon className=" text-white text-[12px] ml-3" />
            </Button>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Cart;
