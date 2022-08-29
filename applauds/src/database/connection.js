const mongoose = require('mongoose');
const { DB_URL } = require('../config');
module.exports = async () => {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to Applaud DB!!');
  } catch (error) {
    console.log('======DB CONNECTION ERROR======');
    console.log(error);
    process.exit(1);
  }
};
