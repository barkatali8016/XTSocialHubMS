const expres = require("express");
const cors = require("cors");
const { userRoutes } = require("./routes");
const HandleError = require("./utils/error-handler");
const swaggerUi = require("swagger-ui-express");
const path = require("path");
const swaggerDocument = require(path.resolve(
  __dirname,
  "./users-swagger.json"
));
module.exports = async (app, channel) => {
  // MIDDLE WARES
  app.use(expres.json({ limit: "1mb" }));
  app.use(expres.urlencoded({ extended: true, limit: "1mb" }));
  app.use(cors());
  app.use(expres.static(__dirname + "/public"));
  // SWAGGER MIDDLE WARES
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  // LISTEN to EVENTS

  // Routes
  userRoutes(app, channel);

  //ERROR HANDLING
  app.use(HandleError);
};
