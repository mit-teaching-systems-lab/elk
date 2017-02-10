import React from 'react';
import MenuBar from './MenuBar';
import ChatApp from './ChatApp';
import Profile from './Profile';
import Quiz from './Quiz'
import Notepad from './Notepad'
 
class GameSelectionPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }


 
  render() {
    // console.log(this.props.params.gameID);
    return (
    <div>
      <MenuBar />
      <ChatApp chatID={this.props.params.gameID}/>
    </div>
  );
  }
}
export default GameSelectionPage;