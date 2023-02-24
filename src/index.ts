import "./loadEnvironment.js";
import chalk from "chalk";
import debug from "debug";
import connectToDatabase from "./database/connectToDatabase.js";
import startServer from "./server/startServer.js";

const port = process.env.PORT ?? 4500;
const mongoDbUrl = process.env.MONGODB_URL_CONNECTION;

const connectionMessage = chalk.bold("Connected to data base");
const listeningMessage = (port: string | number) =>
  chalk.bold(`Server listening on port ${port}`);

try {
  await connectToDatabase(mongoDbUrl!);
  debug(chalk.bgGreen(connectionMessage));

  await startServer(+port);
  debug(chalk.bgGreen(listeningMessage(port)));
} catch (error) {
  debug(chalk.bgRed(error.message));
}
