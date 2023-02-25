import { Router } from "express";
import getUsers from "../controllers/usersControllers.js";

const usersEndpoint = "/users";

const usersRouter = Router();
usersRouter.get(usersEndpoint, getUsers);

export default usersRouter;
