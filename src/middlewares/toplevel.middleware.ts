import cors from "cors";

import express, { Express } from "express";
import fileUpload from "express-fileupload";
import path from "path";

const topLevelMiddleware = (app: Express) => {
  app.use(cors());
  app.use(
    express.urlencoded({
      extended: true,
      limit: "50mb",
    })
  );
  app.use(fileUpload());
  app.use(express.json());
  app.use(express.static(path.join(__dirname, "../public")));
};

export default topLevelMiddleware;
