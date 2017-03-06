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
    this.state = {atCapacity: false, role: null, roundOver: false, isActiveGame: false, takenRoles: null};
    socket.on('isgameID', (flag, takenRoles) => this._isGameID(flag, takenRoles));
    this.setRoleOptions = this.setRoleOptions.bind(this);
    this.selectRole = this.selectRole.bind(this);
    this.submitAnswers = this.submitAnswers.bind(this);
  }

  componentDidMount() {
    socket.emit('joingame', this.props.params.gameID);
  }

  setRoleOptions(takenRoles) {
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

  _isGameID(flag, takenRoles) {
    if (flag) {
      this.setState({takenRoles: takenRoles});
    }
    this.setState({isActiveGame: flag});
  }

  selectRole(role) {
    this.setState({role: role});
  }

  submitAnswers(answerChoices) {
    if this.state.role == "teacher" {
      // this.setState{answers: gameAnswer}
    } else { // is student
      this.setState({studentSubmitted:true}_
    }
  }

  // Idea 
  // teaches have their answers once their answers are submitted 
  render() {
    if (!this.state.isActiveGame) {
      return (
        <h1> This page does not exit </h1>
      );
    } else if (this.state.role==null) {
      return(
        this.setRoleOptions(this.state.takenRoles)
      );
    }
    if (this.state.at_capacity) {
      return (
          <h1>Full room</h1>
      );
    } else {
      // student submission vs teacher submission
      return (
        <div >
          <div style={{display:'flex', flexDirection:'row'}}>
            <div style={{flex:1}}>
              <ChatApp socket={socket} user={this.state.role}/>
            </div>
            <div style={{flex:1}}>
              <Profile role={this.state.role} profileData={this.props.route.bundle[this.state.role]} />
            </div >
            <div style={{flex:1}}>
              <Quiz 
                submitAnswers={this.submitAnswers}
                questions={this.props.route.bundle.questions}/>
            </div>
          </div>
        </div>
      );
    }
  }
}

Game.propTypes = {
  route: React.PropTypes.object.isRequired,
  params: React.PropTypes.object.isRequired
};

export default Game;