import React from 'react';
 
class Message extends React.Component {
  constructor(props) {
    super(props);
  }
 
  render() {
    var username = this.props.user;
    username = username.charAt(0).toUpperCase() + username.slice(1);
    var userColor = 'black';
    if (username=="Teacher") {
      userColor = 'blue';
    } else if (username == "Student") {
      userColor = 'green';
    }
    var style = {color: userColor};
    return (
      <div className="message">
        <strong style={style}>{username}: </strong>
        <span style={{whiteSpace:'pre-wrap'}}> {this.props.text}</span>
      </div>
    );
  }
}

Message.propTypes = {
  user: React.PropTypes.string.isRequired,
  text: React.PropTypes.string.isRequired
};
export default Message;