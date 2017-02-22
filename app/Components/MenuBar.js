import React from 'react';
import CountdownTimer from './CountdownTimer';
 
class MenuBar extends React.Component {
  constructor(props) {
    super(props);
  }
 
  render() {
    console.log(this.props)
    return (
    <div>
      Game: 00000
      <CountdownTimer timer_at_zero={this.props.round_over} secondsRemaining={10}/>
      Score: 5/10
    </div>
  );
  }
}
export default MenuBar;