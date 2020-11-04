var amqp = require('amqplib/callback_api');
const fs = require('fs');
var d = new Date();
amqp.connect('amqp://guest:guest@rabbitmqs:5672', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    var exchange = "node_exchange";
    var key = "my.*"//thanks to the asterisk we can recieve messages from both topic exchanges 
    channel.assertExchange(exchange, 'topic', {
      durable: true
    });//is the service listening?
    console.log("HERE")
	//randomly generated name by rabbitmq taken by earlier version
    channel.assertQueue('gen-hJLWu-Lb_7ecK5V_JpPvNA', {
      exclusive: false
      // try to flip
    }, function(error2, q) {

      if (error2) {
        throw error2;
      }
      //kill command if process takes too long
      console.log(' [*] Waiting for logs. To exit press CTRL+C');

      channel.bindQueue(q.queue, exchange, key);


      channel.consume(q.queue, function(msg) {
        console.log(" [x] %s:'%s'", msg.fields.routingKey, msg.content.toString()); //write to our docker volume
         fs.writeFile('/var/lib/observer/results.txt', (d.getFullYear()+d.getMonth()+d.getDate()+"T"+d.getHours()+d.getMinutes()+d.getSeconds()+"topic"+d.getMiliseconds+dmsg.content.toString()), function (err) {
 		 if (err) return console.log(err);
 		 console.log('msg> results.txt');
});
      }, {
        noAck: true
      });
    });
  });
});
