import express from "express";
import morgan from "morgan";
import {
  errorByDefault,
  errorNotFound,
} from "./middlewares/errorMiddlewares.js";
import usersRouter from "./routers/usersRouters.js";

const usersEndpoint = "/users";
const root = "/";

export const app = express();

app.disable("x-powered-by");

app.use(morgan("dev"));
app.use(express.json());

app.use(usersEndpoint, usersRouter);

app.use(root, errorNotFound);
app.use(root, errorByDefault);
