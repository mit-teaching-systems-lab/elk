import React from 'react';
import CountdownTimer from './CountdownTimer';
 
class MenuBar extends React.Component {
  constructor(props) {
    super(props);
  }
 
  render() {
    return (
    <div>
      Game: 00000
      <CountdownTimer secondsRemaining={420}/>
      Score: 5/10
    </div>
  );
  }
}
export default MenuBar;