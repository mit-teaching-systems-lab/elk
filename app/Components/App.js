import React from 'react';
import io from 'socket.io-client';
let socket = io.connect('');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.onJoinGame = this.onJoinGame.bind(this);
    socket.on('assigngameID', (gameID) => this._assignGameID(gameID));
    socket.on('isgameID', (flag) => this._isGameID(flag));
    this.state = {value: "", warningOn: false};
    this.onHandleChange = this.onHandleChange.bind(this);
  }

  createGame() {
    socket.emit("newgame");
  }

  _isGameID(flag) {
    if (flag) {
      window.location = '/#/' + this.state.value;
    } else {
      this.setState({warningOn: true});
    }
  }

  _assignGameID(gameID) {
    window.location = '/#/' + gameID;
  }

  onJoinGame(e) {
    e.preventDefault();
    socket.emit('onJoinGame', this.state.value);
  }

  onHandleChange(event) {
    this.setState({value: event.target.value, warningOn: false});
  }

  render() {
    return (
      <div>
        <button onClick={() => this.createGame()}> Create New Game as Student </button>
        <form onSubmit={this.onJoinGame} className="MyForm">
          <input type="text" value={this.state.value} onChange={this.onHandleChange}/>
          <input type="submit" value="Join Game"/>
        </form>
        {this.state.warning_on ? "Please enter an existing game number" : null}
      </div>
    );
  }
}

App.propTypes = {

};

export default App;