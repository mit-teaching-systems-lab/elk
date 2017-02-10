import React from 'react';
import JoinGame from './JoinGame';
import GameList from './GameList';
 
class GameSelectionPage extends React.Component {
  constructor(props) {
    super(props);
  }
 
  render() {
    return (
    <div>
      <JoinGame />
    </div>
  );
  }
}
export default GameSelectionPage; 