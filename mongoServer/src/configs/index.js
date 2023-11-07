import amqplib from "amqplib/callback_api.js";
import mongoose from "mongoose";

const queue = "mongoChannel";

export const connectToMongoDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/myapp");
  } catch (error) {
    console.error(error);
  }
};

export const connectToRabbitMQ = () => {
  amqplib.connect("amqp://localhost", (err, conn) => {
    // Listener
    conn.createChannel((err, ch2) => {
      if (err) throw err;

      ch2.assertQueue(queue);

      ch2.consume(queue, (msg) => {
        if (msg !== null) {
          console.log(`${msg.content.toString()}`);
          ch2.ack(msg);
        } else {
          console.log("Consumer cancelled by server");
        }
      });
    });
  });
};
