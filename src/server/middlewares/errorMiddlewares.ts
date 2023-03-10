import createDebug from "debug";
import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../CustomError/CustomError.js";

export const statusCodeInternalServerError = 500;
export const unableToRegisterUserError = "Couldn't create user";
export const retrievingUsersError = "Couldn't retrieve users.";
const somethingWenWrongMessage = "Something went wrong";

const statusCodeNotFound = 404;
const pathNotFound = "Path not found";
const endPointNotFoundMessage = "End point not found";

export const statusCodeUnauthorized = 401;
export const wrongCredentialsError = "Wrong credentials";
export const unauthorizedUserError =
  "Login failed, please check your username / password and try again";

const debug = createDebug("SN_server:");

export const errorNotFound = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = new CustomError(
    pathNotFound,
    statusCodeNotFound,
    endPointNotFoundMessage
  );

  next(error);
};

export const errorByDefault = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  debug(error.message);

  res
    .status(error.statusCode || statusCodeInternalServerError)
    .json({ error: error.publicMessage || somethingWenWrongMessage });
};
