import React from 'react';
import MenuBar from './MenuBar';
import ChatApp from './ChatApp';
import Profile from './Profile';
import Quiz from './Quiz'
import Notepad from './Notepad'

import io from 'socket.io-client'
let socket = io.connect('http://localhost:3333')
 
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {at_capacity: false, role: null, messages: []}

    // sockets
    socket.on('connect', () => this._connect());
    socket.on('init', (username) =>this._initialize(username));
    socket.on('getroom', () => this._getRoom());
    socket.on('adduser', (user_role) => this._addUser(user_role));
    socket.on('fullhouse', () => this.full_house());

    socket.on('updatechat', (data) => this._messageRecieve(data));
  }

  _connect() {
    socket.emit('setroom', this.props.params.gameID);
  }

  _initialize(username) {
    this.setState({user: username})
  }

  _addUser(user_role) {
    console.log("adding user");
    this.setState({role: user_role});
    console.log(this.state.role);
    socket.emit('adduser', prompt("What's your name?"));
  }
 
  _getRoom() {
    socket.emit('setroom', this.props.params.gameID);
    console.log("sent room")
   }

  full_house() {
    this.setState({at_capacity: true})
  }

  _messageRecieve(message) {
    // console.log("_messageRecieve")
    // console.log(this.state)
    var {messages} = this.state;
    messages.push(message);
    this.setState({messages});
  }

  handleMessageSubmit(message) {
    socket.emit('sendchat', message);
  }

  render() {
      if (this.state.at_capacity) {
        console.log("at capacity here!")
        return (
          <h1>Full room</h1>
        )
      } else {
      // console.log(this.props.params.gameID);
        return (
        <div>
          <MenuBar />
          <ChatApp onMessageSubmit={this.handleMessageSubmit} user={this.state.user} messages={this.state.messages} chatID={this.props.params.gameID}/>
        </div>
    );
    }
  }
}

export default Game;