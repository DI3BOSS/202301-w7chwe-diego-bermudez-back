import createDebug from "debug";
import express from "express";
import type CustomError from "../CustomError/CustomError.js";

const debug = createDebug("server:startServer");
const errorMessage = "Error on starting the server";
const errorAddresInUse = "EADDRINUSE";

const portInUseMessage = (port: number) =>
  `The port number ${port} is already in use`;

export const app = express();

const startServer = async (port: number) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      resolve(server);
    });

    server.on("error", (error: CustomError) => {
      if (error.code === errorAddresInUse) {
        debug(errorMessage, portInUseMessage(port));
      }

      reject(new Error(errorMessage));
    });
  });

export default startServer;
