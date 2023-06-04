import { NextFunction, Request, Response } from "express";
import { Unauthorized } from "http-errors";
import { verifyToken } from "../helpers/jwt.herper";

import { Profile } from "passport";

interface UserType extends Profile {
  _id: string;
  email: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser: Partial<UserType>;
    }
  }
}

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.headers.authorization)
      throw new Unauthorized("User is not authorized.");

    // extract token from header
    const decoded = await verifyToken(req.headers.authorization);
    req.currentUser = {
      _id: decoded._id,
      email: decoded?.email,
      displayName: decoded.displayName,
      role: decoded?.role,
    };
    next();
  } catch (error) {
    const err = error as Error;
    res.status(401).json({
      success: false,
      msg: err.message,
    });
  }
};
