import { BadRequest, NotAcceptable, NotFound, Unauthorized } from "http-errors";
import { UserModel } from "../../db/user";
import { createOTP } from "../../helpers/core.helper";
import { generateToken, verifyToken } from "../../helpers/jwt.herper";

export const emailRegister = async ({
  displayName,
  email,
  gender,
  phoneNumber,
  countryCode,
  rawPassword,
}: {
  displayName: string;
  email: string;
  gender: string;
  phoneNumber: string;
  countryCode: string;
  rawPassword: string;
}) => {
  //create a token for email verification
  const token = await generateToken(
    {
      email,
      displayName,
    },
    {
      expiresIn: 1000 * 60 * 5, //give 5min to user verification
    }
  );

  return await new UserModel({
    displayName,
    email,
    gender,
    phoneNumber,
    countryCode,
    rawPassword,
    token,
    role: "ADMIN",
  }).save();
};
export const verifyEmailToken = async (token: string) => {
  //check if token is a valid token
  const verified: any = await verifyToken(token);

  if (!verified) {
    throw new Unauthorized("Token is invalid. Try again");
  }

  //after token is verified update the user email as verified

  let userData = await UserModel.findOneAndUpdate(
    {
      email: verified?.email,
    },
    {
      emailVerified: true,
    }
  );

  if (!userData) throw new BadRequest("User not found.");

  return true;
};
export const checkUserExist = async (email: string) => {
  //find user by email
  const userData = await UserModel.findOne({
    email,
  });

  if (!userData) throw new NotFound("User not found.");

  return userData;
};
export const verifyAndCreateNewPassword = async (
  email: string,
  password: string,
  newPassword: string
) => {
  //find user by email
  const userData = await UserModel.findOne({
    email,
  });

  if (!userData) throw new NotFound("User not found.");

  //check if the password is correct
  const isAuthorized = userData.authenticate(password);

  //if incorrect password throws error
  if (!isAuthorized) throw new Unauthorized("Unauthorized");

  //after that change the user password
  userData.password = newPassword;

  await userData.save();
  return userData;
};
export const createOTPAndSave = async (email: string) => {
  //find user by email
  const userData = await UserModel.findOne({
    email,
  });

  if (!userData) throw new NotFound("User not found.");

  //create an otp
  const otp = createOTP(6);

  //save otp to user collection

  userData.verificationInfo.otp = otp;
  userData.verificationInfo.validity = Date.now() + 1000 * 60 * 15; //added 15min for otp validation

  //save the code in database
  await userData.save();
  return userData;
};
export const verifyOTPAndChangePassword = async ({
  email,
  otp,
  password,
}: {
  email: string;
  otp: number;
  password: string;
}) => {
  //find user by email
  const userData = await UserModel.findOne({
    email,
  });

  if (!userData) throw new NotFound("User not found.");

  //verify otp with save otp
  if (otp !== userData?.verificationInfo?.otp)
    throw new NotAcceptable("Entered OTP is not valid.");

  //check if time expire
  if (Date.now() > userData?.verificationInfo?.validity)
    throw new NotAcceptable("OTP expired.");

  //if everything correct change password
  userData.password = password;

  //save the code in database
  await userData.save();
  return true;
};
