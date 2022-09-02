import express from "express";
import { configuration } from "./config";
import { databaseConnection } from "./database";
import expressApp from "./express-app";
import { CreateChannel } from "./utils";
//CREATING EXPRESS SERVER
const StartServer = async () => {
  try {
    const app = express();
    //DATABASE CONNECTION
    await databaseConnection();

    // create channel for message broker
    const channel = await CreateChannel();

    // EXPRESS APP
    await expressApp(app, channel);
    app.get("/", (req, res) => {
      return res.send("HI WELCOME TO XT SOCIAL HUB");
    });
    app
      .listen(configuration.PORT, () => {
        console.log(
          `======== POSTS SERVICE IS RUNNING ON PORT ${configuration.PORT} ========`
        );
      })
      .on("error", (error) => {
        console.log(error);
        process.exit(1);
      });
  } catch (error) {
    console.log(error);
  }
};
StartServer();
