import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.joinGame = this.joinGame.bind(this);
  }

  joinGame(e) {
    e.preventDefault();
    window.location = '/#/2';
  }

  createGame(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <button onClick={this.createGame}> Create New Game </button>
        <button onClick={this.joinGame}> Join Game </button>
      </div>
    );
  }
}

App.propTypes = {

};

export default App;