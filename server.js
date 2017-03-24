require('babel-register');

var pg = require('pg');

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

// api routes
// helper for db connection pooling
function queryDatabase(text, values, cb) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query(text, values, function(err, result) {
      done();
      cb(err, result);
    });
  });
}

// This endpoint that receives all evidence.
app.post('/server/chat_messages/:game_id/:player/:message', function(request, response) {
  const timestamp = Math.floor(new Date().getTime() / 1000);
  const {gameID, player, message} = request.params;
  const values = [gameID, player, message, timestamp];

  if (!process.env.DATABASE_URL) {
    console.log('No database.');
    response.status(204);
    return response.json({});
  }

  const sql = `
    INSERT INTO chat_messages(game_id, player, message, timestamp)
    VALUES ($1,$2,$3,to_timestamp($4))`;
  queryDatabase(sql, values, function(err, result) {
    if (err) {
      console.log({ error: err });
      return response.status(500);
    }
    console.log(JSON.stringify(result));
    response.status(201);
    return response.json({});  
  });
});

var gameIDs = {};

io.on('connection', function (socket) {
  // create a new game from app.js
  socket.on('newgame', function() {
    var gameID = Math.round((Math.random()*10000));
    while (gameID in gameIDs) {
      gameID = Math.round((Math.random()*10000));
    }
    gameIDs[gameID] = {"numReady":0, "players": {}, "numObservers": 0};
    socket.emit('assigngameID', gameID);
  });

  
  socket.on('joingame', function(gameID) {
    var takenRoles = null;
    var isGameID = gameID in gameIDs;
    if (isGameID) {
      takenRoles = Object.keys(gameIDs[gameID].players);
    }
    socket.emit('isgameID', isGameID, takenRoles);
  });

  // sets role from RoleSelectionMenu
  socket.on('settingrole', function(selectedRole, gameID) {
    var game = gameIDs[gameID];
    var takenRoles = Object.keys(game.players);
    var message = "";
    socket.username = "observer";
    if (selectedRole!="observer") {
      gameIDs[gameID].players[selectedRole] = {};
    } else {
      gameIDs[gameID].numObservers +=1;
      socket.username = "observer" + gameIDs[gameID].numObservers;
    }
    socket.room = gameID;
    socket.username = selectedRole;
    socket.join(socket.room);
    socket.emit('updatechat', { user: 'SERVER', text: 'You have connected to game ' + socket.room });
    socket.broadcast.to(socket.room).emit('updatechat', { user: 'SERVER', text: socket.username.charAt(0).toUpperCase() + socket.username.slice(1) + ' has connected to this game' });
    if (takenRoles.length == 0) {
      message = "You are the only player in this game";
    } else {
      var onlinePlayers = takenRoles.map((role, i) => {
        return role.charAt(0).toUpperCase() + role.slice(1);
      });
      var observers = " " + gameIDs[gameID].numObservers > 0 ? gameIDs[gameID].numObservers + " observer(s)" : "";
      var onlinePlayersString = onlinePlayers.join(", ") + (onlinePlayers.length > 0 ? ", " : "");
      message =  onlinePlayersString + observers + (onlinePlayers.length > 1 ? " have" : " has") + " connected to this game";
    }
    socket.emit('updatechat', {user: 'SERVER', text: message});
  });

  socket.on('playerReady', function(role, gameID) {
    gameIDs[gameID].numReady += 1;
    var numPlayers = 2; // hard coded for now 
    if ( gameIDs[gameID].numReady == numPlayers) {
      io.sockets.in(socket.room).emit('bothPlayersReady');
    }
  });

  // accepts answers from Quiz
  socket.on('setanswer', function(answerChoices, role, gameID) {
    var players = gameIDs[gameID].players;
    players[role]["answers"] = answerChoices;
    // once both answers are submitted
    if ((players.student.answers != null) && (players.teacher.answers !=null)) {
      io.sockets.in(socket.room).emit('grade', players);
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
