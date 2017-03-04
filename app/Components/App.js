import React from 'react';

import io from 'socket.io-client';
let socket = io.connect('');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.joinGame = this.joinGame.bind(this);
    socket.on('assigngameID', (gameID) => this._assign_game_ID(gameID));
    socket.on('isgameID', (flag) => this._is_game_ID(flag));
    this.state = {value: "", warning_on: false};
    this.handleChange = this.handleChange.bind(this);
    this.joinGame = this.joinGame.bind(this);
  }

  joinGame(e) {
    e.preventDefault();
    socket.emit('joingame', this.state.value);
  }

  handleChange(event) {
    this.setState({value: event.target.value, warning_on: false});
  }

  _assign_game_ID(gameID) {
    window.location = '/#/' + gameID;
  }

  _is_game_ID(flag) {
    if (flag) {
      window.location = '/#/' + this.state.value;
    } else {
      this.setState({warning_on: true});
    }
  }

  createGame() {
    socket.emit("newgame");
  }

  render() {
    return (
      <div>
        <button onClick={() => this.createGame()}> Create New Game as Student </button>
        <form onSubmit={this.joinGame} className="MyForm">
          <input type="text" value={this.state.value} onChange={this.handleChange}/>
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