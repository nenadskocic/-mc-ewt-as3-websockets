const { clearTimeout } = require('timers');
const { setTimeout } = require('timers/promises');

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/auctioneer', function(req,res){
    res.sendFile(__dirname + '/auctioneer.html');
});

app.get('/bidder', function(req,res){
    res.sendFile(__dirname + '/bidder.html');
});

io.on('connection', function(socket) {
    socket.on('auctionContent', function(data) {
        console.log("Auction has started!", data);

        var timer = data.time;
        
        var timeout = setInterval(() => {
            socket.emit('timer', timer);
            timer--;

            if(timer === 0) {
                socket.emit('timer', "Auction is over");
                clearInterval(timeout);
            }
        }, 1000);
    })      
});

http.listen(3000, function() {
    console.log("listening on *:3000");
});