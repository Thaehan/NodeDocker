import amqplib from "amqplib/callback_api.js";

const otherChanel = "Caca";
const MONGO_CHANNEL = "mongoChannel";

amqplib.connect("amqp://localhost", (err, conn) => {
  if (err) throw err;
  
  conn.createChannel((err, ch1) => {
    if (err) throw err;

    ch1.assertQueue(MONGO_CHANNEL);

    setInterval(() => {
      ch1.sendToQueue(MONGO_CHANNEL, Buffer("MONGODB "));
    }, 2000);
  });

  // Sender
  conn.createChannel((err, ch1) => {
    if (err) throw err;

    ch1.assertQueue(otherChanel);

    setInterval(() => {
      ch1.sendToQueue(otherChanel, Buffer("OTHER QUEUE"));
    }, 1000);
  });
});
