const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const amqplib = require("amqplib");
const {
  APP_SECRET,
  MOJO_API_KEY,
  USER_BINDING_KEY,
  EXCHANGE_NAME,
  MESSAGE_BROKER_URL,
  QUEUE_NAME,
} = require("../config");
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

// MESSAGE BROKER

// create channel
module.exports.CreateChannel = async () => {
  try {
    const connection = await amqplib.connect(MESSAGE_BROKER_URL);
    const channel = await connection.createChannel();
    await channel.assertExchange(EXCHANGE_NAME, "direct", {
      durable: false,
    });
    return channel;
  } catch (error) {
    throw error;
  }
};

// FOR USER WE DONT NEED => publish message
module.exports.PublishMessage = async (channel, binding_key, message) => {
  try {
    await channel.publish(EXCHANGE_NAME, binding_key, Buffer.from(message));
  } catch (error) {
    throw error;
  }
};

// subscribe message
module.exports.SubscribeMessage = async (channel, service) => {
  try {
    const appQueue = await channel.assertQueue(QUEUE_NAME);
    channel.bindQueue(appQueue.queue, EXCHANGE_NAME, USER_BINDING_KEY);
    channel.consume(appQueue.queue, (data) => {
      console.log("RECEIVED DATA");
      console.log(data.content.toString());
      service.SubscribeEvents(data.content.toString());
      channel.ack(data);
    });
  } catch (error) {
    throw error;
  }
};
