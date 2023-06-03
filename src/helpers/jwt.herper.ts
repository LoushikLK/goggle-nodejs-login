import { InternalServerError } from "http-errors";
import jwt, { SignOptions } from "jsonwebtoken";

export const generateToken = async (
  payload: string | object,
  options?: SignOptions
) => {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) throw new InternalServerError("JWT secret is not found.");

  return jwt.sign(payload, jwtSecret, {
    expiresIn: options?.expiresIn || "1d",
  });
};
export const verifyToken = async (token: string) => {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) throw new InternalServerError("JWT secret is not found.");

  return jwt.verify(token, jwtSecret);
};
