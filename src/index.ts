import dotenv from "dotenv";
import express from "express";
import path from "path";
import connectToDb from "./db";
import errorHandler from "./middlewares/error.middleware";
import routerHandler from "./middlewares/router.middleware";
import topLevelMiddleware from "./middlewares/toplevel.middleware";

//use the .env file
dotenv.config({
  path: path.resolve(__dirname, "./config/.env.config"),
  debug: true,
});

const PORT = process.env.PORT || 8080;

//connect to db
connectToDb();

//create the app from express
const app = express();

//top label parser middleware
topLevelMiddleware(app);

//handle all the routes
routerHandler(app);

app.get("/", async (req, res, next) => {
  try {
    res.send("Hello from cloud 🌏");
  } catch (error) {
    next(error);
  }
});

//handle not created route
app.use("*", async (req, res, next) => {
  res.status(404);
  res.json({
    msg: "Not Found",
    success: false,
  });
});

//handle all the error using err handler middleware
app.use(errorHandler);

//listen app to define PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🌏`);
});
