import createDebug from "debug";
import type CustomError from "../CustomError/CustomError.js";
import { app } from "./index.js";

const debug = createDebug("server:startServer:");
const startingServerErrorMessage = "Error on starting the server";
const errorCodeAddresInUse = "EADDRINUSE";
const portInUseMessage = (port: number | string) =>
  `The port number ${port} is already in use`;

const startServer = async (port: number | string) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      resolve(server);
    });

    server.on("error", (error: CustomError) => {
      if (error.code === errorCodeAddresInUse) {
        debug(startingServerErrorMessage, portInUseMessage(port));
      }

      reject(new Error(startingServerErrorMessage));
    });
  });

export default startServer;
