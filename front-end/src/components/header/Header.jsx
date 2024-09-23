import React, { useContext } from "react";
import logo from "../../../assets/logo.png";
import { CiSearch } from "react-icons/ci";

import { IoBagHandleOutline } from "react-icons/io5";
import Header2 from "../header2/Header2";
import LocationSearchBox from "./LocationSearchBox";
import { Button } from "../ui/button";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { Context } from "@/store/Store";
import { Link } from "react-router-dom";

const Header = () => {
  const { cart } = useContext(Context);
  const { login, logout } = useKindeAuth();
  const { isAuthenticated } = useKindeAuth();

  return (
    <header className=" p-5">
      <div className=" flex justify-between items-center">
        <img
          src={logo}
          alt="logo"
          className=" w-[100px] h-[50px] md:w-[150px]  "
        />

        <LocationSearchBox />

        <div className=" md:w-[750px]  bg-slate-100 h-[50px] flex items-center ">
          <input
            type="text"
            className=" w-full bg-transparent h-full p-5 border-none outline-none rounded-lg"
            placeholder="Search for Products....."
          />
          <span className=" p-2">
            <CiSearch className=" w-[30px] h-[30px]" />
          </span>
        </div>
        <div className=" flex justify-evenly items-center gap-x-2 w-[250px]">
          {isAuthenticated ? (
            <Button variant="outline" onClick={logout}>
              LOGOUT
            </Button>
          ) : (
            <div className=" flex gap-x-3">
              <Button variant="outline" onClick={login}>
                LOGIN
              </Button>
            </div>
          )}
          {/* <span className="p-2 rounded-full border font-bold">
            <IoPersonOutline className=" w-[25px] h-[25px] " />
          </span>
          <span className=" font-bold">$3.14</span> */}

          <span className="p-2 rounded-full border font-bold bg-red-100 text-red-500 relative">
            <Link to={"/cart"}>
              <IoBagHandleOutline className="w-[25px] h-[25px]" />
              <span className=" absolute -top-1 -right-1 text-white px-[7px] text-[10px] bg-red-500 rounded-full">
                {cart.length}
              </span>
            </Link>
          </span>
        </div>
      </div>
      <Header2 />
    </header>
  );
};

export default Header;
