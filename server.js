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

var gameIDs = {};

io.on('connection', function (socket) {
  // create a new game from app.js
  socket.on('newgame', function() {
    var gameID = Math.round((Math.random()*10000));
    while (gameID in gameIDs) {
      gameID = Math.round((Math.random()*10000));
    }
    gameIDs[gameID] = {};
    socket.emit('assigngameID', gameID);
  });

  var takenRoles = null;
  socket.on('joingame', function(gameID) {
    var isGameID = gameID in gameIDs;
    if (isGameID) {
      takenRoles = Object.keys(gameIDs[gameID]);
    }
    socket.emit('isgameID', isGameID, takenRoles);
  });

  // sets role from RoleSelectionMenu
  socket.on('settingrole', function(selectedRole, gameID) {
    if (selectedRole!="observer") {
      gameIDs[gameID][selectedRole] = null;
      socket.room = gameID;
      socket.username = selectedRole;
      socket.join(socket.room);
      socket.emit('updatechat', { user: 'SERVER', text: 'you have connected to game ' + socket.room });
      socket.broadcast.to(socket.room).emit('updatechat', { user: 'SERVER', text: socket.username + ' has connected to this room' });
    }
  });

  // accepts answers from Quiz
  socket.on('submitanswer', function(answerChoices, role, gameID) {
    gameIDs[gameID][role] = answerChoices;
  }); 

  // when the client emits 'sendchat', this listens and executes
  socket.on('sendchat', function (data) {
    // we tell the client to execute 'updatechat' with 2 parameters
    io.sockets.in(socket.room).emit('updatechat', data);
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', function(){
    // echo globally that this client has left
    socket.broadcast.to(socket.room).emit('updatechat', {user: "SERVER", text: socket.username + ' has disconnected'});
    socket.leave(socket.room);
  });
});
