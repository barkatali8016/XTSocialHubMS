// const mongoose = require('mongoose');

// const connectDB = async () => {
//     try {
//         const conn = await mongoose.connect(process.env.MONGO_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         });
//         console.log(`MongoDB connected: ${conn.connection.host}`);
//     } catch (error) {
//         console.error(`Error: ${error}`);
//         process.exit;
//     }
// }

// module.exports = connectDB;

const { config } = require('dotenv');
// if (process.env.NODE_ENV !== 'prod') {
//   const configFile = `.env.${process.env.NODE_ENV.trim()}`;

//   dotEnv.config({ path: configFile });
// } else {
//   dotEnv.config();
// }

config();


module.exports = {
  PORT: process.env.PORT,
  DB_URL: process.env.MONGODB_URI,
  APP_SECRET: process.env.APP_SECRET,
};
