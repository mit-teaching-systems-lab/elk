import React from 'react';
import MenuBar from './MenuBar';
import ChatApp from './ChatApp';
import Profile from './Profile';
import Quiz from './Quiz'
import Notepad from './Notepad'
 
class GameSelectionPage extends React.Component {
  constructor(props) {
    super(props);
  }
 
  render() {
    return (
    <div>
      <MenuBar />
      <ChatApp />
    </div>
  );
  }
}
export default GameSelectionPage;