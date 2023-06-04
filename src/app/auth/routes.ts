import { NextFunction, Request, Response, Router } from "express";
import passport from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import path from "path";
import { isAuthenticated } from "../../middlewares/auth.middleware";
import {
  changePassword,
  forgotPassword,
  forgotPasswordVerify,
  logout,
  register,
  resendVerificationCode,
  socialLLogin,
  userLogin,
  verifyUser,
} from "./controllers";
import { facebookLogin, googleLogin } from "./functions";
import {
  validateChangePassword,
  validateEmailLogin,
  validateEmailRegistration,
  validateEmailVerify,
  validateForgotPassword,
  validateForgotPasswordOTPVerify,
  validateResendVerificationCode,
} from "./validations";

const router = Router();

passport.use(
  new GoogleStrategy(
    {
      clientID: String(process.env.GOOGLE_CLIENT_ID),
      clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
      callbackURL: "http://localhost:80/api/v1/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      //find data from database
      const user = await googleLogin(profile, accessToken);

      if (user instanceof Error) return done(user);
      return done(null, user);
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: String(process.env.FACEBOOK_APP_ID),
      clientSecret: String(process.env.FACEBOOK_APP_SECRET),
      callbackURL: `http://localhost:80/api/v1/auth/facebook/callback`,
      profileFields: ["id", "displayName", "profileUrl", "email", "gender"],
    },
    async function (accessToken, refreshToken, profile, done) {
      //find data from database
      const user = await facebookLogin(profile, accessToken);
      if (user instanceof Error) return done(user);
      return done(null, user);
    }
  )
);

router.get(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    res.sendFile(path.join(__dirname + "../../../view/index.html"));
  }
);
router.post("/email-register", validateEmailRegistration(), register);
router.post("/login", validateEmailLogin(), userLogin);
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/api/v1/login" }),
  socialLLogin
);

router.get("/facebook", passport.authenticate("facebook"));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/fail",
  }),
  socialLLogin
);

router.post("/change-password", validateChangePassword(), changePassword);
router.post(
  "/resend-verification-code",
  validateResendVerificationCode(),
  resendVerificationCode
);
router.post("/verify", validateEmailVerify(), verifyUser);
router.post("/forgot-password", validateForgotPassword(), forgotPassword);
router.post(
  "/forgot-password-verify",
  validateForgotPasswordOTPVerify(),
  forgotPasswordVerify
);
router.post("/logout", isAuthenticated, logout);

export default router;
