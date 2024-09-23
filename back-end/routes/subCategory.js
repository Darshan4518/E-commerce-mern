import { Router } from "express";

import { SubCategory } from "../models/subCategory.js";

const router = Router();

//All subCategory get Api

router.get("/", async (req, res) => {
  try {
    const subCategory = await SubCategory.find().populate("category");
    if (!subCategory) {
      res.status(500).json("subCategory not found !");
    }
    res.json({ subCategory, success: true });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// SubCategory  create api

router.post("/create", async (req, res) => {
  try {
    let subCategory = new SubCategory({
      category: req.body.category,
      name: req.body.name,
    });

    if (!subCategory) {
      res.status(500).json({ msg: "Enter specific details" });
    }
    subCategory = await subCategory.save();
    res.send(subCategory);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//SubCategory get Api

router.get("/:id", async (req, res) => {
  try {
    const subCategory = await SubCategory.findById(req.params.id);
    if (!subCategory) {
      res.status(500).json({ msg: "SubCategory not found!" });
    }
    res.status(200).send(subCategory);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//SubCategory delete Api

router.delete("/:id", async (req, res) => {
  try {
    const subCategory = await SubCategory.findByIdAndDelete(req.params.id);
    if (!subCategory) {
      res.status(500).json({ msg: "SubCategory not found!" });
    }
    res.status(200).json({ msg: "SubCategory deleted successfully" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//SubCategory update Api

router.put("/:id", async (req, res) => {
  try {
    const subCategory = await SubCategory.findByIdAndUpdate(
      req.params.id,
      {
        category: req.body.category,
        name: req.body.name,
      },
      { new: true }
    );
    if (!subCategory) {
      res.status(500).json("SubCategory not updated!");
    }
    res.status(200).send(subCategory);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

const subCategoryRoute = router;
export { subCategoryRoute };
