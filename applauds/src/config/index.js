const dotEnv = require('dotenv');
if (process.env.NODE_ENV !== 'prod') {
  const configFile = `.env.${process.env.NODE_ENV.trim()}`;

  dotEnv.config({ path: configFile });
} else {
  dotEnv.config();
}
// require('../../.env.dev')
module.exports = {
  PORT: process.env.PORT,
  DB_URL: process.env.MONGODB_URI,
  APP_SECRET: process.env.APP_SECRET,
  EMOJI_LIST: [1, 2, 3, 4, 5],
  MESSAGE_BROKER_URL: process.env.MESSAGE_BROKER_URL,
  EXCHANGE_NAME: 'SOCIAL_HUB',
  APPLAUD_BINDING_KEY: 'APPLAUD_SERVICE',
};
