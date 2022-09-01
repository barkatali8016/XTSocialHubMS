const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, EXCHANGE_NAME, MESSAGE_BROKER_URL } = require('../config');
const amqplib = require('amqplib');

//Utility functions
module.exports.ValidateSignature = async (req) => {
  const signature = req.get('Authorization');

  // console.log(signature);

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

//for rabbitmq
//create channel
module.exports.CreateChannel = async () => {
  try {
    const connection = await amqplib.connect(MESSAGE_BROKER_URL);
    const channel = await connection.createChannel();
    await channel.assertExchange(EXCHANGE_NAME, 'direct', {
      durable: false,
    });
    return channel;
  } catch (error) {
    throw error;
  }
};

// publish message
module.exports.PublishMessage = async (channel, binding_key, message) => {
  try {
    await channel.publish(EXCHANGE_NAME, binding_key, Buffer.from(message));
  } catch (error) {
    throw error;
  }
};
