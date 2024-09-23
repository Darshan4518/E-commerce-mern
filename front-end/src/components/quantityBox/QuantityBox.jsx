// export default QuantityBox;
import React, { useContext, useEffect, useState } from "react";

import { Button, Typography } from "@mui/material";
import axios from "axios";
import { Context } from "@/store/Store";

function QuantityBox({ item, updatesubTotal, Total }) {
  const { cart } = useContext(Context);
  const [quantity, setQuantity] = useState(item.quantity);

  const handleIncrement = (id) => {
    cart.map((itm) => {
      return itm._id === id && item.quantity < 20
        ? setQuantity((item.quantity += 1))
        : setQuantity(item.quantity);
    });
    updatesubTotal(item._id, item);
  };

  const handleDecrement = (id) => {
    cart.map((itm) => {
      return itm._id === id && item.quantity > 1
        ? setQuantity((item.quantity -= 1))
        : setQuantity(item.quantity);
    });
    updatesubTotal(item._id, item);
  };

  useEffect(() => {
    updateQuantity();
  }, [handleIncrement, handleDecrement]);

  const updateQuantity = async () => {
    await axios.put(`http://localhost:8000/api/cart/${item._id}`, {
      quantity,
    });
  };

  return (
    <div className=" flex  justify-center gap-x-2">
      <Button
        variant="outlined"
        onClick={() => handleDecrement(item._id)}
        className=" text-[19px] w-[20px]"
      >
        -
      </Button>
      <Typography variant="h6" className="w-[30px] text-center">
        {item.quantity}
      </Typography>
      <Button
        variant="outlined"
        onClick={() => handleIncrement(item._id)}
        className=" text-[16px] w-[20px]"
      >
        +
      </Button>
    </div>
  );
}

export default QuantityBox;
