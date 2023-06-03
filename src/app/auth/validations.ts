import { NextFunction, Request, Response } from "express";
import { ValidationChain, body } from "express-validator";
import { formValidatorHelper } from "../../helpers/formValidation.helper";

const validateEmailRegistration = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const validations: ValidationChain[] = [
      body("email")
        .notEmpty()
        .withMessage("email is required.")
        .trim()
        .isEmail()
        .withMessage("provide a valid email."),
      body("displayName")
        .notEmpty()
        .withMessage("displayName is required.")
        .isString()
        .withMessage("provide a valid email."),
      body("gender")
        .optional()
        .isIn(["MALE", "FEMALE", "OTHER", "NONE"])
        .withMessage("gender value must be one of MALE,FEMALE,OTHER,NONE."),
      body("phoneNumber")
        .optional()
        .isMobilePhone("en-IN")
        .withMessage("enter a valid mobile number."),
      body("countryCode")
        .optional()
        .isNumeric()
        .withMessage("enter a valid country code."),
      body("password")
        .notEmpty()
        .withMessage("password is required.")
        .isStrongPassword({
          minLength: 6,
          minLowercase: 1,
          minNumbers: 1,
          minSymbols: 1,
          minUppercase: 1,
        })
        .withMessage(
          "Enter a strong password that contains a minimum 1 lowercase, 1 uppercase, 1 number, 1 symbol."
        ),
      body("confirmPassword")
        .notEmpty()
        .withMessage("confirmPassword is required.")
        .custom((value, { req }) => {
          if (value !== req?.body?.password) return false;
          return true;
        })
        .withMessage("Password and confirmPassword must match."),
    ];

    await formValidatorHelper(validations, req, res, next);
  };
};
const validateEmailVerify = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const validations: ValidationChain[] = [
      body("token")
        .notEmpty()
        .withMessage("token is required.")
        .trim()
        .isJWT()
        .withMessage("provide a valid token."),
    ];

    await formValidatorHelper(validations, req, res, next);
  };
};
const validateResendVerificationCode = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const validations: ValidationChain[] = [
      body("email")
        .optional()
        .trim()
        .isEmail()
        .withMessage("provide a valid email."),
      body("phoneNumber")
        .optional()
        .trim()
        .isMobilePhone("en-IN")
        .withMessage("provide a valid phoneNumber.")
        .custom((value, { req }) => {
          if (!value && !req.body?.email) return false;
          return true;
        })
        .withMessage("Email is required."),
      body("isPhoneNumber")
        .optional()
        .isBoolean()
        .withMessage("provide a valid isPhoneNumber.")
        .toBoolean(),
    ];

    await formValidatorHelper(validations, req, res, next);
  };
};
const validateEmailLogin = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const validations: ValidationChain[] = [
      body("email")
        .notEmpty()
        .withMessage("Provide a valid email.")
        .isEmail()
        .withMessage("provide a valid email."),
      body("password").notEmpty().withMessage("Provide a valid password."),
    ];

    await formValidatorHelper(validations, req, res, next);
  };
};
const validateChangePassword = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const validations: ValidationChain[] = [
      body("email")
        .notEmpty()
        .withMessage("Provide a valid email.")
        .isEmail()
        .withMessage("provide a valid email."),
      body("password").notEmpty().withMessage("Provide a valid password."),
      body("newPassword")
        .notEmpty()
        .withMessage("Provide a valid newPassword.")
        .custom((value, { req }) => {
          if (value !== req?.body?.password) {
            return false;
          }
          return true;
        })
        .withMessage("Password and newPassword must match."),
    ];

    await formValidatorHelper(validations, req, res, next);
  };
};
const validateForgotPassword = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const validations: ValidationChain[] = [
      body("email")
        .notEmpty()
        .withMessage("email is required.")
        .trim()
        .isEmail()
        .withMessage("provide a valid email."),
    ];

    await formValidatorHelper(validations, req, res, next);
  };
};
const validateForgotPasswordOTPVerify = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const validations: ValidationChain[] = [
      body("email")
        .notEmpty()
        .withMessage("email is required.")
        .trim()
        .isEmail()
        .withMessage("provide a valid email."),
      body("newPassword")
        .notEmpty()
        .withMessage("newPassword is required.")
        .isStrongPassword({
          minLength: 6,
          minLowercase: 1,
          minNumbers: 1,
          minSymbols: 1,
          minUppercase: 1,
        })
        .withMessage(
          "Enter a strong password that contains a minimum 1 lowercase, 1 uppercase, 1 number, 1 symbol."
        ),
      body("confirmPassword")
        .notEmpty()
        .withMessage("confirmPassword is required.")
        .custom((value, { req }) => {
          if (value !== req?.body?.newPassword) return false;
          return true;
        })
        .withMessage("newPassword and confirmPassword must match."),
      body("otp")
        .notEmpty()
        .withMessage("otp is required.")
        .isNumeric()
        .withMessage("otp is invalid.")
        .toInt(),
    ];

    await formValidatorHelper(validations, req, res, next);
  };
};

export {
  validateChangePassword,
  validateEmailLogin,
  validateEmailRegistration,
  validateEmailVerify,
  validateForgotPassword,
  validateForgotPasswordOTPVerify,
  validateResendVerificationCode,
};
