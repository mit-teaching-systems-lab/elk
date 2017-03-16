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
    var takenRoles = Object.keys(gameIDs[gameID]);
    var message = "";
    socket.username = "observer";
    if (selectedRole!="observer") {
      gameIDs[gameID][selectedRole] = null;
      socket.room = gameID;
      socket.username = selectedRole;
      socket.join(socket.room);
      socket.emit('updatechat', { user: 'SERVER', text: 'You have connected to game ' + socket.room });
      socket.broadcast.to(socket.room).emit('updatechat', { user: 'SERVER', text: socket.username.charAt(0).toUpperCase() + socket.username.slice(1) + ' has connected to this game' });
    }
    if (takenRoles.length == 0) {
      message = "You are the only player in this game";
    } else {
      message = takenRoles[0].charAt(0).toUpperCase() + takenRoles[0].slice(1) + " has connected to this game";
    }
    socket.emit('updatechat', {user: 'SERVER', text: message});
  });

  // accepts answers from Quiz
  socket.on('setanswer', function(answerChoices, role, gameID) {
    var game = gameIDs[gameID];
    game[role] = answerChoices;
    // once both answers are submitted
    if ((game.student != null) && (game.teacher !=null)) {
      io.sockets.in(socket.room).emit('grade', game);
    }
  }); 

  // when the client emits 'sendchat', this listens and executes
  socket.on('sendchat', function (data) {
    // we tell the client to execute 'updatechat' with 2 parameters
    io.sockets.in(socket.room).emit('updatechat', data);
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', function(){
    // echo globally that this client has left
    if (socket.username) {
      socket.broadcast.to(socket.room).emit('updatechat', {user: "SERVER", text: socket.username.charAt(0).toUpperCase() + socket.username.slice(1) + ' has disconnected'});
      socket.leave(socket.room);
    }
  });
});
