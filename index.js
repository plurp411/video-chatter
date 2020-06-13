var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    io.emit('chat message', 'a user connected');
    socket.on('disconnect', () => {
      io.emit('chat message', 'a user disconnected');
    });
});

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
      io.emit('chat message', msg);
    });
});

io.on('connection', function(socket){
    socket.on('video info', function(info){
      io.emit('video info', info);
    });
});

http.listen(port, function(){
    console.log('listening on *:' + port);
});

