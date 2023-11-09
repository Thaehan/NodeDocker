import amqp from "amqplib";

export const MONGO_QUEUE = "mongo";

export const createMongo = async (req, res, next) => {
  let connection;
  try {
    connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    await channel.assertQueue(MONGO_QUEUE, { durable: true });
    channel.sendToQueue(
      MONGO_QUEUE,
      Buffer.from(
        JSON.stringify({
          title: "mongo",
          description: "mongo test",
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
  try {
    let connection;
    try {
      connection = await amqp.connect("amqp://localhost");
      const channel = await connection.createChannel();

      await channel.assertQueue(MONGO_QUEUE, { durable: true });
      channel.sendToQueue(
        MONGO_QUEUE,
        Buffer.from(
          JSON.stringify({
            title: "mongo",
            description: "mongo test",
          })
        )
      );
      await channel.close();
    } catch (err) {
      console.warn(err);
    } finally {
      if (connection) await connection.close();
    }
  } catch (error) {
    console.error(error);
  } finally {
    res.status(200).send("OK");
  }
};
