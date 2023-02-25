import { type Response, type Request } from "express";
import User from "../../database/models/User";
import { type UsersStructure } from "../../types.js";
import getUsers from "./usersControllers";

beforeEach(() => jest.restoreAllMocks());

const mockedUsers: UsersStructure = [
  {
    name: "Marius",
    username: "marius69",
    email: "marius@isdi.com",
    password: "",
    avatar: "mariuswithcapucha.jpg",
    aboutme: "whatever i want to say",
    relationships: { friends: [], foes: [] },
  },
  {
    name: "Berts",
    username: "bert",
    email: "bert@isdi.com",
    password: "",
    avatar: "bertasassistant.jpg",
    aboutme: "whatever i want to say",
    relationships: { friends: [], foes: [] },
  },
];

describe("Given the getUsers controller middleware", () => {
  describe("When it receives a request from a user", () => {
    test("Then it should call its status method with 200 code", async () => {
      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue(mockedUsers),
      };

      const request = {};

      const next = jest.fn();

      const expectedStatusCode = 200;

      User.find = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockReturnValue(mockedUsers),
      }));

      await getUsers(
        request as Request,
        response as unknown as Response<unknown>,
        next
      );

      expect(response.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call its json method", async () => {
      const response = {
        status: jest.fn().mockReturnThis(),

        json: jest.fn().mockResolvedValue(mockedUsers),
      };

      const request = {};

      const next = jest.fn();

      User.find = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockReturnValue(mockedUsers),
      }));

      await getUsers(
        request as Request,
        response as unknown as Response<unknown>,
        next
      );

      expect(response.json).toHaveBeenCalledWith({ users: mockedUsers });
    });
  });
});
