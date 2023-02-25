import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { type Response, type Request } from "express";
import connectToDatabase from "../../database/connectToDatabase.js";
import User from "../../database/models/User.js";
import { type UsersStructure } from "../../types.js";
import { app } from "..";
import { getUsers } from "./usersControllers.js";

const mockedUsers: UsersStructure = [
  {
    name: "Marius",
    username: "marius69",
    email: "marius@isdi.com",
    password: "123456789",
    avatar: "mariuswithcapucha.jpg",
    aboutme: "whatever i want to say",
    relationships: { friends: [], foes: [] },
  },
  {
    name: "Berts",
    username: "bert",
    email: "bert@isdi.com",
    password: "123456789",
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

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectToDatabase(server.getUri());
});

afterAll(async () => {
  await server.stop();
  await mongoose.connections[0].close();
});

describe("Given a POST 'users/register' endpoint", () => {
  describe("When it receives a request with username 'bert' and password '123456789'", () => {
    test("Then it should respond with status code '201' and message 'The user with email bert@isdi.com has been registered`", async () => {
      const expectedStatusCode = 201;
      const expectedResponse = `The user with email ${mockedUsers[1].email} has been registered`;

      const requestContentHead = { "Content-Type": "multipart/form-data" };
      const userRegisterEndpoint = "/users/register";

      const response = await request(app)
        .post(userRegisterEndpoint)
        .set(requestContentHead)
        .field("name", mockedUsers[1].name)
        .field("email", mockedUsers[1].email)
        .field("username", mockedUsers[1].username)
        .field("password", mockedUsers[1].password)
        .field("aboutme", mockedUsers[1].aboutme)
        .expect(expectedStatusCode);

      expect(response.body).toStrictEqual(expectedResponse);
    });
  });

  afterAll(async () => {
    await User.deleteMany(mockedUsers[1]);
  });
});
