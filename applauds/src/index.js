const express = require("express");
const { PORT } = require("./config");
const { CreateChannel } = require("./utils");
const { databaseConnection } = require("./database");
const expressApp = require("./express-app");
//CREATING EXPRESS SERVER
const StartServer = async () => {
  const app = express();
  await databaseConnection();
  // create channel for message broker
  const channel = await CreateChannel();
  await expressApp(app, channel);
  app.get("/", (req, res) => {
    return res.send("HI WELCOME TO XT SOCIAL HUB");
  });
  app
    .listen(PORT, () => {
      console.log(`======== POSTS SERVICE IS RUNNING ON PORT ${PORT} ========`);
    })
    .on("error", (error) => {
      console.log(error);
      process.exit(1);
    });
};
StartServer();
