const dotEnv = require("dotenv");
if (process.env.NODE_ENV !== "prod") {
  const configFile = `.env.${process.env.NODE_ENV.trim()}`;

  dotEnv.config({ path: configFile });
} else {
  dotEnv.config();
}
module.exports = {
  PORT: process.env.PORT,
  DB_URL: process.env.MONGODB_URI,
  APP_SECRET: process.env.APP_SECRET,
  MESSAGE_BROKER_URL: process.env.MESSAGE_BROKER_URL,
  EXCHANGE_NAME: "SOCIAL_HUB",
  POST_BINDING_KEY: "POST_SERVICE"
};
