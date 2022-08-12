import express from "express";
import { configuration } from "./config";
import { databaseConnection } from "./database";
import expressApp from "./express-app";
//CREATING EXPRESS SERVER
const StartServer = async () => {
  try {
    const app = express();
    await databaseConnection();
    await expressApp(app);
    app.get("/", (req, res) => {
      return res.send("HI WELCOME TO XT SOCIAL HUB");
    });
    app
      .listen(configuration.PORT, () => {
        console.log(`USER SERVICE IS RUNNING ON PORT ${configuration.PORT}`);
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
