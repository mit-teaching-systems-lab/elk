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
      <CountdownTimer timer_at_zero={this.props.roundOver} secondsRemaining={10}/>
      Score: 5/10
    </div>
    );
  }
}

MenuBar.propTypes = {
  roundOver: React.PropTypes.bool
};

export default MenuBar;