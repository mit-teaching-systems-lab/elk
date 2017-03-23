import React from 'react';
import CountdownTimer from './CountdownTimer';
 
class MenuBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {startButtonClicked:false};
    this.startButtonClick = this.startButtonClick.bind(this);
  }

  startButtonClick() {
    this.props.setPlayerReady();
    this.setState({startButtonClicked:true});
  }
 
  render() {
    var startButton = <button disabled={this.state.startButtonClicked} onClick={this.startButtonClick}> Begin Round </button>;
    var countdownTimer = <CountdownTimer secondsRemaining={420}/>;
    return (
      <div style={{borderBottomStyle:"solid", borderBottomWidth: 1}}>
        {this.props.roundBegan ?  countdownTimer: startButton}
      </div>
    );
  }
}

MenuBar.propTypes = {
  roundOver: React.PropTypes.bool.isRequired,
  roundBegan: React.PropTypes.bool.isRequired,
  setPlayerReady: React.PropTypes.func.isRequired
};

export default MenuBar;