import { Cart } from "../models/cart.js";

import { Router } from "express";

const router = Router();

//All cart get api

router.get("/", async (req, res) => {
  try {
    const cart = await Cart.find().populate("product");

    res.json({ cart, success: true });
    if (!cart) {
      res.status(500).json(" cart not found!");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//cart create api

router.post("/create", async (req, res) => {
  const exist = await Cart.findOne({ product: req.body.id }).populate(
    "product"
  );
  if (exist) {
    res.json({ msg: " already Added in the cart", success: true });
  } else {
    try {
      let cart = new Cart({
        product: req.body.id,
        quantity: req.body.quantity,
        subTotal: req.body.subTotal,
      });

      cart = await cart.save();
      res.json({ cart, success: true });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
});

//cart get Api

router.get("/:id", async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);

    if (!cart) {
      res.status(500).json("Category not found !");
    }
    res.json({ cart, success: true });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const cart = await Cart.findByIdAndUpdate(req.params.id, {
      quantity: req.body.quantity,
      subTotal: req.body.subTotal,
    });

    if (!cart) {
      res.status(500).json("Category not found !");
    }
    res.json({ cart, success: true });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//cart delete Api

router.delete("/:id", async (req, res) => {
  try {
    const cart = await Cart.findByIdAndDelete(req.params.id);
    if (!cart) {
      res.status(500).json("Category not found !");
    }
    res.json({ cart, success: true });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export const cartRoute = router;
