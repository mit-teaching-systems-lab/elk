require('babel-register');

var path = require('path');
var express = require('express');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
var app = express();
 
var compiler = webpack(webpackConfig);
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);
 
app.use(express.static(__dirname + '/app'));

app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  publicPath: '/',
  stats: {
    colors: true,
  },
  historyApiFallback: true,
}));

app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});


var port = process.env.NODE_ENV == "production" ? process.env.PORT : '3333';
server.listen(port);

// usernames which are currently connected to the chat
var usernames = {};
var data = {};
var gameIDs = new Set();

io.on('connection', function (socket) {
  // create a new game from app.js
  socket.on('newgame', function() {
    var gameID = Math.round((Math.random()*10000));
    while (gameID in gameIDs) {
      gameID = Math.round((Math.random()*10000));
    }
    gameIDs.add(gameID);
    socket.emit('assigngameID', gameID);
  });

  socket.on('joingame', function(gameID) {
    socket.emit('isgameID', gameIDs.has(parseInt(gameID)));
  });

  socket.on('setroom', function(roomID) {
    socket.room = "room" + roomID;
    if (roomID in data) { // room has been entered before 
      if (data[roomID]["atCapacity"]) {
        socket.emit('fullhouse');
      } else {
        data[roomID]["student"] = socket.username;
        data[roomID]["atCapacity"] = true;
        socket.emit('adduser','student'); // student + teacher are currently undefined 
      }
    } else {
      data[roomID] = {"atCapacity": false, "teacher": socket.username};
      socket.emit('adduser', 'teacher');
    }
  });

  // when the client emits 'adduser', this listens and executes
  socket.on('adduser', function(username){
    // store the username in the socket session for this client
    socket.username = username;
    // store the room name in the socket session for this client
    // add the client's username to the global list
    usernames[username] = username;
    // send client to room 1
    socket.join(socket.room);
    socket.emit('updatechat', { user: 'SERVER', text: 'you have connected to ' + socket.room });
    socket.broadcast.to(socket.room).emit('updatechat', { user: 'SERVER', text: username + ' has connected to this room' });
    socket.emit('init', socket.username);
  });


  // when the client emits 'sendchat', this listens and executes
  socket.on('sendchat', function (data) {
    // we tell the client to execute 'updatechat' with 2 parameters
    io.sockets.in(socket.room).emit('updatechat', data);
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', function(){
    // remove the username from global usernames list
    delete usernames[socket.username];
    // echo globally that this client has left
    socket.broadcast.to(socket.room).emit('updatechat', {user: "SERVER", text: socket.username + ' has disconnected'});
    socket.leave(socket.room);
  });
});
