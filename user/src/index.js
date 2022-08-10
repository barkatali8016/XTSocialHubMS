const express = require("express");
const { PORT } = require("./config");
const { databaseConnection } = require("./database");
const expressApp = require("./express-app");
//CREATING EXPRESS SERVER
const StartServer = async () => {
  const app = express();
  await databaseConnection();
  await expressApp(app);
  app.get("/", (req, res) => {
    return res.send("HI WELCOME TO XT SOCIAL HUB");
  });
  app
    .listen(PORT, () => {
      console.log(`USER SERVICE IS RUNNING ON PORT ${PORT}`);
    })
    .on("error", (error) => {
      console.log(error);
      process.exit(1);
    });
};
StartServer();
