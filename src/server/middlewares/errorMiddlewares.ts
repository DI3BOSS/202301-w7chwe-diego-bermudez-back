import createDebug from "debug";
import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../CustomError/CustomError";

export const statusCodeInternalServerError = 500;
export const unableToRegisterUserError = "Couldn't create user";
export const retrievingUsersError = "Couldn't retrieve users.";

const statusCodeNotFound = 404;
const pathNotFound = "Path not found";
const endPointNotFoundMessage = "End point not found";

export const debug = createDebug("SN_server:");

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
