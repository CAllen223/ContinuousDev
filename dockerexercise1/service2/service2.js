const express = require('express');
const  app =express();
const http = require('http')
app.get("/", (req, res) => {
    console.log("message received"); 
    res.send('Hello from' + req.connection.remoteAddress + req.client.remotePort + 'to' + req.connection.localAddress + req.client.localPort)
    //response to service 1
})
app.listen(8002, function () {
    console.log("server is running!"); //did the server start OK?
});