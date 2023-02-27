import bcrypt from "bcryptjs";
import { type NextFunction, type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import CustomError from "../../CustomError/CustomError.js";
import User from "../../database/models/User.js";
import { type UserStructure } from "../../types.js";
import {
  retrievingUsersError,
  statusCodeInternalServerError,
  statusCodeUnauthorized,
  unableToRegisterUserError,
  unauthorizedUserError,
  wrongCredentialsError,
} from "../middlewares/errorMiddlewares.js";
import { type CustomJwtPayload } from "./types.js";

const statusCodeOk = 200;
const statusCodeCreated = 201;

const unathorizedError = new CustomError(
  wrongCredentialsError,
  statusCodeUnauthorized,
  unauthorizedUserError
);

const saltLength = 10;
const useRegisterConfirmationMessage = (email: string) =>
  `The user with email ${email} has been registered`;

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find().exec();

    res.status(statusCodeOk).json({ users });
  } catch (error) {
    next(
      new CustomError(
        error as string,
        statusCodeInternalServerError,
        retrievingUsersError
      )
    );
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

    const hashedPassword = await bcrypt.hash(password, saltLength);

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
    next(
      new CustomError(
        error as string,
        statusCodeInternalServerError,
        unableToRegisterUserError
      )
    );
  }
};

export const loginUser = async (
  req: Request<Record<string, unknown>, Record<string, unknown>, UserStructure>,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username }).exec();

    if (!user || !(await bcrypt.compare(password, user.password))) {
      next(unathorizedError);

      return;
    }

    const jsonWebTokenPayload: CustomJwtPayload = {
      sub: user?._id.toString(),
      username: user.username,
    };

    const token = jwt.sign(jsonWebTokenPayload, process.env.JWT_SECRET!, {
      expiresIn: "3d",
    });
    res.status(statusCodeOk).json({ token });
  } catch (error) {
    next(error);
  }
};
