import React from 'react';
import CountdownTimer from './CountdownTimer';
 
class MenuBar extends React.Component {
  constructor(props) {
    super(props);
  }
 
  render() {
    return (
      <CountdownTimer secondsRemaining={10}/>
    );
  }
}

MenuBar.propTypes = {
  roundOver: React.PropTypes.bool.isRequired
};

export default MenuBar;