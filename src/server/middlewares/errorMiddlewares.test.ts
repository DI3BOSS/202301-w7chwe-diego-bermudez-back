import { type Request, type NextFunction, type Response } from "express";
import CustomError from "../../CustomError/CustomError.js";
import { errorByDefault, errorNotFound } from "./errorMiddlewares.js";

const request = {};

const response = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const next = jest.fn() as NextFunction;

describe("Given the errorNotFound middleware function", () => {
  describe("When it receives a response", () => {
    test("Then it should call its next method", async () => {
      errorNotFound(
        request as Request,
        response as unknown as Response<unknown>,
        next
      );
      expect(next).toHaveBeenCalled();
    });
  });
});

describe("Given a errorByDefault middleware function", () => {
  describe("When it receives a request that resolves to an error with code status '500'", () => {
    test("Then it shoulds its status method with code '500'", async () => {
      const statusCodeInternalServerError = 500;
      const error = new CustomError("", statusCodeInternalServerError, "");

      errorByDefault(
        error,
        request as Request,
        response as unknown as Response<unknown>,
        next
      );

      expect(response.status).toHaveBeenCalledWith(
        statusCodeInternalServerError
      );
    });
  });
});
