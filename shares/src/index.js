const express = require("express");
const { PORT } = require("./config");
const { databaseConnection } = require("./database");
const expressApp = require("./express-app");
const { CreateChannel } = require("./utils");
//CREATING EXPRESS SERVER
const StartServer = async () => {
  const app = express();
  await databaseConnection();

  const channel = await CreateChannel();

  await expressApp(app, channel);
  app.get("/", (req, res) => {
    return res.send("HI WELCOME TO XT SOCIAL HUB SHARE POST SERVICE");
  });
  app
    .listen(PORT, () => {
      console.log(
        `======== SHARES SERVICE IS RUNNING ON PORT ${PORT} ========`
      );
    })
    .on("error", (error) => {
      console.log(error);
      process.exit(1);
    });
};
StartServer();
