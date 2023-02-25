import { Router } from "express";
import { getUsers, registerUser } from "../controllers/usersControllers.js";
import upload from "../middlewares/multerMiddleware.js";

const getUsersEndpoint = "/";
const registerUserEndpoint = "/register";
const userProfileImage = "avatar";

// eslint-disable-next-line new-cap
const usersRouter = Router();

usersRouter.get(getUsersEndpoint, getUsers);
usersRouter.post(
  registerUserEndpoint,
  upload.single(userProfileImage),
  registerUser
);

export default usersRouter;
