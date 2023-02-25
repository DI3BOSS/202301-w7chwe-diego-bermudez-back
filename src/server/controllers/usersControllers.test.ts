import { Response, Request } from "express-serve-static-core";
import User from "../../database/models/User";
import { UsersStructure } from "../../types";
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
      } as Partial<Response>;

      const request = {} as Request;

      const next = jest.fn();

      const expectedStatusCode = 200;

      User.find = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockReturnValue(mockedUsers),
      }));

      await getUsers(request as Request, response as Response, next);

      expect(response.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call its json method", async () => {
      const res = {
        status: jest.fn().mockReturnThis(),

        json: jest.fn().mockResolvedValue(mockedUsers),
      } as Partial<Response>;

      const req = {} as Request;

      const next = jest.fn();

      User.find = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockReturnValue(mockedUsers),
      }));

      await getUsers(req, res as Response, next);

      expect(res.json).toHaveBeenCalledWith({ users: mockedUsers });
    });
  });
});
