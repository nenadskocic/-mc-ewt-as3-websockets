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
    })      
});

http.listen(3000, function() {
    console.log("listening on *:3000");
});