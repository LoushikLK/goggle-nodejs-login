import { NextFunction, Request, Response, Router } from "express";
import path from "path";
import {
  changePassword,
  forgotPassword,
  forgotPasswordVerify,
  logout,
  register,
  resendVerificationCode,
  userLogin,
  verifyUser,
} from "./controllers";
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

router.get(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    res.sendFile(path.join(__dirname + "../../../view/index.html"));
  }
);
router.post("/email-register", validateEmailRegistration(), register);
router.post("/login", validateEmailLogin(), userLogin);
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
router.post("/logout", logout);

export default router;
