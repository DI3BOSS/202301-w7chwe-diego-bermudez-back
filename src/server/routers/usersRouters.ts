import { Router } from "express";
import getUsers from "../controllers/usersControllers.js";

const getUsersEndpoint = "/";

const usersRouter = Router();

usersRouter.get(getUsersEndpoint, getUsers);

export default usersRouter;
