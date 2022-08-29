const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { APP_SECRET, EXCHANGE_NAME, MESSAGE_BROKER_URL } = require("../config");
const amqplib = require("amqplib");

//Utility functions


  module.exports.ValidateSignature = async (req) => {
    const signature = req.get("Authorization");
    if (signature) {
      const payload = await jwt.verify(signature.split(" ")[1], APP_SECRET);
      req.user = payload;
      return true;
    }

    return false;
  };

module.exports.FormatData = (data) => {
  if (data) {
    return { data };
  } else {
    throw new Error("Data Not found!");
  }
};

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

// publish message
module.exports.PublishMessage = async (
  channel,
  binding_key,
  message
) => {
  try {
    console.log("message from PublishMessage  --- "+message);
    await channel.publish(EXCHANGE_NAME, binding_key, Buffer.from(message));
  } catch (error) {
    throw error;
  }
};

// subscribe message
// module.exports.SubscribeMessage = async (
//   channel,
//   service,
//   binding_key
// ) => {
//   try {
//     const appQueue = await channel.assertQueue("QUEUE_NAME");
//     channel.bingQueue(appQueue.queue, EXCHANGE_NAME, binding_key);
//     channel.consume(appQueue.queue, (data) => {
//       console.log("RECEIVED DATA");
//       console.log(data.content.toString());
//       channel.ack(data);
//     });
//   } catch (error) {
//     throw error;
//   }
// };
