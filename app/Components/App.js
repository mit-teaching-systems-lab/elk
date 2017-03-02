import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <button> Create New Game </button>
        <button> Join Game </button>
      </div>
    );
  }
}

export default App;