import React from 'react';
import ChatApp from '../ChatApp';
import Profile from '../Profile';
import Quiz from '../Quiz';
import RoleSelectionMenu from '../RoleSelectionMenu';

import io from 'socket.io-client';
let socket = io.connect('');
 
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {at_capacity: false, role: null, round_over: false, is_active_game: false, takenRoles: null};
    // socket.on('connect', () => this._connect());
    // socket.on('init', (username) =>this._initialize(username));
    socket.on('getroom', () => this._get_room());
    socket.on('adduser', (user_role) => this._add_user(user_role));
    socket.on('fullhouse', () => this._full_house());
    socket.on('isgameID', (flag, takenRoles) => this._is_game_ID(flag, takenRoles));
    this.setRoleOptions = this.setRoleOptions.bind(this);
    this.selectRole = this.selectRole.bind(this);
  }

  componentDidMount() {
    socket.emit('joingame', this.props.params.gameID);
  }

  // _connect(takenRoles) { // not called anymore 
  //   if (this.state.is_active_game) {
  //     socket.emit('setroom', this.props.params.gameID);
  //   }
  // }

  setRoleOptions(takenRoles) {
    // var takenRoles = this.props.takenRoles;
    var studentDisabled = false;
    var teacherDisabled = false;
    if (takenRoles.length == 2) {

      studentDisabled = true;
      teacherDisabled = true;
    } else if (takenRoles.length == 1) {
      if (takenRoles[0] == "student") {
        studentDisabled = true;
      } else {
        teacherDisabled = true;
      }
    }
    return(
      <RoleSelectionMenu 
        socket={socket} 
        takenRoles={this.state.takenRoles} 
        selectRole={this.selectRole}
        gameID={this.props.params.gameID}
        studentDisabled={studentDisabled}
        teacherDisabled={teacherDisabled}/>
    );
  }

  // _initialize(username) {
  //   this.setState({user: username});
  // }

  _is_game_ID(flag, takenRoles) {
    
    if (flag) {
      this.setState({takenRoles: takenRoles});
    }
    this.setState({is_active_game: flag});
  }

  // _add_user(user_role) {
  //   socket.emit('adduser', prompt("What's your name?"));
  // }
 
  _get_room() {
    socket.emit('setroom', this.props.params.gameID);
  }

  _full_house() {
    this.setState({at_capacity: true});
  }

  round_over() {
    this.setState({round_over: true});
  }

  selectRole(role) {
    this.setState({role: role});
  }

  render() {
    if (!this.state.is_active_game) {
      return (
        <h1> This page does not exit </h1>
      );
    } else if (this.state.role==null) { // role hasn't been set yet
      return(
        this.setRoleOptions(this.state.takenRoles)
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
              <ChatApp socket={socket} user={this.state.role}/>
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