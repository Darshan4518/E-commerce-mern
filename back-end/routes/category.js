import { Router } from "express";
import { Category } from "../models/Categories.js";
import { v2 as cloudinary } from "cloudinary";
import pLimit from "p-limit";

cloudinary.config({
  cloud_name: "dz95uyedy",
  api_key: "479151412264324",
  api_secret: "hxJZ65cd4yIRNTrspzBnNRDKb1w",
});

const router = Router();

//All categories get Api

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    if (!categories) {
      res.status(500).json("Categories not found !");
    }
    res.json({ categories, success: true });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// category  create api

router.post("/create", async (req, res) => {
  try {
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

    let category = new Category({
      name: req.body.name,
      images: imgUrl,
      color: req.body.color,
    });

    if (!category) {
      res.status(500).json({ msg: "Enter specific details" });
    }
    category = await category.save();
    res.send(category);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//category get Api

router.get("/:id", async (req, res) => {
  try {
    const categories = await Category.findById(req.params.id);
    if (!categories) {
      res.status(500).json({ msg: "Category not found!" });
    }
    res.status(200).send(categories);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//category delete Api

router.delete("/:id", async (req, res) => {
  try {
    const categories = await Category.findByIdAndDelete(req.params.id);
    if (!categories) {
      res.status(500).json({ msg: "Category not found!" });
    }
    res.status(200).json({ msg: "Category deleted successfully" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//category update Api

router.put("/:id", async (req, res) => {
  try {
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
    const categories = await Category.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,

        images: imgUrl,
        color: req.body.color,
      },
      { new: true }
    );
    if (!categories) {
      res.status(500).json("Category not updated!");
    }
    res.status(200).send(categories);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

const categoriesRoute = router;
export { categoriesRoute };
