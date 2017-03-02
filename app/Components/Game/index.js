import React from 'react';
import ChatApp from '../ChatApp';
import Profile from '../Profile';
import Quiz from '../Quiz';

import io from 'socket.io-client';
let socket = io.connect('');
 
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {at_capacity: false, role: null, round_over: false, is_active_game: false};
    socket.on('connect', () => this._connect());
    socket.on('init', (username) =>this._initialize(username));
    socket.on('getroom', () => this._get_room());
    socket.on('adduser', (user_role) => this._add_user(user_role));
    socket.on('fullhouse', () => this._full_house());
    socket.on('isgameID', (flag) => this._is_game_ID(flag));
  }

  componentDidMount() {
    // socket.emit('setroom', this.props.params.gameID);
    socket.emit('joingame', this.props.params.gameID);
  }

  _connect() {
    socket.emit('setroom', this.props.params.gameID);
  }

  _initialize(username) {
    this.setState({user: username});
  }

  _is_game_ID(flag) {
    this.setState({is_active_game: flag});
    if (flag) {
      this._connect();
    }
  }

  _add_user(user_role) {
    this.setState({role: user_role});
    socket.emit('adduser', prompt("What's your name?"));
  }
 
  _get_room() {
    socket.emit('setroom', this.props.params.gameID);
  }

  _full_house() {
    this.setState({at_capacity: true});
  }

  round_over() {
    this.setState({round_over: true});
  }

  render() {
    var gameID = this.props.params.gameID;
    console.log("game ID extracted from URL: " + gameID);
    console.log("gameID type: " + typeof gameID);
    if (!this.state.is_active_game) {
      return (
        <h1> This page does not exit </h1>
      );
    }
    if (this.state.at_capacity) {
      return (
          <h1>Full room</h1>
      );
    } else {
      return (
        <div >
          <div style={{display:'flex', flexDirection:'row'}}>
            <div style={{flex:1}}>
              <ChatApp socket={socket} user={this.state.user}/>
            </div>
            <div style={{flex:1}}>
              <Profile role={this.state.role} profile_data={this.props.route.bundle[this.state.role]} />
            </div >
            <div style={{flex:1}}>
              <Quiz questions={this.props.route.bundle.questions}/>
            </div>
          </div>
        </div>
      );
    }
  }
}

Game.propTypes = {
  route: React.PropTypes.object,
  params: React.PropTypes.object
};

export default Game;