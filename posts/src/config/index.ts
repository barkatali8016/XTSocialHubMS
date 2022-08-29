import { config } from "dotenv";
import { resolve } from "path";

if (process.env.NODE_ENV !== "prod") {
  const configFileName = `.env.${process.env.NODE_ENV?.trim()}`;
  config({ path: resolve(process.cwd(), configFileName) });
} else {
  config();
}

export const configuration = {
  PORT: process.env.PORT,
  DB_URL: process.env.MONGODB_URI || "",
  APP_SECRET: process.env.APP_SECRET || "",
  MESSAGE_BROKER_URL: process.env.MESSAGE_BROKER_URL,
  EXCHANGE_NAME: "SOCIAL_HUB",
  USER_BINDING_KEY: "USER_SERVICE",
  COMMENT_BINDING_KEY: "COMMENT_SERVICE",
  APPLAUD_BINDING_KEY: "APPLAUD_SERVICE",
  XTSOCIAL_BINDING_KEY: "XTSOCIAL_SERVICE",
};
