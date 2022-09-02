const express = require("express");
const { PORT } = require("./config");
const { databaseConnection } = require("./database");
const expressApp = require("./express-app");
const { CreateChannel } = require("./utils");
//CREATING EXPRESS SERVER
const StartServer = async () => {
  const app = express();
  // DB CONNECTION
  await databaseConnection();
  const channel = await CreateChannel();
  // EXPRESS APP
  await expressApp(app, channel);
  app.get("/", (req, res) => {
    return res.send("HI WELCOME TO XT SOCIAL HUB QUERY SERVICE");
  });
  app
    .listen(PORT, () => {
      console.log(`======== QUERY SERVICE IS RUNNING ON PORT ${PORT} ========`);
    })
    .on("error", (error) => {
      console.log(error);
      process.exit(1);
    });
};
StartServer();
