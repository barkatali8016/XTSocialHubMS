const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { APP_SECRET, MOJO_API_KEY } = require("../config");
const MOJO_AUTH_CONFIG = {
  apiKey: MOJO_API_KEY,
};
var mojoAuth = require("mojoauth-sdk")(MOJO_AUTH_CONFIG);

//Utility functions
(module.exports.GenerateSalt = async () => {
  return await bcrypt.genSalt();
}),
  (module.exports.GeneratePassword = async (password, salt) => {
    return await bcrypt.hash(password, salt);
  });

module.exports.ValidatePassword = async (
  enteredPassword,
  savedPassword,
  salt
) => {
  return (await this.GeneratePassword(enteredPassword, salt)) === savedPassword;
};

(module.exports.GenerateSignature = async (payload, expireIn = "1d") => {
  return await jwt.sign(payload, APP_SECRET, { expiresIn: expireIn });
}),
  (module.exports.ValidateSignature = async (req) => {
    const signature = req.get("Authorization");
    if (signature) {
      const payload = await jwt.verify(signature.split(" ")[1], APP_SECRET);
      console.log(payload, "payloadpayloadpayload");
      req.user = payload;
      return true;
    }

    return false;
  });

module.exports.FormateData = (data) => {
  if (data) {
    return { data };
  } else {
    throw new Error("Data Not found!");
  }
};

module.exports.sendOTPMail = async (email) => {
  let query = {};
  query.language = "English";
  return mojoAuth.mojoAPI.signinWithEmailOTP(email, query);
};
module.exports.verifyOTPMail = async (otp, stateId) => {
  return mojoAuth.mojoAPI.verifyEmailOTP(otp, stateId);
};
