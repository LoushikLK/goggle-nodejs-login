import { NextFunction, Request, Response } from "express";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(err.status || 500);
  const errorMessage = err.errors
    ? Object.entries(err.errors)
        .map((error: any) => error[1].message)
        .join()
    : err.message?.includes("duplicate")
    ? `${Object.entries(err.keyValue)[0][0]
        .toString()
        .split(/(?=[A-Z])/)
        .join(" ")
        .split(".")
        .join(" ")
        .replace(/^\w/, (c) => c.toUpperCase())} is already exist!`
    : err?.message || err?.error?.description || "Something went wrong";
  res.json({
    msg: errorMessage,
    success: false,
  });
};

export default errorHandler;
