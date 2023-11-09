import amqp from "amqplib";

export const MONGO_QUEUE = "mongo";

export const createMongo = async (req, res, next) => {
  let connection;
  try {
    const { type, data } = req.body;

    connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    await channel.assertQueue(MONGO_QUEUE, { durable: true });
    channel.sendToQueue(
      MONGO_QUEUE,
      Buffer.from(
        JSON.stringify({
          type,
          data,
        })
      )
    );
    await channel.close();
  } catch (error) {
    console.error(error);
  } finally {
    if (connection) await connection.close();
    res.status(200).send("OK");
  }
};

export const getAllMongo = async (req, res, next) => {
  let connection;
  try {
    connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    await channel.assertQueue(MONGO_QUEUE, { durable: true });
    channel.sendToQueue(
      MONGO_QUEUE,
      Buffer.from(
        JSON.stringify({
          type: "get",
        })
      )
    );
    await channel.close();
  } catch (error) {
    console.error(error);
  } finally {
    if (connection) {
      await connection.close();
    }
    res.status(200).send("OK");
  }
};
