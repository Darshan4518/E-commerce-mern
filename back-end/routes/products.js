import { Product } from "../models/products.js";
import { Category } from "../models/Categories.js";
import { Router } from "express";
import { v2 as cloudinary } from "cloudinary";
import pLimit from "p-limit";

cloudinary.config({
  cloud_name: "dz95uyedy",
  api_key: "479151412264324",
  api_secret: "hxJZ65cd4yIRNTrspzBnNRDKb1w",
});
const router = Router();

//All products get api

let page;
let limit;

export const pagination = async (query) => {
  const skip = (page - 1) * limit;
  if (query) {
    return await Product.find(query)
      .populate("category subCategory")
      .skip(skip)
      .limit(limit);
  }
  return await Product.find({})
    .populate("category subCategory")
    .skip(skip)
    .limit(limit);
};

router.get("/", async (req, res) => {
  page = Number(req.query.page) || 1;
  limit = Number(req.query.limit) || 12;

  try {
    const products = await pagination();

    res.json({ products, success: true });
    if (!products) {
      res.status(500).json(" products not found!");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//products create api

router.post("/create", async (req, res) => {
  try {
    const category = await Category.findById(req.body.category);
    if (!category) {
      res.status(500).json("invalid category!");
    }

    const limit = pLimit(2);

    const imagesUpload = req.body.images.map((image) => {
      return limit(async () => {
        const result = cloudinary.uploader.upload(image);
        return result;
      });
    });

    const uploadStatus = await Promise.all(imagesUpload);
    const imgUrl = uploadStatus.map((img) => {
      return img.secure_url;
    });

    let product = new Product({
      name: req.body.name,
      description: req.body.description,
      images: imgUrl,
      catName: req.body.catName,
      subCatName: req.body.subCatName,
      brand: req.body.brand,
      price: req.body.price,
      oldPrice: req.body.oldPrice,
      category: req.body.category,
      subCategory: req.body.subCategory,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      discount: req.body.discount,
      isFeatured: req.body.isFeatured,
      dateCreated: req.body.dateCreated,
    });
    product = await product.save();
    res.json({ product, success: true });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//product get Api

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "category subCategory"
    );
    if (!product) {
      res.status(500).json("Category not found !");
    }
    res.json({ product, success: true });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//category delete Api

router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      res.status(500).json("Category not found !");
    }
    res.json({ product, success: true });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//category update Api

router.put("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        catName: req.body.catName,
        subCatName: req.body.subCatName,
        brand: req.body.brand,
        price: req.body.price,
        oldPrice: req.body.oldPrice,
        category: req.body.category,
        subCategory: req.body.subCategory,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        discount: req.body.discount,
        isFeatured: req.body.isFeatured,
        dateCreated: req.body.dateCreated,
      },
      { new: true }
    );
    if (!product) {
      res.status(500).json("Category not updated!");
    }
    res.json({ product, success: true });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export const productsRoute = router;
