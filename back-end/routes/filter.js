import { Router } from "express";
import { pagination } from "./products.js";
const router = Router();

router.get("/range", async (req, res) => {
  const lprice = Number(req.query.lprice);
  const gprice = Number(req.query.gprice);
  try {
    const products = await pagination({
      $and: [{ price: { $gt: lprice } }, { price: { $lt: gprice } }],
    });

    res.json({ products, success: true });
    if (!products) {
      res.status(500).json(" products not found!");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});
router.get("/checked", async (req, res) => {
  let key = req.query.category;
  let key2 = req.query.brand;

  if ((key == "" || key == undefined) && (key2 == "" || key2 == undefined)) {
    const products = await pagination();
    return res.json({ products, success: true });
  } else {
    if (req.query.category) {
      let categories = [];
      categories = key.split(",");
      try {
        const products = await pagination({ catName: { $in: categories } });
        if (!products) {
          res.status(500).json(" products not found!");
        }
        res.json({ products, success: true });
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
    if (req.query.brand) {
      let brands = [];
      brands = key2.split(",");
      try {
        const products = await pagination({ brand: { $in: brands } });

        if (!products) {
          res.status(500).json(" products not found!");
        }
        res.json({ products, success: true });
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
  }
});
router.get("/subcategory", async (req, res) => {
  const key = req.query.subCat;
  if (key === undefined || key === "") {
    const products = await pagination();
    res.json({ products, success: true });
  } else {
    if (key) {
      try {
        const products = await pagination({
          subCategory: key,
        });

        res.json({ products, success: true });
        if (!products) {
          res.status(500).json(" products not found!");
        }
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
  }
});
const filterRoute = router;
export { filterRoute };
