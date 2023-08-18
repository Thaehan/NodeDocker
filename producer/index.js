const amqplib = require('amqplib/callback_api')

const queue = 'defaultChannel';

amqplib.connect('amqp://localhost', (err, conn) => {
  if (err) throw err;
  // Sender
  conn.createChannel((err, ch1) => {
    if (err) throw err;

    ch1.assertQueue(queue);

    setInterval(() => {
      console.log('create new message')
      ch1.sendToQueue(queue, Buffer("broh this is a rabbitMQ"));
    }, 1000);
  });
});