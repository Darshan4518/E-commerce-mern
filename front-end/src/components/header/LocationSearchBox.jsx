import React, { useEffect, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { CiSearch } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
import axios from "axios";

const LocationSearchBox = () => {
  const [onClose, setOnClose] = useState(false);
  const [contryList, setContryList] = useState([]);
  const [selectedContry, setSelectedContry] = useState("India");
  const [filterContryList, setFilterContryList] = useState([]);

  const url = "https://restcountries.com/v3.1/all?fields=name,flags";

  useEffect(() => {
    getContry();
  }, [onClose]);

  const getContry = async () => {
    const res = await axios.get(url);
    setContryList(res.data);
    setFilterContryList(res.data);
  };
  useEffect(() => {
    setFilterContryList(contryList);
  }, []);
  const onHandleSearch = (e) => {
    const searchValue = e.target.value?.toLowerCase();
    if (searchValue !== "" || !null) {
      const newList = contryList.filter((contry) => {
        return contry?.name?.common?.toLowerCase()?.includes(searchValue);
      });
      setFilterContryList(newList);
    } else {
      setFilterContryList(contryList);
    }
  };

  return (
    <>
      <Button
        variant="outlined"
        className=" w-[150px]  h-[50px]"
        onClick={() => setOnClose(true)}
      >
        <div className=" flex items-center gap-x-">
          <div className=" flex flex-col ">
            <span className=" text-[10px] text-gray-400">Your Location</span>
            <span className=" text-[12px] line-clamp-1">{selectedContry}</span>
          </div>
          <span>
            <MdKeyboardArrowDown />
          </span>
        </div>
      </Button>
      <Dialog open={onClose} onClose={() => setOnClose(false)}>
        <div className=" p-5 relative">
          <h4 className="  text-2xl">Choose Your Delivery Location</h4>

          <span
            className=" absolute top-4 right-2 text-2xl cursor-pointer"
            onClick={() => setOnClose(false)}
          >
            <IoCloseOutline />
          </span>

          <p className=" text-gray-600">
            Enter your address to specify the offer for your area
          </p>
          <div className=" w-full bg-slate-100 h-[40px] flex items-center my-4">
            <input
              type="text"
              className=" w-full bg-transparent h-full p-5 border-none outline-none rounded-lg"
              placeholder="Search your contry....."
              onChange={(e) => {
                onHandleSearch(e);
              }}
            />
            <span className=" p-2">
              <CiSearch className=" w-[30px] h-[30px]" />
            </span>
          </div>
          <div>
            <ul className=" flex flex-col gap-5">
              {filterContryList.length !== 0 &&
                filterContryList?.map((contry, ind) => {
                  return (
                    <li className=" w-full" key={ind}>
                      <Button
                        className=" w-full "
                        style={{
                          justifyContent: "flex-start",
                          color: "black",
                          padding: "8px",
                        }}
                        onClick={() => {
                          setSelectedContry(contry.name.common);
                          setOnClose(false);
                        }}
                      >
                        {contry.name.common}
                      </Button>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default LocationSearchBox;
