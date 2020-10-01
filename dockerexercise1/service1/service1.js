const express = require('express');
const  app =express(); //creates a simple web server 
const http = require('http');
let serv2;

app.get("/", (req, res) => {
    console.log("message received");
    let requestOptions = {
        hostname: 'service2',
        port: 8002,
        path: '/',
        method: 'GET'
    }; //defines everything we need to contact service 2

    http.get(requestOptions,(res)=>{
        res.on('data', d => {
            console.log(d);
            serv2 = d;
            //store the response we received from service 2 
        })
    });

        res.send('Hello from' + req.connection.remoteAddress + req.client.remotePort + 'to' + req.connection.localAddress + req.client.localPort+ serv2);


});

app.listen(8001, function () {
    console.log("server is running!");
});