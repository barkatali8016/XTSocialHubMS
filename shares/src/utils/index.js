const jwt = require('jsonwebtoken');
const { APP_SECRET } = require('../config');
const amqplib = require("amqplib");
const {
  MESSAGE_BROKER_URL,
  EXCHANGE_NAME
} = require("../config")

module.exports.ValidateSignature = async (req) => {
  const signature = req.get('Authorization');

  if (signature) {
    const payload = jwt.verify(signature.split(' ')[1], APP_SECRET);
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

// publish message
module.exports.PublishMessage = async (
  channel,
  binding_key,
  message
) => {
  try {
    await channel.publish(EXCHANGE_NAME, binding_key, Buffer.from(message));
  } catch (error) {
    throw error;
  }
};