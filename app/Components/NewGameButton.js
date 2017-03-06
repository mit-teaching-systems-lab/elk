import React from 'react';
 
class NewGameButton extends React.Component {
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

NewGameButton.propTypes = {
  user: React.PropTypes.string.isRequired,
  text: React.PropTypes.string.isRequired
};

export default NewGameButton;