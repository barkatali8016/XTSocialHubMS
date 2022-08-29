import jwt from "jsonwebtoken";
import amqplib from "amqplib";
import { configuration } from "../config";
const { APP_SECRET, EXCHANGE_NAME } = configuration;
const MESSAGE_BROKER_URL: any = configuration.MESSAGE_BROKER_URL;

// Returns the time in minutes
export const CalculateReadingTime = (content: string): number => {
  const wpm = 225;
  const words = content.trim().split(/\s+/).length;
  const time = Math.ceil(words / wpm);
  return time
};

export const ValidateSignature = async (req: any) => {
  const signature = req.get("Authorization");

  console.log(signature);

  if (signature) {
    const payload = await jwt.verify(signature.split(" ")[1], APP_SECRET);
    req.user = payload;
    return true;
  }

  return false;
};

export const FormateData = (data: any) => {
  if (data) {
    return { data };
  } else {
    throw new Error("Data Not found!");
  }
};

// MESSAGE BROKER

// create channel
export const CreateChannel = async () => {
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
export const PublishMessage = async (
  channel: any,
  binding_key: string,
  message: any
) => {
  try {
    await channel.publish(EXCHANGE_NAME, binding_key, Buffer.from(message));
  } catch (error) {
    throw error;
  }
};

// subscribe message
export const SubscribeMessage = async (
  channel: any,
  service: any,
  binding_key: string
) => {
  try {
    const appQueue = await channel.assertQueue("QUEUE_NAME");
    channel.bingQueue(appQueue.queue, EXCHANGE_NAME, binding_key);
    channel.consume(appQueue.queue, (data: any) => {
      console.log("RECEIVED DATA");
      console.log(data.content.toString());
      channel.ack(data);
    });
  } catch (error) {
    throw error;
  }
};
