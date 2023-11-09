import amqplib from "amqplib/callback_api.js";
import mongoose from "mongoose";

import { createPost } from "../controller/post.controller.js";

const queue = "mongo";

export const connectToMongoDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/rabbitmq");
  } catch (error) {
    console.error(error);
  }
};

export const connectToRabbitMQ = async () => {
  amqplib.connect("amqp://localhost", async (err, conn) => {
    // Listener
    conn.createChannel(async (err, channel) => {
      if (err) throw err;

      channel.assertQueue(queue);

      channel.consume(queue, async (msg) => {
        if (msg !== null) {
          const message = JSON.parse(msg.content);
          if (message.type === "get") {
            console.log("get");
            channel.ack(msg);
            return;
          }
          if (message.data) {
            await createPost(message.data);
            console.log(message.data);
          }
          channel.ack(msg);
        } else {
          console.log("Consumer cancelled by server");
        }
      });
    });
  });
};
