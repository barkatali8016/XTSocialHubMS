const mongoose = require("mongoose");
const { DB_URL } = require("../config");
module.exports = async () => {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("!!! APPLAUDS DB CONNECTED!!!");
  } catch (error) {
    console.log("====== APPLAUDS DB CONNECTION ERROR======");
    console.log(error);
    process.exit(1);
  }
};
