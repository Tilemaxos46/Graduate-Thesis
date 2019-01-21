// http://expressjs.com/
'use strict';

var express = require("express");
var http = require("http");
var app = express();
var httpServer = http.Server(app);
var io = require('socket.io')(httpServer);
var cors = require('cors');
app.use(cors());

// Start http server.
httpServer.listen(3000, function () {

});

// On connection event.
io.on('connection', function (socket) {
    //message on
    // Join event.
    socket.on('message', function (data) {
      io.sockets.emit("message", {name: data.name, message: data.message});
    });
});
