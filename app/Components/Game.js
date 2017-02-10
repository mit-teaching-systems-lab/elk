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
    this.state = {at_capacity: false, role: null}
    socket.on('connect', () => this._connect());
    socket.on('init', (username) =>this._initialize(username));
    socket.on('getroom', () => this._get_room());
    socket.on('adduser', (user_role) => this._add_user(user_role));
    socket.on('fullhouse', () => this._full_house());
    this.render_profile = this.render_profile.bind(this);
  }

  _connect() {
    socket.emit('setroom', this.props.params.gameID);
  }

  _initialize(username) {
    this.setState({user: username})
  }

  _add_user(user_role) {
    this.setState({role: user_role});
    console.log("user role: " + user_role);
    socket.emit('adduser', prompt("What's your name?"));
  }
 
  _get_room() {
    socket.emit('setroom', this.props.params.gameID);
   }

  _full_house() {
    this.setState({at_capacity: true})
  }

  render() {
      if (this.state.at_capacity) {
        return (
          <h1>Full room</h1>
        )
      } else {
        return (
          <div>
            <MenuBar />
            <ChatApp socket={socket} user={this.state.user}/>
            <Profile role={this.state.role} profile_data={this.props.route.bundle[this.state.role]} />
          </div>
    );
    }
  }
}

export default Game;