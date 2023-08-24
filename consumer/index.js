import amqplib from 'amqplib/callback_api.js';

const queue = 'defaultChannel';

amqplib.connect('amqp://localhost', (err, conn) => {
  if (err) throw err;

  // Listener
  conn.createChannel((err, ch2) => {
    if (err) throw err;

    ch2.assertQueue(queue);

    ch2.consume(queue, (msg) => {
      if (msg !== null) {
        console.log(`This is the message from producer: ${msg.content.toString()}`);
        ch2.ack(msg);
      } else {
        console.log('Consumer cancelled by server');
      }
    });
  });
});