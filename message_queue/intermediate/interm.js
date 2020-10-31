var amqp = require('amqplib/callback_api');

amqp.connect('amqp://guest:guest@rabbitmqs:5672', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    var exchange = "node_exchange";
    var key = "my.o"
    channel.assertExchange(exchange, 'topic', {
      durable: true
    });

    channel.assertQueue('node_queue', {
      exclusive: false
    }, function(error2, q) {

      if (error2) {
        throw error2;
      }
      console.log(' [*] Waiting for logs. To exit press CTRL+C');


        channel.bindQueue(q.queue, exchange, key);


      channel.consume(q.queue, function(msg) {
        console.log(" [x] %s:'%s'", msg.fields.routingKey, msg.content.toString());
      }, {
        noAck: true
      });
    });
  });
});
