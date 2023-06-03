import { NextFunction, Request, Response } from "express";
import { ValidationChain, validationResult } from "express-validator";

export const formValidatorHelper = async (
  validations: ValidationChain[],
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //run all the validation
  await Promise.all(validations.map((validation) => validation.run(req)));
  const errors = validationResult(req);

  //if error is not empty response from here
  if (!errors.isEmpty()) {
    return res.status(406).json({
      success: false,
      msg: errors.array().map((errors) => {
        if (errors?.type === "field") {
          return {
            key: errors.path,
            msg: errors.msg,
          };
        } else {
          return {
            key: errors.type,
            msg: errors.msg,
          };
        }
      }),
    });
  }
  //if no error go to the next function
  next();
};
