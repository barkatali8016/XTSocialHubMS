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
  MOJO_API_KEY: process.env.MOJO_API_KEY,
  MESSAGE_BROKER_URL: process.env.MESSAGE_BROKER_URL,
  EXCHANGE_NAME: "SOCIAL_HUB",
  USER_BINDING_KEY: "USER_SERVICE",
  COMMENT_BINDING_KEY: "COMMENT_SERVICE",
  APPLAUD_BINDING_KEY: "APPLAUD_SERVICE",
  QUEUE_NAME: "POST_QUEUE",
};
