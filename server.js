// var app = require('express')();
var express = require('express');
var app = express();


var http = require('http').Server(app);
// var io = require('socket.io')(http);

var io = require('socket.io').listen(http, {
  pingTimeout: 5000,
  pingInterval: 10000
});

var port = process.env.PORT || 3000;
var ip = require('ip');
var url = require('url');
const {machineId} = require('node-machine-id');
app.engine('html', require('ejs').renderFile);


// var express = express();
app.use(express.static(__dirname + '/public'));
// app.use('/', index);
// app.use('/users', users);
// app.use('/firstpage', firstpage);
// app.use(express.static('routes');


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

function encrypt(ipAddress) {
  ipAddress = ipAddress.replace(/0/g, 'd');
  ipAddress = ipAddress.replace(/1/g, 'w');
  ipAddress = ipAddress.replace(/2/g, 'ee');
  ipAddress = ipAddress.replace(/3/g, 'rt');
  ipAddress = ipAddress.replace(/4/g, 'jhj');
  ipAddress = ipAddress.replace(/5/g, 'nnb');
  ipAddress = ipAddress.replace(/6/g, 'kmi');
  ipAddress = ipAddress.replace(/7/g, 'po');
  ipAddress = ipAddress.replace(/8/g, 'z');
  ipAddress = ipAddress.replace(/9/g, 'aa');
  ipAddress = ipAddress.replace(/\./g, 'l');
  return ipAddress;
}

app.get('/', function(req, res, next){

  if (req.url == '/') {
    
    let httpText = "https://";
    if (port == 3000) {
      httpText = "http://";
    }

    // machineId().then((gotId) => {
    //   res.writeHead(301, { "Location": httpText + req.headers['host'] + '/?id=' + gotId });
    //   return res.end();
    // });

    const ipAddress = ip.address();
    const encryptedIp = encrypt(ipAddress);
    res.writeHead(301, { "Location": httpText + req.headers['host'] + '/?id=' + encryptedIp });
    return res.end();

  } else {

    let passedData = url.parse(req.url,true).query;
    ROOM_ID = passedData.id;

    // machineId().then((gotId) => {
    //   passedData['machine_id'] = gotId;
    //   res.render(__dirname + '/index.html', passedData);
    // });

    const ipAddress = ip.address();
    const encryptedIp = encrypt(ipAddress);
    passedData['machine_id'] = encryptedIp;
    // passedData['machine_id'] = create_UUID();
    res.render(__dirname + '/index2.html', passedData);
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

    socket.broadcast.to(ROOM_ID).emit('message_info', messageInfo);

    socket.on('disconnect', () => {

      console.log('A user disconnected');

      const messageInfo = {
        message: 'A user disconnected',
        sender_id: '',
        sender_name: '',
        message_id: create_UUID(),
        message_type: 'server_user_disconnect'
      };
      socket.broadcast.to(ROOM_ID).emit('message_info', messageInfo);
      
      const isBufferingInfo = {
        is_buffering_name: 'server_clear_is_buffering',
        is_buffering: false
      };
      socket.broadcast.to(ROOM_ID).emit('is_buffering_info', isBufferingInfo);

      const isTypingInfo = {
        is_typing_name: 'server_clear_is_typing',
        is_typing: false
      };
      socket.broadcast.to(ROOM_ID).emit('is_typing_info', isTypingInfo);
    });
});

io.on('connection', function(socket){
  socket.join(ROOM_ID);
  socket.on('message_info', function(messageInfo){
    socket.broadcast.to(ROOM_ID).emit('message_info', messageInfo);
  });
});

io.on('connection', function(socket){
  socket.join(ROOM_ID);
  socket.on('video_info', function(info){
    socket.broadcast.to(ROOM_ID).emit('video_info', info);
  });
});

io.on('connection', function(socket){
  socket.join(ROOM_ID);
  socket.on('video_url_queue', function(videoUrlQueue){
    socket.broadcast.to(ROOM_ID).emit('video_url_queue', videoUrlQueue);
  });
});

io.on('connection', function(socket){
  socket.join(ROOM_ID);
  socket.on('is_typing_info', function(isTypingInfo){
    socket.broadcast.to(ROOM_ID).emit('is_typing_info', isTypingInfo);
  });
});

io.on('connection', function(socket){
  socket.join(ROOM_ID);
  socket.on('is_buffering_info', function(isBufferingInfo){
    socket.broadcast.to(ROOM_ID).emit('is_buffering_info', isBufferingInfo);
  });
});

io.on('connection', function(socket){
  socket.join(ROOM_ID);
  socket.on('sender_name_change_info', function(senderNameChangeInfo){
    socket.broadcast.to(ROOM_ID).emit('sender_name_change_info', senderNameChangeInfo);
  });
});

http.listen(port, function(){
  console.log('Listening on :' + port);
});

