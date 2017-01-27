import React from 'react';
 
class JoinGame extends React.Component {
  constructor(props) {
    super(props);
  }
 
  render() {
    return (
		<div>
      Enter code to join an existing game!
      <input/>
      <button>Enter Game!</button>
		</div>
	);
  }
}
export default JoinGame;