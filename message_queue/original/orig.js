var amqp = require('amqplib/callback_api');

//container and port
amqp.connect('amqp://guest:guest@rabbitmqs:5672', function(error0, connection) {
    if (error0) {
        throw error0;

      }
     connection.createChannel(function(error1, channel) {
        if (error1) {

           throw error1;

     }
        var exchange = "node_exchange";
        var key = 'my.o'; //key so that only certain queues receive the topic
        var message = "MSG_"
        channel.assertExchange(exchange, 'topic', {
      durable: true//is the exchange deleted after?
    });
    for(int i=1;i<=3;i++){
    channel.publish(exchange, key,Buffer.from(message)+i);
    console.log(" [x] Sent %s:'%s'", key, message);
    setTimeout(function(){},3000);//send message three times with 3 second interval
    }
   
  
    setTimeout(function() {
        connection.close();
        process.exit(0)
      }, 5000);
});
