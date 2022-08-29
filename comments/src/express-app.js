const express = require("express");
const cors = require("cors");
const { commentsRoutes } = require("./routes");
const HandleError = require("./utils/error-handler");

module.exports = async (app, channel) => {
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true, limit: "1mb" }));
  app.use(cors());
  app.use(express.static(__dirname + "/public"));

  // LISTEN to EVENTS

  // Routes
  commentsRoutes(app, channel);

  //ERROR HANDLING
  app.use(HandleError);
};
