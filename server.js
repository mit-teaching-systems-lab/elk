require('babel-register');

var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');
var routes = require('./app/routes');
var path = require('path')
var express = require('express');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
var app = express();
 
var compiler = webpack(webpackConfig);
var http = require('http')
var server = http.createServer(app)
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
  response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

server.listen(3333);


// // routing
// app.get('*', function (req, res) {
//   res.sendFile(__dirname + '/index.html');
// });

// Routing tutorial
// app.use(function(req, res) {
//   console.log("in rerouting");
//   console.log("requrl", req.url);
//   // console.log("res", res);
//   Router.match({ routes: routes.default, location: req.url }, function(err, redirectLocation, renderProps) {
//     console.log("redirectlocation", redirectLocation);
//     // console.log("renderProps", renderProps);
//     if (err) {
//       res.status(500).send(err.message)
//     } else if (redirectLocation) {
//       res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
//     } else if (renderProps) {
//       var html = ReactDOM.renderToString(React.createElement(Router.RoutingContext, renderProps));
//       res.status(200).send(page);
//     } else {
//       res.status(404).send('Page Not Found')
//     }
//   });
// });
 

// module.export = app;


// // TUTORIAL 2
// //This route is simply run only on first launch just to generate some chat history
// app.post('/setup', function(req, res) {

// //Array of chat data. Each object properties must match the schema object properties
//   var chatData = [{
//     created: new Date(),
//     content: 'Hi',
//     username: 'Chris',
//     room: 'php'
//   }, {
//     created: new Date(),
//     content: 'Hello',
//     username: 'Obinna',
//     room: 'laravel'
//   }, {
//     created: new Date(),
//     content: 'Ait',
//     username: 'Bill',
//     room: 'angular'
//   }, {
//     created: new Date(),
//     content: 'Amazing room',
//     username: 'Patience',
//     room: 'socet.io'
//   }];

//   //Loop through each of the chat data and insert into the database
//   for (var c = 0; c < chatData.length; c++) {
//     //Create an instance of the chat model
//     var newChat = new Chat(chatData[c]);
//     //Call save to insert the chat
//     newChat.save(function(err, savedChat) {
//       console.log(savedChat);
//     });
//   }
//   //Send a resoponse so the serve would not get stuck
//   res.send('created');
// });

// //This route produces a list of chat as filterd by 'room' query
// app.get('/msg', function(req, res) {
//   //Find
//   Chat.find({
//     'room': req.query.room.toLowerCase()
//   }).exec(function(err, msgs) {
//     //Send
//     res.json(msgs);
//   });
// });


/*\
OUR APPLICATION NEEDS TO (TUTORIAL 2)
Know when our application is launched
Send all the available rooms on connection
Listen for a user to connect and assign him/her to a default room
Listen for when he/she switches room
And, finally, listen for a new message and only send the message to those in the room at which it was created
*/

// usernames which are currently connected to the chat
var usernames = {};
var student = {}
var data = {}


io.sockets.on('connection', function (socket) {

  socket.on('setroom', function(roomID) {
    console.log("setting room here");
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
      data[roomID] = {"atCapacity": false, "teacher": socket.username}
      socket.emit('adduser', 'teacher');
    }
    console.log(data[roomID]);
  });
  // rooms which are currently available in chat
  // var rooms = ['room1','room2','room3'];
  // when the client emits 'adduser', this listens and executes
  socket.on('adduser', function(username){
    console.log("adding user");
    // store the username in the socket session for this client
    socket.username = username;
    // socket.emit('getroomID');
    // store the room name in the socket session for this client
    // add the client's username to the global list
    usernames[username] = username;
    // send client to room 1
    socket.join(socket.room);
    // echo to client they've connected
    // socket.emit('updatechat', 'SERVER', 'you have connected to room1');
    socket.emit('updatechat', { user: 'SERVER', text: 'you have connected to ' + socket.room });
    // echo to room 1 that a person has connected to their room
    // socket.broadcast.to('room1').emit('updatechat', 'SERVER', username + ' has connected to this room');
    socket.broadcast.to(socket.room).emit('updatechat', { user: 'SERVER', text: username + ' has connected to this room' });
    
    // socket.emit('updaterooms', rooms, 'room1');
    console.log("init update username", socket.username)
    socket.emit('init', socket.username)
    console.log(usernames)
    
  });

  
  // TUTORIAL 1 
  // when the client emits 'sendchat', this listens and executes
  socket.on('sendchat', function (data) {
    // we tell the client to execute 'updatechat' with 2 parameters
    console.log("send chat");
    console.log("user", socket.username);
    console.log(data);
    io.sockets.in(socket.room).emit('updatechat', data);
    // io.sockets.in(socket.room).emit('updatechat', data)
  });
  
/////////////////// CODE FOR UNDERSTANDING HOW DATABASES WORK ////////////////////////////////////

  // //Listens for a new chat message
 //  socket.on('new message', function(data) {
 //    //Create message
 //    var newMsg = new Chat({
 //      username: data.username,
 //      content: data.message,
 //      room: data.room.toLowerCase(),
 //      created: new Date()
 //    });
 //    //Save it to database
 //    newMsg.save(function(err, msg){
 //      //Send message to those ƒofed in the room
 //      io.in(msg.room).emit('message created', msg);
 //    });
 //  });



/////////////////// CODE FOR UNDERSTANDING HOW DIFFERENT ROOMS WORKS ///////////////////////////

  // socket.on('switchRoom', function(newroom){
  //  socket.leave(socket.room);
  //  socket.join(newroom);
  //  socket.emit('updatechat', 'SERVER', 'you have connected to '+ newroom);
  //  // sent message to OLD room
  //  socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', socket.username+' has left this room');
  //  // update socket session room title
  //  socket.room = newroom;
  //  socket.broadcast.to(newroom).emit('updatechat', 'SERVER', socket.username+' has joined this room');
  //  socket.emit('updaterooms', rooms, newroom);
  // });

  // when the user disconnects.. perform this
  socket.on('disconnect', function(){
    console.log("disconnected")
    // remove the username from global usernames list
    delete usernames[socket.username];
    // echo globally that this client has left
    socket.broadcast.to(socket.room).emit('updatechat', {user: "SERVER", text: socket.username + ' has disconnected'});
    socket.leave(socket.room);
  });
});
