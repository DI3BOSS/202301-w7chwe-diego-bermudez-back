import { Router } from "express";
import {
  getUsers,
  loginUser,
  registerUser,
} from "../controllers/usersControllers.js";
import upload from "../middlewares/multerMiddleware.js";

const getUsersEndpoint = "/";
const registerUserEndpoint = "/register";
const loginUserEndpoint = "/login";
const userProfileImage = "avatar";

// eslint-disable-next-line new-cap
const usersRouter = Router();

usersRouter.get(getUsersEndpoint, getUsers);
usersRouter.post(
  registerUserEndpoint,
  upload.single(userProfileImage),
  registerUser
);
usersRouter.post(loginUserEndpoint, loginUser);

export default usersRouter;
