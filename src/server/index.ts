import express from "express";
import morgan from "morgan";
import usersRouter from "./routers/usersRouters.js";

const usersEndpoint = "/users";

export const app = express();

app.disable("x-powered-by");

app.use(morgan("dev"));
app.use(express.json());

app.use(usersEndpoint, usersRouter);
