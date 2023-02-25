import { Router } from "express";
import getUsers from "../controllers/usersControllers.js";

const getUsersEndpoint = "/";

// eslint-disable-next-line new-cap
const usersRouter = Router();

usersRouter.get(getUsersEndpoint, getUsers);

export default usersRouter;
