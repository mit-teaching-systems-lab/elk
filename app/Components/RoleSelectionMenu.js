import React from 'react';

class RoleSelectionMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selectedRole: null, studentDisabled: false, teacherDisabled: false};
    this.onHandleOptionChange = this.onHandleOptionChange.bind(this);
    this.onHandleFormSubmit = this.onHandleFormSubmit.bind(this);
  }

  onHandleOptionChange(changeEvent) {
    this.setState({
      selectedRole: changeEvent.target.value
    });
  }

  onHandleFormSubmit(formSubmitEvent) {
    formSubmitEvent.preventDefault();
    this.props.socket.emit('settingrole', this.state.selectedRole, this.props.gameID);
    this.props.selectRole(this.state.selectedRole);
  }

  render() {
    return (
      <form onSubmit={this.onHandleFormSubmit}>
        <label>
          <input type="radio" 
            value="student" 
            checked={this.state.selectedRole === 'student' } 
            onChange={this.onHandleOptionChange}
            disabled={this.props.studentDisabled}/>
          Student
        </label>
        <label>
          <input type="radio" 
            value="teacher" 
            checked={this.state.selectedRole === 'teacher'} 
            onChange={this.onHandleOptionChange}
            disabled={this.props.teacherDisabled}/>
          Teacher
        </label>
        <label>
          <input 
            type="radio" 
            value="observer"
            checked={this.state.selectedRole === 'observer'} 
            onChange={this.onHandleOptionChange}/>
          Observer
        </label>
        <button className="btn btn-default" type="submit">Enter Game</button>
      </form>
    );
  }
}

RoleSelectionMenu.propTypes = {
  takenRoles: React.PropTypes.array.isRequired,
  socket: React.PropTypes.object.isRequired,
  selectRole: React.PropTypes.func.isRequired,
  gameID: React.PropTypes.string.isRequired,
  studentDisabled: React.PropTypes.bool.isRequired,
  teacherDisabled: React.PropTypes.bool.isRequired
};

export default RoleSelectionMenu;