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
    this.state = {scoreAvailable: false, atCapacity: false, role: null, roundOver: true, isActiveGame: false, takenRoles: null, answerChoices: null};
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
    if (this.state.role != "observer") {
      socket.emit('setanswer', answerChoices, this.state.role, this.props.params.gameID);
      this.setState({answerChoices: answerChoices});
    } 
  }

// when should the student calculate their score? 
  getAnswerKey(answerKey, scoreAvailable) {
    if (scoreAvailable) { // everyone has submitted their scores
      if (this.state.role == 'teacher') {
        // calculate score by ocmparing to answerKey
      } else {
        // calculate score by comparing to "true" answer
      }
    }
  }

  render() {
    var quiz = (
        <Quiz 
          submitAnswers={this.submitAnswers}
          questions={this.props.route.bundle.questions}
          observer={this.state.role=="observer"}/>
        );
    var score = <p> SCORE AVAILABLE </p>;
    var challenge = (
      <div style={{flex:1}}>
        {this.state.scoreAvailable? score : quiz}
      </div>
    );
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
      return (
        <div >
          <div style={{display:'flex', flexDirection:'row'}}>
            <div style={{flex:1}}>
              <ChatApp socket={socket} user={this.state.role}/>
            </div>
            <div style={{flex:1}}>
              <Profile role={this.state.role} profileData={this.props.route.bundle[this.state.role]} />
            </div >
            {this.state.roundOver ? challenge : null}
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