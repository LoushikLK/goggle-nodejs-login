import { Document } from "mongoose";

export interface IUser extends Document {
  displayName: string;
  email: string;
  gender: "MALE" | "FEMALE" | "OTHER" | "NONE";
  dateOfBirth: Date;
  phoneNumber: string;
  countryCode: string;
  country: string;
  state: string;
  district: string;
  pinCode: string;
  address: string;
  password: string;
  token: string;
  verificationInfo: {
    otp: number;
    validity: number;
  };
  photoUrl: string;
  photoPath: string;
  fcmTokens: {
    web: string;
    android: string;
    ios: string;
  };
  role: "SUPER_ADMIN" | "ADMIN" | "MODERATOR" | "CREATOR";
  isLoggedIn: boolean;
  isOnline: boolean;
  blockStatus: "BLOCKED" | "UNBLOCKED";
  geoCode?: {
    LONG: string;
    LAT: string;
  };
  phoneNumberVerified: boolean;
  lastLoginTime: Date;
  emailVerified: boolean;
  googleId: string;
  facebookId: string;
  googleAccessToken: string;
  facebookAccessToken: string;
  encryptPassword(rawPassword: string): string;
  authenticate(rawPassword: string): boolean;
}
