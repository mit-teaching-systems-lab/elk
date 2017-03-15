import React from 'react';
 
class Message extends React.Component {
  constructor(props) {
    super(props);
  }
 
  render() {
    return (
		<div className="message">
			<strong>{this.props.user}: </strong> 
			<span style={{whiteSpace:'pre'}}> {this.props.text}</span>		
		</div>
    );
  }
}

Message.propTypes = {
  user: React.PropTypes.string.isRequired,
  text: React.PropTypes.string.isRequired
};
export default Message;