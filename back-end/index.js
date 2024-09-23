import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDatabase } from "./db.js";
import { categoriesRoute } from "./routes/category.js";
import { productsRoute } from "./routes/products.js";
import { subCategoryRoute } from "./routes/subCategory.js";
import { filterRoute } from "./routes/filter.js";
import { cartRoute } from "./routes/cart.js";
const app = express();
app.use(cors());
app.options("*", cors());

//middleware
app.use(bodyParser.json());

// Routes
app.use("/api/category", categoriesRoute);
app.use("/api/products", productsRoute);
app.use("/api/subcategory", subCategoryRoute);
app.use("/api/product/filter", filterRoute);
app.use("/api/cart", cartRoute);

app.listen(8000, () => {
  connectDatabase();
  console.log("server start");
});
