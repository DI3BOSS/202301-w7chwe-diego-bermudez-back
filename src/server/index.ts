import express from "express";
import morgan from "morgan";
import cors from "cors";
import usersRouter from "./routers/usersRouters.js";

const UsersEndpoint = "/users";

export const app = express();

app.disable("x-powered-by");

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use(UsersEndpoint, usersRouter);
