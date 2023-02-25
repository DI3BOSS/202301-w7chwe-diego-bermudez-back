import "./loadEnvironment.js";
import chalk from "chalk";
import createDebug from "debug";
import mongoose from "mongoose";
import connectToDatabase from "./database/connectToDatabase.js";
import startServer from "./server/startServer.js";

export const debug = createDebug("SN-Connection:");

const port = process.env.PORT ?? 4000;
const mongoDbUrl = process.env.MONGODB_URL_CONNECTION;

const connectionMessage = chalk.bold("Connected to data base");
const listeningMessage = (port: string | number) =>
  chalk.bold(`Server listening on port ${port}`);

mongoose.set("toJSON", {
  virtuals: true,
  transform(doc, ret) {
    delete ret._id;
    delete ret.__v;
  },
});

try {
  await connectToDatabase(mongoDbUrl!);
  debug(chalk.bgGreen(connectionMessage));

  await startServer(port as number);
  debug(chalk.bgGreen(listeningMessage(port)));
} catch (error) {
  debug(chalk.bgRed(error.message));
}
