import React from 'react';

import io from 'socket.io-client';
let socket = io.connect('');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.joinGame = this.joinGame.bind(this);
    socket.on('assigngameID', (gameID) => this._assign_game_ID());
    this.state = {value: ""};
    this.handleChange = this.handleChange.bind(this);
    this.joinGame = this.joinGame.bind(this);
  }

  joinGame(e) {
    e.preventDefault();

    window.location = '/#/' + this.state.value;
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  _assign_game_ID(gameID) {
    window.location = '/#/' + gameID;
  }

  createGame(e) {
    e.preventDefault();
    socket.emit("new_game");
  }

  render() {
    return (
      <div>
        <button onClick={this.createGame}> Create New Game </button>
        <form onSubmit={this.joinGame} className="MyForm">
          <input type="text" value={this.state.value} onChange={this.handleChange}/>
          <input type="submit" value="Join Game"/>
        </form>
      </div>
    );
  }
}

App.propTypes = {

};

export default App;