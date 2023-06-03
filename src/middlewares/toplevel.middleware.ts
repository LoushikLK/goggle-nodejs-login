import cors from "cors";

import express, { Express } from "express";
import fileUpload from "express-fileupload";
import session from "express-session";
import passport from "passport";
import path from "path";

const topLevelMiddleware = (app: Express) => {
  app.use(cors());
  app.use(
    express.urlencoded({
      extended: true,
      limit: "50mb",
    })
  );
  app.use((req, res, next) => {
    console.table([
      {
        path: req?.originalUrl,
        method: req?.method,
        ip: req?.ip,
        os: req?.headers?.["sec-ch-ua-platform"],
        platform: req?.headers?.["sec-ch-ua"],
      },
    ]);
    next();
  });
  app.use(fileUpload());
  app.use(
    session({
      secret: "keyboard cat",
      resave: false, // don't save session if unmodified
      saveUninitialized: false, // don't create session until something stored
    })
  );
  app.use(express.json());
  app.use(passport.authenticate("session"));

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser(async (user, done) => {
    done(null, user as any);
  });

  app.use(express.static(path.join(__dirname, "../public")));
};

export default topLevelMiddleware;
