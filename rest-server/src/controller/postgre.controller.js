import amqp from "amqplib";

export const POSTGRE_QUEUE = "postgre";

export const createPostgre = async (req, res, next) => {
  let connection;
  try {
    const { type, data } = req.body;

    connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    await channel.assertQueue(POSTGRE_QUEUE, { durable: true });
    channel.sendToQueue(
      POSTGRE_QUEUE,
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

export const getAllPostgre = async (req, res, next) => {
  let connection;
  try {
    connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    await channel.assertQueue(POSTGRE_QUEUE, { durable: true });
    channel.sendToQueue(
      POSTGRE_QUEUE,
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
    if (connection) await connection.close();
    res.status(200).send("OK");
  }
};
