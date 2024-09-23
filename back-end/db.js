import mongoose from "mongoose";

const URL = "mongodb://localhost:27017/e-commerce";
export const connectDatabase = async () => {
  try {
    await mongoose.connect(URL, {});
    console.log("database connected");
  } catch (error) {
    console.log("database not connected");
  }
};
