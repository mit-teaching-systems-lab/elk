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
export default NewGameButton;