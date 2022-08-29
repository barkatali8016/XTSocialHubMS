const expres = require("express");
const cors = require("cors");
const { routes } = require("./routes");
const HandleError = require("./utils/error-handler");
module.exports = async (app, channel) => {
  app.use(expres.json({ limit: "1mb" }));
  app.use(expres.urlencoded({ extended: true, limit: "1mb" }));
  app.use(cors());
  app.use(expres.static(__dirname + "/public"));

  // LISTEN to EVENTS

  // Routes
  routes(app, channel);

  //ERROR HANDLING
  app.use(HandleError);
};
