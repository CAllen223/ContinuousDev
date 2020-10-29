const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    setTimeout(function(){},1000);
    var exchange = 'node_exchange';
    channel.assertExchange(exchange, 'topic', {
      durable: false
    });

    channel.assertQueue(queue, {
      durable: false
    });
    channel.prefetch(1);
    channel.bindQueue(q.queue, exchange, key);
    
    channel.consume(queue, function(msg) {

        console.log("Received '%s'", msg.content.toString());
  
  });
});
});
