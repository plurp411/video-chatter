var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var url = require('url');
const {machineId} = require('node-machine-id');
app.engine('html', require('ejs').renderFile);

let ROOM_ID = '';

function create_UUID() {
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (dt + Math.random()*16)%16 | 0;
      dt = Math.floor(dt/16);
      return (c=='x' ? r :(r&0x3|0x8)).toString(16);
  });
  return uuid;
}

app.get('/', function(req, res, next){

  if (req.url == '/') {
    
    let httpText = "https://";
    if (port == 3000) {
      httpText = "http://";
    }

    machineId().then((gotId) => {
      res.writeHead(301, { "Location": httpText + req.headers['host'] + '/?id=' + gotId });
      return res.end();
    });

  } else {

    let passedData = url.parse(req.url,true).query;
    ROOM_ID = passedData.id;

    machineId().then((gotId) => {
      passedData['machine_id'] = gotId;
      res.render(__dirname + '/index.html', passedData);
    });
  }
});

io.on('connection', (socket) => {
  socket.join(ROOM_ID);

    const messageInfo = {
      message: 'A user connected',
      sender_id: '',
      sender_name: '',
      message_id: create_UUID(),
      message_type: 'server_user_connect'
    };

    io.to(ROOM_ID).emit('message_info', messageInfo);

    socket.on('disconnect', () => {
      console.log('A user disconnected');

      const messageInfo = {
        message: 'A user disconnected',
        sender_id: '',
        sender_name: '',
        message_id: create_UUID(),
        message_type: 'server_user_disconnect'
      };
  
      io.to(ROOM_ID).emit('message_info', messageInfo);
    });
});

io.on('connection', function(socket){
  socket.join(ROOM_ID);
  socket.on('message_info', function(messageInfo){
    io.to(ROOM_ID).emit('message_info', messageInfo);
  });
});

io.on('connection', function(socket){
  socket.join(ROOM_ID);
  socket.on('video_info', function(info){
    io.to(ROOM_ID).emit('video_info', info);
  });
});

io.on('connection', function(socket){
  socket.join(ROOM_ID);
  socket.on('video_url_cue', function(videoUrlCue){
    io.to(ROOM_ID).emit('video_url_cue', videoUrlCue);
  });
});

io.on('connection', function(socket){
  socket.join(ROOM_ID);
  socket.on('is_typing_info', function(isTypingInfo){
    io.to(ROOM_ID).emit('is_typing_info', isTypingInfo);
  });
});

io.on('connection', function(socket){
  socket.join(ROOM_ID);
  socket.on('is_buffering_info', function(isBufferingInfo){
    io.to(ROOM_ID).emit('is_buffering_info', isBufferingInfo);
  });
});

io.on('connection', function(socket){
  socket.join(ROOM_ID);
  socket.on('sender_name_change_info', function(senderNameChangeInfo){
    io.to(ROOM_ID).emit('sender_name_change_info', senderNameChangeInfo);
  });
});

http.listen(port, function(){
  console.log('Listening on :' + port);
});

