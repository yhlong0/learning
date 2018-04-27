var net = require('net');
var redis = require('redis');

var server = net.createServer(function(socket) {
    var subscriber;
    var publisher;

    socket.on('connect', function() {
       subscriber = redis.createClient();
       subscriber.subscribe('main_chat_room');
    });
});