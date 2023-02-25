import bcryptjs from "bcryptjs";
import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../CustomError/CustomError.js";
import User from "../../database/models/User.js";
import { type UserStructure } from "../../types.js";

const statusCodeOk = 200;
const statusCodeCreated = 201;
const statusCodeInternalServerError = 500;

const saltLength = 12;
const useRegisterConfirmationMessage = (email: string) =>
  `Usuario con email ${email} creado`;

const retrievingError = "Couldn't retrieve users.";

const customError = (error: Error) =>
  new CustomError(
    error.message,
    statusCodeInternalServerError,
    retrievingError
  );

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find().exec();

    res.status(statusCodeOk).json({ users });
  } catch (error) {
    next(customError(error as Error));
  }
};

export const registerUser = async (
  req: Request<Record<string, unknown>, Record<string, unknown>, UserStructure>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, username, email, password, aboutme } = req.body;

    const avatar = req.file;

    const hashedPassword = await bcryptjs.hash(password, saltLength);

    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
      avatar,
      aboutme,
    });

    res
      .status(statusCodeCreated)
      .json(useRegisterConfirmationMessage(user.email));
  } catch (error) {
    next(customError(error as Error));
  }
};
