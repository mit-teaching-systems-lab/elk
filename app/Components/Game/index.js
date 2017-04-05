import React from 'react';
import ChatApp from '../ChatApp';
import Profile from '../Profile';
import Quiz from '../Quiz';
import RoleSelectionMenu from '../RoleSelectionMenu';
import Score from '../Score';
import MenuBar from '../MenuBar';
import io from 'socket.io-client';
 
let socket = null;

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roundBegan: false, 
      studentAnswers: null, 
      teacherAnswers: null, 
      scoreAvailable: false, 
      role: null, 
      roundOver: false,
      isActiveGame: false, 
      takenRoles: null,
      playerReady: false
    };
    this.setPlayerReady = this.setPlayerReady.bind(this);
    this.showRoleOptions = this.showRoleOptions.bind(this);
    this.selectRole = this.selectRole.bind(this);
    this.submitAnswers = this.submitAnswers.bind(this);
    this.grade = this.grade.bind(this);
    this.toggleRoundOver = this.toggleRoundOver.bind(this);
    this.beginGame = this.beginGame.bind(this);
    this.setRoundOver = this.setRoundOver.bind(this);
  }

  componentDidMount() {
    socket = io.connect('');
    socket.on('isgameID', (flag, takenRoles) => this._isGameID(flag, takenRoles));
    socket.on('grade', (submissions) => this.grade(submissions));
    socket.on('bothPlayersReady', () => this.beginGame());
    socket.emit('joingame', this.props.params.gameID);
  }

  beginGame() {
    this.setState({roundBegan: true});
  }

  showRoleOptions(takenRoles) {
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
    this.setState({studentAnswers: Object.values(submissions.student.answers)});
    this.setState({teacherAnswers: Object.values(submissions.teacher.answers)});
    this.setState({scoreAvailable: true});
  }

  toggleRoundOver() {
    var roundOver = !this.state.roundOver;
    this.setState({roundOver: roundOver});
  }

  setPlayerReady() {
    socket.emit("playerReady", this.state.role, this.props.params.gameID);
  }

  setRoundOver() {
    this.setState({roundOver:true});
  }

  render() {
    var studentID = 0;
    var questionObjects = this.props.route.bundle.questions;
    var quiz = (
        <Quiz 
          submitAnswers={this.submitAnswers}
          questions={questionObjects}
          observer={this.state.role=="observer"}/>
        );
    var scoreTable = (
        <Score
          studentAnswers={this.state.studentAnswers}
          teacherAnswers={this.state.teacherAnswers}
          questions={questionObjects}
          studentID={studentID}
        />
      );
    var challenge = (

      <div style={{flex:1, overflowY:"scroll", borderTopColor: "gray", borderTopStyle:"solid", borderTopWidth:2, paddingLeft: 10}}>
        {this.state.scoreAvailable? scoreTable : quiz}
      </div>
    );
    if (!this.state.isActiveGame) {
      return (
        <h1> This page does not exit </h1>
      );
    } else if (this.state.role==null) {
      return(
        this.showRoleOptions(this.state.takenRoles)
      );
    }
    if (this.state.at_capacity) {
      return (
          <h1>Full room</h1>
      );
    } else {
      return (
        <div>
          <MenuBar 
            setPlayerReady={this.setPlayerReady} 
            roundOver={this.state.roundOver} 
            roundBegan={this.state.roundBegan}
            setRoundOver={this.setRoundOver}
          />
          <div style={{display:'flex', flexDirection:'row'}}>
            <div style={{flex:1}}>
              <ChatApp 
                roundBegan={this.state.roundBegan}
                roundOver={this.state.roundOver}
                isObserver={this.state.role=="observer"} 
                socket={socket} 
                user={this.state.role}
              />
            </div>
            <div style={{flex:1}}>
              <div style={{display:'flex', flexDirection:'column', height:"100%", borderLeftColor: "gray", borderLeftWidth: 2, borderLeftStyle:"solid"}}>
                <div style={{flex:1, overflowY:"scroll", paddingLeft: 10}}>
                  <Profile role={this.state.role} studentID={studentID} profileData={this.props.route.bundle[this.state.role]} />
                </div>
                  {this.state.roundOver ? challenge : null}
              </div>
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