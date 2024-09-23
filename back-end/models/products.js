import mongoose from "mongoose";

const productsSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  images: [
    {
      type: String,
    },
  ],
  catName: {
    type: String,
    require: true,
  },
  subCatName: {
    type: String,
    require: true,
  },
  brand: {
    type: String,
    defaultL: "",
  },
  price: {
    type: Number,
    defaultL: 0,
  },
  oldPrice: {
    type: Number,
    defaultL: 0,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  subCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory",
    required: true,
  },
  countInStock: {
    type: Number,
    defaultL: 0,
  },
  rating: {
    type: Number,
    defaultL: 0,
  },
  discount: {
    type: Number,
    defaultL: 0,
  },
  isFeatured: {
    type: Boolean,
    defaultL: false,
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
});

export const Product = mongoose.model("Product", productsSchema);
