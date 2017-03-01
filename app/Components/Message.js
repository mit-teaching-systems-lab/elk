import React from 'react';
 
class Message extends React.Component {
  constructor(props) {
    super(props);
  }
 
  render() {
    return (
		<div className="message">
			<strong>{this.props.user}: </strong> 
			<span> {this.props.text}</span>		
		</div>
    );
  }
}

Message.propTypes = {
  user: React.PropTypes.string,
  text: React.PropTypes.string
};
export default Message;