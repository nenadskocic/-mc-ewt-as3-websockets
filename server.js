/*
    "StAuth10222: I Nenad Skocic, 000107650 certify that this material is my original work. No other person's work has been used 
    without due acknowledgement. I have not made my work available to anyone else."
*/
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

    let biddersBidsArr = [];
    let counter = 0;

    socket.on('bidderRegister', function(data) {
        console.log("Bidder: " + data.bidderName + " has registered.");

        io.emit("bidderRegister", "Auction has participants");
    });

    socket.on('auctionContent', function(data) {
        console.log("Auction has started!", data);

        io.emit('auctionContent', data)
        var timer = data.time;
        
        var timeout = setInterval(() => {
            io.emit('timer', timer);
            timer--;

            if(timer === 0) {
                io.emit('timer', "Auction is over");
                clearInterval(timeout);
            } else {
            }
        }, 1000);
    });

    socket.on('bidderBid', function(data) {
        counter++;
        biddersBidsArr.push({ bidderID: data.bidderID, bidderName: data.bidderName, bidderPrice: data.bidderPrice, counter: counter });
        io.emit("bidderBid", biddersBidsArr );
    });

    socket.on('disconnect', function() {
        biddersBidsArr = [];
    });
});

http.listen(3000, function() {
    console.log("listening on *:3000");
});
