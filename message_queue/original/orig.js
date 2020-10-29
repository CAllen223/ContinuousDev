const amqp = require('amqplib/callback_api');
var x =1;
amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
      }
     connection.createChannel(function(error1, channel) {
        if (error1) {
        throw error1;
     }
        var exchange = 'node_exchange';
        var key = 'my.o';
        var message = 'MSG_'+x 
        channel.assertExchange(exchange, 'topic', {
            durable: false
          });
          channel.publish(exchange, key, Buffer.from(message));
        setTimeout(function(){
            
        },3000);
        x+=1; 
        message ='MSG_'+x
        channel.assertExchange(exchange, 'topic', {
            durable: false
          });
          channel.publish(exchange, key, Buffer.from(message));
        setTimeout(function(){
            
        },3000);
        x+=1;
        message = 'MSG_'+x;
        channel.assertExchange(exchange, 'topic', {
            durable: false
          });
          channel.publish(exchange, key, Buffer.from(message));
    });
    setTimeout(function() { 
        connection.close(); 
        process.exit(0) 
      }, 500);
});