import React from 'react';
import ChatApp from '../ChatApp';
import Profile from '../Profile';
import Quiz from '../Quiz';
import RoleSelectionMenu from '../RoleSelectionMenu';
import Score from '../Score';
import io from 'socket.io-client';
let socket = io.connect('');
 
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {roundBegan: false, studentAnswers: null, teacherAnswers: null, scoreAvailable: false, role: null, roundOver: false, isActiveGame: false, takenRoles: null};
    socket.on('isgameID', (flag, takenRoles) => this._isGameID(flag, takenRoles));
    socket.on('grade', (submissions) => this.grade(submissions));
    this.setRoleOptions = this.setRoleOptions.bind(this);
    this.selectRole = this.selectRole.bind(this);
    this.submitAnswers = this.submitAnswers.bind(this);
    this.grade = this.grade.bind(this);
    this.toggleRoundOver = this.toggleRoundOver.bind(this);
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
    } 
  }

  grade(submissions) {
    this.setState({studentAnswers: Object.values(submissions.student)});
    this.setState({teacherAnswers: Object.values(submissions.teacher)});
    this.setState({scoreAvailable: true});
  }

  toggleRoundOver() {
    var roundOver = !this.state.roundOver;
    this.setState({roundOver: roundOver});
  }

  render() {
    var studentID = 0;
    var questionObjects = this.props.route.bundle.questions;
    var questions = questionObjects.map(questionObj => questionObj.question);
    var solutions = questionObjects.map(questionObj => questionObj.answer[studentID]);
    var quiz = (
        <Quiz 
          submitAnswers={this.submitAnswers}
          questions={questions}
          observer={this.state.role=="observer"}/>
        );
    var scoreTable = (
        <Score
          studentAnswers={this.state.studentAnswers}
          teacherAnswers={this.state.teacherAnswers}
          questions={questions}
          solutions={solutions}
        />
      );
    var challenge = (
      <div style={{flex:1}}>
        {this.state.scoreAvailable? scoreTable : quiz}
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
            <div style={{flex:1, flexDirection:'column'}}>
              <Profile role={this.state.role} studentID={studentID} profileData={this.props.route.bundle[this.state.role]} />
              <button onClick={() => this.toggleRoundOver()}> 
                {this.state.roundOver? "Close challenge while round is ongoing":  "View Challenge when round is over"}
              </button>
              {this.state.roundOver ? challenge : null}
            </div >
            
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