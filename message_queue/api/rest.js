const express = require('express');
const  app =express();
const http = require('http');
var amqp = require('amqplib/callback_api');
var exchange = "api";
var key ="my.a";
//container and port
amqp.connect('amqp://guest:guest@rabbitmqs:5672', function(error0, connection) {
    if (error0) {
        throw error0;

      }
     connection.createChannel(function(error1, channel) {
        if (error1) {

           throw error1;

     }
    });
});
channel.assertExchange(exchange, 'topic', {
    durable: true//is the exchange deleted after?
  });
app.get("/messges",(req,res)=>{
    let requestOptions = {
        hostname: 'server',
        port: 8002,
        path: '/',
        method: 'GET'
    };

    http.get(requestOptions,(res)=>{
        res.on('data', d => {
            process.stdout.write(d);
            console.log(d);
            serv2 = d;
            
        })
    });

        res.send(serv2);
} );
app.put("/state:status",(req,res)=>{
    let status = req.query.status
    var message = status;
    channel.publish(exchange, key,Buffer.from(message));

})
app.listen(8081,function(){console.log("api service is running")});