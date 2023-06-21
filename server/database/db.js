import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();
const MONGO_URI=process.env.URI
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.log(`Error connecting to database :${error}`);
  });
