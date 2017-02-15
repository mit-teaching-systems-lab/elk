import React from 'react';
import MenuBar from '../MenuBar';
import ChatApp from '../ChatApp';
import Profile from '../Profile';
import Quiz from '../Quiz';
import Notepad from '../Notepad';

import io from 'socket.io-client';
let socket = io.connect('https://tsl-elk.herokuapp.com');

 
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {at_capacity: false, role: null, round_over: false};
    socket.on('connect', () => this._connect());
    socket.on('init', (username) =>this._initialize(username));
    socket.on('getroom', () => this._get_room());
    socket.on('adduser', (user_role) => this._add_user(user_role));
    socket.on('fullhouse', () => this._full_house());
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
    this.setState({at_capacity: true});
  }

  round_over() {
    console.log("calling round over");
    this.setState({round_over: true});
  }

//             <MenuBar round_over={this.round_over} style={{position:'fixed', top:0,left:0,right:0}}/>
  render() {
      if (this.state.at_capacity) {
        return (
          <h1>Full room</h1>
        )
      } else {
        return (
          <div >

            <div style={{display:'flex', flexDirection:'row', flex:1}}>
              <ChatApp socket={socket} user={this.state.user}/>
              <Profile role={this.state.role} profile_data={this.props.route.bundle[this.state.role]} />
              <Quiz questions={this.props.route.bundle.questions}/>
            </div>
          </div>
    );
    }
  }
}

export default Game;