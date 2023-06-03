import { NextFunction, Request, Response } from "express";
import { Unauthorized } from "http-errors";
import { UserModel } from "../../db/user";
import { generateToken } from "../../helpers/jwt.herper";
import { sendEmail } from "../../services/mail.service";
import {
  checkUserExist,
  createOTPAndSave,
  emailRegister,
  verifyAndCreateNewPassword,
  verifyEmailToken,
  verifyOTPAndChangePassword,
} from "./functions";

async function register(req: Request, res: Response, next: NextFunction) {
  try {
    //get all the data from body
    const { displayName, email, gender, phoneNumber, countryCode, password } =
      req.body;
    //create a user
    const newUser = await emailRegister({
      displayName,
      email,
      gender,
      phoneNumber,
      countryCode,
      rawPassword: password,
    });
    //send email to the user about account created and verification link
    await sendEmail({
      to: newUser.email,
      subject: "Verify Your Email",
      text: `
        <h3 style="width:100%;text-align:center;" >Please verify your email by clicking on the link below.</h3>
        <a style="width:100%;text-align:center;display:flex;" href="http://localhost:8000/verify-email/${newUser.token}" >Verify</a>
        `,
    });
    //send response to client
    res.json({
      msg: "Verify your email.",
      success: true,
    });
  } catch (error) {
    //handle error
    next(error);
  }
}
async function resendVerificationCode(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    //get all the data from body
    const { email, isPhoneNumber, phoneNumber } = req.body;

    //check if user exist
    const user = await checkUserExist(email);

    if (!isPhoneNumber && email && user?.emailVerified) {
      res.status(200);
      throw new Error("Email already verified.");
    }
    if (isPhoneNumber && phoneNumber && user?.phoneNumberVerified) {
      res.status(200);
      throw new Error("Phone number already verified.");
    }

    //else create a new verification code

    const token = await generateToken(
      {
        email: user?.email,
        displayName: user?.displayName,
      },
      {
        expiresIn: "5m",
      }
    );

    //send email to the user about account created and verification link
    !isPhoneNumber &&
      email &&
      (await sendEmail({
        to: user?.email,
        subject: "Verify Your Email",
        text: `
        <h3 style="width:100%;text-align:center;" >Please verify your email by clicking on the link below.</h3>
        <a style="width:100%;text-align:center;display:flex;" href="http://localhost:8000/verify-email/${token}" >Verify</a>
        `,
      }));

    //send response to client
    res.json({
      msg: "Verification email sent.",
      success: true,
    });
  } catch (error) {
    //handle error
    next(error);
  }
}
async function verifyUser(req: Request, res: Response, next: NextFunction) {
  try {
    //get all the data from body
    const { token } = req.body;

    //verify email
    await verifyEmailToken(token);

    //send response to client
    res.json({
      msg: "Email verified successfully.",
      success: true,
    });
  } catch (error) {
    //handle error
    next(error);
  }
}
async function userLogin(req: Request, res: Response, next: NextFunction) {
  try {
    //get all the data from body
    const { email, password } = req.body;

    //check if the user exist
    const user = await checkUserExist(email);

    //after user found call the authentication method on user schema to check and verify about password
    const authenticUser = await user.authenticate(password);

    //if password is not match throw an error
    if (!authenticUser) throw new Unauthorized("Email or password is invalid.");

    //check is user is blocked or not
    if (user.blockStatus === "BLOCKED")
      throw new Unauthorized("Account is blocked.");

    //update users logged in status

    user.isLoggedIn = true;
    user.isOnline = true;
    user.lastLoginTime = new Date();

    //after that save the user
    await user.save();

    //if user is valid return a token to user
    //create a token
    const token = await generateToken({
      email: user?.email,
      id: user?._id,
      displayName: user?.displayName,
      role: user?.role,
    });

    //send response to client
    res.json({
      msg: "Success",
      success: true,
      ACCESS_TOKEN: token,
    });
  } catch (error) {
    //handle error
    next(error);
  }
}
async function changePassword(req: Request, res: Response, next: NextFunction) {
  try {
    //get all the data from body
    const { email, password, newPassword } = req.body;
    //validate user is exist or not

    //change the password
    const user = await verifyAndCreateNewPassword(email, password, newPassword);

    //send email to the user about account created and verification link
    await sendEmail({
      to: user.email,
      subject: "Password Changed!",
      text: `
        <h3 style="width:100%;text-align:center;" >Your password has been changed recently. If not done by you change your password immediately.</h3>
        <a style="width:100%;text-align:center;display:flex;" href="http://localhost:8000/change-password >Change Password</a>
        `,
    });
    //send response to client
    res.json({
      msg: "Password changed successfully.",
      success: true,
    });
  } catch (error) {
    //handle error
    next(error);
  }
}
async function forgotPassword(req: Request, res: Response, next: NextFunction) {
  try {
    //get all the data from body
    const { email } = req.body;

    //generate otp send to email

    const user = await createOTPAndSave(email);

    //send email to the user about otp
    await sendEmail({
      to: user.email,
      subject: "One Time Password",
      text: `
        <h3 style="width:100%;text-align:center;" >OTP to recover your account.</h3>
        <h1 style="width:100%;text-align:center;text:blue" >${user.verificationInfo.otp}</h1>
        
        `,
    });
    //send response to client
    res.json({
      msg: "OTP sent.",
      success: true,
    });
  } catch (error) {
    //handle error
    next(error);
  }
}
async function forgotPasswordVerify(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    //get all the data from body
    const { otp, newPassword, email } = req.body;
    //validate otp
    await verifyOTPAndChangePassword({
      email,
      otp,
      password: newPassword,
    });

    //send response to client
    res.json({
      msg: "Account recover successful.",
      success: true,
    });
  } catch (error) {
    //handle error
    next(error);
  }
}
async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    //update the user
    await UserModel.findByIdAndUpdate(req?.body?._id, {
      isLoggedIn: false,
      isOnline: false,
    });

    //send response to client
    res.json({
      msg: "You have been logged out successfully.",
      success: true,
    });
  } catch (error) {
    //handle error
    next(error);
  }
}

export {
  changePassword,
  forgotPassword,
  forgotPasswordVerify,
  logout,
  register,
  resendVerificationCode,
  userLogin,
  verifyUser,
};
