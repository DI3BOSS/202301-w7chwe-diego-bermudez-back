import { NextFunction, Request, Response } from "express";
import CustomError from "../../CustomError/CustomError.js";
import User from "../../database/models/User.js";

const statusCodeOk = 200;
const statusCodeInternalServerError = 500;

const retrievingError = "Couldn't retrieve users.";

const customError = (error: Error) =>
  new CustomError(
    error.message,
    statusCodeInternalServerError,
    retrievingError
  );

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find().exec();

    res.status(statusCodeOk).json({ users });
  } catch (error) {
    next(customError(error));
  }
};

export default getUsers;
