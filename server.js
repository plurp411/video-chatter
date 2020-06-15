var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
   
function create_UUID() {
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (dt + Math.random()*16)%16 | 0;
      dt = Math.floor(dt/16);
      return (c=='x' ? r :(r&0x3|0x8)).toString(16);
  });
  return uuid;
}

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {

    const messageInfo = {
      message: 'A user connected',
      sender_id: 'server_user',
      sender_name: '',
      message_id: create_UUID()
    };

    io.emit('message_info', messageInfo);

    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
});

io.on('connection', function(socket){
    socket.on('message_info', function(messageInfo){
      io.emit('message_info', messageInfo);
    });
});

io.on('connection', function(socket){
    socket.on('video_info', function(info){
      io.emit('video_info', info);
    });
});

io.on('connection', function(socket){
  socket.on('video_url_cue', function(videoUrlCue){
    io.emit('video_url_cue', videoUrlCue);
  });
});

io.on('connection', function(socket){
  socket.on('is_typing_info', function(isTypingInfo){
    io.emit('is_typing_info', isTypingInfo);
  });
});

io.on('connection', function(socket){
  socket.on('is_buffering_info', function(isBufferingInfo){
    io.emit('is_buffering_info', isBufferingInfo);
  });
});

http.listen(port, function(){
    console.log('listening on :' + port);
});

