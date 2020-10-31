const amqp = require("amqplib");
var x =1;
amqp.connect('amqp://guest:guest@localhost:5672', function(error0, connection) {
    if (error0) {
        throw error0;
        
      }
     connection.createChannel(function(error1, channel) {
        if (error1) {
           throw error1;
        
     }
        var exchange = 'node_exchange';
        var key = 'my.o';
        var message = "MSG_"+x 
        channel.assertExchange(exchange, 'topic', {
      durable: false
    });
    channel.publish(exchange, key, Buffer.from(message));
    console.log(" [x] Sent %s:'%s'", key, message);
  });
    setTimeout(function() { 
        connection.close(); 
        process.exit(0) 
      }, 5000);
});