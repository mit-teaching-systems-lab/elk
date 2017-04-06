import React from 'react';

class RoleSelectionMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selectedRole: null, studentDisabled: false, teacherDisabled: false, errorOn: false, errMsg: null};
    this.onHandleOptionChange = this.onHandleOptionChange.bind(this);
    this.onHandleFormSubmit = this.onHandleFormSubmit.bind(this);
  }

  onHandleOptionChange(changeEvent) {
    this.setState({
      selectedRole: changeEvent.target.value, errorOn: false
    });
  }

  onHandleFormSubmit(formSubmitEvent) {
    formSubmitEvent.preventDefault();
    this.props.checkTakenRoles((takenRoles)=> {
      if ((this.state.selectedRole in takenRoles) || !this.state.selectedRole) {
        this.setState({errorOn: true});
        if (!this.state.selectedRole) {
          this.setState({errMsg: "You must select a role to continue."});
        } else {
          this.setState({errMsg: "This role has already been taken; please select another one."});
        }
      } else {
        this.props.socket.emit('settingrole', this.state.selectedRole, this.props.gameID);
        this.props.selectRole(this.state.selectedRole);
      }
    });
  }

  render() {
    var paddingSize = 7;
    return (
      <div>
        <h1> Select your game role </h1>
        <p><i>Observers do not participate in the game</i></p>
        <form onSubmit={this.onHandleFormSubmit}>
          <label style={{padding:paddingSize}}>
            <input style={{marginRight: 7}} type="radio"
              value="student"
              checked={this.state.selectedRole === 'student'}
              onChange={this.onHandleOptionChange}
              disabled={"student" in this.props.takenRoles}/>
            Student
          </label>
          <label style={{padding:paddingSize}}>
            <input style={{marginRight: 7}} type="radio"
              value="teacher"
              checked={this.state.selectedRole === 'teacher'}
              onChange={this.onHandleOptionChange}
              disabled={"teacher" in this.props.takenRoles}/>
            Teacher
          </label>
          <label style={{padding:paddingSize}}>
            <input style={{marginRight: 7}}
              type="radio"
              value="observer"
              checked={this.state.selectedRole === 'observer'}
              onChange={this.onHandleOptionChange}/>
            Observer
          </label>
          <p/>
          <button className="btn btn-default" type="submit">Enter Game</button>
          {this.state.errorOn ? <p> {this.state.errMsg} </p> : null}
        </form>
      </div>
    );
  }
}

RoleSelectionMenu.propTypes = {
  takenRoles: React.PropTypes.object.isRequired,
  socket: React.PropTypes.object.isRequired,
  selectRole: React.PropTypes.func.isRequired,
  gameID: React.PropTypes.string.isRequired,
  checkTakenRoles: React.PropTypes.func.isRequired
};

export default RoleSelectionMenu;