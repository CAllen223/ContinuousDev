var amqp = require('amqplib/callback_api');
var exchange = "node_exchange";
var exchange2 = "api exchange";
var key = 'my.o'; //key so that only certain queues receive the topic
var key2 = 'my.a'
var message = "MSG_"
var state;
//container and port
amqp.connect('amqp://guest:guest@rabbitmqs:5672', function(error0, connection) {
    if (error0) {
        throw error0;

      }
     connection.createChannel(function(error1, channel) {
        if (error1) {

           throw error1;

     }
        
        channel.assertExchange(exchange, 'topic', {
      durable: true//is the exchange deleted after?
    });
  });
});
channel.assertQueue('node_queue', {
  exclusive: false
}, function(error2, q) {

  if (error2) {
    throw error2;
  }//lets us know that it's running
  console.log('HERE');


    channel.bindQueue(q.queue, exchange2, key);


  channel.consume(q.queue, function(msg) {
    for(var i=1;i<=3 ; i++){
    channel.publish(exchange, key,Buffer.from(message)+i);
    console.log(" [x] Sent %s:'%s'", key, message);
    setTimeout(function(){},3000);//send message three times with 3 second interval
    }
  });
  
    /*setTimeout(function() {
        connection.close();
        process.exit(0)
      }, 5000);*/
    });
