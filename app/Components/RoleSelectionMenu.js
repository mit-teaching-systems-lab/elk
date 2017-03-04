import React from 'react';

class RoleSelectionMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selectedRole: null, studentDisabled: false, teacherDisabled: false};
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleOptionChange(changeEvent) {
    this.setState({
      selectedRole: changeEvent.target.value
    });
  }

  handleFormSubmit(formSubmitEvent) {
    formSubmitEvent.preventDefault();
    this.props.socket.emit('settingrole', this.state.selectedRole, this.props.gameID);
    this.props.selectRole(this.state.selectedRole);
  }

  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <label>
          <input type="radio" 
            value="student" 
            checked={this.state.selectedRole === 'student' } 
            onChange={this.handleOptionChange} 
            disabled={this.props.studentDisabled}/>
          Student
        </label>
        <label>
          <input type="radio" 
            value="teacher" 
            checked={this.state.selectedRole === 'teacher'} 
            onChange={this.handleOptionChange} 
            disabled={this.props.teacherDisabled}/>
          Teacher
        </label>
        <label>
          <input 
            type="radio" 
            value="observer"
            checked={this.state.selectedRole === 'observer'} 
            onChange={this.handleOptionChange} />
          Observer
        </label>
        <button className="btn btn-default" type="submit">Enter Game</button>
      </form>
    );
  }
}

RoleSelectionMenu.propTypes = {
  takenRoles: React.PropTypes.array,
  socket: React.PropTypes.object,
  selectRole: React.PropTypes.func,
  gameID: React.PropTypes.string,
  studentDisabled: React.PropTypes.bool,
  teacherDisabled: React.PropTypes.bool
};

export default RoleSelectionMenu;