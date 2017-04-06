import React from 'react';
import io from 'socket.io-client';
let socket = io.connect('');

class App extends React.Component {
  constructor(props) {
    super(props);
    socket.on('assigngameID', (gameID, bundleID) => this._assignGameID(gameID, bundleID));
    socket.on('isgameID', (flag, takenRoles, bundleID) => this._isGameID(flag, takenRoles, bundleID));
    this.state = {value: "", warningOn: false};
    this.onHandleChange = this.onHandleChange.bind(this);
    this.onJoinGame = this.onJoinGame.bind(this);
  }

  createGame(bundleID) {
    socket.emit("newgame", bundleID);
  }

  _isGameID(flag, takenRoles, bundleID) {
    if (flag) {
      window.location = '/#/' + bundleID + '/' + this.state.value;
    } else {
      this.setState({warningOn: true});
    }
  }

  _assignGameID(gameID, bundleID) {
    window.location = '/#/' + bundleID + '/' + gameID;
  }

  onJoinGame(e) {
    e.preventDefault();
    socket.emit('joingame', this.state.value);
  }

  onHandleChange(event) {
    this.setState({value: event.target.value, warningOn: false});
  }

  render() {
    return (
      <div>
        <h1> Welcome to MIT Teaching System Lab's ELK Game </h1>
        <p> Create a new game using the button below </p>
        <button onClick={() => this.createGame('rational')}> Create New Game: Rational</button>
        <button onClick={() => this.createGame('evolution2')}> Create New Game: Evolution2</button>
        <form onSubmit={this.onJoinGame} className="MyForm">
          <p>Or join an existing game using the game ID </p>
          <input type="text" value={this.state.value} onChange={this.onHandleChange} placeholder="gameID"/>

          <input type="submit" value="Join Game"/>
        </form>
        {this.state.warningOn ? "Please enter an existing game number" : null}
      </div>
    );
  }
}

App.propTypes = {

};

export default App;