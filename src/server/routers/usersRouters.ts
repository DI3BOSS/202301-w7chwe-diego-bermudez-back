import { Router } from "express";
import { getUsers, registerUser } from "../controllers/usersControllers.js";

const getUsersEndpoint = "/";
const registerUserEndpoint = "/register";

// eslint-disable-next-line new-cap
const usersRouter = Router();

usersRouter.get(getUsersEndpoint, getUsers);
usersRouter.post(registerUserEndpoint, registerUser);

export default usersRouter;
