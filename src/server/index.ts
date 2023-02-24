import express from "express";
import morgan from "morgan";
import cors from "cors";

export const app = express();

app.disable("x-powered-by");

app.use(morgan("dev"));

app.use(express.json());
app.use(cors());
