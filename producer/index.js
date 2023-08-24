import amqplib from 'amqplib/callback_api.js';

const queue = 'defaultChannel';

amqplib.connect('amqp://localhost', (err, conn) => {
  if (err) throw err;
  // Sender
  conn.createChannel((err, ch1) => {
    if (err) throw err;

    ch1.assertQueue(queue);

    setInterval(() => {
      console.log('create new message')
      ch1.sendToQueue(queue, Buffer("This is a rabbit mq message from producer"));
    }, 1000);
  });
});