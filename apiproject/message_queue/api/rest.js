const express = require('express');
const  app = express();
app.use(express.text())
const http = require('http');
const fs = require('fs');
var amqp = require('amqp');

var state = "initial";
var d = new Date();
//container and port

var connection = amqp.createConnection({url:"amqp://guest:guest@rabbitmqs:5672"},{defaultExchangeName: ''});
connection.on('ready', function() {
  console.log('connected');
});

/*chann.assertExchange(exchange, 'topic', {
    durable: true//is the exchange deleted after?
  */
app.get("/messages",(req,res)=>{
    let requestOptions = {
        hostname: 'server',
        port: 8082,
        path: '/messages',
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
app.put("/state",(req,res)=>{

    let payload = req.query.payload
    connection.queue("myqueue", {durable:true}, function(q){
    connection.publish("myqueue",req.query.payload);
   });
    fs.writeFile('/var/lib/run-log/log.txt', (d.getFullYear()+d.getMonth()+d.getDate()+"T"+d.getHours()+d.getMinutes()+d.getSeconds()+d.getMilliseconds()+req.query.payload), function (err) {
        if (err) return console.log(err);
    })  
    
    res.send(200);
 })
app.get("/state",(req,res)=>{
    
    res.send(state)
})
app.get("/run-log",(req,res)=>{fs.readFile('/var/lib/run-log/log.txt', 'utf8', function(err, data) {
    if (err) throw err;
    console.log('OK: ');
    res.send(data);
  });});

app.listen(8081,function(){console.log("api service is running")});

