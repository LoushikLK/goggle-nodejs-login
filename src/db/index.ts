import mongoose from "mongoose";
import { logService } from "../services/log.service";

const connectToDb = () => {
  const mongoUrl = process.env.MONGO_CONNECTION_STRING || "";
  mongoose
    .connect(mongoUrl)
    .then(() => {
      console.log("DB connected successfully");
    })
    .catch((err) => {
      console.log(err);
      logService(err);
      process.exit(1);
    });
};

export default connectToDb;
