import mongoose from "mongoose";
import { DB_NAME } from "../utils/constants.js";

let isConnected = false;

const connectDB = async () => {

  if (isConnected) {
    console.log("🔄 Using existing database connection");
    return;
  }

  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_ATLAS_URI}/${DB_NAME}`,
    );
    isConnected = true;
    console.log("Mongodb connected to : ", connectionInstance?.connection.host);
    return connectionInstance
  } catch (error) {
    console.log("connectDB error:", error);
    process.exit(1);
  }
};

export default connectDB;
