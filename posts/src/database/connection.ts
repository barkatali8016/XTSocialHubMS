import { connect } from "mongoose";
import { configuration } from "../config";

export const databaseConnection = async () => {
  try {
    await connect(configuration.DB_URL);
    console.log("!!! POSTS DB CONNECTED!!!");
  } catch (error) {
    console.log("====== POSTS DB CONNECTION ERROR======");
    console.log(error);
  }
};
