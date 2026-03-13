import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGO_ATLAS_URI;

export default function connectToDB() {
  mongoose
    .connect(MONGODB_URI)
    .then(() => {
      console.log(`Connected to DB`);
    })
    .catch((err) => {
      console.log(err);
    });
}
