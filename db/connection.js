import { connect } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const { DB_HOST } = process.env;

export const connectDB = async () => {
  try {
    await connect(DB_HOST);
    console.log("DB connect succuss");
  } catch (error) {
    console.log(error.message);
  }
};
