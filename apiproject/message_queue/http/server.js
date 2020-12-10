const express = require('express');
const  app =express();
const http = require('http')

const fs = require('fs');
app.get("/",(req, res)=>{fs.readFile('/var/lib/observer/results.txt', 'utf8', function(err, data) {
    if (err) throw err;
    console.log('OK: ');
    res.send(data);
  });});
 /* app.post("/messages",(req, res)=>{fs.readFile('/var/lib/observer/results.txt', 'utf8', function(err, data) {
    if (err) throw err;
    console.log('OK: ');
    res.send(data);
  });});*/

app.listen(8082, function () {
    console.log("server is running!");
});
