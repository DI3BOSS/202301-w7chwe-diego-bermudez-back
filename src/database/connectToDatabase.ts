import mongoose from "mongoose";

const databaseConnectionError = "Error while connecting to data base";

const connectToDatabase = async (url: string) => {
  mongoose.set("strictQuery", false);

  try {
    await mongoose.connect(url);
  } catch (error) {
    throw new Error(databaseConnectionError);
  }
};

export default connectToDatabase;
