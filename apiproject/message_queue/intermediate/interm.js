var amqp = require('amqplib/callback_api');
var temp = null;
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
    var key2 = "my.i"
    channel.assertExchange(exchange, 'topic', {
      durable: true
    });

    channel.assertQueue('node_queue', {
      exclusive: false
    }, function(error2, q) {

      if (error2) {
        throw error2;
      }//lets us know that it's running
      console.log('HERE');


        channel.bindQueue(q.queue, exchange, key);


      channel.consume(q.queue, function(msg) {
        //console.log(" [x] %s:'%s'", msg.fields.routingKey, msg.content.toString());
        temp = msg.content.toString();
        if(temp == "SHUTDOWN"){
          setTimeout(function() {
            connection.close();
            process.exit(0)
          }, 5000);
        }
        else if(temp!=null){//only publish to the channel when we have a new message from the queue
        channel.publish(exchange,key2,Buffer.from("Got"+temp.toString()));
       // console.log("published message");
        temp = null;
        }
      }, 
      
      {
        noAck: true
      });
    });
  });
});
