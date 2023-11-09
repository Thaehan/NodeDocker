import amqplib from "amqplib/callback_api.js";
import { Sequelize } from "sequelize";
import pg from "pg";

import { createTable } from "../controllers/index.js";

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
