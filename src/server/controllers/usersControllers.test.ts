import request from "supertest";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { type Response, type Request, json } from "express";
import connectToDatabase from "../../database/connectToDatabase.js";
import User from "../../database/models/User.js";
import { UserStructure, type UsersStructure } from "../../types.js";
import { app } from "..";
import { getUsers, loginUser } from "./usersControllers.js";

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
  describe("When it receives a request from an user", () => {
    test("Then it should call its status method with 200 code", async () => {
      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue(mockedUsers),
      };

      const request = {};

      const next = jest.fn();

      const expectedStatusCodeOk = 200;

      User.find = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockReturnValue(mockedUsers),
      }));

      await getUsers(
        request as Request,
        response as unknown as Response<unknown>,
        next
      );

      expect(response.status).toHaveBeenCalledWith(expectedStatusCodeOk);
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
      const expectedStatusCodeCreated = 201;
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
        .expect(expectedStatusCodeCreated);

      expect(response.body).toStrictEqual(expectedResponse);
    });
  });

  afterAll(async () => {
    await User.deleteMany(mockedUsers[1]);
  });
});

describe("Given a POST 'users/login' endpoint", () => {
  describe("When it receives a login request with username 'bert' and password '123456789'", () => {
    test("Then it should respond with status code '200' and its json method with a token", async () => {
      const expectedStatusCodeOk = 200;
      const mockedHasedPasswordCompareResult = true;

      const request = {} as Request;

      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response<unknown>;

      const expectedToken = {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2M2ZiYjEyZDM4YzVlYzRhYTliYTE4NTUiLCJ1c2V",
      };

      request.body = {
        username: mockedUsers[1].username,
        password: mockedUsers[1].password,
      };

      const next = jest.fn();

      User.findOne = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockReturnValue({
          ...request.body,
          _id: new mongoose.Types.ObjectId(),
        }),
      }));

      bcrypt.compare = jest
        .fn()
        .mockResolvedValue(mockedHasedPasswordCompareResult);
      jwt.sign = jest.fn().mockReturnValue(expectedToken.token);

      await loginUser(request, response as Response, next);

      expect(response.status).toHaveBeenCalledWith(expectedStatusCodeOk);
      expect(response.json).toHaveBeenCalledWith(expectedToken);
    });
  });
});
