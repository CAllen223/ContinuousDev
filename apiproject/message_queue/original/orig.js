var amqp = require('amqplib/callback_api');
var exchange = "node_exchange";
var queue = "myqueue";
var key = 'my.o'; //key so that only certain queues receive the topic

var message = "MSG_"

var state ;
var prev = ""
//container and port
amqp.connect('amqp://guest:guest@rabbitmqs:5672', function(error0, connection) {
    if (error0) {
        throw error0;

      }
     connection.createChannel(function(error1, channel1) {
        if (error1) {

           throw error1;

     }
     
        
      
  connection.createChannel(function(error1, channel) {
        if (error1) {

           throw error1;

     }
     
     
      channel.assertExchange(exchange, 'topic', {
      durable: true//is the exchange deleted after?
    });    
channel1.assertQueue(queue, {
     durable:true
    });
channel.assertQueue('node_queue', {
  exclusive: false
}, function(error2, q) {

  if (error2) {
    throw error2;
  }//lets us know that it's running
  console.log('HERE');

    
    channel.bindQueue(q.queue, exchange, key);


  channel1.consume(queue, function(msg) {
    console.log(msg)
    state = msg
    if(state != "INIT" || "RUNNING" || "PAUSED" ||"SHUTDOWN"){
      state = "PAUSED"
      console.log("error, not a recognised state. Pausing")
    }
    if(state = "SHUTDOWN"){
      channel.publish(exchange, key,Buffer.from(state));
      setTimeout(function() {
        connection.close();
        process.exit(0)
      }, 5000);
    }
        while(state != "PAUSED"){
          channel.publish(exchange, key,Buffer.from(message));
          console.log(" [x] Sent %s:'%s'", key, message);
          setTimeout(function(){},3000);
        }
        
    })
  
  
  
  
    /*setTimeout(function() {
        connection.close();
        process.exit(0)
      }, 5000);*/
  });
  })
  })
 });

