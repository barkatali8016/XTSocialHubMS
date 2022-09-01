const express = require("express");
const { PORT } = require("./config");
const { databaseConnection } = require("./database");
const expressApp = require("./express-app");
const {CreateChannel} = require("./utils");
//CREATING EXPRESS SERVER
const StartServer = async () => {
  const app = express();

  //Database connection
  await databaseConnection();

  //create channel for message broker(RabbitMQ)
  const channel = await CreateChannel();

  //Express app
  await expressApp(app, channel);

  app.get("/", (req, res) => {
    return res.send("HI WELCOME TO XT SOCIAL HUB");
  });
  app
    .listen(PORT, () => {
      console.log(
        `============================ COMMENTS SERVICE IS RUNNING ON PORT ${PORT} ======================================`
      );
    })
    .on("error", (error) => {
      console.log(error);
      process.exit(1);
    });
};
StartServer();
