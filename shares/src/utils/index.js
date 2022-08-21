const jwt = require('jsonwebtoken');
const { APP_SECRET } = require('../config');

module.exports.ValidateSignature = async (req) => {
  const signature = req.get('Authorization');

  if (signature) {
    const payload = await jwt.verify(signature.split(' ')[1], APP_SECRET);
    req.user = payload;
    return true;
  }

  return false;
};

module.exports.FormatData = (data) => {
  if (data) {
    return { data };
  } else {
    throw new Error('Data Not found!');
  }
};