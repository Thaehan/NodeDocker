import amqplib from "amqplib/callback_api.js";
import mongoose from "mongoose";

const queue = "mongo";

export const connectToMongoDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/rabbitmq");
  } catch (error) {
    console.error(error);
  }
};

export const connectToRabbitMQ = () => {
  amqplib.connect("amqp://localhost", (err, conn) => {
    // Listener
    conn.createChannel((err, channel) => {
      if (err) throw err;

      channel.assertQueue(queue);

      channel.consume(queue, (msg) => {
        if (msg !== null) {
          console.log(`${msg.content}`);
          channel.ack(msg);
        } else {
          console.log("Consumer cancelled by server");
        }
      });
    });
  });
};
