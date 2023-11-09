import amqplib from "amqplib/callback_api.js";
import { Sequelize } from "sequelize";
import pg from "pg";

import { createPost, createTable } from "../controllers/index.js";

const queue = "postgre";
const dialect = "postgres";
const username = "postgres";
const password = "12345678";
const host = "localhost";
const database = "rabbitmq";
const dialectModule = pg;

export const sequelize = new Sequelize({
  dialect,
  username,
  password,
  host,
  dialectModule,
  database,
});

export const connectToPostgre = async () => {
  try {
    await sequelize.authenticate();
    await createTable();
  } catch (error) {
    console.error(error);
  }
};

export const connectToRabbitMQ = () => {
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
