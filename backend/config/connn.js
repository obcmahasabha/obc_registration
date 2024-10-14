import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();


const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("DB is connected Successfully");
  });
  await mongoose.connect(process.env.MONGO_API);
};
export default connectDB;
